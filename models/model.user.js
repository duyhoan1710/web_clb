
let db = require('../db/connectDatabase');

module.exports = () =>{
    return db.sequelize.define('Users' , {
        id : {
            type : db.Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            field : 'id'
        },
        username : {
            type : db.Sequelize.STRING(45),
            allowNull : true,
            unique : true,
            field  : "username"
        },
        password : {
            type : db.Sequelize.STRING(45),
            allowNull : true,
            field : "password"
        },
        email : {
            type : db.Sequelize.STRING(50),
            unique : true,
            allowNull : true,
            field : "email",
        },
        phone : {
            type : db.Sequelize.INTEGER,
            allowNull : true,
            unique : true,
            field : "phone"
        }
    },{
        tableName : "Users",
        timestamps : false
    })
};