/**
 * Start script for this project
 */

const { resolve } = require('path');
const { execSync, spawn } = require('child_process');

const what = process.argv[2];

// Build shared
console.log('Build shared');
execSync('yarn build', {
    cwd: resolve(__dirname, '../shared'),
    stdio: [process.stdin, process.stdout, process.stderr],
});

if (what === undefined || what === 'client') {
    spawn('yarn', ['expo', 'start'], {
        cwd: resolve(__dirname, '../client'),
        stdio: [process.stdin, process.stdout, process.stderr],
    });
}

if (what === undefined || what === 'server') {
    spawn('yarn', ['webpack', '--watch'], {
        cwd: resolve(__dirname, '../server'),
        stdio: [process.stdin, process.stdout, process.stderr],
    });
}
