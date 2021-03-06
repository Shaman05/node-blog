/**
 * Created with JetBrains PhpStorm.
 * Author: Shaman
 * Date: 12-12-24
 * Time: 下午2:32
 * To change this template use File | Settings | File Templates.
 */

;(function($){
    $(function(){
        prettyPrint();
        $('#login').fancybox();
        $('#loginBtn').click(function(){
            var tipsBox = $('#loginTips');
            tipsBox.hide();
            var userData = {
                name: $('#userName').val(),
                password: $('#password').val()
            };
            $.post('/ajax/login', userData, function(data){
                if(data.state == 'success')
                    window.location.href = '/admin';
                else
                    tipsBox.html(data.message).fadeIn(500);
            });
        });
        $("#keyword").keyup(function(e){
            var keyword = $.trim($(this).val());
            if(e.keycode == 13 && keyword){
                return false;
            }
        });
    });
})(jQuery);