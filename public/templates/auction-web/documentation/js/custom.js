jQuery(document).ready(function($){
        
        /* Init Sintax Highlighter */
        /*function initSintaxHighlight() {
                $.SyntaxHighlighter.init();
        }
        
        initSintaxHighlight();*/
        
        /* Init ScrollTo Plugin */
        function initScrollTo() {
                
	$("ul.chapters").find("a").click(function(e){
	        e.preventDefault();
	        var divid = $(this).attr("href");
	        $(window).scrollTo($(divid),500,{offset:-100});
                        window.location.hash = divid;
	       
                });
                return false;
        }
        initScrollTo();
        
});        
