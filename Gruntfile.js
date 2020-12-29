module.exports = function (grunt) {
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-copy");

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
                files: {
                    'dist/min/main.js': ['dist/*.js'],
                }
            }
        },
        copy: {
            default: {
                expand: true,
                cwd: 'dist/min/',
                src: 'main.js',
                dest: 'out/'
            }
        }
    })
    // 将 ts 编译任务注册到默认执行命令
    grunt.registerTask('default', ["ts", "uglify", "copy"])
}