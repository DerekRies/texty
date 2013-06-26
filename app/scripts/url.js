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

  function convertCamelCaseToDashes (camelCase) {
    return camelCase.replace(/[A-Z]/mg, function (match) {
      return '-' + match.toLowerCase()
    });
  }

  function init () {
    setupDefaultParams();
    for (var i = 0, l = urlParams.length ; i < l ; i++) {
      pair = urlParams[i].split('='),
      key = pair[0].toLowerCase(),
      value = decodeURIComponent(pair[1]);

      if (key in defaultParams.cssAttrs) {
        defaultParams.cssAttrs[key] = value;
      }
      else if (key in defaultParams) {
        defaultParams[key] = value;
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

  init();

  return defaultParams;

});