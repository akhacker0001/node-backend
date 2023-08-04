module.exports = (sequelize, Sequelize) => {
    const Meta = sequelize.define(
      'meta',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        description: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
    );
  
    return Meta;
  };
  