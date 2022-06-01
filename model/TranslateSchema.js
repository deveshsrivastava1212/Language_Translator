const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    yourLanguage: {
        type: String,
        required: true,
    },
    yourCode:{type:String},
    targetLanguage:{
        type:String,
        required: true
    },
    targetText:{type:String},
    another:{
       type: String
    }
})

module.exports ={
    translate: mongoose.model('Translate', Schema),
}