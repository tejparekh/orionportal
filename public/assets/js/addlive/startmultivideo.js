/**
 * @fileoverview
 * @TODO file description
 *
 * @author Tadeusz Kozak
 * @date 26-06-2012 10:37
 */

 
 
 /*update session value in server*/
 function updateVideoUser(data)
 {
	 $.ajax({
					dataType  : "json",
					type      : 'Get',
					url       :  'updatevideocallieuserid',
					data      : {endClleeUserId:data},
					success   : function(res) {
					  if(res.success)
					  {  
						 console.log("success");
					  }
					},
					error: function(data) {
					  console.log("error");
					}
				  });
 }
(function (w) {
  'use strict';

  // IE shim - for IE 8+ the console object is defined only if the dev tools are acive
  if (!window.console) {
    console = {
      log:function() {},
      warn:function() {}
    };
  }

  // Scope constants
  // To set your own APP_ID (check shared-assets/scripts.js)
  // To set your own API_KEY (check shared-assets/scripts.js)
  var APPLICATION_ID = ADLT.APP_ID,
      APP_SHARED_SECRET = ADLT.API_KEY,

      /**
      * Configuration of the streams to publish upon connection established
      * @type {Object}
      */
      CONNECTION_CONFIGURATION = {

        /**
         * Flags defining that both streams should be automatically published upon
         * connection.
         */
        autopublishVideo:true,
        autopublishAudio:true
      },

      mediaConnType2Label = {};

  mediaConnType2Label[ADL.ConnectionType.NOT_CONNECTED] 	= 'not connected';
  mediaConnType2Label[ADL.ConnectionType.TCP_RELAY] 		= 'RTP/TCP relayed';
  mediaConnType2Label[ADL.ConnectionType.UDP_RELAY] 		= 'RTP/UDP relayed';
  mediaConnType2Label[ADL.ConnectionType.UDP_P2P] 			= 'RTP/UDP in P2P';

  //User ID's array to allow video input
  var allowedVideoSenders = callee;

  //User ID's array to allow video input
  var allowedAudioSenders = callee;
  // Scope variables
  var scopeId, userId, localVideoStarted = false;
  var broadcasted_user	= admin_id;	
  var unJoinedUsers = null;
	function poll()
	{
		var callId	= JSON.stringify(callerId);
		 setTimeout(function() {
			$.ajax({
				url: "checkdisconnect",
				type: "GET",
				 complete: poll,
				data: {caller_id:callId},
				success: function(response) {
					if(response.data)
					{
						var users	= response.data;
						  for(var key in users)
						  {
								if(timed_out_user.indexOf(users[key]['user_id'])	== -1)
								{
									console.log(users[key]['user_id']);
								   var index = callerId.indexOf(users[key]['call_id']);
								   if(index != -1)
									 {
										//alert("user is removed");
										callerId.splice(index, 1);
									 }
									 var index = groupCall.indexOf(users[key]['user_id']); 
									if(index != -1) {
											groupCall.splice(index, 1);
									}
									 updateVideoUser(users[key]['user_id']);
									decline_user.push(users[key]['user_id']);
									var notify = $('#alert').clone();
									notify.find('.content').html(names[users[key]['user_id']]+' ' +'is not accepting the call.');
									$('.main-wrapper').prepend(notify);
								}
							  
						  }
					}
				},
				dataType: "json"
			})
		}, 1000);
	}
  
  /**
   * Document ready callback - starts the AddLive platform initialization.
   */
  function onDomReady() {
    console.log('DOM loaded');
	poll();
	$('#show_hide').click(function(){
		if($('#admin_panel').is(':visible'))
		{
			$('#show_hide').css('-webkit-transform','rotate(90deg)');
			$('#show_hide').css('transform','rotate(90deg)');
			$('#show_hide').css('-ms-transform','rotate(90deg)');
		}else{
			$('#show_hide').css('-webkit-transform','rotate(360deg)');
			$('#show_hide').css('transform','rotate(360deg)');
			$('#show_hide').css('-ms-transform','rotate(360deg)');
		}
		$('#admin_panel').toggle('slow')
	});
	$(document).on('click','.user_active',
		function()
		{
			$('.user_active').removeClass('disabled');
			$('.render-wrapper').removeClass('active-presenter').addClass('inactive-video');
			
			$(this).addClass('disabled');
			var id = $(this).attr('id');
			var user = id.split('-')[1];
			broadcasted_user	= user;
			if(admin_id	== broadcasted_user)
			{
				$('#renderLocalPreview').addClass('active-presenter').removeClass('inactive-video'); 
			}else
			{
				$('#renderer' + broadcasted_user).addClass('active-presenter').removeClass('inactive-video'); 
			}
			var msg = JSON.stringify({
						type:"MULTI",
						action:"active",
						user_id:user
			});
			sendMsg(msg);
		});

$(document).on('click','.user_disconnect',
	function()
	{
		$('.user_disconnect').removeClass('disabled');
		$(this).addClass('disabled');
		var id = $(this).attr('id');
			var user = id.split('-')[1];
				var msg = JSON.stringify({
							type	:"MULTI",
							action   :"disconnect",
							user_id:user
				});
				
				 /* var index = allowedVideoSenders.indexOf(user);
				 if(index != -1)
				 {
					//alert("user is removed");
					allowedVideoSenders.splice(index, 1);
					allowedAudioSenders.splice(index, 1);
				 } */
				sendMsg(msg);
	});
    // assuming the initAddLiveLogging is exposed via ADLT namespace.
    // (check shared-assets/scripts.js)
    ADLT.initAddLiveLogging();
    initUI();
    var initOptions = {applicationId:APPLICATION_ID, enableReconnects:true};
    // Initializes the AddLive SDK. Please refer to ../shared-assets/scripts.js
    ADLT.initializeAddLiveQuick(onPlatformReady, initOptions);
  }

  function initUI() {
    console.log('Initializing the UI');
    $('#publishAudioChckbx').change(onPublishAudioChanged);
    $('#publishVideoChckbx').change(onPublishVideoChanged);

    $('#camSelect').change(function () {
      var selectedDev = $(this).val();
      ADL.getService().setVideoCaptureDevice(
          ADL.r(startLocalVideoMaybe), selectedDev);
    });
	$('#sound_admin').click(function(){
		$('#sound_admin').hide();
			$('#mute_admin').show();
			disableAdminAudio();
			
			
	});		
	$('#mute_admin').click(function(){	
	
			$('#mute_admin').hide();
			$('#sound_admin').show();
			enableAdminAudio(); 
			
			
	});		
	

    $('#micSelect').change(ADLT.getDevChangedHandler('AudioCapture'));
    $('#spkSelect').change(ADLT.getDevChangedHandler('AudioOutput'));

    console.log('UI initialized');
  }

  function onPlatformReady() {
    console.log('==============================================================');
    console.log('==============================================================');
    console.log('AddLive SDK ready - setting up the application');
	$('#disconnectBtn').click(disconnect);
    // assuming the populateDevicesQuick is exposed via ADLT namespace.
    // (check shared-assets/scripts.js)
    ADLT.populateDevicesQuick();
    startLocalVideoMaybe();
    initServiceListener();
	window.setTimeout(checkJoinedUsers,maxTime);
	
  }
	function checkJoinedUsers()
	{
		for(var i = 0; i<groupCall.length; i++)
		{
			if(-1 == $.inArray(groupCall[i],media_left) && -1 == $.inArray(groupCall[i],joinedUser) && -1 	== $.inArray(groupCall[i],decline_user))
			{
				
				timed_out_user.push(groupCall[i]);
				updateVideoUser(groupCall[i]);
				
				console.log('User with id: ' + groupCall[i] + ' is not responding');
				var notify = $('#alert').clone();
				notify.find('.content').html(names[groupCall[i]]+' ' +'is not responding.');
				$('.main-wrapper').prepend(notify);
				var index = groupCall.indexOf(groupCall[i]); 
					if(index != -1) {
							groupCall.splice(index, 1);
					}
			}
		}
    console.log("unJoinedUsers=="+unJoinedUsers);
     /**************** Added  Srikanth P on 26/5/2014 *******************/
        $.ajax({
                dataType  : 'json',
                type      : 'GET',
                url       :  '/updatevideocallieuserid',
                data      : {endClleeUserId:unJoinedUsers},
                success   : function(res) {
                    console.log("success");
					unJoinedUsers	= null;

                },
                error: function(res) {
                  console.log("error");
                }
              });
        /*******************************************************************/
	}
  /**
   * ==========================================================================
   * Beginning of the AddLive service events handling code
   * ==========================================================================
   */


  function initServiceListener() {
    console.log('Initializing the AddLive Service Listener');

    // 1. Instantiate the listener
    var listener = new ADL.AddLiveServiceListener();


    // 2. Define the handler for the user event
    listener.onUserEvent = function (e) {
      console.log('Got new user event: ' + e.userId);
      if (e.isConnected) {
          onUserJoined(e);
  	     	joinedUser.push(e.userId);
      } else {
		  var index = joinedUser.indexOf(e.userId);
		  disconnect_user.push(e.userId);
		  if(index != -1) {
			joinedUser.splice(index, 1);
		  }
		  var index 		= muteUserList.indexOf(parseInt(e.userId));
		  if(index != -1) {
			muteUserList.splice(index, 1);
		  }
		   var index = groupCall.indexOf(e.userId); 
		   if(index != -1) {
			groupCall.splice(index, 1);
		  }
		  //current active user left the media scope so make admin as active
		  if(broadcasted_user	== e.userId || joinedUser.length	< 1)
		  {
			var msg = JSON.stringify({
						type:"MULTI",
						action:"active",
						user_id:admin_id
			});
			//$('#renderLocalPreview').addClass('active-presenter').removeClass('inactive-video');
			sendMsg(msg);
			broadcasted_user	= admin_id;
		  }
		  media_left.push(e.userId);
        console.log('User with id: ' + e.userId + ' left the media scope');
        /**************** Added  Srikanth P on 26/5/2014 *******************/
        /* $.ajax({
                dataType  : "json",
                type      : 'Get',
                url       :  'updatevideocallieuserid',
                data      : {endClleeUserId:e.userId},
                success   : function(res) {
                  if(res.success)
                  {  
                     console.log("success");
                  }
                },
                error: function(data) {
                  console.log("error");
                }
              }); */
			  
        /*******************************************************************/
       $('#renderingWidget' + e.userId).html('').remove();
  		 var notify = $('#alert').clone();
  		 notify.find('.content').html(names[e.userId]+' ' +'left the call.');
		 updateVideoUser(e.userId);
  		 $('.main-wrapper').prepend(notify);
			
      }
    };

    // 3. Define the handler for streaming status changed event
    listener.onMediaStreamEvent = function (e) {
      console.log('Got new media streaming status changed event');
      switch (e.mediaType) {
        case ADL.MediaType.AUDIO:
          onRemoteAudioStreamStatusChanged(e);
          break;
        case ADL.MediaType.VIDEO:
          onRemoteVideoStreamStatusChanged(e);
          break;
        default :
          console.warn('Got unsupported media type in media stream event: ' +
                        e.mediaType);
      }
    };

    // 4. Define the handler for the media connection type changed event
    listener.onMediaConnTypeChanged = function (e) {
      console.log('Got new media connection type: ' + e.connectionType);
      $('#connTypeLbl').html(mediaConnType2Label[e.connectionType]);
    };

    // 5. Define the handler for the connection lost event
    listener.onConnectionLost = function (e) {
      alert('Got connection lost notification: ' + JSON.stringify(e));
      disconnectHandler();
    };

    // 6. Define the handler for the reconnection event
    listener.onSessionReconnected = function (e) {
      console.log('Connection successfully reestablished!');
      postConnectHandler();
    };

    // 7. Prepare the success handler
    var onSucc = function () {
       console.log('AddLive service listener registered');
       connect();
    };
	ADL.getService().addServiceListener(ADL.r(onSucc), listener);

	//ADL.getService().addServiceListener(ADL.r(onConnected), listener);
    // 8. Finally register the AddLive Service Listener

  }

function sendMsg(msg) {
    ADLT._chatConnection.sendMessage(ADL.r(), msg, undefined);

  }
  function onUserJoined(e) {
	
	$('#please_wait').hide();
	var name;
    console.log('Got new user with id: ' + e.userId);
    // 1. Prepare a rendering widget for the user.
    var renderer = $('#rendererTmpl').clone();
    renderer.attr('id', 'renderingWidget' + e.userId);
    renderer.find('.render-wrapper').attr('id', 'renderer' + e.userId);
    renderer.find('.user-id-wrapper').html(e.userId);
    renderer.find('.user-id-wrapper').attr('id', e.videoSinkId);
  	renderer.find('.btn-primary').attr('id','active-'+ e.userId);
	renderer.find('.mute_user').attr('id','mute-'+ e.userId);	
	renderer.find('.unmute_user').attr('id','unmute-'+ e.userId);
	renderer.find('.video_on').attr('id','video_on-'+ e.userId);	
	renderer.find('.video_off').attr('id','video_off-'+ e.userId);
	
  	renderer.find('.user_disconnect').attr('id','disconnect-'+ e.userId);
  	if(names && names[e.userId])
  	{
		name	= names[e.userId];
		if(name.length > 16)
		{
			name = name.substring(0,13);
			name = name + '...';
		}
  		renderer.find('.name').text(name);
  	}
    // 2. Append it to the rendering area.
    $('.user-panel').append(renderer);
    if (e.videoPublished) {
      // 3a. Render the sink if the video stream is being published.
      ADL.renderSink({
        sinkId:e.videoSinkId,
        containerId:'renderer' + e.userId
      });
    }
    else {
      // 3b. Just show the no video stream published indicator.
      renderer.find('.no-video-text').show();
      renderer.find('.allowReceiveVideoChckbx').hide();
    }
	
	var msg = JSON.stringify({
					type		: "MULTI",
					action		: "active",
					user_id		: broadcasted_user
		});
		sendMsg(msg);

    // 4. Show the 'audio muted' indicator if user does not publish audio stream
    if (!e.audioPublished) {
      renderer.find('.muted-indicator').show();
      renderer.find('.allowReceiveAudioChckbx').hide();
    }

    // Add the new user id to the arrays of allowed input of audio and video
    /* var index = allowedVideoSenders.indexOf(e.userId);
	if(index == -1)
	{
		allowedAudioSenders.push(parseInt(e.userId,10));
		allowedVideoSenders.push(parseInt(e.userId,10));
	} */

    // Add the new user id to the pool of user allowed to send audio and video
    /* ADL.getService().setAllowedSenders(ADL.r(onAudioSilenced), scopeId,
                                      ADL.MediaType.AUDIO, allowedAudioSenders);
    ADL.getService().setAllowedSenders(ADL.r(onVideoSilenced), scopeId,
                                      ADL.MediaType.VIDEO, allowedVideoSenders); */

    /* renderer.find('.allowReceiveAudioChckbx').attr('id', 'allowReceiveAudio' +
                                                          e.userId);
    renderer.find('.allowReceiveVideoChckbx').attr('id', 'allowReceiveVideo' +
                                                           e.userId);*/ 

    $('#mute-' + e.userId).click({rend: renderer},
                                              muteUser);
	 $('#unmute-' + e.userId).click({rend: renderer},
                                              unmuteUser);										  
    $('#video_on-' + e.userId).click({rend: renderer},
                                              videoOn);
	$('#video_off-' + e.userId).click({rend: renderer},
                                              videoOff);
  }

  function onRemoteVideoStreamStatusChanged(e) {
    console.log('Got change in video streaming for user with id: ' + e.userId +
        ' user just ' +
        (e.videoPublished ? 'published' : 'stopped publishing') +
        ' the stream');
    // 1. Grab the rendering widget corresponding to the user
    var renderingWidget = $('#renderingWidget' + e.userId);

    if (e.videoPublished)
	    {
      // 2a. If video was just published - render it and hide the
      // 'No video from user' indicator
      ADL.renderSink({
        sinkId:e.videoSinkId,
        containerId:'renderer' + e.userId
      });
      renderingWidget.find('.no-video-text').hide();
    } else {
		  // 2b. If video was just unpublished - clear the renderer and show the
		  // 'No video from user' indicator
		  renderingWidget.find('.render-wrapper').empty();
		  renderingWidget.find('.no-video-text').show();
    }
  }

  function onRemoteAudioStreamStatusChanged(e) {
    console.log('Got change in audio streaming for user with id: ' + e.userId +
        ' user just ' +
        (e.audioPublished ? 'published' : 'stopped publishing') +
        ' the stream');

    // 1. Find the 'Audio is muted' indicator corresponding to the user
    var muteIndicator = $('#renderingWidget' + e.userId).find('.muted-indicator');
    if (e.audioPublished) {
      // 2a. Hide it if audio stream was just published
      $('#sound-'+e.userId).attr('src','public/assets/images/sound.png');
    } else {
      // 2.b Show it if audio was just unpublished
      $('#sound-'+e.userId).attr('src','public/assets/images/mute.png');
    }
  }

  /**
   * ==========================================================================
   * End of the AddLive service events handling code
   * ==========================================================================
   */

  function startLocalVideoMaybe() {
    if (localVideoStarted) {
      return;
    }
    console.log('Starting local preview of current user');
    // 1. Define the result handler
    var resultHandler = function (sinkId) {
      console.log('Local preview started. Rendering the sink with id: ' + sinkId);
      ADL.renderSink({
        sinkId			: sinkId,
        containerId		: 'renderLocalPreview',
        mirror          : true
      });
      localVideoStarted = true;
    };

    // 2. Request the SDK to start capturing local user's preview
    ADL.getService().startLocalVideo(ADL.r(resultHandler));
  }

  /**
   * ==========================================================================
   * Beginning of the connection management code
   * ==========================================================================
   */

  function connect() {
    console.log('Establishing a connection to the AddLive Streaming Server');

    // 1. Disable the connect button to avoid a cascade of connect requests
    $('#connectBtn').unbind('click').addClass('disabled');

    // 2. Get the scope id and generate the user id.
    scopeId = $('#scopeIdTxtField').val();

    // assuming the genRandomUserId is exposed via ADLT namespace.
    // (check shared-assets/scripts.js)
    userId = admin_id;

    // 3. Define the result handler - delegates the processing to the
    // postConnectHandler
    var connDescriptor = genConnectionDescriptor(scopeId, userId);
	//ADLT._chatConnection	= connDescriptor;
    var onSucc = function (con) {
		$('#active_admin').removeClass("disabled");
		ADLT._chatConnection = con;
		//$('#active_admin').attr('id',"active-"+userId);
		ADL.getService().networkTest(ADL.r(_onNetworkTestResults), con);//check network
		postConnectHandler();
    };

    // 4. Define the error handler - enabled the connect button again
    var onErr = function () {
      $('#connectBtn').click(connect).removeClass('disabled');
    };

    // 5. Request the SDK to establish a connection
    ADL.getService().connect(ADL.r(onSucc, onErr), connDescriptor);
  }
	/*check network strength*/
	function _onNetworkTestResults(result)
	{
		/* ADL.ConnectionQuality.FINE
		ADL.ConnectionQuality.AVERAGE */
		if(ADL.ConnectionQuality.BAD)
		{
			var notify = $('#alert').clone();
			notify.find('.content').html('Network connection strength is weak!.');
			$('.main-wrapper').prepend(notify);
		}
    
	}
  function disconnect() {
    console.log('Terminating a connection to the AddLive Streaming Server');
    if(ADLT._chatConnection)
	{
		var msg = JSON.stringify({
				type:"video",
				action:"disconnect_all",
				user_id:null
		  });
		sendMsg(msg);
		
		// 1. Define the result handler
		var succHandler = function () {
		  scopeId = undefined;
		  userId = undefined;
		  disconnectHandler();
		  location.href	= 'videocalling?disconnect=1';
		};
		ADL.getService().disconnect(ADL.r(succHandler), scopeId);
		
	 }
	 else
	 {
		location.href	= 'videocalling?disconnect=1';
	}
	exit			= true;
    // 2. Request the SDK to terminate the connection
    
	
  }

  /**
   * Common post disconnect handler - used when user explicitly terminates the
   * connection or if the connection gets terminated due to the networking issues.
   *
   * It just resets the UI to the default state.
   */
  function disconnectHandler() {

    // 1. Toggle the active state of the Connect/Disconnect buttons
    $('#connectBtn').click(connect).removeClass('disabled');
    //$('#disconnectBtn').unbind('click').addClass('disabled');

    // 2. Reset the connection type label
    $('#connTypeLbl').html('none');

    // 3. Clear the remote user renderers
    $('#renderingWrapper').find('.remote-renderer').html('').remove();

    // 4. Clear the local user id label
    $('#localUserIdLbl').html('undefined');
  }

  /**
   * Common post connect handler - used when user manually establishes the
   * connection or connection is being reestablished after being lost due to the
   * Internet connectivity issues.
   *
   */
  function postConnectHandler() {
    console.log('Connected. Disabling connect button and enabling the disconnect');

    // 1. Enable the disconnect button
    // 2. Disable the connect button
    $('#connectBtn').unbind('click').addClass('disabled');

    // 3. Update the local user id label
    $('#localUserIdLbl').html(userId);
  }

  function genConnectionDescriptor(scopeId, userId) {
    // Prepare the connection descriptor by cloning the configuration and
    // updating the URL and the token.
    var connDescriptor = {
      videoStream:{
        maxWidth:1280,
        maxHeight:720,
        maxFps:24,
        useAdaptation:true
      }
    };
    connDescriptor = $.extend({}, CONNECTION_CONFIGURATION);
    connDescriptor.scopeId = scopeId;
    connDescriptor.authDetails = genAuthDetails(scopeId, userId);
    connDescriptor.autopublishAudio = true;
    connDescriptor.autopublishVideo = true;
    return connDescriptor;
  }


  /**
   * ==========================================================================
   * End of the connection management code
   * ==========================================================================
   */

  /**
   * ==========================================================================
   * Beginning of the user's events handling code
   * ==========================================================================
   */

  /**
   * Handles the change of the 'Publish Audio' checkbox
   */
  function onPublishAudioChanged() {
    if (!scopeId) {
      // If the scope id is not defined, it means that we're not connected and
      // thus there is nothing to do here.
      return;
    }

    // Since we're connected we need to either start or stop publishing the
    // audio stream, depending on the new state of the checkbox
    if ($('#publishAudioChckbx').is(':checked')) {
      ADL.getService().publish(ADL.r(), scopeId, ADL.MediaType.AUDIO);
    } else {
      ADL.getService().unpublish(ADL.r(), scopeId, ADL.MediaType.AUDIO);
    }

  }

  /**
   * Handles the change of the 'Publish Audio' checkbox
   */
  function onPublishVideoChanged() {
    if (!scopeId) {

      // If the scope id is not defined, it means that we're not connected and
      // thus there is nothing to do here.
      return;
    }

    // Since we're connected we need to either start or stop publishing the
    // audio stream, depending on the new state of the checkbox
    
    if ($('#publishVideoChckbx').is(':checked')) {
      ADL.getService().publish(ADL.r(), scopeId, ADL.MediaType.VIDEO);
    } else {
      ADL.getService().unpublish(ADL.r(), scopeId, ADL.MediaType.VIDEO);
    }

  }

  /**
   * Prepare the handler when using setAllowedSenders
   */
  var onAudioSilenced = function (e) {
    console.warn('Audio responder callback successfully called');
  };
  var onVideoSilenced = function (e) {
    console.warn('Video responder callback successfully called');
  };
  
   /**
   * This mutes all users
   */
  function disableAdminAudio()
  {
	var action	= {	
					action:"unpublish_audio",
					user_id:admin_id
				 };
	var msg = JSON.stringify(action);
	console.log("msg"+msg);
	sendMsg(msg);
	muteUserList.push(parseInt(admin_id));
	ADL.getService().unpublish(ADL.r(), scopeId, ADL.MediaType.AUDIO);	
	//ADL.getService().setAllowedSenders(ADL.r(onAudioSilenced), scopeId,
     //                                   ADL.MediaType.AUDIO, []);
  }
 /**
   * This mutes all users
   */
  function enableAdminAudio()
  {
	var action	= {	
					action:"publish_audio",
					user_id:admin_id
				 };
		 var index = muteUserList.indexOf(parseInt(admin_id));
		  if(index != -1) {
			muteUserList.splice(index, 1);
		  }		 
		var msg = JSON.stringify(action);
		console.log("msg"+msg);
		sendMsg(msg);
		ADL.getService().publish(ADL.r(), scopeId, ADL.MediaType.AUDIO);	
	//allowedAudioSenders	= [caller,callee];//add all users to audio
	//ADL.getService().setAllowedSenders(ADL.r(onAudioSilenced), scopeId,
                                       // ADL.MediaType.AUDIO, allowedAudioSenders);
  }

  /**
   * Handles the change of the 'Allowed Audio' checkbox
   */
  function muteUser(e) {
    userId 		= parseInt(e.data.rend.find('.user-id-wrapper').html());
	$('#unmute-'+ userId).css('display','block');
	$('#mute-'+ userId).css('display','none');
	var action	= {};
    // Since we're connected we need to either start or stop publishing the
    // audio stream, depending on the new state of the checkbox
   
      // Add the User ID to the array of users allowed to send audio
     // allowedAudioSenders.push(userId);
      //ADL.getService().setAllowedSenders(ADL.r(onAudioSilenced), scopeId,
                                        //ADL.MediaType.AUDIO, allowedAudioSenders);
		action	= {
					type:"audio",
					action:"unpublish_audio",
					user_id:userId
				 };
	   var msg = JSON.stringify(action);
	   muteUserList.push(parseInt(userId));
		console.log("msg"+msg);
		sendMsg(msg);
	}
	 function unmuteUser(e) {
      // Remove the User ID to the array of users allowed to send audio 
		 userId 		= parseInt(e.data.rend.find('.user-id-wrapper').html());
		 var index 		= muteUserList.indexOf(userId);
		  if(index != -1) {
			muteUserList.splice(index, 1);
		  }
		$('#mute-'+ userId).css('display','block');
		//alert('mute-'+ userId);
		$('#unmute-'+ userId).css('display','none');
	 var action	= {};
	  action	= {
					type:"audio",
					action:"publish_audio",
					user_id:userId
				 };
				 
      /* ADL.getService().setAllowedSenders(ADL.r(onAudioSilenced), scopeId,
                                        ADL.MediaType.AUDIO, allowedAudioSenders); */
	var msg = JSON.stringify(action);
	console.log("msg"+msg);
	sendMsg(msg);
  }

  /**
   * Handles the change of the 'Allowed Audio' checkbox
   */
  function videoOn(e) {
    // Remove the User ID to the array of users allowed to send audio 
		 userId 		= parseInt(e.data.rend.find('.user-id-wrapper').html());
		$('#video_off-'+ userId).css('display','block');
		//alert('mute-'+ userId);
		$('#video_on-'+ userId).css('display','none');
	 var action	= {};
	  action	= {
					type:"video",
					action:"publish_video",
					user_id:userId
				 };
				 
      /* ADL.getService().setAllowedSenders(ADL.r(onAudioSilenced), scopeId,
                                        ADL.MediaType.AUDIO, allowedAudioSenders); */
	var msg = JSON.stringify(action);
	console.log("msg"+msg);
	sendMsg(msg);
  }
  
  
  function videoOff(e) {
    userId 		= parseInt(e.data.rend.find('.user-id-wrapper').html());
	$('#video_on-'+ userId).css('display','block');
	$('#video_off-'+ userId).css('display','none');
	var action	= {};
    // Since we're connected we need to either start or stop publishing the
    // audio stream, depending on the new state of the checkbox
   
      // Add the User ID to the array of users allowed to send audio
     // allowedAudioSenders.push(userId);
      //ADL.getService().setAllowedSenders(ADL.r(onAudioSilenced), scopeId,
                                        //ADL.MediaType.AUDIO, allowedAudioSenders);
		action	= {
					type:"video",
					action:"unpublish_video",
					user_id:userId
				 };
	   var msg = JSON.stringify(action);
	   muteUserList.push(parseInt(userId));
		console.log("msg"+msg);
		sendMsg(msg);
	}

  function genAuthDetails(scopeId, userId) {

    // New Auth API
    var dateNow = new Date();
    var now = Math.floor((dateNow.getTime() / 1000));
    var authDetails = {
      // Token valid 5 mins
      expires:now + (5 * 60),
      userId:userId,
      salt:ADLT.randomString(100)
    };
    var signatureBody =
        APPLICATION_ID +
            scopeId +
            userId +
            authDetails.salt +
            authDetails.expires +
            APP_SHARED_SECRET;

    authDetails.signature =
        w.CryptoJS.SHA256(signatureBody).toString(w.CryptoJS.enc.Hex).toUpperCase();
    return authDetails;
  }

  /**
   * ==========================================================================
   * End of the user's events handling code
   * ==========================================================================
   */


  /**
   * Register the document ready handler.
   */
  $(onDomReady);
})(window);