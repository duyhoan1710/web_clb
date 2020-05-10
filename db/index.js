let {sequelize , Sequelize} = require('./connectDatabase');

let userModel = require('../models/model.user')(sequelize , Sequelize);
let groupModel = require('../models/model.group')(sequelize , Sequelize);
let roleModel = require('../models/model.role')(sequelize, Sequelize);
let groupRoleModel = require('../models/model.groupRole')(sequelize , Sequelize);
let userGroupRoleModel = require('../models/model.userGroupRole')(sequelize , Sequelize);
let groupRolePermissionModel = require('../models/model.groupRolePermission')(sequelize , Sequelize);
let permissionModel = require('../models/model.permission')(sequelize , Sequelize);
let guestModel = require('../models/model.guest')(sequelize ,Sequelize);
let newsModel = require('../models/model.news')(sequelize , Sequelize);
let imageModel = require('../models/model.image')(sequelize , Sequelize);
let notifyModel = require('../models/model.notify')(sequelize , Sequelize);
let projectModel = require('../models/model.project')(sequelize, Sequelize);
let userProjectModel = require('../models/model.userProject')(sequelize, Sequelize);
let taskModel = require('../models/model.task')(sequelize, Sequelize);

let db = {
    userModel : userModel,
    groupModel : groupModel,
    roleModel : roleModel,
    groupRoleModel : groupRoleModel,
    userGroupRoleModel : userGroupRoleModel,
    groupRolePermissionModel : groupRolePermissionModel,
    permissionModel : permissionModel,
    guestModel : guestModel,
    newsModel : newsModel,
    imageModel : imageModel,
    notifyModel : notifyModel,
    projectModel: projectModel,
    userProjectModel: userProjectModel,
    taskModel: taskModel
};

require('../models/references/model.references')(db);

module.exports = db;
