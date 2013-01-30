/**
 * Created with JetBrains PhpStorm.
 * User: chenD1
 * Date: 1/28/13
 * Time: 4:31 PM
 * To change this template use File | Settings | File Templates.
 */

//var fs = require('fs');

/*function getDirSize(path){
    var size = 0;
    return _getDirSize(path);
    function _getDirSize(path){
        if(!fs.existsSync(path)){
            return size;
        }
        var stat = fs.lstatSync(path);
        if(stat.isDirectory()){
            var files = fs.readdirSync(path);
            files.forEach(function(file, index){
                var currentFile = path + '/'  + file;
                var stat = fs.lstatSync(currentFile);
                if(stat.isDirectory()){
                    _getDirSize(currentFile);
                }else{
                    size += fs.lstatSync(currentFile).size;
                }
            });
        }else{
            size += fs.lstatSync(path).size;
        }
        return size;
    }
}*/
var util = require('../models/util');
console.log(util.getDirSize('./../public') + 'Bytes.');
