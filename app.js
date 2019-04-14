const express = require('express');
const swaggerUI = require('swagger-ui-express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const chalk = require('chalk');
const path  = require('path');
const http  = require('http');
const app = express();

const AuthenticRoute = require('./app/routes/authentic.route');
const UserRoute = require('./app/routes/user.route');

const swaggerDocument = require('./docs/swagger.json');
const errorMessage = require('./common/error-methods');
const checkToken = require('./config/secureRoute');
const errorCode = require('./common/error-code');

const router = express.Router();
const secureApi = express.Router();
const PORT = 8001;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', router);
app.use('/secureApi', secureApi);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

secureApi.use(checkToken);

// AuthenticRoute.init(router);
// UserRoute.init(secureApi);

app.get('/', (req,res) => {
  res.send('hello world');
});

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
