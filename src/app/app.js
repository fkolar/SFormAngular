'use strict';

var myApp = angular.module('sFormApp', [
    'ui.router',
    'templatescache',
    'ngAnimate',
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


/**
 * This is an app entry where the root controller is initialized and redirects to default view
 */
myApp.controller('AppCtrl', function () {
    var vm = this;
    vm.name = 'Angular Developer';

});





