const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const session = require('express-session');
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
app.use(session({
  secret: 'hospital_secret',
  resave: false,
  saveUninitialized: true
}));

// Vulnerable search endpoint
app.get('/search', (req, res) => {
  const search = req.query.q;
  const query = `SELECT * FROM patients WHERE name LIKE '%${search}%'`;
  connection.query(query, (err, results) => {
    if (err) return res.status(500).send('Database error');
    res.send(results);
  });
});

// Login endpoint
app.post('/login', express.json(), (req, res) => {
  const { username, password } = req.body;
  // For demo: hardcoded credentials (user: admin, pass: password)
  if (username === 'admin' && password === 'password') {
    req.session.authenticated = true;
    return res.sendStatus(200);
  } else {
    return res.status(401).json({ error: 'Invalid username or password.' });
  }
});

// Auth middleware
function requireAuth(req, res, next) {
  if (req.session && req.session.authenticated) {
    return next();
  } else {
    // If the request is for an HTML page, redirect. If it's an API, send 401.
    if (req.accepts('html')) {
      return res.redirect('/login.html');
    } else {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  }
}

// Serve root as the login page
app.get('/', (req, res) => {
  // If already authenticated, go to index page
  if (req.session && req.session.authenticated) {
    return res.redirect('/index.html');
  }
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Serve /login.html as the login page
app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Serve index.html only if authenticated, otherwise redirect to login
app.get('/index.html', (req, res) => {
  if (req.session && req.session.authenticated) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  } else {
    res.redirect('/login.html');
  }
});

// Protect all static files except login.html, css, and js
app.use((req, res, next) => {
  const allowed = ['/login.html', '/js/login.js', '/css/styles.css'];
  if (
    req.session && req.session.authenticated ||
    allowed.includes(req.path) ||
    req.path.startsWith('/css/') ||
    req.path.startsWith('/js/')
  ) {
    return next();
  } else {
    return res.redirect('/login.html');
  }
});

// Redirect root to login if not authenticated
app.get('*', (req, res, next) => {
  if (!req.session || !req.session.authenticated) {
    return res.redirect('/login.html');
  }
  next();
});

// Logout endpoint
app.get('/logout.html', (req, res) => {
  req.session.destroy(() => {
    res.sendFile(path.join(__dirname, 'public', 'logout.html'));
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/login.html`);
});
