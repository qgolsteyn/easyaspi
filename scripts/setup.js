/**
 * This script initializes the repo
 */

const { resolve } = require('path');
const { execSync } = require('child_process');
const { platform } = require('os');
const fs = require('fs');

osType = platform();

let options = {};
if (osType == 'win32') {
    options.shell = true;
}

const move = (file, dest) => {
    fs.copyFile(resolve(__dirname, file), resolve(__dirname, dest), err => {
        if (err) throw err;
        console.log(`${file} was moved to destination`);
    });
};

try {
    console.log('Update submodules');
    execSync('git submodule update --remote', {
        ...options,
        cwd: resolve(__dirname, '.'),
        stdio: [process.stdin, process.stdout, process.stderr],
    });
} catch (e) {
    console.warn('Unable to update submodule');
}

console.log('Copy secrets');
execSync('yarn setup', {
    ...options,
    cwd: resolve(__dirname, '../secrets'),
    stdio: [process.stdin, process.stdout, process.stderr],
});

console.log('Copy app.yaml');
move('../server/app.yaml', '../server/dist/app.yaml');

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
