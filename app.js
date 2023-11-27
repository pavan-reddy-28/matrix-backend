const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer  = require('multer');
const mysql = require('mysql');

const app = express();
app.use(cors());
app.use(express.json());
const upload = multer();

const pool = mysql.createPool({
    connectionLimit: 10, // adjust as per your requirement
    host: 'matrix-database.cepm8nx3leyv.us-east-1.rds.amazonaws.com',
    user: 'rdsUser',
    password: 'admin12345',
    database: 'matrixDB',
  });



app.post('/hello', (req, res) => {

  const {
    first_name,
    last_name,
    Email,
    Confirm_email,
    Mobile_number,
    street,
    Apt,
    city,
    State,
    Pincode,
    Country,
    comments
  } = req.body;
  console.log("data : ", {
    first_name,
    last_name,
    Email,
    Mobile_number,
    Confirm_email,
    street,
    Apt,
    city,
    State,
    Pincode,
    Country,
    comments
  } )
    // Get the database name from the RDS instance
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error connecting to database:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      const insertQuery = `
      INSERT INTO userInfo 
      (first_name, last_name, Email, Confirm_email, Mobile_number, street, Apt, city, State, Pincode, Country, comments) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
      // Execute query to fetch the database name
     // Insert the form data into the table
    connection.query(
      insertQuery,
      [
        first_name,
        last_name,
        Email,
        Confirm_email,
        Mobile_number,
        street,
        Apt,
        city,
        State,
        Pincode,
        Country,
        comments
      ],
      (queryErr, results) => {
        // Release the connection back to the pool
        connection.release();

        if (queryErr) {
          console.error('Error inserting data:', queryErr);
          res.status(500).send('Error inserting data');
          return;
        }

        res.status(200).send('Data inserted successfully!');
      });
    });
});


app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
});