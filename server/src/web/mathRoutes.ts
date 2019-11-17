import express from 'express';

import { ArithmeticProblemTemplateModel } from '@server/database';
import { mathService } from '@server/service';
import { enhanceHandler, HTTP_CODE } from '@server/service/utils/routeEnhancer';

export const initializeMathRoutes = (app: express.Application) => {
    const mathRouter = express.Router();
    app.use('/math', mathRouter);

    mathRouter.get(
        '/nextProblem',
        enhanceHandler({ protect: true })(async () => {
            const problem = await mathService.fetchNextMathProblem();
            return [HTTP_CODE.OK, problem];
        }),
    );

    /* get all templates */
    mathRouter.get(
        '/templates',
        enhanceHandler({ protect: true })(async () => {
            const templates = await ArithmeticProblemTemplateModel.find();
            return [HTTP_CODE.OK, templates];
        }),
    );
};
