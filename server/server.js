require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sg = require('sendgrid').SendGrid(process.env.SENDGRID_API_KEY);
const helper = require('sendgrid').mail;
const axios = require('axios');
const cors = require('cors');
const Converter = require('csvtojson').Converter;
// const webpack = require('webpack');
// const config = require('../webpack.config.js');
// const webpackDevMiddleware = require('webpack-dev-middleware');
// const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();
app.use(cors());
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
  const from_email = new helper.Email(process.env.SENDGRID_USERNAME);
  const to_email = new helper.Email(process.env.TO_EMAIL);
  const subject = 'Contact Form Submission';
  const content = new helper.Content(
    'text/plain',
    `Message received from ${req.body.name} with and email of ${req.body.email}. 
    The message reads: ${req.body.message}`);
  const mail = new helper.Mail(from_email, subject, to_email, content);
  const requestBody = mail.toJSON();
  const request = sg.emptyRequest();
  request.method = 'POST';
  request.path = '/v3/mail/send';
  request.body = requestBody;
  sg.API(request, response => {
    console.log(response.statusCode);
    console.log(response.body);
    console.log(response.headers);
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

app.get('/mbta', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../dist/views/mbta.html`));
});

app.get('/mbta-data', (req, res) => {
  const converter = new Converter({});
  axios.get('http://developer.mbta.com/lib/gtrtfs/Departures.csv')
  .then(response => {
    converter.fromString(response.data, (err, result) =>{
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  })
  .catch(err => {
    console.log(err);
  });
});

const port = process.env.PORT || 3030;
// const port = 3030;

app.listen(port, err => {
  if (err) {
    throw new Error;
  }
  console.log(`Server listening on port ${port}`);
});
