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
const apiSchemas = require('./src/api/schemas');
const { connect, promisifyQuery } = require('./src/db');

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
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

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
      social_number: socialNumber,
      role,
      password,
    } = credentials;

    const hash = bcrypt.hashSync(password, saltRounds);

    try {
      const query = `
      INSERT INTO user
        (name, lastname, email, social_number, role, password)
      VALUES
        ('${name}', '${lastname}', '${email}', '${socialNumber}', '${role}', '${hash}')
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

  app.get('/residency/residents', async (req, res) => {
    let user;
    const { authorization } = req.headers;

    if (!authorization) return res.status(400).send('Missing token');

    try {
      const regexp = /Bearer\s+(.+)/gi;
      const token = regexp.exec(authorization)[1];
      user = jwt.verify(token, apiSecret.secret);
    } catch (error) {
      return res.status(401).send('Invalid token');
    }

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
