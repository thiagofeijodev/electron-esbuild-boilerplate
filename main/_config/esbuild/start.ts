import { exec } from 'child_process';

export function start(dispose: () => void, ignoreExit = false) {
  const child = exec('bun run electron .', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    if (stdout) console.log(`stdout: ${stdout}`);
    if (stderr) console.error(`stderr: ${stderr}`);
  });

  child.on('exit', async () => {
    if (!ignoreExit) {
      await dispose();
      process.exit();
    }
  });

  return child
}
