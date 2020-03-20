let logger = require('../../logger/logger');
module.exports = (permissionModel , permissionName) =>{
    return new Promise(((resolve, reject) => {
        permissionModel.findOne({where : {permissionName : permissionName}}).then((permission)=>{
            resolve(permission.id);
        }).catch((e)=>{
            logger.error('find permission by name error : ' + e);
            reject(e);
        })
    }))

};