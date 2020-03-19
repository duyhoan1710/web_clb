let logger = require('../logger/logger');


module.exports = (sequelize , Sequelize) =>{
    let groupRole = sequelize.define('GroupRole' , {
        id : {
            type : Sequelize.INTEGER(20),
            primaryKey : true,
            autoIncrement : true,
            field : 'id'
        },
        groupId : {
            type : Sequelize.INTEGER(20),
            allowNull : false,
            field : 'groupId'
        },
        roleId : {
            type : Sequelize.INTEGER(20),
            allowNull : false,
            field : 'roleId'
        }
    },{
        tableName : 'GroupRole',
        timestamps : false
    });

    groupRole.sync().then(()=>{

    }).catch(()=>{
        logger.error('table groupRole is not create success BUG');
    })


    return groupRole;
};