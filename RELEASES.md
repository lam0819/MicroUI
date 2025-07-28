# Release Process

## Automated Releases

MicroUI uses GitHub Actions to automatically create releases when version tags are pushed.

### How to Create a Release

1. **Update version in package.json**:
   ```bash
   npm version patch  # For bug fixes (1.0.0 → 1.0.1)
   npm version minor  # For new features (1.0.0 → 1.1.0)
   npm version major  # For breaking changes (1.0.0 → 2.0.0)
   ```

2. **Push the tag**:
   ```bash
   git push origin master --tags
   ```

3. **GitHub Actions will automatically**:
   - Run tests
   - Build all distribution files
   - Create release with generated notes
   - Upload built assets
   - Calculate bundle sizes

### Release Assets

Each release includes:
- `microui.js` - Development build with source maps
- `microui.min.js` - Production build, minified
- `microui.esm.js` - ES modules build
- `microui-vX.X.X.zip` - Complete package with docs

### Manual Release (if needed)

If you need to create a release manually:

1. **Build the library**:
   ```bash
   npm run build
   ```

2. **Create a tag**:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

3. **Go to GitHub → Releases → Create a new release**

### NPM Publishing

To publish to NPM, uncomment the NPM publish step in `.github/workflows/release.yml` and add your NPM token to GitHub secrets:

1. **Get NPM token**:
   ```bash
   npm adduser
   npm token create
   ```

2. **Add to GitHub secrets**:
   - Go to repo Settings → Secrets → Actions
   - Add `NPM_TOKEN` with your token

3. **Uncomment lines in release.yml**:
   ```yaml
   - name: Publish to NPM
     run: npm publish
     env:
       NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
   ```

### Release Notes

Release notes are automatically generated and include:
- Version number
- Asset sizes and bundle analysis
- Installation instructions
- Links to documentation and examples
- CDN usage examples

### Version Strategy

MicroUI follows [Semantic Versioning](https://semver.org/):
- **PATCH** (1.0.1): Bug fixes
- **MINOR** (1.1.0): New features, backward compatible
- **MAJOR** (2.0.0): Breaking changes
