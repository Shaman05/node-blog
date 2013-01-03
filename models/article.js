/* 文章模型
 * 包含: 
 * 1.所有文章的信息获取；
 * 2.指定id文章的内容获取；
 * 3.获取所有分类
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
