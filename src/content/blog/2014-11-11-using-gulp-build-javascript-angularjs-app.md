---
status: publish
published: true
pubDatetime: 2014-11-11T20:00:00.000Z
title: Using Gulp to Build My JavaScript AngularJS App
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 4097
wordpress_url: https://peterkellner.net/?p=4097
date: '2014-11-11 16:25:00 -0800'
date_gmt: '2014-11-11 23:25:00 -0800'
categories:
- JavaScript
tags: []
---
<p>Having spent the past few hours learning how Gulp works, and finally customizing it for my scenario, I feel the need to share.  As I was figuring it out, it seems that many have had my thought also.  So, for those not acquainted with Gulp, basically, it's  is a build system of sorts that works with Node.JS. It's got a huge community of tasks that you can use and pipeline together.</p>
<p>Basically, here is what my gulpfile.js does:</p>
<ul>
<li>Compiles my SASS (scss) into both expanded and minified CSS</li>
<li>Runs jshint on all my JavaScript</li>
<li>Concatinates all my JavaScript together and makes both minified and non-minified versions of it</li>
<li>Optimizes my images</li>
<li>Copies my AngularJS web templates to a production directory</li>
<li>Copies my JSON files to a production directory</li>
<li>Creates a production index.html and a non-production index-nomin.html</li>
<li>Cleans up after itself</li>
</ul>
<p>I'll paste the code below so anyone is welcome to learn from it (or not).</p>
<pre><code>
/*!
 * gulp
 * $ npm install gulp-ruby-sass gulp-autoprefixer gulp-minify-css gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
 */

// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    htmlreplace = require('gulp-html-replace'),
    del = require('del');

// Styles
gulp.task('styles', function () {
    return gulp.src('Content/Sass/site-svcc-relative.scss')
        .pipe(sass({style: 'expanded'}))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('dist/styles'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/styles'))
        .pipe(notify({message: 'Styles task complete'}));
});

// Scripts
gulp.task('scripts', function () {
    return gulp.src(['js/modules/**/*.js', 'app/**/*.js'])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
        .pipe(notify({message: 'Scripts task complete'}));
});

// Images
gulp.task('images', function () {
    return gulp.src('Content/images/**/*')
        .pipe(cache(imagemin({optimizationLevel: 3, progressive: true, interlaced: true})))
        .pipe(gulp.dest('dist/images'))
        .pipe(notify({message: 'Images task complete'}));
});

// Copy fonts from a module outside of our project (like Bower)
gulp.task('copyfiles', function () {
    gulp.src('app/partials/**/*')
        .pipe(gulp.dest('dist/app/partials'));

    gulp.src('Data/**/*')
        .pipe(gulp.dest('dist/Data'));


});

gulp.task('indexhtml', function () {
    gulp.src('index.html')
        .pipe(htmlreplace({
            'css': 'styles/site-svcc-relative.min.css',
            'js': ['https://ajax.googleapis.com/ajax/libs/angularjs/1.3.0/angular.min.js',
                'main.min.js']
        }))
        .pipe(gulp.dest('dist/'));

    gulp.src('index.html')Doe
        .pipe(htmlreplace({
            'css': 'styles/site-svcc-relative.css',
            'js': ['https://ajax.googleapis.com/ajax/libs/angularjs/1.3.0/angular.js',
                'main.js']
        }))
        .pipe(rename('index-nomin.html'))
        .pipe(gulp.dest('dist/'));
});


// Clean
gulp.task('clean', function (cb) {
    del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img','Content/Sass/.sass-cache'], cb);
});

// Default task
gulp.task('default', ['clean'], function () {
    gulp.start('styles', 'scripts', 'images','copyfiles','indexhtml');
});

// Watch
gulp.task('watch', function () {

    // Watch .scss files
    gulp.watch('src/styles/**/*.scss', ['styles']);

    // Watch .js files
    gulp.watch('src/scripts/**/*.js', ['scripts']);

    // Watch image files
    gulp.watch('src/images/**/*', ['images']);

    // Create LiveReload server
    livereload.listen();

    // Watch any files in dist/, reload on change
    gulp.watch(['dist/**']).on('change', livereload.changed);

});
<br/>
</code></pre>
