var gulp           = require('gulp');
var path           = require('path');

var clean          = require('gulp-clean');
var concat         = require('gulp-concat');
var plumber        = require('gulp-plumber');
var runSequence    = require('run-sequence');

var pug            = require('gulp-pug2');
var prettify       = require('gulp-prettify');
var sass           = require('gulp-sass');
var combineMq      = require('gulp-combine-mq');
var cssnano        = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');

var useref         = require('gulp-useref');
var gulpif         = require('gulp-if');
var uglify         = require('gulp-uglify');
var minifyCss      = require('gulp-clean-css');
var htmlmin        = require('gulp-htmlmin');

var imagemin       = require('gulp-imagemin');
var pngquant       = require('imagemin-pngquant');

var browserSync    = require('browser-sync');
var reload         = browserSync.reload;




// ##############################################################################################################
// ##############################################################################################################




// PATHS
var app           = 'app/'
var build         = 'build/'
var bower         = 'bower_components/'

var sass_path     = 'source/sass/'
var pug_path      = 'templates/'

var js_path       = 'source/js/'
var js_path_build = 'source/js/'

var img_path      = 'source/img/'
var ico_path      = 'source/ico/'

var font_path     = 'source/fonts/'




// ##############################################################################################################
// ##############################################################################################################



gulp.task('clean', function () {
  return gulp.src([
    app + "*.html",
    app + "inc",
    app + "layouts",
    app + "*.css",
    build
  ])
  .pipe(clean());
});

gulp.task('prettify', function() {
  gulp.src(app+"**/*.html")
  .pipe(prettify({indent_size: 2}))
  .pipe(gulp.dest(app))
});



// Replace CSS/JS
gulp.task('html', function () {
  return gulp.src(app + "*.html")
  .pipe(useref())
  .pipe(gulpif('*.js', uglify()))
  .pipe(gulpif('*.css', minifyCss()))
  .pipe(gulp.dest(build));
});


// Minify HTML
gulp.task('htmlmin', function() {
  return gulp.src(build + '*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(build));
});



// PUG
gulp.task('templates', function() {
  return gulp.src(app+pug_path + "**/*.pug")
  .pipe(plumber())
  .pipe(pug({ yourTemplate: 'Locals' }))
  .pipe(gulp.dest(app))
  .pipe(browserSync.stream());
});




// SASS
gulp.task('sass', function() {
  return gulp.src(app+sass_path + "*.sass")
  .pipe(sass().on('error', sass.logError))
  .pipe(concat('style.min.css'))
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(gulp.dest(app))
  .pipe(browserSync.stream());
});


// CSSNANO
gulp.task('cssnano', function () {
  return gulp.src(app+"style.min.css")
  .pipe(cssnano())
  .pipe(gulp.dest(app));
});



// Combine media queries
gulp.task('combinemq', function () {
  return gulp.src(app+"style.min.css")
  .pipe(combineMq({
    beautify: false
  }))
  .pipe(gulp.dest(build))
});




// IMAGEMIN
gulp.task('imagemin', function () {
  return gulp.src(app+img_path+"**/*")
  .pipe(imagemin({
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngquant()]
  }))
  .pipe(gulp.dest(build+img_path))
});


// Copy directory fonts to build
gulp.task('copy-fonts', function(){
  gulp.src(app+font_path+"**/*")
  .pipe(gulp.dest(build+font_path))
});


// copy ico
gulp.task('copy-ico', function(){
  gulp.src(app+ico_path+"**/*")
  .pipe(gulp.dest(build+ico_path))
});



// copy html
gulp.task('copy-html', function(){
  gulp.src(app+"inc/**/*.html")
  .pipe(gulp.dest(build+"inc"))
});



// ##############################################################################################################
// ##############################################################################################################


// BROWSER SYNC
// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'templates'], function() {

  browserSync.init({
    server: app
  });

  gulp.watch(app+sass_path + "**/*.sass", ['sass']);
  gulp.watch(app+pug_path + "**/*.pug", ['templates']);
  gulp.watch(app+js_path + "**/*.js").on('change', function () { browserSync.reload(); });

});



// ##############################################################################################################
// ##############################################################################################################




gulp.task('app', [
  'templates',
  'sass'
]);

// BUILD
gulp.task('build', function(callback) {
  runSequence(
    'clean',
    ['app'],
    'prettify',
    'imagemin',
    'copy-fonts',
    'copy-ico',
    'cssnano',
    'combinemq',
    'html',
    'htmlmin',
    'copy-html',
    callback);
  });
