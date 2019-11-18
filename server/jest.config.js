/**
 * This file specifies the configuration for Jest, our unit testing framework
 */

const path = require('path');
require('dotenv').config({
    path: path.resolve(__dirname, './.env'),
});

module.exports = {
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testEnvironment: 'node',
};

