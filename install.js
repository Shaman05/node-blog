/**
 * Created with JetBrains PhpStorm.
 * User: chenD1
 * Date: 1/6/13
 * Time: 5:02 PM
 * To change this template use File | Settings | File Templates.
 */

var fs = require('fs');

module.exports = {
    isInstalled: function(){
       return fs.existsSync('./install/install.lock');
    },
    routeInstall: function(req, res){
        if(module.exports.isInstalled()){
            var html = '<h3>Your blog has been installed!</h3><p>If you didn\'t installed, please delete file: /install/install.lock</p><p><a href="/">Go to the index page.</a></p>';
            res.write(html);
            res.end();
        }else{
            res.render('install');
        }
    }
};
