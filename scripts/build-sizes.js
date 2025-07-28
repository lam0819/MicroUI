#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { gzipSync } from 'zlib';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.join(__dirname, '../dist');
const files = [
  'microui.js',
  'microui.min.js',
  'microui.esm.js'
];

console.log('\n📦 MicroUI Bundle Size Analysis\n');
console.log('='.repeat(50));

const results = {};

files.forEach(file => {
  const filePath = path.join(distPath, file);
  
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath);
    const originalSize = content.length;
    const gzippedSize = gzipSync(content).length;
    
    // Create gzipped file
    const gzipPath = filePath + '.gz';
    fs.writeFileSync(gzipPath, gzipSync(content));
    
    results[file] = {
      original: originalSize,
      gzipped: gzippedSize,
      compression: ((1 - gzippedSize / originalSize) * 100).toFixed(1)
    };
    
    console.log(`${file}:`);
    console.log(`  Original:  ${formatBytes(originalSize)}`);
    console.log(`  Gzipped:   ${formatBytes(gzippedSize)} (${results[file].compression}% smaller)`);
    console.log(`  Saved as:  ${file}.gz`);
    console.log('');
  }
});

// Generate size comparison
console.log('🔍 Library Comparison (Gzipped):');
console.log('-'.repeat(40));
const comparisons = [
  { name: 'MicroUI', size: results['microui.min.js']?.gzipped || 0 },
  { name: 'jQuery 3.7', size: 30720 },  // 30KB
  { name: 'React 18', size: 13312 },    // 13KB  
  { name: 'Vue 3', size: 16384 },       // 16KB
  { name: 'Alpine.js', size: 15360 }    // 15KB
];

comparisons.forEach(lib => {
  const ratio = lib.size === 0 ? 1 : results['microui.min.js']?.gzipped / lib.size;
  const comparison = lib.name === 'MicroUI' ? '' : ` (${(lib.size / results['microui.min.js']?.gzipped).toFixed(1)}x larger)`;
  console.log(`  ${lib.name.padEnd(12)} ${formatBytes(lib.size)}${comparison}`);
});

// Generate size badge data
const minGzipSize = results['microui.min.js']?.gzipped || 0;
const sizeKB = (minGzipSize / 1024).toFixed(1);
const badgeData = {
  schemaVersion: 1,
  label: 'gzipped size',
  message: `${sizeKB}KB`,
  color: minGzipSize < 6144 ? 'brightgreen' : minGzipSize < 10240 ? 'green' : 'yellow'
};

fs.writeFileSync(
  path.join(distPath, 'size-badge.json'), 
  JSON.stringify(badgeData, null, 2)
);

// Generate build report
const report = {
  timestamp: new Date().toISOString(),
  version: process.env.npm_package_version || '1.0.0',
  files: results,
  comparison: comparisons
};

fs.writeFileSync(
  path.join(distPath, 'build-report.json'), 
  JSON.stringify(report, null, 2)
);

console.log(`\n✅ Generated gzipped files and build report`);
console.log(`📊 Size badge data: dist/size-badge.json`);
console.log(`📋 Full report: dist/build-report.json`);

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}
