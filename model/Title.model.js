module.exports = (sequelize, Sequelize) => {
    const Title = sequelize.define(
      'title',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        titleName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
    );
    return Title;
  };
  