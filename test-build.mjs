#!/usr/bin/env node

// Simple test script to verify the library builds work correctly
import fs from 'fs';
import path from 'path';

console.log('🧪 Testing MicroUI builds...\n');

const distDir = path.join(process.cwd(), 'dist');
const requiredFiles = ['microui.js', 'microui.min.js', 'microui.esm.js'];

// Check if all build files exist
console.log('📁 Checking build files:');
for (const file of requiredFiles) {
  const filePath = path.join(distDir, file);
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    console.log(`✅ ${file} - ${sizeKB}KB`);
  } else {
    console.log(`❌ ${file} - Missing!`);
    process.exit(1);
  }
}

// Try to load the UMD build in Node.js environment
console.log('\n🔄 Testing UMD build:');
try {
  const umdContent = fs.readFileSync(path.join(distDir, 'microui.js'), 'utf8');
  
  // Check if it contains the expected structure
  if (umdContent.includes('MicroUI')) {
    console.log('✅ UMD build contains MicroUI global');
  } else {
    console.log('❌ UMD build missing MicroUI global');
    process.exit(1);
  }
  
  if (umdContent.includes('version: \'1.0.0\'')) {
    console.log('✅ Version information present');
  } else {
    console.log('❌ Version information missing');
    process.exit(1);
  }
  
  // Check for main API methods
  const expectedMethods = ['ready', 'on', 'off', 'get', 'post', 'fadeIn', 'fadeOut'];
  for (const method of expectedMethods) {
    if (umdContent.includes(method)) {
      console.log(`✅ ${method} method found`);
    } else {
      console.log(`❌ ${method} method missing`);
      process.exit(1);
    }
  }
  
} catch (error) {
  console.log('❌ Error testing UMD build:', error.message);
  process.exit(1);
}

// Check minified version
console.log('\n⚡ Testing minified build:');
try {
  const minContent = fs.readFileSync(path.join(distDir, 'microui.min.js'), 'utf8');
  
  if (minContent.length < 15000) { // Should be smaller than unminified
    console.log('✅ Minified version is properly compressed');
  } else {
    console.log('❌ Minified version seems too large');
    process.exit(1);
  }
  
  if (minContent.includes('MicroUI')) {
    console.log('✅ Minified build contains MicroUI global');
  } else {
    console.log('❌ Minified build missing MicroUI global');
    process.exit(1);
  }
  
} catch (error) {
  console.log('❌ Error testing minified build:', error.message);
  process.exit(1);
}

console.log('\n🎉 All tests passed! MicroUI library is ready for use.');
console.log('\n📖 Next steps:');
console.log('1. Test the examples/basic.html file in a browser');
console.log('2. Create a git repository and commit your code');
console.log('3. Create a GitHub repository and push the code');
console.log('4. Create a tag (e.g., v1.0.0) to trigger the GitHub Actions build');
console.log('5. Publish to NPM if desired');
