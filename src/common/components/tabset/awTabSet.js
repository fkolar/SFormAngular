'use strict';

var tabset = angular.module('component.tab-set', []);


tabset.component('awTabSet', {
    transclude: true,
    bindings: {
        onTabSelected:'&'

    },
    controller: 'TabSetController as tabCtrl',
    templateUrl: 'common/components/tabset/awTabSet.html'
});

tabset.controller('TabSetController', function ($scope, $state) {
    var vm = this;
    vm.tabs = [];
    vm.currentTab = 0;
    vm.currentTabIndex = 0;


    vm.$onInit = function () {
//        if (vm.onTabChanged) {
//            vm.onTabChanged({index: vm.currentTabIndex, numOfTabs: vm.tabs.length});
//        }
    };

    vm.addTab = function (tab) {
        if (vm.tabs.length === 0) {
            vm.currentTab = tab;
            vm.currentTabIndex = 0;

            vm.selectTab(tab);
        }
        vm.tabs.push(tab);
    };

    this.selectTab = function(pane) {
        angular.forEach(vm.tabs, function(pane) {
            pane.selected = false;
        });
        pane.selected = true;

        if (vm.onTabSelected) {
            vm.onTabSelected({title:pane.title});
        }
    };



    $scope.$on('$destroy', function () {
        vm.tabs = null;
        vm.currentTab = null;
        vm.currentTabIndex = 0;

    });
});