const mysql = require('mysql');
const chalk = require('chalk');

const setup = require('./setup');

const credentials = {
  production: {
    host: process.env.CLEARDB_DATABASE_URL,
    user: process.env.CLEARDB_DATABASE_USER,
    password: process.env.CLEARDB_DATABASE_PASSWORD,
  },
  development: {
    host: process.env.DEV_DB_HOST,
    user: process.env.DEV_DB_USER,
    password: process.env.DEV_DB_PASSWORD,
  },
};

async function connect() {
  let connection;

  if (process.env.NODE_ENV === 'production') {
    connection = mysql.createConnection(credentials.production);
  } else {
    connection = mysql.createConnection(credentials.development);
  }

  // start connection
  await connection.connect((err) => {
    if (err) {
      console.log(chalk.bold.red(`CONNECTION ERROR: ${err}`));
      throw new Error('Error connecting to database');
    }
  });

  // setup the database
  await setup(connection);

  return connection;
}

module.exports = connect;
