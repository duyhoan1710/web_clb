let logger = require('../logger/logger');

module.exports = (sequelize , Sequelize)=>{
    let Role = sequelize.define('Role' , {
        id : {
            type : Sequelize.INTEGER(20),
            primaryKey : true,
            autoIncrement : true,
            field : 'id'
        },
        roleName : {
            type : Sequelize.STRING(30),
            allowNull : false,
            unique : true,
            field : 'roleName'
        },
        description : {
            type : Sequelize.STRING(500),
            allowNull : true,
            field : 'description'
        },
        createAt : {
            type : Sequelize.DATE,
            allowNull : false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            field  : 'createAt'
        },
        updateAt : {
            type : Sequelize.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            field : 'updateAt'
        }
    } , {
        tableName : 'Role',
        timestamps : false
    });

    Role.sync().then(()=>{

    }).catch(()=>{
        logger.error('table role is not create success BUG');
    });

    return Role;
}