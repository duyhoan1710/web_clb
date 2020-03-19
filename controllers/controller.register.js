let logger = require('../logger/logger');
let config = require('../config/config');
let bcrypt = require('bcrypt');
let {userModel , groupModel , roleModel , groupRoleModel , userGroupRoleModel} = require('../db/index');

module.exports = {
    get : (req , res  , next) =>{
        res.json({
            message : 'this is register page'
        });
    },
    post : (req , res , next ) =>{
        let body = req.body;
        // username , password , email , phone , fullName
        bcrypt.genSalt(config.bcrypt.saltRounds ,function(err , salt){
            bcrypt.hash(body.password , salt , (err , hashPassword)=>{
                if(err) {
                    res.json({
                        message : 'hash password error',
                        error : err
                    });
                }else{
                    body.password = hashPassword;
                    res.json({
                        body : body
                    })

                }
            })
        })
    }
};