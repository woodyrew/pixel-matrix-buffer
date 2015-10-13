/* eslint-env mocha */

'use strict';

var expect              = require('chai').expect;
var buffer_pixel_matrix = require('../lib');


describe('Initialise pixel-matrix-buffer', function () {

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


describe('Setting and retriving pixel-matrix-buffer values', function () {
    it('should return an empty default matrix', function (done) {
        var buffer = buffer_pixel_matrix(3, 2);
        expect(buffer.get_matrix()).to.be.a('string').and.to.equal('falsefalsefalsefalsefalsefalse');
        done();
    });

    it('should return an empty default matrix using 0 and 1 as state', function (done) {
        var buffer = buffer_pixel_matrix(3, 2, {on_state: 1, off_state: 0});
        expect(buffer.get_matrix()).to.be.a('string').and.to.equal('000000');
        done();
    });

    it('should return an empty default matrix using with tabs and newline', function (done) {
        var buffer = buffer_pixel_matrix(3, 2);
        expect(buffer.get_matrix('\t', '\n')).to.be.a('string').and.to.equal('false\tfalse\tfalse\nfalse\tfalse\tfalse');
        done();
    });

    it('should set pixels to be on and return the matrix', function (done) {
        var buffer = buffer_pixel_matrix(3, 2);
        buffer.set(1, 1, true);
        buffer.set(2, 1, true);

        expect(buffer.get_matrix()).to.be.a('string').and.to.equal('truetruefalsefalsefalsefalse');
        done();
    });

    it('should set pixels to be on, 1|0 for state and return the matrix', function (done) {
        var buffer = buffer_pixel_matrix(3, 2, {on_state: 1, off_state: 0});
        buffer.set(1, 1, true);
        buffer.set(2, 1, true);

        expect(buffer.get_matrix()).to.be.a('string').and.to.equal('110000');
        done();
    });

    it('should set pixels to be on and off, 1|0 for state and return the matrix', function (done) {
        var buffer = buffer_pixel_matrix(3, 2, {on_state: 1, off_state: 0});
        buffer.set(1, 1, true);
        buffer.set(2, 1, true);
        buffer.set(2, 1, false);
        buffer.set(1, 2, true);

        expect(buffer.get_matrix()).to.be.a('string').and.to.equal('100100');
        done();
    });

    it('should initialise as true and set pixels to be on and off, 1|0 for state and return the matrix', function (done) {
        var buffer = buffer_pixel_matrix(3, 2, {initial_state: true, on_state: 1, off_state: 0});
        buffer.set(3, 2, false);
        buffer.set(2, 2, false);
        buffer.set(2, 2, true);
        buffer.set(3, 1, false);

        expect(buffer.get_matrix()).to.be.a('string').and.to.equal('110110');
        done();
    });
});
