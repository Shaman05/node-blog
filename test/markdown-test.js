/**
 * Created with JetBrains PhpStorm.
 * User: chenD1
 * Date: 12/26/12
 * Time: 1:17 PM
 * To change this template use File | Settings | File Templates.
 */

var fs = require('fs');
var markdown = require('../node_modules/markdown');
console.log(markdown.parse);  // 这里是undefined

var content = fs.readFileSync('test.txt', 'utf-8');
var output = markdown.parse(content);
console.log(output);