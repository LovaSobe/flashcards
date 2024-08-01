/* 
  code taken from user Covalence on Youtube
*/ 

import { Router } from "express";
import { questions } from "../database";

const router = Router(); 

// GET /api/questions/id
/* router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id; 
        const [dbQuestions] = await questions.getAllOne(id); 
        res.json(dbQuestions); 
    }
    catch (error) {
      res.status(500).json({ error: 'Internal server error' }); 
    }
}); */ 

router.get('/:deck_id', async (req, res) => {
  try {
    const deck_id = req.params.deck_id; 
    const dbQuestions = await questions.getAllFromDeck(deck_id);
    res.json(dbQuestions); 
  }
  catch (e) {
    res.status(500).json({ e: 'Internal server error' }); 
  }
})

// GET /api/questions
router.get('/', async (req, res) => {
    try {
      const dbQuestions = await questions.getAllQuestions(); 
      res.json(dbQuestions); 
    }
    catch (error) {
      res.status(500).json({ error: 'Internal server error' }); 
    }
}); 

// POST /api/questions { id: number; name: string; email: string; }
router.post('/', async (req, res) => {
    try {
        const newQuestion = { ... req.body }; 
      const dbQuestions = await questions.insert(newQuestion); 
      res.json(dbQuestions); 
    }
    catch (error) {
      res.status(500).json({ error: 'Internal server error' }); 
    }
}); 

// PUT /api/questions/id { question?: string; answer?: string; }
router.put('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10); 
        const updatedQuestion = { ... req.body }; 
        const result = await questions.update(updatedQuestion, id); 
        res.json(result); 
    }
    catch (error) {
      res.status(500).json({ error: 'Internal server error' }); 
    }
}); 

// DELETE /api/questions/id 
router.get('/:id', async (req, res) => {
    try {
        const userID = parseInt(req.params.id, 10); 
        console.log(`Received DELETE request for /questions/${userID}`);
        const result = await questions.destroy(userID); 
        res.json(result); 
    }
    catch (error) {
      res.status(500).json({ error: 'Internal server error' }); 
    }
}); 

export default router; 