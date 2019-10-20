import express from 'express';

import { ProblemTemplateModel, GeneratedProblemModel } from '../../database';
import { problemSerializer } from 'shared/src';
import { generateAllProblems } from '../../service/math/generate/generateProblems';

export const initializeMathRoutes = (app: express.Application) => {
    const mathRouter = express.Router();
    app.use('/math', mathRouter);

    mathRouter.post('/problems/generate', async (req, res) => {
        try {
            const templates = await generateAllProblems();
            res.status(201);
            res.send("success");
        } catch (e) {
            console.error(e);
            res.status(500);
            res.send('Error 500');
        }
    })

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
