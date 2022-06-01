const {translate} = require('../model/TranslateSchema');
// const cache = require('../cache/cacheRouter');
const googleTranslate = require('@vitalets/google-translate-api');
const translateFunc = require('../translate/googleTranslate');
// const {language} = require('../translate/languages');

exports.transResponse = async(req,res,next)=>{
    //storing the parameter query
    let targetLang = req.query.targetLanguage;
    let yourText = req.query.yourText;

    let result = {};
    //let result2 = {};
    // const languages= {
    //     'hi' : ['urdu', 'bengali','kannada'],
    //     'ja' : ['zh-CN','ko','German'],
    //     'ka' : ['telegu','tamil','malyalam'],
    //     'en' : ['french','spanish']
    // }
    try {
        // if ((targetLang) in languages)
        // {
        //     for(var i=0; i< languages[targetLang].length; i++)
        //     {
        //         const item = languages[targetLang][i];
        //         const response = await translateFunc(yourText, item);
        //         result2[item] = response.ans;
        //     }
        // }

        const cache = await translate.findOne({
            yourLanguage: yourText,
            targetLanguage: targetLang,
        });

        if (cache) {
            result.originalText = cache.yourLanguage;
            result.yourLangCode = cache.yourCode;
            result.targetLanguage = cache.targetLanguage;
            result.translatedText = cache.targetText;
            result.another = cache.another;
            res.status(200).json({
                message: "Cache Found, you can see your result",
                data : result//,result2
            }) 
        }
        else
        {
            //getting the response from the googleTranslate API by providing the query parameter
            const response = await translateFunc(yourText, targetLang);
            //storing in the empty list
            result.originalText = yourText;
            result.yourLangCode = response.text;
            result.targetLanguage = targetLang;
            result.targetText = response.ans;

            const data = new translate({
                yourLanguage : result.originalText,
                yourCode: result.yourLangCode,
                targetLanguage: result.targetLanguage,
                targetText: result.targetText,
               // another: String(result2)
            })

            await data.save();

            //responsing 200 OK and display the json data
            res.status(200).json({
                message: "Successfull",
                data : result//, result2
            }) 
        }
    } catch (err) {
        res.status(500).send('OOPs something went wrong');
        console.log(err);
    }
}

//GET router to test the API
exports.test = async(req, res)=> {
    let result ={};
    try {
        const response = translateFunc(param.yourText, param.targetLanguage)
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
