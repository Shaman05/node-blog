/**
 * Created with JetBrains PhpStorm.
 * User: Devin Chen
 * Date: 12/14/12
 * Time: 2:28 PM
 * To change this template use File | Settings | File Templates.
 */

var article = require('../models/article');
var ajax = require('../models/ajaxApi');

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
    var sortBy = '_id';
    article.artList(sortBy, function(err, data){
        res.render('article', {
            title: '文章列表'
            ,dataList : data
        });
    });
};

exports.artShow = function(req, res){
    var aid = req.params.id;
    article.artGet(aid, function(err, data){
        res.render('article_show', {
            title: '文章详细',
            article: data
        });
    });
};

exports.ad_index = function(req, res){
    res.render('admin/ad_index', {
        title: '后台管理首页'
    });
};

exports.ad_article = function(req, res){
    var sortBy = '_id';
    article.artList(sortBy, function(err, data){
        res.render('admin/ad_article', {
            title: '文章管理列表',
            dataList : data
        });
    });
};

exports.ad_article_edit = function(req, res){
    var aid = req.params.id || null;
    var act = 'add';
    var title = '添加文章';
    if(aid){
        act = 'edit';
        title = '编辑文章';
    }
    article.artGet(aid, function(err, data){
        res.render('admin/ad_article_edit', {
            title: title,
            act: act,
            article: data
        });
    });
};

exports.artDel = function(req, res){
    var aid = req.params.id || null;
    ajax.artDel(aid, function(resJson){
        res.json(resJson);
    });
}

exports.artEdit = function(req, res){
    var data = req.body;
    ajax.artEdit(data, function(resJson){
        res.json(resJson);
    });
}
