let logger = require('../logger/logger');

module.exports = (sequelize , Seqelize)=>{
    let image = sequelize.define('Image' , {
        id : {
            type : Seqelize.INTEGER(20),
            primaryKey : true,
            autoIncrement : true,
            field : 'id'
        },
        newsId : {
            type : Seqelize.INTEGER(20),
            allowNull : false,
            field : 'newsId'
        },
        imageName : {
            type : Seqelize.STRING(100),
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