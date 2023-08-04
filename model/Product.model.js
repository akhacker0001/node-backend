module.exports = (sequelize, Sequelize) => {
    const Producr = sequelize.define(
      'product',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
    );
  
    return Producr;
  };
  