const Residency = {
  name: 'residency',
  fields: `
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    admin_id INT NOT NULL,
    name VARCHAR(256),
    yardage FLOAT(14, 2)
  `,
};

module.exports = Residency;
