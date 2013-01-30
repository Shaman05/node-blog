/**
 * Created with JetBrains PhpStorm.
 * User: chenD1
 * Date: 1/11/13
 * Time: 12:46 PM
 * To change this template use File | Settings | File Templates.
 */

var fs = require('fs');

module.exports = {
    getPubYear: function(pubtime){
        return parseInt(pubtime.split('-')[0]);
    },

    getTime: function(){
        var now = new Date();
        var year = now.getFullYear();
        var month = formatNumber(now.getMonth() + 1);
        var date = formatNumber(now.getDate());
        var h = formatNumber(now.getHours());
        var m = formatNumber(now.getMinutes());
        var s = formatNumber(now.getSeconds());
        return year + '-' + month + '-' + date + ' ' + h + ':' + m + ':' + s;

        function formatNumber(number){
            return number > 10 ? number : '0' + number;
        }
    },

    transformContent: function(content){
        return content.split('[[split]]').join('');
    },

    transformTags: function(tags){
        return tags.split(',');
    },

    transformSummry: function(content){
        return content.split('[[split]]')[0];
    },

    getDirSize: function(path){
        var size = 0;
        return _getDirSize(path);
        function _getDirSize(path){
            if(!fs.existsSync(path))
                return size;
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
    },

    formatSize: function(size){
        var kb = 1024;
        var mb = kb * 1024;
        var gb = mb * 1024;
        var tb = gb * 1024;
        if(size > tb){
            return p2Number(size/tb) + 'TB';
        }
        if(size > gb){
            return p2Number(size/gb) + 'GB';
        }
        if(size > mb){
            return p2Number(size/mb) + 'MB';
        }
        if(size > kb){
            return p2Number(size/kb) + 'KB';
        }
        return size + 'Bytes';
        function p2Number(num){
            return Math.ceil(num * 100)/100;
        }
    }
};
