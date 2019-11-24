import { areaTemplate } from '../database/mockData';
import { GeometryProblemTemplateModel } from '../database/templates/geometryProblemTemplates';
import {
    ProblemDifficulty,
    ProblemType,
} from '../../../client/src/shared/models/problem';
import { generateGeometryProblem } from '../service/math/generateGeometryProblem';

const mockingoose = require('mockingoose').default;

test('Check if area problems are correctly generated', async () => {
    mockingoose(GeometryProblemTemplateModel).toReturn(areaTemplate, 'findOne');

    const problem = await generateGeometryProblem(
        ProblemDifficulty.G5M,
        ProblemType.AREA,
    );

    expect(problem.problemType).toBe(ProblemType.AREA);
    expect(problem.solution.length).toBe(1);
    expect(problem.incorrectSolutions.length).toBe(3);
    expect(problem.incorrectSolutions).not.toContain(problem.solution[0]);
});

test('Check error message when no template found', async () => {
    mockingoose(GeometryProblemTemplateModel).toReturn(null, 'findOne');

    try {
        await generateGeometryProblem(ProblemDifficulty.G5H, ProblemType.AREA);
    } catch (e) {
        const err = JSON.parse(JSON.stringify(e));
        expect(err.output.payload.message).toEqual(
            'no template found for: area',
        );
    }
});

test('Check error message when no problem definition found', async () => {
    mockingoose(GeometryProblemTemplateModel).toReturn(areaTemplate, 'findOne');

    try {
        await generateGeometryProblem(ProblemDifficulty.G1E, ProblemType.AREA);
    } catch (e) {
        const err = JSON.parse(JSON.stringify(e));
        expect(err.output.payload.message).toEqual(
            'no problem definition found for: area, g1e',
        );
    }
});
