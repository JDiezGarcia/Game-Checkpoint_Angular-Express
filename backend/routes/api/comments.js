var router = require('express').Router();
var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');
var Game = mongoose.model('Game');
var auth = require('../auth');
var User = mongoose.model('User');


router.param('game', async function (req, res, next, slug) {
    await Game.findOne({ slug: slug })
        .then(function (game) {
            if (!game) { return res.sendStatus(404); }
            req.game = game;

            return next();
        }).catch(next);
});

router.param('user', async function (req, res, next, user) {
    await User.findOne({ user: user }).then(function (user) {
        if (!user) { return res.sendStatus(404); }

        req.profile = user;

        return next();
    }).catch(next);
});

router.param('comment', async function (req, res, next, id) {
    await Comment.findOne({ _id: ObjectId(id) }).then(function (comment) {
        if (!comment) { return res.sendStatus(404); }

        req.comment = comment;

        return next();
    }).catch(next);
});

router.post('/:game', auth.required, async function (req, res, next) {
    await User.findById(req.payload.id).then(function (user) {
        if (!user) { return res.sendStatus(401); }

        var comment = new Comment();
        comment = comment.assembleComment(req.body, user._id);

        return comment.save().then(function () {
            req.game.comments.push(comment._id);

            return req.game.save().then(function (game) {
                res.json({ game: game.toDetailsJSONFor(user) });
            });
        });
    }).catch(next);
});

router.post('/:user', auth.required, async function (req, res, next) {
    await User.findById(req.payload.id).then(function (user) {
        if (!user) { return res.sendStatus(401); }

        var comment = new Comment();
        comment = comment.assembleComment(req.body, user._id);

        return comment.save().then(function () {
            req.user.comments.push(comment._id);

            return req.user.save().then(function (user) {
                res.json({ user: user.toProfileJSONFor(user) });
            });
        });
    }).catch(next);
});

router.post('/:user/:comment', auth.required, async function (req, res, next) {
    await User.findById(req.payload.id).then(function (user) {
        if (!user) { return res.sendStatus(401); }

        var comment = new Comment();
        comment = comment.assembleComment(req.body, user._id);

        return comment.save().then(function () {
            req.comment.replies.push(comment);

            return req.comment.save().then(function () {
                res.json({ user: user.toProfileJSONFor(user) });
            });
        });
    }).catch(next);
});

router.delete('/:comment', auth.required, function (req, res, next) {
    if (req.comment.author.toString() === req.payload.id.toString()) {
        req.article.comments.remove(req.comment._id);
        req.article.save()
            .then(Comment.find({ _id: req.comment._id }).remove().exec())
            .then(function () {
                res.sendStatus(204);
            });
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;