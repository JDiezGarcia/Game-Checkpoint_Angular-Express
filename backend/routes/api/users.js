var mongoose = require('mongoose');
var router = require('express').Router();
var passport = require('passport');
var User = mongoose.model('User');
var auth = require('../auth');

router.get('/user', auth.required, function (req, res, next) {
    User.findById(req.payload.id).then(function (user) {
        if (!user) { return res.sendStatus(401); }

        return res.json({ user: user.toAuthJSON() });
    }).catch(next);
});

//--[UPDATE USER]--\\
router.put('/user', auth.required, function (req, res, next) {
    User.findById(req.payload.id).then(function (user) {
        if (!user) { return res.sendStatus(401); }

        // only update fields that were actually passed...
        if (req.body.user.user.length !== 0) {
            user.user = req.body.user.user;
        }
        if (req.body.user.email.length !== 0 ) {
            user.email = req.body.user.email;
        }
        if (req.body.user.name.length !== 0 ) {
            user.name = req.body.user.name;
        }
        if (req.body.user.img.length !== 0) {
            user.img = req.body.user.img;
        }
        if (req.body.user.password.length !== 0) {
            user.setPassword(req.body.user.password);
        }

        return user.save().then(function () {
            return res.json({ user: user.toAuthJSON() });
        });
    }).catch(next);
});

//--[LOGIN]--\\
router.post('/users/login', function (req, res, next) {
    if (!req.body.user.email) {
        return res.status(422).json({ errors: { email: "can't be blank" } });
    }

    if (!req.body.user.password) {
        return res.status(422).json({ errors: { password: "can't be blank" } });
    }

    passport.authenticate('local', { session: false }, function (err, user, info) {
        if (err) { return next(err); }

        if (user) {
            user.token = user.generateJWT();
            return res.json({ user: user.toAuthJSON() });
        } else {
            return res.status(422).json(info);
        }
    })(req, res, next);
});

//--[CREATE USER]--\\
router.post('/users', async function (req, res, next) {
    await User.find({$or:[
        {user: req.body.user.user},
        {email: req.body.user.email}]
    }).then(function (existingUser) {
        if (existingUser && existingUser.length > 0) { 
            console.log(existingUser)
            let errors = {errors: {}}
            errors.errors.user = existingUser[0].toObject().user === req.body.user.user ? 1 : 0;
            errors.errors.email = existingUser[0].toObject().email === req.body.user.email ? 1 : 0;
            return res.status(422).json(errors); 
        }
        var user = new User();

        user.user = req.body.user.user;
        user.email = req.body.user.email;
        user.setPassword(req.body.user.password);
        user.img = './resources/img/user/user-' + (Math.floor(Math.random() * 24 + 1)) + '.jpg'
        user.save().then(function () {
            return res.json({ user: user.toAuthJSON() });
        })
    }).catch(next);
});
module.exports = router;