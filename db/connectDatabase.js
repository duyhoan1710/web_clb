let Sequelize = require('sequelize');
let config = require('../config/config');
let logger = require('../logger/logger');


let sequelize = new Sequelize(config.database , config.username , config.password , {
    host : config.host,
    post : config.post,
    dialect : config.dialect,
    logging: false,
    pool: {
        max: 50,
        min: 0,
        idle: 10000
    },define : {
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
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
