const mongoose = require('mongoose');
const cors = require("cors");
require('dotenv').config({ path: './config/config.env' });
const { ApolloServer } = require("apollo-server");
var { AuthenticationError } = require('apollo-server');

mongoose.connect(process.env.DB_MONGO_URI);
mongoose.set('debug', true);

require('./models/User');
require('./models/Comment');
require('./models/Game');


const typeDefs = require("./graphql/schemas/schema");
const resolvers = require("./graphql/resolvers/resolver");

const request = require('./middleware/requests')

const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    context: async ({ req }) => {
        let user = null;
        if (typeof (req.headers.authorization) !== "undefined") {
            user = await request.userToken(req.headers.authorization.split(' ')[1]);
        }
        return { user, AuthenticationError };
    }
});
server.listen(process.env.PORT, () =>
    console.log(
        `🚀Corriendo aplicación graphQL en http://localhost:${process.env.PORT}/grapqhql`
    )
);
