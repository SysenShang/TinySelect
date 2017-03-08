function fixHeader() {
    var _hmt = _hmt || [];
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

    (function() {
        function hash(str) {
            str = str.toLowerCase();
            // 1315423911=b'1001110011001111100011010100111'
            var code = 1315423911,
                i, ch;
            for (i = str.length - 1; i >= 0; i--) {
                ch = str.charCodeAt(i);
                code ^= ((code << 5) + ch + (code >> 2));
            }

            return (code & 0x7FFFFFFF);
        }

        var container = $('#content');
        if (!container.length) {
            container = $(document.body);
        }
        container.append($('<div>')
            .addClass("ds-thread")
            .attr({
                'data-thread-key': hash(window.location.href),
                'data-title': document.title,
                'data-url': window.location.href
            }));

        window.duoshuoQuery = {
            short_name: "tinyselect"
        };

        $(document.head).append($('<script>').attr({
            type: 'text/javascript',
            async: true,
            src: (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.unstable.js',
            charset: 'UTF-8'
        }));

        $(document.body).append('<a class="duoshuobar" href="#ds-thread">留言</a>');
    })();
}