const User = {
  name: 'user',
  fields: `
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(256),
    password VARCHAR(256),
    UNIQUE (username)
  `,
};

module.exports = User;
