# Electron Boilerplate

**Electron Boilerplate** is a starter template for building modern desktop applications using Electron, Bun, and React. Its purpose is to provide a fast, efficient, and cross-platform foundation for projects like Icon Font Editor, enabling developers to focus on features and user experience rather than setup and configuration.

## Features
- Create and edit icon fonts visually
- Export fonts for web and desktop use
- Multi-platform support (macOS, Windows, Linux)
- Fast build and development workflow using Bun
- Electron-based desktop experience
- Modern ESLint configuration with flat config
- TypeScript support throughout the project
- React 19 with modern hooks and patterns

## Installation

### Prerequisites
- [Bun](https://bun.sh/) installed globally
- [Node.js](https://nodejs.org/) (for npm-run-all)

### Clone the repository
```sh
git clone https://github.com/thiagofeijodev/electron-esbuild-boilerplate.git
cd electron-esbuild-boilerplate
```

### Install dependencies
This project uses Bun for both `main` and `renderer` packages:
```sh
bun install
```
This will run the postinstall script and install dependencies for both subprojects.

## Development

### Start the app in development mode
```sh
bun run start
```
This will start both the Electron main process and the React renderer in parallel.

### Watch for changes
```sh
bun run watch
```
This will watch for changes in the main process and restart as needed.

## Build

To build the application for production:
```sh
bun run build
```
This will build both the renderer and main processes, and package the Electron app.

## Code Quality

### ESLint Configuration

This project uses **ESLint with flat config** for modern, efficient linting across the entire monorepo.

#### Available Lint Commands
```sh
# Lint entire project
bun run lint

# Auto-fix linting issues
bun run lint:fix

# Lint only main process
bun run lint:main

# Lint only renderer process
bun run lint:renderer
```

#### ESLint Features
- **Centralized Configuration**: Single `eslint.config.js` at root level
- **Monorepo Support**: Different rules for main process, renderer, and build scripts
- **TypeScript Integration**: Full TypeScript support with `@typescript-eslint`
- **React Support**: Modern React rules for renderer process
- **Electron Optimized**: Proper globals and rules for Electron main/renderer processes
- **File-specific Overrides**: Custom rules for specific files (e.g., preload scripts)

#### Configuration Structure
- **Base Rules**: JavaScript and TypeScript fundamentals
- **Main Process**: Node.js globals, allows `require()`, console statements
- **Renderer Process**: React rules, browser globals, JSX support
- **Build Scripts**: Relaxed rules for configuration files
- **Custom Overrides**: File-specific rule modifications

### GitHub Actions CI/CD

This project includes GitHub Actions workflows for automated code quality checks:

#### Workflows
- **`.github/workflows/lint.yml`**: Runs ESLint on every commit and PR
- **`.github/workflows/ci.yml`**: Comprehensive CI pipeline with linting, building, and cross-platform testing

#### Features
- **Automated Linting**: ESLint runs on every push and pull request
- **Cross-platform Testing**: Tests on Ubuntu, Windows, and macOS
- **Dependency Caching**: Fast builds with Bun dependency caching
- **Build Verification**: Ensures the project builds successfully on all platforms
- **Artifact Upload**: Build artifacts are saved for successful builds

#### Workflow Triggers
- Push to `main` or `develop` branches
- Pull requests targeting `main` or `develop` branches

## Project Structure
```
electron-esbuild-boilerplate/
├── main/           # Electron main process
│   ├── src/        # Main process source code
│   ├── _config/    # Build configuration
│   └── dist/       # Compiled main process
├── renderer/       # React renderer process
│   ├── src/        # React application source
│   └── dist/       # Compiled renderer
├── release/        # Build outputs and packages
├── .github/        # GitHub Actions workflows
│   └── workflows/  # CI/CD pipeline definitions
├── eslint.config.js # ESLint configuration
└── package.json    # Root scripts and dependencies
```

## Troubleshooting

### Development Issues
- Ensure Bun is installed and available in your PATH.
- For issues with Electron packaging, check `main/electron-builder.json`.

### ESLint Issues
- If you encounter ESLint errors, run `bun run lint:fix` to auto-fix issues.
- For file-specific rule overrides, check the `eslint.config.js` file.
- The configuration uses flat config format (ESLint 9+), which is the modern approach.

## License
MIT
