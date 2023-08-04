const dbConfig = require("../config/db.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  // logging: false, //To prevent default logging to console
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
})
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Admin = require("./Admin.model.js")(sequelize, Sequelize);
db.ParentCategory = require("./ParentCategory.js")(sequelize, Sequelize);
db.Category = require("./Category.js")(sequelize, Sequelize);
db.Title = require("./Title.model.js")(sequelize, Sequelize);
db.Product = require("./Product.model.js")(sequelize, Sequelize);
db.Meta = require("./Meta.model.js")(sequelize, Sequelize);
db.Price = require("./Price.model.js")(sequelize, Sequelize);
db.ProductImages = require("./ProductImages.model.js")(sequelize, Sequelize);
db.Rating = require("./Rating.model.js")(sequelize, Sequelize);
db.Size = require("./Size.model.js")(sequelize, Sequelize);
db.Color = require("./Color.model.js")(sequelize, Sequelize);
db.Customer = require("./Customer.model.js")(sequelize, Sequelize);

// title product 

db.Title.hasOne(db.Product,{
  as:'product'
})

db.Product.belongsTo(db.Title,{
  as:'title'
})



// category 
db.ParentCategory.hasMany(db.Category,{
  as:'categories'
})

db.Category.belongsTo(db.ParentCategory,{
  as:'parentCategory'
})

// colors product
db.Color.belongsToMany(db.Product,{
  through: "productColors",
  foreignKey: 'productId',
  as:'product'
})

db.Product.belongsToMany(db.Color,{
  through: "productColors",
  foreignKey: 'colorId',
  as:'colors'
})
// colors product

//  product meta 
db.Product.hasOne(db.Meta,{
  foreignKey: 'productId',
  as:'meta'
})

db.Meta.belongsTo(db.Product,{
  as:'product'
})
//  product meta 


// product images 
db.Product.hasMany(db.ProductImages,{
  as:'images'
})

db.ProductImages.belongsTo(db.Product,{
  as:'product'
})
// product images 

// product prices 
db.Product.hasMany(db.Price,{
  as:'prices'
})

db.Price.belongsTo(db.Product,{
  as:'product'
})
// product prices 

// product rating 
db.Product.belongsToMany(db.Rating,{
  through: "productRatings",
  foreignKey: 'ratingId',
  as:'rating'
})
db.Rating.belongsToMany(db.Product,{
  through: "productRatings",
  foreignKey: 'productId',
  as:'product'
})
// product rating 

// customer rating 
db.Rating.belongsToMany(db.Customer,{
  through: "customerRatings",
  foreignKey: 'customerId',
  as:'customers'
})

db.Customer.belongsToMany(db.Rating,{
  through: "customerRatings",
  foreignKey: 'ratingId',
  as:'ratings'
})
// customer rating 
// db.Rating.removeAttribute('id'); // This will remove the default 'id' field if it exists
// db.Rating.addConstraint('unique_rating_per_customer_product', {
//   type: 'unique',
//   fields: ['customerId', 'productId'],
//   name: 'unique rating'
// });


// through: "productImages",
// foreignKey: 'productId',
// as: 'images'

db.Rating.init({
  customerId: {
    type: Sequelize.INTEGER,
    unique: 'unique_rating_per_customer_product',
  },
  productId: {
    type: Sequelize.INTEGER,
    unique: 'unique_rating_per_customer_product',
  },
  // Other rating attributes
}, {
  sequelize,
  modelName: 'Rating',
});



module.exports = db;


