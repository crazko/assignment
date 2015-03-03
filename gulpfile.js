/* jshint laxcomma: true */

var gulp = require('gulp')
  , browserSync = require('browser-sync');

var gulpLoadPlugins = require('gulp-load-plugins')
  , plugins = gulpLoadPlugins();

gulp.task('browser-sync', function () {
  browserSync({
    server: {
      baseDir: './'
    }
  });
})

gulp.task('styles', function () {
  gulp.src('assets/less/main.less')
    .pipe(plugins.less({
      compress: true
    }).on('error', plugins.util.log))
    .pipe(plugins.rename('style.min.css'))
    .pipe(gulp.dest('assets/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('scripts', function () {
  gulp.src(['assets/js/components/*.js', 'assets/js/app.js'])
    .pipe(plugins.ignore('**/scripts.min.js'))
    .pipe(plugins.jshint())
    .pipe(plugins.uglify())
    .pipe(plugins.concat('scripts.min.js'))
    .pipe(gulp.dest('assets/js'));
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('default', ['browser-sync'], function () {
  gulp.watch('assets/less/**/*.less', ['styles']);
  gulp.watch('assets/js/**/*.js', ['scripts']);
});
