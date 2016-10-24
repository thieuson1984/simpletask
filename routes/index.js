var express = require('express');
var router = express.Router();

//Basic function
router.get('/', function(req, res, next){
    res.render('index.html');
});

module.exports = router;