const { Schema, model } = require('mongoose');

const Chat = new Schema({
    participants: [{ type: Schema.Types.ObjectId, required: true, ref: 'User' }],
    messages: [
        {
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

}, { timestamps: true })

module.exports = model('messages', Chat);