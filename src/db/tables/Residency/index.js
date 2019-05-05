const Residency = {
  name: 'residency',
  fields: `
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    admin_id VARCHAR(256),
    name VARCHAR(256)
  `,
};

module.exports = Residency;
