let controllerGroupRole = require('../controllers/controller.groupRole');

module.exports = (app)=>{
    app.get('/api/group' , controllerGroupRole.getGroup);
    app.post('/api/group' , controllerGroupRole.createGroup);
    app.get('/api/role' , controllerGroupRole.getRole);
    app.post('/api/role' , controllerGroupRole.createRole);
    app.get('/api/groupRole' , controllerGroupRole.getGroupRole);
    app.post('/api/groupRole' , controllerGroupRole.createGroupRole);
};
