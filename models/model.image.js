let logger = require('../logger/logger');

module.exports = (sequelize , Sequelize)=>{
    let image = sequelize.define('Image' , {
        id : {
            type : Sequelize.INTEGER(20),
            primaryKey : true,
            autoIncrement : true,
            field : 'id'
        },
        newsId : {
            type : Sequelize.INTEGER(20),
            allowNull : false,
            field : 'newsId'
        },
        imageName : {
            type : Sequelize.STRING(100),
            allowNull : true,
            field : 'imageName'
        }
    },{
        tableName : 'Image',
        timestamps : false
    });

    image.sync().then(()=>{

    }).catch(()=>{
        logger.error('table image is not create success BUG');
    });

    return image;
};
