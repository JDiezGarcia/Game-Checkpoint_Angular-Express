var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');
var Populate = require('../db/populate');

var GameSchema = new mongoose.Schema({
    slug: { type: String, lowercase: true, unique: true },
    name: String,
    description: String,
    categories: [String],
    img: String,
    baseHours: Number,
    universe: { type: mongoose.Schema.Types.ObjectId, ref: 'Universe' },
    rating: Number,
    comments: [{ type: String, ref: 'Comment' }]

}, { timestamps: true });

GameSchema.plugin(uniqueValidator, { message: 'is already taken' });


GameSchema.pre('findOne', Populate('comments'));

GameSchema.pre('validate', function (next) {
    if (!this._id) {
        this._id = Math.random() * Math.pow(36, 6) | 0;
    }
    if (!this.slug) {
        this.slugify();
    }
    next();
});

GameSchema.methods.slugify = function () {
    this.slug = slug(this.name) + '-' + this._id.toString(36);
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
        isFollow: user ? user.isFollowing(this._id) : false,
        isFavorite: user ? user.isFollowing(this._id) : false
    };
};

GameSchema.methods.toListJSONFor = function () {
    return {
        slug: this.slug,
        name: this.name,
        categories: this.categories,
        img: this.img,
        rating: this.rating,
        isFollow: user ? user.isFollowing(this._id) : false,
        isFavorite: user ? user.isFollowing(this._id) : false
    };
};

mongoose.model('Game', GameSchema);