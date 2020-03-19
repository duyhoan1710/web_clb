require('dotenv').config();




// let config = {
//     database : process.env.database_mysql,
//     username : process.env.username_mysql,
//     password : process.env.password_mysql,
//     host : process.env.host_vps,
//     post : process.env.post_mysql,
//     dialect : process.env.dialect_mysql,
//     uri : process.env.UriMysql,
//
//     account_admin : {
//         username : process.env.username_admin,
//         password : process.env.password_admin,
//         email : process.env.email_admin,
//         phone : process.env.phone_admin
//     },
//
//     bcrypt : {
//         saltRounds : process.env.saltRounds,
//     }
// };

let config = {
    database : 'kitClub',
    username : "root",
    password : 'K-lab123!@#',
    host : '139.180.203.181',
    post : 3306,
    dialect : 'mysql',

    account_admin : {
        username : 'kpokelln',
        password : 'Duyhoan2302',
        email : 'hoanDuy1710@gmail.com',
        phone : '0932257833'
    },

    bcrypt : {
        saltRounds : '10',
    }
};

module.exports = config;