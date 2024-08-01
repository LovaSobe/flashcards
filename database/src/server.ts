/* 
  code taken from user Covalence on Youtube
*/ 

import express from 'express'; 
import apiRouter from './routes'; 
const cors = require('cors');

const app = express(); 

const corsOpt = {
  origin: 'http://localhost:4200', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',

}
app.use(cors(corsOpt));
app.use(express.json());
app.use('/api', apiRouter); 


const port = 8080; 
app.listen(port, () => console.log(`Server running on ${port}`)); 
