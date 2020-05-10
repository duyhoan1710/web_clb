let jwtHelper = require('./jwtHelper');
let logger = require('../../logger/logger');
let config = require('../../config/config');
let {userModel} = require('../../db/index');
let isAuth = async (req , res , next)=>{
    console.log('auth');
    let accessToken = req.headers.authorization || req.headers["x-access-token"];
    if(accessToken){
        try{
            try{
                accessToken = accessToken.split(' ')[1];
            }catch(e){}
            let decodeToken = await jwtHelper.verifyToken(accessToken , config.jwt.accessToken_secret);
            userModel.findOne({where : {id : decodeToken.id , username : decodeToken.username , password : decodeToken.password , accessToken : accessToken}}).then((user)=>{
                if(user){
                    req.user = decodeToken;
                    next();
                }else{
                    res.json({
                        message : 'accessToken is not valid'
                    })
                }
            }).catch((e)=>{
                res.json({
                    message : 'find user error',
                    error : e
                })
            });
        }catch(e){
            return res.json({
                message : 'unAuthorized',
                error : e
            });
        }
    }else{
        return res.json({
            message : 'not accessToken'
        });
    }
};

module.exports = {
    isAuth : isAuth
};
