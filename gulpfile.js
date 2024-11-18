const { src, dest, watch, parallel, series } = require("gulp");
const pug = require("gulp-pug");
const scss = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const clean = require("gulp-clean");
const purgecss = require("gulp-purgecss");
const webp = require("gulp-webp");
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
const svgSprite = require("gulp-svg-sprite");
const cssfont64 = require("gulp-cssfont64");

function fontsConvert() {
  return src(["assets/fonts/*.woff", "assets/fonts/*.woff2"])
    .pipe(cssfont64())
    .pipe(dest("assets/styles/"))
    .pipe(browserSync.stream());
}

function images() {
  return src("assets/i/src/**/*.*")
    .pipe(newer("assets/i/dist/"))
    .pipe(webp({ quality: 80 }))

    .pipe(src("assets/i/src/**/*.*"))
    .pipe(newer("assets/i/dist/"))
    .pipe(imagemin())

    .pipe(dest("assets/i/dist/"))
    .pipe(browserSync.stream({ once: true }));
}

function sprite() {
  return src("assets/i/dist/icons/*.svg")
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            sprite: "../sprite.svg",
            example: true,
          },
        },
      })
    )
    .pipe(dest("assets/i/sprite/"));
}

function pugToHtml() {
  return src(["assets/pug/*.pug", "!assets/pug/_*.pug"])
    .pipe(pug({ pretty: true }))
    .pipe(dest("assets/"))
    .pipe(browserSync.stream());
}

function styles() {
  return src("assets/scss/style.scss")
    .pipe(autoprefixer({ overrideBrowserslist: ["last 3 version"] }))
    .pipe(concat("style.min.css"))
    .pipe(scss({ outputStyle: "compressed" }))
    .pipe(dest("assets/styles/"))
    .pipe(browserSync.stream({ once: true }));
}

function scripts() {
  return src(["assets/**/*.js", "!assets/js/main.min.js"])
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(dest("assets/js/"))
    .pipe(browserSync.stream());
}

function purgeCss() {
  return src("assets/styles/*.css")
    .pipe(
      purgecss({
        content: ["assets/**/*.html", "assets/**/*.pug", "assets/**/*.js"],
      })
    )
    .pipe(dest("assets/styles/"));
}

function watching(done) {
  browserSync.init({
    port: 1337,
    server: {
      baseDir: "assets",
    },
  });
  watch(["assets/fonts/**/*"], fontsConvert);
  watch(["assets/scss/style.scss"], styles);
  watch(["assets/i/src/"], images);
  watch(["assets/js/main.js"], scripts);
  watch(["assets/pug/**/*.pug"], pugToHtml);
  watch(["assets/**/*.html"]).on("change", browserSync.reload);
  done();
}

function cleanDist() {
  return src("dist/**/*").pipe(clean());
}

function copySprite() {
  return src("assets/i/dist/sprite/sprite.svg").pipe(
    dest(dist("dist/i/dist/sprite/"))
  );
}

function building() {
  return src(
    [
      "assets/styles/style.min.css",
      "assets/js/main.min.js",
      "assets/**/*.html",
      "assets/styles/**/*",
      "assets/i/dist/**/*",
    ],
    {
      base: "assets",
    }
  ).pipe(dest("dist/"));
}

exports.fontsConvert = fontsConvert;
exports.pugToHtml = pugToHtml;
exports.styles = styles;
exports.images = images;
exports.sprite = sprite;
exports.copySprite = copySprite;
exports.scripts = scripts;
exports.purgeCss = purgeCss;
exports.watching = watching;

exports.build = series(cleanDist, building);
exports.default = parallel(
  pugToHtml,
  styles,
  images,
  scripts,
  purgeCss,
  watching
);
