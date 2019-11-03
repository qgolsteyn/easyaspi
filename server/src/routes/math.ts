import express from 'express';

import { ProblemTemplateModel } from '@server/database';
import { mathService } from '@server/services';
import { enhanceHandler } from '@server/utils/routeEnhancer';

export const initializeMathRoutes = (app: express.Application) => {
    const mathRouter = express.Router();
    app.use('/math', mathRouter);

    mathRouter.get(
        '/nextProblem',
        enhanceHandler({ protect: true })(async () => {
            const problem = mathService.generateProblem();
            return problem;
        }),
    );

    /* get all templates */
    mathRouter.get(
        '/templates',
        enhanceHandler({ protect: true })(async () => {
            const templates = await ProblemTemplateModel.find();
            return templates;
        }),
    );
};
