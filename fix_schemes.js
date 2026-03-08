const fs = require('fs');

let c = fs.readFileSync('src/components/GovtSchemes/SchemeList_farmer.jsx', 'utf8');

c = c.replace(
    'landSize >{t("= (scheme.minLand || 0) &&\\n      landSize")} <= (scheme.maxLand || Infinity)',
    'landSize >= (scheme.minLand || 0) &&\\n      landSize <= (scheme.maxLand || Infinity)'
);

c = c.replace(
    'landSize && landSize >{t("= min && landSize")} <= max;',
    'landSize && landSize >= min && landSize <= max;'
);

fs.writeFileSync('src/components/GovtSchemes/SchemeList_farmer.jsx', c);
console.log("Fixed SchemeList_farmer.jsx");
