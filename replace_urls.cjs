const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.js') || file.endsWith('.jsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(srcDir);
let changedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // Replace backtick string interpolations: `http://localhost:5001/api...`
  // We use regex to match `http://localhost:5001
  content = content.replace(/`http:\/\/localhost:5001/g, '`${import.meta.env.VITE_API_URL || "http://localhost:5001"}');
  
  // Replace regular string quotes: 'http://localhost:5001/api...'
  // We replace 'http://localhost:5001 with `${import.meta.env.VITE_API_URL || "http://localhost:5001"}`
  content = content.replace(/'http:\/\/localhost:5001([^']*)'/g, '`${import.meta.env.VITE_API_URL || "http://localhost:5001"}$1`');
  
  // Replace double string quotes: "http://localhost:5001/api..."
  content = content.replace(/"http:\/\/localhost:5001([^"]*)"/g, '`${import.meta.env.VITE_API_URL || "http://localhost:5001"}$1`');

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
    changedCount++;
  }
});

console.log(`Done. Updated ${changedCount} files.`);
