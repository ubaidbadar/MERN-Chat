const router = require('express').Router();
const authMiddleWare = require('../middlewares/auth');
const Message = require('../models/Message');

router.get('/chat/:userId', authMiddleWare, (req, res, next) => {
    const userId = req.userId;
    const chatUserId = req.params.userIdl
    Message.find(({ participants: { "$in": [userId, chatUserId] } }))
        .then(chat => res.json(chat))
        .catch(next)
})

router.post('/chat/:userId', authMiddleWare, (req, res, next) => {
    const { message } = req.body;
    const userId = req.userId;
    const chatUserId = req.params.userId;
    const chatMessage = new Message({ message, participants: [userId, chatUserId], read: false });
    chatMessage.save()
        .then(message => res.json(message))
        .catch(next)
})

module.exports = router;