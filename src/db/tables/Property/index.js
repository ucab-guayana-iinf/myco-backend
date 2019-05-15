const Property = {
  name: 'property',
  fields: `
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    residency_id INT NOT NULL,
    user_id INT NOT NULL,
    yardage FLOAT(10, 2) NOT NULL,
    department_num VARCHAR(100) NOT NULL
  `,
};

module.exports = Property;
