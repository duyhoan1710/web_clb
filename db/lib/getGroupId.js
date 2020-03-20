let logger = require('../../logger/logger');
module.exports = (groupModel , groupName) =>{
    return new Promise(((resolve, reject) => {
        groupModel.findOne({where : {groupName : groupName}}).then((group)=>{
            resolve(group.id);
        }).catch((e)=>{
            logger.error('find group by name error : ' + groupName + e);
            reject(e);
        })
    }))

};