module.exports = (db)=>{
    const { userModel , groupModel , roleModel , groupRoleModel, userGroupRoleModel , groupRolePermissionModel , permissionModel , newsModel , imageModel , notifyModel } = db;

    // role associate  with group
    groupModel.belongsToMany(roleModel , {through : groupRoleModel , as : 'role' , foreignKey : 'groupId'});
    roleModel.belongsToMany(groupModel , {through : groupRoleModel , as : 'group' , foreignKey : 'roleId'});

    groupRoleModel.belongsTo(roleModel , {foreignKey : 'roleId'});
    groupRoleModel.belongsTo(groupModel,{foreignKey : 'groupId'});

    // user associate  with groupRole

    userModel.belongsToMany(groupRoleModel , {through : userGroupRoleModel , as : 'groupRole' , foreignKey : 'userId'});
    groupRoleModel.belongsToMany(userModel , {through : userGroupRoleModel , as : 'user' , foreignKey : 'groupRoleId'});

    userGroupRoleModel.belongsTo(userModel , {foreignKey : 'userId'});
    userGroupRoleModel.belongsTo(groupRoleModel , {foreignKey : 'groupRoleId'});

    // permission associate  with groupRole

    permissionModel.belongsToMany(groupRoleModel , {through : groupRolePermissionModel , as : 'groupRole' , foreignKey : 'permissionId'});
    groupRoleModel.belongsToMany(permissionModel , {through : groupRolePermissionModel , as : 'permission' , foreignKey : 'groupRoleId'});

    groupRolePermissionModel.belongsTo(permissionModel , {foreignKey : 'permissionId'});
    groupRolePermissionModel.belongsTo(groupRoleModel , {foreignKey : 'groupRoleId'});

    // user associate with news
    userModel.hasMany(newsModel , {as : 'news' , foreignKey : 'authorId'});
    newsModel.belongsTo(userModel , {as : 'author' , foreignKey : 'authorId'});

    // news associate  with image
    newsModel.hasMany(imageModel , {as : 'news' , foreignKey : 'newsId'});
    imageModel.belongsTo(newsModel , {as : 'news' , foreignKey : 'newsId'});

    // notify associate with author

    // userModel.hasMany(notifyModel , {as : 'notify' , foreignKey : 'authorId'});
    // notifyModel.belongsTo(userModel , {as : 'notify' , foreignKey : 'authorId'});
    userModel.belongsToMany(groupModel , {through :{model : notifyModel , unique : false }, as : 'group' , foreignKey : 'authorId'});
    groupModel.belongsToMany(userModel , {through :{model : notifyModel , unique : false} ,as : 'user' , foreignKey : 'groupId' , unique : false});
    notifyModel.belongsTo(userModel , {foreignKey : 'authorId'});
    notifyModel.belongsTo(groupModel , {foreignKey : 'groupId'});
};
