import { ObjectId } from 'bson';
import express from 'express';
import { convertStringToProblemType, ProblemType } from '@shared/models/problem';
import { updateMastery } from '@server/service/masteryService';
import { enhanceHandler, HTTP_CODE } from '@server/service/utils/routeEnhancer';
import Boom from 'boom';

export const initializeMasteryRoutes = (app: express.Application) => {
    const masteryRouter = express.Router();
    app.use('/mastery', masteryRouter);

    masteryRouter.post(
        '/result',
        enhanceHandler({ protect: true })(async (req,_) => {
            const studentId = req.headers["studentid"];
            if (typeof studentId === 'string') {
                try {
                    const problemType = convertStringToProblemType(req.body.problemType);
                    if (problemType === ProblemType.UNKNOWN || typeof req.body.isSuccess !== 'boolean') {
                        throw Boom.badRequest('Either problemType or isSuccess is invalid');
                    } else {
                        await updateMastery(new ObjectId(studentId), problemType, req.body.isSuccess);
                        return [HTTP_CODE.NO_CONTENT, null];
                    }
                } catch (e) {
                    console.error(e);
                    throw Boom.internal();
                }
            } else {
                console.log(studentId);
                throw Boom.badRequest('StudentId invalid');
            }         
        }),
    );
};