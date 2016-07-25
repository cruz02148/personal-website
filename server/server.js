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

app.use(express.static('../dist/views')); // This may not be doing anything currently @ 7/24/16
app.use(express.static(path.join(__dirname, '../client/public')));
app.use('/dist', express.static(path.join(__dirname, '../dist')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../dist/views/index.html`));
});

app.get('/portfolio', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../dist/views/portfolio.html`));
});

app.get('/resume', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../dist/views/resume.html`));
});

app.get('/blog', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../dist/views/blog.html`));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../dist/views/contact.html`));
});

app.get('/greenfield', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../dist/views/greenfield.html`));
});

app.get('/mvp', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../dist/views/mvp.html`));
});

app.get('/how-to', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../dist/views/how-website.html`));
});

app.get('/higher', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../dist/views/higher.html`));
});

const port = process.env.PORT || 3030;
// const port = 3030;

app.listen(port, err => {
  if (err) {
    throw new Error;
  }
  console.log(`Server listening on port ${port}`);
});
