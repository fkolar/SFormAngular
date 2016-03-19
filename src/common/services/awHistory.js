'use strict';

var service = angular.module('services.history', []);

service.factory('awHistory', function ($rootScope, $state, $log) {

    var factory = {};
    var historyState = [];

    factory.goBack = function (numOfSteps) {
        var state = null;

        if (numOfSteps && numOfSteps < historyState.length) {
            for (var i = 0; i < numOfSteps; i++) {
                state = historyState.pop();
            }

        } else if (!numOfSteps) {
            historyState.pop();
            state = historyState.pop();
        }
        if (state) {
            $state.go(state.name);
        }
    };


    factory.currentState = function () {
        return historyState[historyState.length - 1];
    };

    factory.canGoBack = function () {
        return historyState.length > 1;
    };

    factory.clearHistory = function () {
        historyState = [];
    };


    $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
        historyState.push(to);
    });

    return factory;
});
