module.exports = function (grunt) {
  grunt.initConfig({
    browserSync: {
      dev: {
        bsFiles: {
          src: [
            'styles/*.css',
            '*.js'
            '*.html'
          ]
        },
        options: {
          watchTask: true,
          server: './src'
        }
      }
    },
    less: {
      dev: {
        files: {
          'src/styles/main.css': 'src/styles/main.less'
        }
      }
    },
    watch: {
      files: 'src/styles/**/*.less',
      tasks: ['less']
    }
  })

  // load npm tasks
  grunt.loadNpmTasks('grunt-browser-sync')
  grunt.loadNpmTasks('grunt-contrib-less')
  grunt.loadNpmTasks('grunt-contrib-watch')

  // define default task
  grunt.registerTask('default', ['browserSync', 'watch'])
}
