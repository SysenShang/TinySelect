module.exports = function(grunt) {
    var headerinfo = '/**' +
        '\n * TinySelect <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %>' +
        '\n * @作者: hyjiacan' +
        '\n * @源码: <%= pkg.repository.url %>' +
        '\n * @示例: <%= pkg.example %>' +
        '\n * @许可协议: <%= pkg.license %>' +
        '\n * @依赖: jQuery 1.8.0及更高版本' +
        '\n * @浏览器支持: 不支持IE8及更低版本' +
        '\n * @QQ群: 187786345 (Javascript爱好者)' +
        '\n */\n';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['src/*.js'],
            options: {
                globals: {
                    window: true,
                    jQuery: true
                },
                strict: true,
                // 浏览器环境 
                browser: true,
                // 写完一行必须加个分号
                asi: false,
                // 不要在条件语句中赋值
                boss: false,
                // 语句块请使用{}包围
                curly: true,
                // 始终使用 === 和 !== 作比较
                eqeqeq: true,
                // 不想在程序中用 eval这种危险的东西
                evil: false,
                // 变量都应该先声明后使用
                undef: true,
                // 变量声明了就要用，不然声明来做啥
                unused: true,
                // 调试模式，开启才允许 debugger 语句
                debug: true,
                // 遇到8个错误就停止检查了
                maxerr: 8,
                // 请不要使用 arguments.caller/calee
                noarg: true
            }
        },
        watch: {
            scripts: {
                files: ['<%= jshint.files %>'],
                tasks: ['jshint', 'uglify']
            },
            css: {
                files: ['src/*.less'],
                tasks: ['less']
            }
        },
        less: {
            options:{
                compress: true
            },
            compile: {
                files: {
                    'dist/tinyselect.css': 'src/tinyselect.less'
                }
            }
        },
        uglify: {
            options: {
                banner: headerinfo,
                sourceMap: true
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['src/<%= pkg.name %>.js']
                }
            }
        },
        copy: {
            img: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['img/*'],
                    dest: 'dist'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['jshint', 'less', 'uglify', 'copy']);

};