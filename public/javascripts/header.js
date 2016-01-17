(function() {
    var POLL_URL = '/notifications/user',
        POLL_FREQUENCY = 3000;  // fire after every 3 sec
    var queue =[];
    inProgress = false;

    // create namespace
    $.fastPoll = $.fastPoll || {};

    // send arbitrary messages to server side
    $.fastPoll.sendMessage = function(message) {
        queue.push(message);
    };

    // application will replace this with an actual handler
    $.fastPoll.receiveMessage = function(message) {
        console.log(message.notid);
        queue=[message.notid];
        if(message.viewed==2)
            $('li.notifications').after('<li><a href="'+message.link+'" style="text-transform: none;font-family: sans-serif;  font-weight: normal;  letter-spacing: normal;  color: black; white-space: normal;  padding: initial;"><span><div style="   margin-left: 0px; margin-top: 2px;  margin-bottom: 2px;  margin-right: 0px;" class="row"><div class="col-xs-2"><img src="'+message.image+'" style=" background-color:#949494; height:60px; width:60px; margin-left:-12px;"></div><div style="  margin-left: -8px;    font-family: Helvetica,Arial,sans-serif;" class="col-xs-10">' + message.text+' </div></div></span></a></li><hr style="margin-bottom:0px; margin-top:0px;">');
        else
            $('li.notifications').after('<li><a href="'+message.link+'" style="text-transform: none;font-family: sans-serif;  font-weight: normal;  letter-spacing: normal;  color: black; white-space: normal;  padding: initial;"><span><div style="   margin-left: 0px; margin-top: 2px;  margin-bottom: 2px; background-color: aliceblue;  margin-right: 0px;" class="row"><div class="col-xs-2"><img src="'+message.image+'" style=" background-color:#949494; height:60px; width:60px; margin-left:-12px;"></div><div style="  margin-left: -8px;    font-family: Helvetica,Arial,sans-serif;" class="col-xs-10">' + message.text+' </div></div></span></a></li><hr style="margin-bottom:0px; margin-top:0px;">');
    };

    function shortPoller() {
        if (inProgress) {
            return;
        }
        inProgress = true;
        var messages = queue;

        $.ajax('/notifications/user', {
            type: 'GET',
            dataType: 'json',
            data: JSON.stringify(messages),
            contentType: "application/json",
            timeout: 60000,  // wait till 60 sec for data
            success: function(data) {
                // data is an array of messages
                for (var i=0, len=data.length; i<len; i++) {
                    $.fastPoll.receiveMessage(data[i]);
                }
                inProgress = false;
            },
            error: function() {
                queue=messages;
                inProgress = false;
            }
        });
    }
    $(document).ready(function() {
        shortPoller();
        setInterval(shortPoller, POLL_FREQUENCY);
    });
}());

/*
(function() {
    var POLL_URL = '/messages/user',
        POLL_FREQUENCY = 3000;  // fire after every 3 sec
    var queue =[]
    inProgress = false;

    // create namespace
    $.fastPoll1 = $.fastPoll1 || {};

    // send arbitrary messages to server side
    $.fastPoll1.sendMessage = function(message) {
        queue.push(message);
    };

    $.fastPoll1.receiveMessage = function(message) {
        console.log(message.notid);
        queue=[message.notid];
        $('li.messages').append('<li><a href="'+message.link+'" style="text-transform: none;font-family: sans-serif;  font-weight: normal;  letter-spacing: normal;  color: black; white-space: normal;  padding: initial;"><span><div style="   margin-left: 0px; margin-top: 2px;  margin-bottom: 2px;  margin-right: 0px;" class="row"><div class="col-xs-2"><img src="'+message.image+'" style=" background-color:#949494; height:60px; width:60px; margin-left:-12px;"></div><div style="  margin-left: -8px;    font-family: Helvetica,Arial,sans-serif;" class="col-xs-10">Text message ' + message.text+' </div></div></span></a></li><hr style="margin-bottom:0px; margin-top:0px;">');

    };

    function shortPoller1() {
        if (inProgress) {
            return;
        }
        inProgress = true;
        var messages = queue;

        $.ajax('/messages/user', {
            type: 'GET',
            dataType: 'json',
            data: JSON.stringify(messages),
            contentType: "application/json",
            timeout: 60000,  // wait till 60 sec for data
            success: function(data) {
                // data is an array of messages
                for (var i=0, len=data.length; i<len; i++) {
                    $.fastPoll1.receiveMessage(data[i]);
                }
                inProgress = false;
            },
            error: function() {
                queue=messages;
                inProgress = false;
            }
        });
    }
    $(document).ready(function() {
        shortPoller1();
        setInterval(shortPoller1, POLL_FREQUENCY);
    });
}());*/
