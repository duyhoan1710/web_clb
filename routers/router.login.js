let controllerLogin = require('../controllers/controller.login');

module.exports = (app) =>{
    app.post('/api/login' , controllerLogin.post);
    app.get('/api/logout' , controllerLogin.logout);
};
