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
    respect: { type: Number, default: 0 },
    title: { type: String, default: 'Noob' },
    gamesFollow: [{
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
        status: String,
        finished: Number
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
/*--{
    Add User-Count Followers
    Add User-Count Follow
}--*/
UserSchema.methods.toProfileJSONFor = function (user) {
    return {
        email: this.email,
        user: this.user,
        title: this.title,
        name: this.name,
        img: this.img || 'https://static.productionready.io/images/smiley-cyrus.jpg',
        // comments: this.comments.map(comment => {
        //     return comment.toCommentJSONFor();
        // }),
        following: user ? user.isFollowing(this._id) : false

    };
};

//--[Comment Thumbnail Serializer]--\\
UserSchema.methods.toThumbnailJSONFor = function () {
    return {
        user: this.user,
        title: this.title,
        img: this.img || 'https://static.productionready.io/images/smiley-cyrus.jpg',
    };
};

//--[ UserAuth Serializer]--\\
UserSchema.methods.toAuthJSON = function(){
    return {
    user: this.user,
    email: this.email,
    token: this.generateJWT(),
    name: this.name,
    img: this.img,
    title: this.title
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

//--[Method Set Game Fav]--\\
UserSchema.methods.favorite = function (id) {
    if (this.fav.indexOf(id) === -1) {
        this.fav.push(id);
        this.changeRespect(100);
    }

    return this.save();
};

//--[Method Remove Game Fav]--\\
UserSchema.methods.unfavorite = function (id) {
    this.fav.remove(id);
    this.changeRespect(-100);
    return this.save();
};

//--[Method Check if Game is on Favorites]--\\
UserSchema.methods.isFavorite = function (id) {
    return this.fav.some(function (favoriteId) {
        return favoriteId.toString() === id.toString();
    });
};

//--[Method Follow User]--\\
UserSchema.methods.doFollow = function (id) {
    if (this.follow.indexOf(id) === -1) {
        this.follow.push(id);
        this.changeRespect(50);
    }

    return this.save();
};

//--[Method Add New Follower]--\\
UserSchema.methods.newFollower = function (id){
    if (this.followers.indexOf(id) === -1) {
        this.followers.push(id);
        this.changeRespect(100);
    }

    return this.save();
}

//--[Method Unfollow User]--\\
UserSchema.methods.undoFollow = function (id) {
    this.follow.remove(id);
    this.changeRespect(-50);
    return this.save();
};

//--[Method Remove Follower]--\\
UserSchema.methods.removeFollower = function (id) {
    this.followers.remove(id);
    this.changeRespect(-100);
    return this.save();
};

//--[Method Check User if is on Follow]--\\
UserSchema.methods.isFollowing = function (id) {
    return this.follow.some(function (followId) {
        return followId.toString() === id.toString();
    });
};

//--[Method Follow Game]--\\
UserSchema.methods.doGameFollow = function (id){
    let follow = true;
    this.gamesFollow.find(o => {
        if(String(o._id) === String(id)){
            follow = false;
        }

    })
    if (follow){
        this.gamesFollow.push({
            _id: id,
            status: "pending",
            finished: 0
        })
        this.changeRespect(100);
    }
    return this.save();
}

//--[Method Remove Follow Game]
UserSchema.methods.undoGameFollow = function (id) {
    this.gamesFollow.pull({_id: id});
    this.changeRespect(-100);
    return this.save();
};

//--[Method Change Status]--\\
UserSchema.methods.changeStatus = function (id, newStatus) {
    this.gamesFollow.find(game => {
        if (String(game._id) === String(id)) {
            game.status = newStatus;
            if(newStatus === "finished"){
                game.finished += 1;
                this.changeRespect(200);
            }
        }

    })
    return this.save();
};

//--[Method Check what is the Status of the Game]--\\
UserSchema.methods.checkStatus = function (id) {
    let status;
    this.gamesFollow.some(function (game) {
        if(game.id.toString() === id.toString()){
            status = game.status;
        };
    });
    return status;
};

UserSchema.methods.changeRespect = function (respect){
    this.respect += respect
    this.changeTitle();
}

UserSchema.methods.changeTitle = function () {
    
    this.title = 
        this.respect >= 0 ? 'Noob': 
        this.respect >= 1001 ? 'Player':
        this.respect >= 10001 ? 'Gamer':
        this.respect >= 100001 ? 'Pro':
        this.respect >= 1000001 ? 'Completionist': 
        "Hacker";

}


mongoose.model('User', UserSchema);
