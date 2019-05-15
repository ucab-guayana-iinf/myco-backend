const jwt = require('jsonwebtoken');

const apiSecret = { secret: 'MYCO-SECRET-SSHHHH' };

function verifyToken(res, { authorization }) {
  if (!authorization) return res.status(400).send('Missing token');

  try {
    const regexp = /Bearer\s+(.+)/gi;
    const token = regexp.exec(authorization)[1];
    return jwt.verify(token, apiSecret.secret);
  } catch (error) {
    return res.status(401).send('Invalid token');
  }
}

module.exports = verifyToken;
