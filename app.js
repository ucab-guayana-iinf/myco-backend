require('dotenv').config();

const express = require('express');
const swaggerUI = require('swagger-ui-express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const chalk = require('chalk');
const path = require('path');
const schema = require('schm');

const app = express();

const swaggerDocument = require('./docs/swagger.json');
const apiSchemas = require('./src/api/schemas');
const { connect, promisifyQuery } = require('./src/db');

const PORT = 5000;

(async () => {
  const connection = await connect();

  /* ------------------ EXPRESS CONFIG ------------------ */

  app.use((req, res, next) => {
    res.header('X-Powered-By', 'MyCo - UCAB');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
  app.use(morgan('tiny'));
  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

  /* --------------------- ENDPOINTS --------------------- */

  app.post('/register', async (req, res) => {
    const credentials = await schema.validate(req.body, apiSchemas.user)
      .catch((error) => {
        res.status(400).send(error);
      });

    const {
      name,
      lastname,
      email,
      social_number: socialNumber,
      role,
      password,
    } = credentials;

    try {
      const query = `
      INSERT INTO user
        (name, lastname, email, social_number, role, password)
      VALUES
        ('${name}', '${lastname}', '${email}', '${socialNumber}', '${role}', '${password}')
      `;

      await promisifyQuery(connection, query);
      res.status(200).send('Register Success');
    } catch (error) {
      res.status(409).send(`Conflict:\n${error}`);
    }
  });

  app.get('/residency/residents', async (req, res) => {
    try {
      const response = await promisifyQuery(connection, 'SELECT * FROM user');
      const residents = response.map(resident => ({
        name: resident.name,
        lastname: resident.lastname,
        email: resident.email,
        role: resident.role,
        social_number: resident.social_number,
      }));

      console.log(residents);
      res.status(200).send({
        amount: residents.length,
        residents,
      });
    } catch (error) {
      res.status(409).send(`Conflict:\n${error}`);
    }
  });

  /* ---------------------------------------------------- */

  app.listen(process.env.PORT || PORT, () => {
    console.log(
      chalk.bold.white('> MyCo Backend init'),
    );
    console.log(
      chalk.white('> Server running on')
      + chalk.bold.blue(` http://localhost:${PORT}`)
      + chalk.bold.green(' ✔'),
    );
    console.log(
      chalk.white('> API Documentation running on')
      + chalk.bold.blue(` http://localhost:${PORT}/api-docs`)
      + chalk.bold.green(' ✔'),
    );
  });
})();
