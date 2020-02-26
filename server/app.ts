import express, { Request, Response, NextFunction } from 'express';
import timeout from 'connect-timeout';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import responseTime from 'response-time';

const isProduction = process.env.NODE_ENV === 'production';

const app = express();

app.use(timeout('15s'));

app.enable('trust proxy');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(responseTime());

app.use('/pixiv', require('./routes/pixiv').default);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  // @ts-ignore
  err.status = 404;
  res.status(404);
  next(err);
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
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

export default app;
