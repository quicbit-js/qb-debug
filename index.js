// Software License Agreement (ISC License)
//
// Copyright (c) 2018, Matthew Voss
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

var debug = require('debug')

function is_byte_array (a) {
  if (ArrayBuffer.isView(a)) {
    return true
  }
  if (Array.isArray(a)) {
    for (var i=0; i < a.length; i++) {
      if (typeof a[i] !== 'number' || a[i] < 0 || a[i] > 0xFF) {
        return false
      }
    }
    return true
  }
  return false
}

function buf2str (v, maxchars) {
  if (is_byte_array(v)) {
    v = Buffer.from(v)
  } else if (v.type === 'Buffer' && v.data && Array.isArray(v.data)) {
    v = Buffer.from(v.data)
  }

  if (Buffer.isBuffer(v)) {
    v = v.toString('hex')
    if (maxchars != null && v.length > maxchars) {
      v = v.substr(0, maxchars)
    }
    v = v.toUpperCase()
  }
  return v
}

// format a buffer to a truncated hex string of maxchars in length.
// format other objects to json applying buffer conversion
function format_x_fn (maxchars) {
  return function format_x (v) {
    if (v && typeof v === 'object') {
      v = buf2str(v, maxchars)
      if (typeof v === 'string') { return v }

      return JSON.stringify(v, function (k, v) {
        if (v && typeof v === 'object') {
          v = buf2str(v, maxchars)
        }
        return v
      })
    }
    return String(v)
  }
}

function create (namespace, opt) {
  opt = opt || {}
  debug.formatters.x = format_x_fn (opt.x_maxchars || 8)
  debug.inspectOpts.hideDate = true
  return debug(namespace)
}

module.exports = create
