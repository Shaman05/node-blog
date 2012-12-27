/**
 * Created with JetBrains PhpStorm.
 * User: chenD1
 * Date: 12/27/12
 * Time: 10:04 AM
 * To change this template use File | Settings | File Templates.
 */

var routes = require('./router');

module.exports = function(app){
    //front
    app.get('/', routes.index);
    app.get('/home', routes.index);
    app.get('/about', routes.about);
    app.get('/article', routes.artList);
    app.get('/article/:id', routes.artShow);

    //admin
    app.get('/admin', routes.checkLogin);
    app.get('/admin', routes.ad_index);
    app.get('/admin/article', routes.checkLogin);
    app.get('/admin/article', routes.ad_article);
    app.get('/admin/article_edit', routes.checkLogin);
    app.get('/admin/article_edit', routes.ad_article_edit);
    app.get('/admin/article_edit/:id', routes.checkLogin);
    app.get('/admin/article_edit/:id', routes.ad_article_edit);

    //ajax
    app.post('/ajax/login', routes.login);
    app.post('/ajax/article_del', routes.artDel);
    app.post('/ajax/article_edit', routes.artEdit);
};
