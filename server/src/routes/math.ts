import express, {Request, Response} from 'express';
const problem = require('../models/problem');
const template = require('../models/template');
const Post = require('../models/Post')

const router = express.Router();

//get all templates
router.get('/templates', async (req : Request, res : Response) => {
  try{
    const templates = await template.find();
    res.json(templates);
  }
  catch (e) {
    res.json({message: e})
  }
});

//post a template
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

//TEST: THIS IS FOR PUTTING DUMMY PROBLEMS IN THE DB
//post a problem
router.post('/problem', (req : Request, res : Response) => {
  const p = new problem({
    problemArchetype: req.body.problemArchetype,
    problemType: req.body.problemType,
    problem: req.body.problem,
    solution: req.body.solution,
    difficulty: req.body.difficulty,
    seed: req.body.seed
  });
  p.save()
    .then((data: any) => {
      res.json(data)
    })
    .catch((err: any) => {
      res.json({message: err})
    });
});

//get a math problem
router.get('/problem', async (req : Request, res : Response) => {
  try{
    //todo implement logic for getting the math problem
    const prob = await problem.find();
    res.json(prob);
  }
  catch (e) {
    res.json({message: e})
  }
});


//TEST
router.post('/test', (req: Request,res: Response) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description
  });
  post.save()
    .then((data: any) => {
      res.json(data)
    })
    .catch((err: any) => {
      res.json({message: err})
    });

});

module.exports = router;
