let controllerLogin = require('../controllers/controller.login');
let authenticate = require('../middleware/authenticate/isAuth');
module.exports = (app) =>{
    app.post('/api/login' , controllerLogin.post);
    app.get('/api/logout' , authenticate.isAuth , controllerLogin.logout);
};
