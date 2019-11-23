import {
    getStatisticsForStudent,
    getStatisticsForStudentsInClassroom,
    updateMastery,
} from '@server/service/masteryService';
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
        '/student/statistics',
        enhanceHandler({ protect: true })(async (_, user) => {
            if (user) {
                const stats = await getStatisticsForStudent(user.id);
                return [HTTP_CODE.OK, stats];
            } else {
                throw Boom.internal('User is undefined');
            }
        }),
    );

    masteryRouter.get(
        '/classroom/statistics',
        enhanceHandler({ protect: true })(async (_, user) => {
            if (user) {
                if (user.virtualClassroomUid) {
                    const allStats = await getStatisticsForStudentsInClassroom(
                        user.virtualClassroomUid,
                    );
                    return [HTTP_CODE.OK, allStats];
                } else {
                    throw Boom.internal('User does not belong to a classroom');
                }
            } else {
                throw Boom.internal('User is undefined');
            }
        }),
    );
};
