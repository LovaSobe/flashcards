/* 
  code taken from user Covalence on Youtube
*/ 

import express from 'express'; 
import apiRouter from './routes'; 
const cors = require('cors');

const app = express(); 

app.use(cors());
app.use(cors({
  origin: 'http://localhost:4200' // Allow only requests from this origin
}));
app.use(express.json());
app.use('/api', apiRouter); 


const port = 8080; 
app.listen(port, () => console.log('Server running on ${port}')); 
