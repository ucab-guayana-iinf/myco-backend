const schema = require('schm');

module.exports = schema({
  property_id: { type: String, required: true },
  monthly_paymment: { type: Float32Array, required: true },
  debt: { type: Float32Array, required: true },
  special_fee: { type: Float32Array, required: true },
  other: { type: Float32Array, required: true },
});