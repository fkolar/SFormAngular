var fs = require('fs');
var pkg = require('../package.json');

module.exports = {
    filename: 'sform.app.js',
    banner: '/*!\n' +
    ' *  Copyright (c) 2016 Ariba, Inc.\n' +
    ' */\n\n',

    closureStart: '(function(){\n\n',
    closureEnd: '\n\n})();',

    dev: 'www',
    release: 'dist',

    others: ['www/images/*.*'],
    resetDir: ['www/js', 'www/css', 'dist', 'www/lib', 'node_modules'],
    cleanJS: ['js/*.js'],
    cleanCSS: ['css/*.css'],
    srcJS: ['src/app/**/*.js'],
    srcCSS: ['src/my.app.scss'],
    srcHTML: ['src/**/*.html'],
    srcDev: ['www/js/**/*.js'],
    combineFiles: ['www/index.html'],

    testFiles: ['test/**/*.js'],

    versionData: {
        version: pkg.version
    }
};

