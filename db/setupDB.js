// Definición de tablas
const tables = [
  {
    name: 'user',
    fields: `
      id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
      nombre VARCHAR(255) NOT NULL,
      direccion VARCHAR(255),
      email VARCHAR(255),
    `,
  }
];

async function setupDB(connection) {
  // create the database if it doesn't exists
  await promisifyQuery(connection, 'CREATE DATABASE IF NOT EXISTS myco');

  // use the database
  await promisifyQuery(connection, 'USE myco');

  // create the tables if they don't exist
  tables.forEach(async (table) => {
    const createTableQuery = `CREATE TABLE IF NOT EXISTS ${table.name} (${table.fields})`;
    await promisifyQuery(connection, createTableQuery);
  });
}

module.exports = setupDB;

// checking if metadata table contains something
// const a = await promisifyQuery(connection, 'SELECT COUNT(*) AS RowCnt FROM scrapperMetadata');
//
// // if metadata table is empty, set default values
// if (a[0].RowCnt === 0) {
//   // insert initial values
//   const insertDefaultValuesQuery = `
//     INSERT INTO scrapperMetadata
//       (lastCategoryIndex, lastSubCategoryIndex, lastStateIndex, lastBusinessIndex)
//     VALUES
//       (0, 0, 0, 0)
//   `;
//
//   await promisifyQuery(connection, insertDefaultValuesQuery);
// }
