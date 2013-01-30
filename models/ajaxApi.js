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
var util = require('./util');
var sys = require('./sys');
var fs = require('fs');

module.exports = {
    createAdmin: function(name, password, callback){
        var md5 = crypto.createHash('md5');
        var pwd =  md5.update(password).digest('base64');
        db.open(function(){
            db.collection('users', function(err, collection){
                collection.insert({name:name,password:pwd}, function(err){
                    callback(err);
                })
            });
        });
    },

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
                    data.pubtime = data.pubtime || util.getTime();
                    data.clicks = 0;
                    data.tags = util.transformTags(data.tags);
                    data.summry = util.transformSummry(data.content);
                    data.content = data.content;
                    collection.insert(data, function(err){
                        callback(err ? {state:'failed', message:err} : {state:'success', data:data});
                    })
                }else{
                    var _aid = new mongo.ObjectID(data.aid);
                    collection.update(
                        {'_id':_aid},
                        {$set:{
                            title: data.title,
                            pubtime: data.pubtime || util.getTime(),
                            category: data.category,
                            tags: util.transformTags(data.tags),
                            summry: util.transformSummry(data.content),
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
    },

    categoryAdd: function(category, callback){
        db.open(function(){
            db.collection('category', function(err, collection){
                collection.findOne({name:category},function(err, data){
                    var resJson = {
                        state: 'failed'
                    };
                    if(err){
                        resJson.message = err;
                    }else{
                        if(data){
                            resJson.message = '栏目已存在！';
                        }else{
                            collection.insert({name:category},function(err){
                                if(!err){
                                    resJson.state = 'success';
                                    resJson.message = '添加成功！';
                                }
                            });
                        }
                    }
                    callback(resJson);
                    db.close();
                })
            });
        });
    },

    getToc: function(dir, callback){
        //console.log(dir)
        var resJSON = {
            queryDir: dir,
            parentDir: dir.split('/').slice(0, -1).join('/'),
            folder: [],
            document: []
        };
        fs.readdir(dir, function(err, files){
            if(err){
                resJSON.err = err;
                callback(resJSON);
                return;
            }
            for(var i = 0, len = files.length; i < len; i++){
                var pathname = dir + "\/" + files[i];
                var stat = fs.lstatSync(pathname);
                if (!stat.isDirectory()){
                    var a = files[i].split('.');
                    var date = stat.atime.toLocaleDateString();
                    var docSize = util.formatSize(stat.size);
                    resJSON.document.push({
                        type: a[a.length-1],
                        name: files[i],
                        lastModfied: date,
                        size: docSize
                    });
                } else {
                    //var fsize = util.formatSize(util.getDirSize(pathname)); //取消文件夹大小的输出
                    resJSON.folder.push({
                        name: files[i],
                        size: '--'
                    });
                }
            }
            callback(resJSON);
        });
    },

    getDocument: function(filename, callback){
        var resJSON = {
            statu: 'success',
            content: null
        };
        fs.readFile(filename, 'utf-8', function(err, content){
            if(err){
                resJSON.statu = 'failed';
                resJSON.err = err;
            }else{
                resJSON.content = content;
            }
            callback(resJSON);
        });
    },

    modifyFile: function(content, filename, callback){
        var resJSON = {
            statu: 'success'
        };
        fs.writeFile(filename, content, 'utf-8', function(err){
            if(err){
                resJSON.statu = 'failed';
                resJSON.err = err;
            }
            callback(resJSON);
        });
    }
};