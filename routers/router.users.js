let logger = require('../logger/logger');
let controllerUsers = require('../controllers/controller.users');

module.exports = (app) =>{
    app.get('/api/user/:id' , controllerUsers.get);
    app.put('/api/user/:id' , controllerUsers.update);
    app.delete('/api/user/:id' , controllerUsers.delete);
    app.get('/api/user/listBasic/:groupId' , controllerUsers.getListBasic);
    app.get('/api/user/listAdvance/:groupId' , controllerUsers.getListAdvance);
    app.get('/api/user/AllBasic' , controllerUsers.getAllBasic());
    app.get('/api/user/AllAdvance/:groupId' , controllerUsers.getAllAdvance);
    app.post('/api/user/addUserToGroupRole' , controllerUsers.addUserToGroupRole);
    app.post('/api/user/updateUserToGroupRole' , controllerUsers.updateUserToGroupRole());
};