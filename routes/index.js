/**
 * Created with JetBrains PhpStorm.
 * User: Devin Chen
 * Date: 12/14/12
 * Time: 2:28 PM
 * To change this template use File | Settings | File Templates.
 */

exports.index = function(req, res){
    res.render('index', {
        title: '首页'
    });
};

exports.artList = function(req, res){
    res.render('index', {
        title: '文章列表'
    });
};

exports.artShow = function(req, res){
    res.render('index', {
        title: '文章详细'
    });
};