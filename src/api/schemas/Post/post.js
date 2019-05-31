const schema = require('schm');

module.exports = schema({
  residency_id: { type: Number, required: true },
  user_id: { type: Number, required: true },
  content: { type: String, required: true },
});
