/**
 * This file specifies the configuration for Jest, our unit testing framework
 */

const path = require('path');
require('dotenv').config({
    path: path.resolve(__dirname, './server/.env'),
});

module.exports = {
    roots: ['<rootDir>/client', '<rootDir>/server'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testEnvironment: 'node',
    moduleNameMapper: {
        '@server/(.*)$': '<rootDir>/server/src/$1',
        '@client/(.*)$': '<rootDir>/client/src/$1',
        '@shared/(.*)$': '<rootDir>/client/src/shared/$1',
    },
};