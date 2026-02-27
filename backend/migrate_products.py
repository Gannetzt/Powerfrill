import re
import json
import subprocess
import os
from sqlmodel import Session, select
from app.database import engine, create_db_and_tables
from app.models import Product

def migrate():
    file_path = 'd:\\powerfill\\src\\data\\products.ts'
    if not os.path.exists(file_path):
        file_path = '../src/data/products.ts'

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    match = re.search(r'export const productsData: ProductData\[\] = (\[[\s\S]*?\]);', content)
    if not match:
        print("Could not find productsData array.")
        return

    array_str = match.group(1)
    
    # Create a temporary CommonJS file to extract the data
    js_code = f"""
const fs = require('fs');
try {{
    const products = {array_str};
    console.log(JSON.stringify(products));
}} catch (e) {{
    console.error(e.message);
    process.exit(1);
}}
"""
    with open('tmp_export.cjs', 'w', encoding='utf-8') as f:
        f.write(js_code)
    
    result = subprocess.run(['node', 'tmp_export.cjs'], capture_output=True, text=True)
    if result.returncode == 0:
        try:
            products_data = json.loads(result.stdout)
            create_db_and_tables()
            with Session(engine) as session:
                count = 0
                for p_data in products_data:
                    existing = session.get(Product, p_data['id'])
                    if not existing:
                        product = Product.model_validate(p_data)
                        session.add(product)
                        count += 1
                session.commit()
                print(f"Successfully migrated {count} products.")
        except Exception as e:
            print(f"Migration error: {e}")
    else:
        print("JS Export failed.")
        print(result.stderr)
    
    if os.path.exists('tmp_export.cjs'):
        os.remove('tmp_export.cjs')

if __name__ == "__main__":
    migrate()
