import express from 'express';

import { UserModel } from '../../database';
import { userSerializer, userCreationSerializer, UserType } from 'shared';
import { ClassroomTemplateModel } from '../../database/models/classroom/classroom';

export const initializeUsersRoutes = (app: express.Application) => {
    const usersRouter = express.Router();
    app.use('/users', usersRouter);

    /* Retrieves a user profile by auth id */
    usersRouter.get('/:authId', async (req, res) => {
        try {
            const user = await UserModel.findOne({
                authToken: req.params.authId,
            });
            if (user) {
                res.status(200);
                res.json(user);
            } else {
                res.status(404);
                res.send('User not found.');
            }
        } catch (e) {
            console.error(e);
            res.status(500);
            res.send(`Could not retrieve user with id ${req.params.authId}`);
        }
    });

    /* Creates a new user */
    usersRouter.post('/', async (req, res) => {
        const userCreation = userCreationSerializer.parse(req.body);
        if (userCreation) {
            if (userCreation.user.userType === UserType.STUDENT) {
                const classroom = await ClassroomTemplateModel.findOne({
                    name: userCreation.classroomName,
                });
                if (
                    classroom &&
                    classroom.passcode === userCreation.classroomPasscode
                ) {
                    const s = new UserModel({
                        ...userCreation.user,
                        virtualClassroomUid: classroom.id,
                    });
                    await s.save();
                    res.status(200);
                    res.json(s);
                } else {
                    res.status(404);
                    res.send(
                        'Classroom does not exist or password is not correct'
                    );
                }
            } else if (userCreation.user.userType === UserType.TEACHER) {
                try {
                    const c = new ClassroomTemplateModel({
                        name: userCreation.classroomName,
                        passcode: userCreation.classroomPasscode,
                        teacherId: userCreation.user.authToken,
                        studentIds: [],
                    });
                    const t = new UserModel({
                        ...userCreation.user,
                        virtualClassroomUid: c.id,
                    });
                    await c.save();
                    await t.save();
                    res.status(200);
                    res.json(t);
                } catch (e) {
                    res.status(500);
                    console.error(e);
                    res.send(e);
                }
            } else {
                res.status(400);
                res.send('Invalid request');
            }
        } else {
            res.status(400);
            res.send('Invalid request');
        }
    });
};
