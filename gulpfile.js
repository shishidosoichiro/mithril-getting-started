var gulp = require('gulp');
var plumber = require('gulp-plumber');
var msx = require('gulp-msx');
var browserify = require('gulp-browserify');
var source = require('vinyl-source-stream');
var mithrilify = require('mithrilify');
var rename = require('gulp-rename');

var del = require('del');
var spawn = require('child_process').spawn;

var error = function(e) {
	console.error(e.message + '\n  in ' + e.fileName)
};

var paths = {
	del: 'public/js/*',
	msx: 'msx/**.js',
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

gulp.task('browserify', function() {
	gulp.src('msx/app.js')
	.pipe(plumber())
  .pipe(browserify({
    transform: ['mithrilify']
  }))
  .pipe(rename('app.js'))
  .pipe(gulp.dest(paths.js))
})

// start
var start;
gulp.task('start', function(){
	start = spawn('node', ['.'])
	.on('error', error);

	// log
	start.on('data', console.log.bind(console));
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
	gulp.watch(paths.msx, ['browserify']);
	gulp.watch(paths.server, ['restart']);
});

gulp.task('default', ['watch', 'clean', 'browserify', 'start']);
