/**
 * Created with JetBrains PhpStorm.
 * Author: Shaman
 * Date: 12-12-24
 * Time: 下午2:32
 * To change this template use File | Settings | File Templates.
 */

define(function(require, exports, module){
    module.exports = {
        init: function(){
            this.events()
        },

        events: function(){
            $('#login').fancybox();
            $('#loginBtn').click(function(){
                var userData = {
                    name: $('#userName').val(),
                    password: $('#password').val()
                };
                $.post('/ajax/login', userData, function(data){
                    if(data.state == 'success')
                        window.location.href = '/admin';
                });
            });
        }
    }
})