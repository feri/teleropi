var express = require('express');
var router = express.Router();
var teleropi = require('../config/teleropi.config');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: teleropi.name });
});

module.exports = router;
