let logger = require('../../logger/logger');
module.exports = (groupRoleModel , groupId , roleId) =>{
    return new Promise(((resolve, reject) => {
        groupRoleModel.findOne({where : {groupId : groupId , roleId : roleId }}).then((groupRole)=>{
            if(groupRole)
                resolve(groupRole.id);
            else
                reject('not fount groupRole');
        }).catch((e)=>{
            logger.error('find groupRole by id error : ' + e);
            reject(e);
        })
    }))
};
