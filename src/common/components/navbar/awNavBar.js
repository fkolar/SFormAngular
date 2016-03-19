'use strict';

var navBar = angular.module('component.nav-bar', []);


navBar.component('awNavBar', {
    transclude: true,
    bindings: {
        title: '@'
    },
    controller: 'NavBarController as navNarCtrl',
    templateUrl: 'common/components/navbar/awNavBar.html'
});

navBar.controller('NavBarController', function ($scope) {
    var vm = this;


    vm.$onInit = function () {

    };

    vm.registerStep = function (step) {
        if (vm.steps.length === 0) {
            vm.currentStep = step;
            vm.currentIndex = 0;
        }
        vm.steps.push(step);
    };



    $scope.$on('$destroy', function () {
        vm.steps = [];
        vm.currentStep = null;
        vm.stepAnimations = null;
        vm.currentAnimation = null;
    });
});