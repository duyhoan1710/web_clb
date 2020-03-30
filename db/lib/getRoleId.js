let logger = require('../../logger/logger');
module.exports = (roleModel , roleName) =>{
    return new Promise(((resolve, reject) => {
        roleModel.findOne({where : {roleName : roleName}}).then((role)=>{
            if(role)
                resolve(role.id);
            else
                reject('not found role');
        }).catch((e)=>{
            logger.error('find role by name error : ' + e);
            reject(e);
        });
    }))

};
