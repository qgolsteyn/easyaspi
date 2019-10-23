import express from 'express';

import { ProblemTemplateModel } from '@server/database';
import { generateAllProblems } from '@server/service/math/generate/generateProblems';
import { fetchProblem } from '@server/service/math/fetch/fetchProblem';
import { ObjectId } from 'bson';

export const initializeMathRoutes = (app: express.Application) => {
    const mathRouter = express.Router();
    app.use('/math', mathRouter);

    mathRouter.post('/problems/generate', async (req, res) => {
        try {
            await generateAllProblems();
            res.status(201);
            res.send('success');
        } catch (e) {
            console.error(e);
            res.status(500);
            res.send('Error 500');
        }
    });

    mathRouter.get('/nextProblem', async (req, res) => {
        console.log('GET /math/nextProblem');
        let studentId = req.headers['studentid'];
        if (typeof studentId === 'string') {
            try {
                const problem = await fetchProblem(
                    new ObjectId(studentId),
                    'g1e'
                );
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
            res.send('StudentId not found');
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
