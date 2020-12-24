const Chat = require('../models/Chat');
const io = require('../socketIO');
const User = require('../models/User');
const generateError = require('../utility/generateError');

exports.getChatUsers = (req, res, next) => {
    Chat.find({ participants: req.userId }, { messages: { $elemMatch: { read: false } } })
        .populate({
            path: 'participants',
            select: 'displayName photoURL',
            match: { _id: { '$nin': [req.userId] } },
        })
        .then(chat => {
            console.log(chat);
            const transformedChat = [];
            chat.forEach(({ participants, messages }) => {
                const unReadeMessagesLength = messages.length;
                transformedChat.push({
                    _id: participants[0]._id,
                    displayName: participants[0].displayName,
                    message: messages[unReadeMessagesLength - 1].message,
                    date: messages[unReadeMessagesLength - 1].date,
                    messageType: messages[unReadeMessagesLength - 1].messageType,
                    unReadeMessagesLength,
                })
            })
            res.status(200).json(transformedChat)
        })
        .catch(next);
}

exports.getConversationWithSpecificUser = (req, res, next) => {
    const { userId } = req;
    const { selectedUserId } = req.params;

    Chat.findOne({ participants: { $all: [userId, selectedUserId] } })
        .slice('messages', 0, 20)
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
            if (user) res.status(200).json({ user, messages: [] })
            generateError(404, 'User not found!');
        })
        .catch(next)
}

exports.sendMessage = (req, res, next) => {
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
        .then(_ => {
            message._id = new Date().getTime();
            io.getIO().emit('chat', { receiverId, ...message })
            res.status(201).json(message);
        })
        .catch(next)
}