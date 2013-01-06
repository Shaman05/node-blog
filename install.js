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
        var dir = fs.readdirSync('./install');
        console.log(dir)
        for(var i = 0; i < dir.length; i++){
            if('install.lock' === dir[i])
                return true;
        }
        return false;
    },
    routeInstall: function(req, res){
        if(module.exports.isInstalled()){
            var html = '<h3>Your blog has been installed!</h3><p><a href="/">Go to the index page.</a></p>';
            res.write(html);
            res.end();
        }else{
            res.render('install');
        }
    }
};
