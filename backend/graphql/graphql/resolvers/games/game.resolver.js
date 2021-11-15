var mongoose = require("mongoose");
var Game = mongoose.model("Game");

const getGames = async (root, {}, context) => {
    if (context.user) {
        let games = await Game.find({}).exec();
        games = games.map(game => {
            game["rates"] = game.calculateRating();
            return game
        });
        console.log(games)
        return games
    }
}

const getGame = async (root, { slug }, context) => {
    if (context.user) {
        let game = await Game.findOne({ slug: slug }).exec();
        game["rates"] = game.calculateRating();
        return game
    }
};

// const addProduct = async (root, { product }, context) => {


//   if (context.user) {
//     product.author = context.user._id;
//     let myproduct = new Product(product);
//     await myproduct.save();
//     return myproduct;
//   }
// };

// const updateProduct = (root, { product }, context) => {
//   if (context.user) {
//     return Product.findOne({ slug: product.slug })
//       .then(function (putProduct) {
//         if (!putProduct) return res.sendStatus(401);

//         putProduct.update(product);
//         putProduct.save();
//         console.log(putProduct);
//         return putProduct;
//       })
//       .catch(function (err) {
//         // console.log(err)
//       });
//   }
// };
// const deleteProduct = (slug) => {
//   return Product.deleteOne({ slug: slug }).then(function (prod) {
//     console.log(prod.deletedCount);
//     console.log("TRUE");
//     return true;
//   });
// };

// const searchDeleteProduct = (root, { slug }, context) => {
//   return Product.findOne({ slug: slug, author: context.user._id })
//     .then(function (putProduct) {
//       console.log(putProduct)
//       if (!putProduct) return res.sendStatus(401);
//       //Si el producto no se ha vendido
//       else if (putProduct.status === true) return deleteProduct(slug);
//       else return false;
//     })
//     .catch(function (err) {
//       return false;
//       // console.log(err)
//     });
// };

const resolvers = {
    Query: {
        getGames: getGames,
        getGame: getGame
    }
    // Mutation: {
    //   addProduct: addProduct,
    //   updateProduct: updateProduct,
    //   deleteProduct: searchDeleteProduct,
    // },
};
module.exports = resolvers;
