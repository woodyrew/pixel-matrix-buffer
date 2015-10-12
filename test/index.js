/* eslint-env mocha */

'use strict';

var expect              = require('chai').expect;
var buffer_pixel_matrix = require('../lib');


describe('Initialise buffer-pixel-matrix', function () {

    it('should fail without x and y parameters', function (done) {
        var buffer = function () {
            buffer_pixel_matrix();
        };
        expect(buffer).to.throw(Error, /ValidationError/);
        done();
    });

    it('should fail without y parameter', function (done) {
        // Wrap the initialisation in a function to test error throwing on initialisation
        var buffer = function () {
            buffer_pixel_matrix(1);
        };
        expect(buffer).to.throw(Error, /ValidationError/);
        done();
    });

    it('should fail with x or y parameter < 1', function (done) {
        // Wrap the initialisation in a function to test error throwing on initialisation
        var buffer = function () {
            buffer_pixel_matrix(1, 0);
        };
        expect(buffer).to.throw(Error, /ValidationError/);
        done();
    });

    it('should return an object with two params', function (done) {
        var buffer = buffer_pixel_matrix(4, 3);
        expect(buffer).to.be.an('object');
        done();
    });

    it('should not error with two params', function (done) {
        // Wrap the initialisation in a function to test error throwing on initialisation
        var buffer = function () {
            buffer_pixel_matrix(4, 3);
        };
        expect(buffer).not.to.throw(Error);
        done();
    });

    it('should return a object with three params', function (done) {
        var buffer = buffer_pixel_matrix(4, 3, {initial_state: true});
        expect(buffer).to.be.an('object');
        done();
    });

    it('should not error with three params', function (done) {
        // Wrap the initialisation in a function to test error throwing on initialisation
        var buffer = function () {
            buffer_pixel_matrix(4, 3, {initial_state: true});
        };
        expect(buffer).not.to.throw(Error);
        done();
    });

    it('should error without object as third param', function (done) {
        // Wrap the initialisation in a function to test error throwing on initialisation
        var buffer = function () {
            buffer_pixel_matrix(4, 3, true);
        };
        expect(buffer).to.throw(Error, /ValidationError/);
        done();
    });

});
