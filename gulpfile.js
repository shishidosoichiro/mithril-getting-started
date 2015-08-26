var browserify = require('browserify');
var del = require('del');
var gulp = require('gulp');
var gutil = require('gulp-util');
var mocha = require('gulp-mocha');
var msx = require('gulp-msx');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var source = require('vinyl-source-stream');
var spawn = require('child_process').spawn;

var error = function(e) {
	console.error(e.message + '\n  in ' + e.fileName)
};

var paths = {
	entries: 'temp/msx/app.js',
	server: ['views/**', 'routes/**', 'lib/**', 'index.js'],
	js: 'public/js/'
};

var error = function(){
	gutil.log(arguments);

	notify.onError({
		title: "Compile Error",
		message: "<%= error %>"
	}).apply(this, arguments);

	this.emit('end');
}

// clean.
gulp.task('clean', del.bind(null, ['public/js/*', 'temp']));

// msx
gulp.task('msx', ['clean'], function() {
	return gulp.src(['./msx/**/*.js', './test/**/*.js'], {base: '.'})
	.pipe(plumber())
	.pipe(msx())
	.pipe(gulp.dest('temp/'))
})

// browserify
gulp.task('browserify', ['msx'], function() {
	return browserify({
		entries: paths.entries,
		debug: true,
	})
	.bundle()
	.on('error', error)
	.pipe(source('app.js'))
  .pipe(gulp.dest(paths.js))
})

// test
gulp.task('test', ['msx'], function() {
	return gulp.src('temp/test/**/*.js', {read: false})
	.pipe(mocha());
})

// start
var start;
gulp.task('start', function(){
	start = spawn('node', ['.']);

	var log = function(chunk){
		gutil.log(chunk.toString('utf8'));
	};
	start.stdout.on('data', log);
	start.stderr.on('data', log);
	return start;
});

// stop
gulp.task('stop', function(){
	if (!start) return;
	return start.kill();
});

// restart
gulp.task('restart', ['stop', 'start']);

// watch files
gulp.task('watch', function(){
	gulp.watch(['./msx/**/*.js', './test/**/*.js'], ['clean', 'msx', 'test', 'browserify']);
	gulp.watch(paths.server, ['restart']);
});

gulp.task('default', ['watch', 'clean', 'msx', 'browserify', 'start']);
