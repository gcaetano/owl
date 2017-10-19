var express = require('express'),
    router = express.Router();

router.get('/en', function (req, res, next) {
    var result = require('../locales/en.json');
    res.status(200).send(result);
});

router.get('/pt', function (req, res, next) {
    var result = require('../locales/pt.json');
    res.status(200).send(result);
});

module.exports = router;
