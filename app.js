const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')

//loading the variable in .env file
dotenv.config();

const port = process.env.PORT || 3005;
const app = express()
app.use(express.json());

//enable CORS
app.use(cors());

//route file
const translate = require('./routes/translate');

//use the routers
app.use('/', translate);

app.listen(port, ()=>{
    console.log(`Server is running on ${port}`)
    console.log(`URL:  http://localhost:${port}`)
})