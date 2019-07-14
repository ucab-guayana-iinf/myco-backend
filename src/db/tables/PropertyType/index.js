const PropertyType = {
  name: 'property_type',
  fields: `
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    residency_id INT NOT NULL,
    name VARCHAR(526) NOT NULL
  `,
};

module.exports = PropertyType;
