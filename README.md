# Hospital Patient Search (Forensics Lab Demo)

This project is a simulated hospital database web application designed for digital forensics and security education. It demonstrates a classic SQL injection vulnerability for safe, controlled experimentation. **No real patient data is used.**

## Features
- Node.js + Express backend
- MySQL database with sample (fake) patient data
- Search bar intentionally vulnerable to SQL injection (for educational use only)
- Modern HTML5/CSS/JS frontend

## Setup

### 1. Clone the repository
```
git clone <your-repo-url>
cd C300 - MySQL Website
```

### 2. Install dependencies
```
npm install
```

### 3. Set up the MySQL database
- Ensure you have a MySQL server running.
- Create a database named `hospital_lab` and a `patients` table. Example SQL:

```sql
CREATE DATABASE IF NOT EXISTS hospital_lab;
USE hospital_lab;
CREATE TABLE IF NOT EXISTS patients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  diagnosis VARCHAR(100),
  room INT
);
INSERT INTO patients (name, diagnosis, room) VALUES
('Alice Smith', 'Flu', 101),
('Bob Johnson', 'Broken Arm', 102),
('Charlie Lee', 'Appendicitis', 103),
('Dana White', 'Migraine', 104),
('Evan Black', 'Asthma', 105);
```
- Update the MySQL connection settings in `index.js` if needed.

### 4. Start the server
```
node index.js
```
- Visit [http://localhost:3000](http://localhost:3000) in your browser.

### 5. (Optional) Use Live Server for static preview
- Open the `/public` folder with Live Server (configured in `.vscode/settings.json`).

## Mounting a MySQL Database Server

To connect the website to your own MySQL database server, update the connection settings in `index.js`:

```
const connection = mysql.createConnection({
  host: 'YOUR_MYSQL_HOST',      // e.g., 'localhost' or an IP address
  user: 'YOUR_MYSQL_USER',      // e.g., 'root'
  password: 'YOUR_MYSQL_PASS',  // your MySQL password
  database: 'YOUR_DATABASE'     // e.g., 'hospital_lab'
});
```

- `host`: The hostname or IP address of your MySQL server (e.g., `localhost`, `127.0.0.1`, or a remote server address).
- `user`: Your MySQL username.
- `password`: Your MySQL password.
- `database`: The name of your database.

**After updating these values, save the file and restart your Node.js server.**

If your MySQL server is running on a different machine or port, adjust the `host` and optionally add a `port` property (default is 3306):

```
const connection = mysql.createConnection({
  host: '192.168.1.100',
  user: 'admin',
  password: 'mypassword',
  database: 'hospital_lab',
  port: 3306 // change if your server uses a different port
});
```

## Security Warning
This application is **intentionally vulnerable** to SQL injection. Do NOT deploy it in production or on public networks. Use only in isolated, educational environments.

## License
MIT License
