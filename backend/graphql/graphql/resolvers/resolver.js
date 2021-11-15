var { merge }  = require('lodash');

var GameResolver = require('./games/game.resolver');
var UserResolver = require('./users/user.resolver');
var CommentResolver = require('./comments/comment.resolver');

const resolvers = merge(
  GameResolver,
  UserResolver,
  CommentResolver
);

module.exports = resolvers;
