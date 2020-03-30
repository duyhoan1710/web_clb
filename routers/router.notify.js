let controllerNotify = require('../controllers/controller.notify');
let authorize = require('../middleware/authorize/authorize');
module.exports = (app)=>{
    app.get('/api/notify/:notifyId' , controllerNotify.getNotify);
    app.get('/api/listNotify' , controllerNotify.getListNotify);

    app.post('/api/notify' , authorize('createNotify') ,  controllerNotify.createNotify);
    app.put('/api/notify' ,authorize('updateNotify') , controllerNotify.updateNotify);
    app.delete('/api/notify' , authorize('deleteNotify'),  controllerNotify.deleteNotify);
};
