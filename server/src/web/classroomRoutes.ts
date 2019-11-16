import Boom from 'boom';
import express from 'express';

import { classroomService } from '@server/service';
import { enhanceHandler, HTTP_CODE } from '@server/service/utils/routeEnhancer';

export const initializeClassroomRoutes = (app: express.Application) => {
    const mathRouter = express.Router();
    app.use('/classroom', mathRouter);

    mathRouter.get(
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
};
