/**
 * Created with JetBrains PhpStorm.
 * User: chenD1
 * Date: 1/28/13
 * Time: 4:31 PM
 * To change this template use File | Settings | File Templates.
 */

var fs = require('fs');
var util = require('../models/util');
var size = 0;

function getDirSize(path){
    console.log(path)
    if(!fs.existsSync(path)){
        console.log(11111111)
        return size;
    }
    var stat = fs.lstatSync(path);
    if(stat.isDirectory()){
        var files = fs.readdirSync(path);
        files.forEach(function(file, index){
            var currentFile = path + '/'  + file;
            var stat = fs.lstatSync(currentFile);
            if(stat.isDirectory()){
                getDirSize(currentFile);
            }else{
                size += fs.lstatSync(currentFile).size;
            }
        });
    }else{
        console.log(22222222222)
        size += fs.lstatSync(path).size;
    }
    return size;
}

console.log(util.getDirSize('./a.html')() + 'Bytes.');
