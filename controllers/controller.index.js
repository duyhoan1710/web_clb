let account_admin = require('../config/config').account_admin;
let logger = require('../logger/logger');
let {userModel} = require('../db/index');


module.exports = {
    get : (req , res , next )=>{
        res.json({
            user : userModel,
            message : 'true'
        })
    },
    post : (req ,res , next)=>{
        userModel.create(account_admin).then((user)=>{
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