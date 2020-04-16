let logger = require('../logger/logger');
let {userModel} = require('../db/index');
let getViewState = require('./schedule/schedule.getViewState');
let getCookies = require('./schedule/schedule.getCookie');
let loginWithCookieAndGetElement = require('./schedule/schedule.loginWithCookieAndGetElement');
let createFileXlS = require('./schedule/schedule.createFileXLS');
let getDataJson = require('./schedule/schedule.handlingData');

let sleep = ()=>{
    return new Promise((resolve)=>{
        setTimeout(resolve , 100);
    });
};

module.exports = {
    get : (req , res , next)=>{
        let userId = req.user.id;
        userModel.findOne({where : {id : userId} , attributes : ['dataJson']}).then((schedule)=>{
            if(schedule.dataJson){
                res.json({
                    status: true,
                    message : 'get data schedule success',
                    schedule : schedule
                });
            }else{
                res.json({
                    status: false,
                    message : 'chưa update studentAccount , hãy update trước'
                });
            }
        }).catch((e)=>{
            logger.error('get data schedule error : ' + e );
            res.json({
                status: false,
                message : 'get data schedule error',
                error : e
            });
        })
    },
    update : async (req , res , next)=>{
        let userId = req.user.id;
        let studentAccount = req.body.studentAccount;
        let studentPassword = req.body.studentPassword;
        try{
            let viewState = await getViewState();
            let cookies = await getCookies(viewState , studentAccount , studentPassword);
            let elements = await loginWithCookieAndGetElement(cookies , viewState);
            await createFileXlS(cookies , elements , studentAccount);
            await sleep();
            let dataJson = getDataJson(studentAccount);
            userModel.update({studentAccount : studentAccount , studentPassword : studentPassword , dataJson : dataJson}, {where : {id : userId}} ).then((result)=>{
                res.json({
                    status: true,
                    message : 'update dataJson schedule success',
                    dataJson : dataJson
                })
            }).catch((e)=>{
                logger.error(e);
                console.log(e);
                res.json({
                    status:false,
                    message : 'update dataJson error',
                    error : e,
                })
            })
        }catch (e) {
            logger.error(e);
            res.json({
                status: false,
                message : 'update dataJson schedule error',
                error : e
            });
        }
    },
    // guest
    post : async (req , res , next)=>{
        let studentAccount = req.body.studentAccount;
        let studentPassword = req.body.studentPassword;
        try{
            let viewState = await getViewState();
            let cookies = await getCookies(viewState , studentAccount , studentPassword);
            let elements = await loginWithCookieAndGetElement(cookies , viewState);
            await createFileXlS(cookies , elements , studentAccount);
            await sleep();
            let dataJson = getDataJson(studentAccount);
            res.json({
                status : true,
                message : 'get dataJson schedule success',
                dataJson : dataJson
            })
        }catch (e) {
            console.log(e);
            res.json({
                status : false,
                message : 'get dataJson schedule error',
                error : e
            });
        }
    },
    updatePersonalSchedule : (req , res , next)=>{
        // let arr = [
        //        {
        //            time : time,
        //            subject : subjectName,
        //            address : address,
        //            lesson : lesson
        //        },
        //        {
        //            time : time,
        //            subject : subjectName,
        //            address : address,
        //            lesson : lesson
        //        }
        // ]
        let userId = req.user.id;
        let arraySchedule = req.body.arraySchedule;
        userModel.findOne({where : {id : userId}}).then((user)=>{
            if(!user){
                res.json({
                    status : false,
                    message : 'update schedule first'
                });
            }else{
                for(let i = 0 ; i < arraySchedule.length ; i++){
                    let millisecond = new Date(arraySchedule[i].time).getTime();
                    console.log(millisecond);
                    if(user.dataJson[millisecond]){
                        let obj = {
                            'school': false,
                            'subject' : arraySchedule[i].subject,
                            'address' : arraySchedule[i].address,
                            'lesson' : arraySchedule[i].lesson
                        };
                        user.dataJson[millisecond].push(obj);
                    }else{
                        let obj = {};
                        obj = {
                            'school': false,
                            'subject' : arraySchedule[i].subject,
                            'address' : arraySchedule[i].address,
                            'lesson' : arraySchedule[i].lesson
                        };
                        user.dataJson[millisecond] = [];
                        user.dataJson[millisecond].push(obj);
                    }
                }
                userModel.update({dataJson : user.dataJson} , {where : {id : userId}}).then((result)=>{
                    res.json({
                        status : true,
                        result : result
                    });
                }).catch((e)=>{
                    res.json({
                        status : false,
                        error : e,
                    })
                })
            }
        }).catch((e)=>{
            res.json({
                status : false,
                error : e,
            })
        })
    }
};
