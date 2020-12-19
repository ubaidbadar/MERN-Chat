const router = require('express').Router();
const authMiddleWare = require('../middlewares/auth');
const Chat = require('../models/Chat');
const io = require('../socketIO');
const User = require('../models/User');
const generateError = require('../utility/generateError');

router.get('/chats', authMiddleWare, (req, res, next) => {
    Chat.find({ participants: req.userId }, { 'messages': { $slice: -1 } }, { 'participants': req.userId })
        .populate({
            path: 'participants',
            select: 'displayName photoURL',
            match: { _id: { '$nin': [req.userId] } },
        })
        .select('participants')
        .then(chat => {
            const transformedChat = [];
            chat.forEach(({ participants, messages }) => {
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

router.get('/chat/:selectedUserId', authMiddleWare, (req, res, next) => {
    const { userId } = req;
    const { selectedUserId } = req.params;

    Chat.findOne({ participants: { $all: [userId, selectedUserId] } })
        .populate({
            path: 'participants',
            match: { _id: { '$nin': [userId] } },
            select: 'displayName photoURL',
            ref: 'User'
        })
        .then(conversation => {
            if (conversation) res.status(200).json({
                user: conversation.participants[0],
                messages: conversation.messages,
            })
            return User.findById(selectedUserId).select('displayName photoURL')
        })
        .then(user => {
            if (user) return res.status(200).json({ user, messages: [] })
            generateError(404, 'User not found!');
        })
        .catch(next)
})

router.post('/chat/:receiverId', authMiddleWare, (req, res, next) => {
    const { receiverId } = req.params;
    const { userId } = req;

    const participants = [userId, receiverId];

    const message = {
        message: req.body.message,
        messageType: req.body.type || 'string',
        sender: userId,
        read: false,
        date: new Date().toISOString(),
    }

    Chat.findOneAndUpdate(
        { participants: { $all: participants } },
        { "$push": { "messages": message } },
        { useFindAndModify: false },
    )
        .then(chat => {
            if (chat) return chat;
            chat = new Chat({ participants, messages: [message] });
            return chat.save();
        })
        .then(chat => {
            io.getIO().emit('chat', { receiverId, ...chat })
            res.status(201).json(chat);
        })
        .catch(next)
})

module.exports = router;