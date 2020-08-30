const gulp = require ('gulp');
const sass = require ('gulp-sass');
const concat = require('gulp-concat');
const minifyCSS = require('gulp-csso');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const minifyImg = require('gulp-imagemin');




function style() {
    return  gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error',sass.logError))
    .pipe(minifyCSS())
    .pipe(autoprefixer())
    .pipe(concat('app.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
}

function js() {
    return gulp.src('src/js/**/*.html')
    .pipe(gulp.dest('dist'));
}

function html() {
    return gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist'));
}

function img() {
    return gulp.src('src/img/**/*')
    .pipe(minifyImg())
    .pipe(gulp.dest('dist/img'));
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './dist/'
        }
    });
    gulp.watch('src/img/**/*', img);
    gulp.watch('src/js/**/*.js', js);
    gulp.watch('src/**/*.html', html);
    gulp.watch('src/scss/**/*.scss', style);
    gulp.watch('src/**/*.html').on('change',browserSync.reload);
    gulp.watch('src/js/**/*.js').on('change',browserSync.reload);
    gulp.watch('src/scss/**/*.scss').on('change',browserSync.reload);
    gulp.watch('src/img/**/*').on('change',browserSync.reload);;
}

exports.style = style;
exports.watch = watch;


// gulp.task('sass', ()=>{
//     return gulp.src('src/scss/**/*.scss')
//     .pipe(sass())
//     .pipe(minifyCSS())
//     .pipe(autoprefixer())
//     .pipe(concat('app.min.css'))
//     .pipe(gulp.dest('dist/css'))
// });

// gulp.task('watch', () => {
//     gulp.watch('src/scss/**/*.scss', gulp.series('sass'))
// });

// gulp.task('default',gulp.series('watch'));