const mysql = require('mysql');
const credentials = require('../config').dbCredentials;
const setup = require('./setupDB');
const promisifyQuery = require('./promisifyQuery');

async function connectToDB() {
  let connection;

  if (process.env.NODE_ENV === 'production') {
    connection = mysql.createConnection(credentials.production);
  } else {
    connection = mysql.createConnection(credentials.development);
  }

  // start connection
  await connection.connect((err) => {
    if (err) {
      console.error(`CONNECTION ERROR: ${err}`);
    }
  });

  // setup the db
  await setupDB(connection);

  console.log('successful connection to the DB');
  return connection;
}

module.exports = connectToDB;
