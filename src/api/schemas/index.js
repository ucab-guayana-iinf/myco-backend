const register = require('./User/register');
const login = require('./User/login');
const bill = require('./Residency/bill');
const post = require('./Post/post');
const data = require('./Residency/data');
const propertyType = require('./Property/propertyType');
const expense = require('./Residency/expense');
const service = require('./Residency/service');

module.exports = {
  user: {
    register,
    login,
  },
  residency: {
    bill,
    data,
    expense,
    service,
  },
  property: {
    propertyType,
  },
  post,
};
