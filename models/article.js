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
var util = require('./util');

var paging = {
    total: 0,
    pages: 0,
    size: 5,
    narrow: 5,
    curPage: 1
};

module.exports = {
    artList:function(filter, callback){
        var sortBy = filter.sortBy;
        sortBy = sortBy && typeof(sortBy) === 'string' ? [sortBy, 'desc'] : []; //默认倒序
        var page = filter.page;
        db.open(function(){
            db.collection('article', function(err, collection){
                paging.curPage = parseInt(page);
                collection.find(filter.condition).count(function(err, total){
                    var size = paging.size;
                    paging.total = total;
                    paging.pages = Math.ceil(total/size);
                    collection.find(filter.condition,{limit:size, skip:size*(page-1), sort:[sortBy]},function(err, cursor){
                        cursor.toArray(function(err,items){
                            callback(err, items, paging);
                            db.close();
                        });
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
                    data.content = util.transformContent(data.content);
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
                        var artList = [];
                        artList.push({
                            year: new Date().getFullYear(),
                            list: []
                        });
                        for(var i = 0, len = items.length; i < len; i++){
                            var item = items[i];
                            var year = util.getPubYear(item.pubtime);
                            if(year != artList[artList.length-1].year){
                                artList.push({
                                    year: year,
                                    list: []
                                });
                            }
                            artList[artList.length-1].list.push(item);
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