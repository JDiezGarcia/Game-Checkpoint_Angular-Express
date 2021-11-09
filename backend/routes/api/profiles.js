var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var auth = require('../auth');

// Preload user profile on routes with ':username'
router.param('user', function (req, res, next, user) {
    User.findOne({ user: user }).then(function (user) {
        if (!user) { return res.sendStatus(404); }

        req.profile = user;

        return next();
    }).catch(next);
});

router.get('/:user', auth.required, function (req, res, next) {
    if (req.payload) {
        User.findById(req.payload.id).then(function (user) {
            if (!user) { return res.json({ profile: req.profile.toProfileJSONFor(false) }); }

            return res.json({ profile: req.profile.toProfileJSONFor(user) });
        });
    } else {
        return res.json({ profile: req.profile.toProfileJSONFor(false) });
    }
});

router.post('/:user/follow', auth.required, function (req, res, next) {
    var profileId = req.profile._id;

    User.findById(req.payload.id).then(function (user) {
        if (!user) { return res.sendStatus(401); }

        return user.doFollow(profileId).then(function () {
            req.profile.newFollower(req.payload.id)
            return res.json({ profile: req.profile.toProfileJSONFor(user) });
        });
    }).catch(next);
});

router.delete('/:user/follow', auth.required, function (req, res, next) {
    var profileId = req.profile._id;
    User.findById(req.payload.id).then(function (user) {
        if (!user) { return res.sendStatus(401); }
        return user.undoFollow(profileId).then(function () {
            req.profile.removeFollower(req.payload.id)
            return res.json({ profile: req.profile.toProfileJSONFor(user) });
        });
    }).catch(next);
});

router.get('/:user/games', auth.required, function (req, res) {
    User.findById(req.payload.id).then(function (user) {
        if (!user) { return res.sendStatus(401); }

        return res.json(req.profile.toGamesFollowJSONFor(req.query.type, user));
    });
})

router.get('/search/users', auth.required, async function (req, res, next){
    User.findById(req.payload.id).then( async function (user) {
        if (!user) { return res.sendStatus(401); }
        console.log("a")
        var query = {};
        var limit = typeof req.query.limit !== 'undefined' ? req.query.limit : 10;
        if (typeof req.query.query !== 'undefined') {
            query.user = { $regex: ".*" + req.query.query + ".*", $options: "i" };
        }
        var userList = User.find(query).limit(Number(limit)).exec();
        try {
            userList = await userList;
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error: User List not Found');
        }

        return res.json({
            users: userList.map(function (user) {
                return user.toThumbnailJSONFor(user);
            }),
        });
    });
})


module.exports = router;
