require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

const connectToDB = require('./helpers/connectToDB');
const errorHandler = require('./middlewares/errorHandler');
const userRouter = require('./routers/userRouter');

const app = express();
const { PORT } = process.env;

app.use(morgan('dev'));
app.use(express.json());
app.disable('x-powered-by');

// routes
app.use('/api/v1/users', userRouter);

// exceptions handler
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectToDB();
});

