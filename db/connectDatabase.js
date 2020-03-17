let Sequelize = require('sequelize');
let config = require('../config');
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


let userModel = require('../models/model.user')(sequelize , Sequelize);
let groupModel = require('../models/model.group')(sequelize , Sequelize);
let roleModel = require('../models/model.role')(sequelize, Sequelize);
let userGroupRoleModel = require('../models/model.userGroupRole')(sequelize , Sequelize);
let groupRolePermissionModel = require('../models/model.groupRolePermission')(sequelize , Sequelize);
let permissionModel = require('../models/model.permission')(sequelize , Sequelize);
let guestModel = require('../models/model.guest')(sequelize ,Sequelize);
let newsModel = require('../models/model.news')(sequelize , Sequelize);
let imageModel = require('../models/model.image')(sequelize , Sequelize);
let imageNewsModel = require('../models/model.imageNews')(sequelize , Sequelize);

let db = {
    userModel : userModel,
    groupModel : groupModel,
    roleModel : roleModel,
    userGroupRoleModel : userGroupRoleModel,
    groupRolePermissionModel : groupRolePermissionModel,
    permissionModel : permissionModel,
    guestModel : guestModel,
    newsModel : newsModel,
    imageModel : imageModel,
    imageNewsModel : imageNewsModel
};

module.exports = db;