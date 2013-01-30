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
var fs = require('fs');
var siteData = require('../install/siteData')();

//front routes
exports.install = function(req, res){
    var siteInfo = req.body;
    res.writeHead(200, {
        'Content-Type': 'text/html',
        'charset': 'utf-8'
    });
    for(var pro in siteInfo){
        if(!siteInfo[pro]){
            res.end('亲 , ' + pro + ' 信息不能为空.');
            return;
        }
    }
    if(siteInfo.password !== siteInfo.rpassword){
        res.end('亲 , 两次密码输入不一致.');
        return;
    }
    //修改站点信息
    var text = fs.readFileSync('./install/siteData.js', 'utf8');
    text = text.replace('{$master}', siteInfo.master).replace('{$description}', siteInfo.description);
    fs.writeFileSync('./install/siteData.js', text, 'utf8');
    //创建后台管理员
    ajax.createAdmin(siteInfo.admin, siteInfo.password, function(err){
        var html = '<h3>Success!</h3><p><a href="/">Go to the index page.</a></p>';
        if(err){
            html = '<h3>Failed!</h3><p><a href="/">Create admin error!</a></p>';
        }
        fs.appendFileSync('./install/install.lock', 'installed', 'utf8');
        res.end(html);
    });
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
};

exports.search = function(req, res){
    var keyword = req.query.keyword;
    res.redirect('/search/' + keyword);
};

exports.artList = function(req, res){
    var query = req.params;
    var title = siteData.master + ' Node-Blog';
    var reg = null;
    var filter = {
        sortBy: 'pubtime',
        page: req.query.p || 1,
        condition: {}
    };
    var tag = query.tag;
    if(tag){
        title = '标签 - ' + tag + ' 的相关文章';
        filter.condition = {tags: {$all: [tag]}};
    }
    var keyword = query.keyword;
    if(keyword){
        reg = new RegExp(keyword, "g");
        title = '关键字为：' + keyword + ' 的相关文章';
        filter.condition = {title: reg};
    }
    var category = query.category;
    if(category){
        title = '文章分类 - ' + category;
        filter.condition = {category: category};
    }
    article.artList(filter, function(err, data, paging){
        if(keyword){
            for(var i = 0, len = data.length; i < len; i++)
                data[i].title = data[i].title.replace(reg, '<strong style="color: red;">' + keyword + '</strong>');
        }
        res.render('index', {
            title: title,
            siteData: siteData,
            articles : data,
            paging: paging,
            isLogin: req.session.user ? true : false
        });
    });
};

exports.artShow = function(req, res){
    var aid = req.params.id;
    article.article(aid, function(err, data){
        res.render('article_show', {
            title: data.title,
            siteData: siteData,
            article: data,
            isLogin: req.session.user ? true : false
        });
    });
};

exports.archives = function(req, res){
    article.archives(function(err, data){
        res.render('archives', {
            title: '文章归档',
            siteData: siteData,
            archives: data,
            isLogin: req.session.user ? true : false
        });
    });
};

exports.lab = function(req, res){
    res.render('lab', {
        title: '瞎折腾',
        siteData: siteData,
        isLogin: req.session.user ? true : false
    });
};

exports.chat = function(req, res){
    res.render('chat', {
        title: '简易聊天室'
    });
};

//admin routes
exports.ad_index = function(req, res){
    res.render('admin/ad_index', {
        title: '后台管理首页',
        osInfo: sys.os,
        siteInfo: sys.site
    });
};

exports.ad_article = function(req, res){
    var filter = {
        sortBy: 'pubtime',
        page: req.query.p || 1,
        condition: {}
    };
    article.artList(filter, function(err, data, paging){
        res.render('admin/ad_article', {
            title: '文章管理列表',
            paging: paging,
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
    article.artGet(act, aid, function(err, categorys, data){
        res.render('admin/ad_article_edit', {
            title: title,
            act: act,
            categorys: categorys,
            article: data
        });
    });
};

exports.upload_img = function(req, res){
    var ext = {
        'image/gif': '.gif',
        'image/png': '.png',
        'image/jpg': '.jpg',
        'image/jpeg': '.jpg'
    };
    var maxSize = 1024 * 800; //最大允许上传800k
    var thisSize = req.files.imgFile.size;
    var type = req.files.imgFile.type;
    var tmpFile = req.files.imgFile.path;
    var targetFile = './public/KE/attached/' + req.files.imgFile.name;
    if(thisSize > maxSize || !ext[type]){
        fs.unlink(tmpFile, function(err){
            if(err){
                res.end('Remove temp file error!');
            }
            res.end('Failed! Error：1.file size > 800K. 2.only image file can be upload.');
        });
        return;
    }
    fs.rename(tmpFile, targetFile, function(err){
        if(err){
            res.end('Rename file error!');
        }else{
            res.writeHead(200, {
                'Content-Type': 'text/html',
                'charset': 'utf-8'
            });
            res.end('Success!size: ' + thisSize + 'bytes , path: ' + targetFile);
        }
    });
};

exports.fileEdit = function(req, res){
    res.render('admin/ad_fileEdit', {
        title: '管理文件',
        dir: {
            root: sys.site.root,
            tpldir: sys.site.viewDir
        }
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

exports.categoryAdd = function(req, res){
    ajax.categoryAdd(req.body.category, function(resJson){
        res.json(resJson);
    });
};

exports.getToc = function(req, res){
    var dir = req.query.dir;
    ajax.getToc(dir, function(data){
        res.render('admin/toc-block', {
            tocData: data
        });
    });
};

exports.getDocument = function(req, res){
    var filename = req.query.filename;
    ajax.getDocument(filename, function(data){
        res.json(data);
    });
};

exports.modifyFile = function(req, res){
    var content = req.body.content;
    var filename = req.body.filename;
    ajax.modifyFile(content, filename,function(data){
        res.json(data);
    });
};

//check
exports.checkLogin = function(req, res, next){
    if(!req.session.user){
        return res.redirect('/');
    }
    next();
};
