const bcrypt = require('bcryptjs');

module.exports = (sequelize, Sequelize) => {
  const Customer = sequelize.define(
    'customer',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name:{
        type: Sequelize.STRING,
        allowNull: false,
        },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(200),
        set(value) {
          this.setDataValue('password', bcrypt.hashSync(value, bcrypt.genSaltSync(10)));
        },  
      },
    },
  );

  return Customer;
};
