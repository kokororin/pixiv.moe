const path = require('path');
const express = require('express');
const webpack = require('webpack');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config');
const compiler = webpack(config);

const app = new express();

app.use(devMiddleware(compiler, config.devServer));
app.use(hotMiddleware(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '/../src/index.html'));
});

app.listen(config.devServer.port, function onAppListening(err) {
  if (err) {
    console.error(err);
  } else {
    console.info('==> Webpack development server listening on port %s', config.devServer.port);
    console.info('==> Please wait for bundle finished');
  }
});
