import Boom from 'boom';
import express from 'express';
import {
    convertStringToProblemType,
    ProblemType,
} from '../../../client/src/shared/models/problem';
import { updateMastery } from '../service/masteryService';
import { enhanceHandler, HTTP_CODE } from '../service/utils/routeEnhancer';

export const initializeMasteryRoutes = (app: express.Application) => {
    const masteryRouter = express.Router();
    app.use('/mastery', masteryRouter);

    masteryRouter.post(
        '/result',
        enhanceHandler({ protect: true })(async (req, user) => {
            if (user) {
                try {
                    const problemType = convertStringToProblemType(
                        req.body.problemType,
                    );
                    if (
                        problemType === ProblemType.UNKNOWN ||
                        typeof req.body.isSuccess !== 'boolean'
                    ) {
                        throw Boom.badRequest(
                            'Either problemType or isSuccess is invalid',
                        );
                    } else {
                        await updateMastery(
                            user.id,
                            problemType,
                            req.body.isSuccess,
                        );
                        return [HTTP_CODE.NO_CONTENT, null];
                    }
                } catch (e) {
                    throw Boom.internal();
                }
            } else {
                throw Boom.internal('User is undefined');
            }
        }),
    );
};
