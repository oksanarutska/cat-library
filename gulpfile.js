const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const distDirectory= 'dist';
const concat = require('gulp-concat');
const minifyCSS = require('gulp-minify-css');
const autoprefixer = require('gulp-autoprefixer');
const runSequence = require('run-sequence');


gulp.task('default', function (cb) {
    runSequence('css','start', cb);
});

gulp.task('start', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("./*.html", function () {
        return runSequence('reloadBrowser');
    });
    gulp.watch("css/*.css", function () {
        return runSequence('css', 'reloadBrowser');
    });

    gulp.watch("./*.js", function () {
        return runSequence('reloadBrowser');
    });
});

gulp.task('css', function(){
    gulp.src('css/**/*.css')
        .pipe(minifyCSS())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest(distDirectory))
});

gulp.task('reloadBrowser', function (done) {
    browserSync.reload();
    done();
});