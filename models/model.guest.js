let logger = require('../logger/logger');

module.exports = (sequelize , Sequelize)=>{
    let guest = sequelize.define('Guest' , {
        id : {
            type : Sequelize.INTEGER(20),
            primaryKey : true,
            autoIncrement : true,
            field : 'id',
        },
        studentAccount : {
            type : Sequelize.STRING(15),
            allowNull : false,
            field : 'studentAccount'
        },
        studentPassword : {
            type : Sequelize.STRING(50),
            allowNull : false,
            field : 'studentPassword'
        },
        dataJson : {
            type : Sequelize.JSON,
            allowNull : false,
            field : 'dataJson'
        },
        fullName : {
            type : Sequelize.STRING(30),
            field : 'fullName',
            allowNull : true
        },
        classroom : {
            type : Sequelize.STRING(10),
            allowNull : true,
            field : 'classroom'
        }
    }, {
        tableName : 'guest',
        timestamps : false
    });

    guest.sync().then(()=>{

    }).catch(()=>{
        logger.error('table guest is not create success BUG');
    });

    return guest;

};