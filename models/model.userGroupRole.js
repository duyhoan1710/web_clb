let logger = require('../logger/logger');

module.exports = (sequelize , Sequelize)=>{
    let UserGroupRole = sequelize.define('UserGroupRole' , {
        id : {
            type : Sequelize.INTEGER(20),
            primaryKey : true,
            autoIncrement : true,
            field : 'id'
        },
        userId : {
            type : Sequelize.INTEGER(20),
            allowNull : true,
            field : 'userId'
        },
        groupId : {
            type : Sequelize.INTEGER(20),
            allowNull : true,
            field : 'groupId'
        }
    },{
        tableName : 'UserGroupRole',
        timestamps : false
    });

    UserGroupRole.sync().then(()=>{

    }).catch(()=>{
        logger.error('table UserGroupRole is not create success');
    });

    return UserGroupRole;
};