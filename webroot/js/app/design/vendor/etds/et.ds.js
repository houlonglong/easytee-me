/* jQuery-FontSpy.js v3.0.0
 * https://github.com/patrickmarabeas/jQuery-FontSpy.js
 *
 * Copyright 2013, Patrick Marabeas http://pulse-dev.com
 * Released under the MIT license
 * http://opensource.org/licenses/mit-license.php
 *
 * Date: 02/11/2015
 */

(function( w, $ ) {

  fontSpy = function  ( fontName, conf ) {
    var $html = $('html'),
        $body = $('body'),
        fontFamilyName = fontName;

        // Throw error if fontName is not a string or not is left as an empty string
        if (typeof fontFamilyName !== 'string' || fontFamilyName === '') {
          throw 'A valid fontName is required. fontName must be a string and must not be an empty string.';
        }

    var defaults = {
        font: fontFamilyName,
        fontClass: fontFamilyName.toLowerCase().replace( /\s/g, '' ),
        success: function() {},
        failure: function() {},
        testFont: 'Courier New',
        testString: 'QW@HhsXJ',
        glyphs: '',
        delay: 50,
        timeOut: 1000,
        callback: $.noop
    };

    var config = $.extend( defaults, conf );

    var $tester = $('<span>' + config.testString+config.glyphs + '</span>')
        .css('position', 'absolute')
        .css('top', '-9999px')
        .css('left', '-9999px')
        .css('visibility', 'hidden')
        .css('fontFamily', config.testFont)
        .css('fontSize', '250px');

    $body.append($tester);

    var fallbackFontWidth = $tester.outerWidth();

    $tester.css('fontFamily', config.font + ',' + config.testFont);

    var failure = function () {
      $html.addClass("no-"+config.fontClass);
      if( config && config.failure ) {
        config.failure();
      }
      config.callback(new Error('FontSpy timeout'));
      $tester.remove();
    };

    var success = function () {
      config.callback();
      $html.addClass(config.fontClass);
      if( config && config.success ) {
        config.success();
      }
      $tester.remove();
    };

    var retry = function () {
      setTimeout(checkFont, config.delay);
      config.timeOut = config.timeOut - config.delay;
    };

    var checkFont = function () {
      var loadedFontWidth = $tester.outerWidth();

      if (fallbackFontWidth !== loadedFontWidth){
        success();
      } else if(config.timeOut < 0) {
        failure();
      } else {
        retry();
      }
    }

    checkFont();
    }
  })( this, jQuery );

// Snap.svg 0.4.1
//
// Copyright (c) 2013 – 2015 Adobe Systems Incorporated. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// build: 2015-04-13

!function(a){var b,c,d="0.4.2",e="hasOwnProperty",f=/[\.\/]/,g=/\s*,\s*/,h="*",i=function(a,b){return a-b},j={n:{}},k=function(){for(var a=0,b=this.length;b>a;a++)if("undefined"!=typeof this[a])return this[a]},l=function(){for(var a=this.length;--a;)if("undefined"!=typeof this[a])return this[a]},m=function(a,d){a=String(a);var e,f=c,g=Array.prototype.slice.call(arguments,2),h=m.listeners(a),j=0,n=[],o={},p=[],q=b;p.firstDefined=k,p.lastDefined=l,b=a,c=0;for(var r=0,s=h.length;s>r;r++)"zIndex"in h[r]&&(n.push(h[r].zIndex),h[r].zIndex<0&&(o[h[r].zIndex]=h[r]));for(n.sort(i);n[j]<0;)if(e=o[n[j++]],p.push(e.apply(d,g)),c)return c=f,p;for(r=0;s>r;r++)if(e=h[r],"zIndex"in e)if(e.zIndex==n[j]){if(p.push(e.apply(d,g)),c)break;do if(j++,e=o[n[j]],e&&p.push(e.apply(d,g)),c)break;while(e)}else o[e.zIndex]=e;else if(p.push(e.apply(d,g)),c)break;return c=f,b=q,p};m._events=j,m.listeners=function(a){var b,c,d,e,g,i,k,l,m=a.split(f),n=j,o=[n],p=[];for(e=0,g=m.length;g>e;e++){for(l=[],i=0,k=o.length;k>i;i++)for(n=o[i].n,c=[n[m[e]],n[h]],d=2;d--;)b=c[d],b&&(l.push(b),p=p.concat(b.f||[]));o=l}return p},m.on=function(a,b){if(a=String(a),"function"!=typeof b)return function(){};for(var c=a.split(g),d=0,e=c.length;e>d;d++)!function(a){for(var c,d=a.split(f),e=j,g=0,h=d.length;h>g;g++)e=e.n,e=e.hasOwnProperty(d[g])&&e[d[g]]||(e[d[g]]={n:{}});for(e.f=e.f||[],g=0,h=e.f.length;h>g;g++)if(e.f[g]==b){c=!0;break}!c&&e.f.push(b)}(c[d]);return function(a){+a==+a&&(b.zIndex=+a)}},m.f=function(a){var b=[].slice.call(arguments,1);return function(){m.apply(null,[a,null].concat(b).concat([].slice.call(arguments,0)))}},m.stop=function(){c=1},m.nt=function(a){return a?new RegExp("(?:\\.|\\/|^)"+a+"(?:\\.|\\/|$)").test(b):b},m.nts=function(){return b.split(f)},m.off=m.unbind=function(a,b){if(!a)return void(m._events=j={n:{}});var c=a.split(g);if(c.length>1)for(var d=0,i=c.length;i>d;d++)m.off(c[d],b);else{c=a.split(f);var k,l,n,d,i,o,p,q=[j];for(d=0,i=c.length;i>d;d++)for(o=0;o<q.length;o+=n.length-2){if(n=[o,1],k=q[o].n,c[d]!=h)k[c[d]]&&n.push(k[c[d]]);else for(l in k)k[e](l)&&n.push(k[l]);q.splice.apply(q,n)}for(d=0,i=q.length;i>d;d++)for(k=q[d];k.n;){if(b){if(k.f){for(o=0,p=k.f.length;p>o;o++)if(k.f[o]==b){k.f.splice(o,1);break}!k.f.length&&delete k.f}for(l in k.n)if(k.n[e](l)&&k.n[l].f){var r=k.n[l].f;for(o=0,p=r.length;p>o;o++)if(r[o]==b){r.splice(o,1);break}!r.length&&delete k.n[l].f}}else{delete k.f;for(l in k.n)k.n[e](l)&&k.n[l].f&&delete k.n[l].f}k=k.n}}},m.once=function(a,b){var c=function(){return m.unbind(a,c),b.apply(this,arguments)};return m.on(a,c)},m.version=d,m.toString=function(){return"You are running Eve "+d},"undefined"!=typeof module&&module.exports?module.exports=m:"function"==typeof define&&define.amd?define("eve",[],function(){return m}):a.eve=m}(this),function(a,b){if("function"==typeof define&&define.amd)define(["eve"],function(c){return b(a,c)});else if("undefined"!=typeof exports){var c=require("eve");module.exports=b(a,c)}else b(a,a.eve)}(window||this,function(a,b){var c=function(b){var c={},d=a.requestAnimationFrame||a.webkitRequestAnimationFrame||a.mozRequestAnimationFrame||a.oRequestAnimationFrame||a.msRequestAnimationFrame||function(a){setTimeout(a,16)},e=Array.isArray||function(a){return a instanceof Array||"[object Array]"==Object.prototype.toString.call(a)},f=0,g="M"+(+new Date).toString(36),h=function(){return g+(f++).toString(36)},i=Date.now||function(){return+new Date},j=function(a){var b=this;if(null==a)return b.s;var c=b.s-a;b.b+=b.dur*c,b.B+=b.dur*c,b.s=a},k=function(a){var b=this;return null==a?b.spd:void(b.spd=a)},l=function(a){var b=this;return null==a?b.dur:(b.s=b.s*a/b.dur,void(b.dur=a))},m=function(){var a=this;delete c[a.id],a.update(),b("mina.stop."+a.id,a)},n=function(){var a=this;a.pdif||(delete c[a.id],a.update(),a.pdif=a.get()-a.b)},o=function(){var a=this;a.pdif&&(a.b=a.get()-a.pdif,delete a.pdif,c[a.id]=a)},p=function(){var a,b=this;if(e(b.start)){a=[];for(var c=0,d=b.start.length;d>c;c++)a[c]=+b.start[c]+(b.end[c]-b.start[c])*b.easing(b.s)}else a=+b.start+(b.end-b.start)*b.easing(b.s);b.set(a)},q=function(){var a=0;for(var e in c)if(c.hasOwnProperty(e)){var f=c[e],g=f.get();a++,f.s=(g-f.b)/(f.dur/f.spd),f.s>=1&&(delete c[e],f.s=1,a--,function(a){setTimeout(function(){b("mina.finish."+a.id,a)})}(f)),f.update()}a&&d(q)},r=function(a,b,e,f,g,i,s){var t={id:h(),start:a,end:b,b:e,s:0,dur:f-e,spd:1,get:g,set:i,easing:s||r.linear,status:j,speed:k,duration:l,stop:m,pause:n,resume:o,update:p};c[t.id]=t;var u,v=0;for(u in c)if(c.hasOwnProperty(u)&&(v++,2==v))break;return 1==v&&d(q),t};return r.time=i,r.getById=function(a){return c[a]||null},r.linear=function(a){return a},r.easeout=function(a){return Math.pow(a,1.7)},r.easein=function(a){return Math.pow(a,.48)},r.easeinout=function(a){if(1==a)return 1;if(0==a)return 0;var b=.48-a/1.04,c=Math.sqrt(.1734+b*b),d=c-b,e=Math.pow(Math.abs(d),1/3)*(0>d?-1:1),f=-c-b,g=Math.pow(Math.abs(f),1/3)*(0>f?-1:1),h=e+g+.5;return 3*(1-h)*h*h+h*h*h},r.backin=function(a){if(1==a)return 1;var b=1.70158;return a*a*((b+1)*a-b)},r.backout=function(a){if(0==a)return 0;a-=1;var b=1.70158;return a*a*((b+1)*a+b)+1},r.elastic=function(a){return a==!!a?a:Math.pow(2,-10*a)*Math.sin(2*(a-.075)*Math.PI/.3)+1},r.bounce=function(a){var b,c=7.5625,d=2.75;return 1/d>a?b=c*a*a:2/d>a?(a-=1.5/d,b=c*a*a+.75):2.5/d>a?(a-=2.25/d,b=c*a*a+.9375):(a-=2.625/d,b=c*a*a+.984375),b},a.mina=r,r}("undefined"==typeof b?function(){}:b),d=function(a){function c(a,b){if(a){if(a.nodeType)return w(a);if(e(a,"array")&&c.set)return c.set.apply(c,a);if(a instanceof s)return a;if(null==b)return a=y.doc.querySelector(String(a)),w(a)}return a=null==a?"100%":a,b=null==b?"100%":b,new v(a,b)}function d(a,b){if(b){if("#text"==a&&(a=y.doc.createTextNode(b.text||b["#text"]||"")),"#comment"==a&&(a=y.doc.createComment(b.text||b["#text"]||"")),"string"==typeof a&&(a=d(a)),"string"==typeof b)return 1==a.nodeType?"xlink:"==b.substring(0,6)?a.getAttributeNS(T,b.substring(6)):"xml:"==b.substring(0,4)?a.getAttributeNS(U,b.substring(4)):a.getAttribute(b):"text"==b?a.nodeValue:null;if(1==a.nodeType){for(var c in b)if(b[z](c)){var e=A(b[c]);e?"xlink:"==c.substring(0,6)?a.setAttributeNS(T,c.substring(6),e):"xml:"==c.substring(0,4)?a.setAttributeNS(U,c.substring(4),e):a.setAttribute(c,e):a.removeAttribute(c)}}else"text"in b&&(a.nodeValue=b.text)}else a=y.doc.createElementNS(U,a);return a}function e(a,b){return b=A.prototype.toLowerCase.call(b),"finite"==b?isFinite(a):"array"==b&&(a instanceof Array||Array.isArray&&Array.isArray(a))?!0:"null"==b&&null===a||b==typeof a&&null!==a||"object"==b&&a===Object(a)||J.call(a).slice(8,-1).toLowerCase()==b}function f(a){if("function"==typeof a||Object(a)!==a)return a;var b=new a.constructor;for(var c in a)a[z](c)&&(b[c]=f(a[c]));return b}function h(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return a.push(a.splice(c,1)[0])}function i(a,b,c){function d(){var e=Array.prototype.slice.call(arguments,0),f=e.join("␀"),g=d.cache=d.cache||{},i=d.count=d.count||[];return g[z](f)?(h(i,f),c?c(g[f]):g[f]):(i.length>=1e3&&delete g[i.shift()],i.push(f),g[f]=a.apply(b,e),c?c(g[f]):g[f])}return d}function j(a,b,c,d,e,f){if(null==e){var g=a-c,h=b-d;return g||h?(180+180*D.atan2(-h,-g)/H+360)%360:0}return j(a,b,e,f)-j(c,d,e,f)}function k(a){return a%360*H/180}function l(a){return 180*a/H%360}function m(a){var b=[];return a=a.replace(/(?:^|\s)(\w+)\(([^)]+)\)/g,function(a,c,d){return d=d.split(/\s*,\s*|\s+/),"rotate"==c&&1==d.length&&d.push(0,0),"scale"==c&&(d.length>2?d=d.slice(0,2):2==d.length&&d.push(0,0),1==d.length&&d.push(d[0],0,0)),b.push("skewX"==c?["m",1,0,D.tan(k(d[0])),1,0,0]:"skewY"==c?["m",1,D.tan(k(d[0])),0,1,0,0]:[c.charAt(0)].concat(d)),a}),b}function n(a,b){var d=ab(a),e=new c.Matrix;if(d)for(var f=0,g=d.length;g>f;f++){var h,i,j,k,l,m=d[f],n=m.length,o=A(m[0]).toLowerCase(),p=m[0]!=o,q=p?e.invert():0;"t"==o&&2==n?e.translate(m[1],0):"t"==o&&3==n?p?(h=q.x(0,0),i=q.y(0,0),j=q.x(m[1],m[2]),k=q.y(m[1],m[2]),e.translate(j-h,k-i)):e.translate(m[1],m[2]):"r"==o?2==n?(l=l||b,e.rotate(m[1],l.x+l.width/2,l.y+l.height/2)):4==n&&(p?(j=q.x(m[2],m[3]),k=q.y(m[2],m[3]),e.rotate(m[1],j,k)):e.rotate(m[1],m[2],m[3])):"s"==o?2==n||3==n?(l=l||b,e.scale(m[1],m[n-1],l.x+l.width/2,l.y+l.height/2)):4==n?p?(j=q.x(m[2],m[3]),k=q.y(m[2],m[3]),e.scale(m[1],m[1],j,k)):e.scale(m[1],m[1],m[2],m[3]):5==n&&(p?(j=q.x(m[3],m[4]),k=q.y(m[3],m[4]),e.scale(m[1],m[2],j,k)):e.scale(m[1],m[2],m[3],m[4])):"m"==o&&7==n&&e.add(m[1],m[2],m[3],m[4],m[5],m[6])}return e}function o(a){var b=a.node.ownerSVGElement&&w(a.node.ownerSVGElement)||a.node.parentNode&&w(a.node.parentNode)||c.select("svg")||c(0,0),d=b.select("defs"),e=null==d?!1:d.node;return e||(e=u("defs",b.node).node),e}function p(a){return a.node.ownerSVGElement&&w(a.node.ownerSVGElement)||c.select("svg")}function q(a,b,c){function e(a){if(null==a)return I;if(a==+a)return a;d(j,{width:a});try{return j.getBBox().width}catch(b){return 0}}function f(a){if(null==a)return I;if(a==+a)return a;d(j,{height:a});try{return j.getBBox().height}catch(b){return 0}}function g(d,e){null==b?i[d]=e(a.attr(d)||0):d==b&&(i=e(null==c?a.attr(d)||0:c))}var h=p(a).node,i={},j=h.querySelector(".svg---mgr");switch(j||(j=d("rect"),d(j,{x:-9e9,y:-9e9,width:10,height:10,"class":"svg---mgr",fill:"none"}),h.appendChild(j)),a.type){case"rect":g("rx",e),g("ry",f);case"image":g("width",e),g("height",f);case"text":g("x",e),g("y",f);break;case"circle":g("cx",e),g("cy",f),g("r",e);break;case"ellipse":g("cx",e),g("cy",f),g("rx",e),g("ry",f);break;case"line":g("x1",e),g("x2",e),g("y1",f),g("y2",f);break;case"marker":g("refX",e),g("markerWidth",e),g("refY",f),g("markerHeight",f);break;case"radialGradient":g("fx",e),g("fy",f);break;case"tspan":g("dx",e),g("dy",f);break;default:g(b,e)}return h.removeChild(j),i}function r(a){e(a,"array")||(a=Array.prototype.slice.call(arguments,0));for(var b=0,c=0,d=this.node;this[b];)delete this[b++];for(b=0;b<a.length;b++)"set"==a[b].type?a[b].forEach(function(a){d.appendChild(a.node)}):d.appendChild(a[b].node);var f=d.childNodes;for(b=0;b<f.length;b++)this[c++]=w(f[b]);return this}function s(a){if(a.snap in V)return V[a.snap];var b;try{b=a.ownerSVGElement}catch(c){}this.node=a,b&&(this.paper=new v(b)),this.type=a.tagName||a.nodeName;var d=this.id=S(this);if(this.anims={},this._={transform:[]},a.snap=d,V[d]=this,"g"==this.type&&(this.add=r),this.type in{g:1,mask:1,pattern:1,symbol:1})for(var e in v.prototype)v.prototype[z](e)&&(this[e]=v.prototype[e])}function t(a){this.node=a}function u(a,b){var c=d(a);b.appendChild(c);var e=w(c);return e}function v(a,b){var c,e,f,g=v.prototype;if(a&&"svg"==a.tagName){if(a.snap in V)return V[a.snap];var h=a.ownerDocument;c=new s(a),e=a.getElementsByTagName("desc")[0],f=a.getElementsByTagName("defs")[0],e||(e=d("desc"),e.appendChild(h.createTextNode("Created with Snap")),c.node.appendChild(e)),f||(f=d("defs"),c.node.appendChild(f)),c.defs=f;for(var i in g)g[z](i)&&(c[i]=g[i]);c.paper=c.root=c}else c=u("svg",y.doc.body),d(c.node,{height:b,version:1.1,width:a,xmlns:U});return c}function w(a){return a?a instanceof s||a instanceof t?a:a.tagName&&"svg"==a.tagName.toLowerCase()?new v(a):a.tagName&&"object"==a.tagName.toLowerCase()&&"image/svg+xml"==a.type?new v(a.contentDocument.getElementsByTagName("svg")[0]):new s(a):a}function x(a,b){for(var c=0,d=a.length;d>c;c++){var e={type:a[c].type,attr:a[c].attr()},f=a[c].children();b.push(e),f.length&&x(f,e.childNodes=[])}}c.version="0.4.0",c.toString=function(){return"Snap v"+this.version},c._={};var y={win:a.window,doc:a.window.document};c._.glob=y;{var z="hasOwnProperty",A=String,B=parseFloat,C=parseInt,D=Math,E=D.max,F=D.min,G=D.abs,H=(D.pow,D.PI),I=(D.round,""),J=Object.prototype.toString,K=/^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?%?)\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?%?)\s*\))\s*$/i,L=(c._.separator=/[,\s]+/,/[\s]*,[\s]*/),M={hs:1,rg:1},N=/([a-z])[\s,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\s]*,?[\s]*)+)/gi,O=/([rstm])[\s,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\s]*,?[\s]*)+)/gi,P=/(-?\d*\.?\d*(?:e[\-+]?\\d+)?)[\s]*,?[\s]*/gi,Q=0,R="S"+(+new Date).toString(36),S=function(a){return(a&&a.type?a.type:I)+R+(Q++).toString(36)},T="http://www.w3.org/1999/xlink",U="http://www.w3.org/2000/svg",V={};c.url=function(a){return"url('#"+a+"')"}}c._.$=d,c._.id=S,c.format=function(){var a=/\{([^\}]+)\}/g,b=/(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g,c=function(a,c,d){var e=d;return c.replace(b,function(a,b,c,d,f){b=b||d,e&&(b in e&&(e=e[b]),"function"==typeof e&&f&&(e=e()))}),e=(null==e||e==d?a:e)+""};return function(b,d){return A(b).replace(a,function(a,b){return c(a,b,d)})}}(),c._.clone=f,c._.cacher=i,c.rad=k,c.deg=l,c.sin=function(a){return D.sin(c.rad(a))},c.tan=function(a){return D.tan(c.rad(a))},c.cos=function(a){return D.cos(c.rad(a))},c.asin=function(a){return c.deg(D.asin(a))},c.acos=function(a){return c.deg(D.acos(a))},c.atan=function(a){return c.deg(D.atan(a))},c.atan2=function(a){return c.deg(D.atan2(a))},c.angle=j,c.len=function(a,b,d,e){return Math.sqrt(c.len2(a,b,d,e))},c.len2=function(a,b,c,d){return(a-c)*(a-c)+(b-d)*(b-d)},c.closestPoint=function(a,b,c){function d(a){var d=a.x-b,e=a.y-c;return d*d+e*e}for(var e,f,g,h,i=a.node,j=i.getTotalLength(),k=j/i.pathSegList.numberOfItems*.125,l=1/0,m=0;j>=m;m+=k)(h=d(g=i.getPointAtLength(m)))<l&&(e=g,f=m,l=h);for(k*=.5;k>.5;){var n,o,p,q,r,s;(p=f-k)>=0&&(r=d(n=i.getPointAtLength(p)))<l?(e=n,f=p,l=r):(q=f+k)<=j&&(s=d(o=i.getPointAtLength(q)))<l?(e=o,f=q,l=s):k*=.5}return e={x:e.x,y:e.y,length:f,distance:Math.sqrt(l)}},c.is=e,c.snapTo=function(a,b,c){if(c=e(c,"finite")?c:10,e(a,"array")){for(var d=a.length;d--;)if(G(a[d]-b)<=c)return a[d]}else{a=+a;var f=b%a;if(c>f)return b-f;if(f>a-c)return b-f+a}return b},c.getRGB=i(function(a){if(!a||(a=A(a)).indexOf("-")+1)return{r:-1,g:-1,b:-1,hex:"none",error:1,toString:Z};if("none"==a)return{r:-1,g:-1,b:-1,hex:"none",toString:Z};if(!(M[z](a.toLowerCase().substring(0,2))||"#"==a.charAt())&&(a=W(a)),!a)return{r:-1,g:-1,b:-1,hex:"none",error:1,toString:Z};var b,d,f,g,h,i,j=a.match(K);return j?(j[2]&&(f=C(j[2].substring(5),16),d=C(j[2].substring(3,5),16),b=C(j[2].substring(1,3),16)),j[3]&&(f=C((h=j[3].charAt(3))+h,16),d=C((h=j[3].charAt(2))+h,16),b=C((h=j[3].charAt(1))+h,16)),j[4]&&(i=j[4].split(L),b=B(i[0]),"%"==i[0].slice(-1)&&(b*=2.55),d=B(i[1]),"%"==i[1].slice(-1)&&(d*=2.55),f=B(i[2]),"%"==i[2].slice(-1)&&(f*=2.55),"rgba"==j[1].toLowerCase().slice(0,4)&&(g=B(i[3])),i[3]&&"%"==i[3].slice(-1)&&(g/=100)),j[5]?(i=j[5].split(L),b=B(i[0]),"%"==i[0].slice(-1)&&(b/=100),d=B(i[1]),"%"==i[1].slice(-1)&&(d/=100),f=B(i[2]),"%"==i[2].slice(-1)&&(f/=100),("deg"==i[0].slice(-3)||"°"==i[0].slice(-1))&&(b/=360),"hsba"==j[1].toLowerCase().slice(0,4)&&(g=B(i[3])),i[3]&&"%"==i[3].slice(-1)&&(g/=100),c.hsb2rgb(b,d,f,g)):j[6]?(i=j[6].split(L),b=B(i[0]),"%"==i[0].slice(-1)&&(b/=100),d=B(i[1]),"%"==i[1].slice(-1)&&(d/=100),f=B(i[2]),"%"==i[2].slice(-1)&&(f/=100),("deg"==i[0].slice(-3)||"°"==i[0].slice(-1))&&(b/=360),"hsla"==j[1].toLowerCase().slice(0,4)&&(g=B(i[3])),i[3]&&"%"==i[3].slice(-1)&&(g/=100),c.hsl2rgb(b,d,f,g)):(b=F(D.round(b),255),d=F(D.round(d),255),f=F(D.round(f),255),g=F(E(g,0),1),j={r:b,g:d,b:f,toString:Z},j.hex="#"+(16777216|f|d<<8|b<<16).toString(16).slice(1),j.opacity=e(g,"finite")?g:1,j)):{r:-1,g:-1,b:-1,hex:"none",error:1,toString:Z}},c),c.hsb=i(function(a,b,d){return c.hsb2rgb(a,b,d).hex}),c.hsl=i(function(a,b,d){return c.hsl2rgb(a,b,d).hex}),c.rgb=i(function(a,b,c,d){if(e(d,"finite")){var f=D.round;return"rgba("+[f(a),f(b),f(c),+d.toFixed(2)]+")"}return"#"+(16777216|c|b<<8|a<<16).toString(16).slice(1)});var W=function(a){var b=y.doc.getElementsByTagName("head")[0]||y.doc.getElementsByTagName("svg")[0],c="rgb(255, 0, 0)";return(W=i(function(a){if("red"==a.toLowerCase())return c;b.style.color=c,b.style.color=a;var d=y.doc.defaultView.getComputedStyle(b,I).getPropertyValue("color");return d==c?null:d}))(a)},X=function(){return"hsb("+[this.h,this.s,this.b]+")"},Y=function(){return"hsl("+[this.h,this.s,this.l]+")"},Z=function(){return 1==this.opacity||null==this.opacity?this.hex:"rgba("+[this.r,this.g,this.b,this.opacity]+")"},$=function(a,b,d){if(null==b&&e(a,"object")&&"r"in a&&"g"in a&&"b"in a&&(d=a.b,b=a.g,a=a.r),null==b&&e(a,string)){var f=c.getRGB(a);a=f.r,b=f.g,d=f.b}return(a>1||b>1||d>1)&&(a/=255,b/=255,d/=255),[a,b,d]},_=function(a,b,d,f){a=D.round(255*a),b=D.round(255*b),d=D.round(255*d);var g={r:a,g:b,b:d,opacity:e(f,"finite")?f:1,hex:c.rgb(a,b,d),toString:Z};return e(f,"finite")&&(g.opacity=f),g};c.color=function(a){var b;return e(a,"object")&&"h"in a&&"s"in a&&"b"in a?(b=c.hsb2rgb(a),a.r=b.r,a.g=b.g,a.b=b.b,a.opacity=1,a.hex=b.hex):e(a,"object")&&"h"in a&&"s"in a&&"l"in a?(b=c.hsl2rgb(a),a.r=b.r,a.g=b.g,a.b=b.b,a.opacity=1,a.hex=b.hex):(e(a,"string")&&(a=c.getRGB(a)),e(a,"object")&&"r"in a&&"g"in a&&"b"in a&&!("error"in a)?(b=c.rgb2hsl(a),a.h=b.h,a.s=b.s,a.l=b.l,b=c.rgb2hsb(a),a.v=b.b):(a={hex:"none"},a.r=a.g=a.b=a.h=a.s=a.v=a.l=-1,a.error=1)),a.toString=Z,a},c.hsb2rgb=function(a,b,c,d){e(a,"object")&&"h"in a&&"s"in a&&"b"in a&&(c=a.b,b=a.s,d=a.o,a=a.h),a*=360;var f,g,h,i,j;return a=a%360/60,j=c*b,i=j*(1-G(a%2-1)),f=g=h=c-j,a=~~a,f+=[j,i,0,0,i,j][a],g+=[i,j,j,i,0,0][a],h+=[0,0,i,j,j,i][a],_(f,g,h,d)},c.hsl2rgb=function(a,b,c,d){e(a,"object")&&"h"in a&&"s"in a&&"l"in a&&(c=a.l,b=a.s,a=a.h),(a>1||b>1||c>1)&&(a/=360,b/=100,c/=100),a*=360;var f,g,h,i,j;return a=a%360/60,j=2*b*(.5>c?c:1-c),i=j*(1-G(a%2-1)),f=g=h=c-j/2,a=~~a,f+=[j,i,0,0,i,j][a],g+=[i,j,j,i,0,0][a],h+=[0,0,i,j,j,i][a],_(f,g,h,d)},c.rgb2hsb=function(a,b,c){c=$(a,b,c),a=c[0],b=c[1],c=c[2];var d,e,f,g;return f=E(a,b,c),g=f-F(a,b,c),d=0==g?null:f==a?(b-c)/g:f==b?(c-a)/g+2:(a-b)/g+4,d=(d+360)%6*60/360,e=0==g?0:g/f,{h:d,s:e,b:f,toString:X}},c.rgb2hsl=function(a,b,c){c=$(a,b,c),a=c[0],b=c[1],c=c[2];var d,e,f,g,h,i;return g=E(a,b,c),h=F(a,b,c),i=g-h,d=0==i?null:g==a?(b-c)/i:g==b?(c-a)/i+2:(a-b)/i+4,d=(d+360)%6*60/360,f=(g+h)/2,e=0==i?0:.5>f?i/(2*f):i/(2-2*f),{h:d,s:e,l:f,toString:Y}},c.parsePathString=function(a){if(!a)return null;var b=c.path(a);if(b.arr)return c.path.clone(b.arr);var d={a:7,c:6,o:2,h:1,l:2,m:2,r:4,q:4,s:4,t:2,v:1,u:3,z:0},f=[];return e(a,"array")&&e(a[0],"array")&&(f=c.path.clone(a)),f.length||A(a).replace(N,function(a,b,c){var e=[],g=b.toLowerCase();if(c.replace(P,function(a,b){b&&e.push(+b)}),"m"==g&&e.length>2&&(f.push([b].concat(e.splice(0,2))),g="l",b="m"==b?"l":"L"),"o"==g&&1==e.length&&f.push([b,e[0]]),"r"==g)f.push([b].concat(e));else for(;e.length>=d[g]&&(f.push([b].concat(e.splice(0,d[g]))),d[g]););}),f.toString=c.path.toString,b.arr=c.path.clone(f),f};var ab=c.parseTransformString=function(a){if(!a)return null;var b=[];return e(a,"array")&&e(a[0],"array")&&(b=c.path.clone(a)),b.length||A(a).replace(O,function(a,c,d){{var e=[];c.toLowerCase()}d.replace(P,function(a,b){b&&e.push(+b)}),b.push([c].concat(e))}),b.toString=c.path.toString,b};c._.svgTransform2string=m,c._.rgTransform=/^[a-z][\s]*-?\.?\d/i,c._.transform2matrix=n,c._unit2px=q;y.doc.contains||y.doc.compareDocumentPosition?function(a,b){var c=9==a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a==d||!(!d||1!=d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)for(;b;)if(b=b.parentNode,b==a)return!0;return!1};c._.getSomeDefs=o,c._.getSomeSVG=p,c.select=function(a){return a=A(a).replace(/([^\\]):/g,"$1\\:"),w(y.doc.querySelector(a))},c.selectAll=function(a){for(var b=y.doc.querySelectorAll(a),d=(c.set||Array)(),e=0;e<b.length;e++)d.push(w(b[e]));return d},setInterval(function(){for(var a in V)if(V[z](a)){var b=V[a],c=b.node;("svg"!=b.type&&!c.ownerSVGElement||"svg"==b.type&&(!c.parentNode||"ownerSVGElement"in c.parentNode&&!c.ownerSVGElement))&&delete V[a]}},1e4),s.prototype.attr=function(a,c){var d=this,f=d.node;if(!a){if(1!=f.nodeType)return{text:f.nodeValue};for(var g=f.attributes,h={},i=0,j=g.length;j>i;i++)h[g[i].nodeName]=g[i].nodeValue;return h}if(e(a,"string")){if(!(arguments.length>1))return b("snap.util.getattr."+a,d).firstDefined();var k={};k[a]=c,a=k}for(var l in a)a[z](l)&&b("snap.util.attr."+l,d,a[l]);return d},c.parse=function(a){var b=y.doc.createDocumentFragment(),c=!0,d=y.doc.createElement("div");if(a=A(a),a.match(/^\s*<\s*svg(?:\s|>)/)||(a="<svg>"+a+"</svg>",c=!1),d.innerHTML=a,a=d.getElementsByTagName("svg")[0])if(c)b=a;else for(;a.firstChild;)b.appendChild(a.firstChild);return new t(b)},c.fragment=function(){for(var a=Array.prototype.slice.call(arguments,0),b=y.doc.createDocumentFragment(),d=0,e=a.length;e>d;d++){var f=a[d];f.node&&f.node.nodeType&&b.appendChild(f.node),f.nodeType&&b.appendChild(f),"string"==typeof f&&b.appendChild(c.parse(f).node)}return new t(b)},c._.make=u,c._.wrap=w,v.prototype.el=function(a,b){var c=u(a,this.node);return b&&c.attr(b),c},s.prototype.children=function(){for(var a=[],b=this.node.childNodes,d=0,e=b.length;e>d;d++)a[d]=c(b[d]);return a},s.prototype.toJSON=function(){var a=[];return x([this],a),a[0]},b.on("snap.util.getattr",function(){var a=b.nt();a=a.substring(a.lastIndexOf(".")+1);var c=a.replace(/[A-Z]/g,function(a){return"-"+a.toLowerCase()});return bb[z](c)?this.node.ownerDocument.defaultView.getComputedStyle(this.node,null).getPropertyValue(c):d(this.node,a)});var bb={"alignment-baseline":0,"baseline-shift":0,clip:0,"clip-path":0,"clip-rule":0,color:0,"color-interpolation":0,"color-interpolation-filters":0,"color-profile":0,"color-rendering":0,cursor:0,direction:0,display:0,"dominant-baseline":0,"enable-background":0,fill:0,"fill-opacity":0,"fill-rule":0,filter:0,"flood-color":0,"flood-opacity":0,font:0,"font-family":0,"font-size":0,"font-size-adjust":0,"font-stretch":0,"font-style":0,"font-variant":0,"font-weight":0,"glyph-orientation-horizontal":0,"glyph-orientation-vertical":0,"image-rendering":0,kerning:0,"letter-spacing":0,"lighting-color":0,marker:0,"marker-end":0,"marker-mid":0,"marker-start":0,mask:0,opacity:0,overflow:0,"pointer-events":0,"shape-rendering":0,"stop-color":0,"stop-opacity":0,stroke:0,"stroke-dasharray":0,"stroke-dashoffset":0,"stroke-linecap":0,"stroke-linejoin":0,"stroke-miterlimit":0,"stroke-opacity":0,"stroke-width":0,"text-anchor":0,"text-decoration":0,"text-rendering":0,"unicode-bidi":0,visibility:0,"word-spacing":0,"writing-mode":0};b.on("snap.util.attr",function(a){var c=b.nt(),e={};c=c.substring(c.lastIndexOf(".")+1),e[c]=a;var f=c.replace(/-(\w)/gi,function(a,b){return b.toUpperCase()}),g=c.replace(/[A-Z]/g,function(a){return"-"+a.toLowerCase()});bb[z](g)?this.node.style[f]=null==a?I:a:d(this.node,e)}),function(){}(v.prototype),c.ajax=function(a,c,d,f){var g=new XMLHttpRequest,h=S();if(g){if(e(c,"function"))f=d,d=c,c=null;else if(e(c,"object")){var i=[];for(var j in c)c.hasOwnProperty(j)&&i.push(encodeURIComponent(j)+"="+encodeURIComponent(c[j]));c=i.join("&")}return g.open(c?"POST":"GET",a,!0),c&&(g.setRequestHeader("X-Requested-With","XMLHttpRequest"),g.setRequestHeader("Content-type","application/x-www-form-urlencoded")),d&&(b.once("snap.ajax."+h+".0",d),b.once("snap.ajax."+h+".200",d),b.once("snap.ajax."+h+".304",d)),g.onreadystatechange=function(){4==g.readyState&&b("snap.ajax."+h+"."+g.status,f,g)},4==g.readyState?g:(g.send(c),g)}},c.load=function(a,b,d){c.ajax(a,function(a){var e=c.parse(a.responseText);d?b.call(d,e):b(e)})};var cb=function(a){var b=a.getBoundingClientRect(),c=a.ownerDocument,d=c.body,e=c.documentElement,f=e.clientTop||d.clientTop||0,h=e.clientLeft||d.clientLeft||0,i=b.top+(g.win.pageYOffset||e.scrollTop||d.scrollTop)-f,j=b.left+(g.win.pageXOffset||e.scrollLeft||d.scrollLeft)-h;return{y:i,x:j}};return c.getElementByPoint=function(a,b){var c=this,d=(c.canvas,y.doc.elementFromPoint(a,b));if(y.win.opera&&"svg"==d.tagName){var e=cb(d),f=d.createSVGRect();f.x=a-e.x,f.y=b-e.y,f.width=f.height=1;var g=d.getIntersectionList(f,null);g.length&&(d=g[g.length-1])}return d?w(d):null},c.plugin=function(a){a(c,s,v,y,t)},y.win.Snap=c,c}(a||this);return d.plugin(function(d,e,f,g,h){function i(a,b){if(null==b){var c=!0;if(b=a.node.getAttribute("linearGradient"==a.type||"radialGradient"==a.type?"gradientTransform":"pattern"==a.type?"patternTransform":"transform"),!b)return new d.Matrix;b=d._.svgTransform2string(b)}else b=d._.rgTransform.test(b)?o(b).replace(/\.{3}|\u2026/g,a._.transform||""):d._.svgTransform2string(b),n(b,"array")&&(b=d.path?d.path.toString.call(b):o(b)),a._.transform=b;var e=d._.transform2matrix(b,a.getBBox(1));return c?e:void(a.matrix=e)}function j(a){function b(a,b){var c=q(a.node,b);c=c&&c.match(f),c=c&&c[2],c&&"#"==c.charAt()&&(c=c.substring(1),c&&(h[c]=(h[c]||[]).concat(function(c){var d={};d[b]=URL(c),q(a.node,d)})))}function c(a){var b=q(a.node,"xlink:href");b&&"#"==b.charAt()&&(b=b.substring(1),b&&(h[b]=(h[b]||[]).concat(function(b){a.attr("xlink:href","#"+b)})))}for(var d,e=a.selectAll("*"),f=/^\s*url\(("|'|)(.*)\1\)\s*$/,g=[],h={},i=0,j=e.length;j>i;i++){d=e[i],b(d,"fill"),b(d,"stroke"),b(d,"filter"),b(d,"mask"),b(d,"clip-path"),c(d);var k=q(d.node,"id");k&&(q(d.node,{id:d.id}),g.push({old:k,id:d.id}))}for(i=0,j=g.length;j>i;i++){var l=h[g[i].old];if(l)for(var m=0,n=l.length;n>m;m++)l[m](g[i].id)}}function k(a,b,c){return function(d){var e=d.slice(a,b);return 1==e.length&&(e=e[0]),c?c(e):e}}function l(a){return function(){var b=a?"<"+this.type:"",c=this.node.attributes,d=this.node.childNodes;if(a)for(var e=0,f=c.length;f>e;e++)b+=" "+c[e].name+'="'+c[e].value.replace(/"/g,'\\"')+'"';if(d.length){for(a&&(b+=">"),e=0,f=d.length;f>e;e++)3==d[e].nodeType?b+=d[e].nodeValue:1==d[e].nodeType&&(b+=u(d[e]).toString());a&&(b+="</"+this.type+">")}else a&&(b+="/>");return b}}var m=e.prototype,n=d.is,o=String,p=d._unit2px,q=d._.$,r=d._.make,s=d._.getSomeDefs,t="hasOwnProperty",u=d._.wrap;m.getBBox=function(a){if(!d.Matrix||!d.path)return this.node.getBBox();var b=this,c=new d.Matrix;if(b.removed)return d._.box();for(;"use"==b.type;)if(a||(c=c.add(b.transform().localMatrix.translate(b.attr("x")||0,b.attr("y")||0))),b.original)b=b.original;else{var e=b.attr("xlink:href");b=b.original=b.node.ownerDocument.getElementById(e.substring(e.indexOf("#")+1))}var f=b._,g=d.path.get[b.type]||d.path.get.deflt;try{return a?(f.bboxwt=g?d.path.getBBox(b.realPath=g(b)):d._.box(b.node.getBBox()),d._.box(f.bboxwt)):(b.realPath=g(b),b.matrix=b.transform().localMatrix,f.bbox=d.path.getBBox(d.path.map(b.realPath,c.add(b.matrix))),d._.box(f.bbox))}catch(h){return d._.box()}};var v=function(){return this.string};m.transform=function(a){var b=this._;if(null==a){for(var c,e=this,f=new d.Matrix(this.node.getCTM()),g=i(this),h=[g],j=new d.Matrix,k=g.toTransformString(),l=o(g)==o(this.matrix)?o(b.transform):k;"svg"!=e.type&&(e=e.parent());)h.push(i(e));for(c=h.length;c--;)j.add(h[c]);return{string:l,globalMatrix:f,totalMatrix:j,localMatrix:g,diffMatrix:f.clone().add(g.invert()),global:f.toTransformString(),total:j.toTransformString(),local:k,toString:v}}return a instanceof d.Matrix?(this.matrix=a,this._.transform=a.toTransformString()):i(this,a),this.node&&("linearGradient"==this.type||"radialGradient"==this.type?q(this.node,{gradientTransform:this.matrix}):"pattern"==this.type?q(this.node,{patternTransform:this.matrix}):q(this.node,{transform:this.matrix})),this},m.parent=function(){return u(this.node.parentNode)},m.append=m.add=function(a){if(a){if("set"==a.type){var b=this;return a.forEach(function(a){b.add(a)}),this}a=u(a),this.node.appendChild(a.node),a.paper=this.paper}return this},m.appendTo=function(a){return a&&(a=u(a),a.append(this)),this},m.prepend=function(a){if(a){if("set"==a.type){var b,c=this;return a.forEach(function(a){b?b.after(a):c.prepend(a),b=a}),this}a=u(a);var d=a.parent();this.node.insertBefore(a.node,this.node.firstChild),this.add&&this.add(),a.paper=this.paper,this.parent()&&this.parent().add(),d&&d.add()}return this},m.prependTo=function(a){return a=u(a),a.prepend(this),this},m.before=function(a){if("set"==a.type){var b=this;return a.forEach(function(a){var c=a.parent();b.node.parentNode.insertBefore(a.node,b.node),c&&c.add()}),this.parent().add(),this}a=u(a);var c=a.parent();return this.node.parentNode.insertBefore(a.node,this.node),this.parent()&&this.parent().add(),c&&c.add(),a.paper=this.paper,this},m.after=function(a){a=u(a);var b=a.parent();return this.node.nextSibling?this.node.parentNode.insertBefore(a.node,this.node.nextSibling):this.node.parentNode.appendChild(a.node),this.parent()&&this.parent().add(),b&&b.add(),a.paper=this.paper,this},m.insertBefore=function(a){a=u(a);var b=this.parent();return a.node.parentNode.insertBefore(this.node,a.node),this.paper=a.paper,b&&b.add(),a.parent()&&a.parent().add(),this},m.insertAfter=function(a){a=u(a);var b=this.parent();return a.node.parentNode.insertBefore(this.node,a.node.nextSibling),this.paper=a.paper,b&&b.add(),a.parent()&&a.parent().add(),this},m.remove=function(){var a=this.parent();return this.node.parentNode&&this.node.parentNode.removeChild(this.node),delete this.paper,this.removed=!0,a&&a.add(),this},m.select=function(a){return u(this.node.querySelector(a))},m.selectAll=function(a){for(var b=this.node.querySelectorAll(a),c=(d.set||Array)(),e=0;e<b.length;e++)c.push(u(b[e]));return c},m.asPX=function(a,b){return null==b&&(b=this.attr(a)),+p(this,a,b)},m.use=function(){var a,b=this.node.id;return b||(b=this.id,q(this.node,{id:b})),a="linearGradient"==this.type||"radialGradient"==this.type||"pattern"==this.type?r(this.type,this.node.parentNode):r("use",this.node.parentNode),q(a.node,{"xlink:href":"#"+b}),a.original=this,a},m.clone=function(){var a=u(this.node.cloneNode(!0));return q(a.node,"id")&&q(a.node,{id:a.id}),j(a),a.insertAfter(this),a},m.toDefs=function(){var a=s(this);return a.appendChild(this.node),this},m.pattern=m.toPattern=function(a,b,c,d){var e=r("pattern",s(this));return null==a&&(a=this.getBBox()),n(a,"object")&&"x"in a&&(b=a.y,c=a.width,d=a.height,a=a.x),q(e.node,{x:a,y:b,width:c,height:d,patternUnits:"userSpaceOnUse",id:e.id,viewBox:[a,b,c,d].join(" ")}),e.node.appendChild(this.node),e},m.marker=function(a,b,c,d,e,f){var g=r("marker",s(this));return null==a&&(a=this.getBBox()),n(a,"object")&&"x"in a&&(b=a.y,c=a.width,d=a.height,e=a.refX||a.cx,f=a.refY||a.cy,a=a.x),q(g.node,{viewBox:[a,b,c,d].join(" "),markerWidth:c,markerHeight:d,orient:"auto",refX:e||0,refY:f||0,id:g.id}),g.node.appendChild(this.node),g};var w=function(a,b,d,e){"function"!=typeof d||d.length||(e=d,d=c.linear),this.attr=a,this.dur=b,d&&(this.easing=d),e&&(this.callback=e)};d._.Animation=w,d.animation=function(a,b,c,d){return new w(a,b,c,d)},m.inAnim=function(){var a=this,b=[];for(var c in a.anims)a.anims[t](c)&&!function(a){b.push({anim:new w(a._attrs,a.dur,a.easing,a._callback),mina:a,curStatus:a.status(),status:function(b){return a.status(b)},stop:function(){a.stop()}})}(a.anims[c]);return b},d.animate=function(a,d,e,f,g,h){"function"!=typeof g||g.length||(h=g,g=c.linear);var i=c.time(),j=c(a,d,i,i+f,c.time,e,g);return h&&b.once("mina.finish."+j.id,h),j},m.stop=function(){for(var a=this.inAnim(),b=0,c=a.length;c>b;b++)a[b].stop();return this},m.animate=function(a,d,e,f){"function"!=typeof e||e.length||(f=e,e=c.linear),a instanceof w&&(f=a.callback,e=a.easing,d=a.dur,a=a.attr);var g,h,i,j,l=[],m=[],p={},q=this;for(var r in a)if(a[t](r)){q.equal?(j=q.equal(r,o(a[r])),g=j.from,h=j.to,i=j.f):(g=+q.attr(r),h=+a[r]);var s=n(g,"array")?g.length:1;p[r]=k(l.length,l.length+s,i),l=l.concat(g),m=m.concat(h)}var u=c.time(),v=c(l,m,u,u+d,c.time,function(a){var b={};for(var c in p)p[t](c)&&(b[c]=p[c](a));q.attr(b)},e);return q.anims[v.id]=v,v._attrs=a,v._callback=f,b("snap.animcreated."+q.id,v),b.once("mina.finish."+v.id,function(){delete q.anims[v.id],f&&f.call(q)}),b.once("mina.stop."+v.id,function(){delete q.anims[v.id]}),q};var x={};m.data=function(a,c){var e=x[this.id]=x[this.id]||{};if(0==arguments.length)return b("snap.data.get."+this.id,this,e,null),e;
if(1==arguments.length){if(d.is(a,"object")){for(var f in a)a[t](f)&&this.data(f,a[f]);return this}return b("snap.data.get."+this.id,this,e[a],a),e[a]}return e[a]=c,b("snap.data.set."+this.id,this,c,a),this},m.removeData=function(a){return null==a?x[this.id]={}:x[this.id]&&delete x[this.id][a],this},m.outerSVG=m.toString=l(1),m.innerSVG=l(),m.toDataURL=function(){if(a&&a.btoa){var b=this.getBBox(),c=d.format('<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{width}" height="{height}" viewBox="{x} {y} {width} {height}">{contents}</svg>',{x:+b.x.toFixed(3),y:+b.y.toFixed(3),width:+b.width.toFixed(3),height:+b.height.toFixed(3),contents:this.outerSVG()});return"data:image/svg+xml;base64,"+btoa(unescape(encodeURIComponent(c)))}},h.prototype.select=m.select,h.prototype.selectAll=m.selectAll}),d.plugin(function(a){function b(a,b,d,e,f,g){return null==b&&"[object SVGMatrix]"==c.call(a)?(this.a=a.a,this.b=a.b,this.c=a.c,this.d=a.d,this.e=a.e,void(this.f=a.f)):void(null!=a?(this.a=+a,this.b=+b,this.c=+d,this.d=+e,this.e=+f,this.f=+g):(this.a=1,this.b=0,this.c=0,this.d=1,this.e=0,this.f=0))}var c=Object.prototype.toString,d=String,e=Math,f="";!function(c){function g(a){return a[0]*a[0]+a[1]*a[1]}function h(a){var b=e.sqrt(g(a));a[0]&&(a[0]/=b),a[1]&&(a[1]/=b)}c.add=function(a,c,d,e,f,g){var h,i,j,k,l=[[],[],[]],m=[[this.a,this.c,this.e],[this.b,this.d,this.f],[0,0,1]],n=[[a,d,f],[c,e,g],[0,0,1]];for(a&&a instanceof b&&(n=[[a.a,a.c,a.e],[a.b,a.d,a.f],[0,0,1]]),h=0;3>h;h++)for(i=0;3>i;i++){for(k=0,j=0;3>j;j++)k+=m[h][j]*n[j][i];l[h][i]=k}return this.a=l[0][0],this.b=l[1][0],this.c=l[0][1],this.d=l[1][1],this.e=l[0][2],this.f=l[1][2],this},c.invert=function(){var a=this,c=a.a*a.d-a.b*a.c;return new b(a.d/c,-a.b/c,-a.c/c,a.a/c,(a.c*a.f-a.d*a.e)/c,(a.b*a.e-a.a*a.f)/c)},c.clone=function(){return new b(this.a,this.b,this.c,this.d,this.e,this.f)},c.translate=function(a,b){return this.add(1,0,0,1,a,b)},c.scale=function(a,b,c,d){return null==b&&(b=a),(c||d)&&this.add(1,0,0,1,c,d),this.add(a,0,0,b,0,0),(c||d)&&this.add(1,0,0,1,-c,-d),this},c.rotate=function(b,c,d){b=a.rad(b),c=c||0,d=d||0;var f=+e.cos(b).toFixed(9),g=+e.sin(b).toFixed(9);return this.add(f,g,-g,f,c,d),this.add(1,0,0,1,-c,-d)},c.x=function(a,b){return a*this.a+b*this.c+this.e},c.y=function(a,b){return a*this.b+b*this.d+this.f},c.get=function(a){return+this[d.fromCharCode(97+a)].toFixed(4)},c.toString=function(){return"matrix("+[this.get(0),this.get(1),this.get(2),this.get(3),this.get(4),this.get(5)].join()+")"},c.offset=function(){return[this.e.toFixed(4),this.f.toFixed(4)]},c.determinant=function(){return this.a*this.d-this.b*this.c},c.split=function(){var b={};b.dx=this.e,b.dy=this.f;var c=[[this.a,this.c],[this.b,this.d]];b.scalex=e.sqrt(g(c[0])),h(c[0]),b.shear=c[0][0]*c[1][0]+c[0][1]*c[1][1],c[1]=[c[1][0]-c[0][0]*b.shear,c[1][1]-c[0][1]*b.shear],b.scaley=e.sqrt(g(c[1])),h(c[1]),b.shear/=b.scaley,this.determinant()<0&&(b.scalex=-b.scalex);var d=-c[0][1],f=c[1][1];return 0>f?(b.rotate=a.deg(e.acos(f)),0>d&&(b.rotate=360-b.rotate)):b.rotate=a.deg(e.asin(d)),b.isSimple=!(+b.shear.toFixed(9)||b.scalex.toFixed(9)!=b.scaley.toFixed(9)&&b.rotate),b.isSuperSimple=!+b.shear.toFixed(9)&&b.scalex.toFixed(9)==b.scaley.toFixed(9)&&!b.rotate,b.noRotation=!+b.shear.toFixed(9)&&!b.rotate,b},c.toTransformString=function(a){var b=a||this.split();return+b.shear.toFixed(9)?"m"+[this.get(0),this.get(1),this.get(2),this.get(3),this.get(4),this.get(5)]:(b.scalex=+b.scalex.toFixed(4),b.scaley=+b.scaley.toFixed(4),b.rotate=+b.rotate.toFixed(4),(b.dx||b.dy?"t"+[+b.dx.toFixed(4),+b.dy.toFixed(4)]:f)+(1!=b.scalex||1!=b.scaley?"s"+[b.scalex,b.scaley,0,0]:f)+(b.rotate?"r"+[+b.rotate.toFixed(4),0,0]:f))}}(b.prototype),a.Matrix=b,a.matrix=function(a,c,d,e,f,g){return new b(a,c,d,e,f,g)}}),d.plugin(function(a,c,d,e,f){function g(d){return function(e){if(b.stop(),e instanceof f&&1==e.node.childNodes.length&&("radialGradient"==e.node.firstChild.tagName||"linearGradient"==e.node.firstChild.tagName||"pattern"==e.node.firstChild.tagName)&&(e=e.node.firstChild,n(this).appendChild(e),e=l(e)),e instanceof c)if("radialGradient"==e.type||"linearGradient"==e.type||"pattern"==e.type){e.node.id||p(e.node,{id:e.id});var g=q(e.node.id)}else g=e.attr(d);else if(g=a.color(e),g.error){var h=a(n(this).ownerSVGElement).gradient(e);h?(h.node.id||p(h.node,{id:h.id}),g=q(h.node.id)):g=e}else g=r(g);var i={};i[d]=g,p(this.node,i),this.node.style[d]=t}}function h(a){b.stop(),a==+a&&(a+="px"),this.node.style.fontSize=a}function i(a){for(var b=[],c=a.childNodes,d=0,e=c.length;e>d;d++){var f=c[d];3==f.nodeType&&b.push(f.nodeValue),"tspan"==f.tagName&&b.push(1==f.childNodes.length&&3==f.firstChild.nodeType?f.firstChild.nodeValue:i(f))}return b}function j(){return b.stop(),this.node.style.fontSize}var k=a._.make,l=a._.wrap,m=a.is,n=a._.getSomeDefs,o=/^url\(#?([^)]+)\)$/,p=a._.$,q=a.url,r=String,s=a._.separator,t="";b.on("snap.util.attr.mask",function(a){if(a instanceof c||a instanceof f){if(b.stop(),a instanceof f&&1==a.node.childNodes.length&&(a=a.node.firstChild,n(this).appendChild(a),a=l(a)),"mask"==a.type)var d=a;else d=k("mask",n(this)),d.node.appendChild(a.node);!d.node.id&&p(d.node,{id:d.id}),p(this.node,{mask:q(d.id)})}}),function(a){b.on("snap.util.attr.clip",a),b.on("snap.util.attr.clip-path",a),b.on("snap.util.attr.clipPath",a)}(function(a){if(a instanceof c||a instanceof f){if(b.stop(),"clipPath"==a.type)var d=a;else d=k("clipPath",n(this)),d.node.appendChild(a.node),!d.node.id&&p(d.node,{id:d.id});p(this.node,{"clip-path":q(d.node.id||d.id)})}}),b.on("snap.util.attr.fill",g("fill")),b.on("snap.util.attr.stroke",g("stroke"));var u=/^([lr])(?:\(([^)]*)\))?(.*)$/i;b.on("snap.util.grad.parse",function(a){a=r(a);var b=a.match(u);if(!b)return null;var c=b[1],d=b[2],e=b[3];return d=d.split(/\s*,\s*/).map(function(a){return+a==a?+a:a}),1==d.length&&0==d[0]&&(d=[]),e=e.split("-"),e=e.map(function(a){a=a.split(":");var b={color:a[0]};return a[1]&&(b.offset=parseFloat(a[1])),b}),{type:c,params:d,stops:e}}),b.on("snap.util.attr.d",function(c){b.stop(),m(c,"array")&&m(c[0],"array")&&(c=a.path.toString.call(c)),c=r(c),c.match(/[ruo]/i)&&(c=a.path.toAbsolute(c)),p(this.node,{d:c})})(-1),b.on("snap.util.attr.#text",function(a){b.stop(),a=r(a);for(var c=e.doc.createTextNode(a);this.node.firstChild;)this.node.removeChild(this.node.firstChild);this.node.appendChild(c)})(-1),b.on("snap.util.attr.path",function(a){b.stop(),this.attr({d:a})})(-1),b.on("snap.util.attr.class",function(a){b.stop(),this.node.className.baseVal=a})(-1),b.on("snap.util.attr.viewBox",function(a){var c;c=m(a,"object")&&"x"in a?[a.x,a.y,a.width,a.height].join(" "):m(a,"array")?a.join(" "):a,p(this.node,{viewBox:c}),b.stop()})(-1),b.on("snap.util.attr.transform",function(a){this.transform(a),b.stop()})(-1),b.on("snap.util.attr.r",function(a){"rect"==this.type&&(b.stop(),p(this.node,{rx:a,ry:a}))})(-1),b.on("snap.util.attr.textpath",function(a){if(b.stop(),"text"==this.type){var d,e,f;if(!a&&this.textPath){for(e=this.textPath;e.node.firstChild;)this.node.appendChild(e.node.firstChild);return e.remove(),void delete this.textPath}if(m(a,"string")){var g=n(this),h=l(g.parentNode).path(a);g.appendChild(h.node),d=h.id,h.attr({id:d})}else a=l(a),a instanceof c&&(d=a.attr("id"),d||(d=a.id,a.attr({id:d})));if(d)if(e=this.textPath,f=this.node,e)e.attr({"xlink:href":"#"+d});else{for(e=p("textPath",{"xlink:href":"#"+d});f.firstChild;)e.appendChild(f.firstChild);f.appendChild(e),this.textPath=l(e)}}})(-1),b.on("snap.util.attr.text",function(a){if("text"==this.type){for(var c=this.node,d=function(a){var b=p("tspan");if(m(a,"array"))for(var c=0;c<a.length;c++)b.appendChild(d(a[c]));else b.appendChild(e.doc.createTextNode(a));return b.normalize&&b.normalize(),b};c.firstChild;)c.removeChild(c.firstChild);for(var f=d(a);f.firstChild;)c.appendChild(f.firstChild)}b.stop()})(-1),b.on("snap.util.attr.fontSize",h)(-1),b.on("snap.util.attr.font-size",h)(-1),b.on("snap.util.getattr.transform",function(){return b.stop(),this.transform()})(-1),b.on("snap.util.getattr.textpath",function(){return b.stop(),this.textPath})(-1),function(){function c(c){return function(){b.stop();var d=e.doc.defaultView.getComputedStyle(this.node,null).getPropertyValue("marker-"+c);return"none"==d?d:a(e.doc.getElementById(d.match(o)[1]))}}function d(a){return function(c){b.stop();var d="marker"+a.charAt(0).toUpperCase()+a.substring(1);if(""==c||!c)return void(this.node.style[d]="none");if("marker"==c.type){var e=c.node.id;return e||p(c.node,{id:c.id}),void(this.node.style[d]=q(e))}}}b.on("snap.util.getattr.marker-end",c("end"))(-1),b.on("snap.util.getattr.markerEnd",c("end"))(-1),b.on("snap.util.getattr.marker-start",c("start"))(-1),b.on("snap.util.getattr.markerStart",c("start"))(-1),b.on("snap.util.getattr.marker-mid",c("mid"))(-1),b.on("snap.util.getattr.markerMid",c("mid"))(-1),b.on("snap.util.attr.marker-end",d("end"))(-1),b.on("snap.util.attr.markerEnd",d("end"))(-1),b.on("snap.util.attr.marker-start",d("start"))(-1),b.on("snap.util.attr.markerStart",d("start"))(-1),b.on("snap.util.attr.marker-mid",d("mid"))(-1),b.on("snap.util.attr.markerMid",d("mid"))(-1)}(),b.on("snap.util.getattr.r",function(){return"rect"==this.type&&p(this.node,"rx")==p(this.node,"ry")?(b.stop(),p(this.node,"rx")):void 0})(-1),b.on("snap.util.getattr.text",function(){if("text"==this.type||"tspan"==this.type){b.stop();var a=i(this.node);return 1==a.length?a[0]:a}})(-1),b.on("snap.util.getattr.#text",function(){return this.node.textContent})(-1),b.on("snap.util.getattr.viewBox",function(){b.stop();var c=p(this.node,"viewBox");return c?(c=c.split(s),a._.box(+c[0],+c[1],+c[2],+c[3])):void 0})(-1),b.on("snap.util.getattr.points",function(){var a=p(this.node,"points");return b.stop(),a?a.split(s):void 0})(-1),b.on("snap.util.getattr.path",function(){var a=p(this.node,"d");return b.stop(),a})(-1),b.on("snap.util.getattr.class",function(){return this.node.className.baseVal})(-1),b.on("snap.util.getattr.fontSize",j)(-1),b.on("snap.util.getattr.font-size",j)(-1)}),d.plugin(function(a,b){var c=/\S+/g,d=String,e=b.prototype;e.addClass=function(a){var b,e,f,g,h=d(a||"").match(c)||[],i=this.node,j=i.className.baseVal,k=j.match(c)||[];if(h.length){for(b=0;f=h[b++];)e=k.indexOf(f),~e||k.push(f);g=k.join(" "),j!=g&&(i.className.baseVal=g)}return this},e.removeClass=function(a){var b,e,f,g,h=d(a||"").match(c)||[],i=this.node,j=i.className.baseVal,k=j.match(c)||[];if(k.length){for(b=0;f=h[b++];)e=k.indexOf(f),~e&&k.splice(e,1);g=k.join(" "),j!=g&&(i.className.baseVal=g)}return this},e.hasClass=function(a){var b=this.node,d=b.className.baseVal,e=d.match(c)||[];return!!~e.indexOf(a)},e.toggleClass=function(a,b){if(null!=b)return b?this.addClass(a):this.removeClass(a);var d,e,f,g,h=(a||"").match(c)||[],i=this.node,j=i.className.baseVal,k=j.match(c)||[];for(d=0;f=h[d++];)e=k.indexOf(f),~e?k.splice(e,1):k.push(f);return g=k.join(" "),j!=g&&(i.className.baseVal=g),this}}),d.plugin(function(){function a(a){return a}function c(a){return function(b){return+b.toFixed(3)+a}}var d={"+":function(a,b){return a+b},"-":function(a,b){return a-b},"/":function(a,b){return a/b},"*":function(a,b){return a*b}},e=String,f=/[a-z]+$/i,g=/^\s*([+\-\/*])\s*=\s*([\d.eE+\-]+)\s*([^\d\s]+)?\s*$/;b.on("snap.util.attr",function(a){var c=e(a).match(g);if(c){var h=b.nt(),i=h.substring(h.lastIndexOf(".")+1),j=this.attr(i),k={};b.stop();var l=c[3]||"",m=j.match(f),n=d[c[1]];if(m&&m==l?a=n(parseFloat(j),+c[2]):(j=this.asPX(i),a=n(this.asPX(i),this.asPX(i,c[2]+l))),isNaN(j)||isNaN(a))return;k[i]=a,this.attr(k)}})(-10),b.on("snap.util.equal",function(h,i){var j=e(this.attr(h)||""),k=e(i).match(g);if(k){b.stop();var l=k[3]||"",m=j.match(f),n=d[k[1]];return m&&m==l?{from:parseFloat(j),to:n(parseFloat(j),+k[2]),f:c(m)}:(j=this.asPX(h),{from:j,to:n(j,this.asPX(h,k[2]+l)),f:a})}})(-10)}),d.plugin(function(c,d,e,f){var g=e.prototype,h=c.is;g.rect=function(a,b,c,d,e,f){var g;return null==f&&(f=e),h(a,"object")&&"[object Object]"==a?g=a:null!=a&&(g={x:a,y:b,width:c,height:d},null!=e&&(g.rx=e,g.ry=f)),this.el("rect",g)},g.circle=function(a,b,c){var d;return h(a,"object")&&"[object Object]"==a?d=a:null!=a&&(d={cx:a,cy:b,r:c}),this.el("circle",d)};var i=function(){function a(){this.parentNode.removeChild(this)}return function(b,c){var d=f.doc.createElement("img"),e=f.doc.body;d.style.cssText="position:absolute;left:-9999em;top:-9999em",d.onload=function(){c.call(d),d.onload=d.onerror=null,e.removeChild(d)},d.onerror=a,e.appendChild(d),d.src=b}}();g.image=function(a,b,d,e,f){var g=this.el("image");if(h(a,"object")&&"src"in a)g.attr(a);else if(null!=a){var j={"xlink:href":a,preserveAspectRatio:"none"};null!=b&&null!=d&&(j.x=b,j.y=d),null!=e&&null!=f?(j.width=e,j.height=f):i(a,function(){c._.$(g.node,{width:this.offsetWidth,height:this.offsetHeight})}),c._.$(g.node,j)}return g},g.ellipse=function(a,b,c,d){var e;return h(a,"object")&&"[object Object]"==a?e=a:null!=a&&(e={cx:a,cy:b,rx:c,ry:d}),this.el("ellipse",e)},g.path=function(a){var b;return h(a,"object")&&!h(a,"array")?b=a:a&&(b={d:a}),this.el("path",b)},g.group=g.g=function(a){var b=this.el("g");return 1==arguments.length&&a&&!a.type?b.attr(a):arguments.length&&b.add(Array.prototype.slice.call(arguments,0)),b},g.svg=function(a,b,c,d,e,f,g,i){var j={};return h(a,"object")&&null==b?j=a:(null!=a&&(j.x=a),null!=b&&(j.y=b),null!=c&&(j.width=c),null!=d&&(j.height=d),null!=e&&null!=f&&null!=g&&null!=i&&(j.viewBox=[e,f,g,i])),this.el("svg",j)},g.mask=function(a){var b=this.el("mask");return 1==arguments.length&&a&&!a.type?b.attr(a):arguments.length&&b.add(Array.prototype.slice.call(arguments,0)),b},g.ptrn=function(a,b,c,d,e,f,g,i){if(h(a,"object"))var j=a;else j={patternUnits:"userSpaceOnUse"},a&&(j.x=a),b&&(j.y=b),null!=c&&(j.width=c),null!=d&&(j.height=d),j.viewBox=null!=e&&null!=f&&null!=g&&null!=i?[e,f,g,i]:[a||0,b||0,c||0,d||0];return this.el("pattern",j)},g.use=function(a){return null!=a?(a instanceof d&&(a.attr("id")||a.attr({id:c._.id(a)}),a=a.attr("id")),"#"==String(a).charAt()&&(a=a.substring(1)),this.el("use",{"xlink:href":"#"+a})):d.prototype.use.call(this)},g.symbol=function(a,b,c,d){var e={};return null!=a&&null!=b&&null!=c&&null!=d&&(e.viewBox=[a,b,c,d]),this.el("symbol",e)},g.text=function(a,b,c){var d={};return h(a,"object")?d=a:null!=a&&(d={x:a,y:b,text:c||""}),this.el("text",d)},g.line=function(a,b,c,d){var e={};return h(a,"object")?e=a:null!=a&&(e={x1:a,x2:c,y1:b,y2:d}),this.el("line",e)},g.polyline=function(a){arguments.length>1&&(a=Array.prototype.slice.call(arguments,0));var b={};return h(a,"object")&&!h(a,"array")?b=a:null!=a&&(b={points:a}),this.el("polyline",b)},g.polygon=function(a){arguments.length>1&&(a=Array.prototype.slice.call(arguments,0));var b={};return h(a,"object")&&!h(a,"array")?b=a:null!=a&&(b={points:a}),this.el("polygon",b)},function(){function d(){return this.selectAll("stop")}function e(a,b){var d=k("stop"),e={offset:+b+"%"};return a=c.color(a),e["stop-color"]=a.hex,a.opacity<1&&(e["stop-opacity"]=a.opacity),k(d,e),this.node.appendChild(d),this}function f(){if("linearGradient"==this.type){var a=k(this.node,"x1")||0,b=k(this.node,"x2")||1,d=k(this.node,"y1")||0,e=k(this.node,"y2")||0;return c._.box(a,d,math.abs(b-a),math.abs(e-d))}var f=this.node.cx||.5,g=this.node.cy||.5,h=this.node.r||0;return c._.box(f-h,g-h,2*h,2*h)}function h(a,c){function d(a,b){for(var c=(b-l)/(a-m),d=m;a>d;d++)g[d].offset=+(+l+c*(d-m)).toFixed(2);m=a,l=b}var e,f=b("snap.util.grad.parse",null,c).firstDefined();if(!f)return null;f.params.unshift(a),e="l"==f.type.toLowerCase()?i.apply(0,f.params):j.apply(0,f.params),f.type!=f.type.toLowerCase()&&k(e.node,{gradientUnits:"userSpaceOnUse"});var g=f.stops,h=g.length,l=0,m=0;h--;for(var n=0;h>n;n++)"offset"in g[n]&&d(n,g[n].offset);for(g[h].offset=g[h].offset||100,d(h,g[h].offset),n=0;h>=n;n++){var o=g[n];e.addStop(o.color,o.offset)}return e}function i(a,b,g,h,i){var j=c._.make("linearGradient",a);return j.stops=d,j.addStop=e,j.getBBox=f,null!=b&&k(j.node,{x1:b,y1:g,x2:h,y2:i}),j}function j(a,b,g,h,i,j){var l=c._.make("radialGradient",a);return l.stops=d,l.addStop=e,l.getBBox=f,null!=b&&k(l.node,{cx:b,cy:g,r:h}),null!=i&&null!=j&&k(l.node,{fx:i,fy:j}),l}var k=c._.$;g.gradient=function(a){return h(this.defs,a)},g.gradientLinear=function(a,b,c,d){return i(this.defs,a,b,c,d)},g.gradientRadial=function(a,b,c,d,e){return j(this.defs,a,b,c,d,e)},g.toString=function(){var a,b=this.node.ownerDocument,d=b.createDocumentFragment(),e=b.createElement("div"),f=this.node.cloneNode(!0);return d.appendChild(e),e.appendChild(f),c._.$(f,{xmlns:"http://www.w3.org/2000/svg"}),a=e.innerHTML,d.removeChild(d.firstChild),a},g.toDataURL=function(){return a&&a.btoa?"data:image/svg+xml;base64,"+btoa(unescape(encodeURIComponent(this))):void 0},g.clear=function(){for(var a,b=this.node.firstChild;b;)a=b.nextSibling,"defs"!=b.tagName?b.parentNode.removeChild(b):g.clear.call({node:b}),b=a}}()}),d.plugin(function(a,b){function c(a){var b=c.ps=c.ps||{};return b[a]?b[a].sleep=100:b[a]={sleep:100},setTimeout(function(){for(var c in b)b[K](c)&&c!=a&&(b[c].sleep--,!b[c].sleep&&delete b[c])}),b[a]}function d(a,b,c,d){return null==a&&(a=b=c=d=0),null==b&&(b=a.y,c=a.width,d=a.height,a=a.x),{x:a,y:b,width:c,w:c,height:d,h:d,x2:a+c,y2:b+d,cx:a+c/2,cy:b+d/2,r1:N.min(c,d)/2,r2:N.max(c,d)/2,r0:N.sqrt(c*c+d*d)/2,path:w(a,b,c,d),vb:[a,b,c,d].join(" ")}}function e(){return this.join(",").replace(L,"$1")}function f(a){var b=J(a);return b.toString=e,b}function g(a,b,c,d,e,f,g,h,j){return null==j?n(a,b,c,d,e,f,g,h):i(a,b,c,d,e,f,g,h,o(a,b,c,d,e,f,g,h,j))}function h(c,d){function e(a){return+(+a).toFixed(3)}return a._.cacher(function(a,f,h){a instanceof b&&(a=a.attr("d")),a=E(a);for(var j,k,l,m,n,o="",p={},q=0,r=0,s=a.length;s>r;r++){if(l=a[r],"M"==l[0])j=+l[1],k=+l[2];else{if(m=g(j,k,l[1],l[2],l[3],l[4],l[5],l[6]),q+m>f){if(d&&!p.start){if(n=g(j,k,l[1],l[2],l[3],l[4],l[5],l[6],f-q),o+=["C"+e(n.start.x),e(n.start.y),e(n.m.x),e(n.m.y),e(n.x),e(n.y)],h)return o;p.start=o,o=["M"+e(n.x),e(n.y)+"C"+e(n.n.x),e(n.n.y),e(n.end.x),e(n.end.y),e(l[5]),e(l[6])].join(),q+=m,j=+l[5],k=+l[6];continue}if(!c&&!d)return n=g(j,k,l[1],l[2],l[3],l[4],l[5],l[6],f-q)}q+=m,j=+l[5],k=+l[6]}o+=l.shift()+l}return p.end=o,n=c?q:d?p:i(j,k,l[0],l[1],l[2],l[3],l[4],l[5],1)},null,a._.clone)}function i(a,b,c,d,e,f,g,h,i){var j=1-i,k=R(j,3),l=R(j,2),m=i*i,n=m*i,o=k*a+3*l*i*c+3*j*i*i*e+n*g,p=k*b+3*l*i*d+3*j*i*i*f+n*h,q=a+2*i*(c-a)+m*(e-2*c+a),r=b+2*i*(d-b)+m*(f-2*d+b),s=c+2*i*(e-c)+m*(g-2*e+c),t=d+2*i*(f-d)+m*(h-2*f+d),u=j*a+i*c,v=j*b+i*d,w=j*e+i*g,x=j*f+i*h,y=90-180*N.atan2(q-s,r-t)/O;return{x:o,y:p,m:{x:q,y:r},n:{x:s,y:t},start:{x:u,y:v},end:{x:w,y:x},alpha:y}}function j(b,c,e,f,g,h,i,j){a.is(b,"array")||(b=[b,c,e,f,g,h,i,j]);var k=D.apply(null,b);return d(k.min.x,k.min.y,k.max.x-k.min.x,k.max.y-k.min.y)}function k(a,b,c){return b>=a.x&&b<=a.x+a.width&&c>=a.y&&c<=a.y+a.height}function l(a,b){return a=d(a),b=d(b),k(b,a.x,a.y)||k(b,a.x2,a.y)||k(b,a.x,a.y2)||k(b,a.x2,a.y2)||k(a,b.x,b.y)||k(a,b.x2,b.y)||k(a,b.x,b.y2)||k(a,b.x2,b.y2)||(a.x<b.x2&&a.x>b.x||b.x<a.x2&&b.x>a.x)&&(a.y<b.y2&&a.y>b.y||b.y<a.y2&&b.y>a.y)}function m(a,b,c,d,e){var f=-3*b+9*c-9*d+3*e,g=a*f+6*b-12*c+6*d;return a*g-3*b+3*c}function n(a,b,c,d,e,f,g,h,i){null==i&&(i=1),i=i>1?1:0>i?0:i;for(var j=i/2,k=12,l=[-.1252,.1252,-.3678,.3678,-.5873,.5873,-.7699,.7699,-.9041,.9041,-.9816,.9816],n=[.2491,.2491,.2335,.2335,.2032,.2032,.1601,.1601,.1069,.1069,.0472,.0472],o=0,p=0;k>p;p++){var q=j*l[p]+j,r=m(q,a,c,e,g),s=m(q,b,d,f,h),t=r*r+s*s;o+=n[p]*N.sqrt(t)}return j*o}function o(a,b,c,d,e,f,g,h,i){if(!(0>i||n(a,b,c,d,e,f,g,h)<i)){var j,k=1,l=k/2,m=k-l,o=.01;for(j=n(a,b,c,d,e,f,g,h,m);S(j-i)>o;)l/=2,m+=(i>j?1:-1)*l,j=n(a,b,c,d,e,f,g,h,m);return m}}function p(a,b,c,d,e,f,g,h){if(!(Q(a,c)<P(e,g)||P(a,c)>Q(e,g)||Q(b,d)<P(f,h)||P(b,d)>Q(f,h))){var i=(a*d-b*c)*(e-g)-(a-c)*(e*h-f*g),j=(a*d-b*c)*(f-h)-(b-d)*(e*h-f*g),k=(a-c)*(f-h)-(b-d)*(e-g);if(k){var l=i/k,m=j/k,n=+l.toFixed(2),o=+m.toFixed(2);if(!(n<+P(a,c).toFixed(2)||n>+Q(a,c).toFixed(2)||n<+P(e,g).toFixed(2)||n>+Q(e,g).toFixed(2)||o<+P(b,d).toFixed(2)||o>+Q(b,d).toFixed(2)||o<+P(f,h).toFixed(2)||o>+Q(f,h).toFixed(2)))return{x:l,y:m}}}}function q(a,b,c){var d=j(a),e=j(b);if(!l(d,e))return c?0:[];for(var f=n.apply(0,a),g=n.apply(0,b),h=~~(f/8),k=~~(g/8),m=[],o=[],q={},r=c?0:[],s=0;h+1>s;s++){var t=i.apply(0,a.concat(s/h));m.push({x:t.x,y:t.y,t:s/h})}for(s=0;k+1>s;s++)t=i.apply(0,b.concat(s/k)),o.push({x:t.x,y:t.y,t:s/k});for(s=0;h>s;s++)for(var u=0;k>u;u++){var v=m[s],w=m[s+1],x=o[u],y=o[u+1],z=S(w.x-v.x)<.001?"y":"x",A=S(y.x-x.x)<.001?"y":"x",B=p(v.x,v.y,w.x,w.y,x.x,x.y,y.x,y.y);if(B){if(q[B.x.toFixed(4)]==B.y.toFixed(4))continue;q[B.x.toFixed(4)]=B.y.toFixed(4);var C=v.t+S((B[z]-v[z])/(w[z]-v[z]))*(w.t-v.t),D=x.t+S((B[A]-x[A])/(y[A]-x[A]))*(y.t-x.t);C>=0&&1>=C&&D>=0&&1>=D&&(c?r++:r.push({x:B.x,y:B.y,t1:C,t2:D}))}}return r}function r(a,b){return t(a,b)}function s(a,b){return t(a,b,1)}function t(a,b,c){a=E(a),b=E(b);for(var d,e,f,g,h,i,j,k,l,m,n=c?0:[],o=0,p=a.length;p>o;o++){var r=a[o];if("M"==r[0])d=h=r[1],e=i=r[2];else{"C"==r[0]?(l=[d,e].concat(r.slice(1)),d=l[6],e=l[7]):(l=[d,e,d,e,h,i,h,i],d=h,e=i);for(var s=0,t=b.length;t>s;s++){var u=b[s];if("M"==u[0])f=j=u[1],g=k=u[2];else{"C"==u[0]?(m=[f,g].concat(u.slice(1)),f=m[6],g=m[7]):(m=[f,g,f,g,j,k,j,k],f=j,g=k);var v=q(l,m,c);if(c)n+=v;else{for(var w=0,x=v.length;x>w;w++)v[w].segment1=o,v[w].segment2=s,v[w].bez1=l,v[w].bez2=m;n=n.concat(v)}}}}}return n}function u(a,b,c){var d=v(a);return k(d,b,c)&&t(a,[["M",b,c],["H",d.x2+10]],1)%2==1}function v(a){var b=c(a);if(b.bbox)return J(b.bbox);if(!a)return d();a=E(a);for(var e,f=0,g=0,h=[],i=[],j=0,k=a.length;k>j;j++)if(e=a[j],"M"==e[0])f=e[1],g=e[2],h.push(f),i.push(g);else{var l=D(f,g,e[1],e[2],e[3],e[4],e[5],e[6]);h=h.concat(l.min.x,l.max.x),i=i.concat(l.min.y,l.max.y),f=e[5],g=e[6]}var m=P.apply(0,h),n=P.apply(0,i),o=Q.apply(0,h),p=Q.apply(0,i),q=d(m,n,o-m,p-n);return b.bbox=J(q),q}function w(a,b,c,d,f){if(f)return[["M",+a+ +f,b],["l",c-2*f,0],["a",f,f,0,0,1,f,f],["l",0,d-2*f],["a",f,f,0,0,1,-f,f],["l",2*f-c,0],["a",f,f,0,0,1,-f,-f],["l",0,2*f-d],["a",f,f,0,0,1,f,-f],["z"]];var g=[["M",a,b],["l",c,0],["l",0,d],["l",-c,0],["z"]];return g.toString=e,g}function x(a,b,c,d,f){if(null==f&&null==d&&(d=c),a=+a,b=+b,c=+c,d=+d,null!=f)var g=Math.PI/180,h=a+c*Math.cos(-d*g),i=a+c*Math.cos(-f*g),j=b+c*Math.sin(-d*g),k=b+c*Math.sin(-f*g),l=[["M",h,j],["A",c,c,0,+(f-d>180),0,i,k]];else l=[["M",a,b],["m",0,-d],["a",c,d,0,1,1,0,2*d],["a",c,d,0,1,1,0,-2*d],["z"]];return l.toString=e,l}function y(b){var d=c(b),g=String.prototype.toLowerCase;if(d.rel)return f(d.rel);a.is(b,"array")&&a.is(b&&b[0],"array")||(b=a.parsePathString(b));var h=[],i=0,j=0,k=0,l=0,m=0;"M"==b[0][0]&&(i=b[0][1],j=b[0][2],k=i,l=j,m++,h.push(["M",i,j]));for(var n=m,o=b.length;o>n;n++){var p=h[n]=[],q=b[n];if(q[0]!=g.call(q[0]))switch(p[0]=g.call(q[0]),p[0]){case"a":p[1]=q[1],p[2]=q[2],p[3]=q[3],p[4]=q[4],p[5]=q[5],p[6]=+(q[6]-i).toFixed(3),p[7]=+(q[7]-j).toFixed(3);break;case"v":p[1]=+(q[1]-j).toFixed(3);break;case"m":k=q[1],l=q[2];default:for(var r=1,s=q.length;s>r;r++)p[r]=+(q[r]-(r%2?i:j)).toFixed(3)}else{p=h[n]=[],"m"==q[0]&&(k=q[1]+i,l=q[2]+j);for(var t=0,u=q.length;u>t;t++)h[n][t]=q[t]}var v=h[n].length;switch(h[n][0]){case"z":i=k,j=l;break;case"h":i+=+h[n][v-1];break;case"v":j+=+h[n][v-1];break;default:i+=+h[n][v-2],j+=+h[n][v-1]}}return h.toString=e,d.rel=f(h),h}function z(b){var d=c(b);if(d.abs)return f(d.abs);if(I(b,"array")&&I(b&&b[0],"array")||(b=a.parsePathString(b)),!b||!b.length)return[["M",0,0]];var g,h=[],i=0,j=0,k=0,l=0,m=0;"M"==b[0][0]&&(i=+b[0][1],j=+b[0][2],k=i,l=j,m++,h[0]=["M",i,j]);for(var n,o,p=3==b.length&&"M"==b[0][0]&&"R"==b[1][0].toUpperCase()&&"Z"==b[2][0].toUpperCase(),q=m,r=b.length;r>q;q++){if(h.push(n=[]),o=b[q],g=o[0],g!=g.toUpperCase())switch(n[0]=g.toUpperCase(),n[0]){case"A":n[1]=o[1],n[2]=o[2],n[3]=o[3],n[4]=o[4],n[5]=o[5],n[6]=+o[6]+i,n[7]=+o[7]+j;break;case"V":n[1]=+o[1]+j;break;case"H":n[1]=+o[1]+i;break;case"R":for(var s=[i,j].concat(o.slice(1)),t=2,u=s.length;u>t;t++)s[t]=+s[t]+i,s[++t]=+s[t]+j;h.pop(),h=h.concat(G(s,p));break;case"O":h.pop(),s=x(i,j,o[1],o[2]),s.push(s[0]),h=h.concat(s);break;case"U":h.pop(),h=h.concat(x(i,j,o[1],o[2],o[3])),n=["U"].concat(h[h.length-1].slice(-2));break;case"M":k=+o[1]+i,l=+o[2]+j;default:for(t=1,u=o.length;u>t;t++)n[t]=+o[t]+(t%2?i:j)}else if("R"==g)s=[i,j].concat(o.slice(1)),h.pop(),h=h.concat(G(s,p)),n=["R"].concat(o.slice(-2));else if("O"==g)h.pop(),s=x(i,j,o[1],o[2]),s.push(s[0]),h=h.concat(s);else if("U"==g)h.pop(),h=h.concat(x(i,j,o[1],o[2],o[3])),n=["U"].concat(h[h.length-1].slice(-2));else for(var v=0,w=o.length;w>v;v++)n[v]=o[v];if(g=g.toUpperCase(),"O"!=g)switch(n[0]){case"Z":i=+k,j=+l;break;case"H":i=n[1];break;case"V":j=n[1];break;case"M":k=n[n.length-2],l=n[n.length-1];default:i=n[n.length-2],j=n[n.length-1]}}return h.toString=e,d.abs=f(h),h}function A(a,b,c,d){return[a,b,c,d,c,d]}function B(a,b,c,d,e,f){var g=1/3,h=2/3;return[g*a+h*c,g*b+h*d,g*e+h*c,g*f+h*d,e,f]}function C(b,c,d,e,f,g,h,i,j,k){var l,m=120*O/180,n=O/180*(+f||0),o=[],p=a._.cacher(function(a,b,c){var d=a*N.cos(c)-b*N.sin(c),e=a*N.sin(c)+b*N.cos(c);return{x:d,y:e}});if(k)y=k[0],z=k[1],w=k[2],x=k[3];else{l=p(b,c,-n),b=l.x,c=l.y,l=p(i,j,-n),i=l.x,j=l.y;var q=(N.cos(O/180*f),N.sin(O/180*f),(b-i)/2),r=(c-j)/2,s=q*q/(d*d)+r*r/(e*e);s>1&&(s=N.sqrt(s),d=s*d,e=s*e);var t=d*d,u=e*e,v=(g==h?-1:1)*N.sqrt(S((t*u-t*r*r-u*q*q)/(t*r*r+u*q*q))),w=v*d*r/e+(b+i)/2,x=v*-e*q/d+(c+j)/2,y=N.asin(((c-x)/e).toFixed(9)),z=N.asin(((j-x)/e).toFixed(9));y=w>b?O-y:y,z=w>i?O-z:z,0>y&&(y=2*O+y),0>z&&(z=2*O+z),h&&y>z&&(y-=2*O),!h&&z>y&&(z-=2*O)}var A=z-y;if(S(A)>m){var B=z,D=i,E=j;z=y+m*(h&&z>y?1:-1),i=w+d*N.cos(z),j=x+e*N.sin(z),o=C(i,j,d,e,f,0,h,D,E,[z,B,w,x])}A=z-y;var F=N.cos(y),G=N.sin(y),H=N.cos(z),I=N.sin(z),J=N.tan(A/4),K=4/3*d*J,L=4/3*e*J,M=[b,c],P=[b+K*G,c-L*F],Q=[i+K*I,j-L*H],R=[i,j];if(P[0]=2*M[0]-P[0],P[1]=2*M[1]-P[1],k)return[P,Q,R].concat(o);o=[P,Q,R].concat(o).join().split(",");for(var T=[],U=0,V=o.length;V>U;U++)T[U]=U%2?p(o[U-1],o[U],n).y:p(o[U],o[U+1],n).x;return T}function D(a,b,c,d,e,f,g,h){for(var i,j,k,l,m,n,o,p,q=[],r=[[],[]],s=0;2>s;++s)if(0==s?(j=6*a-12*c+6*e,i=-3*a+9*c-9*e+3*g,k=3*c-3*a):(j=6*b-12*d+6*f,i=-3*b+9*d-9*f+3*h,k=3*d-3*b),S(i)<1e-12){if(S(j)<1e-12)continue;l=-k/j,l>0&&1>l&&q.push(l)}else o=j*j-4*k*i,p=N.sqrt(o),0>o||(m=(-j+p)/(2*i),m>0&&1>m&&q.push(m),n=(-j-p)/(2*i),n>0&&1>n&&q.push(n));for(var t,u=q.length,v=u;u--;)l=q[u],t=1-l,r[0][u]=t*t*t*a+3*t*t*l*c+3*t*l*l*e+l*l*l*g,r[1][u]=t*t*t*b+3*t*t*l*d+3*t*l*l*f+l*l*l*h;return r[0][v]=a,r[1][v]=b,r[0][v+1]=g,r[1][v+1]=h,r[0].length=r[1].length=v+2,{min:{x:P.apply(0,r[0]),y:P.apply(0,r[1])},max:{x:Q.apply(0,r[0]),y:Q.apply(0,r[1])}}}function E(a,b){var d=!b&&c(a);if(!b&&d.curve)return f(d.curve);for(var e=z(a),g=b&&z(b),h={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},i={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},j=(function(a,b,c){var d,e;if(!a)return["C",b.x,b.y,b.x,b.y,b.x,b.y];switch(!(a[0]in{T:1,Q:1})&&(b.qx=b.qy=null),a[0]){case"M":b.X=a[1],b.Y=a[2];break;case"A":a=["C"].concat(C.apply(0,[b.x,b.y].concat(a.slice(1))));break;case"S":"C"==c||"S"==c?(d=2*b.x-b.bx,e=2*b.y-b.by):(d=b.x,e=b.y),a=["C",d,e].concat(a.slice(1));break;case"T":"Q"==c||"T"==c?(b.qx=2*b.x-b.qx,b.qy=2*b.y-b.qy):(b.qx=b.x,b.qy=b.y),a=["C"].concat(B(b.x,b.y,b.qx,b.qy,a[1],a[2]));break;case"Q":b.qx=a[1],b.qy=a[2],a=["C"].concat(B(b.x,b.y,a[1],a[2],a[3],a[4]));break;case"L":a=["C"].concat(A(b.x,b.y,a[1],a[2]));break;case"H":a=["C"].concat(A(b.x,b.y,a[1],b.y));break;case"V":a=["C"].concat(A(b.x,b.y,b.x,a[1]));break;case"Z":a=["C"].concat(A(b.x,b.y,b.X,b.Y))}return a}),k=function(a,b){if(a[b].length>7){a[b].shift();for(var c=a[b];c.length;)m[b]="A",g&&(n[b]="A"),a.splice(b++,0,["C"].concat(c.splice(0,6)));a.splice(b,1),r=Q(e.length,g&&g.length||0)}},l=function(a,b,c,d,f){a&&b&&"M"==a[f][0]&&"M"!=b[f][0]&&(b.splice(f,0,["M",d.x,d.y]),c.bx=0,c.by=0,c.x=a[f][1],c.y=a[f][2],r=Q(e.length,g&&g.length||0))},m=[],n=[],o="",p="",q=0,r=Q(e.length,g&&g.length||0);r>q;q++){e[q]&&(o=e[q][0]),"C"!=o&&(m[q]=o,q&&(p=m[q-1])),e[q]=j(e[q],h,p),"A"!=m[q]&&"C"==o&&(m[q]="C"),k(e,q),g&&(g[q]&&(o=g[q][0]),"C"!=o&&(n[q]=o,q&&(p=n[q-1])),g[q]=j(g[q],i,p),"A"!=n[q]&&"C"==o&&(n[q]="C"),k(g,q)),l(e,g,h,i,q),l(g,e,i,h,q);var s=e[q],t=g&&g[q],u=s.length,v=g&&t.length;h.x=s[u-2],h.y=s[u-1],h.bx=M(s[u-4])||h.x,h.by=M(s[u-3])||h.y,i.bx=g&&(M(t[v-4])||i.x),i.by=g&&(M(t[v-3])||i.y),i.x=g&&t[v-2],i.y=g&&t[v-1]}return g||(d.curve=f(e)),g?[e,g]:e}function F(a,b){if(!b)return a;var c,d,e,f,g,h,i;for(a=E(a),e=0,g=a.length;g>e;e++)for(i=a[e],f=1,h=i.length;h>f;f+=2)c=b.x(i[f],i[f+1]),d=b.y(i[f],i[f+1]),i[f]=c,i[f+1]=d;return a}function G(a,b){for(var c=[],d=0,e=a.length;e-2*!b>d;d+=2){var f=[{x:+a[d-2],y:+a[d-1]},{x:+a[d],y:+a[d+1]},{x:+a[d+2],y:+a[d+3]},{x:+a[d+4],y:+a[d+5]}];b?d?e-4==d?f[3]={x:+a[0],y:+a[1]}:e-2==d&&(f[2]={x:+a[0],y:+a[1]},f[3]={x:+a[2],y:+a[3]}):f[0]={x:+a[e-2],y:+a[e-1]}:e-4==d?f[3]=f[2]:d||(f[0]={x:+a[d],y:+a[d+1]}),c.push(["C",(-f[0].x+6*f[1].x+f[2].x)/6,(-f[0].y+6*f[1].y+f[2].y)/6,(f[1].x+6*f[2].x-f[3].x)/6,(f[1].y+6*f[2].y-f[3].y)/6,f[2].x,f[2].y])}return c}var H=b.prototype,I=a.is,J=a._.clone,K="hasOwnProperty",L=/,?([a-z]),?/gi,M=parseFloat,N=Math,O=N.PI,P=N.min,Q=N.max,R=N.pow,S=N.abs,T=h(1),U=h(),V=h(0,1),W=a._unit2px,X={path:function(a){return a.attr("path")},circle:function(a){var b=W(a);return x(b.cx,b.cy,b.r)},ellipse:function(a){var b=W(a);return x(b.cx||0,b.cy||0,b.rx,b.ry)},rect:function(a){var b=W(a);return w(b.x||0,b.y||0,b.width,b.height,b.rx,b.ry)},image:function(a){var b=W(a);return w(b.x||0,b.y||0,b.width,b.height)},line:function(a){return"M"+[a.attr("x1")||0,a.attr("y1")||0,a.attr("x2"),a.attr("y2")]},polyline:function(a){return"M"+a.attr("points")},polygon:function(a){return"M"+a.attr("points")+"z"},deflt:function(a){var b=a.node.getBBox();return w(b.x,b.y,b.width,b.height)}};a.path=c,a.path.getTotalLength=T,a.path.getPointAtLength=U,a.path.getSubpath=function(a,b,c){if(this.getTotalLength(a)-c<1e-6)return V(a,b).end;var d=V(a,c,1);return b?V(d,b).end:d},H.getTotalLength=function(){return this.node.getTotalLength?this.node.getTotalLength():void 0},H.getPointAtLength=function(a){return U(this.attr("d"),a)},H.getSubpath=function(b,c){return a.path.getSubpath(this.attr("d"),b,c)},a._.box=d,a.path.findDotsAtSegment=i,a.path.bezierBBox=j,a.path.isPointInsideBBox=k,a.closest=function(b,c,e,f){for(var g=100,h=d(b-g/2,c-g/2,g,g),i=[],j=e[0].hasOwnProperty("x")?function(a){return{x:e[a].x,y:e[a].y}}:function(a){return{x:e[a],y:f[a]}},l=0;1e6>=g&&!l;){for(var m=0,n=e.length;n>m;m++){var o=j(m);if(k(h,o.x,o.y)){l++,i.push(o);break}}l||(g*=2,h=d(b-g/2,c-g/2,g,g))}if(1e6!=g){var p,q=1/0;for(m=0,n=i.length;n>m;m++){var r=a.len(b,c,i[m].x,i[m].y);q>r&&(q=r,i[m].len=r,p=i[m])}return p}},a.path.isBBoxIntersect=l,a.path.intersection=r,a.path.intersectionNumber=s,a.path.isPointInside=u,a.path.getBBox=v,a.path.get=X,a.path.toRelative=y,a.path.toAbsolute=z,a.path.toCubic=E,a.path.map=F,a.path.toString=e,a.path.clone=f}),d.plugin(function(a){var d=Math.max,e=Math.min,f=function(a){if(this.items=[],this.bindings={},this.length=0,this.type="set",a)for(var b=0,c=a.length;c>b;b++)a[b]&&(this[this.items.length]=this.items[this.items.length]=a[b],this.length++)},g=f.prototype;g.push=function(){for(var a,b,c=0,d=arguments.length;d>c;c++)a=arguments[c],a&&(b=this.items.length,this[b]=this.items[b]=a,this.length++);return this},g.pop=function(){return this.length&&delete this[this.length--],this.items.pop()},g.forEach=function(a,b){for(var c=0,d=this.items.length;d>c;c++)if(a.call(b,this.items[c],c)===!1)return this;return this},g.animate=function(d,e,f,g){"function"!=typeof f||f.length||(g=f,f=c.linear),d instanceof a._.Animation&&(g=d.callback,f=d.easing,e=f.dur,d=d.attr);var h=arguments;if(a.is(d,"array")&&a.is(h[h.length-1],"array"))var i=!0;var j,k=function(){j?this.b=j:j=this.b},l=0,m=this,n=g&&function(){++l==m.length&&g.call(this)
};return this.forEach(function(a,c){b.once("snap.animcreated."+a.id,k),i?h[c]&&a.animate.apply(a,h[c]):a.animate(d,e,f,n)})},g.remove=function(){for(;this.length;)this.pop().remove();return this},g.bind=function(a,b,c){var d={};if("function"==typeof b)this.bindings[a]=b;else{var e=c||a;this.bindings[a]=function(a){d[e]=a,b.attr(d)}}return this},g.attr=function(a){var b={};for(var c in a)this.bindings[c]?this.bindings[c](a[c]):b[c]=a[c];for(var d=0,e=this.items.length;e>d;d++)this.items[d].attr(b);return this},g.clear=function(){for(;this.length;)this.pop()},g.splice=function(a,b){a=0>a?d(this.length+a,0):a,b=d(0,e(this.length-a,b));var c,g=[],h=[],i=[];for(c=2;c<arguments.length;c++)i.push(arguments[c]);for(c=0;b>c;c++)h.push(this[a+c]);for(;c<this.length-a;c++)g.push(this[a+c]);var j=i.length;for(c=0;c<j+g.length;c++)this.items[a+c]=this[a+c]=j>c?i[c]:g[c-j];for(c=this.items.length=this.length-=b-j;this[c];)delete this[c++];return new f(h)},g.exclude=function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]==a)return this.splice(b,1),!0;return!1},g.insertAfter=function(a){for(var b=this.items.length;b--;)this.items[b].insertAfter(a);return this},g.getBBox=function(){for(var a=[],b=[],c=[],f=[],g=this.items.length;g--;)if(!this.items[g].removed){var h=this.items[g].getBBox();a.push(h.x),b.push(h.y),c.push(h.x+h.width),f.push(h.y+h.height)}return a=e.apply(0,a),b=e.apply(0,b),c=d.apply(0,c),f=d.apply(0,f),{x:a,y:b,x2:c,y2:f,width:c-a,height:f-b,cx:a+(c-a)/2,cy:b+(f-b)/2}},g.clone=function(a){a=new f;for(var b=0,c=this.items.length;c>b;b++)a.push(this.items[b].clone());return a},g.toString=function(){return"Snap‘s set"},g.type="set",a.Set=f,a.set=function(){var a=new f;return arguments.length&&a.push.apply(a,Array.prototype.slice.call(arguments,0)),a}}),d.plugin(function(a,c){function d(a){var b=a[0];switch(b.toLowerCase()){case"t":return[b,0,0];case"m":return[b,1,0,0,1,0,0];case"r":return 4==a.length?[b,0,a[2],a[3]]:[b,0];case"s":return 5==a.length?[b,1,1,a[3],a[4]]:3==a.length?[b,1,1]:[b,1]}}function e(b,c,e){c=p(c).replace(/\.{3}|\u2026/g,b),b=a.parseTransformString(b)||[],c=a.parseTransformString(c)||[];for(var f,g,h,i,l=Math.max(b.length,c.length),m=[],n=[],o=0;l>o;o++){if(h=b[o]||d(c[o]),i=c[o]||d(h),h[0]!=i[0]||"r"==h[0].toLowerCase()&&(h[2]!=i[2]||h[3]!=i[3])||"s"==h[0].toLowerCase()&&(h[3]!=i[3]||h[4]!=i[4])){b=a._.transform2matrix(b,e()),c=a._.transform2matrix(c,e()),m=[["m",b.a,b.b,b.c,b.d,b.e,b.f]],n=[["m",c.a,c.b,c.c,c.d,c.e,c.f]];break}for(m[o]=[],n[o]=[],f=0,g=Math.max(h.length,i.length);g>f;f++)f in h&&(m[o][f]=h[f]),f in i&&(n[o][f]=i[f])}return{from:k(m),to:k(n),f:j(m)}}function f(a){return a}function g(a){return function(b){return+b.toFixed(3)+a}}function h(a){return a.join(" ")}function i(b){return a.rgb(b[0],b[1],b[2])}function j(a){var b,c,d,e,f,g,h=0,i=[];for(b=0,c=a.length;c>b;b++){for(f="[",g=['"'+a[b][0]+'"'],d=1,e=a[b].length;e>d;d++)g[d]="val["+h++ +"]";f+=g+"]",i[b]=f}return Function("val","return Snap.path.toString.call(["+i+"])")}function k(a){for(var b=[],c=0,d=a.length;d>c;c++)for(var e=1,f=a[c].length;f>e;e++)b.push(a[c][e]);return b}function l(a){return isFinite(parseFloat(a))}function m(b,c){return a.is(b,"array")&&a.is(c,"array")?b.toString()==c.toString():!1}var n={},o=/[a-z]+$/i,p=String;n.stroke=n.fill="colour",c.prototype.equal=function(a,c){return b("snap.util.equal",this,a,c).firstDefined()},b.on("snap.util.equal",function(b,c){var d,q,r=p(this.attr(b)||""),s=this;if(l(r)&&l(c))return{from:parseFloat(r),to:parseFloat(c),f:f};if("colour"==n[b])return d=a.color(r),q=a.color(c),{from:[d.r,d.g,d.b,d.opacity],to:[q.r,q.g,q.b,q.opacity],f:i};if("viewBox"==b)return d=this.attr(b).vb.split(" ").map(Number),q=c.split(" ").map(Number),{from:d,to:q,f:h};if("transform"==b||"gradientTransform"==b||"patternTransform"==b)return c instanceof a.Matrix&&(c=c.toTransformString()),a._.rgTransform.test(c)||(c=a._.svgTransform2string(c)),e(r,c,function(){return s.getBBox(1)});if("d"==b||"path"==b)return d=a.path.toCubic(r,c),{from:k(d[0]),to:k(d[1]),f:j(d[0])};if("points"==b)return d=p(r).split(a._.separator),q=p(c).split(a._.separator),{from:d,to:q,f:function(a){return a}};var t=r.match(o),u=p(c).match(o);return t&&m(t,u)?{from:parseFloat(r),to:parseFloat(c),f:g(t)}:{from:this.asPX(b),to:this.asPX(b,c),f:f}})}),d.plugin(function(a,c,d,e){for(var f=c.prototype,g="hasOwnProperty",h=("createTouch"in e.doc),i=["click","dblclick","mousedown","mousemove","mouseout","mouseover","mouseup","touchstart","touchmove","touchend","touchcancel"],j={mousedown:"touchstart",mousemove:"touchmove",mouseup:"touchend"},k=(function(a,b){var c="y"==a?"scrollTop":"scrollLeft",d=b&&b.node?b.node.ownerDocument:e.doc;return d[c in d.documentElement?"documentElement":"body"][c]}),l=function(){return this.originalEvent.preventDefault()},m=function(){return this.originalEvent.stopPropagation()},n=function(a,b,c,d){var e=h&&j[b]?j[b]:b,f=function(e){var f=k("y",d),i=k("x",d);if(h&&j[g](b))for(var n=0,o=e.targetTouches&&e.targetTouches.length;o>n;n++)if(e.targetTouches[n].target==a||a.contains(e.targetTouches[n].target)){var p=e;e=e.targetTouches[n],e.originalEvent=p,e.preventDefault=l,e.stopPropagation=m;break}var q=e.clientX+i,r=e.clientY+f;return c.call(d,e,q,r)};return b!==e&&a.addEventListener(b,f,!1),a.addEventListener(e,f,!1),function(){return b!==e&&a.removeEventListener(b,f,!1),a.removeEventListener(e,f,!1),!0}},o=[],p=function(a){for(var c,d=a.clientX,e=a.clientY,f=k("y"),g=k("x"),i=o.length;i--;){if(c=o[i],h){for(var j,l=a.touches&&a.touches.length;l--;)if(j=a.touches[l],j.identifier==c.el._drag.id||c.el.node.contains(j.target)){d=j.clientX,e=j.clientY,(a.originalEvent?a.originalEvent:a).preventDefault();break}}else a.preventDefault();{var m=c.el.node;m.nextSibling,m.parentNode,m.style.display}d+=g,e+=f,b("snap.drag.move."+c.el.id,c.move_scope||c.el,d-c.el._drag.x,e-c.el._drag.y,d,e,a)}},q=function(c){a.unmousemove(p).unmouseup(q);for(var d,e=o.length;e--;)d=o[e],d.el._drag={},b("snap.drag.end."+d.el.id,d.end_scope||d.start_scope||d.move_scope||d.el,c),b.off("snap.drag.*."+d.el.id);o=[]},r=i.length;r--;)!function(b){a[b]=f[b]=function(c,d){if(a.is(c,"function"))this.events=this.events||[],this.events.push({name:b,f:c,unbind:n(this.node||document,b,c,d||this)});else for(var e=0,f=this.events.length;f>e;e++)if(this.events[e].name==b)try{this.events[e].f.call(this)}catch(g){}return this},a["un"+b]=f["un"+b]=function(a){for(var c=this.events||[],d=c.length;d--;)if(c[d].name==b&&(c[d].f==a||!a))return c[d].unbind(),c.splice(d,1),!c.length&&delete this.events,this;return this}}(i[r]);f.hover=function(a,b,c,d){return this.mouseover(a,c).mouseout(b,d||c)},f.unhover=function(a,b){return this.unmouseover(a).unmouseout(b)};var s=[];f.drag=function(c,d,e,f,g,h){function i(i,j,l){(i.originalEvent||i).preventDefault(),k._drag.x=j,k._drag.y=l,k._drag.id=i.identifier,!o.length&&a.mousemove(p).mouseup(q),o.push({el:k,move_scope:f,start_scope:g,end_scope:h}),d&&b.on("snap.drag.start."+k.id,d),c&&b.on("snap.drag.move."+k.id,c),e&&b.on("snap.drag.end."+k.id,e),b("snap.drag.start."+k.id,g||f||k,j,l,i)}function j(a,c,d){b("snap.draginit."+k.id,k,a,c,d)}var k=this;if(!arguments.length){var l;return k.drag(function(a,b){this.attr({transform:l+(l?"T":"t")+[a,b]})},function(){l=this.transform().local})}return b.on("snap.draginit."+k.id,i),k._drag={},s.push({el:k,start:i,init:j}),k.mousedown(j),k},f.undrag=function(){for(var c=s.length;c--;)s[c].el==this&&(this.unmousedown(s[c].init),s.splice(c,1),b.unbind("snap.drag.*."+this.id),b.unbind("snap.draginit."+this.id));return!s.length&&a.unmousemove(p).unmouseup(q),this}}),d.plugin(function(a,c,d){var e=(c.prototype,d.prototype),f=/^\s*url\((.+)\)/,g=String,h=a._.$;a.filter={},e.filter=function(b){var d=this;"svg"!=d.type&&(d=d.paper);var e=a.parse(g(b)),f=a._.id(),i=(d.node.offsetWidth,d.node.offsetHeight,h("filter"));return h(i,{id:f,filterUnits:"userSpaceOnUse"}),i.appendChild(e.node),d.defs.appendChild(i),new c(i)},b.on("snap.util.getattr.filter",function(){b.stop();var c=h(this.node,"filter");if(c){var d=g(c).match(f);return d&&a.select(d[1])}}),b.on("snap.util.attr.filter",function(d){if(d instanceof c&&"filter"==d.type){b.stop();var e=d.node.id;e||(h(d.node,{id:d.id}),e=d.id),h(this.node,{filter:a.url(e)})}d&&"none"!=d||(b.stop(),this.node.removeAttribute("filter"))}),a.filter.blur=function(b,c){null==b&&(b=2);var d=null==c?b:[b,c];return a.format('<feGaussianBlur stdDeviation="{def}"/>',{def:d})},a.filter.blur.toString=function(){return this()},a.filter.shadow=function(b,c,d,e,f){return"string"==typeof d&&(e=d,f=e,d=4),"string"!=typeof e&&(f=e,e="#000"),e=e||"#000",null==d&&(d=4),null==f&&(f=1),null==b&&(b=0,c=2),null==c&&(c=b),e=a.color(e),a.format('<feGaussianBlur in="SourceAlpha" stdDeviation="{blur}"/><feOffset dx="{dx}" dy="{dy}" result="offsetblur"/><feFlood flood-color="{color}"/><feComposite in2="offsetblur" operator="in"/><feComponentTransfer><feFuncA type="linear" slope="{opacity}"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>',{color:e,dx:b,dy:c,blur:d,opacity:f})},a.filter.shadow.toString=function(){return this()},a.filter.grayscale=function(b){return null==b&&(b=1),a.format('<feColorMatrix type="matrix" values="{a} {b} {c} 0 0 {d} {e} {f} 0 0 {g} {b} {h} 0 0 0 0 0 1 0"/>',{a:.2126+.7874*(1-b),b:.7152-.7152*(1-b),c:.0722-.0722*(1-b),d:.2126-.2126*(1-b),e:.7152+.2848*(1-b),f:.0722-.0722*(1-b),g:.2126-.2126*(1-b),h:.0722+.9278*(1-b)})},a.filter.grayscale.toString=function(){return this()},a.filter.sepia=function(b){return null==b&&(b=1),a.format('<feColorMatrix type="matrix" values="{a} {b} {c} 0 0 {d} {e} {f} 0 0 {g} {h} {i} 0 0 0 0 0 1 0"/>',{a:.393+.607*(1-b),b:.769-.769*(1-b),c:.189-.189*(1-b),d:.349-.349*(1-b),e:.686+.314*(1-b),f:.168-.168*(1-b),g:.272-.272*(1-b),h:.534-.534*(1-b),i:.131+.869*(1-b)})},a.filter.sepia.toString=function(){return this()},a.filter.saturate=function(b){return null==b&&(b=1),a.format('<feColorMatrix type="saturate" values="{amount}"/>',{amount:1-b})},a.filter.saturate.toString=function(){return this()},a.filter.hueRotate=function(b){return b=b||0,a.format('<feColorMatrix type="hueRotate" values="{angle}"/>',{angle:b})},a.filter.hueRotate.toString=function(){return this()},a.filter.invert=function(b){return null==b&&(b=1),a.format('<feComponentTransfer><feFuncR type="table" tableValues="{amount} {amount2}"/><feFuncG type="table" tableValues="{amount} {amount2}"/><feFuncB type="table" tableValues="{amount} {amount2}"/></feComponentTransfer>',{amount:b,amount2:1-b})},a.filter.invert.toString=function(){return this()},a.filter.brightness=function(b){return null==b&&(b=1),a.format('<feComponentTransfer><feFuncR type="linear" slope="{amount}"/><feFuncG type="linear" slope="{amount}"/><feFuncB type="linear" slope="{amount}"/></feComponentTransfer>',{amount:b})},a.filter.brightness.toString=function(){return this()},a.filter.contrast=function(b){return null==b&&(b=1),a.format('<feComponentTransfer><feFuncR type="linear" slope="{amount}" intercept="{amount2}"/><feFuncG type="linear" slope="{amount}" intercept="{amount2}"/><feFuncB type="linear" slope="{amount}" intercept="{amount2}"/></feComponentTransfer>',{amount:b,amount2:.5-b/2})},a.filter.contrast.toString=function(){return this()}}),d.plugin(function(a,b){var c=a._.box,d=a.is,e=/^[^a-z]*([tbmlrc])/i,f=function(){return"T"+this.dx+","+this.dy};b.prototype.getAlign=function(a,b){null==b&&d(a,"string")&&(b=a,a=null),a=a||this.paper;var g=a.getBBox?a.getBBox():c(a),h=this.getBBox(),i={};switch(b=b&&b.match(e),b=b?b[1].toLowerCase():"c"){case"t":i.dx=0,i.dy=g.y-h.y;break;case"b":i.dx=0,i.dy=g.y2-h.y2;break;case"m":i.dx=0,i.dy=g.cy-h.cy;break;case"l":i.dx=g.x-h.x,i.dy=0;break;case"r":i.dx=g.x2-h.x2,i.dy=0;break;default:i.dx=g.cx-h.cx,i.dy=0}return i.toString=f,i},b.prototype.align=function(a,b){return this.transform("..."+this.getAlign(a,b))}}),d});

/**
 * 图片辨色
 * @param url
 * @param value 阀值 越小越精准
 * @param maxColors 最多颜色
 * @param callback
 * @constructor
 */
function BitmapPalettes(url, value, maxColors, callback){
    var g_value = value || 0.012;
    function findMatch(b, d) {
        for (var c = 0; c < b.length; c++) {
            if (d(b[c])) {
                return b[c];
            }
        }
        return null;
    }
    function ColorUtils() {
        this.rgbToXyz = function(b) {
            var c = b[0] / 255,
                g = b[1] / 255;
            b = b[2] / 255;
            c = 0.04045 < c ? Math.pow((c + 0.055) / 1.055, 2.4) : c / 12.92;
            g = 0.04045 < g ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
            b = 0.04045 < b ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
            c *= 100;
            g *= 100;
            b *= 100;
            return [0.4124 * c + 0.3576 * g + 0.1805 * b, 0.2126 * c + 0.7152 * g + 0.0722 * b, 0.0193 * c + 0.1192 * g + 0.9505 * b];
        };
        this.xyzToLab = function(b) {
            var c = b[0] / 95.047,
                g = b[1] / 100;
            b = b[2] / 108.883;
            c = 0.008856 < c ? Math.pow(c, 1 / 3) : 7.787 * c + 16 / 116;
            g = 0.008856 < g ? Math.pow(g, 1 / 3) : 7.787 * g + 16 / 116;
            b = 0.008856 < b ? Math.pow(b, 1 / 3) : 7.787 * b + 16 / 116;
            return [116 * g - 16, 500 * (c - g), 200 * (g - b)];
        };
        this.labToXyz = function(b) {
            var c = (b[0] + 16) / 116,
                g = b[1] / 500 + c;
            b = c - b[2] / 200;
            var k = Math.pow(c, 3),
                h = Math.pow(g, 3),
                f = Math.pow(b, 3);
            return [95.047 * (0.008856 < h ? h : (g - 16 / 116) / 7.787), 100 * (0.008856 < k ? k : (c - 16 / 116) / 7.787), 108.883 * (0.008856 < f ? f : (b - 16 / 116) / 7.787)];
        };
        this.xyzToRgb = function(b) {
            var c = b[0] / 100,
                g = b[1] / 100,
                k = b[2] / 100;
            b = 3.2406 * c + -1.5372 * g + -0.4986 * k;
            var h = -0.9689 * c + 1.8758 * g + 0.0415 * k,
                c = 0.0557 * c + -0.204 * g + 1.057 * k;
            b = 0.0031308 < b ? 1.055 * Math.pow(b, 1 / 2.4) - 0.055 : 12.92 * b;
            h = 0.0031308 < h ? 1.055 * Math.pow(h, 1 / 2.4) - 0.055 : 12.92 * h;
            c = 0.0031308 < c ? 1.055 * Math.pow(c, 1 / 2.4) - 0.055 : 12.92 * c;
            return [Math.round(255 * b), Math.round(255 * h), Math.round(255 * c)];
        };
        this.labToRgb = function(b) {
            b = this.labToXyz(b);
            return this.xyzToRgb(b);
        };
        this.rgbToLab = function(b) {
            b = this.rgbToXyz(b);
            return this.xyzToLab(b);
        };
        this.ciede2000 = function(b, c) {
            var g = Math.sqrt,
                k = Math.pow,
                h = Math.cos,
                f = Math.atan2,
                m = Math.sin,
                q = Math.abs,
                n = Math.exp,
                r = Math.PI,
                t = b[0],
                p = b[1],
                e = b[2],
                u = c[0],
                s = c[1],
                w = c[2],
                v = g(k(p, 2) + k(e, 2)),
                x = g(k(s, 2) + k(w, 2)),
                B = (v + x) / 2,
                B = 0.5 * (1 - g(k(B, 7) / (k(B, 7) + k(25, 7)))),
                p = (1 + B) * p,
                y = (1 + B) * s,
                s = g(k(p, 2) + k(e, 2)),
                B = g(k(y, 2) + k(w, 2)),
                D = function(b, c) {
                    if (0 === b && 0 === c) {
                        return 0;
                    }
                    var e;
                    e = f(b, c) * (180 / r);
                    return 0 <= e ? e : e + 360;
                }, V = D(e, p),
                y = D(w, y),
                w = u - t,
                e = B - s,
                p = function(b, c, e, f) {
                    if (0 === b * c) {
                        return 0;
                    }
                    if (180 >= q(f - e)) {
                        return f - e;
                    }
                    if (180 < f - e) {
                        return f - e - 360;
                    }
                    if (-180 > f - e) {
                        return f - e + 360;
                    }
                    throw Error();
                }(v, x, V, y),
                p = 2 * g(s * B) * m(r / 180 * p / 2),
                t = (t + u) / 2,
                u = (s + B) / 2,
                v = function(b, c, e, f) {
                    if (0 === b * c) {
                        return e + f;
                    }
                    if (180 >= q(e - f)) {
                        return (e + f) / 2;
                    }
                    if (180 < q(e - f) && 360 > e + f) {
                        return (e + f + 360) / 2;
                    }
                    if (180 < q(e - f) && 360 <= e + f) {
                        return (e + f - 360) / 2;
                    }
                    throw Error();
                }(v, x, V, y),
                h = 1 - 0.17 * h(r / 180 * (v - 30)) + 0.24 * h(r / 180 * v * 2) + 0.32 * h(r / 180 * (3 * v + 6)) - 0.2 * h(r / 180 * (4 * v - 63)),
                n = 30 * n(-k((v - 275) / 25, 2)),
                v = g(k(u, 7) / (k(u, 7) + k(25, 7))),
                x = 1 + 0.015 * k(t - 50, 2) / g(20 + k(t - 50, 2)),
                t = 1 + 0.045 * u,
                h = 1 + 0.015 * u * h,
                m = -2 * v * m(r / 180 * n * 2);
            return g(k(w / (1 * x), 2) + k(e / (1 * t), 2) + k(p / (1 * h), 2) + e / (1 * t) * m * (p / (1 * h)));
        };
    };
    var colorUtils = new ColorUtils;
    function SimpleQuant(b) {
        function d(b, c) {
            var d, f, m, q, n, r;
            switch (Object.prototype.toString.call(b).slice(8, -1)) {
                case "HTMLImageElement":
                    d = document.createElement("canvas"), d.width = b.naturalWidth, d.height = b.naturalHeight, f = d.getContext("2d"), f.drawImage(b, 0, 0);
                case "HTMLCanvasElement":
                    d = d || b, f = f || d.getContext("2d");
                case "CanvasRenderingContext2D":
                    f = f || b, d = d || f.canvas, m = f.getImageData(0, 0, d.width, d.height);
                case "ImageData":
                    m = m || b, c = m.width, q = "CanvasPixelArray" === Object.prototype.toString.call(m.data).slice(8, -1) ? new Uint8Array(m.data) : m.data;
                case "Array":
                    q = q || new Uint8Array(b);
                case "Uint8Array":
                    ;
                case "Uint8ClampedArray":
                    q = q || b, n = new Uint32Array(q.buffer);
                case "Uint32Array":
                    n = n || b, q = q || new Uint8Array(n.buffer), c = c || n.length, r = n.length / c;
            }
            return {
                can: d,
                ctx: f,
                imgd: m,
                buf8: q,
                buf32: n,
                width: c,
                height: r
            };
        }
        var c = colorUtils.ciede2000;
        this.getPalette = function(g) {
            c = colorUtils.ciede2000;
            var k = document.createElement("canvas");
            k.width = 128;
            k.height = b.naturalHeight * k.width / b.naturalWidth;
            k.getContext("2d").drawImage(b, 0, 0, k.width, k.height);
            for (var k = d(k).buf32, h = k.length, f = {
                colors: []
            }, m = 0; m < h; m++) {
                var q = k[m],
                    q = [q & 255, (q & 65280) >> 8, (q & 16711680) >> 16, (q & 4278190080) >> 24];
                if (0 !== q[3]) {
                    if(q[0]==0&&q[1]==0){
                        var a;
                    }
                    var q = colorUtils.rgbToLab(q),
                        n = this.getNearest(f.colors, q),
                        r = null;

                    if(n.difference > g) {
                        r = {
                            colors: [q]
                        };
                        this.getRepresentativeColor(r);
                        f.colors.push(r)
                    }else {
                        r = f.colors[n.index];
                        r.colors.push(q);
                        this.getRepresentativeColor(r)
                    };

                }
            }
            return f;
        };
        this.getRepresentativeColor = function(b) {
            var c = b.colors[b.colors.length - 1];
            b.labInfo || (b.labInfo = {}, b.lab = c);
            b.labInfo[c] || (b.labInfo[c] = 0);
            b.labInfo[c]++;
            b.labInfo[c] > b.labInfo[b.lab] && (b.lab = c);
        };
        this.reducePaletteForced = function(b, c) {
            c = c || 50;
            b.colors.sort(function(a,b){
                return b.colors.length - a.colors.length;
            });
            for (var d = 0, f = b.colors.slice(0), m = 0; m < f.length; m++) {
                d += f[m].colors.length;
            }
            for (; f.length > c;) {
                for (var q = [], m = 0; m < f.length; m++) {

                    var n = f[m],
                        r = n.colors.length / d;

                    n = this.getNearest(f, n.lab, m);
                    q[m] = {
                        index: m,
                        closest: n,
                        value: r * n.difference
                    };
                }
                q.sort(function(b, c) {
                    return b.value - c.value;
                });
                m = q[0];
                this.mergePaletteColors(m.closest.value, f[m.index]);
                f.splice(m.index, 1);
            }
            var ff = [];
            for(var i=0;i< b.colors.length;i++){
                if(f[i] && (f[i].colors.length / d) > g_value){
                    ff.push(f[i]);
                }

            }
            return ff;
        };
        this.mergePaletteColors = function(b, c) {
            for (var d = 0; d < c.colors.length; d++) {
                b.colors.push(c.colors[d]), this.getRepresentativeColor(b);
            }
        };
        this.reduceToPalette = function(c) {
            var k = document.createElement("canvas");
            k.width = b.naturalWidth;
            k.height = b.naturalHeight;
            var h = k.width/10,
                f = k.height/10,
                m = k.getContext("2d");
            m.drawImage(b, 0, 0, h, f);
            m.imageSmoothingEnabled = m.mozImageSmoothingEnabled = m.webkitImageSmoothingEnabled = !1;
            for (var q = m.getImageData(0, 0, h, f), n = d(k).buf32, r = new ArrayBuffer(q.data.length), t = new Uint8ClampedArray(r), r = new Uint32Array(r), p = {}, e = 0; e < f; ++e) {
                for (var u = 0; u < h; ++u) {
                    var s = e * h + u,
                        w = n[s];
                    if (p[w]) {
                        r[s] = p[w];
                    } else {
                        var v = (w & 4278190080) >> 24,
                            x = colorUtils.rgbToXyz([w & 255, (w & 65280) >> 8, (w & 16711680) >> 16]),
                            x = colorUtils.xyzToLab(x),
                            x = this.getNearest(c, x).value.lab,
                            x = colorUtils.labToXyz(x),
                            x = colorUtils.xyzToRgb(x),
                            v = v << 24 | x[2] << 16 | x[1] << 8 | x[0];
                        p[w] = v;
                        r[s] = v;
                    }
                }
            }
            q.data.set(t);
            m.putImageData(q, 0, 0);
            return k;
        };
        this.getNearest = function(b, d, h) {
            for (var f = 1E5, m = -1, q = null, n = 0; n < b.length; n++) {
                if (n !== h) {
                    var r = c(b[n].lab, d);
                    r < f && (f = r, m = n, q = b[n]);
                    if (0 === r) {
                        break;
                    }
                }
            }
            return {
                difference: f,
                index: m,
                value: q
            };
        };
    };
    function AQBitmapPalettes(b) {
        function m(b) {
            if ("HTMLCanvasElement" === p.toString().slice(8, -1)) {
                var c = !1,
                    e = new Image;
                e.onload = function() {
                    b && !c && (b(), c = !0);
                };
                e.src = p.toDataURL();
                e.naturalWidth && b && !c && (setTimeout(b), c = !0);
                p = e;
            }
        }
        function q(b) {
            for (var c = [], e = 0; e < b.length; e++) {
                var d = colorUtils.labToRgb(b[e].lab);
                c.push(d);
            }
            return c;
        }
        function n(b) {
            return 2 == b.length ? b : "0" + b;
        }
        function r(b) {
            for (var c = [], e = 0; e < b.length; e++) {
                var d = n(b[e][0].toString(16)),
                    d = d + n(b[e][1].toString(16)),
                    d = d + n(b[e][2].toString(16)),
                    d = b[e][3] ? d + n(b[e][3].toString(16)) : d + "ff";
                c.push(d);
            }
            return c;
        }
        var p = b, u = [];
        this.getQuantizedImage = function(b) {
            b = parseInt(b);
            var c = findMatch(u, function(c) {
                return c.colors.length == b;
            });
            if (c) {
                return c;
            }
            var c = new SimpleQuant(p);
            var e = c.getPalette(9); //��ȡͼƬ��ɫ
            var e = c.reducePaletteForced(e, b); //ȥ��������ɫ
            var c = c.reduceToPalette(e);//
            var e = q(e);
            c.id = "canvas_bmp" + b;
            c = {
                img: c,
                colors: r(e),
                oColors: r(e)
            };
            u.push(c);
            return c;
        };
        m();
    };
    function convertImgToBase64(url, callback) {
        var canvas = document.createElement('CANVAS');
        var ctx = canvas.getContext('2d');
        var img = new Image;
        img.crossOrigin = 'Anonymous';
        img.onload = function () {
            canvas.height = img.height;
            canvas.width = img.width;
            ctx.drawImage(img, 0, 0);
            var dataURL = canvas.toDataURL('image/png');
            callback.call(this, dataURL);
            canvas = null;
        };
        img.src = url;
    }
    convertImgToBase64(url, function(base64Img){
        var ff = new Image;
        ff.src = base64Img;
        var ap = new AQBitmapPalettes(ff);
        var qi = ap.getQuantizedImage(maxColors);
        var colors = [];
        for(var o in qi.colors){
            var color = qi.colors[o];
            colors.push(color.substr(0, 6));
        }
        callback(colors);
    });
}
/**
 * 图片辨色
 * @param dataUrl
 * @param value 阀值 越小越精准
 * @param maxColors 最多颜色
 * @param callback
 * @constructor
 */
function BitmapBase64Palettes(dataUrl, value, maxColors, callback){
    var g_value = value || 0.012;
    function findMatch(b, d) {
        for (var c = 0; c < b.length; c++) {
            if (d(b[c])) {
                return b[c];
            }
        }
        return null;
    }
    function ColorUtils() {
        this.rgbToXyz = function(b) {
            var c = b[0] / 255,
                g = b[1] / 255;
            b = b[2] / 255;
            c = 0.04045 < c ? Math.pow((c + 0.055) / 1.055, 2.4) : c / 12.92;
            g = 0.04045 < g ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
            b = 0.04045 < b ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
            c *= 100;
            g *= 100;
            b *= 100;
            return [0.4124 * c + 0.3576 * g + 0.1805 * b, 0.2126 * c + 0.7152 * g + 0.0722 * b, 0.0193 * c + 0.1192 * g + 0.9505 * b];
        };
        this.xyzToLab = function(b) {
            var c = b[0] / 95.047,
                g = b[1] / 100;
            b = b[2] / 108.883;
            c = 0.008856 < c ? Math.pow(c, 1 / 3) : 7.787 * c + 16 / 116;
            g = 0.008856 < g ? Math.pow(g, 1 / 3) : 7.787 * g + 16 / 116;
            b = 0.008856 < b ? Math.pow(b, 1 / 3) : 7.787 * b + 16 / 116;
            return [116 * g - 16, 500 * (c - g), 200 * (g - b)];
        };
        this.labToXyz = function(b) {
            var c = (b[0] + 16) / 116,
                g = b[1] / 500 + c;
            b = c - b[2] / 200;
            var k = Math.pow(c, 3),
                h = Math.pow(g, 3),
                f = Math.pow(b, 3);
            return [95.047 * (0.008856 < h ? h : (g - 16 / 116) / 7.787), 100 * (0.008856 < k ? k : (c - 16 / 116) / 7.787), 108.883 * (0.008856 < f ? f : (b - 16 / 116) / 7.787)];
        };
        this.xyzToRgb = function(b) {
            var c = b[0] / 100,
                g = b[1] / 100,
                k = b[2] / 100;
            b = 3.2406 * c + -1.5372 * g + -0.4986 * k;
            var h = -0.9689 * c + 1.8758 * g + 0.0415 * k,
                c = 0.0557 * c + -0.204 * g + 1.057 * k;
            b = 0.0031308 < b ? 1.055 * Math.pow(b, 1 / 2.4) - 0.055 : 12.92 * b;
            h = 0.0031308 < h ? 1.055 * Math.pow(h, 1 / 2.4) - 0.055 : 12.92 * h;
            c = 0.0031308 < c ? 1.055 * Math.pow(c, 1 / 2.4) - 0.055 : 12.92 * c;
            return [Math.round(255 * b), Math.round(255 * h), Math.round(255 * c)];
        };
        this.labToRgb = function(b) {
            b = this.labToXyz(b);
            return this.xyzToRgb(b);
        };
        this.rgbToLab = function(b) {
            b = this.rgbToXyz(b);
            return this.xyzToLab(b);
        };
        this.ciede2000 = function(b, c) {
            var g = Math.sqrt,
                k = Math.pow,
                h = Math.cos,
                f = Math.atan2,
                m = Math.sin,
                q = Math.abs,
                n = Math.exp,
                r = Math.PI,
                t = b[0],
                p = b[1],
                e = b[2],
                u = c[0],
                s = c[1],
                w = c[2],
                v = g(k(p, 2) + k(e, 2)),
                x = g(k(s, 2) + k(w, 2)),
                B = (v + x) / 2,
                B = 0.5 * (1 - g(k(B, 7) / (k(B, 7) + k(25, 7)))),
                p = (1 + B) * p,
                y = (1 + B) * s,
                s = g(k(p, 2) + k(e, 2)),
                B = g(k(y, 2) + k(w, 2)),
                D = function(b, c) {
                    if (0 === b && 0 === c) {
                        return 0;
                    }
                    var e;
                    e = f(b, c) * (180 / r);
                    return 0 <= e ? e : e + 360;
                }, V = D(e, p),
                y = D(w, y),
                w = u - t,
                e = B - s,
                p = function(b, c, e, f) {
                    if (0 === b * c) {
                        return 0;
                    }
                    if (180 >= q(f - e)) {
                        return f - e;
                    }
                    if (180 < f - e) {
                        return f - e - 360;
                    }
                    if (-180 > f - e) {
                        return f - e + 360;
                    }
                    throw Error();
                }(v, x, V, y),
                p = 2 * g(s * B) * m(r / 180 * p / 2),
                t = (t + u) / 2,
                u = (s + B) / 2,
                v = function(b, c, e, f) {
                    if (0 === b * c) {
                        return e + f;
                    }
                    if (180 >= q(e - f)) {
                        return (e + f) / 2;
                    }
                    if (180 < q(e - f) && 360 > e + f) {
                        return (e + f + 360) / 2;
                    }
                    if (180 < q(e - f) && 360 <= e + f) {
                        return (e + f - 360) / 2;
                    }
                    throw Error();
                }(v, x, V, y),
                h = 1 - 0.17 * h(r / 180 * (v - 30)) + 0.24 * h(r / 180 * v * 2) + 0.32 * h(r / 180 * (3 * v + 6)) - 0.2 * h(r / 180 * (4 * v - 63)),
                n = 30 * n(-k((v - 275) / 25, 2)),
                v = g(k(u, 7) / (k(u, 7) + k(25, 7))),
                x = 1 + 0.015 * k(t - 50, 2) / g(20 + k(t - 50, 2)),
                t = 1 + 0.045 * u,
                h = 1 + 0.015 * u * h,
                m = -2 * v * m(r / 180 * n * 2);
            return g(k(w / (1 * x), 2) + k(e / (1 * t), 2) + k(p / (1 * h), 2) + e / (1 * t) * m * (p / (1 * h)));
        };
    };
    var colorUtils = new ColorUtils;
    function SimpleQuant(b) {
        function d(b, c) {
            var d, f, m, q, n, r;
            switch (Object.prototype.toString.call(b).slice(8, -1)) {
                case "HTMLImageElement":
                    d = document.createElement("canvas"), d.width = b.naturalWidth, d.height = b.naturalHeight, f = d.getContext("2d"), f.drawImage(b, 0, 0);
                case "HTMLCanvasElement":
                    d = d || b, f = f || d.getContext("2d");
                case "CanvasRenderingContext2D":
                    f = f || b, d = d || f.canvas, m = f.getImageData(0, 0, d.width, d.height);
                case "ImageData":
                    m = m || b, c = m.width, q = "CanvasPixelArray" === Object.prototype.toString.call(m.data).slice(8, -1) ? new Uint8Array(m.data) : m.data;
                case "Array":
                    q = q || new Uint8Array(b);
                case "Uint8Array":
                    ;
                case "Uint8ClampedArray":
                    q = q || b, n = new Uint32Array(q.buffer);
                case "Uint32Array":
                    n = n || b, q = q || new Uint8Array(n.buffer), c = c || n.length, r = n.length / c;
            }
            return {
                can: d,
                ctx: f,
                imgd: m,
                buf8: q,
                buf32: n,
                width: c,
                height: r
            };
        }
        var c = colorUtils.ciede2000;
        this.getPalette = function(g) {
            c = colorUtils.ciede2000;
            var k = document.createElement("canvas");
            k.width = 128;
            k.height = b.naturalHeight * k.width / b.naturalWidth;
            k.getContext("2d").drawImage(b, 0, 0, k.width, k.height);
            for (var k = d(k).buf32, h = k.length, f = {
                colors: []
            }, m = 0; m < h; m++) {
                var q = k[m],
                    q = [q & 255, (q & 65280) >> 8, (q & 16711680) >> 16, (q & 4278190080) >> 24];
                if (0 !== q[3]) {
                    if(q[0]==0&&q[1]==0){
                        var a;
                    }
                    var q = colorUtils.rgbToLab(q),
                        n = this.getNearest(f.colors, q),
                        r = null;

                    if(n.difference > g) {
                        r = {
                            colors: [q]
                        };
                        this.getRepresentativeColor(r);
                        f.colors.push(r)
                    }else {
                        r = f.colors[n.index];
                        r.colors.push(q);
                        this.getRepresentativeColor(r)
                    };

                }
            }
            return f;
        };
        this.getRepresentativeColor = function(b) {
            var c = b.colors[b.colors.length - 1];
            b.labInfo || (b.labInfo = {}, b.lab = c);
            b.labInfo[c] || (b.labInfo[c] = 0);
            b.labInfo[c]++;
            b.labInfo[c] > b.labInfo[b.lab] && (b.lab = c);
        };
        this.reducePaletteForced = function(b, c) {
            c = c || 50;
            b.colors.sort(function(a,b){
                return b.colors.length - a.colors.length;
            });
            for (var d = 0, f = b.colors.slice(0), m = 0; m < f.length; m++) {
                d += f[m].colors.length;
            }
            for (; f.length > c;) {
                for (var q = [], m = 0; m < f.length; m++) {

                    var n = f[m],
                        r = n.colors.length / d;

                    n = this.getNearest(f, n.lab, m);
                    q[m] = {
                        index: m,
                        closest: n,
                        value: r * n.difference
                    };
                }
                q.sort(function(b, c) {
                    return b.value - c.value;
                });
                m = q[0];
                this.mergePaletteColors(m.closest.value, f[m.index]);
                f.splice(m.index, 1);
            }
            var ff = [];
            for(var i=0;i< b.colors.length;i++){
                if(f[i] && (f[i].colors.length / d) > g_value){
                    ff.push(f[i]);
                }

            }
            return ff;
        };
        this.mergePaletteColors = function(b, c) {
            for (var d = 0; d < c.colors.length; d++) {
                b.colors.push(c.colors[d]), this.getRepresentativeColor(b);
            }
        };
        this.reduceToPalette = function(c) {
            var k = document.createElement("canvas");
            k.width = b.naturalWidth;
            k.height = b.naturalHeight;
            var h = k.width/10,
                f = k.height/10,
                m = k.getContext("2d");
            m.drawImage(b, 0, 0, h, f);
            m.imageSmoothingEnabled = m.mozImageSmoothingEnabled = m.webkitImageSmoothingEnabled = !1;
            for (var q = m.getImageData(0, 0, h, f), n = d(k).buf32, r = new ArrayBuffer(q.data.length), t = new Uint8ClampedArray(r), r = new Uint32Array(r), p = {}, e = 0; e < f; ++e) {
                for (var u = 0; u < h; ++u) {
                    var s = e * h + u,
                        w = n[s];
                    if (p[w]) {
                        r[s] = p[w];
                    } else {
                        var v = (w & 4278190080) >> 24,
                            x = colorUtils.rgbToXyz([w & 255, (w & 65280) >> 8, (w & 16711680) >> 16]),
                            x = colorUtils.xyzToLab(x),
                            x = this.getNearest(c, x).value.lab,
                            x = colorUtils.labToXyz(x),
                            x = colorUtils.xyzToRgb(x),
                            v = v << 24 | x[2] << 16 | x[1] << 8 | x[0];
                        p[w] = v;
                        r[s] = v;
                    }
                }
            }
            q.data.set(t);
            m.putImageData(q, 0, 0);
            return k;
        };
        this.getNearest = function(b, d, h) {
            for (var f = 1E5, m = -1, q = null, n = 0; n < b.length; n++) {
                if (n !== h) {
                    var r = c(b[n].lab, d);
                    r < f && (f = r, m = n, q = b[n]);
                    if (0 === r) {
                        break;
                    }
                }
            }
            return {
                difference: f,
                index: m,
                value: q
            };
        };
    };
    function AQBitmapPalettes(b) {
        function m(b) {
            if ("HTMLCanvasElement" === p.toString().slice(8, -1)) {
                var c = !1,
                    e = new Image;
                e.onload = function() {
                    b && !c && (b(), c = !0);
                };
                e.src = p.toDataURL();
                e.naturalWidth && b && !c && (setTimeout(b), c = !0);
                p = e;
            }
        }
        function q(b) {
            for (var c = [], e = 0; e < b.length; e++) {
                var d = colorUtils.labToRgb(b[e].lab);
                c.push(d);
            }
            return c;
        }
        function n(b) {
            return 2 == b.length ? b : "0" + b;
        }
        function r(b) {
            for (var c = [], e = 0; e < b.length; e++) {
                var d = n(b[e][0].toString(16)),
                    d = d + n(b[e][1].toString(16)),
                    d = d + n(b[e][2].toString(16)),
                    d = b[e][3] ? d + n(b[e][3].toString(16)) : d + "ff";
                c.push(d);
            }
            return c;
        }
        var p = b, u = [];
        this.getQuantizedImage = function(b) {
            b = parseInt(b);
            var c = findMatch(u, function(c) {
                return c.colors.length == b;
            });
            if (c) {
                return c;
            }
            var c = new SimpleQuant(p);
            var e = c.getPalette(9); //��ȡͼƬ��ɫ
            var e = c.reducePaletteForced(e, b); //ȥ��������ɫ
            var c = c.reduceToPalette(e);//
            var e = q(e);
            c.id = "canvas_bmp" + b;
            c = {
                img: c,
                colors: r(e),
                oColors: r(e)
            };
            u.push(c);
            return c;
        };
        m();
    };

    var ff = new Image;
    ff.src = dataUrl;
    var ap = new AQBitmapPalettes(ff);
    var qi = ap.getQuantizedImage(maxColors);
    var colors = [];
    for(var o in qi.colors){
        var color = qi.colors[o];
        colors.push(color.substr(0, 6));
    }
    callback(colors);
}
/**
 * EventManager
 * @constructor
 */
function EventManager() {
    this.element = $(window);
    this.trigger = function(b, d) {
        this.element.trigger(b, [d]);
    };
    this.on = function(b, d) {
        var c = function(b, c) {
            d(c);
        };
        this.element.on(b, c);
        return function() {
            eventManager.element.off(b, c);
        };
    };
};
window.eventManager = new EventManager;
function cmConvertToPx(cm, scale){
//    scale = 7.47;
    return cm*scale;
}

function pxConvertToCm(px, scale){
//    scale = 7.47;
    return px/scale;
}

function calcAngle(start, end){
    var deltaX = end.x - start.x;
    var deltaY = end.y - start.y;
    return 360*Math.atan(deltaY/deltaX)/(2*Math.PI);
}

function calcDistanceBetweenTwoPoints(A, B){
    var calX = B.x - A.x;
    var calY = B.y - A.y;
    return Math.pow(calX*calX+calY*calY, 0.5);
}

function drawBox(x, y, w, h){
    return;
    $('.temp-origin').remove();
    $('<div class="temp-origin"></div>').css({
        position: 'absolute',
        left: x + w/2,
        top: y + h/2,
        width: w,
        height: h,
        border: '1px solid red'
    }).appendTo('body');
    $('.temp-box').remove();
    $('<div class="temp-box"></div>').css({
        position: 'absolute',
        left: x,
        top: y,
        width: w,
        height: h,
        border: '1px solid red',
        zIndex: 10
    }).appendTo('body');
}

function calcElementWrapBox(elem, angle){
    var elem = $(elem);
    var left = elem.offset().left;
    var top = elem.offset().top;
    var height = elem.outerHeight();
    var width = elem.outerWidth();
    var x, y, w, h;
    if(!angle || angle == 45){
        drawBox(left, top, width, height);
        x = left;
        y = top;
        w = width;
        h = height;
    }else{
        var wrapWidth, wrapHeight;
        if(Math.abs(angle) >= 0 && Math.abs(angle) < 90){
            angle = Math.abs(angle);
            wrapWidth = height*Math.sin(Math.PI/180*angle) + width*Math.cos(Math.PI/180*angle);
            wrapHeight = height*Math.cos(Math.PI/180*angle) + width*Math.sin(Math.PI/180*angle);
        }else if(angle>=90 && angle < 180){
            angle -= 90;
            wrapWidth = height*Math.cos(Math.PI/180*angle) + width*Math.sin(Math.PI/180*angle);
            wrapHeight = height*Math.sin(Math.PI/180*angle) + width*Math.cos(Math.PI/180*angle);
        }else if(angle>=180 && angle < 270){
            angle -= 180;
            wrapWidth = height*Math.sin(Math.PI/180*angle) + width*Math.cos(Math.PI/180*angle);
            wrapHeight = height*Math.cos(Math.PI/180*angle) + width*Math.sin(Math.PI/180*angle);
        }else if(angle>=270 && angle < 305){
            angle -= 270;
            wrapWidth = height*Math.cos(Math.PI/180*angle) + width*Math.sin(Math.PI/180*angle);
            wrapHeight = height*Math.sin(Math.PI/180*angle) + width*Math.cos(Math.PI/180*angle);
        }
        drawBox(left, top, wrapWidth, wrapHeight);
        x = left;
        y = top;
        w = wrapWidth;
        h = wrapHeight;
    }
    return {
        x: x,
        y: y,
        w: w,
        h: h
    };
}
/**
 * 创建底层对象
 * 仅用于元素的变形
 * @param canvas
 * @param translateX 以canvas中心为原点的X轴偏移量
 * @param translateY 以canvas中心为原点的Y轴偏移量
 * @param angle 以对象中心为原点的角度
 * @param scaleX X轴放大比例
 * @param scaleY Y轴放大比例
 * @constructor
 */
function ElementEl(canvas, x, y, translateX, translateY, angle, scaleX, scaleY, flipX, flipY){

    var _self = this;

    this.svgSurface = $(canvas.svgSurface);
    this.htmlSurface = $(canvas.htmlSurface);
    this.printable = $(canvas.printable);

    this.x = x;
    this.y = y;
    this.translateX = translateX || 0;
    this.translateY = translateY || 0;
    this.angle = angle || 0;
    this.scaleX = scaleX || 1;
    this.scaleY = scaleY || 1;
    this.flipX = flipX || 1;
    this.flipY = flipY || 1;

    this.box = null;

    this.transform = function(){
        var matrix = this.matrix.clone();
        this.g.transform(matrix.translate(this.translateX, this.translateY));
        this.g.transform(matrix.rotate(this.angle, this.originX, this.originY));
        this.g.transform(matrix.scale(this.scaleX, this.scaleY, this.originX, this.originY));

        this.g.transform(matrix.rotate(this.flipX*this.angle, this.originX, this.originY));
        this.g.transform(matrix.scale(this.flipX, 1, this.originX, this.originY));
        if(this.flipX > 0){
            this.g.transform(matrix.rotate(this.flipX*this.angle*-1, this.originX, this.originY));
        }else{
            this.g.transform(matrix.rotate(this.flipX*this.angle*1, this.originX, this.originY));
        }

        this.g.transform(matrix.rotate(this.flipY*this.angle, this.originX, this.originY));
        this.g.transform(matrix.scale(1, this.flipY, this.originX, this.originY));
        if(this.flipY > 0){
            this.g.transform(matrix.rotate(this.flipY*this.angle*-1, this.originX, this.originY));
        }else{
            this.g.transform(matrix.rotate(this.flipY*this.angle*1, this.originX, this.originY));
        }
    };

    this.initBox = function(b){
        this.box && this.box.remove() && (this.box = null);

        if(!b){
            this.width = this.snapEl.getBBox().width;
            this.height = this.snapEl.getBBox().height;
        }
        this.originX = this.x + this.width/2;
        this.originY = this.y + this.height/2;

        this.box = new ElementBox(canvas, this, this.width, this.height, this.translateX, this.translateY, this.angle, this.scaleX, this.scaleY);

        var m = this.box.getOriginMatrix();
        this.matrix = new Snap.Matrix();
        this.matrix.add(m.a, m.b, m.c, m.d, m.e, m.f);

        this.transform();
        canvas.checkPrintableAlarm();

        this.box.onTransform(function(){
            var type = arguments[0];
            switch(type){
                case 'translate':
                    _self.translateX += arguments[1];
                    _self.translateY += arguments[2];
                    break;
                case 'rotate':
                    _self.angle = parseFloat(arguments[1].toFixed(6));
                    break;
                case 'scale':
                    _self.scaleX = arguments[1];
                    _self.scaleY = arguments[2];
                    break;
                case 'horizontal':
                    _self.scaleX = arguments[1];
                    break;
                case 'vertical':
                    _self.scaleY = arguments[1];
                    break;
            }
            _self.transform();
        });
    };

    this.onFlipX = function(){
        this.flipX *= -1;
        this.transform();
    };

    this.onFlipY = function(){
        this.flipY *= -1;
        this.transform();
    };

    this.alignToCenter = function(){
        this.translateX = 0;
        this.translateY = 0;
        this.initBox();
    };

    this.remove = function(){
        this.g.remove();
        canvas.checkPrintableAlarm();
    };

    eventManager.on('deletedBox', function(elem){
        if(elem == _self){
            _self.remove();
        }
    });
}
/**
 * TextElementEl
 * @param canvas
 * @param string
 * @param lineHeight
 * @param fontFamily
 * @param fontSize
 * @param fill
 * @param stroke
 * @param strokeWidth
 * @param translateX
 * @param translateY
 * @param angle
 * @param scaleX
 * @param scaleY
 * @param flipX
 * @param flipY
 * @constructor
 */
function TextElementEl(canvas, string, lineHeight, fontFamily, fontSize, fill, stroke, strokeWidth, translateX, translateY, angle, scaleX, scaleY, flipX, flipY){

    this.type = 'text';
    this.canvas = canvas;
    this.string = string;
    this.lineHeight = lineHeight;
    this.fontFamily = fontFamily;
    this.fontSize = fontSize;
    this.fill = fill;
    this.stroke = stroke;
    this.strokeWidth = strokeWidth;

    this.g = this.canvas.paper.g();
    this.dataId = 'g-' + new Date().getTime();
    this.g.attr('data-id', this.dataId);
    this.canvas.rootG.add(this.g);

    this.snapEl = this.canvas.paper.text(0, 0, this.string);
    this.snapEl.node.setAttribute('font-size', this.fontSize);
    this.snapEl.node.setAttribute('font-family', this.fontFamily);
    this.snapEl.node.setAttribute('fill', this.fill);
    this.snapEl.node.setAttribute('stroke', this.stroke);
    this.snapEl.node.setAttribute('stroke-width', this.strokeWidth);

    for (var i=0; i<this.snapEl.node.childNodes.length; i++) {
        var tSpan = this.snapEl.node.childNodes[i];
        tSpan.setAttribute('x', 0);
        tSpan.setAttribute('y', 0);
        tSpan.setAttribute('dy', this.fontSize+i*this.fontSize);
    }
    var t = this.snapEl.node.getBBox();
    for (var i=0; i<this.snapEl.node.childNodes.length; i++) {
        var tSpan = this.snapEl.node.childNodes[i];
        var dy = parseInt(tSpan.getAttribute("dy"));
        dy -= t.y;
        tSpan.setAttribute('dy', dy);
    }
    this.g.add(this.snapEl);

    ElementEl.call(this, canvas, 0, 0, translateX, translateY, angle, scaleX, scaleY, flipX, flipY);

    this.initBox();
}

TextElementEl.prototype.setText = function(val){
    if(val.length==0){
        this.g.remove();
        this.box.remove();
        this.canvas.setActiveEl(null);
        return;
    }
    var t = $(this.snapEl.node);
    t.empty();
    this.string = null  == val ? [] : String(val).split(/\r?\n/);
    var s = [];
    for(var i=0; i<this.string.length; i++){
        s.push('<tspan x="0" y="0" dy="'+(this.fontSize+i*this.fontSize)+'">'+this.string[i]+'</tspan>');
    }
    t.html(s.join(''));

    var width = $(this.snapEl.node)[0].offsetWidth;

    var t = this.snapEl.node.getBBox();
    for (var i=0; i<this.snapEl.node.childNodes.length; i++) {
        var tSpan = this.snapEl.node.childNodes[i];
        var dy = parseInt(tSpan.getAttribute("dy"));
        dy -= t.y;
        tSpan.setAttribute('dy', dy);
        var textLen = tSpan.getComputedTextLength();
        var x = (width - textLen) / 2;
        tSpan.setAttribute("x", x);
    }

    this.initBox();
};

TextElementEl.prototype.setFontFamily = function(fontFamily){
    var _self = this;
    fontSpy(fontFamily, {
        glyphs: '\ue81a\ue82d\ue823',
        success: function() {
            _self.fontFamily = fontFamily;
            _self.snapEl.node.setAttribute('font-family', fontFamily);
            for (var i=0; i<_self.snapEl.node.childNodes.length; i++) {
                var tSpan = _self.snapEl.node.childNodes[i];
                tSpan.setAttribute('dy', _self.fontSize+_self.fontSize*i*_self.lineHeight);
            }
            var t = _self.snapEl.node.getBBox();
            var width = $(_self.snapEl.node)[0].offsetWidth;
            for (var i=0; i<_self.snapEl.node.childNodes.length; i++) {
                var tSpan = _self.snapEl.node.childNodes[i];
                var dy = parseInt(tSpan.getAttribute("dy"));
                dy -= t.y;
                tSpan.setAttribute('dy', dy);
                var textLen = tSpan.getComputedTextLength();
                var x = (width - textLen) / 2;
                tSpan.setAttribute("x", x);
            }
            _self.initBox();
        }
    });
};

TextElementEl.prototype.setFill = function(val){
    this.fill = val;
    this.snapEl.node.setAttribute('fill', val);
};

TextElementEl.prototype.setStroke = function(val){
    this.stroke = val;
    this.snapEl.node.setAttribute('stroke', val);
};

TextElementEl.prototype.setStrokeWidth = function(val){
    this.strokeWidth = val;
    this.snapEl.node.setAttribute('stroke-width', val);
};
/**
 * BitmapElementEl
 * @param canvas
 * @param url
 * @param translateX
 * @param translateY
 * @param angle
 * @param scaleX
 * @param scaleY
 * @param flipX
 * @param flipY
 * @constructor
 */
function BitmapElementEl(canvas, url, translateX, translateY, angle, scaleX, scaleY, flipX, flipY){

    var _self = this;
    this.type = 'bitmap';
    this.url = url;
    this.colors = [];
    var _onload = function(){};
    this.onload = function(func){
        _onload = func;
    };

    this.init = function(){
        this.g = canvas.paper.g();
        this.dataId = 'g-' + new Date().getTime();
        this.g.attr('data-id', this.dataId);
        canvas.rootG.add(this.g);

        this.snapEl = this.snapEl = canvas.paper.image(this.url, 0, 0, canvas.opt.printable.width, canvas.opt.printable.height);
        this.g.add(this.snapEl);

        ElementEl.call(this, canvas, 0, 0, translateX, translateY, angle, scaleX, scaleY, flipX, flipY);

        this.initBox();

        _onload();
    };

    new BitmapPalettes(url, 0.012, null, function(colors){
        _self.colors = colors;
        if(colors.length <= 10){
            _self.init();
        }else{
            eventManager.trigger('tooManyColors', colors);
        }
    });
}
/**
 * BitmapBase64ElementEl
 * @param canvas
 * @param dataUrl
 * @param translateX
 * @param translateY
 * @param angle
 * @param scaleX
 * @param scaleY
 * @param flipX
 * @param flipY
 * @constructor
 */
function BitmapBase64ElementEl(canvas, dataUrl, translateX, translateY, angle, scaleX, scaleY, flipX, flipY){

    var _self = this;
    this.type = 'bitmap';
    this.url = dataUrl;
    this.colors = [];
    var _onload = function(){};
    this.onload = function(func){
        _onload = func;
    };

    this.init = function(){
        this.g = canvas.paper.g();
        this.dataId = 'g-' + new Date().getTime();
        this.g.attr('data-id', this.dataId);
        canvas.rootG.add(this.g);

        this.snapEl = this.snapEl = canvas.paper.image(this.url, 0, 0, canvas.opt.printable.width, canvas.opt.printable.height);
        this.g.add(this.snapEl);

        ElementEl.call(this, canvas, 0, 0, translateX, translateY, angle, scaleX, scaleY, flipX, flipY);

        this.initBox();
    };

    new BitmapBase64Palettes(dataUrl, 0.012, null, function(colors){
        _self.colors = colors;
        if(colors.length <= 10){
            _self.init();
        }else{
            eventManager.trigger('tooManyColors', colors);
        }
    });
}
function Transform(canvas, box, htmlSurface, width, height, angle){

    var _self = this;

    var changeVerticalMode;
    var changeHorizontalMode;
    var changePositionMode;
    var changeRotateMode;
    var changeScaleMode;

    var _width = width;
    var _height = height;

    var pageX;
    var pageY;
    var boxLeft;
    var boxTop;
    var boxRelLeft;
    var boxRelTop;
    var boxWidth;
    var boxHeight;
    var boxDistance;

    var sizer;

    var state = this.state = {
        angle: angle || 0,
        deltaAngle: null,
        origin: null,
        initRelativeOrigin: {},
        curtRelativeOrigin: null
    };

    function getBoxOrigin(){
        return {
            x: getMatrix(box, 'x') + box.outerWidth()/2,
            y: getMatrix(box, 'y') + box.outerHeight()/2
        };
    }

    function getBoxDeltaAngle(){
        var begin = state.origin;
        var end = {
            x: state.origin.x + box.width(),
            y: state.origin.y - box.height()
        };
        return Math.abs(calcAngle(begin, end));
    }

    function updateState(){
        state.origin = getBoxOrigin();
        state.deltaAngle = getBoxDeltaAngle();
    }

    var xGridLineLeft = parseFloat(canvas.xgridline.css('left'));
    var yGridLineTop = parseFloat(canvas.ygridline.css('top'));
    var intoAreaX = false, intoAreaOffsetX = 0;
    var intoAreaY = false, intoAreaOffsetY = 0;
    function mouseMove(e){
        if(changeVerticalMode){
            var currentDistance = calcDistanceBetweenTwoPoints({
                x: state.origin.x + htmlSurface.offset().left,
                y: state.origin.y + htmlSurface.offset().top
            }, {
                x: e.pageX,
                y: e.pageY
            });
            var scale = currentDistance/boxDistance;
            var currentHeight = boxHeight * scale;
            var offsetTop = (currentHeight - boxHeight)/2;
            var top = boxRelTop - offsetTop;
            setMatrix(box, null, null, null, top);
            box.css({
                height: currentHeight
            });
            _onTransform('vertical', currentHeight/_height);
            canvas.checkPrintableAlarm();
        }
        if(changeHorizontalMode){
            var currentDistance = calcDistanceBetweenTwoPoints({
                x: state.origin.x + htmlSurface.offset().left,
                y: state.origin.y + htmlSurface.offset().top
            }, {
                x: e.pageX,
                y: e.pageY
            });
            var scale = currentDistance/boxDistance;
            var currentWidth = boxWidth * scale;
            var offsetLeft = (currentWidth - boxWidth)/2;
            var left = boxRelLeft - offsetLeft;
            setMatrix(box, null, null, left, null);
            box.css({
                width: currentWidth
            });
            _onTransform('horizontal', currentWidth/_width);
            canvas.checkPrintableAlarm();
        }
        if(changePositionMode){
            var deltaX = e.pageX - pageX;
            var deltaY = e.pageY - pageY;

            var left = getMatrix(box, 'x') + deltaX;
            var top = getMatrix(box, 'y') + deltaY;
            if(canvas.isAutoAlign){
                var boxCenterLineX = left + box.outerWidth()/2;
                var autoOffsetX = xGridLineLeft - boxCenterLineX;

                if(Math.abs(autoOffsetX) < 8) {
                    if (!intoAreaX) {
                        intoAreaX = true;
                        intoAreaOffsetX = autoOffsetX;
                        left = xGridLineLeft - box.outerWidth() / 2;
                        deltaX += autoOffsetX;
                        setMatrix(box, null, null, left, 0);
                        updateState();
                        _onTransform('translate', deltaX, 0);
                    }
                }else{
                    intoAreaX = false;
                    setMatrix(box, null, null, left-intoAreaOffsetX, 0);
                    updateState();
                    _onTransform('translate', deltaX-intoAreaOffsetX, 0);
                    pageX = e.pageX;
                    intoAreaOffsetX = 0;
                }

                var boxCenterLineY = top + box.outerHeight()/2;
                var autoOffsetY = yGridLineTop - boxCenterLineY;

                if(Math.abs(autoOffsetY) < 8) {
                    if (!intoAreaY) {
                        intoAreaY = true;
                        intoAreaOffsetY = autoOffsetY;
                        top = yGridLineTop - box.outerHeight() / 2;
                        deltaY += autoOffsetY;
                        setMatrix(box, null, null, 0, top);
                        updateState();
                        _onTransform('translate', 0, deltaY);
                    }
                }else{
                    intoAreaY = false;
                    setMatrix(box, null, null, 0, top-intoAreaOffsetY);
                    updateState();
                    _onTransform('translate', 0, deltaY-intoAreaOffsetY);
                    pageY = e.pageY;
                    intoAreaOffsetY = 0;
                }
            }else{
                //reset auto area attributes
                intoAreaX = false, intoAreaOffsetX = 0;
                intoAreaY = false, intoAreaOffsetY = 0;

                setMatrix(box, null, null, left, top);
                updateState();
                _onTransform('translate', deltaX, deltaY);
                pageX = e.pageX;
                pageY = e.pageY;
            }
            canvas.checkPrintableAlarm();
        }
        if(changeRotateMode){
            var angle = calcAngle({
                x: state.origin.x + htmlSurface.offset().left,
                y: state.origin.y + htmlSurface.offset().top
            }, {
                x: e.pageX,
                y: e.pageY
            });
            if(e.pageX < state.origin.x + htmlSurface.offset().left){
                angle += 180;
            }
            state.angle = angle + state.deltaAngle;
            var cos = Math.cos(state.angle*Math.PI/180).toFixed(4);
            var sin = Math.sin(state.angle*Math.PI/180).toFixed(4);
            setMatrix(box, cos, sin, null, null);
            _onTransform('rotate', state.angle);
            canvas.checkPrintableAlarm();
        }
        if(changeScaleMode){
            var currentDistance = calcDistanceBetweenTwoPoints({
                x: state.origin.x + htmlSurface.offset().left,
                y: state.origin.y + htmlSurface.offset().top
            }, {
                x: e.pageX,
                y: e.pageY
            });
            var scale = currentDistance/boxDistance;
            var width = boxWidth * scale;
            var height = boxHeight * scale;
            var offsetLeft = (width - boxWidth)/2;
            var offsetTop = (height - boxHeight)/2;
            var left = boxRelLeft - offsetLeft;
            var top = boxRelTop - offsetTop;
            setMatrix(box, null, null, left, top);
            box.css({
                width: width,
                height: height
            });
            _onTransform('scale', width/_width, height/_height);
            canvas.checkPrintableAlarm();
        }
        buildBoxSizer();
    }

    function resetSize(){
        var w, h;
        if($(this).attr('id') == 'sizer_w'){
            w = $(this).val();
        }else{
            h = $(this).val();
        }
        var boxWidth = box.outerWidth();
        var boxHeight = box.outerHeight();
        var boxScale = boxWidth/boxHeight;
        var boxRelLeft = getMatrix(box, 'x');
        var boxRelTop = getMatrix(box, 'y');
        if(w && !isNaN(w)){
            if(w>30){
                w = 30;
            }
            w = parseFloat(w).toFixed(2);
            $('#sizer_w').val(w);

            var width = cmConvertToPx(parseFloat(w), canvas.opt.scale);
            var height = width/boxScale;
            $('#sizer_h').val(pxConvertToCm(height, canvas.opt.scale).toFixed(2));

            var offsetLeft = (width - boxWidth)/2;
            var offsetTop = (height - boxHeight)/2;
            var left = boxRelLeft - offsetLeft;
            var top = boxRelTop - offsetTop;
            setMatrix(box, null, null, left, top);
            box.css({
                width: width,
                height: height
            });
            _onTransform('scale', width/_width, height/_height);
        }else if(h && !isNaN(h)){
            if(h>30){
                h = 30;
            }
            h = parseFloat(h).toFixed(2);
            $('#sizer_h').val(h);

            var height = cmConvertToPx(parseFloat(h), canvas.opt.scale);
            var width = height*boxScale;
            $('#sizer_w').val(pxConvertToCm(width, canvas.opt.scale).toFixed(2));

            var offsetLeft = (width - boxWidth)/2;
            var offsetTop = (height - boxHeight)/2;
            var left = boxRelLeft - offsetLeft;
            var top = boxRelTop - offsetTop;
            setMatrix(box, null, null, left, top);
            box.css({
                width: width,
                height: height
            });
            _onTransform('scale', width/_width, height/_height);
        }
        canvas.checkPrintableAlarm();

        var wrapBox = calcElementWrapBox(box, state.angle);
        $('.edit-box-sizer').css({
            left: wrapBox.x + wrapBox.w/2 - sizer.outerWidth()/2 - htmlSurface.offset().left,
            top: wrapBox.y + wrapBox.h + 35 - htmlSurface.offset().top,
            zIndex: 100
        });
    }

    function eventMousedownBoxSizer(e){
        e.stopPropagation();
        var target = $(e.currentTarget);
        if(!target.hasClass('edit')){
            var w = target.find('span:eq(0)').text();
            var h = target.find('span:eq(1)').text();
            target.addClass('edit');
            target.empty();
            var html = '';
            html += '<span>宽</span><input id="sizer_w" type="text" value="'+w+'"><i>cm</i>';
            html += '<span>高</span><input id="sizer_h" type="text" value="'+h+'"><i>cm</i>';
            target.append(html);
            target.find('input').bind('input', resetSize);

            var wrapBox = calcElementWrapBox(box, state.angle);

            target.css({
                left: wrapBox.x + wrapBox.w/2 - target.outerWidth()/2 - htmlSurface.offset().left,
                top: wrapBox.y + wrapBox.h + 35 - htmlSurface.offset().top,
                zIndex: 100
            });
        }
    }

    function buildBoxSizer(){
        $('div.edit-box-sizer').remove();

        var w = pxConvertToCm(box.width(), canvas.opt.scale).toFixed(2);
        var h = pxConvertToCm(box.height(), canvas.opt.scale).toFixed(2);

        sizer = _self.sizer = $('<div class="edit-box-sizer"><span>'+w+'</span><i>cm</i> <i>x</i> <span>'+h+'</span><i>cm</i></span></div>');
        htmlSurface.append(sizer);
        var wrapBox = calcElementWrapBox(box, state.angle);
        sizer.css({
            left: wrapBox.x + wrapBox.w/2 - sizer.width()/2 - htmlSurface.offset().left,
            top: wrapBox.y + wrapBox.h + 35 - htmlSurface.offset().top,
            zIndex: 100
        });
        sizer.bind('mousedown', eventMousedownBoxSizer);
    }

    this.initTransform = function(){
        updateState();
        buildBoxSizer();
        canvas.checkPrintableAlarm();
        $('.handle-top, .handle-bottom', box).bind('mousedown', function(e){
            e.stopPropagation();
            changeVerticalMode = true;
            pageX = e.pageX;
            pageY = e.pageY;
            boxLeft = box.offset().left;
            boxTop = box.offset().top;
            boxRelLeft = getMatrix(box, 'x');
            boxRelTop = getMatrix(box, 'y');
            boxWidth = box.width();
            boxHeight = box.height();
            boxDistance = calcDistanceBetweenTwoPoints({
                x: state.origin.x + htmlSurface.offset().left,
                y: state.origin.y + htmlSurface.offset().top
            }, {
                x: pageX,
                y: pageY
            });
            $(document).bind('mousemove', mouseMove);
        });
        $('.handle-left, .handle-right', box).bind('mousedown', function(e){
            e.stopPropagation();
            changeHorizontalMode = true;
            pageX = e.pageX;
            pageY = e.pageY;
            boxLeft = box.offset().left;
            boxTop = box.offset().top;
            boxRelLeft = getMatrix(box, 'x');
            boxRelTop = getMatrix(box, 'y');
            boxWidth = box.width();
            boxHeight = box.height();
            boxDistance = calcDistanceBetweenTwoPoints({
                x: state.origin.x + htmlSurface.offset().left,
                y: state.origin.y + htmlSurface.offset().top
            }, {
                x: pageX,
                y: pageY
            });
            $(document).bind('mousemove', mouseMove);
        });
        $(box).bind('mousedown', function(e){
            e.stopPropagation();

            changePositionMode = true;
            pageX = e.pageX;
            pageY = e.pageY;
            xGridLineLeft = parseFloat(canvas.xgridline.css('left'));
            yGridLineTop = parseFloat(canvas.ygridline.css('top'));

            $('.edit-box').addClass('hidden');
            box.removeClass('hidden');
            buildBoxSizer();

            if(canvas.isAutoAlign){
                canvas.xgridline.css({
                    opacity: 1
                });
                canvas.ygridline.css({
                    opacity: 1
                });
            }

            canvas.moveToTop(_self);

            eventManager.trigger('selectedBox', _self.elem);

            $(document).bind('mousemove', mouseMove);
        });
        $('.handle-rotate', box).bind('mousedown', function(e){
            e.stopPropagation();
            changeRotateMode = true;
            $(document).bind('mousemove', mouseMove);
        });
        $('.handle-scale', box).bind('mousedown', function(e){
            e.stopPropagation();
            changeScaleMode = true;
            pageX = e.pageX;
            pageY = e.pageY;
            boxLeft = box.offset().left;
            boxTop = box.offset().top;
            boxRelLeft = getMatrix(box, 'x');
            boxRelTop = getMatrix(box, 'y');
            boxWidth = box.width();
            boxHeight = box.height();
            boxDistance = calcDistanceBetweenTwoPoints({
                x: state.origin.x + htmlSurface.offset().left,
                y: state.origin.y + htmlSurface.offset().top
            }, {
                x: pageX,
                y: pageY
            });
            $(document).bind('mousemove', mouseMove);
        });
        $('.handle-delete', box).bind('mousedown', function(e){
            e.stopPropagation();
            box.remove();
            sizer.remove();
            eventManager.trigger('deletedBox', _self.elem);
            eventManager.trigger('unselectBox');
        });
        $(document).bind('mouseup', function(){
            changeHorizontalMode = false;
            changeVerticalMode = false;
            changePositionMode = false;
            changeRotateMode = false;
            changeScaleMode = false;
            canvas.xgridline.css({
                opacity: 0
            });
            canvas.ygridline.css({
                opacity: 0
            });
            $(document).unbind('mousemove', mouseMove);
        });
    };

    var _onTransform = function(){};
    this.onTransform = function(func){
        _onTransform = func;
    };

    this.initTransform();

    eventManager.trigger('selectedBox', _self.elem);
}
/**
 * ElementBox
 * @param canvas
 * @param elem
 * @param width
 * @param height
 * @param translateX
 * @param translateY
 * @param angle
 * @param scaleX
 * @param scaleY
 * @constructor
 */
function ElementBox(canvas, elem, width, height, translateX, translateY, angle, scaleX, scaleY){

    this.elem = elem;
    var htmlSurface = canvas.htmlSurface;
    var printable = canvas.printable;

    var box;
    var originMatrix;

    function isNewEl(){
        if(translateX == 0 && translateY == 0 && angle == 0 && scaleX == 1 && scaleY == 1){
            return true;
        }else{
            return false;
        }
    }

    function initialPosition(){
        var printableOffsetX = printable.offset().left;
        var printableOffsetY = printable.offset().top;
        var printableWidth = printable.width();
        var printableHeight = printable.height();
        var x = printableOffsetX + (printableWidth - width)/2 - htmlSurface.offset().left + 2;
        var y = printableOffsetY + (printableHeight - height)/2 - htmlSurface.offset().top + 2;
        return {
            x: x,
            y: y
        };
    }

    this.init = function(){
        var html = '';
        html += '<div class="edit-box marching-ants marching">';
        html += '<div class="handle handle-drag"></div>';
        html += '<div class="handle handle-rotate"></div>';
        html += '<div class="handle handle-scale"></div>';
        html += '<div class="handle handle-delete"></div>';
        html += '<div class="handle handle-noimage handle-top"></div>';
        html += '<div class="handle handle-noimage handle-left"></div>';
        html += '<div class="handle handle-noimage handle-bottom"></div>';
        html += '<div class="handle handle-noimage handle-right"></div>';
        html += '</div>';
        this.object = box = $(html);
        htmlSurface.append(box);
        var position = initialPosition();
        setMatrix(box, 1, 0, position.x, position.y);
        originMatrix = getMatrix(box);
        box.attr('data-id', elem.dataId);
        box.css({
            width: width,
            height: height,
            zIndex: 0
        });
        if(!isNewEl()){
            this.translate(translateX, translateY);
            this.rotate(angle);
            this.scale(scaleX, scaleY);
        }
        Transform.call(this, canvas, box, htmlSurface, width, height, angle);
    };

    this.translate = function(x, y){
        var m = getMatrix(box);
        setMatrix(box, null, null, m.e+x, m.f+y);
    };

    this.rotate = function(angle){
        var cos = Math.cos(angle*Math.PI/180).toFixed(4);
        var sin = Math.sin(angle*Math.PI/180).toFixed(4);
        setMatrix(box, cos, sin, null, null);
    };

    this.scale = function(){
        var newWidth = width*scaleX;
        var newHeight = height*scaleY;
        var offsetX = (width - newWidth)/2 ;
        var offsetY = (height - newHeight)/2;
        this.translate(offsetX, offsetY);
        box.css({
            width: newWidth,
            height: newHeight
        });
    };

    this.getMatrix = function(){
        return getMatrix(box);
    };

    this.getOriginMatrix = function(){
        return originMatrix;
    };

    this.remove = function(){
        box.remove();
        this.sizer.remove();
    };

    this.init();
}
function Printable(opt){

    this.resetSize = function(){

    }
}
/**
 * Created by haolun on 15/8/26.
 */
function Canvas(container, options){
    var self = this;
    var opt = this.opt = {
        id: options.id || 'side-' + new Date().getTime(),
        width: options.width || 530,
        height: options.height || 630,
        image: options.image,
        scale: options.scale || 7.47,
        printable: {
            x: options.printable.x || 152,
            y: options.printable.y || 100,
            width: options.printable.width || 215,
            height: options.printable.height || 300
        },
        svgIcon: {
            zoomIn: 'ds/svg/zoom_in.svg',
            zoomOut: 'ds/svg/zoom_out.svg',
            zoomInLight: 'ds/svg/zoom_in_light.svg',
            zoomOutLight: 'ds/svg/zoom_out_light.svg'
        }
    };
    var target;
    var container = $(container);
    //------------------------------------------
    this.id = options.id || 'ds_canvas_' + new Date().getTime();
    this.isAutoAlign = true;
    this.lineHeight = 1;
    this.fontFamily = 'Helvetica';
    this.fontSize = 48;
    this.fill = '#000000';
    this.stroke = '#000000';
    this.strokeWidth = 0;
    //------------------------------------------
    this.elements = [];

    var _activeEl = null;
    this.setActiveEl = function(el){
        _activeEl = el;
    };

    this.text = function(val){
        if(_activeEl && _activeEl instanceof TextElementEl){
            _activeEl.setText(val);
        }else{
            var textEl = new TextElementEl(this, [val], this.lineHeight, this.fontFamily, this.fontSize, this.fill, this.stroke, this.strokeWidth);
            this.elements.push(textEl);
            $('.edit-box', target).addClass('hidden');
            $('.edit-box[data-id='+textEl.dataId+']', target).removeClass('hidden');
            _activeEl = textEl;
            this.moveToTop();
        }
    };

    this.textFontFamily = function(val){
        this.fontFamily = val;
        if(_activeEl && _activeEl instanceof TextElementEl){
            _activeEl.setFontFamily(val);
        }
    };

    this.textFill = function(val){
        this.fill = val;
        if(_activeEl && _activeEl instanceof TextElementEl){
            _activeEl.setFill(val);
        }
    };

    this.textStroke = function(val){
        this.stroke = val;
        if(_activeEl && _activeEl instanceof TextElementEl){
            _activeEl.setStroke(val);
        }
    };

    this.textStrokeWidth = function(val){
        this.strokeWidth = val;
        if(_activeEl && _activeEl instanceof TextElementEl){
            _activeEl.setStrokeWidth(val);
        }
    };

    this.image = function(url){
        var imageEl = new BitmapElementEl(this, url);
        imageEl.onload(function(){
            self.elements.push(imageEl);
            $('.edit-box', target).addClass('hidden');
            $('.edit-box[data-id='+imageEl.dataId+']', target).removeClass('hidden');
            _activeEl = imageEl;
            self.moveToTop();
        });
    };

    this.imageBase64 = function(dataUrl){
        var imageEl = new BitmapBase64ElementEl(this, dataUrl);
        self.elements.push(imageEl);
        $('.edit-box', target).addClass('hidden');
        $('.edit-box[data-id='+imageEl.dataId+']', target).removeClass('hidden');
        _activeEl = imageEl;
        self.moveToTop();
    };

    this.autoAlign = function(status){
        this.isAutoAlign = status;
    };

    this.moveToTop = function(el){
        el = el || _activeEl.box;
        $('.edit-box', target).css({
            zIndex: 0
        });
        $(el.object).css({
            zIndex: 1
        });

        var set = this.rootG.selectAll('g');
        var lastChild;
        set.forEach(function(element, index) {
            if(index==set.length-1){
                lastChild = element;
            }
        });
        if(lastChild){
            var dataId = $(el.object).attr('data-id');
            var g = this.rootG.select('[data-id='+dataId+']');
            if(lastChild != g){
                lastChild.after(g);
            }
        }
    };

    this.moveToBottom = function(){
        if(_activeEl){
            var set = this.rootG.selectAll('g');
            var firstChild;
            set.forEach(function(element, index) {
                if(index==0){
                    firstChild = element;
                }
            });
            if(firstChild){
                var g = this.rootG.select('[data-id='+_activeEl.dataId+']');
                if(firstChild != g){
                    var firstChildDataId = firstChild.attr('data-id');
                    $('div.edit-box[data-id='+firstChildDataId+']', target).css('z-index', 1);
                    $('div.edit-box[data-id='+_activeEl.dataId+']', target).css('z-index', 0);
                    firstChild.before(g);
                    $('.edit-box[data-id='+_activeEl.dataId+']', target).addClass('hidden');
                }

            }
        }
    };

    this.alignToCenter = function(){
        if(_activeEl){
            _activeEl.alignToCenter();
        }
    };

    this.onFlipX = function(){
        if(_activeEl){
            _activeEl.onFlipX();
        }
    };

    this.onFlipY = function(){
        if(_activeEl){
            _activeEl.onFlipY();
        }
    };

    this.duplicate = function(){
        if(_activeEl){
            if(_activeEl instanceof TextElementEl){
                _activeEl = new TextElementEl(this, _activeEl.string, _activeEl.lineHeight, _activeEl.fontFamily, _activeEl.fontSize, _activeEl.fill, _activeEl.stroke, _activeEl.strokeWidth, _activeEl.translateX + 25, _activeEl.translateY + 25, _activeEl.angle, _activeEl.scaleX, _activeEl.scaleY, _activeEl.flipX, _activeEl.flipY);
            }else if(_activeEl instanceof BitmapElementEl){
                _activeEl = new BitmapElementEl(this, _activeEl.url, _activeEl.translateX + 25, _activeEl.translateY + 25, _activeEl.angle, _activeEl.scaleX, _activeEl.scaleY, _activeEl.flipX, _activeEl.flipY);
            }else if(_activeEl instanceof BitmapBase64ElementEl){
                _activeEl = new BitmapBase64ElementEl(this, _activeEl.url, _activeEl.translateX + 25, _activeEl.translateY + 25, _activeEl.angle, _activeEl.scaleX, _activeEl.scaleY, _activeEl.flipX, _activeEl.flipY);
            }
            $('.edit-box', target).addClass('hidden');
            $('.edit-box[data-id='+_activeEl.dataId+']', target).removeClass('hidden');
        }
    };

    this.setProductImage = function(val){
        $('.ghost-image', target).attr('src', val);
    };

    this.setPrintable = function(){
        $('.printable-area-box', target).css({
            left: opt.printable.x,
            top: opt.printable.y,
            width: opt.printable.width,
            height: opt.printable.height
        });
        $('.xgridline', target).css('left', opt.printable.x + opt.printable.width/2);
        $('.ygridline', target).css('top', opt.printable.y + opt.printable.height/2);

        setTimeout(function(){
            self.checkPrintableAlarm();
        }, 500);
    };

    this.checkPrintableAlarm = function(){
        var printable = $('.printable-area-box', target);
        var rootG = $('.svg-surface', target).find('g:eq(0)');
        var normal = false;
        if(rootG.children().length == 0) {
            normal = true;
        }else if(rootG.offset().left > printable.offset().left && rootG.offset().left + rootG[0].getBBox().width < printable.offset().left + printable.outerWidth() &&  rootG.offset().top > printable.offset().top && rootG.offset().top + rootG[0].getBBox().height < printable.offset().top + printable.outerHeight()){
            normal = true;
        }
        if(normal){
            printable.removeClass('alarm');
        }else{
            printable.addClass('alarm');
        }
    };

    this.productColor = function(val){
        $('.product-color', target).css({
            background: val
        });
        if(val.toUpperCase() == '#FFFFFF'){
            $('.printable-area-box', target).css({
                borderColor: 'rgba(0, 0, 0, 0.298039)'
            });
            $('.printable-area-box>.printable-area-toolbar', target).css({
                backgroundColor: 'rgba(0, 0, 0, 0.298039)',
                color: 'rgb(255, 255, 255)'
            });
            $('.printable-area-zoom-image:eq(0), .printable-area-zoom-image:eq(1)', target).removeClass('zero-opacity');
            $('.printable-area-zoom-image:eq(2), .printable-area-zoom-image:eq(3)', target).removeClass('zero-opacity').addClass('zero-opacity');
        }else{
            $('.printable-area-box', target).css({
                borderColor: 'rgba(255, 255, 255, 0.298039)'
            });
            $('.printable-area-box>.printable-area-toolbar', target).css({
                backgroundColor: 'rgba(255, 255, 255, 0.298039)',
                color: 'rgb(0, 0, 0)'
            });
            $('.printable-area-zoom-image:eq(0), .printable-area-zoom-image:eq(1)', target).removeClass('zero-opacity').addClass('zero-opacity');
            $('.printable-area-zoom-image:eq(2), .printable-area-zoom-image:eq(3)', target).removeClass('zero-opacity');
        }
    };

    this.enabled = function(){
        target.show();
    };

    this.disabled = function(){
        target.hide();
        _activeEl = null;
        $('.edit-box', target).removeClass('hidden').addClass('hidden');
        $('.edit-box-sizer', target).remove();
        eventManager.trigger('unselectBox');
    };

    this.load = function(options){
        opt = this.opt = {
            width: options.width || 530,
            height: options.height || 630,
            image: options.image,
            scale: options.scale || 7.47,
            printable: {
                x: options.printable.x || 152,
                y: options.printable.y || 100,
                width: options.printable.width || 215,
                height: options.printable.height || 300
            }
        };
        $('.ghost-image', target).attr('src', opt.image);
        this.setPrintable()
    };

    this.setSvgIcon = function(zoomInLight, zoomOutLihgt, zoomIn, zoomOut){
        opt.svgIcon.zoomIn = zoomIn;
        opt.svgIcon.zoomOut = zoomOut;
        opt.svgIcon.zoomInLight = zoomInLight;
        opt.svgIcon.zoomOutLight = zoomOutLihgt;
        $('.printable-area-zoom-image', target).eq(0).attr('src', zoomInLight);
        $('.printable-area-zoom-image', target).eq(1).attr('src', zoomOutLihgt);
        $('.printable-area-zoom-image', target).eq(2).attr('src', zoomIn);
        $('.printable-area-zoom-image', target).eq(3).attr('src', zoomOut);
    };
    //------------------------------------------

    function init(){
        var html = '';
        html += '<div class="new-editor" data-side="'+opt.id+'">';
        html += '<div class="product-color"></div>';
        html += '<svg class="svg-surface"></svg>';
        html += '<img class="ghost-image" src="'+opt.image+'">';
        html += '<div class="html-surface">';
        html += '<div class="printable-area-box">';
        html += '<div class="printable-area-toolbar">';
        html += '<span>设计区域</span>';
        html += '<div class="printable-area-zoom">';
        html += '<img class="printable-area-zoom-image no-select" src="'+opt.svgIcon.zoomInLight+'">';
        html += '<img class="printable-area-zoom-image no-select" src="'+opt.svgIcon.zoomOutLight+'">';
        html += '<img class="printable-area-zoom-image zero-opacity no-select" src="'+opt.svgIcon.zoomIn+'">';
        html += '<img class="printable-area-zoom-image zero-opacity no-select" src="'+opt.svgIcon.zoomOut+'">';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '<div class="xgridline"></div>';
        html += '<div class="ygridline"></div>';
        html += '</div>';
        html += '</div>';
        target = $(html);
        container.append(target);
        target.css({
            width: opt.width,
            height: opt.height
        });
        $('.product-color, .svg-surface, .html-surface', target).css({
            width: opt.width,
            height: opt.height
        });
        $('.printable-area-box', target).css({
            left: opt.printable.x,
            top: opt.printable.y,
            width: opt.printable.width,
            height: opt.printable.height,
            borderColor: 'rgba(0, 0, 0, 0.298039)'
        });
        $('.printable-area-box>printable-area-toolbar', target).css({
            backgroundColor: 'rgba(0, 0, 0, 0.298039)'
        });
        self.xgridline = $('.xgridline', target).css('left', opt.printable.x + opt.printable.width/2);
        self.ygridline = $('.ygridline', target).css('top', opt.printable.y + opt.printable.height/2);
        self.svgSurface = $('.svg-surface', target);
        self.htmlSurface = $('.html-surface', target);
        self.printable = $('.printable-area-box', target);
        $(target).bind('mousedown', function(){
            $('.edit-box', target).addClass('hidden');
            $('.edit-box-sizer', target).remove();
            _activeEl = null;
            eventManager.trigger('unselectBox');
        });
        self.paper = Snap(self.svgSurface[0]);
        self.rootG = self.paper.g();
    }

    init();

    eventManager.on('selectedBox', function(elem){
        _activeEl = elem;
    });

    eventManager.on('deletedBox', function(elem){
        _activeEl = null;
        var idx;
        for(var i=0; i<self.elements.length; i++){
            var _elem = self.elements[i];
            if(_elem == elem){
                idx = i;
                break;
            }
        }
        self.elements.splice(idx, 1);
    });
};

String.prototype.trim=function() {
    return this.replace(/(^\s*)|(\s*$)/g, "");
};

function setMatrix(element, cos, sin, x, y){
    var transform = $(element).css('transform');
    var a, b, c, d, e, f;
    if(transform == 'none'){
        a = cos;
        b = sin;
        c = -sin;
        d = cos;
        e = x;
        f = y;
    }else{
        var matrix = transform.substr(7, transform.length-7-1).split(',');
        a = cos || matrix[0];
        b = sin || matrix[1];
        c = -sin || matrix[2];
        d = cos || matrix[3];
        e = x ||matrix[4];
        f = y || matrix[5];
    }
    element.css({
        '-o-transform': ' matrix(' + a + ', ' + b +', ' + c + ', ' + d + ', ' + e + ', ' + f + ')',
        '-ms-transform': ' matrix(' + a + ', ' + b +', ' + c + ', ' + d + ', ' + e + ', ' + f + ')',
        '-moz-transform': ' matrix(' + a + ', ' + b +', ' + c + ', ' + d + ', ' + e + ', ' + f + ')',
        '-webkit-transform': ' matrix(' + a + ', ' + b +', ' + c + ', ' + d + ', ' + e + ', ' + f + ')',
        transform: ' matrix(' + a + ', ' + b +', ' + c + ', ' + d + ', ' + e + ', ' + f + ')'
    });
}

function getMatrix(element, attrName){
    var transform = $(element).css('transform');
    var matrix = transform.substr(7, transform.length-7-1).split(',');
    var a = parseFloat(matrix[0].trim());
    var b = parseFloat(matrix[1].trim());
    var c = parseFloat(matrix[2].trim());
    var d = parseFloat(matrix[3].trim());
    var e = parseFloat(matrix[4].trim());
    var f = parseFloat(matrix[5].trim());
    var val;
    switch(attrName){
        case 'cos':
            val = a;
            break;
        case 'sin':
            val = b;
            break;
        case 'asin':
            val = c;
            break;
        case 'cos':
            val = d;
            break;
        case 'x':
            val = e;
            break;
        case 'y':
            val = f;
            break;
        default :
            val = {
                a: a,
                b: b,
                c: c,
                d: d,
                e: e,
                f: f
            };
    }
    return val;
}
/**
 * Created by haolun on 15/9/9.
 */
function Ds(target, options){

    this.activeCanvas = null;

    var canvases = [];

    this.add = function(canvas){
        canvases.push(canvas);
    };

    this.active = function(sign){
        for(var i=0; i<canvases.length; i++){
            var canvas = canvases[i];
            var founded = false;
            if(typeof sign == 'string'){
                if(canvas.id == sign){
                    this.activeCanvas = canvas;
                    founded = true;
                    break;
                }
            }else if(typeof sign == 'object'){
                if(canvas == sign){
                    this.activeCanvas = canvas;
                    founded = true;
                    break;
                }
            }
        }
        for(var i=0; i<canvases.length; i++){
            var canvas = canvases[i];
            canvas.disabled();
        }
        this.activeCanvas.enabled();
    };

    this.call = function(funcName){
        if(this.activeCanvas.hasOwnProperty(funcName)){
            var params = [];
            for(var i=0; i<arguments.length; i++){
                if(i!=0){
                    params.push(arguments[i]);
                }
            }
            if(funcName == 'productColor'){
                for(var o in canvases){
                    var canvas = canvases[o];
                    canvas[funcName].apply(this.activeCanvas, params);
                }
            }else{
                this.activeCanvas[funcName].apply(this.activeCanvas, params);
            }

        }else{
            console.log('canvas not found method:', funcName);
        }
    };

    //init
    var arr = [];
    if(options instanceof Array){
        arr = options;
    }else if(options instanceof Object){
        arr = [options];
    }
    for(var i=0; i<arr.length; i++){
        var option = arr[i];
        var canvas = new Canvas(target, option);
        canvases.push(canvas);
        if(i==0){
            this.active(canvas);
        }
    }

    function getCanvasById(id){
        var obj;
        for(var o in canvases){
            var canvas = canvases[o];
            if(canvas.id == id){
                obj = canvas;
                break;
            }
        }
        return obj;
    }

    this.setSvgIcon = function(zoomInLight, zoomOutLihgt, zoomIn, zoomOut){
        for(var i=0; i<canvases.length; i++){
            var canvas = canvases[i];
            canvas['setSvgIcon'].call(canvas, zoomInLight, zoomOutLihgt, zoomIn, zoomOut);
        }
    };

    this.autoAlign = function(status){
        for(var i=0; i<canvases.length; i++){
            var canvas = canvases[i];
            canvas['autoAlign'].call(canvas, status);
        }
    };

    this.load = function(options){
        for(var o in options){
            var option = options[o];
            var canvas = getCanvasById(option.id);
            canvas.load(option);
        }
    };

    this.getCanvases = function(){
        return canvases;
    };
}