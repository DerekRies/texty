!function(a){a.fn.fitText=function(b,c){var d=b||1,e=a.extend({minFontSize:Number.NEGATIVE_INFINITY,maxFontSize:Number.POSITIVE_INFINITY},c);return this.each(function(){var b=a(this),c=function(){b.css("font-size",Math.max(Math.min(b.width()/(10*d),parseFloat(e.maxFontSize)),parseFloat(e.minFontSize)))};c(),a(window).on("resize.fittext orientationchange.fittext",c)})}}(jQuery),function(){define("url",[],function(){"use strict";function a(a){return a.replace(/[A-Z]/gm,function(a){return"-"+a.toLowerCase()})}function b(){c();for(var a=0,b=i.length;b>a;a++)f=i[a].split("="),g=f[0].toLowerCase(),h=decodeURIComponent(f[1]),g in j.cssAttrs?j.cssAttrs[g]=h:g in j&&(j[g]=h)}function c(){var b=document.createElement("div");for(var c in b.style)"background"!==c&&(j.cssAttrs[a(c)]=null)}var d=window.location.toString().split("?"),e=d[1]||"";"/"===e.charAt(e.length-1)&&(e=e.substring(0,e.length-1));var f,g,h,i=e.split("&"),j={text:"",cssAttrs:{},bigtext:!0,background:"white","class":""};return b(),j}),define("app",["url"],function(a){"use strict";function b(a,b){return b(a.length)}function c(a){return Math.max(a/50,1)}function d(){f.css({background:a.background}),g.addClass(a.class),g.css(a.cssAttrs)}function e(){a.bigtext===!0&&g.fitText(h,{maxFontSize:"300px"})}console.log(a);var f=$("#texty-block"),g=f.find("h1"),h=1;return g.html(a.text),h=b(a.text,c),d(),e(),g.css({"margin-top":g.height()/-2}),{}}),require.config({}),require(["app"],function(){"use strict"}),define("main",function(){})}();