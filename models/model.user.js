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
            allowNull : false,
            unique : true,
            field  : "username"
        },
        password : {
            type : Sequelize.STRING(45),
            allowNull : false,
            field : "password"
        },
        email : {
            type : Sequelize.STRING(50),
            unique : true,
            allowNull : false,
            field : "email",
        },
        phone : {
            type : Sequelize.STRING(15),
            allowNull : false,
            unique : true,
            field : "phone"
        },
        fullName : {
            type : Sequelize.STRING(50),
            field : 'fullName',
            allowNull : true,
        },
        studentAccount : {
            type : Sequelize.STRING(10),
            field : 'studentAccount',
            allowNull : true,
        },
        studentPassword : {
            type : Sequelize.STRING(50),
            field : 'studentAccount',
            allowNull : true
        },
        dataJson : {
            type : Sequelize.JSON,
            field : 'dataJson',
            allowNull : true
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
        tableName : 'User',
        timestamps : false
    });

    User.sync().then(()=>{
    }).catch(()=>{
        logger.error('table user is error BUG ');
    });

    return User;
};


