let {sequelize , Sequelize} = require('./connectDatabase');

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

require('../models/references/model.renferences')(db);

module.exports = db;