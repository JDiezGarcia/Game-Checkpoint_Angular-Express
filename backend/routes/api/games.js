var router = require('express').Router();
var mongoose = require('mongoose');
var Game = mongoose.model('Game');
// Preload article objects on routes with ':article'

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
    var limit = req.query.limit !== 'undefined' ? req.query.limit : 2;
    var offset = req.query.offset !== 'undefined' ? req.query.offset : 0;
    if (req.query.tag !== 'undefined') {
        query.tagList = { "$in": [req.query.tag] };
    }


    var gameList = Game.find().limit(Number(limit)).skip(Number(offset)).exec();
    var gamesCount = Game.count().exec();
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

module.exports = router;