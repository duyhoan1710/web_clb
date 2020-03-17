let logger = require('../logger/logger');

module.exports = (sequelize , Sequelize)=>{
    let Groups = sequelize.define('Group' , {
        id : {
           type : Sequelize.INTEGER(20),
            primaryKey : true,
            autoIncrement : true,
            field : 'id'
        },
        nameGroup : {
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
            field : 'createAt',
        },
        updateAt : {
            type : Sequelize.DATE,
            field : 'updateAt'
        }
    },{
        tableName : 'Group',
        timestamps : false
    });

    Groups.sync().then(()=>{

    }).catch(()=>{
        logger.error('table group not create success BUG');
    });

    return Groups;
};