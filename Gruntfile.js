module.exports = function (grunt) {
  grunt.initConfig({
    browserSync: {
      dev: {
        bsFiles: {
          src: [
            'src/styles/*.css',
            'src/*.js',
            'src/*.html'
          ]
        },
        options: {
          watchTask: true,
          server: {
            baseDir: './',
            routes: {
              '/random-planet': './src',
              '/node_modules': './node_modules'
            }
          },
          https: true,
          startPath: '/random-planet'
        }
      },
      stg: {
        options: {
          server: {
            baseDir: './',
            routes: { '/random-planet': './src' }
          },
          httpModule: 'http2',
          https: true,
          startPath: '/random-planet'
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
    },
    copy: {
      main: {
        files: [
          { expand: true, cwd: 'src', src: ['*', '!test.*'], dest: 'dist/', filter: 'isFile' },
          { expand: true, cwd: 'src', src: ['icons/*.png'], dest: 'dist/' },
          { expand: true, cwd: 'src', src: ['styles/**', '!styles/*.less'], dest: 'dist/' },
          { expand: true, cwd: 'src', src: ['templates/*'], dest: 'dist/' }
        ]
      }
    },
    'gh-pages': {
      options: {
        base: 'dist'
      },
      src: ['**']
    }
  })

  // load npm tasks
  grunt.loadNpmTasks('grunt-browser-sync')
  grunt.loadNpmTasks('grunt-contrib-less')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-gh-pages')

  // define default task
  grunt.registerTask('default', ['less', 'browserSync:dev', 'watch'])
  grunt.registerTask('build', ['less', 'copy'])
  grunt.registerTask('stage', ['build', 'browserSync:stg'])
  grunt.registerTask('deploy', ['build', 'gh-pages'])
}
