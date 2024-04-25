// Backend server using Node.js and Express.js

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 5500;

// Connection URL
const url = 'mongodb+srv://Test:irCmvJowlMIRdNxj@cluster0.3vkjvhm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
// Database Name
const dbName = 'mydatabase';

// Use middleware to parse JSON request body
app.use(bodyParser.json());

// Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to MongoDB
client.connect(err => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }
  console.log('Connected to MongoDB');

  const db = client.db(dbName);

  // Define login API endpoint
  app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Query the database to find a user with the provided username/email
    const user = await db.collection('users').findOne({ username });

    if (!user) {
      // User not found
      return res.status(401).json({ error: 'Invalid username/email or password' });
    }

    // Compare the provided password with the stored hash
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      // Passwords don't match
      return res.status(401).json({ error: 'Invalid username/email or password' });
    }

    // Authentication successful, send a success message
    res.json({ message: 'Login successful' });
  });

  // Other API endpoints...

  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
