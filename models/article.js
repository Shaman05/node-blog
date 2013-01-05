/* 文章模型
 * 包含: 
 * 1.所有文章的信息获取；
 * 2.指定id文章的内容获取；
 * 3.获取所有分类
 * 4.文章归档
 * ...待添加
 */
var mongo = require('../node_modules/mongodb');
var db = require('./db');

module.exports = {
    artList:function(filter, callback){
        var sortBy = filter.sortBy;
        db.open(function(){
            db.collection('article', function(err, collection){
                collection.find(filter.condition,function(err, cursor){
                    if(sortBy && typeof(sortBy) === 'string')
                        cursor.sort(sortBy, -1); //倒序
                    cursor.toArray(function(err,items){
                        callback(err, items);
                        db.close();
                    });
                });
            });
        });
    },

    article: function(aid, callback){
        var _aid = new mongo.ObjectID(aid);
        db.open(function(){
            db.collection('article', function(err, collection){
                collection.findOne({'_id':_aid}, function(err, data){
                    //前台访问，点击次数+1
                    data.content = transformContent(data.content);
                    collection.update({'_id':_aid},{$set:{clicks: data.clicks + 1}});
                    callback(err, data);
                    db.close();
                });
            });
        });
    },

    archives: function(callback){
        db.open(function(){
            db.collection('article', function(err, collection){
                collection.find({},function(err, cursor){
                    cursor.sort('pubtime', -1);
                    cursor.toArray(function(err,items){
                        var artList = {};
                        for(var i = 0, len = items.length; i < len; i++){
                            var item = items[i];
                            var year = getPubYear(item.pubtime);
                            if(!artList[year])artList[year] = [];
                            artList[year].push({
                                _id: item._id,
                                pubtime: item.pubtime.split(" ")[0],
                                title: item.title
                            });
                        }
                        callback(err, artList);
                        db.close();
                    });
                });
            });
        });
    },

    artGet: function(act, aid, callback){
        this.getCategory(function(err, categorys){
            if(!aid){  //添加新文章
                callback(err, categorys);
                return;
            }else{  //获取文章信息
                var _aid = new mongo.ObjectID(aid);
                db.open(function(){
                    db.collection('article', function(err, collection){
                        collection.findOne({'_id':_aid}, function(err, data){
                            callback(err, categorys, data);
                            db.close();
                        });
                    });
                });
            }
        });
    },

    getCategory: function(callback){
        db.open(function(){
            db.collection('category', function(err, collection){
                collection.find(function(err, data){
                    data.toArray(function(err,items){
                        db.close();
                        callback(err, items);
                    });
                });
            });
        });
    }
};

function transformContent(content){
    return content.split('[[split]]').join('');
}

function getPubYear(pubtime){
    return pubtime.split('-')[0];
}