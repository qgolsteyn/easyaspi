import { generateNumbers, computeAssignments } from './generateNumbers';

interface IProblemDefinition {
    controlledVariables: { [name: string]: Domain };
    derivedVariables?: { [name: string]: Assignment };
}

interface Domain {
    min: number;
    max: number;
}

type Assignment = string;

export const generateProblemValues = (
    definition: IProblemDefinition,
    seed: string = 'seed'
) => {
    const controlledAssignments = generateNumbers(
        definition.controlledVariables,
        seed
    );
    const derivedAssignments = definition.derivedVariables
        ? computeAssignments(definition.derivedVariables, controlledAssignments)
        : {};

    return { ...controlledAssignments, ...derivedAssignments };
};

const test = generateProblemValues(
    {
        controlledVariables: {
            quotient: {
                min: 3,
                max: 2,
            },
            divisor: {
                min: 1,
                max: 5,
            },
        },
        derivedVariables: {
            dividend: 'quotient * divisor',
        },
    },
    String(Math.random())
);

console.log(`${test['dividend']} / ${test['divisor']} = ${test['quotient']}`);
