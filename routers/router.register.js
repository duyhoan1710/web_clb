let controllerRegister = require('../controllers/controller.register');
 module.exports = (app)=>{
     app.get('/api/register' , controllerRegister.get);
     app.post('/api/register' , controllerRegister.post);
 };