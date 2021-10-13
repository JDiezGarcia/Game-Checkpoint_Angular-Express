var router = require('express').Router();
var mongoose = require('mongoose');
var Game = mongoose.model('Game');

// return a list of tags
router.get('/', function(req, res, next) {
  var query = {};
  if (typeof req.query.categories !== 'undefined') {
    if (Array.isArray(req.query.categories)){
      query.categories = { "$all": req.query.categories };
    }else{
      query.categories = { "$all": [req.query.categories] };
    }
  }
  if (typeof req.query.query !== 'undefined') {
    query.name = { $regex: ".*" + req.query.query + ".*", $options: "i" };
  }
  Game.aggregate()
  .match(query)
  .unwind('categories')
    .group({
      "_id": '$categories',
      "count": { "$sum": 1 }
    })
    .sort('_id, test')
  .then(function(categories){
    return res.json({categories: categories});
  }).catch(next);
});

module.exports = router;
