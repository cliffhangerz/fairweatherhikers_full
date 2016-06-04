const gulp = require('gulp');
const sass = require('gulp-sass');
const maps = require('gulp-sourcemaps');
const protractor = require('gulp-protractor').protractor;
const cp = require('child_process');
const webpack = require('webpack-stream');
const eslint = require('gulp-eslint');
const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/bands_test';

var lintFiles = ['**/*.js', '!node_modules/**', '!build/**', '!**/*spec.js',
'!**/*test.js', '!test/**bundle.**', '!*.conf.js'];
var statFiles = ['app/**/*.html'];
var children = [];

function killcp() {
  children.forEach((child) => {
    child.kill('SIGTERM');
  });
}

// gulp.task('sass:dev', () => {
//   gulp.src('app/scss/*.scss')
//     .pipe(maps.init())
//     .pipe(sass().on('error', sass.logError))
//     .pipe(maps.write('./'))
//     .pipe(gulp.dest('./build'));
// });

gulp.task('webpack:dev', () => {
  gulp.src('app/js/entry.js')
    .pipe(webpack( {
      devtool: 'source-map',
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('./build'));
});

// gulp.task('webpack:test', () => {
//   return gulp.src('test/unit/entry.js')
//     .pipe(webpack({
//       devtool: 'source-map',
//       output: {
//         filename: 'bundle.js'
//       },
//       module: {
//         loaders: [
//           {
//             test: /\.html$/,
//             loader: 'html'
//           }
//         ]
//       }
//     }))
//     .pipe(gulp.dest('test/'));
// });
//
// gulp.task('webpack:protractor', () => {
//   gulp.src('test/integration/**.js')
//     .pipe(webpack( {
//       devtool: 'source-map',
//       output: {
//         filename: 'pro_bundle.js'
//       }
//     }))
//     .pipe(gulp.dest('./test'));
// });

gulp.task('static:dev', () => {
  gulp.src(statFiles)
    .pipe(gulp.dest('./build'));
});

// gulp.task('mongoDB:test', (done) => {
//   children.push(cp.spawn('mongod'));
//   setTimeout(done, 1000);
// });
//
// gulp.task('dropDb:test', ['mongoDB:test'], (done) => {
//   mongoose.connect(mongoUri, () => {
//     mongoose.connection.db.dropDatabase(() => {
//       mongoose.disconnect(done);
//     });
//   });
// });
//
// gulp.task('startservers:test', (done) => {
//   children.push(cp.fork('server.js'));
//   children.push(cp.fork('../server/server.js', [], { env: { MONGODB_URI: mongoUri } } ));
//   children.push(cp.spawn('webdriver-manager', ['start']));
//   setTimeout(done, 1000);
// });
//
// gulp.task('protractor:test', ['build', 'startservers:test', 'dropDb:test'], () => {
//   gulp.src('test/integration/**/*spec.js')
//     .pipe(protractor({
//       configFile: 'test/integration/config.js'
//     }))
//     .on('end', () => {
//       killcp();
//     })
//     .on('error', () => {
//       killcp();
//     });
// });

gulp.task('lint:dev', () => {
  return gulp.src(lintFiles)
    .pipe(eslint())
    .pipe(eslint.format());
});

// gulp.task('sass', ['sass:dev']);
// gulp.task('sass:watch', () => {
//   gulp.watch('./*scss', ['sass:dev']);
// });
// gulp.task('test', ['protractor:test', 'webpack:protractor']);
gulp.task('build', ['webpack:dev', 'static:dev']);
gulp.task('lint', ['lint:dev']);
//gulp.task('default', ['build', 'lint', 'test']);
