var debug = require('.')('debug')
debug.enabled = true      // also controlled by the DEBUG environment - see the original debug module.

var buf = Uint8Array.from([42, 107, 241, 210, 9, 77, 192, 188, 120, 32, 12, 0, 210, 9, 77, 192, 188, 120, 32, 12, 0, 210, 9, 77, 192, 188, 120, 32, 12, 0, 210, 9, 77, 192, 188, 120, 32, 12, 0, 210, 9, 77, 192, 188, 120, 32, 12, 0, 210, 9, 77, 192, 188, 120, 32, 12, 0])
debug('buffer with s format: %s', buf)
debug('buffer with x format: %x', buf)
debug('nested object with s format: %j', { name: 'an object', values: [buf, null, 'last'] } )
debug('nested object with x format: %x', { name: 'an object', values: [buf, null, 'last'] } )

// all-printable-ascii values are formatted as ascii
var asc = Uint8Array.from([97,98,99,100,101,102,103,104,105])
debug('ascii buffers with s: %s and %j', asc, {key: asc})
debug('ascii buffers with s/j: %x and %x', asc, {key: asc})


require('.')('x2', {x_maxchars: 999})    // beware - this sets the x format size option for all active debuggers

debug('buffer with s format: %s', buf)
debug('buffer with x format: %x', buf)
debug('nested object with j format: %j', { name: 'an object', values: [buf, null, 'last'] } )
debug('nested object with x format: %x', { name: 'an object', values: [buf, null, 'last'] } )


