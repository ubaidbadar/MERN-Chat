const router = require('express').Router();
const User = require('../models/User');
const authMiddleWare = require('../middlewares/auth');

router.get('/search/:search', authMiddleWare, (req, res, next) => {
    const regExp = new RegExp(req.params.search, 'i');
    User.find({
        $and: [
            { $or: [{ displayName: regExp }, { email: regExp }] },
            { _id: { $ne: req.userId } }
        ]
    })
        .limit(3)
        .select('displayName photoURL')
        .then(users => {
            users.length > 0 && res.status(200).json(users);
            const err = new Error();
            err.statusCode = 404;
            err.message = 'User not found!'
            throw err;
        })
        .catch(next)
})

router.get('/user/:userId', authMiddleWare, (req, res, next) => {
    User.findById(req.params.userId)
        .select('displayName photoURL')
        .then(user => res.status(200).json(user))
        .catch(next);
})

module.exports = router;