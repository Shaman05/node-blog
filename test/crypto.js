/**
 * Created with JetBrains PhpStorm.
 * User: chenD1
 * Date: 12/24/12
 * Time: 2:07 PM
 * To change this template use File | Settings | File Templates.
 */

var crypto = require('crypto');

var md5 = crypto.createHash('md5');

console.log(md5.update('abcd@1234').digest('base64'));