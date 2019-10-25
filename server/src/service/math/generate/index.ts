import { computeAssignments, generateNumbers } from './generateNumbers';

interface IProblemDefinition {
    controlledVariables: { [name: string]: IDomain };
    derivedVariables?: { [name: string]: Assignment };
}

interface IDomain {
    min: number;
    max: number;
}

type Assignment = string;

/**
 * Algorithm used to generate a random set of values for a set of specified variables. Variables can be split into two
 * categories: controlled and derived variables.
 *
 * Controlled variables are specified by their requested domain, and the algorithm picks a random value within the specified
 * domain
 *
 * Derived variables are specified by an equation using controlled variables, and the algorithm calculates the derived
 * variable's value using the value of the controlled variables.
 *
 * @param definition specifies the controlled and derived variables the algorithm needs to generate values for
 * @param seed
 */
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
