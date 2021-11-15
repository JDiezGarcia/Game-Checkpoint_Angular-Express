const { gql } = require("apollo-server");
const typeDefs = gql`
    extend type Query {
        getGames: [Game]
        getGame(slug: String): Game
        getRating: Rating
    }
    type Game {
        slug: String
        name: String
        description: String
        categories: [String]
        img: String
        baseHours: Int
        universe: String
        rating: [Rates]
        comments: [Comment]
        rates: Rating
    }

    type Rates {
        rate: Int
        _id: User
    }

    type Rating {
        votes: Int
        rating: Float
    }

    input gameStatus {
        slug: String
        newStatus: String
    }
`;
module.exports = typeDefs;
