module.exports = grunt => {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      css: {
        src: ['bower_components/bootstrap/dist/css/bootstrap.css', 'client/public/css/styles.css'],
        dest: 'dist/css/styles.css',
      },
      js: {
        src: [
          'bower_components/jquery/dist/jquery.min.js',
          'bower_components/bootstrap/dist/js/bootstrap.min.js',
          'client/public/js/script.js',
        ],
        dest: 'dist/js/scripts.js',
      },
    },
    uglify: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n',
      },
      build: {
        files: {
          'dist/js/script.min.js': 'dist/js/scripts.js',
        },
      },
    },
    cssmin: {
      build: {
        files: {
          'dist/css/style.min.css': 'dist/css/styles.css',
        },
      },
    },
    watch: {
      express: {
        files: ['dist/views/*.html', 'client/public/css/*.css', 'client/public/js/*.js'],
        tasks: ['express:dev'],
        options: {
          spawn: false,
          livereload: true,
        },
      },
      js: {
        files: 'client/public/js/*.js',
        tasks: ['concat:js'],
      },
      css: {
        files: 'client/public/css/*.css',
        tasks: ['concat:css'],
      },
    },
    express: {
      options: {
        livereload: true,
      },
      dev: {
        options: {
          script: './server/server.js',
        },
      },
    },
  });
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');

  grunt.registerTask('default', ['concat', 'cssmin', 'uglify']);
  grunt.registerTask('server', ['express:dev', 'watch']);
};
