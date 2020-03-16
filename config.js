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
        username : process.env.username,
        password : process.env.password,
        email : process.env.email,
        phone : process.env.phone
    }
};
module.exports = config;