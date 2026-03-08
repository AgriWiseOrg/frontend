import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const files = ['FrontPage.jsx', 'AdminFrontPage.jsx', 'BuyerFrontPage.jsx'];

files.forEach(f => {
    const filePath = path.join(__dirname, 'src', 'components', f);
    if (!fs.existsSync(filePath)) {
        console.log("File not found:", filePath);
        return;
    }
    let text = fs.readFileSync(filePath, 'utf8');

    if (!text.includes("import { useTranslation } from 'react-i18next';")) {
        // Add import at the top
        text = "import { useTranslation } from 'react-i18next';\n" + text;

        // Add hook inside component
        const compRegex = new RegExp(`const ${f.replace('.jsx', '')} = \\(\\) => {`);
        text = text.replace(compRegex, match => match + '\n  const { t, i18n } = useTranslation();\n');

        fs.writeFileSync(filePath, text);
        console.log("Fixed imports in", f);
    } else {
        console.log("Already has import:", f);
    }
});
