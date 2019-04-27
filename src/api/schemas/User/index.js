const schema = require('schm');

module.exports = schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});
