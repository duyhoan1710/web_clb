let logger = require('../logger/logger');
let bcrypt = require('bcrypt');
let {userModel} = require('../db/index');

module.exports = {
    get : (req , res  , next) =>{
        res.json({
            message : 'this is login page'
        });
    },
    post : (req , res , next ) =>{
        // username , password
        let body = req.body;
        userModel.findOne({where : {username : body.username}}).then((user)=>{
            bcrypt.compare(body.password , user.password , (err , result)=>{
                if(err) {
                    logger.error('find user error : ' + err);
                    res.json({
                        error : err
                    });
                }else{
                    if(result){
                        user.password = null;
                        res.json({
                            message : 'login success',
                            user : user
                        });
                    }else{
                        res.json({
                            message : 'login false'
                        })
                    }
                }
            })
        })
    },
    logout : (req , res , next) => {

    },
    getSchedule : (req , res , next)=>{

    },
    postSchedule : (req , res , next)=>{

    }
};