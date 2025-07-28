# MicroUI Release Process

## 🚀 How to Create a Release

### Prerequisites

1. **NPM Token**: Add your NPM authentication token to GitHub repository secrets
   - Go to Repository → Settings → Secrets and variables → Actions
   - Add new secret: `NPM_TOKEN` with your NPM authentication token
   - Get token from: https://www.npmjs.com/settings/tokens

### Release Steps

1. **Update Version**: Update the version in `package.json`
   ```bash
   npm version patch   # For bug fixes (1.0.0 → 1.0.1)
   npm version minor   # For new features (1.0.0 → 1.1.0)  
   npm version major   # For breaking changes (1.0.0 → 2.0.0)
   ```

2. **Push Changes**: Commit and push the version bump
   ```bash
   git add package.json package-lock.json
   git commit -m "chore: bump version to v1.0.1"
   git push origin master
   ```

3. **Create and Push Tag**: Create a git tag that matches the package.json version
   ```bash
   git tag v1.0.1
   git push origin v1.0.1
   ```

4. **Automatic Release**: The GitHub Action will automatically:
   - Run tests
   - Build the library
   - Create GitHub release with assets
   - Publish to NPM registry

### Manual Release (if needed)

If the automated release fails, you can manually publish:

```bash
# Build the library
npm run build

# Publish to NPM (requires login)
npm publish

# Create GitHub release manually via GitHub web interface
```

## 🔧 Troubleshooting

### NPM Authentication Error
```
npm error code ENEEDAUTH
npm error need auth This command requires you to be logged in
```

**Solution**: Add `NPM_TOKEN` to GitHub repository secrets.

### Version Mismatch Error
```
npm error 403 Forbidden - PUT https://registry.npmjs.org/microui
```

**Solution**: Make sure the git tag version matches package.json version exactly.

### Shell Script Error
```
bad substitution
```

**Solution**: This is fixed in the latest workflow file. Make sure you're using the updated `.github/workflows/release.yml`.

## 📋 Release Checklist

- [ ] Tests pass locally (`npm test`)
- [ ] Build works (`npm run build`)
- [ ] Version updated in `package.json`
- [ ] Changes documented in `RELEASES.md`
- [ ] Git tag matches package.json version
- [ ] NPM_TOKEN secret is configured
- [ ] GitHub release created automatically
- [ ] NPM package published successfully

## 🏷️ Versioning Strategy

We follow [Semantic Versioning](https://semver.org/):

- **Major** (x.0.0): Breaking changes
- **Minor** (1.x.0): New features, backward compatible
- **Patch** (1.0.x): Bug fixes, backward compatible

## 📦 What Gets Published

### NPM Package
- Source code (`src/`)
- Built files (`dist/`)
- Documentation (`README.md`, `LICENSE`)
- Package metadata (`package.json`)

### GitHub Release
- `microui.js` - Development build
- `microui.min.js` - Production build  
- `microui.esm.js` - ES modules build
- `microui-vX.X.X.zip` - Complete package archive
- Auto-generated release notes
- Bundle size analysis
