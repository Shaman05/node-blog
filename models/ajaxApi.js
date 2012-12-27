/**
 * Created with JetBrains PhpStorm.
 * Author: Shaman
 * Date: 12-12-22
 * Time: 下午2:53
 * To change this template use File | Settings | File Templates.
 */

var mongo = require('../node_modules/mongodb');
var db = require('./db');
var crypto = require('crypto');

module.exports = {
    login: function(user, callback){
        var md5 = crypto.createHash('md5');
        var name = user.name;
        var pwd =  md5.update(user.password).digest('base64');
        db.open(function(){
            db.collection('users', function(err, collection){
                collection.findOne({'name':name}, function(err, data){
                    var resJson = {
                        state: 'failed'
                    };
                    if(err){
                        resJson.message = err;
                    }else{
                        if(!data){
                            resJson.message = '用户名不存在';
                        }else{
                            if(pwd != data.password){
                                resJson.message = '密码错误';
                            }else{
                                resJson.state = 'success';
                                resJson.message = '登录成功';
                            }
                        }
                    }
                    callback(resJson);
                    db.close();
                });
            });
        });
    },

    logout: function(user, callback){
        db.open(function(){
            db.collection('users', function(err, collection){
                collection.remove({'name':user}, function(err){
                    var resJson = {};
                    if(err){
                        resJson.stats = 'failed';
                    }else{
                        resJson.stats = 'success';
                    }
                    callback(resJson);
                    db.close();
                });
            });
        });
    },

    artDel: function(aid, callback){
        var _aid = new mongo.ObjectID(aid);
        db.open(function(){
            db.collection('article', function(err, collection){
                collection.remove({'_id':_aid}, function(err){
                    callback(err ? {state:'failed', message:err} : {state:'success', message:'删除成功'});
                    db.close();
                });
            });
        });
    },

    artEdit: function(data, callback){
        db.open(function(){
            db.collection('article', function(err, collection){
                if(!data.aid){

                    data.pubtime = getTime();
                    data.clicks = 0;
                    console.log(data)
                    collection.insert(data, function(err){
                        callback(err ? {state:'failed', message:err} : {state:'success', data:data});
                    })
                }else{
                    var _aid = new mongo.ObjectID(data.aid);
                    collection.update(
                        {'_id':_aid},
                        {$set:{
                            title: data.title,
                            catogery: data.catogery,
                            tags: data.tags,
                            content: data.content
                        }},
                        function(err){
                            callback(err ? {state:'failed', message:err} : {state:'success', data:data});
                        }
                    );
                }
                db.close();
            });
        });
    }
};

function getTime(){
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDay();
    return year + '-' + month + '-' + day;
}