var gulp = require('gulp');

var gutil = require('gulp-util');
var notify = require('gulp-notify');

var browserify = require('browserify');
var mithrilify = require('mithrilify');
var source = require('vinyl-source-stream');

var del = require('del');
var spawn = require('child_process').spawn;

var error = function(e) {
	console.error(e.message + '\n  in ' + e.fileName)
};

var paths = {
	del: 'public/js/*',
	entries: 'msx/app.js',
	msx: 'msx/**.js',
	server: ['views/**', 'routes/**', 'lib/**', 'index.js'],
	js: 'public/js/'
};

// clean.
gulp.task('clean', del.bind(null, [paths.del]));

var error = function(){
	gutil.log(arguments);

	notify.onError({
		title: "Compile Error",
		message: "<%= error %>"
	}).apply(this, arguments);

	this.emit('end');
}

gulp.task('js', function() {
	return browserify({
		entries: paths.entries,
		debug: true,
		// defining transforms here will avoid crashing your stream
		transform: [mithrilify]
	})
	.bundle()
	.on('error', error)
	.pipe(source('app.js'))
  .pipe(gulp.dest(paths.js))
})

// start
var start;
gulp.task('start', function(){
	start = spawn('node', ['.']);

	// log
	var log = function(chunk){
		gutil.log(chunk.toString('utf8'));
	};
	start.stdout.on('data', log);
	start.stderr.on('data', log);
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
	gulp.watch(paths.msx, ['js']);
	gulp.watch(paths.server, ['restart']);
});

gulp.task('default', ['watch', 'clean', 'js', 'start']);
