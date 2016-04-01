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
    controller: 'NavBarController as navCtrl',
    templateUrl: 'common/components/navbar/awNavBar.html'
});

/**
 *  Ideally this needs to be refactored so it accepts navigation buttons and it can be flexibile
 *  and then create extra separate component e.g. PageNavBar that will utilize this nav bar component
 *  and reuse some functionality
 *  Because the form it is work now even I call it nav bar its not really a nav bar its more wizard
 *  navigation bar.
 */
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