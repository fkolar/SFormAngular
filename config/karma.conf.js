module.exports = function (config) {
    config.set({
        basePath: '../',
        frameworks: ['jasmine'],
        files: [

            './www/lib/angular/angular.js',
            './www/lib/angular-new-router/dist/router.es5.js',
            './www/lib/angular-mocks/angular-mocks.js',
            './www/js/*.js',

            //Test Specs
            './test/unit/**/*.spec.js'
        ],

        exclude: [],

        preprocessors: {

        },

        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false
    });
};