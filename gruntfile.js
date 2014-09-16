module.exports = function(grunt){
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-open');
	grunt.registerTask('server', 'Runs socket.io and express server', function() {
		require("./server");
	});
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
		concat: {
            dist: {
                src: [ "client/constants.js", "client/entitymanager.js", "client/graphics.js", "client/multiplayermanager.js", "client/tilemanager.js", "client/game.js"],
                dest: 'public/js/compiled.js'
            }
        },
		watch: {
		    js: {
		        files: ['*', 'client/**/*.js', 'public/*', 'public/css/*', 'public/img/*'],
		        tasks: ['concat']
		    }
		},
		// open: {
//             dev: {
//                 path: 'http://localhost:3000/'
//             }
//         }
    });
	
    grunt.registerTask('default', ["concat", "server", "watch"]);

};