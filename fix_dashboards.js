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

    // Add i18n to useTranslation if not already there
    if (text.includes('const { t } = useTranslation()') && !text.includes('i18n')) {
        text = text.replace(/const { t } = useTranslation\(\);/g, 'const { t, i18n } = useTranslation();');
    }

    // Fix greeting logic
    text = text.replace(
        /const greeting = hour < 12 \? 'Good Morning' : hour < 18 \? 'Good Afternoon' : 'Good Evening';/g,
        "const greeting = hour < 12 ? t('greeting_morning', 'Good Morning') : hour < 18 ? t('greeting_afternoon', 'Good Afternoon') : t('greeting_evening', 'Good Evening');"
    );

    // Fix hardcoded Farmer / Admin / Buyer in greetings
    text = text.replace(/<span className="text-emerald-600">Farmer<\/span>/g, '<span className="text-emerald-600">{t(\'role_farmer\', \'Farmer\')}</span>');
    text = text.replace(/<span className="text-emerald-600">Admin<\/span>/g, '<span className="text-emerald-600">{t(\'role_admin\', \'Admin\')}</span>');
    text = text.replace(/<span className="text-emerald-600">Buyer<\/span>/g, '<span className="text-emerald-600">{t(\'role_buyer\', \'Buyer\')}</span>');

    // Fix date toLocaleDateString
    text = text.replace(/{currentTime\.toLocaleDateString\('en-US'/g, "{currentTime.toLocaleDateString(i18n.language || 'en-US'");

    fs.writeFileSync(filePath, text);
    console.log("Updated", f);
});
