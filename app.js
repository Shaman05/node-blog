/**
 * Module dependencies.
 */

var express = require('express'),
    http = require('http'),
    path = require('path'),
    router = require('./routes'),
    mongoStore = require('./node_modules/connect-mongo')(express),
    config = require('./config');
var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || config.port);
    app.set('view engine', config.viewEngine);
    app.set('views', config.viewsDir);
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.compress());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(path.join(__dirname, config.staticPath)));
    app.use(express.cookieParser());
    app.use(express.session({
        secret: config.dbSettings.cookieSecret,
        cookie: config.dbSettings.cookieExpires,
        store: new mongoStore({db: config.dbSettings.db})
    }));
    app.use(app.router);
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

router(app);

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});
