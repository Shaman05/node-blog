/**
 * Created with JetBrains WebStorm.
 * User: chenD1
 * Date: 12-6-13
 * Time: 下午5:53
 * To change this template use File | Settings | File Templates.
 */
var socket = require('socket.io');
function socketStart(server){
    socket.listen(server).on('connection', function (socket) {
        //console.log(socket.id + " has been connected!");
        socket.on('message', function (msg) {
            var d = JSON.parse(msg),
                sendData = {
                    message : ''
                };
            if(d.type === "join"){
                sendData.message = '<em>系统消息:</em><span>【' + d.name + '】</span>加入了聊天室。';
            }
            if(d.type === "message"){
                var string = d.message.replace(/</ig, "&lt;");
                string = string.replace(/>/ig, "&gt;");
                string = string.replace(/\n/ig, "<br>");
                string = string.replace(/ /ig, "&nbsp;");
                sendData.message = '<span>【' + d.name + '】</span><div class="txt">' + string + '</div>';
            }
            socket.broadcast.emit('message', JSON.stringify(sendData));
        });
        socket.on('disconnect', function(){
            //console.log(socket.id + " has been disconnected!");
        });
    });
}
exports.socketStart = socketStart;