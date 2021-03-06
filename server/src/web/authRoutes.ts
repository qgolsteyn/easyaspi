import Boom from 'boom';
import express from 'express';

import { authService, userService } from '@server/service';
import { enhanceHandler, HTTP_CODE } from '@server/service/utils/routeEnhancer';

export const initializeAuthRoutes = (app: express.Application) => {
    const usersRouter = express.Router();
    app.use('/', usersRouter);

    /**
     * Retrieves an access token from a Google auth token
     */
    usersRouter.post(
        '/auth',
        enhanceHandler({ protect: false })(async req => {
            const { idToken } = req.body;

            if (!idToken) {
                throw Boom.badRequest('Missing token in request body');
            }

            await authService.verifyAuthToken(idToken);
            const authInfo = authService.getAuthTokenInfo(idToken);

            let user = await userService.getUserFromId(String(authInfo.sub));
            if (user) {
                return [
                    HTTP_CODE.CREATED,
                    {
                        accessToken: authService.generateAccessToken({
                            registered: user.registered,
                            sub: user.id,
                            userType: user.userType,
                            virtualClassroomUid: user.virtualClassroomUid,
                        }),
                        user,
                    },
                ];
            } else {
                user = await userService.createUserFromAuthInfo(authInfo);
                return [
                    HTTP_CODE.CREATED,
                    {
                        accessToken: authService.generateAccessToken({
                            registered: false,
                            sub: String(authInfo.sub),
                        }),
                        user,
                    },
                ];
            }
        }),
    );
};
