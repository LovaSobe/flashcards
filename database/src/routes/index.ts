import { Router } from "express";
import questionsRouter from './questions'; 
import decksRouter from './decks'; 

const router = Router(); 

router.use('/questions', questionsRouter); 
router.use('/decks', decksRouter); 

export default router; 