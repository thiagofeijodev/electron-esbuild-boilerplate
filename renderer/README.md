# Renderer

This is the React renderer process for the Icon Font Editor desktop application. It provides the user interface and interacts with the Electron main process.

## Features
- Built with React 19 and TypeScript
- Fast development and build workflow using Bun and esbuild
- HTML generation via esbuild plugins

## Installation

### Prerequisites
- [Bun](https://bun.sh/) installed globally
- [Node.js](https://nodejs.org/) (for compatibility)

### Install dependencies
Navigate to the `renderer` directory and run:
```sh
bun install
```

## Development

### Start the renderer in watch mode
```sh
bun run start
```
This will run `esbuild.ts` in watch mode, rebuilding on file changes.

## Build

To build the renderer for production:
```sh
bun run build
```
This will run `esbuild.ts` and output the bundled files.

## Project Structure
```
renderer/
├── src/           # React source code
│   ├── App.tsx    # Main App component
│   └── index.tsx  # Entry point
├── esbuild.ts     # Build configuration
├── package.json   # Project scripts and dependencies
├── tsconfig.json  # TypeScript configuration
```

## Troubleshooting
- Ensure Bun is installed and available in your PATH.
- For build issues, check `esbuild.ts` and TypeScript configuration.

## License
ISC
