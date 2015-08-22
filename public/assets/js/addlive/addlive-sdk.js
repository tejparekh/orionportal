/**
 * Copyright (C) LiveFoundry Inc. 2013
 *
 * All rights reserved. Any use, copying, modification, distribution and selling
 * of this software and it's documentation for any purposes without authors'
 * written permission is hereby prohibited.
 *
 */




if(window.ADL === undefined) {

  /*jshint unused:false*/
  /**
   * AddLive namespace. Wraps all methods, classes, functions and constants
   * provided by the AddLive SDK.
   *
   * @externs
   * @namespace
   * @summary AddLive namespace - wraps complete SDK functionality.
   */
  var ADL = {};


  /**
   * @private
   * @namespace
   */
  ADL.MediaEngine = {};
}

/**
 * Copyright (C) LiveFoundry Inc. 2013
 *
 * All rights reserved. Any use, copying, modification, distribution and selling
 * of this software and it's documentation for any purposes without authors'
 * written permission is hereby prohibited.
 *
 */

/**
 * Script file containing the AddLive JS SDK configuration - all the consts.
 *
 * @author Tadeusz Kozak
 * @date 05-08-2013 14:26
 */

(function (ADL) {
  'use strict';

  ADL._STATIC_CONFIG = {

    // The amount of log messages to be stored in internal buffer in JS memory
    LOG_BUFFER_SIZE:100,

    // The default connection descriptor - if client app does not specify
    // a particular property, the one from here will be used
    SANE_DEFAULTS_CONN_DESCR:{

      videoStream:{
        maxWidth:640,
        maxHeight:480,
        maxFps:15,
        useAdaptation:true,
        manualControl:false
      },

      // Flags defining that both streams should be automatically published upon
      // connection.
      publishVideo:true,
      publishAudio:true

    }, // end of SANE_DEFAULTS_CONN_DESCR

    CONNECTS: {
      MAX_RETRIES:4,
      RETRY_INTERVAL:5000
    },


    // The name of the module exported via AMD
    AMD_MODULE_NAME:'addlive-sdk',


    // How frequently the session logs will be published - in ms
    LOGS_PUBLISHING_INTERVAL:1000 * 15,

    // The value of enum defining the type of service logs in the logs
    // storage engine
    SERVICE_LOGS_TYPE:1,

    // The maximal amount of logs that can be uploaded in single request. In
    // bytes. Any request larger then this value will be discarded.
    MAX_LOG_UPLOAD_PACKAGE_SIZE:500 * 1024,

    // Default value of the nativeWith property used when publishing the screen
    // sharing feed
    DEFAULT_NATIVE_WIDTH:960,

    // The maximal combined amount of pixels that can be received by peer
    MAX_SAFE_FEEDS_SIZE:1280 * 720,

    // Char used when separating multiple streamer endpoint resolvers given in
    // the dynamic configuration
    RESOLVERS_SEPARATOR:'|',


    // The amount of attempts the resolver should try to resolve the streamer
    // endpoint before reporting an error.
    STREAMER_RESOLVE_MAX_ATTEMPTS:5,


    // Delay when reiterating over the list of available streamer endpoint
    // resolvers.
    RETRY_DELAY:1000,

    // Timeout of AJAX requests made by the SDK. In milliseconds.
    XHR_TIMEOUT:15 * 1000,

    // Update descriptor fetch timeout. If there are no update descriptor result
    // by then, the ADL.getInstallerURL will fail. In milliseconds.
    UPDATE_DESCRIPTOR_FETCH_TIMEOUT:15 * 1000,

    // Default platform initialisation configuration.
    DEFAULT_PLATFORM_INIT_OPTIONS:{
      pluginPollFrequency:1000,
      pluginHeartBeatInterval:1000,
      reloadOnCrash:true,
      initDevices:true,
      skipUpdate:false,
      updateDescriptorRoot:'',
      installationDescriptorRoot:'',
      trackingEndpoint:'',
      bugReportingEnabled:true,
      streamerEndpointResolver:ADL._STREAMER_ENDPOINT_RESOLVER,
      useWebRTC:false,
      webrtcMgmntProxyURL:'',
      renderResizerEnabled:true

    }, // end of DEFAULT_PLATFORM_INIT_OPTIONS

    // Reconnect intervals - min and max. All in seconds.
    //
    // Each reconnect attempt will be made after at least RECONNECT_MIN_INTERVAL
    // seconds but no more then RECONNECT_MAX_INTERVAL.
    RECONNECT_MIN_INTERVAL:10,
    RECONNECT_MAX_INTERVAL:15,

    WebRTC: {

      // Max uplink video stream size
      MAX_VIDEO_BITRATE : 756,

      // Camera capture configuration
      MAX_CAM_WIDTH:640,
      MAX_CAM_HEIGHT:480,
      MAX_CAM_FPS:24,

      SAMPLE_AUDIO_URL: '//d36pfzlm4aixmv.cloudfront.net/resources/test.wav',

      CONNECT_TIME_MAX: 15 * 1000,
      STATS_PUBLISH_INTERVAL : 5 * 1000
    }


  };

}(window.ADL));


/**
 * @license
 * Copyright (C) SayMama Ltd 2012
 *
 * All rights reserved. Any use, copying, modification, distribution and selling
 * of this software and it's documentation for any purposes without authors'
 * written permission is hereby prohibited.
 */
/**
 * @fileoverview
 *
 * @author Tadeusz Kozak
 * @date 28-05-2012 14:39
 */

(function () {
  'use strict';

  /**
   * @const
   * @private
   * @type {string}
   */
  ADL._UPDATE_DESCRIPTOR_NAME = 'update';


  /**
   *
   * @type {String}
   * @private
   */
  ADL._MIC_CONFIG_KEY = 'com.addlive.SELECTED_MIC';

  /**
   *
   * @type {String}
   * @private
   */
  ADL._SPK_CONFIG_KEY = 'com.addlive.SELECTED_SPK';

  /**
   *
   * @type {String}
   * @private
   */
  ADL._CAM_CONFIG_KEY = 'com.addlive.SELECTED_CAM';

  /**
   * Enumeration for all possible media connection types. The AddLive SDK uses
   * several media protocols - from those offering best quality (UDP, P2P mode)
   * to the best effort one (HTTPS fallback, including proxies support).
   * The ConnectionType enumeration is used with
   * {@link ADL.AddLiveServiceListener#onMediaConnTypeChanged}
   * to report which protocol is used by particular media type and particular
   * connection. It is especially useful to handle case when connection uses
   * the TCP protocol, as user may experience issues with quality.
   *
   * @summary Enumerates all possible media connection types.
   * @since 1.15.0.5
   * @const
   * @enum {string}
   * @see ADL.AddLiveServiceListener#onMediaConnTypeChanged
   * @see ADL.MediaConnTypeChangedEvent
   */
  ADL.ConnectionType = {

    /**
     * Indicates that the media transport is not connected at all.
     *
     * @const
     */
    NOT_CONNECTED:'MEDIA_TRANSPORT_TYPE_NOT_CONNECTED',

    /**
     * Media stream is sent/received using RTP/UDP, with help of relay server.
     *
     * @const
     */
    UDP_RELAY:'MEDIA_TRANSPORT_TYPE_UDP_RELAY',

    /**
     *  Media stream is sent/received using RTP/UDP, directly to and from remote
     *  participant.
     *
     *  @const
     */
    UDP_P2P:'MEDIA_TRANSPORT_TYPE_UDP_P2P',

    /**
     * Media stream is sent/received using RTP/TCP, with help of relay server.
     *
     * @const
     */
    TCP_RELAY:'MEDIA_TRANSPORT_TYPE_TCP_RELAY'
  };

  /**
   * The ConnectionQuality enum is used by the
   * {@link ADL.AddLiveService#networkTest} service method to identify the
   * quality of a link used by the user.
   *
   * @summary Enum describing possible connection quality values.
   * @enum {String}
   * @since 2.2.0
   * @see ADL.AddLiveService#networkTest
   */
  ADL.ConnectionQuality = {

    /**
     * Indicates good connectivity - the service will operate seamlessly.
     */
    FINE:'CONN_QUALITY_FINE',

    /**
     * Indicates average connectivity - the service will be functional, yet the
     * quality may be affected
     */
    AVERAGE:'CONN_QUALITY_AVERAGE',

    /**
     * Indicates bad connectivity - the service quality will be either severely
     * affected or will not work at all.
     */
    BAD:'CONN_QUALITY_BAD',

    /**
     * The connectivity state is unknown.
     */
    UNKNOWN:'CONN_QUALITY_UNKNOWN',

    /**
     *
     * @param intValue
     * @private
     */
    _fromInt:function (intValue) {
      switch (intValue) {
        case 0:
          return this.FINE;
        case 1:
          return this.AVERAGE;
        case 2:
          return this.BAD;
        default:
          return this.UNKNOWN;
      }
    }
  };

  /**
   * Enumeration for all possible media types. This enumeration is used whenever
   * there is a need to specify a media type context of an operation - when
   * publishing or stopping publishing media of particular type
   * ({@link ADL.AddLiveService#publish} or @{link ADL.AddLiveService#unpublish})
   * or when SDK reports events specific to a media type
   * ({@link ADL.MediaStatsEvent}).
   *
   * @summary Enumerates all possible media types.
   * @since 1.15.0.5
   * @const
   * @enum {string}
   * @see ADL.AddLiveService#getProperty
   * @see ADL.AddLiveService#setProperty
   * @see ADL.AddLiveService#publish
   * @see ADL.AddLiveService#unpublish
   */
  ADL.MediaType = {

    /**
     * Audio media type tag.
     *
     * @const
     */
    AUDIO:'audio',


    /**
     * Video media type tag.
     *
     * @const
     */
    VIDEO:'video',

    /**
     * Screen media type tag.
     *
     * @const
     */
    SCREEN:'screen'
  };

  /**
   *
   * @private
   */
  ADL.MediaType._fromInt = function (intVal) {
    intVal = parseInt(intVal, 10);
    switch (intVal) {
      case 0:
        return ADL.MediaType.AUDIO;
      case 1:
        return ADL.MediaType.VIDEO;
      case 2:
        return ADL.MediaType.SCREEN;
      default:
        return '';
    }
  };


  /**
   * Enumeration containing all possible scaling filters that can be used with
   * {@link ADL.renderSink}.
   *
   * @summary Enumerates all possible video scaling filters.
   * @since 1.16.0.5
   * @see ADL.renderSink
   * @enum {string}
   */
  ADL.VideoScalingFilter = {

    /**
     * Fast, bilinear scaling algorithm. It is the default filter used by the
     * {@link ADL.renderSink} function that works well with casual video feed
     * rendering
     */
    FAST_BILINEAR:'fast_bilinear',

    /**
     * High quality bicubic scaling algorithm. It is especially useful when
     * rendering the screen sharing feed.
     */
    BICUBIC:'bicubic'

  };

//  TODO add some comments about scaling and cropping
//  TODO refactor it, so it uses only an object with configuration
  /**
   * Renders a video sink with given configuration.
   *
   * #### About sinks and renderers
   *
   * With AddLive SDK, the video sink represents a source of raw video frames -
   * e.g. local preview feed or feed constructed from decoding remote video
   * stream. Each video sink has a unique id, which then can be used to render
   * it, using the ADL.renderSink method. This method, using a video sink id
   * and a container id, creates a rendering widget that fills the container
   * completely (read: {width:100%;height:100%}). Also, please note that each
   * video sink may have multiple renderers. Internally, a renderer is actually
   * just an html <object> tag.
   *
   * #### Configuring a renderer
   *
   * In spite of the required and quite obvious parameters (sinkId and
   * containerId) the renderSink function takes a whole bunch of additional
   * properties, allowing one to fine tune the rendering.
   *
   * The fullSize boolean flag, defines whether the rendering widget should
   * use all the space offered by the container. It is true by default and it
   * should not be changed unless you plan to style the renderer using external
   * CSS (to add e.g. padding, border etc.).
   *
   * The document property allows one to specify different context document
   * in which the renderer should be created. This is especially useful when
   * your application would like to render particular feed using another
   * browser window, popped out by the base one.
   *
   * The mirror property is pretty self-explanatory. If true, the feed will be
   * mirrored before drawing. It is useful when rendering local preview video
   * feed as for casual user it is more pleasant to see self as in a mirror.
   *
   * The filterType property allows one to configure the scaling filter. You can
   * use {@link ADL.VideoScalingFilter} enumeration to select which filter
   * should be used. In most cases, the default value will suffice.
   *
   * Finally, the windowless property specifies how the <object> tag should
   * be embedded in the host site. In general, native browser plug-ins can
   * have 2 rendering mode - windowless or windowed. With windowless rendering,
   * renderer receives the handle for page window and a rectangle defining area
   * where it can render the content. With windowed rendering, browser creates
   * a separate window, embeds it on the page and allows renderer to use all
   * it's space for the draw. From application developer point of view, there
   * are just 2 important aspects. Windowed rendering is more efficient but
   * it is impossible to put any content on top of it (z-index CSS property does
   * not apply here, as drawing happens completely outside of the page context).
   * On the other side, windowless drawing has some performance hit (tens
   * percent of a CPU overhead) but allows to display additional content on top
   * of the renderer. Please note that the windowless property applies only to
   * Microsoft Windows operating system, as on OS X rendering works always
   * similar to the windowless mode (although without the performance hit).
   *
   * @example
   * function onLocalPreviewStarted(sinkId) {
   *   ADL.renderSink(
   *     {
   *       containerId: 'localPreviewRenderer',
   *       sinkId: sinkId,
   *       mirror:true
   *     });
   * }
   *
   * @example
   * function onRemoteUserJoined(sinkId) {
   *   ADL.renderSink(
   *     {
   *       containerId: 'remotePeerRenderer',
   *       sinkId: sinkId,
   *       windowless:false
   *     });
   * }
   *
   * @summary Renders a video sink.
   * @since 1.15.0.0
   * @see ADL.VideoScalingFilter
   * @see ADL.AddLiveService#startLocalVideo
   * @see ADL.AddLiveServiceListener#onUserEvent
   * @see ADL.AddLiveServiceListener#onMediaStreamEvent
   * @see ADL.UserStateChangedEvent
   * @param {Object} options
   *          Rrendering configuration. The configuration object must contain
   *          __sinkId__ and __containerId__ properties. Rest of the parameters
   *          expected by the renderSink method are optional (fullSize,
   *          document, mirror, filterType, windowless).
   * @param {string} options.sinkId
   *          Id of sink to be rendered.
   * @param {string} options.containerId
   *          Id of DOM node in which the renderer should be placed. Required if
   *          sinkId is given explicitly.
   * @param {boolean} [options.fullSize=true]
   *          Flag defining whether the renderer should take 100% of container
   *          dimensions.
   * @param {Document} [options.document=window.document]
   *          Document in which the renderer should be added. Useful when
   *          injecting the renderer in e.g. popped out window.
   * @param {boolean} [options.mirror=false]
   *          Flag defining whether the rendered stream should be mirrored or
   *          not.
   * @param {string} [options.filterType='fast_bilinear']
   *          Filter to be used when scaling the video feed to match the
   *          renderer dimensions.
   * @param {boolean} [options.windowless=true]
   *          Boolean flag defining whether the renderer should work in windowed
   *          (windowless == false) or windowless mode (windowless == true).
   *
   * @throws {ADL.AddLiveException} In case the input is invalid or service is
   *         not initialized. If the input is invalid: container with given id
   *         does not exist or sink id is empty the exception thrown will have
   *         error code property set to {@link ADL.ErrorCodes.Logic.INVALID_ARGUMENT}.
   *         If the platform is not initialised yet, the error code will be
   *         {@link ADL.ErrorCodes.Logic.INVALID_STATE. Please note that this
   *         method does not validate the sink id property. If it does not point
   *         to a valid video sink, the SDK will not return any error but
   *         instead the renderer will be displaying a black or white box.
   */
  ADL.renderSink = function (options) {
    // Normalize input
    ADL.Log.d('Trying to render feed from sink: ' + options.sinkId +
        '. Will use ' +
        options.containerId + ' box as a container. Additional options: custom doc: ' +
        options.document + ', fullSize: ' + options.fullSize + ', windowless: ' + options.windowless +
        ', scaling filter: ' + options.filterType);


    if (options.fullSize === undefined) {
      options.fullSize = true;
    }
    if (options.document === undefined) {
      options.document = window.document;
    }
    if (options.mirror === undefined) {
      options.mirror = false;
    }
    if (options.filterType === undefined) {
      options.filterType = 'fast_bilinear';
    }
    if (options.windowless === undefined) {
      options.windowless = true;
    }
    if (ADL._usesWebRTC) {
      ADL.MediaEngine.RenderCtrl.renderSink(options);
      return;
    }

    var container = document.getElementById(options.containerId);

    // Validate input
    if (!container) {
      ADL.Log.w('Can\'t render as the container with given ID was not found ' +
          'in DOM');
      throw new ADL.AddLiveException(
          'Invalid container ID, cannot find DOM node with given id.',
          ADL.ErrorCodes.Logic.INVALID_ARGUMENT
      );
    }
    if (!options.sinkId) {
      ADL.Log.w('Can\'t render as the sink id property is empty');
      throw new ADL.AddLiveException(
          'Invalid sink ID',
          ADL.ErrorCodes.Logic.INVALID_ARGUMENT
      );
    }

    if (!ADL._service) {
      ADL.Log.w('Cannot render as the service is not fully initialised.');
      throw new ADL.AddLiveException(
          'Cannot render as the service is not fully initialised.',
          ADL.ErrorCodes.Logic.INVALID_STATE
      );
    }

    // Create the renderer
    //noinspection InnerHTMLJS
    ADL.Utils.removeChildNodes(container);
    //noinspection InnerHTMLJS,StringLiteralBreaksHTMLJS
    container.innerHTML = '<object type="application/x-addliveplugin-v3">' +
        '<param  name="vcamid" value="' + options.sinkId + '"/>' +
        '<param  name="serviceid" value="' + ADL._service.nativeService.serviceid + '"/>' +
        '<param  name="mirror" value="' + (options.mirror ? 'true' : 'false') + '"/>' +
        '<param  name="filtertype" value="' + options.filterType + '"/>' +
        '<param  name="windowless" value="' + (options.windowless ? 'true' : 'false') + '"/>' +
        '</object>';
    if (container && container.children && container.children[0]) {
      var objectNode = getObjectNode(container);
      if (!objectNode.nodeName) {
        objectNode.nodeName = 'object';
      }
      try {
        objectNode.addLiveRenderer = true;
        if (!objectNode.parentNode) {
          objectNode.parentNode = container;
        }
      } catch (e) {
        // on IE 10, the parentNode property is read-only thus it may fail
      }

      if (options.fullSize) {
        objectNode.style.width = '100%';
        objectNode.style.height = '100%';
      }
      objectNode.style.background = 'black';
    }
    ADL.Log.d('Renderer created');
  };

  /**
   * Disposes a renderer created within given container by the
   * {@link ADL.renderSink} function.
   *
   *
   * @summary Disposes a renderer.
   * @since 2.2.0
   * @see ADL.renderSink
   * @param {String} containerId
   *          Id of a container within which the renderer was created by the
   *          {@link ADL.renderSink}.
   * @throws {ADL.AddLiveException} In case the input is invalid: container with
   *         given id does not exist.

   */
  ADL.disposeRenderer = function (containerId) {
    ADL.Log.d('Disposing renderer with id: ' + containerId);
    if (ADL._usesWebRTC) {
      ADL.MediaEngine.RenderCtrl.disposeRenderer(containerId);
    }

    var container = document.getElementById(containerId);
    if (!container) {
      ADL.Log.w('Can\'t render as the container with given ID was not found ' +
          'in DOM');
      throw new ADL.AddLiveException(
          'Invalid container ID, cannot find DOM node with given id.',
          ADL.ErrorCodes.Logic.INVALID_ARGUMENT
      );
    }
    ADL.Utils.removeChildNodes(container);
  };

  /**
   * Internally, this method checks whether the platform is initialised. If so,
   * it will just call {@link ADL.AddLiveService.getVersion}. Otherwise it will
   * try to check the plug-in version using plug-in container. If plug-in is
   * not installed, it will return an error.
   *
   * @since 2.3.11
   * @summary Retrieves version of the AddLive Service available.
   * @param {ADL.Responder} responder
   *          Responder object. See calling AddLive plug-in service methods.
   */
  ADL.getVersion = function (responder) {
    if (ADL._service) {
      ADL._service.getVersion(responder);
      return;
    }
    setTimeout(function () {
      var pluginContainer = document.createElement('div');
      pluginContainer.style.position = 'fixed';
      pluginContainer.style.overflow = 'hidden';
      pluginContainer.style.width = 10;
      pluginContainer.style.height = 10;
      pluginContainer.style.top = 0;
      pluginContainer.style.left = -100;
      pluginContainer.id = 'addLivePluginContainer' + new Date().getTime();
      document.body.appendChild(pluginContainer);
      var pluginInstance = new ADL.AddLivePlugin(pluginContainer.id, {});
      var installed = pluginInstance.loadPlugin();
      try {
        if (installed) {
          var version = pluginInstance.pluginInstance.version;
          responder.result(version);
        } else {
          responder.error(ADL.ErrorCodes.Logic.INVALID_STATE,
              'AddLive Service not available');
        }
      } catch (e) {

      }
      pluginContainer.parentNode.removeChild(pluginContainer);

    }, 0);

  };

  /**
   * Checks whether the initialises service uses native WebRTC implementation
   * provided by browser or not. In the latter case, the AddLive plug-in is
   * used.
   *
   * @summary tells whether the AddLive JS SDK uses browser WebRTC
   *          implementation or not.
   * @since 3.0.0
   * @return {Boolean}
   */
  ADL.usesWebRTC = function () {
    return !!ADL._usesWebRTC;
  };


  /**
   * This method validates whether the AddLive SDK can use the WebRTC
   * implementation provided by browser.
   *
   * @summary Checks availability of the native WebRTC implementation.
   * @since 3.0.27
   * @returns {Boolean}
   */
  ADL.isWebRTCSupported = function () {
    return ADL.MediaEngine.isAvailable();
  };

  /**
   * @summary Checks whether the AddLive plug-in is installed.
   * @since 3.0.41
   * @return {Boolean} `true` if the plug-in is available, `false` otherwise.
   */
  ADL.isPluginInstalled = function () {
    var id = 'addLivePluginContainer' + new Date(), installed,
        container = ADL.Utils.embedInvisibleContainer(id);
    var pluginInstance = new ADL.AddLivePlugin(id, {});

    if (pluginInstance.pluginInstalled()) {
      installed = true;
    } else {
      installed = pluginInstance.loadPlugin();
    }
    pluginInstance.unload();
    container.parentNode.removeChild(container);
    return installed;
  };

  function getObjectNode(container) {
    return container.children[0];
  }

  /**
   * Exception class thrown by the API.
   * @summary Exception class thrown by the API.
   * @since 1.15.0.0
   * @param {string} message
   *          Error message
   * @param {Number=} code
   *          Error code
   * @constructor
   */
  ADL.AddLiveException = function (message, code) {

    /**
     * Type of this exception.
     * @const
     * @type {String}
     */
    this.name = 'AddLiveException';

    /**
     * Human-readable error message.
     * @type {String}
     */
    this.message = message;

    /**
     * Error code identifying the problem.
     * @see ADL.ErrorCodes
     * @type {Number}
     */
    this.code = code;
  };

  /**
   * Base class for all AddLive events. Defines functionality common amongst all
   * event classes used by the AddLive SDK.
   *
   * @summary Base class for all AddLive events.
   * @since 2.0.0
   * @constructor
   */
  ADL.AddLiveEvent = function () {
  };

  //noinspection JSUnusedGlobalSymbols
  ADL.AddLiveEvent.prototype = {

    /**
     * If this method is called, the default action of the event will not be
     * triggered. This is useful only in case of unhandled errors that does
     * have default error handlers provided by the AddLive SDK.
     *
     * @summary Prevents calling of a default handler for particular error event.
     * @since 2.0.0
     */
    preventDefault:function () {
      this._isDefaultPrevented = true;
    },

    /**
     * Returns whether event.preventDefault() was ever called on this event
     * object.
     * @summary Returns whether event.preventDefault() was ever called on this
     *          event object.
     * @since 2.0.0
     * @returns {boolean}
     */
    isDefaultPrevented:function () {
      return this._isDefaultPrevented;
    },

    /**
     * @private
     */
    _isDefaultPrevented:false
  };

  /*
   * =============================================================================
   * Private methods
   * =============================================================================
   */

  /**
   *
   * @param destination
   * @param source
   * @returns {*}
   * @private
   */
  ADL._extend = function (destination, source) {
    for (var k in source.prototype) {
      /*jshint forin:false*/
      //noinspection JSUnfilteredForInLoop
      destination.prototype[k] = source.prototype[k];
    }
    return destination;

  };

  /**
   *
   * @return {string}
   * @private
   */
  ADL._getUpdateDescriptorSuffix = function () {
    var suffix = ADL._getPlatformSuffix();
    if (suffix) {
      return '.' + suffix;
    } else {
      throw new ADL.AddLiveException(
          'Cannot update/install - platform unsupported',
          ADL.ErrorCodes.Logic.PLATFORM_UNSUPPORTED);
    }
  };

  ADL._getPlatformSuffix = function () {
    var ua = window.navigator.userAgent;
    //noinspection JSHint
    if (/MSIE.*Win64; x64/.test(ua)) {
      throw new ADL.AddLiveException(
          'Internet Explorer in \"64-bit\" or \"No Add-ons\" modes is not ' +
              'supported, please run the plain mode',
          ADL.ErrorCodes.Logic.PLATFORM_UNSUPPORTED);
    }
    if (/Intel Mac OS X 10[._]5/.test(ua)) {
      throw new ADL.AddLiveException(
          'OS X 10.5 is not supported, please update to at least 10.6',
          ADL.ErrorCodes.Logic.PLATFORM_UNSUPPORTED);
    }
    if (/Windows/.test(ua)) {
      return 'win';
    } else if (/Intel Mac OS X 10[._][8-9]/.test(ua)) {
      return 'mac';
    } else if (/Intel Mac OS X 10[._][6-7]/.test(ua)) {
      return 'mac_10.6';
    }
    return false;
  };

  /**
   * Not-a-function.
   * @private
   */
  ADL._nop = function () {
  };

  /**
   * Utility function to validate whether the given instance has all methods
   * of desired interface implemented.
   *
   *
   * @param IfaceClass
   * @param instance
   * @param missingMethods
   * @return {Boolean}
   * @private
   */
  ADL._validateInterface = function (IfaceClass, instance, missingMethods) {
//    In case the missingMethods aren't defined, create an empty list
    if (!missingMethods) {
      missingMethods = [];
    }

//    Instantiate the interface to be validated
    var sampleInstance = new IfaceClass();

//    Iterate through it's method to check it's presence in instance to be
//    validated
    for (var method in sampleInstance) {
      //noinspection JSUnfilteredForInLoop

      if (typeof sampleInstance[method] === 'function' &&
          typeof instance[method] !== 'function') {
//          If it's not found, add the missing methods
        //noinspection JSUnfilteredForInLoop
        missingMethods.push(method);
      }
    }
//    True if there aren't any missing methods, false otherwise
    return !missingMethods.length;
  };

  /**
   *
   * @type {Boolean}
   * @private
   */
  ADL._isOwnProperty = function (obj, member) {
    return Object.prototype.hasOwnProperty.call(obj, member);
  };

  ADL._WRTC_CONSTS = {
    NativeErrors:{
      PERMISSION_DENIED:'PERMISSION_DENIED'
    }
  };

}());
/**
 * Copyright (C) LiveFoundry Inc. 2013
 *
 * All rights reserved. Any use, copying, modification, distribution and selling
 * of this software and it's documentation for any purposes without authors'
 * written permission is hereby prohibited.
 *
 * =============================================================================
 * @fileoverview
 *
 * TODO module description
 *
 * @author Tadeusz Kozak
 * @date 31.01.13 13:16
 */


(function (w) {
  'use strict';

  /**
   * Enumeration listing all possible levels of AddLive log entries, passed to
   * the log handler, registered using ADL.initLogging
   *
   * @summary Enumerates all possible log levels.
   * @since 1.16.0.0
   * @see ADL.initLogging
   * @enum {string}
   */
  ADL.LogLevel = {

    /**
     * Debug log level - additional log messages helping in debugging the
     * application. Messages of this level are filtered off if the enableDebug
     * argument given to the ADL.initLogging is false.
     */
    DEBUG:'DEBUG',

    /**
     * Info log level - used by pure informational log messages, including
     * every method call and events peering events.
     */
    INFO:'INFO',

    /**
     * Warning log level all non fatal problems are reported with this level.
     * Problem here is an event which doesn't affect the platform functionality
     * but may affect its performance.
     */
    WARN:'WARN',

    /**
     * Error log level. Used when reporting all errors encountered by the
     * platform.
     */
    ERROR:'ERROR'
  };


  /**
   * @private
   * @type {Object}
   */
  var Log = {

    /**
     *
     * @param {string} msg
     */
    d:function () {

    },

    /**
     *
     * @param {string} msg
     */
    i:function (msg) {
      Log._appendMsg(ADL.LogLevel.INFO, msg);
      Log._i(msg);
    },

    /**
     *
     * @param {string} msg
     */
    w:function (msg) {
      Log._appendMsg(ADL.LogLevel.WARN, msg);
      Log._w(msg);
    },

    /**
     *
     * @param {string} msg
     */
    e:function (msg) {
      Log._appendMsg(ADL.LogLevel.ERROR, msg);
      Log._e(msg);
    },

    _d:function () {
    },
    _i:function () {
    },
    _w:function () {
    },
    _e:function () {
    },
    _tail:[],

    /**
     * Returns JS logs tail.
     */
    getTail:function () {
      var tailStr = '';
      for (var i = 0; i < this._tail.length; i++) {
        if (this._tail[i] !== undefined) {
          tailStr += this._tail[i] + '\n';
        }
      }
      tailStr = tailStr.replace(/\[log\]/, '[log ]');
      return tailStr;
    },

    _appendMsg:function (lvl, msg) {
      Log._tail.push(_formatMsg(lvl, msg));
      if (Log._tail.length > ADL._STATIC_CONFIG.LOG_BUFFER_SIZE) {
        Log._tail.shift();
      }
    }
  };

  /**
   * Initializes default browser-specific logging for the AddLive API.
   *
   * It will try to do a feature detection, to check what are the browsers
   * capabilities, and then will use console object with log/debug, warning, error
   * methods to print ADL logs.
   *
   * @summary Initializes default browser-specific logging for the AddLive API.
   * @since 1.0.0
   * @see ADL.initLogging
   * @param {boolean} enableDebug
   *          Flag defining whether debugging should be enabled or not.
   */
  ADL.initStdLogging = function (enableDebug) {

    if (enableDebug) {
      _enableDebug();
      _setupStdLogLevel('d', 'log');
    }
    _setupStdLogLevel('i', 'log');
    _setupStdLogLevel('w', 'warn');
    _setupStdLogLevel('e', 'error');
    Log.d('Logging initialized');
  };

  /**
   * Initializes logging using user-provided log handler.
   *
   * @summary Initializes logging using user-provided log handler.
   * @since 1.0.0
   * @see ADL.initStdLogging
   * @see ADL.LogLevel
   * @example
   * function initLogging() {
   *   ADL.initLogging(function (lev, msg) {
   *     switch (lev) {
   *       case ADL.LogLevel.DEBUG:
   *         console.debug('[ADL] ' + msg);
   *         break;
   *       case ADL.LogLevel.INFO:
   *         console.debug('[ADL] ' + msg);
   *         break;
   *       case ADL.LogLevel.WARN:
   *         console.warn('[ADL] ' + msg);
   *         break;
   *       case ADL.LogLevel.ERROR:
   *         console.error('[ADL] ' + msg);
   *         break;
   *       default:
   *         console.warn('[ADL] Got unsupported log level: ' + lev + '. Message: ' +
   *                        msg);
   *     }
   *   }, false);
   * };
   *
   *
   * @param {Function} logHandler
   *           Function that will receive log entries. It should take two params,
   *           {string} level ('DEBUG', 'WARN', 'ERROR') and {string} message.
   * @param {boolean} [enableDebug=false]
   *          Flag defining whether debugging should be enabled or not.
   */
  ADL.initLogging = function (logHandler, enableDebug) {

    if (enableDebug) {
      _enableDebug();
      Log._d = _wrapLogHandler(logHandler, ADL.LogLevel.DEBUG);
    }
    Log._i = _wrapLogHandler(logHandler, ADL.LogLevel.INFO);
    Log._w = _wrapLogHandler(logHandler, ADL.LogLevel.WARN);
    Log._e = _wrapLogHandler(logHandler, ADL.LogLevel.ERROR);
    Log.i('Logging initialized');
  };

  function _enableDebug() {
    ADL.Log.d = function (msg) {
      Log._appendMsg(ADL.LogLevel.DEBUG, msg);
      Log._d(msg);
    };
  }


  /**
   * Wraps user-provided log handler to pass messages with given scope string.
   *
   * @param {Function} handler
   *           Handler to be wrapped.
   * @param {string} level
   *           Logging level to pass.
   * @return {Function}
   *           Resulting, wrapped log handler.
   * @private
   */
  function _wrapLogHandler(handler, level) {
    return function (msg) {
      try {
        handler(level, msg);
      } catch (e) {
        ADL.Log.e('Error in user defined log handler.');
      }
    };
  }

  function _getDateMemberStr(date, member) {
    var value = date[member]();
    if (value < 10) {
      value = '0' + value;
    }
    return value;
  }

  function _formatMsg(level, msg) {
    return _getFormattedDate() +
        ' [' + level + '] ' + msg;
  }

  function _getFormattedDate(inclMs) {
    var date = new Date();
    var strDate =  _getDateMemberStr(date, 'getHours') + ':' +
        _getDateMemberStr(date, 'getMinutes') + ':' +
        _getDateMemberStr(date, 'getSeconds');
    if(inclMs) {
      var ms = date.getMilliseconds();
      if(ms < 10) {
        ms = '00' + ms;
      } else if(ms < 100) {
        ms = '0' + ms;
      }
      strDate += ':' + ms;
    }
    return strDate;
  }

  /**
   * @private
   */
  function _setupStdLogLevel(handlerName, consoleName) {
//  Check whether there is the console object available.
    try {
      if (w.console) {
//  Check for particular method.
        if (w.console[consoleName]) {
          Log['_' + handlerName] = function (msg) {
            w.console[consoleName](_getFormattedDate(true) + ' = ' + msg);
          };
          return true;
        }
      }
    }
    catch (e) {
      //noinspection JSUnusedLocalSymbols
    }
    return false;
  }

  /**
   * @namespace
   * @type {Object}
   * @private
   */
  ADL.Log = Log;
}(window));/**
 * Copyright (C) SayMama Ltd 2012
 *
 * All rights reserved. Any use, copying, modification, distribution and selling
 * of this software and it's documentation for any purposes without authors'
 * written permission is hereby prohibited.
 */
/**
 * Contains implementation of the platform initialization functionality.
 *
 * @fileoverview
 * @author Tadeusz Kozak
 * @date 27-06-2012 13:45
 */
(function () {
  'use strict';

  // Imports
  //noinspection JSAccessibilityCheck
  var Log = ADL.Log,
      MediaEngine = ADL.MediaEngine;

  var Progress = {
        UPDATE_BEGIN:5,
        UPDATE_END:70,
        INSTALLED:71,
        CREATE_SERVICE:71,
        SERVICE_CREATED:80,
        COMPLETE:100
      },


      /**
       * Map of devices installed on user's OS.
       *
       * @private
       */
          devices = {};


  /**
   * Initializes the AddLive Platform. This function is the main entry point to
   * the AddLive Web SDK. The initialization process is completely asynchronous
   * with all the state changes notifications being dispatched via the the
   * listener provided as the first argument.
   * See {@link ADL.PlatformInitListener}.
   *
   *
   * #### Initialization Steps
   *
   * The common flow for the platform initialization consists of following
   * steps:
   *
   * - creation of a &lt;div&gt; node that will be used as a plug-in container
   *   the div created will have a random id and will be located inside the
   *   &lt;body&gt; with absolute position , outside of the visible area
   *
   * - check whether the plug-in is installed
   *
   * - if the plug-in is not installed, SDK will download the update descriptor,
   *   parse it and get an appropriate installer URL (depending on the OS and
   *   application id for custom installers). Finally it will notify the host
   *   application that plug-in installation is required. After the notification
   *   SDK will poll for plug-in availability and will continue with the
   *   initialization automatically, when the plug-in become available. This
   *   state is being notified with the {@link ADL.InitStateChangedEvent#state}
   *   property set to {@link ADL.InitState.INSTALLATION_REQUIRED} and
   *   {@link ADL.InitStateChangedEvent#installerURL} property defined. Once the
   *   installation is complete and the SDK detects the plug-in, host
   *   application will be notified of state changed with state set to
   *   {@link ADL.InitState.INSTALLATION_COMPLETE}
   *
   * - attempt to update the plug-in (skipped if the plug-in was just
   *   installed). This step will be reported using the
   *   {@link ADL.InitState.UPDATE_BEGIN}. When creating your application, you
   *   should also be aware of the fact that the update may fail or may require
   *   manual update. This case will be reported using the
   *   {@link ADL.InitState.NEEDS_MANUAL_UPDATE}. Additionally it is possible
   *   that to complete the self-update process, browser restart is required.
   *   Such a situation will be reported using the
   *   {@link ADL.InitState.BROWSER_RESTART_REQUIRED} state
   *   Finally, please note that the self update process can be skipped by
   *   setting <strong>skipUpdate</strong> property of the init options to
   *   <strong>true</strong>.
   *
   * - creation of the AddLive service object. Please note that if this step
   *   fails for any reason, it will be reported using the state set to
   *   {@link ADL.InitState.ERROR} with {@link ADL.InitStateChangedEvent#errCode}
   *   and {@link ADL.InitStateChangedEvent#errMessage} members describing the
   *   cause of an error.
   *
   * - setting the application id to be used when connecting. See
   *   {@link ADL.AddLiveService.setApplicationId}.
   *
   * - initialization of the media devices. At this step, SDK will try to get
   *   previously used configuration from the localStorage and set those
   *   devices. If it's the first run or any of the previously used devices are
   *   unavailable, it will try to use the default devices. This step is
   *   reported using the InitStateChangedEvent with state set to
   *   {@link ADL.InitState.DEVICES_INIT_BEGIN}. The status of the devices
   *   initialization (whether it succeeded or not) will be dispatched along
   *   with platform initialization complete event, using 3 boolean properties:
   *   {@link ADL.InitStateChangedEvent#audioCaptureDevFunctional},
   *   {@link ADL.InitStateChangedEvent#audioOutputDevFunctional},
   *   {@link ADL.InitStateChangedEvent#videoCaptureDevFunctional}
   *
   * - initialization of the {@link ADL.CrashHandler}, {@link ADL.BugReporting}
   *   (private) and {@link ADL.StreamerResolver} (private) JavaScript modules.
   *
   * Once the initialization is complete, the SDK will dispatch the
   * {@link ADL.InitStateChangedEvent} event with state set to
   * {@link ADL.InitState.INITIALIZED}. At this point, the AddLive SDK is fully
   * functional and the application can freely use the
   * {@link ADL.AddLiveService} interface obtained using the
   * {@link ADL.getService} function.
   *
   *
   * #### Bug reporting
   *
   * Starting from version <strong>2.0.0</strong> the AddLive SDK monitors own
   * health and sends AERs (Automatic Error Reports) in case of any issues.
   * Platform will send an AER in case of:
   *
   * - plug-in crash
   * - any JavaScript error within the SDK code
   * - update errors
   * - initialization
   * - any error result from API calls that wasn't caused by platform misuse nor
   *   indicates invalid state of environment (e.g. camera in use)
   *
   * If by any chance this functionality should be disabled, it can be achieved
   * by setting the <strong>bugReportingEnabled</strong> to
   * <strong>false</strong>.
   *
   *
   * #### Customizing the initialization process
   *
   * The platform initialization process can be customized using the options
   * object passed as 2nd argument to the initPlatform function. The additional
   * customization is not required in most cases, as using the sane defaults
   * will suffice.
   *
   * Most of the options' properties are pretty self explanatory and the
   * description in the Properties section should suffice, there are few of
   * those that require some comments - <strong>updateDescriptorRoot</strong>,
   * <strong>installationDescriptorRoot</strong>,
   * <strong>streamerEndpointResolver</strong>,
   * <strong>bugReportingEndpoint</strong>. Those properties define the location
   * (complete or partial URLs) of external resources that are used to further
   * configure the SDK, depending on the release channel (beta, stable). In
   * certain situations (especially restrictive network configuration) it may
   * be required to overwrite those properties to set the custom management
   * environment for the SDK. In any case, if you think you may need to
   * overwrite those properties, please contact first our support.
   *
   *
   * #### Handling browser security Sandbox
   *
   * Starting from Chrome 32, Safari 7, Firefox 24, browsers included a security
   * that allows or requires the user to confirm whether given site can use
   * given NPAPI plug-in. Although this feature is extremely useful from
   * security perspective it creates some extra UX/UI challenges for the
   * application developer. The AddLive JavaScript SDK allows application to
   * cover this case using another
   * {@link ADL.PlatformInitListener#onInitStateChanged} notification with
   * a state {@link ADL.InitState.USER_CONSENT_REQUIRED}.
   *
   *
   *
   *
   * @summary Initializes the AddLive Platform.
   * @since 1.16.0.0
   * @see ADL.PlatformInitListener
   * @see ADL.InitStateChangedEvent
   * @see ADL.InitProgressChangedEvent
   * @see ADL.getService
   *
   * @param {ADL.PlatformInitListener} listener
   *          Listener that will receive the init state change notifications.
   * @param {Object} [options]
   *          Client id or fine fine configuration options (includes client id).
   * @param {Number} [options.applicationId]
   *          Id of AddLive application. Affects use of custom installation
   *          binaries and streamer URLs employed. Defines global application
   *          context. Although this property is optional, it won't be possible
   *          to establish any connections to the streaming server without
   *          defining it.
   * @param {Number} [options.pluginPollFrequency=1000]
   *          Defines how frequently the SDK should check the plug-in
   *          availability after dispatching the
   *          ADL.InitState.INSTALLATION_REQUIRED state changed notification.
   * @param {Boolean} [options.initDevices=true]
   *          Flag defining whether the devices initialization should be
   *          performed or not. Defaults to true.
   * @param {Boolean} [options.skipUpdate=false]
   *          Flag defining whether the self-update process should be skipped
   *          or not.
   * @param {Number} [options.pluginHeartBeatInterval=1000]
   *          Defines how frequently the SDK should check whether the plug-in
   *          is still alive. This property is used by the crash monitoring
   *          functionality. See {@link ADL.CrashHandler}.
   * @param {Boolean} [options.reloadOnCrash=true]
   *          Boolean flag defining whether the JavaScript SDK should reload
   *          the page upon plug-in failure.
   *          See {@link ADL.CrashHandler.registerCrashListener}
   * @param {string} [options.updateDescriptorRoot]
   *          Custom root for update descriptors used with self updating.
   *          Change only if you know what you're doing.
   * @param {string} [options.installationDescriptorRoot]
   *          Custom root for update descriptors used with installation.
   *          Change only if you know what you're doing.
   * @param {string} [options.streamerEndpointResolver]
   *          Custom URL for service that can resolve streamer IP using
   *          scope id and application Id. Change only if you know what you're
   *          doing. <strong>IMPORTANT!</strong> Please note that in the
   *          previous version of the SDK, this property was provided by
   *          external, configuration file specified via the
   *          <strong>configUrl</strong> property. Starting from this version,
   *          the <strong>configUrl</strong> is not used by the SDK.
   * @param {Boolean} [options.bugReportingEnabled=true]
   *          Boolean flag defining whether AER system should be enabled or not.
   * @param {string} [options.bugReportingEndpoint]
   *          Custom URL for service that process bug reports dispatched by the
   *          AddLive SDK. Change only if you know what you're doing.
   * @param {Boolean} [options.useProxy=true]
   *          Boolean flag defining whether the proxy auto-detection should be
   *          enabled or not. By default this feature is enabled. __Note!__
   *          This is an advanced feature. Use it only if you know what you are
   *          doing.
   * @param {Boolean} [options.useWebRTC=true]
   *          Boolean flag defining whether the native WebRTC implementation
   *          exposed by browser should be used. If this flag is set to false,
   *          the SDK will use AddLive plug-in even on WebRTC-compliant
   *          browsers.
   * @param {string} [options.webrtcMgmntProxyURL]
   *          Optional URL for the WebRTC Management proxy. Use this only if you
   *          know what you're doing.
   */
  ADL.initPlatform = function (listener, options) {
    //noinspection JSUnresolvedFunction
    Log.i('==================================================================');
    Log.i('Initializing the AddLive JS SDK v' + ADL.VERSION + ' ' + ADL.RELEASE_LEVEL);
    Log.i('==================================================================');

    try {
      _applyLazyInitDefaultConfiguration();
      _validatePlatformOptions(options);

      _initPlatformOptions(options);

      _embedPluginContainer();

      ADL.BugReporting.init(ADL._platformOptions);
      // This needs to be done after the container is embed as we use it's id.
      ADL.Tracker.init(ADL._platformOptions, ADL._pluginContainerId);

      var isLinux = !!/Linux/.test(window.navigator.userAgent);
      if (MediaEngine.isAvailable() &&
          (ADL._platformOptions.useWebRTC || isLinux)) {
        MediaEngine.init(listener, ADL._platformOptions);
        ADL._service = new ADL.AddLiveService(MediaEngine.AddLiveServiceWrtcImpl);
        ADL._usesWebRTC = true;
      } else {
        // Synchronous steps.
        _embedPluginContainer();
        var pluginEmbedded = _embedPlugin();


        if (pluginEmbedded) {
          // The plug-in is embedded and functional. Proceed with the
          // initialisation

          if (ADL._platformOptions.skipUpdate) {
            // The update was skipped, so create the service directly.
            Log.w('AddLive Plug-in update was skipped. Do this only if you ' +
                'know what you\'re doing.');
            _createService(listener);
          } else {
            // Do the update, then create the service and perform quick devices
            // initialisation.
            _updatePlugin(listener);
          }

        } else if (ADL._pluginInstance.pluginInstalled()) {
          // Plug-in is installed, but could not be loaded. This is because
          // the browser blocks it until the user gives the consent.

          listener.onInitStateChanged(new ADL.InitStateChangedEvent(
              ADL.InitState.USER_CONSENT_REQUIRED));
          ADL._pluginInstance.startPolling(_getPollingHandler(listener, true),
              ADL._platformOptions.pluginPollFrequency);
        } else {
          // Either the plug-in is not installed or we couldn't detect whether
          // it is installed. Request the user to do the installation.

          _getInstallURL(listener);
        }

      }
    } catch (exc) {
      listener.onInitProgressChanged(new ADL.InitProgressChangedEvent(100));
      listener.onInitStateChanged(new ADL.InitStateChangedEvent(
          ADL.InitState.ERROR, undefined, exc.code, exc.message));
    }
  };


  /**
   * Returns the AddLiveService created and initialized by the ADL.initPlatform.
   * If the AddLivePlatform was not initialized prior to calling this function,
   * it will return undefined value.
   *
   * @summary Returns the AddLiveService instance created using initPlatform.
   * @since 1.16.0.0
   * @see ADL.initPlatform
   * @returns {ADL.AddLiveService}
   */
  ADL.getService = function () {
    return ADL._service;
  };

  /**
   * Disposes the previously initialized AddLive Platform. Internally it
   * deletes the AddLive Service instance and removes the object tag from DOM.
   *
   * @summary Disposes the previously initialized AddLive Platform.
   * @since 1.17.1
   * @see ADL.initPlatform
   */
  ADL.disposePlatform = function () {
    if (ADL._service === undefined) {
      return;
    }
    Log.d('Disposing platform');
    if (ADL._usesWebRTC) {
      ADL.MediaEngine.dispose();
    } else {
      ADL.CrashHandler.dispose();
      _unloadPlugin();
      delete ADL._pluginInstance;
    }
    delete ADL._service;
  };

  /**
   * Listener interface for handling platform initialization events.
   *
   * @summary Listener interface for handling platform initialization events.
   * @since 1.16.0.0
   * @see ADL.initPlatform
   * @constructor
   */
  ADL.PlatformInitListener = function () {
  };

  ADL.PlatformInitListener.prototype = {

    /**
     * Called whenever the initialization state changes.
     *
     * @summary Notifies about the change in init state.
     * @since 1.16.0.0
     * @see ADL.InitStateChangedEvent
     * @param {ADL.InitStateChangedEvent} event
     */
    onInitStateChanged:function (event) {
      Log.d('Got init state changed event: ' + JSON.stringify(event));
    },
    /**
     * Called whenever the initialization progress value changes.
     *
     * @summary Notifies about the change in init progress.
     * @since 1.16.0.0
     * @see ADL.InitProgressChangedEvent
     * @param {ADL.InitProgressChangedEvent} event
     */
    onInitProgressChanged:function (event) {
      Log.d('Got init progress changed event: ' + JSON.stringify(event));
    }

  };


  /**
   * Event describing change in the platform initialization state.
   *
   * @summary Event describing change in the platform initialization state.
   * @since 1.16.0.0
   * @extends ADL.AddLiveEvent
   * @see ADL.initPlatform
   * @see ADL.PlatformInitListener
   * @see ADL.InitState
   * @param {string} state
   *          new state of the initialization process
   * @param {string} [installerUrl]
   *          Installation URL - use this URL to show the install button.
   * @param {Number} [errCode]
   *          Optional error code, in case of state being ADL.InitState.ERROR
   * @param {string} [errMessage]
   *          Optional error message, in case of state being ADL.InitState.ERROR
   * @constructor
   */
  ADL.InitStateChangedEvent = function (state, installerUrl, errCode, errMessage) {

    /**
     * New initialization state
     *
     * @summary New initialization state.
     * @see ADL.InitState
     * @type {string}
     */
    this.state = state;

    /**
     * Optional error code. Defined only if the
     * {@link ADL.InitStateChangedEvent#state} is set to
     * {@link ADL.InitState.ERROR}
     *
     * @summary Optional error code
     * @type {Number}
     */
    this.errCode = errCode;

    /**
     * Optional error message. Defined only if the
     * {@link ADL.InitStateChangedEvent#state} is set to
     * {@link ADL.InitState.ERROR}
     *
     * @summary Optional error message
     * @type {string}
     */
    this.errMessage = errMessage;

    /**
     * Optional installation URL. Defined only if the state is set to
     * {@link ADL.InitState.INSTALLATION_REQUIRED}, and should be used as a href
     * in installation link/button.
     *
     * @summary Optional installation URL, defined when installation is required
     * @type {string}
     */
    this.installerURL = installerUrl;

    /**
     * Flag defining whether video capture device was properly initialized.
     * Defined only when the state is set to {@link ADL.InitState.INITIALIZED}.
     * @summary Flag defining whether video capture device was properly
     *          initialized.
     * @since 1.17.4
     * @type {Boolean}
     */
    this.videoCaptureDevFunctional = false;

    /**
     * Flag defining whether audio capture device was properly initialized.
     * Defined only when the state is set to {@link ADL.InitState.INITIALIZED}.
     *
     * @summary Flag defining whether audio capture device was properly
     *          initialized.
     *
     * @since 1.17.4
     * @type {Boolean}
     */
    this.audioCaptureDevFunctional = false;

    /**
     * Flag defining whether audio output device was properly initialized.
     * Defined only when the state is set to {@link ADL.InitState.INITIALIZED}.
     *
     * @summary Flag defining whether audio output device was properly
     *          initialized.
     * @since 1.17.4
     * @type {Boolean}
     */
    this.audioOutputDevFunctional = false;

    /**
     * @summary Flag defining whether the SDK uses underlaying WebRTC
     * implementation exposed by browser.
     * @since 3.0.0
     * @type {Boolean}
     */
    this.usesWebRTC = false;

  };
  //noinspection JSAccessibilityCheck
  ADL._extend(ADL.InitStateChangedEvent, ADL.AddLiveEvent);


  /**
   * Event describing change in AddLive Platform initialization progress.
   *
   * @summary Event describing change in AddLive Platform initialization
   *          progress.
   * @since 1.16.0.0
   * @see ADL.initPlatform
   * @see ADL.PlatformInitListener#onInitProgressChanged
   * @param {Number} progress
   * @constructor
   */
  ADL.InitProgressChangedEvent = function (progress) {

    /**
     * New progress value, with values in range [0;100].
     * @summary New progress value, with values in range [0;100].
     * @type {Number}
     */
    this.progress = progress;
  };

  /**
   * Enumeration listing all possible platform initialization states.
   *
   * @summary Enumerates all possible initialization states.
   * @since 1.16.0.0
   * @see ADL.initPlatform
   * @see ADL.PlatformInitListener#onInitStateChanged
   * @see ADL.InitStateChangedEvent
   * @enum {string}
   */
  ADL.InitState = {

    /**
     * Indicates that there was an error with platform initialization.
     */
    ERROR:'ERROR',

    /**
     * Indicates that the platform was successfully initialized.
     */
    INITIALIZED:'INITIALIZED',

    /**
     * Indicates that due to an auto update, the browser needs to be restarted.
     */
    BROWSER_RESTART_REQUIRED:'BROWSER_RESTART_REQUIRED',

    /**
     * Indicates that the AddLive Plug-in needs to be installed. It does not
     * break the initialization process, the platform will internally start
     * polling for the plug-in availability and when detected, will continue
     * with the initialization.
     */
    INSTALLATION_REQUIRED:'INSTALLATION_REQUIRED',

    /**
     * Indicates that the user has finished with the AddLive Plug-in
     * installation, and the platform continues to initialize itself.
     */
    INSTALLATION_COMPLETE:'INSTALLATION_COMPLETE',

    /**
     * Indicates that the AddLive Service self-update process has just begun.
     */
    UPDATE_BEGIN:'UPDATE_STARTED',

    /**
     * Indicates that the media devices initialisation process has just begun.
     */
    DEVICES_INIT_BEGIN:'DEVICES_INIT_BEGIN',

    /**
     * Indicates that the service failed to automatically update itself and
     * it cannot proceed with current version installed due to incompatibility
     * with the most recent streaming server. In this case it is required for
     * the service to be updated manually, using installer URL provided.
     *
     * Please note that this event has an default action associated - by default
     * if your application does not notify the platform that the event was
     * handled using the {@link ADL.AddLiveEvent#preventDefault}, it will show
     * tiny notification window asking the user to manually update the plug-in
     * using provided installer and restart all browsers using the plug-in.
     */
    NEEDS_MANUAL_UPDATE:'NEEDS_MANUAL_UPDATE',

    /**
     * Indicates that the plug-in is available, but the user needs to allow it
     * to run.
     *
     * @since 3.0.41
     */
    USER_CONSENT_REQUIRED:'USER_CONSENT_REQUIRED'

  };

  /**
   * ===========================================================================
   * Private helpers
   * ===========================================================================
   */

  /**
   *
   * @private
   */
  function _embedPluginContainer() {
    var id = 'addLivePluginContainer' + _generateRandomIdSuffix();
    ADL.Utils.embedInvisibleContainer(id);
    ADL._pluginContainerId = id;
  }

  /**
   *
   * @private
   */
  function _embedPlugin() {
    Log.d('Embedding the AddLive plugin inside a container with id: ' +
        ADL._pluginContainerId);
    ADL._pluginInstance = new ADL.AddLivePlugin(
        ADL._pluginContainerId,
        ADL._platformOptions);
    return ADL._pluginInstance.loadPlugin();
  }

  /**
   *
   * @param {ADL.PlatformInitListener} listener
   * @private
   */
  function _updatePlugin(listener) {

    //noinspection JSAccessibilityCheck
    var updateListener = new ADL.PluginUpdateListener();

    updateListener.updateProgress = function (progress) {
      var progressRange = Progress.UPDATE_END - Progress.UPDATE_BEGIN;
      var progressWeighted = Progress.UPDATE_BEGIN +
          (progressRange * progress / 100);
      this.initListener.onInitProgressChanged(
          new ADL.InitProgressChangedEvent(progressWeighted));
    };

    updateListener.updateStatus = function (status, errCode, errMsg) {
      var l = this.initListener;
      switch (status) {
        case 'UPDATING':
          _dispatchInitStateChanged(l,
              new ADL.InitStateChangedEvent(ADL.InitState.UPDATE_BEGIN));
          break;
        //noinspection FallthroughInSwitchStatementJS
        case 'UPDATED':
          ADL.Tracker.trackAction(ADL.TrackableAction.UPDATE_COMPLETE);
          _unloadPlugin();
          _embedPluginContainer();
          _embedPlugin();
          _createService(l);
          break;
        case 'UP_TO_DATE':
//        Plugin up to date - nothing needs to be done
          _createService(l);
          break;
        case 'UPDATED_RESTART':
//            Report that the initialization is complete
          _dispatchInitStateChanged(l,
              new ADL.InitStateChangedEvent(ADL.InitState.BROWSER_RESTART_REQUIRED),
              Progress.COMPLETE);
//        Plugin updated successfully but browser needs to be restarted
          break;
        case 'NEEDS_MANUAL_UPDATE':
        case 'ERROR':
          ADL.Tracker.trackAction(ADL.TrackableAction.UPDATE_ERROR);
          Log.w('Failed to update the plug-in.');
          _handleUpdateError(l, errMsg, errCode);

//        Failed to update the plugin.
          break;
        default:
          break;
      }

    };
    try {
      updateListener.initListener = listener;
      _dispatchInitStateChanged(listener, undefined, Progress.UPDATE_BEGIN);
      ADL.Tracker.trackAction(ADL.TrackableAction.UPDATE_STARTED);
      ADL._pluginInstance.update(updateListener);
    } catch (/** ADL.AddLiveException*/e) {
      listener.onInitStateChanged(
          new ADL.InitStateChangedEvent(
              ADL.InitState.ERROR, '', e.code, e.message));
    }
  }

  /**
   *
   * @param {ADL.PlatformInitListener} listener
   * @param errMsg
   * @param errCode
   * @private
   */
  function _handleUpdateError(listener, errMsg, errCode) {
    var service = null,
        minVersionSupported = null,
        installerUrl = null,
        installerDone = false;

    var _doHandleMaybe = function () {
      if (service && installerDone) {
        if (minVersionSupported === null || minVersionSupported === undefined) {
          Log.w('Failed to fetch the installer. Assuming service is fine.');
          minVersionSupported = '1.0.0.0';
        }
        var vInstalled = service.nativeService.version;
        if (_versionCmp(minVersionSupported, vInstalled) > 0) {
          // Minimal supported version is greater then currently installed one -
          // manual update required
          listener._updateFailed = true;
          var cause = ADL.Utils.errorToCause(errMsg, errCode);
          ADL.BugReporting.reportBug(ADL.r(), {
            type:'AER-UPDATE',
            cause:cause,
            /*jshint camelcase:false*/
            error_code:errCode});
          Log.e('Version installed is too old. Requesting user to auto update');
          if (installerUrl) {
            _handleManualUpdate(listener, installerUrl);
          } else {
            _dispatchInitStateChanged(listener,
                new ADL.InitStateChangedEvent(ADL.InitState.ERROR),
                Progress.COMPLETE);
          }
        } else {
          // Current version is greater then minimal supported - no need to
          // perform manual update
          // Proceed with the initialization;
          _createService(listener, service);
        }
      }
    };

    var updateDescrFetched = function (data) {
      installerUrl = data.url;
      minVersionSupported = '3.0.0.0';
      installerDone = true;
      _doHandleMaybe();
    }, updateDescrFetchErr = function () {
      installerDone = true;
      _doHandleMaybe();
    };

    var onServiceCreated = function (s) {
      service = s;
      _doHandleMaybe();
    }, onServiceCreateErr = function () {
      Log.e('Failed to create service to get the version.');
      service = {nativeService:{version:'0.0.0.0'}};
      _doHandleMaybe();
    };
    ADL.getInstallerURL(ADL.r(updateDescrFetched, updateDescrFetchErr));
    ADL._pluginInstance.createService(
        ADL.r(onServiceCreated, onServiceCreateErr));
  }

  /**
   *
   * @param {ADL.PlatformInitListener}listener
   * @param installerUrl
   * @private
   */
  function _handleManualUpdate(listener, installerUrl) {
    var e = new ADL.InitStateChangedEvent(ADL.InitState.NEEDS_MANUAL_UPDATE,
        installerUrl);
    _dispatchInitStateChanged(listener, e, Progress.COMPLETE);
  }

  function _versionCmp(versionA, versionB) {
    var partsA = versionA.split('.'),
        partsB = versionB.split('.');
    for (var i = 0; i < 3; i++) {
      var a = parseInt(partsA[i], 10),
          b = parseInt(partsB[i], 10);
      if (a > b) {
        return 1;
      } else if (b < a) {
        return -1;
      }
    }
    return 0;
  }

  function _getInstallURL(listener) {

    var succHandler = function (descr) {
          ADL.Tracker.trackAction(ADL.TrackableAction.INSTALLATION_STARTED);
          var onInstalledNotLoaded = function () {
            listener.onInitStateChanged(
                new ADL.InitStateChangedEvent(ADL.InitState.USER_CONSENT_REQUIRED));
          };

          _dispatchInitStateChanged(listener,
              new ADL.InitStateChangedEvent(
                  ADL.InitState.INSTALLATION_REQUIRED, descr.url));

          ADL._pluginInstance.startPolling(
              _getPollingHandler(listener),
              ADL._platformOptions.pluginPollFrequency,
              ADL.r(onInstalledNotLoaded));
        },
        errHandler = function (errCode, errMessage) {
          _dispatchInitStateChanged(
              listener,
              new ADL.InitStateChangedEvent(
                  ADL.InitState.ERROR, undefined, errCode, errMessage),
              Progress.COMPLETE);
        };

    ADL.getInstallerURL(ADL.createResponder(succHandler, errHandler));
  }

  function _dispatchInitStateChanged(listener, e, progress) {
    try {
      if (progress) {
        listener.onInitProgressChanged(
            new ADL.InitProgressChangedEvent(progress));
      }
      if (e) {
        listener.onInitStateChanged(e);
      }
    } catch (exc) {
      Log.w('Got an error in the init state change handler');
      if (exc.stack) {
        Log.w(exc.stack);
      }
    }
  }


  function _createService(listener, serviceMaybe) {
    _dispatchInitStateChanged(listener, undefined,
        Progress.CREATE_SERVICE);


    var createServiceResultHandler = function (service) {
      _dispatchInitStateChanged(listener, undefined,
          Progress.SERVICE_CREATED);

      if (service.nativeService === undefined ||
          service.nativeService === null) {
        _dispatchInitStateChanged(listener,
            new ADL.InitStateChangedEvent(
                ADL.InitState.ERROR, undefined,
                ADL.ErrorCodes.Logic.PLATFORM_INIT_FAILED,
                'Internal error occurred that caused the plug-in to return an ' +
                    'invalid AddLiveService'),
            Progress.COMPLETE);
        return;
      }
      if (service.nativeService.getLogFileTag === undefined) {
        _dispatchInitStateChanged(listener,
            new ADL.InitStateChangedEvent(
                ADL.InitState.ERROR, undefined,
                ADL.ErrorCodes.Logic.PLATFORM_INIT_FAILED,
                'Internal error occurred that caused the plug-in to return an ' +
                    'invalid AddLiveService'),
            Progress.COMPLETE);
        return;
      }

      /**
       *
       * @type {ADL.AddLiveService}
       * @private
       */
      ADL._service = service;
      //noinspection JSAccessibilityCheck
      ADL.CrashHandler.init(ADL._platformOptions);
      _setResolvers();
      _setAppIdMaybe();
      _initDevicesMaybe(listener);
      _storeDevices(service);
    };

    var createServiceErrorHandler = function (errCode, errMessage) {
      var cause = ADL.Utils.errorToCause(errMessage, errCode);
      Log.e('Failed to create service: ' + cause);
      ADL.BugReporting.reportBug(ADL.r(), {
        type:'AER-PLUGIN',
        cause:cause,
        /*jshint camelcase:false*/
        error_code:errCode});
      _dispatchInitStateChanged(listener,
          new ADL.InitStateChangedEvent(ADL.InitState.ERROR, undefined,
              errCode, errMessage), Progress.COMPLETE);
    };
    if (serviceMaybe) {
      createServiceResultHandler(serviceMaybe);
    } else {
      ADL._pluginInstance.createService(
          ADL.createResponder(
              createServiceResultHandler,
              createServiceErrorHandler
          )
      );
    }

  }


  /**
   * Fetches the update descriptor, parses it and returns an object containing
   * installer URL specific to user's particular platform, customized per
   * specified application and also an object containing the complete descriptor
   * (for advanced use only). The result is in form:
   * <pre><code>{
   *   url:'http://somehost.com/somepath/Somefile.exe',
   *   descriptor: {
   *     // Some other members
   *   }
   * }
   * </code></pre>
   *
   * @summary Returns URL of installer to be used when installing the plug-in.
   * @deprecated Since 2.0.0 Use the complete ADL.initPlatform functionality to
   *             perform the initialization, including plug-in installation.
   * @param {ADL.Responder} responder
   *          Responder that will receive the URL
   *
   */
  ADL.getInstallerURL = function (responder) {
    // This one is exposed only due to tests

    var ua = window.navigator.userAgent;
    //noinspection JSHint
    if (/MSIE.*Win64; x64/.test(ua)) {
      responder.error(ADL.ErrorCodes.Logic.PLATFORM_UNSUPPORTED,
          'Internet Explorer in \"64-bit\" or \"No Add-ons\" modes is not supported, please run the plain mode');
      return;
    }
    if (/Intel Mac OS X 10[._]5/.test(ua)) {
      responder.error(ADL.ErrorCodes.Logic.PLATFORM_UNSUPPORTED,
          'OS X 10.5 is not supported, please update to 10.6');
      return;
    }

    var installersRoot, url, defInstallerPath = '-1/AddLive.';
    if (/Windows/.test(ua)) {
      defInstallerPath += 'exe';
      installersRoot = ADL._PLUGIN_INSTALL_ROOT.win;
    } else if (/Intel Mac OS X 10[._][8-9]/.test(ua)) {
      defInstallerPath += 'dmg';
      installersRoot = ADL._PLUGIN_INSTALL_ROOT.mac;
    } else if (/Intel Mac OS X 10[._][6-7]/.test(ua)) {
      defInstallerPath += 'dmg';
      installersRoot = ADL._PLUGIN_INSTALL_ROOT.mac_106;
    } else {
      responder.error(ADL.ErrorCodes.Logic.PLATFORM_UNSUPPORTED,
          'Unsupported browser.');
      return;
    }
    if (
//      Application ID was specified
        ADL._platformOptions.applicationId !== undefined &&
//      Given application id has custom installer assigned
        ADL._APP_2_INSTALLER !== undefined &&
        ADL._APP_2_INSTALLER[ADL._platformOptions.applicationId]) {
      var installerId =
          ADL._APP_2_INSTALLER[ADL._platformOptions.applicationId];
      var platformSuffix = ADL._getPlatformSuffix();
      // In this context, mac is mac
      //noinspection JSHint
      platformSuffix = platformSuffix.replace(/mac.*/, 'mac');
      url = installersRoot +
          installerId + '/' +
          ADL._CUSTOM_INSTALLERS[installerId][platformSuffix];
    } else {
      url = installersRoot + defInstallerPath;
    }
    responder.result({url:url, descriptor:undefined});
  };

  function _initDevicesMaybe(listener) {
    if (ADL._platformOptions.initDevices) {
      _initDevices(listener);
      return;
    }

    // Normal flow - report init complete
    var initializedE =
        new ADL.InitStateChangedEvent(ADL.InitState.INITIALIZED);
    if (listener._updateFailed) {
      initializedE.updateFailed = true;
    }
    _dispatchInitStateChanged(listener, initializedE,
        Progress.COMPLETE);

  }

  function _setResolvers() {

  }

  /**
   *
   * Sets application id if specified in platform initialization options.
   *
   * Please note that at the moment, it depends on assumption that the
   * asynchronous calls are processed in order.
   *
   * TODO remove the assumption
   * @private
   */
  function _setAppIdMaybe() {

    if (ADL._platformOptions.applicationId) {
      var succHandler = function () {
        Log.d('Successfully configured the application id');
      }, errHandler = function (errCode, errMsg) {
        Log.e('Error settings the application id.');
        Log.e('Cause: ' + errMsg + ' (errCode: ' + errCode + ')');
      };
      var resolvers = ADL._platformOptions.streamerEndpointResolver;

      ADL._service.setProperty(ADL.r(),
          'global.service.streamer.endpointResolver', resolvers);
      ADL._service.setApplicationId(
          ADL.r(succHandler, errHandler),
          ADL._platformOptions.applicationId);
    }
  }

  function _initDevices(listener) {
    _dispatchInitStateChanged(listener,
        new ADL.InitStateChangedEvent(ADL.InitState.DEVICES_INIT_BEGIN),
        Progress.SERVICE_CREATED);
    var stepsToComplete = 3;
    listener._currentProgress = Progress.SERVICE_CREATED;
    var stateChangedEvent =
        new ADL.InitStateChangedEvent(ADL.InitState.INITIALIZED);
    var stepComplete = function (devType, succ) {
      stepsToComplete--;
      stateChangedEvent[devType + 'DevFunctional'] = succ;
      if (stepsToComplete === 0) {
        delete listener._currentProgress;
        if (listener._updateFailed) {
          stateChangedEvent.updateFailed = true;
        }
        _dispatchInitStateChanged(listener, stateChangedEvent,
            Progress.COMPLETE);

      } else {
        listener._currentProgress += 5;
        _dispatchInitStateChanged(listener, undefined,
            listener._currentProgress);
      }
    };
    //noinspection JSAccessibilityCheck
    _configDeviceOfType('VideoCapture',
        ADL._CAM_CONFIG_KEY, stepComplete);

    //noinspection JSAccessibilityCheck
    _configDeviceOfType('AudioCapture',
        ADL._MIC_CONFIG_KEY, stepComplete);

    //noinspection JSAccessibilityCheck
    _configDeviceOfType('AudioOutput',
        ADL._SPK_CONFIG_KEY, stepComplete);
  }

  function _configDeviceOfType(devType, storageProperty, stepComplete) {
    var getNamesMethod = 'get' + devType + 'DeviceNames';
    var setMethod = 'set' + devType + 'Device';
    var devFunctionalLabel = devType.substring(0, 1).toLowerCase() +
        devType.substring(1);
    ADL._service[getNamesMethod](
        ADL.createResponder(
            function (devs) {
              var configuredDev = window.localStorage[storageProperty];
              if (!(configuredDev && devs[configuredDev] !== undefined)) {
                for (var k in devs) {
                  // Make sure we're not selecting the AirPlay by default.
                  if (devs.hasOwnProperty(k) && devs[k] !== 'AirPlay') {
                    configuredDev = k;
                    window.localStorage[storageProperty] = configuredDev;
                    //noinspection BreakStatementJS
                    break;
                  }
                }
              }
              ADL._service[setMethod](
                  ADL.createResponder(
                      function () {
                        stepComplete(devFunctionalLabel, true);
                      },
                      function () {
                        stepComplete(devFunctionalLabel, false);
                      }
                  ),
                  configuredDev);
            },
            function (errCode, errMessage) {
              Log.w('Failed to initialize device of type: ' + devType +
                  ' due to: ' + errMessage + '(' + errCode + ')');
              stepComplete();
            }

        )
    );
  }

  /**
   * @return {String}
   */
  function _generateRandomIdSuffix() {
    return Math.random().toString(36).substring(2, 5);
  }

  /**
   *
   * @param {ADL.PlatformInitListener} listener
   * @return {Function}
   * @private
   */
  function _getPollingHandler(listener, requiresUpdate) {
    return function () {
      if(requiresUpdate) {
        _updatePlugin(listener);
      } else {
        ADL.Tracker.trackAction(ADL.TrackableAction.
            INSTALLATION_COMPLETE);
        _dispatchInitStateChanged(listener, new ADL.InitStateChangedEvent(
            ADL.InitState.INSTALLATION_COMPLETE), Progress.INSTALLED);
        _createService(listener);
      }

    };
  }

  function _storeDevices(service) {
    service.getHostCpuDetails(ADL.r(function (details) {
      devices.CPU = details.brand_string;
    }));
    service.getVideoCaptureDeviceNames(ADL.r(function (devs) {
      devices.videoCapture = devs;
    }));
    service.getAudioCaptureDeviceNames(ADL.r(function (devs) {
      devices.audioCapture = devs;
    }));
    service.getAudioOutputDeviceNames(ADL.r(function (devs) {
      devices.audioOutput = devs;
    }));
  }

  /**
   *
   * @private
   */
  function _validatePlatformOptions(options) {
    if (options === undefined) {
      return;
    }
    var msg;
    if (options.pluginPollFrequency !== undefined) {
      var originalPollValue = options.pluginPollFrequency;
      options.pluginPollFrequency = parseInt(originalPollValue, 10);
      if (isNaN(options.pluginPollFrequency) ||
          options.pluginPollFrequency < 0) {
        msg = 'Invalid initialization options object - invalid ' +
            'pluginPollFrequency property value: ' + originalPollValue;
        throw new ADL.AddLiveException(
            msg,
            ADL.ErrorCodes.Logic.INVALID_ARGUMENT);
      }
    }
    if (options.applicationId !== undefined) {
      var originalAppId = options.applicationId;

      options.applicationId = parseInt(originalAppId, 10);
      if (isNaN(options.applicationId)) {
        msg = 'Invalid initialization options object - invalid ' +
            'application id property value: ' + originalAppId +
            '. Number expected';
        throw new ADL.AddLiveException(
            msg,
            ADL.ErrorCodes.Logic.INVALID_ARGUMENT);
      }
    }
  }

  function _unloadPlugin() {
    ADL._pluginInstance.unload();
    var pContainer = document.getElementById(ADL._pluginContainerId);
    pContainer.parentNode.removeChild(pContainer);

    // Remove all renderers
    var renderers = document.getElementsByTagName('object');
    for (var i = 0; i < renderers.length; i++) {
      var renderer = renderers[i];
      if (renderer.addLiveRenderer) {
        renderer.parentNode.removeChild(renderer);
      }
    }

  }

  function _applyLazyInitDefaultConfiguration() {
    var defaultConfig = ADL._STATIC_CONFIG.DEFAULT_PLATFORM_INIT_OPTIONS;
    defaultConfig.configUrl = ADL._CONFIG_URL;
    defaultConfig.bugReportingEndpoint =
        ADL._BUG_REPORTING_ENDPOINT;
    defaultConfig.logsReportingEndpoint =
        ADL._LOGS_REPORTING_ENDPOINT;
    defaultConfig.streamerEndpointResolver =
        ADL._STREAMER_ENDPOINT_RESOLVER;
    defaultConfig.trackingEndpoint =
        ADL._TRACKING_ENDPOINT;
  }

  function _initPlatformOptions(options) {
    var defaultConfig = ADL._STATIC_CONFIG.DEFAULT_PLATFORM_INIT_OPTIONS;
    defaultConfig.infrastructureVersion = ADL.VERSION;
    ADL._platformOptions = {};
    ADL.Utils.merge(ADL._platformOptions, defaultConfig);
    ADL._platformOptions.updateDescriptorRoot = ADL._PLUGIN_UPDATE_ROOT;
    ADL._platformOptions.installationDescriptorRoot = ADL._PLUGIN_INSTALL_ROOT;

//    Platform configuration setup
    if (options) {
      //    Overwrite only defined properties
      ADL.Utils.merge(ADL._platformOptions, options);
    }

  }

  // Exports
  ADL._devices = devices;
}());
/**
 * Copyright (C) SayMama Ltd 2011
 *
 * All rights reserved. Any use, copying, modification, distribution and selling
 * of this software and it's documentation for any purposes without authors'
 * written permission is hereby prohibited.
 */

(function () {
  'use strict';

  /**
   * Base class for all native plugin wrappers. Based on given configuration
   * defines routines for checking presence and embedding.
   *
   * @summary Base class for all native plugin wrappers.
   * @private
   * @since 1.0.0.0
   * @constructor
   *
   * @param {Object} configuration
   *           Configuration object - describes the plugin to wrap
   * @param {string} configuration.mimeType
   *           mime type of plugin to load
   * @param {string} configuration.classId
   *           Id of ActiveX component class to load under IE
   * @param {string} configuration.testMethod
   *           Name of method to be used when checking if plug-in was loaded
   *           correctly
   * @param {Number} [configuration.pollInterval = 500]
   *           Name of method to be used when checking if plug-in was loaded
   *           correctly
   */
  ADL.PluginWrapper = function (configuration) {
//  Copy configuration
    this.mimeType = configuration.mimeType;
    this.classId = configuration.classId;
    this.testMethod = configuration.testMethod;

//  Initial rest of internal properties
    this.objectId = this.generateObjectTagId();
    this.params = {};
    this.attributes = {};
    this.polling = false;
    this.width = 0;
    this.height = 0;
  };


  /**
   *  Initializes process of polling for plug-in.
   *
   *  @param {Function} readyHandler
   */
  ADL.PluginWrapper.prototype.startPolling = function (
      readyHandler, pollInterval, installedHandler) {
    this.pollingCompleteHandler = readyHandler;
    this.installedHandler = installedHandler;
    if (this.polling) {
      return;
    }
    this.polling = true;
    this._pollInterval = pollInterval || 1000;
    this._startPolling();
  };

  //noinspection JSUnusedGlobalSymbols
  /**
   *  Stops process of polling for plug-in.
   */
  ADL.PluginWrapper.prototype.stopPolling = function () {
    clearTimeout(this.pollingTimer);
  };

  /**
   *  Tries  to unload plug-in, by removing object tag.
   */
  ADL.PluginWrapper.prototype.unload = function () {
    ADL.Log.d('[PluginWrapper] Trying to unload plug-in');
    var pluginContainerId = this.pluginContainerId;
    if (!pluginContainerId) {
      ADL.Log.e('[PluginWrapper] Cannot unload plug-in: pluginContainerId ' +
          'was not specified');
    }
    ADL.Log.d('[PluginWrapper] Removing OBJECT tag');

    ADL.Utils.removeChildNodes(document.getElementById(this.pluginContainerId));
    ADL.Log.d('[PluginWrapper] OBJECT tag removed from DOM');
  };


  /**
   *  Tries to load plug-in, by embedding object tag.
   *
   *  @return {boolean}
   *             True if plugin was successfully loaded, false otherwise.
   */
  ADL.PluginWrapper.prototype.loadPlugin = function () {
    ADL.Log.d('[PluginWrapper] Trying to embed plug-in');
    try {
      navigator.plugins.refresh();
    } catch (e) {
      ADL.Log.d('Failed to refresh ' + e);
    }
    ADL.Log.d('[PluginWrapper] Setting up OBJECT tag');
    return this._loadByMime(this.mimeType);
  };

  /*
   * =============================================================================
   * Private methods
   * =============================================================================
   */


  ADL.PluginWrapper.prototype.generateObjectTagId = function () {
    var text = 'plugin_';
    var possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  /**
   * Checks whether plug-in is installed or not.
   * @private
   * @return {boolean|null}
   */
  ADL.PluginWrapper.prototype.pluginInstalled = function () {
    try {
      if (window.navigator.plugins.length) {
        var self = this;
        for (var i = 0; i < window.navigator.plugins.length; i++) {
          var plugin = window.navigator.plugins[i];
          for (var j = 0; j < plugin.length; j++) {
            var mimeType = plugin[j];
            if (mimeType.type === self.mimeType) {
              return true;
            }
          }
        }
        return false;
      }
    } catch (e) {
      ADL.Log.w(
          'Failed to check whether the plug-in is installed or not: ' + e);
    }
    return null;
  };

  /**
   *  @private
   */
  ADL.PluginWrapper.prototype._startPolling = function () {
    var self = this;
    this.pollingTimer = setTimeout(function () {
      self._pollForPlugin();
    }, this._pollInterval);
  };

  /**
   * @private
   */
  ADL.PluginWrapper.prototype._pollForPlugin = function () {
    ADL.Log.d('[PluginWrapper] Polling for plug-in...');
    var loadStatus = this.loadPlugin();
    if (loadStatus) {
      ADL.Log.d('[PluginWrapper] Plugin loaded, notifying listener');
      this.pollingCompleteHandler();
    } else {
      if(this.installedHandler &&   // if we have the installed handler
          this.pluginInstalled() && // and the plug-in is installed
          !this.installedReported) {  // and we haven't reported it earlier
        this.installedHandler.result();
        this.installedReported = true;
      }

      ADL.Log.d('[PluginWrapper] failed to load the plug-in, retrying');
      this._startPolling();
    }
  };


/**
 *
 * @param mimeType
 * @return {boolean}
 * @private
 */
ADL.PluginWrapper.prototype._loadByMime = function (mimeType) {
  if (!this.pluginContainerId) {
    ADL.Log.e('[PluginWrapper] Cannot embed plug-in: pluginContainerId ' +
        'was not specified');
    return false;
  }
  ADL.Log.d('[PluginWrapper] Resetting innerHTML of container');
  var container = document.getElementById(this.pluginContainerId);
  //noinspection InnerHTMLJS

  container.innerHTML = this._getObjectTag(mimeType);
  if (container && container.children && container.children[0]) {
    var objectNode = getPluginNode(container);
    if (!objectNode.nodeName) {
      objectNode.nodeName = 'object';
    }
  }
  ADL.Log.d('[PluginWrapper] OBJECT tag added to DOM. Testing for' +
      ' method: ' + this.testMethod);
  this.pluginInstance = document.getElementById(this.objectId);
  var result = (this.testMethod === null ||
      this.testMethod in this.pluginInstance);
  if (!result) {
    ADL.Log.d('[PluginWrapper] Plugin ' + this.mimeType +
        ' seems not to be installed');
  }
  return result;
};

function getPluginNode(container) {
  return container.children[0];
}

/**
 * Builds object tag which should be used to embed the plug-in.
 *
 * @param {string} mimeType
 *          Mime-Type of plug-in to be embed.
 * @return {string}
 *          Content of the object tag.
 * @private
 */
ADL.PluginWrapper.prototype._getObjectTag = function (mimeType) {
  var attrString = '';
  var k;
  for (k in this.attributes) {
    if (this.attributes.hasOwnProperty(k)) {
      attrString += k + '="' + this.attributes[k] + '" ';
    }
  }
  var tagContent =
      '<object type="' + mimeType + '" id="' + this.objectId + '" ' +
          'width="1" height="1"' + attrString + '>';
  for (k in this.params) {
    if (this.params.hasOwnProperty(k)) {
      tagContent += '<param name="' + k + '" value="' + this.params[k] + '"/>';
    }
  }
  //noinspection StringLiteralBreaksHTMLJS
  tagContent += '  </object>';
  return tagContent;
};


/**
 * ============================================================================
 *                         AddLivePlugin
 * ============================================================================
 */


/**
 * Wrapper for the AddLive Plug-in.
 *
 * @deprecated Since 1.16.0.0 use the new ADL.initPlatform facility.
 * @private
 * @since 1.0.0.0
 * @see ADL.initPlatform
 * @constructor
 * @augments ADL.PluginWrapper
 * @param {string} pluginContainerId
 *           id of the HTML element where plug-in OBJECT tag should be embedded.
 *           This element must be statically defined in the DOM (i.e. it cannot
 *           be appended dynamically with JavaScript).
 * @param {Object} [options]
 *          Additional options object, for fine tune the embed behaviour.
 * @param {Boolean} [options.useProxy=true]
 *          Boolean flag defining whether the proxy auto-detection should be
 *          enabled or not. By default this feature is enabled. __Note!__
 *          This is an advanced feature. Use it only if you know what you are
 *          doing.
 */
ADL.AddLivePlugin = function (pluginContainerId, options) {
  this.pluginContainerId = pluginContainerId;
  if (options) {
    if (options.useProxy === undefined) {
      options.useProxy = true;
    }
    this.params.useproxy = options.useProxy;
    this.attributes.useproxy = options.useProxy;
  }
};

/**
 * Configuration of the AddLive Plug-In.
 *
 * @const
 * @type {Object}
 */
var ADDLIVE_PLUGIN_CONFIG = {
  mimeType:'application/x-addliveplugin-v3',
  classId:'clsid: 051e3002-6ebb-5b93-9382-f13f091b2ab2',
  testMethod:'createService'
};

ADL.AddLivePlugin.prototype = new ADL.PluginWrapper(ADDLIVE_PLUGIN_CONFIG);
ADL.AddLivePlugin.prototype.constructor = ADL.AddLivePlugin;


/**
 * ============================================================================
 *                            Public API
 * ============================================================================
 */

/**
 * Creates a AddLive Service.
 *
 * @see AddLiveService
 * @param {ADL.Responder} responder
 *           Responder object that will receive resulting responder or will
 *           handle an error
 */
ADL.AddLivePlugin.prototype.createService = function (responder) {
  ADL.Log.d('[AddLivePlugin] Creating new plug-in service instance');
  responder._realResultHandler = responder.result;

  responder.result = function (service) {
    if (service.init !== undefined) {
      service = new ADL.ServiceWrapper(service);
    }
    service = new ADL.AddLiveService(service);

    /**
     *
     * @type {ADL.AddLiveService}
     * @private
     */
    ADL._service = service;
    this._realResultHandler(service);
  };
  responder.setMethod('createService()');
  this.pluginInstance.createService(responder);
};


/**
 * Tries to self-update the AddLive Plug-in.
 *
 * @param {ADL.PluginUpdateListener} listener
 *           Listener for update events.
 * @param {string=} url
 *           URL pointing to the update descriptor which should be used with
 *           the update.
 */
ADL.AddLivePlugin.prototype.update = function (listener, url) {
  ADL.Log.d('[AddLivePlugin] Updating plug-in');
  if (!url) {
    var platformSuffix = ADL._getUpdateDescriptorSuffix(),

    // The replace here is because on OS X 10.6 platformSuffix is mac_10.6
    // which is already populated in the update descriptors, but the
    // _PLUGIN_UPDATE_ROOT uses max_106
        updateRoot = ADL._PLUGIN_UPDATE_ROOT[platformSuffix.replace(/\./g, '')];
    url = updateRoot + ADL._UPDATE_DESCRIPTOR_NAME + platformSuffix;
  }
  _validateUpdateListenerMethod(listener, 'updateProgress');
  _validateUpdateListenerMethod(listener, 'updateStatus');
  if (this.pluginInstance.updateCS === undefined) {
//      Use older method if prototype-safe alias doesn't exist.
    this.pluginInstance.update(listener, url);
  } else {
//      Use new alias if exists
    this.pluginInstance.updateCS(listener, url);
  }
};


/**
 * Returns tag of log file currently used by the AddLive Plug-in API.
 *
 * @return {string|null}
 *            tag of log file currently used by the AddLive Plug-in API.
 *            Null, if it is impossible to obtain the logs tag.
 */
ADL.AddLivePlugin.prototype.getLogFileTag = function () {
  ADL.Log.d('[AddLivePlugin] Retrieving container log file tag');
  if (this.pluginInstance.getLogFileTag === undefined) {
    return null;
  }
  return this.pluginInstance.getLogFileTag();
};

/**
 * Returns content of the AddLive Plug-In or service log file with given tag.
 * The content returned is a base64-encoded String.
 *
 * @param {string} tag
 *           Tag of logs to obtain.
 * @param {Number} [offset]
 *           Optional file offset.
 * @return {string|null}
 *           Content of the log file or null if it is impossible to obtain the
 *           log contents.
 */
ADL.AddLivePlugin.prototype.getLogFileByTag = function (tag, offset) {
  ADL.Log.d('[AddLivePlugin] Retrieving log file by tag ' + tag);
  if (this.pluginInstance.getLogFileByTag === undefined) {
    return '';
  }
  return this.pluginInstance.getLogFileByTag(tag, offset);
};


ADL.AddLivePlugin.prototype.getLogFileByTagMemSafe = function (tag, offset, resultContainer) {
  ADL.Log.d('[AddLivePlugin] Retrieving log file by tag ' + tag);
  if (this.pluginInstance.getLogFileByTagMemSafe !== undefined) {
    this.pluginInstance.getLogFileByTagMemSafe(tag, offset, resultContainer);
  }
};

/**
 * ============================================================================
 *                       PluginUpdateListener
 * ============================================================================
 */

/**
 * Listener class for events related to plugin updating - progress and status
 * reporting.
 *
 * @since 1.0.0.0
 * @deprecated Since 1.16.0.0 use the new ADL.initPlatform facility.
 * @see ADL.initPlatform
 * @constructor
 * @private
 */
ADL.PluginUpdateListener = function () {
};

/**
 * Called whenever update process increases the progress of self.
 *
 * @param {Number} progress
 *           New updating progress, in range 0-100.
 */
ADL.PluginUpdateListener.prototype.updateProgress = function (progress) {
  ADL.Log.d('Got new update progress: ' + progress);
};

/**
 * Called whenever the status of the update process changes.
 *
 * @param {string} newStatus
 *           Type of the new state. Can be any of: 'UPDATING', 'UPDATED',
 *           'UP_TO_DATE', 'UPDATED_RESTART', 'NEEDS_MANUAL_UPDATE', 'ERROR'.
 * @param {Number=} errCode
 *           Optional error code, if the newStatus is 'ERROR'
 * @param {string=} errMessage
 *           Optional, human-friendly error message, if the newStatus is 'ERROR'
 */
ADL.PluginUpdateListener.prototype.updateStatus =
    function (newStatus, errCode, errMessage) {
      ADL.Log.d('Got update state changed event: ' + newStatus + ' ' +
          errCode + ' ' + errMessage);
    };

/**
 *
 * @param listener
 * @param method
 * @private
 */
function _validateUpdateListenerMethod(listener, method) {
  if (listener[method] === undefined ||
      typeof listener[method] !== 'function') {
    throw new ADL.AddLiveException(
        'Invalid update listener - ' + method + ' method is missing or not a ' +
            'function',
        ADL.ErrorCodes.Logic.INVALID_ARGUMENT);
  }
}

}());/**
 * Copyright (C) SayMama Ltd 2012
 *
 * All rights reserved. Any use, copying, modification, distribution and selling
 * of this software and it's documentation for any purposes without authors'
 * written permission is hereby prohibited.
 */

/**
 * @fileoverview
 * Single class source - contains definition of the AddLiveService class.
 *
 * @author Tadeusz Kozak
 * @date 28-05-2012 16:06
 */


(function () {
  'use strict';

  // Imports
  //noinspection JSAccessibilityCheck
  var Log = ADL.Log;


  /**
   * Class wrapping the native AddLive Service object. It's main use case is to
   * easily define available API and aid the developer with some debugging tools
   * (logging).
   *
   * @summary Wrapper for the native AddLive Service object. Offers the core
   *          functionality.
   * @since 1.0.0.0
   * @param {Object} nativeService
   *          Native service object, as returned by the AddLive Plug-in
   * @constructor
   */
  ADL.AddLiveService = function (nativeService) {
    this.nativeService = /** ADL.AddLiveService*/ nativeService;

    /**
     * @private
     * @type {number}
     */
    this.serviceid = nativeService.serviceid;

    /**
     * Version of the AddLive Service.
     *
     * @since 2.0.0
     * @summary Version of the AddLive Service
     * @type {String}
     */
    this.version = nativeService.version;

    /**
     * Map of active connections
     * @type {Object}
     * @private
     */
    this._activeConnections = {};
    // Fake connLostHandler for clients using it :|
    //noinspection JSUnusedGlobalSymbols
    this.connLostHandler = {};

    this.internalEventsHandler = new ADL.AddLiveServiceListener();
    var self = this;


    this.internalEventsHandler.onUserEvent = function (e) {
      e._defaultHandlings += 1;
      var conn = self._activeConnections[e.scopeId];
      //noinspection JSUnresolvedFunction
      conn._onUserEvent(e);
    };

    this._cams = {};
    this._spkrs = [];
    this._mics = [];
    this.addServiceListener(ADL.r(), this.internalEventsHandler);
  };

  /**
   * Returns a version of the plug-in currently used.
   * Example result: '1.15.0.2'.
   *
   *
   * #### Possible errors:
   *
   * - {@link ADL.ErrorCodes.Common.DEFAULT_ERROR}<br/>
   *   If an unexpected, internal error occurs
   *
   * @summary Returns a version of the plug-in currently installed.
   * @since 1.0.0.0
   * @example
   * function showVersion() {
   *   var onVersion = function(version) {
   *     alert('AddLive plug-in version: ' + version);
   *   };
   *   ADL.getService().getVersion(ADL.r(onVersion));
   * }
   *
   * @param {ADL.Responder} responder
   *          Responder object. See calling AddLive plug-in service methods.
   **/
  ADL.AddLiveService.prototype = {
    getVersion:function (responder) {
      var method = 'getVersion()';
      try {
        Log.d('Getting service version');
        ADL.Responder.validate(responder);
        responder.setMethod(method);
        responder.sendAERonError(true);
        this.nativeService.getVersion(responder);
      } catch (exception) {
        _reportJSError(method, exception, responder);
      }

    },

    /**
     * Sets an id of web application using the SDK. Required when making
     * authorized connection request.
     *
     * #### Possible errors:
     *
     * - {@link ADL.ErrorCodes.Common.DEFAULT_ERROR}<br/>
     *   If an unexpected, internal error occurs
     *
     * @summary Sets an id of web application using the SDK.
     * @since 1.0.0.0
     * @deprecated Use {@link ADL.initPlatform} and applicationId provided in init
     *             configuration instead.
     *
     * @param {ADL.Responder} responder
     *          Responder object. See calling AddLive plug-in service methods.
     * @param {Number} appId
     *          Application id to be set.
     **/
    setApplicationId:function (responder, appId) {
      var mName = 'setApplicationId(' + appId + ')';
      try {
        Log.d('Setting application id');

        ADL.Responder.validate(responder);
        responder.setMethod(mName);
        responder.sendAERonError(true);
        ADL.Utils.validate(responder, 'appId|defined,number', appId);
        this.nativeService.setApplicationId(responder, appId);
      } catch (exception) {
        _reportJSError(mName, exception, responder);
      }
    },

    /**
     * Requests the service to fetch the runtime configuration. Use it only if
     * you know what you're doing.
     *
     * #### Possible errors:
     *
     * - {@link ADL.ErrorCodes.Common.DEFAULT_ERROR}<br/>
     *   If an unexpected, internal error occurs
     *
     * @summary Requests the service to fetch the runtime configuration.
     * @since 1.19.0.5
     *
     * @param {ADL.Responder} responder
     *          Responder object. See calling AddLive plug-in service methods.
     * @param {string} configUrl
     *          URL pointing to the configuration file
     **/
    fetchConfig:function (responder, configUrl) {
      var mName = 'fetchConfig(' + configUrl + ')';
      try {
        Log.d('Fetching configuration from URL: ' + configUrl);
        ADL.Responder.validate(responder);
        responder.setMethod(mName);
        responder.sendAERonError(true);
        if (!ADL.Utils.validate(responder, 'configUrl|defined,string,nonEmpty',
            configUrl)) {
          return;
        }
        this.nativeService.fetchConfig(responder, configUrl);
      } catch (exception) {
        _reportJSError(mName, exception, responder);
      }
    },


    /**
     * Registers an AddLive Service listener. Listener provided here should subclass
     * the provided ADL.AddLiveServiceListener stub and implement required methods.
     *
     * #### Possible errors:
     *
     * - {@link ADL.ErrorCodes.Common.DEFAULT_ERROR}<br/>
     *   If an unexpected, internal error occurs.
     *
     * @summary Registers a AddLive Service listener.
     * @since 1.0.0.0
     * @example
     * function initMicActivityListener() {
   *   var listener = new ADL.AddLiveServiceListener();
   *   listener.onMicActivity = function(e) {
   *     alert('Got new mic activity: ' + e.activity);
   *   };
   *   ADL.getService().addServiceListener(listener);
   * }
     *
     * @param {ADL.Responder} responder
     *          Responder object. See calling AddLive plug-in service methods.
     * @param {ADL.AddLiveServiceListener} listener
     *          Listener to be registered.
     **/
    addServiceListener:function (responder, listener) {
      var mName = 'addServiceListener({...})';
      try {
        ADL.Responder.validate(responder);
        Log.d('Calling plugin method addServiceListener({...})');
        responder.setMethod(mName);
        responder.sendAERonError(true);
        this.nativeService.addServiceListener(responder, listener);
      } catch (exception) {
        _reportJSError(mName, exception, responder);
      }
    },

    /**
     * Deregisters an AddLive Service listener. Listener provided here should subclass
     * the provided ADL.AddLiveServiceListener stub and implement required methods.
     *
     * #### Possible errors:
     *
     * - {@link ADL.ErrorCodes.Common.DEFAULT_ERROR}<br/>
     *   If an unexpected, internal error occurs.
     *
     * @summary Deregisters a AddLive Service listener.
     * @since 3.1.9
     *
     * @param {ADL.Responder} responder
     *          Responder object. See calling AddLive plug-in service methods.
     * @param {ADL.AddLiveServiceListener} listener
     *          Listener to be deregistered.
     **/
    removeServiceListener:function (responder, listener) {
      var mName = 'removeServiceListener({...})';
      try {
        ADL.Responder.validate(responder);
        Log.d('Calling plugin method ' + mName);
        responder.setMethod(mName);
        responder.sendAERonError(true);
        this.nativeService.removeServiceListener(responder, listener);
      } catch (exception) {
        _reportJSError(mName, exception, responder);
      }
    },


    /**
     * Returns an object completely describing user's computer CPU details.
     * This method is useful when checking if user's hardware is strong enough
     * to meet criteria of the AddLive Plug-in.
     *
     * #### Example result:
     *
     * <pre>
     * {
     *   brand_string:'Intel(R) Core(TM) i5 CPU M 430 @ 2.27GHz',
     *   clock:2261,
     *   cores:4,
     *   extfamily:0,
     *   extmodel:2,
     *   family:6,
     *   model:5,
     *   stepping:2,
     *   vendor:'GenuineIntel'
     * }
     * </pre>
     *
     * #### Possible errors:
     *
     * - {@link ADL.ErrorCodes.Common.DEFAULT_ERROR}<br/>
     *   If an unexpected, internal error occurs.
     *
     * @summary Returns an object completely describing user's computer CPU
     *          details.
     * @since 1.0.0
     * @example
     * function showCpu() {
     *   var onCPU = function(cpuDetails) {
     *     alert('You have following CPU installed on your system: ' +
     *           cpuDetails.brand_string + '. Nice.');
     *     )
     *   };
     *   ADL.getService().getHostCpuDetails(ADL.r(onCPU));
     * }
     *
     * #### WebRTC Notice:
     *
     * This method is not supported in native WebRTC mode
     *
     * @param {ADL.Responder} responder
     *          Responder object. See calling AddLive plug-in service methods.
     */
    getHostCpuDetails:function (responder) {
      var mName = 'getHostCpuDetails()';
      try {
        Log.d('Calling plugin method getHostCpuDetails');
        ADL.Responder.validate(responder);
        responder.setMethod(mName);
        responder.sendAERonError(true);

        var resultAdapter = function (cpuInfo) {
          if (typeof cpuInfo === 'string') {
            return JSON.parse(cpuInfo);
          } else {
            return cpuInfo;
          }
        };
        responder.setResultAdapter(resultAdapter);
        this.nativeService.getHostCpuDetails(responder);
      } catch (exception) {
        _reportJSError(mName, exception, responder);
      }
    },

    /**
     * Returns a list of video capture devices plugged in to the user's computer.
     * The ids of devices returned by this function should be used when
     * configuring the video capture device. Note that the device ids are
     * permanently associated with given device. It means, that it is possible to
     * store id of device selected by the user and reuse it across multiple
     * sessions.
     *
     * #### Possible errors:
     *
     * - {@link ADL.ErrorCodes.Media.INVALID_VIDEO_DEV}<br/>
     *   May happen if there were errors on listing the devices on the OS-level.
     *   This may happen on OSX if there aren't any video devices plugged in or
     *   all devices are in use by other application.
     *
     * - {@link ADL.ErrorCodes.Common.DEFAULT_ERROR}<br/>
     *   if an unexpected, internal error occurs.
     *
     * #### Example result:
     *
     * <code>
     * {
   *   'a3d3184172d2eb9d38797d801348744ea22cb71b':'USB 2.0 Camera',
   *   'bda5ea04b3813b906540f967fed4fe17a566f2e1':'Logitech HD Webcam C510'
   * }
     * </code>
     *
     * @summary Returns a list of video capture devices plugged in to the user's
     *          computer.
     * @since 1.0.0.0
     * @see ADL.AddLiveService#setVideoCaptureDevice
     * @see ADL.AddLiveService#getVideoCaptureDevice
     * @example
     * function populateVideoCaptureDevices() {
   *   var onDevs = function (devs) {
   *   var $select = $('#camSelect');
   *   $select.empty();
   *   $.each(devs, function (devId, devLabel) {
   *     $('<option value="' + devId + '">' + devLabel + '</option>').
   *          appendTo($select);
   *   });
   *   ADL.getService().getVideoCaptureDeviceNames(ADL.r(onDevs));
   * }
   *
   * @param {ADL.Responder} responder
     *          Responder object. See calling AddLive plug-in service methods.
     **/
    getVideoCaptureDeviceNames:function (responder) {
      var mName = 'getVideoCaptureDeviceNames()';
      try {
        Log.d('Calling plugin method getVideoCaptureDeviceNames()');
        ADL.Responder.validate(responder);
        responder.setMethod(mName);
        responder.sendAERonError(true);
        var self = this;
        responder.setResultAdapter(function (input) {
          if(!input) {
            input = {};
          }
          self._cams = input;
          return input;
        });
        this.nativeService.getVideoCaptureDeviceNames(responder);
      } catch (exception) {
        _reportJSError(mName, exception, responder);
      }
    },

    /**
     * Sets the video capture device to be used. This method should be used
     * nevertheless the video capture device is used by application or not. It
     * configures the device in scope of the underlying AddLive Service.
     *
     *
     * Once set, the selected device will be used for local preview and publishing
     * video stream to all media scopes to which user is connected. It is also
     * possible to change the video device while in use (aka hot plug). The only
     * side effect that user may experience is short freeze of feed during the
     * change.
     *
     *
     * In case of error during device setup, the service will try to fall back
     * to previously functional device.
     *
     * #### Possible errors:
     *
     * - {@link ADL.ErrorCodes.Media.INVALID_VIDEO_DEV}<br/>
     *   This error code may indicate that the specified device id is either
     *   invalid (device with given id isn't plugged in at the moment of calling
     *   this method Plug-in failed to initialize the device. It may be either
     *   because the device is in use by different application or simply stopped
     *   working.
     *
     * - {@link ADL.ErrorCodes.Common.DEFAULT_ERROR}<br/>
     *   If an unexpected, internal error occurs.
     *
     * @summary Sets the video capture device to be used by the SDK.
     * @since 1.0.0.0
     * @see ADL.AddLiveService#getVideoCaptureDeviceNames
     * @see ADL.AddLiveService#getVideoCaptureDevice
     * @see ADL.AddLiveService#startLocalVideo
     * @see ADL.AddLiveService#connect
     * @example
     * function initVideoCamSelect() {
   *   var $select = $('#camSelect');
   *   $select.change(
   *     function() {
   *       ADL.getService().setVideoCaptureDevice(
   *        ADL.r(), $(this).val());
   *     }
   *   );
   * }
     *
     * @param {ADL.Responder} responder
     *          Responder object. See calling AddLive plug-in service methods.
     * @param {string} deviceId
     *          Id of video device to set.
     **/
    setVideoCaptureDevice:function (responder, deviceId) {
      var mName = 'setVideoCaptureDevice(' + deviceId + '/* ' +
          this._cams[deviceId] + ' */)';
      try {
        Log.d('Calling plugin method ' + mName);

        ADL.Responder.validate(responder);
        responder.setMethod(mName);
        if (!ADL.Utils.validate(responder, 'deviceId|defined,string,nonEmpty',
            deviceId)) {
          return;
        }

//        Wrap the original result handler to persist the devices configuration
//        state
        responder.setResultAdapter(function () {
          window.localStorage[ADL._CAM_CONFIG_KEY] = deviceId;
          ADL._videoDeviceFunctional = true;
        });
        this.nativeService.setVideoCaptureDevice(responder, deviceId);
      } catch (exception) {
        _reportJSError(mName, exception, responder);
      }
    },


    /**
     * Returns the identifier of currently configured video capture device. The
     * device is returned as a String, corresponding to device id returned by
     * getVideoCaptureDeviceNames() or an empty string if no device was configured
     * previously. Example result: 'a3d3184172d2eb9d38797d801348744ea22cb71b'.
     *
     * #### Possible errors:
     *
     * - {@link ADL.ErrorCodes.Common.DEFAULT_ERROR}<br/>
     *   If an unexpected, internal error occurs.
     *
     * @summary Returns the identifier of currently configured video capture
     *          device.
     * @since 1.0.0.0
     * @see ADL.AddLiveService#getVideoCaptureDeviceNames
     * @see ADL.AddLiveService#setVideoCaptureDevice
     * @example
     * function showCurrentVideoDev() {
   *   var onDev = function(devId) {
   *     alert('You\'re currently using a webcam with following id: ' + devId);
   *   };
   *   ADL.getService().getVideoCaptureDevice(ADL.r(onDev));
   * }
     * @param {ADL.Responder} responder
     *          Responder object. See calling AddLive plug-in service methods.
     **/
    getVideoCaptureDevice:function (responder) {
      var mName = 'getVideoCaptureDevice()';
      try {
        Log.d('Calling plugin method ' + mName);
        ADL.Responder.validate(responder);
        responder.setMethod(mName);
        responder.sendAERonError(true);
        this.nativeService.getVideoCaptureDevice(responder);
      } catch (exception) {
        _reportJSError(mName, exception, responder);
      }
    },


    /**
     * Returns a list of audio capture devices (microphones) plugged in to the
     * user's computer at the moment of call. The result is a JavaScript array
     * object, with human friendly device labels as values. Indexes of the
     * resulting array are to be used when configuring audio capture device.
     *
     * It is not guaranteed that indexes of devices are permanent across multiple
     * service sessions.
     *
     * #### Example result:
     *
     * <code>
     * [
     *   'Microphone (HD Webcam C510)',
     *   'Microphone (Realtek High Definition Audio)'
     * ]
     * </code>
     *
     * #### Possible errors:
     *
     * - {@link ADL.ErrorCodes.Media.INVALID_AUDIO_DEV}<br/>
     *   In case of an error with getting the amount of the devices.
     *
     * - {@link ADL.ErrorCodes.Common.DEFAULT_ERROR}<br/>
     *   If an unexpected, internal error occurs.
     *
     * @summary Returns a list of all available microphones.
     * @since 1.0.0.0
     * @see ADL.AddLiveService#setAudioCaptureDevice
     * @see ADL.AddLiveService#getAudioCaptureDevice
     * @see ADL.AddLiveService#getAudioOutputDeviceNames
     * @see ADL.AddLiveService#getVideoCaptureDeviceNames
     * @param {ADL.Responder} responder
     *          Responder object. See calling AddLive plug-in service methods.
     **/
    getAudioCaptureDeviceNames:function (responder) {
      var mName = 'getAudioCaptureDeviceNames()';
      ADL.Responder.validate(responder);
      try {
        Log.d('Calling plugin method ' + mName);
        responder.setMethod(mName);
        responder.sendAERonError(true);
        var self = this;
        responder.setResultAdapter(function (input) {
          if(!input) {
            input = [];
          }
          self._mics = input;
          return input;
        });
        this.nativeService.getAudioCaptureDeviceNames(responder);
      } catch (exception) {
        _reportJSError(mName, exception, responder);
      }
    },


    /**
     * Sets the audio capture device (microphone) to be used by the AddLive Service.
     * The device is configured using index of the array obtained from call to the
     * ADL.AddLiveService.getAudioCaptureDeviceNames method.
     *
     * #### Possible errors:
     *
     * - {@link ADL.ErrorCodes.Media.INVALID_AUDIO_IN_DEV}<br/>
     *   In case of invalid device index specified specified (less then 0, greater
     *   then the amount of devices installed) or if there were problem with
     *   enabling the device (e.g. device in use on Windows XP)
     *
     * - {@link ADL.ErrorCodes.Common.DEFAULT_ERROR}<br/>
     *   If an unexpected, internal error occurs.
     *
     * @summary Sets the microphone to be used by the AddLive Service.
     * @since 1.0.0.0
     * @see ADL.AddLiveService#getAudioCaptureDeviceNames
     * @see ADL.AddLiveService#getAudioCaptureDevice
     * @param {ADL.Responder} responder
     *          Responder object. See calling AddLive plug-in service methods.
     * @param {Number} deviceId
     *          index of device to set
     **/
    setAudioCaptureDevice:function (responder, deviceId) {
      var mName = 'setAudioCaptureDevice(' + deviceId + '/* ' +
          this._mics[deviceId] + ' */)';
      try {
        Log.d('Calling plugin method ' + mName);
        ADL.Responder.validate(responder);
        responder.setMethod(mName);
        responder.setResultAdapter(function () {
          window.localStorage[ADL._MIC_CONFIG_KEY] = deviceId;
        });
        responder.sendAERonError(true);
        if (!ADL.Utils.validate(responder, 'deviceId|defined,number', deviceId)) {
          return;
        }
        deviceId = deviceId + '';
        if (!this._handleYamahaCaseMaybe(responder, deviceId)) {
          this.nativeService.setAudioCaptureDevice(responder, deviceId);
        }
      } catch (exception) {
        _reportJSError(mName, exception, responder);
      }
    },

    /**
     * Method for handling issues with Yamaha PJP-20UR, where
     * setAudioCaptureDevice called before setAudioOutputDevice makes the
     * speakers unresponsive.
     *
     * This is a workaround until the real issue is solved on webrt side.
     * @param r
     * @param deviceId
     * @return {Boolean}
     * @private
     */
    _handleYamahaCaseMaybe:function (r, deviceId) {
      var devLbl = this._mics[deviceId];
      var YAMAHA_LBL_PATTERN = /Yamaha PJP-20UR/;

      // If the device is not "the one" just leave.
      if (!YAMAHA_LBL_PATTERN.test(devLbl)) {
        return false;
      }

      Log.w('Got the special Yamaha PJP-20UR device case');
      // Find speakers with the same label
      var spkId;
      for (var i = 0; i < this._spkrs.length; i++) {
        if (YAMAHA_LBL_PATTERN.test(this._spkrs[i])) {
          spkId = i;
          break;
        }
      }

      if (spkId) {
        // If we have found the speakers, configure them first
        var self = this,
            onSucc = function () {
              self.nativeService.setAudioCaptureDevice(r, deviceId);
            }, onErr = function () {
              self.nativeService.setAudioCaptureDevice(r, deviceId);
            };
        this.setAudioOutputDevice(ADL.r(onSucc, onErr), spkId);
        return true;
      } else {
        // If we haven't found them, just pass the flow to normal execution.
        return false;
      }

    },

    /**
     * Returns the index of currently configured audio capture device (microphone).
     * The value returned by this method is a Number, corresponding to index from
     * an array obtained from call to the
     * ADL.AddLiveService.getAudioCaptureDeviceNames method.
     *
     * #### Possible errors:
     *
     * - {@link ADL.ErrorCodes.Common.DEFAULT_ERROR}<br/>
     *   If an unexpected, internal error occurs.
     *
     * @summary Returns the index of currently configured microphone.
     * @since 1.0.0.0
     * @see ADL.AddLiveService#getAudioCaptureDeviceNames
     * @see ADL.AddLiveService#setAudioCaptureDevice
     * @param {ADL.Responder} responder
     *          Responder object. See calling AddLive plug-in service methods.
     **/
    getAudioCaptureDevice:function (responder) {
      var mName = 'getAudioCaptureDevice()';
      ADL.Responder.validate(responder);
      try {
        Log.d('Calling plugin method ' + mName);
        responder.setMethod(mName);
        responder.sendAERonError(true);
        this.nativeService.getAudioCaptureDevice(responder);
      } catch (exception) {
        _reportJSError(mName, exception, responder);
      }
    },


    /**
     * Returns a list of audio output devices (speakers, headphones) plugged in to
     * the user's computer at the moment of call. The result is a JavaScript array
     * object, with human friendly device labels as values. Indexes of the
     * resulting array are to be used when configuring the audio output device.
     *
     * It is not guaranteed that indexes of devices are permanent across multiple
     * service sessions.
     *
     * #### Example result:
     *
     * <code>
     * [
     *   'Speaker/HP (Realtek High Definition Audio)'
     *   'Headset Earphone (Sennheiser DECT)'
     * ]
     * </code>
     *
     * #### Possible errors:
     *
     * - {@link ADL.ErrorCodes.Media.INVALID_AUDIO_DEV}<br/>
     *   In case of an error with getting the amount of the devices.
     *
     * - {@link ADL.ErrorCodes.Common.DEFAULT_ERROR}<br/>
     *   If an unexpected, internal error occurs.
     *
     * @summary Returns all available audio output devices (speakers, headphones).
     * @since 1.0.0.0
     * @see ADL.AddLiveService#setAudioOutputDevice
     * @see ADL.AddLiveService#getAudioOutputDevice
     * @see ADL.AddLiveService#getAudioCaptureDeviceNames
     * @see ADL.AddLiveService#getVideoCaptureDeviceNames
     * @param {ADL.Responder} responder
     *          Responder object. See calling AddLive plug-in service methods.
     **/
    getAudioOutputDeviceNames:function (responder) {
      var mName = 'getAudioOutputDeviceNames()';
      ADL.Responder.validate(responder);
      try {
        Log.d('Calling plugin method ' + mName);
        responder.setMethod(mName);
        responder.sendAERonError(true);
        var self = this;
        responder.setResultAdapter(function (input) {
          if(!input) {
            input = [];
          }
          self._spkrs = input;
          return input;
        });
        this.nativeService.getAudioOutputDeviceNames(responder);
      } catch (exception) {
        _reportJSError(mName, exception, responder);
      }
    },


    /**
     * Sets the audio output device (speakers, microphone) to be used by
     * the service.
     *
     * #### Possible errors:
     *
     * - {@link ADL.ErrorCodes.Media.INVALID_AUDIO_IN_DEV}<br/>
     *   In case of invalid device index specified specified (less then 0, greater
     *   then the amount of devices installed) or if there were problem with
     *   enabling the device (e.g. device in use on Windows XP)!
     *
     * - {@link ADL.ErrorCodes.Common.DEFAULT_ERROR}<br/>
     *   If an unexpected, internal error occurs.
     *
     * @summary Sets the audio output device (speakers, microphone) to be used by
     *          the service.
     * @since 1.0.0.0
     * @see ADL.AddLiveService#getAudioOutputDeviceNames
     * @see ADL.AddLiveService#getAudioOutputDevice
     * @param {ADL.Responder} responder
     *          Responder object. See calling AddLive plug-in service methods.
     * @param deviceId index of device in array returned by the
     *         getAudioOutputDeviceNames() method
     *
     **/
    setAudioOutputDevice:function (responder, deviceId) {
      var mName = 'setAudioOutputDevice(' + deviceId + '/* ' +
          this._spkrs[deviceId] + ' */)';
      try {
        Log.d('Calling plugin method ' + mName);
        responder.setMethod(mName);
        responder.sendAERonError(true);
        //noinspection JSUndefinedPropertyAssignment
        responder.setResultAdapter(function () {
          window.localStorage[ADL._SPK_CONFIG_KEY] = deviceId;
        });
        deviceId = deviceId + '';
        this.nativeService.setAudioOutputDevice(responder, deviceId);
      } catch (exception) {
        _reportJSError(mName, exception, responder);
      }
    },


    /**
     * Returns the index of currently configured audio output device.
     *
     * #### Possible errors:
     *
     * - {@link ADL.ErrorCodes.Common.DEFAULT_ERROR}<br/>
     *   If an unexpected, internal error occurs.
     *
     * @summary Returns the index of currently configured audio output device.
     * @since 1.0.0.0
     * @see ADL.AddLiveService#getAudioOutputDeviceNames
     * @see ADL.AddLiveService#setAudioOutputDevice
     *
     * @param {ADL.Responder} responder
     *          Responder object. See calling AddLive plug-in service methods.
     **/
    getAudioOutputDevice:function (responder) {
      ADL.Responder.validate(responder);
      var mName = 'getAudioOutputDevice()';
      try {
        Log.d('Calling plugin method ' + mName);
        responder.setMethod('getAudioOutputDevice()');
        responder.sendAERonError(true);
        this.nativeService.getAudioOutputDevice(responder);
      } catch (exception) {
        _reportJSError(mName, exception, responder);
      }
    },


    /**
     * Returns list of sources available for screen sharing. Sources here refers to
     * user's desktops and opened windows. The resulting Array contains objects with
     * following attributes:
     *
     * - __id__    id of the screen sharing item. It should be used when publishing the
     *   stream
     *
     * - __image__ Object containing preview of screen shot image depicting
     *             the screen sharing source. It's contain following fields:
     *
     *   - _base64_ - String with picture data encoded using png and
     *   base64. One should use it with image tag as
     *   follows:
     *   <pre>
     *   var imgTag = '&lt;img src='data:img/png;base64,'+ image.base64 +''/&gt;';
     *   </pre>
     *
     *   - _width_ - native width of the screen shot taken
     *
     *   - _height_ native height of the screen shot taken
     *
     * - __title__ Human-readable title of the share source.
     *
     * Since passing the real-sized thumbnails with screen sharing source as
     * real-sized, base64 encoded PNG image is highly inefficient, this method takes
     * additional thumbWidth param, which should be set to the desired width of the
     * images, as required by the UI. The images will be scaled down.
     *
     * Additionally, if AddLive Service fails to obtain screen shot of given
     * screen sharing source, the image field will have the base64 property empty.
     *
     * #### Possible errors:
     *
     * - {@link ADL.ErrorCodes.Common.DEFAULT_ERROR}<br/>
     *   If an unexpected, internal error occurs.

     * @example
     * // Simple example showing how to list all currently available screen
     * // sharing sources:
     *
     * function showScreenShareSources(sources) {
   *    var srcsList = document.getElementById('screenShareSources');
   *
   *    // Iterate through all the screen sharing sources given
   *    for(var i = 0;i&lt;sources.length;i++) {
   *
   *      // Create a &lt;li&gt; wrapper for each one
   *      var srcWrapper = document.createElement('li');
   *      srcWrapper.id = 'shareItm' + i;
   *
   *      // Get the current share item.
   *      var src = sources[i];
   *
   *      // Create image for showing the screen grab preview
   *      var image = document.createElement('img');
   *
   *      // Check whether the AddLive Service managed to obtain the scree shot
   *      if(src.image.base64) {
   *
   *        // Use the data URI scheme
   *        // http://en.wikipedia.org/wiki/Data_URI_scheme
   *        image.src = 'data:img/png;base64,' + src.image.base64;
   *        image.width = src.image.width;
   *        image.height = src.image.height;
   *      } else {
   *
   *        // Service failed to obtain the screen shot - fall back to place holder
   *        image.src = 'http://myapp.com/window_placeholder.png'
   *        image.width = 120;
   *        image.height = 80;
   *      }
   *
   *      // Add the preview
   *      srcWrapper.appendChild(image);
   *
   *      // Create the node with the window title
   *      var titleWrapper = document.createElement('p');
   *      titleWrapper.innerText = src.title;
   *      srcWrapper.appendChild(titleWrapper);
   *
   *      // Register click handler to publish the screen
   *      srcWrapper.shareItemId = src.id;
   *      srcWrapper.onclick = function(){
   *        publishShareItm(this.shareItemId);
   *      };
   *
   *      // Finally append the node
   *      srcsList.appendChild(srcWrapper);
   *    }
   * }
     *
     * // Define the error handler
     * function onGetScreenCaptureSourcesError(errCode, errMessage) {
   *    console.error('Failed to fetch screen sharing sources due to: ' +
   *    errMessage + ' (' + errCode + ')' );
   * }
     *
     * // Obtain the AddLive service (not covered by this example)
     * var AddLiveService = getAddLiveService();
     *
     * // Request the screen sharing sources
     * AddLiveService.getScreenCaptureSources(
     *    ADL.createResponder(showScreenShareSources,
     *                        onGetScreenCaptureSourcesError),
     *    320
     * );
     *
     * #### WebRTC Notice:
     *
     * This method is not supported in native WebRTC mode
     *
     * @summary Returns list of sources available for screen sharing.
     * @since 1.15.0.1
     * @see ADL.AddLiveService#publish
     * @param {ADL.Responder} responder
     *          Responder object. See calling AddLive plug-in service methods.
     * @param {Number} thumbWidth
     *          Desired width of preview thumbnails.
     */
    getScreenCaptureSources:function (responder, thumbWidth) {
      var mName = 'getScreenCaptureSources(' + thumbWidth + ')';
      try {
        Log.d('Calling plugin method ' + mName);
        responder.setMethod(mName);
        responder.sendAERonError(true);
        ADL.Responder.validate(responder);
        if (!ADL.Utils.validate(responder, 'thumbWidth|defined,number',
            thumbWidth)) {
          return;
        }
        //noinspection JSUndefinedPropertyAssignment
        responder._originalResultHandler = responder.result;
        responder.result = function (devs) {
//    Parse the devices list returned as a JSON-encoded string to JS object.
          if (typeof devs === 'string') {
            devs = JSON.parse(devs);
          }
          this._originalResultHandler(devs);
        };
        //noinspection JSCheckFunctionSignatures
        this.nativeService.getScreenCaptureSources(responder, thumbWidth);
      } catch (exception) {
        _reportJSError(mName, exception, responder);
      }
    },

    /**
     * Starts previewing video stream of current user. Internally this method:
     *
     * - checks whether selected video capture device is enabled and captures
     *   frames. If not - enables it.
     *
     * - checks whether local preview renderer is defined or not, if not -
     *   creates one and links it to the video capture device
     *
     * - returns a string that can be used to render the live feed
     *
     * The string returned by this method, should be used to create video renderer
     * provided by the AddLive plugin, refer to the rendering section of the AddLive
     * API docs for more details for more details.
     *
     * #### Possible errors:
     *
     * - {@link ADL.ErrorCodes.Common.DEFAULT_ERROR}<br/>
     *   If an unexpected, internal error occurs.
     *
     * - {@link ADL.ErrorCodes.Media.INVALID_VIDEO_DEV}<br/>
     *   If the video capture device configured doesn't work.
     *
     * - {@link ADL.ErrorCodes.Logic.USER_CONSENT_NOT_GIVEN}<br/>
     *   If the JS SDK uses native WebRTC implementation and the user did not
     *   allow access to the local user media.
     *
     * @summary Starts previewing video stream of current user.
     * @since 1.0.0.0
     * @see ADL.AddLiveService#stopLocalVideo
     * @see ADL.AddLiveService#setVideoCaptureDevice
     * @param {ADL.Responder} responder
     *          Responder object. See calling AddLive plug-in service methods.
     **/
    startLocalVideo:function (responder) {
      ADL.Responder.validate(responder);
      var mName = 'startLocalVideo()';
      try {
        Log.d('Calling plugin method ' + mName);
        responder.setMethod(mName);
        if (!ADL._videoDeviceFunctional) {
          responder.error(ADL.ErrorCodes.Media.INVALID_VIDEO_DEV,
              'Cannot start local video as there is no working camera ' +
                  'functional. Select working camera first');
          return;
        }
        this.nativeService.startLocalVideo(responder, 640, 480);
      } catch (exception) {
        _reportJSError(mName, exception, responder);
      }
    },

    /**
     * Stops previewing local video feed of the user. Internally it frees all
     * resources needed to render the local preview and also releases the video
     * capture device if it's not used by any established connection.
     *
     * #### Possible errors:
     *
     * - {@link ADL.ErrorCodes.Common.DEFAULT_ERROR}<br/>
     *   If an unexpected, internal error occurs.
     *
     * @summary Stops previewing local video feed of the user.
     * @since 1.0.0.0
     * @see ADL.AddLiveService#startLocalVideo
     * @param {ADL.Responder} responder
     *          Responder object. See calling AddLive plug-in service methods.
     **/
    stopLocalVideo:function (responder) {
      var mName = 'stopLocalVideo()';
      try {
        Log.d('Calling plugin method ' + mName);
        if (!responder) {
          responder = ADL.createResponder();
        }
        responder.setMethod(mName);
        responder.sendAERonError(true);
        this.nativeService.stopLocalVideo(responder);
      } catch (exception) {
        _reportJSError(mName, exception, responder);
      }
    },

    /**
     * Establishes a connection to the streaming server using given description.
     * This is the most important method of all provided by the AddLive Service API.
     *
     *
     * #### Connection descriptor
     *
     * The only one input parameter, connectionDescriptor completely
     * describes client requirements on the connection to be established. It is a
     * JavaScript object with following attributes:
     *
     *
     * - __[url] (String)__ URL of streamer to connect to. In form:
     *
     *       IP_OR_DOMAIN_NAME:PORT/SCOPE_ID
     *
     *   SCOPE_ID, defines a media scope within the streamer. All users connected to
     *   a particular scope exchange media streams published within the scope.
     *   If given user publishes a stream (audio, video, screen or any combination
     *   of them) all users connected to this scope will be receiving this stream.
     *   Additionally, the SCOPE_ID param is used in connection management
     *   API - to specify the scope on which given action should be performed.
     *   The url attribute is optional, and needs to be specified only if
     *   __scopeId__ wasn't defined.
     *
     * - __[scopeId] (String)__ id of scope to connect to.
     *
     *   Defining just the scope id, allows the AddLive platform to resolve the
     *   best AddLive Streaming Server to conduct the session.
     *
     * - __[videoStream] (Object)__
     *
     *   Defines the quality of the video stream to be published (see the Video
     *   streams configuration section below). This property is optional, with
     *   sane defaults: resolution of VGA at 15 frames per second.
     *
     * - __[autopublishVideo] (Boolean)__
     *
     *   Flag defining whether local user's video stream should be automatically
     *   published upon successful connection, __true__ by default.
     *
     * - __[autopublishAudio] (Boolean)__
     *
     *   Flag defining whether local user's audio stream should be automatically
     *   published upon successful connection, __true__ by default.
     *
     * - __authDetails (Object)__
     *
     *   Defines the connection authentication details, for more details please
     *   refer to:  http://www.addlive.com/authentication/
     *
     * ####  Video streams configuration
     *
     * The AddLive Service uses 2 quality layers for video streaming - the 'low'
     * and 'high' layer. The 'low' layer contains video stream with constant
     * bit rate, spatial resolution and temporal resolution (read: there aren't
     * any adaptation routines enabled for the low layer). By default the 'low'
     * is disabled and gets enabled only upon a request from the streaming
     * infrastructure. The AddLive Streaming server may request a peer to start
     * publishing the low quality feed, when one of the other participants
     * connected to the session has issues with the downlink data transmission.
     * To avoid congestion, the Streamer will send just the low quality video
     * feed from one or more participants to the one experiencing those issues.
     * The configuration of the 'low' layer is derived automatically from the
     * 'high' one.
     *
     * The 'high' quality video feed on the other hand is fully configurable
     * by the application. The client application can specify maximal dimensions
     * of the encoded picture, maximal frame rate and can enable or disable the
     * adaptation infrastructure. The last option is especially useful, when
     * the client application is deployed in an environment fully controlled by
     * the application vendor thus the network capabilities are known upfront.
     *
     * With the adaptation algorithms enabled, the client SDK will start
     * publishing video stream of a medium quality and if possible, will slowly
     * increase the quality of the feed up until it reaches the max
     * resolution specified or limits of the video capture device used.
     *
     * The video stream can be configured using the __videoStream__ attribute of
     * the connection descriptor. The attribute should contain following fields:
     *
     * - __maxWidth (Number)__
     *
     *   Defines maximal width of the video stream.
     *
     * - __maxHeight (Number)__
     *
     *   Defines maximal height of the video stream.
     *
     * - __maxFps (Number)__
     *
     *   Defines maximal amount of frames per second the video stream should use.
     *
     * - __useAdaptation (Boolean)__
     *
     *   Flag defining whether the adaptation algorithms should be enabled or
     *   not.
     *
     * - __manualControl (Boolean)__
     *
     *   Flag defining whether the application would like to have a manual
     *   control over stream reconfiguration. False by default. If this feature
     *   is turned off, the SDK will ensure that each participant sends the
     *   video feed with a resolution so the pixels ratio received by everyone
     *   is not greater then sane maximum, which same amount of 720p
     *
     * Please note that configuration of the transmitted video stream can be
     * updated live using the {@link ADL.AddLiveService#reconfigureVideo}
     * method.
     *
     *
     * #### Authentication
     *
     * The authentication does not require any communication between your
     * application server side and our infrastructure. Instead, on the server
     * side, application should prepare all the required data, sign them using a
     * "shared secret" ("API Key") and pass it to the JavaScript which uses them
     * to prepare the connection descriptor.
     *
     * To authenticate given connection request, AddLive SDK expects following
     * data to be provided:
     *
     * - <strong>application id</strong> It explicitly identifies an application
     *   using the AddLive service. We use it to know who to charge for the
     *   traffic generated by the user and also to get the app-specific API key to
     *   verify the signature.
     *
     *   - <strong>user id</strong> Application unique identifier for the
     *   particular user. Having this property in set of authentication fields,
     *   allows the developer to explicitly control who can join media scope with
     *   given id. Also this property will be used with all the AddLive events
     *   dispatched to the {@link ADL.AddLiveServiceListener} and corresponding to
     *   remote user's actions (connect, disconnect, publish, unpublish,
     *   sendMessage). The user id property __must__ be a 64 bit integer. Read
     *   more: http://en.wikipedia.org/wiki/Integer_(computer_science).
     *
     *   - <strong>scope id</strong> Identifies id of a scope to which connection
     *   attempt is being  made. This property is a second component required to
     *   control who can join which scope.
     *
     *   - <strong>salt</strong> Random string used when calculating the
     *   authentication signature. It increases the signature randomness. expires
     *   timestamp UTC Timestamp, defining how long the authentication signature
     *   should be valid. It prevents malicious users from hijacking already
     *   calculated signature and reusing them outside application control.
     *
     *   - <strong>signature</strong> Authentication signature which guarantees
     *   that the connection request is being made on behalf of our client. It is
     *   a SHA-256 hash, calculated from a string generated by concatenation of
     *   all the above attributes and the API key. The signature must be
     *   represented as a hex-string, uppercased.
     *
     * #### Notifications
     *
     * Whenever AddLive Service detects that new user joined particular scope
     * by establishing a connection to it, the
     * {@link ADL.AddLiveServiceListener#onUserEvent} method is being called on
     * all registered service listeners. In this case, the
     * {@link ADL.UserStateChangedEvent},
     * will have flag isConnected set to true and all streaming details filled
     * according to the streaming configuration specified by the connection
     * descriptor.
     *
     * #### Possible errors:
     *
     * - {@link ADL.ErrorCodes.Media.INVALID_VIDEO_DEV}<br/>
     *   In case there was an error using currently selected video capture device
     *   (e.g. device in use by different application or just stopped working)
     *
     * - {@link ADL.ErrorCodes.Communication.INVALID_HOST}<br/>
     *   Indicates failure in DNS lookup of host specified in the url or streamer
     *   box being off-line
     *
     * - {@link ADL.ErrorCodes.Communication.INVALID_PORT}<br/>
     *   Indicates that service failed to connect to the streaming server. Either
     *   the traffic gets blocked by the firewall or streaming server is down
     *
     * - {@link ADL.ErrorCodes.Communication.BAD_AUTH}<br/>
     *   Indicates authentication error. There might be 4 reasons for rejected
     *   authentication signature: no authentication signature was provided,
     *   the application with given id is unknown, the signature calculated was
     *   invalid and finally, the authentication signature was expired. The actual
     *   cause of the authentication rejection will be provided using the
     *   <strong>errMessage</strong>.
     *
     * - {@link ADL.ErrorCodes.Communication.MEDIA_LINK_FAILURE}<br/>
     *   Indicates failure in establishing media connection. It means that the
     *   media streams are blocked somewhere on the path between the user and
     *   the streaming server. Most likely, it's due to a firewall blocking media
     *   traffic.
     *
     * - {@link ADL.ErrorCodes.Communication.ALREADY_JOINED}<br/>
     *   User with given id already joined given scope or the same user (from host
     *   application's perspective) joined the scope using different browser or
     *   different user agent. User id must be unique in scope boundaries.
     *
     * - {@link ADL.ErrorCodes.Logic.INVALID_ARGUMENT}<br/>
     *   Invalid connection descriptor given.
     *
     * - {@link ADL.ErrorCodes.Common.DEFAULT_ERROR}<br/>
     *   If an unexpected, internal error occurs
     *
     * - {@link ADL.ErrorCodes.Logic.USER_CONSENT_NOT_GIVEN}<br/>
     *   If the JS SDK uses native WebRTC implementation and the user did not
     *   allow access to the local user media.
     *
     * @summary Establishes a connection to the streaming server.
     * @since 1.0.0.0
     * @see ADL.AddLiveService#disconnect
     * @see ADL.AddLiveService#publish
     * @see ADL.AddLiveService#unpublish
     * @see ADL.AddLiveServiceListener#onUserEvent
     * @see ADL.UserStateChangedEvent
     *
     * @param {ADL.Responder} responder
     *          Responder object. See calling AddLive plug-in service methods.
     * @param {Object} connectionDescription
     *          Details of the connection to establish. More details about
     *          each attribute that the connectionDescriptor is expected to have
     *          can be found in the connect method documentation.
     * @param {Object} connectionDescription.authDetails
     *                  The authDetails is the only required attribute. See
     *                  authentication section above.
     * @param {String} connectionDescription.url
     *                  Streamer URL to connect to. Optional and for advanced
     *                  use only, always specify url or scopeId.
     * @param {String} connectionDescription.scopeId
     *                  Id of scope to connect to. When using just the scope
     *                  id, the SDK will resolve the streamer to conduct the
     *                  session using the internal infrastructure. Optional,
     *                  can be omitted if the url property is defined.
     * @param {Object} connectionDescription.highVideoStream
     *                  A deprecated property to configure the video stream. Use
     *                  __videoStream__ instead.
     * @param {Object} connectionDescription.videoStream
     *                  Configuration of the video stream published. May be
     *                  omitted, in this case sane defaults will be used:
     *                  VGA@15 FPS, with adaptation enabled and automatic video
     *                  feeds reconfiguration.
     * @param {Boolean} connectionDescription.autopublishVideo
     *                  Flag defining whether the video should be automatically
     *                  published after connecting. Optional, true by default.
     * @param {Boolean} connectionDescription.autopublishAudio
     *                  Flag defining whether the video should be automatically
     *                  published after connecting. Optional, true by default.
     */
    connect:function (responder, connectionDescription) {
      var mName = 'connect(' + JSON.stringify(connectionDescription) + ')';
      try {
        Log.d('Calling plugin method ' + mName);
        responder.setMethod(mName);
        responder.sendAERonError(true);

        // Check the case where we have highVideoStream defined but don't have
        // the videoStream -> derive videoStream from highVideoStream.
        if (connectionDescription.highVideoStream && !connectionDescription.videoStream) {
          connectionDescription.videoStream = {
            maxWidth:connectionDescription.highVideoStream.maxWidth,
            maxHeight:connectionDescription.highVideoStream.maxHeight,
            maxFps:connectionDescription.highVideoStream.maxFps,
            useAdaptation:true,
            manualControl:false
          };
        }

        //    Create the final connection descriptor passed to the plug-in
        var connDescr = {};
        // First define the defaults
        ADL.Utils.merge(connDescr, ADL._STATIC_CONFIG.SANE_DEFAULTS_CONN_DESCR);
        // Then, overwrite it with user specified values.
        ADL.Utils.merge(connDescr, connectionDescription);

//    Sanitize the connection descriptor
        if (!_sanitizeConnectionDescriptor(responder, connDescr)) {
          return;
        }
        var scopeId = connDescr.scopeId;
        if (connDescr.url) {
          scopeId = connDescr.url.split('/')[1];
        }
        connDescr.scopeId = scopeId;
        var self = this;
        var resultAdapter = function () {
          try {
            ADL.BugReporting.postDevices(
                scopeId, connDescr.authDetails.userId);
          } catch (e) {
            Log.w('Failed to post devices. ' + JSON.stringify(e));
          }
          var connection = new ADL.MediaConnection(scopeId, connDescr);
          self._activeConnections[scopeId] = connection;
          return connection;
        };
        responder.setResultAdapter(resultAdapter);
        Log.i('Connecting to Streamer with URL endpoint: ' + connDescr.scopeId);

        _connectReliably(this.nativeService, responder, connDescr);
      } catch (exception) {
        _reportJSError(mName, exception, responder);
      }
    },

    /**
     * Disconnects previously established connection to the streaming server.
     *
     * #### Notifications
     *
     * Whenever AddLive Service detects that new user leaves particular scope
     * by terminating a connection to it, the
     * ADL.AddLiveServiceListener.onUserEvent method is being called on all
     * registered service listeners. In this case, the ADL.UserStateChangedEvent,
     * will have flag isConnected set to false. Other properties are undefined.
     *
     * #### Possible errors:
     *
     * - {@link ADL.ErrorCodes.Logic.INVALID_SCOPE}<br/>
     *   With instance of plugin service is not connected to media scope with
     *   given id.
     *
     * - {@link ADL.ErrorCodes.Common.DEFAULT_ERROR}<br/>
     *   If an unexpected, internal error occurs
     *
     * @summary Disconnects previously established connection to the streaming
     *          server.
     * @since 1.0.0.0
     * @see ADL.AddLiveService#connect
     * @see ADL.AddLiveServiceListener#onUserEvent
     * @see ADL.UserStateChangedEvent
     * @param {ADL.Responder} [responder]
     *          Responder object. See calling AddLive plug-in service methods.
     * @param {string} scopeId
     *          id of media scope to disconnect
     **/
    disconnect:function (responder, scopeId) {
      var mName = 'disconnect(' + scopeId + ')';
      try {
        Log.d('Calling plugin method ' + mName);
        if (typeof responder === 'string') {
          //noinspection JSValidateTypes
          scopeId = responder;
          responder = ADL.createResponder();
        }
        var self = this;
        responder.setMethod(mName);
        responder.sendAERonError(true);
        responder.setResultAdapter(function () {
          try {
            Log.d('Connection successfully terminated. ' +
                'Disposing MediaConnection on JS side');
            var conn = self._activeConnections[scopeId];
            delete self._activeConnections[scopeId];
            conn._dispose();
          } catch (e) {

          }

        });
        if (!ADL.Utils.validate(responder, 'scopeId|defined,string,nonEmpty',
            scopeId)) {
          return;
        }
        this.nativeService.disconnect(responder, scopeId);
      } catch (exception) {
        _reportJSError(mName, exception, responder);
      }
    },

    /**
     * Internally the networkTest method:
     *
     * * establishes a connection to the AddLive streaming server
     * * publishes a mock video stream
     * * checks the connection feedback reports generated by the server side
     * * calculates quality index using the feedback reports.
     *
     * The method takes as a first parameter a connection descriptor. The
     * descriptor, should use a valid authentication, to connection to a scope
     * with an empty id (0-length string); Also, the networkTest method gets the
     * definition of the highVideoStream to estimate the application's desired
     * bit rate.
     *
     * As a result, this method returns one of the {@link ADL.ConnectionQuality}
     * enum values.
     *
     * @example
     * function _platformReady() {
     *   var userId = ADLT.genRandomUserId();
     *   var connDescr = {
     *     scopeId:'',
     *     authDetails:ADLT.genAuth('', userId, APPLICATION_ID, APP_SHARED_SECRET),
     *     highVideoStream:{maxBitRate:1024}
     *   };
     *   document.getElementById('connQualityLbl').innerText = 'Testing...';
     *   ADL.getService().networkTest(ADL.r(_onNetworkTestResults), connDescr);
     * }
     *
     * function _onNetworkTestComplete(result) {
     *   var lbl = '';
     *   switch (result) {
     *     case ADL.ConnectionQuality.FINE:
     *       lbl = 'Good';
     *       break;
     *     case ADL.ConnectionQuality.AVERAGE:
     *       lbl = 'Average';
     *       break;
     *     case ADL.ConnectionQuality.BAD:
     *       lbl = 'Bad';
     *       break;
     *     default :
     *       lbl = 'Unknown';
     *   }
     *   document.getElementById('connQualityLbl').innerText = lbl;
     * }
     *
     * #### WebRTC Notice:
     *
     * This method is not supported in native WebRTC mode
     *
     * @summary Tests the quality of user's Internet connection.
     * @since 2.2.0
     * @see ADL.AddLiveService#connect
     * @see ADL.ConnectionQuality
     * @param {ADL.Responder} [responder]
     *          Responder object. See calling AddLive plug-in service methods.
     *
     * @param {Object}connectionDescription
     */
    networkTest:function (responder, connectionDescription) {
      var mName = 'networkTest(' + JSON.stringify(connectionDescription) + ')';
      try {
        Log.d('Calling plugin method ' + mName);
        responder.setMethod(mName);
        responder.sendAERonError(true);

//    Create the final connection descriptor passed to the plug-in
        var connDescr = {};

        ADL.Utils.merge(connDescr, ADL._STATIC_CONFIG.SANE_DEFAULTS_CONN_DESCR);
        ADL.Utils.merge(connDescr, connectionDescription);

        var self = this;
        Log.i('Testing network connection to Streamer with URL endpoint: ' +
            connDescr.url);
        responder.setResultAdapter(function (intResult) {
          return ADL.ConnectionQuality._fromInt(parseInt(intResult, 10));
        });

        //noinspection JSCheckFunctionSignatures
        self.nativeService.networkTest(responder, connDescr);

      } catch (exception) {
        _reportJSError(mName, exception, responder);
      }
    },


    /**
     * Generic publish method - allows to start broadcasting to given scope media
     * of particular type with specified configuration (if required by the media
     * type)
     *
     * #### Notifications
     *
     * Whenever AddLive Service detects that user publishes or stops publishing
     * stream of particular media type, the
     * {@link ADL.AddLiveServiceListener#onMediaStreamEvent} method is being
     * called on all registered service listeners. In this case, the
     * {@link ADL.UserStateChangedEvent}, will have the
     * {@link ADL.UserStateChangedEvent#mediaType} property filled
     * with type of media which state was changed and the streaming status defined
     * in one of:
     *
     * - {@link ADL.UserStateChangedEvent#audioPublished}
     * - {@link ADL.UserStateChangedEvent#videoPublished}
     * - {@link ADL.UserStateChangedEvent#screenPublished}
     *
     * #### Possible Errors:
     *
     * - {@link ADL.ErrorCodes.Logic.INVALID_SCOPE}<br/>
     *   With instance of plugin service is not connected to media scope with
     *   given id.
     *
     * - {@link ADL.ErrorCodes.Media.INVALID_VIDEO_DEV}<br/>
     *   In case there was an error using currently selected video capture device
     *   (e.g. device in use by different application or just stopped working)
     *
     *  - {@link ADL.ErrorCodes.Media.INVALID_AUDIO_DEV}<br/>
     *   In case of error with initializing microphone.
     *
     * - {@link ADL.ErrorCodes.Common.DEFAULT_ERROR}<br/>
     *   If an unexpected, internal error occurs
     *
     * @summary Starts publishing media using already established connection.
     * @since 1.15.0.2
     * @see ADL.AddLiveService#connect
     * @see ADL.AddLiveService#unpublish
     * @see ADL.AddLiveService#getScreenCaptureSources
     * @see ADL.MediaType.AUDIO
     * @see ADL.MediaType.VIDEO
     * @see ADL.MediaType.SCREEN
     * @see ADL.AddLiveServiceListener#onMediaStreamEvent
     * @see ADL.UserStateChangedEvent
     * @param {ADL.Responder} responder
     *          Responder object. See calling AddLive plug-in service methods.
     * @param {string} scopeId
     *          id of scope to which media broadcasting should be started
     * @param {string} what
     *          type of media to be published, may be one of:
     *          ADL.MediaType.AUDIO, ADL.MediaType.VIDEO, ADL.MediaType.SCREEN
     * @param {Object} [details]
     *          additional details describing how exactly media should be
     *          published. In current version, the details object is used only
     *          when publishing the ADL.MediaType.SCREEN media type.
     * @param {string} [details.windowId]
     *          id of the screen sharing source to be shared when publishing the
     *          SCREEN media type
     * @param {number} [details.nativeWidth]
     *          width of the component that will render the screen sharing sink
     *          on the remote end. AddLiveService uses this value to define the
     *          maximal width that will be down scaled before encoding the frame.
     */
    publish:function (responder, scopeId, what, details) {
      var mName = 'publish(' + scopeId + ', ' + what + ', ' +
          JSON.stringify(details) + ')';
      try {
        Log.d('Calling plugin method ' + mName);
        responder.setMethod(mName);
        this.nativeService.publish(responder, scopeId, what, details);
      } catch (exception) {
        _reportJSError(mName, exception, responder);
      }
    },

    /**
     * Generic unpublish method - stops publishing media stream of desired type
     * to given media scope.
     *
     *
     * #### Notifications
     *
     * Whenever AddLive Service detects that user publishes or stops publishing
     * stream of particular media type, the
     * {@link ADL.AddLiveServiceListener#onMediaStreamEvent} method is being
     * called on all registered service listeners. In this case, the
     * {@link ADL.UserStateChangedEvent}, will have the
     * {@link ADL.UserStateChangedEvent#mediaType} property filled with type of
     * media which state was changed and the streaming status defined in one of:
     *
     * - {@link ADL.UserStateChangedEvent#audioPublished}
     * - {@link ADL.UserStateChangedEvent#videoPublished}
     * - {@link ADL.UserStateChangedEvent#screenPublished}
     *
     *
     *
     * #### Possible Errors:
     *
     * - {@link ADL.ErrorCodes.Logic.INVALID_SCOPE}<br/>
     *   With instance of plugin service is not connected to media scope with
     *   given id.
     *
     * - {@link ADL.ErrorCodes.Common.DEFAULT_ERROR}<br/>
     *   If an unexpected, internal error occurs
     *
     * @summary Stops publishing media using already established connection.
     * @since 1.15.0.2
     * @see ADL.AddLiveService#connect
     * @see ADL.AddLiveService#publish
     * @see ADL.MediaType
     * @see ADL.AddLiveServiceListener#onMediaStreamEvent
     * @see ADL.UserStateChangedEvent
     * @param {ADL.Responder} responder
     *          Responder object. See calling AddLive plug-in service methods.
     * @param {string} scopeId
     *          Id of media scope to stop publishing to.
     * @param {string} what
     *          Type of media to stop publishing.
     */
    unpublish:function (responder, scopeId, what) {
      var methodString = 'unpublish(' + scopeId + ', ' + what + ')';
      try {
        Log.d('Calling plugin method ' + methodString);
        responder.setMethod(methodString);
        responder.sendAERonError(true);
        this.nativeService.unpublish(responder, scopeId, what);
      } catch (exception) {
        _reportJSError(methodString, exception, responder);
      }
    },

    /**
     * Changes the configuration of the sent video stream published within
     * given scope.
     *
     * #### WebRTC Notice:
     *
     * This method is not supported in native WebRTC mode
     *
     * @summary Reconfigures published video stream.
     * @since 2.3.0
     * @param {ADL.Responder} responder
     *          Responder object. See calling AddLive plug-in service methods.
     * @param {String} scopeId
     *          Id of scope which uplink video stream should be reconfigured.
     * @param {Object} newConfiguration
     *          Object describing new configuration
     * @param {Number} newConfiguration.maxWidth
     *          Maximal width of the encoded picture
     * @param {Number} newConfiguration.maxHeight
     *          Maximal height of the encoded picture
     * @param {Number} newConfiguration.maxFps
     *          Maximal frame rate
     * @param {Boolean} newConfiguration.udeAdaptation
     *          Flag defining whether the adaptation algorithms should be
     *          enabled or not.
     *
     */
    reconfigureVideo:function (responder, scopeId, newConfiguration) {
      var methodString = 'reconfigureVideo(' + scopeId + ', ' +
          newConfiguration + ')';
      try {
        Log.d('Calling plugin method ' + methodString);
        responder.setMethod(methodString);
        responder.sendAERonError(true);
        this.nativeService.reconfigureVideo(responder, scopeId,
            newConfiguration);
      } catch (exception) {
        _reportJSError(methodString, exception, responder);
      }
    },
    /**
     * Sends an opaque message between peers connected to the media scope. It is
     * possible to send a message to single recipient only, by providing the 4th
     * optional targetUserId param. The remote peer can receive the message using
     * the {@link ADL.AddLiveServiceListener#onMessage} callback.
     *
     * #### Possible Errors:
     *
     * - {@link ADL.ErrorCodes.Common.DEFAULT_ERROR}<br/>
     *   If an unexpected, internal error occurs.
     *
     * @summary Sends an opaque message between to peers connected to the scope.
     * @since 1.15.0.1
     * @see ADL.AddLiveService#connect
     * @see ADL.AddLiveServiceListener#onMessage
     * @param {ADL.Responder} responder
     *          Responder object. See calling AddLive plug-in service methods.
     * @param {string} scopeId
     *          Id of media scope in which message should be broadcasted
     * @param {string} message
     *          Message to be broadcasted. Please note that the maximal length of
     *          the message is 4046 8-bit characters. It means that depending on
     *          the text encoding it may be 2023 (for unicode) or less characters.
     * @param {Number} [targetUserId]
     *          Id of user to optionally send a direct message. User must be
     *          connected to given scope, if not, message will be simply dropped.
     */
    sendMessage:function (responder, scopeId, message, targetUserId) {
      var method = 'sendMessage(' + scopeId + ', ' + message + ', ' +
          targetUserId + ')';
      try {
        Log.d('Calling plugin method ' + method);
        responder.setMethod(method);
        responder.sendAERonError(true);
        ADL.Utils.validate(responder, 'scopeId|defined,string,nonEmpty',
            scopeId);
        ADL.Utils.validate(responder, 'message|defined,string', message);

        if (targetUserId) {
          //noinspection JSCheckFunctionSignatures
          this.nativeService.sendMessage(responder, scopeId, message, targetUserId);
        } else {
          //noinspection JSCheckFunctionSignatures
          this.nativeService.sendMessage(responder, scopeId, message);
        }
      } catch (exception) {
        _reportJSError(method, exception, responder);
      }
    },

    /**
     * Restricts the remote feeds received by current user, to only those sent
     * by users with ids given in the senders array. Please note that at this
     * version only the video reception can be constrained. If mediaType is set to
     * {@link ADL.MediaType.AUDIO}, the method will return an error with error
     * code {@link ADL.ErrorCodes.Logic.INVALID_ARGUMENT}.
     *
     * #### WebRTC Notice:
     *
     * This method is not supported in native WebRTC mode
     *
     * @summary Restricts the remote feeds received by current user.
     * @since 2.0.1
     * @see ADL.MediaType
     * @param {ADL.Responder} responder
     *          Responder object. See calling AddLive plug-in service methods.
     * @param {string} scopeId
     *          Id of media scope in the reception should be constrained
     * @param {string} mediaType
     *          Type of media to be constrained
     * @param {Array} senders
     *          List of user ids from which current user should receive media
     *          feeds.
     */
    setAllowedSenders:function (responder, scopeId, mediaType, senders) {
      var method = 'setAllowedSenders(' + scopeId + ', ' + mediaType + ', ' +
          JSON.stringify(senders) + ')';
      try {
        Log.d('Calling plugin method ' + method);
        responder.setMethod(method);
        responder.sendAERonError(true);
        ADL.Utils.validate(responder, 'scopeId|defined,string,nonEmpty',
            scopeId);
        ADL.Utils.validate(responder, 'senders|defined', senders);
        this.nativeService.setAllowedSenders(responder, scopeId,
            mediaType, senders);
      } catch (exception) {
        _reportJSError(method, exception, responder);
      }
    },

//  TODO tell something about how it works on particular OS.
    /**
     * Gets current volume level of the audio output device. The result is an
     * integer with values in range 0-255.
     *
     * #### Possible errors:
     *
     * - {@link ADL.ErrorCodes.Common.DEFAULT_ERROR}<br/>
     *   If an unexpected, internal error occurs.
     *
     * @summary Gets current volume level of the audio output device.
     * @since 1.0.0.0
     * @see ADL.AddLiveService#setSpeakersVolume
     * @param {ADL.Responder} responder
     *          Responder object. See calling AddLive plug-in service methods.
     **/
    getSpeakersVolume:function (responder) {
      var mName = 'getSpeakersVolume()';
      try {
        Log.d('Calling plugin method getSpeakersVolume()');
        responder.setMethod(mName);
        responder.sendAERonError(true);
        this.nativeService.getSpeakersVolume(responder);
      } catch (exception) {
        _reportJSError(mName, exception, responder);
      }
    },

    /**
     * Sets current volume level of the audio output device.
     *
     * #### Possible errors:
     *
     * - {@link ADL.ErrorCodes.Common.DEFAULT_ERROR}<br/>
     *   If an unexpected, internal error occurs.
     *
     * @summary Sets current volume level of the audio output device.
     * @since 1.0.0.0
     * @see ADL.AddLiveService#getSpeakersVolume
     * @param {ADL.Responder} responder
     *          Responder object. See calling AddLive plug-in service methods.
     * @param {Number} volume
     *          integer containing new volume level (unsigned int in range 0-255)
     **/
    setSpeakersVolume:function (responder, volume) {
      var mName = 'setSpeakersVolume(' + volume + ')';
      try {
        Log.d('Calling plugin method setSpeakersVolume(' + volume + ')');
        responder.setMethod(mName);
        responder.sendAERonError(true);
        ADL.Utils.validate(responder, 'volume|defined,number', volume);
        this.nativeService.setSpeakersVolume(responder, volume);
      } catch (exception) {
        _reportJSError(mName, exception, responder);
      }
    },

    /**
     * Gets current gain level of the audio input device. Note that this method
     * should be used only if the Automatic Gain Control is disabled. Using it
     * with AGC enabled doesn't cause ane bugs, but is pointless as the AGC
     * sub-module of audio engine will change the gain almost instantly. It may
     * only cause negative experience for the user (e.g. echo or noise). The value
     * returned by this method is an integer with values in range 0-255.
     *
     * #### Possible errors:
     *
     * - {@link ADL.ErrorCodes.Common.DEFAULT_ERROR}<br/>
     *   If an unexpected, internal error occurs.
     *
     * #### WebRTC Notice:
     *
     * This method is not supported in native WebRTC mode
     *
     * @deprecated Starting from 2.1.0.0 leave the gain control to AGC
     * @summary Gets current gain level of the audio input device.
     * @since 1.0.0.0
     * @see ADL.AddLiveService#setMicrophoneVolume
     * @param {ADL.Responder} responder
     *          Responder object. See calling AddLive plug-in service methods.
     **/
    getMicrophoneVolume:function (responder) {
      var mName = 'getMicrophoneVolume()';
      try {
        Log.d('Calling plugin method ' + mName);
        responder.setMethod(mName);
        responder.sendAERonError(true);
        this.nativeService.getMicrophoneVolume(responder);
      } catch (exception) {
        _reportJSError(mName, exception, responder);
      }
    },

    /**
     * Sets gain level of the audio input device. The value
     * returned by this method is an integer with values in range 0-255.
     *
     * #### Possible errors:
     *
     * - {@link ADL.ErrorCodes.Common.DEFAULT_ERROR}<br/>
     *   If an unexpected, internal error occurs.
     *
     * #### WebRTC Notice:
     *
     * This method is not supported in native WebRTC mode
     *
     * @summary Sets gain level of the audio input device.
     * @since 1.0.0.0
     * @see ADL.AddLiveService#getMicrophoneVolume
     * @param {ADL.Responder} responder
     *          Responder object. See calling AddLive plug-in service methods.
     * @param {number} volume
     *          Volume to be set
     **/
    setMicrophoneVolume:function (responder, volume) {
      var mName = 'setMicrophoneVolume(' + volume + ')';
      try {
        Log.d('Calling plugin method ' + mName);
        responder.setMethod(mName);
        responder.sendAERonError(true);
        ADL.Utils.validate(responder, 'volume|defined,number', volume);
        this.nativeService.setMicrophoneVolume(responder, volume);
      } catch (exception) {
        _reportJSError(mName, exception, responder);
      }
    },

    /**
     * Activates or deactivates monitoring of the audio input device activity -
     * speech level. The level will be reported using callback
     * {@link ADL.AddLiveServiceListener#onMicActivity}
     * method each 300ms. Monitoring mic activity is resource intensive process,
     * it is highly recommended to use it only when needed (e.g. when rendering
     * audio capture device selection form).
     *
     * #### Possible errors:
     *
     * - {@link ADL.ErrorCodes.Common.DEFAULT_ERROR}<br/>
     *   If an unexpected, internal error occurs.
     *
     * @summary Activates or deactivates monitoring of the audio mic activity.
     * @since 1.0.0.0
     * @see ADL.AddLiveServiceListener#micActivity
     * @param {ADL.Responder} responder
     *          Responder object. See calling AddLive plug-in service methods.
     * @param {boolean} enabled
     *          Flag defining whether monitoring of audio capture device activity
     *          should be enabled or disabled.
     */
    monitorMicActivity:function (responder, enabled) {
      var mName = 'monitorMicActivity(' + enabled + ')';
      try {
        Log.d('Calling plugin method ' + mName);
        responder.setMethod(mName);
        responder.sendAERonError(true);
        ADL.Utils.validate(responder, 'enabled|defined,bool', enabled);
        this.nativeService.monitorMicActivity(responder, enabled);
      } catch (exception) {
        _reportJSError(mName, exception, responder);
      }
    },

    /**
     * Activates or deactivates monitoring of the speech level within a selected
     * media session.
     *
     * #### Possible errors:
     *
     * - {@link ADL.ErrorCodes.Logic.INVALID_SCOPE}<br/>
     *   With instance of plugin service is not connected to media scope with
     *   given id.
     * - {@link ADL.ErrorCodes.Common.DEFAULT_ERROR}<br/>
     *   If an unexpected, internal error occurs.
     *
     * @summary Activates or deactivates monitoring of the audio mic activity.
     * @since 3.0.28
     * @see ADL.AddLiveServiceListener#onSpeechActivity
     * @see ADL.SpeechActivityEvent
     * @param {ADL.Responder} responder
     *          Responder object. See calling AddLive plug-in service methods.
     * @param {string} scopeId
     *          id of scope to which media broadcasting should be started
     * @param {boolean} enabled
     *          Flag defining whether monitoring of audio capture device activity
     *          should be enabled or disabled.
     */
    monitorSpeechActivity:function (responder, scopeId, enabled) {
      var mName = 'monitorSpeechActivity(' + scopeId + ', ' + enabled + ')';
      try {
        Log.d('Calling plugin method ' + mName);
        responder.setMethod(mName);
        responder.sendAERonError(true);
        ADL.Utils.validate(responder, 'scopeId|defined,string', scopeId);
        ADL.Utils.validate(responder, 'enabled|defined,bool', enabled);
        this.nativeService.monitorSpeechActivity(responder, scopeId, enabled);
      } catch (exception) {
        _reportJSError(mName, exception, responder);
      }
    },

    /**
     * Starts measuring media statistics for media connection to given scope.
     *
     * #### Possible errors:
     *
     * - {@link ADL.ErrorCodes.Logic.INVALID_ARGUMENT}<br/>
     *   Invalid interval given - negative value.
     *
     * - {@link ADL.ErrorCodes.Common.DEFAULT_ERROR}<br/>
     *   If an unexpected, internal error occurs.
     *
     * @summary Starts measuring media statistics for media connection to given
     *          scope.
     * @since 1.0.0.0
     * @see ADL.AddLiveService#stopMeasuringStatistics
     * @see ADL.AddLiveServiceListener#newVideoStats
     * @see ADL.AddLiveServiceListener#newAudioStats
     * @param {ADL.Responder} responder
     *          Responder object. See calling AddLive plug-in service methods.
     * @param {string} scopeId
     *          id of media scope to measure media stats of
     * @param {Number} interval
     *          stats refresh interval, in seconds
     */
    startMeasuringStatistics:function (responder, scopeId, interval) {
      var mName = 'startMeasuringStatistics(' + scopeId + ', ' + interval + ')';
      try {
        Log.d('Calling plugin method ' + mName);
        responder.setMethod(mName);
        responder.sendAERonError(true);
        ADL.Utils.validate(responder, 'scopeId|defined,string,nonEmpty',
            scopeId);
        ADL.Utils.validate(responder, 'interval|defined,number', interval);
        this.nativeService.startMeasuringStatistics(responder, scopeId, interval);
      } catch (exception) {
        _reportJSError(mName, exception, responder);
      }
    },

    /**
     * Stops measuring media statistics for media connection to given scope.
     *
     * #### Possible errors:
     *
     * - {@link ADL.ErrorCodes.Common.DEFAULT_ERROR}<br/>
     *   If an unexpected, internal error occurs.
     *
     * @summary Stops measuring media statistics for selected connection.
     * @since 1.0.0.0
     * @see ADL.AddLiveService#stopMeasuringStatistics
     * @see ADL.AddLiveServiceListener#newVideoStats
     * @see ADL.AddLiveServiceListener#newAudioStats()
     * @param {ADL.Responder} responder
     *          Responder object. See calling AddLive plug-in service methods.
     * @param {string} scopeId
     *          id of media scope to measure media stats of
     */
    stopMeasuringStatistics:function (responder, scopeId) {
      var mName = 'stopMeasuringStatistics(' + scopeId + ')';
      try {
        Log.d('Calling plugin method ' + mName);
        responder.setMethod(mName);
        responder.sendAERonError(true);
        ADL.Utils.validate(responder, 'scopeId|defined,string,nonEmpty',
            scopeId);

        this.nativeService.stopMeasuringStatistics(responder, scopeId);
      } catch (exception) {
        _reportJSError(mName, exception, responder);
      }
    },


    /**
     * Starts playing a test sound. The playing will stop automatically after
     * reaching end of the test wave file or may be stopped by calling
     * stopPlayingTestSound method. The startPlayingTestSound method is mostly
     * useful when selecting audio output device and setting volume levels - user
     * can test the device and desired levels.
     *
     * #### Possible errors:
     *
     * - {@link ADL.ErrorCodes.Common.DEFAULT_ERROR}<br/>
     *   If an unexpected, internal error occurs.
     *   In case of this method, it may mean that the wave file used to playing
     *   the test sound is missing thus the plugin installation is somehow
     *   corrupted.
     *
     * @summary Starts playing a test sound.
     * @since 1.0.0.0
     * @see ADL.AddLiveService#stopPlayingTestSound
     * @param {ADL.Responder} responder
     *          Responder object. See calling AddLive plug-in service methods.
     */
    startPlayingTestSound:function (responder) {
      var mName = 'startPlayingTestSound()';
      try {
        Log.d('Calling plugin method ' + mName);
        responder.setMethod(mName);
        responder.sendAERonError(true);
        if (this.nativeService.startPlayingTestSound) {
          this.nativeService.startPlayingTestSound(responder);
        } else {
          this.nativeService.playTestSound(responder);
        }
      } catch (exception) {
        _reportJSError(mName, exception, responder);
      }
    },

    /**
     * Stops playing test sound.
     *
     * #### Possible errors:
     *
     * - {@link ADL.ErrorCodes.Common.DEFAULT_ERROR}<br/>
     *   If an unexpected, internal error occurs.
     *
     * #### WebRTC Notice:
     *
     * This method is not supported in native WebRTC mode
     *
     * @summary Stops playing test sound.
     * @since 1.0.0.0
     * @see ADL.AddLiveService#startPlayingTestSound
     * @param {ADL.Responder} responder
     *          Responder object. See calling AddLive plug-in service methods.
     */
    stopPlayingTestSound:function (responder) {
      var mName = 'stopPlayingTestSound()';
      try {
        Log.d('Calling plugin method stopPlayingTestSound()');
        responder.setMethod(mName);
        responder.sendAERonError(true);
        this.nativeService.stopPlayingTestSound(responder);
      } catch (exception) {
        _reportJSError(mName, exception, responder);
      }
    },

    /**
     * Gets value of a service property. Advanced use only, check the
     * Service Properties section.
     *
     * #### Possible errors:
     *
     * - {@link ADL.ErrorCodes.Logic.INVALID_JS_PARAMETER_KEY}<br/>
     *   Invalid property key was given (empty or unknown by the service).
     *
     * - {@link ADL.ErrorCodes.Common.DEFAULT_ERROR}<br/>
     *   If an unexpected, internal error occurs.
     *
     * @summary Gets value of a service property.
     * @since 1.0.0.0
     * @see ADL.AddLiveService#setSmProperty
     * @param {ADL.Responder} responder
     *          Responder object. See calling AddLive plug-in service methods.
     * @param {string} name
     *          name of the property to get value of
     */
    getProperty:function (responder, name) {
      var method = 'getProperty(' + name + ')';
      try {
        Log.d('Calling plugin method ' + method);
        responder.setMethod(method);
        ADL.Utils.validate(responder, 'name|defined,string,nonEmpty', name);

        //noinspection JSCheckFunctionSignatures
        this.nativeService.getProperty(responder, name);
      } catch (exception) {
        _reportJSError(method, exception, responder);
      }
    },

    /**
     * Sets value of a service property. Advanced use only, check the
     * Service Properties section.
     *
     * #### Possible errors:
     *
     * - {@link ADL.ErrorCodes.Common.DEFAULT_ERROR}<br/>
     *   If an unexpected, internal error occurs.
     *
     * @summary Sets value of a service property.
     * @since 1.0.0
     * @see ADL.AddLiveService#getSmProperty()
     * @param {ADL.Responder} responder
     *          Responder object. See calling AddLive plug-in service methods.
     * @param {string} name
     *          name of the property to set value of.
     * @param {string|Number|boolean} value
     *          value of the property to be set.
     */
    setProperty:function (responder, name, value) {
      var method = 'setProperty(' + name + ', ' + value + ')';
      try {
        Log.d('Calling plugin method ' + method);
        responder.setMethod(method);
        ADL.Utils.validate(responder, 'name|defined,string,nonEmpty', name);
        ADL.Utils.validate(responder, 'value|defined', name);
        //noinspection JSCheckFunctionSignatures
        this.nativeService.setProperty(responder, name, value);
      } catch (exception) {
        _reportJSError(method, exception, responder);
      }
    },

    /**
     * Retrieves the tag of log file used by the service instance.
     * To obtain the content of the log file, use the
     * ADL.AddLivePlugin.getLogFileTag method.
     *
     * @summary Retrieves the tag of log file used by the service instance.
     * @since 1.15.0.0
     * @private
     *
     * @param {ADL.Responder} responder
     *          Responder object. See calling AddLive plug-in service methods.
     */
    getLogFileTag:function (responder) {
      var method = 'getLogFileTag()';
      try {
        Log.d('Calling plugin method ' + method);
        responder.setMethod(method);
        this.nativeService.getLogFileTag(responder);
      } catch (exception) {
      }
    },

    /**
     * @private
     */
    echo:function (responder, value) {
      //noinspection JSUnresolvedFunction
      this.nativeService.echo(responder, value);
    },

    /**
     * @private
     */
    echoNotification:function (responder, value) {
      //noinspection JSUnresolvedFunction
      this.nativeService.echoNotification(responder, value);
    }
  };

  function _sanitizeConnectionDescriptor(responder, connDescriptor) {
    for (var i = 0; i < _CONN_DESCR_SANITIZERS.length; i++) {
      if (!_CONN_DESCR_SANITIZERS[i](responder, connDescriptor)) {
        return false;
      }
    }
    return true;
  }


  /**
   * Makes sure that the connection descriptor URL is properly defined.
   *
   * @param responder
   * @param connectionDescription
   * @return {Boolean}
   * @private
   */
  function _sanitizeConnDescriptorURL(responder, connectionDescription) {
    if (!connectionDescription.url && !connectionDescription.scopeId) {
      responder.error(
          ADL.ErrorCodes.Logic.INVALID_ARGUMENT,
          'Cannot connect as neither scopeId or url not given in the ' +
              'connection descriptor.');
      return false;
    } else {
      return true;
    }
  }

  var _CONN_DESCR_SANITIZERS = [
    _sanitizeConnDescriptorURL
  ];

  /**
   * Reports a JavaScript error to given responder
   *
   * @param {string} method
   *          Name of method that failed
   * @param {object} exception
   *          Exception object
   * @param {ADL.Responder} responder
   *          Responder to report error to
   * @private
   */
  function _reportJSError(method, exception, responder) {
    var exceptionFlat = 'Unknown exception';
    try {
      exceptionFlat = JSON.stringify(exception);
      if (exception.stack) {
        exceptionFlat += '\n' + exception.stack;
      }
    } catch (e) {
      Log.e('Failed to stringify exception');
    }
    try {
      var msg = 'Got a JavaScript error calling method ' + method + ': ' +
          exceptionFlat;
      Log.e(msg);
      var errCode = exception.code || -1;
      ADL.BugReporting.reportBug(ADL.r(), {
        type:'AER-JS',
        cause:msg,
        /*jshint camelcase:false*/
        error_code:errCode
      });
      responder.error(ADL.ErrorCodes.Logic.INTERNAL, msg);

    } catch (e) {
      Log.e('Error in report js error method');
    }
  }

  var reliableConnectors = {};

  function _connectReliably(nativeService, responder, connDescriptor) {
    var rc = new ReliableConnector(nativeService, responder, connDescriptor);
    reliableConnectors[connDescriptor.scopeId] = reliableConnectors;
    rc.connect();
  }


  function ReliableConnector(nativeService, responder, connDescriptor) {
    this.service = nativeService;
    this.responder = responder;
    this.connDescriptor = connDescriptor;
    this.attempts = 0;
    this.attemptsMax = ADL._STATIC_CONFIG.CONNECTS.MAX_RETRIES;
    this.retryFunctor = ADL.Utils.bind(this.connect, this);
  }

  ReliableConnector.prototype = {
    connect:function () {
      var self = this;
      var onSucc = function (mediaConn) {
            delete reliableConnectors[self.connDescriptor.scopeId];
            self.responder.result(mediaConn);
          },
          onErr = function (errCode, errMessage) {
            switch (errCode) {
              case ADL.ErrorCodes.Communication.NETWORK_ERROR:
              case ADL.ErrorCodes.Communication.INVALID_HOST:
              case ADL.ErrorCodes.Communication.INVALID_PORT:
              case ADL.ErrorCodes.Communication.MEDIA_LINK_FAILURE:
                if (self.attempts >= self.attemptsMax) {
                  Log.w('Failed to connect ' + self.attempts +
                      ' times to AddLive scope ' +
                      self.connDescriptor.scopeId +
                      '. Reporting error to the application');

                  self.responder.error(errCode, errMessage);
                } else {
                  Log.w('Failed to connect to AddLive scope ' +
                      self.connDescriptor.scopeId + '. Retrying');
                  setTimeout(self.retryFunctor,
                      ADL._STATIC_CONFIG.CONNECTS.RETRY_INTERVAL);
                }
                break;
              default:
                delete reliableConnectors[self.connDescriptor.scopeId];
                self.responder.error(errCode, errMessage);
            }
          };
      this.attempts += 1;
      this.service.connect(ADL.r(onSucc, onErr), this.connDescriptor);
    }
  };


}());
/**
 * Copyright (C) SayMama Ltd 2012
 *
 * All rights reserved. Any use, copying, modification, distribution and selling
 * of this software and it's documentation for any purposes without authors'
 * written permission is hereby prohibited.
 */
/**
 * @fileoverview
 * AddLive Service notifications handling facility.
 *
 * @author Tadeusz Kozak
 * @date 28-05-2012 20:04
 */

(function () {
  'use strict';

  /**
   * Defines all methods expected by the AddLiveService to dispatch
   * notifications.
   *
   * @summary Defines all methods expected by the AddLiveService to dispatch
   *          notifications.
   * @since 1.0.0.0
   * @see ADL.AddLiveService#addServiceListener
   * @constructor
   */
  ADL.AddLiveServiceListener = function () {
  };

  ADL.AddLiveServiceListener.prototype = {

    /**
     * Called to notify about change of spatial resolution of video feed, produced
     * by video sink with given id.
     *
     * @summary Notifies about change of spatial resolution of video feed
     * @since 1.15.0.0
     * @see ADL.VideoFrameSizeChangedEvent
     * @param {ADL.VideoFrameSizeChangedEvent} e
     *          Event object describing the change event.
     */
    onVideoFrameSizeChanged:function (e) {
      e._defaultHandlings += 1;
    },


    /**
     * Called to notify about lost connection for scope with given id.
     *
     * @summary Notifies about lost connection for scope with given id.
     * @since 1.0.0.0
     * @see ADL.AddLiveService#connect
     * @param {ADL.ConnectionLostEvent} e
     *          Object describing the connection lost event.
     */
    onConnectionLost:function (e) {
      e._defaultHandlings += 1;
    },


    /**
     * The onUserEvent method is called whenever remote participant joins
     * or leaves a media scope to which local client is also connected.
     *
     * From API perspective, this event will be triggered by a call on the
     * remote end to either {@link ADL.AddLiveService#connect} or
     * {@link ADL.AddLiveService#disconnect} methods.
     *
     * The {@link ADL.UserStateChangedEvent} passed to the callback has
     * all the properties defined except for the
     * {@link ADL.UserStateChangedEvent#mediaType} as the event is not related
     * to any particular media type. Please note that the
     * {@link ADL.UserStateChangedEvent#videoSinkId} and
     * {@link ADL.UserStateChangedEvent#screenSinkId} properties are defined
     * only if the {@link ADL.UserStateChangedEvent#videoPublished} or
     * {@link ADL.UserStateChangedEvent#screenPublished} is set to
     * <code>true</code>.
     *
     * @summary Notifies about a change in connectivity status of a remote
     *          participant.
     * @since 1.15.0.0
     * @see ADL.AddLiveService#connect
     * @see ADL.AddLiveService#disconnect
     * @see ADL.AddLiveServiceListener#onMediaStreamEvent
     * @see ADL.UserStateChangedEvent
     * @param {ADL.UserStateChangedEvent} e
     *      Event describing the change in user connectivity status.
     */
    onUserEvent:function (e) {
      e._defaultHandlings += 1;
    },

    /**
     * Streaming status change may mean either that user started or stopped
     * publishing the stream of given media (audio, video, screen).
     *
     * From API perspective, this event will be triggered by a call on the
     * remote end to either {@link ADL.AddLiveService#publish} or
     * {@link ADL.AddLiveService#unpublish} methods.
     *
     * The {@link ADL.UserStateChangedEvent} passed to the callback has defined
     * only the attributes related to the media type. For example, if the event
     * is triggered by a remote peer publishing video, the
     * {@link ADL.UserStateChangedEvent} will have following attributes defined:
     *
     * - {@link ADL.UserStateChangedEvent#userId}
     * - {@link ADL.UserStateChangedEvent#scopeId}
     * - {@link ADL.UserStateChangedEvent#mediaType} set to
     *   {@link ADL.MediaType.VIDEO}
     * - {@link ADL.UserStateChangedEvent#videoPublished} set to
     *   <code>true</code>
     * - {@link ADL.UserStateChangedEvent#videoSinkId}
     *
     * In general, the {@link ADL.UserStateChangedEvent} used in context of the
     * {@link ADL.AddLiveServiceListener#onMediaStreamEvent} describes only
     * delta of the streaming state. It's an application responsibility to store
     * the state of remote peers streaming, if required.
     *
     * @summary Notifies about media streaming status change for given remote user.
     * @since 1.15.0.0
     * @see ADL.AddLiveService#publish
     * @see ADL.AddLiveService#unpublish
     * @see ADL.AddLiveServiceListener#onUserEvent
     * @see ADL.AddLiveServiceListener#onAudioEvent
     * @param {ADL.UserStateChangedEvent} e
     *          Event describing the change in remote peers video streaming status.
     */
    onMediaStreamEvent:function (e) {
      e._defaultHandlings += 1;
    },


    /**
     * Reports audio capture device activity (a.k.a. speech level).
     *
     * @summary Reports audio capture device activity (a.k.a. speech level).
     * @since 1.0.0.0
     * @see ADL.AddLiveService#monitorMicActivity
     * @param {ADL.MicActivityEvent} e
     *          Event describing the activity change;
     */
    onMicActivity:function (e) {
      e._defaultHandlings += 1;
    },

    /**
     * @summary Reports speech activity within given scope.
     * @param {ADL.SpeechActivityEvent} e
     *
     */
    onSpeechActivity:function (e) {
      e._defaultHandlings += 1;
    },
    /**
     * Reports changes in audio capture device gain, done by the
     * Automatic Gain Control subsystem.
     *
     * @summary Reports changes in audio capture device gain.
     * @since 1.0.0.0
     * @param {ADL.MicGainEvent} e
     *          Event describing the change in gain level.
     */
    onMicGain:function (e) {
      e._defaultHandlings += 1;
    },


    /**
     * Callback reporting that there was a change in hardware devices
     * configuration - it indicates that device was plugged or unplugged from
     * user's computer.
     *
     * @summary Notifies a change in hardware devices configuration.
     * @since 1.0.0.0
     * @param {ADL.DeviceListChangedEvent} e
     *          Event describing the change.
     */
    onDeviceListChanged:function (e) {
      e._defaultHandlings += 1;
    },


    /**
     * Reports availability of new video stream statistics for connection to media
     * scope with given id.
     *
     * @summary Reports availability of new video stream statistics.
     * @since 1.0.0.0
     * @see ADL.AddLiveService#startMeasuringStatistics
     * @param {ADL.MediaStatsEvent} e
     *          Event object
     */
    onMediaStats:function (e) {
      e._defaultHandlings += 1;
    },

    /**
     * Reports new message sent from a remote peer.
     *
     * @summary Reports new message sent from a remote peer.
     * @since 1.15.0.0
     * @see ADL.AddLiveService#sendMessage
     * @see ADL.MessageEvent
     * @param {ADL.MessageEvent} e
     *          Event describing the message received.
     */
    onMessage:function (e) {
      e._defaultHandlings += 1;
    },

    /**
     * Informs about change in media connection type for given scope and media
     * stream. It's purpose is solely informational.
     *
     * @summary Informs about change in media connection type.
     * @since 1.15.0.0
     * @see ADL.MediaConnTypeChangedEvent
     * @param {ADL.MediaConnTypeChangedEvent} e
     *          Event describing the change.
     */
    onMediaConnTypeChanged:function (e) {
      e._defaultHandlings += 1;
    },

    /**
     * Informs about a change of media quality issue state. The media quality
     * issue may just became active (user starts experiencing it) or may just
     * became inactive (issue was resolved by user action or organically).
     * In the first case, the issue will be reported with the
     * {@link ADL.MediaIssueEvent.isActive} property set to <code>true</code>,
     * in the latter, the property will be set to <code>false</code>.
     *
     * @summary Informs about a change of media quality issue state.
     * @since 2.1.9
     * @see ADL.MediaIssueEvent
     * @param {ADL.MediaIssueEvent} e
     *          Event describing the change.
     */
    onMediaIssue:function (e) {
      e._defaultHandlings += 1;
    },

    /**
     * This may be related to audio, video or screen channel failure. After the
     * failure, the channel does not transmit any media and the state is equal
     * to the one when particular media is not published. Application may try to
     * resume the publishing by calling the {@link ADL.AddLiveService#publish}
     * method.
     *
     * @summary Informs about a failure of a media channel.
     * @since 2.3.3
     * @param {ADL.MediaStreamFailureEvent} e
     *          Event object describing the failure.
     */
    onMediaStreamFailure:function (e) {
      e._defaultHandlings += 1;
    },

    /**
     * @summary Informs about successful reconnection to given session.
     * @since 2.3.3
     * @param {ADL.SessionReconnectedEvent} e
     *          Event object describing the reconnection details.
     */
    onSessionReconnected:function (e) {
      e._defaultHandlings += 1;
    }
  };


  /**
   * This change may be caused by one of following:
   *
   * * Adaptation algorithms decided to increase or reduce the quality of the
   *   video feed on remote end uplink
   * * Remote peer reconfigured the video stream
   * * In case of screen sharing, the window shared was resized

   * @summary Event describing a change of a resolution in a video feed produced
   *          by given video sink.
   * @since 1.0.0.0
   * @param {Object} e
   *          Native event
   * @constructor
   */
  ADL.VideoFrameSizeChangedEvent = function (e) {


    /**
     * The type of this event.
     *
     * @type {string}
     */
    this.type = 'VideoFrameSizeChangedEvent';

    /**
     * Id of video sink which resolution has changed.
     *
     *
     * @type {string}
     */
    this.sinkId = e.sinkId;

    /**
     * New width of the video feed provided by the sink.
     *
     *
     * @type {Number}
     */
    this.width = e.width;

    /**
     * New height of the video feed provided by the sink.
     *
     *
     * @type {Number}
     */
    this.height = e.height;

    this._defaultHandlings = 0;
  };

  /**
   * @summary Event describing a lost connection.
   * @since 1.15.0.0
   * @param {Object} e
   *          Native event
   * @constructor
   */
  ADL.ConnectionLostEvent = function (e) {
    /**
     * The type of this event.
     *
     *
     * @type {string}
     */
    this.type = 'ConnectionLostEvent';

    /**
     * Id of scope to which this event refers.
     *
     *
     * @type {string}
     */
    this.scopeId = e.scopeId;

    /**
     * Error code identifying the cause of connection loss.
     *
     * @see ADL.ErrorCodes.Communication
     *
     * @type {Number}
     */
    this.errCode = e.errCode;

    /**
     * Additional, human-readable error message.
     *
     *
     * @type {string}
     */
    this.errMessage = e.errMessage;

    /**
     * Boolean flag indicating whether the AddLive SDK attempt to reestablish
     * the connection.
     *
     * If the automatic reconnects were enabled (this is done using the flag enableReconnects
     * set to true passed to the {@link ADL.initPlatform} function) the SDK
     * will repeatedly try to reconnect. This will be done either until the
     * application calls {@link ADL.AddLiveService#disconnect} or the connection
     * will fail due to an expired authentication.
     * In the latter case, it will be report to the application using another
     * {@link ADL.AddLiveServiceListener#onConnectionLost} notification, with
     * the willReconnect attribute set to false.
     *
     * If the reconnection succeeds, it will be reported using the
     * {@link ADL.AddLiveServiceListener.onSessionReconnected} notification.
     *
     * @since 2.3.10
     * @type {Boolean}
     */
    this.willReconnect = e.willReconnect;

    this._defaultHandlings = 0;
  };


  /**
   * Event class describing change in media streaming status of a remote peer.
   * This includes: user joining media scope, user leaving media scope, user
   * publishing or stop publishing any of possible media streams.
   *
   * This event is used by two callback methods:
   * {@link ADL.AddLiveServiceListener#onUserEvent} and
   * {@link ADL.AddLiveServiceListener#onMediaStreamEvent}. When used in context
   * of the first one, it describes a complete streaming state of a remote peer.
   * Also in this case, the {@link ADL.UserStateChangedEvent#mediaType}
   * attribute is <code>undefined</code> as the event is not related to any
   * particular media.
   *
   * On the other hand, when this event is used by the
   * {@link ADL.AddLiveServiceListener#onMediaStreamEvent} it describes only
   * a change in remote peer's streaming state. In this case, the
   * {@link ADL.UserStateChangedEvent#mediaType} defines to which particular
   * media this event is related and then the appropriate
   * __{audio,video,screen}Published__ attribute defines whether the media was
   * published or unpublished.
   *
   * @summary Event class describing change in media status of a remote peer.
   * @since 1.15.0.0
   * @see ADL.AddLiveServiceListener#onUserEvent
   * @see ADL.AddLiveServiceListener#onMediaStreamEvent
   * @param {Object} e
   *          Dictionary containing event data.
   * @constructor
   */
  ADL.UserStateChangedEvent = function (e) {

    /**
     * The type of this event.
     *
     *
     * @type {string}
     */
    this.type = 'UserStateChangedEvent';

    /**
     * Id of scope to which this event refers.
     *
     *
     * @type {string}
     */
    this.scopeId = e.scopeId;

    /**
     * Id of the user to which this events refer.
     *
     * @type {Number}
     */
    this.userId = e.userDetails.id || e.userDetails.userId;


    /**
     * Type of media to which this event refer. Undefined if it's used to notify
     * about remote user's connection state changed.
     *
     * @see ADL.MediaType
     *
     * @type {string|undefined}
     */
    this.mediaType = e.mediaType;

    /**
     * Flag defining whether the remote user joins or leaves the media scope.
     *
     *
     * @type {boolean}
     */
    this.isConnected = e.userDetails.isConnected;

    /**
     * Flag defining whether the remote user published audio stream or not.
     *
     *
     * @type {boolean}
     */
    this.audioPublished = e.userDetails.audioPublished;

    /**
     * Flag defining whether the remote user published video stream or not.
     *
     *
     * @type {boolean}
     */
    this.videoPublished = e.userDetails.videoPublished;

    /**
     * Flag defining whether the remote user published screen sharing stream or
     * not.
     *
     *
     * @type {boolean}
     */
    this.screenPublished = e.userDetails.screenPublished;

    /**
     * The id of the video sink which should be used to render remote user's
     * video feed. Has a defined value  only if the __videoPublished__ is true.
     *
     *
     * @type {string}
     */
    this.videoSinkId = e.userDetails.videoSinkId;

    /**
     * The id of the video sink which should be used to render remote user's
     * screen sharing feed. Has a defined value only if the __screenPublished__
     * is true.
     *
     *
     * @type {string}
     */
    this.screenSinkId = e.userDetails.screenSinkId;
    this._defaultHandlings = 0;
  };

  /**
   * Describes change in local audio capture device activity change.
   *
   * @summary Describes change in local audio capture device activity change.
   * @since 1.15.0.0
   * @see ADL.AddLiveServiceListener#onMicActivity
   * @param {Object} e
   *          Dictionary containing event data.
   * @constructor
   */
  ADL.MicActivityEvent = function (e) {

    /**
     * The type of this event.
     *
     *
     * @type {string}
     */
    this.type = 'MicActivityEvent';

    /**
     * New microphone activity. Value in range 0-255.
     *
     *
     * @type {Number}
     */
    this.activity = e.activity;
    this._defaultHandlings = 0;
  };

  /**
   * Describes a change in audio capture device gain level.
   *
   * @summary Describes a change in audio capture device gain level.
   * @since 1.15.0.0
   * @see ADL.AddLiveServiceListener#onMicGain
   * @param {Object} e
   *          Dictionary containing event data.
   * @constructor
   */
  ADL.MicGainEvent = function (e) {
    /**
     * The type of this event.
     *
     *
     * @type {string}
     */
    this.type = 'MicGainEvent';

    /**
     * New microphone gain. Value in range 0-255.
     *
     *
     * @type {Number}
     */
    this.gain = e.gain;
    this._defaultHandlings = 0;
  };

  /**
   * Event describing the change in hardware devices configuration.
   *
   * @summary Event describing the change in hardware devices configuration.
   * @since 1.15.0.0
   * @param {Object} e
   *          Dictionary containing event data.
   * @constructor
   */
  ADL.DeviceListChangedEvent = function (e) {
    /**
     * The type of this event.
     *
     *
     * @type {string}
     */
    this.type = 'DeviceListChangedEvent';

    /**
     * Flag defining whether there was a change in audio capture devices
     * list.
     *
     *
     * @type {boolean}
     */
    this.audioInChanged = e.audioInChanged;


    /**
     * Flag defining whether there was a change in audio output devices
     * list.
     *
     *
     * @type {boolean}
     */
    this.audioOutChanged = e.audioOutChanged;

    /**
     * Flag defining whether there was a change in video capture devices
     * list.
     *
     *
     * @type {boolean}
     */
    this.videoInChanged = e.videoInChanged;
    this._defaultHandlings = 0;
  };


  /**
   * Event describing new media stats related to media stream of a particular
   * type and (optionally) a remote user.
   *
   * ## Stats object.
   *
   * The {@link ADL.MediaStatsEvent.stats} object contains properties describing
   * the current state of the particular media channel (audio, video or screen).
   * Depending on the media type - whether it's audio or video and screen the
   * stats object has different attributes. These are listed below.
   *
   * #### Common stats.
   *
   * These stats are common for both audio and video streams.
   *
   * - __totalKbps__ the total bitrate for stream
   * - __cumulativePacketLoss__ the total amount of packets lost since the start of
   *   the channel
   * - __fractionLost__ the percentage of packets lost in given snapshot
   * - __rtt__ round trip time
   * - __timestamp__ stats timestamp in local clock
   *
   *
   *
   * #### Audio stats
   *
   * - __bufferLength__ the complete length of the receive buffer. This is is valid
   *   only in context of remote peers
   *
   * #### Video stats
   *
   * - __cpu__ percentage of CPU used by the plug-in process
   * - __totalCpu__ total host's CPU use in percentage. Full utilisation is 100%
   *   even on computers with multicore-CPUs
   * - __fps__ frame rate
   * - __processingTime__ average time to process single frame (encode or decode)
   * - __psnr__ picture quality of encoded frames. In tenths of db, e.g. value 312
   *   means 31.2dB
   * - __qdl__ queuing delay in milliseconds. Identifies whether there is a
   *   buffering happening on the channel. May have negative values, which
   *   indicate that the channel is capable to transmit more data then it is
   *   sent.
   * - __downlinkStats.avOffset__ audio video synchronisation offset. Applies only
   *   to the downlink stats in context of a remote peer. Positive values means
   *   that the audio is delayed and the video needs to be paused to catch up
   *   with the audio. Negative values indicate opposite.
   *
   * @summary Event describing media stream statistics.
   * @since 1.15.0.0
   * @see ADL.AddLiveServiceListener#onMediaStats
   * @param {Object} e
   *          Dictionary containing event data.
   * @constructor
   */
  ADL.MediaStatsEvent = function (e) {
    /**
     * The type of this event.
     *
     *
     * @type {string}
     */
    this.type = 'MediaStatsEvent';

    /**
     * Id of scope to which this event refers.
     *
     *
     * @type {string}
     */
    this.scopeId = e.scopeId;

    /**
     * Type of media to which this event refer. Undefined if it's used to notify
     * about remote user's connection state changed.
     *
     * @see ADL.MediaType
     *
     * @type {string}
     */
    this.mediaType = e.mediaType;

    /**
     * The stats object. Depending on the type of media to which this
     * MediaStatsEvent is related, the stats object will have different
     * attributes. See class documentation for more details.
     *
     * @type {Object}
     */
    this.stats = e.stats;

    /**
     * Id of remote users to which stats refer to. Undefined if stats describes
     * the uplink channel.
     *
     *
     * @type {Number|undefined|null}
     */
    this.remoteUserId = e.remoteUserId;
    this._defaultHandlings = 0;
  };

  /**
   * Describes a new message sent from a remote peer.
   *
   * @summary Describes a new message sent from a remote peer.
   * @since 1.15.0.0
   * @see ADL.AddLiveService#sendMessage
   * @see ADL.AddLiveServiceListener#onMessage
   * @param {Object} e
   *          Dictionary containing event data.
   * @constructor
   */
  ADL.MessageEvent = function (e) {

    /**
     * The type of this event.
     *
     *
     * @type {string}
     */
    this.type = 'MessageEvent';

    /**
     * Id of scope within which the message was sent.
     *
     * @type {String}
     */
    this.scopeId = e.scopeId;

    /**
     * Id of user who send the message.
     *
     *
     * @type {Number}
     */
    this.srcUserId = e.srcUserId;

    /**
     * Message data.
     *
     *
     * @type {string}
     */
    if (typeof e.data === 'string') {
      this.data = e.data;
    } else {
      this.data = JSON.stringify(e.data);
    }
    this._defaultHandlings = 0;
  };

  /**
   * Describes a change in a media connection type for a given media scope and
   * a media type.
   *
   * @summary Describes a change in a media connection type.
   * @since 1.15.0.0
   * @param {Object} e
   *          Dictionary containing event data.
   * @constructor
   */
  ADL.MediaConnTypeChangedEvent = function (e) {

    /**
     * The type of this event.
     *
     *
     * @type {string}
     */
    this.type = 'MediaConnTypeChangedEvent';

    /**
     * Id of scope to which this event refers.
     *
     *
     * @type {string}
     */
    this.scopeId = e.scopeId;

    /**
     * Type of media to which this event refer. Undefined if it's used to notify
     * about remote user's connection state changed.
     *
     * @see ADL.MediaType
     *
     * @type {string}
     */
    this.mediaType = e.mediaType;

    /**
     * New type of media connection established.
     *
     *
     * @type {string}
     */
    this.connectionType = e.connectionType;
    this._defaultHandlings = 0;
  };

  /**
   * Event dispatched whenever AddLive service detects issues with media
   * quality.
   *
   * @summary Describes media quality issue.
   * @since 2.1.9
   * @param {Object} e
   *          Dictionary containing event data.
   * @see ADL.AddLiveServiceListener#onMediaIssue
   * @constructor
   */
  ADL.MediaIssueEvent = function (e) {

    /**
     * Type of event.
     *
     * @type {String}
     */
    this.type = 'MediaIssueEvent';
    /**
     * Id of scope to which this event refers.
     *
     *
     * @type {String}
     */
    this.scopeId = e.scopeId;

    //noinspection JSAccessibilityCheck
    /**
     * Type of media to which this event refer. Undefined if it's used to notify
     * about remote user's connection state changed.
     *
     * @see ADL.MediaType
     *
     * @type {String}
     */
    this.mediaType = ADL.MediaType._fromInt(e.mediaType);

    /**
     * Boolean flag defining, whether the issue just became active (user
     * experiences it now) or inactive (user stopped experiencing it).
     *
     * @type {Boolean}
     */
    this.isActive = e.isActive;

    /**
     * Numeric identifier distinguishing exactly type of issue.
     * @type {String}
     * @see ADL.MediaIssueCodes
     */
    this.issueCode = ADL.MediaIssueCodes._fromInt(e.issueCode);

    /**
     * Additional, human-friendly message.
     *
     * @type {String}
     */
    this.message = e.message;

    /**
     * Id of a remote user affected by the issue. Used when reporting issues
     * specific to reception of feeds from a particular remote peer due to the
     * peer's problems.
     *
     * Defined only in case of notifications related to remote peers.
     *
     * @type {Number}
     */
    this.affectedUserId = e.userId;
    this._defaultHandlings = 0;
  };

  /**
   * Event dispatched whenever there is a failure of an active media channel.
   *
   * @summary Describes a failure of a media channel
   * @since 2.3.3
   * @param {Object} e
   *          Dictionary containing event data.
   * @constructor
   */
  ADL.MediaStreamFailureEvent = function (e) {
    /**
     * Type of event.
     *
     * @type {String}
     */
    this.type = 'MediaStreamFailureEvent';

    /**
     * Id of scope to which this event refers.
     *
     *
     * @type {String}
     */
    this.scopeId = e.scopeId;

    //noinspection JSAccessibilityCheck
    /**
     * Type of media to which this event refer. Undefined if it's used to notify
     * about remote user's connection state changed.
     *
     * @see ADL.MediaType
     *
     * @type {String}
     */
    this.mediaType = e.mediaType;

    /**
     * Error code identifying the cause of connection loss.
     *
     * @see ADL.ErrorCodes.Communication
     *
     * @type {Number}
     */
    this.errCode = e.errCode;

    /**
     * Additional, human-readable error message.
     *
     *
     * @type {string}
     */
    this.errMessage = e.errMessage;

    this._defaultHandlings = 0;
  };

  /**
   * This even allows the application to tell which session was just
   * successfully reconnected.
   *
   * @summary Event object describing the session reconnection event.
   * @since 2.3.3
   * @see ADL.AddLiveServiceListener#onSessionReconnected
   * @param e native event
   * @constructor
   */
  ADL.SessionReconnectedEvent = function (e) {

    /**
     * Type of the event.
     *
     * @type {String}
     */
    this.type = 'SessionReconnectedEvent';

    /**
     * An id of scope to which this event refers.
     *
     *
     * @type {String}
     */
    this.scopeId = e.scopeId;
    this._defaultHandlings = 0;

  };

  /**
   * @summary Event describing speech activity with a session.
   *
   * The SpeechActivityEvent contains speech levels of all session participants
   * and also an array of active speakers.
   *
   * Whenever the event refers to a local user, and id of -1 is used.
   *
   * @since 3.0.27
   * @param e native event
   * @constructor
   */
  ADL.SpeechActivityEvent = function (e) {
    this.type = 'SpeechActivityEvent';

    /**
     * An id of scope to which this event refers.
     *
     * @type {String}
     */
    this.scopeId = e.scopeId;

    /**
     * A speech activity list. List contains dictionaries with two properties:
     * __userId__ and __activity__. The speech  level is an normalised integer
     * in range [0..255].
     *
     * @type {Object}
     */
    this.speechActivity = e.speechActivity;

    /**
     * A list of active speakers. The list is represented as an array of user
     * identifiers.
     *
     * @type {Array}
     */
    this.activeSpeakers = e.activeSpeakers;

    /**
     *
     * @type {Number}
     * @private
     */
    this._defaultHandlings = 0;
  };

}());/**
 * Copyright (C) LiveFoundry Inc. 2013
 *
 * All rights reserved. Any use, copying, modification, distribution and selling
 * of this software and it's documentation for any purposes without authors'
 * written permission is hereby prohibited.
 *
 */

/**
 * @fileoverview
 * Single class source - contains definition of the AddLiveService class.
 *
 * @author Tadeusz Kozak
 * @date 5/1/13 10:46 AM
 */

(function (w) {
  'use strict';

  // Imports
  var ADL = w.ADL,
      Log = null,
      Utils = null;

  var appId, containerId, trackingEndpoint;

  /**
   *
   * @private
   * @enum {String}
   */
  var TrackableAction = {

    INSTALLATION_STARTED:'install_request',

    INSTALLATION_COMPLETE:'install_complete',

    INSTALLATION_REJECTED:'install_rejected',

    UPDATE_STARTED:'update_started',

    UPDATE_COMPLETE:'update_complete',

    UPDATE_ERROR:'update_complete'


  };

  function init(options, cId) {
    // Lazy loading
    Log = ADL.Log;
    Utils = ADL.Utils;

    Log.d('Initializing the AddLiveTracker');
    appId = options.applicationId;
    trackingEndpoint = options.trackingEndpoint;
    containerId = cId;
  }

  function trackAction(action) {
    Log.d('Tracking action: ' + action);
    var trackingGif = document.createElement('img');
    trackingGif.src = trackingEndpoint +
        '?application_id=' + appId +
        '&action=' + action;
    var container = document.getElementById(containerId);
    container.appendChild(trackingGif);
  }


  // Exports
  ADL.Tracker = {
    init:init,
    trackAction:trackAction
  };
  ADL.TrackableAction = TrackableAction;

}(window));/**
 * Copyright (C) LiveFoundry Inc. 2013
 *
 * All rights reserved. Any use, copying, modification, distribution and selling
 * of this software and it's documentation for any purposes without authors'
 * written permission is hereby prohibited.
 *
 * =============================================================================
 * @fileoverview
 *
 * TODO module description
 *
 * @author Tadeusz Kozak
 * @date 12.02.13 11:57
 */


(function () {
  'use strict';

  /**
   * AddLive Service Listener Adapter interface. Defines the callback API
   * used by the AddLive service to notify the JavaScript application about
   * various global events.
   *
   * @summary AddLive Service Listener Adapter interface.
   * @private
   * @constructor
   */
  function ADLEventsRouter() {
    this.listeners = [];
  }

  ADLEventsRouter.prototype = {

    validateHandled:function (e, label) {
      if (e._defaultHandlings === this.listeners.length) {
        ADL.Log.w('Got unhandled event: ' + label + ' (' + JSON.stringify(e) +
            ')');
      }
    },

    videoFrameSizeChanged:function (sinkId, width, height) {
      var e = new ADL.VideoFrameSizeChangedEvent(sinkId, width, height);
      var handler = _genEHandler(e, 'onVideoFrameSizeChanged');
      this.listeners.forEach(handler);

    },
    connectionLost:function (scopeId, errCode, errMessage, f) {
      var e = new ADL.ConnectionLostEvent(scopeId, errCode, errMessage);
      var handler = _genEHandler(e, 'onConnectionLost');
      if (f) {
        e.willReconnect = false;
      } else {
        e.willReconnect = ADL._platformOptions.enableReconnects;
      }
      this.listeners.forEach(handler);
      this.validateHandled(e, 'onConnectionLost');

    },
    onUserEvent:function (scopeId, userDetails) {
      var e = new ADL.UserStateChangedEvent(scopeId, userDetails);
      var handler = _genEHandler(e, 'onUserEvent');
      this.listeners.forEach(handler);
      this.validateHandled(e, 'onUserEvent');
    },
    onVideoEvent:function (scopeId, userDetails) {
      var e = new ADL.UserStateChangedEvent(scopeId, userDetails,
          ADL.MediaType.VIDEO);
      var handler = _genEHandler(e, 'onMediaStreamEvent');
      this.listeners.forEach(handler);
      this.validateHandled(e, 'onMediaStreamEvent');
    },
    onAudioEvent:function (scopeId, userDetails) {
      var e = new ADL.UserStateChangedEvent(scopeId, userDetails,
          ADL.MediaType.AUDIO);
      var handler = _genEHandler(e, 'onMediaStreamEvent');
      this.listeners.forEach(handler);
      this.validateHandled(e, 'onMediaStreamEvent');
    },
    onScreenEvent:function (scopeId, userDetails) {
      var e = new ADL.UserStateChangedEvent(
          scopeId,
          userDetails,
          ADL.MediaType.SCREEN);
      var handler = _genEHandler(e, 'onMediaStreamEvent');
      this.listeners.forEach(handler);
      this.validateHandled(e, 'onMediaStreamEvent');
    },
    onMediaStreamEvent:function (e) {
      var handler = _genEHandler(e, 'onMediaStreamEvent');
      this.listeners.forEach(handler);
      this.validateHandled(e, 'onMediaStreamEvent');
    },

    micActivity:function (activity) {
      var e = new ADL.MicActivityEvent(activity);
      var handler = _genEHandler(e, 'onMicActivity');
      this.listeners.forEach(handler);
    },
    micGain:function (gain) {
      var e = new ADL.MicGainEvent(gain);
      var handler = _genEHandler(e, 'onMicGain');
      this.listeners.forEach(handler);
    },
    deviceListChanged:function (audioIn, audioOut, videoIn) {
      var e = new ADL.DeviceListChangedEvent(audioIn, audioOut, videoIn);
      var handler = _genEHandler(e, 'onDeviceListChanged');
      this.listeners.forEach(handler);
      this.validateHandled(e, 'onDeviceListChanged');
    },
    newVideoStats:function (scopeId, userId, stats) {
      if (userId === -1) {
        userId = undefined;
      }
      var e = new ADL.MediaStatsEvent(scopeId, ADL.MediaType.VIDEO, stats,
          userId);
      var handler = _genEHandler(e, 'onMediaStats');
      this.listeners.forEach(handler);
    },
    newAudioStats:function (scopeId, userId, stats) {
      if (userId === -1) {
        userId = undefined;
      }
      var e = new ADL.MediaStatsEvent(scopeId, ADL.MediaType.AUDIO, stats,
          userId);
      var handler = _genEHandler(e, 'onMediaStats');
      this.listeners.forEach(handler);
    },
    newScreenStats:function (scopeId, userId, stats) {
      if (userId === -1) {
        userId = undefined;
      }
      var e = new ADL.MediaStatsEvent(scopeId, ADL.MediaType.SCREEN, stats,
          userId);
      var handler = _genEHandler(e, 'onMediaStats');
      this.listeners.forEach(handler);
    },
    onBroadcast:function (scopeId, srcUserId, data) {
      if (data === undefined) {
        // an old plug-in notification
        srcUserId = scopeId;
        data = srcUserId;
        scopeId = undefined;
      }
      var e = new ADL.MessageEvent(scopeId, srcUserId, data);
      var handler = _genEHandler(e, 'onMessage');
      this.listeners.forEach(handler);
      this.validateHandled(e, 'onMessage');
    },

    newMediaConnectionType:function (scopeId, mediaType, connectionType) {
      if (mediaType === 'AUDIO') {
        mediaType = ADL.MediaType.AUDIO;
      } else if (mediaType === 'VIDEO') {
        mediaType = ADL.MediaType.VIDEO;
      }
      var e = new ADL.MediaConnTypeChangedEvent(
          scopeId,
          mediaType,
          connectionType);
      var handler = _genEHandler(e, 'onMediaConnTypeChanged');
      this.listeners.forEach(handler);
    },

    onEchoNotification:function (echoedValue) {
      //noinspection JSUnresolvedFunction
      this.listener.onEchoNotification(echoedValue);
    },
    onMediaQualityIssueChange:function (scopeId, mediaType, active, type, msg) {
      var e = new ADL.MediaIssueEvent({
        scopeId:scopeId,
        mediaType:mediaType,
        isActive:active,
        issueCode:type,
        message:msg,
        userId:undefined
      });

      // Ignore the NETWORK_PROBLEM issue notifications as the implementation
      // is too sensitive at the moment.
      if (e.issueCode === ADL.MediaIssueCodes.NETWORK_PROBLEM) {
        return;
      }
      var handler = _genEHandler(e, 'onMediaIssue');
      this.listeners.forEach(handler);
      this.validateHandled(e, 'onMediaIssue');
    },
    onMediaStreamFailure:function (scopeId, mediaType, errorCode, errorMsg) {

      var e = new ADL.MediaStreamFailureEvent(scopeId, mediaType, errorCode,
              errorMsg),
          m = 'onMediaStreamFailure';

      if (e.mediaType === ADL.MediaType.SCREEN) {
        ADL._service.unpublish(ADL.r(), scopeId, ADL.MediaType.SCREEN);
        this.listeners.forEach(_genEHandler(e, m));
        this.validateHandled(e, m);
      }
    }, onSessionReconnected:function (e) {
      var handler = _genEHandler(e, 'onSessionReconnected');
      this.listeners.forEach(handler);
    }

  };
  var _IGNORED_EVENTS = ['connectionStatus', 'userStatus', 'videoPublished',
    'audioPublished', 'screenPublished', 'serviceInvalidated',
    'serviceRevalidated', 'spkActivity'
  ];

  function _nop() {
  }

  function _genEHandler(e, eventName) {
    return function (l) {
      try {
        l[eventName](e);
      } catch (exc) {
        ADL.Log.w('Error in user defined ' + eventName + ' event handler');
        if (exc.stack) {
          ADL.Log.w('Error details: \n' + exc.stack);
        }
      }
    };

  }

  for (var i = 0; i < _IGNORED_EVENTS.length; i++) {
    ADLEventsRouter.prototype[_IGNORED_EVENTS[i]] = _nop;
  }


  //noinspection JSAccessibilityCheck
  /**
   * @private
   * @type {Function}
   */
  ADL.ADLEventsRouter = ADLEventsRouter;


}());/**
 * Copyright (C) LiveFoundry Inc. 2013
 *
 * All rights reserved. Any use, copying, modification, distribution and selling
 * of this software and it's documentation for any purposes without authors'
 * written permission is hereby prohibited.
 *
 * =============================================================================
 * @fileoverview
 *
 * TODO module description
 *
 * @author Tadeusz Kozak
 * @date 29.01.13 17:30
 */

(function (w) {
  'use strict';

  // Imports
  var ADL = w.ADL,
      Log = null,
      Utils = null;

  // Constants

  var REPORT_DEFAULTS = {
    _call:'report_bug',
    /*jshint camelcase:false */
    container_log:'Empty',
    service_log:'Empty',
    plugin_version:'Unknown',
    js_log:'Empty',
    type:'Empty',
    cause:'Unknown',
    participant_id:1,
    error_code:-1,
    app_id:0
  };


  /**
   * URL pointing to bug tracking server side endpoint
   *
   * @type {string}
   */
  var bugTrackerUrl = '',
      devsTrackingUrl = '',
      logsTrackingUrl = '',
      appId = -1,
      enabled = true,
      alreadyReported = {};

  /**
   * ===========================================================================
   * Public methods
   * ===========================================================================
   */

  /**
   * Initializes the bug reporting facility.
   *
   * @private
   * @param {object} config
   *          Global platform configuration
   */
  function init(config) {
    Log = ADL.Log;
    Utils = ADL.Utils;
    appId = config.applicationId;
    bugTrackerUrl = config.bugReportingEndpoint;
    devsTrackingUrl = config.devsTrackingUrl;
    logsTrackingUrl = config.logsReportingEndpoint;
    if (!devsTrackingUrl) {
      devsTrackingUrl = bugTrackerUrl.replace('reliability/',
          'user_device.create');
    }
    enabled = config.bugReportingEnabled;
  }

  /**
   * Sends bug report request.
   *
   * @param {object} [details]
   *          Report details
   * @param {string} [details.user_message]
   *          Message describing the problem, provided by the user
   * @param {string} [details.type]
   *          Type of the bug report, e.g. AER-CONN, AER-CRASH, AER
   * @param {string} [details.cause]
   *          Problem cause
   * @param {number} [details.error_code]
   *          Error code, in case of method call error
   * @param {ADL.Responder} [responder]
   *          Report result handler
   */
  function reportBug(responder, details) {
    if (!enabled) {
      Log.w('Bug reporting is disabled');
      return;
    }
    Log.w('Sending a bug report');
    var request = {},
        publisher;
    if (!responder) {
      responder = ADL.r();
      details = {};
    } else if (!details) {
      details = {};
    }
    if (details.cause) {
      if (alreadyReported[details.cause]) {
        Log.w('Skipping the report as issue was already reported');
        return;
      }
    }
    if (details.error_code && ADL.ErrorCodes._CLIENT_ERRORS[details.error_code]) {
      Log.w('Problem is due to user action. Skipping AER');
      return;
    }
    try {
      alreadyReported[details.cause] = true;
      Utils.merge(request, REPORT_DEFAULTS);
      /*jshint camelcase:false */
      request.app_id = appId;
      Utils.merge(request, details);
      request.devices = JSON.stringify(ADL._devices);
      publisher = new BugReportPublisher(responder, request);
      publisher.onJsLog(ADL.Log.getTail());
      if (ADL._pluginInstance) {
        if (ADL._pluginInstance.getLogFileTag) {
          publisher.onContainerLog(
              _getLogByTag(
                  ADL._pluginInstance.getLogFileTag()));
        } else {
          Log.w('Plug-in container does not provide getLogFileTag method');
          publisher.onContainerLog();
        }

        if (ADL._service && ADL._service.version) {
          request.plugin_version = ADL._service.version;
        }
        if (ADL.getService()) {

          ADL.getService().getLogFileTag(
              ADL.r(
                  function (tag) {  // succHandler
                    publisher.onServiceLogTag(tag);
                  },
                  function () {     // errHandler
                    Log.w('Failed to obtain service log tag');
                    publisher.onServiceLogTag();
                  })
          );
        } else {
          publisher.onServiceLogTag();
        }
      } else {
        publisher.onContainerLog();
        publisher.onServiceLogTag();
      }
    } catch (e) {
      Log.e('Error processing bug report. Report most likely was not sent');
    }
  }

  function reportCrash(responder, details) {
    Log.w('Reporting Crash Followup AER');
    var request = {};
    Utils.merge(request, REPORT_DEFAULTS);
    request.app_id = appId;
    Utils.merge(request, details);
    Utils.doPost(responder, bugTrackerUrl, request);
  }

  /**
   * @private
   * @param scopeId
   * @param userId
   */
  function postDevices(scopeId, userId) {
    Utils.doPost(ADL.r(), devsTrackingUrl,
        {appId:appId,
          scopeId:scopeId,
          userId:userId,
          deviceType:4,
          device:JSON.stringify(ADL._devices)
        });
  }

  function postLogs(responder, reqData) {
    reqData.appId = appId;
    Utils.doPost(responder, logsTrackingUrl, reqData);
  }

  /**
   * ===========================================================================
   * Private helpers
   * ===========================================================================
   */

  /**
   * Publishes bug report once all data are available.
   *
   * @private
   * @param request
   * @param responder
   * @constructor
   */
  function BugReportPublisher(responder, request) {
    this._request = request;
    this._stepsLeft = 3;
    this._responder = responder;
  }

  BugReportPublisher.prototype = {

    onJsLog:function (log) {
      this._request.js_log = log;
      this._doSendMaybe();
    },

    onServiceLogTag:function (tag) {
      if (tag) {
        this._request.service_log = _getLogByTag(tag);
      }
      this._doSendMaybe();
    },
    onContainerLog:function (log) {
      if (log) {
        this._request.container_log = log;
      }
      this._doSendMaybe();
    },

    _doSendMaybe:function () {
      this._stepsLeft -= 1;
      if (this._stepsLeft > 0) {
        return;
      }
      Log.d('All bug report data are fetched. Sending the report');
      Utils.doPost(this._responder, bugTrackerUrl, this._request);
    }


  };

  var logCache = {};
  function _getLogByTag(tag) {

    if (ADL._pluginInstance && ADL._pluginInstance.getLogFileByTag) {
      ADL._pluginInstance.getLogFileByTagMemSafe(
          tag, 0, logCache);
      if (logCache.content) {
        return logCache.content;
      }
    }
    return '';
  }


// Exports

  /**
   * @private
   * @type {Object}
   */
  ADL.BugReporting = {
    reportBug:reportBug,
    reportCrash:reportCrash,
    init:init,
    postDevices:postDevices,
    postLogs:postLogs
  };


}(window));/**
 * Copyright (C) LiveFoundry Inc. 2013
 *
 * All rights reserved. Any use, copying, modification, distribution and selling
 * of this software and it's documentation for any purposes without authors'
 * written permission is hereby prohibited.
 *
 * =============================================================================
 * @fileoverview
 *
 * TODO module description
 *
 * @author Tadeusz Kozak
 * @date 06.02.13 14:54
 */


(function () {
  'use strict';

  // Imports
  //noinspection JSAccessibilityCheck
  var Log = ADL.Log;

  // Consts
  var KEY_CRASHED_FLAG = 'adl.crashed',
      KEY_JS_LOGS = 'adl.jsLogs',
      KEY_CONTAINER_LOG_TAG = 'adl.containerLogsTag',
      KEY_SERVICE_LOG_TAG = 'adl.serviceLogsTag',
      KEY_PLUGIN_VERSION = 'adl.version';

  // Variables
  var pluginHeartBeatInterval = null,
      reloadOnCrash = null,
      serviceLogTag = null,
      containerLogTag = null,
      crashListeners = [],
      checkTimeoutId;

  /**
   * Provides crash handling functionality. This module is mostly private to
   * the AddLive SDK, with one useful method - registerCrashListener.
   *
   * @summary
   * Provides crash handling functionality. This module is mostly private to
   * the AddLive SDK, with one useful method - registerCrashListener.
   * @see ADL.CrashHandler.registerCrashListener
   * @since 2.0.0
   * @namespace
   */
  ADL.CrashHandler = {};


  /**
   * Initializes the CrashHandler. To init it:
   * - start polling for plug-in availability
   * - checks whether there was a crash previously and sends a bug report
   *
   * @since 2.0.0
   * @param config
   * @private
   */
  ADL.CrashHandler.init = function (config) {
    Log.d('Initializing the CrashHandler');
    pluginHeartBeatInterval = config.pluginHeartBeatInterval;
    reloadOnCrash = config.reloadOnCrash;
    _sendFollowupAerMaybe();

    containerLogTag = ADL._pluginInstance.getLogFileTag();
    var onLogTag = function (logTag) {
      serviceLogTag = logTag;
      window.localStorage[KEY_SERVICE_LOG_TAG] = serviceLogTag;
    };
    window.localStorage[KEY_CONTAINER_LOG_TAG] = containerLogTag;
    window.localStorage[KEY_PLUGIN_VERSION] = ADL._service.version;
    ADL._service.getLogFileTag(ADL.r(onLogTag));
    _startHeartBeat();
  };

  ADL.CrashHandler.dispose = function () {
    Log.d('Disposing the CrashHandler');
    clearTimeout(checkTimeoutId);
  };

  /**
   * Registers listener function that will be notify upon plug-in crash.
   *
   * @summary Registers listener function that will be notify upon plug-in
   *          crash.
   * @since 2.0.0
   * @param {function} listener
   *          listener function to be registered.
   */
  ADL.CrashHandler.registerCrashListener = function (listener) {
    crashListeners.push(listener);
  };

  /**
   * ===========================================================================
   * Private helpers
   * ===========================================================================
   */


  /**
   * Checks whether plug-in crashed previously and sends a full followup
   * Automatic Error Report if it's the case.
   * @private
   */
  function _sendFollowupAerMaybe() {
    if (window.localStorage[KEY_CRASHED_FLAG] !== 'true') {
      return;
    }
    var jsLog = window.localStorage[KEY_JS_LOGS],
        containerLogTag = window.localStorage[KEY_CONTAINER_LOG_TAG],
        serviceLogTag = window.localStorage[KEY_SERVICE_LOG_TAG],
        containerLog = {},
        serviceLog = {};
    try {

      ADL._pluginInstance.getLogFileByTagMemSafe(containerLogTag, 0, containerLog);
      ADL._pluginInstance.getLogFileByTagMemSafe(serviceLogTag, 0, serviceLog);
      if (containerLog.content) {
        containerLog = containerLog.content;
      }
      if (serviceLog.content) {
        serviceLog = serviceLog.content;
      }
    } catch (e) {
      Log.e('Failed to get all the details for the AER');
    }
    var onVersion = function (v) {
      ADL.BugReporting.reportCrash(ADL.r(),
          {
            type:'AER-CF',
            js_log:jsLog,
            container_log:containerLog,
            service_log:serviceLog,
            plugin_version:v
          });
      window.localStorage[KEY_CRASHED_FLAG] = null;
      window.localStorage[KEY_CONTAINER_LOG_TAG] = null;
      window.localStorage[KEY_JS_LOGS] = null;
      window.localStorage[KEY_SERVICE_LOG_TAG] = null;
    }, onVErr = function () {
      onVersion('0.0.0.0');
    };
    ADL.getVersion(ADL.r(onVersion, onVErr));
  }

  /**
   *
   * @private
   */
  function _startHeartBeat() {
    checkTimeoutId = setTimeout(function () {
      if (_heartbeatPlugin()) {
        _startHeartBeat();
      }
    }, 1000);
  }

  /**
   *
   * @return {Boolean}
   * @private
   */
  function _heartbeatPlugin() {
    var objectTag = document.getElementById(ADL._pluginContainerId);

    // Check if the plug-in wasn't unloaded.
    if (objectTag === null) {
      Log.e('Plugin\'s object node was deleted from the DOM tree.');
      return false;
    }

    // Check whether plug-in is functional, using echo method
    if (!_pluginAlive()) {
      _handleCrash();
      return false;
    }

    return true;
  }

  /**
   *
   * @private
   */
  function _handleCrash() {
    Log.e('Plug-in crashed! Marking it in local storage');
    var jsLogs = Log.getTail(),
        version = window.localStorage[KEY_PLUGIN_VERSION];
    window.localStorage[KEY_CRASHED_FLAG] = 'true';
    window.localStorage[KEY_JS_LOGS] = jsLogs;
    // Send a bug report with what we know now.
    /*jshint camelcase:false*/
    ADL.BugReporting.reportCrash(ADL.r(), {type:'AER-CRASH', js_log:jsLogs,
      plugin_version:version});
    if (reloadOnCrash) {
      window.location.reload();
    } else {
      for (var i = 0; i < crashListeners.length; i++) {
        try {
          crashListeners[i]();
        } catch (e) {
          Log.w('Error in crash listener');
        }
      }
    }
  }

  /**
   *
   * @return {Boolean}
   * @private
   */
  function _pluginAlive() {
    if (!ADL._pluginInstance) {
      return false;
    }
    if (!ADL._pluginInstance.pluginInstance) {
      return false;
    }
    if (!('echo' in ADL._pluginInstance.pluginInstance)) {
      return false;
    }
    //noinspection JSUnresolvedFunction
    return ADL._pluginInstance.pluginInstance.echo('1') === '1';
  }


}());/**
 * Copyright (C) SayMama Ltd 2012
 *
 * All rights reserved. Any use, copying, modification, distribution and selling
 * of this software and it's documentation for any purposes without authors'
 * written permission is hereby prohibited.
 */
/**
 * @fileoverview
 * @TODO file description
 *
 * @author Tadeusz Kozak
 * @date 28-05-2012 14:25
 */

(function () {
  'use strict';

  //noinspection JSValidateJSDoc
  /**
   * Defines all error codes returned by the AddLive Plug-In or AddLive
   * Service. The error codes are used with ADL.Responder#error method, as
   * a first parameter given.
   *
   * Error codes were split into 4 groups:
   *
   * - Logic
   * - Communication
   * - Media
   * - Common
   *
   * Each group defines error codes specific for given domain of the AddLive
   * Service.
   *
   * @summary
   * Defines all error codes returned by the AddLive Plug-In or AddLive
   * Service.
   *
   * @namespace
   * @see ADL.Responder.error
   */
  ADL.ErrorCodes = {};


  /**
   * Logic layer error codes
   *
   * @since 1.0.0
   * @summary Logic layer error codes.
   * @enum {Number}
   */
  ADL.ErrorCodes.Logic = {

    /**
     * Returned when application tries to perform operation on AddLive Service
     * in context of media scope to which service is not currently connected.
     *
     * @deprecated Since 2.0.0 Use ADL.ErrorCodes.Logic.INVALID_SCOPE instead.
     * @since 1.0.0.0
     * @see ADL.AddLiveService#disconnect
     * @see ADL.AddLiveService#publish
     * @see ADL.AddLiveService#unpublish
     */
    INVALID_ROOM:1001,

    /**
     * Returned when application tries to perform operation on AddLive Service
     * in context of media scope to which service is not currently connected.
     *
     * @since 2.0.0
     * @see ADL.AddLiveService#disconnect
     * @see ADL.AddLiveService#publish
     * @see ADL.AddLiveService#unpublish
     */
    INVALID_SCOPE:1001,


    /**
     * Returned when application passed somehow invalid argument to any of the
     * AddLiveService methods.
     *
     * @since 1.0.0.0
     */
    INVALID_ARGUMENT:1002,

    // TODO remove this in favor of INVALID_ARGUMENT
    /**
     * Returned when ADL.AddLiveService#getProperty or
     * ADL.AddLiveService#getProperty was called with invalid (unknown) key.
     *
     * @since 1.0.0.0
     * @see ADL.AddLiveService#getProperty
     * @see ADL.AddLiveService#setProperty
     */
    INVALID_JS_PARAMETER_KEY:1003,

    /**
     * Indicates that there was unknown, fatal error during platform
     * initialization. Such a platform initialization includes e.g.
     * initialization of the COM model on windows.
     *
     * @since 1.0.0.0
     */
    PLATFORM_INIT_FAILED:1004,


    /**
     * Indicates that client tried to create service while AddLive Plugin is
     * performing auto-update.
     *
     * @since 1.0.0.0
     */
    PLUGIN_UPDATING:1005,

    /**
     * Indicates that there was internal, logic failure. Most likely it's caused
     * by bug in the AddLive Plug-in code.
     *
     * @since 1.0.0.0
     */
    INTERNAL:1006,

    /**
     * Indicates that plugin container couldn't load logic library, most likely
     * because it is running in Windows Low Integrity mode (less privileged) and
     * the lib is already loaded by process that runs in medium integrity mode
     * (more privileged). Such a situation may occur if the AddLive SDK is used
     * by user in 2 browsers in same time. The first browser launched was
     * non-IE, the second (the one where error is reported) is IE.
     *
     * @since 1.0.0.0
     */
    LIB_IN_USE:1007,

    /**
     * Indicates that the user's platform is unsupported for given operation.
     *
     * @since 1.15.0.6
     */
    PLATFORM_UNSUPPORTED:1009,

    /**
     * Indicates that given operation is invalid in current state of
     * the platform.
     *
     * @since 1.15.0.6
     */
    INVALID_STATE:1010,

    /**
     * Indicates that the user did not allow access to certain resources needed
     * to complete the operation.
     *
     * This error code is used:
     * 1. Within the WebRTC SDK when accessing user media. In this case, the
     * following operations may fail:
     * {@link ADL.AddLiveService.startLocalVideo},
     * {@link ADL.AddLiveService.connect}.
     *
     * @since 3.0.27
     */
    USER_CONSENT_NOT_GIVEN:1101
  };

  /**
   * Communication layer error codes
   *
   * @summary Communication layer error codes.
   * @since 1.0.0
   * @enum {Number}
   */
  ADL.ErrorCodes.Communication = {
    /**
     * Indicates that AddLive Service was trying to connect to streaming server,
     * but cannot find given host (cannot resolve host with given IP/domain
     * address). This may happen if user lost the connection to the Internet.
     *
     * @since 1.0.0.0
     * @see ADL.AddLiveService#connect
     */
    INVALID_HOST:2001,

    /**
     * Indicate that plugin was unsuccessful with connect attempt. It managed
     * to resolve host address and connect to it, so streaming host is running,
     * but it couldn't connect to streamer application. This may happen if
     * there is a firewall device blocking communication with the streamer's
     * management endpoint.
     *
     * @since 1.0.0.0
     * @see ADL.AddLiveService#connect
     */
    INVALID_PORT:2002,

    /**
     * Plugin tried to connect to streamer server, established communication
     * channel, but credentials provided by JS-client were rejected by it.
     *
     * Can be caused by:
     * - invalid credentials used by JS-client (JS-client application bug)
     * - session timeout on core server
     *
     * JS-client could try to recover by:
     * - no recovery
     *
     * @since 1.0.0.0
     * @see ADL.AddLiveService#connect
     */
    BAD_AUTH:2003,

    /**
     * Plugin tried to connect to streamer server, established management
     * communication link, but multimedia communication link failed, so there
     * is no way to transmit media data.
     * This error code can be used before OR after successful connection. When
     * triggered after successful connection, it indicates that media
     * connection was lost.
     *
     * @since 1.0.0.0
     * @see ADL.AddLiveService#connect
     * @see ADL.AddLiveServiceListener#onConnectionLost
     * @see ADL.ConnectionLostEvent
     */
    MEDIA_LINK_FAILURE:2005,

    /**
     * Indicates that plug-in lost connection to streaming server. Most likely
     * due to user losing Internet connection. In case of this error, it is
     * advised to notify the user about the issue and periodically try to
     * reestablish  connection to given media scope.
     *
     * @since 1.0.0.0
     * @see ADL.AddLiveServiceListener#onConnectionLost
     * @see ADL.ConnectionLostEvent
     */
    REMOTE_END_DIED:2006,

    /**
     * Indicates that plug-in couldn't connect to streaming server due to
     * internal, unknown and unexpected error. This error always indicates an
     * bug in AddLive Plug-In.
     *
     * @since 1.0.0.0
     * @see ADL.AddLiveService#connect
     * @see ADL.AddLiveServiceListener#onConnectionLost
     * @see ADL.ConnectionLostEvent
     */
    INTERNAL:2007,

    /**
     * Streamer rejected connection request because user with given id already
     * joined given media scope. User may join media scope only once.
     *
     * @since 1.0.0.0
     * @deprecated
     * @see ADL.AddLiveService#connect
     */
    ALREADY_JOINED:2009,

    /**
     * Indicates that the plug-in used by client is not supported by the
     * streamer to which connection attempt was made.
     *
     * Such a case will happen most likely when trying to connect using
     * a plug-in from the beta release channel to a streamer for stable channel.
     */
    PLUGIN_VERSION_NOT_SUPPORTED:2011,

    /**
     * Indicates that there was an error connecting to the AddLive servers
     * when the SDK tries to resolve which streamer to be used by the
     * for this particular connection. In most cases it means that the user
     * has no Internet connectivity. In an edge case it may also indicate that
     * firewall device on the network does not allow communication with one of
     * AddLive services.
     *
     * @since 2.1.3
     *
     */
    NETWORK_ERROR:2012,
    /**
     * Indicates that SDK tried to connect to the streamer via proxy,
     * and proxy reported back authentication error.
     *
     * @since 3.0.30
     */
    PROXY_AUTH_ERROR:2013,

    /**
     * Indicates that SDK tried to connect via proxy server
     * set by a client code, but connection failed.
     *
     * @since 3.0.30
     */
    PROXY_CONNECTION_FAILED:2014,

    /**
     * Indicates that there was a connection to the scope with the same user id.
     * The AddLive streaming server when encounters an auth request with user id
     * that is the same as id of a user already connected, will terminate the
     * already established connection. This is required to handle reconnects,
     * where client SDK detected the connection lost before the streaming server
     * did.
     *
     * @since 3.0.30
     */
    NEW_USER_CONNECTION:2015
  };

  /**
   * Media layer error codes.
   *
   * @summary Media layer error codes.
   * @since 1.0.0
   * @enum {Number}
   */
  ADL.ErrorCodes.Media = {

    /**
     * Indicates that currently configured video capture
     * device (webcam) is invalid and cannot be used by AddLive Service.
     *
     * @since 1.0.0.0
     * @see ADL.AddLiveService#startLocalVideo
     * @see ADL.AddLiveService#connect
     * @see ADL.AddLiveService#setVideoCaptureDevice
     * @see ADL.AddLiveService#publish
     */
    INVALID_VIDEO_DEV:4001,


    /**
     * Indicates that audio capture device (microphone) haven't been configured
     * using setAudioCaptureDevice, but there is attempt to make a call with
     * audio published.
     *
     * @since 1.0.0.0
     * @see ADL.AddLiveService#connect
     * @see ADL.AddLiveService#publish
     * @deprecated Starting from v3.1.X, the
     *             {@link ADL.ErrorCodes.Media.INVALID_AUDIO_IN_DEV} is used.
     */
    NO_AUDIO_IN_DEV:4002,

    /**
     * Indicates that given audio capture device is invalid. May be thrown
     * with setAudioCaptureDevice.
     *
     * @since 1.0.0.0
     * @see ADL.AddLiveService#connect
     * @see ADL.AddLiveService#publish
     */
    INVALID_AUDIO_IN_DEV:4003,


    /**
     * Indicates that given audio output device is invalid. May be thrown
     * with setAudioOutputDevice.
     *
     * @since 1.0.0.0
     * @see ADL.AddLiveService#connect
     * @see ADL.AddLiveService#publish
     */
    INVALID_AUDIO_OUT_DEV:4004,

    /**
     * Indicates that either audio output or capture device initialization
     * failed and plugin cannot differ or that given audio capture and output
     * devices are for some reason incompatible.
     *
     * @since 1.0.0.0
     * @see ADL.AddLiveService#connect
     * @see ADL.AddLiveService#publish
     */
    INVALID_AUDIO_DEV:4005
  };


  /**
   * Common error codes.
   *
   * @summary Common error codes.
   * @since 1.0.0
   * @enum {Number}
   */
  ADL.ErrorCodes.Common = {

    /**
     * Indicates, general unhandled error. In general it means a bug in AddLive
     * Service or AddLive Plugin.
     *
     * @since 1.0.0.0
     */
    DEFAULT_ERROR:-1

  };

  /**
   * Enumeration listing all the possible media issue codes dispatched by the
   * AddLive Service.
   *
   * @summary Lists all possible media issue codes.
   * @since 2.1.9
   * @see ADL.AddLiveServiceListener.onMediaIssue
   * @see ADL.MediaIssueEvent
   * @enum {String}
   */
  ADL.MediaIssueCodes = {

    /**
     * Indicates that the network connection was lost, possibly temporarily.
     * This is early stage notification, dispatched after not having any media
     * packet received for about 5 seconds.
     *
     * Please note that if the connection won't be restored within another 10
     * seconds, the issue will be elevated to connection lost and reported using
     * {@link ADL.AddLiveServiceListener.onConnectionLost}.
     *
     * @since 2.1.9
     */
    CONNECTION_FROZEN:'CONNECTION_FROZEN',

    /**
     * Indicates that the local user's CPU is over-utilized in a way that
     * directly affects the conversation quality.
     *
     * @since 2.1.9
     */
    CPU_LOAD_HIGH:'CPU_LOAD_HIGH',

    /**
     * Indicates that there is a process running on host PC that utilizes the
     * CPU in a way that affects the AddLive Service processing.
     *
     * If possible, user should check the system activity and terminate any
     * CPU-intensive tasks.
     *
     * @since 2.1.9
     */
    EXTERNAL_CPU_LOAD_HIGH:'EXTERNAL_CPU_LOAD_HIGH',

    /**
     * Indicates a generic network quality issue. It means that the flow of
     * media packets if affected by a quality of network connection in a way
     * that has impact on the call quality.
     *
     * The actual cause of the problem is difficult to determine but in most
     * cases it's one of following reasons:
     *
     * 1. poor WiFi connectivity (user's PC is far from the access point)
     * 1. weak 3G/4G connectivity
     * 1. connection congested due to other network activity
     *
     * @since 2.1.9
     */
    NETWORK_PROBLEM:'NETWORK_PROBLEM'
  };

  /**
   *
   * @param intValue
   * @private
   */
  ADL.MediaIssueCodes._fromInt = function (intValue) {
    intValue = parseInt(intValue, 10);
    switch (intValue) {
      case 1:
        return ADL.MediaIssueCodes.CONNECTION_FROZEN;
      case 2:
        return ADL.MediaIssueCodes.CPU_LOAD_HIGH;
      case 3:
        return ADL.MediaIssueCodes.EXTERNAL_CPU_LOAD_HIGH;
      case 4:
        return ADL.MediaIssueCodes.NETWORK_PROBLEM;
      default:
        return '';
    }
  };

  /**
   *
   * @type {{}}
   * @private
   */
  var _CLIENT_ERRORS = {};

  _CLIENT_ERRORS[ADL.ErrorCodes.Media.INVALID_VIDEO_DEV] = true;
  _CLIENT_ERRORS[ADL.ErrorCodes.Logic.INVALID_SCOPE] = true;
  _CLIENT_ERRORS[ADL.ErrorCodes.Logic.INVALID_ARGUMENT] = true;
  _CLIENT_ERRORS[ADL.ErrorCodes.Logic.USER_CONSENT_NOT_GIVEN] = true;
  _CLIENT_ERRORS[ADL.ErrorCodes.Communication.NEW_USER_CONNECTION] = true;
  _CLIENT_ERRORS[ADL.ErrorCodes.Communication.BAD_AUTH] = true;
  ADL.ErrorCodes._CLIENT_ERRORS = _CLIENT_ERRORS;
}());/*
 json2.js
 2011-10-19

 Public Domain.

 NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

 See http://www.JSON.org/js.html


 This code should be minified before deployment.
 See http://javascript.crockford.com/jsmin.html

 USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
 NOT CONTROL.


 This file creates a global JSON object containing two methods: stringify
 and parse.

 JSON.stringify(value, replacer, space)
 value       any JavaScript value, usually an object or array.

 replacer    an optional parameter that determines how object
 values are stringified for objects. It can be a
 function or an array of strings.

 space       an optional parameter that specifies the indentation
 of nested structures. If it is omitted, the text will
 be packed without extra whitespace. If it is a number,
 it will specify the number of spaces to indent at each
 level. If it is a string (such as '\t' or '&nbsp;'),
 it contains the characters used to indent at each level.

 This method produces a JSON text from a JavaScript value.

 When an object value is found, if the object contains a toJSON
 method, its toJSON method will be called and the result will be
 stringified. A toJSON method does not serialize: it returns the
 value represented by the name/value pair that should be serialized,
 or undefined if nothing should be serialized. The toJSON method
 will be passed the key associated with the value, and this will be
 bound to the value

 For example, this would serialize Dates as ISO strings.

 Date.prototype.toJSON = function (key) {
 function f(n) {
 // Format integers to have at least two digits.
 return n < 10 ? '0' + n : n;
 }

 return this.getUTCFullYear()   + '-' +
 f(this.getUTCMonth() + 1) + '-' +
 f(this.getUTCDate())      + 'T' +
 f(this.getUTCHours())     + ':' +
 f(this.getUTCMinutes())   + ':' +
 f(this.getUTCSeconds())   + 'Z';
 };

 You can provide an optional replacer method. It will be passed the
 key and value of each member, with this bound to the containing
 object. The value that is returned from your method will be
 serialized. If your method returns undefined, then the member will
 be excluded from the serialization.

 If the replacer parameter is an array of strings, then it will be
 used to select the members to be serialized. It filters the results
 such that only members with keys listed in the replacer array are
 stringified.

 Values that do not have JSON representations, such as undefined or
 functions, will not be serialized. Such values in objects will be
 dropped; in arrays they will be replaced with null. You can use
 a replacer function to replace those with JSON values.
 JSON.stringify(undefined) returns undefined.

 The optional space parameter produces a stringification of the
 value that is filled with line breaks and indentation to make it
 easier to read.

 If the space parameter is a non-empty string, then that string will
 be used for indentation. If the space parameter is a number, then
 the indentation will be that many spaces.

 Example:

 text = JSON.stringify(['e', {pluribus: 'unum'}]);
 // text is '["e",{"pluribus":"unum"}]'


 text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
 // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

 text = JSON.stringify([new Date()], function (key, value) {
 return this[key] instanceof Date ?
 'Date(' + this[key] + ')' : value;
 });
 // text is '["Date(---current time---)"]'


 JSON.parse(text, reviver)
 This method parses a JSON text to produce an object or array.
 It can throw a SyntaxError exception.

 The optional reviver parameter is a function that can filter and
 transform the results. It receives each of the keys and values,
 and its return value is used instead of the original value.
 If it returns what it received, then the structure is not modified.
 If it returns undefined then the member is deleted.

 Example:

 // Parse the text. Values that look like ISO date strings will
 // be converted to Date objects.

 myData = JSON.parse(text, function (key, value) {
 var a;
 if (typeof value === 'string') {
 a =
 /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
 if (a) {
 return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
 +a[5], +a[6]));
 }
 }
 return value;
 });

 myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
 var d;
 if (typeof value === 'string' &&
 value.slice(0, 5) === 'Date(' &&
 value.slice(-1) === ')') {
 d = new Date(value.slice(5, -1));
 if (d) {
 return d;
 }
 }
 return value;
 });


 This is a reference implementation. You are free to copy, modify, or
 redistribute.
 */

/*jslint evil: true, regexp: true */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
 call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
 getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
 lastIndex, length, parse, prototype, push, replace, slice, stringify,
 test, toJSON, toString, valueOf
 */


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

var JSON;
if (!JSON) {
  JSON = {};
}

(function () {
  'use strict';

  function f(n) {
    // Format integers to have at least two digits.
    return n < 10 ? '0' + n : n;
  }

  if (typeof Date.prototype.toJSON !== 'function') {

    Date.prototype.toJSON = function (key) {

      return isFinite(this.valueOf())
          ? this.getUTCFullYear()     + '-' +
          f(this.getUTCMonth() + 1) + '-' +
          f(this.getUTCDate())      + 'T' +
          f(this.getUTCHours())     + ':' +
          f(this.getUTCMinutes())   + ':' +
          f(this.getUTCSeconds())   + 'Z'
          : null;
    };

    String.prototype.toJSON      =
        Number.prototype.toJSON  =
            Boolean.prototype.toJSON = function (key) {
              return this.valueOf();
            };
  }

  var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
      escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
      gap,
      indent,
      meta = {    // table of character substitutions
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '"' : '\\"',
        '\\': '\\\\'
      },
      rep;


  function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

    escapable.lastIndex = 0;
    return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
      var c = meta[a];
      return typeof c === 'string'
          ? c
          : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
    }) + '"' : '"' + string + '"';
  }


  function str(key, holder) {

// Produce a string from holder[key].

    var i,          // The loop counter.
        k,          // The member key.
        v,          // The member value.
        length,
        mind = gap,
        partial,
        value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

    if (value && typeof value === 'object' &&
        typeof value.toJSON === 'function') {
      value = value.toJSON(key);
    }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

    if (typeof rep === 'function') {
      value = rep.call(holder, key, value);
    }

// What happens next depends on the value's type.

    switch (typeof value) {
      case 'string':
        return quote(value);

      case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

        return isFinite(value) ? String(value) : 'null';

      case 'boolean':
      case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

        return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

      case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

        if (!value) {
          return 'null';
        }

// Make an array to hold the partial results of stringifying this object value.

        gap += indent;
        partial = [];

// Is the value an array?

        if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

          length = value.length;
          for (i = 0; i < length; i += 1) {
            partial[i] = str(i, value) || 'null';
          }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

          v = partial.length === 0
              ? '[]'
              : gap
              ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
              : '[' + partial.join(',') + ']';
          gap = mind;
          return v;
        }

// If the replacer is an array, use it to select the members to be stringified.

        if (rep && typeof rep === 'object') {
          length = rep.length;
          for (i = 0; i < length; i += 1) {
            if (typeof rep[i] === 'string') {
              k = rep[i];
              v = str(k, value);
              if (v) {
                partial.push(quote(k) + (gap ? ': ' : ':') + v);
              }
            }
          }
        } else {

// Otherwise, iterate through all of the keys in the object.

          for (k in value) {
            if (Object.prototype.hasOwnProperty.call(value, k)) {
              v = str(k, value);
              if (v) {
                partial.push(quote(k) + (gap ? ': ' : ':') + v);
              }
            }
          }
        }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

        v = partial.length === 0
            ? '{}'
            : gap
            ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
            : '{' + partial.join(',') + '}';
        gap = mind;
        return v;
    }
  }

// If the JSON object does not yet have a stringify method, give it one.

  if (typeof JSON.stringify !== 'function') {
    JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

      var i;
      gap = '';
      indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

      if (typeof space === 'number') {
        for (i = 0; i < space; i += 1) {
          indent += ' ';
        }

// If the space parameter is a string, it will be used as the indent string.

      } else if (typeof space === 'string') {
        indent = space;
      }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

      rep = replacer;
      if (replacer && typeof replacer !== 'function' &&
          (typeof replacer !== 'object' ||
              typeof replacer.length !== 'number')) {
        throw new Error('JSON.stringify');
      }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

      return str('', {'': value});
    };
  }


// If the JSON object does not yet have a parse method, give it one.

  if (typeof JSON.parse !== 'function') {
    JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

      var j;

      function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

        var k, v, value = holder[key];
        if (value && typeof value === 'object') {
          for (k in value) {
            if (Object.prototype.hasOwnProperty.call(value, k)) {
              v = walk(value, k);
              if (v !== undefined) {
                value[k] = v;
              } else {
                delete value[k];
              }
            }
          }
        }
        return reviver.call(holder, key, value);
      }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

      text = String(text);
      cx.lastIndex = 0;
      if (cx.test(text)) {
        text = text.replace(cx, function (a) {
          return '\\u' +
              ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        });
      }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

      if (/^[\],:{}\s]*$/
          .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                    .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                    .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

        j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

        return typeof reviver === 'function'
            ? walk({'': j}, '')
            : j;
      }

// If the text is not JSON parseable, then a SyntaxError is thrown.

      throw new SyntaxError('JSON.parse');
    };
  }
}());/**
 * Copyright (C) SayMama Ltd 2012
 *
 * All rights reserved. Any use, copying, modification, distribution and selling
 * of this software and it's documentation for any purposes without authors'
 * written permission is hereby prohibited.
 */
/**
 * @fileoverview
 * Contains definition of  the ADL.MediaConnction class.
 *
 * @author Tadeusz Kozak
 * @date 11-07-2012 14:34
 */


(function (w) {
  'use strict';

  // Imports
  var Log, Utils;


  /**
   * Class representing an established media connection. Allows an easier
   * management of the connection by providing helper publish*, unpublish* and
   * disconnect methods.
   *
   * @summary Class representing an established media connection.
   * @see ADL.AddLiveService#connect
   * @see ADL.AddLiveService#disconnect
   * @see ADL.AddLiveService#publish
   * @see ADL.AddLiveService#unpublish
   * @see ADL.AddLiveService#sendMessage
   * @since 1.16.1.1
   * @param {string} scopeId
   *          Id of media scope represented by this instance of the
   *          MediaConnection.
   * @param {Object} connDescriptor
   *          Connection descriptor
   * @constructor
   */
  ADL.MediaConnection = function (scopeId, connDescriptor) {
    Log = ADL.Log;
    Utils = ADL.Utils;
    Log.d('Creating an instance of MediaConnection class');

    /**
     * Id of the scope managed by this MediaConnection
     *
     * @summary Id of the scope managed by this MediaConnection
     * @type {String}
     */
    this.scopeId = scopeId;

    /**
     * The initial connection descriptor related to the session
     * @type {Object}
     */
    this.connDescriptor = connDescriptor;

    /**
     * Id of local user.
     * @type {Number}
     */
    this.userId = connDescriptor.authDetails.userId;

    this._remotePeersCount = 0;

    this._logsPusher = ADL.Utils.bind(this._postLogsLooper, this);
    this._logsPublished = 0;
    var self = this;

    var onLogTag = function (tag) {
      self._logsTag = tag;
      self._clearLogs();
      self._postLogsLooper();
    };

    this._connected = true;
    if(!ADL._platformOptions.disableLogsPublishing) {
      ADL.getService().getLogFileTag(ADL.r(onLogTag));
    }
  };

  ADL.MediaConnection.prototype = {

    /**
     * Publishes a stream of given type in a specified way
     *
     * @summary Publishes a stream of given type in a specified way.
     * @since 1.16.1.1
     * @see ADL.AddLiveService#publish
     * @see ADL.MediaType
     * @param {ADL.Responder} responder
     *          Result and error handler.
     * @param {string} what
     *          Type of media to publish, one of the ADL.MediaType values.
     * @param {Object} [how]
     *          Optional object defining additional publishing configuration.
     */
    publish:function (responder, what, how) {
      ADL.getService().publish(responder, this.scopeId, what, how);
    },

    /**
     * Stops publishing stream of given type
     *
     * @summary Stops publishing stream of given type
     * @see ADL.AddLiveService#unpublish
     * @see ADL.MediaType
     * @param {ADL.Responder} responder
     *          Result and error handler.
     * @param {string}what
     *          Type of media to publish, one of the ADL.MediaType values.
     */
    unpublish:function (responder, what) {
      ADL.getService().unpublish(responder, this.scopeId, what);
    },

    /**
     * Publishes the audio stream.
     *
     * @summary Publishes the audio stream.
     * @since 1.16.1.1
     * @see ADL.AddLiveService#publish
     * @see ADL.MediaType.AUDIO
     * @param {ADL.Responder} responder
     *          Result and error handler.
     */
    publishAudio:function (responder) {
      this.publish(responder, ADL.MediaType.AUDIO);
    },

    /**
     * Stops publishing the audio stream.
     *
     * @summary Stops publishing the audio stream.
     * @since 1.16.1.1
     * @see ADL.AddLiveService#publish
     * @see ADL.MediaType.AUDIO
     * @param {ADL.Responder} responder
     *          Result and error handler.
     */
    unpublishAudio:function (responder) {
      this.unpublish(responder, ADL.MediaType.AUDIO);
    },

    /**
     * Publishes the video stream.
     *
     * @summary Publishes the video stream.
     * @since 1.16.1.1
     * @see ADL.AddLiveService#publish
     * @see ADL.MediaType.VIDEO
     * @param {ADL.Responder} responder
     *          Result and error handler.
     */
    publishVideo:function (responder) {
      this.publish(responder, ADL.MediaType.VIDEO);
    },

    /**
     * Stops publishing the video stream.
     *
     * @summary Stops publishing the video stream.
     * @since 1.16.1.1
     * @see ADL.AddLiveService#unpublish
     * @see ADL.MediaType.VIDEO
     * @param {ADL.Responder} responder
     *          Result and error handler.
     */
    unpublishVideo:function (responder) {
      this.unpublish(responder, ADL.MediaType.VIDEO);
    },

    /**
     * Publishes the screen sharing stream.
     *
     * @summary Publishes the screen sharing stream.
     * @since 1.16.1.1
     * @see ADL.AddLiveService#publish
     * @see ADL.MediaType.SCREEN
     * @see ADL.AddLiveService#getScreenCaptureSources
     * @param {ADL.Responder} responder
     *          Result and error handler.
     * @param {number} windowId
     *          Id of screen sharing source. To be obtained using the
     *          ADL.AddLiveService.getScreenCaptureSources and selected by the
     *          user.
     * @param {number} [nativeWidth]
     *          The width of the renderer on the receiving side. The local SDK
     *          will ensure that if the width of the shared window is larger
     *          than this value - it will be downscale to meet the constrain and
     *          also maintain the aspect ratio.
     */
    publishScreen:function (responder, windowId, nativeWidth) {
      if (nativeWidth === undefined) {
        nativeWidth = ADL._STATIC_CONFIG.DEFAULT_NATIVE_WIDTH;
      }
      this.publish(responder,
          ADL.MediaType.SCREEN,
          {windowId:windowId, nativeWidth:nativeWidth});
    },

    /**
     * Stops publishing the screen sharing stream.
     *
     * @summary Stops publishing the screen sharing stream.
     * @since 1.16.1.1
     * @see ADL.AddLiveService#unpublish
     * @see ADL.MediaType.SCREEN
     * @param {ADL.Responder} responder
     *          Result and error handler.
     */
    unpublishScreen:function (responder) {
      this.unpublish(responder, ADL.MediaType.SCREEN);

    },

    /**
     * Terminates the connection maintained by this MediaConnection instance.
     *
     * @summary Terminates the connection maintained by this MediaConnection
     *          instance.
     * @since 1.16.1.1
     * @see ADL.AddLiveService#disconnect
     * @param {ADL.Responder} responder
     *          Result and error handler.
     */
    disconnect:function (responder) {
      ADL.getService().disconnect(responder, this.scopeId);
      this._connected = false;
    },

    /**
     * Sends an opaque message to all peers connected to the same media scope
     * or only to the selected one.
     *
     * @summary Sends an opaque message to all peers connected to the same media
     *          scope.
     * @since 1.16.1.1
     * @see ADL.AddLiveService#sendMessage
     * @param {ADL.Responder} responder
     *          Result and error handler.
     * @param {string} message
     *          Message to be send
     * @param {number} [targetUserId]
     *          Optional id of recipient. Don't specify if message is supposed to
     *          be broadcast to every user connected to the media scope.
     */
    sendMessage:function (responder, message, targetUserId) {
      ADL.getService().sendMessage(responder,
          this.scopeId,
          message,
          targetUserId);
    },

    /**
     * Changes the configuration of the sent video stream published within
     * this connection.
     *
     * @summary Reconfigures published video stream.
     * @since 2.3.3
     * @param {ADL.Responder} responder
     *          Responder object. See calling AddLive plug-in service methods.
     * @param {Object} newConfiguration
     *          Object describing new configuration
     * @param {Number} newConfiguration.maxWidth
     *          Maximal width of the encoded picture
     * @param {Number} newConfiguration.maxHeight
     *          Maximal height of the encoded picture
     * @param {Number} newConfiguration.maxFps
     *          Maximal frame rate
     * @param {Boolean} newConfiguration.udeAdaptation
     *          Flag defining whether the adaptation algorithms should be
     *          enabled or not.
     */
    reconfigureVideo:function (responder, newConfiguration) {
      ADL.getService().reconfigureVideo(responder,
          this.scopeId,
          newConfiguration);

    },

    /**
     *
     * @private
     */
    _dispose:function () {
      Log.d('Disposing media connection');
      w.clearTimeout(this._logsPublishingInterval);
      this._postLogs();
    },

    // Logging posting management
    // =========================================================================
    /**
     *
     * @private
     */
    _postLogsLooper:function () {
      this._postLogs();
      this._logsPublishingInterval = w.setTimeout(this._logsPusher,
          ADL._STATIC_CONFIG.LOGS_PUBLISHING_INTERVAL);
    },

    _postLogs:function () {
      Log.d('Posting logs');
      this.logs = {};
      ADL._pluginInstance.getLogFileByTagMemSafe(
          this._logsTag, this._logsPublished, this.logs);

      this._logsPublished += parseInt(this.logs.rawLength, 10);
      var self = this;
      var onPublished = function () {
        self.logs = null;
      }, onPublishError = function () {
        Log.w('Failed to publish logs.');
        self.logs = null;
      };
      if (this.logs.content === undefined || !this.logs.content) {
        Log.w('Skipping posting logs, as the content is undefined or empty');
        return;
      }
      if (this.logs.content.length >
          ADL._STATIC_CONFIG.MAX_LOG_UPLOAD_PACKAGE_SIZE) {
        Log.w('Skipping posting logs the content is to large: ' +
            this.logs.content.length + ' bytes');
      } else {
        Log.d('Sending logs: ' + this.logs.content.length +
            ' bytes after base encoding');
        ADL.BugReporting.postLogs(ADL.r(onPublished, onPublishError),
            {
              userId:this.userId,
              logs:this.logs.content,
              scopeId:this.scopeId,
              logsType:ADL._STATIC_CONFIG.SERVICE_LOGS_TYPE
            });
      }
    },

    _clearLogs:function () {
      this.logs = {};
      ADL._pluginInstance.getLogFileByTagMemSafe(
          this._logsTag, this._logsPublished, this.logs);
      this._logsPublished = parseInt(this.logs.rawLength, 10);
      this.logs = {};
    },

    // Automatic video streams reconfiguration
    // =========================================================================

    /**
     *
     * @param {ADL.UserStateChangedEvent}e
     * @private
     */
    _onUserEvent:function (e) {
      if(ADL._usesWebRTC) {
        // Automatic video reconfiguration is not supported on WebRTC
        return;
      }
      if (e.isConnected) {
        this._remotePeersCount += 1;
      } else {
        this._remotePeersCount -= 1;
      }
      if (!this.connDescriptor.videoStream.manualControl) {
        this.reconfigureVideo(ADL.r(), this._getNewVideoConfiguration());
      }
    },

    /**
     * Calculates a new video configuration description, depending on the state
     * of the session and max configuration defined.
     *
     * @return {Object}
     * @private
     */
    _getNewVideoConfiguration:function () {
      // Just a shortcut to access the source configuration
      var /*const */ srcConfig = this.connDescriptor.videoStream,

      // The amount of pixels to be received if we would be using the desired
      // connection descriptor
      /*const */ desiredPixels = srcConfig.maxWidth * srcConfig.maxHeight,

      // The scale - max amount of pixels divided by the desired pixel rate
      // received from all participants; it's the ratio between what can be done
      // and what is desired
      /*const */ scale = ADL._STATIC_CONFIG.MAX_SAFE_FEEDS_SIZE /
              ( desiredPixels * this._remotePeersCount);

      var newW, newH;

      // If we need to shrink video feed - do it
      if (scale < 1) {

        // The amount of pixels that can be received and processed by client
        var /*const */ pRate = desiredPixels * scale;
        newW = Math.sqrt(srcConfig.maxWidth * pRate / srcConfig.maxHeight);
        newH = Math.floor(pRate / newW);
        newW = Math.floor(newW);

        // In all other cases - use the description from the original connection
        // descriptor
      } else {
        newW = srcConfig.maxWidth;
        newH = srcConfig.maxHeight;
      }
      return {
        useAdaptation:srcConfig.useAdaptation,
        maxWidth:newW,
        maxHeight:newH,
        maxFps:srcConfig.maxFps
      };

    }
  };


})(window);/**
 * Copyright (C) SayMama Ltd 2012
 *
 * All rights reserved. Any use, copying, modification, distribution and selling
 * of this software and it's documentation for any purposes without authors'
 * written permission is hereby prohibited.
 */
/**
 * @fileoverview
 * @TODO file description
 *
 * @author Tadeusz Kozak
 * @date 28-05-2012 14:29
 */

(function () {
  'use strict';

  // Imports
  var Log = ADL.Log;

  /**
   * Class of objects receiving results of calls of AddLive Plug-In or
   * AddLive Service API methods.
   *
   * @summary Defines an interface allowing to receive results of all AddLive
   *          service method calls.
   * @constructor
   * @param {Function=} resultHandler
   *           Function that will be called upon successful result. It should take
   *           single, optional parameter - result of the method call.
   * @param {Function=} errHandler
   *           Function that receives error result of method call. It should take
   *           two params: error code and error message.
   * @param {Object=} context
   *           Additional context that can be used success and error handlers as
   *           this. It will be merged into new instance of the Responder class.
   */
  ADL.Responder = function (resultHandler, errHandler, context) {
    if (context === undefined) {
      context = {};
    }
    this._errHandler = errHandler || ADL.Utils.nop();
    this._resultHandler = resultHandler || ADL.Utils.nop();
    // Clone the context into self.
    ADL.Utils.merge(this, context);

    /**
     * Flag defining whether to send the AER upon error call.
     * @type {boolean}
     * @private
     */
    this._aerOnError = false;
    /**
     *
     * @type {null}
     * @private
     */
    this._resultAdapter = function (x) {
      return x;
    };
  };

  ADL.Responder.prototype = {


    /**
     * Called upon an error.
     *
     * @summary Called upon an error.
     * @since 1.0.0
     * @param {number} errCode
     *          Code of an Error
     * @param {string} errMessage
     *          String with more human friendly error message
     */
    error:function (errCode, errMessage) {
      var cause = ADL.Utils.errorToCause(errMessage, errCode);
      Log.e('Got error result of method call: ' + cause);
      if (this._aerOnError) {
        ADL.BugReporting.reportBug(ADL.r(), {
          type:'AER-PLUGIN',
          cause:cause,
          /*jshint camelcase:false*/
          error_code:errCode});
      }
      try {
        this._errHandler.call(this, errCode, errMessage);
      } catch (e) {
        Log.w('Error in user defined error handler');
      }
    },

    /**
     * Called upon successful result.
     * @summary Called upon successful result.
     * @since 1.0.0
     * @param {*} result
     *          The result.
     */
    result:function (result) {
      var resultForLogging = result;
      if (typeof result === 'string') {
        if (result.length > 100) {
          resultForLogging = result.substring(0, 100) + '...';
        }
      }
      Log.d('Got successful result of method call ' + this.method + ': ' +
          resultForLogging);
      try {
        result = this._resultAdapter(result);
        this._resultHandler.call(this, result);
      } catch (e) {
        Log.w('Error in user defined success handler for method: ' +
            this.methodName);
        if (e.stack) {
          Log.w(e.stack);
        }
      }
    },

    resultAsync:function (result) {
      var self = this;
      window.setTimeout(function () {
        self.result(result);
      }, 0);
    },

    errorAsync:function (errCode, errMsg) {
      var self = this;
      window.setTimeout(function () {
        self.error(errCode, errMsg);
      }, 0);
    },

    /**
     * Sets method corresponding to the Responder instance. Useful for debugging
     * purposes.
     *
     * @summary Sets method corresponding to the Responder instance.
     * @since 1.0.0
     * @param {string} method
     *           Method name to be set.
     */
    setMethod:function (method) {
      this.method = method;
    },

    //noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols
    /**
     * Successful result handler. Will be called with a value returned by
     * asynchronous invocation.
     *
     * @private
     * @since 1.0.0.0
     * @param {*} [result]
     *          Value of type specific to the call performed.
     */
    resultHandler:function (result) {
      Log.d('Got unhandled result: ' + JSON.stringify(result));
    },

    //noinspection JSUnusedGlobalSymbols
    /**
     * Invocation error handler - called whenever there was an error performing
     * given asynchronous operation.
     *
     * @private
     * @since 1.0.0.0
     * @see ADL.ErrorCodes
     * @param {Number} errCode
     *          Error code explicitly identifying source of the problem.
     * @param {string} errMessage
     *          Additional, human-readable error message.
     */
    errHandler:function (errCode, errMessage) {
      Log.w('Got unhandled error: ' + errCode + ': ' + errMessage);
    },

    /**
     * Enables AER report in case of method failure.
     *
     * @private
     */
    sendAERonError:function (send) {
      this._aerOnError = send;
    },

    /**
     * @private
     * @param {Function} adapter
     */
    setResultAdapter:function (adapter) {
      this._resultAdapter = adapter;
    }

  };
  /**
   * Validates the responder instance.
   *
   * @private
   * @param responder
   */
  ADL.Responder.validate = function (responder) {
    var msg;
    if (responder === undefined) {
      msg = 'Responder not defined';
      ADL.Log.e(msg);
      throw new ADL.AddLiveException(
          msg,
          ADL.ErrorCodes.Logic.INVALID_ARGUMENT);
    }
    if (!ADL._validateInterface(ADL.Responder, responder)) {
      msg = 'Invalid responder';
      ADL.Log.e(msg);
      throw new ADL.AddLiveException(
          msg,
          ADL.ErrorCodes.Logic.INVALID_ARGUMENT);
    }
  };


  /**
   * Creates new instance of Responder object.
   *
   * @summary Creates new instance of Responder object.
   * @since 1.0.0
   * @see ADL.Responder
   * @see ADL.r
   * @param {Function} [resultHandler]
   *           Function that will be called upon successful result. It should take
   *           single, optional parameter - result of the method call.
   * @param {Function} [errHandler]
   *           Function that receives error result of method call. It should take
   *           two params: error code and error message.
   * @param {Object} [context]
   *           Additional context that can be used success and error handlers as
   *           this. It will be merged into new instance of the Responder class.
   */
  ADL.createResponder = function (resultHandler, errHandler, context) {
    return new ADL.Responder(resultHandler, errHandler, context);
  };

  ADL.namedResponder = function (methodName) {
    var r = ADL.r();
    r.setMethod(methodName);
    return r;
  };

  /**
   * Shortcut for ADL.createResponder
   *
   * @summary Creates new instance of Responder object. Shortcut for
   *          ADL.createResponder
   * @see ADL.Responder
   * @see ADL.createResponder
   * @param {Function} [resultHandler]
   *           Function that will be called upon successful result. It should take
   *           single, optional parameter - result of the method call.
   * @param {Function} [errHandler]
   *           Function that receives error result of method call. It should take
   *           two params: error code and error message.
   * @param {Object} [context]
   *           Additional context that can be used success and error handlers as
   *           this. It will be merged into new instance of the Responder class.
   * @return {ADL.Responder} newly created Responder object.
   */
  ADL.r = function (resultHandler, errHandler, context) {
    return ADL.createResponder(resultHandler, errHandler, context);
  };

  ADL.nR = function (methodName) {
    return ADL.namedResponder(methodName);
  };

}());/**
 * Copyright (C) LiveFoundry Inc. 2013
 *
 * All rights reserved. Any use, copying, modification, distribution and selling
 * of this software and it's documentation for any purposes without authors'
 * written permission is hereby prohibited.
 *
 */

/**
 * @fileoverview
 * Single class source - contains definition of the AddLiveService class.
 *
 * @author Tadeusz Kozak
 * @date 03/11/13 14:32
 */

(function (w) {
  'use strict';

  // Imports

  var ADL = w.ADL,
      Log = ADL.Log;


  // Consts
  var SERVICE_WRAPPER_METHODS = [
    'getVersion',
    'setApplicationId',
    'getScreenCaptureSources',
    'getVideoCaptureDeviceNames',
    'getVideoCaptureDevice',
    'setVideoCaptureDevice',
    'getAudioCaptureDeviceNames',
    'getAudioCaptureDevice',
    'setAudioCaptureDevice',
    'getAudioOutputDeviceNames',
    'getAudioOutputDevice',
    'setAudioOutputDevice',
    'getSpeakersVolume',
    'setSpeakersVolume',
    'getMicrophoneVolume',
    'setMicrophoneVolume',
    'getHostCpuDetails',
    'playTestSound',
    'startLocalVideo',
    'stopLocalVideo',
    'connect',
    'disconnect',
    'publish',
    'unpublish',
    'startMeasuringStatistics',
    'stopMeasuringStatistics',
    'monitorMicActivity',
    'monitorSpeechActivity',
    'getLogFileTag',
    'reconfigureVideo',
    'setProperty',
    'getProperty',
    'setProxyServer',
    'setProxyCredentials',
    'fetchConfig',
    'setAllowedSenders',
    'sendMessage',
    'echo',
    'networkTest'
  ];


  function ServiceWrapper(service) {
    this.nativeService = service;
    this.eventsDispatcher = new EventsDispatcher();
    this.nativeService.init(this, this.eventsDispatcher);
    this.reqIdGen = 0;
    this.requests = {};
    this.version = service.version;
    this.serviceid = service.serviceid;
    SERVICE_WRAPPER_METHODS.forEach(_createServiceMethod);
  }

  ServiceWrapper.prototype = {
    handleResult:function (s) {
      var result = JSON.parse(s);
      var responder = this.requests[result.id];
      if (result.status) {
        responder.result(result.result);
      } else {
        responder.error(result.errorCode, result.errorMessage);
      }
    },
    handleEvent:function (s) {
      Log.d('Got a new event: ' + s);
    },

    addServiceListener:function (r, l) {
      this.eventsDispatcher.addListener(l);
      r.resultAsync();
    },

    removeServiceListener:function (r, l) {
      this.eventsDispatcher.removeListener(l);
      r.resultAsync();
    },

    _invoke:function (method, responder, params) {
      if (params === undefined) {
        params = [];
      }
      // we need string here
      var reqId = this.reqIdGen + '';
      this.requests[reqId] = responder;
      this.reqIdGen += 1;
      var req = {
        id:reqId,
        methodName:method,
        params:params
      };
      this.nativeService.processRequestJSON(JSON.stringify(req));
    }


  };


  function _createServiceMethod(methodName) {
    ServiceWrapper.prototype[methodName] = function (r) {
      var args = [];
      for (var i = 1; i < arguments.length; i++) {
        args.push(arguments[i]);
      }
      this._invoke(methodName, r, args);
    };
  }

  function EventsDispatcher() {
    this.listeners = [];
    this._EVENT_NAME_TO_CLASS = {
      onConnectionLost:ADL.ConnectionLostEvent,
      onDeviceListChanged:ADL.DeviceListChangedEvent,
      onMediaConnTypeChanged:ADL.MediaConnTypeChangedEvent,
      onMediaIssue:ADL.MediaIssueEvent,
      onMediaStats:ADL.MediaStatsEvent,
      onMediaStreamEvent:ADL.UserStateChangedEvent,
      onMediaStreamFailure:ADL.MediaStreamFailureEvent,
      onMessage:ADL.MessageEvent,
      onMicActivity:ADL.MicActivityEvent,
      onMicGain:ADL.MicGainEvent,
      onSessionReconnected:ADL.SessionReconnectedEvent,
      onUserEvent:ADL.UserStateChangedEvent,
      onVideoFrameSizeChanged:ADL.VideoFrameSizeChangedEvent,
      onSpeechActivity:ADL.SpeechActivityEvent
    };
  }

  EventsDispatcher.prototype = {
    addListener:function(listener) {
      this.listeners.push(listener);
    },
    removeListener:function(listener) {
      var index = this.listeners.indexOf(listener);
      this.listeners.splice(index, 1);
    },

    handleEvent:function (eRaw) {
      if(typeof eRaw === 'string') {
        eRaw = JSON.parse(eRaw);
      }
      if(this._EVENT_NAME_TO_CLASS[eRaw.event] === undefined) {
        Log.w('Got an unsupported event: ' + eRaw);
        return;
      }

      var event = new this._EVENT_NAME_TO_CLASS[eRaw.event](eRaw.params);
      this.listeners.forEach(function(listener){
        if(listener[eRaw.event] === undefined) {
          Log.w('Listener does not support event: ' + eRaw.event);
        } else {
          listener[eRaw.event](event);
        }
      });
    }
  };


  // Exports
  ADL.ServiceWrapper = ServiceWrapper;
  ADL.EventsDispatcher = EventsDispatcher;
}(window));/**
 * Copyright (C) LiveFoundry Inc. 2013
 *
 * All rights reserved. Any use, copying, modification, distribution and selling
 * of this software and it's documentation for any purposes without authors'
 * written permission is hereby prohibited.
 *
 * =============================================================================
 * @fileoverview
 *
 * TODO module description
 *
 * @author Tadeusz Kozak
 * @date 06.02.13 13:26
 */


(function () {
  'use strict';


  var Log = ADL.Log;
  /**
   * Module providing set of mostly internal utility functions.
   * @summary Module providing set of mostly internal utility functions.
   * @since 2.0.0
   * @namespace
   */
  ADL.Utils = {};

  /**
   * Validators dictionary maps string to function;
   * @private
   * @type {{}}
   */
  //noinspection JSUnusedGlobalSymbols
  var validators = {
    number:function (value) {
      return !isNaN(parseInt(value + '', 10));
    },
    string:function (value) {
      return typeof value === 'string' || value instanceof String;
    },
    defined:function (value) {
      return value !== null && value !== undefined;
    },
    bool:function (value) {
      return typeof value === 'boolean';
    },
    nonEmpty:function (value) {
      return value.length > 0;
    }
  };

  /**
   * ===========================================================================
   * Public methods
   * ===========================================================================
   */

  /**
   * Generates cause string from error info.
   *
   * @summary Generates cause string from error info.
   * @since 1.20.0
   * @param {string} errMsg
   *          Error message
   * @param {number} errCode
   *          Error code
   * @return {String}
   */
  ADL.Utils.errorToCause = function (errMsg, errCode) {
    return errMsg + ' (' + errCode + ')';
  };


  /**
   * Merges src object into target one, by copying all it's own properties.
   *
   * @param target
   * @param src
   * @private
   */
  ADL.Utils.merge = function (target, src) {
    for (var k in src) {
      if (src.hasOwnProperty(k) && src[k] !== null) {
        target[k] = src[k];
      }
    }
    return target;
  };

  ADL.Utils.bind = function (fun, ctx) {
    if (Function.prototype.bind !== undefined) {
      return fun.bind(ctx);
    } else {
      return function () {
        fun.call(ctx);
      };
    }
  };


  /**
   *
   * @param {string} url
   * @param {ADL.Responder} responder
   * @param {object} [params]
   * @private
   */
  ADL.Utils.doGet = function (responder, url, params) {
    var xhr = _getXHR();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          responder.result(xhr.responseText);
        } else {
          responder.error(xhr.status, 'Error performing AJAX request');
        }
      }
    };
    if (params) {
      url += '?';
      for (var k in params) {
        if (Object.prototype.hasOwnProperty.call(params, k)) {
          url += encodeURIComponent(k) + '=' + encodeURIComponent(params[k]) + '&';
        }
      }
    }
    // Append the timestamp to pass proxies
//    var now = new Date();
//    var ts = now.getTime() * 1000 + now.getMilliseconds();
//    url += '&_ts=' + ts;
    xhr.open('GET', url, true);
    xhr.send('');
  };

  /**
   * Makes CORS post request.
   *
   * @param {string} url
   *          Target URL
   * @param {ADL.Responder} responder
   *          Responder - will receive the request result or error
   * @param {string}data
   *          Data to be posted
   * @private
   */
  ADL.Utils.doPost = function (responder, url, data) {
    var dataStr = '';
    for (var k in data) {
      if (Object.prototype.hasOwnProperty.call(data, k)) {
        dataStr += k + '=' + encodeURIComponent(data[k]) + '&';
      }
    }
    dataStr = dataStr.substring(0, dataStr.length - 1);
    var xhr = _getXHR();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          responder.resultAsync(xhr.responseText);
        } else {
          responder.errorAsync(xhr.status, 'Error performing AJAX request');
        }
      }
    };
    try {
      xhr.open('POST', url, true);
    } catch (e) {
      responder.errorAsync(ADL.ErrorCodes.Communication.NETWORK_ERROR,
          'Failed to perform POST operation. URL: ' + url +
              'Browser error: ' + e);
      return;
    }
    try {
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    } catch (e) {
      Log.d('Failed to set the content type');
    }
    xhr.send(dataStr);
  };

  /**
   *
   * @param url
   * @param {ADL.Responder} responder
   * @private
   */
  ADL.Utils.getScript = function (url, responder) {
    var head = document.getElementsByTagName('head')[0] ||
        document.documentElement;
    var script = document.createElement('script');
    script.src = url;

// Handle Script loading
    var done = false;

// Attach handlers for all browsers
    script.onload = script.onreadystatechange = function () {
      //noinspection JSValidateTypes
      if (!done && (!this.readyState ||
          this.readyState === 'loaded' || this.readyState === 'complete')) {
        done = true;

        responder.result();

        // Handle memory leak in IE
        script.onload = script.onreadystatechange = null;
        if (head && script.parentNode) {
          head.removeChild(script);
        }
      }
    };

// Use insertBefore instead of appendChild  to circumvent an IE6 bug.
// This arises when a base node is used (#2709 and #4378).
    head.insertBefore(script, head.firstChild);
  };

  /**
   * Returns a nop, empty function.
   *
   * @returns {Function} empty function
   * @private
   */
  ADL.Utils.nop = function () {
    return _nop;
  };

  /**
   * Validates given parameter
   *
   * @summary Validates given parameter
   * @since 2.0.0
   * @see ADL.Responder
   *
   * @param {ADL.Responder} responder
   *          Responder that will be notified with an error if the validation
   *          fails.
   * @param {string} description
   *          Validation description - defines how to validate the parameter
   *          given
   * @param {*} param
   *          Parameter to be validated
   * @return {boolean} true if the param is valid, false otherwise
   */
  ADL.Utils.validate = function (responder, description, param) {
    Log.d('Validating ' + param + ' against description: ' + description);
    var descParts = description.split('|'),
        name = descParts[0],
        reqs = descParts[1].split(',');
    for (var i = 0; i < reqs.length; i++) {
      if (validators[reqs[i]] === undefined) {
        Log.e('Undefined validator: ' + reqs[i]);
      } else if (!validators[reqs[i]](param)) {
        var msg = 'Parameter ' + name + ' does not meet criteria: ' + reqs[i] +
            '. Input validation failed';
        Log.w(msg);
        responder.error(ADL.ErrorCodes.Logic.INVALID_ARGUMENT, msg);
        return false;
      }
    }
    return true;
  };

  /**
   *
   * @param len
   * @param charSet
   * @return {String}
   */
  ADL.Utils.randomString = function (len, charSet) {
    charSet = charSet ||
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var str = '';
    for (var i = 0; i < len; i++) {
      var randomPoz = Math.floor(Math.random() * charSet.length);
      str += charSet.substring(randomPoz, randomPoz + 1);
    }
    return str;
  };

  ADL.Utils.forEach = function (obj, fn) {
    for (var k in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, k)) {
        fn(k, obj[k]);
      }
    }
  };

  ADL.Utils.embedInvisibleContainer = function (id) {
    var pluginContainer = document.createElement('div');
    pluginContainer.style.position = 'fixed';
    pluginContainer.style.overflow = 'hidden';
    pluginContainer.style.width = '10px';
    pluginContainer.style.height = '10px';
    pluginContainer.style.top = 0;
    pluginContainer.style.left = '-100px';
    pluginContainer.id = id;
    document.body.appendChild(pluginContainer);
    return pluginContainer;
  };

  ADL.Utils.removeChildNodes = function (node) {
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  };

  if (window.localStorage === undefined) {
    window.localStorage = {};
  }
  ADL.Storage = window.localStorage;

  /**
   * ===========================================================================
   * Private helpers
   * ===========================================================================
   */


  /**
   *
   * @private
   */
  function _getXHR() {
    var xhr;
    if (window.XMLHttpRequest) {
      // code for IE10+, Firefox, Chrome, Opera, Safari
      xhr = new XMLHttpRequest();
      if (!('withCredentials' in xhr)) {
        // IE 8-9
        //noinspection JSUnresolvedFunction
        xhr = new window.XDomainRequest();
        xhr.onload = function () {
          this.readyState = 4;
          this.status = 200;
          this.onreadystatechange();
        };

        xhr.onerror = xhr.ontimeout =
            function () {
              this.status = 400;
              this.readyState = 4;
              this.onreadystatechange();
            }
        ;
        xhr.onprogress = ADL._nop;
        xhr.timeout = ADL._STATIC_CONFIG.XHR_TIMEOUT;
      }
    }
    else {// It does not make sense, but let's try it
      xhr = new window.ActiveXObject('Microsoft.XMLHTTP');
    }
    return xhr;
  }

  function _nop() {
  }

  if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (fn, scope) {
      for (var i = 0, len = this.length; i < len; ++i) {
        fn.call(scope, this[i], i, this);
      }
    };
  }

}());/**
 * Copyright (C) LiveFoundry Inc. 2013
 *
 * All rights reserved. Any use, copying, modification, distribution and selling
 * of this software and it's documentation for any purposes without authors'
 * written permission is hereby prohibited.
 *
 */

/**
 * @fileoverview
 * Single class source - contains definition of the AddLiveService class.
 *
 * @author Tadeusz Kozak
 * @date 8/5/13 11:19 AM
 */

(function (w) {
  'use strict';

  if (typeof w.define === 'function' && w.define.amd) {
    w.define(ADL._STATIC_CONFIG.AMD_MODULE_NAME, [], function () {
      return w.ADL;
    });
  }

}(window));/**
 * Copyright (C) LiveFoundry Inc. 2013
 *
 * All rights reserved. Any use, copying, modification, distribution and selling
 * of this software and it's documentation for any purposes without authors'
 * written permission is hereby prohibited.
 *
 */

/**
 * @fileoverview
 * Single class source - contains definition of the AddLiveServiceWrtcImpl
 * module.
 *
 * @author Tadeusz Kozak
 * @date 08/29/2013 9:43 AM
 */

(function () {
  'use strict';
  // Imports
  var ADL = window.ADL,
      MediaEngine = ADL.MediaEngine,
      ConnCtrl, DevicesCtrl;

  // Scope vars
  var eventsDispatcher, lazyInitDone = false;


  // Public API

  // Shortcut for service
  var s = {};

  s.init = function () {
    if (lazyInitDone) {
      return;
    }
    ConnCtrl = MediaEngine.ConnCtrl;
    DevicesCtrl = MediaEngine.DevicesCtrl;
    eventsDispatcher = new ADL.EventsDispatcher();
    s._eventsDispatcher = eventsDispatcher;
  };

  /**
   *
   * @param {ADL.Responder}r
   */
  s.getVersion = function (r) {
    r.resultAsync(MediaEngine.version);
  };

  s.setApplicationId = function (r) {
    r.errorAsync(ADL.ErrorCodes.Logic.PLATFORM_UNSUPPORTED,
        'setApplicationId is not supported on WebRTC version of the SDK. Use ' +
            'the applicationId param of the options object passed to ' +
            'ADL.initPlatform');
  };

  s.fetchConfig = function (r) {
    r.errorAsync(ADL.ErrorCodes.Logic.PLATFORM_UNSUPPORTED,
        'fetchConfig is not supported on WebRTC version of the SDK. Use ' +
            'the options object passed to ADL.initPlatform');
  };

  s.addServiceListener = function (r, l) {
    eventsDispatcher.addListener(l);
    r.resultAsync();
  };

  s.removeServiceListener = function (r, l) {
    eventsDispatcher.removeListener(l);
    r.resultAsync();
  };

  s.getHostCpuDetails = function (r) {
    _unsupported(r, 'getHostCpuDetails');
  };


  /**
   *
   * @param {ADL.Responder} r
   */
  s.getVideoCaptureDeviceNames = function (r) {
    DevicesCtrl.getCameras(r);
  };

  /**
   *
   * @param {ADL.Responder} r
   */
  s.getVideoCaptureDevice = function (r) {
    r.resultAsync('0');
  };

  /**
   *
   * @param {ADL.Responder} r
   */
  s.setVideoCaptureDevice = function (r) {
    var requester = 'setVideoCaptureDevice';
    //noinspection JSAccessibilityCheck
    r.setResultAdapter(function () {
      DevicesCtrl.releaseUserDevice(requester);
    });
    DevicesCtrl.getUserDevice(r, requester);
  };

  /**
   *
   * @param {ADL.Responder} r
   */
  s.getAudioCaptureDeviceNames = function (r) {
    DevicesCtrl.getMicrophones(r);
  };

  /**
   *
   * @param {ADL.Responder} r
   */
  s.getAudioCaptureDevice = function (r) {
    r.resultAsync(0);
  };

  /**
   *
   * @param {ADL.Responder} r
   */
  s.setAudioCaptureDevice = function (r) {
    r.resultAsync();
  };

  /**
   *
   * @param {ADL.Responder} r
   */
  s.getAudioOutputDeviceNames = function (r) {
    DevicesCtrl.getSpeakers(r);
  };

  /**
   *
   * @param {ADL.Responder} r
   */
  s.getAudioOutputDevice = function (r) {
    r.resultAsync(0);
  };

  /**
   *
   * @param {ADL.Responder} r
   */
  s.setAudioOutputDevice = function (r) {
    r.result();
  };

  s.getScreenCaptureSources = function (r /*, thumbWidth*/) {
//    MediaEngine.DevicesCtrl.getScreenSources(r, thumbWidth);
    _unsupported(r, 'getScreenCaptureSources');
  };


  /**
   *
   * @param {ADL.Responder} r
   */
  s.startLocalVideo = function (r) {
    // We pass here also eventsDispatcher, so the DevicesCtrl can publish video
    // frame size changed event
    DevicesCtrl.startLocalVideo(r, eventsDispatcher);
  };

  /**
   *
   * @param {ADL.Responder} r
   */
  s.stopLocalVideo = function (r) {
    DevicesCtrl.stopLocalVideo(r);
  };

  s.connect = function (r, connDescr) {
    ConnCtrl.connect(r, connDescr, eventsDispatcher);
  };

  s.disconnect = function (r, scopeId) {
    ConnCtrl.disconnect(r, scopeId);
  };

  s.networkTest = function (r) {
    _unsupported(r, 'networkTest');
  };

  s.publish = function (r, scopeId, what) {
    if (what === ADL.MediaType.SCREEN) {
      _unsupported(r, 'publish(SCREEN)');
      return;
    }
    ConnCtrl.publish(r, scopeId, what);
  };

  s.unpublish = function (r, scopeId, what) {
    if (what === ADL.MediaType.SCREEN) {
      _unsupported(r, 'unpublish(SCREEN)');
      return;
    }
    ConnCtrl.unpublish(r, scopeId, what);
  };

  s.reconfigureVideo = function (r, scopeId, videoConfig) {
    ConnCtrl.reconfigureVideo(r, scopeId, videoConfig);
  };

  s.sendMessage = function (responder, scopeId, message, targetUserId) {
    ConnCtrl.sendMessage(responder, scopeId, message, targetUserId);
  };

  s.setAllowedSenders = function (r) {
    _unsupported(r, 'setAllowedSenders');
  };

  s.getSpeakersVolume = function (r) {
    DevicesCtrl.getVolume(r);
  };

  s.setSpeakersVolume = function (r, value) {
    DevicesCtrl.setVolume(r, value);

  };

  s.getMicrophoneVolume = function (r) {
    _unsupported(r, 'getMicrophoneVolume');
  };
  s.setMicrophoneVolume = function (r) {
    _unsupported(r, 'setMicrophoneVolume');
  };

  s.monitorMicActivity = function (r, enabled) {
    if (enabled) {
      DevicesCtrl.monitorMicActivity(r, eventsDispatcher);
    } else {
      DevicesCtrl.stopMonitoringMicActivity(r);
    }

  };

  s.monitorSpeechActivity = function (responder /*, scopeId, enabled*/) {
    _unsupported(responder, 'monitorSpeechActivity');
  };


  s.startMeasuringStatistics = function (r, scopeId, interval) {
    ConnCtrl.startMeasuringStatistics(r, scopeId, interval, eventsDispatcher);
  };

  s.stopMeasuringStatistics = function (r, scopeId) {
    ConnCtrl.stopMeasuringStatistics(r, scopeId);
  };

  s.startPlayingTestSound = function (r) {
    DevicesCtrl.playTestSound(r);
  };


  s.stopPlayingTestSound = function (r) {
    _unsupported(r, 'stopPlayingTestSound');
  };

  s.getProperty = function (r) {
    r.errorAsync(ADL.ErrorCodes.Logic.INVALID_ARGUMENT, 'Unknown property key');
  };

  s.setProperty = function (r) {
    r.errorAsync(ADL.ErrorCodes.Logic.INVALID_ARGUMENT, 'Unknown property key');
  };


  function _unsupported(r, methodName) {
    r.errorAsync(ADL.ErrorCodes.Logic.PLATFORM_UNSUPPORTED,
        'The ' + methodName + ' method is not supported on WebRTC version of ' +
            'the SDK.');
  }

  // Exports
  MediaEngine.AddLiveServiceWrtcImpl = s;

}(window));
/**
 * Copyright (C) LiveFoundry Inc. 2013
 *
 * All rights reserved. Any use, copying, modification, distribution and selling
 * of this software and it's documentation for any purposes without authors'
 * written permission is hereby prohibited.
 *
 */

/**
 * @fileoverview
 * Single class source - contains definition of the AddLiveService class.
 *
 * @author Tadeusz Kozak
 * @date 4/16/13 9:43 AM
 */

(function (w) {
  'use strict';

  // Imports
  var ADL = w.ADL,
      MediaEngine = ADL.MediaEngine,
      ScopeConnection, WrtcMediaConn, Log, bind;


  // Vars
  var activeConnections = {},
      webrtcMgmntProxy,
      applicationId,
      statsMeasuringSessions = {};


  //noinspection JSUnusedLocalSymbols
  /**
   * Initializes the connectivity module.
   *
   * @summary Initializes the connectivity module.
   * @since 2.1.5
   * @param {ADL.PlatformInitListener} listener
   *          Initialization listener.
   * @param {Object} options
   *          Initialization options.
   */
  function init(listener, options) {
    // Lazy init
    Log = ADL.Log;
    ScopeConnection = MediaEngine.ScopeConnection;
    WrtcMediaConn = MediaEngine.WrtcMediaConn;
    WrtcMediaConn.PC_CONFIG = {iceServers:[options.webrtcStunServer]};

    bind = ADL.Utils.bind;

    Log.d('Initializing the Connectivity controller');
    webrtcMgmntProxy = options.webrtcMgmntProxyURL;
    applicationId = options.applicationId;
  }

  function dispose() {
    Log.d('Disposing connections controller');
    for (var id in activeConnections) {
      if (activeConnections.hasOwnProperty(id)) {
        var conn = activeConnections[id];
        var r = ADL.r(undefined, undefined);
        r.setMethod('disconnect(' + id + ')');
        conn.disconnect(r);
      }
    }
  }

  /**
   * Establishes a connection to the streaming server.
   *
   * @summary Establishes a connection to the streaming server.
   * @since 2.1.5
   * @param responder
   * @param connDescriptor
   * @param listener
   */
  function connect(responder, connDescriptor, listener) {
    if (!connDescriptor.scopeId) {
      connDescriptor.scopeId = connDescriptor.url.split('/')[1];
      connDescriptor.authDetails.scopeId = connDescriptor.url.split('/')[1];
    }

    if (connDescriptor.scopeId in activeConnections) {
      responder.error(ADL.ErrorCodes.Logic.INVALID_STATE, 'Already connected ' +
          'to scope with id: ' + connDescriptor.scopeId);
      return;
    }
    var scopeId = connDescriptor.scopeId,
        conn = new ScopeConnection(
            connDescriptor,
            webrtcMgmntProxy,
            listener,
            applicationId);
    var onR = function () {
          activeConnections[scopeId] = conn;
          responder.result();
        },
        onErr = function (errCode, errMsg) {
          responder.error(errCode, errMsg);
        };
    conn.connect(ADL.r(onR, onErr));
  }


  function disconnect(responder, scopeId) {
    var conn = _getConnection(scopeId, responder);
    if (!conn) {
      return;
    }
    conn.disconnect(responder);
    delete activeConnections[scopeId];
  }

  //noinspection JSUnusedLocalSymbols
  function publish(responder, scopeId, mediaType) {
    var conn = _getConnection(scopeId, responder);
    if (!conn) {
      return;
    }
    conn.publish(responder, mediaType);
  }

  //noinspection JSUnusedLocalSymbols
  function unpublish(responder, scopeId, mediaType) {
    var conn = _getConnection(scopeId, responder);
    if (!conn) {
      return;
    }
    conn.unpublish(responder, mediaType);
  }

  function sendMessage(responder, scopeId, message, targetUserId) {
    var conn = _getConnection(scopeId, responder);
    if (!conn) {
      return;
    }
    conn.sendMessage(responder, message, targetUserId);
  }

  function reconfigureVideo(responder, scopeId, videoConfig) {
    var conn = _getConnection(scopeId, responder);
    if (!conn) {
      return;
    }
    conn.reconfigureVideo(videoConfig);
    responder.resultAsync();
  }

  function startMeasuringStats(responder, scopeId, interval, listener) {
    if (statsMeasuringSessions[scopeId] !== undefined) {
      responder.errorAsync(ADL.ErrorCodes.Logic.INVALID_STATE,
          'Measuring already started');
      return;
    }
    var conn = _getConnection(scopeId, responder);
    if (!conn) {
      return;
    }

    statsMeasuringSessions[scopeId] = window.setInterval(
        _genStatsPublisher(scopeId, listener),
        interval * 1000);
  }

  function stopMeasuringStats(responder, scopeId) {
    window.clearInterval(statsMeasuringSessions[scopeId]);
    delete statsMeasuringSessions[scopeId];
    responder.resultAsync();
  }

  function _genStatsPublisher(scopeId, listener) {
    return function () {
      var conn = _getConnection(scopeId);
      if (conn) {
        conn.publishStats(listener);
      } else {
        window.clearInterval(statsMeasuringSessions[scopeId]);
      }
    };
  }

  function _getConnection(scopeId, responder) {
    if (activeConnections[scopeId] === undefined) {
      if (responder) {
        responder.error(ADL.ErrorCodes.Logic.INVALID_SCOPE,
            'There is no active connection to a scope with id: ' + scopeId);
        Log.e('Existing connections: ' + JSON.stringify(activeConnections));
      }
      return false;
    } else {
      return activeConnections[scopeId];
    }
  }

  function _connLost(scopeId, permanently) {
    Log.w('Got connection lost');
    if (statsMeasuringSessions[scopeId]) {
      window.clearInterval(statsMeasuringSessions[scopeId]);
      delete statsMeasuringSessions[scopeId];
    }
    if (permanently) {
      delete activeConnections[scopeId];
    }
  }

// Exports

  MediaEngine.ConnCtrl = {
    init:init,
    dispose:dispose,
    connect:connect,
    disconnect:disconnect,
    publish:publish,
    unpublish:unpublish,
    sendMessage:sendMessage,
    reconfigureVideo:reconfigureVideo,
    startMeasuringStatistics:startMeasuringStats,
    stopMeasuringStatistics:stopMeasuringStats,

    _connLost:_connLost
  };

}(window));
/**
 * Copyright (C) LiveFoundry Inc. 2013
 *
 * All rights reserved. Any use, copying, modification, distribution and selling
 * of this software and it's documentation for any purposes without authors'
 * written permission is hereby prohibited.
 *
 */

/**
 * @fileoverview
 * Single class source - contains definition of the AddLiveService module.
 *
 * @author Tadeusz Kozak
 * @date 4/16/13 9:44 AM
 */

(function (w) {
  'use strict';

  // Imports
  var ADL = w.ADL,
      MediaEngine = ADL.MediaEngine,
      Log,
      RenderCtrl;


  // Consts
  var VOLUME_MAX = 255,
      MEDIA_CLASS = 'adl-media';

  // Variables
  var localStream = false,
      localVideoSink = false,
      localStreamConsumers = [],
      danglingLocalStreamRequesters = [],
      isGetUserMediaPending = false,
      sampleAudioId,
      volume,
      videoDevLabel, audioDevLabel;

  // Smooth the API differences across the browsers
  navigator.getMedia = ( navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia);


  /**
   * Initializes the DevicesCtrl. It requests the browser to getUserMedia
   * and stores a reference to a device for further use.
   *
   * @summary Initializes the DevicesCtrl.
   * @since 2.1.5
   * @param {ADL.PlatformInitListener} listener
   *          Initialization listener - for state changes reporting.
   * @param {Object} options
   *          init options.
   */
  function init(listener, options) {
    Log = ADL.Log;
    RenderCtrl = MediaEngine.RenderCtrl;
    Log.d('Initializing WebRTC Devices Controller');
    ADL._videoDeviceFunctional = true;

    volume = VOLUME_MAX;
    _embedSampleAudio();

    var e = new ADL.InitStateChangedEvent(ADL.InitState.INITIALIZED);
    e.usesWebRTC = true;
    var progressE = new ADL.InitProgressChangedEvent(100);
    listener.onInitProgressChanged(new ADL.InitProgressChangedEvent(80));
    if (options.initDevices) {


      getUserDevice(ADL.r(function () {
        ADL._videoDeviceFunctional = true;

        e.videoCaptureDevFunctional = true;
        e.audioCaptureDevFunctional = true;
        e.audioOutputDevFunctional = true;

        releaseUserDevice('init');
        setTimeout(function () {
          listener.onInitProgressChanged(progressE);
          listener.onInitStateChanged(e);
        }, 200);

      }, function () {
        ADL._videoDeviceFunctional = false;
        e.videoCaptureDevFunctional = videoDevLabel !== undefined;
        e.audioCaptureDevFunctional = videoDevLabel !== undefined;
        e.audioOutputDevFunctional = false;
        listener.onInitProgressChanged(progressE);
        listener.onInitStateChanged(e);

      }, 'init'));
    } else {
      setTimeout(function () {
        listener.onInitProgressChanged(progressE);
        listener.onInitStateChanged(e);
      }, 200);

    }
  }

  function dispose() {
    Log.d('Disposing the Devices controller');
    if (localStream) {
      localStream.stop();
      localStream = false;
    }
  }

  function getScreenSources(responder, thumbWidth) {
    var onSucc = function (stream) {
      _onScreenSharingSrc(responder, stream);
    }, onErr = function (e) {
      Log.w('Failed to get user devices due to: ' + e.name);
      var errCode = ADL.ErrorCodes.Common.DEFAULT_ERROR;
      var errMsg = 'Failed to obtain user media due to an unknown ' +
          'error. Error details: ' + JSON.stringify(e);
      if (e.name === ADL._WRTC_CONSTS.NativeErrors.PERMISSION_DENIED) {
        errCode = ADL.ErrorCodes.Logic.USER_CONSENT_NOT_GIVEN;
        errMsg = 'User did not allow access to media device.';
      }
      responder.errorAsync(errCode, errMsg);
    };

    navigator.getMedia({
      video:{
        mandatory:{
          chromeMediaSource:'screen',
          maxWidth:thumbWidth,
          minWidth:thumbWidth
        }
      }
    }, onSucc, onErr);
  }

  function _onScreenSharingSrc(r, stream) {
    var containerId = 'screenPreview' + new Date().getTime();
    var container = ADL.Utils.embedInvisibleContainer(containerId);
    var videoNode = document.createElement('video');
    videoNode.id = 'screenPreview_content' + new Date().getTime();
    container.appendChild(videoNode);
    videoNode.src = window.URL.createObjectURL(stream);
    videoNode.style.width = '320px';
    videoNode.style.height = '240px';

    videoNode.play();
    var canvas = document.createElement('canvas');
    container.appendChild(canvas);
    canvas.id = 'screenGrab' + new Date().getTime();

    setTimeout(function () {
      var width = videoNode.videoWidth, height = videoNode.videoHeight;
      videoNode.style.width = width;
      videoNode.style.height = height;
      canvas.style.width = width;
      canvas.style.height = height;
      canvas.getContext('2d').drawImage(videoNode, 0, 0, width, height);

      var imgData = canvas.toDataURL('image/png');
      var result = [
        {
          id:'desktop',
          image:{
            base64:imgData.substr('data:image/png;base64,'.length),
            width:width,
            height:height
          },
          title:'Desktop'
        }
      ];
      container.parentNode.removeChild(container);
      stream.stop();
      r.resultAsync(result);
    }, 500);

  }

  function getCameras(r) {
    if (videoDevLabel !== undefined) {
      r.resultAsync({'0':videoDevLabel});
    } else {
      r.resultAsync({});
    }

  }

  function getMicrophones(r) {
    if (audioDevLabel !== undefined) {
      r.resultAsync([audioDevLabel]);
    } else {
      r.resultAsync([]);
    }
  }

  function getSpeakers(r) {
    r.resultAsync(['Speakers']);
  }

  function isVideoCaptureDeviceAvailable() {
    return videoDevLabel !== undefined;
  }

  function isAudioCaptureDeviceAvailable() {
    return audioDevLabel !== undefined;
  }

  /**
   * Starts local video preview
   *
   * @summary Starts local video preview
   * @since 2.1.5
   * @param {ADL.Responder} responder
   *          Responder.
   * @param {Object} listener
   */
  function startLocalVideo(responder, listener) {
    if (videoDevLabel === undefined) {
      responder.errorAsync(ADL.ErrorCodes.Media.INVALID_VIDEO_DEV,
          'Cannot start local video as there is no video capture device ' +
              'available');
      return;
    }
    if (!localVideoSink) {
      responder.setResultAdapter(function (device) {
        localVideoSink = RenderCtrl.addSink(device, true);
        listener.handleEvent({
          event:'onVideoFrameSizeChanged',
          params:{
            sinkId:localVideoSink,
            width:ADL._STATIC_CONFIG.WebRTC.MAX_CAM_WIDTH,
            height:ADL._STATIC_CONFIG.WebRTC.MAX_CAM_HEIGHT}});
        return localVideoSink;
      });
      getUserDevice(responder, 'localVideo');
    } else {
      responder.resultAsync(localVideoSink);
    }
  }

  function stopLocalVideo(responder) {
    // The API should stay asynchronous.
    setTimeout(function () {
      if (localVideoSink) {
        RenderCtrl.removeSink(localVideoSink);
        releaseUserDevice('localVideo');
        localVideoSink = false;
      }
      responder.result();
    }, 0);

  }

  function playTestSound(r) {
    var audioT = document.getElementById(sampleAudioId);
    audioT.currentTime = 0;
    audioT.play();
    r.resultAsync();
  }

  function setVolume(r, v) {
    if (v < 0) {
      v = 0;
    } else if (v > VOLUME_MAX) {
      v = VOLUME_MAX;
    }
    volume = v;
    var volumeNative = getNormalizedVolume();
    var mediaNodes = document.getElementsByClassName(MEDIA_CLASS);
    for (var i = 0; i < mediaNodes.length; i++) {
      mediaNodes[i].volume = volumeNative;
    }
    r.resultAsync();
  }

  function getVolume(r) {
    r.resultAsync(volume);
  }

  var micActivityMonitoringCtx = {};

  function monitorMicActivity(r, listener) {
    if (micActivityMonitoringCtx.micActivityInterval !== undefined) {
      r.errorAsync(ADL.ErrorCodes.Logic.INVALID_STATE,
          'Mic activity monitoring already started');
      return;
    }
    var audioContext = new window.webkitAudioContext();
    var audioInput, analyserNode, inputPoint;
    var onMic = function (stream) {
      micActivityMonitoringCtx.stream = stream;
      inputPoint = audioContext.createGain();

      // Create an AudioNode from the stream.

      audioInput = audioContext.createMediaStreamSource(stream);
      audioInput.connect(inputPoint);


      analyserNode = audioContext.createAnalyser();
      analyserNode.fftSize = 64;
      inputPoint.connect(analyserNode);
      micActivityMonitoringCtx = {
        audioContext:audioContext,
        audioInput:audioInput,
        analyserNode:analyserNode,
        inputPoint:inputPoint,
        listener:listener,
        micActivityInterval:window.setInterval(_updateGain, 100)
      };
      r.resultAsync();
    }, onMicError = function (error) {
      handleDevError(error, r);
    };
    navigator.getMedia({
          audio:true,
          video:false},
        onMic, onMicError);
  }


  function stopMonitoringMicActivity(r) {
    window.clearInterval(micActivityMonitoringCtx.micActivityInterval);
    micActivityMonitoringCtx = {};
    r.resultAsync();
  }


  function _updateGain() {
    var freqByteData = new Uint8Array(
        micActivityMonitoringCtx.analyserNode.frequencyBinCount);

    micActivityMonitoringCtx.analyserNode.getByteFrequencyData(freqByteData);
    var max = 0;
    for (var i = 0; i < freqByteData.length; i++) {
      max = Math.max(freqByteData[i], max);
    }
    micActivityMonitoringCtx.listener.handleEvent({event:'onMicActivity',
      params:{activity:max}});
  }


  function handleDevError(e, responder) {
    var errCode = ADL.ErrorCodes.Common.DEFAULT_ERROR;
    var errMsg = 'Failed to obtain user media due to an unknown ' +
        'error. Error details: ' + JSON.stringify(e);
    if (e.name === ADL._WRTC_CONSTS.NativeErrors.PERMISSION_DENIED) {
      errCode = ADL.ErrorCodes.Logic.USER_CONSENT_NOT_GIVEN;
      errMsg = 'User did not allow access to media device.';
    }
    responder.errorAsync(errCode, errMsg);
    return {errCode:errCode, errMsg:errMsg};
  }

  /**
   * ===========================================================================
   * Private helpers
   * ===========================================================================
   */


  function getUserDevice(responder, requesterId) {
    if (localStream) {
      localStreamConsumers.push(requesterId);
      responder.result(localStream);
    } else if (isGetUserMediaPending) {
      danglingLocalStreamRequesters.push(
          {responder:responder, reqId:requesterId});
    } else {
      var onSucc = function (stream) {
            Log.d('Got user device');
            if (stream.getVideoTracks().length > 0) {
              videoDevLabel = stream.getVideoTracks()[0].label;
            }
            if (stream.getAudioTracks().length > 0) {
              audioDevLabel = stream.getAudioTracks()[0].label;
            }
            localStream = stream;
            getUserDevice(responder, requesterId);
            for (var i = 0; i < danglingLocalStreamRequesters.length; i++) {
              var req = danglingLocalStreamRequesters[i];
              getUserDevice(req.responder, req.reqId);
            }
            danglingLocalStreamRequesters = [];
            isGetUserMediaPending = false;
          },
          onErr = function (e) {
            Log.w('Failed to get user devices due to: ' + e.name);
            var __ret = handleDevError(e, responder);
            var errCode = __ret.errCode;
            var errMsg = __ret.errMsg;
            for (var i = 0; i < danglingLocalStreamRequesters.length; i++) {
              var req = danglingLocalStreamRequesters[i];
              req.responder.errorAsync(errCode, errMsg);
            }
            danglingLocalStreamRequesters = [];
            isGetUserMediaPending = false;
          };
      isGetUserMediaPending = true;
      navigator.getMedia(
          {
            audio:true,
            video:{
              mandatory:{
                maxWidth:ADL._STATIC_CONFIG.WebRTC.MAX_CAM_WIDTH,
                maxHeight:ADL._STATIC_CONFIG.WebRTC.MAX_CAM_HEIGHT,
                maxFrameRate:ADL._STATIC_CONFIG.WebRTC.MAX_CAM_FPS
              },
              optional:[]}
          },
          onSucc, onErr);
    }
  }

  function releaseUserDevice(requesterId) {
    if (!localStream) {
      Log.w('Got releaseUserDevice request while device is not in use');
      return;
    }
    var index = localStreamConsumers.indexOf(requesterId);
    localStreamConsumers.splice(index, 1);
    if (!localStreamConsumers.length) {
      localStream.stop();
      localStream = false;
    }
  }

  function _embedSampleAudio() {
    sampleAudioId = 'ADL_sample_sound' + new Date().getTime();
    var audioNode = document.createElement('audio');
    audioNode.id = sampleAudioId;
    audioNode.volume = getNormalizedVolume();
    audioNode.className = MEDIA_CLASS;
    _appendSrc(audioNode, ADL._STATIC_CONFIG.WebRTC.SAMPLE_AUDIO_URL);
    document.body.appendChild(audioNode);
  }

  function getNormalizedVolume() {
    return volume / VOLUME_MAX;
  }

  function _appendSrc(container, url) {
    var src = document.createElement('source');
    src.src = url;
    var type = '';
    if (/\.mp3$/.test(url)) {
      type = 'audio/mpeg';
    } else if (/\.ogg$/.test(url)) {
      type = 'audio/ogg';
    } else if (/\.wav$/.test(url)) {
      type = 'audio/wav';
    }
    src.type = type;
    src.controls = false;
    container.appendChild(src);
  }


  // Exports

  MediaEngine.DevicesCtrl = {
    MEDIA_CLASS:MEDIA_CLASS,
    init:init,
    dispose:dispose,
    getCameras:getCameras,
    getMicrophones:getMicrophones,
    getSpeakers:getSpeakers,
    startLocalVideo:startLocalVideo,
    stopLocalVideo:stopLocalVideo,
    getUserDevice:getUserDevice,
    releaseUserDevice:releaseUserDevice,
    playTestSound:playTestSound,
    setVolume:setVolume,
    getVolume:getVolume,
    getNormalizedVolume:getNormalizedVolume,
    monitorMicActivity:monitorMicActivity,
    stopMonitoringMicActivity:stopMonitoringMicActivity,
    isVideoCaptureDeviceAvailable:isVideoCaptureDeviceAvailable,
    isAudioCaptureDeviceAvailable:isAudioCaptureDeviceAvailable,
    getScreenSources:getScreenSources
  };

}(window));/**
 * Copyright (C) LiveFoundry Inc. 2013
 *
 * All rights reserved. Any use, copying, modification, distribution and selling
 * of this software and it's documentation for any purposes without authors'
 * written permission is hereby prohibited.
 *
 */

/**
 * @fileoverview
 * Single class source - contains definition of the AddLiveService class.
 *
 * @author Tadeusz Kozak
 * @date 4/16/13 9:44 AM
 */

(function (w) {
  'use strict';

  // Imports
  var ADL = w.ADL,
      MediaEngine = ADL.MediaEngine,
      Log;

  // We still support only the WebKit.
  w.RTCPeerConnection = w.webkitRTCPeerConnection;


  /**
   * Initializes the WebRTC media engine using options dictionary provided
   *
   * @summary Initializes the WebRTC media engine
   * @since 2.1.5
   * @param {ADL.PlatformInitListener} listener
   *          Initialization listener.
   * @param {object} [options]
   *          Initialization options.
   */
  function init(listener, options) {
    Log = ADL.Log;
    Log.d('Initializing WebRTC Media Engine');
    listener.onInitProgressChanged(new ADL.InitProgressChangedEvent(50));
    MediaEngine.DevicesCtrl.init(listener, options);
    MediaEngine.ConnCtrl.init(listener, options);
    MediaEngine.AddLiveServiceWrtcImpl.init(options);
    MediaEngine.RenderCtrl.init(listener, options,
        MediaEngine.AddLiveServiceWrtcImpl._eventsDispatcher);
    ADL.StreamerResolver.init(options);
  }

  function dispose() {
    MediaEngine.ConnCtrl.dispose();
    MediaEngine.RenderCtrl.dispose();
    MediaEngine.DevicesCtrl.dispose();
  }

  /**
   * Checks whether the WebRTC functionality is available on host platform.
   *
   * @since 2.1.5
   * @return {Boolean}
   *          <code>true</code> if the WebRTC is available, <code>false</code>
   *          otherwise.
   */
  function isAvailable() {
    return !!w.webkitRTCPeerConnection;
  }

  // Exports
  MediaEngine.init = init;
  MediaEngine.dispose = dispose;
  MediaEngine.isAvailable = isAvailable;

  MediaEngine.version = '3.0.0.31';

}(window));/**
 * Copyright (C) LiveFoundry Inc. 2013
 *
 * All rights reserved. Any use, copying, modification, distribution and selling
 * of this software and it's documentation for any purposes without authors'
 * written permission is hereby prohibited.
 *
 */

/**
 * @fileoverview
 * Single class source - contains definition of the AddLiveService class.
 *
 * @author Tadeusz Kozak
 * @date 4/16/13 11:07 AM
 */

(function (w) {
  'use strict';

  // Imports
  var ADL = w.ADL,
      MediaEngine = ADL.MediaEngine,
      Log,
  // Static import
      removeChildNodes;

  var sinks, sinkCounter, audioContainerId, renderers, resizerId,
      isResizerActive, frameSizeChangeDispatcherId, eListener;

  // Smooth the API differences across the browsers
  w.URL = ( w.URL || w.webkitURL || w.mozURL || w.msURL);


  function init(listener, options, eventsListener) {
    Log = ADL.Log;
    removeChildNodes = ADL.Utils.removeChildNodes;
    Log.d('Initializing the RenderCtrl');
    sinks = {};
    renderers = {};
    sinkCounter = 0;
    audioContainerId = 'ADL_AudioContainer' + new Date().getTime();
    eListener = eventsListener;
    ADL.Utils.embedInvisibleContainer(audioContainerId);

    if (options.renderResizerEnabled) {
      _initResizer();
    }
    frameSizeChangeDispatcherId = window.setInterval(_frameSizeChangeDispatcher,
        1000);
  }

  function dispose() {
    Log.d('Disposing Render controller');

    // Remove all renderers and audio tags
    for (var renderId in renderers) {
      if (renderers.hasOwnProperty(renderId)) {
        var renderer = renderers[renderId];
        removeChildNodes(renderer.container);
      }
    }
    removeChildNodes(document.getElementById(audioContainerId));

    // Clear up state
    renderers = {};
    sinks = {};
    isResizerActive = false;
  }

  /**
   *
   * @param stream
   * @param {Boolean}local
   * @return {String}
   */
  function addSink(stream, local) {
    var id = 'ADLSink' + sinkCounter++;
    // cast local to boolean
    local = !!local;
    sinks[id] = {
      stream:stream,
      local:local,
      renderers:[],
      width:0,
      height:0,
      id:id
    };
    if (!local) {
      _addAudioPlaybackTag(id, stream);
    }
    return id;
  }

  function removeSink(sinkId, removeAudioPlayback) {
    Log.d('Removing sink with id: ' + sinkId);

    if (removeAudioPlayback) {
      _removeAudioPlaybackTag(sinkId);
      delete sinks[sinkId];
    }
    Log.d('Sink with id: ' + sinkId + ' removed.');
  }

  function renderSink(renderOptions) {
    Log.d('Rendering sink with id: ' + renderOptions.sinkId);

    _muteAudioPlaybackTag(renderOptions.sinkId);
    var sink = sinks[renderOptions.sinkId];

    var renderer = new RenderWidget(renderOptions, sink);
    sink.renderers.push(renderer);
    renderers[renderOptions.containerId] = renderer;

  }

  function disposeRenderer(containerId) {

    var renderer = renderers[containerId];
    if (renderer === undefined) {
      Log.w('Trying to dispose renderer using unknown containerId: ' + containerId);
      return;
    }
    var sink = sinks[renderer.sinkId];
    var container = document.getElementById(containerId);
    if (sink) {
      sink.renderers.splice(sink.renderers.indexOf(renderer));
      if (sink.renderers.length === 0) {
        _unmuteAudioPlaybackTag(renderer.sinkId);
      }
    }
    if (container) {
      removeChildNodes(container);
    }
    setTimeout(function () {

    }, 200);
  }

  function _initResizer() {
    isResizerActive = true;
    resizerId = window.requestAnimationFrame(_resizer);
  }

  function _resizer() {
    for (var k in sinks) {
      if (Object.prototype.hasOwnProperty.call(sinks, k)) {
        _currSink = sinks[k];
        sinks[k].renderers.forEach(_doResize);
      }
    }
    if (isResizerActive) {
      window.requestAnimationFrame(_resizer);
    }
  }

  var _currSink;

  function _doResize(renderer) {
    renderer.cropToFill(_currSink);
  }

  function _addAudioPlaybackTag(sinkId, stream) {
    var container = document.getElementById(audioContainerId);
    var videoNode = document.createElement('video');
    videoNode.src = window.URL.createObjectURL(stream);
    videoNode.style.width = 1;
    videoNode.style.height = 1;
    videoNode.id = 'audio_' + sinkId;
    videoNode.style.display = 'none';
    videoNode.autoplay = true;
    container.appendChild(videoNode);
    videoNode.play();
  }

  function _removeAudioPlaybackTag(sinkId) {
    var elem = document.getElementById('audio_' + sinkId);
    if (elem) {
      elem.parentNode.removeChild(elem);
    }
  }

  function _muteAudioPlaybackTag(sinkId) {
    var elem = document.getElementById('audio_' + sinkId);
    if (elem) {
      elem.muted = true;
    }
  }

  function _unmuteAudioPlaybackTag(sinkId) {
    var elem = document.getElementById('audio_' + sinkId);
    if (elem) {
      elem.muted = false;
    }
  }

  function _frameSizeChangeDispatcher() {
    for (var id in renderers) {
      if (renderers.hasOwnProperty(id)) {
        var renderer = renderers[id];
        var sink = sinks[renderer.sinkId];
        if (sink.width !== renderer.videoNode.videoWidth ||
            sink.height !== renderer.videoNode.videoHeight) {
          sink.width = renderer.videoNode.videoWidth;
          sink.height = renderer.videoNode.videoHeight;
          eListener.handleEvent({event:'onVideoFrameSizeChanged',
            params:{sinkId:sink.id, width:sink.width, height:sink.height}});
        }
      }
    }
  }

  function RenderWidget(renderOptions, sink) {
    var container = document.getElementById(renderOptions.containerId);
    removeChildNodes(container);
    var videoNode = document.createElement('video');

    // Create wrap-up div only if the app does not wish to deal with styling
    // manually
    if (renderOptions.fullSize) {
      var innerConteiner = document.createElement('div');
      innerConteiner.style.width = '100%';
      innerConteiner.style.height = '100%';
      innerConteiner.style.overflow = 'hidden';
      container.appendChild(innerConteiner);
      innerConteiner.appendChild(videoNode);
      this.innerContainer = innerConteiner;
    } else {
      container.appendChild(videoNode);
    }

    // Create the mirror effect if it's requested
    if (renderOptions.mirror) {
      videoNode.style.transform = 'rotateY(180deg)';
      videoNode.style.webkitTransform = 'rotateY(180deg)';
      videoNode.style.mozTransform = 'rotateY(180deg)';
    }

    // Perform further config of the vido node
    videoNode.src = window.URL.createObjectURL(sink.stream);
    videoNode.muted = sink.local;
    videoNode.volume = MediaEngine.DevicesCtrl.getNormalizedVolume();
    videoNode.className = MediaEngine.DevicesCtrl.MEDIA_CLASS;
    videoNode.autoplay = true;
    videoNode.play();
    videoNode.removeAttribute('controls');
    Log.d('Rendering of sink with id: ' + renderOptions.sinkId + ' started');
    this.videoNode = videoNode;
    this.container = container;
    this.containerW = 0;
    this.containerH = 0;
    this.sinkId = renderOptions.sinkId;
  }

  RenderWidget.prototype = {
    cropToFill:function (sinkDims) {
      var srcW = sinkDims.rWidth;
      var srcH = sinkDims.rHeight;

      var dstW = this.innerContainer.clientWidth;
      var dstH = this.innerContainer.clientHeight;
      if (dstW === this.containerW &&
          dstH === this.containerH &&

          srcW === this.videoNode.videoWidth &&
          srcH === this.videoNode.videoHeight) {
        return;
      }
      if (this.videoNode.videoWidth === 0 || this.videoNode.videoWidth === 0) {
        return;
      }
      srcW = sinkDims.rWidth = this.videoNode.videoWidth;
      srcH = sinkDims.rHeight = this.videoNode.videoHeight;

      var srcAR = srcW / srcH;
      var dstAR = dstW / dstH;
      var marginL = 0,
          marginT = 0, w = '100%', h = '100%', scale = 1;

      if (dstAR < srcAR) {
        scale = dstH / srcH;
        w = Math.floor(srcW * scale);
        h = dstH + 'px';
        marginL = Math.floor(-((w - dstW) / 2)) + 'px';
        w += 'px';

      } else if (dstAR > srcAR) {
        scale = dstW / srcW;
        h = Math.floor(srcH * scale);
        w = dstW + 'px';
        marginT = Math.floor(-((h - dstH) / 2)) + 'px';
        h += 'px';
      }
      this.videoNode.style.width = w;
      this.videoNode.style.height = h;
      this.videoNode.style.marginTop = marginT;
      this.videoNode.style.marginLeft = marginL;

      this.containerH = dstH;
      this.containerW = dstW;
    }

  };

  // Exports
  MediaEngine.RenderCtrl = {
    init:init,
    dispose:dispose,
    addSink:addSink,
    removeSink:removeSink,
    renderSink:renderSink,
    disposeRenderer:disposeRenderer
  };

}(window));/**
 * Copyright (C) LiveFoundry Inc. 2013
 *
 * All rights reserved. Any use, copying, modification, distribution and selling
 * of this software and it's documentation for any purposes without authors'
 * written permission is hereby prohibited.
 *
 * =============================================================================
 * @fileoverview
 *
 * TODO module description
 *
 * @author Tadeusz Kozak
 * @date 12.02.13 10:51
 */


(function (w) {
  'use strict';

  // Imports
  var ADL = w.ADL,
      Log = ADL.Log,
      Utils = null;

  // Variables

  /**
   * An array of URLs that are streamer endpoint resolvers.
   *
   * @private
   * @type {Array}
   */
  var resolvers = [],

      /**
       * Id of the current application.
       *
       * @private
       */
          appId = NaN,
      /**
       * String defining the version of the infrastructure that the client
       * wishes to use.
       *
       * @private
       */
          infrastructureVersion;

  /**
   * ===========================================================================
   * Public methods
   * ===========================================================================
   */

  /**
   * Initializes the StreamerResolvers using the configuration given.
   *
   * @private
   * @param {object}config
   */
  function init(config) {
    Log.d('Initializing the StreamerResolver');
    resolvers = config.streamerEndpointResolver.split(
        ADL._STATIC_CONFIG.RESOLVERS_SEPARATOR);
    infrastructureVersion = config.infrastructureVersion;
    appId = config.applicationId;
    Utils = ADL.Utils;
  }

  /**
   * Tries to resolve streamer endpoint for particular connection request.
   *
   * @private
   * @param responder
   * @param connDescr
   * @param reconnect
   */
  function doResolve(responder, connDescr, reconnect) {
    _resolveInternal(responder, connDescr, 0, undefined, reconnect);
  }

  /**
   * ===========================================================================
   * Private methods
   * ===========================================================================
   */

  function _resolveInternal(responder, connDescr, attempt, seed, reconnect) {
    seed = _genSeedIfNeeded(seed);
    Log.d('Resolving streamer endpoint. Attempt ' + attempt + '/' +
        ADL._STATIC_CONFIG.STREAMER_RESOLVE_MAX_ATTEMPTS);
    var resolver = resolvers[(seed + attempt) % resolvers.length];
    var reqData = {
      appId:appId,
      scopeId:connDescr.scopeId,
      _ts:new Date().getTime(),
      version:infrastructureVersion,
      authDetails:JSON.stringify(connDescr.authDetails)
    };
    if (reconnect) {
      var streamer = connDescr.url.split('/')[0];
      reqData.reconnect = true;
      reqData.streamer = streamer;
    }
    var requester = function () {
      Utils.doGet(_genResponder(responder, connDescr, attempt, seed, reconnect),
          resolver, reqData);
    };
    if (attempt % resolvers.length === 0) {
      setTimeout(requester, ADL._STATIC_CONFIG.RETRY_DELAY);
    } else {
      requester();
    }
  }

  function _genResponder(responder, connDescr, attempt, seed, reconnect) {
    var onSucc = function (content) {
          try {
            var contentJson = JSON.parse(content);
            connDescr.url = contentJson.endpoint + '/' + connDescr.scopeId;
            connDescr.turnServers = contentJson.turnServers;
            connDescr.webrtcMgmntProxy = contentJson.webrtcMgmntProxy;
          } catch(e) {
            connDescr.url = content + '/' + connDescr.scopeId;
          }
          responder.result(connDescr);
        },
        onErr = function (errCode, errMsg) {
          if(errCode === 403) {
            Log.w('Credentials probably expired - stop retrying');
            responder.error(ADL.ErrorCodes.Communication.BAD_AUTH,
                'CnC Rejected the signature. It is most likely expired');
            return;
          }
          if (attempt < ADL._STATIC_CONFIG.STREAMER_RESOLVE_MAX_ATTEMPTS) {
            Log.w('Failed to resolve the streamer endpoint. Falling back to ' +
                'other resolver');
            _resolveInternal(responder, connDescr, attempt + 1, seed, reconnect);
          } else {
            responder.error(errCode, errMsg);
          }
        };
    return ADL.r(onSucc, onErr);
  }


  function _genSeedIfNeeded(seed) {
    if (seed === undefined) {
      seed = new Date().getTime();
    }
    return seed;
  }

  // Exports
  /**
   * @private
   * @type {{init: Function, doResolve: Function}}
   */
  ADL.StreamerResolver = {
    init:init,
    doResolve:doResolve
  };

}(window));/**
 * Copyright (C) LiveFoundry Inc. 2013
 *
 * All rights reserved. Any use, copying, modification, distribution and selling
 * of this software and it's documentation for any purposes without authors'
 * written permission is hereby prohibited.
 *
 */

/**
 * @fileoverview
 * Single class source - contains definition of the ManagableSDP class.
 *
 * @author Tadeusz Kozak
 * @date 8/29/13 3:15 PM
 */

(function (w) {
  'use strict';

  // Imports
  var ADL = w.ADL,
      MediaEngine = ADL.MediaEngine,
      Log;

  // Consts
  var MSID_LEN = 36; //< default value for Chrome
  /**
   * Means to parse and create SDP
   */

  var a = 'a', b = 'b', c = 'c', m = 'm', o = 'o', s = 's', t = 't', v = 'v';

  function ManageableSDP(rtcSdp) {
    // Lazy init
    Log = ADL.Log;
    this.type = rtcSdp.type;
    this.sdp = rtcSdp.sdp;
    this.mediaSections = [];
    this.globalAttributes = {};
    var sdpLines = rtcSdp.sdp.split('\r\n'),
        sdpEntries = [];

    for (var i = 0; i < sdpLines.length; i++) {
      sdpEntries.push({key:sdpLines[i][0], value:sdpLines[i].substring(2)});
    }

    for (i = 0; i < sdpEntries.length; i++) {
      var key = sdpEntries[i].key,
          value = sdpEntries[i].value;
      switch (key) {
        case v:
          this.version = value;
          break;
        case o:
          this.originator = value;
          break;
        case s:
          this.sessionName = value;
          break;
        case t:
          this.time = value;
          break;
        case a:
          var colonPos = value.indexOf(':');
          var pvalue = value.substring(colonPos + 1);
          var pattrib = value.split(':');
          this.globalAttributes[pattrib[0]] = pvalue;
          break;
        case m:
          var mediaEntry = new SdpMediaSection(sdpEntries, i);
          // -1 here to suppress the i++ from the for loop stmnt
          i += mediaEntry.attributesCount - 1;
          this.mediaSections.push(mediaEntry);
          switch (mediaEntry.mediaType) {
            case 'audio':
              break;
            case 'video':
              break;
            default:
              Log.w('Got unsupported media type: ' + mediaEntry.mediaType);
          }
          break;
        default:
          Log.w('Got unhandled SDP key type: ' + key);
      }
    }

  }

  function _genAddEntryFunctor(result) {
    return function (k, v) {
      result.sdp += k + '=' + v + '\r\n';
    };
  }

  ManageableSDP.prototype = {
    serialize:function () {
      return JSON.stringify({sdp:this.sdp, type:this.type});
    },

    flush:function () {
      var i, k;
      var result = {sdp:''};
      var addEntry = _genAddEntryFunctor(result);
      addEntry(v, 0);
      addEntry(o, this.originator);
      addEntry(s, this.sessionName);
      addEntry(t, this.time);

      for (k in this.globalAttributes) {
        if (Object.prototype.hasOwnProperty.call(this.globalAttributes, k)) {
          var attrVal = this.globalAttributes[k];
          if (attrVal !== '') {
            attrVal = ':' + attrVal;
          }
          addEntry(a, k + attrVal);
        }
      }

      for (i = 0; i < this.mediaSections.length; i++) {
        this.mediaSections[i].serialize(addEntry);
      }
      this.sdp = result.sdp;
    },

    toRtcSessionDescription:function () {
      return new window.RTCSessionDescription(this);
    },

    overwriteMsidLabels:function (msid) {
      if (this.mediaSections.length !== 2) {
        var msg = 'overwriteMsidLabels() supports only peer connection with both ' +
            'audio and video present (not more, not less)';
        Log.e(msg);
        throw new ADL.AddLiveException(msg,
            ADL.ErrorCodes.Logic.INVALID_ARGUMENT);
      }


      msid = msid || ADL.Utils.randomString(MSID_LEN);

      this.globalAttributes['msid-semantic'] = 'WMS ' + msid;
      this.mediaSections[0].overwriteMsidLabels(msid);
      this.mediaSections[1].overwriteMsidLabels(msid);

    },

    mediaOrSessionAttr:function (attr, componentIndex) {
      return this.mediaSections[componentIndex].attributes[attr] ||
          this.globalAttributes[attr];
    },
    getCryptoParams:function () {
      var self = this;
      return { fingerprints:[
        self.mediaOrSessionAttr('fingerprint', 0),
        self.mediaOrSessionAttr('fingerprint', 1)
      ] };
    },

    getIceUfrags:function () {
      var iceUfrags;
      if (this.globalAttributes['ice-ufrag'] !== undefined) {
        // FF case (session level)
        iceUfrags = [
          this.globalAttributes['ice-ufrag'],
          this.globalAttributes['ice-ufrag']];
      } else {
        iceUfrags = [
          this.mediaSections[0].attributes['ice-ufrag'],
          this.mediaSections[1].attributes['ice-ufrag']];
      }
      return iceUfrags;
    },

    getIcePwds:function () {
      var icePwds;
      if (this.globalAttributes['ice-pwd'] !== undefined) {
        // FF case (session level)
        icePwds = [
          this.globalAttributes['ice-pwd'],
          this.globalAttributes['ice-pwd']];
      } else {
        icePwds = [
          this.mediaSections[0].attributes['ice-pwd'],
          this.mediaSections[0].attributes['ice-pwd']];
      }
      return icePwds;

    },

    getAudioCname:function () {
      return this.mediaSections[0].getCNAME();
    }

    /* ,
     removeBundle:function () {
     for (var i = 0; i < this.globalAttributes.length; i++) {
     if (this.globalAttributes[i].indexOf('group:BUNDLE') == 0) {
     this.globalAttributes.splice(i, 1);
     break;
     }
     }
     } */
  };


  ManageableSDP.fromString = function (input) {
    return new ManageableSDP(JSON.parse(input));
  };

  ManageableSDP.HeaderExtensions = {
    SSRC_AUDIO_LEVEL:'urn:ietf:params:rtp-hdrext:ssrc-audio-level',
    TOFFSET:'urn:ietf:params:rtp-hdrext:toffset',
    ABS_SEND_TIME:'http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time'
  };

  function SdpMediaSection(sdpEntries, startIdx) {
    var mLine = sdpEntries[startIdx],
        mLineItems = mLine.value.split(' ');

    this.attributes = {};
    this.codecsMap = {};
    this.codecs = [];
    this.SSRCs = [];
    this.ssrcLabels = {};
    this.rtcpfbLabels = [];
    this.iceCandidates = [];
    this.extmaps = {};
    this.rtcp = {};

    this.maxBandwidth = undefined;
    this.mediaType = mLineItems[0];
    this.port = mLineItems[1];
    this.profile = mLineItems[2];

    for (var i = 3; i < mLineItems.length; i++) {
      this.codecs.push(mLineItems[i]);
    }
    this.connInfo = sdpEntries[startIdx + 1].value;
    this.attributesCount = 2;
    for (i = startIdx + 2; i < sdpEntries.length; i++) {
      var key = sdpEntries[i].key, value = sdpEntries[i].value;
      if (key === m) {
        return;
      }
      if (key === b) {
        this.maxBandwidth = parseInt(value.replace(/AS:/, ''), 10);
        continue;
      }
      this.attributesCount++;
      var colonPos = value.indexOf(':');
      if (colonPos < 0) {
        switch (value) {
          case 'rtcp-mux':
            this.rtcpMux = true;
            break;
          case 'send':
          case 'recv':
          case 'sendrecv':
          case 'recvonly':
          case 'sendonly':
          case 'inactive':
            this.direction = value;
            break;
        }
      } else {
        var pkey = value.substring(0, colonPos),
            pvalue = value.substring(colonPos + 1);

        switch (pkey) {
          case 'crypto':
            var cryptoItms = pvalue.split(' ');
            this.crypto = {
              tag:cryptoItms[0],
              hash:cryptoItms[1],
              key:cryptoItms[2].substring('inline:'.length)
            };
            break;
          case 'rtpmap':
            var codecItms = pvalue.split(' ');
            this.codecsMap[codecItms[0]] = {
              id:codecItms[0], label:codecItms[1], options:[]
            };
            break;
          case 'fmtp':
            var formatItms = pvalue.split(' ');
            this.codecsMap[formatItms[0]].options.push(formatItms[1]);
            break;
          case 'ssrc':
            var ssrcItms = pvalue.split(' '),
                ssrc = ssrcItms[0];
            if (this.SSRCs.indexOf(ssrc) === -1) {
              this.SSRCs.push(ssrc);
            }
            var ssrcLabels = pvalue.substr(pvalue.indexOf(' ') + 1).split(':');
            this.ssrcLabels[ssrc] = this.ssrcLabels[ssrc] || {};
            this.ssrcLabels[ssrc][ssrcLabels[0]] = ssrcLabels[1];
            break;
          case 'rtcp-fb':
            var rtcpfbItms = pvalue.split(' ');
            this.rtcpfb = rtcpfbItms[0];
            this.rtcpfbLabels.push(pvalue.substr(pvalue.indexOf(' ') + 1));
            break;
          case 'rtcp':
            var spacePos = pvalue.indexOf(' ');
            this.rtcp = {
              port:pvalue.substring(0, spacePos),
              addrInfo:pvalue.substring(spacePos + 1)
            };
            break;
          case 'extmap':
            this.extmaps[pvalue.split(' ')[1]] = pvalue.split(' ')[0];
            break;
          case 'candidate':
            this.iceCandidates.push(pvalue);
            break;
          default:
            this.attributes[pkey] = pvalue;
        }
      }
    }
  }

  SdpMediaSection.prototype = {

    serialize:function (addEntry) {
      var i, j, k,
          mLine = this.mediaType + ' ' + this.port + ' ' + this.profile + ' ';
      mLine += this.codecs.join(' ');
      addEntry(m, mLine);

      addEntry(c, this.connInfo);

      if (this.maxBandwidth) {
        addEntry(b, 'AS:' + this.maxBandwidth);
      }
      for (k in this.attributes) {
        if (Object.prototype.hasOwnProperty.call(this.attributes, k)) {
          addEntry(a, k + ':' + this.attributes[k]);
        }
      }
      if (this.direction && this.direction.length > 0) {
        addEntry(a, this.direction);
      }
      if (this.rtcp.port !== undefined) {
        addEntry(a, 'rtcp:' + this.rtcp.port + ' ' + this.rtcp.addrInfo);
      }
      if (this.rtcpMux) {
        addEntry(a, 'rtcp-mux');
      }
      if (this.crypto) {
        addEntry(a, 'crypto:' + this.crypto.tag + ' ' + this.crypto.hash +
            ' inline:' + this.crypto.key);
      }
      for (k in this.extmaps) {
        if (Object.prototype.hasOwnProperty.call(this.extmaps, k)) {
          addEntry(a, 'extmap:' + this.extmaps[k] + ' ' + k);
        }
      }
      for (i = 0; i < this.codecs.length; i++) {
        var codec = this.codecsMap[this.codecs[i]];
        addEntry(a, 'rtpmap:' + codec.id + ' ' + codec.label);
        for (j = 0; j < codec.options.length; j++) {
          addEntry(a, 'fmtp:' + codec.id + ' ' + codec.options[j]);
        }
      }
      for (i = 0; i < this.rtcpfbLabels.length; i++) {
        addEntry(a, 'rtcp-fb:' + this.rtcpfb + ' ' + this.rtcpfbLabels[i]);
      }
      var self = this;
      this.SSRCs.forEach(function (ssrc) {
        for (var label in self.ssrcLabels[ssrc]) {
          if (Object.prototype.hasOwnProperty.call(self.ssrcLabels[ssrc], label)) {
            addEntry(a, 'ssrc:' + ssrc + ' ' + label + ':' + self.ssrcLabels[ssrc][label]);
          }
        }
      });


      for (i = 0; i < this.iceCandidates.length; i++) {
        addEntry(a, 'candidate:' + this.iceCandidates[i]);
      }
    },

    /**
     * Sets the only codec specified by payload, removing all others.
     */
    setCodecByPayload:function (payload) {
      if (this.codecs.indexOf('' + payload) === -1) {
        var msg = 'Payload type ' + payload + ' is not present in payload ' +
            'list: ' + JSON.stringify(this.codecs);
        Log.e(msg);
        throw new ADL.AddLiveException(msg,
            ADL.ErrorCodes.Logic.INVALID_ARGUMENT);
      }
      this.codecs = [payload];
    },

    setCodecByName:function (name) {
      var i;
      var payload = -1;
      for (i in this.codecsMap) {
        if (Object.prototype.hasOwnProperty.call(this.codecsMap, i)) {
          if (this.codecsMap[i].label === name) {
            payload = this.codecsMap[i].id;
            break;
          }
        }
      }
      if (payload !== -1) {
        this.codecs = [payload];
      } else {
        window.console.error('Failed to find codec with label ' + name);
      }
    },

    overwriteMsidLabels:function (msid, ssrc) {
      var componentLabel;
      if (this.mediaType === 'audio') {
        componentLabel = msid + 'a0';
      } else {
        componentLabel = msid + 'v0';
      }
      if (ssrc === undefined) {
        ssrc = this.SSRCs[0];
      }
      this.ssrcLabels[ssrc].msid = msid + ' ' + componentLabel;
      this.ssrcLabels[ssrc].mslabel = msid;
      this.ssrcLabels[ssrc].label = componentLabel;
      if (this.SSRCs.length > 1 && !ssrc) {
        // Screen sharing case - 2 streams in single PC
        this.overwriteMsidLabels(ADL.Utils.randomString(MSID_LEN), this.SSRCs[2]);
      }
    },

    getCNAME:function () {
      if (this.SSRCs.length > 0) {
        return this.ssrcLabels[this.SSRCs[0]].cname;
      } else {
        return '';
      }
    },
    removeGoogleRemb:function () {
      this.rtcpfbLabels.splice(this.rtcpfbLabels.indexOf('goog-remb'), 1);
    },

    removeNack:function () {
      this.rtcpfbLabels.splice(this.rtcpfbLabels.indexOf('nack'), 1);
    },

    overwriteSSRC:function (src, target) {
      this.ssrcLabels[target] = this.ssrcLabels[src];
      this.SSRCs.push(target);
      var idx = this.SSRCs.indexOf(src);
      this.SSRCs.splice(idx, 1);
    }
  };


  // Exports

  MediaEngine.ManageableSDP = ManageableSDP;
}(window));/**
 * Copyright (C) LiveFoundry Inc. 2013
 *
 * All rights reserved. Any use, copying, modification, distribution and selling
 * of this software and it's documentation for any purposes without authors'
 * written permission is hereby prohibited.
 *
 */

/**
 * @fileoverview
 * Single class source - contains definition of the MgmntConnection class.
 *
 * @author Tadeusz Kozak
 * @date 8/29/13 2:56 PM
 */

(function (w) {
  'use strict';


  // Imports
  var ADL = w.ADL,
      MediaEngine = ADL.MediaEngine,
      Log,
      bind;

  // Consts

  /**
   * @enum
   */
  var ClientMessageType = {
        AUTH_REQUEST:1,
        USER_EVENT:4,
        MEDIA_EVENT:5,
        MEDIA_PACKET:6
      },

      /**
       *
       * @enum {Object}
       */
          ServerMessageType = {
        AUTH_RESPONSE:1,
        USER_EVENT:3,
        MEDIA_EVENT:4,
        MEDIA_PACKET:5
      },

      /**
       * @enum
       */
          UserEventType = {
        CONNECTION_STATUS:1,
        STREAMING_STATUS:2,
        HEARTBEAT:3,
        P2P_MODE_TOGGLE:6,
        USER_MESSAGE:7,
        NEW_DOWNLINK_RESPONSE:8,
        P2P_CANDIDATE_READY:9,
        STREAMER_ERROR:10
      },

      MediaEventType = {
        SET_VIDEO_BITRATE:0,
        ADD_VIDEO_LAYER:1,
        REMOVE_VIDEO_LAYER:2,
        REQUEST_LOW_VIDEO:3,
        PUSH_STATS:4,
        ALLOWED_USERS:5,
        ENABLE_PROCESSING:6,
        DISABLE_PROCESSING:7,
        AVAILABLE_LAYERS:8
      },
      MediaType = {
        AUDIO:0,
        VIDEO:1,
        // TODO
        SCREEN:1
      },
      /**
       * @enum
       */
          AuthStatus = {
        OK:0,
        BAD_AUTH:1,
        AUTH_ERROR:2
      },
      StreamerErrorCodes = {
        STREAMER_INVALID_AUTH_MESSAGE:6001,

        // the error code 6002 is not used anymore.
        STREAMER_WRONG_CLIENT_VERSION:6003,

        STREAMER_ERR_INTERNAL:6004,

        STREAMER_BAD_AUTH_EXPIRED_SIGNATURE:6005,

        STREAMER_BAD_AUTH_UNKNOWN_CLIENT:6006,

        STREAMER_BAD_AUTH_INVALID_SIGNATURE:6007,

        STREAMER_ERR_NEW_USER_CONNECTION:2015,

        STREAMER_MEDIA_LINK_FAILED:6009
      },
      SDK_TYPE_WEBRTC = 5;

  /**
   *
   * @constructor
   */
  function MgmntConnection(listener) {
    // Lazy init
    Log = ADL.Log;
    Log.d('Initializing the Connectivity controller');
    bind = ADL.Utils.bind;
    this.state = MgmntConnection.State.CREATED;
    this.listener = listener;
    this.msgsQueue = [];
  }

  MgmntConnection._EVENT_2_HANDLER = {};
  MgmntConnection._EVENT_2_HANDLER[ServerMessageType.AUTH_RESPONSE] =
      '_onAuthResponse';
  MgmntConnection._EVENT_2_HANDLER[ServerMessageType.USER_EVENT] =
      '_onUserEvent';
  MgmntConnection._EVENT_2_HANDLER[ServerMessageType.MEDIA_EVENT] =
      '_onMediaEvent';

  MgmntConnection.State = {
    CREATED:'CREATED',
    CONNECTING:'CONNECTING',
    // State when the MgmntConnection waits for the uplink media link to be
    // ready. In this state, all the events received by the MgmntConnection
    // are queued until the connection is ready.
    AWAITING:'AWAITING',
    CONNECTED:'CONNECTED',
    TERMINATED:'TERMINATED'
  };

  MgmntConnection.prototype = {

    // public:

    /**
     * Establishes a connection to the streaming server.
     *
     * @since 2.1.5
     */
    connect:function (responder, proxyUrl) {
      this.proxyUrl = proxyUrl;
      Log.d('Trying to establish management connection to the webrtc proxy: ' +
          this.proxyUrl);

      // Store responder and update the state
      this.responder = responder;
      this.state = MgmntConnection.State.CONNECTING;

      // Prepare socket
      this.socket = new WebSocket(this.proxyUrl);
      this.socket.onopen = bind(this._onSockOpen, this);
      this.socket.onmessage = bind(this._onSockMessage, this);
      this.socket.onerror = bind(this._onSockError, this);
      this.socket.onclose = bind(this._onSockClose, this);
    },

    /**
     * @summary Generates and sends the authentication request.
     *
     * @since 2.1.5
     * @private
     */
    sendAuthReq:function (responder, requestParams) {
      var authRequest = {
        _msgClass:'clientMessage',
        msgType:ClientMessageType.AUTH_REQUEST,
        authRequest:{
          _msgClass:'authRequest',
          _streamerHost:requestParams.streamerAddr,
          audioPublished:requestParams.audioPublished,
          videoPublished:requestParams.videoPublished,
          clientVersion:'3.0.0.0',
          receiveLowVideoStream:true,
          receiveHighVideoStream:false,
          sdkType:SDK_TYPE_WEBRTC,
          authDetails:requestParams.authDetails,
          isBundledMedia:true,
          // Media stuff
          bundleIceCredentials:{
            _msgClass:'iceCredentials',
            ufrag:requestParams.iceUfrags[0],
            pwd:requestParams.icePwds[0]
          },
          fingerprint:requestParams.cryptoParams.fingerprints[0],
          cname:requestParams.cname
        }
      };
      authRequest.authRequest.authDetails._msgClass = 'authDetails';
      authRequest.authRequest.authDetails.applicationId = requestParams.appId;
      authRequest.authRequest.authDetails.scopeId = requestParams.scopeId;
      this.scopeId = requestParams.scopeId;
      this.userId = requestParams.authDetails.userId;
      this.authResponseResponder = responder;
      Log.d('[MgmntConn] = Sending Auth request: ' + JSON.stringify(authRequest));
      this._sendMsg(authRequest);
    },

    mediaReady:function () {
      var self = this;
      this.state = MgmntConnection.State.CONNECTED;
      this.msgsQueue.forEach(function (msg) {
        self._onSockMessage(msg);
      });
    },

    downlinkConnectionResponse:function (senderUserId, iceParams) {
      var request = {
        _msgClass:'clientMessage',
        msgType:ClientMessageType.USER_EVENT,
        userEvent:{
          _msgClass:'userEvent',
          type:UserEventType.NEW_DOWNLINK_RESPONSE,
          userId:senderUserId,
          bundleIceCredentials:{
            _msgClass:'iceCredentials',
            ufrag:iceParams.iceUfrags[0],
            pwd:iceParams.icePwds[0]
          },
          fingerprint:iceParams.cryptoParams.fingerprints[0]
        }
      };
      this._sendMsg(request);
    },

    publishConfigUpdated:function (pubInfo) {
      /*jshint bitwise: true*/
      var request = {
        _msgClass:'clientMessage',
        msgType:ClientMessageType.USER_EVENT,
        userEvent:{
          _msgClass:'userEvent',
          type:UserEventType.STREAMING_STATUS,
          userId:pubInfo.userId,
          remoteVideoSsrc0:pubInfo.videoSsrc,

//        equivalent of  streamId:pubInfo.videoSsrc << 2, to satisfy JS Hint
//          streamId:pubInfo.videoSsrc / 4,
          remoteAudioSsrc:pubInfo.audioSsrc,
          audioPublished:pubInfo.audioPublished,
          videoPublished:pubInfo.videoPublished,
          screenPublished:false
        }
      };

      Log.d('[MgmntConn] = Sending media publish status message: ' +
          JSON.stringify(request));
      this._sendMsg(request);
    },

    sendMessage:function (message, targetUserId) {
      var req = {
        _msgClass:'clientMessage',
        msgType:ClientMessageType.USER_EVENT,
        userEvent:{
          _msgClass:'userEvent',
          type:UserEventType.USER_MESSAGE,
          userMessage:message,
          scopeId:this.scopeId
        }
      };
      if (targetUserId !== undefined) {
        req.userEvent.userId = targetUserId;
      }
      this._sendMsg(req);
    },

    /**
     * Uploads media stats to the streaming server.
     *
     * @param {String} mediaType
     * @param {Array}  stats
     */
    publishUplinkStats:function (mediaType, stats) {
      var req = {
        _msgClass:'clientMessage',
        msgType:ClientMessageType.MEDIA_EVENT,
        mediaEvent:{
          _msgClass:'mediaEvent',
          eventType:MediaEventType.PUSH_STATS,
          mediaTransportType:1
        }
      };
      if (mediaType === ADL.MediaType.AUDIO) {
        stats._msgClass = 'audioUplinkStats';
        req.mediaEvent.type = MediaType.AUDIO;
        req.mediaEvent.pushAudioStats = {
          audioUplinkStats:stats,
          _msgClass:'mediaEventPushAudioStats'
        };
      } else {
        stats._msgClass = 'videoUplinkStats';
        req.mediaEvent.type = MediaType.VIDEO;
        req.mediaEvent.pushVideoStats = {
          videoUplinkStats:stats,
          _msgClass:'mediaEventPushVideoStats'
        };
      }
      this._sendMsg(req);
    },

    sendBitRateChangeRequest:function (bitrate) {
      var req = {
        _msgClass:'clientMessage',
        msgType:ClientMessageType.MEDIA_EVENT,
        mediaEvent:{
          _msgClass:'mediaEvent',
          type:MediaType.VIDEO,
          eventType:MediaEventType.SET_VIDEO_BITRATE,
          setVideoBitrate:{
            _msgClass:'mediaEventSetVideoBitrate',
            videoBitrate:bitrate
          }
        }
      };
      this._sendMsg(req);
    },


    updateAvailLayers:function (layerNo, enabled) {
      var req = {
        _msgClass:'clientMessage',
        msgType:ClientMessageType.MEDIA_EVENT,
        mediaEvent:{
          _msgClass:'mediaEvent',
          type:MediaType.VIDEO,
          eventType:MediaEventType.SET_VIDEO_BITRATE,
          updateVideoLayer:{
            _msgClass:'mediaEventUpdateVideoLayer',
            videoLayer:layerNo
          }
        }
      };
      if(enabled) {
        req.mediaEvent.eventType = MediaEventType.ADD_VIDEO_LAYER;
      } else {
        req.mediaEvent.eventType = MediaEventType.REMOVE_VIDEO_LAYER;
      }
      this._sendMsg(req);
    },

    disconnect:function () {
      clearTimeout(this.keepAliveTimeoutId);
      this.socket.close();
      this.state = MgmntConnection.State.TERMINATED;
    },


    // private:

    //<editor-fold desc="WebSocket event handlers">

    _onSockOpen:function () {
      Log.d('Socket connection to proxy: ' + this.proxyUrl + ' succeded');
      this.responder.result();
      delete this.responder;
    },

    _onSockError:function () {
      Log.w('Got Mgmnt socket error');
      if (this.responder !== undefined) {
        this.responder.error(ADL.ErrorCodes.Communication.NETWORK_ERROR,
            'Failed to establish management connection');
      } else {
        this.listener.onConnectionLost(ADL.ErrorCodes.Communication.NETWORK_ERROR,
            'Management connection lost');
      }
      this.stateError = true;
    },

    _onSockClose:function () {
      Log.w('Got Mgmnt socket closed');
      if (!this.stateError) {
        // Was already reported by error
        this.listener.onConnectionLost(ADL.ErrorCodes.Communication.NETWORK_ERROR,
            'Management connection lost');
      }
    },

    /**
     * Handler for a new raw message dispatched via websocket.
     *
     * @since 2.1.5
     * @param {Object} e
     *          Message event
     * @private
     */
    _onSockMessage:function (e) {
      if (e.queued) {
        Log.d('Processing queued server side message: ' + e.data);
      } else {
        Log.d('Got raw message from the streaming server: ' + e.data);
      }
      if (this.state === MgmntConnection.State.AWAITING) {
        Log.d('The management connection awaits for media streams to be ' +
            'ready. The message will be queued.');
        this.msgsQueue.push({data:e.data, queued:true});
        return;
      }
      var event = JSON.parse(e.data),
          handlerName = MgmntConnection._EVENT_2_HANDLER[event.msgType];
      if (this[handlerName] !== undefined) {
        this[handlerName](event);
      } else {
        Log.w('Cannot handle streamer\'s management event of type: ' +
            event.msgType + ' as the even handler is not defined');
      }
    },

    //</editor-fold>
    // Section: Private helpers

    /**
     * Periodically sends keep alive messages to the streaming server.
     *
     * @since 2.1.5
     * @private
     */
    _keepAliveTimer:function () {
      var event = {
        _msgClass:'clientMessage',
        msgType:ClientMessageType.USER_EVENT,
        userEvent:{
          _msgClass:'userEvent',
          type:UserEventType.HEARTBEAT,
          userId:this.userId,
          scopeId:this.scopeId,
          requestsHBReply:true
        }
      };
      this._sendMsg(event);
      this.keepAliveTimeoutId =
          setTimeout(bind(this._keepAliveTimer, this), 5000);
    },


    /**
     * Sends a message to the streamer.
     *
     * @since 2.1.5
     * @param {object} message
     *          Message to be sent.
     * @private
     */
    _sendMsg:function (message) {
      var msgStr = JSON.stringify(message);
      Log.d('Sending management message to the streamer:\n' + msgStr);
      this.socket.send(msgStr);
    },


    /**
     * Handler for auth response message.
     *
     * @since 2.1.5
     * @param {Object} e
     *          Auth response message
     * @private
     */
    _onAuthResponse:function (e) {
      var authResponse = e.authResponse;
      if (authResponse.status === AuthStatus.OK) {
        this.authResponseResponder.result(authResponse);
        this._keepAliveTimer();
        this.state = MgmntConnection.State.AWAITING;
      } else {
        this.disconnect();
        // TODO translate error code
        this.authResponseResponder.error(
            ADL.ErrorCodes.Communication.NETWORK_ERROR);
      }
    },

    /**
     * Handler for the user event message
     *
     * @since 2.1.5
     * @param {Object} e
     *          User event message
     * @private
     */
    _onUserEvent:function (e) {
      switch (e.userEvent.type) {
        case UserEventType.CONNECTION_STATUS:
          this.listener.onRemoteConnectionStatus(e.userEvent);
          break;
        case UserEventType.STREAMING_STATUS:
          this.listener.onRemoteStreamingStatus(e.userEvent);
          break;
        case UserEventType.USER_MESSAGE:
          this.listener.onRemoteMessage(e.userEvent);
          break;
        case UserEventType.STREAMER_ERROR:
          Log.w('Got streamer error: ' + JSON.stringify(e));
          var errCode = ADL.ErrorCodes.Communication.NETWORK_ERROR,
              errMsg = e.userEvent.streamerErrorMsg;
          if (e.userEvent.streamerErrorCode ===
              StreamerErrorCodes.STREAMER_ERR_NEW_USER_CONNECTION) {
            errCode = ADL.ErrorCodes.Communication.NEW_USER_CONNECTION;
          }
          this.listener.onConnectionLost(errCode, errMsg);
          this.stateError = true;
          break;
      }

    },

    /**
     * Handler for the media event message
     *
     * @since 2.1.5
     * @param {Object} e
     *          Media event message
     * @private
     */
    _onMediaEvent:function (e) {
      this.listener.onMediaEvent(e.mediaEvent);
    }

  };

// Exports
  MediaEngine.MgmntConnection = MgmntConnection;
  MediaEngine.UserEventType = UserEventType;

}
    (window)
    )
;/**
 * Copyright (C) LiveFoundry Inc. 2013
 *
 * All rights reserved. Any use, copying, modification, distribution and selling
 * of this software and it's documentation for any purposes without authors'
 * written permission is hereby prohibited.
 *
 */

/**
 * @fileoverview
 * Single class source - contains definition of the ScopeConnection class.
 *
 * @author Tadeusz Kozak
 * @date 8/29/13 2:53 PM
 */

(function (w) {
  'use strict';

  // Imports
  var ADL = w.ADL,
      MediaEngine = ADL.MediaEngine,
      Log,
      CommErrorCodes,
      MgmntConnection,
      WrtcMediaConn,
      PeerConnectionType;

  var ConnState = {
    CREATED:'CREATED',
    CONNECTING:'CONNECTING',
    CONNECTED:'CONNECTED',
    DISCONNECTED:'DISCONNECTED',
    RECONNECTING:'RECONNECTING'
  };


  function staticLazyInit() {
    if (Log !== undefined) {
      return;
    }
    Log = ADL.Log;
    CommErrorCodes = ADL.ErrorCodes.Communication;

    WrtcMediaConn = MediaEngine.WrtcMediaConn;
    MgmntConnection = MediaEngine.MgmntConnection;
    PeerConnectionType = MediaEngine.PeerConnectionType;
  }

  /**
   * @summary ScopeConnection class represents a connection to the AddLive
   *          Streaming Server
   * @constructor
   *
   */
  function ScopeConnection(connDescr, defaultProxyUrl, listener, appId) {
    staticLazyInit();
    this.connDescr = connDescr;
    this.proxyUrl = connDescr.webrtcMgmntProxy;
    this.defaultProxyUrl = defaultProxyUrl;
    this.scopeId = connDescr.scopeId;
    this.localUserId = connDescr.authDetails.userId;
    this.listener = listener;
    this.audioPublished = connDescr.autopublishAudio;
    this.videoPublished = connDescr.autopublishVideo;
    this.appId = appId;
    this.state = ConnState.CREATED;
    this.statsPushIntervalId = 0;
    this.maxBitRateAchieved = 0;
    this._createConnections();
  }

  // Exports

  ScopeConnection.prototype = {

    /**
     * This process is highly async and composed of following step:
     *
     * 1. Establishment of the WebSocket connection to the Mgmnt proxy
     * 2. Preparation of upstream WrtcMediaConn, this includes ICE candidates
     *    gathering
     * 3. Transmission of the AuthRequest
     * 4. Recv of AuthResponse
     * 5. Finishing upstream WrtcMediaConn by providing it with the streamer's
     *    answer
     *
     * @summary Establishes scope connection to the AddLive Streaming Server.
     * @param {ADL.Responder}responder
     */
    connect:function (responder) {
      Log.d('Connecting to scope: ' + this.scopeId);
      this.responder = responder;
      // This process is fully asynchronous and starts from setting up the
      // connection to the webrtc mgmnt proxy
      this.state = ConnState.CONNECTING;
      this._resolveStreamer();
      this._connectionTimeout = setTimeout(
          ADL.Utils.bind(this._handleConnectionTimeout, this),
          ADL._STATIC_CONFIG.WebRTC.CONNECT_TIME_MAX);
    },

    publish:function (responder, what) {
      this._applyStreamingChange(responder, what, true);
      if (what === ADL.MediaType.VIDEO) {
        this.mgmntConn.updateAvailLayers(0, true);
      }
    },

    unpublish:function (responder, what) {
      this._applyStreamingChange(responder, what, false);
      if (what === ADL.MediaType.VIDEO) {
        this.mgmntConn.updateAvailLayers(0, false);
      }
    },

    disconnect:function (responder) {
      if (this.state === ConnState.RECONNECTING ||
          this.mgmntConn === undefined) {
        clearTimeout(this._reconnectTimeout);
        this.state = ConnState.DISCONNECTED;
        responder.resultAsync();
        return;
      }
      this.state = ConnState.DISCONNECTED;
      this.mgmntConn.disconnect();
      this.upstreamMediaConn.close();
      ADL.Utils.forEach(this.downstreamMediaConns, function (id, conn) {
        conn.close();
      });
      window.clearInterval(this.statsPushIntervalId);
      MediaEngine.DevicesCtrl.releaseUserDevice('scope-' + this.scopeId);
      delete this.downstreamMediaConns;
      delete this.mgmntConn;
      delete this.upstreamMediaConn;

      responder.resultAsync();
    },

    sendMessage:function (responder, message, targetUserId) {
      this.mgmntConn.sendMessage(message, targetUserId);
      responder.resultAsync();
    },

    publishStats:function (listener) {
      var self = this;
      this.upstreamMediaConn.getStats(
          _genStatsResponder(listener, this.scopeId, undefined));
      ADL.Utils.forEach(this.downstreamMediaConns, function (id, conn) {
        conn.getStats(
            _genStatsResponder(listener, self.scopeId, id));
      });
    },

    reconfigureVideo:function (config) {
      if (!this.connDescr.readOnly) {
        var rate = _config2BitRate(config),
            self = this;
        this.mgmntConn.sendBitRateChangeRequest(rate * 1000);
        var fixRate = Math.min(rate, self.maxBitRateAchieved);
        this.upstreamMediaConn.renegotiateUpstreamBitRate(fixRate);
        setTimeout(function () {
          self.upstreamMediaConn.renegotiateUpstreamBitRate(undefined);
        }, 2000);
      }
    },

    // Signalling Msg Listener impl
    onRemoteConnectionStatus:function (e) {
      if (e.status) {
        this._addRemotePeer(e);
      } else {
        this._removeRemotePeer(e);
      }
    },

    onRemoteStreamingStatus:function (e) {
      // Get the media connection in subject
      var mediaConn = this.downstreamMediaConns[e.userId], mediaType;

      // Find the media which status was changed
      if (e.audioPublished !== mediaConn.audioEnabled) {
        // Got audio event
        mediaType = ADL.MediaType.AUDIO;
      } else if (e.videoPublished !== mediaConn.videoEnabled) {
        mediaType = ADL.MediaType.VIDEO;
      } else if (e.screenPublished !== mediaConn.screenEnabled) {
        mediaType = ADL.MediaType.SCREEN;
      }

      mediaConn.renegotiateEnabledStreams(e.audioPublished, e.videoPublished,
          e.screenPublished);

      // Update the event with sink id, if it's related to a published video or
      // screen
      if (mediaType === ADL.MediaType.VIDEO && e.videoPublished) {
        e.videoSinkId = mediaConn.videoSinkId;
      } else if (mediaType === ADL.MediaType.SCREEN && e.screenPublished) {
        e.screenSinkId = mediaConn.screenSinkId;
      }
      e.mediaType = mediaType;
      this.listener.handleEvent({event:'onMediaStreamEvent',
        params:{
          scopeId:this.scopeId,
          userDetails:e,
          mediaType:mediaType
        }});
    },
    onRemoteMessage:function (e) {
      this.listener.handleEvent({event:'onMessage', params:{
        scopeId:this.scopeId,
        srcUserId:e.userId,
        data:e.userMessage
      }});

    },
    onMediaEvent:function (e) {
      Log.d('Got media event: ' + JSON.stringify(e));
    },

    onConnectionLost:function (errCode, errMsg) {
      if (this.state !== ConnState.CONNECTED) {
        // Ignore if we're not connected.
        return;
      }

      this.disconnect(ADL.nR('disconnect'));
      this.state = ConnState.RECONNECTING;
      this._createConnections();
      this._setupReconnect();

      MediaEngine.ConnCtrl._connLost(this.scopeId, false);
      // Do this after setting up reconnects so the client app can handle the
      // event and close the connection if required.
      this.listener.handleEvent({
        event:'onConnectionLost', params:{
          scopeId:this.scopeId,
          errCode:errCode,
          errMessage:errMsg,
          willReconnect:true
        }
      });

    },


    _applyStreamingChange:function (responder, what, enabled) {
      switch (what) {
        case ADL.MediaType.AUDIO:
          if (this.audioPublished === enabled) {
            Log.w('Trying to publish audio even tough it\'s already ' +
                'published');
            responder.resultAsync();
            return;
          }
          this.audioPublished = enabled;
          break;
        case ADL.MediaType.VIDEO:
          if (this.videoPublished === enabled) {
            Log.w('Trying to publish video even tough it\'s already ' +
                'published');
            responder.resultAsync();
            return;
          }
          this.videoPublished = enabled;
          break;
      }

      this.mgmntConn.publishConfigUpdated({
        userId:this.localUserId,
        audioSsrc:this.upstreamMediaConn.audioSsrc,
        videoSsrc:this.upstreamMediaConn.videoSsrc,
        audioPublished:this.audioPublished,
        videoPublished:this.videoPublished
      });
      this.upstreamMediaConn.renegotiateEnabledStreams(
          this.audioPublished, this.videoPublished);
      // TODO add real error reporting :|
      responder.resultAsync();
    },

    //<editor-fold desc="Connection establishment sequence">
    /**
     * =========================================================================
     * Connection establishment sequence
     * =========================================================================
     */

    // 0. Resolve streamer

    _resolveStreamer:function () {
      var self = this;
      var onConnUrl = function (finalDescr) {
            self.connDescr = finalDescr;
            if (!self.proxyUrl) {
              self.proxyUrl = finalDescr.webrtcMgmntProxy;
            }
            if (!self.proxyUrl) {
              self.proxyUrl = self.defaultProxyUrl;
            }
            self._connectToWebrtcProxy();
          },
          onConnUrlErr = function () {
            self.responder.error(
                ADL.ErrorCodes.Communication.NETWORK_ERROR,
                'Failed to connect to AddLive service most likely due to ' +
                    'Internet outage or firewall blocking HTTP communication');
          };
      if (!this.connDescr.url) {
        var connUrlResponder = ADL.r(onConnUrl, onConnUrlErr);
        connUrlResponder.setMethod('StreamerResolver.doResolve()');
        //noinspection JSAccessibilityCheck
        ADL.StreamerResolver.doResolve(connUrlResponder, this.connDescr, false);
      } else {
        onConnUrl(this.connDescr);
      }
    },

    // 1. Connect to the webrtc mgmnt proxy
    _connectToWebrtcProxy:function () {
      var self = this,
          onConn = function () {
            Log.d('Management connection connected');
            if (self.connDescr.readOnly) {
              self._sendAuthRequest({
                iceUfrags:['123321123'],
                icePwds:['123321'],
                cryptoParams:{fingerprints:['sha-256 35:0E:4B:4B:C5:A3:DC:17:9C:8A:73:D7:19:6B:04:8D:33:0F:A9:A8:B0:0B:2E:3F:CC:25:7B:11:1F:2F:27:44']},
                cname:'Some non empty Cname'
              });
            } else {
              self._getUserDevice();
            }

          },
          onConnErr = function () {
            var msg = 'There was an error connecting to the websocket proxy. ' +
                'No Internet connectivity? Proxy down?';
            Log.w(msg);
            self.responder.error(CommErrorCodes.NETWORK_ERROR, msg);
          };
      var r = ADL.r(onConn, onConnErr);
      r.setMethod('MgmntConnection#connect()');
      this.mgmntConn.connect(r, this.proxyUrl);
    },

    // 2. Get the local device (assuming autopublish:true)
    _getUserDevice:function () {
      var self = this,
          onDev = function (device) {
            Log.d('Management connection connected');
            self._connectMediaUpstream(device);
          },
          onDevErr = function () {
            var msg = 'There was an error requesting the device';
            Log.w(msg);
            self.responder.error(ADL.ErrorCodes.Media.INVALID_VIDEO_DEV, msg);
          };

      var r = ADL.r(onDev, onDevErr);
      r.setMethod('DevicesCtrl.getUserDevice');
      MediaEngine.DevicesCtrl.getUserDevice(r, 'scope-' + this.scopeId);
    },

    // 3. Setup upstream media connection - request it to prepare an offer
    _connectMediaUpstream:function (device) {
      var self = this,
          onOffer = function (iceConfig) {
            Log.d('Management connection connected');
            self._sendAuthRequest(iceConfig);
          },
          onConnected = function () {
            self._handleMediaUplinkReady();
          },
          onOfferErr = function () {
            var msg = 'There was an error preparing upstream media connection';
            Log.w(msg);
            self.responder.error(
                ADL.ErrorCodes.Communication.MEDIA_LINK_FAILURE, msg);
          };

      var r = ADL.r(onOffer, onOfferErr);
      r.setMethod('WrtcMediaConn#setupForUpstream');
      var connR = ADL.r(onConnected);
      connR.setMethod('WrtcMediaConn#connected');
      this.upstreamMediaConn.setupForUpstream(
          r, device,
          {audio:this.audioPublished, video:this.videoPublished},
          connR
      );
    },

    // 4. Send auth request
    _sendAuthRequest:function (iceConfig) {
      var self = this,
          streamerAddr = this.connDescr.url.split('/')[0],
          req = {
            userId:this.connDescr.authDetails.userId,
            scopeId:this.scopeId,
            appId:this.appId,
            streamerAddr:streamerAddr,
            audioPublished:this.connDescr.autopublishAudio,
            videoPublished:this.connDescr.autopublishVideo,
            authDetails:this.connDescr.authDetails
          },
          onAuthResponse = function (response) {
            self._handleAuthResponse(response);
          },
          onAuthResponseErr = function (errCode, errMsg) {
            self.responder.error(errCode, errMsg);
          };
      //noinspection JSAccessibilityCheck
      req = ADL.Utils.merge(req, iceConfig);
      //noinspection JSAccessibilityCheck
      var r = ADL.r(onAuthResponse, onAuthResponseErr);
      r.setMethod('MgmntConnection#sendAuthReq');
      this.mgmntConn.sendAuthReq(r, req);
    },

    // 5. Handle the auth response.
    _handleAuthResponse:function (response) {
      if (!this.connDescr.readOnly) {
        this.upstreamMediaConn.handleAuthResponse(response);
      } else {
        this.mediaUplinkReady = true;
      }
      this.authResponse = response;
      this.mgmntReady = true;
      this._dispatchConnectionSuccMaybe();
    },

    _handleMediaUplinkReady:function () {
      this.mediaUplinkReady = true;
      this._dispatchConnectionSuccMaybe();
    },

    _dispatchConnectionSuccMaybe:function () {
      // If both states are ready and we haven't dispatched the notification yet
      if (this.mediaUplinkReady &&
          this.mgmntReady &&
          this.state !== ConnState.CONNECTED) {
        clearTimeout(this._connectionTimeout);
        this.responder.resultAsync();
        this.responder = null;
        this.state = ConnState.CONNECTED;

        // Update the state of mgmnt connection so it can properly start
        // receiving the streaming server events.
        var self = this;
        var connReadyDispatcher = function () {
          self.mgmntConn.mediaReady();
          self.listener.handleEvent({
            event:'onMediaConnTypeChanged',
            params:{
              scopeId:self.scopeId,
              mediaType:ADL.MediaType.AUDIO,
              connectionType:ADL.ConnectionType.UDP_RELAY
            }
          });

          self.listener.handleEvent({
            event:'onMediaConnTypeChanged',
            params:{
              scopeId:self.scopeId,
              mediaType:ADL.MediaType.VIDEO,
              connectionType:ADL.ConnectionType.UDP_RELAY
            }
          });

          if (!self.connDescr.readOnly) {
            Log.d('Starting stats push interval');
            self.statsPushIntervalId = window.setInterval(function () {
              Log.d('Pushing stats');
              self._statsPublisher();
            }, ADL._STATIC_CONFIG.WebRTC.STATS_PUBLISH_INTERVAL);
          }
          self.mgmntConn.updateAvailLayers(0, self.connDescr.autopublishVideo);
        };
        setTimeout(connReadyDispatcher, 100);
      }
    },

    _handleConnectionTimeout:function () {
      this.disconnect(ADL.nR('disconnect()'));
      var errorMsg = 'Failed to connect as connection timeout occured. ' +
          'Failed to establish following connection components: ';
      if (!this.mgmntReady) {
        errorMsg += 'management connection ';
      }
      if (!this.mediaUplinkReady) {
        errorMsg += ' media uplink connection';
      }
      this.responder.errorAsync(ADL.ErrorCodes.Communication.NETWORK_ERROR,
          errorMsg);
    },
    //</editor-fold>

    _addRemotePeer:function (e) {
      if (this.connDescr.readOnly && !e.videoPublished && !e.audioPublished) {
        // Ignore other readonly connections
        return;
      }
      var self = this,
          onOffer = function (iceConfig) {
            Log.d('Management connection connected');
            self.mgmntConn.downlinkConnectionResponse(e.userId, iceConfig);
          },
          onConnected = function () {
            Log.d('WrtcMediaConn for downlink for user ' + e.userId + ' ready');
          },
          onOfferErr = function () {
            var msg = 'There was an error preparing downstream media ' +
                'connection';
            Log.w(msg);
            // TODO what to do here?

          },
          mediaConn = new WrtcMediaConn(e.userId, this.scopeId, this.connDescr.turnServers);
      mediaConn.onRemoteStreamReady = function () {
        Log.d('Got remote stream ready.');
        self.listener.handleEvent({
          event:'onUserEvent',
          params:{
            scopeId:self.scopeId,
            userDetails:{
              id:e.userId,
              isConnected:true,
              videoPublished:e.videoPublished,
              audioPublished:e.audioPublished,
              screenPublished:e.screenPublished,
              videoSinkId:mediaConn.videoSinkId,
              screenSinkId:mediaConn.screenSinkId
            }
          }
        });
        // remove self
        mediaConn.onRemoteStreamReady = undefined;
      };
      this.downstreamMediaConns[e.userId] = mediaConn;
      var r = ADL.r(onOffer, onOfferErr);
      r.setMethod('WrtcMediaConn#setupForDownstream');
      var connectedResponder = ADL.r(onConnected);
      connectedResponder.setMethod('WrtcMediaConn#connectedForDownlink');
      mediaConn.setupForDownstream(r, e, this.authResponse, connectedResponder);
    },

    _removeRemotePeer:function (e) {
      var mediaConn = this.downstreamMediaConns[e.userId];
      mediaConn.close();
      delete this.downstreamMediaConns[e.userId];
      this.listener.handleEvent({
        event:'onUserEvent',
        params:{
          scopeId:this.scopeId,
          userDetails:{
            id:e.userId,
            isConnected:false
          }
        }
      });
    },

    _createConnections:function () {
      this.mgmntConn = new MgmntConnection(this, this.proxyUrl);
      if (!this.connDescr.readOnly) {
        this.upstreamMediaConn = new WrtcMediaConn(
            this.connDescr.authDetails.userId,
            this.connDescr.scopeId,
            this.connDescr.turnServers);
      }
      this.downstreamMediaConns = {};
    },

    //<editor-fold desc="Reconnects">
    /**
     * =========================================================================
     * Reconnects
     * =========================================================================
     */



    _setupReconnect:function () {
      var min = ADL._STATIC_CONFIG.RECONNECT_MIN_INTERVAL,
          max = ADL._STATIC_CONFIG.RECONNECT_MAX_INTERVAL,
          timeout = min + (Math.random() % (max - min));
      Log.d('Will attempt to reconnect after ' + timeout);
      this._reconnectTimeout =
          w.setTimeout(ADL.Utils.bind(this._reconnect, this), timeout * 1000);
    },

    _reconnect:function () {
      Log.i('Trying to reconnect session with id: ' + this.scopeId);
      //noinspection JSAccessibilityCheck
      var r = ADL.r(
          ADL.Utils.bind(this._onNewURL, this),
          ADL.Utils.bind(this._onConnError, this));
      r.setMethod('StreamerResolver.doResolve');
      ADL.StreamerResolver.doResolve(r, this.connDescr, true);
    },

    _onNewURL:function (newConnDescr) {
      this.connDescr = newConnDescr;
      this.responder = ADL.r(
          ADL.Utils.bind(this._onConnected, this),
          ADL.Utils.bind(this._onConnError, this));
      this._connectToWebrtcProxy();
    },

    _onConnected:function () {
      Log.i('Session with id: ' + this.scopeId + ' successfully reconnected');
      this.state = ConnState.CONNECTED;
      this.listener.handleEvent({
        event:'onSessionReconnected', params:{
          scopeId:this.scopeId
        }
      });
    },

    _onConnError:function (errCode) {
      Log.w('Failed to reconnect session with id: ' + this.scopeId);
      if (errCode === ADL.ErrorCodes.Communication.BAD_AUTH) {
        this.disconnect(ADL.nR('disconnect()'));
        this.state = ConnState.DISCONNECTED;
        this.listener.handleEvent({
          event:'onConnectionLost', params:{
            scopeId:this.scopeId,
            errCode:errCode,
            errMessage:'An attempt to reconnect failed as the authentication ' +
                'signature provided during connection setup has expired',
            willReconnect:false
          }
        });
        MediaEngine.ConnCtrl._connLost(this.scopeId, true);
      } else {
        this._setupReconnect();
      }
    },
//</editor-fold>


    //<editor-fold desc="Stats">
    /**
     * =========================================================================
     * Stats
     * =========================================================================
     */

    _statsPublisher:function () {

      var self = this,
          onStats = function (stats) {
            var audioStats = {
                  ssrc:self.upstreamMediaConn.audioSsrc,
                  timestamp:new Date().getTime() / 1000,
                  kbps:stats.audio.totalKbps,
                  rtt:stats.audio.rtt,
                  cumLoss:0,
                  fracLoss:0
                },
                videoStats = {
                  ssrc:self.upstreamMediaConn.videoSsrc,
                  timestamp:audioStats.timestamp,
                  layer:1,
                  kbps:stats.video.totalKbps,
                  totalKbps:stats.video.totalKbps,
                  cpu:0,
                  totalCpu:0,
                  fps:stats.video.fps,
                  psnr:0,
                  rtt:audioStats.rtt,
                  cumLoss:0,
                  fracLoss:0,
                  qdl:0,
                  width:stats.video.frameWidth,
                  height:stats.video.frameHeight

                };
            var k;
            for (k in audioStats) {
              if (audioStats.hasOwnProperty(k)) {
                audioStats[k] = parseInt(audioStats[k], 10);
              }
            }
            for (k in videoStats) {
              if (videoStats.hasOwnProperty(k)) {
                videoStats[k] = parseInt(videoStats[k], 10);
              }
            }
            self.maxBitRateAchieved = Math.max(self.maxBitRateAchieved,
                videoStats.kbps);
            self.mgmntConn.publishUplinkStats(ADL.MediaType.AUDIO, [audioStats]);
            self.mgmntConn.publishUplinkStats(ADL.MediaType.VIDEO, [videoStats]);
          };
      this.upstreamMediaConn.getStats(ADL.r(onStats));
    }

  };

  function _config2BitRate(videoConfig) {
    var pps = videoConfig.maxWidth * videoConfig.maxHeight * videoConfig.maxFps;
    var rate = pps * 0.000282118;
    if (rate > ADL._STATIC_CONFIG.WebRTC.MAX_VIDEO_BITRATE) {
      rate = ADL._STATIC_CONFIG.WebRTC.MAX_VIDEO_BITRATE;
    } else if (rate < 50) {
      rate = 50;
    }
    rate = Math.floor(rate);
    return rate;
  }

  function _genStatsResponder(listener, scopeId, userId) {
    return ADL.r(function (stats) {
      listener.handleEvent(
          {event:'onMediaStats',
            params:{
              scopeId:scopeId,
              remoteUserId:userId,
              mediaType:ADL.MediaType.AUDIO,
              stats:stats.audio
            }});
      listener.handleEvent(
          {event:'onMediaStats',
            params:{
              scopeId:scopeId,
              remoteUserId:userId,
              mediaType:ADL.MediaType.VIDEO,
              stats:stats.video
            }});
    });
  }

//</editor-fold>
  // Exports
  MediaEngine.ScopeConnection = ScopeConnection;

}(window));
/**
 * Copyright (C) LiveFoundry Inc. 2013
 *
 * All rights reserved. Any use, copying, modification, distribution and selling
 * of this software and it's documentation for any purposes without authors'
 * written permission is hereby prohibited.
 *
 */

/**
 * @fileoverview
 * Single class source - contains definition of the WrtcMediaConn class.
 *
 * @author Tadeusz Kozak
 * @date 8/29/13 3:09 PM
 */

(function (w) {
  'use strict';

  // Imports
  var ADL = w.ADL,
      MediaEngine = ADL.MediaEngine,
      Log,
      ManageableSDP;

  // Consts

  // recommendation from
  // http://tools.ietf.org/html/draft-rescorla-mmusic-ice-lite-00
  var ICE_LITE_PRIO = 2130706431,


      RtpExtensionIds = {
        SSRC_AUDIO_LEVEL:1,
        TOFFSET:2
      },
      /**
       * @enum
       */
          PeerConnectionType = {
        UPLINK:'pc_type_uplink',
        DOWNLINK:'pc_type_downlink'
      },
      TurnTransportType = {
        TCP:'TCP', TLS:'TLS', UDP:'UDP'
      },
      WrtcMediaConnState = {
        CREATED:'CREATED',
        CONNECTING:'CONNECTING',
        CONNECTED:'CONNECTED',
        TERMINATED:'TERMINATED'
      };


  // Vars

  function staticLazyInitMaybe() {
    if (Log) {
      return;
    }
    Log = ADL.Log;
    ManageableSDP = MediaEngine.ManageableSDP;
  }

  /**
   * ===================================================================
   * Public API
   * ===================================================================
   */

  /**
   * @summary Represents WebRTC media connection.
   *
   * The AddLive WebRTC based framework uses N instances of this class to
   * establish N-peers conference. One connection is used for upstream, and
   * N-1 for downstreams.
   *
   * After constructing, the `WrtcMediaConn` is direction agnostic - it can be
   * used for both uplink or downlink. To specification is done using the
   * connect methods: {@link WrtcMediaConn#setupForUpstream} and
   * {@link WrtcMediaConn#setupForDownstream}.
   *
   * @param {Number} userId
   *          Id of user who this connection represents.
   * @param {String} scopeId
   *          If of scope to which this connection is made.
   * @param {Array} [turnServers]
   *          An array of turn servers to be used by the peer connection
   * @constructor
   */
  function WrtcMediaConn(userId, scopeId, turnServers) {
    staticLazyInitMaybe();
    this.state = WrtcMediaConnState.CREATED;
    Log.d('[PC] = Creating new instance of the WrtcMediaConn');
    var pcConfig = {iceServers:[]};
    if (turnServers) {
      turnServers.forEach(function (turnServer) {
        pcConfig.iceServers.push(_createIceServer(turnServer));
      });
    }
    var pcConstraints = {'optional':[
      {'DtlsSrtpKeyAgreement':true}
    ]};

    this.userId = userId;
    this.scopeId = scopeId;

    this._nativePC = new w.RTCPeerConnection(pcConfig, pcConstraints);
    this._nativePC.onicecandidate = this._proxy('_onLocalIceCandidate');
    this._nativePC.oniceconnectionstatechange =
        this._proxy('_onIceConnectionStateChange');
    this._nativePC.onaddstream = this._proxy('_onPeerConnectionStreamAdded');
    this._nativePC.onremovestream =
        this._proxy('_onPeerConnectionStreamRemoved');
    this._nativePC.onstatechanged =
        this._proxy('_onPeerConnectionStateChanged');

    // Queue of requests to renegotiate media streaming status. These requests
    // will be queued when the connection is in WrtcMediaConnState.CONNECTING
    // state
    this._renegotiateStreamsQueue = [];


    this.onRemoteStreamReady = false;
    Log.d('[PC] = PeerConnection created');
  }

  WrtcMediaConn.prototype = {

    // public:

    /**
     * Configures `this` WrtcMediaConn instance for upstream.
     *
     * @param {ADL.Responder} offerResponder
     *          Responder object that will receive an offer
     * @param {Object} localStream
     *          Media source obtained from
     *          {@link ADL.MediaEngine.DevicesCtrl.getUserDevice}.
     * @param {Object} publishOptions
     *          Configures which media should be automatically published.
     * @param {Boolean} publishOptions.audio
     *          Flag defining whether the audio stream should be automatically
     *          published.
     * @param {Boolean} publishOptions.video
     *          Flag defining whether the video stream should be automatically
     *          published.
     * @param {ADL.Responder} connResponder
     *          Responder that will be called when the connection is successful
     */
    setupForUpstream:function (offerResponder, localStream, publishOptions, connResponder) {
      Log.d('[PC] = Connecting uplink');
      this.connectionType = PeerConnectionType.UPLINK;
      this.localStream = localStream;
      this.audioEnabled = publishOptions.audio;
      this.videoEnabled = publishOptions.video;
      this.connResponder = connResponder;
      var self = this;
      var onOffer = function (iceParams, offerSdp) {
        // save to use after getting authResponse:
        self.offerSdp = offerSdp;
        offerResponder.result(iceParams);
      };

      // this will trigger ICE discovery:
      self._makeOffer(onOffer);
      this.state = WrtcMediaConnState.CONNECTING;
    },

    /**
     * Prepares `this` WrtcMediaConn for downlink stream reception.
     *
     * @param {ADL.Responder} responder
     * @param {PCConfiguration} userStateChangedEvent
     * @param authResponse
     * @param connectedResponder
     */
    setupForDownstream:function (responder, userStateChangedEvent, authResponse, connectedResponder) {
      Log.d('[PC] = connecting new downlink for user ' + userStateChangedEvent.userId);
      this.connectionType = PeerConnectionType.DOWNLINK;
      this.audioEnabled = userStateChangedEvent.audioPublished;
      this.videoEnabled = userStateChangedEvent.videoPublished;
      this.screenEnabled = userStateChangedEvent.screenPublished;
      this.connResponder = connectedResponder;
      this._storeStreamerConfig(authResponse);
      var self = this;
      this._makeOffer(function (iceParams, offerSdp) {
        self.offerSdp = offerSdp;
        self._setPcDescriptions(userStateChangedEvent);

        responder.result(iceParams);
      });
      this.state = WrtcMediaConnState.CONNECTING;
    },

    handleAuthResponse:function (authResponse) {
      Log.d('[PC] = Handling auth response');
      this._storeStreamerConfig(authResponse);
      this._setPcDescriptions(authResponse);
    },


    close:function () {
      Log.d('[PC] = Closing a connection');
      if (this._nativePC !== null) {
        this._nativePC.close();
      }
      if (this._isDownlink() && this.sinkId !== undefined) {
        MediaEngine.RenderCtrl.removeSink(this.sinkId, true);
      }
      this.state = WrtcMediaConnState.TERMINATED;
      delete this._nativePC;
      this._nativePC = null;
    },

    isConnected:function () {
      return this.state === WrtcMediaConnState.CONNECTED;
    },

    renegotiateEnabledStreams:function (audioPublished, videoPublished, screenPublished) {
      if (this.state === WrtcMediaConnState.CONNECTING) {
        var e = {
          audioPublished:audioPublished,
          videoPublished:videoPublished,
          screenPublished:screenPublished
        };
        this._renegotiateStreamsQueue.push(e);
        Log.d('Queued request to change the streaming configuration');
        return;
      }
      if (audioPublished === this.audioEnabled &&
          videoPublished === this.videoEnabled &&
          screenPublished === this.screenEnabled) {
        Log.d('Got request to change media status with configuration same ' +
            'to current one. Skipping.');
        return;
      }

      var videoStateChanged = videoPublished !== this.videoEnabled;
      this.audioEnabled = audioPublished;

      this.videoEnabled = videoPublished;
      this.screenEnabled = screenPublished;
      Log.d('[PC] = changing media publishing status');


      this._renegotiateMediaStatus();

      if (this._isDownlink()) {
        if (videoStateChanged) {
          // If we are receiving data and have change in video streaming status...
          if (videoPublished) {
            this.videoSinkId = MediaEngine.RenderCtrl.addSink(this.videoStream);
//            this.onRemoteStreamReady();
          } else {
            MediaEngine.RenderCtrl.removeSink(this.videoSinkId, false);
          }
        }
        if (this.screenEnabled !== screenPublished) {
          if (screenPublished) {
            this.screenSinkId = MediaEngine.RenderCtrl.addSink(this.screenStream);
//            this.onRemoteStreamReady();
          } else {
            MediaEngine.RenderCtrl.removeSink(this.screenSinkId, true);
          }
        }
      }
    },

    renegotiateUpstreamBitRate:function (newRate) {
      Log.d('Setting new max uplink rate: ' + newRate);
      this.maxUplinkRate = newRate;
      this._renegotiateMediaStatus();
    },

    getStats:function (responder) {
      if (this._isUplink()) {
        this._getUplinkStats(responder);
      } else {
        this._getDownlinkStats(responder);
      }
    },

    // private:

    _getUplinkStats:function (responder) {
      var self = this;
      var onStats = function (reports) {
        var audioStats, videoStats, screenStats;
        var results = reports.result();
        for (var i = 0; i < results.length; i++) {
          var result = results[i];
          if (/^ssrc/.test(result.id)) {
            var stats = {};
            var names = result.names();
            for (var i2 = 0; i2 < names.length; i2++) {
              stats[names[i2]] = result.stat(names[i2]);
            }
            stats.timestamp = result.timestamp.getTime();
            if (parseInt(stats.ssrc, 10) === parseInt(self.audioSsrc, 10)) {
              audioStats = stats;
            } else if (parseInt(stats.ssrc, 10) === parseInt(self.videoSsrc, 10)) {
              videoStats = stats;
            } else {
              screenStats = stats;
            }
          }
        }

        audioStats.googRtt = videoStats.googRtt;
        responder.result(
            {
              audio:_translateAudioStats(audioStats, self.prevAudioStats,
                  self.connectionType),
              video:_translateVideoStats(videoStats, self.prevVideoStats,
                  self.connectionType)
            });
        self.prevAudioStats = audioStats;
        self.prevVideoStats = videoStats;
      };

      this._nativePC.getStats(onStats);
    },
    _getDownlinkStats:function (responder) {
      // Note here, in the audioStats, audioOutputLevel property we can get the
      // speech level of remote user.
      var self = this;
      var onStats = function (reports) {
        var audioStats = {}, videoStats = {}, screenStats = {};
        var results = reports.result();
        var totalBytesReceived;
        for (var i = 0; i < results.length; i++) {
          var result = results[i];

          if (/^Conn/.test(result.id)) {
            totalBytesReceived = parseInt(result.stat('bytesReceived'), 10);
          } else if (/^ssrc/.test(result.id)) {
            var stats = {};
            var names = result.names();
            for (var i2 = 0; i2 < names.length; i2++) {
              stats[names[i2]] = result.stat(names[i2]);
            }
            stats.timestamp = result.timestamp.getTime();
            if (parseInt(stats.ssrc, 10) === parseInt(self.recvAudioSsrc, 10)) {
              audioStats = stats;
            } else if (parseInt(stats.ssrc, 10) === parseInt(self.recvVideoSsrc, 10)) {
              videoStats = stats;
            } else if (parseInt(stats.ssrc, 10) === parseInt(self.recvScreenSsrc, 10)) {
              screenStats = stats;
            }
          }
        }
        Log.d('===== Audio SSRC: ' + self.audioSsrc + '====================');
        Log.d('Got audio stats: ' + JSON.stringify(audioStats));

        Log.d('');
        Log.d('');
        Log.d('===== Video SSRC: ' + self.videoSsrc + '====================');
        Log.d('Got video stats: ' + JSON.stringify(videoStats));

        Log.d('');
        Log.d('');
        Log.d('===== Screen SSRC: ' + self.screenSsrc + '====================');
        Log.d('Got screen stats: ' + JSON.stringify(screenStats));
        Log.d('');
        Log.d('');
        videoStats.bytesReceived = totalBytesReceived -
            parseInt(audioStats.bytesReceived, 10);
        responder.result(
            {
              audio:_translateAudioStats(audioStats, self.prevAudioStats,
                  self.connectionType),
              video:_translateVideoStats(videoStats, self.prevVideoStats,
                  self.connectionType)
            });
        self.prevAudioStats = audioStats;
        self.prevVideoStats = videoStats;
      };

      this._nativePC.getStats(onStats);
    },

    _storeStreamerConfig:function (authResponse) {
// cache streamer ICE candidates to use for downlinks:
      this.streamerAudioIceCandidates = authResponse.audioIceCandidates;
      this.streamerVideoIceCandidates = authResponse.videoIceCandidates;
      this.streamerBundleIceCandidates = authResponse.bundleIceCandidate;

      // save thiese values to reuse in publish/unpublish events
      this.audioSsrc = authResponse.localAudioSsrc;
      this.videoSsrc = authResponse.localVideoSsrc0;

    },

    /**
     *
     * @param {PCConfiguration} params
     * @private
     */
    _setPcDescriptions:function (params) {
      Log.d('[PC] = Handling streamer answer');
      // Declare vars
      var self = this,
          mgOfferSdp = ManageableSDP.fromString(self.offerSdp);

      params = this._prepareAnswerConfig(params);
      var mgSdp = this._prepareOffer(params, mgOfferSdp);
      mgSdp.flush();
      var adjustedOfferSdp = mgSdp.toRtcSessionDescription();

      Log.d('[PC] = Adjusted offer: ' + adjustedOfferSdp.sdp);

      var onRemoteDescriptionSet = function () {
        Log.d('[PC] = Remote SDP set');
      };

      var onLocalDescriptorSet = function () {
        // we have all required data to create SDP answer in behalf of streamer
        var answerSdp;
        if (self._isUplink()) {
          // use offer SDP as a template for now
          answerSdp = self._prepareUplinkAnswer(params, adjustedOfferSdp);
        } else {
          answerSdp = self._prepareDownlinkAnswer(params, adjustedOfferSdp);
        }
        Log.d('[PC] = Answer created to feed setRemoteDescription: ' +
            answerSdp.sdp);


        self._nativePC.setRemoteDescription(
            answerSdp,
            onRemoteDescriptionSet,
            self._onConnError.bind(self, 'setRemoteDescription'));
      };

      self._nativePC.setLocalDescription(
          adjustedOfferSdp,
          onLocalDescriptorSet,
          self._onConnError.bind(self, 'setLocalDescription'));
    },

    _getLocalAudioTrack:function (streamId, trackId) {
      return this._getMediaTrack('Audio', streamId, trackId);
    },
    _getLocalVideoTrack:function (streamId, trackId) {
      return this._getMediaTrack('Video', streamId, trackId);
    },

    _getLocalMediaTrack:function (mediaType, streamId, trackId) {
      if (streamId === undefined) {
        streamId = 0;
      }
      if (trackId === undefined) {
        trackId = 0;
      }
      return this._nativePC.
          getLocalStreams()[streamId]['get' + mediaType + 'Tracks']()[trackId];
    },

    _prepareAnswerConfig:function (params) {

      var directions = this._getDirections();
      // preparations of params
      params.localMediaDirections = directions.local;
      params.remoteMediaDirections = directions.remote;

      // TODO:
      // enumerate all remote candidates and use 1st fallback (indicated by
      // equal audio and video port)
      var fallbackAudioPort, fallbackVideoPort, address;
      var mgOfferSdp = ManageableSDP.fromString(this.offerSdp);

      params.isBundledMedia = mgOfferSdp.globalAttributes.group !== undefined &&
          mgOfferSdp.globalAttributes.group.indexOf('BUNDLE') !== -1;

      if (!params.isBundledMedia) {
        fallbackAudioPort = this.streamerAudioIceCandidates.port;
        fallbackVideoPort = this.streamerVideoIceCandidates.port;
        address = this.streamerAudioIceCandidates.address;
        //< host is common for all media component candidates
      } else {
        fallbackAudioPort = this.streamerBundleIceCandidates.port;
        fallbackVideoPort = this.streamerBundleIceCandidates.port;
        address = this.streamerBundleIceCandidates.address;
      }

      params.ports = [fallbackAudioPort, fallbackVideoPort];

      //< host is common for all media component candidates
      params.address = address;

      params.candidates = [
        _genIceCandidate(params.address, params.ports[0]),
        _genIceCandidate(params.address, params.ports[1])
      ];

      params.offerSsrc = [params.localAudioSsrc, params.localVideoSsrc0];
      params.answerSsrc = [params.remoteAudioSsrc, params.remoteVideoSsrc0,
        params.remoteScreenSsrc];
      return params;
    },

    _getDirections:function () {
      var
          localDirectionMapFunc,
          remoteDirectionMapFunc,
          directions = {};

      if (this._isUplink()) {
        localDirectionMapFunc = _mediaDirectionSender;
        remoteDirectionMapFunc = _mediaDirectionReceiver;
      } else {
        localDirectionMapFunc = _mediaDirectionReceiver;
        remoteDirectionMapFunc = _mediaDirectionSender;
      }

      // preparations of params
      directions.local = [
        localDirectionMapFunc(this.audioEnabled),
        localDirectionMapFunc(this.videoEnabled || this.screenEnabled)
      ];

      directions.remote =
          [
            remoteDirectionMapFunc(this.audioEnabled),
            remoteDirectionMapFunc(this.videoEnabled || this.screenEnabled)
          ];
      return directions;
    },
    _isUplink:function () {
      return this.connectionType === PeerConnectionType.UPLINK;
    },
    _isDownlink:function () {
      return this.connectionType === PeerConnectionType.DOWNLINK;
    },
    _renegotiateMediaStatus:function () {

      var self = this,
          localSdp = new ManageableSDP(self._nativePC.localDescription),
          directions = this._getDirections();
      // TODO: according to RFC 3264 pt. 8 o=<N>, N must be incremented

      localSdp.mediaSections[0].direction = directions.local[0];
      localSdp.mediaSections[1].direction = directions.local[1];
      if(this._isUplink()) {
        Log.d('Setting max bitrate: ' + this.maxUplinkRate);
        localSdp.mediaSections[1].maxBandwidth = this.maxUplinkRate;
      }
      localSdp.flush();
      Log.d('[PC] = Offer created for media component publish/unpublish: \r\n' +
          localSdp.sdp);

      self._nativePC.setLocalDescription(localSdp.toRtcSessionDescription(),
          function () {
            var remoteSdp = new ManageableSDP(self._nativePC.remoteDescription);
            remoteSdp.mediaSections[0].direction = directions.remote[0];
            remoteSdp.mediaSections[1].direction = directions.remote[1];
            if(self._isUplink()) {
              remoteSdp.mediaSections[1].maxBandwidth = self.maxUplinkRate;
            }
            remoteSdp.flush();

            Log.d('[PC] = Answer created for media component ' +
                'publish/unpublish: ' + remoteSdp.sdp);

            var onRemoteDescriptionSet = function () {
              Log.d('[PC] = Remote SDP has been set for publish/unpublish ' +
                  'operation');
            };

            self._nativePC.setRemoteDescription(
                remoteSdp.toRtcSessionDescription(),
                onRemoteDescriptionSet,
                self._onConnError.bind(self, 'setRemoteDescription'));
          },
          self._onConnError.bind(self, 'setLocalDescription'));
    },

    _makeOffer:function (handler) {
      Log.d('[PC] = Preparing an offer');
      var sdpConstraints = {mandatory:{
        OfferToReceiveAudio:this._isDownlink(),
        OfferToReceiveVideo:this._isDownlink()
      }};

      if (this._isUplink()) {
        this._nativePC.addStream(this.localStream);
      }

//      var self = this;
      var onOffer = function (sdp) {
        Log.d('[PC] = Offer prepared');
        var mgSdp = new ManageableSDP(sdp);
        // use from audio, as we assume bundled connection
        handler(
            {
              iceUfrags:mgSdp.getIceUfrags(),
              icePwds:mgSdp.getIcePwds(),
              cryptoParams:mgSdp.getCryptoParams(),
              cname:mgSdp.getAudioCname()
            },
            JSON.stringify(sdp)
        );
      };

      var onOfferFailed = function (inf) {
        Log.e('[PC] = createOffer failed: ' + inf);
      };

      this._nativePC.createOffer(onOffer, onOfferFailed, sdpConstraints);
    },

    _onConnError:function (funcName, msg) {
      Log.e('[PC] = ' + funcName + ' failed: ' + msg);
      // TODO: disconnect from streamer
    },

    _prepareOffer:function (params, offerSdp) {
      var mgSdp = new ManageableSDP(offerSdp);

      // FIXME: payload numbers must be adjusted (for FF):
      // 111 for opus
      // 100 for VP8

//      mgSdp.mediaSections[0].setCodecByName('opus/48000/2');
      mgSdp.mediaSections[0].setCodecByName('ISAC/16000');

      // Removing FEC and RED video payloads
      mgSdp.mediaSections[1].setCodecByName('VP8/90000');

      mgSdp.mediaSections[1].maxBandwidth = undefined;
//          ADL._STATIC_CONFIG.WebRTC.MAX_VIDEO_BITRATE;
      // explicit IDs to RTP header extensions (AddLive compatibility)

      mgSdp.mediaSections[0].
          extmaps[ManageableSDP.HeaderExtensions.SSRC_AUDIO_LEVEL] =
          RtpExtensionIds.SSRC_AUDIO_LEVEL;
      mgSdp.mediaSections[1].
          extmaps[ManageableSDP.HeaderExtensions.TOFFSET] =
          RtpExtensionIds.TOFFSET;

      // disable Receiver Estimated Maximum Bitrate
      // (http://tools.ietf.org/html/draft-alvestrand-rmcat-remb-02)
      //mgSdp.mediaSections[1].removeGoogleRemb();

      // disable RTCP RTPFB NACK packets
//      mgSdp.mediaSections[1].removeNack();

      var cname = ADL.Utils.randomString(16);

      for (var i = 0; i < mgSdp.mediaSections.length; i++) {
        this._prepareOfferMediaSection(
            mgSdp.mediaSections[i],
            params.offerSsrc[i],
            params.localMediaDirections[i],
            cname);
      }

      // Remove the ext 3
      delete mgSdp.mediaSections[1].extmaps[ManageableSDP.HeaderExtensions.ABS_SEND_TIME];

      return mgSdp;
    },

    _prepareOfferMediaSection:function (mediaSection, ssrc, mediaDirection, cname) {
      // set values from relay
      // 1. unique server-generated SSRCs (uplink only)
      if (mediaSection.SSRCs.length === 1) {
        mediaSection.overwriteSSRC(mediaSection.SSRCs[0], ssrc);
      } else {
        mediaSection.SSRCs.push(ssrc);
        mediaSection.ssrcLabels[ssrc] = {};
      }
      if (mediaSection.ssrcLabels.cname === undefined) {

        // Set CNAME for receive-only (downlink) connection,
        // because it's not set by default on Chrome.
        // FIXME: use proper random-generated value (or use algo from RFC 6222)
        // or get this from streamer (one streamer - one CNAME)
        mediaSection.ssrcLabels[ssrc].cname = cname; //'du4X8c59zH/810bO';
      }

      // 2. RFC 5245 and
      // http://tools.ietf.org/html/draft-ivov-mmusic-trickle-ice-01
      // compatibility
      mediaSection.attributes['ice-options'] = 'trickle';

      mediaSection.crypto = undefined;
      mediaSection.attributes.setup = 'actpass';
      // 3. sendonly for uplink, recvonly for downlinks
      mediaSection.direction = mediaDirection;
      delete mediaSection.extmaps[ManageableSDP.HeaderExtensions.ABS_SEND_TIME];
    },

    _prepareUplinkAnswer:function (params, templateSdp) {
      var mgAnswer = new ManageableSDP(templateSdp);
      this._setStreamerEndpointParams(mgAnswer, params);

      // Required field even if no media to send,
      // see http://tools.ietf.org/html/draft-ietf-mmusic-msid-00
      // Random string ID after WMS is not needed,
      // because we don't send media from streamer over this connection.
      mgAnswer.globalAttributes['msid-semantic'] = 'WMS';
      mgAnswer.globalAttributes.fingerprint = params.fingerprint;

      for (var i = 0; i < mgAnswer.mediaSections.length; i++) {
        // relay side is downlink-only connection
        mgAnswer.mediaSections[i].direction = params.remoteMediaDirections[i];
        // remove SSRC lines from original offer
        // TODO:
        // add streamer SSRCs if necessary (params.answerSsrc has these values)
        mgAnswer.mediaSections[i].ssrcLabels = {};
        delete mgAnswer.mediaSections[i].attributes.fingerprint;
        mgAnswer.mediaSections[i].crypto = undefined;

      }

      mgAnswer.flush();
      return mgAnswer.toRtcSessionDescription();
    },

    /**
     *
     * @param {PCConfiguration}params
     * @param templateSdp
     * @return {*}
     * @private
     */
    _prepareDownlinkAnswer:function (params, templateSdp) {
      var mgAnswer = new ManageableSDP(templateSdp);
      for (var i = 0; i < mgAnswer.mediaSections.length; i++) {
        // SSRC values from remote user's uplink connection
        mgAnswer.mediaSections[i].overwriteSSRC(
            mgAnswer.mediaSections[i].SSRCs[0],
            params.answerSsrc[i]);

        // relay acts on behalf of sending user
        mgAnswer.mediaSections[i].direction = params.remoteMediaDirections[i];

        // sender CNAME
        mgAnswer.mediaSections[i].ssrcLabels[params.answerSsrc[i]].cname =
            params.cname;
      }
//      if(params.screenPublished) {
      mgAnswer.mediaSections[1].SSRCs.push(params.answerSsrc[2]);
      mgAnswer.mediaSections[1].ssrcLabels[params.answerSsrc[2]] = {cname:'du4X8c59zH/810bO'};
      delete mgAnswer.mediaSections[1].extmaps[ManageableSDP.HeaderExtensions.ABS_SEND_TIME];
//      }
      this.recvAudioSsrc = params.answerSsrc[0];
      this.recvVideoSsrc = params.answerSsrc[1];
      this.recvScreenSsrc = params.answerSsrc[2];
      this._setStreamerEndpointParams(mgAnswer, params);
      mgAnswer.overwriteMsidLabels();
      mgAnswer.flush();
      return mgAnswer.toRtcSessionDescription();
    },

    _setStreamerEndpointParams:function (manageableSdp, params) {
      // relay is always answerer:
      manageableSdp.type = 'answer';
      manageableSdp.originator = 'relay 20518 0 IN IP4 ' + params.address;

      // comply to http://tools.ietf.org/html/draft-ivov-mmusic-trickle-ice-01:
      manageableSdp.globalAttributes['end-of-candidates'] = '';
      manageableSdp.globalAttributes['ice-lite'] = '';
      manageableSdp.globalAttributes.fingerprint = params.fingerprint;
      for (var i = 0; i < manageableSdp.mediaSections.length; i++) {
        this._setStreamerEndpointParamsMediaSection(
            manageableSdp.mediaSections[i], params, i);
      }
    },

    _setStreamerEndpointParamsMediaSection:function (mediaSection, params, i) {
      mediaSection.attributes['ice-options'] = 'trickle';
      // the only candidate with public relay's IP and fixed port
      mediaSection.attributes.candidate = params.candidates[i];
      mediaSection.port = params.ports[i];

      // TODO: add 'c' handling to SDP parser
      //mediaSection.attributes['c'] = 'IN IP4 ' + params.address;

      mediaSection.rtcp.addrInfo = 'IN IP4 ' + params.address;
      mediaSection.rtcp.port = params.ports[i];

      // ICE parameters generated on relay side; same values for both a/v for
      // bundled connection:
      mediaSection.attributes['ice-ufrag'] = params.bundleIceCredentials.ufrag;
      mediaSection.attributes['ice-pwd'] = params.bundleIceCredentials.pwd;

      // remove component level fingerprints
      delete mediaSection.attributes.fingerprint;

      // setup attribute is component-level for FF compatibility
      mediaSection.attributes.setup = 'active';
    },

    //noinspection JSUnusedGlobalSymbols
    _onLocalIceCandidate:function (e) {

      var isDownlink = this.connectionType === PeerConnectionType.DOWNLINK;

      // Currently (ICE-LITE server) we don't need to send ICE candidates

      if (e.candidate) {

        var cString = JSON.stringify(e.candidate);
        if (isDownlink) {
          Log.d('[PC] = Got local ICE candidate for downlink connection of ' +
              'user ' + this.remoteUserId + ': ' + cString);
        } else {
          Log.d('[PC] = Got local ICE candidate for uplink connection: ' +
              cString);
        }
      } else {
        Log.d('[PC] = ICE candidates gathering finished for ' +
            this.connectionType +
            (isDownlink ? ('; remote user ID: ' + this.remoteUserId) : ''));
      }
    },

    _onIceConnectionStateChange:function (e) {
      //noinspection JSUnresolvedVariable
      Log.d('[PC] = New ICE state: ' + e.target.iceConnectionState);
      //noinspection JSUnresolvedVariable
      if (e.target.iceConnectionState === 'connected' ||
          e.target.iceConnectionState === 'completed') {
        this._onPCConnected();
      } else {
        Log.d('[PC] = Media connection established for remote user ' +
            this.remoteUserId);
      }
    },

    _onPCConnected:function () {
      this.state = WrtcMediaConnState.CONNECTED;
      var self = this;
      if (this._isDownlink()) {
        this._renegotiateStreamsQueue.forEach(function (req) {
          self.renegotiateEnabledStreams(req.audioPublished, req.videoPublished,
              req.screenPublished);
        });
      }
      this.connResponder.resultAsync();
    },

    //noinspection JSUnusedGlobalSymbols
    _onPeerConnectionStreamAdded:function (e) {
      if (!this.videoStream) {
        this.videoStream = e.stream;
        this.videoSinkId = MediaEngine.RenderCtrl.addSink(e.stream);

      } else {
        this.screenStream = e.stream;
        this.screenSinkId = MediaEngine.RenderCtrl.addSink(e.stream);
        if (this.onRemoteStreamReady) {
          this.onRemoteStreamReady();
        }
      }

    },
    //noinspection JSUnusedGlobalSymbols
    _onPeerConnectionStreamRemoved:function () {
      Log.d('[PC] = PeerConnection Stream Removed for remote user ' +
          this.remoteUserId);
    },

    _onPeerConnectionStateChanged:function (e) {
      Log.d('[PC] = PeerConnection State Changed: ' + JSON.stringify(e));

    },

    _proxy:function (method) {
      //Log.d('[PC] = Creating proxy from this for method: ' + method);
      return ADL.Utils.bind(WrtcMediaConn.prototype[method], this);
    }

  };


  /**
   * TODO rename these
   * @param published
   * @return {String}
   * @private
   */
  function _mediaDirectionSender(published) {
    if (published) {
      return 'sendonly';
    } else {
      return 'inactive';
    }
  }

  /**
   * TODO rename these
   * @param published
   * @return {String}
   * @private
   */
  function _mediaDirectionReceiver(published) {
    if (published) {
      return 'recvonly';
    } else {
      return 'inactive';
    }
  }

  function _genIceCandidate(addr, port) {
    return '0 1 UDP ' + ICE_LITE_PRIO + ' ' + addr + ' ' + port +
        ' typ host';
  }

  function _createIceServer(serverConfig) {
    var iceServer = {
      credential:serverConfig.passwd,
      username:serverConfig.uname
    };
    if (serverConfig.type === TurnTransportType.TLS) {
      iceServer.url = 'turns:';
    } else {
      iceServer.url = 'turn:';
    }
    iceServer.url += serverConfig.host + ':' + serverConfig.port;
    if (serverConfig.type !== TurnTransportType.UDP) {
      iceServer.url += '?transport=tcp';
    }
    return iceServer;
  }

  function _translateAudioStats(stats, prevStats, connType) {
    var translation = {
      totalKbps:0,
      cumulativePacketLoss:0,
      fractionLost:0,
      rtt:0,
      timestamp:0,
      bufferLength:0
    };
    stats.interarrivalJitter = stats.googJitterReceived || 0;
    _translateCommonStats(translation, stats, prevStats, connType);
    return translation;
  }

  function _translateVideoStats(stats, prevStats, connType) {
    var translation = {
      totalKbps:0,
      cumulativePacketLoss:0,
      fractionLost:0,
      rtt:0,
      timestamp:0,
      cpu:0,
      totalCpu:0,
      fps:0,
      processingTime:0,
      psnr:0,
      qdl:0,
      avOffset:0
    };
    _translateCommonStats(translation, stats, prevStats, connType);
    translation.fps =
        stats.googFrameRateSent ||
            stats.mozFrameRateSent ||
            0;
    translation.frameWidth =
        stats.googFrameWidthSent ||
            stats.mozFrameWidthSent ||
            0;
    translation.frameHeight =
        stats.googFrameHeightSent ||
            stats.mozFrameHeightSent ||
            0;
    return translation;
  }

  function _translateCommonStats(translation, stats, prevStats, connType) {
    if (connType === PeerConnectionType.UPLINK) {
      translation.rtt = parseInt(stats.googRtt || stats.mozRtt || 0, 10);
      if (prevStats) {
        translation.totalKbps =
          // the bits sent in the time frame
            8 * ((stats.bytesSent - prevStats.bytesSent) /
              // divided by the time frame - in seconds
                ((stats.timestamp - prevStats.timestamp) / 1000)) /
              // and 1024 to get kbps
                1024;
      }
    } else {
      translation.cumulativePacketLoss = stats.packetsLost;
      if (prevStats) {
        translation.totalKbps =
          // the bits sent in the time frame
            8 * ((stats.bytesReceived - prevStats.bytesReceived) /
              // divided by the time frame - in seconds
                ((stats.timestamp - prevStats.timestamp) / 1000)) /
              // and 1024 to get kbps
                1024;
      }
    }
  }

  // Exports
  MediaEngine.WrtcMediaConn = WrtcMediaConn;
  MediaEngine.PeerConnectionType = PeerConnectionType;

}(window));
/**
 * Copyright (C) SayMama Ltd 2012
 *
 * All rights reserved. Any use, copying, modification, distribution and selling
 * of this software and it's documentation for any purposes without authors'
 * written permission is hereby prohibited.
 */
/**
 * @fileoverview
 * @TODO file description
 *
 * @author Tadeusz Kozak
 * @date 09-07-2012 14:34
 */

(function () {
  'use strict';

  /**
   * Release level of this SDK. May be one of 'stable', 'beta', 'dev'
   *
   * @summary Release level of this SDK instance.
   * @since 1.16.1.0
   * @type {String}
   */
  ADL.RELEASE_LEVEL = 'stable';

  /**
   * Version of the JavaScript bindings.
   * @summary Version of the JavaScript bindings.
   * @since 1.17.0
   * @type {String}
   */
  ADL.VERSION = '3.1.12';

  ADL._PLUGIN_UPDATE_ROOT = {
    win:'https://d36pfzlm4aixmv.cloudfront.net/releases/Release/3.0.1.26/',
    mac:'https://d36pfzlm4aixmv.cloudfront.net/releases/Release/3.0.1.26/',
    mac_106:'https://d36pfzlm4aixmv.cloudfront.net/releases_OSX_105/Release/3.0.1.26/'
  };

  ADL._PLUGIN_INSTALL_ROOT = {
    win:'https://d36pfzlm4aixmv.cloudfront.net/releases/Release/3.0.1.26/',
    mac:'https://d36pfzlm4aixmv.cloudfront.net/releases/Release/3.0.1.26/',
    mac_106:'https://d36pfzlm4aixmv.cloudfront.net/releases_OSX_105/Release/3.0.1.26/'
  };


  ADL._BUG_REPORTING_ENDPOINT = 'https://cnc2.addlive.com/reliability/';

  ADL._LOGS_REPORTING_ENDPOINT = '//cnc3.addlive.com/user_logs.store';

  ADL._STREAMER_ENDPOINT_RESOLVER = 'https://cnc.addlive.com/resolve_streamer.do|https://cnc2.addlive.com/resolve_streamer.do|https://cnc3.addlive.com/resolve_streamer.do';

  ADL._TRACKING_ENDPOINT = '//cnc2.addlive.com/tracker.gif';

})();