const bcrypt = require('bcryptjs');

module.exports = (sequelize, Sequelize) => {
  const AdminUser = sequelize.define(
    'adminUsers',
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
      isAdmin:{
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      password: {
        type: Sequelize.STRING(200),
        set(value) {
          this.setDataValue('password', bcrypt.hashSync(value, bcrypt.genSaltSync(10)));
        },  
      },
    },
  );

  return AdminUser;
};
