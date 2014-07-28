/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-1-22
 * Time: 下午3:44
 */

var fs = require('fs');
var fileContent = require('./fileContent');

module.exports = {
  getConfig: function(file){
    if(!fs.existsSync(file)){
      console.log('warning: 无配置文件!'.yellow);
      return {};
    }else{
      console.log('读取配置文件: %s', file.green);
      return require('../' + file);
    }
  },
  mkdir: function(dir, callback){
    if(!fs.existsSync(dir)){
      fs.mkdirSync(dir);
      console.log("创建目录: %s", dir.green);
      callback && callback();
    }
  },
  createFile: function(name, string,callback){
    fs.writeFileSync(name, string, 'utf8');
    console.log("创建文件: %s", name.green);
    callback && callback();
  },
  getFileContent: function(){
    return fileContent();
  },
  createProject: function(name, path, configFile){
    var config = this.getConfig(configFile);
    var fileContent = this.getFileContent();
    var mkdir = this.mkdir;
    var createFile = this.createFile;
    mkdir(name);
    mkdir(path + '/html', function(){
      createFile(path + '/html/map.php', fileContent.mapPHP);
    });
    mkdir(path + '/public', function(){
      mkdir(path + '/public/css');
      mkdir(path + '/public/images');
      mkdir(path + '/public/js', function(){
        mkdir(path + '/public/js/appjs');
        mkdir(path + '/public/js/basejs');
        mkdir(path + '/public/js/componentjs');
        mkdir(path + '/public/js/modulejs');
        mkdir(path + '/public/js/moduletpl');
        mkdir(path + '/public/js/nocmdjs');
      });
      mkdir(path + '/public/dist');
      createFile(path + '/public/package.json', '{"name":"' + name + '"}');
      createFile(path + '/public/Gruntfile.js', '//' + name + ' gruntfile');
    });

    console.log('\nProject %s created successful!', ('"' + name + '"').yellow);
  }
}