const Post = {
  name: 'post',
  fields: `
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    residency_id INT NOT NULL,
    user_id INT NOT NULL,
    content VARCHAR(2000) NOT NULL,
    creation_date VARCHAR(256)
  `,
};

module.exports = Post;
