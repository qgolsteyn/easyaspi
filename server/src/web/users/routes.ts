import express from 'express';

import { TeacherTemplateModel } from '../../database';

export const initializeUsersRoutes = (app: express.Application) => {
    const usersRouter = express.Router();
    app.use('/users', usersRouter);

    /* Retrieves a teacher's profile by id */
    usersRouter.get('/teacher/:teacherId', async (_, res) => {
        try {
            const templates = await TeacherTemplateModel.find();
            res.status(200);
            res.json(templates);
        } catch (e) {
            console.error(e);
            res.status(500);
            res.send('Error 500');
        }
    });
};

// catch (e) {
//     console.error(e);
//     res.status(500);
//     res.send(`Could not retrieve teacher with id ${req.params.teacherId}`);
// }