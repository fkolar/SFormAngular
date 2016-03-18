'use strict';

angular.module('sFormApp.authoring', [
])

.config(function ($stateProvider, $urlRouterProvider) {

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
                templateUrl: 'app/authoring/add-approver/add-approver-step.html',
                controller: 'CustomizeNotificationCtrl as custNoti'
            }
        }
    });

})

.controller('AuthoringCtrl', function ($scope, $state) {
    var vm = this;
    vm.data = {};
    vm.name = 'Authoring page';
    vm.fromLeft = false;

    vm.steps = [
        'app.authoring.create-form',
        'app.authoring.add-approver',
        'app.authoring.cust-notification'
    ];

    vm.toggleDirection = function(stepName) {
        var fromIndex = vm.steps.indexOf($state.current.name);
        var toIndex = vm.steps.indexOf(stepName);

        vm.fromLeft = fromIndex > toIndex;
    };

    vm.stepTo = function(stepName) {
        vm.toggleDirection(stepName);
        $state.go(stepName);
    };

});