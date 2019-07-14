const Payment = {
  name: 'payment',
  fields: `
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    bill_id INT NOT NULL,
    user_id INT NOT NULL,
    creation_date VARCHAR(256),
    amount FLOAT(10, 2) NOT NULL,
    description VARCHAR(256) NOT NULL,
    confirmation INT NOT NULL
`,
};

module.exports = Payment;
