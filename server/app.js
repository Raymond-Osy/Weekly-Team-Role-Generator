const express = require('express');
const logger = require('morgan');
const indexRouter = require('./routes');
const userRouter = require('./routes/users');
require('dotenv').config();

const app = express();

const port = parseInt(process.env.PORT) || 7777;

app.set('json spaces', 2);
app.set('port', port);

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/api', userRouter);

app.listen(port, () => {
    console.log(`App listening on port on port: ${app.get('port')}`);
});

module.exports = app;