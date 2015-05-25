// Load some modules which are installed through NPM.
var gulp = require('gulp');
var browserify = require('gulp-browserify');  // Bundles JS.
// var del = require('del');  // Deletes files.

// Our JS task. It will Browserify our code and compile React JSX files.
// gulp.task('js', function() {
//   browserify('js/')
//     .bundle()
//     .pipe(source('bundle.js'))
//     .pipe(gulp.dest('./bundle/'));
// });

gulp.task('browserify', function () {
  return gulp.src(['./js/**/*.js'])
    .pipe(browserify())
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['browserify']);
