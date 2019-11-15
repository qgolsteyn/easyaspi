import { IProblem, ProblemArchetype, ProblemType } from '@shared/index';

import { generateVariableValues, IVariableDefinition } from './generate';

const definition: { [key: string]: IVariableDefinition } = {
    addition: {
        controlledVariables: {
            a: { max: 10, min: 2 },
            b: { max: 10, min: 2 },
        },
        derivedVariables: {
            c: 'a + b',
        },
    },
};

export const generateProblem = () => {
    const scope = generateVariableValues(definition.addition);

    const problem: IProblem = {
        problem: `${scope.a} + ${scope.b} = ?`,
        problemArchetype: ProblemArchetype.ARITHMETIC,
        problemType: ProblemType.ADDITION,
        solution: [String(scope.c)],
    };

    return problem;
};