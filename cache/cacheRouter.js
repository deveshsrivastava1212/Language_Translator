const NodeCache = require('node-cache')
const cache = new NodeCache({ stdTTL: 100});

module.exports = duration => (req, res, next) => {
    //if request is not GET
    const method = req.method;
    if(method != 'GET')
    {
        console.log("Unable to cache data of Non GET method! ")
        return next();
    }
    //Storing the key into cache
    const key = req.originalUrl;
    const cacheRes = cache.get(key);

    //check whether key exists in cache or not, if yes then send cache result
    if(cacheRes){
        console.log(`Cache found in ${key}`);
        res.send(cacheRes);
        console.log(cacheRes)
    }
    else {
        //if cache not exists, send the original response and set the cache again
        console.log(`Cache not found anymore for ${key}`);
        res.originalSend = res.send;
        res.send = body => {
            res.originalSend(body);
            cache.set(key, body, duration);
        }
        return next();
    }
}

