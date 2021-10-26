var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');
var Populate = require('../db/populate');

var GameSchema = new mongoose.Schema({
    slug: { type: String, lowercase: true},
    name: String,
    description: String,
    categories: [String],
    img: String,
    baseHours: Number,
    universe: String,
    rating: [
        {
            rate: Number,
            user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}}
    ],
    comments: [{ type: String, ref: 'Comment' }]

}, { timestamps: true });

GameSchema.plugin(uniqueValidator, { message: 'is already taken' });

GameSchema.pre('findOne', Populate('comments'));

GameSchema.pre('validate', function (next) {
    if (!this.slug) {
        this.slugify();
    }
    next();
});

GameSchema.methods.slugify = function () {
    this.slug = slug(this.name) + '-' + String(this._id);
};

GameSchema.methods.toDetailsJSONFor = function (user) {
    return {
        slug: this.slug,
        name: this.name,
        description: this.description,
        categories: this.categories,
        img: this.img,
        baseHours: this.baseHours,
        universe: this.universe,
        rating: this.rating,
        comments: this.comments.map(comment => {
            return comment.toCommentJSONFor();
        }),
        status: user ? user.checkStatus(this._id) : false,
        isFavorite: user ? user.isFavorite(this._id) : false
    };
};

GameSchema.methods.toListJSONFor = function (user) {
    console.log(user.checkStatus(this._id))
    return {
        slug: this.slug,
        name: this.name,
        categories: this.categories,
        img: this.img,
        rating: this.rating,
        status: user ? user.checkStatus(this._id) : false,
        isFavorite: user ? user.isFavorite(this._id) : false
    };
};

mongoose.model('Game', GameSchema);