var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var autopre = require('gulp-autoprefixer');
var browser = require('browser-sync').create();
var jshint = require('gulp-jshint');

var paths = {
	styles: 'src/scss/*.scss',
	jscripts: 'app/assets/js',
	site: 'app/*.html'
};

gulp.task('lint', function() {
    return gulp.src(paths.jscripts)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('styles', function() {
	return gulp.src(paths.styles)
		.pipe(sass().on('error', sass.logError))
		.pipe(autopre({
			browsers: ['last 4 versions']
		}))
		.pipe(concat('style.css'))
		.pipe(gulp.dest('app/assets/css'))
 		.pipe(browser.stream()); //reloads browser when change made
});

gulp.task('html', function() {
	return gulp.src(paths.site)
		.pipe(browser.stream());
});

gulp.task('browser-sync', function() {
	browser.init({
		server: {
			baseDir: "app"
		}
	});
});

gulp.task('watch', function() {
  	gulp.watch(paths.styles, ['styles']); //execute changes to .css
});

gulp.task('default', ['styles', 'watch', 'browser-sync', 'lint']);
