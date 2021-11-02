var router = require('express').Router();
var mongoose = require('mongoose');
var Game = mongoose.model('Game');
var auth = require('../auth');
var User = mongoose.model('User');


router.param('game', async function (req, res, next, slug) {
    console.log(slug)
    await Game.findOne({ slug: slug })
        .then(function (game) {
            if (!game) { return res.sendStatus(404); }
            req.game = game;

            return next();
        }).catch(next);
});

router.post('/game', auth.required, function (req, res, next) {
    User.findById(req.payload.id).then(function (user) {
        if (!user) { return res.sendStatus(401); }

        let game = new Game(req.body.game);
        console.log(game)
        return game.save().then(function () {
            return res.json({ message: "Creado con Exito" });
        });
    }).catch(next);
});

router.get('/games', auth.required, async function (req, res, next) {
    await User.findById(req.payload.id).then(async function (user) {
        if (!user) { return res.sendStatus(401); }
        var query = {};
        var limit = typeof req.query.limit !== 'undefined' ? req.query.limit : 10;
        var offset = typeof req.query.offset !== 'undefined' ? req.query.offset : 0;
        if (typeof req.query.categories !== 'undefined') {
            query.categories = { "$all": req.query.categories };
        }
        if (typeof req.query.query !== 'undefined') {
            query.name = { $regex: ".*" + req.query.query + ".*", $options: "i" };
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
                return game.toListJSONFor(user);
            }),
            gamesCount: gamesCount
        });
    }).catch(next);

});

// Details
router.get('/details/:game', auth.required, async function (req, res, next) {
    await User.findById(req.payload.id).then(async function (user) {
        if (!user) { return res.sendStatus(401); }
        try {
            return await res.json({ games: req.game.toDetailsJSONFor(user) });
        } catch (err) {
            console.log(err)
            return res.status(500).send('Error: Game not Found')
        };
    }).catch(next);

});

router.post('/:game/follow', auth.required, function (req, res, next) {
    let gameFollow = req.game._id;

    User.findById(req.payload.id).then(function (user) {
        if (!user) { return res.sendStatus(401); }

        return user.doGameFollow(gameFollow).then(function () {
            return res.json({ isFollow: true });
        });
    }).catch(next);
});

router.delete('/:game/follow', auth.required, function (req, res, next) {
    let gameUnfollow = req.game._id;

    User.findById(req.payload.id).then(function (user) {
        if (!user) { return res.sendStatus(401); }

        return user.undoGameFollow(gameUnfollow).then(function () {
            return res.json({ isFollow: false });
        });
    }).catch(next);
});

router.post('/:game/favorite', auth.required, function (req, res, next) {
    var gameID = req.game._id;

    User.findById(req.payload.id).then(function (user) {
        if (!user) { return res.sendStatus(401); }
        return user.favorite(gameID).then(function () {
            return res.json({ game: req.game.toDetailsJSONFor(user) });
        });
    }).catch(next);
});

router.delete('/:game/favorite', auth.required, function (req, res, next) {
    var gameID = req.game._id;

    User.findById(req.payload.id).then(function (user) {
        if (!user) { return res.sendStatus(401); }
        return user.unfavorite(gameID).then(function () {
            return res.json({ game: req.game.toDetailsJSONFor(user) });
        });
    }).catch(next);
});

router.put('/:game/changeStatus', auth.required, function (req, res, next) {
    var gameID = req.game._id;
    let status = req.body.newStatus;
    User.findById(req.payload.id).then(function (user) {
        if (!user) { return res.sendStatus(401); }
        if (status !== undefined) {
            return user.changeStatus(gameID, status).then(function () {
                return res.json({ game: req.game.toDetailsJSONFor(user) });
            });
        }
    }).catch(next);
});

router.post('/:game/rating', auth.required, function (req, res, next) {
    var rate = req.body.rate;
    User.findById(req.payload.id).then(function (user) {
        if (!user) { return res.sendStatus(401); }
        return req.game.addRate(rate, user).then(function () {
            user.changeRespect(100);
            user.save();
            return res.json({ game: req.game.toDetailsJSONFor(user) });
        });
    }).catch(next);
});

router.put('/:game/rating', auth.required, function (req, res, next) {
    var rate = req.body.rate;
    User.findById(req.payload.id).then(function (user) {
        if (!user) { return res.sendStatus(401); }
        return req.game.changeRate(rate, user).then(function () {
            return res.json({ game: req.game.toDetailsJSONFor(user) });
        });
    }).catch(next);
});

router.delete('/:game/rating', auth.required, function (req, res, next) {
    User.findById(req.payload.id).then(function (user) {
        if (!user) { return res.sendStatus(401); }
        return req.game.removeRate(user).then(function () {
            user.changeRespect(-100);
            user.save();
            return res.json({ game: req.game.toDetailsJSONFor(user) });
        });
    }).catch(next);
});



module.exports = router;