let jwt = require('jsonwebtoken');
let logger = require('../../logger/logger');
let generateToken = (user , secretKey , tokenLife) =>{
    return new Promise((resolve, reject) => {
        let payload = {
            id : user.id,
            username : user.username,
            password : user.password,
            groupRole : user.groupRole
        };
        jwt.sign(payload , secretKey , {algorithm : 'HS256' , expiresIn : tokenLife} , (err , token)=>{
            if(err){
                logger.error(err);
                reject(err);
            }else{
                resolve(token);
            }
        })
    });
};

let verifyToken = (token , secretKey) =>{
    return new Promise((resolve, reject) => {
        jwt.verify(token , secretKey , (error , decodeToken)=>{
            if(error){
                reject(error);
            }else{
                resolve(decodeToken);
            }
        })
    })
};

module.exports = {
    generateToken : generateToken,
    verifyToken : verifyToken
};
