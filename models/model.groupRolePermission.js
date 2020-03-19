let logger = require('../logger/logger');

module.exports = (sequelize , Sequelize)=>{
    let GroupRolePermission = sequelize.define('GroupRolePermission' , {
        id : {
            type : Sequelize.INTEGER(20),
            primaryKey : true,
            autoIncrement : true,
            field : 'id'
        },
        groupRoleId : {
            type : Sequelize.INTEGER(20),
            allowNull : false,
            field : 'groupRoleId'
        },
        permissionId : {
            type : Sequelize.INTEGER(20),
            allowNull : false,
            field : 'permissionId'
        }
    },{
        tableName : 'GroupRolePermission',
        timestamps : false
    });

    GroupRolePermission.sync().then(()=>{

    }).catch(()=>{
        logger.error('table GroupRolePermission is not create success BUG');
    });

    return GroupRolePermission;
};