const { src, dest, watch, parallel, series } = require("gulp");
const pug = require("gulp-pug");
const scss = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const browserSync = require("browser-sync").create();
const clean = require("gulp-clean");
const purgecss = require("gulp-purgecss");

function pugToHtml() {
  return src(["assets/pug/*.pug", "!assets/pug/_*.pug"])
    .pipe(pug({ pretty: true }))
    .pipe(dest("assets"))
    .pipe(browserSync.stream());
}

async function styles() {
  const autoprefixer = (await import("gulp-autoprefixer")).default;

  return src("assets/scss/style.scss")
    .pipe(autoprefixer({ overrideBrowserlist: ["last 3 version"] }))
    .pipe(concat("style.min.css"))
    .pipe(scss({ outputStyle: "compressed" }))
    .pipe(dest("assets/css"))
    .pipe(browserSync.stream());
}

function scripts() {
  return src(["assets/**/*.js", "!assets/js/main.min.js"])
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(dest("assets/js"))
    .pipe(browserSync.stream());
}

function purgeCss() {
  return src("assets/css/*.css")
    .pipe(
      purgecss({
        content: ["assets/**/*.html", "assets/**/*.pug", "assets/**/*.js"],
      })
    )
    .pipe(dest("assets/css"));
}
function watching() {
  browserSync.init({
    server: {
      baseDir: "assets",
    },
  });
  watch(["assets/scss/style.scss"], styles);
  watch(["assets/js/main.js"], scripts);
  watch(["assets/pug/**/*.pug"], pugToHtml);
  watch(["assets/**/*.html"]).on("change", browserSync.reload);
}

function cleanDist() {
  return src("dist").pipe(clean());
}

function building() {
  return src(
    ["assets/css/style.min.css", "assets/js/main.min.js", "assets/**/*.html"],
    {
      base: "assets",
    }
  ).pipe(dest("dist"));
}

exports.pugToHtml = pugToHtml;
exports.styles = styles;
exports.scripts = scripts;
exports.purgeCss = purgeCss;
exports.watching = watching;

exports.build = series(cleanDist, building);
exports.default = parallel(pugToHtml, styles, scripts, purgeCss, watching);
