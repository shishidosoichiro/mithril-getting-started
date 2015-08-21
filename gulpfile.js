var gulp = require('gulp');
var plumber = require('gulp-plumber');
var msx = require('gulp-msx');
var del = require('del');
var spawn = require('child_process').spawn;

var error = function(e) {
	console.error(e.message + '\n  in ' + e.fileName)
};

var paths = {
	del: 'public/js/*',
	msx: 'msx/**.jsx',
	server: ['views/**', 'routes/**', 'lib/**', 'index.js'],
	js: 'public/js/'
};

// clean.
gulp.task('clean', del.bind(null, [paths.del]));

gulp.task('msx', function() {
	return gulp.src(paths.msx)
		.pipe(plumber())
		.pipe(msx())
		.pipe(gulp.dest(paths.js))
})

// start
var start;
gulp.task('start', function(){
	start = spawn('node', ['.'])
	.on('error', error);

	// log
	start.on('data', console.log);
	return start;
});

// stop
gulp.task('stop', function(){
	return start.kill();
});

// restart
gulp.task('restart', ['stop', 'start']);

// watch files
gulp.task('watch', function(){
	gulp.watch(paths.msx, ['msx']);
	gulp.watch(paths.server, ['restart']);
});

gulp.task('default', ['watch', 'clean', 'msx', 'start']);
