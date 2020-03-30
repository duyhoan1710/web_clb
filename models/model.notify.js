let logger = require('../logger/logger');

module.exports = (sequelize , Sequelize)=>{
    let notify = sequelize.define('Notify' , {
        id : {
            type : Sequelize.INTEGER(20),
            primaryKey : true,
            autoIncrement : true,
            field : 'id'
        },
        authorId : {
            type : Sequelize.INTEGER(20),
            unique : false,
            allowNull : false,
            field : 'authorId'
        },
        groupId : {
            type : Sequelize.INTEGER(20),
            allowNull : false,
            unique : false,
            field : 'groupId'
        },
        title : {
            type : Sequelize.STRING(200),
            allowNull : false,
            field : 'title'
        },
        content : {
            type : Sequelize.STRING(1000),
            allowNull : false,
            field : 'content'
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
        tableName : 'Notify',
        timestamps : false
    });

    notify.sync().then(()=>{

    }).catch(()=>{
        logger.error('table notify is not create success BUG');
    });

    return notify;
};
