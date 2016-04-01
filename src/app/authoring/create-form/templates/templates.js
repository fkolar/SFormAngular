'use strict';

var authoring = angular.module('sFormApp.authoring');


authoring.controller('CreateFormTemplatesCtrl', function ($scope) {
    var vm = this;
    vm.templates = ["Template 1", "Template 2"];


    vm.onTabSelected = function (title) {
        console.log('tab = ' + title);
    };

});