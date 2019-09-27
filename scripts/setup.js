/**
 * This script initializes the repo
 */

const { resolve } = require('path');
const { execSync } = require('child_process');

// Link shared
console.log('Link shared package');
execSync('yarn unlink', {
    cwd: resolve(__dirname, '../shared'),
});
execSync('yarn link', {
    cwd: resolve(__dirname, '../shared'),
});
execSync('yarn link shared', {
    cwd: resolve(__dirname, '../client'),
});

// Build shared
console.log('Build shared');
execSync('yarn build', {
    cwd: resolve(__dirname, '../shared'),
    stdio: [process.stdin, process.stdout, process.stderr],
});

// Get client dependencies
console.log('Get dependencies for client');
execSync('yarn', {
    cwd: resolve(__dirname, '../client'),
    stdio: [process.stdin, process.stdout, process.stderr],
});
