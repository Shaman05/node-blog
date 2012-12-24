/**
 * Created with JetBrains PhpStorm.
 * Author: Shaman
 * Date: 12-12-24
 * Time: 下午2:31
 * To change this template use File | Settings | File Templates.
 */

seajs.config({
    preload: ['jquery',
              'fancybox2/jquery.fancybox.css',
              'fancybox2/jquery.fancybox.pack'],
    map: [
        [ /^(.*\.(?:css|js))(.*)$/i, '$1?v=0.1']
    ]
});

seajs.use('main', function(page){
    page.init();
});
