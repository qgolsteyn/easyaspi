/**
 * This script initializes the repo
 */

const { resolve } = require('path');
const { execSync } = require('child_process');
const { platform } = require('os');

osType = platform();

let options = {};
if (osType == 'win32') {
    options.shell = true;
}

console.log('Update submodules');
execSync('git submodule update --remote', {
    ...options,
    cwd: resolve(__dirname, '.'),
    stdio: [process.stdin, process.stdout, process.stderr],
});

console.log('Copy secrets');
execSync('yarn setup', {
    ...options,
    cwd: resolve(__dirname, '../secrets'),
    stdio: [process.stdin, process.stdout, process.stderr],
});

// Get server dependencies
console.log('Get dependencies for server');
execSync('yarn', {
    ...options,
    cwd: resolve(__dirname, '../server'),
    stdio: [process.stdin, process.stdout, process.stderr],
});

// Get client dependencies
console.log('Get dependencies for client');
execSync('yarn', {
    ...options,
    cwd: resolve(__dirname, '../client'),
    stdio: [process.stdin, process.stdout, process.stderr],
});
