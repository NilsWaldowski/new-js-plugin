/**
* General
*/
var gulp = require('gulp'),
    del = require('del'),
    rename = require('gulp-rename'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync'),
    sass = require('gulp-sass'),


/**
* Scripts, Testing, Linting
*/
    eslint = require('gulp-eslint'),
    sasslint = require('gulp-sass-lint'),
    //concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cleanCss = require('gulp-clean-css'),
    pleeease = require('gulp-pleeease'),


/**
* Misc
*/
    paths;


/**
* Pathes
*/
paths = {
    input: 'src/**/*',
    output: 'dist/',
    stylesheets: {
        input: 'src/stylesheets/*.scss',
        output: 'dist/stylesheets/'
    },
    javascript: {
        input: 'src/javascript/*',
        output: 'dist/javascript/'
    },
    docs: {
        input: 'src/docs/*.{html,md,markdown}',
        output: 'docs/',
        templates: 'src/docs/_templates/',
        assets: 'src/docs/assets/**'
    }
};


/**
* Gulp Tasks
*/
gulp.task('clean:dist', function(done) {
    'use strict'

    del.sync([
    	paths.output
    ])

    done()
});


gulp.task('css', gulp.series(function css(done) {
    'use strict'

    return gulp.src(paths.stylesheets.input)

        // lint
        .pipe(sasslint())
        .pipe(sasslint.format())
        //.pipe(sasslint.failOnError())

        // compile
        .pipe(sass({
            'outputStyle': 'expanded'
        }))

        // autoprefixer
        .pipe(pleeease({
            'minifier': false,
            'autoprefixer': {
                'browsers': [
                    '> 1% in DE',
                    'Android >= 4.1',
                    'Explorer >= 9',
                    'Firefox >= 17',
                    'iOS >= 6',
                    'last 4 versions',
                    'Opera >= 12.1',
                    'Safari >= 7'
                ],
                'cascade': false
            }
        }))

        // write unminified file
        .pipe(gulp.dest(paths.stylesheets.output))

        // uglify
        .pipe(cleanCss())

        // rename
        .pipe(rename({
            'suffix': '.min'
        }))

        // write final file
        .pipe(gulp.dest(paths.stylesheets.output))

        .pipe(browserSync.stream())

    done()

}));


gulp.task('js', gulp.series(function js(done) {
    'use strict'

    return gulp.src(paths.javascript.input)

        /** Lint SCSS */
        .pipe(eslint())
        .pipe(eslint.format())
        //.pipe(eslint.failOnError())

        // write unminified file
        .pipe(gulp.dest(paths.javascript.output))

        // uglify
        .pipe(uglify())

        // rename
        .pipe(rename({
            'suffix': '.min'
        }))

        // write final file
        .pipe(gulp.dest(paths.javascript.output))

        .pipe(browserSync.stream())

    done()
}));


gulp.task('init', gulp.series('clean:dist', 'css', 'js'), function init(done) {
    'use strict'
    done()
});


gulp.task('watch', function(done) {
    'use strict'

    browserSync.init({
        server: '.'
    })

    gulp.watch(paths.stylesheets.input, { awaitWriteFinish: {stabilityThreshold: 50} })
        .on('change', gulp.series('css'))

    gulp.watch(paths.javascript.input, { awaitWriteFinish: {stabilityThreshold: 50} })
        .on('change', gulp.series('js'))

    gulp.watch('*.html').on('change', browserSync.reload)

    done()
});


gulp.task('default', gulp.series(gulp.series('init', 'watch'), function(done) {
    'use strict'

    done()
}));
