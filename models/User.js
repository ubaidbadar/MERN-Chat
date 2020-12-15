const { Schema, model } = require('mongoose');
const { hash } = require('bcryptjs');

const User = new Schema({
    displayName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    photoURL: String
}, { timestamps: true })

User.pre('save', function(next){
    hash(this.password, 12)
    .then(encPassword => {
        this.password = encPassword;
        next();
    })
    .catch(next)
})

module.exports = model('users', User);