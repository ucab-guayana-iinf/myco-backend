const schema = require('schm');

module.exports = schema({
  admin_id: { type: String, required: true },
  name: { type: String, required: true },
  yardage: { type: Float32Array, required: true },
});
