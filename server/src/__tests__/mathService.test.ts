import {
    additionTemplate,
    classroomDoc6,
    masteryDoc3,
    user6,
} from '../database/mockData';
import { ArithmeticProblemTemplateModel } from '../database/templates/arithmeticProblemTemplate';
import { ProblemType } from '../../../client/src/shared/models/problem';
import { fetchNextMathProblem } from '../service/math/mathService';
import { MasteryModel, ClassroomModel } from '@server/database';

const mockingoose = require('mockingoose').default;

beforeAll(() => {
    const mockMath = Object.create(global.Math);
    mockMath.random = () => 0.0;
    global.Math = mockMath;
});

test('Check if addition problems are correctly generated', async () => {
    mockingoose(MasteryModel).toReturn(masteryDoc3, 'findOne');
    mockingoose(ClassroomModel).toReturn(classroomDoc6, 'findOne');

    mockingoose(ArithmeticProblemTemplateModel).toReturn(
        additionTemplate,
        'findOne',
    );

    const problem = await fetchNextMathProblem(user6);

    expect(problem.problemType).toBe(ProblemType.ADDITION);
    expect(problem.operands.length).toBe(2);
    expect(problem.operators).toContain('+');
    expect(problem.solution.length).toBe(1);
    expect(problem.incorrectSolutions.length).toBe(3);
    expect(problem.incorrectSolutions).not.toContain(problem.solution[0]);
});
