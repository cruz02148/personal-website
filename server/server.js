const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const emailAccount = require('../config');
// const webpack = require('webpack');
// const config = require('../webpack.config.js');
// const webpackDevMiddleware = require('webpack-dev-middleware');
// const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
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

app.post('/contact-data', (req, res) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_PASS,
    },
  });
  const mailOptions = {
    from: 'cruz02148@gmail.com',
    to: 'cruz02148@gmail.com',
    subject: 'Contact Form Submission',
    text: `Message received from ${req.body.name} with and email of ${req.body.email}. 
    The message reads: ${req.body.message}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Message Sent!');
    }
  });
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
