var gulp = require('gulp');
var sass = require('gulp-sass');
var haml = require('gulp-haml');
var livereload = require('gulp-livereload');

var sassInput = './sass/**/*.scss';
var sassOutput = './build/css';

var hamlInput = './haml/**/*.haml';
var hamlOutput = './build/html';

var onChange = function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
};

var logError = function(err) {
  console.log(err);
}

gulp.task('sass', function () {
	var sassOptions = {
	  errLogToConsole: true,
	  outputStyle: 'expanded'
	};

  return gulp
    .src(sassInput)
   	.pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(gulp.dest(sassOutput))
    .pipe(livereload());
});

gulp.task('sass:watch', function () {
  livereload.listen();
  return gulp
    .watch(sassInput, ['sass'])
    .on('change', onChange);
});

gulp.task('haml', function () {
  var hamlOptions = {
    compiler: 'visionmedia'
  };

  gulp.src(hamlInput)
    .pipe(haml(hamlOptions).on('error', logError))
    .pipe(gulp.dest(hamlOutput))
    .pipe(livereload());
});

gulp.task('haml:watch', function () {
  livereload.listen();
  return gulp
  	.watch(hamlInput, ['haml'])
  	.on('change', onChange);
});

gulp.task('default', [
	'sass',
	'haml',
	'sass:watch',
	'haml:watch'
]);
