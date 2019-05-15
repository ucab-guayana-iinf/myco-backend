const chalk = require('chalk');
const tables = require('../tables');
const promisifyQuery = require('./promisifyQuery');

async function setupDB(connection) {
  const DB_NAME = process.env.NODE_ENV === 'production'
    ? process.env.CLEARDB_DATABASE_NAME
    : process.env.DEV_DATABASE_NAME;

  await promisifyQuery(connection, `CREATE DATABASE IF NOT EXISTS ${DB_NAME}`);

  // use the database
  await promisifyQuery(connection, `USE ${DB_NAME}`);

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
