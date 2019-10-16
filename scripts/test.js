/**
 * Start script for this project
 */

const { resolve } = require('path');
const { execSync, spawn } = require('child_process');

// Build shared
console.log('Build shared');
execSync('yarn build', {
    cwd: resolve(__dirname, '../shared'),
    stdio: [process.stdin, process.stdout, process.stderr],
});

execSync('yarn jest --coverage --detectOpenHandles --forceExit', {
    cwd: resolve(__dirname, '..'),
    stdio: [process.stdin, process.stdout, process.stderr],
});
