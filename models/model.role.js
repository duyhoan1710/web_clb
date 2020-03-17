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
            allowNull : true,
            field : 'roleName'
        },
        description : {
            type : Sequelize.STRING(500),
            field : 'description'
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