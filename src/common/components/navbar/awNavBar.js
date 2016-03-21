'use strict';

var navBar = angular.module('component.nav-bar', []);


navBar.component('awNavBar', {
    transclude: true,
    bindings: {
        title: '@',
        top: '@',
        next: '&',
        previous: '&',
        save: '&'
    },
    controller: 'NavBarController as navNarCtrl',
    templateUrl: 'common/components/navbar/awNavBar.html'
});

navBar.controller('NavBarController', function ($scope) {
    var vm = this;


    vm.$onInit = function () {
        vm.showNextButton = (vm.next !== undefined);
        vm.showPrevButton = (vm.previous !== undefined);
        vm.showSaveButton = (vm.save !== undefined);

        vm.top = (vm.top && vm.top === 'true') || true;
        vm.bottom = (vm.top && vm.top === 'true') || false;
    };


    vm.buttonAction = function (actionName) {
        if (vm[actionName]) {
            vm[actionName]();
        }
    };


    // states
    $scope.$on('navbar.buttons.activation', function (context, buttonName, activate) {
        console.log('Activate deactivate' + buttonName + ', activate:' + activate);

    });

    $scope.$on('$destroy', function () {
        vm.vm.showNextButton = null;
        vm.showPrevButton = null;
        vm.showSaveButton = null;

        vm.top = null;
        vm.bottom = null;

        vm.next = null;
        vm.previous = null;
        vm.save = null;
    });
});