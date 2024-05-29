const crypto = require('crypto');
const mysql = require('mysql');
const express = require('express');
const path = require('path');
const app = express();
const port = 21511;
const { execSync } = require('child_process');
    
try {
  console.log("Compiling Svelte files...");
  execSync("npm run build", { stdio: 'inherit' }); // Outputs the normal build process
  console.log("Svelte files compiled successfully.");
} catch (error) {
  console.error("Error compiling Svelte files:", error.message);
  process.exit(1); // Exit the process with an error code
}


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



function createAccount(email, name, password) {
  console.log("Creating Account with: ", email, name, password)

  // Using placeholders to avoid SQL injection
  const sql = `INSERT INTO users (email, hashedPassword, name) VALUES (?, ?, ?)`;

  const values = [email, password, name];

  connection.query(sql, values, (error, results, fields) => {
    if (error) {
      console.error('Error creating account:', error.message);
      return;
    }
    console.log('Account created successfully');
  });
  }



  function saveMatch(teamsObj, scoresObj, email) {
    console.log("Saving match, using email: ", email)
  
    // Using placeholders to avoid SQL injection
    const sql = `INSERT INTO matches (teams, scores, date, email) VALUES (?, ?, ?, ?)`;

      // Extract team names from the teamsObj object
    const teams = Object.values(teamsObj);
    // Extract scores from the scoresObj object
    const scores = Object.values(scoresObj);
    const date = new Date();
    console.log("Saving match, using email: ", email);

    // Joining array elements into strings
    const teamsString = teams.join(' '); // Join teams array elements into a space-separated string
    const scoresString = scores.join(' '); // Join scores array elements into a space-separated string

    console.log(teamsString);
    console.log(scoresString);
  
    const values = [teamsString, scoresString, date, email];
  
    connection.query(sql, values, (error, results, fields) => {
      if (error) {
        console.error('Error saving team:', error.message);
        return;
      }
      console.log('Match saved successfully');
    });
    }


function createTeam(number, name, email) {
  console.log("Creating Team with:", name, number, email)
  avgscore = 0

  // Using placeholders to avoid SQL injection
  const sql = `INSERT INTO teams (number, name, email, avgscore) VALUES (?, ?, ?, ?)`;

  const values = [number, name, email, avgscore];

  connection.query(sql, values, (error, results, fields) => {
    if (error) {
      console.error('Error creating team:', error.message);
      return;
    }
    console.log('team created successfully');
  });
}


function deleteTeam(number) {
  console.log("Deleting team", number)
  // Using placeholders to avoid SQL injection
  const sql = 'DELETE FROM teams WHERE number = ?';
  const values = [number];

  connection.query(sql, values, (error, results, fields) => {
    if (error) {
      console.error('Error deleting team:', error.message);
      return;
    }
    console.log('Team deleted successfully');
  });
}


function deleteMatch(team) {
  console.log("Deleting match", team)
  // Using placeholders to avoid SQL injection
  const sql = 'DELETE FROM matches WHERE teams = ?';
  const values = [team];

  connection.query(sql, values, (error, results, fields) => {
    if (error) {
      console.error('Error deleting matches:', error.message);
      return;
    }
    console.log('Match deleted successfully');
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


function getMatches(email, callback) {
  const sql = 'select * from matches;';
  
  connection.query(sql, [email], (error, results, fields) => {
    if (error) {
      console.error('Error retrieving matches:', error.message);
      callback(error, null);
      return;
    }
    if (results.length === 0) {
      console.log('Matches not found');
      callback(null, null);
      return;
    }
    // Assuming there's only one user for a given email
    const user = results;
    callback(null, user);
  });
}


function retrieveTeams(email, callback) {
  // Selects teams which contain the user's email
  const sql = 'SELECT * FROM teams WHERE email = ?';

  // Queries database
  connection.query(sql, [email], (error, results, fields) => {
    if (error) {
      // Error Flagging
      console.error('Error retrieving teams:', error.message); 
      callback(error, null);
      return;
    }
    if (results.length === 0) {
      console.log('Teams not found');
      callback(null, null);
      return;
    }
    const teams = results; // Array of different teams
    callback(null, teams); // Returns everything
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

// Define a route to serve HTML file for the root path
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});



// Define a route to handle login requests
app.post('/savematch', (req, res) => {
  // Log the email and password sent in the request body
  const { teams, scores, email } = req.body;

  saveMatch(teams, scores, email);
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

    const storedHashedPassword = user.hashedPassword;
    var receivedHashedPassword = hashedPassword;

    if (storedHashedPassword == receivedHashedPassword) {
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



// Define a route to handle login requests
app.post('/signup', (req, res) => {
   // Log the email and password sent in the request body
   const { email, hashedPassword } = req.body;

   createAccount(email, "Test Test", hashedPassword);
});


// Define a route to handle login requests
app.post('/myteams', (req, res) => {
  // Log the email and password sent in the request body
  const { email, hashedPassword } = req.body;

  retrieveTeams(email, (error, teams) => {
    if (error) {
      console.error('Error retrieving teams:', error.message);
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (!teams) {
      console.log('Teams not found');
      return res.status(401).json({ message: 'Teams not found' });
    }

    res.send(teams)

  });
});



// Define a route to handle login requests
app.post('/myteams/addteamsrequest', (req, res) => {
  // Log the email and password sent in the request body
  const { name, number, email } = req.body;

  createTeam(number, name, email);
  res.json({ message: 'Add successful' })
});


// Define a route to handle login requests
app.post('/myteams/getmatchesfromdatabase', (req, res) => {
  // Log the email and password sent in the request body
  const { email } = req.body;

  getMatches(email, (error, matches) => {
    if (error) {
      console.error('Error retrieving matches:', error.message);
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (!matches) {
      console.log('Matches not found');
      return res.status(401).json({ message: 'matches not found' });
    }
    res.send(matches)
  });
});


// Define a route to handle login requests
app.post('/myteams/deleteteamsrequest', (req, res) => {
  // Log the email and password sent in the request body
  const { number } = req.body;

  deleteTeam(number);
  res.json({ message: 'Delete successful' });
});



// Define a route to handle login requests
app.post('/myteams/deletematchesrequest', (req, res) => {
  // Log the email and password sent in the request body
  const { teams } = req.body;

  deleteMatch(teams);
  res.json({ message: 'Delete successful' });
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
