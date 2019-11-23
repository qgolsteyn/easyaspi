import { getStudentStat, updateMastery } from '@server/service/masteryService';
import { enhanceHandler, HTTP_CODE } from '@server/service/utils/routeEnhancer';
import {
    convertStringToProblemType,
    ProblemType,
} from '@shared/models/problem';
import Boom from 'boom';
import express from 'express';

export const initializeMasteryRoutes = (app: express.Application) => {
    const masteryRouter = express.Router();
    app.use('/mastery', masteryRouter);

    masteryRouter.post(
        '/result',
        enhanceHandler({ protect: true })(async (req, user) => {
            if (user) {
                if (user.virtualClassroomUid) {
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
                                user.virtualClassroomUid,
                                user.id,
                                problemType,
                                req.body.isSuccess,
                            );
                            return [HTTP_CODE.NO_CONTENT, null];
                        }
                    } catch (e) {
                        if (Boom.isBoom(e)) {
                            throw e;
                        } else {
                            throw Boom.internal();
                        }
                    }
                } else {
                    throw Boom.internal('User does not belong to a classroom');
                }
            } else {
                throw Boom.internal('User is undefined');
            }
        }),
    );

    masteryRouter.get(
        '/stats',
        enhanceHandler({ protect: true })(async (_, user) => {
            if(!user){
                throw Boom.internal('User is undefined');
            }

            if(user.userType !== 'student'){
                throw Boom.badRequest('Can not get stat of a teacher');
            }

            const stat = await getStudentStat(user.id);

            if(stat){
                return [HTTP_CODE.OK, stat];
            }
            else {
                throw Boom.internal(`Could not get stat for student with id ${user.id}`);
            }
        }),
    );
};
