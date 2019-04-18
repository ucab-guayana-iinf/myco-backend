require('dotenv').config();

const express = require('express');
const swaggerUI = require('swagger-ui-express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const chalk = require('chalk');
const path  = require('path');
const http  = require('http');
const schema = require('schm');
const app = express();

const swaggerDocument = require('./docs/swagger.json');
const apiSchemas = require('./src/api/schemas');

const PORT = 8001;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

/* --------------------- ENDPOINTS --------------------- */

app.get('/', (req,res) => {
  res.send('hello world');
});

app.post('/register-user', async (req, res) => {
  await schema.validate(req.body, apiSchemas.user)
    .then((credentials) => {
      // TODO: register user
      res.status(200).send('Success');
    }).catch((errors) => {
      res.status(400).send(errors);
    });
});

/* ---------------------------------------------------- */


app.listen(process.env.PORT || PORT, () => {
  console.log(
    chalk.bold.white('> MyCo Backend init')
  );
  console.log(
    chalk.white('> Server running on')
    + chalk.bold.blue(` http://localhost:${PORT}`)
    + chalk.bold.green(' ✔')
  );
  console.log(
    chalk.white(`> API Documentation running on`)
    + chalk.bold.blue(` http://localhost:${PORT}/api-docs`)
    + chalk.bold.green(' ✔')
  );
});
