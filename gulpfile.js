var gulp = require('gulp'), 
    bower = require('gulp-bower'),
    less = require('gulp-less');

gulp.task('default', ['styles', 'copy', 'bower'], function(){

});

gulp.task('styles', function(){
    gulp.src('./src/less/app.less')
          .pipe(less())
          .pipe(gulp.dest('./public/css'))
});

gulp.task('copy', function(){
    gulp.src(['./src/*.html', './src/controls/*.html', './src/js/*.*'], {base: './src/'})
        .pipe(gulp.dest('./public/'));
});

gulp.task('bower', function(){
    gulp.src(['./bower_components/angular/angular.min.*'])
        .pipe(gulp.dest('./public/js/'));
});

gulp.task('watch', ['default'], function () {
    gulp.watch('src/**/*.*', ['copy', 'styles']);
});