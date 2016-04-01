'use strict';

var splitView = angular.module('component.split-view', []);


splitView.component('awSplitView', {
    transclude: true,
    replace:true,
    bindings: {
        direction:'@'

    },
    controller: 'SplitViewController as splitCtrl',
    templateUrl: 'common/components/splitview/awSplitView.html'
});

splitView.controller('SplitViewController', function ($scope) {
    var vm = this;


    vm.$onInit = function () {
        if (!vm.direction) {
            vm.direction = 'horizontal';
        }
    };



    $scope.$on('$destroy', function () {
        vm.direction = null;
    });
});