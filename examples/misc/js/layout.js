function fixHeader() {
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