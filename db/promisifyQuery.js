async function promisifyQuery(connection, query) {
  return new Promise(async (resolve, reject) => {
    await connection.query(query, (err, res) => {
      if (err) {
        console.log(`ERROR PROCESSING QUERY: ${query}\nERROR MESSAGE: ${err}`);
        reject(new Error('Error processing query'));
      } else {
        resolve(res);
      }
    });
  });
}

module.exports = promisifyQuery;
