/**
 * Created with JetBrains PhpStorm.
 * Author: Shaman
 * Date: 12-12-22
 * Time: 下午2:53
 * To change this template use File | Settings | File Templates.
 */

var mongo = require('../node_modules/mongodb');
var db = require('./db');

module.exports = {
    artDel: function(aid, callback){
        var _aid = new mongo.ObjectID(aid);
        db.open(function(){
            db.collection('article', function(err, collection){
                collection.remove({'_id':_aid}, function(err){
                    var resJson = {
                        aid: _aid,
                        message: 'success!'
                    };
                    callback(err, resJson);
                    db.close();
                });
            });
        });
    },

    artAdd: function(data, callback){
        db.open(function(){
            db.collection('article', function(err, collection){
               collection.insert(data, function(err){
                   var resJson = {
                       data: data,
                       message: 'success!'
                   };
                   callback(err, resJson);
                   db.close();
               })
            });
        });
    }
}