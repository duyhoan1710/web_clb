let validateUser = require('validate.js');

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
    },
    email: {
        presence: true,
        type: 'string',
        email:{
            message: function (value) {
                return  `${value} is not valid`;
            }
        }
    },
    phone: {
        presence: true,
        type: 'number',
        format: {
            pattern: /(09|01[2|6|8|9])+([0-9]{8})\b/g,
            message: function (value) {
                return `${value} is not valid`;
            }
        }
    },
    birthday: {
        presence: true,
        type: 'string',
        format: {
            pattern: /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
            message: function (value) {
                return `${value} is not format DD/MM/YYYY or DD-MM-YYYY`;
            }
        }
    },
    fullName: {
        presence: true,
        type: 'string',
        format: {
            pattern: /^[a-zA-Z ]+$/i,
            message: function (value) {
                return 'fullName is not valid';
            }
        }
    }
};

module.exports = {
    createUser: (req,res,next)=>{
        let {username, password, email, phone, birthday, fullName } = req.body;
        let data = {username, password, email, phone, birthday, fullName };
        const _constrains = constrains;
        Object.keys(_constrains).forEach(key => {
            _constrains[key]['presence'] = false;
        });
        Object.keys(data).forEach(key => {
            if (!data[key]) {
                delete data[key];
            }
        });
        validateUser.async(data, _constrains).then(() => {
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
