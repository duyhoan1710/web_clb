let logger = require('../logger/logger');
let config = require('../config/config');
let bcrypt = require('bcrypt');
let {userModel} = require('../db/index');

module.exports = {
    get : (req , res  , next) =>{
        res.json({
            message : 'this is register page'
        });
    },
    post : (req , res , next ) =>{
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
                userModel.create(body).then((user)=>{
                    res.json({
                        message : 'create user success',
                        user : user
                    });
                    logger.info('create user success : ' + user);
                }).catch((e)=>{

                    logger.error('create user error : ' + e);
                    res.json({
                        message : 'create user error ',
                        error : e
                    });
                });
            }
        });
    }
};