const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer  = require('multer');

const app = express();
app.use(cors());
app.use(express.json());
const upload = multer();

app.get("/hello",upload.any(), async (req,res) => {
    
    res.json({data:"hello"});
})


app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
});