let controllerSchedule = require('../controllers/controller.schedule');

module.exports = (app)=>{
    app.get('/api/schedule' , controllerSchedule.get);
    app.put('/api/schedule' , controllerSchedule.update);
};
