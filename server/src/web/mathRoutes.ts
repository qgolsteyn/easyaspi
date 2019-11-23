import Boom from 'boom';
import express from 'express';

import { mathService } from '@server/service';
import { getAllProblemTypes } from '@server/service/nextProblemService';
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

    mathRouter.get(
        '/allProblemTypes',
        enhanceHandler({ protect: true })(async () => {
            const problemTypes = await getAllProblemTypes();
            if (problemTypes) {
                return [HTTP_CODE.OK, problemTypes];
            } else {
                throw Boom.internal();
            }
        }),
    );
};
