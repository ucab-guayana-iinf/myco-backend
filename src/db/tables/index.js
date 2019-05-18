const Bill = require('./Bill');
const Debt = require('./Debt');
const Expense = require('./Expense');
const Property = require('./Property');
const PropertyType = require('./PropertyType');
const PropertyService = require('./PropertyService');
const Residency = require('./Residency');
const Service = require('./Service');
const User = require('./User');

const tables = [
  Bill,
  Debt,
  Expense,
  Property,
  PropertyType,
  PropertyService,
  Residency,
  Service,
  User,
];

module.exports = tables;
