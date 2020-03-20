let controllerLogin = require('../controllers/controller.login');

module.exports = (app) =>{
    app.get('/api/login' , controllerLogin.get);
    app.post('/api/login' , controllerLogin.post);
    app.get('/api/logout' , controllerLogin.logout);
    app.get('/api/login/schedule' , controllerLogin.getSchedule);
    app.post('/api/login/schedule' , controllerLogin.postSchedule);

};