let controllerNotify = require('../controllers/controller.notify');
module.exports = (app)=>{
    app.get('/api/notify/:notifyId' , controllerNotify.getNotify);
    app.get('/api/notify/group/:groupId' , controllerNotify.getListNotify);
    app.post('/api/notify' , controllerNotify.createNotify);
    app.put('/api/notify' , controllerNotify.updateNotify);
    app.delete('/api/notify' , controllerNotify.deleteNotify);
};
