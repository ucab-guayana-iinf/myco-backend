const register = require('./User/register');
const login = require('./User/login');

module.exports = {
  user: {
    register,
    login,
  },
};
