const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { corsConfig } = require('./middlewares/cors');
const router = require('./routes');
const limiter = require('./utils/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const serverErrorHandler = require('./middlewares/serverErrorHandler');

// const { PORT = 3000 } = process.env;
const { PORT, DB_ADDRESS = 'mongodb://localhost:27017/moviesdb' } = require('./utils/config');

const app = express();

app.use(helmet());
app.use(cookieParser());

app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);
app.use('*', cors(corsConfig));
app.use('/', router);
app.use(errorLogger);
app.use(errors());
app.use(serverErrorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
