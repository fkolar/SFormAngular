'use strict';

var wizard = angular.module('component.wizard');
wizard.component('awWizardStep', {
    transclude: true,
    bindings: {
        contentRef:'@',
        stepName:'@',
        stepTitle:'@'
    },
    require: {
        wizard: '^awWizard'
    },
    controller: 'WizardStepController as wizStep',
    templateUrl: 'common/components/wizard/step/awWizardStep.html'
});

wizard.controller('WizardStepController', function () {
    var vm = this;

    vm.$onInit = function() {
        vm.wizard.registerStep(vm);
    };

    /**
     *
     * Are we transcluding or relaying on ui-router Reference
     */
    vm.hasContent = function() {
        return !vm.contentRef;
    };

    vm.isActive = function() {
        return vm.wizard.steps[vm.wizard.currentIndex].stepName === vm.stepName;
    };
});