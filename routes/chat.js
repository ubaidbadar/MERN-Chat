const router = require('express').Router();
const authMiddleWare = require('../middlewares/auth');
const { getChatUsers, getConversationWithSpecificUser, sendMessage } = require('../controllers/chat');

router.get('/chats', authMiddleWare, getChatUsers)

router.get('/chat/:selectedUserId', authMiddleWare, getConversationWithSpecificUser)

router.post('/chat/:receiverId', authMiddleWare, sendMessage)

module.exports = router;