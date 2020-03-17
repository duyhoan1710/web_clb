require('dotenv').config();

let config = {
    database : process.env.database_mysql,
    username : process.env.username_mysql,
    password : process.env.password_mysql,
    host : process.env.host_vps,
    post : process.env.post_mysql,
    dialect : process.env.dialect_mysql,
    uri : process.env.UriMysql,

    account_admin : {
        username : process.env.username_admin,
        password : process.env.password_admin,
        email : process.env.email_admin,
        phone : process.env.phone_admin
    }
};
module.exports = config;