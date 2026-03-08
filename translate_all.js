import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const translationsFile = path.join(__dirname, 'src', 'translations.js');
let fileContent = fs.readFileSync(translationsFile, 'utf8');

let resources;
try {
    const jsonStr = fileContent.replace('export const resources = ', '').replace(/;\s*$/, '');
    resources = JSON.parse(jsonStr);
} catch (e) {
    console.error("Could not parse resources", e);
    process.exit(1);
}

const targetLanguages = ['hi', 'mr', 'gu', 'pa', 'ta', 'te', 'kn', 'bn'];
const delay = (ms) => new Promise(res => setTimeout(res, ms));

async function translateText(text, targetLang) {
    if (!text || text.trim() === '') return text;
    // Skip translating numbers or proper nouns like AgriWise
    if (!isNaN(text) || text === 'AgriWise') return text;
    try {
        const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`);
        const data = await response.json();
        if (data && data[0]) {
            return data[0].map(item => item[0]).join('');
        }
        return text;
    } catch (e) {
        console.error("Error translating", text, e.message);
        return text;
    }
}

// Add the new keys to 'en' first so they can be translated if they are missing
const newEnKeys = {
    "greeting_morning": "Good Morning",
    "greeting_afternoon": "Good Afternoon",
    "greeting_evening": "Good Evening",
    "role_farmer": "Farmer",
    "role_admin": "Admin",
    "role_buyer": "Buyer",
    "dashboard": "Dashboard"
};
Object.assign(resources.en.translation, newEnKeys);

async function run() {
    const enKeys = Object.keys(resources.en.translation);

    const CONCURRENCY_LIMIT = 20;

    for (const lang of targetLanguages) {
        console.log(`Translating for ${lang}...`);
        if (!resources[lang]) resources[lang] = { translation: {} };

        let translatedCount = 0;

        // Build list of keys that need translation
        const keysToTranslate = [];
        for (const key of enKeys) {
            const enText = resources.en.translation[key];
            const currentLangText = resources[lang].translation[key];
            if (!currentLangText || currentLangText === enText) {
                keysToTranslate.push(key);
            }
        }

        // Process in chunks
        for (let i = 0; i < keysToTranslate.length; i += CONCURRENCY_LIMIT) {
            const chunk = keysToTranslate.slice(i, i + CONCURRENCY_LIMIT);
            await Promise.all(chunk.map(async (key) => {
                const enText = resources.en.translation[key];
                const translated = await translateText(enText, lang);
                resources[lang].translation[key] = translated;
                translatedCount++;
            }));

            console.log(`  Done ${translatedCount} out of ${keysToTranslate.length} in ${lang}`);
            await delay(100); // Slight delay after each batch of 20
        }

        console.log(` Finished ${lang}. Translated ${translatedCount} items.`);

        // Save incrementally to prevent data loss
        const tempContent = `export const resources = ${JSON.stringify(resources, null, 2)};\n`;
        fs.writeFileSync(translationsFile, tempContent);
    }

    console.log("All missing translations fetched and saved to src/translations.js!");
}

run();
