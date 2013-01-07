/**
 * Created with JetBrains PhpStorm.
 * User: chenD1
 * Date: 1/6/13
 * Time: 4:03 PM
 * To change this template use File | Settings | File Templates.
 */

var fs = require('fs');

fs.readFile('./install/install.log','UTF-8',function(err, content){
    if(err){
        console.log(err);
    }else{
        console.log(content)
    }
});

fs.readdir('./', function(err, files){
    console.log('--------');
    console.log(files);
    console.log('--------');
});

console.log(fs.existsSync('./install/install.lock'));
