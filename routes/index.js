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
    article.artList(function(err, data, db){
        res.render('article', {
            title: '文章列表'
            ,dataList : data
        });
        db.close();
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

exports.ad_index = function(req, res){
    res.render('admin/ad_index', {
        title: '后台管理首页'
    });
};

exports.ad_article = function(req, res){
    article.artList(function(err, data, db){
        res.render('admin/ad_article', {
            title: '文章管理列表'
            ,dataList : data
        });
        db.close();
    });
};

exports.ad_article_edit = function(req, res){
    var aid = article.artShow(req);
    var title = '添加文章';
    title = aid ? '编辑文章' : title;
    res.render('admin/ad_article_edit', {
        title: title
    });
};
