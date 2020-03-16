let Sequelize = require('sequelize');
let config = require('../config');

let sequelize = new Sequelize(config.database , config.username , config.password , {
    host : config.host,
    post : config.post,
    dialect : config.dialect,
    pool: {
        max: 50,
        min: 0,
        idle: 10000
    }
});


sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


let userModel = require('../models/model.user')(sequelize , Sequelize);

let db = {
    userModel : userModel
};

module.exports = db;