const project_folder = require("path").basename(__dirname);
const source_folder  = "src";
const gulp           = require('gulp');
const {src, dest}    = require('gulp');
const fs             = require('fs');
const ttf2eot        = require('gulp-ttf2eot');
const ttf2woff       = require('gulp-ttf2woff');
const ttf2woff2      = require('gulp-ttf2woff2');
const ttf2svg        = require('gulp-ttf-svg');
const fonter         = require('gulp-fonter');
const svgsprite      = require('gulp-svg-sprite');
const pug            = require('gulp-pug');
const del            = require('del');
const rename         = require("gulp-rename");
const change         = require("gulp-change");
const svgmin         = require('gulp-svgmin');
const cheerio        = require('gulp-cheerio');
const replace        = require('gulp-replace');

const path = {
  build: {
    fonts: source_folder + "/assets/fonts/",
    pugPages: project_folder
  },
  src: {
    fonts: source_folder + "/assets/fonts/*.ttf",
    pugPages: source_folder + "/pages/**/*.pug",
  }
}

function clean(params) {return del("./" + project_folder + "/")};
function replaceImg(content) {
  const regex = /require\("(.*)"\)/gm;
  let m;
  while ((m = regex.exec(content)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }

    // The result can be accessed through the `m`-variable.
    m.forEach((match, groupIndex) => {
      content = content.replace(m[0], '"'+m[1]+'"');
    });
  }
  return content;
};

function pug2html() {
  return gulp.src(path.src.pugPages)
    .pipe(change(replaceImg))
    .pipe(pug({pretty: true}))
    .pipe(rename({dirname: ""}))
    .pipe(gulp.dest(path.build.pugPages));
};

function getFonts(cb) {
  src(path.src.fonts)
    .pipe(ttf2woff())
    .pipe(dest(path.build.fonts));
  src(path.src.fonts)
    .pipe(ttf2woff2())
    .pipe(dest(path.build.fonts));
  if (process.argv[3] === 'min') {cb(); return;}
  src(path.src.fonts)
    .pipe(ttf2eot())
    .pipe(dest(path.build.fonts));
  src(path.src.fonts)
    .pipe(ttf2svg())
    .pipe(dest(path.build.fonts));
  cb();
}

function fontsStyle(done) {
  fs.writeFile(source_folder + '/assets/scss/fonts.scss', '', cb);
  fs.readdir(path.build.fonts, function (err, items) {
    if (items) {
      let c_fontname;
      for (var i = 0; i < items.length; i++) {
        let fontname = items[i].split('.');
        fontname = fontname[0];
        if (c_fontname != fontname) {
          fs.appendFile(source_folder + '/assets/scss/fonts.scss', '@include font(\'' + getName(fontname) + '\', \'' + fontname + '\', \'' + getWeight(fontname) + '\' , \'' + getFontStyle(fontname) + '\', \'' + process.argv[3] + '\');\r\n', cb);
        }
        c_fontname = fontname;
      }
    }
  })
  done();
}

// only google fonts naming
// 100 - thin
// 200 - lite
// 300 - extralight
// 400 - regular
// 500 - medium
// 600 - semibold
// 700 - bold
// 800 - extrabold
// 900 - black
function getName(fontname){
  return fontname.split('-')[0];
}
function getFontStyle(fontname){
  let style = 'normal';
  if (fontname.toLowerCase().indexOf('italic') !== -1)
    style= 'italic'
  return style;
}
function getWeight(fontname){
  let weight = 400;
  if (fontname.toLowerCase().indexOf('bold') !== -1)
    weight = 700;
  if (fontname.toLowerCase().indexOf('thin') !== -1)
    weight = 100;
  if (fontname.toLowerCase().indexOf('light') !== -1)
    weight = 300;
  if (fontname.toLowerCase().indexOf('extralight') !== -1)
    weight = 200;
  if (fontname.toLowerCase().indexOf('medium') !== -1)
    weight = 500;
  if (fontname.toLowerCase().indexOf('semibold') !== -1)
    weight = 600;
  if (fontname.toLowerCase().indexOf('extrabold') !== -1)
    weight = 800;
  if (fontname.toLowerCase().indexOf('black') !== -1)
    weight = 900;
  return weight;
}
function cb(){}

gulp.task('otf2ttf', function () {
  return src([source_folder + '/fonts/*.otf'])
    .pipe(fonter({
      formats: ['ttf']
    }))
    .pipe(dest(source_folder + '/fonts/'));
})

gulp.task('svgsprite', function () {
  return gulp.src([source_folder + '/assets/img/iconsprite/*.svg'])
    .pipe(svgmin({
        js2svg: {
          pretty: true
        }
      }))
      .pipe(cheerio({
        run: function ($) {
          $('[fill]').removeAttr('fill');
          $('[stroke]').removeAttr('stroke');
          $('[style]').removeAttr('style');
        },
        parserOptions: {xmlMode: true}
      }))
      .pipe(replace('&gt;', '>'))
      .pipe(svgsprite({
        mode: {
          symbol: {
            sprite: "../sprite.svg"
          }
        }
      }))
      .pipe(dest('./src/assets/img/icons/'));
})

const build = gulp.series(getFonts, fontsStyle);
const buildhtml = gulp.series(clean, pug2html);

exports.buildhtml = buildhtml
exports.build = build
exports.default = build