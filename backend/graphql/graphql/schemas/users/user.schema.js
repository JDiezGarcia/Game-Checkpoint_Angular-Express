const { gql } = require("apollo-server");
const typeDefs = gql`
    extend type Query {
        getUsers: [User]
        getUser(user: String!): User
        getMe: User
    }

    extend type Mutation {
        changeStatus(config: gameStatus): newStatus     
    }

    type User {
        email: String
        user: String
        name: String
        img: String
        respect: Int
        title: String
        gamesFollow: [GamesFollow]
        fav: [Game]
        followers: [User]
        follow: [User]
        comments: [Comment]
    }

    type GamesFollow {
            _id: Game
            status: String
            finished: Int
    }

    type newStatus {
        success: Boolean!
        me: User
    }
`;
module.exports = typeDefs;
