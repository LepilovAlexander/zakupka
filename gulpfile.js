let gulp = require('gulp');
let browserSync = require('browser-sync');
let concatCSS = require('gulp-concat-css');
let sass = require('gulp-sass');
let autopref = require('gulp-autoprefixer');
let cleanCSS = require('gulp-clean-css');

// Static server
gulp.task('default', () => {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });
    gulp.watch('src/sass/*.scss', ['sass']);
    gulp.watch("dist/index.html").on('change', browserSync.reload);
});
//SASS
sass.compiler = require('node-sass');

gulp.task('sass', () => {
    return gulp.src('src/sass/**/*.*')
        .pipe(sass().on('error', sass.logError))
        .pipe(concatCSS('style.css'))
        .pipe(autopref('last 10 versions', 'ie 9'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./dist/css/'))
        .pipe(browserSync.stream());
});
