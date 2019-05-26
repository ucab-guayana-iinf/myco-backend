const schema = require('schm');

module.exports = schema({
  user_id: { type: String, required: true },
  amount: { type: Float32Array, required: true },
  concept: { type: String, required: true, lenght: 400 },
});
