const register = require('./User/register');
const login = require('./User/login');
const bill = require('./Residency/bill');

module.exports = {
  user: {
    register,
    login,
  },
  residency: {
    bill,
  },
};
