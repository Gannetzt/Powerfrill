const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'products.ts');
const content = fs.readFileSync(filePath, 'utf8');

// Find the productsData array
// Use a more generic match that finds everything from the start of the array to the end
const match = content.match(/export const productsData: ProductData\[\] = (\[[\s\S]*?\]);/);
if (!match) {
    console.error('Could not find productsData');
    process.exit(1);
}

let arrayStr = match[1];

// Strip comments
arrayStr = arrayStr.replace(/\/\/.*$/gm, '');

// Clean up: In case there are some TS specific items or trailing commas
// JavaScript's eval can handle trailing commas and lack of quotes on keys
try {
    // We can evaluate the string as a JS expression
    const products = eval(arrayStr);
    fs.writeFileSync('products_export.json', JSON.stringify(products, null, 2));
    console.log(`Successfully exported ${products.length} products to products_export.json`);
} catch (e) {
    console.error('Failed to parse products array:', e.message);
    process.exit(1);
}
