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
            this.events();
        },

        events: function(){
            $('#art-list').click(function(e){
                var aid = $(e.target).attr('data-del-id');
                if(aid && confirm('确认删除吗？')){
                    $.post('/ajax/article_del/', {aid:aid}, function(data){
                        if(data.state == 'success'){
                            window.location.href = window.location.href;
                        }else{
                            alert('删除失败！message:' + data.message);
                        }
                    })
                }
            });

            $('#art-editBtn').click(function(){
                var postData = {
                    aid: $('#aid').val(),
                    title: $('#title').val(),
                    category: 'css',
                    tags: $('#tags').val(),
                    content: editor.html()
                }
                if(!$.trim(postData.title) || !$.trim(postData.content)){
                    alert('标题或者内容不能为空！');
                    return;
                }
                $.post('/ajax/article_edit', postData, function(data){
                    if(data.state == 'success'){
                        window.location.href = '/admin/article';
                    }else{
                        alert('操作失败！message:' + data.message);
                    }
                });
            });
        }
    }
})