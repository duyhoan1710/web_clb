let controllerNews = require('../controllers/controller.news');

module.exports = (app)=>{
    app.get('/api/news/:newsId' , controllerNews.getNews);
    app.get('/api/news/list' , controllerNews.getListNews);
    app.get('/api/callStackNews/:newsId' , controllerNews.getCallStackNews);
    app.get('/api/callStackNews/list' , controllerNews.getListCallStackNews);
    app.post('/api/news' , controllerNews.createNews);
    app.put('/api/news' , controllerNews.updateNews);
    app.delete('/api/news' , controllerNews.deleteNews);

};
