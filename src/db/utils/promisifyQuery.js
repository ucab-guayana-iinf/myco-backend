const chalk = require('chalk');

function promisifyQuery(connection, query) {
  return new Promise(async (resolve, reject) => {
    await connection.query(query, (err, res) => {
      if (err) {
        console.log(chalk.bold.red(`ERROR PROCESSING QUERY: ${query}\nERROR MESSAGE: ${err}`));
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

module.exports = promisifyQuery;
