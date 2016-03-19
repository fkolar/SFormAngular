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



    $scope.$on('$destroy', function () {

    });
});