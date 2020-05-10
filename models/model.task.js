let logger = require('../logger/logger');

module.exports = (sequelize, Sequelize) =>{
    let task = sequelize.define('Task' , {
        id:{
          type: Sequelize.INTEGER(20),
          primaryKey: true,
          autoIncrement: true,
          field:'id'
        } ,
        userProjectId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'userProjectId'
        },
        taskName: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'taskName'
        },
        description: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'description'
        },
        status: {
            type: Sequelize.INTEGER(1),
            validate: {
                is: /^[1-4]$/,
            },
            defaultValue: 1,
            field: 'status'
        },
        startTime: {
            type: 'TIMESTAMP',
            allowNull: false,
            field: 'startTime',
        },
        endTime: {
            type: 'TIMESTAMP',
            allowNull: false,
            field: 'endTime'
        }
    },{
        tableName: 'Task',
        timestamps: false
    });

    task.sync().then(()=>{

    }).catch(()=>{
        logger.error('create table task is not success');
    });

    return task;
}
