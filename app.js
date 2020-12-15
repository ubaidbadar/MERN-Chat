const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dbURL = 'mongodb://localhost/MERN-Chat';
const authRoutes = require('./routes/auth');

const cors = require('cors');
const { json } = require('body-parser');
const { errorHandler } = require('./controllers/errorHandler');

app.use(cors(), json());


app.use('/', authRoutes);

app.use(errorHandler);

const port = process.env.PORT || 5000;

mongoose.connect(dbURL, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => app.listen(port, () => console.log(`Server is running on ${port}`)))
    .catch(err => console.log(err))