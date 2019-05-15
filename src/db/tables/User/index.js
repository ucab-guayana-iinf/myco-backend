const User = {
  name: 'user',
  fields: `
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    lastname VARCHAR(100),
    email VARCHAR(100),
    social_number VARCHAR(20),
    password VARCHAR(100),
    role VARCHAR(50),
    UNIQUE (email)
  `,
};

module.exports = User;
