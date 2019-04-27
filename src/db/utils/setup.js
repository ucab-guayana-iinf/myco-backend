const chalk = require('chalk');
const tables = require('../tables');
const promisifyQuery = require('./promisifyQuery');

async function setupDB(connection) {
  // create the database if it doesn't exists
  await promisifyQuery(connection, 'CREATE DATABASE IF NOT EXISTS myco');

  // use the database
  await promisifyQuery(connection, 'USE myco');

  // create the tables if they don't exist
  tables.forEach(async (table, i) => {
    const createTableQuery = `CREATE TABLE IF NOT EXISTS ${table.name} (${table.fields})`;
    await promisifyQuery(connection, createTableQuery);
    console.log(chalk.bold.green(`Successfully created table: ${table.name}`));

    if (i === tables.length - 1) {
      console.log(chalk.bold.green('Successfully executed database setup ✔'));
    }
  });
}

module.exports = setupDB;
