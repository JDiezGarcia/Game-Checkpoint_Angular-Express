var router = require('express').Router();
var mongoose = require('mongoose');
var Game = mongoose.model('Game');

// return a list of tags
router.get('/', function(req, res, next) {
  Game.find().distinct('categories').then(function(categories){
    return res.json({categories: categories});
  }).catch(next);
});

module.exports = router;
