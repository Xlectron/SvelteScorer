const crypto = require('crypto');
const mysql = require('mysql');
const hash = crypto.createHash('sha256');
const express = require('express');
const path = require('path');
const app = express();
const port = 21511;

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

  const values = [id, email, hashedPassword.toString(), name]; // Convert hashedPassword to string

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
    user.hashedPassword = user.hashedPassword.toString(); // Convert hashedPassword to string
    callback(null, user);
  });
}



// Middleware to log incoming requests
app.use((req, res, next) => {
  // console.log(`Received ${req.method} request for ${req.url}`);
  next();
});

// Parse JSON-encoded request bodies
app.use(express.json());

// Serve static files from the "dist" directory
app.use(express.static(path.join(__dirname, 'dist')));

// Define a route to serve your HTML file for the root path
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});





// Define a route to handle login requests
app.post('/login', (req, res) => {
  // Log the email and password sent in the request body
  const { email, hashedPassword } = req.body;
  // Accesses my custom module (app.js) which queries the mysql database
  retrieveUser(email, (error, user) => {
    if (error) {
      console.error('Error retrieving user:', error.message);
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (!user) {
      console.log('User not found');
      return res.status(401).json({ message: 'User not found' });
    }

    // Compare the received hashed password with the stored hashed password
    const storedHashedPassword = Buffer.from(user.hashedPassword, 'utf-8');
    const receivedHashedPassword = Buffer.from(hashedPassword, 'hex');

    console.log("Stored:", storedHashedPassword)
    console.log("Recieved:", receivedHashedPassword)

    if (storedHashedPassword.equals(receivedHashedPassword)) {
      console.log("CORRECT");
      // Send a success response
      return res.json({ message: 'Login successful' });
    } else {
      console.log("INCORRECT");
      // Send an error response
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
  });
});









// Define a catch-all route for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


// Close the database connection when all queries are done
// connection.end((err) => {
//   if (err) {
//     console.error('Error closing connection:', err.message);
//     return;
//   }
//   console.log('Connection closed');
// });
