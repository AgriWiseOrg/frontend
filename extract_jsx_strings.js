import fs from 'fs';
import path from 'path';

const IGNORE_FILES = ['Support.jsx', 'Support.test.jsx', 'LandingPage.jsx', 'FrontPage.jsx', 'AdminFrontPage.jsx', 'BuyerFrontPage.jsx', 'LanguageContext.jsx', 'Cart.test.jsx', 'MarketPlace.test.jsx', 'MarketPrices.test.jsx', 'GovtSchemes.test.jsx', 'QualityPriceCalculator.test.jsx', 'Weather.test.jsx'];

const COMPONENTS_DIR = 'src/components';
const newEnglishStrings = new Set();

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let original = content;

    // Replace placeholder="..."
    content = content.replace(/placeholder="([^"]*[a-zA-Z][^"]*)"/g, (match, p1) => {
        const text = p1.trim();
        newEnglishStrings.add(text);
        return `placeholder={t("${text.replace(/"/g, '\\"')}")}`;
    });

    // Replace title="..."
    content = content.replace(/title="([^"]*[a-zA-Z][^"]*)"/g, (match, p1) => {
        const text = p1.trim();
        newEnglishStrings.add(text);
        return `title={t("${text.replace(/"/g, '\\"')}")}`;
    });

    // Replace > Text <
    content = content.replace(/>([^<>{}]*[a-zA-Z][^<>{}]*)</g, (match, p1) => {
        const text = p1.trim();
        if (text === "") return match;
        // Avoid strings that look like pure javascript or css
        if (text.includes('&&') || text.includes('||') || text.includes('px')) {
            if (!text.includes(' ')) return match;
        }
        newEnglishStrings.add(text);
        return match.replace(text, `{t("${text.replace(/"/g, '\\"')}")}`);
    });

    if (content !== original) {
        if (!content.includes('useTranslation')) {
            content = content.replace("import React", "import { useTranslation } from 'react-i18next';\nimport React");
        }

        // Inject inside component (finds generic functional component)
        content = content.replace(/(const [a-zA-Z]\w*\s*=\s*\([^)]*\)\s*=>\s*\{|function [a-zA-Z]\w*\([^)]*\)\s*\{)/, `$1\n  const { t } = useTranslation();\n`);

        fs.writeFileSync(filePath, content);
        console.log(`Patched ${filePath}`);
    }
}

function run() {
    const files = fs.readdirSync(COMPONENTS_DIR).filter(f => f.endsWith('.jsx') && !IGNORE_FILES.includes(f));
    for (const file of files) {
        processFile(path.join(COMPONENTS_DIR, file));
    }

    const subDir = path.join(COMPONENTS_DIR, 'GovtSchemes');
    if (fs.existsSync(subDir)) {
        const subFiles = fs.readdirSync(subDir).filter(f => f.endsWith('.jsx') && !IGNORE_FILES.includes(f));
        for (const file of subFiles) {
            processFile(path.join(subDir, file));
        }
    }

    console.log(`Extracted ${newEnglishStrings.size} pure English strings!`);

    let transFile = fs.readFileSync('src/translations.js', 'utf-8');
    const jsonStr = transFile.replace('export const resources = ', '').replace(/;\s*$/, '');
    const resources = JSON.parse(jsonStr);

    for (const str of newEnglishStrings) {
        if (!resources.en.translation[str]) {
            resources.en.translation[str] = str;
        }
    }

    const finalContent = `export const resources = ${JSON.stringify(resources, null, 2)};\n`;
    fs.writeFileSync('src/translations.js', finalContent);
    console.log("Updated src/translations.js");
}
run();
