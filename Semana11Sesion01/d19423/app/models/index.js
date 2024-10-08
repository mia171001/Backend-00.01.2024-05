const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");


const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    port: dbConfig.PORT,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

// const sequelize = new Sequelize('tutorialdb', 'root', 'pacha2024', {
//     host: 'localhost',
//     dialect: 'mysql', 
//   });


const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
db.comments = require("./comment.model.js")(sequelize, Sequelize);
db.tag = require("./tag.model.js")(sequelize, Sequelize);


db.tutorials.hasMany(db.comments, { as: "comments" });
db.comments.belongsTo(db.tutorials, {
    foreignKey: "tutorialId",
    as: "tutorial",
});


db.tag.belongsToMany(db.tutorials, {
    through: "tutorial_tag",
    as: "tutorials",
    foreignKey: "tag_id",
});

db.tutorials.belongsToMany(db.tag, {
    through: "tutorial_tag",
    as: "tags",
    foreignKey: "tutorial_id",
});



module.exports = db;
