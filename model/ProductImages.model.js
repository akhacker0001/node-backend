module.exports = (sequelize, Sequelize) => {
    const ProductImage = sequelize.define(
      'product_image',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        imagePath: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        isDeleted:{
            type: Sequelize.BOOLEAN,
            default: false,
        }
      },
    );
  
    return ProductImage;
  };
  