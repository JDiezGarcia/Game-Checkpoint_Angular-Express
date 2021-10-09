var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
// var crypto = require('crypto');
// var jwt = require('jsonwebtoken');
// var secret = require('../config').secret;

var UserSchema = new mongoose.Schema({
    _id: String,
    email: { type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true },
    user: { type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true },
    name: String,
    img: String,
    gamesFollow: [{
        game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
        status: String
    }],
    fav: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    follow: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: String, ref: 'Comment' }] 
}, { timestamps: true });

UserSchema.methods.toProfileJSONFor = function (user) {
    return {
        email: this.email,
        user: this.user,
        img: this.image || 'https://static.productionready.io/images/smiley-cyrus.jpg',
        comments: this.comments.map(comment => {
            return comment.toCommentJSONFor();
        })

    };
};

UserSchema.methods.toThumbnailJSONFor = function () {
    return {
        user: this.user,
        img: this.image || 'https://static.productionready.io/images/smiley-cyrus.jpg',
    };
};

UserSchema.plugin(uniqueValidator, { message: 'is already taken.' });

UserSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

UserSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

// UserSchema.methods.generateJWT = function() {
//   var today = new Date();
//   var exp = new Date(today);
//   exp.setDate(today.getDate() + 60);

//   return jwt.sign({
//     id: this._id,
//     username: this.username,
//     exp: parseInt(exp.getTime() / 1000),
//   }, secret);
// };

// UserSchema.methods.toAuthJSON = function(){
//   return {
//     username: this.username,
//     email: this.email,
//     token: this.generateJWT(),
//     bio: this.bio,
//     image: this.image
//   };
// };


UserSchema.methods.favorite = function (id) {
    if (this.favorites.indexOf(id) === -1) {
        this.favorites.push(id);
    }

    return this.save();
};

UserSchema.methods.unfavorite = function (id) {
    this.favorites.remove(id);
    return this.save();
};

UserSchema.methods.isFavorite = function (id) {
    return this.favorites.some(function (favoriteId) {
        return favoriteId.toString() === id.toString();
    });
};

// UserSchema.methods.follow = function (id) {
//     if (this.following.indexOf(id) === -1) {
//         this.following.push(id);
//     }

//     return this.save();
// };

UserSchema.methods.unfollow = function (id) {
    this.following.remove(id);
    return this.save();
};

UserSchema.methods.isFollowing = function (id) {
    return this.following.some(function (followId) {
        return followId.toString() === id.toString();
    });
};

mongoose.model('User', UserSchema);
