const express = require('express')
const controllers = require('../controllers/transResponse');
const cache = require('../cache/cacheRouter');
const router = express.Router();

//GET router API
router.get('/translate', cache(15), controllers.transResponse);
router.get('/test',cache(15), controllers.test);

module.exports = router;
