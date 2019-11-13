import { updateMastery } from '@server/service/masteryService';
import { enhanceHandler, HTTP_CODE } from '@server/service/utils/routeEnhancer';
import { convertStringToProblemType, ProblemType } from '@shared/models/problem';
import Boom from 'boom';
import express from 'express';

export const initializeMasteryRoutes = (app: express.Application) => {
    const masteryRouter = express.Router();
    app.use('/mastery', masteryRouter);

    masteryRouter.post(
        '/result',
        enhanceHandler({ protect: true })(async (req, user) => {
            if (user) {
                try {
                    const problemType = convertStringToProblemType(req.body.problemType);
                    if (problemType === ProblemType.UNKNOWN || typeof req.body.isSuccess !== 'boolean') {
                        throw Boom.badRequest('Either problemType or isSuccess is invalid');
                    } else {
                        await updateMastery(user.id, problemType, req.body.isSuccess);
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