module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
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
                        src: ['./*/dist/**'],
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
                tasks: ["sass:dist", "validation"]
            }
        },
        validation: {
            options: {
                generateReport: false
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

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-w3c-html-validation');
    grunt.loadNpmTasks('grunt-postcss');

    // Default task(s).
    grunt.registerTask('default', ['clean', 'uglify', 'sass:dist', 'postcss:dist', 'copy', 'validation']);

    grunt.registerTask('serve', ['clean', 'uglify', 'sass:dist', 'postcss:dist', 'copy', 'validation', 'connect']);

};
