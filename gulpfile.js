"use strict";
var gulp = require("gulp");
var del = require("del");
var sourcemaps = require('gulp-sourcemaps');

/**
 * Remove build directory.
 */
gulp.task('clean', function (cb) {
    return del(["build"], cb);
});

/**
 * Copy all resources that are not TypeScript files into build directory.
 */
gulp.task("resources", ["server", "app", "assets"], function () {
    console.log("Building resources...");
});
/* copy the app core files to the build folder */
gulp.task("app", ['index'], function(){
    return gulp.src(["**", "!**/*.ts", "!**/*.js.map"],  { cwd: "src/**" })
        .pipe(gulp.dest("build"));
});
/* get the index file to the root of the build */
gulp.task("index", function(){
    return gulp.src(["index.html"], { cwd: "src/**" })
        .pipe(gulp.dest("build"));
});
/* copy node server to build folder */
gulp.task("server", function () {
    return gulp.src(["index.js", "package.json"])
        .pipe(gulp.dest("build"));
});
/* styles and other assets */
gulp.task("assets", function(){
    return gulp.src(["styles.css"], { cwd: "src/**" })
        .pipe(gulp.dest("build"));
});
/**
 * Build the project.
 */
gulp.task("libs", function () {
    return gulp.src(["**"], {cwd: "node_modules/**"})
        .pipe(gulp.dest("build/node_modules"));
});

gulp.task("default", ['resources'], function () {
    console.log("Building the project ...");
});