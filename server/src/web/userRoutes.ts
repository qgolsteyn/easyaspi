import Boom from 'boom';
import express from 'express';

import { ClassroomModel } from '@server/database';
import { authService, classroomService, userService } from '@server/service';
import { enhanceHandler, HTTP_CODE } from '@server/service/utils/routeEnhancer';

import { IClassroom, IUser, UserType } from '@shared/index';

export const initializeUsersRoutes = (app: express.Application) => {
    const usersRouter = express.Router();
    app.use('/user', usersRouter);

    /**
     * Get current user
     */
    usersRouter.get(
        '/current',
        enhanceHandler({ protect: true })(async (_, user) => {
            if (user) {
                return [HTTP_CODE.OK, user];
            } else {
                throw Boom.internal('User should not be undefined');
            }
        }),
    );

    /**
     * Register user. Creates a classroom if necessary.
     */
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

            let classroomId;
            switch (user.userType) {
                case UserType.STUDENT:
                    {
                        classroomId = await classroomService.authenticateToClassroom(
                            classroom,
                        );
                    }
                    break;
                case UserType.TEACHER:
                    {
                        const newClassroom = await classroomService.createClassroom(
                            classroom,
                        );
                        classroomId = newClassroom.id;
                    }
                    break;
                default:
                    throw Boom.badRequest('Invalid userType');
            }

            user.virtualClassroomUid = classroomId;

            try {
                await userService.updateUser(user);
            } catch (e) {
                ClassroomModel.findByIdAndDelete(classroomId);
                throw e;
            }

            const accessToken = authService.generateAccessToken({
                registered: user.registered,
                sub: user.id,
                userType: user.userType,
                virtualClassroomUid: user.virtualClassroomUid,
            });

            return [HTTP_CODE.CREATED, { accessToken, user }];
        }),
    );
};
