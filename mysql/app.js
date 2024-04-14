const mysql = require('mysql');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'accounts'
});


connection.connect((err) => {
  if (err) return console.error(err.message);

  let sql = `SELECT * FROM users`;

  connection.query(sql, [true], (error, results, fields) => {
    if (error) return console.error(error.message);
    console.log(results);
  });

  // close the database connection
  connection.end();
});
