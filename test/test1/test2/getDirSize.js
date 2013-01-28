/**
 * Created with JetBrains PhpStorm.
 * User: chenD1
 * Date: 1/28/13
 * Time: 4:31 PM
 * To change this template use File | Settings | File Templates.
 */

var fs = require('fs');

function getDirSize(path){
    console.log(path);
    var size = 0;
    if(!fs.existsSync(path))
        return size;
    var stat = fs.lstatSync(path);
    if(stat.isDirectory()){
        var files = fs.readdirSync(path);
        files.forEach(function(file, index){
            var stat = fs.lstatSync(file);
            if(stat.isDirectory()){
                getDirSize(path + file);
            }else{
                size += fs.lstatSync(file).size;
            }
        });
    }else{
        size += fs.lstatSync(path).size;
    }
    return size;
}

function formatSize(size){
    var Byte = 1024;
    var KB = Math.pow(1024, 2);
    var MB = Math.pow(1024, 3);
    var GB = Math.pow(1024, 4);
    var TB = Math.pow(1024, 5)
}
console.log(getDirSize('./'));