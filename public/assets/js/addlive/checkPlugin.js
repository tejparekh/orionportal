/**
 * @fileoverview
 *
 * Contains implementation of logic required by the Tutorial 1.
 *
 * @author Tadeusz Kozak
 * @date 26-06-2012 10:37
 */
(function () {
  'use strict';

  /**
   * Document ready callback - starts the AddLive platform initialization.
   */
  function onDomReady() {
    console.log('DOM loaded');
    // Initializes the AddLive SDK.
    ADLT.initAddLiveLogging();
    initializeAddLive();
  }

  /**
   * Initializes the AddLive SDK.
   */
  function initializeAddLive() {
    console.log('Initializing the AddLive SDK');

    // Step 1 - create the PlatformInitListener and overwrite it's methods.
    var initListener = new ADL.PlatformInitListener();
    // Define the handler for initialization state changes
    initListener.onInitStateChanged = function (e) {
	 switch (e.state) {
        case ADL.InitState.INSTALLATION_REQUIRED:
          // Current user doesn't have the AddLive Plug-In installed and it is
          // required - use provided URL to ask the user to install the Plug-in.
          // Note that the initialization process is just frozen in this state -
          // the SDK polls for plug-in availability and when it becomes available,
          // continues with the initialization.
          console.log('AddLive Plug-in installation required');
		  $('#start_video').hide();
			$('#installBtn').show();
			$('#installBtn').attr('href', e.installerURL);
          break;
		  case 'INITIALIZED':
			$('#start_video').show();
		  break;
        case ADL.InitState.INSTALLATION_COMPLETE:
          console.log('AddLive Plug-in installation complete');
          $('#installBtn').hide();
		  $('#start_video').show();
          break;

        case ADL.InitState.BROWSER_RESTART_REQUIRED:
          // This state indicates that AddLive SDK performed auto-update and in
          // order to accomplish this process, browser needs to be restarted.
          console.log('Please restart your browser in order to complete platform auto-update');
          break;

        case ADL.InitState.DEVICES_INIT_BEGIN:
          // This state indicates that AddLive SDK performed auto-update and
          // in order to accomplish this process, browser needs to be restarted.
          console.log('Devices initialization started');
          break;

        default:
          // Default handler, just for sanity
          console.warn('Got unsupported init state: ' + e.state);
      }
    };

    // Step 2. Actually trigger the asynchronous initialization of the AddLive SDK.
    ADL.initPlatform(initListener, {applicationId:1});
  }

  /**
   * Register the document ready handler.
   */
  $(onDomReady);

})();