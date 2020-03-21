let logger = require('../logger/logger');
let {notifyModel , userModel} = require('../db/index');

module.exports = {
    getNotify : (req , res , next)=>{
        let notifyId = req.params.notifyId;
        notifyModel.findOne({
            where : {id : notifyId},
            attributes : ['id' , 'authorId' , 'groupId', 'title' ,'content'],
            include : [
                {model : userModel , attributes : ['id' , 'fullName']}
            ]
        }).then((notify)=>{
            res.json({
                message : 'get notify success',
                notify : notify
            })
        }).catch((e)=>{
            logger.error('get notify error : ' + e);
            res.json({
                message : 'get notify error',
                error : e
            })
        })
    },
    getListNotify : (req , res , next)=>{
        let groupId = req.params.groupId;
        notifyModel.findOne({
            where : {groupId : groupId},
            attributes : ['id' , 'authorId' , 'groupId', 'title' ,'content'],
            include : [
                {model : userModel , attributes : ['id' , 'fullName']}
            ]
        }).then((notify)=>{
            res.json({
                message : 'get notify success',
                notify : notify
            })
        }).catch((e)=>{
            logger.error('get notify error : ' + e);
            res.json({
                message : 'get notify error',
                error : e
            })
        })
    },
    createNotify : (req , res , next)=>{
        // userId , groupId , title , content
        let userId = req.user.id;
        let body = req.body.notify;
        notifyModel.create({authorId : userId , groupId : body.groupId, title : body.title , content : body.content}).then((notify)=>{
            res.json({
                message : 'create notify success',
                notify : notify
            })
        }).catch((e)=>{
            logger.error('create notify error : ' + e );
            res.json({
                message : 'create notify error',
                error : e
            });
        });
    }
};