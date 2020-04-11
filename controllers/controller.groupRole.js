let {groupModel , roleModel , groupRoleModel} = require('../db/index');


module.exports = {
    getGroup : ()=>{

    },
    createGroup : () =>{

    },
    getRole : ()=>{

    },
    createRole : ()=>{

    },
    getGroupRole :(req , res , next)=>{
        groupRoleModel.findAll({
            where : {},
            attributes : ['id'],
            include : [
                {model : groupModel , attributes : ['id' , 'groupName']},
                {model : roleModel , attributes : ['id' , 'roleName']}
            ]
        }).then((groupRole)=>{
            res.json({
                status: true,
                message : 'get success',
                groupRole : groupRole
            })
        }).catch((e)=>{
            res.json({
                status: false,
                error : e
            });
        });
    },
    createGroupRole : ()=>{

    }

};
