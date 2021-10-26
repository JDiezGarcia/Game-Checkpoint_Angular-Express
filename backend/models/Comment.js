var mongoose = require('mongoose');
var Populate = require('../db/populate');

var CommentSchema = new mongoose.Schema({
  title: String,
  content: String,
  replies: [{ type: String, ref: 'Comment' }],
  author: { type: String , ref: 'User' },
}, {timestamps: true});

CommentSchema.pre('findOne', Populate('replies')).pre('findOne', Populate('author'));
CommentSchema.pre('find', Populate('replies')).pre('find', Populate('author'));
// Requires population of author
CommentSchema.methods.toCommentJSONFor = function(){
  return {
    title: this.title,
    content: this.content,
    replies: this.replies.map(comment => {
      return comment.toCommentJSONFor();
    }),
    author: this.author.toThumbnailJSONFor()
  };
};

CommentSchema.methods.assembleComment = function(parts, userID){
  this.title = parts.title;
  this.body = parts.content
  this.author = userID;
  console.log("a")
  return this;
}
mongoose.model('Comment', CommentSchema);
