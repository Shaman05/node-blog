/**
 * Created with JetBrains PhpStorm.
 * User: chenD1
 * Date: 12/26/12
 * Time: 5:27 PM
 * To change this template use File | Settings | File Templates.
 */

var _os = require('os');

module.exports = (function(){
    return {
        os: {
            hostname: _os.hostname(),
            type: _os.type(),
            release: _os.release(),
            memUse: (function(){
                var unit = 1024 * 1024;
                var total = parseInt(_os.totalmem() / unit);
                var used = total - parseInt(_os.freemem() / unit);
                return used + '/' + total + 'MB';
            })()
        }
    }
})();
