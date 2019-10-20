import { ProblemTemplateModel, IProblemTemplateSchema } from '../../../database/models/math/problemTemplate';
import { GeneratedProblemsModel, IGeneratedProblemSchema } from '../../../database/models/math/generatedProblem';
import { ArithmeticProblem } from '../../../database/models/math/arithmeticProblem';

const numProbsPerDifficulty = 20;

export async function generateAllProblems() {
    // set to just addition for now
    const templates = await ProblemTemplateModel.find( {problemArchetype: "arithmetic", problemType: "addition"});
    
    let generatedProblems = new Array<IGeneratedProblemSchema>();

    templates.forEach(template => {
        if (template.problemArchetype === "arithmetic") {
            let problems = new Array<ArithmeticProblem>();

            

        }
    });








    return templates;
}