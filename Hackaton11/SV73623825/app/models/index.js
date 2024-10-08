const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");


const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});


const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.dueno = require("./dueno.model.js")(sequelize, Sequelize);
db.mascota = require("./mascota.model.js")(sequelize, Sequelize);
db.veterinario = require("./veterinario.model.js")(sequelize, Sequelize);
db.consulta = require("./consulta.model.js")(sequelize, Sequelize);

db.dueno.hasMany(db.mascota, {
   foreignKey: "duenoId",
   sourceKey: "id",
 });

 db.mascota.belongsTo(db.dueno, {
   foreignKey: "duenoId",
   targetKey: "id",
 });


module.exports = db;
