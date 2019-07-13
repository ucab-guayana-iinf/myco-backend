const register = require('./User/register');
const login = require('./User/login');
const bill = require('./Residency/bill');
const post = require('./Post/post');
const data = require('./Residency/data');
const propertyType = require('./Property/propertyType');
const expense = require('./Residency/expense');
const service = require('./Residency/service');
const property = require('./Residency/property');
const payment = require('./Residency/payment');

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
    payment,
    property,
  },
  property: {
    propertyType,
  },
  post,
};
