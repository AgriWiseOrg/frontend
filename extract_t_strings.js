import fs from 'fs';
import path from 'path';

const IGNORE_FILES = ['LanguageContext.jsx'];

const COMPONENTS_DIR = 'src/components';
const uniqueStrings = new Set();

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');

    // Match t("...") or t('...')
    // Be careful to allow escaped quotes inside, e.g., t("Don\"t")
    const regex = /t\(\s*(["'])(.*?)\1\s*\)/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
        uniqueStrings.add(match[2].replace(/\\"/g, '"').replace(/\\'/g, "'"));
    }
}

function run() {
    const files = fs.readdirSync(COMPONENTS_DIR).filter(f => f.endsWith('.jsx') && !IGNORE_FILES.includes(f));
    for (const file of files) {
        processFile(path.join(COMPONENTS_DIR, file));
    }

    const subDir = path.join(COMPONENTS_DIR, 'GovtSchemes');
    if (fs.existsSync(subDir)) {
        const subFiles = fs.readdirSync(subDir).filter(f => f.endsWith('.jsx'));
        for (const file of subFiles) {
            processFile(path.join(subDir, file));
        }
    }

    // Also parse LandingPage, App.jsx, FrontPage, AdminFrontPage, BuyerFrontPage
    const extraFiles = ['LandingPage.jsx', 'FrontPage.jsx', 'AdminFrontPage.jsx', 'BuyerFrontPage.jsx'];
    for (const ef of extraFiles) {
        processFile(path.join(COMPONENTS_DIR, ef));
    }


    console.log(`Extracted ${uniqueStrings.size} keys from t() calls!`);

    let transFile = fs.readFileSync('src/translations.js', 'utf-8');
    const jsonStr = transFile.replace('export const resources = ', '').replace(/;\s*$/, '');
    const resources = JSON.parse(jsonStr);

    let added = 0;
    for (const str of uniqueStrings) {
        if (!resources.en.translation[str]) {
            resources.en.translation[str] = str;
            added++;
        }
    }

    const finalContent = `export const resources = ${JSON.stringify(resources, null, 2)};\n`;
    fs.writeFileSync('src/translations.js', finalContent);
    console.log(`Added ${added} new keys to src/translations.js`);
}
run();
