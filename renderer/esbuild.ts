import { htmlPlugin } from '@craftamap/esbuild-plugin-html';
import * as esbuild from 'esbuild';
import { detectPort } from 'detect-port';
import esbuildPluginTsc from 'esbuild-plugin-tsc';
import * as fs from 'node:fs';

const PORT = process.env.PORT ? Number(process.env.PORT) : 5500;

const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Icon Font Editor</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
  <div id="root"></div>
</body>
</html>
`.replace(/\n/g, ' ').trim();

const createBuildSettings = (overrides: { entryPoints?: string[] } = {}) => ({
  entryPoints: ['src/index.tsx'],
  outdir: 'dist',
  bundle: true,
  platform: 'browser',
  jsx: 'automatic',
  plugins: [
    esbuildPluginTsc({
      force: true
    }),
    htmlPlugin({
      files: [
        {
          entryPoints: (overrides?.entryPoints as string[]) ?? ['src/index.tsx'],
          filename: 'index.html',
          htmlTemplate
        }
      ]
    }),
  ],
  target: ['chrome112', 'firefox112', 'safari16'],
  sourcemap: true,
  define: {
    'process.env.NODE_ENV': '"development"',
    'process.env.PORT': `"${PORT}"`,
  },
  ...overrides,
});

const IsPortAvailable = async (port: number) => {
  return new Promise((resolve) => {
    return detectPort(port, (_err: unknown, availablePort: number | undefined) => {
      if (port != availablePort) {
        throw new Error(`Port ${port} is not available`);
      }
      resolve(true)
    });
  })
}

async function build() {
  const args = process.argv.slice(2);
  const iswindows = process.platform === 'win32';
  console.log('iswindows', iswindows);

  if (args.includes('--watch')) {
    await IsPortAvailable(PORT);

    const settings = createBuildSettings({
      sourcemap: true,
      banner: {
        js: `new EventSource('/esbuild').addEventListener('change', () => location.reload())`,
      }
    })

    const ctx = await esbuild.context(settings);

    await ctx.watch();

    console.log(`Watching...`);

    const { hosts, port } = await ctx.serve({
      port: PORT,
      servedir: 'dist',
      fallback: 'dist/index.html',
    });
    console.log(`Starting build...`);
    console.log(`Target port: ${port}`);
    hosts.forEach(host => console.log(`App running at http://${host}:${port}`));

    return;
  }

  // PROD BUILD AOT
  const result = await esbuild.build(
    createBuildSettings({
      metafile: true,
      minify: true,
      sourcemap: 'both',
      legalComments: 'none',
      treeShaking: true,
      target: ['es2020', 'chrome112', 'firefox112', 'safari16'],
      format: 'iife',
    })
  );

  if (result.metafile) {
    fs.writeFileSync(
      'dist/meta.json',
      JSON.stringify(result.metafile, null, 2)
    );
  }

  console.log('Build completed successfully');
}

build();
