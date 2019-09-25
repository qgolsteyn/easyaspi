import express from 'express';

import { TemplateModel, ProblemModel } from '../models';
import { problemSerializer, templateSerializer } from 'shared/src';

export const initializeMathRoutes = (app: express.Application) => {
    const mathRouter = express.Router();
    app.use('/math', mathRouter);

    /* get all templates */
    mathRouter.get('/templates', async (_, res) => {
        try {
            const templates = await TemplateModel.find();
            res.status(200);
            res.json(templates);
        } catch (e) {
            console.error(e);
            res.status(500);
            res.send('Error 500');
        }
    });

    /* post a template */
    mathRouter.post('/template', async (req, res) => {
        const template = templateSerializer.parse(req.body);
        if (template) {
            try {
                const t = new TemplateModel(template);
                await t.save();
                res.status(200);
                res.json(template);
            } catch (e) {
                console.error(e);
                res.status(500);
                res.send('Error 500');
            }
        } else {
            res.status(400);
            res.send('Invalid request');
        }
    });

    /* post a problem (for putting dummy data to DB through API) */
    mathRouter.post('/problem', async (req, res) => {
        const problem = problemSerializer.parse(req.body);
        if (problem) {
            try {
                const p = new ProblemModel(problem);
                await p.save();
                res.status(200);
                res.json(problem);
            } catch (e) {
                console.error(e);
                res.status(500);
                res.send('Error 500');
            }
        } else {
            res.status(400);
            res.send('Invalid request');
        }
    });

    /* get all the math problem (for now) */
    //todo implement logic for getting a single math problem
    mathRouter.get('/problem', async (_, res) => {
        try {
            const prob = await ProblemModel.find().exec();
            res.status(200);
            res.json(prob);
        } catch (e) {
            console.error(e);
            res.status(500);
            res.send('Error 500');
        }
    });
};
