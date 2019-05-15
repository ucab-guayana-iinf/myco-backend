const Service = {
  name: 'service',
  fields: `
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    residency_id INT NOT NULL,
    price FLOAT(14, 2),
    name VARCHAR(400)
  `,
};

module.exports = Service;
