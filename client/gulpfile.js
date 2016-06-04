const gulp = require('gulp');
const maps = require('gulp-sourcemaps');
const webpack = require('webpack-stream');
const eslint = require('eslint');

var lintFiles = ['**/*.js', '!node_modules/**', '!build/**', '!**/*spec.js',
'!**/*test.js', '!test/**bundle.**'];
var statFiles = ['app/**/*.html'];

gulp.task('static:dev', () => {
  gulp.src(statFiles)
    .pipe(gulp.dest('./build'));
});

gulp.task('sass:dev', () => {
  gulp.src('app/scss/*.scss')
    .pipe(maps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('./build'));
});

gulp.task('lint:dev', () => {
  return gulp.src(lintFiles)
    .pipe(eslint)
    .pipe(eslint.format());
});

gulp.task('lint', ['lint:dev']);
gulp.task('build', ['sass:dev', 'static:dev']);
