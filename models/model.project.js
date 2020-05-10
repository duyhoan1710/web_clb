let logger = require('../logger/logger');
module.exports = (sequelize, Sequelize) => {
    let project = sequelize.define('Project' , {
        id : {
            type : Sequelize.INTEGER(20),
            primaryKey : true,
            autoIncrement : true,
            field : 'id'
        },
        projectName: {
            type: Sequelize.STRING(100),
            allowNull: false,
            field: 'projectName'
        },
        userId: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            field: 'userId'
        }
    },{
        tableName: 'Project',
        timestamps: true
    });

    project.sync().then(()=>{
    }).catch((e)=>{
        logger.error('create table project is not success' + e);
    });

    return project;
};
