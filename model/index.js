const dbConfig = require("../config/db.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, {
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


module.exports = db;