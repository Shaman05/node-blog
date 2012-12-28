/**
 * Created with JetBrains PhpStorm.
 * User: Devin Chen
 * Date: 12/14/12
 * Time: 2:28 PM
 * To change this template use File | Settings | File Templates.
 */

var article = require('../models/article');
var ajax = require('../models/ajaxApi');
var sys = require('../models/sys');

var siteData = {
    master: 'Shaman',
    description: 'nodejser , 关注nodejs及其相关的技术',
    power: 'Node-Blog',
    powerUrl: 'http://github.com/Shaman05/node-blog'
};

exports.index = function(req, res){
    var sortBy = '_id';
    article.artList(sortBy, function(err, data){
        res.render('index', {
            title: '首页',
            siteData: siteData,
            articles : data,
            isLogin: req.session.user ? true : false
        });
    });
};

exports.about = function(req, res){
    res.render('about', {
    	title: '关于',
        siteData: siteData,
        isLogin: req.session.user ? true : false
    })
}

exports.artList = function(req, res){
    var query = req.params;
    var title = '文章列表';
    var filter = {
        sortBy: null,
        condition: {}
    };
    if(query.tag){
        title = '标签 - ' + query.tag + ' 的相关文章';
        filter.condition = {tags: {$all: [query.tag]}};
    }
    if(query.keyword){
        title = '关键字为：' + query.keyword + ' 的相关文章';
        filter.condition = {title: query.keyword};
    }
    article.artList(filter, function(err, data){
        res.render('index', {
            title: title,
            siteData: siteData,
            articles : data,
            isLogin: req.session.user ? true : false
        });
    });
};

exports.artShow = function(req, res){
    var aid = req.params.id;
    article.artGet(null, aid, function(err, data){
        res.render('article_show', {
            title: data.title,
            siteData: siteData,
            article: data,
            isLogin: req.session.user ? true : false
        });
    });
};

exports.ad_index = function(req, res){
    res.render('admin/ad_index', {
        title: '后台管理首页',
        osInfo: sys.os,
        siteInfo: sys.site
    });
};

exports.ad_article = function(req, res){
    var sortBy = '_id';
    article.artList(sortBy, function(err, data){
        res.render('admin/ad_article', {
            title: '文章管理列表',
            dataList: data
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
    article.artGet(act, aid, function(err, data){
        res.render('admin/ad_article_edit', {
            title: title,
            act: act,
            article: data
        });
    });
};

//ajax api
exports.login = function(req, res){
    ajax.login(req.body, function(resJson){
        if(resJson.state == 'success'){
            //写入session
            req.session.user = req.body.name;
        }
        res.json(resJson);
    });
};

exports.logout = function(req, res, next){
    req.session.user = null;
    return res.redirect('/');
};

exports.artDel = function(req, res){
    var aid = req.body.aid || null;
    ajax.artDel(aid, function(resJson){
        res.json(resJson);
    });
};

exports.artEdit = function(req, res){
    ajax.artEdit(req.body, function(resJson){
        res.json(resJson);
    });
};

exports.checkLogin = function(req, res, next){
    if(!req.session.user){
        return res.redirect('/');
    }
    next();
};
