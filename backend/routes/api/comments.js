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

        req.user = user;

        return next();
    }).catch(next);
});

router.param('comment', async function (req, res, next, id) {
    await Comment.findById(id).then(function (comment) {
        if (!comment) { return res.sendStatus(404); }

        req.comment = comment;

        return next();
    }).catch(next);
});

router.post('/game/:game', auth.required, function (req, res, next) {
    User.findById(req.payload.id).then(async function (user) {
        if (!user) { return res.sendStatus(401); }

        let comment = new Comment();
        comment = await comment.assembleComment(req.body, user);
        return comment.save().then(function () {
            req.game.comments.push(comment);
            user.changeRespect(100);
            user.save();
            return req.game.save().then(function () {
                res.json({ game: req.game.toDetailsJSONFor(user) });
            })

        })

    }).catch(next);
});

router.post('/user/:user', auth.required, async function (req, res, next) {
    await User.findById(req.payload.id).then(function (user) {
        if (!user) { return res.sendStatus(401); }

        let comment = new Comment();
        comment = comment.assembleComment(req.body, user);
        return comment.save().then(function () {
            req.user.comments.push(comment);
            user.changeRespect(100);
            user.save();
            return req.user.save().then(function () {
                res.json({ user: req.user.toProfileJSONFor(user) });
            });
        });
    }).catch(next);
});

router.post('/game/:game/:comment', auth.required, async function (req, res, next) {
    await User.findById(req.payload.id).then(function (user) {
        if (!user) { return res.sendStatus(401); }

        let comment = new Comment();
        comment = comment.assembleComment(req.body, user._id);
        if (req.comment.origin.length > 0) {
            console.log(req.comment.origin)
            comment.addOrigin(req.comment.origin)
        }
        comment.origin.push(req.comment._id)

        return comment.save().then(function () {
            req.comment.replies.push(comment);
            user.changeRespect(100);
            user.save();
            return req.comment.save().then(function () {
                Game.findById(req.game._id).then(function (game) {
                    res.json({ game: game.toDetailsJSONFor(user) });
                })
            });
        });
    }).catch(next);
});


router.post('/user/:user/:comment', auth.required, async function (req, res, next) {
    await User.findById(req.payload.id).then(function (user) {
        if (!user) { return res.sendStatus(401); }

        let comment = new Comment();
        comment = comment.assembleComment(req.body, user._id);

        if (req.comment.origin.length > 0) {
            comment.addOrigin(req.comment.origin);
        } else {
            comment.origin.push(req.comment._id);
        }

        return comment.save().then(function () {
            req.comment.replies.push(comment);
            user.changeRespect(100);
            user.save();
            return req.comment.save().then(function () {
                User.findById(req.user._id).then(function (profile) {
                    res.json({ user: profile.toProfileJSONFor(user) });

                })
            });
        });

    }).catch(next);
});

router.delete('/game/:game/:comment', auth.required, async function (req, res, next) {
    await User.findById(req.payload.id).then(async function (user) {
        if (!user) { return res.sendStatus(401); }
        if (String(req.comment.author._id) === req.payload.id) {
            if (req.comment.origin.length <= 0) {
                req.game.comments.remove(req.comment._id);
                user.changeRespect(-100);
                user.save();
                await req.game.save();
            } else {
                await Comment.updateOne(
                    { replies: { $in: [req.comment._id] } },
                    { $pull: { replies: req.comment._id } }
                ).exec();
            }

            await Comment.deleteMany({
                $or: [
                    { _id: req.comment._id },
                    { origin: { $in: [req.comment._id] } }
                ]
            });

            await Game.findById(req.game._id).then(function (game) {
                res.json({ game: game.toDetailsJSONFor(user) });
            })

        } else {
            res.sendStatuds(403);
        }
    }).catch(next);
});

router.delete('/user/:user/:comment', auth.required, async function (req, res, next) {
    await User.findById(req.payload.id).then(async function (user) {
        if (!user) { return res.sendStatus(401); }
        if (String(req.comment.author._id) === req.payload.id || req.payload.id === String(req.user._id)) {
            if (req.comment.origin.length <= 0) {
                req.user.comments.remove(req.comment._id);
                user.changeRespect(-100);
                user.save();
                await req.user.save();
            } else {
                await Comment.updateOne(
                    { replies: { $in: [req.comment._id] } },
                    { $pull: { replies: req.comment._id } }
                ).exec();
            }

            await Comment.deleteMany({
                $or: [
                    { _id: req.comment._id },
                    { origin: { $in: [req.comment._id] } }
                ]
            });

            await User.findById(req.user._id).then(function (profile) {
                res.json({ user: profile.toProfileJSONFor(user) });
            })

        } else {
            res.sendStatuds(403);
        }
    }).catch(next);
});

module.exports = router;