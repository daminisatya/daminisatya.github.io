/*global jQuery */
/*jshint browser:true */
/*!
* FitVids 1.1
*
* Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
*/

;(function( jQuery ){

  'use strict';

  jQuery.fn.fitVids = function( options ) {
    var settings = {
      customSelector: null,
      ignore: null
    };

    if(!document.getElementById('fit-vids-style')) {
      // appendStyles: https://github.com/toddmotto/fluidvids/blob/master/dist/fluidvids.js
      var head = document.head || document.getElementsByTagName('head')[0];
      var css = '.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}';
      var div = document.createElement("div");
      div.innerHTML = '<p>x</p><style id="fit-vids-style">' + css + '</style>';
      head.appendChild(div.childNodes[1]);
    }

    if ( options ) {
      jQuery.extend( settings, options );
    }

    return this.each(function(){
      var selectors = [
        'iframe[src*="player.vimeo.com"]',
        'iframe[src*="youtube.com"]',
        'iframe[src*="youtube-nocookie.com"]',
        'iframe[src*="kickstarter.com"][src*="video.html"]',
        'object',
        'embed'
      ];

      if (settings.customSelector) {
        selectors.push(settings.customSelector);
      }

      var ignoreList = '.fitvidsignore';

      if(settings.ignore) {
        ignoreList = ignoreList + ', ' + settings.ignore;
      }

      var jQueryallVideos = jQuery(this).find(selectors.join(','));
      jQueryallVideos = jQueryallVideos.not('object object'); // SwfObj conflict patch
      jQueryallVideos = jQueryallVideos.not(ignoreList); // Disable FitVids on this video.

      jQueryallVideos.each(function(){
        var jQuerythis = jQuery(this);
        if(jQuerythis.parents(ignoreList).length > 0) {
          return; // Disable FitVids on this video.
        }
        if (this.tagName.toLowerCase() === 'embed' && jQuerythis.parent('object').length || jQuerythis.parent('.fluid-width-video-wrapper').length) { return; }
        if ((!jQuerythis.css('height') && !jQuerythis.css('width')) && (isNaN(jQuerythis.attr('height')) || isNaN($this.attr('width'))))
        {
          jQuerythis.attr('height', 9);
          jQuerythis.attr('width', 16);
        }
        var height = ( this.tagName.toLowerCase() === 'object' || (jQuerythis.attr('height') && !isNaN(parseInt(jQuerythis.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : jQuerythis.height(),
            width = !isNaN(parseInt(jQuerythis.attr('width'), 10)) ? parseInt(jQuerythis.attr('width'), 10) : jQuerythis.width(),
            aspectRatio = height / width;
        if(!jQuerythis.attr('id')){
          var videoID = 'fitvid' + Math.floor(Math.random()*999999);
          jQuerythis.attr('id', videoID);
        }
        jQuerythis.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+'%');
        jQuerythis.removeAttr('height').removeAttr('width');
      });
    });
  };
// Works with either jQuery or Zepto
})( window.jQuery || window.Zepto );

jQuery(document).ready(function() {
// Basic FitVids Test
jQuery(".container").fitVids();
// Custom selector and No-Double-Wrapping Prevention Test
jQuery(".container").fitVids({ customSelector: "iframe[src^='http://socialcam.com']"});

});