'use strict';

var wizard = angular.module('component.wizard', []);


wizard.component('awWizard', {
    transclude: true,
    bindings: {
        animation: '@',
        onStepChanged: '&',
        showSteps: '<'
    },
    controller: 'WizardController as wizCtrl',
    templateUrl: 'common/components/wizard/awWizard.html'
});

wizard.controller('WizardController', function ($scope, $state) {
    var vm = this;
    vm.steps = [];
    vm.currentIndex = 0;
    vm.stepAnimations = {
        next: 'a-slide-in-right', // from right
        prev: 'a-slide-in-left', // from left
        fadeIn: 'a-fade-in'
    };
    vm.currentAnimation = vm.stepAnimations.next;

    vm.$onInit = function () {
        if (vm.showSteps === undefined) {
            vm.showSteps = true;
        }
        if (!vm.animation) {
            vm.animation = 'slide';
        }

        if (vm.onStepChanged) {
            vm.onStepChanged({index: vm.currentIndex, numOfSteps: vm.steps.length});
        }
    };

    vm.registerStep = function (step) {
        if (vm.steps.length === 0) {
            vm.currentStep = step;
            vm.currentIndex = 0;
        }
        vm.steps.push(step);
    };


    vm.stepTo = function (stepName) {
        var nextIndex = vm.steps.map(function (step) {
            return step.stepName;
        }).indexOf(stepName);

        if (vm.currentIndex === nextIndex) {
            return;
        }

        if (nextIndex < vm.currentIndex) {
            vm.prev(false, vm.currentIndex - nextIndex);
        } else {
            vm.next(false, vm.currentIndex + nextIndex);
        }
    };

    vm.next = function (fire, numOfSteps) {
        var nextIndex = ((vm.currentIndex + numOfSteps) < vm.steps.length) ? (vm.currentIndex + numOfSteps) :
            (vm.steps.length - 1);
        var nextStep = vm.steps[nextIndex];

        vm.animate(vm.stepAnimations.next);
        vm.currentIndex = nextIndex;
        if (fire) {
            $state.go(nextStep.contentRef);
        }

        vm.fireCallback();
    };

    vm.prev = function (fire, numOfSteps) {
        var prevIndex = ((vm.currentIndex - numOfSteps) < 0) ? 0 : (vm.currentIndex - numOfSteps);
        var prevStep = vm.steps[prevIndex];

        vm.animate(vm.stepAnimations.prev);
        vm.currentIndex = prevIndex;
        if (fire) {
            $state.go(prevStep.contentRef);
        }
        vm.fireCallback();
    };

    vm.animate = function (direction) {
        if (vm.animation === 'slide') {
            vm.currentAnimation = direction;
        } else {
            vm.currentAnimation = vm.stepAnimations.fadeIn;
        }
    };

    vm.fireCallback = function () {
        if (vm.onStepChanged) {
            vm.onStepChanged({index: vm.currentIndex, numOfSteps: vm.steps.length});
        }
    };

    // states
    $scope.$on('wizard.nextStep', function () {
        vm.next(true, 1);
    });


    $scope.$on('wizard.prevStep', function () {
        vm.prev(true, 1);
    });

    $scope.$on('$destroy', function () {
        vm.steps = [];
        vm.currentStep = null;
        vm.stepAnimations = null;
        vm.currentAnimation = null;
    });
});