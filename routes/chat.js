const router = require('express').Router();
const authMiddleWare = require('../middlewares/auth');
const Chat = require('../models/Chat');


router.get('/chats', authMiddleWare, (req, res, next) => {
    Chat.find({ participants: req.userId }, { 'messages': { $slice: -1 } }, { 'participants': req.userId })
        .populate({
            path: 'participants',
            match: {_id: {'$nin': [req.userId]}}
        })
        .select('participants')
        .then(chat => {
            const transformedChat = [];
            chat.forEach(({participants, messages}) => {
                transformedChat.push({
                    _id: participants[0]._id,
                    displayName: participants[0].displayName,
                    message: messages[0].message,
                    date: messages[0].date,
                    messageType: messages[0].messageType,
                    read: messages[0].read,
                });
            })
            res.json(transformedChat)
        })
        .catch(next);
})

router.post('/chat/:receiverId', authMiddleWare, (req, res, next) => {
    const participants = [req.userId, req.params.receiverId]
    const message = {
        message: req.body.message,
        messageType: req.body.type || 'string',
        sender: req.userId,
        read: false,
        date: new Date().toISOString(),
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