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
            allowNull : true,
            unique : true,
            field : 'nameGroup'
        },
        description : {
            type : Sequelize.STRING(500),
            field : 'description'
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