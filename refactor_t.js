import fs from 'fs';
let content = fs.readFileSync('src/components/LandingPage.jsx', 'utf8');
content = content.replace(/t\.([a-zA-Z0-9_]+)/g, "t('$1')");
fs.writeFileSync('src/components/LandingPage.jsx', content);
console.log('Replaced t.property with t("property")');
