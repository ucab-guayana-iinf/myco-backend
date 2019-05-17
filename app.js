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
const handleDisconnect = require('./src/db/utils/handleDisconnect');
const utils = require('./src/utils');

const saltRounds = 10;
const PORT = 5000;
let connection;

(async () => {
  connection = await connect();
  handleDisconnect(connection);

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
  app.get('/residency/bills', async (req, res) => {
    try {
      const response = await promisifyQuery(connection, `SELECT * FROM bill WHERE property_id = ` + req.body.property_id);
      const bills = response.map(bills => ({
        id: bills.id,
        property_id: bills.property_id,
        monthly_paymment: bills.monthly_paymment,
        debt: bills.debt,
        special_fee: bills.special_fee,
        other: bills.other,
        creation_date: bills.creation_date,
        last_update: bills.last_update,
      }));

      return res.status(200).send({bills});
    } catch (error) {
      return res.status(409).send(`Conflict:\n${error}`);
    }
  });

  //POST
  app.post('/residency/bills', async (req, res) => {
    const bill = await schema.validate(req.body, apiSchemas.residency.bill)
      .catch((error) => {
        res.status(400).send(error);
      });

    const {
      property_id,
      monthly_paymment,
      debt,
      special_fee,
      other,
      date = new Date(),
    } = bill;

    try {
      const query = `
      INSERT INTO bill
        (property_id, monthly_paymment, debt, special_fee, other, creation_date, last_update)
      VALUES
        ('${property_id}', '${monthly_paymment}', '${debt}', '${special_fee}', '${other}', '${date}', '${date}')
      `;

      await promisifyQuery(connection, query);
      return res.status(200).send('Bill saved succesfully');
    } catch (error) {
      return res.status(409).send(`Conflict:\n${error}`);
    }
  });

  // PUT
  app.put('/residency/bills', async (req, res) => {
    const bill = await schema.validate(req.body, apiSchemas.residency.bill)
      .catch((error) => {
        res.status(400).send(error);
      });

    const {
      property_id,
      monthly_paymment,
      debt,
      special_fee,
      other,
      date = new Date(),
    } = bill;

    try {
      var query = `UPDATE bill SET property_id = '${property_id}', monthly_paymment = '${monthly_paymment}', debt = '${debt}', special_fee = '${special_fee}', other = '${other}', last_update = '${date}' WHERE id = '${req.body.id}'`;
      await promisifyQuery(connection, query);
      return res.status(200).send('Bill updated successfuly')
    } catch (error) {
      return res.status(409).send(`Conflict:\n${error}`);
    }
  });

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
 
     const residency = await schema.validate(req.body, apiSchemas.residency.data)
       .catch((error) => {
         res.status(400).send(error);
       });
 
     const { admin_id, name, yardage } = residency;
 
     try {
       var query = `
       INSERT INTO residency
         (admin_id, name, yardage)
       VALUES
         ('${admin_id}', '${name}', '${yardage}')
       `;
 
       await promisifyQuery(connection, query);
       return res.status(200).send('Successfully created residency');
     } catch (error) {
       return res.status(409).send(`Conflict:\n${error}`);
     }
   });
 
   app.get('/residency/:id', async (req, res) => {
     try {
       const response = await promisifyQuery(connection, `SELECT * FROM residency WHERE id = ` + req.params.id);
       const residency = response.map(residency => ({
         id: residency.id,
         admin_id: residency.admin_id,
         name: residency.name,
         yardage: residency.yardage,
       }));
 
       return res.status(200).send({residency});
     } catch (error) {
       return res.status(409).send(`Conflict:\n${error}`);
     }
   });
 
   /*---------------------To finish---------------------*/
   app.put('/residency/update'), async (req, res)=>{
     const user = utils.verifyToken(res, req.headers);
 
     if (user.role !== 'ADMIN') {
       return res.status(403).send('Forbidden');
     }
 
     const residency = await schema.validate(req.body, apiSchemas.residency.data)
       .catch((error) => {
         res.status(400).send(error);
       });
 
     const {
       admin_id,
       name,
       yardage,
     } = residency;
 
     try {
       var query = `UPDATE residency SET admin_id = '${admin_id}', name = '${name}', yardage = '${yardage}' WHERE id = '${req.body.id}'`;
       await promisifyQuery(connection, query);
       return res.status(200).send('Residency updated successfuly')
     } catch (error) {
       return res.status(409).send(`Conflict:\n${error}`);
     }
   };
  app.get('/residency/residents', async (req, res) => {
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

  /* ------------------- RESIDENCY SERVICES --------------------- */

  //POST

    app.post('/residency/service', async (req, res) => {
      const user = utils.verifyToken(res, req.headers);

      if (user.role !== 'ADMIN') {
        return res.status(403).send('Forbidden');
      }

      const service = await schema.validate(req.body, apiSchemas.residency.service)
      .catch((error) => {
        res.status(400).send(error);
      });

      const {
        id,
        residency_id,
        price,
        name,
      } = service;

      try{
        const query = `INSERT INTO service (id, property_id, price, name) VALUES
        ('${id}', '${residency_id}', '${price}', '${name}')`;

        await promisifyQuery(connection, query);
        return res.status(200).send('Service saved succesfully');
      } catch (error) {
        return res.status(409).send(`Conflict:\n${error}`);
    }
    });

  //GET

    app.get('/residency/service', async (req, res) => {
      const user = utils.verifyToken(res, req.headers);

      if (user.role !== 'ADMIN') {
        return res.status(403).send('Forbidden');
      }
    
      try{
        const response = await promisifyQuery(connection, `SELECT * FROM service WHERE residency_id = ${req.body.residency_id}`);
        const services = response.map(service => ({
          name: service.name,
          residency_id: service.residency_id,
        }))

        return res.status(200).send(services);
      }catch(error){
        return res.status(409).send(`Conflict:\n${error}`);
      }
    });

  //PUT
  
    app.put('/residency/service', async (req, res) => {
      const service = await schema.validate(req.body, apiSchemas.residency.service)
        .catch((error) => {
          res.status(400).send(error);
        });

      const {
        residency_id,
        price,
        name,
      } = service;

      try {
        var query = `UPDATE service SET residency_id = '${residency_id}', price = '${price}', name = '${name}' WHERE id = '${req.body.id}'`;
        await promisifyQuery(connection, query);
        return res.status(200).send('Service updated successfuly')
      } catch (error) {
        return res.status(409).send(`Conflict:\n${error}`);
      }
    });

  /* ---------------------------------------------------- */

  app.get('/', (req, res) => {
    res.send('Watcha lookin\' at?');
  });

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
