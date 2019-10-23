/**
 * Start script for this project
 */

const { resolve } = require('path');
const { execSync } = require('child_process');
const { platform } = require('os');

osType = platform();

let options = {};
if (osType == 'win32') {
    options.shell = true;
}

execSync('yarn jest --coverage --detectOpenHandles --forceExit', {
    ...options,
    cwd: resolve(__dirname, '..'),
    stdio: [process.stdin, process.stdout, process.stderr],
});
