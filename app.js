const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer  = require('multer');
const crypto = require('crypto');
const AWS = require('aws-sdk');

const app = express();
app.use(cors());
app.use(express.json());
const upload = multer();

AWS.config.update({
  region: 'us-east-1'
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();




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
    const uniqueID = crypto.randomBytes(16).toString('hex');
    const params = {
      TableName: 'matrixUserInfoDynamo',
      Item: {
        customer_id: uniqueID,
        first_name,
        last_name,
        Email,
        Mobile_number,
        street,
        Apt,
        city,
        State,
        Pincode,
        Country,
        comments
      }
    };

    dynamoDB.put(params, (err, data) => {
      if (err) {
        console.error('Error inserting data into DynamoDB:', err);
        res.status(500).send('Error inserting data into DynamoDB');
      } else {
        console.log('Data inserted into DynamoDB:', data);
        res.status(200).send('Data inserted into DynamoDB');
      }
    });
});


app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
});