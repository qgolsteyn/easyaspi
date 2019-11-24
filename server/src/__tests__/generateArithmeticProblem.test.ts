import { additionTemplate, subtractionTemplate } from '../database/mockData';
import { ArithmeticProblemTemplateModel } from '../database/templates/arithmeticProblemTemplate';
import {
    ProblemDifficulty,
    ProblemType,
} from '../../../client/src/shared/models/problem';
import { generateArithmeticProblem } from '../service/math/generateArithmeticProblem';

const mockingoose = require('mockingoose').default;

test('Check if addition problems are correctly generated', async () => {
    mockingoose(ArithmeticProblemTemplateModel).toReturn(
        additionTemplate,
        'findOne',
    );

    const problem = await generateArithmeticProblem(
        ProblemDifficulty.G1E,
        ProblemType.ADDITION,
    );

    expect(problem.problemType).toBe(ProblemType.ADDITION);
    expect(problem.operands.length).toBe(2);
    expect(problem.operators).toContain('+');
    expect(problem.solution.length).toBe(1);
    expect(problem.incorrectSolutions.length).toBe(3);
    expect(problem.incorrectSolutions).not.toContain(problem.solution[0]);
});

test('Check if subtraction problems are correctly generated', async () => {
    mockingoose(ArithmeticProblemTemplateModel).toReturn(
        subtractionTemplate,
        'findOne',
    );

    const problem = await generateArithmeticProblem(
        ProblemDifficulty.G1M,
        ProblemType.SUBTRACTION,
    );

    expect(problem.problemType).toBe(ProblemType.SUBTRACTION);
    expect(problem.operands.length).toBe(2);
    expect(problem.operators).toContain('-');
    expect(problem.solution.length).toBe(1);
    expect(problem.incorrectSolutions.length).toBe(3);
    expect(problem.incorrectSolutions).not.toContain(problem.solution[0]);
});

test('Check error message when no template found', async () => {
    mockingoose(ArithmeticProblemTemplateModel).toReturn(null, 'findOne');

    try {
        await generateArithmeticProblem(
            ProblemDifficulty.G1M,
            ProblemType.SUBTRACTION,
        );
    } catch (e) {
        const err = JSON.parse(JSON.stringify(e));
        expect(err.output.payload.message).toEqual(
            'no template found for: subtraction',
        );
    }
});

test('Check error message when no problem definition found', async () => {
    mockingoose(ArithmeticProblemTemplateModel).toReturn(
        subtractionTemplate,
        'findOne',
    );

    try {
        await generateArithmeticProblem(
            ProblemDifficulty.G5H,
            ProblemType.SUBTRACTION,
        );
    } catch (e) {
        const err = JSON.parse(JSON.stringify(e));
        expect(err.output.payload.message).toEqual(
            'no problem definition found for: subtraction, g5h',
        );
    }
});
