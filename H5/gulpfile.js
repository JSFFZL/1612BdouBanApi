

var gulp = require("gulp");
var webserver = require("gulp-webserver");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var sass = require("gulp-sass");
var cssclean = require("gulp-clean-css");
var babel = require("gulp-babel");


/*
 * @Author: 非凡主力
 * @Date: 2019-03-15 14:54:37 
 * 开发
 * 启动web服务，并且提供自动刷新功能
 * @Last Modified time: 2019-03-15 14:54:37 
 */
gulp.task('webserver',function(){
    return gulp.src('./src/')
    .pipe(webserver({
        open:true,
        port:8086,
		proxies:[
			{source:"/juno/weapp/v2/search/prefix_keyword_suggester.json",target:"https://www.xiachufang.com/juno/weapp/v2/search/prefix_keyword_suggester.json"}
		]
    }))
})


/*
 * @Author: 非凡主力
 * @Date: 2019-03-15 14:54:37 
 * 开发
 * 进行scss文件编译，并且压缩css
 * @Last Modified time: 2019-03-15 14:54:37 
 */
gulp.task('scss',function(){
    return gulp.src("./src/css/scss/*.scss")
    .pipe(sass()) //编译
    .pipe(cssclean()) //压缩
    .pipe(gulp.dest("./src/css/"))
})


/*
 * @Author: 非凡主力
 * @Date: 2019-03-15 14:54:37 
 * 开发
 * 编译js文件，合并js，并且压缩
 * @Last Modified time: 2019-03-15 14:54:37 
 * es6 - es5 
 * $ cnpm install gulp-babel@7 babel-core babel-preset-es2015 -g
 */
gulp.task('js',function(){
    return gulp.src('./src/js/style/*.js')
    .pipe(babel({
        presets:'es2015'
    }))  //编译es6 -es5
    .pipe(concat("all.js")) //合并
    .pipe(uglify()) //压缩
    .pipe(gulp.dest('./src/js/'))
})


/*
 * @Author: mikey.zhaopeng 
 * @Date: 2019-03-15 15:59:52 
 * 用来打包的命令
 * @Last Modified time: 2019-03-15 15:59:52 
 */

 //压缩HTML
 gulp.task('html',function(){
    return gulp.src("./src/*.html")
    // .pipe(htmlmin()) //压缩
    .pipe(gulp.dest("./dist/"))
})
 //压缩图片
//  gulp.task('img',function(){
//     return gulp.src("./src/")
//     // .pipe(imgmin()) //压缩
//     .pipe(gulp.dest("./dist/img/"))
// })

 //压缩css
 gulp.task('css',function(){
    return gulp.src("./src/css/*.css")
    .pipe(cssclean()) //压缩
    .pipe(gulp.dest("./dist/css/"))
})

 //压缩js
 gulp.task('distJs',function(){
    return gulp.src("./src/js/*.js")
    .pipe(gulp.dest("./dist/js/"))
})




//进行css文件监听，自动执行对应的任务
gulp.task('watch',function(){
    gulp.watch(['./src/css/scss/*.scss','./src/js/style/*.js'],gulp.series('scss','js'));
})


//默认执行webserver服务，js，css，watch任务
gulp.task('default',gulp.series('webserver','js','scss','watch'));

// //启动开发环境
gulp.task('dev',gulp.series('webserver','scss','watch'));

///实现打包，生成打包文件夹
gulp.task('build',gulp.parallel('html','distJs','css'));


