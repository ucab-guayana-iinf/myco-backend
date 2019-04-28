const schema = require('schm');

module.exports = schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});
