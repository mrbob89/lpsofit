var baseDir = 'client_src';
var destDir = 'client_build';

var gulp = require('gulp');
var clean = require('gulp-clean');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var argv = require('yargs').argv;
var gulpif = require('gulp-if');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var csscomb = require('gulp-csscomb');
var gcmq = require('gulp-group-css-media-queries');
var filesize = require('gulp-filesize');
var imagemin = require('gulp-imagemin');


gulp.task('less', function () {
  return gulp.src(baseDir + '/less/**/*.less')
    .pipe(concat('styles.less'))
    .pipe(less())
    .pipe(gulp.dest(destDir + '/css'));
});

gulp.task('css', function () {
    return gulp.src(baseDir + '/less/**/*.less')
        .pipe(sourcemaps.init())
        .pipe(filesize())
        .pipe(concat('styles.less'))
        .pipe(less())
        .pipe(gulpif(argv.mob,gcmq()))
        .pipe(csscomb())
        .pipe(gulpif(argv.prod, cssnano()))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(destDir + '/css'))
        .pipe(filesize());
});

gulp.task('js', function () {
  return gulp.src(baseDir + '/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(filesize())
    .pipe(concat('all.js'))
    .pipe(gulpif(argv.prod, uglify()))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(destDir + '/js'))
    .pipe(filesize());
});

gulp.task('libs', function () {
    return gulp.src([
        baseDir + '/libs/**/*.min.js',
            '!' + baseDir + '/libs/jquery{,/**}',
        ])
        .pipe(gulpif(argv.libfile, concat('libs.js')))
        .pipe(gulp.dest(destDir + '/libs'));
});

gulp.task('clean', function (cb) {
    return gulp.src('client_build/*', {read: false})
        .pipe(clean({force: true}));
});

gulp.task('copy-static', function () {
    return gulp.src([
        baseDir + '/**',
            '!' + baseDir + '/libs{,/**}',
            '!' + baseDir + '/less{,/**}',
            '!' + baseDir + '/js{,/**}',
            '!' + baseDir + '/img{,/**}',
            '!' + baseDir + '/node_modules{,/**}',
        ])
        .pipe(gulp.dest(destDir));
});

gulp.task('imagemin', () => {
    return gulp.src(baseDir + '/img/*')
        .pipe(imagemin({
            optimizationLevel: 5,
            progressive: true,
            svgoPlugins: [
                {removeViewBox: false},
                {cleanupIDs: false}
            ]
        }))
        .pipe(gulp.dest(destDir + '/img'));
});

gulp.task( 'watch', function () {
    gulp.watch(baseDir + '/*.html', gulp.series('copy-static'));
    gulp.watch(baseDir + '/**/*.@(png|jpg|js)', gulp.series('copy-static'));
    gulp.watch(baseDir + '/less/**/*.*', gulp.series('css'));
});

gulp.task('serve', function () {
    browserSync.init({
        server: destDir
    });

    gulp.watch(destDir + '/**/*.*').on('change', browserSync.reload);
});

gulp.task('build', gulp.series('copy-static', 'css', 'js'));
gulp.task('dev', gulp.series('build', gulp.parallel('serve','watch')));
gulp.task('default', gulp.series('dev'));