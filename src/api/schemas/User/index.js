const schema = require("schm");

module.exports = schema({
  username: { type: String, required: true },
  appkey: { type: String, required: true },
  secret: { type: String, required: true },
  accessToken: { type: String, required: true },
  accessTokenSecret: { type: String, required: true },
});;
