var router = require('express').Router();
var mongoose = require('mongoose');
var Game = mongoose.model('Game');


router.param('game', async function (req, res, next, slug) {
    await Game.findOne({ slug: slug })
        .then(function (game) {
            if (!game) { return res.sendStatus(404); }
            req.game = game;

            return next();
        }).catch(next);
});

router.get('/games', async function (req, res) {

    var query = {};
    var limit = typeof req.query.limit !== 'undefined' ? req.query.limit : 10;
    var offset = typeof req.query.offset !== 'undefined' ? req.query.offset : 0;
    if (typeof req.query.categories !== 'undefined') {
        query.categories = { "$all": req.query.categories };
    }
    if (typeof req.query.query !== 'undefined') {
        query.name = { $regex: ".*"+ req.query.query +".*", $options: "i"};
    }


    var gameList = Game.find(query).limit(Number(limit)).skip(Number(offset)).exec();
    var gamesCount = Game.count(query).exec();
    try {
        gameList = await gameList;
        gamesCount = await gamesCount;
    } catch (error) {
        console.log(error);
        return res.status(500).send('Error: Game List not Found');
    }

    return res.json({
        games: gameList.map(function (game) {
            return game.toListJSONFor();
        }),
        gamesCount: gamesCount
    });
});

// Details
router.get('/details/:game', function (req, res, next) {
    try {
        return res.json({ games: req.game.toDetailsJSONFor() });
    } catch (err) {
        console.log(err)
        return res.status(500).send('Error: Game not Found')
    };
});

router.post('/:game/follow', auth.required, function (req, res, next) {
    var profileId = req.profile._id;

    User.findById(req.payload.id).then(function (user) {
        if (!user) { return res.sendStatus(401); }

        return user.follow(profileId).then(function () {
            return res.json({ profile: req.profile.toProfileJSONFor(user) });
        });
    }).catch(next);
});

router.delete('/:game/follow', auth.required, function (req, res, next) {
    var gameFollow = req.game._id;

    User.findById(req.payload.id).then(function (user) {
        if (!user) { return res.sendStatus(401); }

        return user.unfollow(profileId).then(function () {
            return res.json({ profile: req.profile.toProfileJSONFor(user) });
        });
    }).catch(next);
});

router.delete('/:game/favorite', auth.required, function (req, res, next) {
    var articleId = req.article._id;

    User.findById(req.payload.id).then(function (user) {
        if (!user) { return res.sendStatus(401); }

        return user.unfavorite(articleId).then(function () {
            return req.article.updateFavoriteCount().then(function (article) {
                return res.json({ article: article.toJSONFor(user) });
            });
        });
    }).catch(next);
});

module.exports = router;