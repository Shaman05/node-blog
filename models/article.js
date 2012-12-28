/* 文章模型
 * 包含: 
 * 1.所有文章的信息获取；
 * 2.指定id文章的内容获取；
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
                        cursor.sort(sortBy);
                    cursor.toArray(function(err,items){
                        callback(err, items);
                        db.close();
                    });
                });
            });
        });
    },

    artGet:function(act, aid, callback){
        if(!aid){  //添加新文章
            callback();
            return;
        }else{  //获取文章信息
            var _aid = new mongo.ObjectID(aid);
            db.open(function(){
                db.collection('article', function(err, collection){
                    collection.findOne({'_id':_aid}, function(err, data){
                        if(!act){
                            data.content = transformContent(data.content);
                            collection.update({'_id':_aid},{$set:{clicks: data.clicks + 1}});
                        }
                        callback(err, data);
                        db.close();
                    });
                });
            });
        }
    }
};

function transformContent(content){
    return content.split('[[split]]').join('');
}
