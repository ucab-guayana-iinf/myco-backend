const Bill = {
  name: 'bill',
  fields: `
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    property_id INT NOT NULL,
    monthly_paymment FLOAT(10, 2) NOT NULL,
    debt FLOAT(10, 2) NOT NULL,
    special_fee FLOAT(10, 2) NOT NULL,
    other FLOAT(10, 2) NOT NULL,
    creation_date VARCHAR(256),
    last_update VARCHAR(256)
  `,
};

module.exports = Bill;
