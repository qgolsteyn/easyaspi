import {
    GeometryProblemTemplateModel,
    IGeometryProblemDefinition,
} from '@server/database/templates/geometryProblemTemplates';
import {
    IProblem,
    ProblemDifficulty,
    ProblemType,
    GeometricShape,
} from '@shared/models/problem';
import Boom from 'boom';
import {
    generateIncorrectWholeNumberSolutions,
    generateNumber,
} from './generateNumbers';

const NAMES = ['Michael', 'Jim', 'Dwight', 'Pam', 'Holly', 'Angela'];

/**
 * Generates a problem of types Perimeter or Area
 *
 * @param difficulty difficulty tier of the problem type
 * @param problemType problem type generate for
 */
export async function generateGeometryProblem(
    difficulty: ProblemDifficulty,
    problemType: ProblemType,
): Promise<IProblem> {
    // NOTE: expecatation that difficulty and problemType are valiated before this function call
    const template = await GeometryProblemTemplateModel.findOne({
        problemType: problemType.valueOf(),
    });

    if (template) {
        const problemDefinition = template.difficultyMap.get(
            difficulty.valueOf(),
        );

        if (problemDefinition) {
            const shape =
                problemDefinition.shapes[
                    generateNumber(0, problemDefinition.shapes.length - 1)
                ];

            const sides = generateSideLengths(problemDefinition, shape);

            const cost = generateNumber(
                problemDefinition.cost.lowerBound,
                problemDefinition.cost.upperBound,
            );

            const result = computeProblemResult(
                cost,
                problemType,
                shape,
                sides,
            );

            const solution = createSolutionArray(cost, result);

            const incorrectSolutions = createIncorrectSolutions(cost, result);

            const problem = createProblemStatement(cost, shape, sides);

            return {
                incorrectSolutions,
                operands: sides,
                operators: [shape.valueOf()],
                problem,
                problemType,
                solution,
            } as IProblem;
        } else {
            throw Boom.notFound(
                'no problem definition found for:' +
                    problemType.valueOf() +
                    ', ' +
                    difficulty.valueOf(),
            );
        }
    } else {
        throw Boom.notFound('no template found for: ' + problemType.valueOf());
    }
}

function generateSideLengths(
    problemDefinition: IGeometryProblemDefinition,
    shape: GeometricShape,
): number[] {
    let sideLengths;
    if (
        shape === GeometricShape.SQUARE ||
        shape === GeometricShape.EQUILATERAL_TRIANGLE
    ) {
        sideLengths = new Array<number>(1);
    } else {
        // rectangle, right triangle
        sideLengths = new Array<number>(2);
    }

    for (let i = 0; i < sideLengths.length; i++) {
        sideLengths[i] = generateNumber(
            problemDefinition.sides[i].lowerBound,
            problemDefinition.sides[i].upperBound,
        );
    }
    return sideLengths;
}

function computeProblemResult(
    cost: number,
    problemType: ProblemType,
    shape: GeometricShape,
    sides: number[],
): number {
    let result;
    if (problemType === ProblemType.AREA) {
        if (shape === GeometricShape.SQUARE) {
            result = sides[0] * sides[0];
        } else {
            result = sides[0] * sides[1];
        }
    } else {
        // will fill in with perimeter stuff later
        result = 0;
    }
    if (cost !== 0) {
        result *= cost;
    }
    return result;
}

function createSolutionArray(cost: number, result: number): string[] {
    if (cost == 0) {
        return [String(result) + ' square meters'];
    } else {
        return ['$' + String(result)];
    }
}

function createIncorrectSolutions(cost: number, result: number): string[] {
    let incorrectSolutions = generateIncorrectWholeNumberSolutions(result);

    if (cost == 0) {
        for (let i = 0; i < incorrectSolutions.length; i++) {
            incorrectSolutions[i] = incorrectSolutions[i] + ' square meters';
        }
    } else {
        for (let i = 0; i < incorrectSolutions.length; i++) {
            incorrectSolutions[i] = '$' + incorrectSolutions[i];
        }
    }

    return incorrectSolutions;
}

function createProblemStatement(
    cost: number,
    shape: GeometricShape,
    sides: number[],
): string {
    if (cost == 0) {
        if (shape === GeometricShape.SQUARE) {
            return (
                'A square has a side length of ' +
                sides[0] +
                ' meters. What is its area?'
            );
        } else {
            return (
                'A rectangle has side lengths of ' +
                sides[0] +
                ' meters and ' +
                sides[1] +
                ' meters. What is its area?'
            );
        }
    } else {
        const name = NAMES[generateNumber(0, NAMES.length - 1)];

        if (shape === GeometricShape.SQUARE) {
            return (
                name +
                ' needs to replace the grass in their yard. Their yard is a square with a side length of ' +
                sides[0] +
                ' meters. New grass costs $' +
                cost +
                ' per square meter. How much will it cost ' +
                name +
                ' to replace the grass?'
            );
        } else {
            return (
                name +
                ' needs to replace the grass in their yard. Their yard is a rectangle with side lengths of ' +
                sides[0] +
                ' meters and ' +
                sides[1] +
                ' meters. New grass costs $' +
                cost +
                ' per square meter. How much will it cost ' +
                name +
                ' to replace the grass?'
            );
        }
    }
}
