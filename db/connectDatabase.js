let Sequelize = require('sequelize');
let config = require('../config');

let sequelize = new Sequelize(config.database , config.username , config.password , {
    host : config.host,
    post : config.post,
    dialect : config.dialect
});


sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
let db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;