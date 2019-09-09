var gulp = require("gulp");
var htmlClean = require("gulp-htmlclean");
var imageMin = require("gulp-imagemin");
var uglify = require("gulp-uglify");
var debug = require("gulp-strip-debug");
var less = require("gulp-less");
var cleanCss = require("gulp-clean-css");
var postCss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var connect = require("gulp-connect")

var folder = {
    src: "src/",
    dist: "dist/"
}

// 判断当前环境变量
var devMod = process.env.NODE_ENV == "development";
// export NODE_ENV=development 环境变量设置
console.log(devMod)

gulp.task("html", function () {
    var page = gulp.src(folder.src + "html/*")
        .pipe(connect.reload())
        if(!devMod) {
            page.pipe(htmlClean())
        }
        page.pipe(gulp.dest(folder.dist + "html"))
})

gulp.task("css", function () {
    var css = gulp.src(folder.src + "css/*")
        .pipe(connect.reload())
        .pipe(less())
        // .pipe(postCss([autoprefixer({
        //     browsers: ['last 2 versions'],
        //     cascade: true // 是否美化属性值
        // })]))
        if(!devMod) {
            css.pipe(cleanCss())
        }
        css.pipe(gulp.dest(folder.dist + "css"))
})

gulp.task("js", function () {
    var js = gulp.src(folder.src + "js/*")
        .pipe(connect.reload())
        if(!devMod) {
            js.pipe(debug())
            js.pipe(uglify())
        }
        js.pipe(gulp.dest(folder.dist + "js"))
})

gulp.task("image", function () {
    gulp.src(folder.src + "images/*")
        .pipe(imageMin())
        .pipe(gulp.dest(folder.dist + "images"))
})

gulp.task("server", function () {
    connect.server({
        port: "8888",
        livereload: true
    })
})

//监听文件变化
gulp.task("watch", function () {
    gulp.watch(folder.src + "html/*", gulp.parallel("html"));
    gulp.watch(folder.src + "images/*", gulp.parallel("image"));
    gulp.watch(folder.src + "js/*", gulp.parallel("js"));
    gulp.watch(folder.src + "css/*", gulp.parallel("css"));
})

gulp.task('default', gulp.parallel("html", "css", "js", "image", "server", "watch"))