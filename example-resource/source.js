$(function() {
    function autoIndent(html) {
        var indent;
        return $.each(html.split('\n'), function(i, line) {
            if (/^\s*$/.test(line)) {
                return line;
            }
            if (!indent) {
                indent = /^ */.exec(line)[0].length;
            }

            return line.substring(indent);
        }).join('\n');
    }

    function loadLessjs() {
        $.getScript('../lib/less.min.js');
    }

    var codeheader = $('<div class="sourceheader">').text('代码');
    var codeblock = $('<div>');

    $(document.body)
        .append(codeheader)
        .append(codeblock);

    CodeMirror(codeblock.get(0), {
        value: autoIndent($('script:not([src]):first').html()),
        lineNumbers: true,
        readOnly: true,
        matchBrackets: true,
        mode: 'text/javascript'
    }).setSize('auto', 'auto');

    var less = $('link[rel="stylesheet/less"]');
    if (!less.length) {
        return;
    }
    var lessfile = less.filter('[data-code=true]');

    if (!lessfile.length) {
        loadLessjs();
        return;
    }


    $.get(lessfile.attr('href')).then(function(lesstext) {
        var styleheader = $('<div class="sourceheader">').text('样式');
        var styleblock = $('<div>');

        $(document.body)
            .append(styleheader)
            .append(styleblock);

        CodeMirror(styleblock.get(0), {
            value: lesstext,
            lineNumbers: true,
            readOnly: true,
            matchBrackets: true,
            mode: 'text/x-less'
        }).setSize('auto', 'auto');

        loadLessjs();
    });
});