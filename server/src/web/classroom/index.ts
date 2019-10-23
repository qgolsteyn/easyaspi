import express from 'express';

import { ClassroomTemplateModel } from '@server/database/models/classroom/classroom';
import { classroomSerializer } from '@shared/index';

export const initializeClassroomRoutes = (app: express.Application) => {
    const classroomRouter = express.Router();
    app.use('/classroom', classroomRouter);

    /* Get a classroom */
    classroomRouter.get('/:classroomId', async (req, res) => {
        console.log(`GET /classroom/${req.params.classroomId}`);
        try {
            const classroom = await ClassroomTemplateModel.findById(
                req.params.classroomId
            );

            if (classroom) {
                res.status(200);
                res.json(classroom);
            } else {
                throw [404, 'Classroom not found'];
            }
        } catch (e) {
            if (Array.isArray(e)) {
                res.status(e[0]);
                res.status(e[1]);
            } else {
                console.error(e);
                res.status(500);
                res.send('Server error');
            }
        }
    });
};
