/* 
  code taken from user Covalence on Youtube
*/ 

import { Router } from "express";
import { decks } from "../database";

const router = Router(); 

// GET /api/decks/id
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id; 
        const [dbDecks] = await decks.getAllOne(id); 
        res.json(dbDecks); 
    }
    catch (error) {
      res.status(500).json({ error: 'Internal server error' }); 
    }
}); 

// GET /api/decks
router.get('/', async (req, res) => {
    try {
      const dbDecks = await decks.getAllDecks(); 
      res.json(dbDecks); 
    }
    catch (error) {
      res.status(500).json({ error: 'Internal server error' }); 
    }
}); 

// POST /api/decks { id: number; name: string; email: string; }
router.post('/', async (req, res) => {
    try {
        const newDeck = { ... req.body }; 
      const dbDecks = await decks.insert(newDeck); 
      res.json(dbDecks); 
    }
    catch (error) {
      res.status(500).json({ error: 'Internal server error' }); 
    }
}); 

// PUT /api/decks/id { question?: string; answer?: string; }
router.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10); 
        const updatedDecks = { ... req.body }; 
        const result = await decks.update(updatedDecks, id); 
        res.json(result); 
    }
    catch (error) {
      res.status(500).json({ error: 'Internal server error' }); 
    }
}); 

// DELETE /api/decks/id 
router.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10); 
        const result = await decks.destroy(id); 
        res.json(result); 
    }
    catch (error) {
      res.status(500).json({ error: 'Internal server error' }); 
    }
}); 

export default router; 