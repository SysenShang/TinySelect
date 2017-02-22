function fixHeader() {var _hmt = _hmt || [];
	(function() {
	  var hm = document.createElement("script");
	  hm.src = "https://hm.baidu.com/hm.js?3b889148d3a97c2e11263168434b1788";
	  var s = document.getElementsByTagName("script")[0]; 
	  s.parentNode.insertBefore(hm, s);
	})();
    var resizeHandler;
    $(window).resize(function() {
        clearTimeout(resizeHandler);

        resizeHandler = setTimeout(function() {
            if ($(window).width() < 992) {
                $('.navbar:first').removeClass('navbar-fixed-top');
            } else {
                $('.navbar:first').addClass('navbar-fixed-top');
            }
        }, 100);
    }).resize();
}