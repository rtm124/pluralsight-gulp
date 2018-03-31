var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config.js')();
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
