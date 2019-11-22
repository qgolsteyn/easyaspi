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
    generateIncorrectWholeNumberSolutionsWithRemainder,
    generateNumber,
} from './generateNumbers';

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
                    generateNumber(0, problemDefinition.shapes.length)
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
            result = sides[0] * 2;
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
