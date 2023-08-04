const bcrypt = require('bcryptjs');

module.exports = (sequelize, Sequelize) => {
  const Admin = sequelize.define(
    'admin',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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

  return Admin;
};
