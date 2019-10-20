import express from 'express';

import { ClassroomTemplateModel } from '../../database/models/classroom/classroom';
import { classroomSerializer } from 'shared/dist';

export const initializeClassroomRoutes = (app: express.Application) => {
    const classroomRouter = express.Router();
    app.use('/', classroomRouter);

    /* Creates a new classroom */
    classroomRouter.post('/virtual-classroom', async (req, res) => {
        const classroom = classroomSerializer.parse(req.body);
        if (classroom) {
            try {
                const p = new ClassroomTemplateModel(classroom);
                await p.save();
                res.status(200);
                res.json(`VirtualClassroomId: ${p.id}`);
            } catch (e) {
                console.error(e);
                res.status(500);
                res.send(e.message);
            }
        } else {
            res.status(400);
            res.send('Invalid request');
        }
    });
};
