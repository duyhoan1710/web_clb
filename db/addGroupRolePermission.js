let logger = require('../logger/logger');
let {groups , roles , permissions} = require('./database');
let {groupModel , roleModel , permissionModel} = require('./index');



let insertDataToGroups =async () =>{
    for(let i = 0 ; i< groups.length ; i++){
        await groupModel.create(groups[i]).then((result)=>{
            logger.info(result);
        }).catch((e)=>{
            logger.error(e);
        })
    }
};

let insertDataToRoles =async () =>{
    for(let i = 0 ; i< roles.length ; i++){
        await roleModel.create(roles[i]).then((result)=>{
            logger.info(result);
        }).catch((e)=>{
            logger.error(e);
        })
    }
};

let insertDataToPermissions =async () =>{
    for(let i = 0 ; i< permissions.length ; i++){
        await permissionModel.create(permissions[i]).then((result)=>{
            logger.info(result);
        }).catch((e)=>{
            logger.error(e);
        })
    }
};

let run =async () =>{
    await insertDataToGroups();
    await insertDataToRoles();
    await insertDataToPermissions();
};
try{
    run();
}catch(e){
    logger.error('insert data error ' + e);
}

