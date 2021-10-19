//--[DECLARATIONS]--\\
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var secret = process.env.JWT_SECRET;
var Populate = require('../db/populate');

//--[User Schema]--\\
var UserSchema = new mongoose.Schema({
    email: { type: String, lowercase: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true },
    user: { type: String, lowercase: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true },
    name: String,
    img: String,
    gamesFollow: [{
        game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
        status: String
    }],
    fav: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    follow: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    hash: String,
    salt: String
}, { timestamps: true });

//--[Populate all comment when a find one is request]--\\
UserSchema.pre('findOne', Populate('comments'));

//--[Profile Serializer]--\\
UserSchema.methods.toProfileJSONFor = function (user) {
    console.log(this._id.toString())
    return {
        email: this.email,
        user: this.user,
        name: this.name,
        img: this.img || 'https://static.productionready.io/images/smiley-cyrus.jpg',
        comments: this.comments.map(comment => {
            return comment.toCommentJSONFor();
        }),
        following: user ? user.isFollowing(this._id) : false

    };
};

//--[Comment Thumbnail Serializer]--\\
UserSchema.methods.toThumbnailJSONFor = function () {
    return {
        user: this.user,
        img: this.img || 'https://static.productionready.io/images/smiley-cyrus.jpg',
    };
};

UserSchema.plugin(uniqueValidator, { message: 'is already taken.' });

//--[Method Same Pass]--\\
UserSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

//--[Method Encrypt Pass]--\\
UserSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

//--[Method Generate Token]--\\
UserSchema.methods.generateJWT = function() {
  return jwt.sign({
    id: this._id,
    user: this.user,
  }, secret);
};

//--[Auth Serializer]--\\
UserSchema.methods.toAuthJSON = function(){
    return {
    user: this.user,
    email: this.email,
    token: this.generateJWT(),
    name: this.name,
    img: this.img
  };
};

//--[Method Set Game Fav]--\\
UserSchema.methods.favorite = function (id) {
    if (this.favorites.indexOf(id) === -1) {
        this.favorites.push(id);
    }

    return this.save();
};

//--[Method Remove Game Fav]--\\
UserSchema.methods.unfavorite = function (id) {
    this.favorites.remove(id);
    return this.save();
};

//--[Method Check if Game is on Favorites]--\\
UserSchema.methods.isFavorite = function (id) {
    return this.favorites.some(function (favoriteId) {
        return favoriteId.toString() === id.toString();
    });
};

//--[Method Follow User]--\\
UserSchema.methods.doFollow = function (id) {
    if (this.follow.indexOf(id) === -1) {
        this.follow.push(id);
    }

    return this.save();
};

//--[Method Add New Follower]--\\
UserSchema.methods.newFollower = function (id){
    if (this.followers.indexOf(id) === -1) {
        this.followers.push(id);
    }

    return this.save();
}

//--[Method Unfollow User]--\\
UserSchema.methods.undoFollow = function (id) {
    this.follow.remove(id);
    return this.save();
};

//--[Method Remove Follower]--\\
UserSchema.methods.removeFollower = function (id) {
    this.followers.remove(id);
    return this.save();
};

//--[Method Check User if is on Follow]--\\
UserSchema.methods.isFollowing = function (id) {
    return this.follow.some(function (followId) {
        return followId.toString() === id.toString();
    });
};

mongoose.model('User', UserSchema);
