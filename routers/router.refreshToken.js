let jwtHelper = require('../middleware/authenticate/jwtHelper');
let config = require('../config/config');
let {userModel} = require('../db/index');
module.exports = (app)=>{
    app.post('/api/refreshToken' , async (req , res)=>{
        let refreshToken = req.body.refreshToken;
        try{
            let decode = await jwtHelper.verifyToken(refreshToken , config.jwt.refreshToken_secret);
            userModel.findOne({where : {id : decode.id ,username : decode.username, password : decode.password , refreshToken : refreshToken}}).then(async (user)=>{
                if(!user){
                    res.json({
                        message : 'not find user from token',
                    })
                }else{
                    let accessToken = await jwtHelper.generateToken(decode , config.jwt.accessToken_secret , config.jwt.timeLifeAccessToken);
                    userModel.update({accessToken : accessToken} , {where: {id : decode.id , username: decode.username}}).then((result)=>{
                        res.json({
                            message : 'refresh token success',
                            accessToken : accessToken
                        })
                    }).catch((e)=>{
                        res.json({
                            error : e,
                        })
                    })
                }
            })
        }catch(e){
            res.json({
                message : 'verify refresh token error',
                error : e
            });
        }
    });
};
