var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config.js')();
var del = require('del');
var $ = require('gulp-load-plugins')({lazy: true});

//var jshint = require('gulp-jshint');
//var jscs = require('gulp-jscs');
//var util = require('gulp-util');
var gulpprint = require('gulp-print').default;
//var gulpif = require('gulp-if');

gulp.task('vet', function() { 
    log('Analyzing source with SHint and JSCS');
    gulp.src(config.alljs)
    .pipe($.if(args.verbose, gulpprint()))
    .pipe($.jscs())
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish',{verbose: true}))
    .pipe($.jshint.reporter('fail'));
});

gulp.task('styles', function() {
    log('Compiling Less --> CSS');

    return gulp
        .src(config.less)
        .pipe($.plumber())
        .pipe($.less())
        .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
        .pipe(gulp.dest(config.temp));
});

gulp.task('clean-styles',  function(done) {
    var files = config.temp + '**/*.css';
    clean(files, done);
});

gulp.task('less-watcher', function() {
    gulp.watch([config.less], ['styles']);
});

//////////

function clean(path, done) {
    log('Cleaning: '+ $.util.colors.blue(path));
    del(path, done);

}

function log(msg) {
   if (typeof(msg) === 'object') {
       for (var item in msg) {
           if (msg.hasOwnProperty(item)){
               $.util.log($.util.colors.blue(msg[item]));
           }
       }
   } else{
       $.util.log($.util.colors.blue(msg));
   }
}
