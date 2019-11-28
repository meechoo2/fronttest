'use strict';

/**
 * common setting
 */

 // load plugins
var gulp = require('gulp');
var bs = require('browser-sync');
var rs = require('run-sequence');
var cs = require('connect-ssi');
var reload = bs.reload;
var $ = require('gulp-load-plugins')();

// common value
var config = {
  root: './',
  src: 'src/',
  htdocs: 'htdocs/',
  styleguide: '_styleguide/',
  assets: 'assets/'
};

// gulp task対象ファイル
var srcSet = {
  html: [config.src + '**/*.html','!' + config.src + '**/_*/**','!' + config.src + '**/_*'],
  img: config.src + '**/*.?(png|jpg|gif|svg|)',
  scss: [config.src + '**/*.scss', '!' + config.src + config.styleguide + '**/*.scss'],
  movie: config.src + '**/*.mp4',
  scss: [config.src + '**/*.scss'],
  js: [ config.src + '**/!(_)*.js', '!' + config.src + '**/concat/**/*.js'],
  jsMin: config.src + '**/_*.js',
  jsUtilConcat: config.src + config.assets + 'js/utils/concat/**/*.js',
  libConcat: config.src + config.assets + 'lib/concat/**/*.js',
  styleguide: config.src + config.styleguide + '**/*',
  styleguideScss: config.src + config.styleguide + '**/*.scss',
  analytics: config.src + config.assets + 'analytics/'
};

/**
 * tasks
 */

// html setting =========================================
gulp.task('html', function() {
  console.log('========== 📄 html を htdocs に持っていく');
  gulp.src(srcSet.html, { base: config.src })
    .pipe(gulp.dest(config.htdocs));
});

// img setting =========================================
gulp.task('img', function() {
  console.log('========== 🏞 画像 を htdocs に持っていく');
  gulp.src(srcSet.img, { base: config.src }).pipe(gulp.dest(config.htdocs));
});

// movie setting =========================================
gulp.task('movie', function() {
  console.log('========== 🎦 movie を htdocs に持っていく');
  gulp.src(srcSet.movie, { base: config.src }).pipe(gulp.dest(config.htdocs));
});

// styles setting =========================================
gulp.task('styles', function() {
  console.log('========== 🎨 scss から css を生成');
  gulp.src(srcSet.scss, { base: config.src })
    // エラー時でもタスクを続行
    .pipe($.plumber())
    // sass内でglobを利用
    .pipe($.sassGlob())
    // sass 小数点4桁 expanded エラー文生成
    .pipe($.sass({
      precision: 4
    }).on('errror', $.sass.logError))
    // コード整形（設定は /.csscomb.json 参照）
    .pipe($.csscomb())
    .pipe($.postcss([
      // ベンダープレフィックスの自動付与
      require('autoprefixer')({
        browsers: [
        'last 2 versions',
        'ie >= 9',
        'ie_mob >= 9',
        'ios >= 7',
        'android >= 4.0'
        ],
        cascade: false
      }),
      //メディアクエリーの最適化
      require('css-mqpacker')()
    ]))
    // ミニファイしてコメント削除 (/*! ... */記述は削除対象外）
    .pipe($.cleanCss({
      compatibility: {
        properties: {
          zeroUnits: true
        }
      },
      format: 'keep-breaks',
      level: {
        1: {
          specialComments: 'all'
        }
      }
    }))
    // htdocs
    .pipe(gulp.dest(config.htdocs));
});

gulp.task('analytics', function() {
  console.log('========== 📜 アクセス解析用JS を htdocs に持っていく');
  gulp.src(srcSet.analytics, { base: config.src })
    .pipe(gulp.dest(config.htdocs));
});

gulp.task('aigis', function() {
  console.log('========== 📜 スタイルガイドを生成');
  gulp.src(config.src + config.styleguide + '/aigis_config.yml')
    .pipe($.aigis());
});



// sgStyles setting =========================================
gulp.task('sgStyle', function() {
  gulp.src(srcSet.styleguideScss, {base: config.src+ config.styleguide})
    .pipe($.plumber())
    .pipe($.sassGlob())
    .pipe($.sass({
      precision: 4
    }).on('errror', $.sass.logError))
    .pipe($.postcss([
      require('autoprefixer')({
        browsers: [
        'last 2 versions',
        'ie >= 9',
        'ie_mob >= 9',
        'ios >= 7',
        'android >= 4.0'
        ],
        cascade: false
      }),
      require('css-mqpacker')()
    ]))
    .pipe($.cleanCss({
      compatibility: {
        properties: {
          zeroUnits: true
        }
      },
      format: 'keep-breaks',
      level: {
        1: {
          specialComments: 'all'
        }
      }
    }))
    .pipe(gulp.dest(config.src + config.styleguide + 'styleguide_assets/'));
});

// scripts setting =========================================
gulp.task('scripts', function() {
  console.log('========== 🚀 js ファイルのミニファイ＆結合');
  rs(['jshtdocs', 'jsMin', 'jsUtilConcat', 'libConcat']);
});
// そのまま htdocs
gulp.task('jshtdocs', function(){
  gulp.src(srcSet.js, { base: config.src })
    .pipe(gulp.dest(config.htdocs));
});
// _（アンダースコア）から始まる js ファイルはミニファイして htdocs
gulp.task('jsMin', function() {
  gulp.src(srcSet.jsMin, { base: config.src })
    .pipe($.uglify({preserveComments: 'license'}))
    .pipe($.rename(function(path){
      path.basename = path.basename.replace(/\_/,'');
    }))
    .pipe(gulp.dest(config.htdocs));
});
// js/utils/concat 以下のファイルは concat -> uglify して htdocs
gulp.task('jsUtilConcat', function() {
  gulp.src(srcSet.jsUtilConcat, {base: config.src})
    .pipe($.concat('utils.js', {newLine: ';'}))
    // コメントブロックにlicense表記があれば残す
    .pipe($.uglify({preserveComments: 'license'}))
    .pipe($.rename(function(path){
      path.dirname = config.assets + 'js/' + path.basename;
    }))
    .pipe(gulp.dest(config.htdocs));
});
// lib/concat 以下のファイルは concat -> uglify して htdocs
gulp.task('libConcat', function() {
  gulp.src(srcSet.libConcat, {base: config.src})
    .pipe($.concat('lib.js', {newLine: ';'}))
    // コメントブロックにlicense表記があれば残す
    .pipe($.uglify({preserveComments: 'license'}))
    .pipe($.rename(function(path){
      path.dirname = config.assets + path.basename;
    }))
    .pipe(gulp.dest(config.htdocs));
});

// serve setting =========================================
gulp.task('serve', function() {
  console.log('========== 🌎 ローカルサーバを起動');
  bs({
    notify: false,
    port: 3000,
    startPath: '/',
    server: {
      baseDir: config.htdocs,
      middleware: [
        cs({
          baseDir: config.htdocs,
          ext: '.html'
        })
      ],
      directory: true
    }
  });
});

// watch setting =========================================
gulp.task('watch', function() {
  console.log('========== 👀 監視をはじめる');
  gulp.watch(
    [srcSet.html],
    ['html', reload]
  );
  gulp.watch(
    [srcSet.img],
    ['img', reload]
  );
  gulp.watch(
    [srcSet.scss],
    ['styles', 'aigis', reload]
  );
  gulp.watch([srcSet.movie], ['movie', reload]);
  gulp.watch([srcSet.analytics], ['analytics', reload]);
  gulp.watch(
    [srcSet.styleguideScss],
    ['sgStyle', 'aigis', reload]
  );
  gulp.watch(
    [srcSet.js, srcSet.jsMin, srcSet.jsUtilConcat, srcSet.libConcat],
    ['scripts', reload]
  );
});

// default setting =========================================
gulp.task('default', function() {
  console.log('⚡ ⚡ ⚡ ⚡ ⚡ CONNECTED⚡ ⚡ ⚡ ⚡ ⚡');
  rs(['html', 'img', 'movie', 'styles', 'sgStyle', 'scripts', 'analytics'],
  'aigis', 
  'watch',
  'serve'
  );
});
