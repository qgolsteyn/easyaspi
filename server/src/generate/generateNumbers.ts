/**
 * This file specifies a function to assign a value to variables within their domain
 */

import seedrandom from 'seedrandom';
import * as math from 'mathjs';

interface IRange {
    max: number;
    min: number;
}

type Assignment = string;

/**
 * Generate a random value with a specified domain for each variable passed in the variables parameter
 * @param variables a definition of the variables to assign and their requested domain
 * @param seed
 */
export const generateNumbers = (
    variables: { [name: string]: IRange },
    seed: string = 'seed'
) => {
    seedrandom(seed, { global: true });

    const assignments: { [name: string]: number } = {};
    Object.keys(variables).forEach(key => {
        const { min, max } = variables[key];

        if (min > max) {
            throw new Error(`min cannot be larger than max`);
        }

        assignments[key] = Math.round(min + (max - min) * Math.random());
    });

    return assignments;
};

/**
 * Assigns a value for each specified variable
 * @param variables assignment operation to perform for each variable
 * @param scope values to use for each variable
 */
export const computeAssignments = (
    variables: { [name: string]: Assignment },
    scope: { [name: string]: number }
) => {
    const assignments: { [name: string]: number } = {};
    Object.keys(variables).forEach(key => {
        const assignment = variables[key];
        assignments[key] = math.evaluate(assignment, scope);
    });
    return assignments;
};
