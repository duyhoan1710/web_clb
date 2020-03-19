let logger = require('../logger/logger');

module.exports = (sequelize , Sequelize)=>{
    let group = sequelize.define('Group' , {
        id : {
           type : Sequelize.INTEGER(20),
            primaryKey : true,
            autoIncrement : true,
            field : 'id'
        },
        groupName : {
            type : Sequelize.STRING(50),
            allowNull : false,
            unique : true,
            field : 'nameGroup'
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
            field : 'createAt',
        },
        updateAt : {
            type : Sequelize.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            field : 'updateAt'
        }
    },{
        tableName : 'Group',
        timestamps : false
    });

    group.sync().then(()=>{

    }).catch(()=>{
        logger.error('table group not create success BUG');
    });

    return group;
};