let controllerUsers = require('../controllers/controller.users');

module.exports = (app) =>{
    app.get('/api/user/:id' , controllerUsers.get);
    app.post('/api/user/:id' , controllerUsers.post);
    app.put('/api/user/:id' , controllerUsers.update);
    app.delete('/api/user/:id' , controllerUsers.delete);
    app.get('/api/user/list' , controllerUsers.getList);

}