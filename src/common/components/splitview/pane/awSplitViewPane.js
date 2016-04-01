'use strict';

var splitView = angular.module('component.split-view');


splitView.component('awSplitViewPane', {
    transclude: true,
    replace:true,
    bindings: {
        width: '@',
        contentRef: '@'
    },
    require: {
        splitView: '^awSplitView'
    },
    controller: 'SplitViewPaneController as splitPaneCtrl',
    templateUrl: 'common/components/splitview/pane/awSplitViewPane.html'
});

splitView.controller('SplitViewPaneController', function ($scope) {
    var vm = this;
    vm.hasContent = true;


    vm.$onInit = function () {
        if (!vm.width) {
            vm.width = '50%';
        }
        if (vm.contentRef) {
            vm.hasContent = false;
        }

    };


    $scope.$on('$destroy', function () {
        vm.width = null;
    });
});