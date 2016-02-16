var newnotcount=0;
var msgcout=0;
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
            $('li.notifications').after('<li><a href="/counter?notid='+message.notid+'&link='+message.link+'" style="text-transform: none;font-family: sans-serif;  font-weight: normal;  letter-spacing: normal;  color: black; white-space: normal;  padding: initial;"><span><div style="   margin-left: 0px; margin-top: 2px;  margin-bottom: 2px;  margin-right: 0px;" class="row"><div class="col-xs-2"><img src="'+message.image+'" style=" background-color:#949494; height:60px; width:60px; margin-left:-12px;"></div><div style="  margin-left: -8px;    font-family: Helvetica,Arial,sans-serif;" class="col-xs-10">' + message.text+' </div></div></span></a></li><hr style="margin-bottom:0px; margin-top:0px;">');
            
        else
            {$('li.notifications').after('<li><a href="/counter?notid='+message.notid+'&link='+message.link+'" style="text-transform: none;font-family: sans-serif;  font-weight: normal;  letter-spacing: normal;  color: black; white-space: normal;  padding: initial;"><span><div style="   margin-left: 0px; margin-top: 2px;  margin-bottom: 2px; background-color: aliceblue;  margin-right: 0px;" class="row"><div class="col-xs-2"><img src="'+message.image+'" style=" background-color:#949494; height:60px; width:60px; margin-left:-12px;"></div><div style="  margin-left: -8px;    font-family: Helvetica,Arial,sans-serif;" class="col-xs-10">' + message.text+' </div></div></span></a></li><hr style="margin-bottom:0px; margin-top:0px;">');
        	newnotcount++;}
        if(newnotcount>0)
        	$('#not-counter').html('<i style="font-size: 1.6em;" class="fa fa-bell fa-stack-2x fa-inverse"></i><i style="  margin-left: 12px; margin-top: -10px;  font-size: 0.8em;font-weight: bold; background-color: rgb(239, 77, 88); border-radius: 10px 10px 10px;" class="fa fa-stack-1x">'+newnotcount+'</i>');
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
(function() {
    var POLL_URL = '/messages/user',
        POLL_FREQUENCY = 3000;  // fire after every 3 sec
    var queue =[]
    inProgress1 = false;
    
    $.fastPoll1 = $.fastPoll1 || {};
    
    $.fastPoll1.sendMessage = function(message) {
        queue.push(message);
    };

    $.fastPoll1.receiveMessage = function(message) {
    	console.log('here3');
        console.log(message.msgid);
        queue=[message.msgid];
        $('#thread'+message.thread).remove();
        if(message.viewed==2)
            $('li.messages').after('<li id ="thread'+message.thread+'"><a title="Reply '+message.username+'" href="/messages?thread='+message.thread+'" style="text-transform: none;font-family: sans-serif;  font-weight: normal;  letter-spacing: normal;  color: black; white-space: normal;  padding: initial;"><span><div style="margin-left: 0px; margin-top: 2px;  margin-bottom: 2px;  margin-right: 0px;" class="row"><div class="col-xs-2"><img src="'+message.userimg+'" style=" background-color:#949494; height:60px; width:60px; margin-left:-12px;"></div><div style="  margin-left: -8px;    font-family: Helvetica,Arial,sans-serif;" class="col-xs-10">' + message.message+' </div></div></span></a></li><hr style="margin-bottom:0px; margin-top:0px;">');
        	
        else
            {$('li.messages').after('<li  id ="thread'+message.thread+'"><a title="Reply '+message.username+'" href="/messages?thread='+message.thread+'" style="text-transform: none;font-family: sans-serif;  font-weight: normal;  letter-spacing: normal;  color: black; white-space: normal;  padding: initial;"><span><div style="   margin-left: 0px; margin-top: 2px;  margin-bottom: 2px; background-color: aliceblue;  margin-right: 0px;" class="row"><div class="col-xs-2"><img src="'+message.userimg+'" style=" background-color:#949494; height:60px; width:60px; margin-left:-12px;"></div><div style="  margin-left: -8px;    font-family: Helvetica,Arial,sans-serif;" class="col-xs-10">' + message.message+' </div></div></span></a></li><hr style="margin-bottom:0px; margin-top:0px;">');
            msgcout++;}
        if(msgcout>0)
        	$('#msg-counter').html('<i class="fa fa-comments fa-stack-2x fa-inverse" style="font-size: 1.6em;"></i><i class="fa fa-stack-1x" style="  margin-left: 12px; margin-top: -10px;  font-size: 0.8em;font-weight: bold; background-color: rgb(239, 77, 88); border-radius: 10px 10px 10px;">'+msgcout+'</i>');
   
    };

    function shortPoller1() {
        if (inProgress1) {
            return;
        }
        inProgress1 = true;
        var messages = queue;
        console.log('here33');
        $.ajax('/messages/user', {
            type: 'GET',
            dataType: 'json',
            data: JSON.stringify(messages),
            contentType: "application/json",
            timeout: 60000,  // wait till 60 sec for data
            success: function(data) {
                for (var i=0, len=data.length; i<len; i++) {
                    $.fastPoll1.receiveMessage(data[i]);
                }
                inProgress1 = false;
            },
            error: function() {
                queue=messages;
                inProgress1 = false;
            }
        });
    }
    $(document).ready(function() {
        shortPoller1();
        setInterval(shortPoller1, POLL_FREQUENCY);
    });
}());