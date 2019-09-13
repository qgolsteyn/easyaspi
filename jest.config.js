/**
 * This file specifies the configuration for Jest, our unit testing framework
 */

module.exports = {
    roots: [
        "<rootDir>/client",
        "<rootDir>/server"
    ],
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    }
}
