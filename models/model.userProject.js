let logger = require('../logger/logger');
module.exports = (sequelize, Sequelize)=> {
    let userProject = sequelize.define('UserProject' , {
        id: {
            type: Sequelize.INTEGER(20),
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'userId'
        },
        projectId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'projectId'
        }
    },{
        tableName: 'UserProject',
        timestamps: false
    });

    userProject.sync().then(()=>{
    }).catch(()=>{
        logger.error('create table UserProject is not success');
    });
    return userProject;
};
