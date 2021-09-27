var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');
// var User = mongoose.model('User');

var GameSchema = new mongoose.Schema({
  _id: Number,
  slug: {type: String, lowercase: true, unique: true},
  name: String,
  description: String,
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Categories' }],
  img: String,
  baseHours: Number,
  universe: { type: mongoose.Schema.Types.ObjectId, ref: 'Universe' },
  rating: Number
}, {timestamps: true});

GameSchema.plugin(uniqueValidator, {message: 'is already taken'});

GameSchema.pre('validate', function(next){
  if(!this._id){
    this._id = Math.random() * Math.pow(36, 6) | 0;
  }
  if(!this.slug)  {
    this.slugify();
  }
  next();
});

GameSchema.methods.slugify = function() {
  this.slug = slug(this.name) + '-' + this._id.toString(36);
};

GameSchema.methods.toJSONFor = function(){
  return {
    slug: this.slug,
    name: this.name,
    description: this.description,
    categories: this.categories,
    img: this.img,
    baseHours: this.baseHours,
    universe: this.universe,
    rating: this.rating
  };
};

mongoose.model('Game', GameSchema);