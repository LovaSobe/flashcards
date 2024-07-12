import mysql from 'mysql2/promise';


const pool = mysql.createPool({
    host: 'localhost',
    user: 'flashcard_user',
    password: 'superPassword123',
    database: 'flashcards'
  });

  export default pool; 