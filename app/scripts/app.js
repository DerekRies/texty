/*global define */
define(['url'], function (url) {
  'use strict';

  function calculateSizeModifier (text, growthFn) {
    return growthFn(text.length);
  }

  function linear (n) {
    return Math.max( n * 0.013, 1);
  }

  function logit (n) {

  }

  function quadratic (n) {
    return Math.max( n * n * .00028, 1);
  }

  function logistic (n) {
    var mod = 1;
    if(n < 30) {
      n = 0;
      mod = 0;
    }
    console.log(1 * mod + (1 / (1 + Math.pow(Math.E, -n * .1))));
    return Math.max(1 * mod + (1 / (1 + Math.pow(Math.E, -n * .1))), 1);
  }

  function cubic (n) {
    return Math.max( Math.pow(n* .013, 2) , 1);
  }

  function exponential (n) {
    return Math.max( Math.pow(n* .013,n* .013) , 1);
  }

  function styleElement () {
    texty.css({'background': url.background})
    header.addClass(url.class);
    header.css(url.cssAttrs);
  }

  function fitText () {
    if (url.bigtext === true) {
      header.fitText(sizeModifier, {maxFontSize: '300px'});
    }
  }

  function convertPlusesToSpaces (text) {
    return text.replace(/\+/g, ' ');
  }

  console.log(url);

  var texty = $('#texty-block');
  var header = texty.find('h1');
  var sizeModifier = 1;
  header.html(url.text);
  sizeModifier = calculateSizeModifier(url.text, linear);
  styleElement();
  fitText();
  console.log(url['google-font']);
  header.css({
    'margin-top': header.height() / -2
  });

  if (url['google-font'] !== false) {
    header.css({
      'font-family': convertPlusesToSpaces(url['google-font'])
    });
  }

  return {};
});