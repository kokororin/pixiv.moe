const express = require('express');
const timeout = require('connect-timeout');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const responseTime = require('response-time');

const isProduction = process.env.NODE_ENV === 'production';

const app = express();

app.use(timeout('15s'));

app.enable('trust proxy');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(responseTime());

app.use('/pixiv', require('./routes/pixiv'));

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  res.status(404);
  next(err);
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (req.timedout && req.headers.upgrade === 'websocket') {
    return;
  }

  const statusCode = err.status || 500;
  if (statusCode === 500) {
    console.error(err.stack || err);
  }
  if (req.timedout) {
    console.error('Timeout: url=%s, timeout=%d', req.originalUrl, err.timeout);
  }
  res.status(statusCode);
  let error = {};
  if (!isProduction) {
    error = err;
  }
  res.json({
    status: 'failure',
    code: statusCode,
    message: err.message,
    error
  });
});

module.exports = app;
