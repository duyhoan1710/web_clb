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
            allowNull : false,
            field : 'authorId'
        },
        link : {
            type : Sequelize.STRING(100),
            field : 'link',
            allowNull : false
        },
        title : {
            type : Sequelize.STRING(100),
            field : 'title',
            allowNull : false
        },
        content : {
            type : Sequelize.STRING(10000),
            field : 'content',
            allowNull : false
        },
        status : {
            type : Sequelize.BOOLEAN,
            defaultValue : false,
            field : 'status',
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
        tableName : 'News',
        timestamps : false
    });

    news.sync().then(()=>{

    }).catch(()=>{
        logger.error('table News is not create success BUG');
    });

    return news;
};