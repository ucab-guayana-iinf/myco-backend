const schema = require('schm');

module.exports = schema({
  residency_id: { type: String, required: true },
  price: { type: Float32Array, required: true },
  name: { type: String, required: true },
});
