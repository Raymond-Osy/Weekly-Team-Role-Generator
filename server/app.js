const express = require('express');
import cors from 'cors';
const logger = require('morgan');
const userRouter = require('./routes/users');
require('dotenv').config();

const app = express();

app.use(cors());

const port = parseInt(process.env.PORT) || 7777;

app.set('json spaces', 2);
app.set('port', port);

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, PATCH, POST, HEAD, OPTIONS, PUT'
    })
    next();
});

app.use('/api', userRouter);

app.listen(port, () => {
    console.log(`App listening on port on port: ${app.get('port')}`);
});

module.exports = app;