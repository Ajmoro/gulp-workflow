var gulp = require('gulp'),
	gutil= require('gulp-util'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	coffee = require('gulp-coffee'),
	sass = require('gulp-ruby-sass'),
	livereload = require('gulp-livereload'),
	lr = require('tiny-lr'),
	server = lr();

var jsSources = ['components/lib/jquery-2.1.1.min.js', 'components/scripts/*.js'];
var sassSources = ['components/sass/main.scss'];
var coffeeSources = ['components/coffee/*.coffee'];

gulp.task('js', function(){
	gulp.src(jsSources)
	.pipe(uglify())
	.pipe(concat('script.js'))
	.pipe(gulp.dest('js'));
});

gulp.task('sass', function(){
	gulp.src(sassSources)
	.pipe(sass({
		style:'expanded',
		lineNumbers:true,

	}))
	.pipe(concat('style.css'))
	.pipe(gulp.dest('css'))
	.pipe(livereload());
});

gulp.task('coffee', function(){
	gulp.src(coffeeSources)
	.pipe(coffee({
		bare:true
	}).on('error', gutil.log))
	.pipe(gulp.dest('components/scripts'));
});

gulp.task('watch', function() {
	var server  = livereload();
	gulp.watch(jsSources, ['js']);
	gulp.watch(sassSources, ['sass']);
	gulp.watch(coffeeSources, ['coffee']);
	gulp.watch(['js/script.js', '*.html'], function(e) {
		server.changed(e.path);
	})
});

gulp.task('default', ['sass','js', 'coffee','watch']);