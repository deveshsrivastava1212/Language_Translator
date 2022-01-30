const express = require('express');
const req = require('express/lib/request');
const {transResponse,test} = require('../controllers/transResponse');
const cache = require('../cache/cacheRouter');
const router = express.Router();

//GET router API
router.get('/translate', cache(15), transResponse);
router.get('/test',cache(15), test);

module.exports = router;
