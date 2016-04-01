'use strict';

var tabset = angular.module('component.tab-set');

tabset.component('awTabPane', {
    transclude: true,
    bindings: {
        title: '@',
        /**
         * Use this and rewrite tabs to use the same we have in the
         * wizard. ui-sref-active and ui-sref.
         * not used now. we do not need to include and tranclude content when we can reference
         * a view just like we have in wizard.
         */
        contentRef:'@'

    },
    require: {
        tabSet: '^awTabSet'
    },
    controller: 'TabPaneController as tabPaneCtrl',
    templateUrl: 'common/components/tabset/tab/awTabPane.html'
});

tabset.controller('TabPaneController', function () {
    var vm = this;

    vm.$onInit = function() {
        vm.tabSet.addTab(vm);
    };

    vm.hasContent = function() {
        return vm.contentRef !== undefined;
    };

});