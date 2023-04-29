const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Connect to DB
console.log("connecting to DB");

// create a connection with the database
const con = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  database: "assignment"
});

// attempt to connect to the database
con.connect((err) => {
  if (err) {
    console.error("Failed to connect to database:", err);
    throw err;
  }
  console.log("Connected to database successfully");
});

// Create a table in the database
con.query(`CREATE TABLE admit_card (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) ,
    school VARCHAR(255) NOT NULL,
    class VARCHAR(10) ,
    roll_number VARCHAR(20) ,
    address VARCHAR(255) ,
    PRIMARY KEY (id)
  );
  `, (err, results) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Table created successfully');
    }
  });

// Create an API endpoint for registering a new user
app.post('/api/register', (req, res) => {
    console.log("request has come::");

    // extract data from the request body
    const { name, phone, school, class: className, rollNo, address } = req.body;
  
    // insert data into the admit_card table in the database
    con.query(`INSERT INTO admit_card (name, phone, school, class, roll_number, address)
                VALUES (?, ?, ?, ?, ?, ?)`,
              [name, phone, school, className, rollNo, address],
              (err, result) => {
                if (err) {
                  console.error(err);
                  res.sendStatus(500);
                } else {
                  console.log("New user inserted with id:", result.insertId);
                  res.send({ id: result.insertId });
                }
              });
  });

// Create an API endpoint for fetching a user's data by their ID
app.get('/api/get/:id', (req, res) => {

    console.log("api for fetching");

    // extract the user's ID from the request parameters
    const id = req.params.id;
  
    // query the database for the user's data
    con.query(`SELECT * FROM admit_card WHERE id = ${id}`, (error, results, fields) => {
      if (error) {
        console.error(error);
        res.status(500).send('Internal server error');
      } else if (results.length == 0) {
        res.status(404).send('Admit card not found');
      } else {
        res.json(results[0]);
      }
    });
  });
  

// Start the server and listen for incoming requests
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
