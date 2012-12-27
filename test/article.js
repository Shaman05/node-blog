/**
 * Created with JetBrains PhpStorm.
 * User: chenD1
 * Date: 12/27/12
 * Time: 3:27 PM
 * To change this template use File | Settings | File Templates.
 */

var http = require('http');
var db = require('../models/db');

http.createServer(function(req, res){
    db.open(function(){
        db.collection('article', function(err, collection){
            collection.findOne({title:'test'}, function(err, data){
                res.writeHead(200, {
                    'Content-Type': 'text/html',
                    'charset': 'utf-8'
                });
                res.write(data.content);
                res.end();
                db.close();
            });
        });
    });
}).listen(8080);
console.log('start..');
