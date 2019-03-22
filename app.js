const express = require('express');
const logger = require('morgan');
const homeRouter = require('./routes');
const userRouter = require('./routes/user');

const app = express();

app.set('json spaces', 2);

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
    })
    next();
})

app.use('/api', homeRouter);
app.use('/api', userRouter);

app.listen(3000, () => {
    console.log('App listening on port on port 3000');
});