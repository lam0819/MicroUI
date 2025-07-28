# GitHub Actions Setup Guide

This project includes automated GitHub Actions workflows for continuous integration and release automation.

## Workflows Included

### 1. Continuous Integration (`ci.yml`)
- **Trigger**: Push and pull requests to `main` and `develop` branches
- **Actions**: 
  - Tests on Node.js 16.x, 18.x, and 20.x
  - Linting
  - Build verification
- **Purpose**: Ensures code quality on every push/PR

### 2. Build and Release (`build-and-release.yml`)
- **Trigger**: Git tags starting with `v` (e.g., `v1.0.0`)
- **Actions**:
  - Run full test suite
  - Build all library variants
  - Create GitHub release
  - Upload build artifacts
  - Publish to NPM (if configured)

## Setting Up Automated Releases

### Step 1: Push Code to GitHub
```bash
git init
git add .
git commit -m "Initial commit: MicroUI v1.0.0"
git branch -M main
git remote add origin https://github.com/lam0819/microui.git
git push -u origin main
```

### Step 2: Configure NPM Publishing (Optional)
1. Go to your GitHub repository settings
2. Navigate to "Secrets and variables" → "Actions"
3. Add a new secret named `NPM_TOKEN`
4. Get your NPM token from https://www.npmjs.com/settings/tokens
5. Paste the token value

### Step 3: Create a Release
```bash
# Create and push a git tag
git tag v1.0.0
git push origin v1.0.0
```

### What Happens Next
1. GitHub Actions will automatically:
   - Run all tests
   - Build the library
   - Create a GitHub release with downloadable assets
   - Publish to NPM (if token is configured)

## Manual Testing Before Release

Before creating a release tag, always test locally:

```bash
# Run tests
npm test

# Check linting
npm run lint

# Build library
npm run build

# Verify builds
node test-build.mjs
```

## Workflow Files Explanation

### `.github/workflows/ci.yml`
- Runs on every push/PR
- Tests against multiple Node.js versions
- Ensures builds work correctly
- Lightweight and fast

### `.github/workflows/build-and-release.yml`
- Only runs on version tags
- More comprehensive than CI
- Creates actual releases
- Handles NPM publishing

## Release Process Summary

1. **Development**: Work on features, commit changes
2. **Testing**: Ensure all tests pass locally
3. **Version**: Update version in package.json if needed
4. **Tag**: Create a git tag following semver (v1.0.0, v1.1.0, etc.)
5. **Push**: Push the tag to trigger automated release
6. **Verify**: Check GitHub releases and NPM for the new version

## CDN Links After Release

Once released, your library will be available via CDN:

```html
<!-- Latest version -->
<script src="https://unpkg.com/microui@latest/dist/microui.min.js"></script>

<!-- Specific version -->
<script src="https://unpkg.com/microui@1.0.0/dist/microui.min.js"></script>
```

## Troubleshooting

### Build Fails
- Check Node.js version compatibility
- Ensure all dependencies are properly listed
- Verify ES module syntax is correct

### NPM Publish Fails
- Verify NPM_TOKEN secret is set correctly
- Check if package name is available on NPM
- Ensure version number is unique

### Tests Fail in CI
- Run tests locally first
- Check for environment-specific issues
- Review test logs in GitHub Actions tab
