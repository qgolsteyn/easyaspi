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

export const generateNumbers = (
    variables: { [name: string]: IRange },
    seed: string = 'seed'
) => {
    seedrandom(seed, { global: true });

    const assignments: { [name: string]: number } = {};
    Object.keys(variables).forEach(key => {
        const { min, max } = variables[key];
        assignments[key] = Math.round(min + (max - min) * Math.random());
    });

    return assignments;
};

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
