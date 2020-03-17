let account_admin = require('../config').account_admin;
let logger = require('../logger/logger');
let Users = require('../db/connectDatabase').userModel;


console.log(account_admin);
module.exports = {
    get : (req , res , next )=>{
        res.json({
            user : Users,
            message : 'true'
        })
    },
    post : (req ,res , next)=>{
        logger.debug(account_admin);
        Users.create(account_admin).then((user)=>{
            logger.info(user);
            res.json({
                message : true,
                user : user
            })
        }).catch((e)=>{
            console.log(e);
            res.json({
                message : false,
                error : e
            })
        })
    },
    update : (req ,res , next )=>{

    },
    delete : (req ,res , next )=>{

    },
    getList : (req ,res , next )=>{

    }
};