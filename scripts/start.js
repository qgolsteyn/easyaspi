/**
 * Start script for this project
 */

const { resolve } = require('path');
const { spawn, execSync } = require('child_process');
const { platform } = require('os');

osType = platform();

let options = {};
if (osType == 'win32') {
    options.shell = true;
}

const what = process.argv[2];

console.log('Copy secrets');
execSync('yarn setup', {
    ...options,
    cwd: resolve(__dirname, '../secrets'),
    stdio: [process.stdin, process.stdout, process.stderr],
});

if (what === undefined || what === 'client') {
    spawn('yarn', ['expo', 'start'], {
        ...options,
        cwd: resolve(__dirname, '../client'),
        stdio: [process.stdin, process.stdout, process.stderr],
    });
}

if (what === undefined || what === 'server') {
    spawn('yarn', ['webpack', '--watch'], {
        ...options,
        cwd: resolve(__dirname, '../server'),
        stdio: [process.stdin, process.stdout, process.stderr],
    });
}
