let logger = require('../logger/logger');
let bcrypt = require('bcrypt');
let config = require('../config/config');
let jwtHelper = require('../middleware/authenticate/jwtHelper');
let {userGroupRoleModel , groupModel , roleModel , userModel , groupRoleModel} = require('../db/index');
module.exports = {
    post : (req , res , next ) =>{
        // username , password
        let body = res.body;
        userModel.findOne({where : {username : body.username, status: true}}).then((user)=>{
            bcrypt.compare(body.password , user.password , (err , result)=>{
                if(err) {
                    logger.error('find user error : ' + err);
                    res.json({
                        status: false,
                        error : err
                    });
                }else{
                    if(result){
                        userGroupRoleModel.findAll({
                            where : {
                                userId : user.id
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
                                {model : userModel , attributes : ['id', 'fullName' , 'username' , 'password']}
                            ]
                        }).then( async (users)=>{
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
                                id : users[0].User.id,
                                fullName : users[0].User.fullName,
                                username : users[0].User.username,
                                password : users[0].User.password,
                                groupRole : dataGroupRole
                            };

                            let accessToken = await jwtHelper.generateToken(dataUser , config.jwt.accessToken_secret ,config.jwt.timeLifeAccessToken);
                            let refreshToken = await jwtHelper.generateToken(dataUser , config.jwt.refreshToken_secret , config.jwt.timeLifeRefreshToken);
                            userModel.update({accessToken : accessToken , refreshToken : refreshToken},{where : {id : user.id}}).then((user)=>{
                                res.json({
                                    status: true,
                                    message : 'login success',
                                    user : dataUser,
                                    accessToken : accessToken,
                                    refreshToken : refreshToken
                                });
                            }).catch((e)=>{
                                res.json({
                                    status: false,
                                    message : 'update token error',
                                    error : e
                                })
                            })
                        }).catch((e)=>{
                            logger.error('login error : ' + e );
                            res.json({
                                status: false,
                                message :'login error',
                                error : e
                            });
                        })
                    }else{
                        res.json({
                            status: false,
                            message : 'login false'
                        })
                    }
                }
            })
        }).catch(error => {
            res.json({
                status: false,
                message: 'user not found'
            })
        })
    },
    logout : (req , res , next) => {
        let userId = req.user.id;
        userModel.update({accessToken : null , refreshToken : null} , {where : {id : userId}}).then((result)=>{
            res.json({
                status: true,
                message : 'logout success'
            })
        }).catch((e)=>{
            res.json({
                status: false,
                message : 'logout false',
                error : e
            })
        })
    }
};
