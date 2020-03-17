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
            allowNull : false,
            field: 'permissionName'
        },
        description : {
            type : Sequelize.STRING(500),
            field : 'description',
            allowNull : true
        },
        createAt : {
            type : Sequelize.DATE,
            allowNull : false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            field : 'createAt'
        },
        updateAt : {
            type : Sequelize.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            field : 'updateAt'
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
