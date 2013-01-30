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
    app.get('/', routes.artList);
    app.get('/about', routes.about);
    app.get('/article', routes.artList);
    app.get('/tag/:tag', routes.artList);
    app.get('/search', routes.search);
    app.get('/search/:keyword', routes.artList);
    app.get('/category/:category', routes.artList);
    app.get('/article/:id', routes.artShow);
    app.get('/archives', routes.archives);
    app.get('/lab', routes.lab);
    app.get('/chat', routes.chat);
    app.post('/install', routes.install);

    //admin
    app.get('/admin/logout', routes.logout);
    app.get('/admin', routes.checkLogin);
    app.get('/admin', routes.ad_index);
    app.get('/admin/article', routes.checkLogin);
    app.get('/admin/article', routes.ad_article);
    app.get('/admin/article_edit', routes.checkLogin);
    app.get('/admin/article_edit', routes.ad_article_edit);
    app.get('/admin/article_edit/:id', routes.checkLogin);
    app.get('/admin/article_edit/:id', routes.ad_article_edit);
    app.post('/KE/upload_img', routes.upload_img);
    app.get('/admin/fileEdit', routes.fileEdit);

    //ajax
    app.post('/ajax/login', routes.login);
    app.post('/ajax/article_del', routes.artDel);
    app.post('/ajax/article_edit', routes.artEdit);
    app.post('/admin/category_add', routes.categoryAdd);
    app.get('/admin/getToc', routes.getToc);
    app.get('/admin/getDocument', routes.getDocument);
    app.post('/admin/modifyFile', routes.modifyFile);
};
