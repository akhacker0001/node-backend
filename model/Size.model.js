module.exports = (sequelize, Sequelize) => {
    const Size = sequelize.define(
      'size',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: true,
        },
      },
    );
  
    return Size;
  };
  