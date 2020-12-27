const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dbURL = 'mongodb://localhost/MERN-Chat';
const authRoutes = require('./routes/auth');

const cors = require('cors');
const { json } = require('body-parser');
const { errorHandler } = require('./controllers/errorHandler');
const User = require('./routes/user');
const Chat = require('./routes/chat');
const { Socket } = require('dgram');

app.use(cors(), json());

app.use('/', User);
app.use('/', authRoutes);
app.use('/', Chat);

app.use(errorHandler);


mongoose.connect(dbURL, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        const port = process.env.PORT || 5000;
        const server = app.listen(port, () => console.log(`Server is running on ${port}`));
        const socketIO = require('./socketIO');
        const io = socketIO.init(server);
        io.on('connection', socket => {
            const socketId = socket.id;
            socket.on('join', userId => socketIO.connectedUsers.push({ userId, socketId }));
            socket.on('disconnect', () => socketIO.connectedUsers = socketIO.connectedUsers.filter(user => user.sockedId !== socketId));
            socket.on('logout', () => socketIO.connectedUsers = socketIO.connectedUsers.filter(user => user.sockedId !== socketId))
        })
    })
    .catch(err => console.log(err))