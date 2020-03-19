let logger = require('../logger/logger');

module.exports = (sequelize , Sequelize)=>{
    let userGroupRole = sequelize.define('UserGroupRole' , {
        id : {
            type : Sequelize.INTEGER(20),
            primaryKey : true,
            autoIncrement : true,
            field : 'id'
        },
        userId : {
            type : Sequelize.INTEGER(20),
            allowNull : false,
            field : 'userId'
        },
        groupRoleId : {
            type : Sequelize.INTEGER(20),
            allowNull : false,
            field : 'groupRoleId'
        },
        status : {
            type : Sequelize.Boolean,
            allowNull : false,
            defaultValue : true,
            field : 'status'
        }
    },{
        tableName : 'UserGroupRole',
        timestamps : false
    });

    userGroupRole.sync().then(()=>{

    }).catch(()=>{
        logger.error('table UserGroupRole is not create success');
    });

    return userGroupRole;
};