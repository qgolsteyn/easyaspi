import Boom from 'boom';
import express from 'express';

import { ClassroomModel } from '@server/database';
import { classroomService } from '@server/service';
import { enhanceHandler, HTTP_CODE } from '@server/service/utils/routeEnhancer';
import { convertStringToProblemType, ProblemType } from '@shared/models/problem';

export const initializeClassroomRoutes = (app: express.Application) => {
    const classroomRouter = express.Router();
    app.use('/classroom', classroomRouter);

    classroomRouter.get(
        '/students',
        enhanceHandler({ protect: true })(async (_, user) => {
            if (user && user.virtualClassroomUid) {
                const students = await classroomService.getStudents(
                    user.virtualClassroomUid,
                );
                return [HTTP_CODE.OK, students];
            } else {
                throw Boom.unauthorized();
            }
        })
    );

    classroomRouter.put(
        '/', enhanceHandler({ protect: true })(async (req, user) => {

            if(!req.body || !req.body.name || !req.body.passcode){
                throw Boom.badRequest('Invalid Payload');
            }

            if(!req.body.problemsForToday && req.body.problemsForToday.length !== 0){
                for(const problemTypeStr of req.body.problemsForToday){
                    const problemType = convertStringToProblemType(problemTypeStr);
                    if (problemType === ProblemType.UNKNOWN){
                        throw Boom.badData(`${problemTypeStr} is not a valid problemType`)
                    }
                }
            }

            if (typeof user === 'undefined'){
                throw Boom.badData('user can not be undefined');
            }

            const classroomId = user.virtualClassroomUid;

            const classroom = await ClassroomModel.findByIdAndUpdate({
                classroomId,
            }, req.body);

            if(!classroom){
                throw Boom.notFound('Could not update the classroom');
            }

            return [HTTP_CODE.OK, classroom];
        }),
    );
};
