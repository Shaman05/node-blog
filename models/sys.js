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
            totalmem: _os.totalmem(),
            freemem: _os.freemem()
        }
    }
})();
