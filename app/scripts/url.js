define(function () {
  'use strict';

  var urlArray = window.location.toString().split("?");
  var urlString = urlArray[1] || '';
  if(urlString.charAt(urlString.length - 1) === '/') {
    urlString = urlString.substring(0, urlString.length - 1);
  }
  var urlParams = urlString.split("&");
  var pair, key, value;

  var defaultParams = {
    text: '',
    cssAttrs: {},
    bigtext: true,
    background: 'white',
    class: ''
  };

  defaultParams['google-font'] = false;

  var escapeMap = {
    '&': '&amp;',
    '"': '&quot;',
    "'": '&#39;',
    "<": '&lt;',
    ">": '&gt;'
  };

  function convertCamelCaseToDashes (camelCase) {
    return camelCase.replace(/[A-Z]/mg, function (match) {
      return '-' + match.toLowerCase()
    });
  }

  function lookupEscape (ch) {
    return escapeMap[ch];
  }

  function sanitize (unsafeText) {
    // unsafeText = escape(unsafeText);
    return unsafeText.replace(/[&"'<>]/g, lookupEscape);
  }

  function init () {
    setupDefaultParams();
    for (var i = 0, l = urlParams.length ; i < l ; i++) {
      pair = urlParams[i].split('='),
      key = pair[0].toLowerCase(),
      value = pair[1];
      value = sanitize(decodeURIComponent(value));

      console.log(value);

      if (key in defaultParams.cssAttrs) {
        defaultParams.cssAttrs[key] = value;
      }
      else if (key in defaultParams) {
        defaultParams[key] = value;
      }

      if (key === 'google-font') {
        loadGoogleFont(value);
      }
      // console.log(key, value);
    }
  }

  function setupDefaultParams () {
    var throwAwayElement = document.createElement('div');
    for(var style in throwAwayElement.style){
      if (style !== 'background') {
        defaultParams.cssAttrs[convertCamelCaseToDashes(style)] = null;
      }
    }
  }

  function loadGoogleFont (googleFont) {

    window.WebFontConfig = {
      google: { families: [ googleFont ] }
    };

    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  }

  init();

  return defaultParams;

});