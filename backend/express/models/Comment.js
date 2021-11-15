var mongoose = require('mongoose');
var Populate = require('../db/populate');

var CommentSchema = new mongoose.Schema({
  content: String,
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  origin: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
}, {timestamps: true});

CommentSchema.pre('findOne', Populate('author'));
CommentSchema.pre('findOne', Populate('replies'));
CommentSchema.pre('find', Populate('author'));
CommentSchema.pre('find', Populate('replies'));
CommentSchema.pre('save', Populate('author'))
// Requires population of author
CommentSchema.methods.toCommentJSONFor = function(user){
  return {
    id: String(this._id),
    content: this.content,
    replies: this.replies.map(comment => {
      return comment.toCommentJSONFor();
    }),
    author: this.author.toThumbnailJSONFor(),
    canModify: user ? this.isAuthor(user._id) : false,
    createdAt: this.createdAt
  };
};

CommentSchema.methods.assembleComment = function(parts, user){
  this.content = parts.content
  this.author = user;
  return this;
}

CommentSchema.methods.addOrigin = function(origins){
  this.origin.push({
    $each: origins
  })
  return this;
}

CommentSchema.methods.isAuthor = function (id) {
  return this.author._id.toString() === id.toString();
};

mongoose.model('Comment', CommentSchema);
