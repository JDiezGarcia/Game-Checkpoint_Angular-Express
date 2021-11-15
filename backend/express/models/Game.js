var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');
var Populate = require('../db/populate');

var GameSchema = new mongoose.Schema({
    slug: { type: String, lowercase: true },
    name: String,
    description: String,
    categories: [String],
    img: String,
    baseHours: Number,
    universe: String,
    rating: [
        {
            rate: Number,
            _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
        }
    ],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]

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
        rating: this.calculateRating(),
        rate: user ? this.myRate(user) : 0,
        comments: this.comments.map(comment => {
            return comment.toCommentJSONFor();
        }),
        status: user ? user.checkStatus(this._id) : false,
        isFavorite: user ? user.isFavorite(this._id) : false
    };
};

GameSchema.methods.toListJSONFor = function (user) {
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

GameSchema.methods.addRate = function (rate, user) {
    if (this.rating.indexOf(user.id) === -1) {
        this.rating.push({
            rate: rate,
            _id: user._id
        });
    }
    return this.save();
};

GameSchema.methods.removeRate = function (user) {
    this.rating.pull({ _id: user._id });
    return this.save();
};

GameSchema.methods.changeRate = function (rate, user) {
    this.rating.find(rates => {
        if (String(rates._id) === String(user._id)) {
            rates.rate = rate;
        }
    })
    return this.save();
};

GameSchema.methods.myRate = function (user) {
    let rate;
    this.rating.some(function (rates) {
        if (rates.id.toString() === user._id.toString()) {
            rate = rates.rate;
        };
    });
    return rate;
};

GameSchema.methods.calculateRating = function (){
    let ratingArr = this.rating.map(rate => rate.rate);
    let rating = (ratingArr.reduce((x, y) => x + y, 0)) / ratingArr.length;
    let ratingObj = {
        rating: rating,
        votes: ratingArr.length
    }
    return ratingObj;
}


mongoose.model('Game', GameSchema);