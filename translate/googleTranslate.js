const googleTranslate = require('@vitalets/google-translate-api');

const translateFunc = async (text, targetLanguage) => {
    try {
        let response = await googleTranslate(text, {to: targetLanguage});
        return response;
    } catch (err) {
        console.log(`Error at translateText --> ${err}`);
        return 0;
    }
};

module.exports = translateFunc;