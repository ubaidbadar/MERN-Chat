const router = require('express').Router();
const authMiddleWare = require('../middlewares/auth');
const Chat = require('../models/Chat');


router.get('/chats', authMiddleWare, (req, res, next) => {
    Chat.find({ participants: req.userId }, { 'messages': { $slice: -1 } })
        .populate('participants', 'displayName photoURL')
        .select('participants')
        .then(chat => {
            const transformedChat = [];
            chat.forEach(c => {
                transformedChat.push({
                    _id: c._id,
                    participant: c.participants.find(p => p._id.toString() !== req.userId.toString()),
                    lastMessage: c.messages[0]
                })
            })
            res.status(200).json(transformedChat);
        })
        .catch(next);
})

router.post('/chat/:receiverId', authMiddleWare, (req, res, next) => {
    const participants = [req.userId, req.params.receiverId]
    const message = {
        message: req.body.message,
        messageType: 'string',
        sender: req.userId,
        read: false,
    }
    Chat.findOneAndUpdate(
        { participants },
        { "$push": { "messages": message } },
        { useFindAndModify: false },
    )
        .then(chat => {
            if (chat) return chat;
            chat = new Chat({ participants, messages: [message] });
            return chat.save();
        })
        .then(chat => res.status(201).json(chat))
        .catch(next)
})

module.exports = router;