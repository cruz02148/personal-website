const express = require('express');
const path = require('path');
// const webpack = require('webpack');
// const config = require('../webpack.config.js');
// const webpackDevMiddleware = require('webpack-dev-middleware');
// const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();

// const compiler = webpack(config);

// app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
// app.use(webpackHotMiddleware(compiler));

app.use(express.static('./dist')); // This may not be doing anything currently @ 7/24/16
app.use(express.static(path.join(__dirname, '../client/public')));
app.use('/bower_components', express.static(path.join(__dirname, '../bower_components')));
app.use('/dist', express.static(path.join(__dirname, '../dist')));

app.use('/', (req, res) => {
  res.sendFile(path.resolve('dist/views/index.html'));
});

const port = 3030;

app.listen(port, err => {
  if (err) {
    throw new Error;
  }
  console.log(`Server listening on port ${port}`);
});
