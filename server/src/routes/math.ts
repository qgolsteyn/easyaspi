//Todo convert require statements to ES6
// Todo remove console.logs

import express, { Request, Response } from 'express';

import { templateSchema } from '../models/templateSchema';
import { problemSchema } from '../models/problemSchema';

export const mathRouter = express.Router();

/* get all templates */
mathRouter.get('/templates', async (_, res: Response) => {
    try {
        const templates = await templateSchema.find();
        res.json(templates);
    } catch (e) {
        res.json({ message: e });
    }
});

/* post a template */
mathRouter.post('/template', (req: Request, res: Response) => {
    const t = new templateSchema({
        problemArchetype: req.body.problemArchetype,
        problemType: req.body.problemType,
        operators: req.body.operators,
    });
    t.save()
        .then((data: any) => {
            res.json(data);
        })
        .catch((err: any) => {
            res.json({ message: err });
        });
});

/* post a problem (for putting dummy data to DB through API) */
mathRouter.post('/problem', (req: Request, res: Response) => {
    const p = new problemSchema({
        problemArchetype: req.body.problemArchetype,
        problemType: req.body.problemType,
        problem: req.body.problem,
        solution: req.body.solution,
        difficulty: req.body.difficulty,
        seed: req.body.seed,
    });
    p.save()
        .then((data: any) => {
            res.json(data);
        })
        .catch((err: any) => {
            res.json({ message: err });
        });
});

/* get all the math problem (for now) */
//todo implement logic for getting a single math problem
mathRouter.get('/problem', async (_, res: Response) => {
    try {
        const prob = await problemSchema.find();
        res.json(prob);
    } catch (e) {
        res.json({ message: e });
    }
});
