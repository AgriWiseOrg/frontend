import fs from 'fs';
const files = [
    'src/components/MarketPlace.jsx',
    'src/components/GovtSchemes.jsx',
    'src/components/Cart.jsx',
    'src/components/CartContext.jsx'
];

files.forEach(f => {
    let c = fs.readFileSync(f, 'utf8');

    // Fix Cart.jsx
    c = c.replace('{t("(\\n                    // FIXED: Using item.productId (from your MongoDB schema) instead of item.id")}', '(\\n                    // FIXED: Using item.productId (from your MongoDB schema) instead of item.id');

    // Fix CartContext.jsx
    c = c.replace('{t("sum + ((item.price || 0) * (item.quantity || 0)), 0) \\n    : 0;\\n\\n  return (")}', 'sum + ((item.price || 0) * (item.quantity || 0)), 0) \\n    : 0;\\n\\n  return (');

    // Fix GovtSchemes.jsx
    c = c.replace('{t("(                                       // Loop through hubs array dynamically")}', '(                                       // Loop through hubs array dynamically');

    // Fix MarketPlace.jsx
    c = c.replace('{t("(b.rating || 0) - (a.rating || 0));\\n\\n  return (")}', '(b.rating || 0) - (a.rating || 0));\\n\\n  return (');

    fs.writeFileSync(f, c);
    console.log(`Fixed ${f}`);
});
