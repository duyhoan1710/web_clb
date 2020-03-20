let logger = require('../../logger/logger');
module.exports = (roleModel , roleName) =>{
    return new Promise(((resolve, reject) => {
        roleModel.findOne({where : {roleName : roleName}}).then((role)=>{
            resolve(role.id);
        }).catch((e)=>{
            logger.error('find role by name error : ' + e);
            reject(e);
        });
    }))

};