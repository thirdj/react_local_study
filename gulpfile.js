
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

/*
gulp.task('default', function() {
  console.log('Gulp Hello~~~');
  gulp.src('assert/javascripts/*.js')
    .pipe(uglify({ asciiOnly: true }))
    .pipe(gulp.dest('dist/js'));
});
*/

/**
  Source Map https://blog.outsider.ne.kr/916
  소스맵의 스펙은 현재 구글독스에서 정리되어 있고(다른 표준화처럼 표준화 단체에서 진행하는 것은 아닌 것으로 보인다.)
  현재 스펙은 리비전 3이다.
  스펙상에 나온 내용으로 보면 구글이 만든 자바스크립트관련 도구인 Closure Inspector에서
  Joseph Schorr가 적용한 것이 최초의 형식이다.
  여기서 발전해서 현재의 리비전 3에 이르러 있다.
  소스맵은 말 그대로 원본소스와 변환된 소스를 맵핑해 주는 방법을 제안한 것이다.
  자바스크립트를 예로 들자면 Closure Tools가 지원해 주듯이 작성한 자바스크립트를
  한 파일로 합치거나 사이즈를 줄이기 위해서 압축하거나 난독화해서 배포하는 방식을 많이 취하는데
  이 방법은 성능에는 좋지만 사실 디버깅이 어려워지는 문제가 있는데 소스맵은 이 원본 소스와 최종소스를 매핑해서 추적할 수 있는 방법이다.
  sourcemaps 은 여러작업을 통합하는 것이 아니고 원본 js, css 파일들을 압축하고
  난독화하여 배포할 때 디버깅이 까다로워지는 단점을 극복하기 위해 제안된 방법.
*/

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: './',
    },
  });
  gulp.watch('assert/stylesheets/*.scss', ['sass']);
  gulp.watch('assert/stylesheets/rocks.css').on('change', reload);
  gulp.watch('./index.html').on('change', reload);
});

gulp.task('babel', function() {
  return gulp.src("src/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("all.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist"));
});

gulp.task('watch', function() {
  gulp.watch('assert/stylesheets/*.scss', ['sass']);
});

// dest 로 css 가 떨어지지 않고 다른 곳으로 감.
gulp.task('sass', function() {
  return sass('assert/stylesheets/')
    .on('error', function(err) {
      console.error('Error! ', err.message);
    })
    .pipe(gulp.dest('dist/css'));
});

var onError = function(err) {
  console.log('onError   ', err);
};

gulp.task('imgmin', function() {
  return gulp.src('assert/images/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      use: [pngquant()],
    }))
    .pipe(gulp.dest('dist/images'));
});

// 에러 핸들링, https://www.npmjs.com/package/gulp-plumber
gulp.task('plumber', function() {
  gulp.src('assert/javascripts/concat.js')
    .pipe(plumber({
      errorHandler: onError,
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/'));
});

gulp.task('concat', function() {
  gulp.src('assert/javascripts/*.js')
    .pipe(concat('rocks.concat.js'))
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('uglify', function() {
  gulp.src('dist/js/rocks.concat.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('minify-css', function() {
  gulp.src('assert/stylesheets/*.css')
    .pipe(sourcemaps.init())
    .pipe(minifyCss({ compatibility: 'ie8' }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('hello', function() {
  console.log('Gulp Hello~~~');
});

gulp.task('pipe:test', function() {
  gulp.src('assert/javascripts/*.js')
    .pipe(sourcemaps.init())
      .pipe(concat('rocks.concat.js'))
      .pipe(uglify())
      .pipe(rename('rocks.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'));
});

gulp.task(
  'default',
  [
    'concat', 'uglify', 'minify-css', 'sass', 'watch',
    'hello', 'plumber', 'pipe:test', 'imgmin',
  ]
);
