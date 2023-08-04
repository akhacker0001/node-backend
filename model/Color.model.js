module.exports = (sequelize, Sequelize) => {
    const Color = sequelize.define(
      'color',
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
  
    return Color;
  };
  