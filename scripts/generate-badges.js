#!/usr/bin/env node

// Generate dynamic size badge for README
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const reportPath = path.join(__dirname, '../dist/build-report.json');

if (fs.existsSync(reportPath)) {
  const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
  const gzipSize = report.files['microui.min.js'].gzipped;
  const sizeKB = (gzipSize / 1024).toFixed(1);
  
  console.log(`\n🎯 Badge URLs for README:\n`);
  console.log(`Gzipped Size: https://img.shields.io/badge/gzipped-${sizeKB}KB-brightgreen.svg`);
  console.log(`Vanilla JS: https://img.shields.io/badge/vanilla-JavaScript-yellow.svg`);
  console.log(`No Dependencies: https://img.shields.io/badge/dependencies-0-success.svg`);
  
  // Generate comparison ratios
  const jqueryRatio = (30720 / gzipSize).toFixed(1);
  const reactRatio = (13312 / gzipSize).toFixed(1);
  
  console.log(`\n📊 Comparison ratios:`);
  console.log(`${jqueryRatio}x smaller than jQuery`);
  console.log(`${reactRatio}x smaller than React`);
  
} else {
  console.log('❌ Build report not found. Run npm run build first.');
}
