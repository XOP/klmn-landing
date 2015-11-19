var gulp = require('gulp');
var path = require('path');

// auto-load gulp-* plugins
var $ = require('gulp-load-plugins')();

// other modules
var del = require('del');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var merge = require('merge2');
var runSequence = require('run-sequence');

// config
var config = require('./config.js');
var paths = config.paths;

// PostCSS plugins
var nano = require('cssnano');
var imageInliner = require('postcss-image-inliner');
var autoprefixer = require('autoprefixer');
var Browsers = ['last 2 versions'];

// =================================================================================================================

//
// styles
gulp.task('styles', function() {

    return merge(
        // normalize
        gulp.src(paths.deps.normalize + '/normalize.css'),

        // project styles
        gulp.src(paths.css.src + '/main.css')
        )
        .pipe($.plumber())
        .pipe($.concatCss('main.css', {
            rebaseUrls: false
        }))
        .pipe($.postcss([
            autoprefixer({ browsers: Browsers }),
            imageInliner({
                assetPaths: [paths.img.src]
            }),
            nano()
        ]))
        .pipe(gulp.dest(paths.css.dest));
});

//
// scripts
gulp.task('scripts', function(){
    return gulp.src(paths.js.src + '/**/*.js')
        .pipe($.plumber())
        .pipe($.uglify())
        .pipe(gulp.dest(paths.js.dest));
});

//
// html
gulp.task('html', function(){
    return gulp.src(paths.html.src + '/**/*.html')
        .pipe($.minifyHtml({
            conditionals: true
        }))
        .pipe(gulp.dest('public/'));
});


//
// images
gulp.task('images', function(){
    return gulp.src(paths.img.src + '/**')
        .pipe(gulp.dest(paths.img.dest));
});

gulp.task('favicon', function(){
    return gulp.src('favicon.ico')
        .pipe(gulp.dest('public/'));
});


//
// browser sync
gulp.task('sync', function(){
    browserSync.init({
        server: {
            baseDir: "./public"
        },
        files: ["public/**/*.*"],
        port: config.port
//        , logLevel: "debug"
    });
});


//
// run server
gulp.task('run', function(){
    browserSync.init({
        server: {
            baseDir: "./public"
        },
        files: ["public/**/*.*"],
        port: $.util.env.port || config.port + 1000
    });
});


//
// cleanup
gulp.task('clean', function(cb){
    return del([
        'public/*'
    ], cb);
});

// =================================================================================================================

//
// build
gulp.task('build', ['clean'], function(){
    return runSequence(
        'html',
        'styles',
        'images',
        'scripts',
        'favicon'
    );
});


//
// publish
gulp.task('publish', function(){
    gulp.src([
//            '!./public/exclude.me',
            './public/**'
        ])
        .pipe($.zip('project.zip'))
        .pipe(gulp.dest('./'));
});


//
// default
gulp.task('default', ['build'], function(){
    runSequence(
        'sync',
        function(){
            gulp.watch('./src/*.html', ['html']);
            gulp.watch('./' + paths.js.src + '/**/*', ['webpack']);
            gulp.watch('./' + paths.css.src + '/**/*.scss', ['styles']);
        });
});
