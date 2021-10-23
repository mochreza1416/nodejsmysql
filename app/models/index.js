const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorAliases: false,
  pool: {
    max: dbConfig.dialect.max,
    min: dbConfig.dialect.min,
    acquire: dbConfig.dialect.min,
    idle: dbConfig.dialect.idle,
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.crud = require("./crud.model.js")(sequelize, Sequelize);

module.exports = db;
