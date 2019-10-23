import express from 'express';

import {
    UserModel,
    AuthInfoModel,
    ClassroomTemplateModel,
} from '@server/database';
import { userCreationSerializer, UserType } from '@shared/index';

export const initializeUsersRoutes = (app: express.Application) => {
    const usersRouter = express.Router();
    app.use('/users', usersRouter);

    /* Retrieves a user profile by auth id */
    usersRouter.get('/auth/:authId', async (req, res) => {
        console.log(`GET /auth/${req.params.authId}`);
        try {
            const authInfo = await AuthInfoModel.findOne({
                authToken: req.params.authId,
            });
            if (!authInfo) {
                res.status(404);
                res.send('User not found.');
                return;
            }

            const user = await UserModel.findById(authInfo.userId);
            if (!user) {
                res.status(404);
                res.send('User not found.');
                return;
            }

            res.status(200);
            res.json({ id: user.id, user });
        } catch (e) {
            console.error(e);
            res.status(500);
            res.send(`Could not retrieve user with id ${req.params.authId}`);
        }
    });

    /* Creates a new user */
    usersRouter.post('/auth/register', async (req, res) => {
        console.log(`GET /auth/register`);
        try {
            const userCreation = userCreationSerializer.parse(req.body);
            if (!userCreation) {
                throw [400, 'Unable to parse body'];
            }

            let classroom;
            if (userCreation.user.userType === UserType.STUDENT) {
                const c = await ClassroomTemplateModel.findOne({
                    name: userCreation.classroomName,
                });

                if (!c || c.passcode !== userCreation.classroomPasscode) {
                    throw [401, 'Invalid classroom or wrong password'];
                }

                classroom = c;
            } else if (userCreation.user.userType === UserType.TEACHER) {
                const c = new ClassroomTemplateModel({
                    name: userCreation.classroomName,
                    passcode: userCreation.classroomPasscode,
                    teacherId: 'placeholder',
                    studentIds: [],
                });

                if (!c) {
                    throw [500, 'Unable to create classroom'];
                }

                await c.save();
                classroom = c;
            } else {
                throw [400, 'Invalid request'];
            }

            const u = new UserModel({
                ...userCreation.user,
                virtualClassroomUid: classroom.id,
            });
            await u.save();

            const a = new AuthInfoModel({
                userId: u.id,
                authToken: userCreation.authToken,
                pushToken: userCreation.pushToken,
            });
            await a.save();

            if (u.userType === UserType.STUDENT) {
                classroom.studentIds.push(u.id);
                await u.save();
            } else if (u.userType === UserType.TEACHER) {
                classroom.teacherId = u.id;
            }

            await classroom.save();

            res.status(200);
            res.json({ id: u.id, user: u });
        } catch (e) {
            if (Array.isArray(e)) {
                res.status(e[0]);
                res.send(e[1]);
            } else {
                res.status(500);
                console.error(e);
                res.send('Server error');
            }
        }
    });
};
