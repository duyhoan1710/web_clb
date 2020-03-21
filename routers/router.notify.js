let controllerNotify = require('../controllers/controller.notify');
module.exports = (app)=>{
    app.get('/api/notify/:notifyId' , controllerNotify.getNotify);
    app.get('api/notify/list/groupId' , controllerNotify.getListNotify);
    app.post('/api/notify' , controllerNotify.createNotify);
};