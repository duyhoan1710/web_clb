let logger = require('../../logger/logger');
module.exports = (groupRoleModel , groupId , roleId) =>{
    return new Promise(((resolve, reject) => {
        groupRoleModel.findOne({where : {groupId : groupId , roleId : roleId }}).then((groupRole)=>{
            resolve(groupRole.id);
        }).catch((e)=>{
            logger.error('find groupRole by name error : ' + e);
            reject(e);
        })
    }))
};