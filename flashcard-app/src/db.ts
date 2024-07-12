const mysql = require('mysql2'); 

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'flashcard_user',
  password: 'superPassword123',
  database: 'flashcards'
});


connection.query('SELECT * FROM questions;', (err, results) => {
  if(err){
    console.log('error querying to db', err); 
    throw err; 
  }
  
  console.log(results); 
  connection.end(); 
}); 
