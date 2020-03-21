let logger = require('../logger/logger');
let {userModel} = require('../db/index');
module.exports = {
    get : (req , res , next)=>{
        let userId = req.user.id;
        userModel.findOne({where : {id : userId} , attributes : ['studentAccount' , 'dataJson']}).then((schedule)=>{
            if(schedule.studentAccount && schedule.dataJson){
                res.json({
                    message : 'get data schedule success',
                    schedule : schedule
                });
            }else{
                res.json({
                    message : 'chưa update studentAccount , hãy update trước'
                });
            }
        }).catch((e)=>{
            logger.error('get data schedule error : ' + e );
            res.json({
                message : 'get data schedule error',
                error : e
            });
        })
    },
    update : (req , res , next)=>{
        let studentAccount = req.body.studentAccount;
        let studentPassword = req.body.studentPassword
    }

};