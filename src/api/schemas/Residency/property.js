const schema = require('schm');

module.exports = schema({
  id: { type: String, required: false },
  residency_id: { type: String, required: true },
  property_type_id: { type: String, required: true },
  user_id: { type: String, required: true },
  yardage: { type: Float32Array, required: true },
  department_num: { type: String, required: true },
});
