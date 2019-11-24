import { additionTemplate, user1 } from '../database/mockData';
import { ArithmeticProblemTemplateModel } from '../database/templates/arithmeticProblemTemplate';
import { ProblemType } from '../../../client/src/shared/models/problem';
import { fetchNextMathProblem } from '../service/math/mathService';

const mockingoose = require('mockingoose').default;

beforeAll(() => {
    const mockMath = Object.create(global.Math);
    mockMath.random = () => 0.0;
    global.Math = mockMath;
});

test('Check if addition problems are correctly generated', async () => {
    mockingoose(ArithmeticProblemTemplateModel).toReturn(
        additionTemplate,
        'findOne',
    );

    const problem = await fetchNextMathProblem(user1);

    expect(problem.problemType).toBe(ProblemType.ADDITION);
    expect(problem.operands.length).toBe(2);
    expect(problem.operators).toContain('+');
    expect(problem.solution.length).toBe(1);
    expect(problem.incorrectSolutions.length).toBe(3);
    expect(problem.incorrectSolutions).not.toContain(problem.solution[0]);
});
