import chokidar from 'chokidar';
import debounce from 'debounce-fn';
import * as esbuild from 'esbuild';
import { ChildProcess } from 'node:child_process';
import nodeModule from 'node:module';
import path from 'node:path';
import { kill } from './_config/esbuild/kill';
import { start } from './_config/esbuild/start';

(async () => {
  const args = process.argv.slice(2);
  const outfileMain = 'dist/main.cjs';
  const outfilePreload = 'dist/preload.cjs';

  const iswindows = process.platform === 'win32';
  let ignoreExit = false;

  const mainContext = await esbuild.context({
    entryPoints: ['src/main.ts'],
    bundle: true,
    platform: "node",
    target: ['node20.10'],
    sourcemap: true,
    external: ['electron', ...nodeModule.builtinModules],
    outfile: outfileMain,
  });

  const preloadContext = await esbuild.context({
    entryPoints: ['src/preload.ts'],
    bundle: true,
    platform: 'node',
    target: ['node20.10'],
    sourcemap: true,
    external: ['electron', ...nodeModule.builtinModules],
    outfile: outfilePreload,
  });

  if (args.includes('--watch')) {
    const sources = path.join(path.resolve(path.dirname('dist')), "**", '*{js.ts.tsx}');
    const watcher = chokidar.watch([sources]);

    let electronProcess: ChildProcess;

    watcher.on('ready', async () => {
      await mainContext.watch();
      await preloadContext.watch();

      const dispose = async () => {
        await watcher.close();
        await mainContext.dispose();
        await preloadContext. dispose();
      };

      watcher.on(
        'all',
        debounce(
          async () => {
            ignoreExit = true;
            if (electronProcess) {
              await kill(electronProcess, iswindows);
            }
            ignoreExit = false;
            electronProcess = start(dispose, ignoreExit);
          },
          { wait: 200},
        )
      );
    });

    process.on('exit', async () => {
      kill(electronProcess, iswindows);
    });
  } else {
    await mainContext.rebuild();
    await preloadContext.rebuild();
    await mainContext.dispose();
    await preloadContext.dispose();
  }
})();