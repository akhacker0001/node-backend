module.exports = (sequelize, Sequelize) => {
    const Rating = sequelize.define(
      'rating',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        rate: {
          type: Sequelize.INTEGER,
          default:0,
          validate:{
            min: 0,
            max: 0
          }
        },
      },
    );
  
    return Rating;
  };
  