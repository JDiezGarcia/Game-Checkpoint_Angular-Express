var mongoose = require('mongoose');
var Populate = require('../db/populate');

var CommentSchema = new mongoose.Schema({
  title: String,
  content: String,
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  origin: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
}, {timestamps: true});

CommentSchema.pre('findOne', Populate('author'));
CommentSchema.pre('findOne', Populate('replies'));
CommentSchema.pre('find', Populate('author'));
CommentSchema.pre('find', Populate('replies'));
// Requires population of author
CommentSchema.methods.toCommentJSONFor = function(){
  return {
    id: String(this._id),
    title: this.title,
    content: this.content,
    replies: this.replies.map(comment => {
      return comment.toCommentJSONFor();
    }),
    author: this.author.toThumbnailJSONFor()
  };
};

CommentSchema.methods.assembleComment = function(parts, user){
  this.title = parts.title;
  this.body = parts.content
  this.author = user;
  return this;
}

CommentSchema.methods.addOrigin = function(origins){
  console.log(origins, "entre")
  this.origin.push({
    $each: origins
  })
  return this;
}

mongoose.model('Comment', CommentSchema);
