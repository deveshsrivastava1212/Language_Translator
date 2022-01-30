
const cache = require('../cache/cacheRouter');
const googleTranslate = require('@vitalets/google-translate-api');

exports.transResponse = async(req,res,next)=>{
    //storing the parameter query
    let param = req.query;
    let result = {};
    let result2 = {
        'hi': null,
        'urdu': null,
        'ka': null,
        'bengali': null
    };
    let languages= ['hi', 'urdu', 'ka', 'bengali']
    try {

        for(var i=0; i< languages.length; i++)
        {
            let item = languages[i];
            let store = await googleTranslate(param.yourText , {to : languages[i]})
            result2[item] = store.text;
        }

        //getting the response from the googleTranslate API by providing the query parameter
        const response = await googleTranslate(param.yourText , {to : param.targetLanguage});
        //storing in the empty list
        result.originalText = param.yourText;
        result.targetLanguage = param.targetLanguage;
        result.translatedText = response.text;
        result.fromLanguage = response.from.language.iso;

        //responsing 200 OK and display the json data
        res.status(200).json({
            message: "Successfull",
            data : result, result2
        }) 
        
    } catch (err) {
        res.status(500).send('OOPs something went wrong');
        console.log(err);
    }
}

//GET router to test the API
exports.test = async(req, res)=> {
    let result ={};
    try {
        const response = await googleTranslate('god is great', {to: 'ja'})
        result.translatedText = response.text;
        result.fromLanguage = response.from.language.iso;
        res.status(200).json({
        message: "successfull",
            data: result
        });
        console.log(result)
    } catch (err) {
        res.status(500).send("OOPs something went wrong")
        console.log(err);
    }
}
