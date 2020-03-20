let logger = require('../logger/logger');
let {userModel , groupRoleModel, userGroupRoleModel} = require('../db/index');
let getGroupId = require('../db/lib/getGroupId');
let getRoleId = require('../db/lib/getGroupId');
let getGroupRoleId = require('../db/lib/getGroupRoleId');

module.exports = {
    get : (req , res , next )=>{

    },
    update : (req ,res , next )=>{
        // key : username , id
        // password , email , phone , fullName
        let body = req.body;
        let id_user = req.params.id;
        userModel.update({where: {id : id_user ,username : body.username}} , body).then((user)=>{
            res.json({
                message : 'update user success',
                user : user
            });
        }).catch((e)=>{
            logger.error('update user error : ' + e);
            res.json({
                message : 'update user error',
                error : e
            });
        });
    },
    delete : (req ,res , next )=>{
        // key : username , id
        // password , email , phone , fullName
        let body = req.body;
        let id_user = req.params.id;
        userModel.destroy({where: {id : id_user ,username : body.username}} , body).then((result)=>{
            res.json({
                message : 'delete user success',
                result : result
            });
        }).catch((e) =>{
            logger.error('delete user error : ' + e);
            res.json({
                message : 'delete user error',
                error : e
            });
        });
    },
    getListBasic : (req ,res , next )=>{
        let groupId = req.params.groupId;
        groupRoleModel.findAll({where : {groupId : groupId}}).then((listGroupRole)=>{
            res.json({
                message : 'get list basic profile user from groupRole',
                listGroupRole : listGroupRole
            })
        })
    },
    getAllBasic : (req ,res , next )=>{

    },
    getListAdvance : (req ,res , next )=>{

    },
    getAllAdvance : (req ,res , next )=>{

    },
    getGroupRoleFromUser : (req , res  ,next)=>{
        let userId = req.params.userId;

    },
    addUserToGroupRole : async (req , res , next)=>{
        let groupId = req.params.groupId;
        let roleId = req.params.roleId;
        let userId = req.params.userId;
        let groupRoleId = await getGroupRoleId(groupRoleModel , groupId , roleId);
        userGroupRoleModel.create({userId: userId , groupRoleId : groupRoleId}).then((result)=>{
            res.json({
                message : 'add user to group success',
                result : result
            })
        }).catch((e)=>{
            logger.error('add user to group error : ' + e);
            res.json({
                message : 'add user to group error',
                error : e
            });
        });
    },
    updateUserToGroupRole :() =>{
        // list group and role to update user
        // let array = [
        //     {groupId : '1' , roleId : '1' },
        //     {groupId : '2' , roleId : '1' },
        //     {groupId : '3' , roleId : '1' },
        // ]



    }
};