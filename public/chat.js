$(function(){
    //making connection
    var socket = io.connect('http://localhost:3000');

    //buttons and inputs
    var message = $("#message");
    var username = $("#username");
    var send_message = $("#send_message");
    var send_username = $("#send_username");
    var chatroom = $("#chatroom");


    //Emit a suername
    send_message.click(function(){
        console.log(username.val());
        socket.emit('new_message', {message : message.val()});
    });

    //listen to new message
    socket.on("new_message", (data)=>{
        console.log(data);
        chatroom.append("<p class='message'>"+ data.username + ": " + data.message + "</p>");
    });

    //Emit a suername
    send_username.click(function(){
        console.log(username.val());
        socket.emit('change_username', {username : username.val()});
    });

    //emit typing
    message.bind("keypress", ()=>{
        socket.emit('typing');
    });
    //listen on typing
    socket.on('typing', (data)=>{
        feedback.html("<p><i>" + data.username + " is typing a messae..." + "</i></p>")
    })
});