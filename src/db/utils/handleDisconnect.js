const connect = require('./connect');

function handleDisconnect(client, cb) {
  client.on('error', async (error) => {
    console.log(`> Re-connecting lost MySQL connection: ${error}`);

    const connection = await connect();

    // eslint-disable-next-line
    client = connection;
    cb(connection);
    handleDisconnect(client);
  });
}

module.exports = handleDisconnect;
