const schema = require('schm');

module.exports = schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  social_number: { type: String, required: true },
  role: { type: String, required: true },
  password: { type: String, required: true },
});
