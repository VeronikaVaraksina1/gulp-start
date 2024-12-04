const { src, dest, watch, parallel, series } = require("gulp");
const pug = require("gulp-pug");
const scss = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const clean = require("gulp-clean");
const webp = require("gulp-webp");
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
const svgSprite = require("gulp-svg-sprite");
const cssfont64 = require("gulp-cssfont64");
const purify = require("gulp-purifycss");

function fontsConvert() {
    return src(["assets/fonts/*.woff", "assets/fonts/*.woff2"])
        .pipe(cssfont64())
        .pipe(dest("dist/styles/"))
        .pipe(browserSync.stream());
}

function images() {
    return src(["assets/i/**/*", "!assets/i/favicon/*"])
        .pipe(newer("dist/i/"))
        .pipe(webp({ quality: 80 }))

        .pipe(src("assets/i/**/*"))
        .pipe(newer("dist/i/"))
        .pipe(imagemin())

        .pipe(dest("dist/i/"))
        .pipe(browserSync.stream({ once: true }));
}

function sprite() {
    return src("assets/i/icons/*.svg")
        .pipe(
            svgSprite({
                mode: {
                    symbol: {
                        sprite: "../sprite.svg",
                        render: {
                            scss: {
                                dest: "../../../sass/_sprite.scss",
                                template:
                                    "assets/sass/templates/_sprite_template.scss",
                            },
                        },
                    },
                },
            })
        )
        .pipe(dest("assets/i/sprite/"));
}

function copySprite() {
    return src("assets/i/sprite/sprite.svg").pipe(dest("dist/i/sprite/"));
}

function pugToHtml() {
    return src(["assets/pug/*.pug", "!assets/pug/_*.pug"])
        .pipe(pug({ pretty: true }))
        .pipe(dest("dist/"))
        .pipe(browserSync.stream());
}

function styles() {
    return src(["assets/sass/main_global.scss"])
        .pipe(autoprefixer({ overrideBrowserslist: ["last 3 version"] }))
        .pipe(concat("main_global.min.css"))
        .pipe(scss({ outputStyle: "compressed" }))
        .pipe(dest("dist/styles/"))
        .pipe(browserSync.stream({ match: "**/*.css" }));
}

function scripts() {
    return src([
        "assets/**/*.js",
        "!assets/js/main.min.js",
        "!assets/js/font-loader.js",
    ])
        .pipe(concat("main.min.js"))
        .pipe(uglify())
        .pipe(dest("dist/js/"))
        .pipe(browserSync.stream());
}

function clearCSS() {
    return src("dist/styles/*.css")
        .pipe(purify(["dist/**/*.html", "dist/**/*.js"]))
        .pipe(scss({ outputStyle: "compressed" }))
        .pipe(dest("build/styles/"));
}

function watching() {
    watch(["assets/sass/**/*.scss"], styles);
    watch(["assets/i/"], images);
    watch(["assets/js/*.js"], scripts);
    watch(["assets/pug/**/*.pug"], pugToHtml);
    watch(["assets/**/*.html"]).on("change", browserSync.reload);
}

function browsersync() {
    browserSync.init({
        server: {
            baseDir: "dist",
        },
    });
}

function cleanBuild() {
    return src("build/**/*").pipe(clean());
}

function copyFontLoader() {
    return src("assets/js/font-loader.js").pipe(dest("dist/js/"));
}

function building() {
    return src(
        ["dist/styles/**/*", "dist/js/**/*", "dist/**/*.html", "dist/i/**/*"],
        {
            base: "dist",
        }
    ).pipe(dest("build/"));
}

exports.fontsConvert = fontsConvert;
exports.copyFontLoader = copyFontLoader;
exports.pugToHtml = pugToHtml;
exports.images = images;
exports.styles = styles;
exports.sprite = sprite;
exports.copySprite = copySprite;
exports.scripts = scripts;
exports.clearCSS = clearCSS;
exports.watching = watching;

exports.generateSprite = series(sprite, copySprite);
exports.build = series(cleanBuild, building);
exports.default = parallel(
    fontsConvert,
    pugToHtml,
    styles,
    images,
    scripts,
    copySprite,
    copyFontLoader,
    watching,
    browsersync
);
