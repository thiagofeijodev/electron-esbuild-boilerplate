# Main (Electron Backend)

This is the Electron main process for the Icon Font Editor desktop application. It manages the application lifecycle, window creation, and backend logic.

## Features
- Electron-based desktop backend
- TypeScript and Bun for fast builds
- Image asset compilation and packaging
- Electron Builder for cross-platform distribution

## Installation

### Prerequisites
- [Bun](https://bun.sh/) installed globally
- [Node.js](https://nodejs.org/) (for compatibility)
- [Electron](https://www.electronjs.org/) (installed via devDependencies)

### Install dependencies
Navigate to the `main` directory and run:
```sh
bun install
```
This will also run the postinstall script to install Electron app dependencies and compile image assets.

## Development

### Start the Electron main process
```sh
bun run start
```
This will build the backend, wait for the renderer to be available on port 5500, and launch Electron.

### Watch for changes
```sh
bun run watch
```
This will rebuild the backend automatically on file changes.

## Build

To build the Electron backend for production:
```sh
bun run build
```

### Package the Electron app
```sh
bun run electron:build
```
This will create distributable files in the `release/` directory.

## Project Structure
```
main/
├── src/                # Main process source code
│   ├── main.ts         # Electron entry point
│   ├── menu.ts         # App menu setup
│   └── preload.ts      # Preload scripts
├── _config/            # Assets and build scripts
│   ├── assets/         # Icons and images
│   ├── esbuild/        # Build scripts
│   └── scripts/        # Utility scripts
├── esbuild.ts          # Build configuration
├── electron-builder.json # Electron Builder config
├── package.json        # Project scripts and dependencies
├── tsconfig.json       # TypeScript configuration
```

## Troubleshooting
- Ensure Bun is installed and available in your PATH.
- For Electron packaging issues, check `electron-builder.json` and asset paths.
- For image asset issues, check `_config/scripts/img-resizer.ts`.

## License
ISC
