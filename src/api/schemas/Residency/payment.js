const schema = require('schm');

module.exports = schema({
  bill_id: { type: String, required: true },
  user_id: { type: String, required: true },
  amount: { type: Float32Array, required: true },
  description: { type: String, required: true },
});
