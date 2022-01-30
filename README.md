# Language_Translator
Translator Application which is used to translate any language into another language and store into cache memory

### Goal
Develop a web server that exposes an API to translate a text.

### Task
- Develop a web server that exposes an API to translate a text.
- For the actual translation, you can use an external service like Google Translate or Bing Translations. The source and target language should be definable via the API.
- The source and target language should be definable via the API.
- In addition, cache (store in Database) translations, in order to avoid repeated hits to the translation API. The cache must be persistent!
- The server should have an extensible architecture. E.g. We may want to change our caching strategy or switch out our translation service.

### Bonus Task
- As a bonus task, implement smart pre-caching. This means we assume that if a user translates a text into Kannada, he is likely to also translate the same text to Hindi. Therefore we want to not only request Kannada from the external service but also other languages like Hindi, Tamil, etc. and store it in our cache
- The smart caching should not affect the response time of the translation API.

### Tech used
-  `NodeJS` & `ExpressJS` (a flexible Node.js web application framework) as backend.
-  `Google translate` as an external service for actual translation installing using `npm i @vitalets/google-translate-api`.
-  `node-cache` package for caching.
-  `Jest` to test the APIs.

## Install Dependencies
```
npm install
```

## Run the app
```
# Run in development mode
npm run dev

# Run in production mode
npm start
```
## Usage 
To get the translation, we can use Postman or any web browser and hit this API by giving the query parameter in the URl 
i.e- :
```
{URL}/translate?sourceText=&targetLanguage=''
```
In {URL} we have to provide our localhost server or any Deployed link
We have to pass two `Query Params` in key 
```
(key 1) yourText      : the text that you want to translate
(key 2) targetLanguage: the language you want to translate
```
<br>**NOTE:**
  - for the `targetLangauge`, you can also able to provide the **ISO Language code** as value.
<br/>For example:
    - "hi" for Hindi
    - "ja" for Japanese
    - "ka" for Kannada, etc.
    <br/>
    
- A sample example is shown here when we hit the route on Postman.
![tanslateSS](https://user-images.githubusercontent.com/66031004/151699019-7d47c610-3781-4881-9c39-5c4d0f20ccbe.png)

## Caching 
In order to avoid repeated hits to the translation API, caching of translation is done.

If the HTTP method is `GET` then we cache the translation.
For the first time hit, that unique request will take the actual time to fetch the response. But after that it get stored into cached for some time(here I fix the same for 15 sec). After storing if we hitting GET request again and again it will fetch the response from the cache but only or 15 sec as I've decided.

For this I use `node-cache` npm package and installing by `npm i node-cache`.

## Testing
To test the APIs is use `jest` along with `supertest` (which provide less complex structure to handle request.)

There are two test cases-
  - First test case is used for `/test` api to check only the response status code is expected or not.
  - Second test case is used for `/translate` api in which in test case I provide the String in `yourText` and give the choosen ISO language code in `targetLangauge` and then 
    let it to be done, it will take time to fetch the unique request, so to handle this I use setTimeout function and then checking the response status code `.toBe(200)`
    
- To test the APIs.
  ```
  # to run the test script, write:
  npm test
  ```


