let logger = require('../logger/logger');

module.exports = (sequelize , Sequelize)=>{
    let news = sequelize.define('News' , {
        id : {
            type : Sequelize.INTEGER(20),
            primaryKey : true,
            autoIncrement : true,
            field : 'id'
        },
        authorId : {
            type : Sequelize.INTEGER(20),
            allowNull : true,
            field : 'authorId'
        },
        link : {
            type : Sequelize.STRING(100),
            field : 'link'
        },
        title : {
            type : Sequelize.STRING(100),
            field : 'title'
        },
        content : {
            type : Sequelize.STRING(10000),
            field : 'content'
        },
        status : {
            type : Sequelize.BOOLEAN,
            defaultValue : false,
            field : 'status'
        }
    },{
        tableName : 'News',
        timestamps : false
    });

    news.sync().then(()=>{

    }).catch(()=>{
        logger.error('table News is not create success BUG');
    });

    return news;
};