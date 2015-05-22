$(function() {
  var socket = new WebSocket("ws://" + window.location.host + "/");
  var name;

  window.theSocket = socket;
  socket.addEventListener('message', function(message){
    var messagePane = $('<div>');
    var data = JSON.parse(message.data);
    var messageUser = data.name;
    var messageText = data.message;
    messagePane.text('<' + messageUser + '> ' + messageText);
    $('#messagespace').append(messagePane);
  });

  $('#name-prompt form').submit(function(event) {
    event.preventDefault();
    name = $('#name').val();
    $('#name-prompt').hide();
    $('#typingspace').show();
  });

  $('#typing').submit(function(event) {
    event.preventDefault();
    var message = $('#message').val();
    socket.send(JSON.stringify({name: name, message: message}));
    $('#message').val('');
  });

});
