const mongoose = require('mongoose')
require('dotenv').config();

var mongodb = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.6rpwh.mongodb.net/Translator?retryWrites=true&w=majority`
mongoose.connect(mongodb,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log(`DataBase Connected successfully`)
}).catch((err)=>{
    console.log("Connection Error ---> "+err);
})