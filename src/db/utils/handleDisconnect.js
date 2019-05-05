const connect = require('./connect');
const { log } = require('../../utils');

function handleDisconnect(client) {
  client.on('error', async (error) => {
    log.message(`> Re-connecting lost MySQL connection: ${error}`);

    const connection = await connect();

    // eslint-disable-next-line
    client = connection;
    handleDisconnect(client);
  });
}

module.exports = handleDisconnect;
