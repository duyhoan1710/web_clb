module.exports  = (sequelize , Sequelize)=>{
    return {
        User : ()=> {
            return require('../models/model.user')(sequelize , Sequelize);
        }
    }
}