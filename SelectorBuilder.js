(function() {

    var prefix = [
        '.', '#', ' ', '>'
    ];
    var suffix = [
        'button',
        'checked',
        'first',
        'last',
        'password',
        'selected',
        'text',
        'visible',
    ];

    var FLAGS = {
        '0': null
    };

    for(var i = 0; i < prefix.length; i++) {
        var item = prefix[i];
        FLAGS[item] = item;
    }

    for(var i = 0; i < suffix.length; i++) {
        var item = suffix[i];
        FLAGS[item[0]] = ':' + item;
    }

    function resolveFlag(name, flags) {
        if(!name) {
            return '';
        }

        name = name.toString();

        flags = flags ? flags.toString() : '.';

        var temp = [name];
        var space = '';

        for(var i = 0; i < flags.length; i++) {
            var key = flags[i];

            if(!FLAGS.hasOwnProperty(key)) {
                console.warn('Flag "' + key + '" can not be recongnized');
                continue;
            }

            var flag = FLAGS[key];

            if(flag === null) {
                continue;
            }

            // 特殊处理 s: 空格
            if(key === ' ') {
                space = flag;
                console.log(space)
                continue;
            }

            // 前缀
            if(flag[0] === '^') {
                temp.unshift(flag.substr(1));
            } else {
                // 后缀
                temp.push(flag);
            }
        }

        return space + temp.join('');
    }

    function done(flags) {
        return !flags || flags.indexOf('0') === -1 ?
            this : this.toString();
    }

    window.SelectorBuilder = function SelectorBuilder(name, flags) {
        return new SelectorBuilder.prototype.init()
            .build(name, flags);
    }

    SelectorBuilder.prototype = {
        constructor: SelectorBuilder,
        init: function() {
            this.selector = [];
            return this;
        },
        build: function(name, flags) {
            this.selector.push(resolveFlag(name, flags));
            return done.call(this, flags);
        },
        attr: function(key, value, flags) {
            if(!key) {
                return this;
            }

            var name;

            key = key.toString();

            if(!value) {
                name = '[' + key + ']';
            } else {
                name = '[' + key + '=' + value.toString() + ']';
            }

            this.selector.push(resolveFlag(name, flags));

            return done.call(this, flags);
        },
        not: function(name, flags) {
            var temp = resolveFlag(name, flags);
            if(temp) {
                temp = ':not(' + temp + ')';
            }

            this.selector.push(temp);

            return done.call(this, flags);
        },
        child: function(name, flags) {
            return this.build(name, flags + ' ');
        },
        sub: function(name, flags) {
            return this.build(name, flags + '>');
        },
        toString: function() {
            return this.selector.join('');
        }
    };

    SelectorBuilder.prototype.init.prototype = SelectorBuilder.prototype;
})();