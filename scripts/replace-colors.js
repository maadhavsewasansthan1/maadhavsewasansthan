#!/usr/bin/env node
/**
 * Color token replacement script for Madhav Sewa Sansthan
 * Replaces old hex color values with new palette across all .ts, .tsx, .css files.
 * Skips: node_modules, .next, .git, scripts
 * Does NOT replace: #F6F0E4 (main background - kept) or #FAF9F5 (logo backing - kept)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Color mapping: old (lowercase) → new
// Order matters: longer/more-specific first to avoid partial matches
const COLOR_MAP = [
  // Dark mode colors
  ['#8db89a', '#6FB7B9'],
  ['#e0a65a', '#F0B457'],
  ['#d47a5b', '#D9785A'],
  ['#1c1a15', '#17201F'],
  ['#26231c', '#1F2B2A'],
  ['#efe7d6', '#F3EAD7'],
  ['#b3a891', '#B9AE97'],
  ['#2e2a22', '#1D2928'],
  // Light mode colors
  ['#2f4f3a', '#1F5F63'],
  ['#223829', '#165257'],
  ['#c4822e', '#E09A2B'],
  ['#a9573a', '#B5522E'],
  ['#fbf7ee', '#FFFBF3'],
  ['#eadfc9', '#EFE3CC'],
  ['#2b2620', '#2A2118'],
  ['#6f6556', '#6B5D4B'],
  ['#d9ccb2', '#DCCBAE'],
  // rgba border in dark mode
  ['rgba(239, 231, 214, 0.12)', 'rgba(243, 234, 215, 0.12)'],
];

// MUST NOT replace these (lowercase)
const PROTECTED = ['#f6f0e4', '#faf9f5'];

const PROJECT_ROOT = path.resolve(__dirname, '..');
const SKIP_DIRS = new Set(['node_modules', '.next', '.git', 'scripts']);
const TARGET_EXTS = new Set(['.ts', '.tsx', '.css']);

let changedFiles = [];
let totalReplacements = 0;

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) {
        walkDir(path.join(dir, entry.name));
      }
    } else if (entry.isFile() && TARGET_EXTS.has(path.extname(entry.name))) {
      processFile(path.join(dir, entry.name));
    }
  }
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  let fileReplacements = 0;

  for (const [oldColor, newColor] of COLOR_MAP) {
    // Case-insensitive replace
    const escaped = oldColor.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escaped, 'gi');
    content = content.replace(regex, (match) => {
      if (PROTECTED.includes(match.toLowerCase())) return match;
      fileReplacements++;
      return newColor;
    });
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    const relPath = path.relative(PROJECT_ROOT, filePath);
    changedFiles.push({ file: relPath, replacements: fileReplacements });
    totalReplacements += fileReplacements;
    console.log(`  ✓ ${relPath} (${fileReplacements} replacements)`);
  }
}

console.log('🎨 Starting color replacement...\n');
walkDir(PROJECT_ROOT);

console.log(`\n✅ Done! Changed ${changedFiles.length} files with ${totalReplacements} total replacements.\n`);
if (changedFiles.length > 0) {
  console.log('Changed files:');
  changedFiles.forEach(({ file, replacements }) => {
    console.log(`  - ${file}: ${replacements} replacements`);
  });
}
