const register = require('./User/register');
const login = require('./User/login');
const bill = require('./Residency/bill');
const data = require('./Residency/data');
const propertyType = require('./Property/propertyType');

module.exports = {
  user: {
    register,
    login,
  },
  residency: {
    bill,
    data,
  },
  property: {
    propertyType,
  },
};
