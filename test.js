// Software License Agreement (ISC License)
//
// Copyright (c) 2019, Matthew Voss
//
// Permission to use, copy, modify, and/or distribute this software for
// any purpose with or without fee is hereby granted, provided that the
// above copyright notice and this permission notice appear in all copies.
//
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

var test = require('test-kit').tape()
var debug = require('.')

test('debug output', function (t) {
  var d1 = debug('d1')
  d1.useColors = false
  d1.inspectOpts = { useColors: false, hideDate: true }
  d1.enabled = true
  d1.log = t.hector()
  t.table_assert([
    [ 'args',                                                                           'exp' ],
    [ ['hi'],                                                                           'd1 hi' ],
    [ ['array1 %x', [97,98,99]],                                                        'd1 array1 abc' ],
    [ ['array1 %x', Buffer.from('abcdefgh')],                                           'd1 array1 abcdefgh' ],
    [ ['array1 %x', Buffer.from('abcdefghi')],                                          'd1 array1 abcdefgh..' ],
    [ ['array1 %x', [1,2,3,4,5]],                                                       'd1 array1 x01020304' ],
    [ ['array1 %x', [1,2,3,4,500]],                                                     'd1 array1 [1,2,3,4,500]' ],
    [ ['array2 %x', [0xAB, 0xFF]],                                                      'd1 array2 xABFF' ],
    [ ['buf data %x', { type: 'Buffer', data: [0xAB, 0xFF] } ],                         'd1 buf data xABFF' ],
    [ ['uint buffer %x', Uint8Array.from([0xAB, 0xFF])],                                'd1 uint buffer xABFF' ],
    [ ['buffer %x', Buffer.from([0xAB, 0xFF])],                                         'd1 buffer xABFF' ],
    [ ['object %x', { a: 'hi', b: ['x', 'y']}],                                         'd1 object {"a":"hi","b":["x","y"]}' ],
    [ ['number %x', 23 ],                                                               'd1 number 23' ],
    [ ['object %x', { a: 'hi', b: [0xAB, 0, 0xFF], c: Uint8Array.from([0x12, 0x34])}],  'd1 object {"a":"hi","b":"xAB00FF","c":"x1234"}' ],
  ], function (args) {
    d1.apply(null, args)
    var ret = d1.log.args.join(', ')
    d1.log.args.length = 0
    return ret
  })
})
test('debug maxchars option', function (t) {
  var d1 = debug('d1', {x_maxchars: 2})
  d1.useColors = false
  d1.inspectOpts = { useColors: false, hideDate: true }
  d1.enabled = true
  d1.log = t.hector()
  t.table_assert([
    [ 'args',                                              'exp' ],
    [ ['uint buffer %x', Uint8Array.from([0xAB, 0xFF])],   'd1 uint buffer xAB' ],
    [ ['buffer %x', Buffer.from([0xAB, 0xFF])],            'd1 buffer xAB' ],
  ], function (args) {
    d1.apply(null, args)
    var ret = d1.log.args.join(', ')
    d1.log.args.length = 0
    return ret
  })
})






