
let sequelize = require('../db/connectDatabase');
let Users = require('../models/model.user')(sequelize);

module.exports = {
    get : (req , res , next )=>{
        res.json({
            user : Users
        })
    },
    post : (req ,res , next)=>{

    },
    update : (req ,res , next )=>{

    },
    delete : (req ,res , next )=>{

    },
    getList : (req ,res , next )=>{

    }
}