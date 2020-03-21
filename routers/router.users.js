let logger = require('../logger/logger');
let controllerUsers = require('../controllers/controller.users');

module.exports = (app) =>{
    app.post('/api/user' , controllerUsers.createUser);
    app.get('/api/user' , controllerUsers.getProfile);
    app.get('/api/user/profile/:id' , controllerUsers.getProfileMember);
    app.put('/api/user/:id' , controllerUsers.update);
    app.delete('/api/user/:id' , controllerUsers.delete);
    app.get('/api/user/listBasic/:id' , controllerUsers.getListBasic);
    app.get('/api/user/listAdvance/:id' , controllerUsers.getListAdvance);
    app.get('/api/user/AllBasic' , controllerUsers.getAllBasic);
    app.get('/api/user/AllAdvance' , controllerUsers.getAllAdvance);
    app.get('/api/user/getGroupRoleFromUser/:id' , controllerUsers.getGroupRoleFromUser);
    app.put('/api/user/updateUserToGroupRole/:id' , controllerUsers.updateUserToGroupRole);
};