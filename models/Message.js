const { timeStamp } = require('console');
const { Schema, model } = require('mongoose');

const Message = new Schema({
    participants: [{ type: Schema.Types.ObjectId, required: true, ref: 'User' }],
    message: {
        type: String,
        required: true,
    },
    read: Boolean,

}, { timestamps: true })

module.exports = model('messages', Message);