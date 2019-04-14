async function closeConnection(connection) {
  await connection.end();
}

module.exports = closeConnection;
