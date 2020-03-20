let logger = require('../logger/logger');
let controllerUsers = require('../controllers/controller.users');

module.exports = (app) =>{
    app.post('/api/user' , controllerUsers.createUser);
    app.get('/api/user' , controllerUsers.getProfile);
    app.get('/api/user/:id' , controllerUsers.getProfileMember);
    app.put('/api/user/:id' , controllerUsers.update);
    app.delete('/api/user/:id' , controllerUsers.delete);
    app.get('/api/user/listBasic/:groupId' , controllerUsers.getListBasic);
    app.get('/api/user/listAdvance/:groupId' , controllerUsers.getListAdvance);
    app.get('/api/user/AllBasic' , controllerUsers.getAllBasic);
    app.get('/api/user/AllAdvance/:groupId' , controllerUsers.getAllAdvance);
    app.get('/api/user/getGroupRoleFromUser/:userId' , controllerUsers.getGroupRoleFromUser);
    app.put('/api/user/updateUserToGroupRole/:userId' , controllerUsers.updateUserToGroupRole);
};