import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
// import csso from 'postcss-csso';
// import rename from 'gulp-rename';
import autoprefixer from 'autoprefixer';
// import htmlmin from 'gulp-htmlmin';
// import terser from 'gulp-terser';
// import squoosh from 'gulp-libsquoosh';
// import svgo from 'gulp-svgmin';
// import svgstore from 'gulp-svgstore';
// import del from 'del';
import browser from 'browser-sync';

// Styles

export const styles = () => {
  return gulp.src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer()
      // csso()
    ]))
    // .pipe(rename('style.min.css'))
    .pipe(gulp.dest('source/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

// HTML

// const html = () => {
//   return gulp.src('source/*.html')
//   .pipe(htmlmin({ collapseWhitespace: true }))
//   .pipe(gulp.dest('build'));
// }

// scripts

// const scripts = () => {
//   return gulp.src('source/js/*.js')
//   .pipe(terser())
//   .pipe(gulp.dest('build/js'));
// }

// Images

// const optimizeImages = () => {
//   return gulp.src('source/img/**/*.{jpg,jpeg,png}')
//   .pipe(squoosh({
//     webp: {}
//   }))
//   .pipe(gulp.dest('build/img'));
// }

// const copyImages = () => {
//   return gulp.src('source/img/**/*.{jpg,jpeg,png}')
//   .pipe(gulp.dest('build/img'));
// }

// Webp

// const createWebp = () => {
//   return gulp.src('source/img/**/*.{jpg,jpeg,png}')
//   .pipe(squoosh({
//     webp: {}
//   }))
//   .pipe(gulp.dest('build/img'));
// }

// SVG

// const svg = () => {
//   return gulp.src('source/img/*/**/.svg')
//   .pipe(svgo())
//   .pipe(gulp.dest('build/img'));
// }

// Copy

// const copy = (done) => {
//   gulp.src([
//     'source/fonts/**/*.{woff2,woff}',
//     'source/img/**/*.svg',
//     'source/img/**/*.{jpg,jpeg,png}',
//     'source/*.ico',
//   ], {
//     base: 'source'
//   })
//   .pipe(gulp.dest('source'))
//   done();
// }

// Clean

// const clean = () => {
//   return del('build');
// }

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'source'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Reload

const reload = (done) => {
  browser.reload();
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles), browser.reload);
  gulp.watch('source/*.html').on('change', browser.reload);
}

// Build

// export const build = gulp.series(
//   clean,
//   copy,
//   optimizeImages,
//   gulp.parallel(
//     styles,
//     html,
//     scripts,
//     createWebp,
//   ),
//   gulp.series(
//     server,
//   ));

// Start

export default gulp.series(
  // clean,
  // copy,
  // copyImages,
  // gulp.parallel(
    styles,
    // html,
    // scripts,
    // createWebp,
  // ),
  // gulp.series(
    server,
    watcher
  );
