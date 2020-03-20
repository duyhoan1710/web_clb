let logger = require('../logger/logger');
let {groups , roles , permissions , groupRole} = require('./database');
let {groupModel , roleModel , permissionModel , groupRoleModel , groupRolePermissionModel} = require('./index');
let getGroupId = require('./lib/getGroupId');
let getRoleId = require('./lib/getRoleId');
let getPermissionId = require('./lib/getPermissionId');
let getGroupRoleId = require('./lib/getGroupRoleId');

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

let insertDataToGroupRole = async ()=>{
    for(let groupName in groupRole){
        let groupId =await getGroupId(groupModel,groupName.toString());
        for(let roleName in groupRole[groupName]){
            let roleId =await getRoleId(roleModel , roleName.toString());
            await groupRoleModel.create({
                groupId : groupId,
                roleId : roleId
            }).then(async (result)=>{
                logger.info('groupRoleId : ' + result.id);
            }).catch((e)=>{
                logger.error(e);
            });
        }
    }
};

let insertDataToGroupRolePermission = async ()=>{
    for(let groupName in groupRole){
        let groupId =await getGroupId(groupModel,groupName.toString());
        for(let roleName in groupRole[groupName]){
            let roleId =await getRoleId(roleModel , roleName.toString());
            let groupRoleId = await getGroupRoleId(groupRoleModel , groupId , roleId);
            for(let i = 0 ; i < groupRole[groupName][roleName].length ; i++){
                let permissionId = await getPermissionId(permissionModel , groupRole[groupName][roleName][i].permissionName);
                groupRolePermissionModel.create({
                    groupRoleId : groupRoleId,
                    permissionId : permissionId
                }).then((result)=>{
                    logger.info('insert data to groupRolePermission : ' + result);
                }).catch((e)=>{
                    logger.error('insert data to groupRolePermission error : ' + e);
                })
            }
        }
    }
};



let run =async () =>{
    await insertDataToGroups();
    await insertDataToRoles();
    await insertDataToPermissions();
    await insertDataToGroupRole();
    await insertDataToGroupRolePermission();
};


try{
    run();
}catch(e){
    logger.error('insert data error ' + e);
}

