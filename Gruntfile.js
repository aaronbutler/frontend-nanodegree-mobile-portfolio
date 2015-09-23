/*
Last things first: the files that should be served are in the deploy folder.

Notes:
The goal of this build script is to take the html, css, and js files as I write them,
run javascript through hint/lint utilities,
and make minified versions of everything.

In particular, I will not automatically concatenate files or put external files inline in the html.
I will also handle any image optimization manually or as part of a separate script.
Maybe someday I will automate, but for now I will do that manually.

I have stub code in here for making prettified versions of files, but I'm not happy with it.
I will follow
https://github.com/jscs-dev/grunt-jscs/
to see if that at least would help with style guide conformance, but for now I won't bother.

At some point, hopefully ngrok will get their scriptability problem straightened out
and I can see if the ngrok/pageinsights part works.

*/

'use strict'

//var ngrok = require('ngrok');

module.exports = function(grunt) {

  //require('load-grunt-tasks')(grunt);

  grunt.initConfig({
	jshint: {
		options: {
      curly: true,
      eqeqeq: true,
      eqnull: true
    },
    all: ['source/js/*.js','source/views/js/*.js'],
	deploy: ['deploy/js/*.js']
  },
    prettify: {
    options: {
    indent: 1,
    indent_char: '	',
    wrap_line_length: 80,
    brace_style: 'end-expand',
    unformatted: ['a', 'sub', 'sup', 'b', 'i', 'u']
  },
    all: {
    expand: true,
    cwd: 'source/',
    ext: '.html',
    src: ['*.html'],
    dest: 'pretty/'
  }
  },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
		  minifyJS: true,
		  minifyCSS: true
        },
        files: [{
			expand: true,     // Enable dynamic expansion.
      cwd: 'source/',      // Src matches are relative to this path.
      src: ['*.html','views/*.html'], // Actual pattern(s) to match.
      dest: 'deploy/',   // Destination path prefix.
      ext: '.html',   // Dest filepaths will have this extension.
      extDot: 'first'   // Extensions in filenames begin after the first dot
			
          //'deploy/': 'source/*.html'
        }]
      }
    },
	uglify: {
    dist: {
      files: [{
          expand: true,
          cwd: 'source/',
          src: ['js/*.js','views/js/*.js'],
          dest: 'deploy/'
      }]
    },
	pretty: {
		options: {
			beautify: true
		},
		files: [{
          expand: true,
          cwd: 'source/js',
          src: '*.js',
          dest: 'pretty/js'
      }]
	}
  },
  cssmin: {
  dist: {
    files: [{
      expand: true,
      cwd: 'source/',
      src: ['css/*.css','views/css/*.css', '!*.min.css'],
      dest: 'deploy/',
      ext: '.css'
    }]
  }
},
	pagespeed: {
      options: {
        nokey: true,
        locale: "en_GB",
        threshold: 40
      },
      local: {
        options: {
          strategy: "desktop"
        }
      },
      mobile: {
        options: {
          strategy: "mobile"
        }
      }
    },
	
	copy: {
  main: {
    expand: true,
    cwd: 'source/',
    src: ['img/**','views/images/**'],
    dest: 'deploy/',
    flatten: false,
    filter: 'isFile',
  },
},
  });
  
  // Register custom task for ngrok
  //Note: as of 9/19 this always yields a 103/502 error about custom subdomains
  //probably https://github.com/inconshreveable/ngrok/issues/243
  //so removing task from default until this gets fixed or I understand a workaround
  /*grunt.registerTask('psi-ngrok', 'Run pagespeed with ngrok', function() {
    var done = this.async();
    var port = 80;

    ngrok.connect({
		proto: 'http',
		addr: 80,
		//subdomain: null,
		authtoken: 'dont forget to use this'
	}, function(err, url) {
      if (err !== null) {
        grunt.fail.fatal(err);
        return done();
      }
	  var _url = url+"/perfpizza";
      grunt.config.set('pagespeed.options.url', _url);
      grunt.task.run('pagespeed');
      done();
    });
  });*/
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-prettify');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  //grunt.loadNpmTasks('grunt-ngrok');
  //grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  //grunt.loadNpmTasks('grunt-mkdir');
  grunt.registerTask('default', ['jshint:all','htmlmin:dist','uglify:pretty','uglify:dist','cssmin:dist','copy:main']);
};
