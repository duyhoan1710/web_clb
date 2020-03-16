let controllerIndex = require('../controllers/controller.index');
module.exports = (app)=>{
    app.get('/' , controllerIndex.get);
    app.post('/' , controllerIndex.post);
    app.put('/' , controllerIndex.update);
    app.delete('/' , controllerIndex.delete);
    app.get('/' , controllerIndex.getList);

}