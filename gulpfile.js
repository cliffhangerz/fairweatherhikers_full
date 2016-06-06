const gulp = require('gulp');
const sass = require('gulp-sass');
const maps = require('gulp-sourcemaps');
const protractor = require('gulp-protractor').protractor;
const cp = require('child_process');
const webpack = require('webpack-stream');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/bands_test';

var lintFiles = ['**/*.js', '!node_modules/**', '!build/**', '!**/*spec.js',
'!**/*test.js', '!test/**bundle.**', '!*.conf.js'];
var statFiles = ['./client/app/**/*.html'];
var children = [];

gulp.task('webpack:dev', () => {
  gulp.src('client/app/js/entry.js')
    .pipe(webpack( {
      devtool: 'source-map',
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('client/build'));
});

gulp.task('static:dev', () => {
  gulp.src(statFiles)
    .pipe(gulp.dest('client/build'));
});

gulp.task('sass:dev', () => {
 gulp.src('client/app/scss/*.scss')
   .pipe(maps.init())
   .pipe(sass().on('error', sass.logError))
   .pipe(maps.write('./'))
   .pipe(gulp.dest('client/build'));
});

gulp.task('lint:dev', () => {
  return gulp.src(lintFiles)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('build', ['webpack:dev', 'static:dev', 'sass:dev']);
gulp.task('lint', ['lint:dev']);
