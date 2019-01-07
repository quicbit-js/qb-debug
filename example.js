var debug = require('.')('debug')
debug.enabled = true      // also controlled by the DEBUG environment - see the original debug module.

var buf = Uint8Array.from([42, 107, 241, 210, 9, 77, 192, 188, 120, 32, 12, 0, 210, 9, 77, 192, 188, 120, 32, 12, 0, 210, 9, 77, 192, 188, 120, 32, 12, 0, 210, 9, 77, 192, 188, 120, 32, 12, 0, 210, 9, 77, 192, 188, 120, 32, 12, 0, 210, 9, 77, 192, 188, 120, 32, 12, 0])
debug('buffer with s format: %s', buf)
debug('buffer with x format: %x', buf)
debug('nested object with j format: %j', { name: 'an object', values: [buf, null, 'last'] } )
debug('nested object with x format: %x', { name: 'an object', values: [buf, null, 'last'] } )

require('.')('x2', {x_maxchars: 999})    // beware - this sets the x format size option for all active debuggers

debug('buffer with s format: %s', buf)
debug('buffer with x format: %x', buf)
debug('nested object with j format: %j', { name: 'an object', values: [buf, null, 'last'] } )
debug('nested object with x format: %x', { name: 'an object', values: [buf, null, 'last'] } )
