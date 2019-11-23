import Boom from 'boom';
import express from 'express';

import { classroomService } from '@server/service';
import { enhanceHandler, HTTP_CODE } from '@server/service/utils/routeEnhancer';

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
        }),
    );

    classroomRouter.put(
        '/', enhanceHandler({ protect: true })(async (req, user) => {

            if(!req.body){
                throw Boom.badRequest('Invalid Classroom Payload');
            }

            if (typeof user === 'undefined'){
                throw Boom.badData('user can not be undefined');
            }

            req.body._id = user.virtualClassroomUid;

            const classroom = await classroomService.updateClassroom(req.body);

            if(classroom){
                return [HTTP_CODE.OK, classroom];
            }
            else {
                throw Boom.internal('Could not update the classroom');
            }
        }),
    );

    classroomRouter.get(
        '/', enhanceHandler({ protect: true })(async (_, user) => {

            if (typeof user === 'undefined'){
                throw Boom.badData('user can not be undefined');
            }

            if(!user.virtualClassroomUid){
                Boom.badData('user must have virtualClassroomUid to get classroom')
            }

            const classroom = await classroomService.getClassroom(String(user.virtualClassroomUid));

            if(classroom){
                return [HTTP_CODE.OK, classroom];
            }
            else {
                throw Boom.notFound();
            }
        }),
    );
};

