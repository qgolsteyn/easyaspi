import express from 'express';

import { authService, userService } from '@server/services';

export const initializeUsersRoutes = (app: express.Application) => {
    const usersRouter = express.Router();
    app.use('/', usersRouter);

    /* Retrieves a user profile by auth id */
    usersRouter.post('/auth', async (req, res) => {
        const { idToken } = req.body;

        await authService.verifyAuthToken(idToken);
        const authInfo = authService.getAuthInfo(idToken);

        const user = await userService.getRegisteredUser(authInfo);

        if (user) {
            console.log(user);
        } else {
            console.log('Not registered');
        }

        res.status(200);
        res.json({ user });
    });
};
