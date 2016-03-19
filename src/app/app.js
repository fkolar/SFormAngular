'use strict';

var myApp = angular.module('sFormApp', [
    'ngAnimate',
    'ui.router',
    'templatescache',
    'services.history',
    'sFormApp.authoring'
]);


myApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/authoring/create-form');

    $stateProvider
        .state('app', {
            abstract:true,
            controller: 'AppCtrl as app',
            template: '<ui-view/>'
        });
});



myApp.run(function ($rootScope, awHistory) {
    awHistory.clearHistory();
});


/**
 * This is an app entry where the root controller is initialized and redirects to default view
 */
myApp.controller('AppCtrl', function ($scope, awHistory) {
    var vm = this;
    vm.name = 'Angular Developer';


    $scope.$on('$destroy', function () {
        vm.steps = [];

        awHistory.clearHistory();
    });
});





