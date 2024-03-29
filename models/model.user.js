let logger = require('../logger/logger');
module.exports = (sequelize , Sequelize)=>{
    let user = sequelize.define('User' , {
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
            type : Sequelize.STRING(100),
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
        birthday : {
            type : Sequelize.STRING(30),
            allowNull : true,
            field : 'birthday'
        },
        accessToken : {
            type : Sequelize.STRING(500),
            allowNull : true,
            field : 'accessToken'
        },
        refreshToken : {
            type : Sequelize.STRING(500),
            allowNull : true,
            field : 'refreshToken'
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
        status: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            field: 'status'
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
        tableName : 'User',
        timestamps : false
    });

    user.sync().then(()=>{
    }).catch(()=>{
        logger.error('table user is not create success BUG ');
    });

    return user;
};


