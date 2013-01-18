/**
 * Created with JetBrains WebStorm.
 * User: chenD1
 * Date: 12-6-14
 * Time: 上午11:04
 * To change this template use File | Settings | File Templates.
 */

;(function($,io){
    var socket = null,
        defaultVal = "请输入昵称",
        name = null;
    var chatContent = $(".chatcontent"),
        connInfo = $("#conn-info"),
        userList = $("#userlist"),
        chatList = $("#chatlist"),
        sendBtn = $("#send"),
        dataArea = $("#senddata");

    $("#name").bind({
        "blur" : function(){
            var val = $(this).val();
            $(this).val(val==""?defaultVal:val);
        },
        "focus" : function(){
            var val = $(this).val();
            $(this).val(val==defaultVal?"":val);
        }
    })

    $("#enter").click(function(){
        var iptVal = $.trim($("#name").val());
        name = !!iptVal ? iptVal : null;
        name && name != defaultVal && goChat();
    })

    function goChat(){
        $("#setname").hide().empty();
        $("#chatbox").show();

        socket = socket || io.connect();
        var data = {
            type : "join",
            name : name
        }

        socket.on("connect", function(){
            socket.send(JSON.stringify(data));
            connInfo.text("已连接。");
            dataArea.attr("disabled", false);

            socket.on("message", function(data){
                var d = JSON.parse(data);
                chatList.append($('<li>' + d.message + '</li>'));
                //更新聊天用户列表
                /*if(d.userList.status == 1){
                    userList.empty();
                    var users = d.userList.users;
                    for(var i = 0, len = users.length; i < len; i++)
                        userList.append('<li>' + users[i].name + '</li>');
                }*/
                setScrollBar();
            })

            socket.on("disconnect", function(){
                chatList.append($('<li>失去连接。</li>'));
                sendBtn.unbind();
            })
        })

        sendBtn.click(function(){
            var data = {
                type : "message",
                name : name,
                message : dataArea.val()
            };
            if($.trim(data.message) !== ""){
                socket.send(JSON.stringify(data));
                var string = data.message.replace(/</ig, "&lt;");
                string = string.replace(/>/ig, "&gt;");
                string = string.replace(/\n/ig,"<br>");
                string = string.replace(/ /ig, "&nbsp;");
                chatList.append($('<li><strong>你</strong>：<div class="mytxt">' + string + '</div></li>'));
                dataArea.val('').focus();
                setScrollBar();
            }
        })

        dataArea.keydown(function(e){
            if(e.ctrlKey && e.keyCode == 13){
                sendBtn.click();
            }
        })

        function setScrollBar(){
            var h = chatList.outerHeight() - chatContent.outerHeight() + 20;
            chatContent.scrollTop(h > 0 ? h : 0);
        }
    }
})(jQuery,io)