var gulp = require('gulp'),
    buildConfig = require('./config/build.config'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    del = require('del'),
    footer = require('gulp-footer'),
    header = require('gulp-header'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    ngAnnotate = require('gulp-ng-annotate'),
    templateCache = require('gulp-angular-templatecache'),
    karma = require('karma').server,
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    useref = require('gulp-useref'),
    browserSync = require('browser-sync'),
    connect = require('gulp-connect'),
    clean = require('gulp-clean');


// presets target mode
gulp.task('dev', function (cb) {
    gutil.env.env = 'dev';
    return cb()
});
gulp.task('prod', function (cb) {
    gutil.env.env = 'prod';
    return cb()
});


// based on mode clean JS files either in www or dist
gulp.task('clean-js', function (cb) {
    var base = gutil.env.env === 'prod' ? buildConfig.release + '/' : buildConfig.dev + '/';
    del(gutil.env.env === 'prod' ? base + buildConfig.cleanJS : base + buildConfig.cleanJS, cb);
});

// based on mode clean CSS files either in www or dist
gulp.task('clean-css', function (cb) {
    var files = gutil.env.env === 'prod' ? buildConfig.release + '/' : buildConfig.dev + '/';
    files += buildConfig.cleanCSS;
    del(files, cb);
});


// Main building task that does several things all based on build.config.js:
// set filename, wrap JS content with self-exec func.block, license, anotates injection,
// check js syntax, if prod then uglify

gulp.task('build-internal', ['clean-js', 'clean-css'], function () {

    return gulp.src(buildConfig.srcJS)
        .pipe(header(buildConfig.closureStart))
        .pipe(footer(buildConfig.closureEnd))
        .pipe(header(buildConfig.banner))
        .pipe(ngAnnotate({single_quotes: true, gulpWarnings: false}))
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(gutil.env.env === 'prod' ? uglify() : gutil.noop())
        .pipe(gulp.dest(buildConfig.dev + '/js'));

});


gulp.task('build', ['build-internal'], function () {

    return gulp.src(buildConfig.srcDev)
        .pipe(concat(buildConfig.filename))
        .pipe(gulp.dest(buildConfig.dev + '/js'))
        .pipe(browserSync.stream());
});


// Build css from SASS
gulp.task('sass', function () {
    gulp.src(buildConfig.srcCSS)
        .pipe(gutil.env.env === 'prod' ? sass({outputStyle: 'compressed'}) : sass())
        .pipe(gulp.dest(buildConfig.dev + '/css/'))
        .pipe(browserSync.stream());
});

// used for release build, it combines all includes in the index.html into 1 file
gulp.task('useref', ['build', 'templatecache', 'sass'], function (done) {
    return gulp.src(buildConfig.combineFiles)
        .pipe(useref())
        .pipe(gulp.dest(buildConfig.release));
});

// used for release copies resource like images, fonts into DIST
gulp.task('copyRes', function () {
    return gulp.src(buildConfig.others, {cwd: 'images/**'})
        .pipe(gulp.dest(buildConfig.release));
});


gulp.task('default', ['dev', 'build', 'templatecache', 'sass']);
gulp.task('release', ['prod', 'build', 'templatecache', 'sass', 'useref', 'copyRes']);
gulp.task('serve', ['default', 'server', 'watch'], function () {


});


gulp.task('watch', ['dev', 'build', 'sass'], function () {
    gulp.watch(['src/**/*.js', 'src/**/*.scss', 'src/**/*.html'], ['dev', 'build', 'sass', 'templatecache'], browserSync.reload);

});

gulp.task('server', function () {
    browserSync({
        server: {
            baseDir: './www'
        }
    });
});

// converts all partials into JS template cache
gulp.task('templatecache', function () {
    return gulp.src(buildConfig.srcHTML)
        .pipe(templateCache('templates.cache.js', {module: 'templatescache', standalone: true}))
        .pipe(gulp.dest(buildConfig.dev + '/js'))
        .pipe(browserSync.stream());
});


// used to delete all that can be generated using npm install, bower install
gulp.task('reset', function () {
    return gulp.src(buildConfig.resetDir, {read: false})
        .pipe(clean());
});

/**
 * start test
 */
gulp.task('test', function (done) {
    karma.start({
        configFile: __dirname + '/config/karma.conf.js',
        singleRun: true
    }, done);
});


