module.exports = (sequelize, Sequelize) => {
    const Price = sequelize.define(
      'price',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        sellingPrice: {
          type: Sequelize.INTEGER,
          default:0,
        },
        discountPercentage:{
            type: Sequelize.INTEGER,
            default:0,
        },
        discountValue:{
            type: Sequelize.INTEGER,
            default:0,
        }
      },
    );
  
    return Price;
  };
  