var gulp = require('gulp'),
	gutil = require('gulp-util'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	livereload = require('gulp-livereload'),
	lr = require('tiny-lr'),
	server = lr(),
	path = require('path'),
	less = require('gulp-less');

	var jsSources = [
		'components/scripts/common.js',
		'components/scripts/page1.js'
	];
	
	var lessSources = [
		'components/less/*.less'
	];
	gulp.task('js', function() {
		gulp.src(jsSources)
			.pipe(uglify())
			.pipe(concat('script.js'))
			.pipe(gulp.dest('js'));
	});
	
	gulp.task('less', function(){
		gulp.src(lessSources)
			.pipe(less({
				paths: [ path.join(__dirname, 'components/less')]
			})
				.on('error', gutil.log))
			.pipe(concat('style.css'))
			.pipe(gulp.dest('css'))
			.pipe(livereload());			
	});
	
	gulp.task('watch', function(){
		var server = livereload();
		gulp.watch(jsSources, ['js']);
		gulp.watch(lessSources, ['less']);
		gulp.watch(['js/script.js', '*.html'], function(e){
			server.changed(e.path);
		});
	});
	
	gulp.task('default', ['less', 'js', 'watch']);