# Quick Release Guide

## Creating a GitHub Release

### Method 1: Command Line (Recommended)

```bash
# Update version and create tag
npm version patch  # 1.0.0 → 1.0.1 (bug fixes)
npm version minor  # 1.0.0 → 1.1.0 (new features)  
npm version major  # 1.0.0 → 2.0.0 (breaking changes)

# Push tag to trigger release
git push origin master --tags
```

### Method 2: GitHub Web Interface

1. Go to your repository → **Releases** → **Create a new release**
2. Click **Choose a tag** → Type `v1.0.1` → **Create new tag**
3. Set **Release title**: `MicroUI v1.0.1`
4. The GitHub Action will automatically:
   - Build all JS files
   - Attach them to the release
   - Generate release notes
   - Publish to NPM (if configured)

## What Happens Automatically

When you create a tag (`v*`), the release workflow:

✅ **Builds all distribution files:**
- `microui.js` (development build)
- `microui.min.js` (production build - 18.6KB)
- `microui.esm.js` (ES modules build)

✅ **Creates professional release notes:**
- Bundle size analysis
- Installation instructions
- CDN usage examples
- Links to documentation and examples

✅ **Uploads all files as release assets**

✅ **Publishes to NPM** (if `NPM_TOKEN` is configured)

## Examples Available

Your GitHub Pages now includes a comprehensive examples showcase:

- **Main Examples Page**: https://lam0819.github.io/MicroUI/examples/
- **Basic Examples**: https://lam0819.github.io/MicroUI/examples/basic.html
- **Advanced Examples**: https://lam0819.github.io/MicroUI/examples/advanced.html
- **Test Playground**: https://lam0819.github.io/MicroUI/examples/test.html

## Release Assets

Each release includes these downloadable files:
- Development build with source maps
- Production minified build (perfect for CDN)
- ES modules build (for modern bundlers)

Users can download directly from GitHub or use CDN:
```html
<script src="https://unpkg.com/microui@1.0.0/dist/microui.min.js"></script>
```

## Ready to Release?

Your setup is complete! Just run:
```bash
npm version patch && git push origin master --tags
```
