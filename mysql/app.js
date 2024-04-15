const crypto = require('crypto');
const mysql = require('mysql');
const hash = crypto.createHash('sha256');

// Create a single connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'accounts'
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
    return;
  }
  console.log('Connected to database');
});

function createAccount(id, email, name, password) {
  // Create a new hash object for each account
  const hash = crypto.createHash('sha256');
  
  // Using placeholders to avoid SQL injection
  const sql = `INSERT INTO users (id, email, hashedPassword, name) VALUES (?, ?, ?, ?)`;

  const hashedPassword = hash.update(password, 'utf-8').digest('hex');

  const values = [id, email, hashedPassword, name];

  connection.query(sql, values, (error, results, fields) => {
    if (error) {
      console.error('Error creating account:', error.message);
      return;
    }
    console.log('Account created successfully:', results);
  });
}

function retrieveUser(email, callback) {
  const sql = 'SELECT * FROM users WHERE email = ?';
  connection.query(sql, [email], (error, results, fields) => {
    if (error) {
      console.error('Error retrieving user:', error.message);
      callback(error, null);
      return;
    }
    if (results.length === 0) {
      console.log('User not found');
      callback(null, null);
      return;
    }
    // Assuming there's only one user for a given email
    const user = results[0];
    callback(null, user);
  });
}



retrieveUser("hello@gmail.com", (error, user) => {
  if (error) {
    console.error('Error:', error);
    return;
  }
  if (!user) {
    console.log('User not found');
    return;
  }
  console.log('User found:', user);
  // You can access user properties like user.id, user.name, etc.
});




// createAccount(2013, "bigboy@gmail.com", "Big Man", "Jeffsadas");
// createAccount(201413, "helloman@gmail.com", "Hello Man", "3253dfsaasfd");
// createAccount(12093, "jeffjimmy@gmail.com", "Jeff Jimmy", "alksdj92391");



// Close the database connection when all queries are done
connection.end((err) => {
  if (err) {
    console.error('Error closing connection:', err.message);
    return;
  }
  console.log('Connection closed');
});
