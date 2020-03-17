let logger = require('../logger/logger');

module.exports =(sequelize , Sequelize)=>{
    let permission = sequelize.define('Permission' , {
        id : {
            type : Sequelize.INTEGER(20),
            primaryKey : true,
            autoIncrement : true,
            field : 'id'
        },
        permissionName : {
            type : Sequelize.STRING(30),
            allowNull : true,
            field: 'permissionName'
        },
        description : {
            type : Sequelize.STRING(500),
            field : 'description'
        }
    },{
        tableName : 'Permission',
        timestamps : false
    });

    permission.sync().then(()=>{

    }).catch(()=>{
        logger.error('table permission is not create success BUG');
    })
}
