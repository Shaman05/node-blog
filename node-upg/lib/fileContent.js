/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-1-23
 * Time: 下午1:35
 */

var os = require('os');

module.exports = function(){
  var eol = os.EOL;
  return {
    //: html/map.php
    mapPHP: [
      '<?php'
      , '  //static file map'
    ].join(eol)
  }
};