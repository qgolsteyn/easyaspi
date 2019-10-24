import { ObjectId } from 'bson';
import express from 'express';

import { ProblemTemplateModel } from '@server/database';
import { fetchProblem } from '@server/service/math/fetch/fetchProblem';

export const initializeMathRoutes = (app: express.Application) => {
    const mathRouter = express.Router();
    app.use('/math', mathRouter);

    mathRouter.get('/nextProblem', async (req, res) => {
        console.log('GET /math/nextProblem');
        const studentId = req.headers.studentid;
        if (typeof studentId === 'string') {
            try {
                const problem = await fetchProblem('g1e');
                res.status(200);
                console.log(problem);
                res.json(problem);
            } catch (e) {
                console.error(e);
                res.status(500);
                res.send('Error 500');
            }
        } else {
            res.status(404);
            res.send('studentid not found');
        }
    });

    /* get all templates */
    mathRouter.get('/templates', async (_, res) => {
        try {
            const templates = await ProblemTemplateModel.find();
            res.status(200);
            res.json(templates);
        } catch (e) {
            console.error(e);
            res.status(500);
            res.send('Error 500');
        }
    });
};
