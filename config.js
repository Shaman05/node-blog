/**
 * Created with JetBrains PhpStorm.
 * User: chenD1
 * Date: 12/27/12
 * Time: 9:40 AM
 * To change this template use File | Settings | File Templates.
 */

module.exports = {
    appRoot: __dirname,
    staticPath: 'public',
    viewEngine: 'jade',
    viewsDir: __dirname + '/views/jade_tpl',
    port: 3000,
    dbSettings: {
        cookieSecret: 'shaman',
        cookieExpires: new Date(Date.now() + 2 * 60 * 60),
        db: 'node-blog',
        host: 'localhost'
    }
};
