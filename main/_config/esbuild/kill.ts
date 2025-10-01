import { ChildProcess, spawn } from 'child_process';

export function kill(electronProcess: ChildProcess, iswindows: boolean): Promise<void> | void {
  if (electronProcess) {
    if (iswindows && electronProcess?.pid) {
      spawn("taskkill", ["/pid", electronProcess.pid.toString(), '/f', '/t']);
    } else {
      const pid = electronProcess.pid;
      const killed = electronProcess.killed;

      if (pid !== undefined && !killed) {
        process.kill(pid);
      }
    }

    const waitForExitCode = () => {
      return new Promise<void>((resolve, reject) => {
        const timeout = 50;
        const limit = 10000;
        let timeWasted = 0;
        setTimeout(() => {
          if (electronProcess.exitCode !== null) {
            if (timeWasted >= limit) {
              reject('timeout')
            } else {
              waitForExitCode().then(resolve);
            }
            timeWasted += timeout;
          } else {
            resolve();
          }
        }, timeout)
      });
    };

    return waitForExitCode();
  }
}