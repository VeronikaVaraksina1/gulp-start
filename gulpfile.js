const { src, dest, watch, parallel, series } = require("gulp");
const pug = require("gulp-pug");
const scss = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const browserSync = require("browser-sync").create();
const clean = require("gulp-clean");
const purgecss = require("gulp-purgecss");

function pugToHtml() {
  return src(["app/pug/*.pug", "!app/pug/_*.pug"])
    .pipe(pug({ pretty: true }))
    .pipe(dest("app"))
    .pipe(browserSync.stream());
}

async function styles() {
  const autoprefixer = (await import("gulp-autoprefixer")).default;

  return src("app/scss/style.scss")
    .pipe(autoprefixer({ overrideBrowserlist: ["last 3 version"] }))
    .pipe(concat("style.min.css"))
    .pipe(scss({ outputStyle: "compressed" }))
    .pipe(dest("app/css"))
    .pipe(browserSync.stream());
}

function scripts() {
  return src(["app/**/*.js", "!app/js/main.min.js"])
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(dest("app/js"))
    .pipe(browserSync.stream());
}

function purgeCss() {
  return src("app/css/*.css")
    .pipe(
      purgecss({
        content: ["app/**/*.html", "app/**/*.pug", "app/**/*.js"],
      })
    )
    .pipe(dest("app/css"));
}
function watching() {
  watch(["app/scss/style.scss"], styles);
  watch(["app/js/main.js"], scripts);
  watch(["app/pug/**/*.pug"], pugToHtml);
  watch(["app/**/*.html"]).on("change", browserSync.reload);
}

function browsersync() {
  browserSync.init({
    server: {
      baseDir: "app",
    },
  });
}

function cleanDist() {
  return src("dist").pipe(clean());
}

function building() {
  return src(["app/css/style.min.css", "app/js/main.min.js", "app/**/*.html"], {
    base: "app",
  }).pipe(dest("dist"));
}

exports.pugToHtml = pugToHtml;
exports.styles = styles;
exports.scripts = scripts;
exports.purgeCss = purgeCss;
exports.watching = watching;
exports.browsersync = browsersync;

exports.build = series(cleanDist, building);
exports.default = parallel(
  pugToHtml,
  styles,
  scripts,
  purgeCss,
  browsersync,
  watching
);
