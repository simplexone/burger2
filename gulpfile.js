const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');

sass.compiler = require('node-sass');

gulp.task('styles', function() {
    return gulp.src('.css/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer(['last 2 versions']))
    .pipe(cleanCSS({
        level:2
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./prod/css'))
    .pipe(browserSync.reload({stream:true}))
});


gulp.task('scripts', function() {
    return gulp.src('.js/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./prod/js'))
    .pipe(browserSync.stream())
});

