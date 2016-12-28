const gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    jshint = require('gulp-jshint'),
    gulpMocha = require('gulp-mocha'),
    gutil = require('gulp-util');


gulp.task('lint', () => {
    return gulp.src(['./*.js', './*/*.js', './*/*/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('mocha', () => {
    return gulp.src('tests/*.js', { read: false })
        .pipe(gulpMocha({ reporter: 'list' }))
        .on('error', gutil.log);
});

gulp.task('set-dev-node-env', () => process.env.NODE_ENV = 'development');

gulp.task('set-prod-node-env', () => process.env.NODE_ENV = 'production');

gulp.task('set-test-node-env', () => process.env.NODE_ENV = 'test');

gulp.task('dev', ['set-dev-node-env'], () => {
    nodemon({
        // the script to run the app
        script: 'server.js',
        ext: 'js',
        watch: ["server.js", "models/", "controllers/", 'routes/', 'data/', 'config/'],
        env: {
            PORT: 9000
        },
        tasks: ['lint'],
        ignore: ['./node_modules/**']
    }).on('restart', () => console.log('Node Dev Server restarted!'));
});

gulp.task('test', ['set-test-node-env'], () => {
    nodemon({
        script: 'server.js',
        ext: 'js',
        watch: ["server.js", "tests/**"],
        env: {
            PORT: 8000
        },
        tasks: ['mocha'],
        ignore: ['./node_modules/**']
    }).on('restart', () => console.log('Node Test Server restarted!'));
});
