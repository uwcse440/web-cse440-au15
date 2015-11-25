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
                    keepalive: true,
                    base: './',
                    livereload: true
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'sass:dist']);

    grunt.registerTask('serve', ['uglify', 'sass:dist', 'connect']);

};