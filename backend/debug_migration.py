import re
import os

file_path = 'd:\\powerfill\\src\\data\\products.ts'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

match = re.search(r'export const productsData: ProductData\[\] = (\[[\s\S]*?\]);', content)
if match:
    print("Match found!")
    print("Length of match:", len(match.group(1)))
    # print(match.group(1)[:500])
else:
    print("Match NOT found!")
