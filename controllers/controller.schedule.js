let logger = require('../logger/logger');
// let {userModel} = require('../db/index');
let getViewState = require('./schedule/schedule.getViewState');
let getCookies = require('./schedule/schedule.getCookie');
let loginWithCookieAndGetElement = require('./schedule/schedule.loginWithCookieAndGetElement');
let createFileXlS = require('./schedule/schedule.createFileXLS');
let getDataJson = require('./schedule/schedule.handlingData');
let updateDataJson = require('./schedule/schedule.updateDataJson');
let sleep = ()=>{
    return new Promise((resolve)=>{
        setTimeout(resolve , 100);
    });
};

let setUpArray = () => {
    let arrayLesson = ["1,2,3","4,5,6","7,8,9","10,11,12","13,14,15,16"];
    let newObjectHasMeeting = {};
    let date = new Date().getDate();
    let month = new Date().getMonth();
    let year = new Date().getFullYear();
    let millisecond = new Date(year+ '/' + (month+ 1) + '/' + date).getTime();
    for(let i = millisecond; i <= millisecond + 60*60*24*15*1000; i+= 60*60*24*1000 ){
        newObjectHasMeeting[i] = {};
        for(let j = 0; j< arrayLesson.length; j++){
            newObjectHasMeeting[i][arrayLesson[j]] = [];
        }
    }
    return newObjectHasMeeting;
};

module.exports = {
    // get : (req , res , next)=>{
    //     let userId = req.user.id;
    //     userModel.findOne({where : {id : userId} , attributes : ['dataJson']}).then((schedule)=>{
    //         if(schedule.dataJson){
    //             res.json({
    //                 status: true,
    //                 message : 'get data schedule success',
    //                 schedule : schedule
    //             });
    //         }else{
    //             res.json({
    //                 status: false,
    //                 message : 'chưa update studentAccount , hãy update trước'
    //             });
    //         }
    //     }).catch((e)=>{
    //         logger.error('get data schedule error : ' + e );
    //         res.json({
    //             status: false,
    //             message : 'get data schedule error',
    //             error : e
    //         });
    //     })
    // },
    // update : async (req , res , next)=>{
    //     let userId = req.user.id;
    //     let studentAccount = req.body.studentAccount;
    //     let studentPassword = req.body.studentPassword;
    //     try{
    //         let viewState = await getViewState();
    //         let cookies = await getCookies(viewState , studentAccount , studentPassword);
    //         let elements = await loginWithCookieAndGetElement(cookies , viewState);
    //         await createFileXlS(cookies , elements , studentAccount);
    //         await sleep();
    //         let dataJson = getDataJson(studentAccount);
    //         userModel.update({studentAccount : studentAccount , studentPassword : studentPassword , dataJson : dataJson}, {where : {id : userId}} ).then((result)=>{
    //             res.json({
    //                 status: true,
    //                 message : 'update dataJson schedule success',
    //                 dataJson : dataJson
    //             })
    //         }).catch((e)=>{
    //             logger.error(e);
    //             console.log(e);
    //             res.json({
    //                 status:false,
    //                 message : 'update dataJson error',
    //                 error : e,
    //             })
    //         })
    //     }catch (e) {
    //         logger.error(e);
    //         res.json({
    //             status: false,
    //             message : 'update dataJson schedule error',
    //             error : e
    //         });
    //     }
    // },
    // guest
    post : async (req , res , next)=>{
        let arrayGrade = ['AT14,CT2,DT1', 'AT15,CT3,DT2', 'AT16,CT4,DT3'];
        let studentAccount = req.body.studentAccount;
        let branch = studentAccount[0] + studentAccount[1];
        if(branch === 'AT') branch = branch + studentAccount[2] + studentAccount[3];
        else branch = branch + studentAccount[3];
        let studentPassword = req.body.studentPassword;
        try{
            let {viewState, eventValidation} = await getViewState();
            let cookies = await getCookies(viewState, eventValidation , studentAccount , studentPassword);
            let elements = await loginWithCookieAndGetElement(cookies , viewState, eventValidation);
            await createFileXlS(cookies , elements , studentAccount);
            await sleep();
            let {objectData} = getDataJson(studentAccount);

            // console.log(objectData);
            // for(let i = 0 ; i< arrayGrade.length; i++){
            //     if(arrayGrade[i].indexOf(branch) !== -1){
            //         objectData = updateDataJson(objectData, arrayClass, arrayGrade[i]);
            //     }
            // }
            // objectData = updateDataJson(objectData , arrayClass , '13-4');
            // objectData = updateDataJson(objectData , arrayClass , '20-4');
            res.json({
                status : true,
                message : 'get dataJson schedule success',
                dataJson : objectData
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
    // updatePersonalSchedule : (req , res , next)=>{
    //     // let arr = [
    //     //        {
    //     //            time : time,
    //     //            subject : subjectName,
    //     //            address : address,
    //     //            lesson : lesson
    //     //        },
    //     //        {
    //     //            time : time,
    //     //            subject : subjectName,
    //     //            address : address,
    //     //            lesson : lesson
    //     //        }
    //     // ]
    //     let userId = req.user.id;
    //     let arraySchedule = req.body.arraySchedule;
    //     userModel.findOne({where : {id : userId}}).then((user)=>{
    //         if(!user){
    //             res.json({
    //                 status : false,
    //                 message : 'update schedule first'
    //             });
    //         }else{
    //             for(let i = 0 ; i < arraySchedule.length ; i++){
    //                 let millisecond = new Date(arraySchedule[i].time).getTime();
    //                 console.log(millisecond);
    //                 if(user.dataJson[millisecond]){
    //                     let obj = {
    //                         'school': false,
    //                         'subject' : arraySchedule[i].subject,
    //                         'address' : arraySchedule[i].address,
    //                         'lesson' : arraySchedule[i].lesson
    //                     };
    //                     user.dataJson[millisecond].push(obj);
    //                 }else{
    //                     let obj = {};
    //                     obj = {
    //                         'school': false,
    //                         'subject' : arraySchedule[i].subject,
    //                         'address' : arraySchedule[i].address,
    //                         'lesson' : arraySchedule[i].lesson
    //                     };
    //                     user.dataJson[millisecond] = [];
    //                     user.dataJson[millisecond].push(obj);
    //                 }
    //             }
    //             userModel.update({dataJson : user.dataJson} , {where : {id : userId}}).then((result)=>{
    //                 res.json({
    //                     status : true,
    //                     result : result
    //                 });
    //             }).catch((e)=>{
    //                 res.json({
    //                     status : false,
    //                     error : e,
    //                 })
    //             })
    //         }
    //     }).catch((e)=>{
    //         res.json({
    //             status : false,
    //             error : e,
    //         })
    //     })
    // },
    // getMeeting: (req,res,next)=>{
    //     userModel.findAll({
    //         where: {},
    //         attributes : ['fullName','dataJson']
    //     }).then(listUser => {
    //         let newObjectHasMeeting = setUpArray();
    //         let date = new Date().getDate();
    //         let month = new Date().getMonth();
    //         let year = new Date().getFullYear();
    //         let millisecond = new Date(year+ '/' + (month+ 1) + '/' + date).getTime();
    //         let arrayLesson = ["1,2,3","4,5,6","7,8,9","10,11,12","13,14,15,16"];
    //         for(let i = 0; i < listUser.length; i++){
    //             if(listUser[i].dataJson){
    //                 for(let j = millisecond; j <= millisecond + 60*60*24*15*1000; j+= 60*60*24*1000 ){
    //                     if(listUser[i].dataJson[j]){
    //                         for(let countOfLesson = 0 ; countOfLesson < listUser[i].dataJson[j].length; countOfLesson ++ ){
    //                             arrayLesson.forEach(lesson => {
    //                                 if(listUser[i].dataJson[j][countOfLesson].lesson.indexOf(lesson) !== -1){
    //                                     newObjectHasMeeting[j][lesson].push({
    //                                         user: listUser[i].fullName ,
    //                                         subject: listUser[i].dataJson[j][countOfLesson].subject
    //                                     });
    //                                 }
    //                             })
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //         res.json({
    //             status: true,
    //             data: newObjectHasMeeting
    //         })
    //     }).catch(error => {
    //         console.log(error);
    //         res.json({
    //             status: false,
    //             error: error
    //         });
    //     });
    // }
};
