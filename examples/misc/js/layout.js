function fixHeader() {var _hmt = _hmt || [];
	(function() {
	  var hm = document.createElement("script");
	  hm.src = "https://hm.baidu.com/hm.js?8eaadfe1d8e7bd63e5b87dacb0b27ce1";
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