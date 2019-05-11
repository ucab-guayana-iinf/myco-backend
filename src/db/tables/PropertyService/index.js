const PropertyService = {
  name: 'property_service',
  fields: `
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    service_id INT NOT NULL,
    property_id INT NOT NULL
  `,
};

module.exports = PropertyService;
