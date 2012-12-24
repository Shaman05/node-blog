/**
 * Module dependencies.
 */

var express = require('express'),
    http = require('http'),
    path = require('path'),
    routes = require('./routes'),
    mongoStore = require('./node_modules/connect-mongo')(express),
    setting = require('./setting');
var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.cookieParser());
    app.use(express.session({
        secret: setting.cookieSecret,
        cookie: new Date(Date.now() + 2 * 60 * 60),
        store: new mongoStore({
            db: setting.db
        }, function(){
            console.log('Connect to mongodb success...!');
        })
    }));
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/home', routes.index);
app.get('/about', routes.about);
app.get('/article', routes.artList);
app.get('/article/:id', routes.artShow);

//admin routes
//app.get('/admin', routes.checkLogin);
app.get('/admin', routes.ad_index);
//app.get('/admin/article', routes.checkLogin);
app.get('/admin/article', routes.ad_article);
//app.get('/admin/article_edit', routes.checkLogin);
app.get('/admin/article_edit', routes.ad_article_edit);
//app.get('/admin/article_edit/:id', routes.checkLogin);
app.get('/admin/article_edit/:id', routes.ad_article_edit);

//ajax routes
app.post('/ajax/login', routes.login);
app.post('/ajax/article_del', routes.artDel);
app.post('/ajax/article_edit', routes.artEdit);

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});
