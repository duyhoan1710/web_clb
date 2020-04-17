let logger = require('../logger/logger');
let {userModel ,groupModel , roleModel, groupRoleModel, userGroupRoleModel} = require('../db/index');
let config = require('../config/config');
let getGroupId = require('../db/lib/getGroupId');
let getRoleId = require('../db/lib/getRoleId');
let getGroupRoleId = require('../db/lib/getGroupRoleId');
let jwtHelper = require('../middleware/authenticate/jwtHelper');
let bcrypt = require('bcrypt');
let mergeDataUser = (users)=>{
    let dataGroupRole = [];
    for(let i = 0 ; i< users.length ; i++){
        dataGroupRole.push({
            groupId : users[i].GroupRole.Group.id ,
            groupName : users[i].GroupRole.Group.groupName,
            roleId : users[i].GroupRole.Role.id,
            roleName : users[i].GroupRole.Role.roleName
        });
    }
    let dataUser = {
        user : users[0].User,
        groupRole : dataGroupRole
    };
    return dataUser;
};

module.exports = {
    getMyProfile : (req , res , next )=>{
        let userId = req.user.id;
        userGroupRoleModel.findAll({
            where : {
                userId : userId
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
                {model : userModel , attributes : {exclude : ['password' , 'studentPassword' , 'accessToken' , 'refreshToken' , 'dataJson']}}
            ]
        }).then((users)=>{
            let dataUser = mergeDataUser(users);
            res.json({
                status: true,
                message : 'get user success',
                user : dataUser
            })
        }).catch((e)=>{
            logger.error('get user error : ' + e );
            res.json({
                status: false,
                message : 'get user error',
                error : e
            });
        })
    },
    updateMyPassword : (req , res , next)=>{
        // key : username , id
        // password
        let userId = req.user.id;
        let username = req.user.username;
        let newPassword = req.body.password;
        bcrypt.hash(newPassword , parseInt(config.bcrypt.saltRounds) , async (err , hashPassword)=>{
            if(err) {
                logger.error('hash password error : ' + err );
                res.json({
                    status: false,
                    message : 'hash password error',
                    error : err
                });
            }else{
                req.user.password = hashPassword;
                let accessToken =await jwtHelper.generateToken(req.user , config.jwt.accessToken_secret , config.jwt.timeLifeAccessToken);
                let refreshToken = await jwtHelper.generateToken(req.user , config.jwt.refreshToken_secret , config.jwt.timeLifeRefreshToken);
                userModel.update({password : hashPassword , accessToken : accessToken , refreshToken : refreshToken} ,{where: {id : userId ,username : username}}).then((result)=>{
                    res.json({
                        status: true,
                        message : 'update user success',
                        result : result,
                        accessToken : accessToken,
                        refreshToken : refreshToken
                    });
                }).catch((e)=>{
                    logger.error('update user error : ' + e);
                    res.json({
                        status: false,
                        message : 'update user error',
                        error : e
                    });
                });
            }
        });
    },
    outGroup : async (req , res , next)=>{
        let userId = req.user.id;
        let groupId = req.body.groupId;
        let roleId = 0;
        for(let i = 0 ; i < req.user.groupRole.length ; i++){
            if(req.user.groupRole[i].groupId == groupId){
                roleId = req.user.groupRole[i].roleId;
                break;
            }
        }
        let groupRoleId = await getGroupRoleId(groupRoleModel , groupId , roleId);
        await userGroupRoleModel.destroy({where : {userId : userId , groupRoleId : groupRoleId}}).then((result)=>{
            userGroupRoleModel.findOne({where : {userId : userId}}).then(async (user)=>{
                if(user){
                    res.json({
                        status: true,
                        message : 'out group success',
                    })
                }else{
                    let groupId = await getGroupId(groupModel , 'homelessGroup');
                    let roleId = await getRoleId(roleModel , 'member');
                    let groupRoleId = await getGroupRoleId(groupRoleModel , groupId , roleId);
                    await userGroupRoleModel.create({userId : userId , groupRoleId : groupRoleId}).then((userGroupRole)=>{
                        res.json({
                            status: true,
                            message : 'out group success',
                        });
                    }).catch((e)=>{
                        logger.error('out group error : ' + e);
                        res.json({
                            status: false,
                            message : 'out group error ',
                            error : e
                        });
                    });
                }
            }).catch((e)=>{
                logger.error(e);
                res.json({
                    status: false,
                    error : e
                })
            })
        }).catch((e)=>{
            res.json({
                status: false,
                message : 'error',
                error : e
            })
        })
    },
    getMember : (req , res , next)=>{
        let userId = req.params.userId;
        userGroupRoleModel.findAll({
            where : {
                userId : userId
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
                {model : userModel , attributes : ['id' , 'fullName']}
            ]
        }).then((users)=>{
            let dataUser = mergeDataUser(users);
            res.json({
                status: true,
                message : 'get user success',
                user : dataUser
            })
        }).catch((e)=>{
            logger.error('get user error : ' + e );
            res.json({
                status: false,
                message : 'get user error',
                error : e
            });
        })
    },
    createMember : (req , res , next ) =>{
        let body = req.body;
        // username , password , email , phone , fullName
        bcrypt.hash(body.password , parseInt(config.bcrypt.saltRounds) , (err , hashPassword)=>{
            if(err) {
                logger.error('hash password error : ' + err );
                res.json({
                    status: false,
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
                            status: true,
                            message : 'create user success',
                            user : user,
                            userGroupRole : userGroupRole,
                            groupName : 'homelessGroup',
                            roleName : 'member'
                        });
                    }).catch((e)=>{
                        logger.error('create userGroupRole error : ' + e);
                        res.json({
                            status: false,
                            message : 'create userGroupRole error ',
                            error : e
                        });
                    });
                }).catch((e)=>{
                    logger.error('create user error : ' + e);
                    res.json({
                        status: false,
                        message : 'create user error ',
                        error : e
                    });
                });
            }
        });
    },
    updateMember : (req ,res , next )=>{
        // key : username , id
        // password , email , phone , fullName, status
        let body = req.body;
        let userId = req.body.id;
        bcrypt.hash(body.password , parseInt(config.bcrypt.saltRounds) , (err , hashPassword)=>{
            if(err) {
                logger.error('hash password error : ' + err );
                res.json({
                    status: false,
                    message : 'hash password error',
                    error : err
                });
            }else{
                if(body.password){
                    body.password = hashPassword;
                }
                userModel.update(body ,{where: {id : userId }}).then((result)=>{
                    res.json({
                        status: true,
                        message : 'update user success',
                        result : result
                    });
                }).catch((e)=>{
                    console.log(e);
                    logger.error('update user error : ' + e);
                    res.json({
                        status: false,
                        message : 'update user error',
                        error : e
                    });
                });
            }
        });
    },
    getUnActiveMember: (req, res, next)=>{
        userModel.getAll({where: {status : false }}).then((result)=>{
            res.json({
                status: true,
                message : 'get unActive user success',
                result : result
            });
        }).catch((e)=>{
            console.log(e);
            logger.error('get unActive user error : ' + e);
            res.json({
                status: false,
                message : 'get unActive user error',
                error : e
            });
        });
    },
    getListMemberBasic : (req ,res , next )=>{
        let groupId = req.params.groupId;
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
                    {model : userModel , attributes : ['id' , 'fullName']}
                ]
            }).then((listUser)=>{
                res.json({
                    status: true,
                    message : 'get user by groupRoleId success',
                    listUser : listUser
                })
            }).catch((e)=>{
                logger.error('get user by groupRoleId error : ' + e );
                res.json({
                    status: false,
                    message : 'get user by groupRoleId',
                    error : e
                });
            })
        }).catch((e)=>{
            logger.error('get list user basic error : ' + e);
            res.json({
                status: false,
                message : 'get list user basic error',
                error : e
            });
        });
    },
    getAllMemberBasic : (req ,res , next )=>{
        userGroupRoleModel.findAll({
            attributes: ['userId'],
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
                    attributes: ['id', 'fullName'],
                }
            ]
        }).then((listUser)=>{
            res.json({
                status: true,
                message : 'get list user success',
                listUser : listUser
            })
        }).catch((e)=>{
            logger.error('get list user error : ' + e);
            res.json({
                status: false,
                message : 'get list user error',
                error : e
            });
        });
    },
    getListMemberAdvance : (req ,res , next )=>{
        let groupId = req.params.groupId;
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
                    {model : userModel , attributes : ['id' , 'fullName' , 'email' , 'phone']}
                ]
            }).then((listUser)=>{
                res.json({
                    status: true,
                    message : 'get user by groupRoleId success',
                    listUser : listUser
                })
            }).catch((e)=>{
                logger.error('get user by groupRoleId error : ' + e );
                res.json({
                    status: false,
                    message : 'get user by groupRoleId',
                    error : e
                });
            })
        }).catch((e)=>{
            logger.error('get list user basic error : ' + e);
            res.json({
                status: false,
                message : 'get list user basic error',
                error : e
            });
        });
    },
    getAllMemberAdvance : (req ,res , next )=>{
        userGroupRoleModel.findAll({
            attributes: ['userId'],
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
                    attributes: ['id', 'fullName', 'email', 'phone'],
                }
            ]
        }).then((listUser)=>{
            res.json({
                status: true,
                message : 'get all user success',
                listUser : listUser
            })
        }).catch((e)=>{
            logger.error('get all user error : ' + e);
            res.json({
                status: false,
                message : 'get list user error',
                error : e
            });
        });
    },
    updateUserToGroupRole : (req , res , next) =>{
        // list group and role to update user
        // let array = [
        //     {groupName : 'manageGroup' , roleName : 'leader' },
        //     {groupName : 'mediaGroup' , roleName : 'viceLeader' },
        // ]
        let arrayGroupRole = req.body.groupRole;
        let userId = req.body.userId;
        userGroupRoleModel.destroy({where : {userId : userId}}).then(async (result)=>{
            logger.info('destroy userGroupRole success : ' + result);
            for(let i = 0 ; i < arrayGroupRole.length ; i++){
                try{
                    let groupId = await getGroupId(groupModel , arrayGroupRole[i].groupName);
                    let roleId = await getRoleId(roleModel , arrayGroupRole[i].roleName);
                    let groupRoleId = await getGroupRoleId(groupRoleModel , groupId , roleId);
                    userGroupRoleModel.create({userId : userId , groupRoleId : groupRoleId}).then((result)=>{
                        logger.info('add groupRole to user success : ' + result);
                    }).catch((e)=>{
                        logger.error('add groupRole to user error: ' + e);
                        res.json({
                            status: false,
                            message : 'add groupRole to user error',
                            error : e
                        });
                    })
                }catch(e){
                    res.json({
                        status: false,
                        error : e,
                    })
                }
            }
            return res.json({
                status: true,
                message : 'add groupRole to user success',
            });
        }).catch((e)=>{
            logger.error('destroy userGroupRole error : ' + e);
            res.json({
                status: false,
                message : 'destroy userGroupRole error',
                error : e
            })
        });
    },
    // getProfileMember : (req , res , next )=>{
    //     let userId = req.params.userId;
    //     userModel.findOne({where : {userId : userId} , attributes : ['id' , 'username' , 'fullName' , 'email' , 'phone']}).then((user)=>{
    //         res.json({
    //             message : 'get profile success ',
    //             user : user
    //         });
    //     }).catch((e)=>{
    //         logger.error('find profile error : ' + e );
    //     });
    // },
    // getGroupRoleFromUser : (req , res  ,next)=>{
    //     let userId = req.params.id;
    //     userGroupRoleModel.findAll({
    //         attributes : ['userId' , 'groupRoleId'],
    //         where : {userId : userId} ,
    //         include : [{
    //             model : groupRoleModel ,
    //             include : [
    //                 {model : groupModel , attributes : ['id' , 'groupName']} ,
    //                 {model : roleModel , attributes : ['id' , 'roleName']},
    //             ]
    //         }]
    //     }).then((groupRole)=>{
    //         res.json({
    //             message : 'find groupRole success',
    //             groupRole : groupRole
    //         });
    //     }).catch((e)=>{
    //         logger.error('find groupRole error : '+ e);
    //         res.json({
    //             message : 'find groupRole error',
    //             error : e
    //         });
    //     })
    // },
};
