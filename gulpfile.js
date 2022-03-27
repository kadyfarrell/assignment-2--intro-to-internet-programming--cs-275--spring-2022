const { src, dest, series, watch } = require(`gulp`);
const htmlValidator = require(`gulp-html`);
const htmlCompressor = require(`gulp-htmlmin`);
const CSSLinter = require(`gulp-stylelint`);
const jsLinter = require(`gulp-eslint`);
const babel = require('gulp-babel');
const browserSync = require(`browser-sync`),
    reload = browserSync.reload;
const cleanCSS = require('gulp-clean-css');
const minify = require('gulp-minify');


let validateHTML = () => {
    return src([`html/*.html`, `html/**/*.html`]).pipe(htmlValidator());
};

let compressHTML = () => {
    return src([`html/*.html`,`html/**/*.html`])
        .pipe(htmlCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod`));
};

let validateCSS = () => {
    return src(`css/**/*.css`)
        .pipe(CSSLinter({
            failAfterError: false,
            reporters: [
                {formatter: `string`, console: true}
            ]
        }));
};

let validateJS = () => {
    return src(`js/**/*.js`)
        .pipe(jsLinter())
        .pipe(jsLinter.formatEach(`compact`));
};

let transpileJS = () => {
  return src(`js/**/*.js`)
      .pipe(babel({
            presets: ['@babel/env']
        }))
      .pipe(dest('dist'))
    };

    let serve = () => {
    browserSync({
        notify: true,
        reloadDelay: 100,
        server: {
            baseDir: [
              `temp`,
              `html`
        
            ]
        }
    });
    watch([`html/*.html`, `html/**/*.html`], validateHTML)
        .on(`change`, reload);
    watch(`css/**/*.css`, validateCSS)
        .on(`change`, reload);
    watch(`js/**/*.js`, validateJS)
        .on(`change`, reload);
};

let compressCSS = () => {
    return src(`css/**/*.css`)
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(dest(`prod`));
};

let compressJS = () => {
    return src(`js/**/*.js`)
    .pipe(minify())
    .pipe(dest(`prod`))
};

exports.serve = series(
    validateHTML,
    validateCSS,
    validateJS,
    serve
);

exports.build = series (
    compressHTML,
    compressCSS,
    compressJS,
    );

exports.transpileJS = transpileJS;
exports.validateCSS = validateCSS;
exports.validateJS = validateJS;
exports.validateHTML = validateHTML;
exports.compressHTML = compressHTML;
exports.HTMLProcessing = series(validateHTML, compressHTML);
exports.compressCSS = compressCSS;
exports.compressJS = compressJS;
