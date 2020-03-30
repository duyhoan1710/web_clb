let logger = require('../logger/logger');
let {notifyModel , userModel , groupModel} = require('../db/index');
let getGroupId = require('../db/lib/getGroupId');
module.exports = {
    getNotify : async (req , res , next)=>{
        let notifyId = req.params.notifyId;
        let groupRole = req.user.groupRole;
        let manageGroupId =await getGroupId(groupModel , 'manageGroup');
        let arrayGroupId = [];
        for(let i = 0 ;i < groupRole.length ; i++){
            arrayGroupId.push(groupRole[i].groupId);
        }
        arrayGroupId.push(manageGroupId);
        notifyModel.findOne({
            where : {id : notifyId , groupId : arrayGroupId},
            attributes : ['id', 'title' ,'content'],
            include : [
                {model : userModel , attributes : ['id' , 'fullName']},
                {model : groupModel , attributes : ['id' , 'groupName']}
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
    getListNotify : async (req , res , next)=>{
        let groupRole = req.user.groupRole;
        console.log(groupRole);
        let arrayGroupId = [];
        for(let i = 0 ;i < groupRole.length ; i++){
            arrayGroupId.push(groupRole[i].groupId);
        }
        let manageGroupId =await getGroupId(groupModel , 'manageGroup');
        arrayGroupId.push(manageGroupId);
        console.log(arrayGroupId);
        await notifyModel.findAll({
            where : {groupId : arrayGroupId},
            attributes : ['id' , 'title'],
            include : [
                {model : userModel , attributes : ['id' , 'fullName']},
                {model : groupModel , attributes : ['id' , 'groupName']}
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
        let body = req.body;
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
    },
    updateNotify : (req , res , next )=>{
        // userId , groupId ,notifyId, title , content
        let userId = req.user.id;
        let body = req.body;
        notifyModel.update({title : body.title , content : body.content} , {where : {authorId : userId , id : body.notifyId}}).then((result)=>{
            res.json({
                message : 'update notify success',
                notify : result
            })
        }).catch((e)=>{
            logger.error('update notify error : ' + e );
            res.json({
                message : 'update notify error',
                error : e
            });
        });
    },
    deleteNotify : (req , res ,next)=>{
        let userId = req.user.id;
        let body = req.body;
        notifyModel.destroy({where : {authorId : userId , id : body.notifyId}}).then((result)=>{
            res.json({
                message : 'delete notify success',
                notify : result
            })
        }).catch((e)=>{
            logger.error('delete notify error : ' + e );
            res.json({
                message : 'delete notify error',
                error : e
            });
        });
    }

};
