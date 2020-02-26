import app from './app';

require('dotenv').config();

const PORT = parseInt(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`Node app is running at http://localhost:${PORT}`);

  process.on('uncaughtException', err => {
    console.error('Caught exception:', err.stack);
  });
  process.on('unhandledRejection', (reason, p) => {
    console.error(
      'Unhandled Rejection at: Promise ',
      p,
      ' reason: ',
      // @ts-ignore
      reason.stack
    );
  });
});
