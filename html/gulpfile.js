const
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    pug = require('gulp-pug'),
    replace = require('gulp-replace');

const
    mainJsFile = 'src/js/main.js';
    jsLibsFiles = 'src/js/libs/**/*.js';
    sassFiles = 'src/**/*.sass';
    htmlFiles = 'src/**/*.html';
    pugFiles = 'src/**/*.pug';
    prodFolder = 'prod';
    frameworkFolder = 'src';
    viewFolder = 'view';


//SASS > CSS
function sassToCss() {
    return gulp.src(sassFiles)
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%'], {cascade: true}))
        .pipe(gulp.dest('./src'));
}


//compression and concat js libs
function jsLibsFileProcessing() {
    return gulp
        .src(jsLibsFiles)
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('src/js/min'));
}


//babel and compression main js file
function jsMainFileProcessing() {
    return gulp
        .src(mainJsFile)
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('src/js/min/'));
}

//PUG
function pugToHtml() {
    return gulp.src(pugFiles)
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest('./src'));
}


//========= WATCH =========


function watch() {

    browserSync.init({
        server: './src',
        notify: false
    });


    gulp.watch(sassFiles, gulp.series(['sassToCss'],
        function (done) {
            browserSync.reload();
            done();
        }
    ));

    gulp.watch(mainJsFile, gulp.series(['jsMainFileProcessing'],
        function (done) {
            browserSync.reload();
            done();
        }
    ));

    gulp.watch(pugFiles, gulp.series(['pugToHtml'],
        function (done) {
            browserSync.reload();
            done();
        }
    ));

    /*
    gulp.watch(htmlFiles,
        function(done) {
            browserSync.reload();
            done();
        }
    );
    */
}


//========= PRODUCTION =========


//clear production folder
function clearProd(done) {

    del.sync(prodFolder);
    done();
}

//compression and copy css to production
function prodCss() {
    return gulp
        .src('src/css/style.css')
        .pipe(replace('/fonts/', '../fonts/'))
        .pipe(replace('/img/', '../img/'))
        .pipe(cssnano())
        //.pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(`${prodFolder}/${viewFolder}/css`));
}

//copy js files to production
function prodJs() {
    return gulp
        .src('src/js/**/*.js', {buffer: false})
        .pipe(gulp.dest(`${prodFolder}/${viewFolder}/js/`));
}

//copy html files to production
function prodHtml() {
    return gulp
        .src('src/pages/**/*.html', {buffer: false})
        .pipe(rename((path) => {
            path.basename = path.dirname; //rename index.html in component sub folder
            path.dirname = ''; //without sub folder
        }))
        .pipe(replace('/js/', 'js/'))
        .pipe(replace('/css/', 'css/'))
        .pipe(replace('/img/', 'img/'))
        .pipe(gulp.dest(`${prodFolder}/${viewFolder}/`));
}

//copy images to production
function prodImg() {
    return gulp
        .src('src/img/**/*', {buffer: false})
        .pipe(gulp.dest(`${prodFolder}/${viewFolder}/img/`))
        .pipe(gulp.dest(`${prodFolder}/${frameworkFolder}/img/`));
}

//copy fonts to production
function prodFonts() {
    return gulp
        .src('src/fonts/**/*', {buffer: false})
        .pipe(gulp.dest(`${prodFolder}/${viewFolder}/fonts/`))
        .pipe(gulp.dest(`${prodFolder}/${frameworkFolder}/fonts/`));
}

//copy components for framework
function prodComponents() {
    return gulp
        .src('src/components/**/*.+(html|sass)', {buffer: false})
        .pipe(replace(/^@import (?:(?!mixins|variables).)*$/gm, '')) //del import without mixins file
        .pipe(replace(/^\/\/.*/gm, '')) //del comments
        //.pipe(replace(/(\r\n|\r|\n){2,}/gm, '\r\n')) //del empty strings
        .pipe(gulp.dest(`${prodFolder}/${frameworkFolder}/components/`))
}

//copy pages for framework
function prodPages() {
    return gulp
        .src('src/pages/**/*.+(html|sass)', {buffer: false})
        .pipe(replace(/^@import (?:(?!mixins|variables).)*$/gm, ''))
        .pipe(replace(/^\/\/.*/gm, ''))
        .pipe(gulp.dest(`${prodFolder}/${frameworkFolder}/pages/`));
}

//copy main sass file for framework
function prodSassMainFile() {
    return gulp
        .src('src/css/*.sass', {buffer: false})
        //.pipe(rename({dirname: '', basename: 'style'}))
        .pipe(replace(/^@import (?:(?!mixins|variables).)*$/gm, ''))
        .pipe(replace(/^\/\/.*/gm, ''))
        .pipe(gulp.dest(`${prodFolder}/${frameworkFolder}/css/`));
}


//================================


exports.sassToCss = sassToCss;
exports.jsLibsFileProcessing = jsLibsFileProcessing;
exports.jsMainFileProcessing = jsMainFileProcessing;
exports.pugToHtml = pugToHtml;


exports.watch = gulp.series(
    sassToCss,
    jsLibsFileProcessing,
    jsMainFileProcessing,
    pugToHtml,
    watch
);


exports.prod = gulp.series(
    clearProd,
    jsLibsFileProcessing,
    jsMainFileProcessing,
    pugToHtml,
    sassToCss,
    prodCss,
    prodJs,
    prodHtml,
    prodImg,
    prodFonts,
    prodComponents,
    prodPages,
    prodSassMainFile
);
