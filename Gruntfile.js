module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['public/js/src/**/*.js'],
                dest: 'public/js/dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'public/js/dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'public/js/src/**/*.js', 'test/**/*.js', '!test/unit/lib/**/*.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    console: true
                    //module: true,
                    //document: true
                }
            }
        },
        sass: {
            dist: {
                files: {
                    'public/css/mq.css': 'public/sass/mq.scss',
                    'public/css/no-mq.css': 'public/sass/no-mq.scss'
                }
            }
        },
        csslint: {
            lax: {
                options: {
                    'star-property-hack': false
                },
                src: ['public/css/*.css']
            }
        },
        cssmin: {
            minify: {
                expand: true,
                cwd: 'public/css/',
                src: ['*.css', '!*.min.css'],
                dest: 'public/css/',
                ext: '.min.css'
            }
        },
        htmllint: {
            all: ['public/views/*.html'] //,'views/*.ejs'
        },
        jsdoc : {
            dist : {
                src: ['public/js/src/**/*.js', 'test/**/*.js'],
                options: {
                    destination: 'doc'
                }
            }
        },
        karma: {
            unit: {
                configFile: 'test/karma.conf.js',
                background: true
                //autoWatch: true
            }
            //continuous integration mode: run tests once in PhantomJS browser.
            /*continuous: {
                configFile: 'test/karma.conf.js',
                singleRun: true,
                browsers: ['PhantomJS']
            }*/
        },
        watch: {
            scripts: {
                files: ['<%= jshint.files %>'],
                tasks: ['jshint','concat']
            },
            css: {
                files: ['public/sass/**/*.scss'],
                tasks: ['sass']
            },
            html: {
                files: ['<%= htmllint.all %>'],
                tasks: ['htmllint']
            },
            karma: {
                files: ['public/js/**/*.js', 'test/unit/**/*.js'],
                tasks: ['karma:unit:run']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-html');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-watch'); 

    grunt.registerTask('test', ['htmllint', 'csslint', 'jshint', 'karma']);
    grunt.registerTask('build', ['cssmin', 'concat', 'uglify']);
    grunt.registerTask('default', ['csslint', 'cssmin', 'jshint', 'karma', 'concat', 'uglify']);

};
