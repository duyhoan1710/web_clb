module.exports = (sequelize , Sequelize)=>{
    let User = sequelize.define('User' , {
        id : {
            type : Sequelize.INTEGER,
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
        }
    },{
        tableName : 'User',
        freezeTableName : true,
        timestamps : false
    });
    return User;
};


