let Sequelize = require('sequelize');
let config = require('../config/config');
let logger = require('../logger/logger');
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
        logger.error('Unable to connect to the database:', err);
    });

module.exports = {sequelize , Sequelize};
