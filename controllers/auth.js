const User = require('../models/User');
const { compare } = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateError = require('../utility/generateError');

const signInHandler = ({ email, _id, displayName, photoURL }) => {
    const expiresIn = new Date().getTime() + 3600000;
    const token = jwt.sign({ email, userId: _id.toString() }, "ja-ja-k-km-kr", { expiresIn: "1h" });
    return { userId: _id, displayName, email, photoURL, token, expiresIn };
}

exports.signup = (req, res, next) => {
    const { email, password, displayName } = req.body;

    const erros = [];
    !/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email) && erros.push({ email: 'Email is not valid, e.g., test@example.com' });
    !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(password) && erros.push({ password: "Must have at least a number, a uppercase and lowercase letter, and 6 or more characters" });
    displayName.trim().length < 3 && erros.push({ displayName: "Must have 3 or characters" });

    erros.length > 0 && generateError(422, 'Invalid Credential!', erros)

    User.findOne({ email })
        .then(user => user ? res.status(409).json({ message: 'Email is already in use!' }) : new User({ email, password, displayName }).save())
        .then(signInHandler)
        .then(loadedUser => res.status(201).json(loadedUser))
        .catch(next)
}



exports.signin = (req, res, next) => {
    const { email, password } = req.body;
    let loggedUser = null;
    User.findOne({ email })
        .then(user => {
            if (user) {
                loggedUser = user;
                return compare(password, user.password)
            }
            generateError(401, 'Email or password is invalid!');
        })
        .then(isEqual => isEqual ? signInHandler(loggedUser) : generateError(401, 'Email or Password is invalid!'))
        .then(loadedUser => res.status(200).json(loadedUser))
        .catch(next)
}