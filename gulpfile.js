const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const path = require('path');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass');
const cssmin = require('gulp-cssmin');
const autoprefixer = require('gulp-autoprefixer');

const config = {
  srcPath: path.join('./src'),
  distPath: path.join('./dist')
};


gulp.task('scripts', () => {
  return browserify({
      entries: path.join(config.srcPath, './scripts/bootstrap.js'),
      extensions: ['js'],
      debug: true
    })
    .transform(babelify, {
      presets: ['es2015']
    })
    .plugin('minifyify', {
      output: path.join(config.distPath, './bundle.map.json'),
      map: 'bundle.map.json'
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest( config.distPath ));
});

gulp.task('html', () => {
  return gulp.src( path.join(config.srcPath, './*.html') )
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest( config.distPath ));
});

gulp.task('styles', () => {
  return gulp.src( path.join(config.srcPath, './styles/**/*.scss') )    
    .pipe(sass().on('error', sass.logError))
    	.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(cssmin({      
      options: {
        keepSpecialComments: false
      },
    }))
    .pipe( gulp.dest( config.distPath ) );
});

gulp.task('watch', ['scripts'], () => {
  gulp.watch( path.join(config.srcPath, './styles/**/*.scss'), ['sass']);
  gulp.watch( path.join(config.srcPath, './app/**/*.js'), ['scripts']);
});

gulp.task('build', ['scripts', 'html', 'styles'])

gulp.task('default', ['watch']);