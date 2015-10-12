'use strict';

var debug = require('debug');
var log   = debug('buffer-pixel-matrix');
var error = debug('buffer-pixel-matrix:error');
var Joi   = require('joi');

var buffer = function (columns, rows, options) {
    log('Initialising...');
    var schema = Joi.object().keys({
        columns  : Joi.number().integer().min(1).required()
        , rows   : Joi.number().integer().min(1).required()
        , options: Joi.object().keys({
            initial_state: Joi.boolean().default(false)
            , on_state   : Joi.any().default(true)
            , off_state  : Joi.any().default(false)
        })
    });

    // counters
    var i, j;

    // Validate params
    schema.validate({columns: columns, rows: rows, options: options || {}}, function (err, value) {
        log('value: %o', value);
        if (err) {
            error(err);
            throw new Error(err);
        }

        // Use validated values
        columns = value.columns;
        rows = value.rows;
        options = value.options;

        log('columns: %s, rows: %s', columns, rows);
        log('options: %o', options);
    });

    var on = options.on_state;
    var off = options.off_state;
    var state_val = function (state) {
        return (state) ? on : off;
    };

    // Create buffer matrix
    var matrix = new Array(columns);

    for (i = 0; i < columns; i++) {
        // Create buffer matrix
        matrix[i] = new Array(rows);
    }


    for (i = 0; i < columns; i++) {
        for (j = 0; j < rows; j++) {
            matrix[i][j] = state_val(options.initial_state);
        }
    }

    var set_value = function (x, y, value) {
        // Do validation of x, y
        var actual_x = x - 1;
        var actual_y = y - 1;

        matrix[actual_x][actual_y] = value;
    };

    var show_matrix = function () {
        var str = [];
        for (i = 0; i < columns; i++) {
            str.push(matrix[i].join('\t'));
        }
        console.log(str.join('\n'));
    };

    return {
        show : show_matrix
        , set: set_value
    };
};

module.exports = buffer;
