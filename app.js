const express = require('express');
const cors = require('cors');
require('dotenv').config();
const userRouter = require('./src/routes/user');
const favoriteRouter = require('./src/routes/favorite');
const listRouter = require('./src/routes/list');

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// endpoints
app.use('/auth/local', userRouter);
app.use('/api', favoriteRouter);
app.use('/api', listRouter);

module.exports = app;
