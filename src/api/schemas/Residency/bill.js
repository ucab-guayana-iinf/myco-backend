const schema = require('schm');

module.exports = schema({
  property_id: { type: String, required: true },
  monthly_paymment: { type: String, required: true },
  debt: { type: String, required: true },
  special_fee: { type: String, required: true },
  other: { type: String, required: true },
});