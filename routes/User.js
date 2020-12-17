const router = require('express').Router();
const User = require('../models/User');

router.get('/search/:search', (req, res, next) => {
    const regExp = new RegExp(req.params.search, 'i');
    User.find({
        $or: [
            { displayName: regExp },
            { email: regExp }
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

module.exports = router;