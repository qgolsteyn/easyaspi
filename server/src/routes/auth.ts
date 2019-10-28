import Boom from 'boom';
import express from 'express';

import { authService, userService } from '@server/services';
import { enhanceHandler } from '@server/utils/boom';

export const initializeUsersRoutes = (app: express.Application) => {
    const usersRouter = express.Router();
    app.use('/', usersRouter);

    /* Retrieves a user profile by auth id */
    usersRouter.post(
        '/auth',
        enhanceHandler(async (req, res) => {
            const { idToken } = req.body;

            if (!idToken) {
                throw Boom.badRequest('Missing token in request body');
            }

            await authService.verifyAuthToken(idToken);
            const authInfo = authService.getAuthInfo(idToken);

            let user = await userService.getUserFromAuthInfo(authInfo);
            if (user) {
                res.status(200);
                res.json({
                    accessToken: authService.generateAccessToken({
                        registered: user.registered,
                        sub: user.id,
                        userType: user.userType,
                        virtualClassroomUid: user.virtualClassroomUid,
                    }),
                    user,
                });
            } else {
                user = await userService.createUserFromAuthInfo(authInfo);
                res.status(200);
                res.json({
                    accessToken: authService.generateAccessToken({
                        registered: false,
                        sub: String(authInfo.sub),
                    }),
                    user,
                });
            }
        })
    );
};
