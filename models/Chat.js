const { Schema, model } = require('mongoose');

const Chat = new Schema({
    participants: [{ type: Schema.Types.ObjectId, required: true, ref: 'User' }],
    messages: [
        {
            date: {
                type: String,
                required: true,
            },
            message: {
                type: String,
                required: true
            },
            messageType: {
                type: String,
                required: true
            },
            read: {
                type: Boolean,
                required: true
            },
            sender: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: 'User'
            }
        }
    ],

})

module.exports = model('Chat', Chat);