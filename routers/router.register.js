let controllerRegister = require('../controllers/controller.register');
 module.exports = (app)=>{
     app.get('/api/register' , controllerRegister.get);
 };