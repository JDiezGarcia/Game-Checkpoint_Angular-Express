const { gql } = require("apollo-server");
var Game = require("./games/game.schema");
var User = require('./users/user.schema');
var Comment = require('./comments/comment.schema');

const set = gql`
    type Query {
        _empty: String
    }
    type Mutation {
        _empty: String
    }
`;

const typeDefs = [
  set,
  Game,
  User,
  Comment
];

module.exports = typeDefs;
