var mongoose = require("mongoose");
var User = mongoose.model("User");
var Game = mongoose.model("Game")

const getUsers = (root, { }, context) => {
    if (context.user) {
        User.find({}).exec();
    }
}

const getUser = (root, { user }, context) => {
    if (context.user) {
        return User.findOne({ user: user }).exec();
    }
};

const getMe = (root, { }, context) => {
    if (context.user) {
        return User.findOne({ user: context.user.user }).exec();
    }
}
const changeStatus = async (root, input, context) => {
    if (context.user) {
        let user = await User.findOne({user: context.user.user}).exec();
        if(user){
            await Game.findOne({slug: input.config.slug}).then(game => {
                user.changeStatus(game._id, input.config.newStatus);
                console.log(user);
            });
            return {me: user, success: true};
        }else{
            return {me: user, success: false};
        }
    }
}

const resolvers = {
    Query: {
        getUsers: getUsers,
        getUser: getUser,
        getMe: getMe,
    },
    Mutation: {
        changeStatus: changeStatus,
    },
};
module.exports = resolvers;
