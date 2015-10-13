# Pixel Matrix Buffer

For storing, updating and retrieving pixel matrixes.

## Install
```bash
$ npm install -S pixel-matrix-buffer
```

## Initialise
```js
var pixel_matrix_buffer = require('pixel-matrix-buffer');

var buffer = pixel_matrix_buffer(4, 3);
buffer.set(1, 1, true);
buffer.set(2, 1, true);
buffer.set(4, 3, true);
console.log(buffer.get_matrix('\t', '\n'));
```

Outputs:
```bash
true    true    false   false
false   false   false   false
false   false   false   true
```

### Use with a [piLite LED matrix](http://openmicros.org/index.php/articles/94-ciseco-product-documentation/raspberry-pi/280-b040-pi-lite-beginners-guide)
Return a string with 0's and 1's as the true/false state, initialise the matrix as true:
```js
var pixel_matrix_buffer = require('pixel-matrix-buffer');

var buffer = pixel_matrix_buffer(14, 9, {initial_state: true, on_state: 1, off_state: 0});
buffer.set(1, 1, false);
buffer.set(2, 1, false);
buffer.set(14, 9, false);
console.log(buffer.get_matrix());
```

Outputs:
```bash
001111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111110
```

## API
`pixel-matrix-buffer(columns, rows, options)`
### `columns` {integer}
The number of columns wide the matrix should be.

**Required** *Greater than 0*

### `rows` {integer}
The number of rows high the matrix should be.

**Required** *Greater than 0*

### `options` {object}
#### `initial_state` {boolean}
The state the matrix will be initialised with.

*Default:* **false**

#### `on_state` {mixed}
How *on* will be represented.

*Default:* **true**

#### `off_state` {mixed}
How *off* will be represented.

*Default:* **false**


## License

GPL-2.0