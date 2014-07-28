'use strict';

module.exports = function(grunt) {
    var transport = require('grunt-cmd-transport');
    var style = transport.style.init(grunt);
    var text = transport.text.init(grunt);
    var script = transport.script.init(grunt);
 
    // wrap配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),   // 加载配置文件
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> \n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

        appjsFiles: grunt.file.readJSON('updateAppjs.json'),  // 加载需要压缩的文件的json文件

        clean: {    // 清空dist目录
            appjs: ["dist/appjs/**/*", "!dist/appjs/**/*.svn"],
            basejs: ["dist/basejs/**/*", "!dist/basejs/**/*.svn"],
            css: ["dist/css/**/*", "!dist/css/**/*.svn"],
            moudlejs: ["dist/moudlejs/**/*", "!dist/moudlejs/**/*.svn"],
            build: '.build'
        },

        transport: {
            options: {
                paths: ['moudlejs/'],
                parsers: {
                    '.js': [script.jsParser],
                    '.css': [style.css2jsParser],
                    '.html': [text.html2jsParser]
                }
            },
            moudlejs: {
                files: [{
                    expand: true,
                    cwd: 'moudlejs/',
                    src: ['**/*','!**/*.html'],
                    dest: '.build/moudlejs/',
                }]
            },
            appjs: {
                options : {
                    idleading : '/public/dist/appjs/'
                },
                files: [
                    {
                        cwd: 'appjs/',
                        src: '<%= appjsFiles %>',
                        filter: 'isFile',
                        dest: '.build/appjs'
                    }
                ]
            }
        },

        concat: {
            options: {
                paths: ['.build/moudlejs/'],
                include: 'relative'
            },
            moudlejs: {
                files: [
                    {
                        expand: true,
                        cwd: '.build/',
                        src: ['moudlejs/**/*.js'],
                        dest: '.build/',
                        ext: '.js'
                    }
                ]
            },
            appjs: {
                options: {
                    include: 'all'
                },
                files: [
                    {
                        expand: true,
                        cwd: '.build/appjs/',
                        src: '<%= appjsFiles %>',
                        dest: '.build/appjs/',
                        ext: '.js'
                    }
                ]
            }
        },

        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            basejs: { // 基础库相关
                files: {
                    'dist/basejs/base.min.js': ['basejs/jquery.js', 'basejs/prototype.js', 'basejs/upgtool.js']
                }
            },
            seajs: {    // seajs及其组建相关
                files: {
                    'dist/basejs/seajs.min.js': ['basejs/sea.js', 'basejs/seastyle.js']
                }
            },
            moudlejs: {  // seajs模块
                files: [
                    {
                        expand: true,
                        cwd: '.build/',
                        src: ['moudlejs/**/*.js', '!moudlejs/**/*-debug.js'],
                        dest: 'dist/',
                        ext: '.js'
                    }
                ]
            },
            appjs: {    // 应用对应的js文件
                files: [
                    {
                        expand: true,
                        cwd: '.build/appjs/',
                        src: '<%= appjsFiles %>',
                        dest: 'dist/appjs/',
                        ext: '.js'
                    }
                ]
            },
            spider: {
                files: {
                    'dist/componentjs/highcharts/js/app/highcharts.spider.min.js': ['componentjs/highcharts/js/highcharts.js', 'componentjs/highcharts/js/modules/exporting.js', 'componentjs/highcharts/js/highcharts-more.js']
                }
            }
        },

        cssmin: {   // css压缩、合并
            options: {
                banner: '<%= banner %>'
            },
            basecss: {    // 整站通用基础css
                files: {
                    'dist/css/base.min.css': ['css/global.css', 'css/common.css']
                }
            },
            moudlecss: {    // moudle模块里面的css
                files: [
                    {
                        expand: true,
                        cwd: 'moudlejs/',
                        src: ['**/*.css'],
                        dest: 'dist/moudlejs/',
                        ext: '.css'
                    }
                ]
            }
        },

        copy: { // 文件copy
            moudlehtml: {
                files: [
                    {
                        expand: true,
                        cwd: 'moudlejs/',
                        src: ['**/*.html'],
                        dest: 'dist/moudlejs/',
                        ext: '.html'
                    }
                ]
            },
            moudlejs: {
                files: [
                    {
                        expand: true,
                        cwd: 'moudlejs/',
                        src: ['datepicker/calendar.js'],
                        dest: 'dist/moudlejs/',
                        ext: '.js'
                    }
                ]
            },
            moudleswf: {
                files: [
                    {
                        expand: true,
                        cwd: 'moudlejs/',
                        src: ['**/*.swf'],
                        dest: 'dist/moudlejs/',
                        ext: '.swf'
                    }
                ]
            }
        },

        imagemin: { // 批量无损压缩图片
            image: {
                options: {
                    optimizationLevel: 3 //定义 PNG 图片优化水平
                },
                files: [{
                    expand: true,
                    cwd: 'image/',
                    src: ['**/*.{png,jpg,jpeg,gif}'], // 优化 image 目录下所有 png/jpg/jpeg/gif 图片
                    dest: 'image/' // 优化后的图片保存位置，覆盖旧图片，并且不作提示
                }]
            }
        },

        watch: {
            basejs: { // 基础库相关
                files: ['basejs/jquery.js', 'basejs/prototype.js', 'basejs/upgtool.js', 'basejs/common.js'],
                tasks: ['uglify:basejs']
            },
            seajs: {    // seajs及其组建相关
                files: ['basejs/sea.js', 'basejs/seastyle.js'],
                tasks: ['uglify:seajs']
            },
            moudlejs: {  // seajs模块
                files: ['moudlejs/**/*.js', 'moudlejs/**/*.css', '!moudlejs/**/*-debug.js'],
                tasks: ['transport', 'concat', 'uglify:moudlejs', 'uglify:appjs']
            },
            // appjs: {    // 应用对应的js文件
            //     files: ['appjs/**/*.js', '!appjs/**/*-debug.js'],
            //     tasks: ['transport:appjs', 'concat:appjs', 'uglify:appjs']
            // },
            spider: {
                files: ['componentjs/highcharts/js/highcharts.js', 'componentjs/highcharts/js/modules/exporting.js', 'componentjs/highcharts/js/highcharts-more.js'],
                tasks: ['uglify:spider']
            },
            basecss: {    // 整站通用基础css
                files: ['css/global.css', 'css/common.css'],
                tasks: ['cssmin:basecss']
            }
        }
    });

    // 加载需要的Grunt插件
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-cmd-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');

    // 注册默认任务.
    grunt.registerTask('default', ['transport', 'concat', 'uglify', 'cssmin', 'copy']);
};