'use strict';

var authoring = angular.module('sFormApp.authoring', [
    'component.wizard',
    'component.nav-bar'
]);

authoring.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider.state('app.authoring', {
        abstract: true,
        url: '/authoring',
        controller: 'AuthoringCtrl as authoring',
        templateUrl: 'app/authoring/authoring.html'
    });


    $stateProvider.state('app.authoring.create-form', {
        url: '/create-form',
        views: {
            'content': {
                templateUrl: 'app/authoring/create-form/create-form-step.html',
                controller: 'CreateFormCtrl as createForm'
            }
        }
    });


    $stateProvider.state('app.authoring.add-approver', {
        url: '/add-approver',
        views: {
            'content': {
                templateUrl: 'app/authoring/add-approver/add-approver-step.html',
                controller: 'AddApproverCtrl as addApprover'
            }
        }
    });


    $stateProvider.state('app.authoring.cust-notification', {
        url: '/cust-notification',
        views: {
            'content': {
                templateUrl: 'app/authoring/cust-notification/cust-notification-step.html',
                controller: 'CustomizeNotificationCtrl as custNoti'
            }
        }
    });

});

authoring.controller('AuthoringCtrl', function ($scope, $state, $log, awHistory) {
    var vm = this;
    vm.data = {};
    vm.name = 'Authoring page';
    vm.fromLeft = false;


    vm.init = function() {
        $scope.$broadcast('navbar.buttons.activation', 'previous', false);

    };

    vm.next = function () {
        $scope.$broadcast('wizard.nextStep');
    };

    vm.prev = function () {

    };

    vm.save = function () {
        $log.info('SAVING ...');
    };


    vm.back = function () {
        awHistory.goBack();
    };

    vm.stepChanged = function (index, numOfSteps) {
        $log.info('Wizard step selected: ' + index);

        vm.stepIndex = index;

        $scope.$broadcast('navbar.buttons.activation', 'previous', vm.stepIndex > 0);
    };

    vm.init();

});