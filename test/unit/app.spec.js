'use strict';

describe('AppController', function() {
    var controller;

    beforeEach(module('superApp'));

    beforeEach(inject(function (_$router_, _$controller_) {
        controller = _$controller_('AppController', {
            '$router': _$router_
        });
    }));


    it('should init a name to Frank Kolar', function() {
        expect(controller.name).toBe('Angular Developer');
    });
});