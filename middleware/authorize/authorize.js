let getGroupRoleId = require('../../db/lib/getGroupRoleId');
let {groupRoleModel , groupRolePermissionModel , permissionModel} = require('../../db/index');
let checkPermission = (req , res , next , arrayGroupRole , permission)=>{
    groupRolePermissionModel.findAll({
        where : {groupRoleId : arrayGroupRole},
        include : [
            {model : permissionModel , attributes : ['permissionName']}
        ]
    }).then((listPermission)=>{
        for(let i = 0 ; i < listPermission.length ; i ++){
            if(listPermission[i].Permission.permissionName === permission){
                return next();
            }
        }
        res.json({
            message : 'permission denied'
        })
    })
};
module.exports = (permission)=>{
    return async (req , res , next)=>{
        let groupId = req.body.groupId;
        if(groupId){
            let groupRole = req.user.groupRole;
            let arrayGroupRole = [];
            for(let i = 0 ; i < groupRole.length ; i++){
                if(groupId == groupRole[i].groupId){
                    let groupRoleId = await getGroupRoleId(groupRoleModel , groupRole[i].groupId , groupRole[i].roleId);
                    arrayGroupRole.push(groupRoleId);
                }
            }
            checkPermission(req , res , next , arrayGroupRole , permission);
        }else{
            let groupRole = req.user.groupRole;
            let arrayGroupRole = [];
            for(let i = 0 ; i < groupRole.length ; i++){
                let groupRoleId = await getGroupRoleId(groupRoleModel , groupRole[i].groupId , groupRole[i].roleId);
                arrayGroupRole.push(groupRoleId);
            }
            checkPermission(req , res , next , arrayGroupRole , permission);
        }
    }
};
