'use strict';

var authoring = angular.module('sFormApp.authoring');


authoring.controller('CreateFormCtrl', function ($scope) {
    var vm = this;
    vm.name = ' Create Form Page';


    vm.onTabSelected = function (title) {
        console.log('tab = ' + title);
    };

});