const Debt = {
  name: 'debt',
  fields: `
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    property_id INT NOT NULL,
    amount FLOAT(10, 2) NOT NULL,
    description VARCHAR(256) NOT NULL,
    status VARCHAR(50) NOT NULL,
    creation_date VARCHAR(256),
    last_update VARCHAR(256)
  `,
};

module.exports = Debt;
