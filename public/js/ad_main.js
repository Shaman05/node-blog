/**
 * Created with JetBrains PhpStorm.
 * Author: Shaman
 * Date: 12-12-22
 * Time: 下午4:15
 * To change this template use File | Settings | File Templates.
 */

define(function(require, exports, module){
    module.exports = {
        init: function(){
            this.events()
        },

        events: function(){
            $('#art-list').click(function(e){
                var aid = $(e.target).attr('data-del-id');
                if(aid){
                    $.get('/ajax/article_del/' + aid, function(data){
                        console.log(data);
                    })
                }
            });

            $('#art-addBtn').click(function(){
                var postData = {
                    title: $('#title').val(),
                    category: 'css',
                    tags: $('#tags').val(),
                    content: $('#content').val()
                }
                $.post('/ajax/article_add', postData, function(data){
                    console.log(data);
                });
            });
        }
    }
})