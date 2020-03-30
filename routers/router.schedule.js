let controllerSchedule = require('../controllers/controller.schedule');
let authorize = require('../middleware/authenticate/isAuth');
module.exports = (app)=>{
    app.get('/api/schedule' ,authorize.isAuth, controllerSchedule.get);
    app.put('/api/schedule' ,authorize.isAuth, controllerSchedule.update);

    // guest
    app.post('/api/schedule/guest' , controllerSchedule.post);
};