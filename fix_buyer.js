const fs = require('fs');

let c = fs.readFileSync('src/components/BuyerSupport.jsx', 'utf8');

c = c.replace(
    "import { useTranslation } from 'react-i18next';\\nimport React, { useState, useEffect, useRef } from 'react';\\nimport { useNavigate } from 'react-router-dom';\\n\\nconst BuyerSupport = () => {\\n  const { t } = useTranslation();\\n\\n    const navigate = useNavigate();",
    "import React, { useState, useEffect, useRef } from 'react';\\nimport { useNavigate } from 'react-router-dom';\\n\\nconst BuyerSupport = () => {\\n\\n    const navigate = useNavigate();"
);

c = c.replace(
    '        </div>\\n    {t(");\\n\\n    return (")}',
    '        </div>\\n    );\\n\\n    return ('
);

fs.writeFileSync('src/components/BuyerSupport.jsx', c);
console.log("Fixed BuyerSupport.jsx");
