const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dbURL = 'mongodb://localhost/mernchatapp';

const cors = require('cors');
const { json } = require('body-parser');

app.use(cors());
app.use(json());

const port = process.env.PORT || 5000;


mongoose.connect(dbURL)
    .then(() => app.listen(port, () => console.log(`Server is running on ${port}`)))
    .catch(err => console.log(err))