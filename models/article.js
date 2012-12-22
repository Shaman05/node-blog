/* 文章模型
 * 包含: 
 * 1.所有文章的信息获取；
 * 2.指定id文章的内容获取；
 * ...待添加
 */

var db = require('./db');

module.exports = {
    artList:function(callback){
        db.open(function(){
            db.collection('article', function(err, collection){
                collection.find({},function(err, cursor){
                    cursor.toArray(function(err,items){
                        callback(err, items, db);
                    });
                });
            });
        });
    },
    artShow:function(req){
        return req.params.id;
    }
}
