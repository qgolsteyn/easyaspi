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
