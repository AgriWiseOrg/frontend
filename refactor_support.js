import fs from 'fs';

const filePath = 'src/components/Support.jsx';
let content = fs.readFileSync(filePath, 'utf-8');

// The english object is everything between `en: {` and `},` before `hi: {`
const enMatch = content.match(/en:\s*(\{[\s\S]*?\n {8}\}),\s*\n\s*hi:/);
if (!enMatch) {
    console.log("Could not match english translations.");
    process.exit(1);
}

const enStr = enMatch[1];
// Safely evaluate the object
const enObj = eval('(' + enStr + ')');

// Remove the massive translations dictionary from the code
content = content.replace(/const translations = \{[\s\S]*?};\n\n {4}const t = translations\[lang\] \|\| translations\['en'\];/, `
    const { t: globalT } = useTranslation();
    
    const englishSupportStrings = ${enStr};

    const translateObject = (obj) => {
        if (typeof obj === 'string') return globalT(obj);
        if (Array.isArray(obj)) {
            return obj.map(item => {
                if (item && typeof item === 'object') {
                    const res = { ...item };
                    if (res.label) res.label = globalT(res.label);
                    if (res.name) res.name = globalT(res.name);
                    if (res.benefit) res.benefit = globalT(res.benefit);
                    if (res.title) res.title = globalT(res.title);
                    if (res.remedy) res.remedy = globalT(res.remedy);
                    return res;
                }
                return item;
            });
        }
        if (typeof obj === 'object' && obj !== null) {
            const res = {};
            for (const [key, val] of Object.entries(obj)) {
                if (key === 'url' || key === 'icon' || key === 'link') {
                   res[key] = val;
                } else {
                   res[key] = translateObject(val);
                }
            }
            return res;
        }
        return obj;
    };

    const t = React.useMemo(() => translateObject(englishSupportStrings), [globalT, lang]);
`);

// Inject useTranslation import
if (!content.includes("useTranslation")) {
    content = content.replace("import React, { useState, useEffect } from 'react';", "import React, { useState, useEffect } from 'react';\nimport { useTranslation } from 'react-i18next';");
}

fs.writeFileSync(filePath, content);
console.log("Support.jsx refactored to use global translation engine.");

// Now extract all strings from enObj to add to translations.js
const uniqueStrings = new Set();
function extractStrings(obj) {
    if (typeof obj === 'string') {
        uniqueStrings.add(obj);
    } else if (Array.isArray(obj)) {
        obj.forEach(item => {
            if (item && typeof item === 'object') {
                if (item.label) uniqueStrings.add(item.label);
                if (item.name) uniqueStrings.add(item.name);
                if (item.benefit) uniqueStrings.add(item.benefit);
                if (item.title) uniqueStrings.add(item.title);
                if (item.remedy) uniqueStrings.add(item.remedy);
            } else if (typeof item === 'string') {
                uniqueStrings.add(item);
            }
        });
    } else if (typeof obj === 'object' && obj !== null) {
        for (const [k, v] of Object.entries(obj)) {
            if (k !== 'url' && k !== 'icon' && k !== 'link') {
                extractStrings(v);
            }
        }
    }
}

extractStrings(enObj);

let transFile = fs.readFileSync('src/translations.js', 'utf-8');
const jsonStr = transFile.replace('export const resources = ', '').replace(/;\s*$/, '');
const resources = JSON.parse(jsonStr);

for (const str of uniqueStrings) {
    if (!resources.en.translation[str]) {
        resources.en.translation[str] = str;
    }
}

const finalContent = `export const resources = ${JSON.stringify(resources, null, 2)};\n`;
fs.writeFileSync('src/translations.js', finalContent);
console.log(`Appended ${uniqueStrings.size} strings from Support.jsx to src/translations.js`);
