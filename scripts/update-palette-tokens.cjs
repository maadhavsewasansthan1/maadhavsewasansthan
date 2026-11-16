const fs = require('fs');
const path = require('path');

const REPLACEMENTS = [
  // Primary (peacock teal -> indigo)
  [/#1F5F63/gi, '#1F2A5C'],
  [/#165257/gi, '#3D4A8A'],
  [/#6FB7B9/gi, '#A9B6F0'],
  [/#2F4F3A/gi, '#1F2A5C'],
  [/#8DB89A/gi, '#A9B6F0'],

  // Marigold
  [/#E09A2B/gi, '#E39A1E'],
  [/#C4822E/gi, '#E39A1E'],
  [/#F0B457/gi, '#F2B84B'],
  [/#E0A65A/gi, '#F2B84B'],

  // Madder (terracotta)
  [/#B5522E/gi, '#A93A2B'],
  [/#A9573A/gi, '#A93A2B'],
  [/#D9785A/gi, '#E88A76'],
  [/#D47A5B/gi, '#E88A76'],

  // Background & sand
  [/#F6F0E4/gi, '#FBF5EA'],
  [/#17201F/gi, '#121629'],
  [/#1C1A15/gi, '#121629'],
  [/#EFE3CC/gi, '#F2E4C9'],
  [/#EADFC9/gi, '#F2E4C9'],
  [/#1D2928/gi, '#1A2036'],
  [/#2E2A22/gi, '#1A2036'],

  // Surface
  [/#FFFBF3/gi, '#FFFDF8'],
  [/#FBF7EE/gi, '#FFFDF8'],
  [/#1F2B2A/gi, '#1E2640'],
  [/#26231C/gi, '#1E2640'],

  // Ink / Text
  [/#2A2118/gi, '#241B14'],
  [/#2B2620/gi, '#241B14'],
  [/#F3EAD7/gi, '#F6EEDD'],
  [/#EFE7D6/gi, '#F6EEDD'],
  [/#6B5D4B/gi, '#5E4E3F'],
  [/#6F6556/gi, '#5E4E3F'],
  [/#B9AE97/gi, '#B8AE9C'],
  [/#B3A891/gi, '#B8AE9C'],

  // Borders
  [/#DCCBAE/gi, '#E2D2B3'],
  [/#D9CCB2/gi, '#E2D2B3'],
  [/rgba\(239,231,214,([0-9\.]+)\)/gi, 'rgba(226,210,179,$1)'],
  [/rgba\(243,234,215,([0-9\.]+)\)/gi, 'rgba(226,210,179,$1)'],
];

function processDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules', '.next', '.git'].includes(entry.name)) continue;
      processDir(fullPath);
    } else if (/\.(tsx?|css)$/.test(entry.name)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      for (const [pattern, replacement] of REPLACEMENTS) {
        if (pattern.test(content)) {
          content = content.replace(pattern, replacement);
          changed = true;
        }
      }
      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

const root = path.resolve(__dirname, '..');
processDir(path.join(root, 'app'));
processDir(path.join(root, 'components'));
processDir(path.join(root, 'content'));
processDir(path.join(root, 'lib'));
console.log('Finished updating color tokens.');
