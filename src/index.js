require('dotenv').config();

const bodyParser = require("body-parser");
const express = require('express');
const morgan = require('morgan')
const chalk = require('chalk');
const schema = require('schm');
const app = express();

const db = require('./db');
const apiSchemas = require('./api/schemas');

const PORT = 3000;

db.connect();

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/register-user', async (req, res) => {
  await schema.validate(req.body, apiSchemas.user)
    .then((credentials) => {
      // register user
      res.status(200).send('Success');
    }).catch((errors) => {
      res.status(400).send(errors);
    });
});

app.listen(process.env.PORT || PORT, () => {
  console.log(chalk.bold.green('listening on port 3000!'));
});
