const router = require('express').Router();
const { sendMail } = require('../utility/transporter');
const { signup, signin } = require('../controllers/auth');


router.get('/send-email', (req, res) => {
    sendMail({
        to: req.query.email,
        from: 'rehanbadar@gmail.com',
        subject: 'Email Verification',
        message: 'jasdkajdk'
    })
        .then(re => res.json(re))
        .catch(err => res.json(err))
})

router.post('/sign-up', signup)
router.post('/sign-in', signin)


module.exports = router;