module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                preserveComments: false
            },
            build: {
                src: './scripts.js',
                dest: './scripts.min.js'
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false
            },
            target: {
                files: {
                    'style.min.css': ['style.css']
                }
            }
        },
        clean: {
            main: ['vendor/**', '.sass-cache/**', 'style.css', 'style.css.map']
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'bower_components',
                        src: ['./*/dist/**', './jquery_lazyload/**'],
                        dest: './vendor'
                    }
                ]
            }
        },
        sass: { // Task
            dist: { // Target
                files: { // Dictionary of files
                    'style.css': 'style.scss', // 'destination': 'source'
                },
                sourcemap: 'none'
            }
        },
        connect: {
            server: {
                options: {
                    hostname: 'localhost',
                    base: './',
                    keepalive: true,
                    livereload: true
                }
            }
        },
        watch: {
            all: {
                options: {
                    livereload: true
                },
                files: ["./style.scss", "./index.html"],
                tasks: ["sass:dist", "validation", "postcss:dist"]
            }
        },
        validation: {
            options: {
                generateReport: false,
                relaxerror: ['Element "img" is missing required attribute "src".']
            },
            files: {
                src: ['index.html']
            }
        },
        postcss: {
            options: {
                processors: [
                    require('pixrem'),
                    require('autoprefixer')({
                        browsers: 'last 2 versions'
                    })
                ]
            },
            dist: {
                src: 'style.css'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-w3c-html-validation');
    grunt.loadNpmTasks('grunt-postcss');

    // Default task(s).
    grunt.registerTask('default', ['clean', 'uglify', 'validation', 'sass:dist', 'postcss:dist', 'cssmin', 'copy']);

    grunt.registerTask('serve', ['clean', 'uglify', 'validation', 'sass:dist', 'postcss:dist', 'cssmin', 'copy', 'connect']);

};
