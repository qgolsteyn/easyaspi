import express from 'express';

import { ProblemTemplateModel } from '../database';
import { mathService } from '../service';
import { enhanceHandler, HTTP_CODE } from '../service/utils/routeEnhancer';

export const initializeMathRoutes = (app: express.Application) => {
    const mathRouter = express.Router();
    app.use('/math', mathRouter);

    mathRouter.get(
        '/nextProblem',
        enhanceHandler({ protect: true })(async () => {
            const problem = mathService.generateProblem();
            return [HTTP_CODE.OK, problem];
        }),
    );

    /* get all templates */
    mathRouter.get(
        '/templates',
        enhanceHandler({ protect: true })(async () => {
            const templates = await ProblemTemplateModel.find();
            return [HTTP_CODE.OK, templates];
        }),
    );
};
