let logger = require('../logger/logger');

module.exports = (sequelize , Sequelize) =>{
    let imageNews = sequelize.define('ImageNews' , {
        id :{
            type : Sequelize.INTEGER(20),
            primaryKey : true,
            autoIncrement : true,
            field : 'id'
        },
        newsId : {
            type : Sequelize.INTEGER(20),
            allowNull : true,
            field : 'newsId'
        },
        imageId : {
            type : Sequelize.INTEGER(20),
            allowNull : true,
            field : 'imageId'
        }
    },{
        tableName : 'ImageNews',
        timestamps : false
    });


    imageNews.sync().then(()=>{

    }).catch(()=>{
        logger.error('table ImageNews is not create success BUG');
    });

    return imageNews;
};