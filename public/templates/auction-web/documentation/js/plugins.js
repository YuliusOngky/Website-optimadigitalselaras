/* Sintax Highlighter */
/*
 MIT License {@link http://creativecommons.org/licenses/MIT/}
 MIT License {@link http://creativecommons.org/licenses/MIT/}
 MIT License {@link http://creativecommons.org/licenses/MIT/}
 MIT License {@link http://creativecommons.org/licenses/MIT/}
 MIT License {@link http://creativecommons.org/licenses/MIT/}
 MIT License {@link http://creativecommons.org/licenses/MIT/}
*/
"undefined"===typeof window.console&&(window.console={});
"undefined"===typeof window.console.emulated&&("function"===typeof window.console.log?window.console.hasLog=!0:("undefined"===typeof window.console.log&&(window.console.log=function(){}),window.console.hasLog=!1),"function"===typeof window.console.debug?window.console.hasDebug=!0:("undefined"===typeof window.console.debug&&(window.console.debug=!window.console.hasLog?function(){}:function(){for(var a=["console.debug:"],b=0;b<arguments.length;b++)a.push(arguments[b]);window.console.log.apply(window.console,
a)}),window.console.hasDebug=!1),"function"===typeof window.console.warn?window.console.hasWarn=!0:("undefined"===typeof window.console.warn&&(window.console.warn=!window.console.hasLog?function(){}:function(){for(var a=["console.warn:"],b=0;b<arguments.length;b++)a.push(arguments[b]);window.console.log.apply(window.console,a)}),window.console.hasWarn=!1),"function"===typeof window.console.error?window.console.hasError=!0:("undefined"===typeof window.console.error&&(window.console.error=function(){var a=
"An error has occured.";if(window.console.hasLog){for(var a=["console.error:"],b=0;b<arguments.length;b++)a.push(arguments[b]);window.console.log.apply(window.console,a);a="An error has occured. More information is available in your browser's javascript console."}for(b=0;b<arguments.length;++b){if(typeof arguments[b]!=="string")break;a=a+("\n"+arguments[b])}if(typeof Error!=="undefined")throw Error(a);throw a;}),window.console.hasError=!1),"function"===typeof window.console.trace?window.console.hasTrace=
!0:("undefined"===typeof window.console.trace&&(window.console.trace=function(){window.console.error("console.trace does not exist")}),window.console.hasTrace=!1),window.console.emulated=!0);
(function(a){a.appendStylesheet=a.appendStylesheet||function(b,c){if(!document.body){setTimeout(function(){a.appendStylesheet.apply(a,[b,c])},500);return a}var d="stylesheet-"+b.replace(/[^a-zA-Z0-9]/g,""),e=a("#"+d);typeof c==="undefined"&&(c=false);if(e.length===1)if(c)e.remove();else return a;var e=document.getElementsByTagName(a.browser.safari?"head":"body")[0],f=document.createElement("link");f.type="text/css";f.rel="stylesheet";f.media="screen";f.href=b;f.id=d;e.appendChild(f);return a};a.appendScript=
a.appendScript||function(b,c){if(!document.body){setTimeout(function(){a.appendScript.apply(a,[b,c])},500);return a}var d="script-"+b.replace(/[^a-zA-Z0-9]/g,""),e=a("#"+d);typeof c==="undefined"&&(c=false);if(e.length===1)if(c)e.remove();else return a;var e=document.getElementsByTagName(a.browser.safari?"head":"body")[0],f=document.createElement("script");f.type="text/javascript";f.src=b;f.id=d;e.appendChild(f);return a}})(jQuery);
(function(a){a.fn.findAndSelf=a.fn.findAndSelf||function(b){return a(this).find(b).andSelf().filter(b)};Number.prototype.replace=Number.prototype.replace||function(){return(""+this).replace.apply(this,arguments)};a.SyntaxHighlighter?window.console.warn("SyntaxHighlighter has already been defined..."):a.SyntaxHighlighter={config:{load:true,highlight:true,debug:false,wrapLines:true,lineNumbers:true,stripEmptyStartFinishLines:true,stripInitialWhitespace:true,alternateLines:false,defaultClassname:"highlight",
theme:"balupton",themes:["balupton"],addSparkleExtension:true,prettifyBaseUrl:"http://balupton.github.com/jquery-syntaxhighlighter/prettify",baseUrl:"http://balupton.github.com/jquery-syntaxhighlighter"},init:function(b){var c=this.config,d=c.baseUrl;if(d[d.length-1]==="/")c.baseUrl=d.substr(0,d.length-2);delete d;a.extend(true,this.config,b||{});a.Sparkle&&a.Sparkle.addExtension("syntaxhighlighter",function(){a(this).syntaxHighlight()});a.fn.syntaxHighlight=a.fn.SyntaxHighlight=this.fn;c.load&&this.load();
c.highlight&&this.highlight();return this},load:function(){var b=this.config,c=b.prettifyBaseUrl,d=b.baseUrl,b=b.themes;if(!this.loaded()){a.appendScript(c+"/prettify.min.js");a.appendStylesheet(c+"/prettify.min.css");a.appendStylesheet(d+"/styles/style.min.css");a.each(b,function(b,c){a.appendStylesheet(d+"/styles/theme-"+c+".min.css")});a.browser.msie&&a.appendStylesheet(d+"/styles/ie.min.css");this.loadedExtras=true}return this},loadedExtras:false,loaded:function(){return typeof prettyPrint!==
"undefined"&&this.loadedExtras},determineLanguage:function(a){for(var c=null,d=/lang(uage)?-([a-z0-9]+)/g,e=d.exec(a);e!==null;){c=e[2];e=d.exec(a)}return c},fn:function(){var b=a(this);a.SyntaxHighlighter.highlight({el:b});return this},highlight:function(b){typeof b!=="object"&&(b={});var c=this,d=c.config,e=b.el||false;e instanceof jQuery||(e=a("body"));if(c.loaded()){var f=d.defaultClassname,g="";if(typeof f==="array"){g="."+f.join(",.");f=f.join(" ")}else{f=""+f;g="."+f.replace(" ",",.")}if(g===
"."||!f){window.console.error("SyntaxHighlighter.highlight: Invalid defaultClassname.",[this,arguments],[d.defaultClassname]);window.console.trace()}e=e.findAndSelf("code,pre").filter("[class*=lang],"+g).filter(":not(.prettyprint)");e.css({"overflow-y":"visible","overflow-x":"visible","white-space":"pre"}).addClass("prettyprint "+f).each(function(){var b=a(this),d=b.attr("class"),d=c.determineLanguage(d);b.addClass("lang-"+d)});d.lineNumbers&&e.addClass("linenums");d.theme&&e.addClass("theme-"+d.theme);
d.alternateLines&&e.addClass("alternate");prettyPrint();d.stripEmptyStartFinishLines&&e.find("li:first-child > :first-child, li:last-child > :first-child").each(function(){var b=a(this),d=/^([\r\n\s\t]|\&nbsp;)*$/.test(b.html()),c=b.parent(),c=b.siblings();if(d&&(c.length===0||c.length===1&&c.filter(":last").is("br"))){c=b.parent();b=c.val();c.next().val(b);c.remove()}});d.stripInitialWhitespace&&e.find("li:first-child > :first-child").each(function(){var b=a(this),c=(b.html().match(/^(([\r\n\s\t]|\&nbsp;)+)/)||
[])[1]||"";c.length&&b.parent().siblings().children(":first-child").add(b).each(function(){var b=a(this),d=b.html(),d=d.replace(RegExp("^"+c,"gm"),"");b.html(d)})});d.wrapLines?e.css({"overflow-x":"hidden","overflow-y":"hidden","white-space":"pre-wrap","max-height":"none"}):e.css({"overflow-x":"auto","overflow-y":"auto","white-space":"normal","max-height":"500px"});return this}d.debug&&window.console.debug("SyntaxHighlighter.highlight: Chosen SyntaxHighlighter is not yet defined. Waiting 1200 ms then trying again.");
setTimeout(function(){c.highlight.apply(c,[b])},1200)}}})(jQuery);


/* Scroll To */

/*!
 * jQuery.ScrollTo
 * Copyright (c) 2007-2012 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 4/09/2012
 *
 * @projectDescription Easy element scrolling using jQuery.
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 * @author Ariel Flesler
 * @version 1.4.3.1
 *
 * @id jQuery.scrollTo
 * @id jQuery.fn.scrollTo
 * @param {String, Number, DOMElement, jQuery, Object} target Where to scroll the matched elements.
 *	  The different options for target are:
 *		- A number position (will be applied to all axes).
 *		- A string position ('44', '100px', '+=90', etc ) will be applied to all axes
 *		- A jQuery/DOM element ( logically, child of the element to scroll )
 *		- A string selector, that will be relative to the element to scroll ( 'li:eq(2)', etc )
 *		- A hash { top:x, left:y }, x and y can be any kind of number/string like above.
 *		- A percentage of the container's dimension/s, for example: 50% to go to the middle.
 *		- The string 'max' for go-to-end. 
 * @param {Number, Function} duration The OVERALL length of the animation, this argument can be the settings object instead.
 * @param {Object,Function} settings Optional set of settings or the onAfter callback.
 *	 @option {String} axis Which axis must be scrolled, use 'x', 'y', 'xy' or 'yx'.
 *	 @option {Number, Function} duration The OVERALL length of the animation.
 *	 @option {String} easing The easing method for the animation.
 *	 @option {Boolean} margin If true, the margin of the target element will be deducted from the final position.
 *	 @option {Object, Number} offset Add/deduct from the end position. One number for both axes or { top:x, left:y }.
 *	 @option {Object, Number} over Add/deduct the height/width multiplied by 'over', can be { top:x, left:y } when using both axes.
 *	 @option {Boolean} queue If true, and both axis are given, the 2nd axis will only be animated after the first one ends.
 *	 @option {Function} onAfter Function to be called after the scrolling ends. 
 *	 @option {Function} onAfterFirst If queuing is activated, this function will be called after the first scrolling ends.
 * @return {jQuery} Returns the same jQuery object, for chaining.
 *
 * @desc Scroll to a fixed position
 * @example $('div').scrollTo( 340 );
 *
 * @desc Scroll relatively to the actual position
 * @example $('div').scrollTo( '+=340px', { axis:'y' } );
 *
 * @desc Scroll using a selector (relative to the scrolled element)
 * @example $('div').scrollTo( 'p.paragraph:eq(2)', 500, { easing:'swing', queue:true, axis:'xy' } );
 *
 * @desc Scroll to a DOM element (same for jQuery object)
 * @example var second_child = document.getElementById('container').firstChild.nextSibling;
 *			$('#container').scrollTo( second_child, { duration:500, axis:'x', onAfter:function(){
 *				alert('scrolled!!');																   
 *			}});
 *
 * @desc Scroll on both axes, to different values
 * @example $('div').scrollTo( { top: 300, left:'+=200' }, { axis:'xy', offset:-20 } );
 */

;(function( $ ){
	
	var $scrollTo = $.scrollTo = function( target, duration, settings ){
		$(window).scrollTo( target, duration, settings );
	};

	$scrollTo.defaults = {
		axis:'xy',
		duration: parseFloat($.fn.jquery) >= 1.3 ? 0 : 1,
		limit:true
	};

	// Returns the element that needs to be animated to scroll the window.
	// Kept for backwards compatibility (specially for localScroll & serialScroll)
	$scrollTo.window = function( scope ){
		return $(window)._scrollable();
	};

	// Hack, hack, hack :)
	// Returns the real elements to scroll (supports window/iframes, documents and regular nodes)
	$.fn._scrollable = function(){
		return this.map(function(){
			var elem = this,
				isWin = !elem.nodeName || $.inArray( elem.nodeName.toLowerCase(), ['iframe','#document','html','body'] ) != -1;

				if( !isWin )
					return elem;

			var doc = (elem.contentWindow || elem).document || elem.ownerDocument || elem;
			
			return /webkit/i.test(navigator.userAgent) || doc.compatMode == 'BackCompat' ?
				doc.body : 
				doc.documentElement;
		});
	};

	$.fn.scrollTo = function( target, duration, settings ){
		if( typeof duration == 'object' ){
			settings = duration;
			duration = 0;
		}
		if( typeof settings == 'function' )
			settings = { onAfter:settings };
			
		if( target == 'max' )
			target = 9e9;
			
		settings = $.extend( {}, $scrollTo.defaults, settings );
		// Speed is still recognized for backwards compatibility
		duration = duration || settings.duration;
		// Make sure the settings are given right
		settings.queue = settings.queue && settings.axis.length > 1;
		
		if( settings.queue )
			// Let's keep the overall duration
			duration /= 2;
		settings.offset = both( settings.offset );
		settings.over = both( settings.over );

		return this._scrollable().each(function(){
			// Null target yields nothing, just like jQuery does
			if (target == null) return;

			var elem = this,
				$elem = $(elem),
				targ = target, toff, attr = {},
				win = $elem.is('html,body');

			switch( typeof targ ){
				// A number will pass the regex
				case 'number':
				case 'string':
					if( /^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(targ) ){
						targ = both( targ );
						// We are done
						break;
					}
					// Relative selector, no break!
					targ = $(targ,this);
					if (!targ.length) return;
				case 'object':
					// DOMElement / jQuery
					if( targ.is || targ.style )
						// Get the real position of the target 
						toff = (targ = $(targ)).offset();
			}
			$.each( settings.axis.split(''), function( i, axis ){
				var Pos	= axis == 'x' ? 'Left' : 'Top',
					pos = Pos.toLowerCase(),
					key = 'scroll' + Pos,
					old = elem[key],
					max = $scrollTo.max(elem, axis);

				if( toff ){// jQuery / DOMElement
					attr[key] = toff[pos] + ( win ? 0 : old - $elem.offset()[pos] );

					// If it's a dom element, reduce the margin
					if( settings.margin ){
						attr[key] -= parseInt(targ.css('margin'+Pos)) || 0;
						attr[key] -= parseInt(targ.css('border'+Pos+'Width')) || 0;
					}
					
					attr[key] += settings.offset[pos] || 0;
					
					if( settings.over[pos] )
						// Scroll to a fraction of its width/height
						attr[key] += targ[axis=='x'?'width':'height']() * settings.over[pos];
				}else{ 
					var val = targ[pos];
					// Handle percentage values
					attr[key] = val.slice && val.slice(-1) == '%' ? 
						parseFloat(val) / 100 * max
						: val;
				}

				// Number or 'number'
				if( settings.limit && /^\d+$/.test(attr[key]) )
					// Check the limits
					attr[key] = attr[key] <= 0 ? 0 : Math.min( attr[key], max );

				// Queueing axes
				if( !i && settings.queue ){
					// Don't waste time animating, if there's no need.
					if( old != attr[key] )
						// Intermediate animation
						animate( settings.onAfterFirst );
					// Don't animate this axis again in the next iteration.
					delete attr[key];
				}
			});

			animate( settings.onAfter );			

			function animate( callback ){
				$elem.animate( attr, duration, settings.easing, callback && function(){
					callback.call(this, target, settings);
				});
			};

		}).end();
	};
	
	// Max scrolling position, works on quirks mode
	// It only fails (not too badly) on IE, quirks mode.
	$scrollTo.max = function( elem, axis ){
		var Dim = axis == 'x' ? 'Width' : 'Height',
			scroll = 'scroll'+Dim;
		
		if( !$(elem).is('html,body') )
			return elem[scroll] - $(elem)[Dim.toLowerCase()]();
		
		var size = 'client' + Dim,
			html = elem.ownerDocument.documentElement,
			body = elem.ownerDocument.body;

		return Math.max( html[scroll], body[scroll] ) 
			 - Math.min( html[size]  , body[size]   );
	};

	function both( val ){
		return typeof val == 'object' ? val : { top:val, left:val };
	};

})( jQuery );