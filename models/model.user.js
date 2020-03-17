let logger = require('../logger/logger');
module.exports = (sequelize , Sequelize)=>{
    let User = sequelize.define('User' , {
        id : {
            type : Sequelize.INTEGER(20),
            primaryKey : true,
            autoIncrement : true,
            field : 'id'
        },
        username : {
            type : Sequelize.STRING(45),
            allowNull : true,
            unique : true,
            field  : "username"
        },
        password : {
            type : Sequelize.STRING(45),
            allowNull : true,
            field : "password"
        },
        email : {
            type : Sequelize.STRING(50),
            unique : true,
            allowNull : true,
            field : "email",
        },
        phone : {
            type : Sequelize.STRING(15),
            allowNull : true,
            unique : true,
            field : "phone"
        },
        fullName : {
            type : Sequelize.STRING(50),
            field : 'fullName'
        },
        studentAccount : {
            type : Sequelize.STRING(10),
            field : 'studentAccount'
        },
        studentPassword : {
            type : Sequelize.STRING(50),
            field : 'studentAccount'
        },
        dataJson : {
            type : Sequelize.JSON,
            field : 'dataJson'
        }
    },{
        tableName : 'User',
        timestamps : false
    });

    User.sync().then(()=>{
    }).catch(()=>{
        logger.error('table user is error BUG ');
    });

    return User;
};


