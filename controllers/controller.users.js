let logger = require('../logger/logger');
let {userModel ,groupModel , roleModel, groupRoleModel, userGroupRoleModel} = require('../db/index');
let config = require('../config/config');
let bcrypt = require('bcrypt');
let getGroupId = require('../db/lib/getGroupId');
let getRoleId = require('../db/lib/getRoleId');
let getGroupRoleId = require('../db/lib/getGroupRoleId');

module.exports = {
    getProfile : (req , res , next )=>{
        let userId = req.user.id;
        userModel.findOne({where : {userId : userId}}).then((user)=>{
            user.password = null;
            res.json({
                message : 'get profile success ',
                user : user
            });
        }).catch((e)=>{
            logger.error('find profile error : ' + e );
        });
    },
    getProfileMember : (req , res , next )=>{
        let userId = req.params.id;
        userModel.findOne({where : {userId : userId}}).then((user)=>{
            user.password = null;
            res.json({
                message : 'get profile success ',
                user : user
            });
        }).catch((e)=>{
            logger.error('find profile error : ' + e );
        });
    },
    createUser : (req , res , next ) =>{
        let body = req.body;
        // username , password , email , phone , fullName
        bcrypt.hash(body.password , parseInt(config.bcrypt.saltRounds) , (err , hashPassword)=>{
            if(err) {
                logger.error('hash password error : ' + err );
                res.json({
                    message : 'hash password error',
                    error : err
                });
            }else{
                body.password = hashPassword;
                userModel.create(body).then(async (user)=>{
                    let groupId = await getGroupId(groupModel , 'homelessGroup');
                    let roleId = await getRoleId(roleModel , 'member');
                    let groupRoleId = await getGroupRoleId(groupRoleModel , groupId , roleId);
                    await userGroupRoleModel.create({userId : user.id , groupRoleId : groupRoleId}).then((userGroupRole)=>{
                        res.json({
                            message : 'create user success',
                            user : user,
                            userGroupRole : userGroupRole
                        });
                    }).catch((e)=>{
                        logger.error('create userGroupRole error : ' + e);
                        res.json({
                            message : 'create userGroupRole error ',
                            error : e
                        });
                    });
                }).catch((e)=>{
                    logger.error('create user error : ' + e);
                    res.json({
                        message : 'create user error ',
                        error : e
                    });
                });
            }
        });
    },
    update : (req ,res , next )=>{
        // key : username , id
        // password , email , phone , fullName
        let body = req.body;
        let userId = req.params.id;
        userModel.update({where: {id : userId ,username : body.username}} , body).then((user)=>{
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
        let userId = req.params.id;
        userModel.destroy({where: {id : userId ,username : body.username}} , body).then((result)=>{
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
        let groupId = req.params.id;
        groupRoleModel.findAll({
            where : {groupId : groupId},
        }).then((listGroupRole)=>{
            let listGroupRoleId = [];
            for(let i = 0 ; i < listGroupRole.length ; i++){
                 listGroupRoleId.push(listGroupRole[i].id);
            }
            userGroupRoleModel.findAll({
                where : {
                    groupRoleId : listGroupRoleId
                },
                attributes : ['userId'],
                include : [
                    {
                        model : groupRoleModel ,
                        attributes : ['groupId' , 'roleId'],
                        include : [
                            {model : groupModel , attributes : ['id' , 'groupName']},
                            {model : roleModel , attributes : ['id' , 'roleName']}
                        ]
                    },
                    {model : userModel , attributes : ['id' , 'username' , 'fullName']}
                ]
            }).then((listUser)=>{
                res.json({
                    message : 'get user by groupRoleId success',
                    listUser : listUser
                })
            }).catch((e)=>{
                logger.error('get user by groupRoleId error : ' + e );
                res.json({
                    message : 'get user by groupRoleId',
                    error : e
                });
            })
        }).catch((e)=>{
            logger.error('get list user basic error : ' + e);
            res.json({
                message : 'get list user basic error',
                error : e
            });
        });
    },
    getAllBasic : (req ,res , next )=>{
        userModel.findAll({attributes : ['id' , 'username', 'fullName'], where : {}}).then((listUSer)=>{
            res.json({
                message : 'get list user success',
                listUser : listUSer
            });
        }).catch((e)=>{
            logger.error('get list user error : ' + e);
            res.json({
                message : 'get list user error',
                error : e
            });
        });
    },
    getListAdvance : (req ,res , next )=>{
        let groupId = req.params.id;
        groupRoleModel.findAll({
            where : {groupId : groupId},
        }).then((listGroupRole)=>{
            let listGroupRoleId = [];
            for(let i = 0 ; i < listGroupRole.length ; i++){
                listGroupRoleId.push(listGroupRole[i].id);
            }
            userGroupRoleModel.findAll({
                where : {
                    groupRoleId : listGroupRoleId
                },
                attributes : ['userId'],
                include : [
                    {
                        model : groupRoleModel ,
                        attributes : ['groupId' , 'roleId'],
                        include : [
                            {model : groupModel , attributes : ['id' , 'groupName']},
                            {model : roleModel , attributes : ['id' , 'roleName']}
                        ]
                    },
                    {model : userModel , attributes : ['id' , 'username' , 'fullName' , 'email' , 'phone']}
                ]
            }).then((listUser)=>{
                res.json({
                    message : 'get user by groupRoleId success',
                    listUser : listUser
                })
            }).catch((e)=>{
                logger.error('get user by groupRoleId error : ' + e );
                res.json({
                    message : 'get user by groupRoleId',
                    error : e
                });
            })
        }).catch((e)=>{
            logger.error('get list user basic error : ' + e);
            res.json({
                message : 'get list user basic error',
                error : e
            });
        });
    },
    getAllAdvance : (req ,res , next )=>{
        userGroupRoleModel.findAll({
            attributes: ['UserId'],
            where: {},
            include: [
                {
                    model: groupRoleModel,
                    attributes: ['groupId', 'roleId'],
                    include: [
                        {model: groupModel, attributes: ['id', 'groupName']},
                        {model: roleModel, attributes: ['id', 'roleName']}
                    ]
                },
                {
                    model: userModel,
                    attributes: ['id', 'username', 'fullName', 'email', 'phone'],
                }
            ]
        }).then((listUser)=>{
            res.json({
                message : 'get list user success',
                listUser : listUser
            })
        }).catch((e)=>{
            logger.error('get list user error : ' + e);
            res.json({
                message : 'get list user error',
                error : e
            });
        });
    },
    getGroupRoleFromUser : (req , res  ,next)=>{
        let userId = req.params.id;
        userGroupRoleModel.findAll({
            attributes : ['userId' , 'groupRoleId'],
            where : {userId : userId} ,
            include : [{
                model : groupRoleModel ,
                include : [
                    {model : groupModel , attributes : ['id' , 'groupName']} ,
                    {model : roleModel , attributes : ['id' , 'roleName']},
                ]
            }]
        }).then((groupRole)=>{
            res.json({
                message : 'find groupRole success',
                groupRole : groupRole
            });
        }).catch((e)=>{
            logger.error('find groupRole error : '+ e);
            res.json({
                message : 'find groupRole error',
                error : e
            });
        })
    },
    updateUserToGroupRole : (req , res , next) =>{
        // list group and role to update user
        // let array = [
        //     {groupName : 'manageGroup' , roleName : 'leader' },
        //     {groupName : 'mediaGroup' , roleName : 'viceLeader' },
        // ]
        let arrayGroupRole = req.body.groupRole;
        let userId = req.params.id;
        userGroupRoleModel.destroy({where : {userId : userId}}).then(async (result)=>{
            logger.info('destroy userGroupRole success : ' + result);
            for(let i = 0 ; i < arrayGroupRole.length ; i++){
                let groupId = await getGroupId(groupModel , arrayGroupRole[i].groupName);
                let roleId = await getRoleId(roleModel , arrayGroupRole[i].roleName);
                let groupRoleId = await getGroupRoleId(groupRoleModel , groupId , roleId);
                await userGroupRoleModel.create({userId : userId , groupRoleId : groupRoleId}).then((result)=>{
                    logger.info('add groupRole to user success : ' + result);
                    res.json({
                        message : 'add groupRole to user success',
                        result : result
                    });
                }).catch((e)=>{
                    logger.error('add groupRole to user error: ' + e);
                    res.json({
                        message : 'add groupRole to user error',
                        error : e
                    });
                })
            }
        }).catch((e)=>{
            logger.error('destroy userGroupRole error : ' + e);
            res.json({
                message : 'destroy userGroupRole error',
                error : e
            })
        });
    }
};