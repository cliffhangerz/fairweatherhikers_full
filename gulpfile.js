const gulp = require('gulp');
const webpack = require('webpack-stream');
var statFiles = ['./client/app/**/*.html'];

gulp.task('webpack:dev', () => {
  gulp.src('client/app/js/entry.js')
    .pipe(webpack( {
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

gulp.task('css:dev', () => {
  gulp.src('./client/app/**/*.css')
    .pipe(gulp.dest('client/build'));
});

gulp.task('build', ['webpack:dev', 'static:dev', 'css:dev']);
