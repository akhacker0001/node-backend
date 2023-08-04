const bcrypt = require('bcryptjs');

module.exports = (sequelize, Sequelize) => {
  const ParentCategory = sequelize.define(
    'parentCategory',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
    },
  );

  return ParentCategory;
};
