var mongoose = require("mongoose");
var Comment = mongoose.model("Comment");

const getComments = () => Comment.find({}).exec();

const getComment = (root, { id }, context) => {
  if (context.user){
    return Comment.findOne({ _id: ObjectId(id)}).exec();
  }
};

const resolvers = {
  Query: {
    getComments: getComments,
    getComment: getComment
  }
  // Mutation: {
  //   addProduct: addProduct,
  //   updateProduct: updateProduct,
  //   deleteProduct: searchDeleteProduct,
  // },
};
module.exports = resolvers;
