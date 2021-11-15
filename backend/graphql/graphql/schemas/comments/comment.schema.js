const { gql } = require("apollo-server");
const typeDefs = gql`
    extend type Query {
        getComments: [Comment]
        getComment(id: String!): Comment
    }
    type Comment {
        content: String
        replies: [Comment]
        author: User
        origin: [Comment]
    }
`;
module.exports = typeDefs;