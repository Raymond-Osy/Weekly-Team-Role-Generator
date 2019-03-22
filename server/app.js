const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const indexRouter = require('./routes');
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

app.use('/', indexRouter);
app.use('/api', userRouter);

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});

module.exports = app;