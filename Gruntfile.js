module.exports = function (grunt) {
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks("grunt-contrib-uglify");

    grunt.initConfig({
        'ts': {
            default: {
                options: {
                    sourceMap: false,
                    target: 'es5',
                    rootDir: "src/"
                },
                src: ["src/*.ts"],
                // 编译好的文件的输出目录
                outDir: 'dist/'
            }
        },
        uglify: {
            default: {
                files: [{
                   'dist/all.js':['dist/*.js'],
                }]
             }
        }
    })
    // 将 ts 编译任务注册到默认执行命令
    grunt.registerTask('default', ["ts" , "uglify"])
}