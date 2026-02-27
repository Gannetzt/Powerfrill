import re
import json
import subprocess
import os
from sqlmodel import Session, select, create_engine, SQLModel
from app.models import Product

from app.config import settings

engine = create_engine(settings.DATABASE_URL)

def migrate():
    file_path = 'd:\\powerfill\\src\\data\\products.ts'
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        return

    print(f"Reading {file_path}...")
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Look for the exported array
    # The array starts with [ and ends with ];
    match = re.search(r'export const productsData: ProductData\[\] = (\[[\s\S]*?\]);', content)
    if not match:
        print("Could not find productsData array with regex.")
        return

    array_str = match.group(1)
    print(f"Regex matched {len(array_str)} characters.")
    
    # Create a cleaner temporary file
    # We strip the TypeScript specific syntax if any, though the regex should have captured the JS-compatible array part.
    js_code = f"""
const fs = require('fs');
try {{
    // We define a dummy interface/type if needed, but since it's JS we just need the array
    const products = {array_str};
    console.log(JSON.stringify(products));
}} catch (e) {{
    process.stderr.write(e.message);
    process.exit(1);
}}
"""
    with open('tmp_migrate.cjs', 'w', encoding='utf-8') as f:
        f.write(js_code)
    
    print("Running node to extract data...")
    result = subprocess.run(['node', 'tmp_migrate.cjs'], capture_output=True, text=True)
    if result.returncode == 0:
        try:
            products_data = json.loads(result.stdout)
            print(f"Loaded {len(products_data)} products from JSON.")
            
            with Session(engine) as session:
                count = 0
                for p_data in products_data:
                    # Map 'features' to JSON-compatible list if it's not already
                    # SQLModel should handle Dict/List to JSON automatically if sa_column=Column(JSON) is set.
                    
                    existing = session.get(Product, p_data['id'])
                    if not existing:
                        try:
                            # Use model_validate to create the Product instance
                            product = Product.model_validate(p_data)
                            session.add(product)
                            count += 1
                        except Exception as ve:
                            print(f"Validation error for product {p_data.get('id')}: {ve}")
                    else:
                        print(f"Product {p_data['id']} already exists.")
                
                session.commit()
                print(f"Successfully migrated {count} products.")
        except Exception as e:
            print(f"Migration error: {e}")
            import traceback
            traceback.print_exc()
    else:
        print("Node execution failed:")
        print(result.stderr)
    
    if os.path.exists('tmp_migrate.cjs'):
        os.remove('tmp_migrate.cjs')

if __name__ == "__main__":
    migrate()
