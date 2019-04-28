const User = {
  name: 'user',
  fields: `
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(256),
    lastname VARCHAR(256),
    email VARCHAR(2048),
    social_number VARCHAR(20),
    password VARCHAR(256),
    role VARCHAR(50),
    UNIQUE (email)
  `,
};

module.exports = User;
