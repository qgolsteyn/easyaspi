//Todo convert require statements to ES6
// Todo remove console.logs

import express from 'express';
import RestypedRouter from 'restyped-express-async';

import { TemplateModel, ProblemModel } from '../models';

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
            res.status(500);
            console.error(e);
        }
    });

    /* post a template */
    mathRouter.post('/template', async (req, res) => {
        try {
            const t = new TemplateModel({
                problemArchetype: req.body.problemArchetype,
                problemType: req.body.problemType,
                operators: req.body.operators,
            });
            await t.save();
            res.status(200);
        } catch (e) {
            res.status(500);
            console.error(e);
        }
    });

    /* post a problem (for putting dummy data to DB through API) */
    mathRouter.post('/problem', async (req, res) => {
        try {
            const p = new ProblemModel({
                problemArchetype: req.body.problemArchetype,
                problemType: req.body.problemType,
                problem: req.body.problem,
                solution: req.body.solution,
                difficulty: req.body.difficulty,
                seed: req.body.seed,
            });

            await p.save();
            res.status(200);
        } catch (e) {
            console.error(e);
            res.status(500);
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
            res.status(500);
        }
    });
};
