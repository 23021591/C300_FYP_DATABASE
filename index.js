const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const port = 3000;

// MySQL connection (adjust credentials as needed)
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hospital_lab'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Vulnerable search endpoint
app.get('/search', (req, res) => {
  const search = req.query.q;
  const query = `SELECT * FROM patients WHERE name LIKE '%${search}%'`;
  connection.query(query, (err, results) => {
    if (err) return res.status(500).send('Database error');
    res.send(results);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
