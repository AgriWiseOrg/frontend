const fs = require('fs');

let c = fs.readFileSync('src/components/Weather.jsx', 'utf8');

c = c.replace(
    "import { useTranslation } from 'react-i18next';\\nimport React, { useState, useEffect } from 'react';\\nimport { useNavigate } from 'react-router-dom';\\n\\nconst Weather = () => {\\n  const { t } = useTranslation();\\n\\n  const navigate = useNavigate();",
    "import React, { useState, useEffect } from 'react';\\nimport { useNavigate } from 'react-router-dom';\\n\\nconst Weather = () => {\\n\\n  const navigate = useNavigate();"
);

c = c.replace(
    '    </div>\\n  {t(");\\n\\n  if (!data) return (")}',
    '    </div>\\n  );\\n\\n  if (!data) return ('
);

c = c.replace(
    '  const isRainy = data.code >{t("= 51;\\n  const isSunny = data.code === 0;\\n\\n  return (")}',
    '  const isRainy = data.code >= 51;\\n  const isSunny = data.code === 0;\\n\\n  return ('
);

fs.writeFileSync('src/components/Weather.jsx', c);
console.log("Fixed Weather.jsx");
