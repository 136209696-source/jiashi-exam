// Build standalone HTML: inline all question bank JS into index.html
const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/Administrator/my-project/jiashi-exam';
let html = fs.readFileSync(path.join(dir, 'index.html'), 'utf-8');

// Replace each external script with inline version
const jsFiles = ['questions_p1.js', 'questions_p2.js', 'questions_p3.js', 'questions_p4.js', 'questions_p5.js'];

for (const file of jsFiles) {
  const content = fs.readFileSync(path.join(dir, file), 'utf-8');
  const tag = `<script src="${file}"></script>`;
  const inline = `<script>\n${content}\n</script>`;
  if (html.includes(tag)) {
    html = html.replace(tag, inline);
    console.log(`✓ Inlined ${file} (${(content.length/1024).toFixed(1)} KB)`);
  } else {
    console.log(`✗ Tag not found: ${tag}`);
  }
}

const outPath = path.join(dir, 'jiashi-exam-standalone.html');
fs.writeFileSync(outPath, html, 'utf-8');
console.log(`\n✅ Standalone file created: ${outPath}`);
console.log(`   Total size: ${(fs.statSync(outPath).size / 1024).toFixed(1)} KB`);
