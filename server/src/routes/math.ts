//Todo convert require statements to ES6
// Todo remove console.logs

import express, {Request, Response} from 'express';
const problem = require('../models/problem');
const template = require('../models/arithmeticTemplate');

const router = express.Router();

/* get all templates */
router.get('/templates', async (req : Request, res : Response) => {
  try{
    const templates = await template.find();
    res.json(templates);
  }
  catch (e) {
    res.json({message: e})
  }
});

/* post a template */
router.post('/template', (req : Request, res : Response) => {
  const t = new template({
    problemArchetype: req.body.problemArchetype,
    problemType: req.body.problemType,
    operators: req.body.operators
  });
  console.log(t);
  t.save()
    .then((data: any) => {
      console.log(data);
      res.json(data)
    })
    .catch((err: any) => {
      res.json({message: err})
    });
});


/* post a problem (for putting dummy data to DB through API) */
router.post('/problem', (req : Request, res : Response) => {
  const p = new problem({
    problemArchetype: req.body.problemArchetype,
    problemType: req.body.problemType,
    problem: req.body.problem,
    solution: req.body.solution,
    difficulty: req.body.difficulty,
    seed: req.body.seed
  });
  console.log(p);
  p.save()
    .then((data: any) => {
      res.json(data)
    })
    .catch((err: any) => {
      res.json({message: err})
    });
});

/* get all the math problem (for now) */
//todo implement logic for getting a single math problem
router.get('/problem', async (req : Request, res : Response) => {
  try{
    const prob = await problem.find();
    res.json(prob);
  }
  catch (e) {
    res.json({message: e})
  }
});

module.exports = router;
