let validate = require('validate.js');

const constrains = {
    username: {
        presence: true,
        format: {
            pattern: /^[a-zA-Z0-9_]+$/i,
            message: function (value) {
                return 'username is not has special character'
            }
        }
    },
    password: {
        presence: true,
        format: {
            pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/i,
            message: function (value) {
                return 'password is at least one digit, at least one lower case, at least one upper case, at least 8 from the mentioned characters';
            }
        }
    }
};

module.exports = {
    login : (req,res,next)=>{
        let {username, password} = req.body;
        let data = {username, password};

        validate.async(data, constrains).then(() => {
            res.body = data;
            next();
        }).catch(error => {
            res.json({
                status: false,
                error: error
            })
        });
    }
};
