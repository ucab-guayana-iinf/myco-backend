require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');
const swaggerUI = require('swagger-ui-express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const chalk = require('chalk');
const path = require('path');
const schema = require('schm');
const bcrypt = require('bcrypt');

const app = express();
const apiSecret = { secret: 'MYCO-SECRET-SSHHHH' };

const swaggerDocument = require('./docs/swagger.json');
const swaggerConfig = require('./docs/config');
const apiSchemas = require('./src/api/schemas');
const { connect, promisifyQuery } = require('./src/db');
const utils = require('./src/utils');

const saltRounds = 10;
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
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument, swaggerConfig));

  /* --------------------- ENDPOINTS --------------------- */

  app.post('/register', async (req, res) => {
    const credentials = await schema.validate(req.body, apiSchemas.user.register)
      .catch((error) => {
        res.status(400).send(error);
      });

    const {
      name,
      lastname,
      email,
      social_number,
      role,
      password,
    } = credentials;

    const hash = bcrypt.hashSync(password, saltRounds);

    try {
      const query = `
      INSERT INTO user
        (name, lastname, email, social_number, role, password)
      VALUES
        ('${name}', '${lastname}', '${email}', '${social_number}', '${role}', '${hash}')
      `;

      await promisifyQuery(connection, query);
      return res.status(200).send('Register Success');
    } catch (error) {
      return res.status(409).send(`Conflict:\n${error}`);
    }
  });

  app.post('/login', async (req, res) => {
    const credentials = await schema.validate(req.body, apiSchemas.user.login)
      .catch((error) => {
        res.status(400).send(error);
      });

    const { email, password } = credentials;

    try {
      const query1 = `
      SELECT * FROM user
      WHERE
        email='${email}'
      LIMIT 1
      `;

      const response = await promisifyQuery(connection, query1);
      const user = response[0];

      const match = bcrypt.compare(password, user.password);

      if (match) {
        const token = jwt.sign({ id: user.id, role: user.role }, apiSecret.secret);
        res.status(200).json({ message: 'Login Success', token });
      } else {
        res.status(400).send('Invalid credentials');
      }
    } catch (error) {
      res.status(409).send(`Conflict:\n${error}`);
    }
  });


  /* --------------------- BILLS --------------------- */

  // GET

  // POST

  // PUT

  /* --------------------- DEBTS --------------------- */
  // GET

  // POST

  // PUT

  /* --------------------- PROPERTY --------------------- */
  // GET

  // POST

  // PUT

  /* ------------------- PROPERTY-TYPE ------------------- */
  // GET

  // POST

  // PUT

  /* --------------------- SERVICE --------------------- */
  // GET

  // POST

  // PUT

  /* --------------------- RESIDENCY --------------------- */

  app.post('/residency/create', async (req, res) => {
    const user = utils.verifyToken(res, req.headers);

    if (user.role !== 'ADMIN') {
      return res.status(403).send('Forbidden');
    }

    const residency = await schema.validate(req.body, apiSchemas.residency)
      .catch((error) => {
        res.status(400).send(error);
      });

    const { admin_id, name } = residency;

    try {
      const query1 = `
      INSERT INTO residency
        (admin_id, name)
      VALUES
        ('${admin_id}', '${name}')
      `;

      await promisifyQuery(connection, query1);
      return res.status(200).send('Successfully created residency');
    } catch (error) {
      return res.status(409).send(`Conflict:\n${error}`);
    }
  });

  app.get('/residency/residents', async (req, res) => {
    const user = utils.verifyToken(res, req.headers);

    if (user.role !== 'ADMIN') {
      return res.status(403).send('Forbidden');
    }

    try {
      const response = await promisifyQuery(connection, 'SELECT * FROM user');
      const residents = response.map(resident => ({
        id: resident.id,
        name: resident.name,
        lastname: resident.lastname,
        email: resident.email,
        role: resident.role,
        social_number: resident.social_number,
      }));

      return res.status(200).send({ amount: residents.length, residents });
    } catch (error) {
      return res.status(409).send(`Conflict:\n${error}`);
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
