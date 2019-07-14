const PropertyType = {
  name: 'property_type',
  fields: `
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    residency_id INT NOT NULL,
    name VARCHAR(526) NOT NULL,
    yardage FLOAT(10, 2) NOT NULL
  `,
};

module.exports = PropertyType;
