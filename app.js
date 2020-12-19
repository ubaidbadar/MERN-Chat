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

app.use(cors(), json());

app.use('/', User);
app.use('/', authRoutes);
app.use('/', Chat);

app.use(errorHandler);


mongoose.connect(dbURL, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        const port = process.env.PORT || 5000;
        const server = app.listen(port, () => console.log(`Server is running on ${port}`));
        const io = require('./socketIO').init(server);
        io.on('connection', socket => console.log("Client connected"))
    })
    .catch(err => console.log(err))