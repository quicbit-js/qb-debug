# qb-debug

[![npm][npm-image]][npm-url]
[![downloads][downloads-image]][npm-url]

[npm-image]:       https://img.shields.io/npm/v/qb-debug.svg
[downloads-image]: https://img.shields.io/npm/dm/qb-debug.svg
[npm-url]:         https://npmjs.org/package/qb-debug

An extension of the [debug](https://github.com/visionmedia/debug) module that adds a '%x' format
for brief readable output of byte arrays including node Buffer objects.

**Complies with the 100% test coverage and minimum dependency requirements** of 
[qb-standard](http://github.com/quicbit-js/qb-standard) . 

# install

    npm i qb-debug
    
# hex buffer example

qb-debug is a debug with an extra '%x' formatter added.  Use it just like npm debug...

    var debug = require('debug')('example')
    debug.enabled = true      // also controlled by the DEBUG environment - see the original debug module.
    
For byte buffers, normal debug just lists the integer contents.

    var buf = Uint8Array.from([
        42, 107, 241, 210, 9, 77, 192, 188, 120, 32, 12, 
        0, 210, 9, 77, 192, 188, 120, 32, 12, 0, 210, 9, 
        77, 192, 188, 120, 32, 12, 0, 210, 9, 77, 192, 
        188, 120, 32, 12, 0, 210, 9, 77, 192, 188, 120, 
        32, 12, 0, 210, 9, 77, 192, 188, 120, 32, 12, 0
    ])
    
With normal debug, buffers are hard to recognize for short buffers such as 20 byte hashes, and a problem when working with
larger buffers:

    debug('buffer with s format: %s', buf)
    
    >   debug1 buffer with s format: 42,107,241,210,9,77,192,188,120,32,12,0,210,9,77,192,188,120,32,12,0,210,9,77,192,188,120,32,12,0,210,9,77,192,188,120,32,12,0,210,9,77,192,188,120,32,12,0,210,9,77,192,188,120,32,12,0 +0ms


qb-debug %x format gives 'x' followed by the first eight bytes in hex.  This is usually enough to recognize an id or key:

    debug('buffer with x format: %x', buf)
    
    > debug buffer with x format: x2A6BF1D2 +2ms
    
    
# ASCII buffers

The %x format detects when a buffer contains all printable ascii values (> 31 and < 127) and in these
cases prints out simple ascii:
    
    var asc = Uint8Array.from([97,98,99,100,101,102,103,104,105])
    
with %x:

    debug('ascii buffers with s/j: %x and %x', asc, {key: asc})
    
    > debug ascii buffers with s/j: abcdefgh and {"key":"abcdefgh"} +1ms

with %s and %j:

    debug('ascii buffers with s: %s and %j', asc, {key: asc})

    > debug ascii buffers with s: 97,98,99,100,101,102,103,104,105 and {"key":{"0":97,"1":98,"2":99,"3":100,"4":101,"5":102,"6":103,"7":104,"8":105}} +0ms

    
# Nested Object Handling with %x format

If you pass a nessted object to qb-debug with %x format, the object will be converted to a JSON string 
*with buffer short hex handling for all buffers and byte arrays within the object*.

So if you view id's and keys in inside an object:

    debug('nested object with x format: %x', { name: 'an object', values: [buf, null, 'last'] } )

    > debug nested object with x format: {"name":"an object","values":["x2A6BF1D2",null,"last"]} +1ms

instead of the this JSON output (using the normal %j):

    debug('nested object with j format: %j', { name: 'an object', values: [buf, null, 'last'] } )
    
    > debug1 nested object with j format: {"name":"an object","values":[{"0":42,"1":107,"2":241,"3":210,"4":9,"5":77,"6":192,"7":188,"8":120,"9":32,"10":12,"11":0,"12":210,"13":9,"14":77,"15":192,"16":188,"17":120,"18":32,"19":12,"20":0,"21":210,"22":9,"23":77,"24":192,"25":188,"26":120,"27":32,"28":12,"29":0,"30":210,"31":9,"32":77,"33":192,"34":188,"35":120,"36":32,"37":12,"38":0,"39":210,"40":9,"41":77,"42":192,"43":188,"44":120,"45":32,"46":12,"47":0,"48":210,"49":9,"50":77,"51":192,"52":188,"53":120,"54":32,"55":12,"56":0},null,"last"]} +0ms

# ASCII

If all values in a formatted buffer are printable ascii (> 31 and < 127), then %x gives the ascii representation:

 
