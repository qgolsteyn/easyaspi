import Boom from 'boom';
import express from 'express';

import { classroomService, userService } from '@server/services';
import { enhanceHandler } from '@server/utils/routeEnhancer';

import { IClassroom, IUser, UserType } from '@shared/index';

export const initializeUsersRoutes = (app: express.Application) => {
    const usersRouter = express.Router();
    app.use('/user', usersRouter);

    usersRouter.post(
        '/register',
        enhanceHandler({ protect: true })(async req => {
            const { classroom, user } = req.body as {
                classroom: IClassroom;
                user: IUser;
            };

            if (!user || !classroom) {
                throw Boom.badRequest('Invalid parameters');
            }

            switch (user.userType) {
                case UserType.STUDENT:
                    {
                        await classroomService.authenticateToClassroom(
                            classroom
                        );
                    }
                    break;
                case UserType.TEACHER:
                    {
                        await classroomService.createClassroom(classroom);
                    }
                    break;
                default:
                    throw Boom.badRequest('Invalid userType');
            }

            user.virtualClassroomUid = classroom.name;

            await userService.updateUser(user);

            return { user };
        })
    );
};
