/**
 * Created with JetBrains PhpStorm.
 * Author: Shaman
 * Date: 12-12-22
 * Time: 下午4:09
 * To change this template use File | Settings | File Templates.
 */

seajs.config({
    preload: ['jquery'],
    map: [
        [ /^(.*\.(?:css|js))(.*)$/i, '$1?v=0.1']
    ]
});

seajs.use('ad_main', function(ad){
    ad.init();
});
