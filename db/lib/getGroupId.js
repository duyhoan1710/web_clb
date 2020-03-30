let logger = require('../../logger/logger');
module.exports = (groupModel , groupName) =>{
    return new Promise(((resolve, reject) => {
        groupModel.findOne({where : {groupName : groupName}}).then((group)=>{
            if(group)
                resolve(group.id);
            else
                reject('not found group');
        }).catch((e)=>{
            logger.error('find group by name error : ' + groupName + e);
            reject(e);
        })
    }))

};
