const Expense = {
  name: 'expense',
  fields: `
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    amount FLOAT(14, 2) NOT NULL,
    concept VARCHAR(400),
    creation_date VARCHAR(256)
  `,
};

module.exports = Expense;
