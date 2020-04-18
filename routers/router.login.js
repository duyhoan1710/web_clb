let controllerLogin = require('../controllers/controller.login');
let authenticate = require('../middleware/authenticate/isAuth');
let validate = require('../validate/validateLogin');
module.exports = (app) =>{
    app.post('/api/login' ,validate.login,  controllerLogin.post);
    app.get('/api/logout' , authenticate.isAuth , controllerLogin.logout);
};
