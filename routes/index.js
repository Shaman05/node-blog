/**
 * Created with JetBrains PhpStorm.
 * User: Devin Chen
 * Date: 12/14/12
 * Time: 2:28 PM
 * To change this template use File | Settings | File Templates.
 */

var article = require('../models/article'); 

exports.index = function(req, res){
    res.render('index', {
        title: '首页'
    });
};

exports.about = function(req, res){
    res.render('about', {
    	title: '关于我'
    })
}

exports.artList = function(req, res){
    var pageData = article.artList(req);
    res.render('article', {
        title: '文章列表'
       ,dataList : pageData
    });
};

exports.artShow = function(req, res){
    var pageData = article.artShow(req);
    res.render('article_show', {
        title: '文章详细',
        article: {
          id: pageData
        }
    });
};
