function Vh(e) {
  if (Object.prototype.hasOwnProperty.call(e, "__esModule")) return e;
  var t = e.default;
  if (typeof t == "function") {
    var r = function n() {
      return this instanceof n ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    r.prototype = t.prototype;
  } else r = {};
  return Object.defineProperty(r, "__esModule", { value: !0 }), Object.keys(e).forEach(function(n) {
    var i = Object.getOwnPropertyDescriptor(e, n);
    Object.defineProperty(r, n, i.get ? i : {
      enumerable: !0,
      get: function() {
        return e[n];
      }
    });
  }), r;
}
var ho = {}, En = {}, _l;
function Qh() {
  if (_l) return En;
  _l = 1, En.byteLength = a, En.toByteArray = d, En.fromByteArray = g;
  for (var e = [], t = [], r = typeof Uint8Array < "u" ? Uint8Array : Array, n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", i = 0, s = n.length; i < s; ++i)
    e[i] = n[i], t[n.charCodeAt(i)] = i;
  t[45] = 62, t[95] = 63;
  function o(_) {
    var S = _.length;
    if (S % 4 > 0)
      throw new Error("Invalid string. Length must be a multiple of 4");
    var w = _.indexOf("=");
    w === -1 && (w = S);
    var L = w === S ? 0 : 4 - w % 4;
    return [w, L];
  }
  function a(_) {
    var S = o(_), w = S[0], L = S[1];
    return (w + L) * 3 / 4 - L;
  }
  function l(_, S, w) {
    return (S + w) * 3 / 4 - w;
  }
  function d(_) {
    var S, w = o(_), L = w[0], j = w[1], R = new r(l(_, L, j)), x = 0, T = j > 0 ? L - 4 : L, v;
    for (v = 0; v < T; v += 4)
      S = t[_.charCodeAt(v)] << 18 | t[_.charCodeAt(v + 1)] << 12 | t[_.charCodeAt(v + 2)] << 6 | t[_.charCodeAt(v + 3)], R[x++] = S >> 16 & 255, R[x++] = S >> 8 & 255, R[x++] = S & 255;
    return j === 2 && (S = t[_.charCodeAt(v)] << 2 | t[_.charCodeAt(v + 1)] >> 4, R[x++] = S & 255), j === 1 && (S = t[_.charCodeAt(v)] << 10 | t[_.charCodeAt(v + 1)] << 4 | t[_.charCodeAt(v + 2)] >> 2, R[x++] = S >> 8 & 255, R[x++] = S & 255), R;
  }
  function p(_) {
    return e[_ >> 18 & 63] + e[_ >> 12 & 63] + e[_ >> 6 & 63] + e[_ & 63];
  }
  function c(_, S, w) {
    for (var L, j = [], R = S; R < w; R += 3)
      L = (_[R] << 16 & 16711680) + (_[R + 1] << 8 & 65280) + (_[R + 2] & 255), j.push(p(L));
    return j.join("");
  }
  function g(_) {
    for (var S, w = _.length, L = w % 3, j = [], R = 16383, x = 0, T = w - L; x < T; x += R)
      j.push(c(_, x, x + R > T ? T : x + R));
    return L === 1 ? (S = _[w - 1], j.push(
      e[S >> 2] + e[S << 4 & 63] + "=="
    )) : L === 2 && (S = (_[w - 2] << 8) + _[w - 1], j.push(
      e[S >> 10] + e[S >> 4 & 63] + e[S << 2 & 63] + "="
    )), j.join("");
  }
  return En;
}
var Hi = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
var yl;
function Hh() {
  return yl || (yl = 1, Hi.read = function(e, t, r, n, i) {
    var s, o, a = i * 8 - n - 1, l = (1 << a) - 1, d = l >> 1, p = -7, c = r ? i - 1 : 0, g = r ? -1 : 1, _ = e[t + c];
    for (c += g, s = _ & (1 << -p) - 1, _ >>= -p, p += a; p > 0; s = s * 256 + e[t + c], c += g, p -= 8)
      ;
    for (o = s & (1 << -p) - 1, s >>= -p, p += n; p > 0; o = o * 256 + e[t + c], c += g, p -= 8)
      ;
    if (s === 0)
      s = 1 - d;
    else {
      if (s === l)
        return o ? NaN : (_ ? -1 : 1) * (1 / 0);
      o = o + Math.pow(2, n), s = s - d;
    }
    return (_ ? -1 : 1) * o * Math.pow(2, s - n);
  }, Hi.write = function(e, t, r, n, i, s) {
    var o, a, l, d = s * 8 - i - 1, p = (1 << d) - 1, c = p >> 1, g = i === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, _ = n ? 0 : s - 1, S = n ? 1 : -1, w = t < 0 || t === 0 && 1 / t < 0 ? 1 : 0;
    for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (a = isNaN(t) ? 1 : 0, o = p) : (o = Math.floor(Math.log(t) / Math.LN2), t * (l = Math.pow(2, -o)) < 1 && (o--, l *= 2), o + c >= 1 ? t += g / l : t += g * Math.pow(2, 1 - c), t * l >= 2 && (o++, l /= 2), o + c >= p ? (a = 0, o = p) : o + c >= 1 ? (a = (t * l - 1) * Math.pow(2, i), o = o + c) : (a = t * Math.pow(2, c - 1) * Math.pow(2, i), o = 0)); i >= 8; e[r + _] = a & 255, _ += S, a /= 256, i -= 8)
      ;
    for (o = o << i | a, d += i; d > 0; e[r + _] = o & 255, _ += S, o /= 256, d -= 8)
      ;
    e[r + _ - S] |= w * 128;
  }), Hi;
}
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
var bl;
function qh() {
  return bl || (bl = 1, (function(e) {
    const t = Qh(), r = Hh(), n = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
    e.Buffer = a, e.SlowBuffer = R, e.INSPECT_MAX_BYTES = 50;
    const i = 2147483647;
    e.kMaxLength = i, a.TYPED_ARRAY_SUPPORT = s(), !a.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error(
      "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
    );
    function s() {
      try {
        const b = new Uint8Array(1), u = { foo: function() {
          return 42;
        } };
        return Object.setPrototypeOf(u, Uint8Array.prototype), Object.setPrototypeOf(b, u), b.foo() === 42;
      } catch {
        return !1;
      }
    }
    Object.defineProperty(a.prototype, "parent", {
      enumerable: !0,
      get: function() {
        if (a.isBuffer(this))
          return this.buffer;
      }
    }), Object.defineProperty(a.prototype, "offset", {
      enumerable: !0,
      get: function() {
        if (a.isBuffer(this))
          return this.byteOffset;
      }
    });
    function o(b) {
      if (b > i)
        throw new RangeError('The value "' + b + '" is invalid for option "size"');
      const u = new Uint8Array(b);
      return Object.setPrototypeOf(u, a.prototype), u;
    }
    function a(b, u, h) {
      if (typeof b == "number") {
        if (typeof u == "string")
          throw new TypeError(
            'The "string" argument must be of type string. Received type number'
          );
        return c(b);
      }
      return l(b, u, h);
    }
    a.poolSize = 8192;
    function l(b, u, h) {
      if (typeof b == "string")
        return g(b, u);
      if (ArrayBuffer.isView(b))
        return S(b);
      if (b == null)
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof b
        );
      if (H(b, ArrayBuffer) || b && H(b.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (H(b, SharedArrayBuffer) || b && H(b.buffer, SharedArrayBuffer)))
        return w(b, u, h);
      if (typeof b == "number")
        throw new TypeError(
          'The "value" argument must not be of type number. Received type number'
        );
      const N = b.valueOf && b.valueOf();
      if (N != null && N !== b)
        return a.from(N, u, h);
      const M = L(b);
      if (M) return M;
      if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof b[Symbol.toPrimitive] == "function")
        return a.from(b[Symbol.toPrimitive]("string"), u, h);
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof b
      );
    }
    a.from = function(b, u, h) {
      return l(b, u, h);
    }, Object.setPrototypeOf(a.prototype, Uint8Array.prototype), Object.setPrototypeOf(a, Uint8Array);
    function d(b) {
      if (typeof b != "number")
        throw new TypeError('"size" argument must be of type number');
      if (b < 0)
        throw new RangeError('The value "' + b + '" is invalid for option "size"');
    }
    function p(b, u, h) {
      return d(b), b <= 0 ? o(b) : u !== void 0 ? typeof h == "string" ? o(b).fill(u, h) : o(b).fill(u) : o(b);
    }
    a.alloc = function(b, u, h) {
      return p(b, u, h);
    };
    function c(b) {
      return d(b), o(b < 0 ? 0 : j(b) | 0);
    }
    a.allocUnsafe = function(b) {
      return c(b);
    }, a.allocUnsafeSlow = function(b) {
      return c(b);
    };
    function g(b, u) {
      if ((typeof u != "string" || u === "") && (u = "utf8"), !a.isEncoding(u))
        throw new TypeError("Unknown encoding: " + u);
      const h = x(b, u) | 0;
      let N = o(h);
      const M = N.write(b, u);
      return M !== h && (N = N.slice(0, M)), N;
    }
    function _(b) {
      const u = b.length < 0 ? 0 : j(b.length) | 0, h = o(u);
      for (let N = 0; N < u; N += 1)
        h[N] = b[N] & 255;
      return h;
    }
    function S(b) {
      if (H(b, Uint8Array)) {
        const u = new Uint8Array(b);
        return w(u.buffer, u.byteOffset, u.byteLength);
      }
      return _(b);
    }
    function w(b, u, h) {
      if (u < 0 || b.byteLength < u)
        throw new RangeError('"offset" is outside of buffer bounds');
      if (b.byteLength < u + (h || 0))
        throw new RangeError('"length" is outside of buffer bounds');
      let N;
      return u === void 0 && h === void 0 ? N = new Uint8Array(b) : h === void 0 ? N = new Uint8Array(b, u) : N = new Uint8Array(b, u, h), Object.setPrototypeOf(N, a.prototype), N;
    }
    function L(b) {
      if (a.isBuffer(b)) {
        const u = j(b.length) | 0, h = o(u);
        return h.length === 0 || b.copy(h, 0, 0, u), h;
      }
      if (b.length !== void 0)
        return typeof b.length != "number" || re(b.length) ? o(0) : _(b);
      if (b.type === "Buffer" && Array.isArray(b.data))
        return _(b.data);
    }
    function j(b) {
      if (b >= i)
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + i.toString(16) + " bytes");
      return b | 0;
    }
    function R(b) {
      return +b != b && (b = 0), a.alloc(+b);
    }
    a.isBuffer = function(u) {
      return u != null && u._isBuffer === !0 && u !== a.prototype;
    }, a.compare = function(u, h) {
      if (H(u, Uint8Array) && (u = a.from(u, u.offset, u.byteLength)), H(h, Uint8Array) && (h = a.from(h, h.offset, h.byteLength)), !a.isBuffer(u) || !a.isBuffer(h))
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
        );
      if (u === h) return 0;
      let N = u.length, M = h.length;
      for (let U = 0, Q = Math.min(N, M); U < Q; ++U)
        if (u[U] !== h[U]) {
          N = u[U], M = h[U];
          break;
        }
      return N < M ? -1 : M < N ? 1 : 0;
    }, a.isEncoding = function(u) {
      switch (String(u).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return !0;
        default:
          return !1;
      }
    }, a.concat = function(u, h) {
      if (!Array.isArray(u))
        throw new TypeError('"list" argument must be an Array of Buffers');
      if (u.length === 0)
        return a.alloc(0);
      let N;
      if (h === void 0)
        for (h = 0, N = 0; N < u.length; ++N)
          h += u[N].length;
      const M = a.allocUnsafe(h);
      let U = 0;
      for (N = 0; N < u.length; ++N) {
        let Q = u[N];
        if (H(Q, Uint8Array))
          U + Q.length > M.length ? (a.isBuffer(Q) || (Q = a.from(Q)), Q.copy(M, U)) : Uint8Array.prototype.set.call(
            M,
            Q,
            U
          );
        else if (a.isBuffer(Q))
          Q.copy(M, U);
        else
          throw new TypeError('"list" argument must be an Array of Buffers');
        U += Q.length;
      }
      return M;
    };
    function x(b, u) {
      if (a.isBuffer(b))
        return b.length;
      if (ArrayBuffer.isView(b) || H(b, ArrayBuffer))
        return b.byteLength;
      if (typeof b != "string")
        throw new TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof b
        );
      const h = b.length, N = arguments.length > 2 && arguments[2] === !0;
      if (!N && h === 0) return 0;
      let M = !1;
      for (; ; )
        switch (u) {
          case "ascii":
          case "latin1":
          case "binary":
            return h;
          case "utf8":
          case "utf-8":
            return k(b).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return h * 2;
          case "hex":
            return h >>> 1;
          case "base64":
            return V(b).length;
          default:
            if (M)
              return N ? -1 : k(b).length;
            u = ("" + u).toLowerCase(), M = !0;
        }
    }
    a.byteLength = x;
    function T(b, u, h) {
      let N = !1;
      if ((u === void 0 || u < 0) && (u = 0), u > this.length || ((h === void 0 || h > this.length) && (h = this.length), h <= 0) || (h >>>= 0, u >>>= 0, h <= u))
        return "";
      for (b || (b = "utf8"); ; )
        switch (b) {
          case "hex":
            return ge(this, u, h);
          case "utf8":
          case "utf-8":
            return Y(this, u, h);
          case "ascii":
            return te(this, u, h);
          case "latin1":
          case "binary":
            return ee(this, u, h);
          case "base64":
            return $(this, u, h);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return se(this, u, h);
          default:
            if (N) throw new TypeError("Unknown encoding: " + b);
            b = (b + "").toLowerCase(), N = !0;
        }
    }
    a.prototype._isBuffer = !0;
    function v(b, u, h) {
      const N = b[u];
      b[u] = b[h], b[h] = N;
    }
    a.prototype.swap16 = function() {
      const u = this.length;
      if (u % 2 !== 0)
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      for (let h = 0; h < u; h += 2)
        v(this, h, h + 1);
      return this;
    }, a.prototype.swap32 = function() {
      const u = this.length;
      if (u % 4 !== 0)
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      for (let h = 0; h < u; h += 4)
        v(this, h, h + 3), v(this, h + 1, h + 2);
      return this;
    }, a.prototype.swap64 = function() {
      const u = this.length;
      if (u % 8 !== 0)
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      for (let h = 0; h < u; h += 8)
        v(this, h, h + 7), v(this, h + 1, h + 6), v(this, h + 2, h + 5), v(this, h + 3, h + 4);
      return this;
    }, a.prototype.toString = function() {
      const u = this.length;
      return u === 0 ? "" : arguments.length === 0 ? Y(this, 0, u) : T.apply(this, arguments);
    }, a.prototype.toLocaleString = a.prototype.toString, a.prototype.equals = function(u) {
      if (!a.isBuffer(u)) throw new TypeError("Argument must be a Buffer");
      return this === u ? !0 : a.compare(this, u) === 0;
    }, a.prototype.inspect = function() {
      let u = "";
      const h = e.INSPECT_MAX_BYTES;
      return u = this.toString("hex", 0, h).replace(/(.{2})/g, "$1 ").trim(), this.length > h && (u += " ... "), "<Buffer " + u + ">";
    }, n && (a.prototype[n] = a.prototype.inspect), a.prototype.compare = function(u, h, N, M, U) {
      if (H(u, Uint8Array) && (u = a.from(u, u.offset, u.byteLength)), !a.isBuffer(u))
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof u
        );
      if (h === void 0 && (h = 0), N === void 0 && (N = u ? u.length : 0), M === void 0 && (M = 0), U === void 0 && (U = this.length), h < 0 || N > u.length || M < 0 || U > this.length)
        throw new RangeError("out of range index");
      if (M >= U && h >= N)
        return 0;
      if (M >= U)
        return -1;
      if (h >= N)
        return 1;
      if (h >>>= 0, N >>>= 0, M >>>= 0, U >>>= 0, this === u) return 0;
      let Q = U - M, le = N - h;
      const Ne = Math.min(Q, le), ue = this.slice(M, U), me = u.slice(h, N);
      for (let Se = 0; Se < Ne; ++Se)
        if (ue[Se] !== me[Se]) {
          Q = ue[Se], le = me[Se];
          break;
        }
      return Q < le ? -1 : le < Q ? 1 : 0;
    };
    function C(b, u, h, N, M) {
      if (b.length === 0) return -1;
      if (typeof h == "string" ? (N = h, h = 0) : h > 2147483647 ? h = 2147483647 : h < -2147483648 && (h = -2147483648), h = +h, re(h) && (h = M ? 0 : b.length - 1), h < 0 && (h = b.length + h), h >= b.length) {
        if (M) return -1;
        h = b.length - 1;
      } else if (h < 0)
        if (M) h = 0;
        else return -1;
      if (typeof u == "string" && (u = a.from(u, N)), a.isBuffer(u))
        return u.length === 0 ? -1 : D(b, u, h, N, M);
      if (typeof u == "number")
        return u = u & 255, typeof Uint8Array.prototype.indexOf == "function" ? M ? Uint8Array.prototype.indexOf.call(b, u, h) : Uint8Array.prototype.lastIndexOf.call(b, u, h) : D(b, [u], h, N, M);
      throw new TypeError("val must be string, number or Buffer");
    }
    function D(b, u, h, N, M) {
      let U = 1, Q = b.length, le = u.length;
      if (N !== void 0 && (N = String(N).toLowerCase(), N === "ucs2" || N === "ucs-2" || N === "utf16le" || N === "utf-16le")) {
        if (b.length < 2 || u.length < 2)
          return -1;
        U = 2, Q /= 2, le /= 2, h /= 2;
      }
      function Ne(me, Se) {
        return U === 1 ? me[Se] : me.readUInt16BE(Se * U);
      }
      let ue;
      if (M) {
        let me = -1;
        for (ue = h; ue < Q; ue++)
          if (Ne(b, ue) === Ne(u, me === -1 ? 0 : ue - me)) {
            if (me === -1 && (me = ue), ue - me + 1 === le) return me * U;
          } else
            me !== -1 && (ue -= ue - me), me = -1;
      } else
        for (h + le > Q && (h = Q - le), ue = h; ue >= 0; ue--) {
          let me = !0;
          for (let Se = 0; Se < le; Se++)
            if (Ne(b, ue + Se) !== Ne(u, Se)) {
              me = !1;
              break;
            }
          if (me) return ue;
        }
      return -1;
    }
    a.prototype.includes = function(u, h, N) {
      return this.indexOf(u, h, N) !== -1;
    }, a.prototype.indexOf = function(u, h, N) {
      return C(this, u, h, N, !0);
    }, a.prototype.lastIndexOf = function(u, h, N) {
      return C(this, u, h, N, !1);
    };
    function F(b, u, h, N) {
      h = Number(h) || 0;
      const M = b.length - h;
      N ? (N = Number(N), N > M && (N = M)) : N = M;
      const U = u.length;
      N > U / 2 && (N = U / 2);
      let Q;
      for (Q = 0; Q < N; ++Q) {
        const le = parseInt(u.substr(Q * 2, 2), 16);
        if (re(le)) return Q;
        b[h + Q] = le;
      }
      return Q;
    }
    function y(b, u, h, N) {
      return K(k(u, b.length - h), b, h, N);
    }
    function E(b, u, h, N) {
      return K(B(u), b, h, N);
    }
    function O(b, u, h, N) {
      return K(V(u), b, h, N);
    }
    function A(b, u, h, N) {
      return K(q(u, b.length - h), b, h, N);
    }
    a.prototype.write = function(u, h, N, M) {
      if (h === void 0)
        M = "utf8", N = this.length, h = 0;
      else if (N === void 0 && typeof h == "string")
        M = h, N = this.length, h = 0;
      else if (isFinite(h))
        h = h >>> 0, isFinite(N) ? (N = N >>> 0, M === void 0 && (M = "utf8")) : (M = N, N = void 0);
      else
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported"
        );
      const U = this.length - h;
      if ((N === void 0 || N > U) && (N = U), u.length > 0 && (N < 0 || h < 0) || h > this.length)
        throw new RangeError("Attempt to write outside buffer bounds");
      M || (M = "utf8");
      let Q = !1;
      for (; ; )
        switch (M) {
          case "hex":
            return F(this, u, h, N);
          case "utf8":
          case "utf-8":
            return y(this, u, h, N);
          case "ascii":
          case "latin1":
          case "binary":
            return E(this, u, h, N);
          case "base64":
            return O(this, u, h, N);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return A(this, u, h, N);
          default:
            if (Q) throw new TypeError("Unknown encoding: " + M);
            M = ("" + M).toLowerCase(), Q = !0;
        }
    }, a.prototype.toJSON = function() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    function $(b, u, h) {
      return u === 0 && h === b.length ? t.fromByteArray(b) : t.fromByteArray(b.slice(u, h));
    }
    function Y(b, u, h) {
      h = Math.min(b.length, h);
      const N = [];
      let M = u;
      for (; M < h; ) {
        const U = b[M];
        let Q = null, le = U > 239 ? 4 : U > 223 ? 3 : U > 191 ? 2 : 1;
        if (M + le <= h) {
          let Ne, ue, me, Se;
          switch (le) {
            case 1:
              U < 128 && (Q = U);
              break;
            case 2:
              Ne = b[M + 1], (Ne & 192) === 128 && (Se = (U & 31) << 6 | Ne & 63, Se > 127 && (Q = Se));
              break;
            case 3:
              Ne = b[M + 1], ue = b[M + 2], (Ne & 192) === 128 && (ue & 192) === 128 && (Se = (U & 15) << 12 | (Ne & 63) << 6 | ue & 63, Se > 2047 && (Se < 55296 || Se > 57343) && (Q = Se));
              break;
            case 4:
              Ne = b[M + 1], ue = b[M + 2], me = b[M + 3], (Ne & 192) === 128 && (ue & 192) === 128 && (me & 192) === 128 && (Se = (U & 15) << 18 | (Ne & 63) << 12 | (ue & 63) << 6 | me & 63, Se > 65535 && Se < 1114112 && (Q = Se));
          }
        }
        Q === null ? (Q = 65533, le = 1) : Q > 65535 && (Q -= 65536, N.push(Q >>> 10 & 1023 | 55296), Q = 56320 | Q & 1023), N.push(Q), M += le;
      }
      return W(N);
    }
    const X = 4096;
    function W(b) {
      const u = b.length;
      if (u <= X)
        return String.fromCharCode.apply(String, b);
      let h = "", N = 0;
      for (; N < u; )
        h += String.fromCharCode.apply(
          String,
          b.slice(N, N += X)
        );
      return h;
    }
    function te(b, u, h) {
      let N = "";
      h = Math.min(b.length, h);
      for (let M = u; M < h; ++M)
        N += String.fromCharCode(b[M] & 127);
      return N;
    }
    function ee(b, u, h) {
      let N = "";
      h = Math.min(b.length, h);
      for (let M = u; M < h; ++M)
        N += String.fromCharCode(b[M]);
      return N;
    }
    function ge(b, u, h) {
      const N = b.length;
      (!u || u < 0) && (u = 0), (!h || h < 0 || h > N) && (h = N);
      let M = "";
      for (let U = u; U < h; ++U)
        M += z[b[U]];
      return M;
    }
    function se(b, u, h) {
      const N = b.slice(u, h);
      let M = "";
      for (let U = 0; U < N.length - 1; U += 2)
        M += String.fromCharCode(N[U] + N[U + 1] * 256);
      return M;
    }
    a.prototype.slice = function(u, h) {
      const N = this.length;
      u = ~~u, h = h === void 0 ? N : ~~h, u < 0 ? (u += N, u < 0 && (u = 0)) : u > N && (u = N), h < 0 ? (h += N, h < 0 && (h = 0)) : h > N && (h = N), h < u && (h = u);
      const M = this.subarray(u, h);
      return Object.setPrototypeOf(M, a.prototype), M;
    };
    function ie(b, u, h) {
      if (b % 1 !== 0 || b < 0) throw new RangeError("offset is not uint");
      if (b + u > h) throw new RangeError("Trying to access beyond buffer length");
    }
    a.prototype.readUintLE = a.prototype.readUIntLE = function(u, h, N) {
      u = u >>> 0, h = h >>> 0, N || ie(u, h, this.length);
      let M = this[u], U = 1, Q = 0;
      for (; ++Q < h && (U *= 256); )
        M += this[u + Q] * U;
      return M;
    }, a.prototype.readUintBE = a.prototype.readUIntBE = function(u, h, N) {
      u = u >>> 0, h = h >>> 0, N || ie(u, h, this.length);
      let M = this[u + --h], U = 1;
      for (; h > 0 && (U *= 256); )
        M += this[u + --h] * U;
      return M;
    }, a.prototype.readUint8 = a.prototype.readUInt8 = function(u, h) {
      return u = u >>> 0, h || ie(u, 1, this.length), this[u];
    }, a.prototype.readUint16LE = a.prototype.readUInt16LE = function(u, h) {
      return u = u >>> 0, h || ie(u, 2, this.length), this[u] | this[u + 1] << 8;
    }, a.prototype.readUint16BE = a.prototype.readUInt16BE = function(u, h) {
      return u = u >>> 0, h || ie(u, 2, this.length), this[u] << 8 | this[u + 1];
    }, a.prototype.readUint32LE = a.prototype.readUInt32LE = function(u, h) {
      return u = u >>> 0, h || ie(u, 4, this.length), (this[u] | this[u + 1] << 8 | this[u + 2] << 16) + this[u + 3] * 16777216;
    }, a.prototype.readUint32BE = a.prototype.readUInt32BE = function(u, h) {
      return u = u >>> 0, h || ie(u, 4, this.length), this[u] * 16777216 + (this[u + 1] << 16 | this[u + 2] << 8 | this[u + 3]);
    }, a.prototype.readBigUInt64LE = J(function(u) {
      u = u >>> 0, f(u, "offset");
      const h = this[u], N = this[u + 7];
      (h === void 0 || N === void 0) && m(u, this.length - 8);
      const M = h + this[++u] * 2 ** 8 + this[++u] * 2 ** 16 + this[++u] * 2 ** 24, U = this[++u] + this[++u] * 2 ** 8 + this[++u] * 2 ** 16 + N * 2 ** 24;
      return BigInt(M) + (BigInt(U) << BigInt(32));
    }), a.prototype.readBigUInt64BE = J(function(u) {
      u = u >>> 0, f(u, "offset");
      const h = this[u], N = this[u + 7];
      (h === void 0 || N === void 0) && m(u, this.length - 8);
      const M = h * 2 ** 24 + this[++u] * 2 ** 16 + this[++u] * 2 ** 8 + this[++u], U = this[++u] * 2 ** 24 + this[++u] * 2 ** 16 + this[++u] * 2 ** 8 + N;
      return (BigInt(M) << BigInt(32)) + BigInt(U);
    }), a.prototype.readIntLE = function(u, h, N) {
      u = u >>> 0, h = h >>> 0, N || ie(u, h, this.length);
      let M = this[u], U = 1, Q = 0;
      for (; ++Q < h && (U *= 256); )
        M += this[u + Q] * U;
      return U *= 128, M >= U && (M -= Math.pow(2, 8 * h)), M;
    }, a.prototype.readIntBE = function(u, h, N) {
      u = u >>> 0, h = h >>> 0, N || ie(u, h, this.length);
      let M = h, U = 1, Q = this[u + --M];
      for (; M > 0 && (U *= 256); )
        Q += this[u + --M] * U;
      return U *= 128, Q >= U && (Q -= Math.pow(2, 8 * h)), Q;
    }, a.prototype.readInt8 = function(u, h) {
      return u = u >>> 0, h || ie(u, 1, this.length), this[u] & 128 ? (255 - this[u] + 1) * -1 : this[u];
    }, a.prototype.readInt16LE = function(u, h) {
      u = u >>> 0, h || ie(u, 2, this.length);
      const N = this[u] | this[u + 1] << 8;
      return N & 32768 ? N | 4294901760 : N;
    }, a.prototype.readInt16BE = function(u, h) {
      u = u >>> 0, h || ie(u, 2, this.length);
      const N = this[u + 1] | this[u] << 8;
      return N & 32768 ? N | 4294901760 : N;
    }, a.prototype.readInt32LE = function(u, h) {
      return u = u >>> 0, h || ie(u, 4, this.length), this[u] | this[u + 1] << 8 | this[u + 2] << 16 | this[u + 3] << 24;
    }, a.prototype.readInt32BE = function(u, h) {
      return u = u >>> 0, h || ie(u, 4, this.length), this[u] << 24 | this[u + 1] << 16 | this[u + 2] << 8 | this[u + 3];
    }, a.prototype.readBigInt64LE = J(function(u) {
      u = u >>> 0, f(u, "offset");
      const h = this[u], N = this[u + 7];
      (h === void 0 || N === void 0) && m(u, this.length - 8);
      const M = this[u + 4] + this[u + 5] * 2 ** 8 + this[u + 6] * 2 ** 16 + (N << 24);
      return (BigInt(M) << BigInt(32)) + BigInt(h + this[++u] * 2 ** 8 + this[++u] * 2 ** 16 + this[++u] * 2 ** 24);
    }), a.prototype.readBigInt64BE = J(function(u) {
      u = u >>> 0, f(u, "offset");
      const h = this[u], N = this[u + 7];
      (h === void 0 || N === void 0) && m(u, this.length - 8);
      const M = (h << 24) + // Overflow
      this[++u] * 2 ** 16 + this[++u] * 2 ** 8 + this[++u];
      return (BigInt(M) << BigInt(32)) + BigInt(this[++u] * 2 ** 24 + this[++u] * 2 ** 16 + this[++u] * 2 ** 8 + N);
    }), a.prototype.readFloatLE = function(u, h) {
      return u = u >>> 0, h || ie(u, 4, this.length), r.read(this, u, !0, 23, 4);
    }, a.prototype.readFloatBE = function(u, h) {
      return u = u >>> 0, h || ie(u, 4, this.length), r.read(this, u, !1, 23, 4);
    }, a.prototype.readDoubleLE = function(u, h) {
      return u = u >>> 0, h || ie(u, 8, this.length), r.read(this, u, !0, 52, 8);
    }, a.prototype.readDoubleBE = function(u, h) {
      return u = u >>> 0, h || ie(u, 8, this.length), r.read(this, u, !1, 52, 8);
    };
    function be(b, u, h, N, M, U) {
      if (!a.isBuffer(b)) throw new TypeError('"buffer" argument must be a Buffer instance');
      if (u > M || u < U) throw new RangeError('"value" argument is out of bounds');
      if (h + N > b.length) throw new RangeError("Index out of range");
    }
    a.prototype.writeUintLE = a.prototype.writeUIntLE = function(u, h, N, M) {
      if (u = +u, h = h >>> 0, N = N >>> 0, !M) {
        const le = Math.pow(2, 8 * N) - 1;
        be(this, u, h, N, le, 0);
      }
      let U = 1, Q = 0;
      for (this[h] = u & 255; ++Q < N && (U *= 256); )
        this[h + Q] = u / U & 255;
      return h + N;
    }, a.prototype.writeUintBE = a.prototype.writeUIntBE = function(u, h, N, M) {
      if (u = +u, h = h >>> 0, N = N >>> 0, !M) {
        const le = Math.pow(2, 8 * N) - 1;
        be(this, u, h, N, le, 0);
      }
      let U = N - 1, Q = 1;
      for (this[h + U] = u & 255; --U >= 0 && (Q *= 256); )
        this[h + U] = u / Q & 255;
      return h + N;
    }, a.prototype.writeUint8 = a.prototype.writeUInt8 = function(u, h, N) {
      return u = +u, h = h >>> 0, N || be(this, u, h, 1, 255, 0), this[h] = u & 255, h + 1;
    }, a.prototype.writeUint16LE = a.prototype.writeUInt16LE = function(u, h, N) {
      return u = +u, h = h >>> 0, N || be(this, u, h, 2, 65535, 0), this[h] = u & 255, this[h + 1] = u >>> 8, h + 2;
    }, a.prototype.writeUint16BE = a.prototype.writeUInt16BE = function(u, h, N) {
      return u = +u, h = h >>> 0, N || be(this, u, h, 2, 65535, 0), this[h] = u >>> 8, this[h + 1] = u & 255, h + 2;
    }, a.prototype.writeUint32LE = a.prototype.writeUInt32LE = function(u, h, N) {
      return u = +u, h = h >>> 0, N || be(this, u, h, 4, 4294967295, 0), this[h + 3] = u >>> 24, this[h + 2] = u >>> 16, this[h + 1] = u >>> 8, this[h] = u & 255, h + 4;
    }, a.prototype.writeUint32BE = a.prototype.writeUInt32BE = function(u, h, N) {
      return u = +u, h = h >>> 0, N || be(this, u, h, 4, 4294967295, 0), this[h] = u >>> 24, this[h + 1] = u >>> 16, this[h + 2] = u >>> 8, this[h + 3] = u & 255, h + 4;
    };
    function Bt(b, u, h, N, M) {
      G(u, N, M, b, h, 7);
      let U = Number(u & BigInt(4294967295));
      b[h++] = U, U = U >> 8, b[h++] = U, U = U >> 8, b[h++] = U, U = U >> 8, b[h++] = U;
      let Q = Number(u >> BigInt(32) & BigInt(4294967295));
      return b[h++] = Q, Q = Q >> 8, b[h++] = Q, Q = Q >> 8, b[h++] = Q, Q = Q >> 8, b[h++] = Q, h;
    }
    function ar(b, u, h, N, M) {
      G(u, N, M, b, h, 7);
      let U = Number(u & BigInt(4294967295));
      b[h + 7] = U, U = U >> 8, b[h + 6] = U, U = U >> 8, b[h + 5] = U, U = U >> 8, b[h + 4] = U;
      let Q = Number(u >> BigInt(32) & BigInt(4294967295));
      return b[h + 3] = Q, Q = Q >> 8, b[h + 2] = Q, Q = Q >> 8, b[h + 1] = Q, Q = Q >> 8, b[h] = Q, h + 8;
    }
    a.prototype.writeBigUInt64LE = J(function(u, h = 0) {
      return Bt(this, u, h, BigInt(0), BigInt("0xffffffffffffffff"));
    }), a.prototype.writeBigUInt64BE = J(function(u, h = 0) {
      return ar(this, u, h, BigInt(0), BigInt("0xffffffffffffffff"));
    }), a.prototype.writeIntLE = function(u, h, N, M) {
      if (u = +u, h = h >>> 0, !M) {
        const Ne = Math.pow(2, 8 * N - 1);
        be(this, u, h, N, Ne - 1, -Ne);
      }
      let U = 0, Q = 1, le = 0;
      for (this[h] = u & 255; ++U < N && (Q *= 256); )
        u < 0 && le === 0 && this[h + U - 1] !== 0 && (le = 1), this[h + U] = (u / Q >> 0) - le & 255;
      return h + N;
    }, a.prototype.writeIntBE = function(u, h, N, M) {
      if (u = +u, h = h >>> 0, !M) {
        const Ne = Math.pow(2, 8 * N - 1);
        be(this, u, h, N, Ne - 1, -Ne);
      }
      let U = N - 1, Q = 1, le = 0;
      for (this[h + U] = u & 255; --U >= 0 && (Q *= 256); )
        u < 0 && le === 0 && this[h + U + 1] !== 0 && (le = 1), this[h + U] = (u / Q >> 0) - le & 255;
      return h + N;
    }, a.prototype.writeInt8 = function(u, h, N) {
      return u = +u, h = h >>> 0, N || be(this, u, h, 1, 127, -128), u < 0 && (u = 255 + u + 1), this[h] = u & 255, h + 1;
    }, a.prototype.writeInt16LE = function(u, h, N) {
      return u = +u, h = h >>> 0, N || be(this, u, h, 2, 32767, -32768), this[h] = u & 255, this[h + 1] = u >>> 8, h + 2;
    }, a.prototype.writeInt16BE = function(u, h, N) {
      return u = +u, h = h >>> 0, N || be(this, u, h, 2, 32767, -32768), this[h] = u >>> 8, this[h + 1] = u & 255, h + 2;
    }, a.prototype.writeInt32LE = function(u, h, N) {
      return u = +u, h = h >>> 0, N || be(this, u, h, 4, 2147483647, -2147483648), this[h] = u & 255, this[h + 1] = u >>> 8, this[h + 2] = u >>> 16, this[h + 3] = u >>> 24, h + 4;
    }, a.prototype.writeInt32BE = function(u, h, N) {
      return u = +u, h = h >>> 0, N || be(this, u, h, 4, 2147483647, -2147483648), u < 0 && (u = 4294967295 + u + 1), this[h] = u >>> 24, this[h + 1] = u >>> 16, this[h + 2] = u >>> 8, this[h + 3] = u & 255, h + 4;
    }, a.prototype.writeBigInt64LE = J(function(u, h = 0) {
      return Bt(this, u, h, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    }), a.prototype.writeBigInt64BE = J(function(u, h = 0) {
      return ar(this, u, h, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    function Ut(b, u, h, N, M, U) {
      if (h + N > b.length) throw new RangeError("Index out of range");
      if (h < 0) throw new RangeError("Index out of range");
    }
    function Ie(b, u, h, N, M) {
      return u = +u, h = h >>> 0, M || Ut(b, u, h, 4), r.write(b, u, h, N, 23, 4), h + 4;
    }
    a.prototype.writeFloatLE = function(u, h, N) {
      return Ie(this, u, h, !0, N);
    }, a.prototype.writeFloatBE = function(u, h, N) {
      return Ie(this, u, h, !1, N);
    };
    function $e(b, u, h, N, M) {
      return u = +u, h = h >>> 0, M || Ut(b, u, h, 8), r.write(b, u, h, N, 52, 8), h + 8;
    }
    a.prototype.writeDoubleLE = function(u, h, N) {
      return $e(this, u, h, !0, N);
    }, a.prototype.writeDoubleBE = function(u, h, N) {
      return $e(this, u, h, !1, N);
    }, a.prototype.copy = function(u, h, N, M) {
      if (!a.isBuffer(u)) throw new TypeError("argument should be a Buffer");
      if (N || (N = 0), !M && M !== 0 && (M = this.length), h >= u.length && (h = u.length), h || (h = 0), M > 0 && M < N && (M = N), M === N || u.length === 0 || this.length === 0) return 0;
      if (h < 0)
        throw new RangeError("targetStart out of bounds");
      if (N < 0 || N >= this.length) throw new RangeError("Index out of range");
      if (M < 0) throw new RangeError("sourceEnd out of bounds");
      M > this.length && (M = this.length), u.length - h < M - N && (M = u.length - h + N);
      const U = M - N;
      return this === u && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(h, N, M) : Uint8Array.prototype.set.call(
        u,
        this.subarray(N, M),
        h
      ), U;
    }, a.prototype.fill = function(u, h, N, M) {
      if (typeof u == "string") {
        if (typeof h == "string" ? (M = h, h = 0, N = this.length) : typeof N == "string" && (M = N, N = this.length), M !== void 0 && typeof M != "string")
          throw new TypeError("encoding must be a string");
        if (typeof M == "string" && !a.isEncoding(M))
          throw new TypeError("Unknown encoding: " + M);
        if (u.length === 1) {
          const Q = u.charCodeAt(0);
          (M === "utf8" && Q < 128 || M === "latin1") && (u = Q);
        }
      } else typeof u == "number" ? u = u & 255 : typeof u == "boolean" && (u = Number(u));
      if (h < 0 || this.length < h || this.length < N)
        throw new RangeError("Out of range index");
      if (N <= h)
        return this;
      h = h >>> 0, N = N === void 0 ? this.length : N >>> 0, u || (u = 0);
      let U;
      if (typeof u == "number")
        for (U = h; U < N; ++U)
          this[U] = u;
      else {
        const Q = a.isBuffer(u) ? u : a.from(u, M), le = Q.length;
        if (le === 0)
          throw new TypeError('The value "' + u + '" is invalid for argument "value"');
        for (U = 0; U < N - h; ++U)
          this[U + h] = Q[U % le];
      }
      return this;
    };
    const Le = {};
    function mt(b, u, h) {
      Le[b] = class extends h {
        constructor() {
          super(), Object.defineProperty(this, "message", {
            value: u.apply(this, arguments),
            writable: !0,
            configurable: !0
          }), this.name = `${this.name} [${b}]`, this.stack, delete this.name;
        }
        get code() {
          return b;
        }
        set code(M) {
          Object.defineProperty(this, "code", {
            configurable: !0,
            enumerable: !0,
            value: M,
            writable: !0
          });
        }
        toString() {
          return `${this.name} [${b}]: ${this.message}`;
        }
      };
    }
    mt(
      "ERR_BUFFER_OUT_OF_BOUNDS",
      function(b) {
        return b ? `${b} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
      },
      RangeError
    ), mt(
      "ERR_INVALID_ARG_TYPE",
      function(b, u) {
        return `The "${b}" argument must be of type number. Received type ${typeof u}`;
      },
      TypeError
    ), mt(
      "ERR_OUT_OF_RANGE",
      function(b, u, h) {
        let N = `The value of "${b}" is out of range.`, M = h;
        return Number.isInteger(h) && Math.abs(h) > 2 ** 32 ? M = We(String(h)) : typeof h == "bigint" && (M = String(h), (h > BigInt(2) ** BigInt(32) || h < -(BigInt(2) ** BigInt(32))) && (M = We(M)), M += "n"), N += ` It must be ${u}. Received ${M}`, N;
      },
      RangeError
    );
    function We(b) {
      let u = "", h = b.length;
      const N = b[0] === "-" ? 1 : 0;
      for (; h >= N + 4; h -= 3)
        u = `_${b.slice(h - 3, h)}${u}`;
      return `${b.slice(0, h)}${u}`;
    }
    function St(b, u, h) {
      f(u, "offset"), (b[u] === void 0 || b[u + h] === void 0) && m(u, b.length - (h + 1));
    }
    function G(b, u, h, N, M, U) {
      if (b > h || b < u) {
        const Q = typeof u == "bigint" ? "n" : "";
        let le;
        throw u === 0 || u === BigInt(0) ? le = `>= 0${Q} and < 2${Q} ** ${(U + 1) * 8}${Q}` : le = `>= -(2${Q} ** ${(U + 1) * 8 - 1}${Q}) and < 2 ** ${(U + 1) * 8 - 1}${Q}`, new Le.ERR_OUT_OF_RANGE("value", le, b);
      }
      St(N, M, U);
    }
    function f(b, u) {
      if (typeof b != "number")
        throw new Le.ERR_INVALID_ARG_TYPE(u, "number", b);
    }
    function m(b, u, h) {
      throw Math.floor(b) !== b ? (f(b, h), new Le.ERR_OUT_OF_RANGE("offset", "an integer", b)) : u < 0 ? new Le.ERR_BUFFER_OUT_OF_BOUNDS() : new Le.ERR_OUT_OF_RANGE(
        "offset",
        `>= 0 and <= ${u}`,
        b
      );
    }
    const I = /[^+/0-9A-Za-z-_]/g;
    function P(b) {
      if (b = b.split("=")[0], b = b.trim().replace(I, ""), b.length < 2) return "";
      for (; b.length % 4 !== 0; )
        b = b + "=";
      return b;
    }
    function k(b, u) {
      u = u || 1 / 0;
      let h;
      const N = b.length;
      let M = null;
      const U = [];
      for (let Q = 0; Q < N; ++Q) {
        if (h = b.charCodeAt(Q), h > 55295 && h < 57344) {
          if (!M) {
            if (h > 56319) {
              (u -= 3) > -1 && U.push(239, 191, 189);
              continue;
            } else if (Q + 1 === N) {
              (u -= 3) > -1 && U.push(239, 191, 189);
              continue;
            }
            M = h;
            continue;
          }
          if (h < 56320) {
            (u -= 3) > -1 && U.push(239, 191, 189), M = h;
            continue;
          }
          h = (M - 55296 << 10 | h - 56320) + 65536;
        } else M && (u -= 3) > -1 && U.push(239, 191, 189);
        if (M = null, h < 128) {
          if ((u -= 1) < 0) break;
          U.push(h);
        } else if (h < 2048) {
          if ((u -= 2) < 0) break;
          U.push(
            h >> 6 | 192,
            h & 63 | 128
          );
        } else if (h < 65536) {
          if ((u -= 3) < 0) break;
          U.push(
            h >> 12 | 224,
            h >> 6 & 63 | 128,
            h & 63 | 128
          );
        } else if (h < 1114112) {
          if ((u -= 4) < 0) break;
          U.push(
            h >> 18 | 240,
            h >> 12 & 63 | 128,
            h >> 6 & 63 | 128,
            h & 63 | 128
          );
        } else
          throw new Error("Invalid code point");
      }
      return U;
    }
    function B(b) {
      const u = [];
      for (let h = 0; h < b.length; ++h)
        u.push(b.charCodeAt(h) & 255);
      return u;
    }
    function q(b, u) {
      let h, N, M;
      const U = [];
      for (let Q = 0; Q < b.length && !((u -= 2) < 0); ++Q)
        h = b.charCodeAt(Q), N = h >> 8, M = h % 256, U.push(M), U.push(N);
      return U;
    }
    function V(b) {
      return t.toByteArray(P(b));
    }
    function K(b, u, h, N) {
      let M;
      for (M = 0; M < N && !(M + h >= u.length || M >= b.length); ++M)
        u[M + h] = b[M];
      return M;
    }
    function H(b, u) {
      return b instanceof u || b != null && b.constructor != null && b.constructor.name != null && b.constructor.name === u.name;
    }
    function re(b) {
      return b !== b;
    }
    const z = (function() {
      const b = "0123456789abcdef", u = new Array(256);
      for (let h = 0; h < 16; ++h) {
        const N = h * 16;
        for (let M = 0; M < 16; ++M)
          u[N + M] = b[h] + b[M];
      }
      return u;
    })();
    function J(b) {
      return typeof BigInt > "u" ? ne : b;
    }
    function ne() {
      throw new Error("BigInt not supported");
    }
  })(ho)), ho;
}
var Kh = qh();
const In = "http://www.w3.org/1999/02/22-rdf-syntax-ns#", wn = "http://www.w3.org/2001/XMLSchema#", qi = "http://www.w3.org/2000/10/swap/", Et = {
  xsd: {
    decimal: `${wn}decimal`,
    boolean: `${wn}boolean`,
    double: `${wn}double`,
    integer: `${wn}integer`,
    string: `${wn}string`
  },
  rdf: {
    type: `${In}type`,
    nil: `${In}nil`,
    first: `${In}first`,
    rest: `${In}rest`,
    langString: `${In}langString`
  },
  owl: {
    sameAs: "http://www.w3.org/2002/07/owl#sameAs"
  },
  r: {
    forSome: `${qi}reify#forSome`,
    forAll: `${qi}reify#forAll`
  },
  log: {
    implies: `${qi}log#implies`,
    isImpliedBy: `${qi}log#isImpliedBy`
  }
}, { xsd: Ki } = Et, Wh = /\\u([a-fA-F0-9]{4})|\\U([a-fA-F0-9]{8})|\\([^])/g, Tl = {
  "\\": "\\",
  "'": "'",
  '"': '"',
  n: `
`,
  r: "\r",
  t: "	",
  f: "\f",
  b: "\b",
  _: "_",
  "~": "~",
  ".": ".",
  "-": "-",
  "!": "!",
  $: "$",
  "&": "&",
  "(": "(",
  ")": ")",
  "*": "*",
  "+": "+",
  ",": ",",
  ";": ";",
  "=": "=",
  "/": "/",
  "?": "?",
  "#": "#",
  "@": "@",
  "%": "%"
}, Gh = /[\x00-\x20<>\\"\{\}\|\^\`]/, zh = {
  _iri: !0,
  _unescapedIri: !0,
  _simpleQuotedString: !0,
  _langcode: !0,
  _blank: !0,
  _newline: !0,
  _comment: !0,
  _whitespace: !0,
  _endOfFile: !0
}, Yh = /$0^/;
class Xh {
  constructor(t) {
    if (this._iri = /^<((?:[^ <>{}\\]|\\[uU])+)>[ \t]*/, this._unescapedIri = /^<([^\x00-\x20<>\\"\{\}\|\^\`]*)>[ \t]*/, this._simpleQuotedString = /^"([^"\\\r\n]*)"(?=[^"])/, this._simpleApostropheString = /^'([^'\\\r\n]*)'(?=[^'])/, this._langcode = /^@([a-z]+(?:-[a-z0-9]+)*)(?=[^a-z0-9\-])/i, this._prefix = /^((?:[A-Za-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:\.?[\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)?:(?=[#\s<])/, this._prefixed = /^((?:[A-Za-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:\.?[\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)?:((?:(?:[0-:A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~])(?:(?:[\.\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~])*(?:[\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~]))?)?)(?:[ \t]+|(?=\.?[,;!\^\s#()\[\]\{\}"'<>]))/, this._variable = /^\?(?:(?:[A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:[\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)(?=[.,;!\^\s#()\[\]\{\}"'<>])/, this._blank = /^_:((?:[0-9A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:\.?[\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)(?:[ \t]+|(?=\.?[,;:\s#()\[\]\{\}"'<>]))/, this._number = /^[\-+]?(?:(\d+\.\d*|\.?\d+)[eE][\-+]?|\d*(\.)?)\d+(?=\.?[,;:\s#()\[\]\{\}"'<>])/, this._boolean = /^(?:true|false)(?=[.,;\s#()\[\]\{\}"'<>])/, this._keyword = /^@[a-z]+(?=[\s#<:])/i, this._sparqlKeyword = /^(?:PREFIX|BASE|GRAPH)(?=[\s#<])/i, this._shortPredicates = /^a(?=[\s#()\[\]\{\}"'<>])/, this._newline = /^[ \t]*(?:#[^\n\r]*)?(?:\r\n|\n|\r)[ \t]*/, this._comment = /#([^\n\r]*)/, this._whitespace = /^[ \t]+/, this._endOfFile = /^(?:#[^\n\r]*)?$/, t = t || {}, this._isImpliedBy = t.isImpliedBy, this._lineMode = !!t.lineMode) {
      this._n3Mode = !1;
      for (const r in this)
        !(r in zh) && this[r] instanceof RegExp && (this[r] = Yh);
    } else
      this._n3Mode = t.n3 !== !1;
    this.comments = !!t.comments, this._literalClosingPos = 0;
  }
  // ## Private methods
  // ### `_tokenizeToEnd` tokenizes as for as possible, emitting tokens through the callback
  _tokenizeToEnd(t, r) {
    let n = this._input, i = n.length;
    for (; ; ) {
      let a, l;
      for (; a = this._newline.exec(n); )
        this.comments && (l = this._comment.exec(a[0])) && s("comment", l[1], "", this._line, a[0].length), n = n.substr(a[0].length, n.length), i = n.length, this._line++;
      if (!a && (a = this._whitespace.exec(n)) && (n = n.substr(a[0].length, n.length)), this._endOfFile.test(n))
        return r && (this.comments && (l = this._comment.exec(n)) && s("comment", l[1], "", this._line, n.length), n = null, s("eof", "", "", this._line, 0)), this._input = n;
      const d = this._line, p = n[0];
      let c = "", g = "", _ = "", S = null, w = 0, L = !1;
      switch (p) {
        case "^":
          if (n.length < 3)
            break;
          if (n[1] === "^") {
            if (this._previousMarker = "^^", n = n.substr(2), n[0] !== "<") {
              L = !0;
              break;
            }
          } else {
            this._n3Mode && (w = 1, c = "^");
            break;
          }
        // Fall through in case the type is an IRI
        case "<":
          if (S = this._unescapedIri.exec(n))
            c = "IRI", g = S[1];
          else if (S = this._iri.exec(n)) {
            if (g = this._unescape(S[1]), g === null || Gh.test(g))
              return o(this);
            c = "IRI";
          } else n.length > 1 && n[1] === "<" ? (c = "<<", w = 2) : this._n3Mode && n.length > 1 && n[1] === "=" && (w = 2, this._isImpliedBy ? (c = "abbreviation", g = "<") : (c = "inverse", g = ">"));
          break;
        case ">":
          n.length > 1 && n[1] === ">" && (c = ">>", w = 2);
          break;
        case "_":
          ((S = this._blank.exec(n)) || r && (S = this._blank.exec(`${n} `))) && (c = "blank", _ = "_", g = S[1]);
          break;
        case '"':
          if (S = this._simpleQuotedString.exec(n))
            g = S[1];
          else if ({ value: g, matchLength: w } = this._parseLiteral(n), g === null)
            return o(this);
          (S !== null || w !== 0) && (c = "literal", this._literalClosingPos = 0);
          break;
        case "'":
          if (!this._lineMode) {
            if (S = this._simpleApostropheString.exec(n))
              g = S[1];
            else if ({ value: g, matchLength: w } = this._parseLiteral(n), g === null)
              return o(this);
            (S !== null || w !== 0) && (c = "literal", this._literalClosingPos = 0);
          }
          break;
        case "?":
          this._n3Mode && (S = this._variable.exec(n)) && (c = "var", g = S[0]);
          break;
        case "@":
          this._previousMarker === "literal" && (S = this._langcode.exec(n)) ? (c = "langcode", g = S[1]) : (S = this._keyword.exec(n)) && (c = S[0]);
          break;
        case ".":
          if (n.length === 1 ? r : n[1] < "0" || n[1] > "9") {
            c = ".", w = 1;
            break;
          }
        // Fall through to numerical case (could be a decimal dot)
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "+":
        case "-":
          (S = this._number.exec(n) || r && (S = this._number.exec(`${n} `))) && (c = "literal", g = S[0], _ = typeof S[1] == "string" ? Ki.double : typeof S[2] == "string" ? Ki.decimal : Ki.integer);
          break;
        case "B":
        case "b":
        case "p":
        case "P":
        case "G":
        case "g":
          (S = this._sparqlKeyword.exec(n)) ? c = S[0].toUpperCase() : L = !0;
          break;
        case "f":
        case "t":
          (S = this._boolean.exec(n)) ? (c = "literal", g = S[0], _ = Ki.boolean) : L = !0;
          break;
        case "a":
          (S = this._shortPredicates.exec(n)) ? (c = "abbreviation", g = "a") : L = !0;
          break;
        case "=":
          this._n3Mode && n.length > 1 && (c = "abbreviation", n[1] !== ">" ? (w = 1, g = "=") : (w = 2, g = ">"));
          break;
        case "!":
          if (!this._n3Mode)
            break;
        case ",":
        case ";":
        case "[":
        case "]":
        case "(":
        case ")":
        case "}":
          this._lineMode || (w = 1, c = p);
          break;
        case "{":
          !this._lineMode && n.length >= 2 && (n[1] === "|" ? (c = "{|", w = 2) : (c = p, w = 1));
          break;
        case "|":
          n.length >= 2 && n[1] === "}" && (c = "|}", w = 2);
          break;
        default:
          L = !0;
      }
      if (L && ((this._previousMarker === "@prefix" || this._previousMarker === "PREFIX") && (S = this._prefix.exec(n)) ? (c = "prefix", g = S[1] || "") : ((S = this._prefixed.exec(n)) || r && (S = this._prefixed.exec(`${n} `))) && (c = "prefixed", _ = S[1] || "", g = this._unescape(S[2]))), this._previousMarker === "^^")
        switch (c) {
          case "prefixed":
            c = "type";
            break;
          case "IRI":
            c = "typeIRI";
            break;
          default:
            c = "";
        }
      if (!c)
        return r || !/^'''|^"""/.test(n) && /\n|\r/.test(n) ? o(this) : this._input = n;
      const j = w || S[0].length, R = s(c, g, _, d, j);
      this.previousToken = R, this._previousMarker = c, n = n.substr(j, n.length);
    }
    function s(a, l, d, p, c) {
      const g = n ? i - n.length : i, _ = g + c, S = { type: a, value: l, prefix: d, line: p, start: g, end: _ };
      return t(null, S), S;
    }
    function o(a) {
      t(a._syntaxError(/^\S*/.exec(n)[0]));
    }
  }
  // ### `_unescape` replaces N3 escape codes by their corresponding characters
  _unescape(t) {
    let r = !1;
    const n = t.replace(Wh, (i, s, o, a) => {
      if (typeof s == "string")
        return String.fromCharCode(Number.parseInt(s, 16));
      if (typeof o == "string") {
        let l = Number.parseInt(o, 16);
        return l <= 65535 ? String.fromCharCode(Number.parseInt(o, 16)) : String.fromCharCode(55296 + ((l -= 65536) >> 10), 56320 + (l & 1023));
      }
      return a in Tl ? Tl[a] : (r = !0, "");
    });
    return r ? null : n;
  }
  // ### `_parseLiteral` parses a literal into an unescaped value
  _parseLiteral(t) {
    if (t.length >= 3) {
      const r = t.match(/^(?:"""|"|'''|'|)/)[0], n = r.length;
      let i = Math.max(this._literalClosingPos, n);
      for (; (i = t.indexOf(r, i)) > 0; ) {
        let s = 0;
        for (; t[i - s - 1] === "\\"; )
          s++;
        if (s % 2 === 0) {
          const o = t.substring(n, i), a = o.split(/\r\n|\r|\n/).length - 1, l = i + n;
          if (n === 1 && a !== 0 || n === 3 && this._lineMode)
            break;
          return this._line += a, { value: this._unescape(o), matchLength: l };
        }
        i++;
      }
      this._literalClosingPos = t.length - n + 1;
    }
    return { value: "", matchLength: 0 };
  }
  // ### `_syntaxError` creates a syntax error for the given issue
  _syntaxError(t) {
    this._input = null;
    const r = new Error(`Unexpected "${t}" on line ${this._line}.`);
    return r.context = {
      token: void 0,
      line: this._line,
      previousToken: this.previousToken
    }, r;
  }
  // ### Strips off any starting UTF BOM mark.
  _readStartingBom(t) {
    return t.startsWith("\uFEFF") ? t.substr(1) : t;
  }
  // ## Public methods
  // ### `tokenize` starts the transformation of an N3 document into an array of tokens.
  // The input can be a string or a stream.
  tokenize(t, r) {
    if (this._line = 1, typeof t == "string")
      if (this._input = this._readStartingBom(t), typeof r == "function")
        queueMicrotask(() => this._tokenizeToEnd(r, !0));
      else {
        const n = [];
        let i;
        if (this._tokenizeToEnd((s, o) => s ? i = s : n.push(o), !0), i) throw i;
        return n;
      }
    else
      this._pendingBuffer = null, typeof t.setEncoding == "function" && t.setEncoding("utf8"), t.on("data", (n) => {
        this._input !== null && n.length !== 0 && (this._pendingBuffer && (n = Kh.Buffer.concat([this._pendingBuffer, n]), this._pendingBuffer = null), n[n.length - 1] & 128 ? this._pendingBuffer = n : (typeof this._input > "u" ? this._input = this._readStartingBom(typeof n == "string" ? n : n.toString()) : this._input += n, this._tokenizeToEnd(r, !1)));
      }), t.on("end", () => {
        typeof this._input == "string" && this._tokenizeToEnd(r, !0);
      }), t.on("error", r);
  }
}
const { rdf: Jh, xsd: Gr } = Et;
let Di, Zh = 0;
const ep = {
  namedNode: yu,
  blankNode: bu,
  variable: Su,
  literal: Tu,
  defaultGraph: ip,
  quad: Fo,
  triple: Fo,
  fromTerm: ti,
  fromQuad: vu
};
class sr {
  constructor(t) {
    this.id = t;
  }
  // ### The value of this term
  get value() {
    return this.id;
  }
  // ### Returns whether this object represents the same term as the other
  equals(t) {
    return t instanceof sr ? this.id === t.id : !!t && this.termType === t.termType && this.value === t.value;
  }
  // ### Implement hashCode for Immutable.js, since we implement `equals`
  // https://immutable-js.com/docs/v4.0.0/ValueObject/#hashCode()
  hashCode() {
    return 0;
  }
  // ### Returns a plain object representation of this term
  toJSON() {
    return {
      termType: this.termType,
      value: this.value
    };
  }
}
let mu = class extends sr {
  // ### The term type of this term
  get termType() {
    return "NamedNode";
  }
}, po = class gu extends sr {
  // ### The term type of this term
  get termType() {
    return "Literal";
  }
  // ### The text value of this literal
  get value() {
    return this.id.substring(1, this.id.lastIndexOf('"'));
  }
  // ### The language of this literal
  get language() {
    const t = this.id;
    let r = t.lastIndexOf('"') + 1;
    return r < t.length && t[r++] === "@" ? t.substr(r).toLowerCase() : "";
  }
  // ### The datatype IRI of this literal
  get datatype() {
    return new mu(this.datatypeString);
  }
  // ### The datatype string of this literal
  get datatypeString() {
    const t = this.id, r = t.lastIndexOf('"') + 1, n = r < t.length ? t[r] : "";
    return n === "^" ? t.substr(r + 2) : (
      // If "@" follows, return rdf:langString; xsd:string otherwise
      n !== "@" ? Gr.string : Jh.langString
    );
  }
  // ### Returns whether this object represents the same term as the other
  equals(t) {
    return t instanceof gu ? this.id === t.id : !!t && !!t.datatype && this.termType === t.termType && this.value === t.value && this.language === t.language && this.datatype.value === t.datatype.value;
  }
  toJSON() {
    return {
      termType: this.termType,
      value: this.value,
      language: this.language,
      datatype: { termType: "NamedNode", value: this.datatypeString }
    };
  }
}, tp = class extends sr {
  constructor(t) {
    super(`_:${t}`);
  }
  // ### The term type of this term
  get termType() {
    return "BlankNode";
  }
  // ### The name of this blank node
  get value() {
    return this.id.substr(2);
  }
}, rp = class extends sr {
  constructor(t) {
    super(`?${t}`);
  }
  // ### The term type of this term
  get termType() {
    return "Variable";
  }
  // ### The name of this variable
  get value() {
    return this.id.substr(1);
  }
}, np = class extends sr {
  constructor() {
    return super(""), Di || this;
  }
  // ### The term type of this term
  get termType() {
    return "DefaultGraph";
  }
  // ### Returns whether this object represents the same term as the other
  equals(t) {
    return this === t || !!t && this.termType === t.termType;
  }
};
Di = new np();
let _u = class extends sr {
  constructor(t, r, n, i) {
    super(""), this._subject = t, this._predicate = r, this._object = n, this._graph = i || Di;
  }
  // ### The term type of this term
  get termType() {
    return "Quad";
  }
  get subject() {
    return this._subject;
  }
  get predicate() {
    return this._predicate;
  }
  get object() {
    return this._object;
  }
  get graph() {
    return this._graph;
  }
  // ### Returns a plain object representation of this quad
  toJSON() {
    return {
      termType: this.termType,
      subject: this._subject.toJSON(),
      predicate: this._predicate.toJSON(),
      object: this._object.toJSON(),
      graph: this._graph.toJSON()
    };
  }
  // ### Returns whether this object represents the same quad as the other
  equals(t) {
    return !!t && this._subject.equals(t.subject) && this._predicate.equals(t.predicate) && this._object.equals(t.object) && this._graph.equals(t.graph);
  }
};
function yu(e) {
  return new mu(e);
}
function bu(e) {
  return new tp(e || `n3-${Zh++}`);
}
function Tu(e, t) {
  if (typeof t == "string")
    return new po(`"${e}"@${t.toLowerCase()}`);
  let r = t ? t.value : "";
  return r === "" && (typeof e == "boolean" ? r = Gr.boolean : typeof e == "number" && (Number.isFinite(e) ? r = Number.isInteger(e) ? Gr.integer : Gr.double : (r = Gr.double, Number.isNaN(e) || (e = e > 0 ? "INF" : "-INF")))), r === "" || r === Gr.string ? new po(`"${e}"`) : new po(`"${e}"^^${r}`);
}
function Su(e) {
  return new rp(e);
}
function ip() {
  return Di;
}
function Fo(e, t, r, n) {
  return new _u(e, t, r, n);
}
function ti(e) {
  if (e instanceof sr)
    return e;
  switch (e.termType) {
    case "NamedNode":
      return yu(e.value);
    case "BlankNode":
      return bu(e.value);
    case "Variable":
      return Su(e.value);
    case "DefaultGraph":
      return Di;
    case "Literal":
      return Tu(e.value, e.language || e.datatype);
    case "Quad":
      return vu(e);
    default:
      throw new Error(`Unexpected termType: ${e.termType}`);
  }
}
function vu(e) {
  if (e instanceof _u)
    return e;
  if (e.termType !== "Quad")
    throw new Error(`Unexpected termType: ${e.termType}`);
  return Fo(ti(e.subject), ti(e.predicate), ti(e.object), ti(e.graph));
}
let Sl = 0;
class Eu {
  constructor(t) {
    this._contextStack = [], this._graph = null, t = t || {}, this._setBase(t.baseIRI), t.factory && Iu(this, t.factory);
    const r = typeof t.format == "string" ? t.format.match(/\w*$/)[0].toLowerCase() : "", n = /turtle/.test(r), i = /trig/.test(r), s = /triple/.test(r), o = /quad/.test(r), a = this._n3Mode = /n3/.test(r), l = s || o;
    (this._supportsNamedGraphs = !(n || a)) || (this._readPredicateOrNamedGraph = this._readPredicate), this._supportsQuads = !(n || i || s || a), this._isImpliedBy = t.isImpliedBy, this._supportsRDFStar = r === "" || /star|\*$/.test(r), l && (this._resolveRelativeIRI = (d) => null), this._blankNodePrefix = typeof t.blankNodePrefix != "string" ? "" : t.blankNodePrefix.replace(/^(?!_:)/, "_:"), this._lexer = t.lexer || new Xh({ lineMode: l, n3: a, isImpliedBy: this._isImpliedBy }), this._explicitQuantifiers = !!t.explicitQuantifiers;
  }
  // ## Static class methods
  // ### `_resetBlankNodePrefix` restarts blank node prefix identification
  static _resetBlankNodePrefix() {
    Sl = 0;
  }
  // ## Private methods
  // ### `_setBase` sets the base IRI to resolve relative IRIs
  _setBase(t) {
    if (!t)
      this._base = "", this._basePath = "";
    else {
      const r = t.indexOf("#");
      r >= 0 && (t = t.substr(0, r)), this._base = t, this._basePath = t.indexOf("/") < 0 ? t : t.replace(/[^\/?]*(?:\?.*)?$/, ""), t = t.match(/^(?:([a-z][a-z0-9+.-]*:))?(?:\/\/[^\/]*)?/i), this._baseRoot = t[0], this._baseScheme = t[1];
    }
  }
  // ### `_saveContext` stores the current parsing context
  // when entering a new scope (list, blank node, formula)
  _saveContext(t, r, n, i, s) {
    const o = this._n3Mode;
    this._contextStack.push({
      type: t,
      subject: n,
      predicate: i,
      object: s,
      graph: r,
      inverse: o ? this._inversePredicate : !1,
      blankPrefix: o ? this._prefixes._ : "",
      quantified: o ? this._quantified : null
    }), o && (this._inversePredicate = !1, this._prefixes._ = this._graph ? `${this._graph.value}.` : ".", this._quantified = Object.create(this._quantified));
  }
  // ### `_restoreContext` restores the parent context
  // when leaving a scope (list, blank node, formula)
  _restoreContext(t, r) {
    const n = this._contextStack.pop();
    if (!n || n.type !== t)
      return this._error(`Unexpected ${r.type}`, r);
    this._subject = n.subject, this._predicate = n.predicate, this._object = n.object, this._graph = n.graph, this._n3Mode && (this._inversePredicate = n.inverse, this._prefixes._ = n.blankPrefix, this._quantified = n.quantified);
  }
  // ### `_readInTopContext` reads a token when in the top context
  _readInTopContext(t) {
    switch (t.type) {
      // If an EOF token arrives in the top context, signal that we're done
      case "eof":
        return this._graph !== null ? this._error("Unclosed graph", t) : (delete this._prefixes._, this._callback(null, null, this._prefixes));
      // It could be a prefix declaration
      case "PREFIX":
        this._sparqlStyle = !0;
      case "@prefix":
        return this._readPrefix;
      // It could be a base declaration
      case "BASE":
        this._sparqlStyle = !0;
      case "@base":
        return this._readBaseIRI;
      // It could be a graph
      case "{":
        if (this._supportsNamedGraphs)
          return this._graph = "", this._subject = null, this._readSubject;
      case "GRAPH":
        if (this._supportsNamedGraphs)
          return this._readNamedGraphLabel;
      // Otherwise, the next token must be a subject
      default:
        return this._readSubject(t);
    }
  }
  // ### `_readEntity` reads an IRI, prefixed name, blank node, or variable
  _readEntity(t, r) {
    let n;
    switch (t.type) {
      // Read a relative or absolute IRI
      case "IRI":
      case "typeIRI":
        const i = this._resolveIRI(t.value);
        if (i === null)
          return this._error("Invalid IRI", t);
        n = this._factory.namedNode(i);
        break;
      // Read a prefixed name
      case "type":
      case "prefixed":
        const s = this._prefixes[t.prefix];
        if (s === void 0)
          return this._error(`Undefined prefix "${t.prefix}:"`, t);
        n = this._factory.namedNode(s + t.value);
        break;
      // Read a blank node
      case "blank":
        n = this._factory.blankNode(this._prefixes[t.prefix] + t.value);
        break;
      // Read a variable
      case "var":
        n = this._factory.variable(t.value.substr(1));
        break;
      // Everything else is not an entity
      default:
        return this._error(`Expected entity but got ${t.type}`, t);
    }
    return !r && this._n3Mode && n.id in this._quantified && (n = this._quantified[n.id]), n;
  }
  // ### `_readSubject` reads a quad's subject
  _readSubject(t) {
    switch (this._predicate = null, t.type) {
      case "[":
        return this._saveContext(
          "blank",
          this._graph,
          this._subject = this._factory.blankNode(),
          null,
          null
        ), this._readBlankNodeHead;
      case "(":
        return this._saveContext("list", this._graph, this.RDF_NIL, null, null), this._subject = null, this._readListItem;
      case "{":
        return this._n3Mode ? (this._saveContext(
          "formula",
          this._graph,
          this._graph = this._factory.blankNode(),
          null,
          null
        ), this._readSubject) : this._error("Unexpected graph", t);
      case "}":
        return this._readPunctuation(t);
      case "@forSome":
        return this._n3Mode ? (this._subject = null, this._predicate = this.N3_FORSOME, this._quantifier = "blankNode", this._readQuantifierList) : this._error('Unexpected "@forSome"', t);
      case "@forAll":
        return this._n3Mode ? (this._subject = null, this._predicate = this.N3_FORALL, this._quantifier = "variable", this._readQuantifierList) : this._error('Unexpected "@forAll"', t);
      case "literal":
        if (!this._n3Mode)
          return this._error("Unexpected literal", t);
        if (t.prefix.length === 0)
          return this._literalValue = t.value, this._completeSubjectLiteral;
        this._subject = this._factory.literal(t.value, this._factory.namedNode(t.prefix));
        break;
      case "<<":
        return this._supportsRDFStar ? (this._saveContext("<<", this._graph, null, null, null), this._graph = null, this._readSubject) : this._error("Unexpected RDF-star syntax", t);
      default:
        if ((this._subject = this._readEntity(t)) === void 0)
          return;
        if (this._n3Mode)
          return this._getPathReader(this._readPredicateOrNamedGraph);
    }
    return this._readPredicateOrNamedGraph;
  }
  // ### `_readPredicate` reads a quad's predicate
  _readPredicate(t) {
    const r = t.type;
    switch (r) {
      case "inverse":
        this._inversePredicate = !0;
      case "abbreviation":
        this._predicate = this.ABBREVIATIONS[t.value];
        break;
      case ".":
      case "]":
      case "}":
        return this._predicate === null ? this._error(`Unexpected ${r}`, t) : (this._subject = null, r === "]" ? this._readBlankNodeTail(t) : this._readPunctuation(t));
      case ";":
        return this._predicate !== null ? this._readPredicate : this._error("Expected predicate but got ;", t);
      case "[":
        if (this._n3Mode)
          return this._saveContext(
            "blank",
            this._graph,
            this._subject,
            this._subject = this._factory.blankNode(),
            null
          ), this._readBlankNodeHead;
      case "blank":
        if (!this._n3Mode)
          return this._error("Disallowed blank node as predicate", t);
      default:
        if ((this._predicate = this._readEntity(t)) === void 0)
          return;
    }
    return this._readObject;
  }
  // ### `_readObject` reads a quad's object
  _readObject(t) {
    switch (t.type) {
      case "literal":
        if (t.prefix.length === 0)
          return this._literalValue = t.value, this._readDataTypeOrLang;
        this._object = this._factory.literal(t.value, this._factory.namedNode(t.prefix));
        break;
      case "[":
        return this._saveContext(
          "blank",
          this._graph,
          this._subject,
          this._predicate,
          this._subject = this._factory.blankNode()
        ), this._readBlankNodeHead;
      case "(":
        return this._saveContext("list", this._graph, this._subject, this._predicate, this.RDF_NIL), this._subject = null, this._readListItem;
      case "{":
        return this._n3Mode ? (this._saveContext(
          "formula",
          this._graph,
          this._subject,
          this._predicate,
          this._graph = this._factory.blankNode()
        ), this._readSubject) : this._error("Unexpected graph", t);
      case "<<":
        return this._supportsRDFStar ? (this._saveContext("<<", this._graph, this._subject, this._predicate, null), this._graph = null, this._readSubject) : this._error("Unexpected RDF-star syntax", t);
      default:
        if ((this._object = this._readEntity(t)) === void 0)
          return;
        if (this._n3Mode)
          return this._getPathReader(this._getContextEndReader());
    }
    return this._getContextEndReader();
  }
  // ### `_readPredicateOrNamedGraph` reads a quad's predicate, or a named graph
  _readPredicateOrNamedGraph(t) {
    return t.type === "{" ? this._readGraph(t) : this._readPredicate(t);
  }
  // ### `_readGraph` reads a graph
  _readGraph(t) {
    return t.type !== "{" ? this._error(`Expected graph but got ${t.type}`, t) : (this._graph = this._subject, this._subject = null, this._readSubject);
  }
  // ### `_readBlankNodeHead` reads the head of a blank node
  _readBlankNodeHead(t) {
    return t.type === "]" ? (this._subject = null, this._readBlankNodeTail(t)) : (this._predicate = null, this._readPredicate(t));
  }
  // ### `_readBlankNodeTail` reads the end of a blank node
  _readBlankNodeTail(t) {
    if (t.type !== "]")
      return this._readBlankNodePunctuation(t);
    this._subject !== null && this._emit(this._subject, this._predicate, this._object, this._graph);
    const r = this._predicate === null;
    return this._restoreContext("blank", t), this._object !== null ? this._getContextEndReader() : this._predicate !== null ? this._readObject : r ? this._readPredicateOrNamedGraph : this._readPredicateAfterBlank;
  }
  // ### `_readPredicateAfterBlank` reads a predicate after an anonymous blank node
  _readPredicateAfterBlank(t) {
    switch (t.type) {
      case ".":
      case "}":
        return this._subject = null, this._readPunctuation(t);
      default:
        return this._readPredicate(t);
    }
  }
  // ### `_readListItem` reads items from a list
  _readListItem(t) {
    let r = null, n = null, i = this._readListItem;
    const s = this._subject, o = this._contextStack, a = o[o.length - 1];
    switch (t.type) {
      case "[":
        this._saveContext(
          "blank",
          this._graph,
          n = this._factory.blankNode(),
          this.RDF_FIRST,
          this._subject = r = this._factory.blankNode()
        ), i = this._readBlankNodeHead;
        break;
      case "(":
        this._saveContext(
          "list",
          this._graph,
          n = this._factory.blankNode(),
          this.RDF_FIRST,
          this.RDF_NIL
        ), this._subject = null;
        break;
      case ")":
        if (this._restoreContext("list", t), o.length !== 0 && o[o.length - 1].type === "list" && this._emit(this._subject, this._predicate, this._object, this._graph), this._predicate === null) {
          if (i = this._readPredicate, this._subject === this.RDF_NIL)
            return i;
        } else if (i = this._getContextEndReader(), this._object === this.RDF_NIL)
          return i;
        n = this.RDF_NIL;
        break;
      case "literal":
        t.prefix.length === 0 ? (this._literalValue = t.value, i = this._readListItemDataTypeOrLang) : (r = this._factory.literal(t.value, this._factory.namedNode(t.prefix)), i = this._getContextEndReader());
        break;
      case "{":
        return this._n3Mode ? (this._saveContext(
          "formula",
          this._graph,
          this._subject,
          this._predicate,
          this._graph = this._factory.blankNode()
        ), this._readSubject) : this._error("Unexpected graph", t);
      default:
        if ((r = this._readEntity(t)) === void 0)
          return;
    }
    if (n === null && (this._subject = n = this._factory.blankNode()), s === null ? a.predicate === null ? a.subject = n : a.object = n : this._emit(s, this.RDF_REST, n, this._graph), r !== null) {
      if (this._n3Mode && (t.type === "IRI" || t.type === "prefixed"))
        return this._saveContext("item", this._graph, n, this.RDF_FIRST, r), this._subject = r, this._predicate = null, this._getPathReader(this._readListItem);
      this._emit(n, this.RDF_FIRST, r, this._graph);
    }
    return i;
  }
  // ### `_readDataTypeOrLang` reads an _optional_ datatype or language
  _readDataTypeOrLang(t) {
    return this._completeObjectLiteral(t, !1);
  }
  // ### `_readListItemDataTypeOrLang` reads an _optional_ datatype or language in a list
  _readListItemDataTypeOrLang(t) {
    return this._completeObjectLiteral(t, !0);
  }
  // ### `_completeLiteral` completes a literal with an optional datatype or language
  _completeLiteral(t) {
    let r = this._factory.literal(this._literalValue);
    switch (t.type) {
      // Create a datatyped literal
      case "type":
      case "typeIRI":
        const n = this._readEntity(t);
        if (n === void 0) return;
        r = this._factory.literal(this._literalValue, n), t = null;
        break;
      // Create a language-tagged string
      case "langcode":
        r = this._factory.literal(this._literalValue, t.value), t = null;
        break;
    }
    return { token: t, literal: r };
  }
  // Completes a literal in subject position
  _completeSubjectLiteral(t) {
    return this._subject = this._completeLiteral(t).literal, this._readPredicateOrNamedGraph;
  }
  // Completes a literal in object position
  _completeObjectLiteral(t, r) {
    const n = this._completeLiteral(t);
    if (n)
      return this._object = n.literal, r && this._emit(this._subject, this.RDF_FIRST, this._object, this._graph), n.token === null ? this._getContextEndReader() : (this._readCallback = this._getContextEndReader(), this._readCallback(n.token));
  }
  // ### `_readFormulaTail` reads the end of a formula
  _readFormulaTail(t) {
    return t.type !== "}" ? this._readPunctuation(t) : (this._subject !== null && this._emit(this._subject, this._predicate, this._object, this._graph), this._restoreContext("formula", t), this._object === null ? this._readPredicate : this._getContextEndReader());
  }
  // ### `_readPunctuation` reads punctuation between quads or quad parts
  _readPunctuation(t) {
    let r, n = this._graph;
    const i = this._subject, s = this._inversePredicate;
    switch (t.type) {
      // A closing brace ends a graph
      case "}":
        if (this._graph === null)
          return this._error("Unexpected graph closing", t);
        if (this._n3Mode)
          return this._readFormulaTail(t);
        this._graph = null;
      // A dot just ends the statement, without sharing anything with the next
      case ".":
        this._subject = null, r = this._contextStack.length ? this._readSubject : this._readInTopContext, s && (this._inversePredicate = !1);
        break;
      // Semicolon means the subject is shared; predicate and object are different
      case ";":
        r = this._readPredicate;
        break;
      // Comma means both the subject and predicate are shared; the object is different
      case ",":
        r = this._readObject;
        break;
      // {| means that the current triple is annotated with predicate-object pairs.
      case "{|":
        if (!this._supportsRDFStar)
          return this._error("Unexpected RDF-star syntax", t);
        const o = this._predicate, a = this._object;
        this._subject = this._factory.quad(i, o, a, this.DEFAULTGRAPH), r = this._readPredicate;
        break;
      // |} means that the current quoted triple in annotation syntax is finalized.
      case "|}":
        if (this._subject.termType !== "Quad")
          return this._error("Unexpected asserted triple closing", t);
        this._subject = null, r = this._readPunctuation;
        break;
      default:
        if (this._supportsQuads && this._graph === null && (n = this._readEntity(t)) !== void 0) {
          r = this._readQuadPunctuation;
          break;
        }
        return this._error(`Expected punctuation to follow "${this._object.id}"`, t);
    }
    if (i !== null) {
      const o = this._predicate, a = this._object;
      s ? this._emit(a, o, i, n) : this._emit(i, o, a, n);
    }
    return r;
  }
  // ### `_readBlankNodePunctuation` reads punctuation in a blank node
  _readBlankNodePunctuation(t) {
    let r;
    switch (t.type) {
      // Semicolon means the subject is shared; predicate and object are different
      case ";":
        r = this._readPredicate;
        break;
      // Comma means both the subject and predicate are shared; the object is different
      case ",":
        r = this._readObject;
        break;
      default:
        return this._error(`Expected punctuation to follow "${this._object.id}"`, t);
    }
    return this._emit(this._subject, this._predicate, this._object, this._graph), r;
  }
  // ### `_readQuadPunctuation` reads punctuation after a quad
  _readQuadPunctuation(t) {
    return t.type !== "." ? this._error("Expected dot to follow quad", t) : this._readInTopContext;
  }
  // ### `_readPrefix` reads the prefix of a prefix declaration
  _readPrefix(t) {
    return t.type !== "prefix" ? this._error("Expected prefix to follow @prefix", t) : (this._prefix = t.value, this._readPrefixIRI);
  }
  // ### `_readPrefixIRI` reads the IRI of a prefix declaration
  _readPrefixIRI(t) {
    if (t.type !== "IRI")
      return this._error(`Expected IRI to follow prefix "${this._prefix}:"`, t);
    const r = this._readEntity(t);
    return this._prefixes[this._prefix] = r.value, this._prefixCallback(this._prefix, r), this._readDeclarationPunctuation;
  }
  // ### `_readBaseIRI` reads the IRI of a base declaration
  _readBaseIRI(t) {
    const r = t.type === "IRI" && this._resolveIRI(t.value);
    return r ? (this._setBase(r), this._readDeclarationPunctuation) : this._error("Expected valid IRI to follow base declaration", t);
  }
  // ### `_readNamedGraphLabel` reads the label of a named graph
  _readNamedGraphLabel(t) {
    switch (t.type) {
      case "IRI":
      case "blank":
      case "prefixed":
        return this._readSubject(t), this._readGraph;
      case "[":
        return this._readNamedGraphBlankLabel;
      default:
        return this._error("Invalid graph label", t);
    }
  }
  // ### `_readNamedGraphLabel` reads a blank node label of a named graph
  _readNamedGraphBlankLabel(t) {
    return t.type !== "]" ? this._error("Invalid graph label", t) : (this._subject = this._factory.blankNode(), this._readGraph);
  }
  // ### `_readDeclarationPunctuation` reads the punctuation of a declaration
  _readDeclarationPunctuation(t) {
    return this._sparqlStyle ? (this._sparqlStyle = !1, this._readInTopContext(t)) : t.type !== "." ? this._error("Expected declaration to end with a dot", t) : this._readInTopContext;
  }
  // Reads a list of quantified symbols from a @forSome or @forAll statement
  _readQuantifierList(t) {
    let r;
    switch (t.type) {
      case "IRI":
      case "prefixed":
        if ((r = this._readEntity(t, !0)) !== void 0)
          break;
      default:
        return this._error(`Unexpected ${t.type}`, t);
    }
    return this._explicitQuantifiers ? (this._subject === null ? this._emit(
      this._graph || this.DEFAULTGRAPH,
      this._predicate,
      this._subject = this._factory.blankNode(),
      this.QUANTIFIERS_GRAPH
    ) : this._emit(
      this._subject,
      this.RDF_REST,
      this._subject = this._factory.blankNode(),
      this.QUANTIFIERS_GRAPH
    ), this._emit(this._subject, this.RDF_FIRST, r, this.QUANTIFIERS_GRAPH)) : this._quantified[r.id] = this._factory[this._quantifier](this._factory.blankNode().value), this._readQuantifierPunctuation;
  }
  // Reads punctuation from a @forSome or @forAll statement
  _readQuantifierPunctuation(t) {
    return t.type === "," ? this._readQuantifierList : (this._explicitQuantifiers && (this._emit(this._subject, this.RDF_REST, this.RDF_NIL, this.QUANTIFIERS_GRAPH), this._subject = null), this._readCallback = this._getContextEndReader(), this._readCallback(t));
  }
  // ### `_getPathReader` reads a potential path and then resumes with the given function
  _getPathReader(t) {
    return this._afterPath = t, this._readPath;
  }
  // ### `_readPath` reads a potential path
  _readPath(t) {
    switch (t.type) {
      // Forward path
      case "!":
        return this._readForwardPath;
      // Backward path
      case "^":
        return this._readBackwardPath;
      // Not a path; resume reading where we left off
      default:
        const r = this._contextStack, n = r.length && r[r.length - 1];
        if (n && n.type === "item") {
          const i = this._subject;
          this._restoreContext("item", t), this._emit(this._subject, this.RDF_FIRST, i, this._graph);
        }
        return this._afterPath(t);
    }
  }
  // ### `_readForwardPath` reads a '!' path
  _readForwardPath(t) {
    let r, n;
    const i = this._factory.blankNode();
    if ((n = this._readEntity(t)) !== void 0)
      return this._predicate === null ? (r = this._subject, this._subject = i) : (r = this._object, this._object = i), this._emit(r, n, i, this._graph), this._readPath;
  }
  // ### `_readBackwardPath` reads a '^' path
  _readBackwardPath(t) {
    const r = this._factory.blankNode();
    let n, i;
    if ((n = this._readEntity(t)) !== void 0)
      return this._predicate === null ? (i = this._subject, this._subject = r) : (i = this._object, this._object = r), this._emit(r, n, i, this._graph), this._readPath;
  }
  // ### `_readRDFStarTailOrGraph` reads the graph of a nested RDF-star quad or the end of a nested RDF-star triple
  _readRDFStarTailOrGraph(t) {
    return t.type !== ">>" ? this._supportsQuads && this._graph === null && (this._graph = this._readEntity(t)) !== void 0 ? this._readRDFStarTail : this._error(`Expected >> to follow "${this._object.id}"`, t) : this._readRDFStarTail(t);
  }
  // ### `_readRDFStarTail` reads the end of a nested RDF-star triple
  _readRDFStarTail(t) {
    if (t.type !== ">>")
      return this._error(`Expected >> but got ${t.type}`, t);
    const r = this._factory.quad(
      this._subject,
      this._predicate,
      this._object,
      this._graph || this.DEFAULTGRAPH
    );
    return this._restoreContext("<<", t), this._subject === null ? (this._subject = r, this._readPredicate) : (this._object = r, this._getContextEndReader());
  }
  // ### `_getContextEndReader` gets the next reader function at the end of a context
  _getContextEndReader() {
    const t = this._contextStack;
    if (!t.length)
      return this._readPunctuation;
    switch (t[t.length - 1].type) {
      case "blank":
        return this._readBlankNodeTail;
      case "list":
        return this._readListItem;
      case "formula":
        return this._readFormulaTail;
      case "<<":
        return this._readRDFStarTailOrGraph;
    }
  }
  // ### `_emit` sends a quad through the callback
  _emit(t, r, n, i) {
    this._callback(null, this._factory.quad(t, r, n, i || this.DEFAULTGRAPH));
  }
  // ### `_error` emits an error message through the callback
  _error(t, r) {
    const n = new Error(`${t} on line ${r.line}.`);
    n.context = {
      token: r,
      line: r.line,
      previousToken: this._lexer.previousToken
    }, this._callback(n), this._callback = Wi;
  }
  // ### `_resolveIRI` resolves an IRI against the base path
  _resolveIRI(t) {
    return /^[a-z][a-z0-9+.-]*:/i.test(t) ? t : this._resolveRelativeIRI(t);
  }
  // ### `_resolveRelativeIRI` resolves an IRI against the base path,
  // assuming that a base path has been set and that the IRI is indeed relative
  _resolveRelativeIRI(t) {
    if (!t.length)
      return this._base;
    switch (t[0]) {
      // Resolve relative fragment IRIs against the base IRI
      case "#":
        return this._base + t;
      // Resolve relative query string IRIs by replacing the query string
      case "?":
        return this._base.replace(/(?:\?.*)?$/, t);
      // Resolve root-relative IRIs at the root of the base IRI
      case "/":
        return (t[1] === "/" ? this._baseScheme : this._baseRoot) + this._removeDotSegments(t);
      // Resolve all other IRIs at the base IRI's path
      default:
        return /^[^/:]*:/.test(t) ? null : this._removeDotSegments(this._basePath + t);
    }
  }
  // ### `_removeDotSegments` resolves './' and '../' path segments in an IRI as per RFC3986
  _removeDotSegments(t) {
    if (!/(^|\/)\.\.?($|[/#?])/.test(t))
      return t;
    const r = t.length;
    let n = "", i = -1, s = -1, o = 0, a = "/";
    for (; i < r; ) {
      switch (a) {
        // The path starts with the first slash after the authority
        case ":":
          if (s < 0 && t[++i] === "/" && t[++i] === "/")
            for (; (s = i + 1) < r && t[s] !== "/"; )
              i = s;
          break;
        // Don't modify a query string or fragment
        case "?":
        case "#":
          i = r;
          break;
        // Handle '/.' or '/..' path segments
        case "/":
          if (t[i + 1] === ".")
            switch (a = t[++i + 1], a) {
              // Remove a '/.' segment
              case "/":
                n += t.substring(o, i - 1), o = i + 1;
                break;
              // Remove a trailing '/.' segment
              case void 0:
              case "?":
              case "#":
                return n + t.substring(o, i) + t.substr(i + 1);
              // Remove a '/..' segment
              case ".":
                if (a = t[++i + 1], a === void 0 || a === "/" || a === "?" || a === "#") {
                  if (n += t.substring(o, i - 2), (o = n.lastIndexOf("/")) >= s && (n = n.substr(0, o)), a !== "/")
                    return `${n}/${t.substr(i + 1)}`;
                  o = i + 1;
                }
            }
      }
      a = t[++i];
    }
    return n + t.substring(o);
  }
  // ## Public methods
  // ### `parse` parses the N3 input and emits each parsed quad through the onQuad callback.
  parse(t, r, n) {
    let i, s, o;
    if (r && (r.onQuad || r.onPrefix || r.onComment) ? (i = r.onQuad, s = r.onPrefix, o = r.onComment) : (i = r, s = n), this._readCallback = this._readInTopContext, this._sparqlStyle = !1, this._prefixes = /* @__PURE__ */ Object.create(null), this._prefixes._ = this._blankNodePrefix ? this._blankNodePrefix.substr(2) : `b${Sl++}_`, this._prefixCallback = s || Wi, this._inversePredicate = !1, this._quantified = /* @__PURE__ */ Object.create(null), !i) {
      const l = [];
      let d;
      if (this._callback = (p, c) => {
        p ? d = p : c && l.push(c);
      }, this._lexer.tokenize(t).every((p) => this._readCallback = this._readCallback(p)), d) throw d;
      return l;
    }
    let a = (l, d) => {
      l !== null ? (this._callback(l), this._callback = Wi) : this._readCallback && (this._readCallback = this._readCallback(d));
    };
    o && (this._lexer.comments = !0, a = (l, d) => {
      l !== null ? (this._callback(l), this._callback = Wi) : this._readCallback && (d.type === "comment" ? o(d.value) : this._readCallback = this._readCallback(d));
    }), this._callback = i, this._lexer.tokenize(t, a);
  }
}
function Wi() {
}
function Iu(e, t) {
  e._factory = t, e.DEFAULTGRAPH = t.defaultGraph(), e.RDF_FIRST = t.namedNode(Et.rdf.first), e.RDF_REST = t.namedNode(Et.rdf.rest), e.RDF_NIL = t.namedNode(Et.rdf.nil), e.N3_FORALL = t.namedNode(Et.r.forAll), e.N3_FORSOME = t.namedNode(Et.r.forSome), e.ABBREVIATIONS = {
    a: t.namedNode(Et.rdf.type),
    "=": t.namedNode(Et.owl.sameAs),
    ">": t.namedNode(Et.log.implies),
    "<": t.namedNode(Et.log.isImpliedBy)
  }, e.QUANTIFIERS_GRAPH = t.namedNode("urn:n3:quantifiers");
}
Iu(Eu.prototype, ep);
var Gi = { exports: {} }, vl;
function sp() {
  if (vl) return Gi.exports;
  vl = 1;
  var e = typeof Reflect == "object" ? Reflect : null, t = e && typeof e.apply == "function" ? e.apply : function(v, C, D) {
    return Function.prototype.apply.call(v, C, D);
  }, r;
  e && typeof e.ownKeys == "function" ? r = e.ownKeys : Object.getOwnPropertySymbols ? r = function(v) {
    return Object.getOwnPropertyNames(v).concat(Object.getOwnPropertySymbols(v));
  } : r = function(v) {
    return Object.getOwnPropertyNames(v);
  };
  function n(T) {
    console && console.warn && console.warn(T);
  }
  var i = Number.isNaN || function(v) {
    return v !== v;
  };
  function s() {
    s.init.call(this);
  }
  Gi.exports = s, Gi.exports.once = j, s.EventEmitter = s, s.prototype._events = void 0, s.prototype._eventsCount = 0, s.prototype._maxListeners = void 0;
  var o = 10;
  function a(T) {
    if (typeof T != "function")
      throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof T);
  }
  Object.defineProperty(s, "defaultMaxListeners", {
    enumerable: !0,
    get: function() {
      return o;
    },
    set: function(T) {
      if (typeof T != "number" || T < 0 || i(T))
        throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + T + ".");
      o = T;
    }
  }), s.init = function() {
    (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
  }, s.prototype.setMaxListeners = function(v) {
    if (typeof v != "number" || v < 0 || i(v))
      throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + v + ".");
    return this._maxListeners = v, this;
  };
  function l(T) {
    return T._maxListeners === void 0 ? s.defaultMaxListeners : T._maxListeners;
  }
  s.prototype.getMaxListeners = function() {
    return l(this);
  }, s.prototype.emit = function(v) {
    for (var C = [], D = 1; D < arguments.length; D++) C.push(arguments[D]);
    var F = v === "error", y = this._events;
    if (y !== void 0)
      F = F && y.error === void 0;
    else if (!F)
      return !1;
    if (F) {
      var E;
      if (C.length > 0 && (E = C[0]), E instanceof Error)
        throw E;
      var O = new Error("Unhandled error." + (E ? " (" + E.message + ")" : ""));
      throw O.context = E, O;
    }
    var A = y[v];
    if (A === void 0)
      return !1;
    if (typeof A == "function")
      t(A, this, C);
    else
      for (var $ = A.length, Y = S(A, $), D = 0; D < $; ++D)
        t(Y[D], this, C);
    return !0;
  };
  function d(T, v, C, D) {
    var F, y, E;
    if (a(C), y = T._events, y === void 0 ? (y = T._events = /* @__PURE__ */ Object.create(null), T._eventsCount = 0) : (y.newListener !== void 0 && (T.emit(
      "newListener",
      v,
      C.listener ? C.listener : C
    ), y = T._events), E = y[v]), E === void 0)
      E = y[v] = C, ++T._eventsCount;
    else if (typeof E == "function" ? E = y[v] = D ? [C, E] : [E, C] : D ? E.unshift(C) : E.push(C), F = l(T), F > 0 && E.length > F && !E.warned) {
      E.warned = !0;
      var O = new Error("Possible EventEmitter memory leak detected. " + E.length + " " + String(v) + " listeners added. Use emitter.setMaxListeners() to increase limit");
      O.name = "MaxListenersExceededWarning", O.emitter = T, O.type = v, O.count = E.length, n(O);
    }
    return T;
  }
  s.prototype.addListener = function(v, C) {
    return d(this, v, C, !1);
  }, s.prototype.on = s.prototype.addListener, s.prototype.prependListener = function(v, C) {
    return d(this, v, C, !0);
  };
  function p() {
    if (!this.fired)
      return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
  }
  function c(T, v, C) {
    var D = { fired: !1, wrapFn: void 0, target: T, type: v, listener: C }, F = p.bind(D);
    return F.listener = C, D.wrapFn = F, F;
  }
  s.prototype.once = function(v, C) {
    return a(C), this.on(v, c(this, v, C)), this;
  }, s.prototype.prependOnceListener = function(v, C) {
    return a(C), this.prependListener(v, c(this, v, C)), this;
  }, s.prototype.removeListener = function(v, C) {
    var D, F, y, E, O;
    if (a(C), F = this._events, F === void 0)
      return this;
    if (D = F[v], D === void 0)
      return this;
    if (D === C || D.listener === C)
      --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete F[v], F.removeListener && this.emit("removeListener", v, D.listener || C));
    else if (typeof D != "function") {
      for (y = -1, E = D.length - 1; E >= 0; E--)
        if (D[E] === C || D[E].listener === C) {
          O = D[E].listener, y = E;
          break;
        }
      if (y < 0)
        return this;
      y === 0 ? D.shift() : w(D, y), D.length === 1 && (F[v] = D[0]), F.removeListener !== void 0 && this.emit("removeListener", v, O || C);
    }
    return this;
  }, s.prototype.off = s.prototype.removeListener, s.prototype.removeAllListeners = function(v) {
    var C, D, F;
    if (D = this._events, D === void 0)
      return this;
    if (D.removeListener === void 0)
      return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : D[v] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete D[v]), this;
    if (arguments.length === 0) {
      var y = Object.keys(D), E;
      for (F = 0; F < y.length; ++F)
        E = y[F], E !== "removeListener" && this.removeAllListeners(E);
      return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
    }
    if (C = D[v], typeof C == "function")
      this.removeListener(v, C);
    else if (C !== void 0)
      for (F = C.length - 1; F >= 0; F--)
        this.removeListener(v, C[F]);
    return this;
  };
  function g(T, v, C) {
    var D = T._events;
    if (D === void 0)
      return [];
    var F = D[v];
    return F === void 0 ? [] : typeof F == "function" ? C ? [F.listener || F] : [F] : C ? L(F) : S(F, F.length);
  }
  s.prototype.listeners = function(v) {
    return g(this, v, !0);
  }, s.prototype.rawListeners = function(v) {
    return g(this, v, !1);
  }, s.listenerCount = function(T, v) {
    return typeof T.listenerCount == "function" ? T.listenerCount(v) : _.call(T, v);
  }, s.prototype.listenerCount = _;
  function _(T) {
    var v = this._events;
    if (v !== void 0) {
      var C = v[T];
      if (typeof C == "function")
        return 1;
      if (C !== void 0)
        return C.length;
    }
    return 0;
  }
  s.prototype.eventNames = function() {
    return this._eventsCount > 0 ? r(this._events) : [];
  };
  function S(T, v) {
    for (var C = new Array(v), D = 0; D < v; ++D)
      C[D] = T[D];
    return C;
  }
  function w(T, v) {
    for (; v + 1 < T.length; v++)
      T[v] = T[v + 1];
    T.pop();
  }
  function L(T) {
    for (var v = new Array(T.length), C = 0; C < v.length; ++C)
      v[C] = T[C].listener || T[C];
    return v;
  }
  function j(T, v) {
    return new Promise(function(C, D) {
      function F(E) {
        T.removeListener(v, y), D(E);
      }
      function y() {
        typeof T.removeListener == "function" && T.removeListener("error", F), C([].slice.call(arguments));
      }
      x(T, v, y, { once: !0 }), v !== "error" && R(T, F, { once: !0 });
    });
  }
  function R(T, v, C) {
    typeof T.on == "function" && x(T, "error", v, C);
  }
  function x(T, v, C, D) {
    if (typeof T.on == "function")
      D.once ? T.once(v, C) : T.on(v, C);
    else if (typeof T.addEventListener == "function")
      T.addEventListener(v, function F(y) {
        D.once && T.removeEventListener(v, F), C(y);
      });
    else
      throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof T);
  }
  return Gi.exports;
}
var Tr = {}, xn = {}, Nn = {}, mo = {}, Rn = {}, El;
function op() {
  if (El) return Rn;
  El = 1, Object.defineProperty(Rn, "__esModule", { value: !0 }), Rn.LinkedList = void 0;
  class e {
    constructor() {
      this._length = 0, this._head = null, this._tail = null;
    }
    get length() {
      return this._length;
    }
    get first() {
      var r;
      return (r = this._head) === null || r === void 0 ? void 0 : r.value;
    }
    get last() {
      var r;
      return (r = this._tail) === null || r === void 0 ? void 0 : r.value;
    }
    get empty() {
      return this._head === null;
    }
    push(r) {
      const n = { value: r, next: null };
      this._tail === null ? this._head = this._tail = n : this._tail.next = this._tail = n, this._length++;
    }
    shift() {
      if (this._head === null)
        return;
      const { value: r, next: n } = this._head;
      return this._head = n, n === null && (this._tail = null), this._length--, r;
    }
    clear() {
      this._length = 0, this._head = this._tail = null;
    }
  }
  return Rn.LinkedList = e, Rn;
}
var An = {};
let go = 1;
const ha = /* @__PURE__ */ new Map();
let _o = !1, pa, wu = (e, ...t) => (ha.set(go, [e, t]), pa(go), go++), ma = (e) => {
  ha.delete(e);
};
function ga(e) {
  if (_o)
    setTimeout(ga, 0, e);
  else {
    const t = ha.get(e);
    if (t) {
      _o = !0;
      try {
        t[0](...t[1]);
      } finally {
        ma(e), _o = !1;
      }
    }
  }
}
function ap() {
  const e = new MessageChannel();
  e.port1.onmessage = (t) => {
    ga(t.data);
  }, pa = (t) => {
    e.port2.postMessage(t);
  };
}
function lp() {
  const e = `setImmediate$${Math.random()}$`;
  window.addEventListener("message", (t) => {
    typeof t.data == "string" && t.data.startsWith(e) && ga(+t.data.slice(e.length));
  }), pa = (t) => {
    window.postMessage(e + t, "*");
  };
}
const zi = typeof self > "u" ? typeof global > "u" ? void 0 : global : self;
zi.setImmediate ? (wu = zi.setImmediate, ma = zi.clearImmediate) : zi.importScripts ? ap() : lp();
const cp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get clearImmediate() {
    return ma;
  },
  get setImmediate() {
    return wu;
  }
}, Symbol.toStringTag, { value: "Module" })), up = /* @__PURE__ */ Vh(cp);
var Il;
function fp() {
  if (Il) return An;
  Il = 1, Object.defineProperty(An, "__esModule", { value: !0 }), An.createTaskScheduler = void 0;
  const e = up, t = Promise.resolve(void 0);
  function r(n = e.setImmediate) {
    const i = typeof queueMicrotask == "function" ? queueMicrotask : (a) => t.then(a);
    let s = 0, o = null;
    return (a) => {
      o !== null ? o.push(a) : ++s < 100 ? i(a) : (o = [a], n(() => {
        for (const l of o)
          i(l);
        o = null, s = 0;
      }));
    };
  }
  return An.createTaskScheduler = r, An;
}
var wl;
function dp() {
  return wl || (wl = 1, (function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.isIterator = e.isIterable = e.isSourceExpression = e.isPromise = e.isEventEmitter = e.isFunction = e.range = e.union = e.fromIterable = e.fromIterator = e.fromArray = e.single = e.empty = e.wrap = e.WrappingIterator = e.ClonedIterator = e.UnionIterator = e.MultiTransformIterator = e.SimpleTransformIterator = e.TransformIterator = e.BufferedIterator = e.MappingIterator = e.DESTINATION = e.identity = e.IntegerIterator = e.ArrayIterator = e.SingletonIterator = e.EmptyIterator = e.AsyncIterator = e.DESTROYED = e.ENDED = e.CLOSED = e.CLOSING = e.OPEN = e.INIT = e.setTaskScheduler = e.getTaskScheduler = e.scheduleTask = e.LinkedList = void 0;
    const t = sp(), r = /* @__PURE__ */ op();
    Object.defineProperty(e, "LinkedList", { enumerable: !0, get: function() {
      return r.LinkedList;
    } });
    let i = (/* @__PURE__ */ fp()).createTaskScheduler();
    function s(G) {
      i(G);
    }
    e.scheduleTask = s;
    function o() {
      return i;
    }
    e.getTaskScheduler = o;
    function a(G) {
      i = G;
    }
    e.setTaskScheduler = a, e.INIT = 1, e.OPEN = 2, e.CLOSING = 4, e.CLOSED = 8, e.ENDED = 16, e.DESTROYED = 32;
    class l extends t.EventEmitter {
      /** Creates a new `AsyncIterator`. */
      constructor(f = e.OPEN) {
        super(), this._readable = !1, this._state = f, this.on("newListener", d);
      }
      /**
        Changes the iterator to the given state if possible and necessary,
        possibly emitting events to signal that change.
        @protected
        @param {integer} newState The ID of the new state
        @param {boolean} [eventAsync=false] Whether resulting events should be emitted asynchronously
        @returns {boolean} Whether the state was changed
        @emits module:asynciterator.AsyncIterator.end
      */
      _changeState(f, m = !1) {
        const I = f > this._state && this._state < e.ENDED;
        return I && (this._state = f, f === e.ENDED && (m ? i(() => this.emit("end")) : this.emit("end"))), I;
      }
      /**
        Tries to read the next item from the iterator.
        This is the main method for reading the iterator in _on-demand mode_,
        where new items are only created when needed by consumers.
        If no items are currently available, this methods returns `null`.
        The {@link module:asynciterator.event:readable} event
        will then signal when new items might be ready.
        To read all items from the iterator,
        switch to _flow mode_ by subscribing
        to the {@link module:asynciterator.event:data} event.
        When in flow mode, do not use the `read` method.
        @returns {object?} The next item, or `null` if none is available
      */
      read() {
        return null;
      }
      /**
        The iterator emits a `readable` event when it might have new items available
        after having had no items available right before this event.
        If the iterator is not in flow mode, items can be retrieved
        by calling {@link module:asynciterator.AsyncIterator#read}.
        @event module:asynciterator.readable
      */
      /**
        The iterator emits a `data` event with a new item as soon as it becomes available.
        When one or more listeners are attached to the `data` event,
        the iterator switches to _flow mode_,
        generating and emitting new items as fast as possible.
        This drains the source and might create backpressure on the consumers,
        so only subscribe to this event if this behavior is intended.
        In flow mode, don't use {@link module:asynciterator.AsyncIterator#read}.
        To switch back to _on-demand mode_, remove all listeners from the `data` event.
        You can then obtain items through `read` again.
        @event module:asynciterator.data
        @param {object} item The new item
      */
      /**
        Invokes the callback for each remaining item in the iterator.
        Switches the iterator to flow mode.
        @param {Function} callback A function that will be called with each item
        @param {object?} self The `this` pointer for the callback
      */
      forEach(f, m) {
        this.on("data", Ut(f, m));
      }
      /**
        Stops the iterator from generating new items.
        Already generated items or terminating items can still be emitted.
        After this, the iterator will end asynchronously.
        @emits module:asynciterator.AsyncIterator.end
      */
      close() {
        this._changeState(e.CLOSED) && this._endAsync();
      }
      /**
        Destroy the iterator and stop it from generating new items.
        This will not do anything if the iterator was already ended or destroyed.
        All internal resources will be released an no new items will be emitted,
        even not already generated items.
        Implementors should not override this method,
        but instead implement {@link module:asynciterator.AsyncIterator#_destroy}.
        @param {Error} [cause] An optional error to emit.
        @emits module:asynciterator.AsyncIterator.end
        @emits module:asynciterator.AsyncIterator.error Only if an error is passed.
      */
      destroy(f) {
        this.done || this._destroy(f, (m) => {
          f = f || m, f && this.emit("error", f), this._end(!0);
        });
      }
      /**
        Called by {@link module:asynciterator.AsyncIterator#destroy}.
        Implementers can override this, but this should not be called directly.
        @param {?Error} cause The reason why the iterator is destroyed.
        @param {Function} callback A callback function with an optional error argument.
      */
      _destroy(f, m) {
        m();
      }
      /**
        Ends the iterator and cleans up.
        Should never be called before {@link module:asynciterator.AsyncIterator#close};
        typically, `close` is responsible for calling `_end`.
        @param {boolean} [destroy] If the iterator should be forcefully destroyed.
        @protected
        @emits module:asynciterator.AsyncIterator.end
      */
      _end(f = !1) {
        this._changeState(f ? e.DESTROYED : e.ENDED) && (this._readable = !1, this.removeAllListeners("readable"), this.removeAllListeners("data"), this.removeAllListeners("end"));
      }
      /**
        Asynchronously calls `_end`.
        @protected
      */
      _endAsync() {
        i(() => this._end());
      }
      /**
        The `end` event is emitted after the last item of the iterator has been read.
        @event module:asynciterator.end
      */
      /**
        Gets or sets whether this iterator might have items available for read.
        A value of `false` means there are _definitely_ no items available;
        a value of `true` means items _might_ be available.
        @type boolean
        @emits module:asynciterator.AsyncIterator.readable
      */
      get readable() {
        return this._readable;
      }
      set readable(f) {
        f = !!f && !this.done, this._readable !== f && (this._readable = f, f && i(() => this.emit("readable")));
      }
      /**
        Gets whether the iterator has stopped generating new items.
        @type boolean
        @readonly
      */
      get closed() {
        return this._state >= e.CLOSING;
      }
      /**
        Gets whether the iterator has finished emitting items.
        @type boolean
        @readonly
      */
      get ended() {
        return this._state === e.ENDED;
      }
      /**
        Gets whether the iterator has been destroyed.
        @type boolean
        @readonly
      */
      get destroyed() {
        return this._state === e.DESTROYED;
      }
      /**
        Gets whether the iterator will not emit anymore items,
        either due to being closed or due to being destroyed.
        @type boolean
        @readonly
      */
      get done() {
        return this._state >= e.ENDED;
      }
      /* Generates a textual representation of the iterator. */
      toString() {
        const f = this._toStringDetails();
        return `[${this.constructor.name}${f ? ` ${f}` : ""}]`;
      }
      /**
        Generates details for a textual representation of the iterator.
        @protected
      */
      _toStringDetails() {
        return "";
      }
      /**
        Consume all remaining items of the iterator into an array that will be returned asynchronously.
        @param {object} [options] Settings for array creation
        @param {integer} [options.limit] The maximum number of items to place in the array.
       */
      toArray(f) {
        const m = [], I = typeof (f == null ? void 0 : f.limit) == "number" ? f.limit : 1 / 0;
        return this.ended || I <= 0 ? Promise.resolve(m) : new Promise((P, k) => {
          const B = () => P(m), q = (V) => {
            m.push(V), m.length >= I && (this.removeListener("error", k), this.removeListener("data", q), this.removeListener("end", B), P(m));
          };
          this.on("error", k), this.on("data", q), this.on("end", B);
        });
      }
      /**
        Retrieves the property with the given name from the iterator.
        If no callback is passed, it returns the value of the property
        or `undefined` if the property is not set.
        If a callback is passed, it returns `undefined`
        and calls the callback with the property the moment it is set.
        @param {string} propertyName The name of the property to retrieve
        @param {Function?} [callback] A one-argument callback to receive the property value
        @returns {object?} The value of the property (if set and no callback is given)
      */
      getProperty(f, m) {
        const I = this._properties;
        if (!m)
          return I && I[f];
        if (I && f in I)
          i(() => m(I[f]));
        else {
          let P;
          (P = this._propertyCallbacks) || (this._propertyCallbacks = P = /* @__PURE__ */ Object.create(null)), f in P ? P[f].push(m) : P[f] = [m];
        }
      }
      /**
        Sets the property with the given name to the value.
        @param {string} propertyName The name of the property to set
        @param {object?} value The new value of the property
      */
      setProperty(f, m) {
        const I = this._properties || (this._properties = /* @__PURE__ */ Object.create(null));
        I[f] = m;
        const P = this._propertyCallbacks || {}, k = P[f];
        if (k) {
          delete P[f], i(() => {
            for (const B of k)
              B(m);
          });
          for (f in P)
            return;
          delete this._propertyCallbacks;
        }
      }
      /**
        Retrieves all properties of the iterator.
        @returns {object} An object with property names as keys.
      */
      getProperties() {
        const f = this._properties, m = {};
        for (const I in f)
          m[I] = f[I];
        return m;
      }
      /**
        Sets all of the given properties.
        @param {object} properties Key/value pairs of properties to set
      */
      setProperties(f) {
        for (const m in f)
          this.setProperty(m, f[m]);
      }
      /**
        Copies the given properties from the source iterator.
        @param {module:asynciterator.AsyncIterator} source The iterator to copy from
        @param {Array} propertyNames List of property names to copy
      */
      copyProperties(f, m) {
        for (const I of m)
          f.getProperty(I, (P) => this.setProperty(I, P));
      }
      /**
        Transforms items from this iterator.
        After this operation, only read the returned iterator instead of the current one.
        @param {object|Function} [options] Settings of the iterator, or the transformation function
        @param {integer} [options.maxbufferSize=4] The maximum number of items to keep in the buffer
        @param {boolean} [options.autoStart=true] Whether buffering starts directly after construction
        @param {integer} [options.offset] The number of items to skip
        @param {integer} [options.limit] The maximum number of items
        @param {Function} [options.filter] A function to synchronously filter items from the source
        @param {Function} [options.map] A function to synchronously transform items from the source
        @param {Function} [options.transform] A function to asynchronously transform items from the source
        @param {boolean} [options.optional=false] If transforming is optional, the original item is pushed when its mapping yields `null` or its transformation yields no items
        @param {Array|module:asynciterator.AsyncIterator} [options.prepend] Items to insert before the source items
        @param {Array|module:asynciterator.AsyncIterator} [options.append]  Items to insert after the source items
        @returns {module:asynciterator.AsyncIterator} A new iterator that maps the items from this iterator
      */
      transform(f) {
        return new E(this, f);
      }
      /**
        Maps items from this iterator using the given function.
        After this operation, only read the returned iterator instead of the current one.
        @param {Function} map A mapping function to call on this iterator's (remaining) items
        @param {object?} self The `this` pointer for the mapping function
        @returns {module:asynciterator.AsyncIterator} A new iterator that maps the items from this iterator
      */
      map(f, m) {
        return new j(this, Ut(f, m));
      }
      filter(f, m) {
        return this.map(function(I) {
          return f.call(m || this, I) ? I : null;
        });
      }
      /**
       * Returns a new iterator containing all of the unique items in the original iterator.
       * @param by - The derived value by which to determine uniqueness (e.g., stringification).
                     Defaults to the identity function.
       * @returns An iterator with duplicates filtered out.
       */
      uniq(f = L) {
        const m = /* @__PURE__ */ new Set();
        return this.filter(function(I) {
          const P = f.call(this, I);
          return m.has(P) ? !1 : (m.add(P), !0);
        });
      }
      /**
        Prepends the items after those of the current iterator.
        After this operation, only read the returned iterator instead of the current one.
        @param {Array|module:asynciterator.AsyncIterator} items Items to insert before this iterator's (remaining) items
        @returns {module:asynciterator.AsyncIterator} A new iterator that prepends items to this iterator
      */
      prepend(f) {
        return this.transform({ prepend: f });
      }
      /**
        Appends the items after those of the current iterator.
        After this operation, only read the returned iterator instead of the current one.
        @param {Array|module:asynciterator.AsyncIterator} items Items to insert after this iterator's (remaining) items
        @returns {module:asynciterator.AsyncIterator} A new iterator that appends items to this iterator
      */
      append(f) {
        return this.transform({ append: f });
      }
      /**
        Surrounds items of the current iterator with the given items.
        After this operation, only read the returned iterator instead of the current one.
        @param {Array|module:asynciterator.AsyncIterator} prepend Items to insert before this iterator's (remaining) items
        @param {Array|module:asynciterator.AsyncIterator} append Items to insert after this iterator's (remaining) items
        @returns {module:asynciterator.AsyncIterator} A new iterator that appends and prepends items to this iterator
      */
      surround(f, m) {
        return this.transform({ prepend: f, append: m });
      }
      /**
        Skips the given number of items from the current iterator.
        The current iterator may not be read anymore until the returned iterator ends.
        @param {integer} offset The number of items to skip
        @returns {module:asynciterator.AsyncIterator} A new iterator that skips the given number of items
      */
      skip(f) {
        return this.map((m) => f-- > 0 ? null : m);
      }
      /**
        Limits the current iterator to the given number of items.
        The current iterator may not be read anymore until the returned iterator ends.
        @param {integer} limit The maximum number of items
        @returns {module:asynciterator.AsyncIterator} A new iterator with at most the given number of items
      */
      take(f) {
        return this.transform({ limit: f });
      }
      /**
        Limits the current iterator to the given range.
        The current iterator may not be read anymore until the returned iterator ends.
        @param {integer} start Index of the first item to return
        @param {integer} end Index of the last item to return
        @returns {module:asynciterator.AsyncIterator} A new iterator with items in the given range
      */
      range(f, m) {
        return this.transform({ offset: f, limit: Math.max(m - f + 1, 0) });
      }
      /**
        Creates a copy of the current iterator,
        containing all items emitted from this point onward.
        Further copies can be created; they will all start from this same point.
        After this operation, only read the returned copies instead of the original iterator.
        @returns {module:asynciterator.AsyncIterator} A new iterator that contains all future items of this iterator
      */
      clone() {
        return new Y(this);
      }
      /**
       * An AsyncIterator is async iterable.
       * This allows iterators to be used via the for-await syntax.
       *
       * In cases where the returned EcmaScript AsyncIterator will not be fully consumed,
       * it is recommended to manually listen for error events on the main AsyncIterator
       * to avoid uncaught error messages.
       *
       * @returns {ESAsyncIterator<T>} An EcmaScript AsyncIterator
       */
      [Symbol.asyncIterator]() {
        const f = this;
        let m = null, I = null, P = null;
        f.addListener("readable", k), f.addListener("end", k), f.addListener("error", B);
        function k() {
          if (m !== null)
            if (P !== null)
              B(P);
            else if (f.done)
              m({ done: !0, value: void 0 }), m = I = null, q();
            else {
              const V = f.read();
              V !== null && (m({ done: !1, value: V }), m = I = null);
            }
        }
        function B(V) {
          I !== null ? (I(V), m = I = P = null, q()) : P === null && (P = V);
        }
        function q() {
          f.removeListener("readable", k), f.removeListener("end", k), f.removeListener("error", B);
        }
        return {
          next() {
            return new Promise((V, K) => {
              m = V, I = K, k();
            });
          }
        };
      }
    }
    e.AsyncIterator = l;
    function d(G) {
      G === "data" && (this.removeListener("newListener", d), c(this, "readable", p), this.readable && i(() => p.call(this)));
    }
    function p() {
      let G;
      for (; this.listenerCount("data") !== 0 && (G = this.read()) !== null; )
        this.emit("data", G);
      this.listenerCount("data") === 0 && !this.done && (this.removeListener("readable", p), c(this, "newListener", d));
    }
    function c(G, f, m) {
      G.listeners(f).includes(m) || G.on(f, m);
    }
    class g extends l {
      /** Creates a new `EmptyIterator`. */
      constructor() {
        super(), this._changeState(e.ENDED, !0);
      }
    }
    e.EmptyIterator = g;
    class _ extends l {
      /**
        Creates a new `SingletonIterator`.
        @param {object} item The item that will be emitted.
      */
      constructor(f) {
        super(), this._item = f, f === null ? this.close() : this.readable = !0;
      }
      /* Reads the item from the iterator. */
      read() {
        const f = this._item;
        return this._item = null, this.close(), f;
      }
      /* Generates details for a textual representation of the iterator. */
      _toStringDetails() {
        return this._item === null ? "" : `(${this._item})`;
      }
    }
    e.SingletonIterator = _;
    class S extends l {
      /**
        Creates a new `ArrayIterator`.
        @param {Array} items The items that will be emitted.
        @param {boolean} [options.autoStart=true] Whether buffering starts directly after construction
        @param {boolean} [options.preserve=true] If false, the passed array can be safely modified
      */
      constructor(f = [], { autoStart: m = !0, preserve: I = !0 } = {}) {
        super();
        const P = I || !Array.isArray(f) ? [...f] : f;
        this._index = 0, this._sourceStarted = m !== !1, this._truncateThreshold = I ? -1 : 64, this._sourceStarted && P.length === 0 ? this.close() : this._buffer = P, this.readable = !0;
      }
      /* Reads an item from the iterator. */
      read() {
        this._sourceStarted || (this._sourceStarted = !0);
        let f = null;
        return this._buffer && (this._index < this._buffer.length && (f = this._buffer[this._index++]), this._index === this._buffer.length ? (delete this._buffer, this.close()) : this._index === this._truncateThreshold && (this._buffer.splice(0, this._truncateThreshold), this._index = 0)), f;
      }
      /* Generates details for a textual representation of the iterator. */
      _toStringDetails() {
        return `(${this._buffer ? this._buffer.length - this._index : 0})`;
      }
      /* Called by {@link module:asynciterator.AsyncIterator#destroy} */
      _destroy(f, m) {
        delete this._buffer, m();
      }
      /**
       Consume all remaining items of the iterator into an array that will be returned asynchronously.
       @param {object} [options] Settings for array creation
       @param {integer} [options.limit] The maximum number of items to place in the array.
       */
      toArray(f = {}) {
        if (!this._buffer)
          return Promise.resolve([]);
        const { length: m } = this._buffer, I = this._index, P = typeof f.limit != "number" ? m : I + f.limit, k = this._buffer.slice(I, P);
        return this._index = P, P >= m && this.close(), Promise.resolve(k);
      }
    }
    e.ArrayIterator = S;
    class w extends l {
      /**
        Creates a new `IntegerIterator`.
        @param {object} [options] Settings of the iterator
        @param {integer} [options.start=0] The first number to emit
        @param {integer} [options.end=Infinity] The last number to emit
        @param {integer} [options.step=1] The increment between two numbers
      */
      constructor({ start: f = 0, step: m = 1, end: I } = {}) {
        super(), Number.isFinite(f) && (f = Math.trunc(f)), this._next = f, Number.isFinite(m) && (m = Math.trunc(m)), this._step = m;
        const P = m >= 0, k = P ? 1 / 0 : -1 / 0;
        Number.isFinite(I) ? I = Math.trunc(I) : I !== -k && (I = k), this._last = I, !Number.isFinite(f) || (P ? f > I : f < I) ? this.close() : this.readable = !0;
      }
      /* Reads an item from the iterator. */
      read() {
        if (this.closed)
          return null;
        const f = this._next, m = this._step, I = this._last, P = this._next += m;
        return (m >= 0 ? P > I : P < I) && this.close(), f;
      }
      /* Generates details for a textual representation of the iterator. */
      _toStringDetails() {
        return `(${this._next}...${this._last})`;
      }
    }
    e.IntegerIterator = w;
    function L(G) {
      return G;
    }
    e.identity = L, e.DESTINATION = Symbol("destination");
    class j extends l {
      /**
       * Applies the given mapping to the source iterator.
       */
      constructor(f, m = L, I = {}) {
        super(), this._map = m, this._source = R(f), this._destroySource = I.destroySource !== !1, f.done ? this.close() : (this._source[e.DESTINATION] = this, this._source.on("end", D), this._source.on("error", C), this._source.on("readable", v), this.readable = this._source.readable);
      }
      /* Tries to read the next item from the iterator. */
      read() {
        if (!this.done) {
          if (this._source.readable) {
            let f, m;
            for (; (f = this._source.read()) !== null; )
              if ((m = this._map(f)) !== null)
                return m;
          }
          this.readable = !1, this._source.done && this.close();
        }
        return null;
      }
      /* Cleans up the source iterator and ends. */
      _end(f) {
        this._source.removeListener("end", D), this._source.removeListener("error", C), this._source.removeListener("readable", v), delete this._source[e.DESTINATION], this._destroySource && this._source.destroy(), super._end(f);
      }
    }
    e.MappingIterator = j;
    function R(G, f = !1) {
      if (!G || !Ie(G.read) || !Ie(G.on))
        throw new TypeError(`Invalid source: ${G}`);
      if (!f && G[e.DESTINATION])
        throw new Error("The source already has a destination");
      return G;
    }
    class x extends l {
      /**
        Creates a new `BufferedIterator`.
        @param {object} [options] Settings of the iterator
        @param {integer} [options.maxBufferSize=4] The number of items to preload in the internal buffer
        @param {boolean} [options.autoStart=true] Whether buffering starts directly after construction
      */
      constructor({ maxBufferSize: f = 4, autoStart: m = !0 } = {}) {
        super(e.INIT), this._buffer = new r.LinkedList(), this._maxBufferSize = 4, this._reading = !0, this._pushedCount = 0, this.maxBufferSize = f, i(() => this._init(m)), this._sourceStarted = m !== !1;
      }
      /**
        The maximum number of items to preload in the internal buffer.
        A `BufferedIterator` tries to fill its buffer as far as possible.
        Set to `Infinity` to fully drain the source.
        @type number
      */
      get maxBufferSize() {
        return this._maxBufferSize;
      }
      set maxBufferSize(f) {
        f !== 1 / 0 && (f = Number.isFinite(f) ? Math.max(Math.trunc(f), 1) : 4), this._maxBufferSize !== f && (this._maxBufferSize = f, this._state === e.OPEN && this._fillBuffer());
      }
      /**
        Initializing the iterator by calling {@link BufferedIterator#_begin}
        and changing state from INIT to OPEN.
        @protected
        @param {boolean} autoStart Whether reading of items should immediately start after OPEN.
      */
      _init(f) {
        let m = !1;
        this._reading = !0, this._begin(() => {
          if (m)
            throw new Error("done callback called multiple times");
          m = !0, this._reading = !1, this._changeState(e.OPEN), f ? this._fillBufferAsync() : this.readable = !0;
        });
      }
      /**
        Writes beginning items and opens iterator resources.
        Should never be called before {@link BufferedIterator#_init};
        typically, `_init` is responsible for calling `_begin`.
        @protected
        @param {function} done To be called when initialization is complete
      */
      _begin(f) {
        f();
      }
      /**
        Tries to read the next item from the iterator.
        If the buffer is empty,
        this method calls {@link BufferedIterator#_read} to fetch items.
        @returns {object?} The next item, or `null` if none is available
      */
      read() {
        if (this.done)
          return null;
        this._sourceStarted || (this._sourceStarted = !0);
        const f = this._buffer;
        let m;
        return f.empty ? (m = null, this.readable = !1) : m = f.shift(), !this._reading && f.length < this._maxBufferSize && (this.closed ? f.empty && this._endAsync() : this._fillBufferAsync()), m;
      }
      /**
        Tries to generate the given number of items.
        Implementers should add `count` items through {@link BufferedIterator#_push}.
        @protected
        @param {integer} count The number of items to generate
        @param {function} done To be called when reading is complete
      */
      _read(f, m) {
        m();
      }
      /**
        Adds an item to the internal buffer.
        @protected
        @param {object} item The item to add
        @emits module:asynciterator.AsyncIterator.readable
      */
      _push(f) {
        this.done || (this._pushedCount++, this._buffer.push(f), this.readable = !0);
      }
      /**
        Fills the internal buffer until `this._maxBufferSize` items are present.
        This method calls {@link BufferedIterator#_read} to fetch items.
        @protected
        @emits module:asynciterator.AsyncIterator.readable
      */
      _fillBuffer() {
        let f;
        this._reading || (this.closed ? this._completeClose() : (f = Math.min(this._maxBufferSize - this._buffer.length, 128)) > 0 && (this._pushedCount = 0, this._reading = !0, this._read(f, () => {
          if (!f)
            throw new Error("done callback called multiple times");
          f = 0, this._reading = !1, this.closed ? this._completeClose() : this._pushedCount && (this.readable = !0, this._buffer.length < this._maxBufferSize / 2 && this._fillBufferAsync());
        })));
      }
      /**
        Schedules `_fillBuffer` asynchronously.
      */
      _fillBufferAsync() {
        this._reading || (this._reading = !0, i(() => {
          this._reading = !1, this._fillBuffer();
        }));
      }
      /**
        Stops the iterator from generating new items
        after a possible pending read operation has finished.
        Already generated, pending, or terminating items can still be emitted.
        After this, the iterator will end asynchronously.
        @emits module:asynciterator.AsyncIterator.end
      */
      close() {
        this._reading ? this._changeState(e.CLOSING) : this._completeClose();
      }
      /**
        Stops the iterator from generating new items,
        switching from `CLOSING` state into `CLOSED` state.
        @protected
        @emits module:asynciterator.AsyncIterator.end
      */
      _completeClose() {
        this._changeState(e.CLOSED) && (this._reading = !0, this._flush(() => {
          if (!this._reading)
            throw new Error("done callback called multiple times");
          this._reading = !1, this._buffer.empty && this._endAsync();
        }));
      }
      /* Called by {@link module:asynciterator.AsyncIterator#destroy} */
      _destroy(f, m) {
        this._buffer.clear(), m();
      }
      /**
        Writes terminating items and closes iterator resources.
        Should never be called before {@link BufferedIterator#close};
        typically, `close` is responsible for calling `_flush`.
        @protected
        @param {function} done To be called when termination is complete
      */
      _flush(f) {
        f();
      }
      /**
        Generates details for a textual representation of the iterator.
        @protected
       */
      _toStringDetails() {
        const f = this._buffer;
        return `{${f.empty ? "" : `next: ${f.first}, `}buffer: ${f.length}}`;
      }
    }
    e.BufferedIterator = x;
    class T extends x {
      /**
        Creates a new `TransformIterator`.
        @param {module:asynciterator.AsyncIterator|Readable} [source] The source this iterator generates items from
        @param {object} [options] Settings of the iterator
        @param {integer} [options.maxBufferSize=4] The maximum number of items to keep in the buffer
        @param {boolean} [options.autoStart=true] Whether buffering starts directly after construction
        @param {boolean} [options.optional=false] If transforming is optional, the original item is pushed when its transformation yields no items
        @param {boolean} [options.destroySource=true] Whether the source should be destroyed when this transformed iterator is closed or destroyed
        @param {module:asynciterator.AsyncIterator} [options.source] The source this iterator generates items from
      */
      constructor(f, m = f || {}) {
        super(m), this._boundPush = (I) => this._push(I), mt(f) || (f = m.source), $e(f) ? this.source = f : f && (this._createSource = Le(f) ? () => f : f, this._sourceStarted && this._loadSourceAsync()), this._optional = !!m.optional, this._destroySource = m.destroySource !== !1;
      }
      /**
        The source this iterator generates items from.
        @type module:asynciterator.AsyncIterator
      */
      get source() {
        return Ie(this._createSource) && this._loadSourceAsync(), this._source;
      }
      set source(f) {
        const m = this._source = this._validateSource(f);
        m[e.DESTINATION] = this, this.done ? this._destroySource && m.destroy() : m.done ? this.close() : (m.on("end", F), m.on("readable", y), m.on("error", C));
      }
      /**
        Initializes a source that was set through a promise
        @protected
      */
      _loadSourceAsync() {
        Ie(this._createSource) && (Promise.resolve(this._createSource()).then((f) => {
          delete this._createSource, this.source = f, this._fillBuffer();
        }, (f) => this.emit("error", f)), this._createSource = null);
      }
      /**
        Validates whether the given iterator can be used as a source.
        @protected
        @param {object} source The source to validate
        @param {boolean} allowDestination Whether the source can already have a destination
      */
      _validateSource(f, m = !1) {
        if (this._source || typeof this._createSource < "u")
          throw new Error("The source cannot be changed after it has been set");
        return R(f, m);
      }
      /**
        Tries to read transformed items.
      */
      _read(f, m) {
        const I = () => {
          this._pushedCount < f && !this.closed ? i(() => this._readAndTransform(I, m)) : m();
        };
        this._readAndTransform(I, m);
      }
      /**
        Reads a transforms an item
      */
      _readAndTransform(f, m) {
        let I;
        const P = this.source;
        !P || P.done || (I = P.read()) === null ? m() : this._optional ? this._optionalTransform(I, f) : this._transform(I, f, this._boundPush);
      }
      /**
        Tries to transform the item;
        if the transformation yields no items, pushes the original item.
      */
      _optionalTransform(f, m) {
        const I = this._pushedCount;
        this._transform(f, () => {
          I === this._pushedCount && this._push(f), m();
        }, this._boundPush);
      }
      /**
        Generates items based on the item from the source.
        Implementers should add items through {@link BufferedIterator#_push}.
        The default implementation pushes the source item as-is.
        @protected
        @param {object} item The last read item from the source
        @param {function} done To be called when reading is complete
        @param {function} push A callback to push zero or more transformation results.
      */
      _transform(f, m, I) {
        I(f), m();
      }
      /**
        Closes the iterator when pending items are transformed.
        @protected
      */
      _closeWhenDone() {
        this.close();
      }
      /* Cleans up the source iterator and ends. */
      _end(f) {
        const m = this._source;
        m && (m.removeListener("end", F), m.removeListener("error", C), m.removeListener("readable", y), delete m[e.DESTINATION], this._destroySource && m.destroy()), super._end(f);
      }
    }
    e.TransformIterator = T;
    function v() {
      this[e.DESTINATION].readable = !0;
    }
    function C(G) {
      this[e.DESTINATION].emit("error", G);
    }
    function D() {
      this[e.DESTINATION].close();
    }
    function F() {
      this[e.DESTINATION]._closeWhenDone();
    }
    function y() {
      this[e.DESTINATION]._sourceStarted !== !1 && this[e.DESTINATION]._fillBuffer();
    }
    class E extends T {
      /**
        Creates a new `SimpleTransformIterator`.
        @param {module:asynciterator.AsyncIterator|Readable} [source] The source this iterator generates items from
        @param {object|Function} [options] Settings of the iterator, or the transformation function
        @param {integer} [options.maxbufferSize=4] The maximum number of items to keep in the buffer
        @param {boolean} [options.autoStart=true] Whether buffering starts directly after construction
        @param {module:asynciterator.AsyncIterator} [options.source] The source this iterator generates items from
        @param {integer} [options.offset] The number of items to skip
        @param {integer} [options.limit] The maximum number of items
        @param {Function} [options.filter] A function to synchronously filter items from the source
        @param {Function} [options.map] A function to synchronously transform items from the source
        @param {Function} [options.transform] A function to asynchronously transform items from the source
        @param {boolean} [options.optional=false] If transforming is optional, the original item is pushed when its mapping yields `null` or its transformation yields no items
        @param {Array|module:asynciterator.AsyncIterator} [options.prepend] Items to insert before the source items
        @param {Array|module:asynciterator.AsyncIterator} [options.append]  Items to insert after the source items
      */
      constructor(f, m) {
        if (super(f, m), this._offset = 0, this._limit = 1 / 0, this._filter = (I) => !0, m = m || (mt(f) ? null : f), m) {
          const I = Ie(m) ? m : m.transform, { limit: P, offset: k, filter: B, map: q, prepend: V, append: K } = m;
          k === 1 / 0 || P === -1 / 0 ? this._limit = 0 : (Number.isFinite(k) && (this._offset = Math.max(Math.trunc(k), 0)), Number.isFinite(P) && (this._limit = Math.max(Math.trunc(P), 0)), Ie(B) && (this._filter = B), Ie(q) && (this._map = q), this._transform = Ie(I) ? I : null), V && (this._prepender = $e(V) ? V : se(V)), K && (this._appender = $e(K) ? K : se(K));
        }
      }
      /* Tries to read and transform items */
      _read(f, m) {
        const I = () => this._readAndTransformSimple(f, P, m);
        this._readAndTransformSimple(f, P, m);
        function P() {
          i(I);
        }
      }
      /* Reads and transform items */
      _readAndTransformSimple(f, m, I) {
        let P;
        const { source: k } = this;
        if (!k || k.done) {
          I();
          return;
        }
        for (this._limit === 0 && this.close(); !this.closed && this._pushedCount < f && (P = k.read()) !== null; ) {
          if (!this._filter(P) || this._offset !== 0 && this._offset--)
            continue;
          const B = typeof this._map > "u" ? P : this._map(P);
          if (B === null)
            this._optional && this._push(P);
          else if (!Ie(this._transform))
            this._push(B);
          else {
            this._optional ? this._optionalTransform(B, m) : this._transform(B, m, this._boundPush);
            return;
          }
          --this._limit === 0 && this.close();
        }
        I();
      }
      // Prepends items to the iterator
      _begin(f) {
        this._insert(this._prepender, f), delete this._prepender;
      }
      // Appends items to the iterator
      _flush(f) {
        this._insert(this._appender, f), delete this._appender;
      }
      // Inserts items in the iterator
      _insert(f, m) {
        const I = (k) => this._push(k);
        !f || f.done ? m() : (f.on("data", I), f.on("end", P));
        function P() {
          f.removeListener("data", I), f.removeListener("end", P), m();
        }
      }
    }
    e.SimpleTransformIterator = E;
    class O extends T {
      /**
       Creates a new `MultiTransformIterator`.
       @param {module:asynciterator.AsyncIterator|Readable} [source] The source this iterator generates items from
       @param {object|Function} [options] Settings of the iterator, or the transformation function
       @param {integer} [options.maxbufferSize=4] The maximum number of items to keep in the buffer
       @param {boolean} [options.autoStart=true] Whether buffering starts directly after construction
       @param {module:asynciterator.AsyncIterator} [options.source] The source this iterator generates items from
       @param {integer} [options.offset] The number of items to skip
       @param {integer} [options.limit] The maximum number of items
       @param {Function} [options.filter] A function to synchronously filter items from the source
       @param {Function} [options.map] A function to synchronously transform items from the source
       @param {Function} [options.transform] A function to asynchronously transform items from the source
       @param {boolean} [options.optional=false] If transforming is optional, the original item is pushed when its mapping yields `null` or its transformation yields no items
       @param {Function} [options.multiTransform] A function to asynchronously transform items to iterators from the source
       @param {Array|module:asynciterator.AsyncIterator} [options.prepend] Items to insert before the source items
       @param {Array|module:asynciterator.AsyncIterator} [options.append]  Items to insert after the source items
       */
      constructor(f, m) {
        if (super(f, m), this._transformerQueue = [], m) {
          const I = Ie(m) ? m : m.multiTransform;
          I && (this._createTransformer = I);
        }
      }
      /* Tries to read and transform items */
      _read(f, m) {
        const I = this._transformerQueue, P = this._optional;
        let k, B;
        for (; (k = I[0]) && k.transformer.done; ) {
          P && k.item !== null && (f--, this._push(k.item)), I.shift();
          const { transformer: V } = k;
          V.removeListener("end", y), V.removeListener("readable", y), V.removeListener("error", C);
        }
        const { source: q } = this;
        for (; q && !q.done && I.length < this.maxBufferSize && (B = q.read(), B !== null); ) {
          const V = this._createTransformer(B) || new g();
          V[e.DESTINATION] = this, V.on("end", y), V.on("readable", y), V.on("error", C), I.push({ transformer: V, item: B });
        }
        if (k = I[0], k) {
          const { transformer: V } = k;
          for (; f-- > 0 && (B = V.read()) !== null; )
            this._push(B), P && (k.item = null);
        } else q && q.done && this.close();
        m();
      }
      /**
        Creates a transformer for the given item.
        @param {object} item The last read item from the source
        @returns {module:asynciterator.AsyncIterator} An iterator that transforms the given item
      */
      _createTransformer(f) {
        return new _(f);
      }
      /* Closes the iterator when pending items are transformed. */
      _closeWhenDone() {
        this._transformerQueue.length || this.close();
      }
      _end(f) {
        if (super._end(f), this._destroySource)
          for (const m of this._transformerQueue)
            m.transformer.destroy();
      }
    }
    e.MultiTransformIterator = O;
    class A extends x {
      /**
        Creates a new `UnionIterator`.
        @param {module:asynciterator.AsyncIterator|Array} [sources] The sources to read from
        @param {object} [options] Settings of the iterator
        @param {boolean} [options.destroySource=true] Whether the sources should be destroyed when transformed iterator is closed or destroyed
      */
      constructor(f, m = {}) {
        super(m), this._sources = [], this._currentSource = -1;
        const I = m.autoStart !== !1;
        if ($e(f))
          f.on("error", (P) => this.emit("error", P)), this._pending = { loading: !1, sources: f }, I && this._loadSources();
        else if (Array.isArray(f) && f.length > 0)
          for (const P of f)
            this._addSource(P);
        else I && this.close();
        this._destroySources = m.destroySources !== !1;
      }
      // Loads pending sources into the sources list
      _loadSources() {
        const f = this._pending.sources;
        this._pending.loading = !0, f.done ? (delete this._pending, this.close()) : (f.on("data", (m) => {
          this._addSource(m), this._fillBufferAsync();
        }), f.on("end", () => {
          delete this._pending, this._fillBuffer();
        }));
      }
      // Adds the given source to the internal sources array
      _addSource(f) {
        Le(f) && (f = te(f)), f.done || (this._sources.push(f), f[e.DESTINATION] = this, f.on("error", C), f.on("readable", y), f.on("end", $));
      }
      // Removes sources that will no longer emit items
      _removeEmptySources() {
        this._sources = this._sources.filter((f, m) => (f.done && m <= this._currentSource && this._currentSource--, !f.done)), this._fillBuffer();
      }
      // Reads items from the next sources
      _read(f, m) {
        var I;
        ((I = this._pending) === null || I === void 0 ? void 0 : I.loading) === !1 && this._loadSources();
        let P = 0, k;
        for (; P !== (P = f); )
          for (let B = 0; B < this._sources.length && f > 0; B++)
            this._currentSource = (this._currentSource + 1) % this._sources.length, (k = this._sources[this._currentSource].read()) !== null && (f--, this._push(k));
        !this._pending && this._sources.length === 0 && this.close(), m();
      }
      _end(f = !1) {
        if (super._end(f), this._destroySources) {
          for (const m of this._sources)
            m.destroy();
          this._pending && (this._pending.sources.destroy(), delete this._pending);
        }
      }
    }
    e.UnionIterator = A;
    function $() {
      this[e.DESTINATION]._removeEmptySources();
    }
    class Y extends T {
      /**
        Creates a new `ClonedIterator`.
        @param {module:asynciterator.AsyncIterator|Readable} [source] The source this iterator copies items from
      */
      constructor(f) {
        super(f, { autoStart: !1 }), this._readPosition = 0, this._reading = !1, f && (this.readable = !0);
      }
      _init() {
      }
      close() {
        l.prototype.close.call(this);
      }
      // The source this iterator copies items from
      get source() {
        return super.source;
      }
      set source(f) {
        const m = this._source = this._validateSource(f), I = m && m[e.DESTINATION] || (m[e.DESTINATION] = new X(m));
        this.done ? this._destroySource && m.destroy() : I.endsAt(0) ? this.close() : (I.register(this), (m._sourceStarted === !1 || I.readAt(0) !== null) && (this.readable = !0));
        const P = this._propertyCallbacks;
        for (const k in P) {
          const B = P[k];
          for (const q of B)
            this._getSourceProperty(k, q);
        }
      }
      /**
        Validates whether the given iterator can be used as a source.
        @protected
        @param {object} source The source to validate
        @param {boolean} allowDestination Whether the source can already have a destination
      */
      _validateSource(f, m = !1) {
        const I = f && f[e.DESTINATION];
        return super._validateSource(f, !I || I instanceof X);
      }
      // Retrieves the property with the given name from the clone or its source.
      getProperty(f, m) {
        const { source: I } = this, P = this._properties, k = P && f in P;
        if (!m)
          return k ? P && P[f] : I && I.getProperty(f);
        super.getProperty(f, m), I && !k && this._getSourceProperty(f, m);
      }
      // Retrieves the property with the given name from the source
      _getSourceProperty(f, m) {
        this.source.getProperty(f, (I) => {
          (!this._properties || !(f in this._properties)) && m(I);
        });
      }
      // Retrieves all properties of the iterator and its source.
      getProperties() {
        const f = this.source ? this.source.getProperties() : {}, m = this._properties;
        for (const I in m)
          f[I] = m[I];
        return f;
      }
      /* Generates details for a textual representation of the iterator. */
      _toStringDetails() {
        return `{source: ${this.source ? this.source.toString() : "none"}}`;
      }
      /* Tries to read an item */
      read() {
        this._sourceStarted || (this._sourceStarted = !0);
        const f = this.source;
        let m = null;
        if (!this.done && f) {
          const I = f[e.DESTINATION];
          (m = I.readAt(this._readPosition)) !== null ? this._readPosition++ : this.readable = !1, I.endsAt(this._readPosition) && this.close();
        }
        return m;
      }
      /* End the iterator and cleans up. */
      _end(f) {
        const m = this.source, I = m == null ? void 0 : m[e.DESTINATION];
        I && I.unregister(this), x.prototype._end.call(this, f);
      }
    }
    e.ClonedIterator = Y;
    class X {
      constructor(f) {
        if (this._history = [], this._trackers = /* @__PURE__ */ new Set(), this._source = f, !f.done) {
          const m = () => {
            for (const k of this._trackers)
              k.readable = !0;
          }, I = (k) => {
            for (const B of this._trackers)
              B.emit("error", k);
          }, P = () => {
            for (const k of this._trackers)
              k._sourceStarted !== !1 && k._readPosition === this._history.length && k.close();
            this._trackers.clear(), f.removeListener("end", P), f.removeListener("error", I), f.removeListener("readable", m);
          };
          f.on("end", P), f.on("error", I), f.on("readable", m);
        }
      }
      // Registers a clone for history updates
      register(f) {
        this._source.done || this._trackers.add(f);
      }
      // Unregisters a clone for history updates
      unregister(f) {
        this._trackers.delete(f);
      }
      // Tries to read the item at the given history position
      readAt(f) {
        let m = null;
        return f < this._history.length ? m = this._history[f] : !this._source.done && (m = this._source.read()) !== null && (this._history[f] = m), m;
      }
      // Determines whether the given position is the end of the source
      endsAt(f) {
        return this._source.done && this._history.length === f;
      }
    }
    class W extends l {
      constructor(f, m) {
        super(), this._source = null, this._destroySource = (m == null ? void 0 : m.destroySource) !== !1, Le(f) ? (this._source = new l(), f.then((I) => {
          this._source = null, this.source = I;
        }).catch((I) => this.emit("error", I))) : f && (this.source = f);
      }
      set source(f) {
        let m = f;
        if (this._source !== null)
          throw new Error("The source cannot be changed after it has been set");
        if (We(m) && (m = m[Symbol.iterator]()), St(m)) {
          let I = m;
          m = new t.EventEmitter(), m.read = () => {
            if (I !== null) {
              let P;
              for (; !(P = I.next()).done; )
                if (P.value !== null)
                  return P.value;
              I = null, this.close();
            }
            return null;
          };
        } else
          m = R(m);
        if (this.done) {
          this._destroySource && Ie(m.destroy) && m.destroy();
          return;
        }
        m[e.DESTINATION] = this, m.on("end", D), m.on("error", C), m.on("readable", v), this._source = m, this.readable = m.readable !== !1;
      }
      read() {
        if (this._source !== null && this._source.readable !== !1) {
          const f = this._source.read();
          if (f !== null)
            return f;
          this.readable = !1;
        }
        return null;
      }
      _end(f = !1) {
        this._source !== null && (this._source.removeListener("end", D), this._source.removeListener("error", C), this._source.removeListener("readable", v), delete this._source[e.DESTINATION], this._destroySource && Ie(this._source.destroy) && this._source.destroy(), this._source = null), super._end(f);
      }
    }
    e.WrappingIterator = W;
    function te(G, f) {
      if (f && ("autoStart" in f || "optional" in f || "source" in f || "maxBufferSize" in f))
        return G && !$e(G) && (G = new W(G)), new T(G, f);
      if (!G)
        return ee();
      if (Le(G))
        return new W(G, f);
      if (G instanceof l)
        return G;
      if (Array.isArray(G))
        return se(G);
      if (We(G) || St(G) || $e(G))
        return new W(G, f);
      throw new TypeError(`Invalid source: ${G}`);
    }
    e.wrap = te;
    function ee() {
      return new g();
    }
    e.empty = ee;
    function ge(G) {
      return new _(G);
    }
    e.single = ge;
    function se(G) {
      return new S(G);
    }
    e.fromArray = se;
    function ie(G) {
      return new W(G);
    }
    e.fromIterator = ie;
    function be(G) {
      return new W(G);
    }
    e.fromIterable = be;
    function Bt(G) {
      return new A(G);
    }
    e.union = Bt;
    function ar(G, f, m) {
      return new w({ start: G, end: f, step: m });
    }
    e.range = ar;
    function Ut(G, f) {
      return f ? G.bind(f) : G;
    }
    function Ie(G) {
      return typeof G == "function";
    }
    e.isFunction = Ie;
    function $e(G) {
      return Ie(G == null ? void 0 : G.on);
    }
    e.isEventEmitter = $e;
    function Le(G) {
      return Ie(G == null ? void 0 : G.then);
    }
    e.isPromise = Le;
    function mt(G) {
      return G && ($e(G) || Le(G) || Ie(G));
    }
    e.isSourceExpression = mt;
    function We(G) {
      return G && Symbol.iterator in G;
    }
    e.isIterable = We;
    function St(G) {
      return Ie(G == null ? void 0 : G.next);
    }
    e.isIterator = St;
  })(mo)), mo;
}
var Sr = {}, Cn = {}, xl;
function xu() {
  if (xl) return Cn;
  xl = 1, Object.defineProperty(Cn, "__esModule", { value: !0 }), Cn.BlankNode = void 0;
  let e = class {
    constructor(r) {
      this.termType = "BlankNode", this.value = r;
    }
    equals(r) {
      return !!r && r.termType === "BlankNode" && r.value === this.value;
    }
  };
  return Cn.BlankNode = e, Cn;
}
var On = {}, Pn = {}, Nl;
function Nu() {
  if (Nl) return Pn;
  Nl = 1, Object.defineProperty(Pn, "__esModule", { value: !0 }), Pn.DefaultGraph = void 0;
  let e = class {
    constructor() {
      this.termType = "DefaultGraph", this.value = "";
    }
    equals(r) {
      return !!r && r.termType === "DefaultGraph";
    }
  };
  return Pn.DefaultGraph = e, e.INSTANCE = new e(), Pn;
}
var Mn = {}, Dn = {}, Rl;
function _a() {
  if (Rl) return Dn;
  Rl = 1, Object.defineProperty(Dn, "__esModule", { value: !0 }), Dn.NamedNode = void 0;
  let e = class {
    constructor(r) {
      this.termType = "NamedNode", this.value = r;
    }
    equals(r) {
      return !!r && r.termType === "NamedNode" && r.value === this.value;
    }
  };
  return Dn.NamedNode = e, Dn;
}
var Al;
function Ru() {
  if (Al) return Mn;
  Al = 1, Object.defineProperty(Mn, "__esModule", { value: !0 }), Mn.Literal = void 0;
  const e = _a();
  let t = class ri {
    constructor(n, i) {
      this.termType = "Literal", this.value = n, typeof i == "string" ? (this.language = i, this.datatype = ri.RDF_LANGUAGE_STRING, this.direction = "") : i ? "termType" in i ? (this.language = "", this.datatype = i, this.direction = "") : (this.language = i.language, this.datatype = i.direction ? ri.RDF_DIRECTIONAL_LANGUAGE_STRING : ri.RDF_LANGUAGE_STRING, this.direction = i.direction || "") : (this.language = "", this.datatype = ri.XSD_STRING, this.direction = "");
    }
    equals(n) {
      return !!n && n.termType === "Literal" && n.value === this.value && n.language === this.language && (n.direction === this.direction || !n.direction && this.direction === "") && this.datatype.equals(n.datatype);
    }
  };
  return Mn.Literal = t, t.RDF_LANGUAGE_STRING = new e.NamedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#langString"), t.RDF_DIRECTIONAL_LANGUAGE_STRING = new e.NamedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#dirLangString"), t.XSD_STRING = new e.NamedNode("http://www.w3.org/2001/XMLSchema#string"), Mn;
}
var Ln = {}, Cl;
function Au() {
  if (Cl) return Ln;
  Cl = 1, Object.defineProperty(Ln, "__esModule", { value: !0 }), Ln.Quad = void 0;
  let e = class {
    constructor(r, n, i, s) {
      this.termType = "Quad", this.value = "", this.subject = r, this.predicate = n, this.object = i, this.graph = s;
    }
    equals(r) {
      return !!r && (r.termType === "Quad" || !r.termType) && this.subject.equals(r.subject) && this.predicate.equals(r.predicate) && this.object.equals(r.object) && this.graph.equals(r.graph);
    }
  };
  return Ln.Quad = e, Ln;
}
var kn = {}, Ol;
function Cu() {
  if (Ol) return kn;
  Ol = 1, Object.defineProperty(kn, "__esModule", { value: !0 }), kn.Variable = void 0;
  let e = class {
    constructor(r) {
      this.termType = "Variable", this.value = r;
    }
    equals(r) {
      return !!r && r.termType === "Variable" && r.value === this.value;
    }
  };
  return kn.Variable = e, kn;
}
var Pl;
function hp() {
  if (Pl) return On;
  Pl = 1, Object.defineProperty(On, "__esModule", { value: !0 }), On.DataFactory = void 0;
  const e = xu(), t = Nu(), r = Ru(), n = _a(), i = Au(), s = Cu();
  let o = 0, a = class {
    constructor(d) {
      this.blankNodeCounter = 0, d = d || {}, this.blankNodePrefix = d.blankNodePrefix || `df_${o++}_`;
    }
    /**
     * @param value The IRI for the named node.
     * @return A new instance of NamedNode.
     * @see NamedNode
     */
    namedNode(d) {
      return new n.NamedNode(d);
    }
    /**
     * @param value The optional blank node identifier.
     * @return A new instance of BlankNode.
     *         If the `value` parameter is undefined a new identifier
     *         for the blank node is generated for each call.
     * @see BlankNode
     */
    blankNode(d) {
      return new e.BlankNode(d || `${this.blankNodePrefix}${this.blankNodeCounter++}`);
    }
    /**
     * @param value              The literal value.
     * @param languageOrDatatype The optional language, datatype, or directional language.
     *                           If `languageOrDatatype` is a NamedNode,
     *                           then it is used for the value of `NamedNode.datatype`.
     *                           If `languageOrDatatype` is a NamedNode, it is used for the value
     *                           of `NamedNode.language`.
     *                           Otherwise, it is used as a directional language,
     *                           from which the language is set to `languageOrDatatype.language`
     *                           and the direction to `languageOrDatatype.direction`.
     * @return A new instance of Literal.
     * @see Literal
     */
    literal(d, p) {
      return new r.Literal(d, p);
    }
    /**
     * This method is optional.
     * @param value The variable name
     * @return A new instance of Variable.
     * @see Variable
     */
    variable(d) {
      return new s.Variable(d);
    }
    /**
     * @return An instance of DefaultGraph.
     */
    defaultGraph() {
      return t.DefaultGraph.INSTANCE;
    }
    /**
     * @param subject   The quad subject term.
     * @param predicate The quad predicate term.
     * @param object    The quad object term.
     * @param graph     The quad graph term.
     * @return A new instance of Quad.
     * @see Quad
     */
    quad(d, p, c, g) {
      return new i.Quad(d, p, c, g || this.defaultGraph());
    }
    /**
     * Create a deep copy of the given term using this data factory.
     * @param original An RDF term.
     * @return A deep copy of the given term.
     */
    fromTerm(d) {
      switch (d.termType) {
        case "NamedNode":
          return this.namedNode(d.value);
        case "BlankNode":
          return this.blankNode(d.value);
        case "Literal":
          return d.language ? this.literal(d.value, d.language) : d.datatype.equals(r.Literal.XSD_STRING) ? this.literal(d.value) : this.literal(d.value, this.fromTerm(d.datatype));
        case "Variable":
          return this.variable(d.value);
        case "DefaultGraph":
          return this.defaultGraph();
        case "Quad":
          return this.quad(this.fromTerm(d.subject), this.fromTerm(d.predicate), this.fromTerm(d.object), this.fromTerm(d.graph));
      }
    }
    /**
     * Create a deep copy of the given quad using this data factory.
     * @param original An RDF quad.
     * @return A deep copy of the given quad.
     */
    fromQuad(d) {
      return this.fromTerm(d);
    }
    /**
     * Reset the internal blank node counter.
     */
    resetBlankNodeCounter() {
      this.blankNodeCounter = 0;
    }
  };
  return On.DataFactory = a, On;
}
var Ml;
function jt() {
  return Ml || (Ml = 1, (function(e) {
    var t = Sr && Sr.__createBinding || (Object.create ? (function(n, i, s, o) {
      o === void 0 && (o = s);
      var a = Object.getOwnPropertyDescriptor(i, s);
      (!a || ("get" in a ? !i.__esModule : a.writable || a.configurable)) && (a = { enumerable: !0, get: function() {
        return i[s];
      } }), Object.defineProperty(n, o, a);
    }) : (function(n, i, s, o) {
      o === void 0 && (o = s), n[o] = i[s];
    })), r = Sr && Sr.__exportStar || function(n, i) {
      for (var s in n) s !== "default" && !Object.prototype.hasOwnProperty.call(i, s) && t(i, n, s);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(xu(), e), r(hp(), e), r(Nu(), e), r(Ru(), e), r(_a(), e), r(Au(), e), r(Cu(), e);
  })(Sr)), Sr;
}
var yo = {}, vt = {}, Dl;
function pp() {
  if (Dl) return vt;
  Dl = 1, Object.defineProperty(vt, "__esModule", { value: !0 }), vt.termToString = r, vt.getLiteralValue = n, vt.getLiteralType = i, vt.getLiteralLanguage = s, vt.getLiteralDirection = o, vt.stringToTerm = a, vt.quadToStringQuad = l, vt.stringQuadToQuad = d;
  const e = jt(), t = new e.DataFactory();
  function r(p) {
    if (p)
      switch (p.termType) {
        case "NamedNode":
          return p.value;
        case "BlankNode":
          return "_:" + p.value;
        case "Literal":
          const c = p;
          return '"' + c.value + '"' + (c.datatype && c.datatype.value !== "http://www.w3.org/2001/XMLSchema#string" && c.datatype.value !== "http://www.w3.org/1999/02/22-rdf-syntax-ns#langString" && c.datatype.value !== "http://www.w3.org/1999/02/22-rdf-syntax-ns#dirLangString" ? "^^" + c.datatype.value : "") + (c.language ? "@" + c.language : "") + (c.direction ? "--" + c.direction : "");
        case "Quad":
          return `<<${r(p.subject)} ${r(p.predicate)} ${r(p.object)}${p.graph.termType === "DefaultGraph" ? "" : " " + r(p.graph)}>>`;
        case "Variable":
          return "?" + p.value;
        case "DefaultGraph":
          return p.value;
      }
  }
  function n(p) {
    const c = /^"([^]*)"/.exec(p);
    if (!c)
      throw new Error(p + " is not a literal");
    return c[1];
  }
  function i(p) {
    const c = /^"[^]*"(?:\^\^([^"]+)|(@)[^@"]+)?$/.exec(p);
    if (!c)
      throw new Error(p + " is not a literal");
    return c[1] || (c[2] ? "http://www.w3.org/1999/02/22-rdf-syntax-ns#langString" : "http://www.w3.org/2001/XMLSchema#string");
  }
  function s(p) {
    const c = /^"[^]*"(?:@([^@"]+)|\^\^[^"]+)?$/.exec(p);
    if (!c)
      throw new Error(p + " is not a literal");
    if (c[1]) {
      let g = c[1].toLowerCase();
      const _ = g.indexOf("--");
      return _ >= 0 && (g = g.slice(0, _)), g;
    }
    return "";
  }
  function o(p) {
    const c = p.indexOf("--", p.lastIndexOf('"'));
    if (c >= 0) {
      const g = p.slice(c + 2, p.length);
      if (g === "ltr" || g === "rtl")
        return g;
      throw new Error(p + " is not a literal with a valid direction");
    }
    return "";
  }
  function a(p, c) {
    if (c = c || t, !p || !p.length)
      return c.defaultGraph();
    switch (p[0]) {
      case "_":
        return c.blankNode(p.substr(2));
      case "?":
        if (!c.variable)
          throw new Error("Missing 'variable()' method on the given DataFactory");
        return c.variable(p.substr(1));
      case '"':
        const g = s(p), _ = o(p), S = c.namedNode(i(p));
        return c.literal(n(p), g ? { language: g, direction: _ } : S);
      case "<":
      default:
        if (p[0] === "<" && p.length > 4 && p[1] === "<" && p[p.length - 1] === ">" && p[p.length - 2] === ">") {
          const w = p.slice(2, -2).trim();
          let L = [], j = 0, R = 0, x = !1;
          for (let T = 0; T < w.length; T++) {
            const v = w[T];
            if (v === "<" && j++, v === ">") {
              if (j === 0)
                throw new Error("Found closing tag without opening tag in " + p);
              j--;
            }
            if (v === '"') {
              let C = !1, D = T;
              for (; D-- > 0 && w[D] === "\\"; )
                C = !C;
              C || (x = !x);
            }
            if (v === " " && !x && j === 0) {
              for (L.push(w.slice(R, T)); w[T + 1] === " "; )
                T += 1;
              R = T + 1;
            }
          }
          if (j !== 0)
            throw new Error("Found opening tag without closing tag in " + p);
          if (L.push(w.slice(R, w.length)), L.length !== 3 && L.length !== 4)
            throw new Error("Nested quad syntax error " + p);
          return L = L.map((T) => T.startsWith("<") && !T.includes(" ") ? T.slice(1, -1) : T), c.quad(a(L[0]), a(L[1]), a(L[2]), L[3] ? a(L[3]) : void 0);
        }
        return c.namedNode(p);
    }
  }
  function l(p) {
    return {
      subject: r(p.subject),
      predicate: r(p.predicate),
      object: r(p.object),
      graph: r(p.graph)
    };
  }
  function d(p, c) {
    return c = c || t, c.quad(a(p.subject, c), a(p.predicate, c), a(p.object, c), a(p.graph, c));
  }
  return vt;
}
var Ll;
function gn() {
  return Ll || (Ll = 1, (function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.termToString = e.stringToTerm = e.stringQuadToQuad = e.quadToStringQuad = e.getLiteralValue = e.getLiteralType = e.getLiteralDirection = e.getLiteralLanguage = void 0;
    const t = pp();
    Object.defineProperty(e, "getLiteralLanguage", { enumerable: !0, get: function() {
      return t.getLiteralLanguage;
    } }), Object.defineProperty(e, "getLiteralDirection", { enumerable: !0, get: function() {
      return t.getLiteralDirection;
    } }), Object.defineProperty(e, "getLiteralType", { enumerable: !0, get: function() {
      return t.getLiteralType;
    } }), Object.defineProperty(e, "getLiteralValue", { enumerable: !0, get: function() {
      return t.getLiteralValue;
    } }), Object.defineProperty(e, "quadToStringQuad", { enumerable: !0, get: function() {
      return t.quadToStringQuad;
    } }), Object.defineProperty(e, "stringQuadToQuad", { enumerable: !0, get: function() {
      return t.stringQuadToQuad;
    } }), Object.defineProperty(e, "stringToTerm", { enumerable: !0, get: function() {
      return t.stringToTerm;
    } }), Object.defineProperty(e, "termToString", { enumerable: !0, get: function() {
      return t.termToString;
    } });
  })(yo)), yo;
}
var vr = {}, ve = {}, kl;
function mp() {
  if (kl) return ve;
  kl = 1, Object.defineProperty(ve, "__esModule", { value: !0 }), ve.TRIPLE_TERM_NAMES = ve.QUAD_TERM_NAMES = void 0, ve.getTerms = r, ve.getTermsNested = n, ve.getNamedTerms = i, ve.collectNamedTerms = s, ve.forEachTerms = o, ve.forEachTermsNested = a, ve.filterTerms = l, ve.filterTermsNested = d, ve.filterQuadTermNames = p, ve.filterQuadTermNamesNested = c, ve.mapTerms = g, ve.mapTermsNested = _, ve.reduceTerms = S, ve.reduceTermsNested = w, ve.everyTerms = L, ve.everyTermsNested = j, ve.someTerms = R, ve.someTermsNested = x, ve.getValueNestedPath = T, ve.matchTerm = v, ve.matchPattern = C, ve.matchPatternComplete = D, ve.matchPatternMappings = F;
  const e = jt(), t = new e.DataFactory();
  ve.QUAD_TERM_NAMES = ["subject", "predicate", "object", "graph"], ve.TRIPLE_TERM_NAMES = ["subject", "predicate", "object"];
  function r(y, E) {
    return E && y.graph.termType === "DefaultGraph" ? [y.subject, y.predicate, y.object] : [y.subject, y.predicate, y.object, y.graph];
  }
  function n(y, E) {
    const O = [];
    for (const A of r(y, E))
      A.termType === "Quad" ? n(A, E).forEach(($) => O.push($)) : O.push(A);
    return O;
  }
  function i(y) {
    return [
      { key: "subject", value: y.subject },
      { key: "predicate", value: y.predicate },
      { key: "object", value: y.object },
      { key: "graph", value: y.graph }
    ];
  }
  function s(y, E, O) {
    const A = {};
    return y.forEach(($) => A[$.key] = $.value), E && (A.subject = A.subject || E("subject"), A.predicate = A.predicate || E("predicate"), A.object = A.object || E("object"), A.graph = A.graph || E("graph")), (O || t).quad(A.subject, A.predicate, A.object, A.graph);
  }
  function o(y, E) {
    E(y.subject, "subject"), E(y.predicate, "predicate"), E(y.object, "object"), E(y.graph, "graph");
  }
  function a(y, E, O = []) {
    y.subject.termType === "Quad" ? a(y.subject, E, [...O, "subject"]) : E(y.subject, [...O, "subject"]), y.predicate.termType === "Quad" ? a(y.predicate, E, [...O, "predicate"]) : E(y.predicate, [...O, "predicate"]), y.object.termType === "Quad" ? a(y.object, E, [...O, "object"]) : E(y.object, [...O, "object"]), y.graph.termType === "Quad" ? a(y.graph, E, [...O, "graph"]) : E(y.graph, [...O, "graph"]);
  }
  function l(y, E) {
    const O = [];
    return E(y.subject, "subject") && O.push(y.subject), E(y.predicate, "predicate") && O.push(y.predicate), E(y.object, "object") && O.push(y.object), E(y.graph, "graph") && O.push(y.graph), O;
  }
  function d(y, E, O = []) {
    let A = [];
    return y.subject.termType === "Quad" ? A = [...A, ...d(y.subject, E, [...O, "subject"])] : E(y.subject, [...O, "subject"]) && A.push(y.subject), y.predicate.termType === "Quad" ? A = [...A, ...d(y.predicate, E, [...O, "predicate"])] : E(y.predicate, [...O, "predicate"]) && A.push(y.predicate), y.object.termType === "Quad" ? A = [...A, ...d(y.object, E, [...O, "object"])] : E(y.object, [...O, "object"]) && A.push(y.object), y.graph.termType === "Quad" ? A = [...A, ...d(y.graph, E, [...O, "graph"])] : E(y.graph, [...O, "graph"]) && A.push(y.graph), A;
  }
  function p(y, E) {
    const O = [];
    return E(y.subject, "subject") && O.push("subject"), E(y.predicate, "predicate") && O.push("predicate"), E(y.object, "object") && O.push("object"), E(y.graph, "graph") && O.push("graph"), O;
  }
  function c(y, E, O = []) {
    let A = [];
    const $ = [...O, "subject"];
    y.subject.termType === "Quad" ? A = [...A, ...c(y.subject, E, $)] : E(y.subject, $) && A.push($);
    const Y = [...O, "predicate"];
    y.predicate.termType === "Quad" ? A = [...A, ...c(y.predicate, E, Y)] : E(y.predicate, Y) && A.push(Y);
    const X = [...O, "object"];
    y.object.termType === "Quad" ? A = [...A, ...c(y.object, E, X)] : E(y.object, X) && A.push(X);
    const W = [...O, "graph"];
    return y.graph.termType === "Quad" ? A = [...A, ...c(y.graph, E, W)] : E(y.graph, W) && A.push(W), A;
  }
  function g(y, E, O) {
    return (O || t).quad(E(y.subject, "subject"), E(y.predicate, "predicate"), E(y.object, "object"), E(y.graph, "graph"));
  }
  function _(y, E, O, A = []) {
    return (O || t).quad(y.subject.termType === "Quad" ? _(y.subject, E, O, [...A, "subject"]) : E(y.subject, [...A, "subject"]), y.predicate.termType === "Quad" ? _(y.predicate, E, O, [...A, "predicate"]) : E(y.predicate, [...A, "predicate"]), y.object.termType === "Quad" ? _(y.object, E, O, [...A, "object"]) : E(y.object, [...A, "object"]), y.graph.termType === "Quad" ? _(y.graph, E, O, [...A, "graph"]) : E(y.graph, [...A, "graph"]));
  }
  function S(y, E, O) {
    let A = O;
    return A = E(A, y.subject, "subject"), A = E(A, y.predicate, "predicate"), A = E(A, y.object, "object"), E(A, y.graph, "graph");
  }
  function w(y, E, O, A = []) {
    let $ = O;
    return y.subject.termType === "Quad" ? $ = w(y.subject, E, $, [...A, "subject"]) : $ = E($, y.subject, [...A, "subject"]), y.predicate.termType === "Quad" ? $ = w(y.predicate, E, $, [...A, "predicate"]) : $ = E($, y.predicate, [...A, "predicate"]), y.object.termType === "Quad" ? $ = w(y.object, E, $, [...A, "object"]) : $ = E($, y.object, [...A, "object"]), y.graph.termType === "Quad" ? $ = w(y.graph, E, $, [...A, "graph"]) : $ = E($, y.graph, [...A, "graph"]), $;
  }
  function L(y, E) {
    return E(y.subject, "subject") && E(y.predicate, "predicate") && E(y.object, "object") && E(y.graph, "graph");
  }
  function j(y, E, O = []) {
    return (y.subject.termType === "Quad" ? j(y.subject, E, [...O, "subject"]) : E(y.subject, [...O, "subject"])) && (y.predicate.termType === "Quad" ? j(y.predicate, E, [...O, "predicate"]) : E(y.predicate, [...O, "predicate"])) && (y.object.termType === "Quad" ? j(y.object, E, [...O, "object"]) : E(y.object, [...O, "object"])) && (y.graph.termType === "Quad" ? j(y.graph, E, [...O, "graph"]) : E(y.graph, [...O, "graph"]));
  }
  function R(y, E) {
    return E(y.subject, "subject") || E(y.predicate, "predicate") || E(y.object, "object") || E(y.graph, "graph");
  }
  function x(y, E, O = []) {
    return (y.subject.termType === "Quad" ? x(y.subject, E, [...O, "subject"]) : E(y.subject, [...O, "subject"])) || (y.predicate.termType === "Quad" ? x(y.predicate, E, [...O, "predicate"]) : E(y.predicate, [...O, "predicate"])) || (y.object.termType === "Quad" ? x(y.object, E, [...O, "object"]) : E(y.object, [...O, "object"])) || (y.graph.termType === "Quad" ? x(y.graph, E, [...O, "graph"]) : E(y.graph, [...O, "graph"]));
  }
  function T(y, E) {
    if (E.length === 0)
      return y;
    if (y.termType === "Quad")
      return T(y[E[0]], E.slice(1));
    throw new Error(`Tried to get ${E[0]} from term of type ${y.termType}`);
  }
  function v(y, E) {
    return !E || E.termType === "Variable" || E.termType === "Quad" && y.termType === "Quad" && D(y, E) || E.equals(y);
  }
  function C(y, E, O, A, $) {
    return v(y.subject, E) && v(y.predicate, O) && v(y.object, A) && v(y.graph, $);
  }
  function D(y, E) {
    return C(y, E.subject, E.predicate, E.object, E.graph);
  }
  function F(y, E, O = {}) {
    const A = {};
    function $(Y, X) {
      return L(Y, (W, te) => {
        var ee, ge;
        const se = X[te];
        switch (W.termType) {
          case "Variable":
            return O.skipVarMapping && se.termType === "Variable" || ((ge = (ee = A[W.value]) === null || ee === void 0 ? void 0 : ee.equals(se)) !== null && ge !== void 0 ? ge : (A[W.value] = se, !0));
          case "Quad":
            return se.termType === "Quad" && $(W, se);
          default:
            return W.equals(se);
        }
      });
    }
    return $(E, y) && (O.returnMappings ? A : !0);
  }
  return ve;
}
var ut = {}, jl;
function gp() {
  if (jl) return ut;
  jl = 1, Object.defineProperty(ut, "__esModule", { value: !0 }), ut.TERM_TYPES = void 0, ut.uniqTerms = t, ut.getTermsOfType = r, ut.getNamedNodes = n, ut.getBlankNodes = i, ut.getLiterals = s, ut.getVariables = o, ut.getDefaultGraphs = a, ut.getQuads = l;
  const e = gn();
  ut.TERM_TYPES = ["NamedNode", "BlankNode", "Literal", "Variable", "DefaultGraph", "Quad"];
  function t(d) {
    const p = {};
    return d.filter((c) => {
      const g = (0, e.termToString)(c);
      return !(g in p) && (p[g] = !0);
    });
  }
  function r(d, p) {
    return d.filter((c) => c.termType === p);
  }
  function n(d) {
    return r(d, "NamedNode");
  }
  function i(d) {
    return r(d, "BlankNode");
  }
  function s(d) {
    return r(d, "Literal");
  }
  function o(d) {
    return r(d, "Variable");
  }
  function a(d) {
    return r(d, "DefaultGraph");
  }
  function l(d) {
    return r(d, "Quad");
  }
  return ut;
}
var Fl;
function $s() {
  return Fl || (Fl = 1, (function(e) {
    var t = vr && vr.__createBinding || (Object.create ? (function(n, i, s, o) {
      o === void 0 && (o = s);
      var a = Object.getOwnPropertyDescriptor(i, s);
      (!a || ("get" in a ? !i.__esModule : a.writable || a.configurable)) && (a = { enumerable: !0, get: function() {
        return i[s];
      } }), Object.defineProperty(n, o, a);
    }) : (function(n, i, s, o) {
      o === void 0 && (o = s), n[o] = i[s];
    })), r = vr && vr.__exportStar || function(n, i) {
      for (var s in n) s !== "default" && !Object.prototype.hasOwnProperty.call(i, s) && t(i, n, s);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(mp(), e), r(gp(), e);
  })(vr)), vr;
}
var jn = {}, Bl;
function Ou() {
  if (Bl) return jn;
  Bl = 1, Object.defineProperty(jn, "__esModule", { value: !0 }), jn.TermDictionaryNumberRecordFullTerms = void 0;
  const e = jt(), t = gn();
  let r = class {
    constructor(i = new e.DataFactory()) {
      this.lastId = 0, this.dictionary = {}, this.reverseDictionary = {}, this.features = { quotedTriples: !1 }, this.dataFactory = i;
    }
    encode(i) {
      const s = (0, t.termToString)(i);
      let o = this.dictionary[s];
      return o === void 0 && (o = this.lastId++, this.dictionary[s] = o, this.reverseDictionary[o] = i), o;
    }
    encodeOptional(i) {
      const s = (0, t.termToString)(i);
      return this.dictionary[s];
    }
    decode(i) {
      const s = this.reverseDictionary[i];
      if (s === void 0)
        throw new Error(`The value ${i} is not present in this dictionary`);
      return s;
    }
    *encodings() {
      for (const i of Object.keys(this.reverseDictionary))
        yield Number.parseInt(i, 10);
    }
    findQuotedTriples(i) {
      throw new Error("findQuotedTriples is not supported");
    }
    findQuotedTriplesEncoded(i) {
      throw new Error("findQuotedTriplesEncoded is not supported");
    }
  };
  return jn.TermDictionaryNumberRecordFullTerms = r, jn;
}
var Fn = {}, Bn = {}, bo = {}, Ul;
function Ft() {
  return Ul || (Ul = 1, (function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.QUAD_TERM_NAMES_INVERSE = void 0, e.getBestIndex = r, e.getBestIndexTerms = n, e.getIndexMatchTermsPath = i, e.getComponentOrderScore = s, e.orderQuadComponents = o, e.encodeOptionalTerms = a, e.quadToPattern = l, e.quadHasVariables = d, e.arePatternsQuoted = p;
    const t = $s();
    e.QUAD_TERM_NAMES_INVERSE = Object.fromEntries(t.QUAD_TERM_NAMES.map((c, g) => [c, g]));
    function r(c, g) {
      if (c.length === 1 || g.every((w) => w !== void 0))
        return 0;
      const _ = [];
      for (let w = 0; w < t.QUAD_TERM_NAMES.length; w++)
        g[w] && _.push(t.QUAD_TERM_NAMES[w]);
      return c.map((w, L) => ({ score: s(w, _), index: L })).sort((w, L) => L.score - w.score)[0].index;
    }
    function n(c, g) {
      return c.length === 1 ? 0 : c.map((S, w) => ({ score: s(S, g), index: w })).sort((S, w) => w.score - S.score)[0].index;
    }
    function i(c, g) {
      const _ = [];
      let S = 0;
      for (let w = 0; w < c.length; w += 1)
        if (c[w] === g[S]) {
          if (S++, _[w] = !0, S === g.length)
            break;
        } else
          _[w] = !1;
      return _;
    }
    function s(c, g) {
      return c.map((_, S) => g.includes(_) ? c.length - S : 0).reduce((_, S) => _ + S, 0);
    }
    function o(c, g) {
      return c.map((_) => {
        const S = e.QUAD_TERM_NAMES_INVERSE[_];
        return g[S];
      });
    }
    function a(c, g) {
      const _ = c.map((S) => {
        if (S) {
          if (S.termType === "Quad" && d(S))
            return;
          const w = g.encodeOptional(S);
          return w === void 0 ? "none" : w;
        }
        return S;
      });
      if (!_.includes("none"))
        return _;
    }
    function l(c, g, _, S, w) {
      let L = !1;
      return [[c || void 0, g || void 0, _ || void 0, S || void 0].map((R) => {
        if (R) {
          if (R.termType === "Variable")
            return;
          if (R.termType === "Quad") {
            if (w)
              return R;
            L = !0;
            return;
          }
        }
        return R;
      }), L];
    }
    function d(c) {
      for (const g of t.QUAD_TERM_NAMES) {
        const _ = c[g];
        if (_.termType === "Variable" || _.termType === "Quad" && d(_))
          return !0;
      }
      return !1;
    }
    function p(c) {
      return c.map((g) => (g == null ? void 0 : g.termType) === "Quad" && d(g));
    }
  })(bo)), bo;
}
var $l;
function ya() {
  if ($l) return Bn;
  $l = 1, Object.defineProperty(Bn, "__esModule", { value: !0 }), Bn.RdfStoreIndexNestedMap = void 0;
  const e = Ft();
  let t = class {
    constructor(n) {
      this.features = {
        quotedTripleFiltering: !1
      }, this.dictionary = n.dictionary, this.nestedMap = /* @__PURE__ */ new Map();
    }
    set(n, i) {
      const s = this.nestedMap;
      let o = s.get(n[0]);
      o || (o = /* @__PURE__ */ new Map(), s.set(n[0], o));
      let a = o.get(n[1]);
      a || (a = /* @__PURE__ */ new Map(), o.set(n[1], a));
      let l = a.get(n[2]);
      l || (l = /* @__PURE__ */ new Map(), a.set(n[2], l));
      const d = l.has(n[3]);
      return d || l.set(n[3], i), !d;
    }
    remove(n) {
      const i = this.nestedMap, s = i.get(n[0]);
      if (!s)
        return !1;
      const o = s.get(n[1]);
      if (!o)
        return !1;
      const a = o.get(n[2]);
      if (!a)
        return !1;
      const l = a.delete(n[3]);
      return l && a.size === 0 && (o.delete(n[2]), o.size === 0 && (s.delete(n[1]), s.size === 0 && i.delete(n[0]))), l;
    }
    get(n) {
      const i = (0, e.encodeOptionalTerms)(n, this.dictionary);
      if (!(!i || i.includes(void 0)))
        return this.getEncoded(i);
    }
    getEncoded(n) {
      const i = this.nestedMap.get(n[0]);
      if (!i)
        return;
      const s = i.get(n[1]);
      if (!s)
        return;
      const o = s.get(n[2]);
      if (o)
        return o.get(n[3]);
    }
    *find(n) {
      const i = (0, e.encodeOptionalTerms)(n, this.dictionary);
      if (!i)
        return;
      const [s, o, a, l] = i, [d, p, c, g] = n;
      let _, S, w, L, j, R, x;
      const T = this.nestedMap, v = s !== void 0 ? T.has(s) ? [s] : [] : T.keys();
      for (const C of v) {
        j = T.get(C), _ = d || this.dictionary.decode(C);
        const D = o !== void 0 ? j.has(o) ? [o] : [] : j.keys();
        for (const F of D) {
          R = j.get(F), S = p || this.dictionary.decode(F);
          const y = a !== void 0 ? R.has(a) ? [a] : [] : R.keys();
          for (const E of y) {
            x = R.get(E), w = c || this.dictionary.decode(E);
            const O = l !== void 0 ? x.has(l) ? [l] : [] : x.keys();
            for (const A of O)
              L = g || this.dictionary.decode(A), yield [_, S, w, L];
          }
        }
      }
    }
    // The code below is nearly identical. We duplicate because abstraction would result in a significant performance hit.
    *findEncoded(n, i) {
      const [s, o, a, l] = n;
      let d, p, c;
      const g = this.nestedMap, _ = s !== void 0 ? g.has(s) ? [s] : [] : g.keys();
      for (const S of _) {
        d = g.get(S);
        const w = o !== void 0 ? d.has(o) ? [o] : [] : d.keys();
        for (const L of w) {
          p = d.get(L);
          const j = a !== void 0 ? p.has(a) ? [a] : [] : p.keys();
          for (const R of j) {
            c = p.get(R);
            const x = l !== void 0 ? c.has(l) ? [l] : [] : c.keys();
            for (const T of x)
              yield [S, L, R, T];
          }
        }
      }
    }
    *findTermsInner(n, i, s, o) {
      if (s[n])
        for (const a of i) {
          const l = [...o, a[0]];
          yield* this.findTermsInner(n + 1, a[1], s, l);
        }
      else if (n < s.length)
        for (const a of i.values())
          yield* this.findTermsInner(n + 1, a, s, o);
      else
        yield o;
    }
    findTerms(n) {
      return this.findTermsInner(0, this.nestedMap, n, []);
    }
    count(n) {
      let i = 0;
      const s = (0, e.encodeOptionalTerms)(n, this.dictionary);
      if (!s)
        return 0;
      const o = s[0], a = s[1], l = s[2], d = s[3];
      let p, c, g;
      const _ = this.nestedMap, S = o !== void 0 ? _.has(o) ? [o] : [] : _.keys();
      for (const w of S) {
        p = _.get(w);
        const L = a !== void 0 ? p.has(a) ? [a] : [] : p.keys();
        for (const j of L) {
          c = p.get(j);
          const R = l !== void 0 ? c.has(l) ? [l] : [] : c.keys();
          for (const x of R)
            g = c.get(x), d !== void 0 ? g.has(d) && i++ : i += g.size;
        }
      }
      return i;
    }
    countTermsInner(n, i, s) {
      if (n === s.length - 1)
        return i.size;
      let o = 0;
      for (const a of i.values())
        o += this.countTermsInner(n + 1, a, s);
      return o;
    }
    countTerms(n) {
      return this.countTermsInner(0, this.nestedMap, n);
    }
  };
  return Bn.RdfStoreIndexNestedMap = t, Bn;
}
var Vl;
function Pu() {
  if (Vl) return Fn;
  Vl = 1, Object.defineProperty(Fn, "__esModule", { value: !0 }), Fn.TermDictionaryQuotedIndexed = void 0;
  const e = jt(), t = ya(), r = Ft();
  let n = class Qt {
    constructor(s, o = new e.DataFactory()) {
      this.quotedTriplesDictionary = [], this.features = { quotedTriples: !0 }, this.plainTermDictionary = s;
      const a = {
        // Not required
        indexCombinations: [],
        // Not required
        indexConstructor: void 0,
        dictionary: this,
        dataFactory: o
      };
      this.quotedTriplesReverseDictionaries = [
        new t.RdfStoreIndexNestedMap(a),
        new t.RdfStoreIndexNestedMap(a),
        new t.RdfStoreIndexNestedMap(a)
      ], this.dataFactory = o;
    }
    encode(s) {
      return s.termType === "Quad" ? this.encodeQuotedTriple(s, !1) : this.plainTermDictionary.encode(s);
    }
    encodeQuotedTriple(s, o) {
      if (s.graph.termType !== "DefaultGraph")
        throw new Error("Encoding of quoted quads outside of the default graph is not allowed");
      const a = (0, r.encodeOptionalTerms)([s.subject, s.predicate, s.object, s.graph], this), l = a && a.every((g) => g !== void 0) ? this.quotedTriplesReverseDictionaries[0].getEncoded(a) : void 0;
      if (l !== void 0 || o)
        return l === void 0 ? void 0 : Qt.BITMASK | l;
      const d = [
        this.encode(s.subject),
        this.encode(s.predicate),
        this.encode(s.object)
      ], p = this.quotedTriplesDictionary.length + 1;
      this.quotedTriplesDictionary.push(d);
      const c = this.encode(this.dataFactory.defaultGraph());
      return this.quotedTriplesReverseDictionaries[0].set([
        d[0],
        d[1],
        d[2],
        c
      ], p), this.quotedTriplesReverseDictionaries[1].set([
        d[1],
        d[2],
        d[0],
        c
      ], p), this.quotedTriplesReverseDictionaries[2].set([
        d[2],
        d[0],
        d[1],
        c
      ], p), Qt.BITMASK | p;
    }
    encodeOptional(s) {
      return s.termType === "Quad" ? this.encodeQuotedTriple(s, !0) : this.plainTermDictionary.encodeOptional(s);
    }
    decode(s) {
      if (Qt.BITMASK & s) {
        const o = (~Qt.BITMASK & s) - 1;
        if (o >= this.quotedTriplesDictionary.length)
          throw new Error(`The value ${s} is not present in the quoted triples range of the dictionary`);
        const a = this.quotedTriplesDictionary[o];
        return this.dataFactory.quad(this.decode(a[0]), this.decode(a[1]), this.decode(a[2]));
      }
      return this.plainTermDictionary.decode(s);
    }
    *encodings() {
      for (const s of this.plainTermDictionary.encodings())
        yield s;
      for (const s of this.quotedTriplesDictionary.keys())
        yield Qt.BITMASK | 1 + s;
    }
    *findQuotedTriples(s) {
      for (const o of this.findQuotedTriplesEncoded(s))
        yield this.decode(o);
    }
    *findQuotedTriplesEncoded(s) {
      const [o, a] = (0, r.quadToPattern)(s.subject, s.predicate, s.object, s.graph, !0);
      for (const l of this.patternToIterable(o[0]))
        for (const d of this.patternToIterable(o[1]))
          for (const p of this.patternToIterable(o[2]))
            for (const c of this.patternToIterable(o[3]))
              if (l && d || !d && !p) {
                const g = [l, d, p, c];
                for (const _ of this.quotedTriplesReverseDictionaries[0].findEncoded(g, o))
                  yield Qt.BITMASK | this.quotedTriplesReverseDictionaries[0].getEncoded(_);
              } else if (!l && d) {
                const g = [d, p, l, c];
                for (const _ of this.quotedTriplesReverseDictionaries[1].findEncoded(g, o))
                  yield Qt.BITMASK | this.quotedTriplesReverseDictionaries[1].getEncoded(_);
              } else {
                const g = [p, l, d, c];
                for (const _ of this.quotedTriplesReverseDictionaries[2].findEncoded(g, o))
                  yield Qt.BITMASK | this.quotedTriplesReverseDictionaries[2].getEncoded(_);
              }
    }
    /**
     * Helper function to convert a term to an iterator over encoded terms.
     * @param patternTerm A term.
     * @protected
     */
    *patternToIterable(s) {
      if ((s == null ? void 0 : s.termType) === "Quad") {
        yield* this.findQuotedTriplesEncoded(s);
        return;
      }
      if (s === void 0) {
        yield void 0;
        return;
      }
      const o = this.encodeOptional(s);
      o !== void 0 && (yield o);
    }
  };
  return Fn.TermDictionaryQuotedIndexed = n, n.BITMASK = 1 << 31, Fn;
}
var Un = {}, Ql;
function Mu() {
  if (Ql) return Un;
  Ql = 1, Object.defineProperty(Un, "__esModule", { value: !0 }), Un.RdfStoreIndexNestedMapQuoted = void 0;
  const e = Ft(), t = ya();
  let r = class extends t.RdfStoreIndexNestedMap {
    constructor(i) {
      super(i), this.features = {
        quotedTripleFiltering: !0
      };
    }
    *getQuotedPatternKeys(i, s) {
      for (const o of this.dictionary.findQuotedTriplesEncoded(s))
        i.has(o) && (yield o);
    }
    *find(i) {
      const s = (0, e.encodeOptionalTerms)(i, this.dictionary);
      if (!s)
        return;
      const [o, a, l, d] = s, [p, c, g, _] = i, [S, w, L, j] = (0, e.arePatternsQuoted)(i);
      let R, x, T, v, C, D, F;
      const y = this.nestedMap, E = p !== void 0 ? S ? this.getQuotedPatternKeys(y, p) : y.has(o) ? [o] : [] : y.keys();
      for (const O of E) {
        C = y.get(O), R = !S && p ? p : this.dictionary.decode(O);
        const A = c !== void 0 ? w ? this.getQuotedPatternKeys(C, c) : C.has(a) ? [a] : [] : C.keys();
        for (const $ of A) {
          D = C.get($), x = !w && c ? c : this.dictionary.decode($);
          const Y = g !== void 0 ? L ? this.getQuotedPatternKeys(D, g) : D.has(l) ? [l] : [] : D.keys();
          for (const X of Y) {
            F = D.get(X), T = !L && g ? g : this.dictionary.decode(X);
            const W = _ !== void 0 ? j ? this.getQuotedPatternKeys(F, _) : F.has(d) ? [d] : [] : F.keys();
            for (const te of W)
              v = !j && _ ? _ : this.dictionary.decode(te), yield [R, x, T, v];
          }
        }
      }
    }
    // The code below is nearly identical. We duplicate because abstraction would result in a significant performance hit.
    *findEncoded(i, s) {
      const [o, a, l, d] = i, [p, c, g, _] = s, [S, w, L, j] = (0, e.arePatternsQuoted)(s);
      let R, x, T;
      const v = this.nestedMap, C = p !== void 0 ? S ? this.getQuotedPatternKeys(v, p) : v.has(o) ? [o] : [] : v.keys();
      for (const D of C) {
        R = v.get(D);
        const F = c !== void 0 ? w ? this.getQuotedPatternKeys(R, c) : R.has(a) ? [a] : [] : R.keys();
        for (const y of F) {
          x = R.get(y);
          const E = g !== void 0 ? L ? this.getQuotedPatternKeys(x, g) : x.has(l) ? [l] : [] : x.keys();
          for (const O of E) {
            T = x.get(O);
            const A = _ !== void 0 ? j ? this.getQuotedPatternKeys(T, _) : T.has(d) ? [d] : [] : T.keys();
            for (const $ of A)
              yield [
                Number.parseInt(D, 10),
                Number.parseInt(y, 10),
                Number.parseInt(O, 10),
                Number.parseInt($, 10)
              ];
          }
        }
      }
    }
    count(i) {
      let s = 0;
      const o = (0, e.encodeOptionalTerms)(i, this.dictionary);
      if (!o)
        return 0;
      const [a, l, d, p] = o, [c, g, _, S] = i, [w, L, j, R] = (0, e.arePatternsQuoted)(i);
      let x, T, v;
      const C = this.nestedMap, D = c !== void 0 ? w ? this.getQuotedPatternKeys(C, c) : C.has(a) ? [a] : [] : C.keys();
      for (const F of D) {
        x = C.get(F);
        const y = g !== void 0 ? L ? this.getQuotedPatternKeys(x, g) : x.has(l) ? [l] : [] : x.keys();
        for (const E of y) {
          T = x.get(E);
          const O = _ !== void 0 ? j ? this.getQuotedPatternKeys(T, _) : T.has(d) ? [d] : [] : T.keys();
          for (const A of O)
            v = T.get(A), S !== void 0 ? R ? s += [...this.getQuotedPatternKeys(v, S)].length : v.has(p) && s++ : s += v.size;
        }
      }
      return s;
    }
  };
  return Un.RdfStoreIndexNestedMapQuoted = r, Un;
}
var Hl;
function Du() {
  if (Hl) return Nn;
  Hl = 1, Object.defineProperty(Nn, "__esModule", { value: !0 }), Nn.RdfStore = void 0;
  const e = /* @__PURE__ */ dp(), t = jt(), r = gn(), n = $s(), i = ku(), s = Ou(), o = Pu(), a = Mu(), l = Ft();
  let d = class ni {
    constructor(c) {
      this.features = { quotedTripleFiltering: !0, indexNodes: !1, indexDistinctTerms: !0 }, this._size = 0, this.options = c, this.dataFactory = c.dataFactory, this.dictionary = c.dictionary, this.indexesWrapped = ni.constructIndexesWrapped(c), this.indexesWrappedComponentOrders = this.indexesWrapped.map((g) => g.componentOrder), this.indexNodes = c.indexNodes ? /* @__PURE__ */ new Map() : void 0, this.features.indexNodes = !!c.indexNodes;
    }
    /**
     * Create an RDF store with default settings.
     * Concretely, this store stores triples in GSPO, GPOS, and GOSP order,
     * and makes use of in-memory number dictionary encoding.
     * @param nodes If an index of nodes (subjects or objects) must be maintained.
     */
    static createDefault(c) {
      return new ni({
        indexCombinations: ni.DEFAULT_INDEX_COMBINATIONS,
        indexConstructor: (g) => new a.RdfStoreIndexNestedMapQuoted(g),
        indexNodes: c,
        dictionary: new o.TermDictionaryQuotedIndexed(new s.TermDictionaryNumberRecordFullTerms()),
        dataFactory: new t.DataFactory()
      });
    }
    /**
     * Internal helper to create index objects.
     * @param options The RDF store options object.
     */
    static constructIndexesWrapped(c) {
      const g = [];
      if (c.indexCombinations.length === 0)
        throw new Error("At least one index combination is required");
      for (const _ of c.indexCombinations) {
        if (!ni.isCombinationValid(_))
          throw new Error(`Invalid index combination: ${_}`);
        g.push({
          index: c.indexConstructor(c),
          componentOrder: _,
          componentOrderInverse: Object.fromEntries(_.map((S, w) => [S, w]))
        });
      }
      return g;
    }
    /**
     * Check if a given quad term order is valid.
     * @param combination A quad term order.
     */
    static isCombinationValid(c) {
      for (const g of n.QUAD_TERM_NAMES)
        if (!c.includes(g))
          return !1;
      return c.length === 4;
    }
    /**
     * The number of quads in this store.
     */
    get size() {
      return this._size;
    }
    /**
     * Add a quad to the store.
     * @param quad An RDF quad.
     * @return boolean If the quad was not yet present in the index.
     */
    addQuad(c) {
      const g = [
        this.dictionary.encode(c.subject),
        this.dictionary.encode(c.predicate),
        this.dictionary.encode(c.object),
        this.dictionary.encode(c.graph)
      ];
      let _ = !1;
      for (const S of this.indexesWrapped)
        _ = S.index.set((0, l.orderQuadComponents)(S.componentOrder, g), !0);
      if (_) {
        if (this._size++, this.indexNodes) {
          let S = this.indexNodes.get(g[3]);
          S || (S = /* @__PURE__ */ new Set(), this.indexNodes.set(g[3], S)), S.add(g[0]), S.add(g[2]);
        }
        return !0;
      }
      return !1;
    }
    /**
     * Remove a quad from the store.
     * @param quad An RDF quad.
     * @return boolean If the quad was present in the index.
     */
    removeQuad(c) {
      const g = [
        this.dictionary.encodeOptional(c.subject),
        this.dictionary.encodeOptional(c.predicate),
        this.dictionary.encodeOptional(c.object),
        this.dictionary.encodeOptional(c.graph)
      ];
      if (g.includes(void 0))
        return !1;
      let _ = !1;
      for (const S of this.indexesWrapped)
        if (_ = S.index.remove((0, l.orderQuadComponents)(S.componentOrder, g)), !_)
          break;
      if (_) {
        if (this._size--, this.indexNodes) {
          const S = this.indexNodes.get(g[3]);
          this.readQuads(c.subject, void 0, void 0, c.graph).next().value || S.delete(g[0]), this.readQuads(void 0, void 0, c.object, c.graph).next().value || S.delete(g[2]), S.size === 0 && this.indexNodes.delete(g[3]);
        }
        return !0;
      }
      return !1;
    }
    /**
     * Removes all streamed quads.
     * @param stream A stream of quads
     */
    remove(c) {
      return c.on("data", (g) => this.removeQuad(g)), c;
    }
    /**
     * All quads matching the pattern will be removed.
     * @param subject The optional subject.
     * @param predicate The optional predicate.
     * @param object The optional object.
     * @param graph The optional graph.
     */
    removeMatches(c, g, _, S) {
      return this.remove(this.match(c, g, _, S));
    }
    /**
     * Deletes the given named graph.
     * @param graph The graph term or string to match.
     */
    deleteGraph(c) {
      return typeof c == "string" && (c = this.dataFactory.namedNode(c)), this.removeMatches(void 0, void 0, void 0, c);
    }
    /**
     * Import the given stream of quads into the store.
     * @param stream A stream of RDF quads.
     */
    import(c) {
      return c.on("data", (g) => this.addQuad(g)), c;
    }
    /**
     * Returns a generator producing all quads matching the pattern.
     * @param subject The optional subject.
     * @param predicate The optional predicate.
     * @param object The optional object.
     * @param graph The optional graph.
     */
    *readQuads(c, g, _, S) {
      const w = !!this.dictionary.features.quotedTriples && Object.values(this.indexesWrapped).every((T) => T.index.features.quotedTripleFiltering), [L, j] = (0, l.quadToPattern)(c, g, _, S, w), R = this.indexesWrapped[(0, l.getBestIndex)(this.indexesWrappedComponentOrders, L)], x = (0, l.orderQuadComponents)(R.componentOrder, L);
      for (const T of R.index.find(x)) {
        const v = this.dataFactory.quad(T[R.componentOrderInverse.subject], T[R.componentOrderInverse.predicate], T[R.componentOrderInverse.object], T[R.componentOrderInverse.graph]);
        j ? (0, n.matchPattern)(v, c, g, _, S) && (yield v) : yield v;
      }
    }
    /**
     * Returns an array containing all quads matching the pattern.
     * @param subject The optional subject.
     * @param predicate The optional predicate.
     * @param object The optional object.
     * @param graph The optional graph.
     */
    getQuads(c, g, _, S) {
      return [...this.readQuads(c, g, _, S)];
    }
    /**
     * Returns a stream that produces all quads matching the pattern.
     * @param subject The optional subject.
     * @param predicate The optional predicate.
     * @param object The optional object.
     * @param graph The optional graph.
     */
    match(c, g, _, S) {
      return (0, e.wrap)(this.readQuads(c, g, _, S));
    }
    /**
     * Returns a generator producing all quads matching the pattern.
     * @param subject The subject, which can be a variable.
     * @param predicate The predicate, which can be a variable.
     * @param object The object, which can be a variable.
     * @param graph The graph, which can be a variable.
     */
    *readBindings(c, g, _, S, w) {
      const L = !!this.dictionary.features.quotedTriples && Object.values(this.indexesWrapped).every((E) => E.index.features.quotedTripleFiltering), [j, R] = (0, l.quadToPattern)(g, _, S, w, L), x = this.indexesWrapped[(0, l.getBestIndex)(this.indexesWrappedComponentOrders, j)], T = (0, l.orderQuadComponents)(x.componentOrder, j), v = (0, l.encodeOptionalTerms)(T, this.dictionary);
      if (!v)
        return;
      const C = (0, l.orderQuadComponents)(x.componentOrder, [g, _, S, w]), D = [];
      for (let E = 0; E < C.length; E++)
        (C[E].termType === "Variable" || C[E].termType === "Quad") && D.push(E);
      let F = !1;
      const y = C.map((E, O) => {
        const A = [];
        for (let $ = O + 1; $ < C.length; $++)
          E.equals(C[$]) && (A.push($), F = !0);
        return A;
      });
      for (const E of x.index.findEncoded(v, T)) {
        let O = !1, A = !1;
        const $ = [];
        for (const Y of D) {
          if (F) {
            const W = y[Y];
            for (const te of W)
              if (E[Y] !== E[te]) {
                O = !0;
                break;
              }
            if (O)
              break;
          }
          const X = this.dictionary.decode(E[Y]);
          if (C[Y].termType === "Quad") {
            const W = (0, n.matchPatternMappings)(X, C[Y], { returnMappings: !0 });
            if (W) {
              A = !0;
              for (const [te, ee] of Object.entries(W)) {
                const ge = this.dataFactory.variable(te);
                if ($.some((se) => se[0].equals(ge) && !se[1].equals(ee))) {
                  O = !0;
                  break;
                }
                $.push([ge, ee]);
              }
              continue;
            }
            O = !0;
            break;
          }
          if (A && $.some((W) => W[0].equals(C[Y]) && !W[1].equals(X))) {
            O = !0;
            break;
          }
          $.push([C[Y], X]);
        }
        O || (yield c.bindings($));
      }
    }
    /**
     * Returns an array containing all bindings matching the pattern.
     * @param bindingsFactory The factory that will be used to create bindings.
     * @param subject The subject, which can be a variable.
     * @param predicate The predicate, which can be a variable.
     * @param object The object, which can be a variable.
     * @param graph The graph, which can be a variable.
     */
    getBindings(c, g, _, S, w) {
      return [...this.readBindings(c, g, _, S, w)];
    }
    /**
     * Returns a stream that produces all quads matching the pattern.
     * @param bindingsFactory The factory that will be used to create bindings.
     * @param subject The subject, which can be a variable.
     * @param predicate The predicate, which can be a variable.
     * @param object The object, which can be a variable.
     * @param graph The graph, which can be a variable.
     */
    matchBindings(c, g, _, S, w) {
      return (0, e.wrap)(this.readBindings(c, g, _, S, w));
    }
    /**
     * Returns the number of distinct terms that exist in the store.
     *
     * @param terms An array of quad term names
     */
    countDistinctTerms(c) {
      const g = (0, l.getBestIndexTerms)(this.indexesWrappedComponentOrders, c), _ = this.indexesWrapped[g], S = [];
      for (let R = 0; R < c.length; R++)
        S[R] = _.componentOrder.indexOf(c[R]);
      const w = [void 0, void 0, void 0, void 0];
      for (let R = 0; R < c.length; R++)
        w[S[R]] = c[R];
      const L = w.filter((R) => R !== void 0), j = (0, l.getIndexMatchTermsPath)(_.componentOrder, L);
      return j.includes(!1) ? this.getDistinctTerms(c).length : _.index.countTerms(j);
    }
    /**
     * Returns a generator producing distinct arrays of terms that exist in the store.
     * Each returned array corresponds to the terms specified by given quad term names.
     *
     * For example, when requesting the terms `[ 'subject', 'predicate' ]`,
     * a produced array could be `[ 'ex:s', 'ex:p' ]`,
     *
     * @param terms An array of quad term names
     */
    *readDistinctTerms(c) {
      const g = (0, l.getBestIndexTerms)(this.indexesWrappedComponentOrders, c), _ = this.indexesWrapped[g], S = [];
      for (let T = 0; T < c.length; T++)
        S[T] = _.componentOrder.indexOf(c[T]);
      const w = [void 0, void 0, void 0, void 0];
      for (let T = 0; T < c.length; T++)
        w[S[T]] = c[T];
      const L = w.filter((T) => T !== void 0), j = [];
      for (let T = 0; T < L.length; T++)
        j[T] = c.indexOf(L[T]);
      const R = (0, l.getIndexMatchTermsPath)(_.componentOrder, L);
      let x;
      R.includes(!1) && (x = /* @__PURE__ */ new Set());
      for (const T of _.index.findTerms(R)) {
        const v = [];
        for (let D = 0; D < T.length; D++)
          v[j[D]] = T[D];
        const C = v.map((D) => this.dictionary.decode(D));
        if (x) {
          const D = C.map((F) => (0, r.termToString)(F)).join(",");
          if (x.has(D))
            continue;
          x.add(D);
        }
        yield C;
      }
    }
    /**
     * Returns an array with distinct arrays of terms that exist in the store.
     * Each returned array corresponds to the terms specified by given quad term names.
     *
     * For example, when requesting the terms `[ 'subject', 'predicate' ]`,
     * a produced array could be `[ 'ex:s', 'ex:p' ]`,
     *
     * @param terms An array of quad term names
     */
    getDistinctTerms(c) {
      return [...this.readDistinctTerms(c)];
    }
    /**
     * Returns a stream with distinct arrays of terms that exist in the store.
     * Each returned array corresponds to the terms specified by given quad term names.
     *
     * For example, when requesting the terms `[ 'subject', 'predicate' ]`,
     * a produced array could be `[ 'ex:s', 'ex:p' ]`,
     *
     * @param terms An array of quad term names
     */
    matchDistinctTerms(c) {
      return (0, e.wrap)(this.readDistinctTerms(c));
    }
    /**
     * Returns the number of nodes in the given graph (can be a variable).
     * Nodes are all terms that are either a subject or object within the store.
     *
     * This method can only be called when the store is constructed with `indexNodes: true`.
     */
    countNodes(c) {
      if (!this.indexNodes)
        throw new Error("Nodes can only be read when the store was constructed with 'indexNodes: true'");
      if (c.termType === "Variable") {
        let _ = 0;
        for (const S of this.indexNodes.values())
          _ += S.size;
        return _;
      }
      const g = this.dictionary.encodeOptional(c);
      return g !== void 0 ? this.indexNodes.get(g).size : 0;
    }
    /**
     * Returns a generator producing all nodes in the given graph (can be a variable).
     * Nodes are all terms that are either a subject or object within the store.
     *
     * This method can only be called when the store is constructed with `indexNodes: true`.
     *
     * @param graph The graph to read the nodes from, or a variable if all graphs need to be considered.
     *
     * @returns a generator of tuples containing the named graph as first element and the node term as second element.
     */
    *readNodes(c) {
      if (!this.indexNodes)
        throw new Error("Nodes can only be read when the store was constructed with 'indexNodes: true'");
      if (c.termType === "Variable")
        for (const g of this.indexNodes.entries()) {
          const _ = this.dictionary.decode(g[0]);
          for (const S of g[1])
            yield [_, this.dictionary.decode(S)];
        }
      else {
        const g = this.dictionary.encodeOptional(c);
        if (g !== void 0) {
          const _ = this.indexNodes.get(g);
          for (const S of _)
            yield [c, this.dictionary.decode(S)];
        }
      }
    }
    /**
     * Returns an array containing all nodes in the given graph (can be a variable).
     * Nodes are all terms that are either a subject or object within the store.
     *
     * This method can only be called when the store is constructed with `indexNodes: true`.
     *
     * @param graph The graph to read the nodes from, or a variable if all graphs need to be considered.
     *
     * @returns an array of tuples containing the named graph as first element and the node term as second element.
     */
    getNodes(c) {
      return [...this.readNodes(c)];
    }
    /**
     * Returns a stream containing all nodes in the given graph (can be a variable).
     * Nodes are all terms that are either a subject or object within the store.
     *
     * This method can only be called when the store is constructed with `indexNodes: true`.
     *
     * @param graph The graph to read the nodes from, or a variable if all graphs need to be considered.
     *
     * @returns a stream of tuples containing the named graph as first element and the node term as second element.
     */
    matchNodes(c) {
      if (!this.indexNodes)
        throw new Error("Nodes can only be read when the store was constructed with 'indexNodes: true'");
      return (0, e.wrap)(this.readNodes(c));
    }
    /**
     * Returns the exact cardinality of the quads matching the pattern.
     * @param subject The optional subject.
     * @param predicate The optional predicate.
     * @param object The optional object.
     * @param graph The optional graph.
     */
    countQuads(c, g, _, S) {
      const w = !!this.dictionary.features.quotedTriples && Object.values(this.indexesWrapped).every((x) => x.index.features.quotedTripleFiltering), [L] = (0, l.quadToPattern)(c, g, _, S, w);
      if (L.every((x) => x === void 0))
        return this.size;
      const j = this.indexesWrapped[(0, l.getBestIndex)(this.indexesWrappedComponentOrders, L)], R = (0, l.orderQuadComponents)(j.componentOrder, L);
      return j.index.count(R);
    }
    /**
     * Wrap this store inside a DatasetCore interface.
     * Any mutations in either this store or the wrapper will propagate to each other.
     */
    asDataset() {
      return new i.DatasetCoreWrapper(this);
    }
  };
  return Nn.RdfStore = d, d.DEFAULT_INDEX_COMBINATIONS = [
    ["graph", "subject", "predicate", "object"],
    ["graph", "predicate", "object", "subject"],
    ["graph", "object", "subject", "predicate"]
  ], Nn;
}
var ql;
function ku() {
  if (ql) return xn;
  ql = 1, Object.defineProperty(xn, "__esModule", { value: !0 }), xn.DatasetCoreWrapper = void 0;
  const e = Du();
  let t = class Lu {
    constructor(n) {
      this.store = n;
    }
    get size() {
      return this.store.size;
    }
    add(n) {
      return this.store.addQuad(n), this;
    }
    delete(n) {
      return this.store.removeQuad(n), this;
    }
    has(n) {
      for (const i of this.store.readQuads(n.subject, n.predicate, n.object, n.graph))
        return !0;
      return !1;
    }
    match(n, i, s, o) {
      const a = new e.RdfStore(this.store.options);
      for (const l of this.store.readQuads(n, i, s, o))
        a.addQuad(l);
      return new Lu(a);
    }
    [Symbol.iterator]() {
      return this.store.readQuads();
    }
  };
  return xn.DatasetCoreWrapper = t, xn;
}
var To = {}, Kl;
function _p() {
  return Kl || (Kl = 1, Object.defineProperty(To, "__esModule", { value: !0 })), To;
}
var $n = {}, Wl;
function yp() {
  if (Wl) return $n;
  Wl = 1, Object.defineProperty($n, "__esModule", { value: !0 }), $n.TermDictionaryNumberMap = void 0;
  const e = jt(), t = gn();
  let r = class {
    constructor(i = new e.DataFactory()) {
      this.lastId = 0, this.dictionary = /* @__PURE__ */ new Map(), this.reverseDictionary = /* @__PURE__ */ new Map(), this.features = { quotedTriples: !1 }, this.dataFactory = i;
    }
    encode(i) {
      const s = (0, t.termToString)(i);
      let o = this.dictionary.get(s);
      return o === void 0 && (o = this.lastId++, this.dictionary.set(s, o), this.reverseDictionary.set(o, s)), o;
    }
    encodeOptional(i) {
      const s = (0, t.termToString)(i);
      return this.dictionary.get(s);
    }
    decode(i) {
      const s = this.reverseDictionary.get(i);
      if (s === void 0)
        throw new Error(`The value ${i} is not present in this dictionary`);
      return (0, t.stringToTerm)(s, this.dataFactory);
    }
    encodings() {
      return this.reverseDictionary.keys();
    }
    findQuotedTriples(i) {
      throw new Error("findQuotedTriples is not supported");
    }
    findQuotedTriplesEncoded(i) {
      throw new Error("findQuotedTriplesEncoded is not supported");
    }
  };
  return $n.TermDictionaryNumberMap = r, $n;
}
var Vn = {}, Gl;
function bp() {
  if (Gl) return Vn;
  Gl = 1, Object.defineProperty(Vn, "__esModule", { value: !0 }), Vn.TermDictionaryNumberRecord = void 0;
  const e = jt(), t = gn();
  let r = class {
    constructor(i = new e.DataFactory()) {
      this.lastId = 0, this.dictionary = {}, this.reverseDictionary = {}, this.features = { quotedTriples: !1 }, this.dataFactory = i;
    }
    encode(i) {
      const s = (0, t.termToString)(i);
      let o = this.dictionary[s];
      return o === void 0 && (o = this.lastId++, this.dictionary[s] = o, this.reverseDictionary[o] = s), o;
    }
    encodeOptional(i) {
      const s = (0, t.termToString)(i);
      return this.dictionary[s];
    }
    decode(i) {
      const s = this.reverseDictionary[i];
      if (s === void 0)
        throw new Error(`The value ${i} is not present in this dictionary`);
      return (0, t.stringToTerm)(s, this.dataFactory);
    }
    *encodings() {
      for (const i of Object.keys(this.reverseDictionary))
        yield Number.parseInt(i, 10);
    }
    findQuotedTriples(i) {
      throw new Error("findQuotedTriples is not supported");
    }
    findQuotedTriplesEncoded(i) {
      throw new Error("findQuotedTriplesEncoded is not supported");
    }
  };
  return Vn.TermDictionaryNumberRecord = r, Vn;
}
var Qn = {}, zl;
function Tp() {
  if (zl) return Qn;
  zl = 1, Object.defineProperty(Qn, "__esModule", { value: !0 }), Qn.TermDictionaryQuoted = void 0;
  const e = jt(), t = $s();
  let r = class xr {
    constructor(i, s, o = new e.DataFactory()) {
      this.features = { quotedTriples: !0 }, this.plainTermDictionary = i, this.quotedTriplesDictionary = s, this.dataFactory = o;
    }
    encode(i) {
      return i.termType === "Quad" ? xr.BITMASK | 1 + this.quotedTriplesDictionary.encode(i) : this.plainTermDictionary.encode(i);
    }
    encodeOptional(i) {
      if (i.termType === "Quad") {
        const s = this.quotedTriplesDictionary.encodeOptional(i);
        return s === void 0 ? s : xr.BITMASK | 1 + s;
      }
      return this.plainTermDictionary.encodeOptional(i);
    }
    decode(i) {
      if (xr.BITMASK & i) {
        const s = (~xr.BITMASK & i) - 1;
        return this.quotedTriplesDictionary.decode(s);
      }
      return this.plainTermDictionary.decode(i);
    }
    *encodings() {
      for (const i of this.plainTermDictionary.encodings())
        yield i;
      for (const i of this.quotedTriplesDictionary.encodings())
        yield xr.BITMASK | 1 + i;
    }
    *findQuotedTriples(i) {
      for (const s of this.findQuotedTriplesEncoded(i))
        yield this.decode(s);
    }
    *findQuotedTriplesEncoded(i) {
      for (let s of this.quotedTriplesDictionary.encodings()) {
        s = xr.BITMASK | 1 + s;
        const o = this.decode(s);
        (0, t.matchPattern)(o, i.subject, i.predicate, i.object, i.graph) && (yield s);
      }
    }
  };
  return Qn.TermDictionaryQuoted = r, r.BITMASK = 1 << 31, Qn;
}
var Hn = {}, Yl;
function Sp() {
  if (Yl) return Hn;
  Yl = 1, Object.defineProperty(Hn, "__esModule", { value: !0 }), Hn.TermDictionaryQuotedReferential = void 0;
  const e = jt(), t = $s(), r = Ft();
  let n = class Ht {
    constructor(s, o = new e.DataFactory()) {
      this.quotedTriplesDictionary = [], this.quotedTriplesReverseDictionary = {}, this.features = { quotedTriples: !0 }, this.plainTermDictionary = s, this.dataFactory = o;
    }
    encode(s) {
      return s.termType === "Quad" ? this.encodeQuotedTriple(s, !1) : this.plainTermDictionary.encode(s);
    }
    encodeQuotedTriple(s, o) {
      var c;
      if (s.graph.termType !== "DefaultGraph")
        throw new Error("Encoding of quoted quads outside of the default graph is not allowed");
      const a = (c = (0, r.encodeOptionalTerms)([s.subject, s.predicate, s.object, void 0], this)) == null ? void 0 : c.slice(0, 3), l = a && a.every((g) => g !== void 0) ? this.quotedTriplesReverseDictionary[a.join(Ht.SEPARATOR)] : void 0;
      if (l !== void 0 || o)
        return l === void 0 ? void 0 : Ht.BITMASK | l;
      const d = [
        this.encode(s.subject),
        this.encode(s.predicate),
        this.encode(s.object)
      ], p = this.quotedTriplesDictionary.length + 1;
      return this.quotedTriplesDictionary.push(d), this.quotedTriplesReverseDictionary[d.join(Ht.SEPARATOR)] = p, Ht.BITMASK | p;
    }
    encodeOptional(s) {
      return s.termType === "Quad" ? this.encodeQuotedTriple(s, !0) : this.plainTermDictionary.encodeOptional(s);
    }
    decode(s) {
      if (Ht.BITMASK & s) {
        const o = (~Ht.BITMASK & s) - 1;
        if (o >= this.quotedTriplesDictionary.length)
          throw new Error(`The value ${s} is not present in the quoted triples range of the dictionary`);
        const a = this.quotedTriplesDictionary[o];
        return this.dataFactory.quad(this.decode(a[0]), this.decode(a[1]), this.decode(a[2]));
      }
      return this.plainTermDictionary.decode(s);
    }
    *encodings() {
      for (const s of this.plainTermDictionary.encodings())
        yield s;
      for (const s of this.quotedTriplesDictionary.keys())
        yield Ht.BITMASK | 1 + s;
    }
    *findQuotedTriples(s) {
      for (const o of this.findQuotedTriplesEncoded(s))
        yield this.decode(o);
    }
    *findQuotedTriplesEncoded(s) {
      for (let o of this.quotedTriplesDictionary.keys()) {
        o = Ht.BITMASK | 1 + o;
        const a = this.decode(o);
        (0, t.matchPattern)(a, s.subject, s.predicate, s.object, s.graph) && (yield o);
      }
    }
  };
  return Hn.TermDictionaryQuotedReferential = n, n.BITMASK = 1 << 31, n.SEPARATOR = "_", Hn;
}
var qn = {}, Xl;
function vp() {
  if (Xl) return qn;
  Xl = 1, Object.defineProperty(qn, "__esModule", { value: !0 }), qn.TermDictionarySymbol = void 0;
  const e = jt(), t = gn();
  let r = class {
    constructor(i = new e.DataFactory()) {
      this.features = { quotedTriples: !1 }, this.dataFactory = i;
    }
    encode(i) {
      return Symbol.for(`rdf::${(0, t.termToString)(i)}`);
    }
    encodeOptional(i) {
      return this.encode(i);
    }
    decode(i) {
      const s = Symbol.keyFor(i);
      if (s === void 0)
        throw new Error(`The value ${String(i)} is not present in this dictionary`);
      return (0, t.stringToTerm)(s.slice(5), this.dataFactory);
    }
    encodings() {
      throw new Error("encodings is not supported");
    }
    findQuotedTriples(i) {
      throw new Error("findQuotedTriples is not supported");
    }
    findQuotedTriplesEncoded(i) {
      throw new Error("findQuotedTriplesEncoded is not supported");
    }
  };
  return qn.TermDictionarySymbol = r, qn;
}
var So = {}, Jl;
function Ep() {
  return Jl || (Jl = 1, Object.defineProperty(So, "__esModule", { value: !0 })), So;
}
var Kn = {}, Zl;
function ju() {
  if (Zl) return Kn;
  Zl = 1, Object.defineProperty(Kn, "__esModule", { value: !0 }), Kn.RdfStoreIndexNestedMapRecursive = void 0;
  const e = Ft();
  let t = class {
    constructor(n) {
      this.features = {
        quotedTripleFiltering: !1
      }, this.dictionary = n.dictionary, this.nestedMap = /* @__PURE__ */ new Map();
    }
    set(n, i) {
      let s = this.nestedMap, o = !1;
      for (const [a, l] of n.entries()) {
        const d = s;
        let p = d.get(l);
        p ? a === n.length - 1 && (o = !0) : (p = a === n.length - 1 ? i : /* @__PURE__ */ new Map(), d.set(l, p)), s = p;
      }
      return !o;
    }
    remove(n) {
      const i = this.nestedMap, s = i.get(n[0]);
      if (!s)
        return !1;
      const o = s.get(n[1]);
      if (!o)
        return !1;
      const a = o.get(n[2]);
      if (!a)
        return !1;
      const l = a.delete(n[3]);
      return l && a.size === 0 && (o.delete(n[2]), o.size === 0 && (s.delete(n[1]), s.size === 0 && i.delete(n[0]))), l;
    }
    get(n) {
      const i = (0, e.encodeOptionalTerms)(n, this.dictionary);
      if (!(!i || i.includes(void 0)))
        return this.getEncoded(i);
    }
    getEncoded(n) {
      const i = this.nestedMap.get(n[0]);
      if (!i)
        return;
      const s = i.get(n[1]);
      if (!s)
        return;
      const o = s.get(n[2]);
      if (o)
        return o.get(n[3]);
    }
    *find(n) {
      const i = (0, e.encodeOptionalTerms)(n, this.dictionary);
      if (i)
        for (const s of this.findEncoded(i, n))
          yield [
            i[0] !== void 0 ? n[0] : this.dictionary.decode(s[0]),
            i[1] !== void 0 ? n[1] : this.dictionary.decode(s[1]),
            i[2] !== void 0 ? n[2] : this.dictionary.decode(s[2]),
            i[3] !== void 0 ? n[3] : this.dictionary.decode(s[3])
          ];
    }
    *findEncoded(n, i) {
      return yield* this.findEncodedInner(0, n, i, this.nestedMap, []);
    }
    *findEncodedInner(n, i, s, o, a) {
      if (n === i.length)
        yield [...a];
      else {
        const l = i[n];
        if (s[n]) {
          const p = l, c = o.get(p);
          c && (a[n] = l, yield* this.findEncodedInner(n + 1, i, s, c, a));
        } else
          for (const [p, c] of o.entries())
            a[n] = p, yield* this.findEncodedInner(n + 1, i, s, c, a);
      }
    }
    *findTermsInner(n, i, s, o) {
      if (s[n])
        for (const [a, l] of i.entries()) {
          const d = [...o, a];
          yield* this.findTermsInner(n + 1, l, s, d);
        }
      else if (n < s.length)
        for (const a of i.values())
          yield* this.findTermsInner(n + 1, a, s, o);
      else
        yield o;
    }
    findTerms(n) {
      return this.findTermsInner(0, this.nestedMap, n, []);
    }
    count(n) {
      return this.countInner(0, n, this.nestedMap);
    }
    countInner(n, i, s) {
      const o = i[n];
      let a = 0;
      if (o) {
        const l = this.dictionary.encodeOptional(o);
        if (l !== void 0) {
          if (n === i.length - 1)
            return s.has(l) ? 1 : 0;
          const d = s.get(l);
          d && (a += this.countInner(n + 1, i, d));
        }
      } else {
        if (n === i.length - 1)
          return s.size;
        for (const l of s.values())
          a += this.countInner(n + 1, i, l);
      }
      return a;
    }
    countTermsInner(n, i, s) {
      if (n === s.length - 1)
        return i.size;
      let o = 0;
      for (const a of i.values())
        o += this.countTermsInner(n + 1, a, s);
      return o;
    }
    countTerms(n) {
      return this.countTermsInner(0, this.nestedMap, n);
    }
  };
  return Kn.RdfStoreIndexNestedMapRecursive = t, Kn;
}
var Wn = {}, ec;
function Ip() {
  if (ec) return Wn;
  ec = 1, Object.defineProperty(Wn, "__esModule", { value: !0 }), Wn.RdfStoreIndexNestedMapRecursiveQuoted = void 0;
  const e = Ft(), t = ju();
  let r = class extends t.RdfStoreIndexNestedMapRecursive {
    constructor(i) {
      super(i), this.features = {
        quotedTripleFiltering: !0
      };
    }
    *findEncoded(i, s) {
      return yield* this.findEncodedInnerQuoted(0, i, s, (0, e.arePatternsQuoted)(s), this.nestedMap, []);
    }
    *findEncodedInnerQuoted(i, s, o, a, l, d) {
      if (i === s.length)
        yield [...d];
      else {
        const p = s[i], c = o[i];
        if (c)
          if (a[i]) {
            const g = this.dictionary.findQuotedTriplesEncoded(c);
            for (const _ of g) {
              const S = l.get(_);
              S && (d[i] = _, yield* this.findEncodedInnerQuoted(i + 1, s, o, a, S, d));
            }
          } else {
            const g = p, _ = l.get(g);
            _ && (d[i] = p, yield* this.findEncodedInnerQuoted(i + 1, s, o, a, _, d));
          }
        else for (const [g, _] of l.entries())
          d[i] = g, yield* this.findEncodedInnerQuoted(i + 1, s, o, a, _, d);
      }
    }
    countInner(i, s, o) {
      const a = s[i];
      let l = 0;
      if (a)
        if (a.termType === "Quad" && (0, e.quadHasVariables)(a)) {
          const d = this.dictionary.findQuotedTriplesEncoded(a);
          for (const p of d)
            if (i === s.length - 1)
              o.has(p) && l++;
            else {
              const c = o.get(p);
              c && (l += this.countInner(i + 1, s, c));
            }
        } else {
          const d = this.dictionary.encodeOptional(a);
          if (d !== void 0) {
            if (i === s.length - 1)
              return o.has(d) ? 1 : 0;
            const p = o.get(d);
            p && (l += this.countInner(i + 1, s, p));
          }
        }
      else {
        if (i === s.length - 1)
          return o.size;
        for (const d of o.values())
          l += this.countInner(i + 1, s, d);
      }
      return l;
    }
  };
  return Wn.RdfStoreIndexNestedMapRecursiveQuoted = r, Wn;
}
var Gn = {}, tc;
function Fu() {
  if (tc) return Gn;
  tc = 1, Object.defineProperty(Gn, "__esModule", { value: !0 }), Gn.RdfStoreIndexNestedRecord = void 0;
  const e = Ft();
  let t = class {
    constructor(n) {
      this.features = {
        quotedTripleFiltering: !1
      }, this.dictionary = n.dictionary, this.nestedRecords = {};
    }
    set(n, i) {
      const s = this.nestedRecords, o = s[n[0]] || (s[n[0]] = {}), a = o[n[1]] || (o[n[1]] = {}), l = a[n[2]] || (a[n[2]] = {});
      return l[n[3]] ? !1 : (l[n[3]] = i, !0);
    }
    remove(n) {
      const i = this.nestedRecords, s = i[n[0]];
      if (!s)
        return !1;
      const o = s[n[1]];
      if (!o)
        return !1;
      const a = o[n[2]];
      return !a || !a[n[3]] ? !1 : (delete a[n[3]], Object.keys(a).length === 0 && (delete o[n[2]], Object.keys(o).length === 0 && (delete s[n[1]], Object.keys(s).length === 0 && delete i[n[0]])), !0);
    }
    get(n) {
      const i = (0, e.encodeOptionalTerms)(n, this.dictionary);
      if (!(!i || i.includes(void 0)))
        return this.getEncoded(i);
    }
    getEncoded(n) {
      var i, s, o;
      return (o = (s = (i = this.nestedRecords[n[0]]) == null ? void 0 : i[n[1]]) == null ? void 0 : s[n[2]]) == null ? void 0 : o[n[3]];
    }
    *find(n) {
      const i = (0, e.encodeOptionalTerms)(n, this.dictionary);
      if (!i)
        return;
      const [s, o, a, l] = i, [d, p, c, g] = n;
      let _, S, w, L, j, R, x;
      const T = this.nestedRecords, v = s !== void 0 ? s in T ? [s] : [] : Object.keys(T);
      for (const C of v) {
        j = T[C], _ = d || this.dictionary.decode(Number.parseInt(C, 10));
        const D = o !== void 0 ? o in j ? [o] : [] : Object.keys(j);
        for (const F of D) {
          R = j[F], S = p || this.dictionary.decode(Number.parseInt(F, 10));
          const y = a !== void 0 ? a in R ? [a] : [] : Object.keys(R);
          for (const E of y) {
            x = R[E], w = c || this.dictionary.decode(Number.parseInt(E, 10));
            const O = l !== void 0 ? l in x ? [l] : [] : Object.keys(x);
            for (const A of O)
              L = g || this.dictionary.decode(Number.parseInt(A, 10)), yield [_, S, w, L];
          }
        }
      }
    }
    // The code below is nearly identical. We duplicate because abstraction would result in a significant performance hit.
    *findEncoded(n, i) {
      const [s, o, a, l] = n;
      let d, p, c;
      const g = this.nestedRecords, _ = s !== void 0 ? s in g ? [s] : [] : Object.keys(g);
      for (const S of _) {
        d = g[S];
        const w = o !== void 0 ? o in d ? [o] : [] : Object.keys(d);
        for (const L of w) {
          p = d[L];
          const j = a !== void 0 ? a in p ? [a] : [] : Object.keys(p);
          for (const R of j) {
            c = p[R];
            const x = l !== void 0 ? l in c ? [l] : [] : Object.keys(c);
            for (const T of x)
              yield [
                Number.parseInt(S, 10),
                Number.parseInt(L, 10),
                Number.parseInt(R, 10),
                Number.parseInt(T, 10)
              ];
          }
        }
      }
    }
    *findTermsInner(n, i, s, o) {
      if (s[n])
        for (const [a, l] of Object.entries(i)) {
          const d = [...o, Number.parseInt(a, 10)];
          yield* this.findTermsInner(n + 1, l, s, d);
        }
      else if (n < s.length)
        for (const a of Object.values(i))
          yield* this.findTermsInner(n + 1, a, s, o);
      else
        yield o;
    }
    findTerms(n) {
      return this.findTermsInner(0, this.nestedRecords, n, []);
    }
    count(n) {
      let i = 0;
      const s = (0, e.encodeOptionalTerms)(n, this.dictionary);
      if (!s)
        return 0;
      const o = s[0], a = s[1], l = s[2], d = s[3];
      let p, c, g;
      const _ = this.nestedRecords, S = o !== void 0 ? o in _ ? [o] : [] : Object.keys(_);
      for (const w of S) {
        p = _[w];
        const L = a !== void 0 ? a in p ? [a] : [] : Object.keys(p);
        for (const j of L) {
          c = p[j];
          const R = l !== void 0 ? l in c ? [l] : [] : Object.keys(c);
          for (const x of R)
            g = c[x], d !== void 0 ? d in g && i++ : i += Object.keys(g).length;
        }
      }
      return i;
    }
    countTermsInner(n, i, s) {
      if (n === s.length - 1)
        return Object.keys(i).length;
      let o = 0;
      for (const a of Object.values(i))
        o += this.countTermsInner(n + 1, a, s);
      return o;
    }
    countTerms(n) {
      return this.countTermsInner(0, this.nestedRecords, n);
    }
  };
  return Gn.RdfStoreIndexNestedRecord = t, Gn;
}
var zn = {}, rc;
function wp() {
  if (rc) return zn;
  rc = 1, Object.defineProperty(zn, "__esModule", { value: !0 }), zn.RdfStoreIndexNestedRecordQuoted = void 0;
  const e = Ft(), t = Fu();
  let r = class extends t.RdfStoreIndexNestedRecord {
    constructor(i) {
      super(i), this.features = {
        quotedTripleFiltering: !0
      };
    }
    *getQuotedPatternKeys(i, s) {
      for (const o of this.dictionary.findQuotedTriplesEncoded(s))
        o in i && (yield o);
    }
    *find(i) {
      const s = (0, e.encodeOptionalTerms)(i, this.dictionary);
      if (!s)
        return;
      const [o, a, l, d] = s, [p, c, g, _] = i, [S, w, L, j] = (0, e.arePatternsQuoted)(i);
      let R, x, T, v, C, D, F;
      const y = this.nestedRecords, E = p !== void 0 ? S ? this.getQuotedPatternKeys(y, p) : o in y ? [o] : [] : Object.keys(y);
      for (const O of E) {
        C = y[O], R = !S && p ? p : this.dictionary.decode(Number.parseInt(O, 10));
        const A = c !== void 0 ? w ? this.getQuotedPatternKeys(C, c) : a in C ? [a] : [] : Object.keys(C);
        for (const $ of A) {
          D = C[$], x = !w && c ? c : this.dictionary.decode(Number.parseInt($, 10));
          const Y = g !== void 0 ? L ? this.getQuotedPatternKeys(D, g) : l in D ? [l] : [] : Object.keys(D);
          for (const X of Y) {
            F = D[X], T = !L && g ? g : this.dictionary.decode(Number.parseInt(X, 10));
            const W = _ !== void 0 ? j ? this.getQuotedPatternKeys(F, _) : d in F ? [d] : [] : Object.keys(F);
            for (const te of W)
              v = !j && _ ? _ : this.dictionary.decode(Number.parseInt(te, 10)), yield [R, x, T, v];
          }
        }
      }
    }
    // The code below is nearly identical. We duplicate because abstraction would result in a significant performance hit.
    *findEncoded(i, s) {
      const [o, a, l, d] = i, [p, c, g, _] = s, [S, w, L, j] = (0, e.arePatternsQuoted)(s);
      let R, x, T;
      const v = this.nestedRecords, C = p !== void 0 ? S ? this.getQuotedPatternKeys(v, p) : o in v ? [o] : [] : Object.keys(v);
      for (const D of C) {
        R = v[D];
        const F = c !== void 0 ? w ? this.getQuotedPatternKeys(R, c) : a in R ? [a] : [] : Object.keys(R);
        for (const y of F) {
          x = R[y];
          const E = g !== void 0 ? L ? this.getQuotedPatternKeys(x, g) : l in x ? [l] : [] : Object.keys(x);
          for (const O of E) {
            T = x[O];
            const A = _ !== void 0 ? j ? this.getQuotedPatternKeys(T, _) : d in T ? [d] : [] : Object.keys(T);
            for (const $ of A)
              yield [
                Number.parseInt(D, 10),
                Number.parseInt(y, 10),
                Number.parseInt(O, 10),
                Number.parseInt($, 10)
              ];
          }
        }
      }
    }
    count(i) {
      let s = 0;
      const o = (0, e.encodeOptionalTerms)(i, this.dictionary);
      if (!o)
        return 0;
      const [a, l, d, p] = o, [c, g, _, S] = i, [w, L, j, R] = (0, e.arePatternsQuoted)(i);
      let x, T, v;
      const C = this.nestedRecords, D = c !== void 0 ? w ? this.getQuotedPatternKeys(C, c) : a in C ? [a] : [] : Object.keys(C);
      for (const F of D) {
        x = C[F];
        const y = g !== void 0 ? L ? this.getQuotedPatternKeys(x, g) : l in x ? [l] : [] : Object.keys(x);
        for (const E of y) {
          T = x[E];
          const O = _ !== void 0 ? j ? this.getQuotedPatternKeys(T, _) : d in T ? [d] : [] : Object.keys(T);
          for (const A of O)
            v = T[A], S !== void 0 ? R ? s += [...this.getQuotedPatternKeys(v, S)].length : p in v && s++ : s += Object.keys(v).length;
        }
      }
      return s;
    }
  };
  return zn.RdfStoreIndexNestedRecordQuoted = r, zn;
}
var vo = {}, nc;
function xp() {
  return nc || (nc = 1, Object.defineProperty(vo, "__esModule", { value: !0 })), vo;
}
var Eo = {}, ic;
function Np() {
  return ic || (ic = 1, Object.defineProperty(Eo, "__esModule", { value: !0 })), Eo;
}
var sc;
function Rp() {
  return sc || (sc = 1, (function(e) {
    var t = Tr && Tr.__createBinding || (Object.create ? (function(n, i, s, o) {
      o === void 0 && (o = s);
      var a = Object.getOwnPropertyDescriptor(i, s);
      (!a || ("get" in a ? !i.__esModule : a.writable || a.configurable)) && (a = { enumerable: !0, get: function() {
        return i[s];
      } }), Object.defineProperty(n, o, a);
    }) : (function(n, i, s, o) {
      o === void 0 && (o = s), n[o] = i[s];
    })), r = Tr && Tr.__exportStar || function(n, i) {
      for (var s in n) s !== "default" && !Object.prototype.hasOwnProperty.call(i, s) && t(i, n, s);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(ku(), e), r(_p(), e), r(yp(), e), r(bp(), e), r(Ou(), e), r(Tp(), e), r(Pu(), e), r(Sp(), e), r(vp(), e), r(Ep(), e), r(ya(), e), r(Mu(), e), r(ju(), e), r(Ip(), e), r(Fu(), e), r(wp(), e), r(xp(), e), r(Ft(), e), r(Np(), e), r(Du(), e);
  })(Tr)), Tr;
}
var Ap = Rp();
const { QueryEngine: Bo } = window.ComunicaShacl || {};
function Bu(e) {
  return e.split(`
`).filter((t) => /^\s*PREFIX\s+/i.test(t)).join(`
`);
}
function Cp(e) {
  const t = {};
  for (const r of e.split(`
`)) {
    const n = r.match(/PREFIX\s+(\S*):\s*<([^>]+)>/i);
    n && (t[n[1] || ""] = n[2]);
  }
  return t;
}
let Uu = null;
function $u(e) {
  return [];
}
async function Op({ shaclQuery: e, turtleData: t }, r) {
  if (!Bo) throw new Error("Engine bundle not loaded. Ensure engine-browser.js is loaded before app.bundle.js.");
  const n = new Bo(), i = Ap.RdfStore.createDefault();
  if (t && t.trim()) {
    const o = Bu(e), a = new Eu();
    i.addQuads(a.parse(o + `
` + t));
  }
  const s = await n.queryQuads(e, {
    sources: [i],
    destination: i,
    queryFormat: { language: "shacl", version: "1.2" }
  });
  return new Promise((o, a) => {
    s.on("data", (l) => r({
      subject: l.subject.value,
      predicate: l.predicate.value,
      object: l.object.value,
      graph: l.graph.value || ""
    })), s.on("error", a), s.on("end", () => {
      Uu = i, o();
    });
  });
}
function Pp(e, t) {
  const r = e.indexOf(":");
  if (r === -1) {
    const s = t[""] || "";
    return s ? s + e : e;
  }
  const n = e.slice(0, r), i = e.slice(r + 1);
  return (t[n] || "") + i;
}
function Mp(e, t, r) {
  const n = e.split(".").map((i) => i.trim()).filter(Boolean);
  for (const i of n) {
    const s = i.split(/\s+/).filter(Boolean);
    if (s.length !== 3) continue;
    const [o, a, l] = s.map((p) => Pp(p, r));
    if (a !== t.predicate) continue;
    const d = {};
    if (!(!o.startsWith("?") && o !== t.subject) && !(!l.startsWith("?") && l !== t.object))
      return o.startsWith("?") && (d[o.slice(1)] = t.subject), l.startsWith("?") && (d[l.slice(1)] = t.object), d;
  }
  return null;
}
async function Dp(e, t) {
  if (!Uu || !Bo) return [];
  const r = $u(), n = Cp(Bu(e) || ""), i = [];
  for (const s of r) {
    const o = Mp(s.head, t, n);
    o && i.push({ ruleIndex: s.index, ruleHead: s.head, ruleBody: s.body, bindings: o, bindingRows: [] });
  }
  return i;
}
typeof window < "u" && (window.ShaclEngine = { runShaclQuery: Op, explainTriple: Dp, parseRules: $u });
/**
* @vue/shared v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function et(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const r of e.split(",")) t[r] = 1;
  return (r) => r in t;
}
const de = {}, Jr = [], Qe = () => {
}, Yr = () => !1, $r = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Vs = (e) => e.startsWith("onUpdate:"), fe = Object.assign, ba = (e, t) => {
  const r = e.indexOf(t);
  r > -1 && e.splice(r, 1);
}, Lp = Object.prototype.hasOwnProperty, Te = (e, t) => Lp.call(e, t), Z = Array.isArray, Zr = (e) => _n(e) === "[object Map]", Vr = (e) => _n(e) === "[object Set]", oc = (e) => _n(e) === "[object Date]", kp = (e) => _n(e) === "[object RegExp]", oe = (e) => typeof e == "function", ae = (e) => typeof e == "string", Ze = (e) => typeof e == "symbol", ye = (e) => e !== null && typeof e == "object", Ta = (e) => (ye(e) || oe(e)) && oe(e.then) && oe(e.catch), Vu = Object.prototype.toString, _n = (e) => Vu.call(e), jp = (e) => _n(e).slice(8, -1), Qs = (e) => _n(e) === "[object Object]", Hs = (e) => ae(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Xt = /* @__PURE__ */ et(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Fp = /* @__PURE__ */ et(
  "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
), qs = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((r) => t[r] || (t[r] = e(r)));
}, Bp = /-\w/g, we = qs(
  (e) => e.replace(Bp, (t) => t.slice(1).toUpperCase())
), Up = /\B([A-Z])/g, nt = qs(
  (e) => e.replace(Up, "-$1").toLowerCase()
), Qr = qs((e) => e.charAt(0).toUpperCase() + e.slice(1)), en = qs(
  (e) => e ? `on${Qr(e)}` : ""
), Ve = (e, t) => !Object.is(e, t), tn = (e, ...t) => {
  for (let r = 0; r < e.length; r++)
    e[r](...t);
}, an = (e, t, r, n = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: n,
    value: r
  });
}, Ks = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, ds = (e) => {
  const t = ae(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let ac;
const Pr = () => ac || (ac = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function $p(e, t) {
  return e + JSON.stringify(
    t,
    (r, n) => typeof n == "function" ? n.toString() : n
  );
}
const Vp = "Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console,Error,Symbol", Qp = /* @__PURE__ */ et(Vp);
function yn(e) {
  if (Z(e)) {
    const t = {};
    for (let r = 0; r < e.length; r++) {
      const n = e[r], i = ae(n) ? Qu(n) : yn(n);
      if (i)
        for (const s in i)
          t[s] = i[s];
    }
    return t;
  } else if (ae(e) || ye(e))
    return e;
}
const Hp = /;(?![^(]*\))/g, qp = /:([^]+)/, Kp = /\/\*[^]*?\*\//g;
function Qu(e) {
  const t = {};
  return e.replace(Kp, "").split(Hp).forEach((r) => {
    if (r) {
      const n = r.split(qp);
      n.length > 1 && (t[n[0].trim()] = n[1].trim());
    }
  }), t;
}
function Wp(e) {
  if (!e) return "";
  if (ae(e)) return e;
  let t = "";
  for (const r in e) {
    const n = e[r];
    if (ae(n) || typeof n == "number") {
      const i = r.startsWith("--") ? r : nt(r);
      t += `${i}:${n};`;
    }
  }
  return t;
}
function bn(e) {
  let t = "";
  if (ae(e))
    t = e;
  else if (Z(e))
    for (let r = 0; r < e.length; r++) {
      const n = bn(e[r]);
      n && (t += n + " ");
    }
  else if (ye(e))
    for (const r in e)
      e[r] && (t += r + " ");
  return t.trim();
}
function Gp(e) {
  if (!e) return null;
  let { class: t, style: r } = e;
  return t && !ae(t) && (e.class = bn(t)), r && (e.style = yn(r)), e;
}
const zp = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot", Yp = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view", Xp = "annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics", Jp = "area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr", Zp = /* @__PURE__ */ et(zp), em = /* @__PURE__ */ et(Yp), tm = /* @__PURE__ */ et(Xp), rm = /* @__PURE__ */ et(Jp), Hu = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", nm = /* @__PURE__ */ et(Hu), lc = /* @__PURE__ */ et(
  Hu + ",async,autofocus,autoplay,controls,default,defer,disabled,hidden,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected"
);
function Sa(e) {
  return !!e || e === "";
}
const im = /* @__PURE__ */ et(
  "accept,accept-charset,accesskey,action,align,allow,alt,async,autocapitalize,autocomplete,autofocus,autoplay,background,bgcolor,border,buffered,capture,challenge,charset,checked,cite,class,code,codebase,color,cols,colspan,content,contenteditable,contextmenu,controls,coords,crossorigin,csp,data,datetime,decoding,default,defer,dir,dirname,disabled,download,draggable,dropzone,enctype,enterkeyhint,for,form,formaction,formenctype,formmethod,formnovalidate,formtarget,headers,height,hidden,high,href,hreflang,http-equiv,icon,id,importance,inert,integrity,ismap,itemprop,keytype,kind,label,lang,language,loading,list,loop,low,manifest,max,maxlength,minlength,media,min,multiple,muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,preload,radiogroup,readonly,referrerpolicy,rel,required,reversed,rows,rowspan,sandbox,scope,scoped,selected,shape,size,sizes,slot,span,spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,target,title,translate,type,usemap,value,width,wrap"
), sm = /* @__PURE__ */ et(
  "xmlns,accent-height,accumulate,additive,alignment-baseline,alphabetic,amplitude,arabic-form,ascent,attributeName,attributeType,azimuth,baseFrequency,baseline-shift,baseProfile,bbox,begin,bias,by,calcMode,cap-height,class,clip,clipPathUnits,clip-path,clip-rule,color,color-interpolation,color-interpolation-filters,color-profile,color-rendering,contentScriptType,contentStyleType,crossorigin,cursor,cx,cy,d,decelerate,descent,diffuseConstant,direction,display,divisor,dominant-baseline,dur,dx,dy,edgeMode,elevation,enable-background,end,exponent,fill,fill-opacity,fill-rule,filter,filterRes,filterUnits,flood-color,flood-opacity,font-family,font-size,font-size-adjust,font-stretch,font-style,font-variant,font-weight,format,from,fr,fx,fy,g1,g2,glyph-name,glyph-orientation-horizontal,glyph-orientation-vertical,glyphRef,gradientTransform,gradientUnits,hanging,height,href,hreflang,horiz-adv-x,horiz-origin-x,id,ideographic,image-rendering,in,in2,intercept,k,k1,k2,k3,k4,kernelMatrix,kernelUnitLength,kerning,keyPoints,keySplines,keyTimes,lang,lengthAdjust,letter-spacing,lighting-color,limitingConeAngle,local,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mask,maskContentUnits,maskUnits,mathematical,max,media,method,min,mode,name,numOctaves,offset,opacity,operator,order,orient,orientation,origin,overflow,overline-position,overline-thickness,panose-1,paint-order,path,pathLength,patternContentUnits,patternTransform,patternUnits,ping,pointer-events,points,pointsAtX,pointsAtY,pointsAtZ,preserveAlpha,preserveAspectRatio,primitiveUnits,r,radius,referrerPolicy,refX,refY,rel,rendering-intent,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,result,rotate,rx,ry,scale,seed,shape-rendering,slope,spacing,specularConstant,specularExponent,speed,spreadMethod,startOffset,stdDeviation,stemh,stemv,stitchTiles,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,string,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,style,surfaceScale,systemLanguage,tabindex,tableValues,target,targetX,targetY,text-anchor,text-decoration,text-rendering,textLength,to,transform,transform-origin,type,u1,u2,underline-position,underline-thickness,unicode,unicode-bidi,unicode-range,units-per-em,v-alphabetic,v-hanging,v-ideographic,v-mathematical,values,vector-effect,version,vert-adv-y,vert-origin-x,vert-origin-y,viewBox,viewTarget,visibility,width,widths,word-spacing,writing-mode,x,x-height,x1,x2,xChannelSelector,xlink:actuate,xlink:arcrole,xlink:href,xlink:role,xlink:show,xlink:title,xlink:type,xmlns:xlink,xml:base,xml:lang,xml:space,y,y1,y2,yChannelSelector,z,zoomAndPan"
);
function om(e) {
  if (e == null)
    return !1;
  const t = typeof e;
  return t === "string" || t === "number" || t === "boolean";
}
const am = /[ !"#$%&'()*+,./:;<=>?@[\\\]^`{|}~]/g;
function lm(e, t) {
  return e.replace(
    am,
    (r) => `\\${r}`
  );
}
function cm(e, t) {
  if (e.length !== t.length) return !1;
  let r = !0;
  for (let n = 0; r && n < e.length; n++)
    r = rr(e[n], t[n]);
  return r;
}
function rr(e, t) {
  if (e === t) return !0;
  let r = oc(e), n = oc(t);
  if (r || n)
    return r && n ? e.getTime() === t.getTime() : !1;
  if (r = Ze(e), n = Ze(t), r || n)
    return e === t;
  if (r = Z(e), n = Z(t), r || n)
    return r && n ? cm(e, t) : !1;
  if (r = ye(e), n = ye(t), r || n) {
    if (!r || !n)
      return !1;
    const i = Object.keys(e).length, s = Object.keys(t).length;
    if (i !== s)
      return !1;
    for (const o in e) {
      const a = e.hasOwnProperty(o), l = t.hasOwnProperty(o);
      if (a && !l || !a && l || !rr(e[o], t[o]))
        return !1;
    }
  }
  return String(e) === String(t);
}
function Ws(e, t) {
  return e.findIndex((r) => rr(r, t));
}
const qu = (e) => !!(e && e.__v_isRef === !0), Ku = (e) => ae(e) ? e : e == null ? "" : Z(e) || ye(e) && (e.toString === Vu || !oe(e.toString)) ? qu(e) ? Ku(e.value) : JSON.stringify(e, Wu, 2) : String(e), Wu = (e, t) => qu(t) ? Wu(e, t.value) : Zr(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (r, [n, i], s) => (r[Io(n, s) + " =>"] = i, r),
    {}
  )
} : Vr(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((r) => Io(r))
} : Ze(t) ? Io(t) : ye(t) && !Z(t) && !Qs(t) ? String(t) : t, Io = (e, t = "") => {
  var r;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Ze(e) ? `Symbol(${(r = e.description) != null ? r : t})` : e
  );
};
function Gu(e) {
  return e == null ? "initial" : typeof e == "string" ? e === "" ? " " : e : String(e);
}
/**
* @vue/reactivity v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Be;
class va {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !t && Be && (Be.active ? (this.parent = Be, this.index = (Be.scopes || (Be.scopes = [])).push(
      this
    ) - 1) : (this._active = !1, this._warnOnRun = !1));
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, r;
      if (this.scopes)
        for (t = 0, r = this.scopes.length; t < r; t++)
          this.scopes[t].pause();
      for (t = 0, r = this.effects.length; t < r; t++)
        this.effects[t].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, r;
      if (this.scopes)
        for (t = 0, r = this.scopes.length; t < r; t++)
          this.scopes[t].resume();
      for (t = 0, r = this.effects.length; t < r; t++)
        this.effects[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const r = Be;
      try {
        return Be = this, t();
      } finally {
        Be = r;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = Be, Be = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (Be === this)
        Be = this.prevScope;
      else {
        let t = Be;
        for (; t; ) {
          if (t.prevScope === this) {
            t.prevScope = this.prevScope;
            break;
          }
          t = t.prevScope;
        }
      }
      this.prevScope = void 0;
    }
  }
  stop(t) {
    if (this._active) {
      this._active = !1;
      let r, n;
      for (r = 0, n = this.effects.length; r < n; r++)
        this.effects[r].stop();
      for (this.effects.length = 0, r = 0, n = this.cleanups.length; r < n; r++)
        this.cleanups[r]();
      if (this.cleanups.length = 0, this.scopes) {
        for (r = 0, n = this.scopes.length; r < n; r++)
          this.scopes[r].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const i = this.parent.scopes.pop();
        i && i !== this && (this.parent.scopes[this.index] = i, i.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function um(e) {
  return new va(e);
}
function zu() {
  return Be;
}
function fm(e, t = !1) {
  Be && Be.cleanups.push(e);
}
let xe;
const wo = /* @__PURE__ */ new WeakSet();
class _i {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Be && (Be.active ? Be.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, wo.has(this) && (wo.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Xu(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, cc(this), Ju(this);
    const t = xe, r = xt;
    xe = this, xt = !0;
    try {
      return this.fn();
    } finally {
      Zu(this), xe = t, xt = r, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        wa(t);
      this.deps = this.depsTail = void 0, cc(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? wo.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Uo(this) && this.run();
  }
  get dirty() {
    return Uo(this);
  }
}
let Yu = 0, ci, ui;
function Xu(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = ui, ui = e;
    return;
  }
  e.next = ci, ci = e;
}
function Ea() {
  Yu++;
}
function Ia() {
  if (--Yu > 0)
    return;
  if (ui) {
    let t = ui;
    for (ui = void 0; t; ) {
      const r = t.next;
      t.next = void 0, t.flags &= -9, t = r;
    }
  }
  let e;
  for (; ci; ) {
    let t = ci;
    for (ci = void 0; t; ) {
      const r = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (n) {
          e || (e = n);
        }
      t = r;
    }
  }
  if (e) throw e;
}
function Ju(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Zu(e) {
  let t, r = e.depsTail, n = r;
  for (; n; ) {
    const i = n.prevDep;
    n.version === -1 ? (n === r && (r = i), wa(n), dm(n)) : t = n, n.dep.activeLink = n.prevActiveLink, n.prevActiveLink = void 0, n = i;
  }
  e.deps = t, e.depsTail = r;
}
function Uo(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (ef(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function ef(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === yi) || (e.globalVersion = yi, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Uo(e))))
    return;
  e.flags |= 2;
  const t = e.dep, r = xe, n = xt;
  xe = e, xt = !0;
  try {
    Ju(e);
    const i = e.fn(e._value);
    (t.version === 0 || Ve(i, e._value)) && (e.flags |= 128, e._value = i, t.version++);
  } catch (i) {
    throw t.version++, i;
  } finally {
    xe = r, xt = n, Zu(e), e.flags &= -3;
  }
}
function wa(e, t = !1) {
  const { dep: r, prevSub: n, nextSub: i } = e;
  if (n && (n.nextSub = i, e.prevSub = void 0), i && (i.prevSub = n, e.nextSub = void 0), r.subs === e && (r.subs = n, !n && r.computed)) {
    r.computed.flags &= -5;
    for (let s = r.computed.deps; s; s = s.nextDep)
      wa(s, !0);
  }
  !t && !--r.sc && r.map && r.map.delete(r.key);
}
function dm(e) {
  const { prevDep: t, nextDep: r } = e;
  t && (t.nextDep = r, e.prevDep = void 0), r && (r.prevDep = t, e.nextDep = void 0);
}
function hm(e, t) {
  e.effect instanceof _i && (e = e.effect.fn);
  const r = new _i(e);
  t && fe(r, t);
  try {
    r.run();
  } catch (i) {
    throw r.stop(), i;
  }
  const n = r.run.bind(r);
  return n.effect = r, n;
}
function pm(e) {
  e.effect.stop();
}
let xt = !0;
const tf = [];
function Rt() {
  tf.push(xt), xt = !1;
}
function At() {
  const e = tf.pop();
  xt = e === void 0 ? !0 : e;
}
function cc(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const r = xe;
    xe = void 0;
    try {
      t();
    } finally {
      xe = r;
    }
  }
}
let yi = 0;
class mm {
  constructor(t, r) {
    this.sub = t, this.dep = r, this.version = r.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Gs {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!xe || !xt || xe === this.computed)
      return;
    let r = this.activeLink;
    if (r === void 0 || r.sub !== xe)
      r = this.activeLink = new mm(xe, this), xe.deps ? (r.prevDep = xe.depsTail, xe.depsTail.nextDep = r, xe.depsTail = r) : xe.deps = xe.depsTail = r, rf(r);
    else if (r.version === -1 && (r.version = this.version, r.nextDep)) {
      const n = r.nextDep;
      n.prevDep = r.prevDep, r.prevDep && (r.prevDep.nextDep = n), r.prevDep = xe.depsTail, r.nextDep = void 0, xe.depsTail.nextDep = r, xe.depsTail = r, xe.deps === r && (xe.deps = n);
    }
    return r;
  }
  trigger(t) {
    this.version++, yi++, this.notify(t);
  }
  notify(t) {
    Ea();
    try {
      for (let r = this.subs; r; r = r.prevSub)
        r.sub.notify() && r.sub.dep.notify();
    } finally {
      Ia();
    }
  }
}
function rf(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let n = t.deps; n; n = n.nextDep)
        rf(n);
    }
    const r = e.dep.subs;
    r !== e && (e.prevSub = r, r && (r.nextSub = e)), e.dep.subs = e;
  }
}
const hs = /* @__PURE__ */ new WeakMap(), Mr = /* @__PURE__ */ Symbol(
  ""
), $o = /* @__PURE__ */ Symbol(
  ""
), bi = /* @__PURE__ */ Symbol(
  ""
);
function Ye(e, t, r) {
  if (xt && xe) {
    let n = hs.get(e);
    n || hs.set(e, n = /* @__PURE__ */ new Map());
    let i = n.get(r);
    i || (n.set(r, i = new Gs()), i.map = n, i.key = r), i.track();
  }
}
function Gt(e, t, r, n, i, s) {
  const o = hs.get(e);
  if (!o) {
    yi++;
    return;
  }
  const a = (l) => {
    l && l.trigger();
  };
  if (Ea(), t === "clear")
    o.forEach(a);
  else {
    const l = Z(e), d = l && Hs(r);
    if (l && r === "length") {
      const p = Number(n);
      o.forEach((c, g) => {
        (g === "length" || g === bi || !Ze(g) && g >= p) && a(c);
      });
    } else
      switch ((r !== void 0 || o.has(void 0)) && a(o.get(r)), d && a(o.get(bi)), t) {
        case "add":
          l ? d && a(o.get("length")) : (a(o.get(Mr)), Zr(e) && a(o.get($o)));
          break;
        case "delete":
          l || (a(o.get(Mr)), Zr(e) && a(o.get($o)));
          break;
        case "set":
          Zr(e) && a(o.get(Mr));
          break;
      }
  }
  Ia();
}
function gm(e, t) {
  const r = hs.get(e);
  return r && r.get(t);
}
function Kr(e) {
  const t = /* @__PURE__ */ pe(e);
  return t === e ? t : (Ye(t, "iterate", bi), /* @__PURE__ */ ct(e) ? t : t.map(Ct));
}
function zs(e) {
  return Ye(e = /* @__PURE__ */ pe(e), "iterate", bi), e;
}
function Dt(e, t) {
  return /* @__PURE__ */ Lt(e) ? ln(/* @__PURE__ */ Jt(e) ? Ct(t) : t) : Ct(t);
}
const _m = {
  __proto__: null,
  [Symbol.iterator]() {
    return xo(this, Symbol.iterator, (e) => Dt(this, e));
  },
  concat(...e) {
    return Kr(this).concat(
      ...e.map((t) => Z(t) ? Kr(t) : t)
    );
  },
  entries() {
    return xo(this, "entries", (e) => (e[1] = Dt(this, e[1]), e));
  },
  every(e, t) {
    return $t(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return $t(
      this,
      "filter",
      e,
      t,
      (r) => r.map((n) => Dt(this, n)),
      arguments
    );
  },
  find(e, t) {
    return $t(
      this,
      "find",
      e,
      t,
      (r) => Dt(this, r),
      arguments
    );
  },
  findIndex(e, t) {
    return $t(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return $t(
      this,
      "findLast",
      e,
      t,
      (r) => Dt(this, r),
      arguments
    );
  },
  findLastIndex(e, t) {
    return $t(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return $t(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return No(this, "includes", e);
  },
  indexOf(...e) {
    return No(this, "indexOf", e);
  },
  join(e) {
    return Kr(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return No(this, "lastIndexOf", e);
  },
  map(e, t) {
    return $t(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Yn(this, "pop");
  },
  push(...e) {
    return Yn(this, "push", e);
  },
  reduce(e, ...t) {
    return uc(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return uc(this, "reduceRight", e, t);
  },
  shift() {
    return Yn(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return $t(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Yn(this, "splice", e);
  },
  toReversed() {
    return Kr(this).toReversed();
  },
  toSorted(e) {
    return Kr(this).toSorted(e);
  },
  toSpliced(...e) {
    return Kr(this).toSpliced(...e);
  },
  unshift(...e) {
    return Yn(this, "unshift", e);
  },
  values() {
    return xo(this, "values", (e) => Dt(this, e));
  }
};
function xo(e, t, r) {
  const n = zs(e), i = n[t]();
  return n !== e && !/* @__PURE__ */ ct(e) && (i._next = i.next, i.next = () => {
    const s = i._next();
    return s.done || (s.value = r(s.value)), s;
  }), i;
}
const ym = Array.prototype;
function $t(e, t, r, n, i, s) {
  const o = zs(e), a = o !== e && !/* @__PURE__ */ ct(e), l = o[t];
  if (l !== ym[t]) {
    const c = l.apply(e, s);
    return a ? Ct(c) : c;
  }
  let d = r;
  o !== e && (a ? d = function(c, g) {
    return r.call(this, Dt(e, c), g, e);
  } : r.length > 2 && (d = function(c, g) {
    return r.call(this, c, g, e);
  }));
  const p = l.call(o, d, n);
  return a && i ? i(p) : p;
}
function uc(e, t, r, n) {
  const i = zs(e), s = i !== e && !/* @__PURE__ */ ct(e);
  let o = r, a = !1;
  i !== e && (s ? (a = n.length === 0, o = function(d, p, c) {
    return a && (a = !1, d = Dt(e, d)), r.call(this, d, Dt(e, p), c, e);
  }) : r.length > 3 && (o = function(d, p, c) {
    return r.call(this, d, p, c, e);
  }));
  const l = i[t](o, ...n);
  return a ? Dt(e, l) : l;
}
function No(e, t, r) {
  const n = /* @__PURE__ */ pe(e);
  Ye(n, "iterate", bi);
  const i = n[t](...r);
  return (i === -1 || i === !1) && /* @__PURE__ */ Li(r[0]) ? (r[0] = /* @__PURE__ */ pe(r[0]), n[t](...r)) : i;
}
function Yn(e, t, r = []) {
  Rt(), Ea();
  const n = (/* @__PURE__ */ pe(e))[t].apply(e, r);
  return Ia(), At(), n;
}
const bm = /* @__PURE__ */ et("__proto__,__v_isRef,__isVue"), nf = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Ze)
);
function Tm(e) {
  Ze(e) || (e = String(e));
  const t = /* @__PURE__ */ pe(this);
  return Ye(t, "has", e), t.hasOwnProperty(e);
}
class sf {
  constructor(t = !1, r = !1) {
    this._isReadonly = t, this._isShallow = r;
  }
  get(t, r, n) {
    if (r === "__v_skip") return t.__v_skip;
    const i = this._isReadonly, s = this._isShallow;
    if (r === "__v_isReactive")
      return !i;
    if (r === "__v_isReadonly")
      return i;
    if (r === "__v_isShallow")
      return s;
    if (r === "__v_raw")
      return n === (i ? s ? ff : uf : s ? cf : lf).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(n) ? t : void 0;
    const o = Z(t);
    if (!i) {
      let l;
      if (o && (l = _m[r]))
        return l;
      if (r === "hasOwnProperty")
        return Tm;
    }
    const a = Reflect.get(
      t,
      r,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ De(t) ? t : n
    );
    if ((Ze(r) ? nf.has(r) : bm(r)) || (i || Ye(t, "get", r), s))
      return a;
    if (/* @__PURE__ */ De(a)) {
      const l = o && Hs(r) ? a : a.value;
      return i && ye(l) ? /* @__PURE__ */ ps(l) : l;
    }
    return ye(a) ? i ? /* @__PURE__ */ ps(a) : /* @__PURE__ */ Xs(a) : a;
  }
}
class of extends sf {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, r, n, i) {
    let s = t[r];
    const o = Z(t) && Hs(r);
    if (!this._isShallow) {
      const d = /* @__PURE__ */ Lt(s);
      if (!/* @__PURE__ */ ct(n) && !/* @__PURE__ */ Lt(n) && (s = /* @__PURE__ */ pe(s), n = /* @__PURE__ */ pe(n)), !o && /* @__PURE__ */ De(s) && !/* @__PURE__ */ De(n))
        return d || (s.value = n), !0;
    }
    const a = o ? Number(r) < t.length : Te(t, r), l = Reflect.set(
      t,
      r,
      n,
      /* @__PURE__ */ De(t) ? t : i
    );
    return t === /* @__PURE__ */ pe(i) && l && (a ? Ve(n, s) && Gt(t, "set", r, n) : Gt(t, "add", r, n)), l;
  }
  deleteProperty(t, r) {
    const n = Te(t, r);
    t[r];
    const i = Reflect.deleteProperty(t, r);
    return i && n && Gt(t, "delete", r, void 0), i;
  }
  has(t, r) {
    const n = Reflect.has(t, r);
    return (!Ze(r) || !nf.has(r)) && Ye(t, "has", r), n;
  }
  ownKeys(t) {
    return Ye(
      t,
      "iterate",
      Z(t) ? "length" : Mr
    ), Reflect.ownKeys(t);
  }
}
class af extends sf {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, r) {
    return !0;
  }
  deleteProperty(t, r) {
    return !0;
  }
}
const Sm = /* @__PURE__ */ new of(), vm = /* @__PURE__ */ new af(), Em = /* @__PURE__ */ new of(!0), Im = /* @__PURE__ */ new af(!0), Vo = (e) => e, Yi = (e) => Reflect.getPrototypeOf(e);
function wm(e, t, r) {
  return function(...n) {
    const i = this.__v_raw, s = /* @__PURE__ */ pe(i), o = Zr(s), a = e === "entries" || e === Symbol.iterator && o, l = e === "keys" && o, d = i[e](...n), p = r ? Vo : t ? ln : Ct;
    return !t && Ye(
      s,
      "iterate",
      l ? $o : Mr
    ), fe(
      // inheriting all iterator properties
      Object.create(d),
      {
        // iterator protocol
        next() {
          const { value: c, done: g } = d.next();
          return g ? { value: c, done: g } : {
            value: a ? [p(c[0]), p(c[1])] : p(c),
            done: g
          };
        }
      }
    );
  };
}
function Xi(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function xm(e, t) {
  const r = {
    get(i) {
      const s = this.__v_raw, o = /* @__PURE__ */ pe(s), a = /* @__PURE__ */ pe(i);
      e || (Ve(i, a) && Ye(o, "get", i), Ye(o, "get", a));
      const { has: l } = Yi(o), d = t ? Vo : e ? ln : Ct;
      if (l.call(o, i))
        return d(s.get(i));
      if (l.call(o, a))
        return d(s.get(a));
      s !== o && s.get(i);
    },
    get size() {
      const i = this.__v_raw;
      return !e && Ye(/* @__PURE__ */ pe(i), "iterate", Mr), i.size;
    },
    has(i) {
      const s = this.__v_raw, o = /* @__PURE__ */ pe(s), a = /* @__PURE__ */ pe(i);
      return e || (Ve(i, a) && Ye(o, "has", i), Ye(o, "has", a)), i === a ? s.has(i) : s.has(i) || s.has(a);
    },
    forEach(i, s) {
      const o = this, a = o.__v_raw, l = /* @__PURE__ */ pe(a), d = t ? Vo : e ? ln : Ct;
      return !e && Ye(l, "iterate", Mr), a.forEach((p, c) => i.call(s, d(p), d(c), o));
    }
  };
  return fe(
    r,
    e ? {
      add: Xi("add"),
      set: Xi("set"),
      delete: Xi("delete"),
      clear: Xi("clear")
    } : {
      add(i) {
        const s = /* @__PURE__ */ pe(this), o = Yi(s), a = /* @__PURE__ */ pe(i), l = !t && !/* @__PURE__ */ ct(i) && !/* @__PURE__ */ Lt(i) ? a : i;
        return o.has.call(s, l) || Ve(i, l) && o.has.call(s, i) || Ve(a, l) && o.has.call(s, a) || (s.add(l), Gt(s, "add", l, l)), this;
      },
      set(i, s) {
        !t && !/* @__PURE__ */ ct(s) && !/* @__PURE__ */ Lt(s) && (s = /* @__PURE__ */ pe(s));
        const o = /* @__PURE__ */ pe(this), { has: a, get: l } = Yi(o);
        let d = a.call(o, i);
        d || (i = /* @__PURE__ */ pe(i), d = a.call(o, i));
        const p = l.call(o, i);
        return o.set(i, s), d ? Ve(s, p) && Gt(o, "set", i, s) : Gt(o, "add", i, s), this;
      },
      delete(i) {
        const s = /* @__PURE__ */ pe(this), { has: o, get: a } = Yi(s);
        let l = o.call(s, i);
        l || (i = /* @__PURE__ */ pe(i), l = o.call(s, i)), a && a.call(s, i);
        const d = s.delete(i);
        return l && Gt(s, "delete", i, void 0), d;
      },
      clear() {
        const i = /* @__PURE__ */ pe(this), s = i.size !== 0, o = i.clear();
        return s && Gt(
          i,
          "clear",
          void 0,
          void 0
        ), o;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((i) => {
    r[i] = wm(i, e, t);
  }), r;
}
function Ys(e, t) {
  const r = xm(e, t);
  return (n, i, s) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? n : Reflect.get(
    Te(r, i) && i in n ? r : n,
    i,
    s
  );
}
const Nm = {
  get: /* @__PURE__ */ Ys(!1, !1)
}, Rm = {
  get: /* @__PURE__ */ Ys(!1, !0)
}, Am = {
  get: /* @__PURE__ */ Ys(!0, !1)
}, Cm = {
  get: /* @__PURE__ */ Ys(!0, !0)
}, lf = /* @__PURE__ */ new WeakMap(), cf = /* @__PURE__ */ new WeakMap(), uf = /* @__PURE__ */ new WeakMap(), ff = /* @__PURE__ */ new WeakMap();
function Om(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
// @__NO_SIDE_EFFECTS__
function Xs(e) {
  return /* @__PURE__ */ Lt(e) ? e : Js(
    e,
    !1,
    Sm,
    Nm,
    lf
  );
}
// @__NO_SIDE_EFFECTS__
function df(e) {
  return Js(
    e,
    !1,
    Em,
    Rm,
    cf
  );
}
// @__NO_SIDE_EFFECTS__
function ps(e) {
  return Js(
    e,
    !0,
    vm,
    Am,
    uf
  );
}
// @__NO_SIDE_EFFECTS__
function Pm(e) {
  return Js(
    e,
    !0,
    Im,
    Cm,
    ff
  );
}
function Js(e, t, r, n, i) {
  if (!ye(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const s = i.get(e);
  if (s)
    return s;
  const o = Om(jp(e));
  if (o === 0)
    return e;
  const a = new Proxy(
    e,
    o === 2 ? n : r
  );
  return i.set(e, a), a;
}
// @__NO_SIDE_EFFECTS__
function Jt(e) {
  return /* @__PURE__ */ Lt(e) ? /* @__PURE__ */ Jt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function Lt(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function ct(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function Li(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function pe(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ pe(t) : e;
}
function hf(e) {
  return !Te(e, "__v_skip") && Object.isExtensible(e) && an(e, "__v_skip", !0), e;
}
const Ct = (e) => ye(e) ? /* @__PURE__ */ Xs(e) : e, ln = (e) => ye(e) ? /* @__PURE__ */ ps(e) : e;
// @__NO_SIDE_EFFECTS__
function De(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function Ee(e) {
  return mf(e, !1);
}
// @__NO_SIDE_EFFECTS__
function pf(e) {
  return mf(e, !0);
}
function mf(e, t) {
  return /* @__PURE__ */ De(e) ? e : new Mm(e, t);
}
class Mm {
  constructor(t, r) {
    this.dep = new Gs(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = r ? t : /* @__PURE__ */ pe(t), this._value = r ? t : Ct(t), this.__v_isShallow = r;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const r = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ ct(t) || /* @__PURE__ */ Lt(t);
    t = n ? t : /* @__PURE__ */ pe(t), Ve(t, r) && (this._rawValue = t, this._value = n ? t : Ct(t), this.dep.trigger());
  }
}
function Dm(e) {
  e.dep && e.dep.trigger();
}
function ki(e) {
  return /* @__PURE__ */ De(e) ? e.value : e;
}
function Lm(e) {
  return oe(e) ? e() : ki(e);
}
const km = {
  get: (e, t, r) => t === "__v_raw" ? e : ki(Reflect.get(e, t, r)),
  set: (e, t, r, n) => {
    const i = e[t];
    return /* @__PURE__ */ De(i) && !/* @__PURE__ */ De(r) ? (i.value = r, !0) : Reflect.set(e, t, r, n);
  }
};
function xa(e) {
  return /* @__PURE__ */ Jt(e) ? e : new Proxy(e, km);
}
class jm {
  constructor(t) {
    this.__v_isRef = !0, this._value = void 0;
    const r = this.dep = new Gs(), { get: n, set: i } = t(r.track.bind(r), r.trigger.bind(r));
    this._get = n, this._set = i;
  }
  get value() {
    return this._value = this._get();
  }
  set value(t) {
    this._set(t);
  }
}
function gf(e) {
  return new jm(e);
}
// @__NO_SIDE_EFFECTS__
function Fm(e) {
  const t = Z(e) ? new Array(e.length) : {};
  for (const r in e)
    t[r] = _f(e, r);
  return t;
}
class Bm {
  constructor(t, r, n) {
    this._object = t, this._defaultValue = n, this.__v_isRef = !0, this._value = void 0, this._key = Ze(r) ? r : String(r), this._raw = /* @__PURE__ */ pe(t);
    let i = !0, s = t;
    if (!Z(t) || Ze(this._key) || !Hs(this._key))
      do
        i = !/* @__PURE__ */ Li(s) || /* @__PURE__ */ ct(s);
      while (i && (s = s.__v_raw));
    this._shallow = i;
  }
  get value() {
    let t = this._object[this._key];
    return this._shallow && (t = ki(t)), this._value = t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    if (this._shallow && /* @__PURE__ */ De(this._raw[this._key])) {
      const r = this._object[this._key];
      if (/* @__PURE__ */ De(r)) {
        r.value = t;
        return;
      }
    }
    this._object[this._key] = t;
  }
  get dep() {
    return gm(this._raw, this._key);
  }
}
class Um {
  constructor(t) {
    this._getter = t, this.__v_isRef = !0, this.__v_isReadonly = !0, this._value = void 0;
  }
  get value() {
    return this._value = this._getter();
  }
}
// @__NO_SIDE_EFFECTS__
function $m(e, t, r) {
  return /* @__PURE__ */ De(e) ? e : oe(e) ? new Um(e) : ye(e) && arguments.length > 1 ? _f(e, t, r) : /* @__PURE__ */ Ee(e);
}
function _f(e, t, r) {
  return new Bm(e, t, r);
}
class Vm {
  constructor(t, r, n) {
    this.fn = t, this.setter = r, this._value = void 0, this.dep = new Gs(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = yi - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !r, this.isSSR = n;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    xe !== this)
      return Xu(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return ef(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function Qm(e, t, r = !1) {
  let n, i;
  return oe(e) ? n = e : (n = e.get, i = e.set), new Vm(n, i, r);
}
const Hm = {
  GET: "get",
  HAS: "has",
  ITERATE: "iterate"
}, qm = {
  SET: "set",
  ADD: "add",
  DELETE: "delete",
  CLEAR: "clear"
}, Ji = {}, ms = /* @__PURE__ */ new WeakMap();
let hr;
function Km() {
  return hr;
}
function yf(e, t = !1, r = hr) {
  if (r) {
    let n = ms.get(r);
    n || ms.set(r, n = []), n.push(e);
  }
}
function Wm(e, t, r = de) {
  const { immediate: n, deep: i, once: s, scheduler: o, augmentJob: a, call: l } = r, d = (T) => i ? T : /* @__PURE__ */ ct(T) || i === !1 || i === 0 ? zt(T, 1) : zt(T);
  let p, c, g, _, S = !1, w = !1;
  if (/* @__PURE__ */ De(e) ? (c = () => e.value, S = /* @__PURE__ */ ct(e)) : /* @__PURE__ */ Jt(e) ? (c = () => d(e), S = !0) : Z(e) ? (w = !0, S = e.some((T) => /* @__PURE__ */ Jt(T) || /* @__PURE__ */ ct(T)), c = () => e.map((T) => {
    if (/* @__PURE__ */ De(T))
      return T.value;
    if (/* @__PURE__ */ Jt(T))
      return d(T);
    if (oe(T))
      return l ? l(T, 2) : T();
  })) : oe(e) ? t ? c = l ? () => l(e, 2) : e : c = () => {
    if (g) {
      Rt();
      try {
        g();
      } finally {
        At();
      }
    }
    const T = hr;
    hr = p;
    try {
      return l ? l(e, 3, [_]) : e(_);
    } finally {
      hr = T;
    }
  } : c = Qe, t && i) {
    const T = c, v = i === !0 ? 1 / 0 : i;
    c = () => zt(T(), v);
  }
  const L = zu(), j = () => {
    p.stop(), L && L.active && ba(L.effects, p);
  };
  if (s && t) {
    const T = t;
    t = (...v) => {
      const C = T(...v);
      return j(), C;
    };
  }
  let R = w ? new Array(e.length).fill(Ji) : Ji;
  const x = (T) => {
    if (!(!(p.flags & 1) || !p.dirty && !T))
      if (t) {
        const v = p.run();
        if (T || i || S || (w ? v.some((C, D) => Ve(C, R[D])) : Ve(v, R))) {
          g && g();
          const C = hr;
          hr = p;
          try {
            const D = [
              v,
              // pass undefined as the old value when it's changed for the first time
              R === Ji ? void 0 : w && R[0] === Ji ? [] : R,
              _
            ];
            R = v, l ? l(t, 3, D) : (
              // @ts-expect-error
              t(...D)
            );
          } finally {
            hr = C;
          }
        }
      } else
        p.run();
  };
  return a && a(x), p = new _i(c), p.scheduler = o ? () => o(x, !1) : x, _ = (T) => yf(T, !1, p), g = p.onStop = () => {
    const T = ms.get(p);
    if (T) {
      if (l)
        l(T, 4);
      else
        for (const v of T) v();
      ms.delete(p);
    }
  }, t ? n ? x(!0) : R = p.run() : o ? o(x.bind(null, !0), !0) : p.run(), j.pause = p.pause.bind(p), j.resume = p.resume.bind(p), j.stop = j, j;
}
function zt(e, t = 1 / 0, r) {
  if (t <= 0 || !ye(e) || e.__v_skip || (r = r || /* @__PURE__ */ new Map(), (r.get(e) || 0) >= t))
    return e;
  if (r.set(e, t), t--, /* @__PURE__ */ De(e))
    zt(e.value, t, r);
  else if (Z(e))
    for (let n = 0; n < e.length; n++)
      zt(e[n], t, r);
  else if (Vr(e) || Zr(e))
    e.forEach((n) => {
      zt(n, t, r);
    });
  else if (Qs(e)) {
    for (const n in e)
      zt(e[n], t, r);
    for (const n of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, n) && zt(e[n], t, r);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const Dr = [];
function Gm(e) {
  Dr.push(e);
}
function zm() {
  Dr.pop();
}
let Ro = !1;
function ur(e, ...t) {
  if (Ro) return;
  Ro = !0, Rt();
  const r = Dr.length ? Dr[Dr.length - 1].component : null, n = r && r.appContext.config.warnHandler, i = Ym();
  if (n)
    Hr(
      n,
      r,
      11,
      [
        // eslint-disable-next-line no-restricted-syntax
        e + t.map((s) => {
          var o, a;
          return (a = (o = s.toString) == null ? void 0 : o.call(s)) != null ? a : JSON.stringify(s);
        }).join(""),
        r && r.proxy,
        i.map(
          ({ vnode: s }) => `at <${xd(r, s.type)}>`
        ).join(`
`),
        i
      ]
    );
  else {
    const s = [`[Vue warn]: ${e}`, ...t];
    i.length && s.push(`
`, ...Xm(i)), console.warn(...s);
  }
  At(), Ro = !1;
}
function Ym() {
  let e = Dr[Dr.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const r = t[0];
    r && r.vnode === e ? r.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const n = e.component && e.component.parent;
    e = n && n.vnode;
  }
  return t;
}
function Xm(e) {
  const t = [];
  return e.forEach((r, n) => {
    t.push(...n === 0 ? [] : [`
`], ...Jm(r));
  }), t;
}
function Jm({ vnode: e, recurseCount: t }) {
  const r = t > 0 ? `... (${t} recursive calls)` : "", n = e.component ? e.component.parent == null : !1, i = ` at <${xd(
    e.component,
    e.type,
    n
  )}`, s = ">" + r;
  return e.props ? [i, ...Zm(e.props), s] : [i + s];
}
function Zm(e) {
  const t = [], r = Object.keys(e);
  return r.slice(0, 3).forEach((n) => {
    t.push(...bf(n, e[n]));
  }), r.length > 3 && t.push(" ..."), t;
}
function bf(e, t, r) {
  return ae(t) ? (t = JSON.stringify(t), r ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? r ? t : [`${e}=${t}`] : /* @__PURE__ */ De(t) ? (t = bf(e, /* @__PURE__ */ pe(t.value), !0), r ? t : [`${e}=Ref<`, t, ">"]) : oe(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = /* @__PURE__ */ pe(t), r ? t : [`${e}=`, t]);
}
function eg(e, t) {
}
const tg = {
  SETUP_FUNCTION: 0,
  0: "SETUP_FUNCTION",
  RENDER_FUNCTION: 1,
  1: "RENDER_FUNCTION",
  NATIVE_EVENT_HANDLER: 5,
  5: "NATIVE_EVENT_HANDLER",
  COMPONENT_EVENT_HANDLER: 6,
  6: "COMPONENT_EVENT_HANDLER",
  VNODE_HOOK: 7,
  7: "VNODE_HOOK",
  DIRECTIVE_HOOK: 8,
  8: "DIRECTIVE_HOOK",
  TRANSITION_HOOK: 9,
  9: "TRANSITION_HOOK",
  APP_ERROR_HANDLER: 10,
  10: "APP_ERROR_HANDLER",
  APP_WARN_HANDLER: 11,
  11: "APP_WARN_HANDLER",
  FUNCTION_REF: 12,
  12: "FUNCTION_REF",
  ASYNC_COMPONENT_LOADER: 13,
  13: "ASYNC_COMPONENT_LOADER",
  SCHEDULER: 14,
  14: "SCHEDULER",
  COMPONENT_UPDATE: 15,
  15: "COMPONENT_UPDATE",
  APP_UNMOUNT_CLEANUP: 16,
  16: "APP_UNMOUNT_CLEANUP"
}, rg = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  0: "setup function",
  1: "render function",
  2: "watcher getter",
  3: "watcher callback",
  4: "watcher cleanup function",
  5: "native event handler",
  6: "component event handler",
  7: "vnode hook",
  8: "directive hook",
  9: "transition hook",
  10: "app errorHandler",
  11: "app warnHandler",
  12: "ref function",
  13: "async component loader",
  14: "scheduler flush",
  15: "component update",
  16: "app unmount cleanup function"
};
function Hr(e, t, r, n) {
  try {
    return n ? e(...n) : e();
  } catch (i) {
    qr(i, t, r);
  }
}
function ht(e, t, r, n) {
  if (oe(e)) {
    const i = Hr(e, t, r, n);
    return i && Ta(i) && i.catch((s) => {
      qr(s, t, r);
    }), i;
  }
  if (Z(e)) {
    const i = [];
    for (let s = 0; s < e.length; s++)
      i.push(ht(e[s], t, r, n));
    return i;
  }
}
function qr(e, t, r, n = !0) {
  const i = t ? t.vnode : null, { errorHandler: s, throwUnhandledErrorInProduction: o } = t && t.appContext.config || de;
  if (t) {
    let a = t.parent;
    const l = t.proxy, d = `https://vuejs.org/error-reference/#runtime-${r}`;
    for (; a; ) {
      const p = a.ec;
      if (p) {
        for (let c = 0; c < p.length; c++)
          if (p[c](e, l, d) === !1)
            return;
      }
      a = a.parent;
    }
    if (s) {
      Rt(), Hr(s, null, 10, [
        e,
        l,
        d
      ]), At();
      return;
    }
  }
  ng(e, r, i, n, o);
}
function ng(e, t, r, n = !0, i = !1) {
  if (i)
    throw e;
  console.error(e);
}
const rt = [];
let Pt = -1;
const rn = [];
let pr = null, zr = 0;
const Tf = /* @__PURE__ */ Promise.resolve();
let gs = null;
function ji(e) {
  const t = gs || Tf;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function ig(e) {
  let t = Pt + 1, r = rt.length;
  for (; t < r; ) {
    const n = t + r >>> 1, i = rt[n], s = Si(i);
    s < e || s === e && i.flags & 2 ? t = n + 1 : r = n;
  }
  return t;
}
function Na(e) {
  if (!(e.flags & 1)) {
    const t = Si(e), r = rt[rt.length - 1];
    !r || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Si(r) ? rt.push(e) : rt.splice(ig(t), 0, e), e.flags |= 1, Sf();
  }
}
function Sf() {
  gs || (gs = Tf.then(vf));
}
function Ti(e) {
  Z(e) ? rn.push(...e) : pr && e.id === -1 ? pr.splice(zr + 1, 0, e) : e.flags & 1 || (rn.push(e), e.flags |= 1), Sf();
}
function fc(e, t, r = Pt + 1) {
  for (; r < rt.length; r++) {
    const n = rt[r];
    if (n && n.flags & 2) {
      if (e && n.id !== e.uid)
        continue;
      rt.splice(r, 1), r--, n.flags & 4 && (n.flags &= -2), n(), n.flags & 4 || (n.flags &= -2);
    }
  }
}
function _s(e) {
  if (rn.length) {
    const t = [...new Set(rn)].sort(
      (r, n) => Si(r) - Si(n)
    );
    if (rn.length = 0, pr) {
      pr.push(...t);
      return;
    }
    for (pr = t, zr = 0; zr < pr.length; zr++) {
      const r = pr[zr];
      r.flags & 4 && (r.flags &= -2), r.flags & 8 || r(), r.flags &= -2;
    }
    pr = null, zr = 0;
  }
}
const Si = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function vf(e) {
  try {
    for (Pt = 0; Pt < rt.length; Pt++) {
      const t = rt[Pt];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Hr(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; Pt < rt.length; Pt++) {
      const t = rt[Pt];
      t && (t.flags &= -2);
    }
    Pt = -1, rt.length = 0, _s(), gs = null, (rt.length || rn.length) && vf();
  }
}
let It, ii = [], Qo = !1;
function Zs(e, ...t) {
  It ? It.emit(e, ...t) : Qo || ii.push({ event: e, args: t });
}
function Ra(e, t) {
  var r, n;
  It = e, It ? (It.enabled = !0, ii.forEach(({ event: i, args: s }) => It.emit(i, ...s)), ii = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  // eslint-disable-next-line no-restricted-syntax
  !((n = (r = window.navigator) == null ? void 0 : r.userAgent) != null && n.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((s) => {
    Ra(s, t);
  }), setTimeout(() => {
    It || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, Qo = !0, ii = []);
  }, 3e3)) : (Qo = !0, ii = []);
}
function sg(e, t) {
  Zs("app:init", e, t, {
    Fragment: je,
    Text: er,
    Comment: Pe,
    Static: _r
  });
}
function og(e) {
  Zs("app:unmount", e);
}
const Ho = /* @__PURE__ */ Aa(
  "component:added"
  /* COMPONENT_ADDED */
), Ef = /* @__PURE__ */ Aa(
  "component:updated"
  /* COMPONENT_UPDATED */
), ag = /* @__PURE__ */ Aa(
  "component:removed"
  /* COMPONENT_REMOVED */
), lg = (e) => {
  It && typeof It.cleanupBuffer == "function" && // remove the component if it wasn't buffered
  !It.cleanupBuffer(e) && ag(e);
};
// @__NO_SIDE_EFFECTS__
function Aa(e) {
  return (t) => {
    Zs(
      e,
      t.appContext.app,
      t.uid,
      t.parent ? t.parent.uid : void 0,
      t
    );
  };
}
function cg(e, t, r) {
  Zs(
    "component:emit",
    e.appContext.app,
    e,
    t,
    r
  );
}
let Ke = null, eo = null;
function vi(e) {
  const t = Ke;
  return Ke = e, eo = e && e.type.__scopeId || null, t;
}
function ug(e) {
  eo = e;
}
function fg() {
  eo = null;
}
const dg = (e) => Ca;
function Ca(e, t = Ke, r) {
  if (!t || e._n)
    return e;
  const n = (...i) => {
    n._d && xi(-1);
    const s = vi(t);
    let o;
    try {
      o = e(...i);
    } finally {
      vi(s), n._d && xi(1);
    }
    return __VUE_PROD_DEVTOOLS__ && Ef(t), o;
  };
  return n._n = !0, n._c = !0, n._d = !0, n;
}
function hg(e, t) {
  if (Ke === null)
    return e;
  const r = Ui(Ke), n = e.dirs || (e.dirs = []);
  for (let i = 0; i < t.length; i++) {
    let [s, o, a, l = de] = t[i];
    s && (oe(s) && (s = {
      mounted: s,
      updated: s
    }), s.deep && zt(o), n.push({
      dir: s,
      instance: r,
      value: o,
      oldValue: void 0,
      arg: a,
      modifiers: l
    }));
  }
  return e;
}
function Mt(e, t, r, n) {
  const i = e.dirs, s = t && t.dirs;
  for (let o = 0; o < i.length; o++) {
    const a = i[o];
    s && (a.oldValue = s[o].value);
    let l = a.dir[n];
    l && (Rt(), ht(l, r, 8, [
      e.el,
      a,
      e,
      t
    ]), At());
  }
}
function If(e, t) {
  if (qe) {
    let r = qe.provides;
    const n = qe.parent && qe.parent.provides;
    n === r && (r = qe.provides = Object.create(n)), r[e] = t;
  }
}
function fi(e, t, r = !1) {
  const n = it();
  if (n || Lr) {
    let i = Lr ? Lr._context.provides : n ? n.parent == null || n.ce ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : void 0;
    if (i && e in i)
      return i[e];
    if (arguments.length > 1)
      return r && oe(t) ? t.call(n && n.proxy) : t;
  }
}
function pg() {
  return !!(it() || Lr);
}
const wf = /* @__PURE__ */ Symbol.for("v-scx"), xf = () => fi(wf);
function mg(e, t) {
  return Fi(e, null, t);
}
function gg(e, t) {
  return Fi(
    e,
    null,
    { flush: "post" }
  );
}
function Nf(e, t) {
  return Fi(
    e,
    null,
    { flush: "sync" }
  );
}
function gr(e, t, r) {
  return Fi(e, t, r);
}
function Fi(e, t, r = de) {
  const { immediate: n, deep: i, flush: s, once: o } = r, a = fe({}, r), l = t && n || !t && s !== "post";
  let d;
  if (Br) {
    if (s === "sync") {
      const _ = xf();
      d = _.__watcherHandles || (_.__watcherHandles = []);
    } else if (!l) {
      const _ = () => {
      };
      return _.stop = Qe, _.resume = Qe, _.pause = Qe, _;
    }
  }
  const p = qe;
  a.call = (_, S, w) => ht(_, p, S, w);
  let c = !1;
  s === "post" ? a.scheduler = (_) => {
    ke(_, p && p.suspense);
  } : s !== "sync" && (c = !0, a.scheduler = (_, S) => {
    S ? _() : Na(_);
  }), a.augmentJob = (_) => {
    t && (_.flags |= 4), c && (_.flags |= 2, p && (_.id = p.uid, _.i = p));
  };
  const g = Wm(e, t, a);
  return Br && (d ? d.push(g) : l && g()), g;
}
function _g(e, t, r) {
  const n = this.proxy, i = ae(e) ? e.includes(".") ? Rf(n, e) : () => n[e] : e.bind(n, n);
  let s;
  oe(t) ? s = t : (s = t.handler, r = t);
  const o = vn(this), a = Fi(i, s.bind(n), r);
  return o(), a;
}
function Rf(e, t) {
  const r = t.split(".");
  return () => {
    let n = e;
    for (let i = 0; i < r.length && n; i++)
      n = n[r[i]];
    return n;
  };
}
const fr = /* @__PURE__ */ new WeakMap(), Af = /* @__PURE__ */ Symbol("_vte"), Cf = (e) => e.__isTeleport, Rr = (e) => e && (e.disabled || e.disabled === ""), yg = (e) => e && (e.defer || e.defer === ""), dc = (e) => typeof SVGElement < "u" && e instanceof SVGElement, hc = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement, qo = (e, t) => {
  const r = e && e.to;
  return ae(r) ? t ? t(r) : null : r;
}, bg = {
  name: "Teleport",
  __isTeleport: !0,
  process(e, t, r, n, i, s, o, a, l, d) {
    const {
      mc: p,
      pc: c,
      pbc: g,
      o: { insert: _, querySelector: S, createText: w, createComment: L, parentNode: j }
    } = d, R = Rr(t.props);
    let { dynamicChildren: x } = t;
    const T = (D, F, y) => {
      D.shapeFlag & 16 && p(
        D.children,
        F,
        y,
        i,
        s,
        o,
        a,
        l
      );
    }, v = (D = t) => {
      const F = Rr(D.props), y = D.target = qo(D.props, S), E = Ko(y, D, w, _);
      y && (o !== "svg" && dc(y) ? o = "svg" : o !== "mathml" && hc(y) && (o = "mathml"), i && i.isCE && (i.ce._teleportTargets || (i.ce._teleportTargets = /* @__PURE__ */ new Set())).add(y), F || (T(D, y, E), si(D, !1)));
    }, C = (D) => {
      const F = () => {
        if (fr.get(D) === F) {
          if (fr.delete(D), Rr(D.props)) {
            const y = j(D.el) || r;
            T(D, y, D.anchor), si(D, !0);
          }
          v(D);
        }
      };
      fr.set(D, F), ke(F, s);
    };
    if (e == null) {
      const D = t.el = w(""), F = t.anchor = w("");
      if (_(D, r, n), _(F, r, n), yg(t.props) || s && s.pendingBranch) {
        C(t);
        return;
      }
      R && (T(t, r, F), si(t, !0)), v();
    } else {
      t.el = e.el;
      const D = t.anchor = e.anchor, F = fr.get(e);
      if (F) {
        F.flags |= 8, fr.delete(e), C(t);
        return;
      }
      t.targetStart = e.targetStart;
      const y = t.target = e.target, E = t.targetAnchor = e.targetAnchor, O = Rr(e.props), A = O ? r : y, $ = O ? D : E;
      if (o === "svg" || dc(y) ? o = "svg" : (o === "mathml" || hc(y)) && (o = "mathml"), x ? (g(
        e.dynamicChildren,
        x,
        A,
        i,
        s,
        o,
        a
      ), Qa(e, t, !0)) : l || c(
        e,
        t,
        A,
        $,
        i,
        s,
        o,
        a,
        !1
      ), R)
        O ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : Zi(
          t,
          r,
          D,
          d,
          1
        );
      else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
        const Y = qo(t.props, S);
        Y && (t.target = Y, Zi(
          t,
          Y,
          null,
          d,
          0
        ));
      } else O && Zi(
        t,
        y,
        E,
        d,
        1
      );
      si(t, R);
    }
  },
  remove(e, t, r, { um: n, o: { remove: i } }, s) {
    const {
      shapeFlag: o,
      children: a,
      anchor: l,
      targetStart: d,
      targetAnchor: p,
      target: c,
      props: g
    } = e, _ = Rr(g), S = s || !_, w = fr.get(e);
    if (w && (w.flags |= 8, fr.delete(e)), c && (i(d), i(p)), s && i(l), !w && (_ || c) && o & 16)
      for (let L = 0; L < a.length; L++) {
        const j = a[L];
        n(
          j,
          t,
          r,
          S,
          !!j.dynamicChildren
        );
      }
  },
  move: Zi,
  hydrate: Tg
};
function Zi(e, t, r, { o: { insert: n }, m: i }, s = 2) {
  s === 0 && n(e.targetAnchor, t, r);
  const { el: o, anchor: a, shapeFlag: l, children: d, props: p } = e, c = s === 2;
  if (c && n(o, t, r), !fr.has(e) && (!c || Rr(p)) && l & 16)
    for (let g = 0; g < d.length; g++)
      i(
        d[g],
        t,
        r,
        2
      );
  c && n(a, t, r);
}
function Tg(e, t, r, n, i, s, {
  o: { nextSibling: o, parentNode: a, querySelector: l, insert: d, createText: p }
}, c) {
  function g(L, j) {
    let R = j;
    for (; R; ) {
      if (R && R.nodeType === 8) {
        if (R.data === "teleport start anchor")
          t.targetStart = R;
        else if (R.data === "teleport anchor") {
          t.targetAnchor = R, L._lpa = t.targetAnchor && o(t.targetAnchor);
          break;
        }
      }
      R = o(R);
    }
  }
  function _(L, j) {
    j.anchor = c(
      o(L),
      j,
      a(L),
      r,
      n,
      i,
      s
    );
  }
  const S = t.target = qo(
    t.props,
    l
  ), w = Rr(t.props);
  if (S) {
    const L = S._lpa || S.firstChild;
    t.shapeFlag & 16 && (w ? (_(e, t), g(S, L), t.targetAnchor || Ko(
      S,
      t,
      p,
      d,
      // if target is the same as the main view, insert anchors before current node
      // to avoid hydrating mismatch
      a(e) === S ? e : null
    )) : (t.anchor = o(e), g(S, L), t.targetAnchor || Ko(S, t, p, d), c(
      L && o(L),
      t,
      S,
      r,
      n,
      i,
      s
    ))), si(t, w);
  } else w && t.shapeFlag & 16 && (_(e, t), t.targetStart = e, t.targetAnchor = o(e));
  return t.anchor && o(t.anchor);
}
const Sg = bg;
function si(e, t) {
  const r = e.ctx;
  if (r && r.ut) {
    let n, i;
    for (t ? (n = e.el, i = e.anchor) : (n = e.targetStart, i = e.targetAnchor); n && n !== i; )
      n.nodeType === 1 && n.setAttribute("data-v-owner", r.uid), n = n.nextSibling;
    r.ut();
  }
}
function Ko(e, t, r, n, i = null) {
  const s = t.targetStart = r(""), o = t.targetAnchor = r("");
  return s[Af] = o, e && (n(s, e, i), n(o, e, i)), o;
}
const _t = /* @__PURE__ */ Symbol("_leaveCb"), Xn = /* @__PURE__ */ Symbol("_enterCb");
function Oa() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return Tn(() => {
    e.isMounted = !0;
  }), io(() => {
    e.isUnmounting = !0;
  }), e;
}
const gt = [Function, Array], Pa = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  // enter
  onBeforeEnter: gt,
  onEnter: gt,
  onAfterEnter: gt,
  onEnterCancelled: gt,
  // leave
  onBeforeLeave: gt,
  onLeave: gt,
  onAfterLeave: gt,
  onLeaveCancelled: gt,
  // appear
  onBeforeAppear: gt,
  onAppear: gt,
  onAfterAppear: gt,
  onAppearCancelled: gt
}, Of = (e) => {
  const t = e.subTree;
  return t.component ? Of(t.component) : t;
}, vg = {
  name: "BaseTransition",
  props: Pa,
  setup(e, { slots: t }) {
    const r = it(), n = Oa();
    return () => {
      const i = t.default && to(t.default(), !0), s = i && i.length ? Pf(i) : (
        // Keep explicit default-slot conditionals on the same transition path
        // as regular v-if branches, which render a comment placeholder.
        r.subTree ? yd() : void 0
      );
      if (!s)
        return;
      const o = /* @__PURE__ */ pe(e), { mode: a } = o;
      if (n.isLeaving)
        return Ao(s);
      const l = pc(s);
      if (!l)
        return Ao(s);
      let d = cn(
        l,
        o,
        n,
        r,
        // #11061, ensure enterHooks is fresh after clone
        (c) => d = c
      );
      l.type !== Pe && nr(l, d);
      let p = r.subTree && pc(r.subTree);
      if (p && p.type !== Pe && !wt(p, l) && Of(r).type !== Pe) {
        let c = cn(
          p,
          o,
          n,
          r
        );
        if (nr(p, c), a === "out-in" && l.type !== Pe)
          return n.isLeaving = !0, c.afterLeave = () => {
            n.isLeaving = !1, r.job.flags & 8 || r.update(), delete c.afterLeave, p = void 0;
          }, Ao(s);
        a === "in-out" && l.type !== Pe ? c.delayLeave = (g, _, S) => {
          const w = Df(
            n,
            p
          );
          w[String(p.key)] = p, g[_t] = () => {
            _(), g[_t] = void 0, delete d.delayedLeave, p = void 0;
          }, d.delayedLeave = () => {
            S(), delete d.delayedLeave, p = void 0;
          };
        } : p = void 0;
      } else p && (p = void 0);
      return s;
    };
  }
};
function Pf(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const r of e)
      if (r.type !== Pe) {
        t = r;
        break;
      }
  }
  return t;
}
const Mf = vg;
function Df(e, t) {
  const { leavingVNodes: r } = e;
  let n = r.get(t.type);
  return n || (n = /* @__PURE__ */ Object.create(null), r.set(t.type, n)), n;
}
function cn(e, t, r, n, i) {
  const {
    appear: s,
    mode: o,
    persisted: a = !1,
    onBeforeEnter: l,
    onEnter: d,
    onAfterEnter: p,
    onEnterCancelled: c,
    onBeforeLeave: g,
    onLeave: _,
    onAfterLeave: S,
    onLeaveCancelled: w,
    onBeforeAppear: L,
    onAppear: j,
    onAfterAppear: R,
    onAppearCancelled: x
  } = t, T = String(e.key), v = Df(r, e), C = (y, E) => {
    y && ht(
      y,
      n,
      9,
      E
    );
  }, D = (y, E) => {
    const O = E[1];
    C(y, E), Z(y) ? y.every((A) => A.length <= 1) && O() : y.length <= 1 && O();
  }, F = {
    mode: o,
    persisted: a,
    beforeEnter(y) {
      let E = l;
      if (!r.isMounted)
        if (s)
          E = L || l;
        else
          return;
      y[_t] && y[_t](
        !0
        /* cancelled */
      );
      const O = v[T];
      O && wt(e, O) && O.el[_t] && O.el[_t](), C(E, [y]);
    },
    enter(y) {
      if (v[T] === e) return;
      let E = d, O = p, A = c;
      if (!r.isMounted)
        if (s)
          E = j || d, O = R || p, A = x || c;
        else
          return;
      let $ = !1;
      y[Xn] = (X) => {
        $ || ($ = !0, X ? C(A, [y]) : C(O, [y]), F.delayedLeave && F.delayedLeave(), y[Xn] = void 0);
      };
      const Y = y[Xn].bind(null, !1);
      E ? D(E, [y, Y]) : Y();
    },
    leave(y, E) {
      const O = String(e.key);
      if (y[Xn] && y[Xn](
        !0
        /* cancelled */
      ), r.isUnmounting)
        return E();
      C(g, [y]);
      let A = !1;
      y[_t] = (Y) => {
        A || (A = !0, E(), Y ? C(w, [y]) : C(S, [y]), y[_t] = void 0, v[O] === e && delete v[O]);
      };
      const $ = y[_t].bind(null, !1);
      v[O] = e, _ ? D(_, [y, $]) : $();
    },
    clone(y) {
      const E = cn(
        y,
        t,
        r,
        n,
        i
      );
      return i && i(E), E;
    }
  };
  return F;
}
function Ao(e) {
  if (Bi(e))
    return e = kt(e), e.children = null, e;
}
function pc(e) {
  if (!Bi(e))
    return Cf(e.type) && e.children ? Pf(e.children) : e;
  if (e.component)
    return e.component.subTree;
  const { shapeFlag: t, children: r } = e;
  if (r) {
    if (t & 16)
      return r[0];
    if (t & 32 && oe(r.default))
      return r.default();
  }
}
function nr(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, nr(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function to(e, t = !1, r) {
  let n = [], i = 0;
  for (let s = 0; s < e.length; s++) {
    let o = e[s];
    const a = r == null ? o.key : String(r) + String(o.key != null ? o.key : s);
    o.type === je ? (o.patchFlag & 128 && i++, n = n.concat(
      to(o.children, t, a)
    )) : (t || o.type !== Pe) && n.push(a != null ? kt(o, { key: a }) : o);
  }
  if (i > 1)
    for (let s = 0; s < n.length; s++)
      n[s].patchFlag = -2;
  return n;
}
// @__NO_SIDE_EFFECTS__
function Ma(e, t) {
  return oe(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    fe({ name: e.name }, t, { setup: e })
  ) : e;
}
function Eg() {
  const e = it();
  return e ? (e.appContext.config.idPrefix || "v") + "-" + e.ids[0] + e.ids[1]++ : "";
}
function Da(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function Ig(e) {
  const t = it(), r = /* @__PURE__ */ pf(null);
  if (t) {
    const i = t.refs === de ? t.refs = {} : t.refs;
    Object.defineProperty(i, e, {
      enumerable: !0,
      get: () => r.value,
      set: (s) => r.value = s
    });
  }
  return r;
}
function mc(e, t) {
  let r;
  return !!((r = Object.getOwnPropertyDescriptor(e, t)) && !r.configurable);
}
const ys = /* @__PURE__ */ new WeakMap();
function nn(e, t, r, n, i = !1) {
  if (Z(e)) {
    e.forEach(
      (w, L) => nn(
        w,
        t && (Z(t) ? t[L] : t),
        r,
        n,
        i
      )
    );
    return;
  }
  if (Zt(n) && !i) {
    n.shapeFlag & 512 && n.type.__asyncResolved && n.component.subTree.component && nn(e, t, r, n.component.subTree);
    return;
  }
  const s = n.shapeFlag & 4 ? Ui(n.component) : n.el, o = i ? null : s, { i: a, r: l } = e, d = t && t.r, p = a.refs === de ? a.refs = {} : a.refs, c = a.setupState, g = /* @__PURE__ */ pe(c), _ = c === de ? Yr : (w) => mc(p, w) ? !1 : Te(g, w), S = (w, L) => !(L && mc(p, L));
  if (d != null && d !== l) {
    if (gc(t), ae(d))
      p[d] = null, _(d) && (c[d] = null);
    else if (/* @__PURE__ */ De(d)) {
      const w = t;
      S(d, w.k) && (d.value = null), w.k && (p[w.k] = null);
    }
  }
  if (oe(l)) {
    Rt();
    try {
      Hr(l, a, 12, [o, p]);
    } finally {
      At();
    }
  } else {
    const w = ae(l), L = /* @__PURE__ */ De(l);
    if (w || L) {
      const j = () => {
        if (e.f) {
          const R = w ? _(l) ? c[l] : p[l] : S() || !e.k ? l.value : p[e.k];
          if (i)
            Z(R) && ba(R, s);
          else if (Z(R))
            R.includes(s) || R.push(s);
          else if (w)
            p[l] = [s], _(l) && (c[l] = p[l]);
          else {
            const x = [s];
            S(l, e.k) && (l.value = x), e.k && (p[e.k] = x);
          }
        } else w ? (p[l] = o, _(l) && (c[l] = o)) : L && (S(l, e.k) && (l.value = o), e.k && (p[e.k] = o));
      };
      if (o) {
        const R = () => {
          j(), ys.delete(e);
        };
        R.id = -1, ys.set(e, R), ke(R, r);
      } else
        gc(e), j();
    }
  }
}
function gc(e) {
  const t = ys.get(e);
  t && (t.flags |= 8, ys.delete(e));
}
let _c = !1;
const Er = () => {
  _c || (console.error("Hydration completed but contains mismatches."), _c = !0);
}, wg = (e) => e.namespaceURI.includes("svg") && e.tagName !== "foreignObject", xg = (e) => e.namespaceURI.includes("MathML"), es = (e) => {
  if (e.nodeType === 1) {
    if (wg(e)) return "svg";
    if (xg(e)) return "mathml";
  }
}, Ar = (e) => e.nodeType === 8;
function Ng(e) {
  const {
    mt: t,
    p: r,
    o: {
      patchProp: n,
      createText: i,
      nextSibling: s,
      parentNode: o,
      remove: a,
      insert: l,
      createComment: d
    }
  } = e, p = (x, T) => {
    if (!T.hasChildNodes()) {
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__ && ur(
        "Attempting to hydrate existing markup but container is empty. Performing full mount instead."
      ), r(null, x, T), _s(), T._vnode = x;
      return;
    }
    c(T.firstChild, x, null, null, null), _s(), T._vnode = x;
  }, c = (x, T, v, C, D, F = !1) => {
    F = F || !!T.dynamicChildren;
    const y = Ar(x) && x.data === "[", E = () => w(
      x,
      T,
      v,
      C,
      D,
      y
    ), { type: O, ref: A, shapeFlag: $, patchFlag: Y } = T;
    let X = x.nodeType;
    T.el = x, __VUE_PROD_DEVTOOLS__ && (an(x, "__vnode", T, !0), an(x, "__vueParentComponent", v, !0)), Y === -2 && (F = !1, T.dynamicChildren = null);
    let W = null;
    switch (O) {
      case er:
        X !== 3 ? T.children === "" ? (l(T.el = i(""), o(x), x), W = x) : W = E() : (x.data !== T.children && (__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ && ur(
          "Hydration text mismatch in",
          x.parentNode,
          `
  - rendered on server: ${JSON.stringify(
            x.data
          )}
  - expected on client: ${JSON.stringify(T.children)}`
        ), Er(), x.data = T.children), W = s(x));
        break;
      case Pe:
        R(x) ? (W = s(x), j(
          T.el = x.content.firstChild,
          x,
          v
        )) : X !== 8 || y ? W = E() : W = s(x);
        break;
      case _r:
        if (y && (x = s(x), X = x.nodeType), X === 1 || X === 3) {
          W = x;
          const te = !T.children.length;
          for (let ee = 0; ee < T.staticCount; ee++)
            te && (T.children += W.nodeType === 1 ? W.outerHTML : W.data), ee === T.staticCount - 1 && (T.anchor = W), W = s(W);
          return y ? s(W) : W;
        } else
          E();
        break;
      case je:
        y ? W = S(
          x,
          T,
          v,
          C,
          D,
          F
        ) : W = E();
        break;
      default:
        if ($ & 1)
          (X !== 1 || T.type.toLowerCase() !== x.tagName.toLowerCase()) && !R(x) ? W = E() : W = g(
            x,
            T,
            v,
            C,
            D,
            F
          );
        else if ($ & 6) {
          T.slotScopeIds = D;
          const te = o(x);
          if (y ? W = L(x) : Ar(x) && x.data === "teleport start" ? W = L(x, x.data, "teleport end") : W = s(x), t(
            T,
            te,
            null,
            v,
            C,
            es(te),
            F
          ), Zt(T) && !T.type.__asyncResolved) {
            let ee;
            y ? (ee = Ce(je), ee.anchor = W ? W.previousSibling : te.lastChild) : ee = x.nodeType === 3 ? qa("") : Ce("div"), ee.el = x, T.component.subTree = ee;
          }
        } else $ & 64 ? X !== 8 ? W = E() : W = T.type.hydrate(
          x,
          T,
          v,
          C,
          D,
          F,
          e,
          _
        ) : $ & 128 ? W = T.type.hydrate(
          x,
          T,
          v,
          C,
          es(o(x)),
          D,
          F,
          e,
          c
        ) : __VUE_PROD_HYDRATION_MISMATCH_DETAILS__ && ur("Invalid HostVNode type:", O, `(${typeof O})`);
    }
    return A != null && nn(A, null, C, T), W;
  }, g = (x, T, v, C, D, F) => {
    F = F || !!T.dynamicChildren;
    const {
      type: y,
      dynamicProps: E,
      props: O,
      patchFlag: A,
      shapeFlag: $,
      dirs: Y,
      transition: X
    } = T, W = y === "input" || y === "option", te = !!E;
    if (W || te || A !== -1) {
      Y && Mt(T, null, v, "created");
      let ee = !1;
      if (R(x)) {
        ee = cd(
          null,
          // no need check parentSuspense in hydration
          X
        ) && v && v.vnode.props && v.vnode.props.appear;
        const se = x.content.firstChild;
        if (ee) {
          const ie = se.getAttribute("class");
          ie && (se.$cls = ie), X.beforeEnter(se);
        }
        j(se, x, v), T.el = x = se;
      }
      if ($ & 16 && // skip if element has innerHTML / textContent
      !(O && (O.innerHTML || O.textContent))) {
        let se = _(
          x.firstChild,
          T,
          x,
          v,
          C,
          D,
          F
        );
        for (se && !di(
          x,
          1
          /* CHILDREN */
        ) && (__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ && ur(
          "Hydration children mismatch on",
          x,
          `
Server rendered element contains more child nodes than client vdom.`
        ), Er()); se; ) {
          const ie = se;
          se = se.nextSibling, a(ie);
        }
      } else if ($ & 8) {
        let se = T.children;
        se[0] === `
` && (x.tagName === "PRE" || x.tagName === "TEXTAREA") && (se = se.slice(1));
        const { textContent: ie } = x;
        ie !== se && // innerHTML normalize \r\n or \r into a single \n in the DOM
        ie !== se.replace(/\r\n|\r/g, `
`) && (di(
          x,
          0
          /* TEXT */
        ) || (__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ && ur(
          "Hydration text content mismatch on",
          x,
          `
  - rendered on server: ${ie}
  - expected on client: ${se}`
        ), Er()), x.textContent = T.children);
      }
      if (O) {
        if (__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ || W || te || !F || A & 48) {
          const se = x.tagName.includes("-");
          for (const ie in O)
            __VUE_PROD_HYDRATION_MISMATCH_DETAILS__ && // #11189 skip if this node has directives that have created hooks
            // as it could have mutated the DOM in any possible way
            !(Y && Y.some((be) => be.dir.created)) && Rg(x, ie, O[ie], T, v) && Er(), (W && (ie.endsWith("value") || ie === "indeterminate") || $r(ie) && !Xt(ie) || // force hydrate v-bind with .prop modifiers
            ie[0] === "." || se && !Xt(ie) || E && E.includes(ie)) && n(x, ie, null, O[ie], void 0, v);
        } else if (O.onClick)
          n(
            x,
            "onClick",
            null,
            O.onClick,
            void 0,
            v
          );
        else if (A & 4 && /* @__PURE__ */ Jt(O.style))
          for (const se in O.style) O.style[se];
      }
      let ge;
      (ge = O && O.onVnodeBeforeMount) && ot(ge, v, T), Y && Mt(T, null, v, "beforeMount"), ((ge = O && O.onVnodeMounted) || Y || ee) && hd(() => {
        ge && ot(ge, v, T), ee && X.enter(x), Y && Mt(T, null, v, "mounted");
      }, C);
    }
    return x.nextSibling;
  }, _ = (x, T, v, C, D, F, y) => {
    y = y || !!T.dynamicChildren;
    const E = T.children, O = E.length;
    let A = !1;
    for (let $ = 0; $ < O; $++) {
      const Y = y ? E[$] : E[$] = at(E[$]), X = Y.type === er;
      x ? (X && !y && $ + 1 < O && at(E[$ + 1]).type === er && (l(
        i(
          x.data.slice(Y.children.length)
        ),
        v,
        s(x)
      ), x.data = Y.children), x = c(
        x,
        Y,
        C,
        D,
        F,
        y
      )) : X && !Y.children ? l(Y.el = i(""), v) : (A || (A = !0, di(
        v,
        1
        /* CHILDREN */
      ) || (__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ && ur(
        "Hydration children mismatch on",
        v,
        `
Server rendered element contains fewer child nodes than client vdom.`
      ), Er())), r(
        null,
        Y,
        v,
        null,
        C,
        D,
        es(v),
        F
      ));
    }
    return x;
  }, S = (x, T, v, C, D, F) => {
    const { slotScopeIds: y } = T;
    y && (D = D ? D.concat(y) : y);
    const E = o(x), O = _(
      s(x),
      T,
      E,
      v,
      C,
      D,
      F
    );
    return O && Ar(O) && O.data === "]" ? s(T.anchor = O) : (Er(), l(T.anchor = d("]"), E, O), O);
  }, w = (x, T, v, C, D, F) => {
    if (Og(x, T) || (__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ && ur(
      `Hydration node mismatch:
- rendered on server:`,
      x,
      x.nodeType === 3 ? "(text)" : Ar(x) && x.data === "[" ? "(start of fragment)" : "",
      `
- expected on client:`,
      T.type
    ), Er()), T.el = null, F) {
      const O = L(x);
      for (; ; ) {
        const A = s(x);
        if (A && A !== O)
          a(A);
        else
          break;
      }
    }
    const y = s(x), E = o(x);
    return a(x), r(
      null,
      T,
      E,
      y,
      v,
      C,
      es(E),
      D
    ), v && (v.vnode.el = T.el, oo(v, T.el)), y;
  }, L = (x, T = "[", v = "]") => {
    let C = 0;
    for (; x; )
      if (x = s(x), x && Ar(x) && (x.data === T && C++, x.data === v)) {
        if (C === 0)
          return s(x);
        C--;
      }
    return x;
  }, j = (x, T, v) => {
    const C = T.parentNode;
    C && C.replaceChild(x, T);
    let D = v;
    for (; D; )
      D.vnode.el === T && (D.vnode.el = D.subTree.el = x), D = D.parent;
  }, R = (x) => x.nodeType === 1 && x.tagName === "TEMPLATE";
  return [p, c];
}
function Rg(e, t, r, n, i) {
  let s, o, a, l;
  if (t === "class")
    e.$cls ? (a = e.$cls, delete e.$cls) : a = e.getAttribute("class"), l = bn(r), Ag(yc(a || ""), yc(l)) || (s = 2, o = "class");
  else if (t === "style") {
    a = e.getAttribute("style") || "", l = ae(r) ? r : Wp(yn(r));
    const d = bc(a), p = bc(l);
    if (n.dirs)
      for (const { dir: c, value: g } of n.dirs)
        c.name === "show" && !g && p.set("display", "none");
    i && Lf(i, n, p), Cg(d, p) || (s = 3, o = "style");
  } else (e instanceof SVGElement && sm(t) || e instanceof HTMLElement && (lc(t) || im(t))) && (lc(t) ? (a = e.hasAttribute(t), l = Sa(r)) : r == null ? (a = e.hasAttribute(t), l = !1) : (e.hasAttribute(t) ? a = e.getAttribute(t) : t === "value" && e.tagName === "TEXTAREA" ? a = e.value : a = !1, l = om(r) ? String(r) : !1), a !== l && (s = 4, o = t));
  if (s != null && !di(e, s)) {
    const d = (g) => g === !1 ? "(not rendered)" : `${o}="${g}"`, p = `Hydration ${kf[s]} mismatch on`, c = `
  - rendered on server: ${d(a)}
  - expected on client: ${d(l)}
  Note: this mismatch is check-only. The DOM will not be rectified in production due to performance overhead.
  You should fix the source of the mismatch.`;
    return ur(p, e, c), !0;
  }
  return !1;
}
function yc(e) {
  return new Set(e.trim().split(/\s+/));
}
function Ag(e, t) {
  if (e.size !== t.size)
    return !1;
  for (const r of e)
    if (!t.has(r))
      return !1;
  return !0;
}
function bc(e) {
  const t = /* @__PURE__ */ new Map();
  for (const r of e.split(";")) {
    let [n, i] = r.split(":");
    n = n.trim(), i = i && i.trim(), n && i && t.set(n, i);
  }
  return t;
}
function Cg(e, t) {
  if (e.size !== t.size)
    return !1;
  for (const [r, n] of e)
    if (n !== t.get(r))
      return !1;
  return !0;
}
function Lf(e, t, r) {
  const n = e.subTree;
  if (e.getCssVars && (t === n || n && n.type === je && n.children.includes(t))) {
    const i = e.getCssVars();
    for (const s in i) {
      const o = Gu(i[s]);
      r.set(`--${lm(s)}`, o);
    }
  }
  t === n && e.parent && Lf(e.parent, e.vnode, r);
}
const bs = "data-allow-mismatch", kf = {
  0: "text",
  1: "children",
  2: "class",
  3: "style",
  4: "attribute"
};
function di(e, t) {
  if (t === 0 || t === 1)
    for (; e && !e.hasAttribute(bs); )
      e = e.parentElement;
  return La(
    e && e.getAttribute(bs),
    t
  );
}
function La(e, t) {
  if (e == null)
    return !1;
  if (e === "")
    return !0;
  {
    const r = e.split(",");
    return t === 0 && r.includes("children") ? !0 : r.includes(kf[t]);
  }
}
function Og(e, t) {
  return di(
    e.parentElement,
    1
    /* CHILDREN */
  ) || Pg(e) || Mg(t);
}
function Pg(e) {
  return e.nodeType === 1 && La(
    e.getAttribute(bs),
    1
    /* CHILDREN */
  );
}
function Mg({ props: e }) {
  const t = e && e[bs];
  return typeof t == "string" && La(
    t,
    1
    /* CHILDREN */
  );
}
const Dg = Pr().requestIdleCallback || ((e) => setTimeout(e, 1)), Lg = Pr().cancelIdleCallback || ((e) => clearTimeout(e)), kg = (e = 1e4) => (t) => {
  const r = Dg(t, { timeout: e });
  return () => Lg(r);
};
function jg(e) {
  const { top: t, left: r, bottom: n, right: i } = e.getBoundingClientRect(), { innerHeight: s, innerWidth: o } = window;
  return (t > 0 && t < s || n > 0 && n < s) && (r > 0 && r < o || i > 0 && i < o);
}
const Fg = (e) => (t, r) => {
  const n = new IntersectionObserver((i) => {
    for (const s of i)
      if (s.isIntersecting) {
        n.disconnect(), t();
        break;
      }
  }, e);
  return r((i) => {
    if (i instanceof Element) {
      if (jg(i))
        return t(), n.disconnect(), !1;
      n.observe(i);
    }
  }), () => n.disconnect();
}, Bg = (e) => (t) => {
  if (e) {
    const r = matchMedia(e);
    if (r.matches)
      t();
    else
      return r.addEventListener("change", t, { once: !0 }), () => r.removeEventListener("change", t);
  }
}, Ug = (e = []) => (t, r) => {
  ae(e) && (e = [e]);
  let n = !1;
  const i = (o) => {
    n || (n = !0, s(), t(), o.target.dispatchEvent(new o.constructor(o.type, o)));
  }, s = () => {
    r((o) => {
      for (const a of e)
        o.removeEventListener(a, i);
    });
  };
  return r((o) => {
    for (const a of e)
      o.addEventListener(a, i, { once: !0 });
  }), s;
};
function $g(e, t) {
  if (Ar(e) && e.data === "[") {
    let r = 1, n = e.nextSibling;
    for (; n; ) {
      if (n.nodeType === 1) {
        if (t(n) === !1)
          break;
      } else if (Ar(n))
        if (n.data === "]") {
          if (--r === 0) break;
        } else n.data === "[" && r++;
      n = n.nextSibling;
    }
  } else
    t(e);
}
const Zt = (e) => !!e.type.__asyncLoader;
// @__NO_SIDE_EFFECTS__
function Vg(e) {
  oe(e) && (e = { loader: e });
  const {
    loader: t,
    loadingComponent: r,
    errorComponent: n,
    delay: i = 200,
    hydrate: s,
    timeout: o,
    // undefined = never times out
    suspensible: a = !0,
    onError: l
  } = e;
  let d = null, p, c = 0;
  const g = () => (c++, d = null, _()), _ = () => {
    let S;
    return d || (S = d = t().catch((w) => {
      if (w = w instanceof Error ? w : new Error(String(w)), l)
        return new Promise((L, j) => {
          l(w, () => L(g()), () => j(w), c + 1);
        });
      throw w;
    }).then((w) => S !== d && d ? d : (w && (w.__esModule || w[Symbol.toStringTag] === "Module") && (w = w.default), p = w, w)));
  };
  return /* @__PURE__ */ Ma({
    name: "AsyncComponentWrapper",
    __asyncLoader: _,
    __asyncHydrate(S, w, L) {
      let j = !1;
      (w.bu || (w.bu = [])).push(() => j = !0);
      const R = () => {
        j || L();
      }, x = s ? () => {
        const T = s(
          R,
          (v) => $g(S, v)
        );
        T && (w.bum || (w.bum = [])).push(T);
      } : R;
      p ? x() : _().then(() => !w.isUnmounted && x());
    },
    get __asyncResolved() {
      return p;
    },
    setup() {
      const S = qe;
      if (Da(S), p)
        return () => ts(p, S);
      const w = (v) => {
        d = null, qr(
          v,
          S,
          13,
          !n
        );
      };
      if (a && S.suspense || Br)
        return _().then((v) => () => ts(v, S)).catch((v) => (w(v), () => n ? Ce(n, {
          error: v
        }) : null));
      const L = /* @__PURE__ */ Ee(!1), j = /* @__PURE__ */ Ee(), R = /* @__PURE__ */ Ee(!!i);
      let x, T;
      return Sn(() => {
        x != null && clearTimeout(x), T != null && clearTimeout(T);
      }), i && (T = setTimeout(() => {
        S.isUnmounted || (R.value = !1);
      }, i)), o != null && (x = setTimeout(() => {
        if (!S.isUnmounted && !L.value && !j.value) {
          const v = new Error(
            `Async component timed out after ${o}ms.`
          );
          w(v), j.value = v;
        }
      }, o)), _().then(() => {
        S.isUnmounted || (L.value = !0, S.parent && Bi(S.parent.vnode) && S.parent.update());
      }).catch((v) => {
        if (S.isUnmounted) {
          d = null;
          return;
        }
        w(v), j.value = v;
      }), () => {
        if (L.value && p)
          return ts(p, S);
        if (j.value && n)
          return Ce(n, {
            error: j.value
          });
        if (r && !R.value)
          return ts(
            r,
            S
          );
      };
    }
  });
}
function ts(e, t) {
  const { ref: r, props: n, children: i, ce: s } = t.vnode, o = Ce(e, n, i);
  return o.ref = r, o.ce = s, delete t.vnode.ce, o;
}
const Bi = (e) => e.type.__isKeepAlive, Qg = {
  name: "KeepAlive",
  // Marker for special handling inside the renderer. We are not using a ===
  // check directly on KeepAlive in the renderer, because importing it directly
  // would prevent it from being tree-shaken.
  __isKeepAlive: !0,
  props: {
    include: [String, RegExp, Array],
    exclude: [String, RegExp, Array],
    max: [String, Number]
  },
  setup(e, { slots: t }) {
    const r = it(), n = r.ctx;
    if (!n.renderer)
      return () => {
        const R = t.default && t.default();
        return R && R.length === 1 ? R[0] : R;
      };
    const i = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Set();
    let o = null;
    __VUE_PROD_DEVTOOLS__ && (r.__v_cache = i);
    const a = r.suspense, {
      renderer: {
        p: l,
        m: d,
        um: p,
        o: { createElement: c }
      }
    } = n, g = c("div");
    n.activate = (R, x, T, v, C) => {
      const D = R.component;
      d(R, x, T, 0, a), l(
        D.vnode,
        R,
        x,
        T,
        D,
        a,
        v,
        R.slotScopeIds,
        C
      ), ke(() => {
        D.isDeactivated = !1, D.a && tn(D.a);
        const F = R.props && R.props.onVnodeMounted;
        F && ot(F, D.parent, R);
      }, a), __VUE_PROD_DEVTOOLS__ && Ho(D);
    }, n.deactivate = (R) => {
      const x = R.component;
      Ss(x.m), Ss(x.a), d(R, g, null, 1, a), ke(() => {
        x.da && tn(x.da);
        const T = R.props && R.props.onVnodeUnmounted;
        T && ot(T, x.parent, R), x.isDeactivated = !0;
      }, a), __VUE_PROD_DEVTOOLS__ && Ho(x);
    };
    function _(R) {
      Co(R), p(R, r, a, !0);
    }
    function S(R) {
      i.forEach((x, T) => {
        const v = Ns(
          Zt(x) ? x.type.__asyncResolved || {} : x.type
        );
        v && !R(v) && w(T);
      });
    }
    function w(R) {
      const x = i.get(R);
      x && (!o || !wt(x, o)) ? _(x) : o && Co(o), i.delete(R), s.delete(R);
    }
    gr(
      () => [e.include, e.exclude],
      ([R, x]) => {
        R && S((T) => oi(R, T)), x && S((T) => !oi(x, T));
      },
      // prune post-render after `current` has been updated
      { flush: "post", deep: !0 }
    );
    let L = null;
    const j = () => {
      L != null && (vs(r.subTree.type) ? ke(() => {
        i.set(L, rs(r.subTree));
      }, r.subTree.suspense) : i.set(L, rs(r.subTree)));
    };
    return Tn(j), no(j), io(() => {
      i.forEach((R) => {
        const { subTree: x, suspense: T } = r, v = rs(x);
        if (R.type === v.type && R.key === v.key) {
          Co(v);
          const C = v.component.da;
          C && ke(C, T);
          return;
        }
        _(R);
      });
    }), () => {
      if (L = null, !t.default)
        return o = null;
      const R = t.default(), x = R[0];
      if (R.length > 1)
        return o = null, R;
      if (!ir(x) || !(x.shapeFlag & 4) && !(x.shapeFlag & 128))
        return o = null, x;
      let T = rs(x);
      if (T.type === Pe)
        return o = null, T;
      const v = T.type, C = Ns(
        Zt(T) ? T.type.__asyncResolved || {} : v
      ), { include: D, exclude: F, max: y } = e;
      if (D && (!C || !oi(D, C)) || F && C && oi(F, C))
        return T.shapeFlag &= -257, o = T, x;
      const E = T.key == null ? v : T.key, O = i.get(E);
      return T.el && (T = kt(T), x.shapeFlag & 128 && (x.ssContent = T)), L = E, O ? (T.el = O.el, T.component = O.component, T.transition && nr(T, T.transition), T.shapeFlag |= 512, s.delete(E), s.add(E)) : (s.add(E), y && s.size > parseInt(y, 10) && w(s.values().next().value)), T.shapeFlag |= 256, o = T, vs(x.type) ? x : T;
    };
  }
}, Hg = Qg;
function oi(e, t) {
  return Z(e) ? e.some((r) => oi(r, t)) : ae(e) ? e.split(",").includes(t) : kp(e) ? (e.lastIndex = 0, e.test(t)) : !1;
}
function jf(e, t) {
  Bf(e, "a", t);
}
function Ff(e, t) {
  Bf(e, "da", t);
}
function Bf(e, t, r = qe) {
  const n = e.__wdc || (e.__wdc = () => {
    let i = r;
    for (; i; ) {
      if (i.isDeactivated)
        return;
      i = i.parent;
    }
    return e();
  });
  if (ro(t, n, r), r) {
    let i = r.parent;
    for (; i && i.parent; )
      Bi(i.parent.vnode) && qg(n, t, r, i), i = i.parent;
  }
}
function qg(e, t, r, n) {
  const i = ro(
    t,
    e,
    n,
    !0
    /* prepend */
  );
  Sn(() => {
    ba(n[t], i);
  }, r);
}
function Co(e) {
  e.shapeFlag &= -257, e.shapeFlag &= -513;
}
function rs(e) {
  return e.shapeFlag & 128 ? e.ssContent : e;
}
function ro(e, t, r = qe, n = !1) {
  if (r) {
    const i = r[e] || (r[e] = []), s = t.__weh || (t.__weh = (...o) => {
      Rt();
      const a = vn(r), l = ht(t, r, e, o);
      return a(), At(), l;
    });
    return n ? i.unshift(s) : i.push(s), s;
  }
}
const or = (e) => (t, r = qe) => {
  (!Br || e === "sp") && ro(e, (...n) => t(...n), r);
}, Uf = or("bm"), Tn = or("m"), ka = or(
  "bu"
), no = or("u"), io = or(
  "bum"
), Sn = or("um"), $f = or(
  "sp"
), Vf = or("rtg"), Qf = or("rtc");
function Hf(e, t = qe) {
  ro("ec", e, t);
}
const ja = "components", Kg = "directives";
function Wg(e, t) {
  return Fa(ja, e, !0, t) || e;
}
const qf = /* @__PURE__ */ Symbol.for("v-ndc");
function Gg(e) {
  return ae(e) ? Fa(ja, e, !1) || e : e || qf;
}
function zg(e) {
  return Fa(Kg, e);
}
function Fa(e, t, r = !0, n = !1) {
  const i = Ke || qe;
  if (i) {
    const s = i.type;
    if (e === ja) {
      const a = Ns(
        s,
        !1
      );
      if (a && (a === t || a === we(t) || a === Qr(we(t))))
        return s;
    }
    const o = (
      // local registration
      // check instance[type] first which is resolved for options API
      Tc(i[e] || s[e], t) || // global registration
      Tc(i.appContext[e], t)
    );
    return !o && n ? s : o;
  }
}
function Tc(e, t) {
  return e && (e[t] || e[we(t)] || e[Qr(we(t))]);
}
function Yg(e, t, r, n) {
  let i;
  const s = r && r[n], o = Z(e);
  if (o || ae(e)) {
    const a = o && /* @__PURE__ */ Jt(e);
    let l = !1, d = !1;
    a && (l = !/* @__PURE__ */ ct(e), d = /* @__PURE__ */ Lt(e), e = zs(e)), i = new Array(e.length);
    for (let p = 0, c = e.length; p < c; p++)
      i[p] = t(
        l ? d ? ln(Ct(e[p])) : Ct(e[p]) : e[p],
        p,
        void 0,
        s && s[p]
      );
  } else if (typeof e == "number") {
    i = new Array(e);
    for (let a = 0; a < e; a++)
      i[a] = t(a + 1, a, void 0, s && s[a]);
  } else if (ye(e))
    if (e[Symbol.iterator])
      i = Array.from(
        e,
        (a, l) => t(a, l, void 0, s && s[l])
      );
    else {
      const a = Object.keys(e);
      i = new Array(a.length);
      for (let l = 0, d = a.length; l < d; l++) {
        const p = a[l];
        i[l] = t(e[p], p, l, s && s[l]);
      }
    }
  else
    i = [];
  return r && (r[n] = i), i;
}
function Xg(e, t) {
  for (let r = 0; r < t.length; r++) {
    const n = t[r];
    if (Z(n))
      for (let i = 0; i < n.length; i++)
        e[n[i].name] = n[i].fn;
    else n && (e[n.name] = n.key ? (...i) => {
      const s = n.fn(...i);
      return s && (s.key = n.key), s;
    } : n.fn);
  }
  return e;
}
function Jg(e, t, r = {}, n, i) {
  if (Ke.ce || Ke.parent && Zt(Ke.parent) && Ke.parent.ce) {
    const d = Object.keys(r).length > 0;
    return t !== "default" && (r.name = t), wi(), Es(
      je,
      null,
      [Ce("slot", r, n && n())],
      d ? -2 : 64
    );
  }
  let s = e[t];
  s && s._c && (s._d = !1), wi();
  const o = s && Ba(s(r)), a = r.key || // slot content array of a dynamic conditional slot may have a branch
  // key attached in the `createSlots` helper, respect that
  o && o.key, l = Es(
    je,
    {
      key: (a && !Ze(a) ? a : `_${t}`) + // #7256 force differentiate fallback content from actual content
      (!o && n ? "_fb" : "")
    },
    o || (n ? n() : []),
    o && e._ === 1 ? 64 : -2
  );
  return !i && l.scopeId && (l.slotScopeIds = [l.scopeId + "-s"]), s && s._c && (s._d = !0), l;
}
function Ba(e) {
  return e.some((t) => ir(t) ? !(t.type === Pe || t.type === je && !Ba(t.children)) : !0) ? e : null;
}
function Zg(e, t) {
  const r = {};
  for (const n in e)
    r[t && /[A-Z]/.test(n) ? `on:${n}` : en(n)] = e[n];
  return r;
}
const Wo = (e) => e ? Sd(e) ? Ui(e) : Wo(e.parent) : null, hi = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ fe(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Wo(e.parent),
    $root: (e) => Wo(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => __VUE_OPTIONS_API__ ? Ua(e) : e.type,
    $forceUpdate: (e) => e.f || (e.f = () => {
      Na(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = ji.bind(e.proxy)),
    $watch: (e) => __VUE_OPTIONS_API__ ? _g.bind(e) : Qe
  })
), Oo = (e, t) => e !== de && !e.__isScriptSetup && Te(e, t), Go = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: r, setupState: n, data: i, props: s, accessCache: o, type: a, appContext: l } = e;
    if (t[0] !== "$") {
      const g = o[t];
      if (g !== void 0)
        switch (g) {
          case 1:
            return n[t];
          case 2:
            return i[t];
          case 4:
            return r[t];
          case 3:
            return s[t];
        }
      else {
        if (Oo(n, t))
          return o[t] = 1, n[t];
        if (__VUE_OPTIONS_API__ && i !== de && Te(i, t))
          return o[t] = 2, i[t];
        if (Te(s, t))
          return o[t] = 3, s[t];
        if (r !== de && Te(r, t))
          return o[t] = 4, r[t];
        (!__VUE_OPTIONS_API__ || zo) && (o[t] = 0);
      }
    }
    const d = hi[t];
    let p, c;
    if (d)
      return t === "$attrs" && Ye(e.attrs, "get", ""), d(e);
    if (
      // css module (injected by vue-loader)
      (p = a.__cssModules) && (p = p[t])
    )
      return p;
    if (r !== de && Te(r, t))
      return o[t] = 4, r[t];
    if (
      // global properties
      c = l.config.globalProperties, Te(c, t)
    )
      return c[t];
  },
  set({ _: e }, t, r) {
    const { data: n, setupState: i, ctx: s } = e;
    return Oo(i, t) ? (i[t] = r, !0) : __VUE_OPTIONS_API__ && n !== de && Te(n, t) ? (n[t] = r, !0) : Te(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (s[t] = r, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: r, ctx: n, appContext: i, props: s, type: o }
  }, a) {
    let l;
    return !!(r[a] || __VUE_OPTIONS_API__ && e !== de && a[0] !== "$" && Te(e, a) || Oo(t, a) || Te(s, a) || Te(n, a) || Te(hi, a) || Te(i.config.globalProperties, a) || (l = o.__cssModules) && l[a]);
  },
  defineProperty(e, t, r) {
    return r.get != null ? e._.accessCache[t] = 0 : Te(r, "value") && this.set(e, t, r.value, null), Reflect.defineProperty(e, t, r);
  }
}, e_ = /* @__PURE__ */ fe({}, Go, {
  get(e, t) {
    if (t !== Symbol.unscopables)
      return Go.get(e, t, e);
  },
  has(e, t) {
    return t[0] !== "_" && !Qp(t);
  }
});
function t_() {
  return null;
}
function r_() {
  return null;
}
function n_(e) {
}
function i_(e) {
}
function s_() {
  return null;
}
function o_() {
}
function a_(e, t) {
  return null;
}
function l_() {
  return Kf().slots;
}
function c_() {
  return Kf().attrs;
}
function Kf(e) {
  const t = it();
  return t.setupContext || (t.setupContext = wd(t));
}
function Ei(e) {
  return Z(e) ? e.reduce(
    (t, r) => (t[r] = null, t),
    {}
  ) : e;
}
function u_(e, t) {
  const r = Ei(e);
  for (const n in t) {
    if (n.startsWith("__skip")) continue;
    let i = r[n];
    i ? Z(i) || oe(i) ? i = r[n] = { type: i, default: t[n] } : i.default = t[n] : i === null && (i = r[n] = { default: t[n] }), i && t[`__skip_${n}`] && (i.skipFactory = !0);
  }
  return r;
}
function f_(e, t) {
  return !e || !t ? e || t : Z(e) && Z(t) ? e.concat(t) : fe({}, Ei(e), Ei(t));
}
function d_(e, t) {
  const r = {};
  for (const n in e)
    t.includes(n) || Object.defineProperty(r, n, {
      enumerable: !0,
      get: () => e[n]
    });
  return r;
}
function h_(e) {
  const t = it(), r = Br;
  let n = e();
  Ni(), r && on(!1);
  const i = () => {
    vn(t), r && on(!0);
  }, s = () => {
    it() !== t && t.scope.off(), Ni(), r && on(!1);
  };
  return Ta(n) && (n = n.catch((o) => {
    throw i(), Promise.resolve().then(() => Promise.resolve().then(s)), o;
  })), [
    n,
    () => {
      i(), Promise.resolve().then(s);
    }
  ];
}
let zo = !0;
function p_(e) {
  const t = Ua(e), r = e.proxy, n = e.ctx;
  zo = !1, t.beforeCreate && Sc(t.beforeCreate, e, "bc");
  const {
    // state
    data: i,
    computed: s,
    methods: o,
    watch: a,
    provide: l,
    inject: d,
    // lifecycle
    created: p,
    beforeMount: c,
    mounted: g,
    beforeUpdate: _,
    updated: S,
    activated: w,
    deactivated: L,
    beforeDestroy: j,
    beforeUnmount: R,
    destroyed: x,
    unmounted: T,
    render: v,
    renderTracked: C,
    renderTriggered: D,
    errorCaptured: F,
    serverPrefetch: y,
    // public API
    expose: E,
    inheritAttrs: O,
    // assets
    components: A,
    directives: $,
    filters: Y
  } = t;
  if (d && m_(d, n, null), o)
    for (const te in o) {
      const ee = o[te];
      oe(ee) && (n[te] = ee.bind(r));
    }
  if (i) {
    const te = i.call(r, r);
    ye(te) && (e.data = /* @__PURE__ */ Xs(te));
  }
  if (zo = !0, s)
    for (const te in s) {
      const ee = s[te], ge = oe(ee) ? ee.bind(r, r) : oe(ee.get) ? ee.get.bind(r, r) : Qe, se = !oe(ee) && oe(ee.set) ? ee.set.bind(r) : Qe, ie = Xr({
        get: ge,
        set: se
      });
      Object.defineProperty(n, te, {
        enumerable: !0,
        configurable: !0,
        get: () => ie.value,
        set: (be) => ie.value = be
      });
    }
  if (a)
    for (const te in a)
      Wf(a[te], n, r, te);
  if (l) {
    const te = oe(l) ? l.call(r) : l;
    Reflect.ownKeys(te).forEach((ee) => {
      If(ee, te[ee]);
    });
  }
  p && Sc(p, e, "c");
  function W(te, ee) {
    Z(ee) ? ee.forEach((ge) => te(ge.bind(r))) : ee && te(ee.bind(r));
  }
  if (W(Uf, c), W(Tn, g), W(ka, _), W(no, S), W(jf, w), W(Ff, L), W(Hf, F), W(Qf, C), W(Vf, D), W(io, R), W(Sn, T), W($f, y), Z(E))
    if (E.length) {
      const te = e.exposed || (e.exposed = {});
      E.forEach((ee) => {
        Object.defineProperty(te, ee, {
          get: () => r[ee],
          set: (ge) => r[ee] = ge,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  v && e.render === Qe && (e.render = v), O != null && (e.inheritAttrs = O), A && (e.components = A), $ && (e.directives = $), y && Da(e);
}
function m_(e, t, r = Qe) {
  Z(e) && (e = Yo(e));
  for (const n in e) {
    const i = e[n];
    let s;
    ye(i) ? "default" in i ? s = fi(
      i.from || n,
      i.default,
      !0
    ) : s = fi(i.from || n) : s = fi(i), /* @__PURE__ */ De(s) ? Object.defineProperty(t, n, {
      enumerable: !0,
      configurable: !0,
      get: () => s.value,
      set: (o) => s.value = o
    }) : t[n] = s;
  }
}
function Sc(e, t, r) {
  ht(
    Z(e) ? e.map((n) => n.bind(t.proxy)) : e.bind(t.proxy),
    t,
    r
  );
}
function Wf(e, t, r, n) {
  let i = n.includes(".") ? Rf(r, n) : () => r[n];
  if (ae(e)) {
    const s = t[e];
    oe(s) && gr(i, s);
  } else if (oe(e))
    gr(i, e.bind(r));
  else if (ye(e))
    if (Z(e))
      e.forEach((s) => Wf(s, t, r, n));
    else {
      const s = oe(e.handler) ? e.handler.bind(r) : t[e.handler];
      oe(s) && gr(i, s, e);
    }
}
function Ua(e) {
  const t = e.type, { mixins: r, extends: n } = t, {
    mixins: i,
    optionsCache: s,
    config: { optionMergeStrategies: o }
  } = e.appContext, a = s.get(t);
  let l;
  return a ? l = a : !i.length && !r && !n ? l = t : (l = {}, i.length && i.forEach(
    (d) => Ts(l, d, o, !0)
  ), Ts(l, t, o)), ye(t) && s.set(t, l), l;
}
function Ts(e, t, r, n = !1) {
  const { mixins: i, extends: s } = t;
  s && Ts(e, s, r, !0), i && i.forEach(
    (o) => Ts(e, o, r, !0)
  );
  for (const o in t)
    if (!(n && o === "expose")) {
      const a = g_[o] || r && r[o];
      e[o] = a ? a(e[o], t[o]) : t[o];
    }
  return e;
}
const g_ = {
  data: vc,
  props: Ec,
  emits: Ec,
  // objects
  methods: ai,
  computed: ai,
  // lifecycle
  beforeCreate: tt,
  created: tt,
  beforeMount: tt,
  mounted: tt,
  beforeUpdate: tt,
  updated: tt,
  beforeDestroy: tt,
  beforeUnmount: tt,
  destroyed: tt,
  unmounted: tt,
  activated: tt,
  deactivated: tt,
  errorCaptured: tt,
  serverPrefetch: tt,
  // assets
  components: ai,
  directives: ai,
  // watch
  watch: y_,
  // provide / inject
  provide: vc,
  inject: __
};
function vc(e, t) {
  return t ? e ? function() {
    return fe(
      oe(e) ? e.call(this, this) : e,
      oe(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function __(e, t) {
  return ai(Yo(e), Yo(t));
}
function Yo(e) {
  if (Z(e)) {
    const t = {};
    for (let r = 0; r < e.length; r++)
      t[e[r]] = e[r];
    return t;
  }
  return e;
}
function tt(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function ai(e, t) {
  return e ? fe(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Ec(e, t) {
  return e ? Z(e) && Z(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : fe(
    /* @__PURE__ */ Object.create(null),
    Ei(e),
    Ei(t ?? {})
  ) : t;
}
function y_(e, t) {
  if (!e) return t;
  if (!t) return e;
  const r = fe(/* @__PURE__ */ Object.create(null), e);
  for (const n in t)
    r[n] = tt(e[n], t[n]);
  return r;
}
function Gf() {
  return {
    app: null,
    config: {
      isNativeTag: Yr,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let b_ = 0;
function T_(e, t) {
  return function(n, i = null) {
    oe(n) || (n = fe({}, n)), i != null && !ye(i) && (i = null);
    const s = Gf(), o = /* @__PURE__ */ new WeakSet(), a = [];
    let l = !1;
    const d = s.app = {
      _uid: b_++,
      _component: n,
      _props: i,
      _container: null,
      _context: s,
      _instance: null,
      version: ta,
      get config() {
        return s.config;
      },
      set config(p) {
      },
      use(p, ...c) {
        return o.has(p) || (p && oe(p.install) ? (o.add(p), p.install(d, ...c)) : oe(p) && (o.add(p), p(d, ...c))), d;
      },
      mixin(p) {
        return __VUE_OPTIONS_API__ && (s.mixins.includes(p) || s.mixins.push(p)), d;
      },
      component(p, c) {
        return c ? (s.components[p] = c, d) : s.components[p];
      },
      directive(p, c) {
        return c ? (s.directives[p] = c, d) : s.directives[p];
      },
      mount(p, c, g) {
        if (!l) {
          const _ = d._ceVNode || Ce(n, i);
          return _.appContext = s, g === !0 ? g = "svg" : g === !1 && (g = void 0), c && t ? t(_, p) : e(_, p, g), l = !0, d._container = p, p.__vue_app__ = d, __VUE_PROD_DEVTOOLS__ && (d._instance = _.component, sg(d, ta)), Ui(_.component);
        }
      },
      onUnmount(p) {
        a.push(p);
      },
      unmount() {
        l && (ht(
          a,
          d._instance,
          16
        ), e(null, d._container), __VUE_PROD_DEVTOOLS__ && (d._instance = null, og(d)), delete d._container.__vue_app__);
      },
      provide(p, c) {
        return s.provides[p] = c, d;
      },
      runWithContext(p) {
        const c = Lr;
        Lr = d;
        try {
          return p();
        } finally {
          Lr = c;
        }
      }
    };
    return d;
  };
}
let Lr = null;
function S_(e, t, r = de) {
  const n = it(), i = we(t), s = nt(t), o = zf(e, i), a = gf((l, d) => {
    let p, c = de, g;
    return Nf(() => {
      const _ = e[i];
      Ve(p, _) && (p = _, d());
    }), {
      get() {
        return l(), r.get ? r.get(p) : p;
      },
      set(_) {
        const S = r.set ? r.set(_) : _;
        if (!Ve(S, p) && !(c !== de && Ve(_, c)))
          return;
        const w = n.vnode.props, L = !!(w && // check if parent has passed v-model
        (t in w || i in w || s in w) && (`onUpdate:${t}` in w || `onUpdate:${i}` in w || `onUpdate:${s}` in w));
        L || (p = _, d()), n.emit(`update:${t}`, S), Ve(_, c) && (Ve(_, S) && !Ve(S, g) || // #13524: browsers differ in when they flush microtasks between
        // event listeners. If a v-model listener emits an intermediate value
        // and a following listener restores the model to its previous prop
        // value before parent updates are flushed, the parent render can be
        // deduped as having no prop change. Force a local update so DOM state
        // such as an input's value is synchronized back to the current model.
        L && c !== de && !Ve(S, p)) && d(), c = _, g = S;
      }
    };
  });
  return a[Symbol.iterator] = () => {
    let l = 0;
    return {
      next() {
        return l < 2 ? { value: l++ ? o || de : a, done: !1 } : { done: !0 };
      }
    };
  }, a;
}
const zf = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${we(t)}Modifiers`] || e[`${nt(t)}Modifiers`];
function v_(e, t, ...r) {
  if (e.isUnmounted) return;
  const n = e.vnode.props || de;
  let i = r;
  const s = t.startsWith("update:"), o = s && zf(n, t.slice(7));
  o && (o.trim && (i = r.map((p) => ae(p) ? p.trim() : p)), o.number && (i = r.map(Ks))), __VUE_PROD_DEVTOOLS__ && cg(e, t, i);
  let a, l = n[a = en(t)] || // also try camelCase event handler (#2249)
  n[a = en(we(t))];
  !l && s && (l = n[a = en(nt(t))]), l && ht(
    l,
    e,
    6,
    i
  );
  const d = n[a + "Once"];
  if (d) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[a])
      return;
    e.emitted[a] = !0, ht(
      d,
      e,
      6,
      i
    );
  }
}
const E_ = /* @__PURE__ */ new WeakMap();
function Yf(e, t, r = !1) {
  const n = __VUE_OPTIONS_API__ && r ? E_ : t.emitsCache, i = n.get(e);
  if (i !== void 0)
    return i;
  const s = e.emits;
  let o = {}, a = !1;
  if (__VUE_OPTIONS_API__ && !oe(e)) {
    const l = (d) => {
      const p = Yf(d, t, !0);
      p && (a = !0, fe(o, p));
    };
    !r && t.mixins.length && t.mixins.forEach(l), e.extends && l(e.extends), e.mixins && e.mixins.forEach(l);
  }
  return !s && !a ? (ye(e) && n.set(e, null), null) : (Z(s) ? s.forEach((l) => o[l] = null) : fe(o, s), ye(e) && n.set(e, o), o);
}
function so(e, t) {
  return !e || !$r(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), Te(e, t[0].toLowerCase() + t.slice(1)) || Te(e, nt(t)) || Te(e, t));
}
function os(e) {
  const {
    type: t,
    vnode: r,
    proxy: n,
    withProxy: i,
    propsOptions: [s],
    slots: o,
    attrs: a,
    emit: l,
    render: d,
    renderCache: p,
    props: c,
    data: g,
    setupState: _,
    ctx: S,
    inheritAttrs: w
  } = e, L = vi(e);
  let j, R;
  try {
    if (r.shapeFlag & 4) {
      const T = i || n, v = T;
      j = at(
        d.call(
          v,
          T,
          p,
          c,
          _,
          g,
          S
        )
      ), R = a;
    } else {
      const T = t;
      j = at(
        T.length > 1 ? T(
          c,
          { attrs: a, slots: o, emit: l }
        ) : T(
          c,
          null
        )
      ), R = t.props ? a : w_(a);
    }
  } catch (T) {
    pi.length = 0, qr(T, e, 1), j = Ce(Pe);
  }
  let x = j;
  if (R && w !== !1) {
    const T = Object.keys(R), { shapeFlag: v } = x;
    T.length && v & 7 && (s && T.some(Vs) && (R = x_(
      R,
      s
    )), x = kt(x, R, !1, !0));
  }
  return r.dirs && (x = kt(x, null, !1, !0), x.dirs = x.dirs ? x.dirs.concat(r.dirs) : r.dirs), r.transition && nr(x, r.transition), j = x, vi(L), j;
}
function I_(e, t = !0) {
  let r;
  for (let n = 0; n < e.length; n++) {
    const i = e[n];
    if (ir(i)) {
      if (i.type !== Pe || i.children === "v-if") {
        if (r)
          return;
        r = i;
      }
    } else
      return;
  }
  return r;
}
const w_ = (e) => {
  let t;
  for (const r in e)
    (r === "class" || r === "style" || $r(r)) && ((t || (t = {}))[r] = e[r]);
  return t;
}, x_ = (e, t) => {
  const r = {};
  for (const n in e)
    (!Vs(n) || !(n.slice(9) in t)) && (r[n] = e[n]);
  return r;
};
function N_(e, t, r) {
  const { props: n, children: i, component: s } = e, { props: o, children: a, patchFlag: l } = t, d = s.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (r && l >= 0) {
    if (l & 1024)
      return !0;
    if (l & 16)
      return n ? Ic(n, o, d) : !!o;
    if (l & 8) {
      const p = t.dynamicProps;
      for (let c = 0; c < p.length; c++) {
        const g = p[c];
        if (Xf(o, n, g) && !so(d, g))
          return !0;
      }
    }
  } else
    return (i || a) && (!a || !a.$stable) ? !0 : n === o ? !1 : n ? o ? Ic(n, o, d) : !0 : !!o;
  return !1;
}
function Ic(e, t, r) {
  const n = Object.keys(t);
  if (n.length !== Object.keys(e).length)
    return !0;
  for (let i = 0; i < n.length; i++) {
    const s = n[i];
    if (Xf(t, e, s) && !so(r, s))
      return !0;
  }
  return !1;
}
function Xf(e, t, r) {
  const n = e[r], i = t[r];
  return r === "style" && ye(n) && ye(i) ? !rr(n, i) : n !== i;
}
function oo({ vnode: e, parent: t, suspense: r }, n) {
  for (; t; ) {
    const i = t.subTree;
    if (i.suspense && i.suspense.activeBranch === e && (i.suspense.vnode.el = i.el = n, e = i), i === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
  r && r.activeBranch === e && (r.vnode.el = n);
}
const Jf = {}, Zf = () => Object.create(Jf), ed = (e) => Object.getPrototypeOf(e) === Jf;
function R_(e, t, r, n = !1) {
  const i = {}, s = Zf();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), td(e, t, i, s);
  for (const o in e.propsOptions[0])
    o in i || (i[o] = void 0);
  r ? e.props = n ? i : /* @__PURE__ */ df(i) : e.type.props ? e.props = i : e.props = s, e.attrs = s;
}
function A_(e, t, r, n) {
  const {
    props: i,
    attrs: s,
    vnode: { patchFlag: o }
  } = e, a = /* @__PURE__ */ pe(i), [l] = e.propsOptions;
  let d = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (n || o > 0) && !(o & 16)
  ) {
    if (o & 8) {
      const p = e.vnode.dynamicProps;
      for (let c = 0; c < p.length; c++) {
        let g = p[c];
        if (so(e.emitsOptions, g))
          continue;
        const _ = t[g];
        if (l)
          if (Te(s, g))
            _ !== s[g] && (s[g] = _, d = !0);
          else {
            const S = we(g);
            i[S] = Xo(
              l,
              a,
              S,
              _,
              e,
              !1
            );
          }
        else
          _ !== s[g] && (s[g] = _, d = !0);
      }
    }
  } else {
    td(e, t, i, s) && (d = !0);
    let p;
    for (const c in a)
      (!t || // for camelCase
      !Te(t, c) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((p = nt(c)) === c || !Te(t, p))) && (l ? r && // for camelCase
      (r[c] !== void 0 || // for kebab-case
      r[p] !== void 0) && (i[c] = Xo(
        l,
        a,
        c,
        void 0,
        e,
        !0
      )) : delete i[c]);
    if (s !== a)
      for (const c in s)
        (!t || !Te(t, c)) && (delete s[c], d = !0);
  }
  d && Gt(e.attrs, "set", "");
}
function td(e, t, r, n) {
  const [i, s] = e.propsOptions;
  let o = !1, a;
  if (t)
    for (let l in t) {
      if (Xt(l))
        continue;
      const d = t[l];
      let p;
      i && Te(i, p = we(l)) ? !s || !s.includes(p) ? r[p] = d : (a || (a = {}))[p] = d : so(e.emitsOptions, l) || (!(l in n) || d !== n[l]) && (n[l] = d, o = !0);
    }
  if (s) {
    const l = /* @__PURE__ */ pe(r), d = a || de;
    for (let p = 0; p < s.length; p++) {
      const c = s[p];
      r[c] = Xo(
        i,
        l,
        c,
        d[c],
        e,
        !Te(d, c)
      );
    }
  }
  return o;
}
function Xo(e, t, r, n, i, s) {
  const o = e[r];
  if (o != null) {
    const a = Te(o, "default");
    if (a && n === void 0) {
      const l = o.default;
      if (o.type !== Function && !o.skipFactory && oe(l)) {
        const { propsDefaults: d } = i;
        if (r in d)
          n = d[r];
        else {
          const p = vn(i);
          n = d[r] = l.call(
            null,
            t
          ), p();
        }
      } else
        n = l;
      i.ce && i.ce._setProp(r, n);
    }
    o[
      0
      /* shouldCast */
    ] && (s && !a ? n = !1 : o[
      1
      /* shouldCastTrue */
    ] && (n === "" || n === nt(r)) && (n = !0));
  }
  return n;
}
const C_ = /* @__PURE__ */ new WeakMap();
function rd(e, t, r = !1) {
  const n = __VUE_OPTIONS_API__ && r ? C_ : t.propsCache, i = n.get(e);
  if (i)
    return i;
  const s = e.props, o = {}, a = [];
  let l = !1;
  if (__VUE_OPTIONS_API__ && !oe(e)) {
    const p = (c) => {
      l = !0;
      const [g, _] = rd(c, t, !0);
      fe(o, g), _ && a.push(..._);
    };
    !r && t.mixins.length && t.mixins.forEach(p), e.extends && p(e.extends), e.mixins && e.mixins.forEach(p);
  }
  if (!s && !l)
    return ye(e) && n.set(e, Jr), Jr;
  if (Z(s))
    for (let p = 0; p < s.length; p++) {
      const c = we(s[p]);
      wc(c) && (o[c] = de);
    }
  else if (s)
    for (const p in s) {
      const c = we(p);
      if (wc(c)) {
        const g = s[p], _ = o[c] = Z(g) || oe(g) ? { type: g } : fe({}, g), S = _.type;
        let w = !1, L = !0;
        if (Z(S))
          for (let j = 0; j < S.length; ++j) {
            const R = S[j], x = oe(R) && R.name;
            if (x === "Boolean") {
              w = !0;
              break;
            } else x === "String" && (L = !1);
          }
        else
          w = oe(S) && S.name === "Boolean";
        _[
          0
          /* shouldCast */
        ] = w, _[
          1
          /* shouldCastTrue */
        ] = L, (w || Te(_, "default")) && a.push(c);
      }
    }
  const d = [o, a];
  return ye(e) && n.set(e, d), d;
}
function wc(e) {
  return e[0] !== "$" && !Xt(e);
}
const $a = (e) => e === "_" || e === "_ctx" || e === "$stable", Va = (e) => Z(e) ? e.map(at) : [at(e)], O_ = (e, t, r) => {
  if (t._n)
    return t;
  const n = Ca((...i) => Va(t(...i)), r);
  return n._c = !1, n;
}, nd = (e, t, r) => {
  const n = e._ctx;
  for (const i in e) {
    if ($a(i)) continue;
    const s = e[i];
    if (oe(s))
      t[i] = O_(i, s, n);
    else if (s != null) {
      const o = Va(s);
      t[i] = () => o;
    }
  }
}, id = (e, t) => {
  const r = Va(t);
  e.slots.default = () => r;
}, sd = (e, t, r) => {
  for (const n in t)
    (r || !$a(n)) && (e[n] = t[n]);
}, P_ = (e, t, r) => {
  const n = e.slots = Zf();
  if (e.vnode.shapeFlag & 32) {
    const i = t._;
    i ? (sd(n, t, r), r && an(n, "_", i, !0)) : nd(t, n);
  } else t && id(e, t);
}, M_ = (e, t, r) => {
  const { vnode: n, slots: i } = e;
  let s = !0, o = de;
  if (n.shapeFlag & 32) {
    const a = t._;
    a ? r && a === 1 ? s = !1 : sd(i, t, r) : (s = !t.$stable, nd(t, i)), o = t;
  } else t && (id(e, t), o = { default: 1 });
  if (s)
    for (const a in i)
      !$a(a) && o[a] == null && delete i[a];
};
function D_() {
  typeof __VUE_OPTIONS_API__ != "boolean" && (Pr().__VUE_OPTIONS_API__ = !0), typeof __VUE_PROD_DEVTOOLS__ != "boolean" && (Pr().__VUE_PROD_DEVTOOLS__ = !1), typeof __VUE_PROD_HYDRATION_MISMATCH_DETAILS__ != "boolean" && (Pr().__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = !1);
}
const ke = hd;
function od(e) {
  return ld(e);
}
function ad(e) {
  return ld(e, Ng);
}
function ld(e, t) {
  D_();
  const r = Pr();
  r.__VUE__ = !0, __VUE_PROD_DEVTOOLS__ && Ra(r.__VUE_DEVTOOLS_GLOBAL_HOOK__, r);
  const {
    insert: n,
    remove: i,
    patchProp: s,
    createElement: o,
    createText: a,
    createComment: l,
    setText: d,
    setElementText: p,
    parentNode: c,
    nextSibling: g,
    setScopeId: _ = Qe,
    insertStaticContent: S
  } = e, w = (f, m, I, P = null, k = null, B = null, q = void 0, V = null, K = !!m.dynamicChildren) => {
    if (f === m)
      return;
    f && !wt(f, m) && (P = $e(f), be(f, k, B, !0), f = null), m.patchFlag === -2 && (K = !1, m.dynamicChildren = null);
    const { type: H, ref: re, shapeFlag: z } = m;
    switch (H) {
      case er:
        L(f, m, I, P);
        break;
      case Pe:
        j(f, m, I, P);
        break;
      case _r:
        f == null && R(m, I, P, q);
        break;
      case je:
        A(
          f,
          m,
          I,
          P,
          k,
          B,
          q,
          V,
          K
        );
        break;
      default:
        z & 1 ? v(
          f,
          m,
          I,
          P,
          k,
          B,
          q,
          V,
          K
        ) : z & 6 ? $(
          f,
          m,
          I,
          P,
          k,
          B,
          q,
          V,
          K
        ) : (z & 64 || z & 128) && H.process(
          f,
          m,
          I,
          P,
          k,
          B,
          q,
          V,
          K,
          We
        );
    }
    re != null && k ? nn(re, f && f.ref, B, m || f, !m) : re == null && f && f.ref != null && nn(f.ref, null, B, f, !0);
  }, L = (f, m, I, P) => {
    if (f == null)
      n(
        m.el = a(m.children),
        I,
        P
      );
    else {
      const k = m.el = f.el;
      m.children !== f.children && d(k, m.children);
    }
  }, j = (f, m, I, P) => {
    f == null ? n(
      m.el = l(m.children || ""),
      I,
      P
    ) : m.el = f.el;
  }, R = (f, m, I, P) => {
    [f.el, f.anchor] = S(
      f.children,
      m,
      I,
      P,
      f.el,
      f.anchor
    );
  }, x = ({ el: f, anchor: m }, I, P) => {
    let k;
    for (; f && f !== m; )
      k = g(f), n(f, I, P), f = k;
    n(m, I, P);
  }, T = ({ el: f, anchor: m }) => {
    let I;
    for (; f && f !== m; )
      I = g(f), i(f), f = I;
    i(m);
  }, v = (f, m, I, P, k, B, q, V, K) => {
    if (m.type === "svg" ? q = "svg" : m.type === "math" && (q = "mathml"), f == null)
      C(
        m,
        I,
        P,
        k,
        B,
        q,
        V,
        K
      );
    else {
      const H = f.el && f.el._isVueCE ? f.el : null;
      try {
        H && H._beginPatch(), y(
          f,
          m,
          k,
          B,
          q,
          V,
          K
        );
      } finally {
        H && H._endPatch();
      }
    }
  }, C = (f, m, I, P, k, B, q, V) => {
    let K, H;
    const { props: re, shapeFlag: z, transition: J, dirs: ne } = f;
    if (K = f.el = o(
      f.type,
      B,
      re && re.is,
      re
    ), z & 8 ? p(K, f.children) : z & 16 && F(
      f.children,
      K,
      null,
      P,
      k,
      Po(f, B),
      q,
      V
    ), ne && Mt(f, null, P, "created"), D(K, f, f.scopeId, q, P), re) {
      for (const u in re)
        u !== "value" && !Xt(u) && s(K, u, null, re[u], B, P);
      "value" in re && s(K, "value", null, re.value, B), (H = re.onVnodeBeforeMount) && ot(H, P, f);
    }
    __VUE_PROD_DEVTOOLS__ && (an(K, "__vnode", f, !0), an(K, "__vueParentComponent", P, !0)), ne && Mt(f, null, P, "beforeMount");
    const b = cd(k, J);
    b && J.beforeEnter(K), n(K, m, I), ((H = re && re.onVnodeMounted) || b || ne) && ke(() => {
      try {
        H && ot(H, P, f), b && J.enter(K), ne && Mt(f, null, P, "mounted");
      } finally {
      }
    }, k);
  }, D = (f, m, I, P, k) => {
    if (I && _(f, I), P)
      for (let B = 0; B < P.length; B++)
        _(f, P[B]);
    if (k) {
      let B = k.subTree;
      if (m === B || vs(B.type) && (B.ssContent === m || B.ssFallback === m)) {
        const q = k.vnode;
        D(
          f,
          q,
          q.scopeId,
          q.slotScopeIds,
          k.parent
        );
      }
    }
  }, F = (f, m, I, P, k, B, q, V, K = 0) => {
    for (let H = K; H < f.length; H++) {
      const re = f[H] = V ? Wt(f[H]) : at(f[H]);
      w(
        null,
        re,
        m,
        I,
        P,
        k,
        B,
        q,
        V
      );
    }
  }, y = (f, m, I, P, k, B, q) => {
    const V = m.el = f.el;
    __VUE_PROD_DEVTOOLS__ && (V.__vnode = m);
    let { patchFlag: K, dynamicChildren: H, dirs: re } = m;
    K |= f.patchFlag & 16;
    const z = f.props || de, J = m.props || de;
    let ne;
    if (I && Ir(I, !1), (ne = J.onVnodeBeforeUpdate) && ot(ne, I, m, f), re && Mt(m, f, I, "beforeUpdate"), I && Ir(I, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    H && (!f.dynamicChildren || f.dynamicChildren.length !== H.length) && (K = 0, q = !1, H = null), (z.innerHTML && J.innerHTML == null || z.textContent && J.textContent == null) && p(V, ""), H ? E(
      f.dynamicChildren,
      H,
      V,
      I,
      P,
      Po(m, k),
      B
    ) : q || ee(
      f,
      m,
      V,
      null,
      I,
      P,
      Po(m, k),
      B,
      !1
    ), K > 0) {
      if (K & 16)
        O(V, z, J, I, k);
      else if (K & 2 && z.class !== J.class && s(V, "class", null, J.class, k), K & 4 && s(V, "style", z.style, J.style, k), K & 8) {
        const b = m.dynamicProps;
        for (let u = 0; u < b.length; u++) {
          const h = b[u], N = z[h], M = J[h];
          (M !== N || h === "value") && s(V, h, N, M, k, I);
        }
      }
      K & 1 && f.children !== m.children && p(V, m.children);
    } else !q && H == null && O(V, z, J, I, k);
    ((ne = J.onVnodeUpdated) || re) && ke(() => {
      ne && ot(ne, I, m, f), re && Mt(m, f, I, "updated");
    }, P);
  }, E = (f, m, I, P, k, B, q) => {
    for (let V = 0; V < m.length; V++) {
      const K = f[V], H = m[V], re = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        K.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (K.type === je || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !wt(K, H) || // - In the case of a component, it could contain anything.
        K.shapeFlag & 198) ? c(K.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          I
        )
      );
      w(
        K,
        H,
        re,
        null,
        P,
        k,
        B,
        q,
        !0
      );
    }
  }, O = (f, m, I, P, k) => {
    if (m !== I) {
      if (m !== de)
        for (const B in m)
          !Xt(B) && !(B in I) && s(
            f,
            B,
            m[B],
            null,
            k,
            P
          );
      for (const B in I) {
        if (Xt(B)) continue;
        const q = I[B], V = m[B];
        q !== V && B !== "value" && s(f, B, V, q, k, P);
      }
      "value" in I && s(f, "value", m.value, I.value, k);
    }
  }, A = (f, m, I, P, k, B, q, V, K) => {
    const H = m.el = f ? f.el : a(""), re = m.anchor = f ? f.anchor : a("");
    let { patchFlag: z, dynamicChildren: J, slotScopeIds: ne } = m;
    ne && (V = V ? V.concat(ne) : ne), f == null ? (n(H, I, P), n(re, I, P), F(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      m.children || [],
      I,
      re,
      k,
      B,
      q,
      V,
      K
    )) : z > 0 && z & 64 && J && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    f.dynamicChildren && f.dynamicChildren.length === J.length ? (E(
      f.dynamicChildren,
      J,
      I,
      k,
      B,
      q,
      V
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (m.key != null || k && m === k.subTree) && Qa(
      f,
      m,
      !0
      /* shallow */
    )) : ee(
      f,
      m,
      I,
      re,
      k,
      B,
      q,
      V,
      K
    );
  }, $ = (f, m, I, P, k, B, q, V, K) => {
    m.slotScopeIds = V, f == null ? m.shapeFlag & 512 ? k.ctx.activate(
      m,
      I,
      P,
      q,
      K
    ) : Y(
      m,
      I,
      P,
      k,
      B,
      q,
      K
    ) : X(f, m, K);
  }, Y = (f, m, I, P, k, B, q) => {
    const V = f.component = Td(
      f,
      P,
      k
    );
    if (Bi(f) && (V.ctx.renderer = We), vd(V, !1, q), V.asyncDep) {
      if (k && k.registerDep(V, W, q), !f.el) {
        const K = V.subTree = Ce(Pe);
        j(null, K, m, I), f.placeholder = K.el;
      }
    } else
      W(
        V,
        f,
        m,
        I,
        k,
        B,
        q
      );
  }, X = (f, m, I) => {
    const P = m.component = f.component;
    if (N_(f, m, I))
      if (P.asyncDep && !P.asyncResolved) {
        te(P, m, I);
        return;
      } else
        P.next = m, P.update();
    else
      m.el = f.el, P.vnode = m;
  }, W = (f, m, I, P, k, B, q) => {
    const V = () => {
      if (f.isMounted) {
        let { next: z, bu: J, u: ne, parent: b, vnode: u } = f;
        {
          const Q = ud(f);
          if (Q) {
            z && (z.el = u.el, te(f, z, q)), Q.asyncDep.then(() => {
              ke(() => {
                f.isUnmounted || H();
              }, k);
            });
            return;
          }
        }
        let h = z, N;
        Ir(f, !1), z ? (z.el = u.el, te(f, z, q)) : z = u, J && tn(J), (N = z.props && z.props.onVnodeBeforeUpdate) && ot(N, b, z, u), Ir(f, !0);
        const M = os(f), U = f.subTree;
        f.subTree = M, w(
          U,
          M,
          // parent may have changed if it's in a teleport
          c(U.el),
          // anchor may have changed if it's in a fragment
          $e(U),
          f,
          k,
          B
        ), z.el = M.el, h === null && oo(f, M.el), ne && ke(ne, k), (N = z.props && z.props.onVnodeUpdated) && ke(
          () => ot(N, b, z, u),
          k
        ), __VUE_PROD_DEVTOOLS__ && Ef(f);
      } else {
        let z;
        const { el: J, props: ne } = m, { bm: b, m: u, parent: h, root: N, type: M } = f, U = Zt(m);
        if (Ir(f, !1), b && tn(b), !U && (z = ne && ne.onVnodeBeforeMount) && ot(z, h, m), Ir(f, !0), J && G) {
          const Q = () => {
            f.subTree = os(f), G(
              J,
              f.subTree,
              f,
              k,
              null
            );
          };
          U && M.__asyncHydrate ? M.__asyncHydrate(
            J,
            f,
            Q
          ) : Q();
        } else {
          N.ce && N.ce._hasShadowRoot() && N.ce._injectChildStyle(
            M,
            f.parent ? f.parent.type : void 0
          );
          const Q = f.subTree = os(f);
          w(
            null,
            Q,
            I,
            P,
            f,
            k,
            B
          ), m.el = Q.el;
        }
        if (u && ke(u, k), !U && (z = ne && ne.onVnodeMounted)) {
          const Q = m;
          ke(
            () => ot(z, h, Q),
            k
          );
        }
        (m.shapeFlag & 256 || h && Zt(h.vnode) && h.vnode.shapeFlag & 256) && f.a && ke(f.a, k), f.isMounted = !0, __VUE_PROD_DEVTOOLS__ && Ho(f), m = I = P = null;
      }
    };
    f.scope.on();
    const K = f.effect = new _i(V);
    f.scope.off();
    const H = f.update = K.run.bind(K), re = f.job = K.runIfDirty.bind(K);
    re.i = f, re.id = f.uid, K.scheduler = () => Na(re), Ir(f, !0), H();
  }, te = (f, m, I) => {
    m.component = f;
    const P = f.vnode.props;
    f.vnode = m, f.next = null, A_(f, m.props, P, I), M_(f, m.children, I), Rt(), fc(f), At();
  }, ee = (f, m, I, P, k, B, q, V, K = !1) => {
    const H = f && f.children, re = f ? f.shapeFlag : 0, z = m.children, { patchFlag: J, shapeFlag: ne } = m;
    if (J > 0) {
      if (J & 128) {
        se(
          H,
          z,
          I,
          P,
          k,
          B,
          q,
          V,
          K
        );
        return;
      } else if (J & 256) {
        ge(
          H,
          z,
          I,
          P,
          k,
          B,
          q,
          V,
          K
        );
        return;
      }
    }
    ne & 8 ? (re & 16 && Ie(H, k, B), z !== H && p(I, z)) : re & 16 ? ne & 16 ? se(
      H,
      z,
      I,
      P,
      k,
      B,
      q,
      V,
      K
    ) : Ie(H, k, B, !0) : (re & 8 && p(I, ""), ne & 16 && F(
      z,
      I,
      P,
      k,
      B,
      q,
      V,
      K
    ));
  }, ge = (f, m, I, P, k, B, q, V, K) => {
    f = f || Jr, m = m || Jr;
    const H = f.length, re = m.length, z = Math.min(H, re);
    let J;
    for (J = 0; J < z; J++) {
      const ne = m[J] = K ? Wt(m[J]) : at(m[J]);
      w(
        f[J],
        ne,
        I,
        null,
        k,
        B,
        q,
        V,
        K
      );
    }
    H > re ? Ie(
      f,
      k,
      B,
      !0,
      !1,
      z
    ) : F(
      m,
      I,
      P,
      k,
      B,
      q,
      V,
      K,
      z
    );
  }, se = (f, m, I, P, k, B, q, V, K) => {
    let H = 0;
    const re = m.length;
    let z = f.length - 1, J = re - 1;
    for (; H <= z && H <= J; ) {
      const ne = f[H], b = m[H] = K ? Wt(m[H]) : at(m[H]);
      if (wt(ne, b))
        w(
          ne,
          b,
          I,
          null,
          k,
          B,
          q,
          V,
          K
        );
      else
        break;
      H++;
    }
    for (; H <= z && H <= J; ) {
      const ne = f[z], b = m[J] = K ? Wt(m[J]) : at(m[J]);
      if (wt(ne, b))
        w(
          ne,
          b,
          I,
          null,
          k,
          B,
          q,
          V,
          K
        );
      else
        break;
      z--, J--;
    }
    if (H > z) {
      if (H <= J) {
        const ne = J + 1, b = ne < re ? m[ne].el : P;
        for (; H <= J; )
          w(
            null,
            m[H] = K ? Wt(m[H]) : at(m[H]),
            I,
            b,
            k,
            B,
            q,
            V,
            K
          ), H++;
      }
    } else if (H > J)
      for (; H <= z; )
        be(f[H], k, B, !0), H++;
    else {
      const ne = H, b = H, u = /* @__PURE__ */ new Map();
      for (H = b; H <= J; H++) {
        const ue = m[H] = K ? Wt(m[H]) : at(m[H]);
        ue.key != null && u.set(ue.key, H);
      }
      let h, N = 0;
      const M = J - b + 1;
      let U = !1, Q = 0;
      const le = new Array(M);
      for (H = 0; H < M; H++) le[H] = 0;
      for (H = ne; H <= z; H++) {
        const ue = f[H];
        if (N >= M) {
          be(ue, k, B, !0);
          continue;
        }
        let me;
        if (ue.key != null)
          me = u.get(ue.key);
        else
          for (h = b; h <= J; h++)
            if (le[h - b] === 0 && wt(ue, m[h])) {
              me = h;
              break;
            }
        me === void 0 ? be(ue, k, B, !0) : (le[me - b] = H + 1, me >= Q ? Q = me : U = !0, w(
          ue,
          m[me],
          I,
          null,
          k,
          B,
          q,
          V,
          K
        ), N++);
      }
      const Ne = U ? L_(le) : Jr;
      for (h = Ne.length - 1, H = M - 1; H >= 0; H--) {
        const ue = b + H, me = m[ue], Se = m[ue + 1], gl = ue + 1 < re ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          Se.el || fd(Se)
        ) : P;
        le[H] === 0 ? w(
          null,
          me,
          I,
          gl,
          k,
          B,
          q,
          V,
          K
        ) : U && (h < 0 || H !== Ne[h] ? ie(me, I, gl, 2) : h--);
      }
    }
  }, ie = (f, m, I, P, k = null) => {
    const { el: B, type: q, transition: V, children: K, shapeFlag: H } = f;
    if (H & 6) {
      ie(f.component.subTree, m, I, P);
      return;
    }
    if (H & 128) {
      f.suspense.move(m, I, P);
      return;
    }
    if (H & 64) {
      q.move(f, m, I, We);
      return;
    }
    if (q === je) {
      n(B, m, I);
      for (let z = 0; z < K.length; z++)
        ie(K[z], m, I, P);
      n(f.anchor, m, I);
      return;
    }
    if (q === _r) {
      x(f, m, I);
      return;
    }
    if (P !== 2 && H & 1 && V)
      if (P === 0)
        V.persisted && !B[_t] ? n(B, m, I) : (V.beforeEnter(B), n(B, m, I), ke(() => V.enter(B), k));
      else {
        const { leave: z, delayLeave: J, afterLeave: ne } = V, b = () => {
          f.ctx.isUnmounted ? i(B) : n(B, m, I);
        }, u = () => {
          const h = B._isLeaving || !!B[_t];
          B._isLeaving && B[_t](
            !0
            /* cancelled */
          ), V.persisted && !h ? b() : z(B, () => {
            b(), ne && ne();
          });
        };
        J ? J(B, b, u) : u();
      }
    else
      n(B, m, I);
  }, be = (f, m, I, P = !1, k = !1) => {
    const {
      type: B,
      props: q,
      ref: V,
      children: K,
      dynamicChildren: H,
      shapeFlag: re,
      patchFlag: z,
      dirs: J,
      cacheIndex: ne,
      memo: b
    } = f;
    if (z === -2 && (k = !1), V != null && (Rt(), nn(V, null, I, f, !0), At()), ne != null && (m.renderCache[ne] = void 0), re & 256) {
      m.ctx.deactivate(f);
      return;
    }
    const u = re & 1 && J, h = !Zt(f);
    let N;
    if (h && (N = q && q.onVnodeBeforeUnmount) && ot(N, m, f), re & 6)
      Ut(f.component, I, P);
    else {
      if (re & 128) {
        f.suspense.unmount(I, P);
        return;
      }
      u && Mt(f, null, m, "beforeUnmount"), re & 64 ? f.type.remove(
        f,
        m,
        I,
        We,
        P
      ) : H && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !H.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (B !== je || z > 0 && z & 64) ? Ie(
        H,
        m,
        I,
        !1,
        !0
      ) : (B === je && z & 384 || !k && re & 16) && Ie(K, m, I), P && Bt(f);
    }
    const M = b != null && ne == null;
    (h && (N = q && q.onVnodeUnmounted) || u || M) && ke(() => {
      N && ot(N, m, f), u && Mt(f, null, m, "unmounted"), M && (f.el = null);
    }, I);
  }, Bt = (f) => {
    const { type: m, el: I, anchor: P, transition: k } = f;
    if (m === je) {
      ar(I, P);
      return;
    }
    if (m === _r) {
      T(f);
      return;
    }
    const B = () => {
      i(I), k && !k.persisted && k.afterLeave && k.afterLeave();
    };
    if (f.shapeFlag & 1 && k && !k.persisted) {
      const { leave: q, delayLeave: V } = k, K = () => q(I, B);
      V ? V(f.el, B, K) : K();
    } else
      B();
  }, ar = (f, m) => {
    let I;
    for (; f !== m; )
      I = g(f), i(f), f = I;
    i(m);
  }, Ut = (f, m, I) => {
    const { bum: P, scope: k, job: B, subTree: q, um: V, m: K, a: H } = f;
    Ss(K), Ss(H), P && tn(P), k.stop(), B && (B.flags |= 8, be(q, f, m, I)), V && ke(V, m), ke(() => {
      f.isUnmounted = !0;
    }, m), __VUE_PROD_DEVTOOLS__ && lg(f);
  }, Ie = (f, m, I, P = !1, k = !1, B = 0) => {
    for (let q = B; q < f.length; q++)
      be(f[q], m, I, P, k);
  }, $e = (f) => {
    if (f.shapeFlag & 6)
      return $e(f.component.subTree);
    if (f.shapeFlag & 128)
      return f.suspense.next();
    const m = g(f.anchor || f.el), I = m && m[Af];
    return I ? g(I) : m;
  };
  let Le = !1;
  const mt = (f, m, I) => {
    let P;
    f == null ? m._vnode && (be(m._vnode, null, null, !0), P = m._vnode.component) : w(
      m._vnode || null,
      f,
      m,
      null,
      null,
      null,
      I
    ), m._vnode = f, Le || (Le = !0, fc(P), _s(), Le = !1);
  }, We = {
    p: w,
    um: be,
    m: ie,
    r: Bt,
    mt: Y,
    mc: F,
    pc: ee,
    pbc: E,
    n: $e,
    o: e
  };
  let St, G;
  return t && ([St, G] = t(
    We
  )), {
    render: mt,
    hydrate: St,
    createApp: T_(mt, St)
  };
}
function Po({ type: e, props: t }, r) {
  return r === "svg" && e === "foreignObject" || r === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : r;
}
function Ir({ effect: e, job: t }, r) {
  r ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function cd(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Qa(e, t, r = !1) {
  const n = e.children, i = t.children;
  if (Z(n) && Z(i))
    for (let s = 0; s < n.length; s++) {
      const o = n[s];
      let a = i[s];
      a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = i[s] = Wt(i[s]), a.el = o.el), !r && a.patchFlag !== -2 && Qa(o, a)), a.type === er && (a.patchFlag === -1 && (a = i[s] = Wt(a)), a.el = o.el), a.type === Pe && !a.el && (a.el = o.el);
    }
}
function L_(e) {
  const t = e.slice(), r = [0];
  let n, i, s, o, a;
  const l = e.length;
  for (n = 0; n < l; n++) {
    const d = e[n];
    if (d !== 0) {
      if (i = r[r.length - 1], e[i] < d) {
        t[n] = i, r.push(n);
        continue;
      }
      for (s = 0, o = r.length - 1; s < o; )
        a = s + o >> 1, e[r[a]] < d ? s = a + 1 : o = a;
      d < e[r[s]] && (s > 0 && (t[n] = r[s - 1]), r[s] = n);
    }
  }
  for (s = r.length, o = r[s - 1]; s-- > 0; )
    r[s] = o, o = t[o];
  return r;
}
function ud(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : ud(t);
}
function Ss(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function fd(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? fd(t.subTree) : null;
}
const vs = (e) => e.__isSuspense;
let Jo = 0;
const k_ = {
  name: "Suspense",
  // In order to make Suspense tree-shakable, we need to avoid importing it
  // directly in the renderer. The renderer checks for the __isSuspense flag
  // on a vnode's type and calls the `process` method, passing in renderer
  // internals.
  __isSuspense: !0,
  process(e, t, r, n, i, s, o, a, l, d) {
    if (e == null)
      F_(
        t,
        r,
        n,
        i,
        s,
        o,
        a,
        l,
        d
      );
    else {
      if (s && s.deps > 0 && !e.suspense.isInFallback) {
        t.suspense = e.suspense, t.suspense.vnode = t, t.el = e.el;
        return;
      }
      B_(
        e,
        t,
        r,
        n,
        i,
        o,
        a,
        l,
        d
      );
    }
  },
  hydrate: U_,
  normalize: $_
}, j_ = k_;
function Ii(e, t) {
  const r = e.props && e.props[t];
  oe(r) && r();
}
function F_(e, t, r, n, i, s, o, a, l) {
  const {
    p: d,
    o: { createElement: p }
  } = l, c = p("div"), g = e.suspense = dd(
    e,
    i,
    n,
    t,
    c,
    r,
    s,
    o,
    a,
    l
  );
  d(
    null,
    g.pendingBranch = e.ssContent,
    c,
    null,
    n,
    g,
    s,
    o
  ), g.deps > 0 ? (Ii(e, "onPending"), Ii(e, "onFallback"), d(
    null,
    e.ssFallback,
    t,
    r,
    n,
    null,
    // fallback tree will not have suspense context
    s,
    o
  ), sn(g, e.ssFallback)) : g.resolve(!1, !0);
}
function B_(e, t, r, n, i, s, o, a, { p: l, um: d, o: { createElement: p } }) {
  const c = t.suspense = e.suspense;
  c.vnode = t, t.el = e.el;
  const g = t.ssContent, _ = t.ssFallback, { activeBranch: S, pendingBranch: w, isInFallback: L, isHydrating: j } = c;
  if (w)
    c.pendingBranch = g, wt(w, g) ? (l(
      w,
      g,
      c.hiddenContainer,
      null,
      i,
      c,
      s,
      o,
      a
    ), c.deps <= 0 ? c.resolve() : L && (j || (l(
      S,
      _,
      r,
      n,
      i,
      null,
      // fallback tree will not have suspense context
      s,
      o,
      a
    ), sn(c, _)))) : (c.pendingId = Jo++, j ? (c.isHydrating = !1, c.activeBranch = w) : d(w, i, c), c.deps = 0, c.effects.length = 0, c.hiddenContainer = p("div"), L ? (l(
      null,
      g,
      c.hiddenContainer,
      null,
      i,
      c,
      s,
      o,
      a
    ), c.deps <= 0 ? c.resolve() : (l(
      S,
      _,
      r,
      n,
      i,
      null,
      // fallback tree will not have suspense context
      s,
      o,
      a
    ), sn(c, _))) : S && wt(S, g) ? (l(
      S,
      g,
      r,
      n,
      i,
      c,
      s,
      o,
      a
    ), c.resolve(!0)) : (l(
      null,
      g,
      c.hiddenContainer,
      null,
      i,
      c,
      s,
      o,
      a
    ), c.deps <= 0 && c.resolve()));
  else if (S && wt(S, g))
    l(
      S,
      g,
      r,
      n,
      i,
      c,
      s,
      o,
      a
    ), sn(c, g);
  else if (Ii(t, "onPending"), c.pendingBranch = g, g.shapeFlag & 512 ? c.pendingId = g.component.suspenseId : c.pendingId = Jo++, l(
    null,
    g,
    c.hiddenContainer,
    null,
    i,
    c,
    s,
    o,
    a
  ), c.deps <= 0)
    c.resolve();
  else {
    const { timeout: R, pendingId: x } = c;
    R > 0 ? setTimeout(() => {
      c.pendingId === x && c.fallback(_);
    }, R) : R === 0 && c.fallback(_);
  }
}
function dd(e, t, r, n, i, s, o, a, l, d, p = !1) {
  const {
    p: c,
    m: g,
    um: _,
    n: S,
    o: { parentNode: w, remove: L }
  } = d;
  let j;
  const R = V_(e);
  R && t && t.pendingBranch && (j = t.pendingId, t.deps++);
  const x = e.props ? ds(e.props.timeout) : void 0, T = s, v = {
    vnode: e,
    parent: t,
    parentComponent: r,
    namespace: o,
    container: n,
    hiddenContainer: i,
    deps: 0,
    pendingId: Jo++,
    timeout: typeof x == "number" ? x : -1,
    activeBranch: null,
    isFallbackMountPending: !1,
    pendingBranch: null,
    isInFallback: !p,
    isHydrating: p,
    isUnmounted: !1,
    effects: [],
    resolve(C = !1, D = !1) {
      const {
        vnode: F,
        activeBranch: y,
        pendingBranch: E,
        pendingId: O,
        effects: A,
        parentComponent: $,
        container: Y,
        isInFallback: X
      } = v;
      let W = !1;
      if (v.isHydrating)
        v.isHydrating = !1;
      else if (!C) {
        W = y && E.transition && E.transition.mode === "out-in";
        let ge = !1;
        W && (y.transition.afterLeave = () => {
          O === v.pendingId && (g(
            E,
            Y,
            s === T && !ge ? S(y) : s,
            0
          ), Ti(A), X && F.ssFallback && (F.ssFallback.el = null));
        }), y && !v.isFallbackMountPending && (w(y.el) === Y && (s = S(y), ge = !0), _(y, $, v, !0), !W && X && F.ssFallback && ke(() => F.ssFallback.el = null, v)), W || g(E, Y, s, 0);
      }
      v.isFallbackMountPending = !1, sn(v, E), v.pendingBranch = null, v.isInFallback = !1;
      let te = v.parent, ee = !1;
      for (; te; ) {
        if (te.pendingBranch) {
          te.effects.push(...A), ee = !0;
          break;
        }
        te = te.parent;
      }
      !ee && !W && Ti(A), v.effects = [], R && t && t.pendingBranch && j === t.pendingId && (t.deps--, t.deps === 0 && !D && t.resolve()), Ii(F, "onResolve");
    },
    fallback(C) {
      if (!v.pendingBranch)
        return;
      const { vnode: D, activeBranch: F, parentComponent: y, container: E, namespace: O } = v;
      Ii(D, "onFallback");
      const A = S(F), $ = () => {
        v.isFallbackMountPending = !1, v.isInFallback && (c(
          null,
          C,
          E,
          A,
          y,
          null,
          // fallback tree will not have suspense context
          O,
          a,
          l
        ), sn(v, C));
      }, Y = C.transition && C.transition.mode === "out-in";
      Y && (v.isFallbackMountPending = !0, F.transition.afterLeave = $), v.isInFallback = !0, _(
        F,
        y,
        null,
        // no suspense so unmount hooks fire now
        !0
        // shouldRemove
      ), Y || $();
    },
    move(C, D, F) {
      v.activeBranch && g(v.activeBranch, C, D, F), v.container = C;
    },
    next() {
      return v.activeBranch && S(v.activeBranch);
    },
    registerDep(C, D, F) {
      const y = !!v.pendingBranch;
      y && v.deps++;
      const E = C.vnode.el;
      C.asyncDep.catch((O) => {
        qr(O, C, 0);
      }).then((O) => {
        if (C.isUnmounted || v.isUnmounted || v.pendingId !== C.suspenseId)
          return;
        Ni(), C.asyncResolved = !0;
        const { vnode: A } = C;
        Zo(C, O, !1), E && (A.el = E);
        const $ = !E && C.subTree.el;
        D(
          C,
          A,
          // component may have been moved before resolve.
          // if this is not a hydration, instance.subTree will be the comment
          // placeholder.
          w(E || C.subTree.el),
          // anchor will not be used if this is hydration, so only need to
          // consider the comment placeholder case.
          E ? null : S(C.subTree),
          v,
          o,
          F
        ), $ && (A.placeholder = null, L($)), oo(C, A.el), y && --v.deps === 0 && v.resolve();
      });
    },
    unmount(C, D) {
      v.isUnmounted = !0, v.activeBranch && _(
        v.activeBranch,
        r,
        C,
        D
      ), v.pendingBranch && _(
        v.pendingBranch,
        r,
        C,
        D
      );
    }
  };
  return v;
}
function U_(e, t, r, n, i, s, o, a, l) {
  const d = t.suspense = dd(
    t,
    n,
    r,
    e.parentNode,
    // eslint-disable-next-line no-restricted-globals
    document.createElement("div"),
    null,
    i,
    s,
    o,
    a,
    !0
  ), p = l(
    e,
    d.pendingBranch = t.ssContent,
    r,
    d,
    s,
    o
  );
  return d.deps === 0 && d.resolve(!1, !0), p;
}
function $_(e) {
  const { shapeFlag: t, children: r } = e, n = t & 32;
  e.ssContent = xc(
    n ? r.default : r
  ), e.ssFallback = n ? xc(r.fallback) : Ce(Pe);
}
function xc(e) {
  let t;
  if (oe(e)) {
    const r = Fr && e._c;
    r && (e._d = !1, wi()), e = e(), r && (e._d = !0, t = Xe, pd());
  }
  return Z(e) && (e = I_(e)), e = at(e), t && !e.dynamicChildren && (e.dynamicChildren = t.filter((r) => r !== e)), e;
}
function hd(e, t) {
  t && t.pendingBranch ? Z(e) ? t.effects.push(...e) : t.effects.push(e) : Ti(e);
}
function sn(e, t) {
  e.activeBranch = t;
  const { vnode: r, parentComponent: n } = e;
  let i = t.el;
  for (; !i && t.component; )
    t = t.component.subTree, i = t.el;
  r.el = i, n && n.subTree === r && (n.vnode.el = i, oo(n, i));
}
function V_(e) {
  const t = e.props && e.props.suspensible;
  return t != null && t !== !1;
}
const je = /* @__PURE__ */ Symbol.for("v-fgt"), er = /* @__PURE__ */ Symbol.for("v-txt"), Pe = /* @__PURE__ */ Symbol.for("v-cmt"), _r = /* @__PURE__ */ Symbol.for("v-stc"), pi = [];
let Xe = null;
function wi(e = !1) {
  pi.push(Xe = e ? null : []);
}
function pd() {
  pi.pop(), Xe = pi[pi.length - 1] || null;
}
let Fr = 1;
function xi(e, t = !1) {
  Fr += e, e < 0 && Xe && t && (Xe.hasOnce = !0);
}
function md(e) {
  return e.dynamicChildren = Fr > 0 ? Xe || Jr : null, pd(), Fr > 0 && Xe && Xe.push(e), e;
}
function Q_(e, t, r, n, i, s) {
  return md(
    Ha(
      e,
      t,
      r,
      n,
      i,
      s,
      !0
    )
  );
}
function Es(e, t, r, n, i) {
  return md(
    Ce(
      e,
      t,
      r,
      n,
      i,
      !0
    )
  );
}
function ir(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function wt(e, t) {
  return e.type === t.type && e.key === t.key;
}
function H_(e) {
}
const gd = ({ key: e }) => e ?? null, as = ({
  ref: e,
  ref_key: t,
  ref_for: r
}) => (typeof e == "number" && (e = "" + e), e != null ? ae(e) || /* @__PURE__ */ De(e) || oe(e) ? { i: Ke, r: e, k: t, f: !!r } : e : null);
function Ha(e, t = null, r = null, n = 0, i = null, s = e === je ? 0 : 1, o = !1, a = !1) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && gd(t),
    ref: t && as(t),
    scopeId: eo,
    slotScopeIds: null,
    children: r,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: s,
    patchFlag: n,
    dynamicProps: i,
    dynamicChildren: null,
    appContext: null,
    ctx: Ke
  };
  return a ? (Is(l, r), s & 128 && e.normalize(l)) : r && (l.shapeFlag |= ae(r) ? 8 : 16), Fr > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  Xe && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (l.patchFlag > 0 || s & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  l.patchFlag !== 32 && Xe.push(l), l;
}
const Ce = q_;
function q_(e, t = null, r = null, n = 0, i = null, s = !1) {
  if ((!e || e === qf) && (e = Pe), ir(e)) {
    const a = kt(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return r && Is(a, r), Fr > 0 && !s && Xe && (a.shapeFlag & 6 ? Xe[Xe.indexOf(e)] = a : Xe.push(a)), a.patchFlag = -2, a;
  }
  if (ey(e) && (e = e.__vccOpts), t) {
    t = _d(t);
    let { class: a, style: l } = t;
    a && !ae(a) && (t.class = bn(a)), ye(l) && (/* @__PURE__ */ Li(l) && !Z(l) && (l = fe({}, l)), t.style = yn(l));
  }
  const o = ae(e) ? 1 : vs(e) ? 128 : Cf(e) ? 64 : ye(e) ? 4 : oe(e) ? 2 : 0;
  return Ha(
    e,
    t,
    r,
    n,
    i,
    o,
    s,
    !0
  );
}
function _d(e) {
  return e ? /* @__PURE__ */ Li(e) || ed(e) ? fe({}, e) : e : null;
}
function kt(e, t, r = !1, n = !1) {
  const { props: i, ref: s, patchFlag: o, children: a, transition: l } = e, d = t ? bd(i || {}, t) : i, p = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: d,
    key: d && gd(d),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      r && s ? Z(s) ? s.concat(as(t)) : [s, as(t)] : as(t)
    ) : s,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: a,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== je ? o === -1 ? 16 : o | 16 : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: l,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && kt(e.ssContent),
    ssFallback: e.ssFallback && kt(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return l && n && nr(
    p,
    l.clone(p)
  ), p;
}
function qa(e = " ", t = 0) {
  return Ce(er, null, e, t);
}
function K_(e, t) {
  const r = Ce(_r, null, e);
  return r.staticCount = t, r;
}
function yd(e = "", t = !1) {
  return t ? (wi(), Es(Pe, null, e)) : Ce(Pe, null, e);
}
function at(e) {
  return e == null || typeof e == "boolean" ? Ce(Pe) : Z(e) ? Ce(
    je,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : ir(e) ? Wt(e) : Ce(er, null, String(e));
}
function Wt(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : kt(e);
}
function Is(e, t) {
  let r = 0;
  const { shapeFlag: n } = e;
  if (t == null)
    t = null;
  else if (Z(t))
    r = 16;
  else if (typeof t == "object")
    if (n & 65) {
      const i = t.default;
      i && (i._c && (i._d = !1), Is(e, i()), i._c && (i._d = !0));
      return;
    } else {
      r = 32;
      const i = t._;
      !i && !ed(t) ? t._ctx = Ke : i === 3 && Ke && (Ke.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (oe(t)) {
    if (n & 65) {
      Is(e, { default: t });
      return;
    }
    t = { default: t, _ctx: Ke }, r = 32;
  } else
    t = String(t), n & 64 ? (r = 16, t = [qa(t)]) : r = 8;
  e.children = t, e.shapeFlag |= r;
}
function bd(...e) {
  const t = {};
  for (let r = 0; r < e.length; r++) {
    const n = e[r];
    for (const i in n)
      if (i === "class")
        t.class !== n.class && (t.class = bn([t.class, n.class]));
      else if (i === "style")
        t.style = yn([t.style, n.style]);
      else if ($r(i)) {
        const s = t[i], o = n[i];
        o && s !== o && !(Z(s) && s.includes(o)) ? t[i] = s ? [].concat(s, o) : o : o == null && s == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !Vs(i) && (t[i] = o);
      } else i !== "" && (t[i] = n[i]);
  }
  return t;
}
function ot(e, t, r, n = null) {
  ht(e, t, 7, [
    r,
    n
  ]);
}
const W_ = Gf();
let G_ = 0;
function Td(e, t, r) {
  const n = e.type, i = (t ? t.appContext : e.appContext) || W_, s = {
    uid: G_++,
    vnode: e,
    type: n,
    parent: t,
    appContext: i,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new va(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(i.provides),
    ids: t ? t.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: rd(n, i),
    emitsOptions: Yf(n, i),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: de,
    // inheritAttrs
    inheritAttrs: n.inheritAttrs,
    // state
    ctx: de,
    data: de,
    props: de,
    attrs: de,
    slots: de,
    refs: de,
    setupState: de,
    setupContext: null,
    // suspense related
    suspense: r,
    suspenseId: r ? r.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return s.ctx = { _: s }, s.root = t ? t.root : s, s.emit = v_.bind(null, s), e.ce && e.ce(s), s;
}
let qe = null;
const it = () => qe || Ke;
let ws, on;
{
  const e = Pr(), t = (r, n) => {
    let i;
    return (i = e[r]) || (i = e[r] = []), i.push(n), (s) => {
      i.length > 1 ? i.forEach((o) => o(s)) : i[0](s);
    };
  };
  ws = t(
    "__VUE_INSTANCE_SETTERS__",
    (r) => qe = r
  ), on = t(
    "__VUE_SSR_SETTERS__",
    (r) => Br = r
  );
}
const vn = (e) => {
  const t = qe;
  return ws(e), e.scope.on(), () => {
    e.scope.off(), ws(t);
  };
}, Ni = () => {
  qe && qe.scope.off(), ws(null);
};
function Sd(e) {
  return e.vnode.shapeFlag & 4;
}
let Br = !1;
function vd(e, t = !1, r = !1) {
  t && on(t);
  const { props: n, children: i } = e.vnode, s = Sd(e);
  R_(e, n, s, t), P_(e, i, r || t);
  const o = s ? z_(e, t) : void 0;
  return t && on(!1), o;
}
function z_(e, t) {
  const r = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Go);
  const { setup: n } = r;
  if (n) {
    Rt();
    const i = e.setupContext = n.length > 1 ? wd(e) : null, s = vn(e), o = Hr(
      n,
      e,
      0,
      [
        e.props,
        i
      ]
    ), a = Ta(o);
    if (At(), s(), (a || e.sp) && !Zt(e) && Da(e), a) {
      if (o.then(Ni, Ni), t)
        return o.then((l) => {
          Zo(e, l, t);
        }).catch((l) => {
          qr(l, e, 0);
        });
      e.asyncDep = o;
    } else
      Zo(e, o, t);
  } else
    Id(e, t);
}
function Zo(e, t, r) {
  oe(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : ye(t) && (__VUE_PROD_DEVTOOLS__ && (e.devtoolsRawSetupState = t), e.setupState = xa(t)), Id(e, r);
}
let xs, ea;
function Ed(e) {
  xs = e, ea = (t) => {
    t.render._rc && (t.withProxy = new Proxy(t.ctx, e_));
  };
}
const Y_ = () => !xs;
function Id(e, t, r) {
  const n = e.type;
  if (!e.render) {
    if (!t && xs && !n.render) {
      const i = n.template || __VUE_OPTIONS_API__ && Ua(e).template;
      if (i) {
        const { isCustomElement: s, compilerOptions: o } = e.appContext.config, { delimiters: a, compilerOptions: l } = n, d = fe(
          fe(
            {
              isCustomElement: s,
              delimiters: a
            },
            o
          ),
          l
        );
        n.render = xs(i, d);
      }
    }
    e.render = n.render || Qe, ea && ea(e);
  }
  if (__VUE_OPTIONS_API__) {
    const i = vn(e);
    Rt();
    try {
      p_(e);
    } finally {
      At(), i();
    }
  }
}
const X_ = {
  get(e, t) {
    return Ye(e, "get", ""), e[t];
  }
};
function wd(e) {
  const t = (r) => {
    e.exposed = r || {};
  };
  return {
    attrs: new Proxy(e.attrs, X_),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Ui(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(xa(hf(e.exposed)), {
    get(t, r) {
      if (r in t)
        return t[r];
      if (r in hi)
        return hi[r](e);
    },
    has(t, r) {
      return r in t || r in hi;
    }
  })) : e.proxy;
}
const J_ = /(?:^|[-_])\w/g, Z_ = (e) => e.replace(J_, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function Ns(e, t = !0) {
  return oe(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function xd(e, t, r = !1) {
  let n = Ns(t);
  if (!n && t.__file) {
    const i = t.__file.match(/([^/\\]+)\.\w+$/);
    i && (n = i[1]);
  }
  if (!n && e) {
    const i = (s) => {
      for (const o in s)
        if (s[o] === t)
          return o;
    };
    n = i(e.components) || e.parent && i(
      e.parent.type.components
    ) || i(e.appContext.components);
  }
  return n ? Z_(n) : r ? "App" : "Anonymous";
}
function ey(e) {
  return oe(e) && "__vccOpts" in e;
}
const Xr = (e, t) => /* @__PURE__ */ Qm(e, t, Br);
function Nd(e, t, r) {
  try {
    xi(-1);
    const n = arguments.length;
    return n === 2 ? ye(t) && !Z(t) ? ir(t) ? Ce(e, null, [t]) : Ce(e, t) : Ce(e, null, t) : (n > 3 ? r = Array.prototype.slice.call(arguments, 2) : n === 3 && ir(r) && (r = [r]), Ce(e, t, r));
  } finally {
    xi(1);
  }
}
function ty() {
}
function ry(e, t, r, n) {
  const i = r[n];
  if (i && Rd(i, e))
    return i;
  const s = t();
  return s.memo = e.slice(), s.cacheIndex = n, r[n] = s;
}
function Rd(e, t) {
  const r = e.memo;
  if (r.length != t.length)
    return !1;
  for (let n = 0; n < r.length; n++)
    if (Ve(r[n], t[n]))
      return !1;
  return Fr > 0 && Xe && Xe.push(e), !0;
}
const ta = "3.5.39", ny = Qe, iy = rg, sy = It, oy = Ra, ay = {
  createComponentInstance: Td,
  setupComponent: vd,
  renderComponentRoot: os,
  setCurrentRenderingInstance: vi,
  isVNode: ir,
  normalizeVNode: at,
  getComponentPublicInstance: Ui,
  ensureValidVNode: Ba,
  pushWarningContext: Gm,
  popWarningContext: zm
}, ly = ay, cy = null, uy = null, fy = null;
/**
* @vue/runtime-dom v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let ra;
const Nc = typeof window < "u" && window.trustedTypes;
if (Nc)
  try {
    ra = /* @__PURE__ */ Nc.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const Ad = ra ? (e) => ra.createHTML(e) : (e) => e, dy = "http://www.w3.org/2000/svg", hy = "http://www.w3.org/1998/Math/MathML", Kt = typeof document < "u" ? document : null, Rc = Kt && /* @__PURE__ */ Kt.createElement("template"), Cd = {
  insert: (e, t, r) => {
    t.insertBefore(e, r || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, r, n) => {
    const i = t === "svg" ? Kt.createElementNS(dy, e) : t === "mathml" ? Kt.createElementNS(hy, e) : r ? Kt.createElement(e, { is: r }) : Kt.createElement(e);
    return e === "select" && n && n.multiple != null && i.setAttribute("multiple", n.multiple), i;
  },
  createText: (e) => Kt.createTextNode(e),
  createComment: (e) => Kt.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Kt.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, r, n, i, s) {
    const o = r ? r.previousSibling : t.lastChild;
    if (i && (i === s || i.nextSibling))
      for (; t.insertBefore(i.cloneNode(!0), r), !(i === s || !(i = i.nextSibling)); )
        ;
    else {
      Rc.innerHTML = Ad(
        n === "svg" ? `<svg>${e}</svg>` : n === "mathml" ? `<math>${e}</math>` : e
      );
      const a = Rc.content;
      if (n === "svg" || n === "mathml") {
        const l = a.firstChild;
        for (; l.firstChild; )
          a.appendChild(l.firstChild);
        a.removeChild(l);
      }
      t.insertBefore(a, r);
    }
    return [
      // first
      o ? o.nextSibling : t.firstChild,
      // last
      r ? r.previousSibling : t.lastChild
    ];
  }
}, lr = "transition", Jn = "animation", un = /* @__PURE__ */ Symbol("_vtc"), Od = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: !0
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
}, Pd = /* @__PURE__ */ fe(
  {},
  Pa,
  Od
), py = (e) => (e.displayName = "Transition", e.props = Pd, e), my = /* @__PURE__ */ py(
  (e, { slots: t }) => Nd(Mf, Md(e), t)
), wr = (e, t = []) => {
  Z(e) ? e.forEach((r) => r(...t)) : e && e(...t);
}, Ac = (e) => e ? Z(e) ? e.some((t) => t.length > 1) : e.length > 1 : !1;
function Md(e) {
  const t = {};
  for (const A in e)
    A in Od || (t[A] = e[A]);
  if (e.css === !1)
    return t;
  const {
    name: r = "v",
    type: n,
    duration: i,
    enterFromClass: s = `${r}-enter-from`,
    enterActiveClass: o = `${r}-enter-active`,
    enterToClass: a = `${r}-enter-to`,
    appearFromClass: l = s,
    appearActiveClass: d = o,
    appearToClass: p = a,
    leaveFromClass: c = `${r}-leave-from`,
    leaveActiveClass: g = `${r}-leave-active`,
    leaveToClass: _ = `${r}-leave-to`
  } = e, S = gy(i), w = S && S[0], L = S && S[1], {
    onBeforeEnter: j,
    onEnter: R,
    onEnterCancelled: x,
    onLeave: T,
    onLeaveCancelled: v,
    onBeforeAppear: C = j,
    onAppear: D = R,
    onAppearCancelled: F = x
  } = t, y = (A, $, Y, X) => {
    A._enterCancelled = X, dr(A, $ ? p : a), dr(A, $ ? d : o), Y && Y();
  }, E = (A, $) => {
    A._isLeaving = !1, dr(A, c), dr(A, _), dr(A, g), $ && $();
  }, O = (A) => ($, Y) => {
    const X = A ? D : R, W = () => y($, A, Y);
    wr(X, [$, W]), Cc(() => {
      dr($, A ? l : s), Ot($, A ? p : a), Ac(X) || Oc($, n, w, W);
    });
  };
  return fe(t, {
    onBeforeEnter(A) {
      wr(j, [A]), Ot(A, s), Ot(A, o);
    },
    onBeforeAppear(A) {
      wr(C, [A]), Ot(A, l), Ot(A, d);
    },
    onEnter: O(!1),
    onAppear: O(!0),
    onLeave(A, $) {
      A._isLeaving = !0;
      const Y = () => E(A, $);
      Ot(A, c), A._enterCancelled ? (Ot(A, g), na(A)) : (na(A), Ot(A, g)), Cc(() => {
        A._isLeaving && (dr(A, c), Ot(A, _), Ac(T) || Oc(A, n, L, Y));
      }), wr(T, [A, Y]);
    },
    onEnterCancelled(A) {
      y(A, !1, void 0, !0), wr(x, [A]);
    },
    onAppearCancelled(A) {
      y(A, !0, void 0, !0), wr(F, [A]);
    },
    onLeaveCancelled(A) {
      E(A), wr(v, [A]);
    }
  });
}
function gy(e) {
  if (e == null)
    return null;
  if (ye(e))
    return [Mo(e.enter), Mo(e.leave)];
  {
    const t = Mo(e);
    return [t, t];
  }
}
function Mo(e) {
  return ds(e);
}
function Ot(e, t) {
  t.split(/\s+/).forEach((r) => r && e.classList.add(r)), (e[un] || (e[un] = /* @__PURE__ */ new Set())).add(t);
}
function dr(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.remove(n));
  const r = e[un];
  r && (r.delete(t), r.size || (e[un] = void 0));
}
function Cc(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let _y = 0;
function Oc(e, t, r, n) {
  const i = e._endId = ++_y, s = () => {
    i === e._endId && n();
  };
  if (r != null)
    return setTimeout(s, r);
  const { type: o, timeout: a, propCount: l } = Dd(e, t);
  if (!o)
    return n();
  const d = o + "end";
  let p = 0;
  const c = () => {
    e.removeEventListener(d, g), s();
  }, g = (_) => {
    _.target === e && ++p >= l && c();
  };
  setTimeout(() => {
    p < l && c();
  }, a + 1), e.addEventListener(d, g);
}
function Dd(e, t) {
  const r = window.getComputedStyle(e), n = (S) => (r[S] || "").split(", "), i = n(`${lr}Delay`), s = n(`${lr}Duration`), o = Pc(i, s), a = n(`${Jn}Delay`), l = n(`${Jn}Duration`), d = Pc(a, l);
  let p = null, c = 0, g = 0;
  t === lr ? o > 0 && (p = lr, c = o, g = s.length) : t === Jn ? d > 0 && (p = Jn, c = d, g = l.length) : (c = Math.max(o, d), p = c > 0 ? o > d ? lr : Jn : null, g = p ? p === lr ? s.length : l.length : 0);
  const _ = p === lr && /\b(?:transform|all)(?:,|$)/.test(
    n(`${lr}Property`).toString()
  );
  return {
    type: p,
    timeout: c,
    propCount: g,
    hasTransform: _
  };
}
function Pc(e, t) {
  for (; e.length < t.length; )
    e = e.concat(e);
  return Math.max(...t.map((r, n) => Mc(r) + Mc(e[n])));
}
function Mc(e) {
  return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function na(e) {
  return (e ? e.ownerDocument : document).body.offsetHeight;
}
function yy(e, t, r) {
  const n = e[un];
  n && (t = (t ? [t, ...n] : [...n]).join(" ")), t == null ? e.removeAttribute("class") : r ? e.setAttribute("class", t) : e.className = t;
}
const Rs = /* @__PURE__ */ Symbol("_vod"), Ka = /* @__PURE__ */ Symbol("_vsh"), Ld = {
  // used for prop mismatch check during hydration
  name: "show",
  beforeMount(e, { value: t }, { transition: r }) {
    e[Rs] = e.style.display === "none" ? "" : e.style.display, r && t ? r.beforeEnter(e) : Zn(e, t);
  },
  mounted(e, { value: t }, { transition: r }) {
    r && t && r.enter(e);
  },
  updated(e, { value: t, oldValue: r }, { transition: n }) {
    !t != !r && (n ? t ? (n.beforeEnter(e), Zn(e, !0), n.enter(e)) : n.leave(e, () => {
      Zn(e, !1);
    }) : Zn(e, t));
  },
  beforeUnmount(e, { value: t }) {
    Zn(e, t);
  }
};
function Zn(e, t) {
  e.style.display = t ? e[Rs] : "none", e[Ka] = !t;
}
function by() {
  Ld.getSSRProps = ({ value: e }) => {
    if (!e)
      return { style: { display: "none" } };
  };
}
const kd = /* @__PURE__ */ Symbol("");
function Ty(e) {
  const t = it();
  if (!t)
    return;
  const r = t.ut = (i = e(t.proxy)) => {
    Array.from(
      document.querySelectorAll(`[data-v-owner="${t.uid}"]`)
    ).forEach((s) => As(s, i));
  }, n = () => {
    const i = e(t.proxy);
    t.ce ? As(t.ce, i) : ia(t.subTree, i), r(i);
  };
  ka(() => {
    Ti(n);
  }), Tn(() => {
    gr(n, Qe, { flush: "post" });
    const i = new MutationObserver(n);
    i.observe(t.subTree.el.parentNode, { childList: !0 }), Sn(() => i.disconnect());
  });
}
function ia(e, t) {
  if (e.shapeFlag & 128) {
    const r = e.suspense;
    e = r.activeBranch, r.pendingBranch && !r.isHydrating && r.effects.push(() => {
      ia(r.activeBranch, t);
    });
  }
  for (; e.component; )
    e = e.component.subTree;
  if (e.shapeFlag & 1 && e.el)
    As(e.el, t);
  else if (e.type === je)
    e.children.forEach((r) => ia(r, t));
  else if (e.type === _r) {
    let { el: r, anchor: n } = e;
    for (; r && (As(r, t), r !== n); )
      r = r.nextSibling;
  }
}
function As(e, t) {
  if (e.nodeType === 1) {
    const r = e.style;
    let n = "";
    for (const i in t) {
      const s = Gu(t[i]);
      r.setProperty(`--${i}`, s), n += `--${i}: ${s};`;
    }
    r[kd] = n;
  }
}
const Sy = /(?:^|;)\s*display\s*:/;
function vy(e, t, r) {
  const n = e.style, i = ae(r);
  let s = !1;
  if (r && !i) {
    if (t)
      if (ae(t))
        for (const o of t.split(";")) {
          const a = o.slice(0, o.indexOf(":")).trim();
          r[a] == null && li(n, a, "");
        }
      else
        for (const o in t)
          r[o] == null && li(n, o, "");
    for (const o in r) {
      o === "display" && (s = !0);
      const a = r[o];
      a != null ? Iy(
        e,
        o,
        !ae(t) && t ? t[o] : void 0,
        a
      ) || li(n, o, a) : li(n, o, "");
    }
  } else if (i) {
    if (t !== r) {
      const o = n[kd];
      o && (r += ";" + o), n.cssText = r, s = Sy.test(r);
    }
  } else t && e.removeAttribute("style");
  Rs in e && (e[Rs] = s ? n.display : "", e[Ka] && (n.display = "none"));
}
const Dc = /\s*!important$/;
function li(e, t, r) {
  if (Z(r))
    r.forEach((n) => li(e, t, n));
  else if (r == null && (r = ""), t.startsWith("--"))
    e.setProperty(t, r);
  else {
    const n = Ey(e, t);
    Dc.test(r) ? e.setProperty(
      nt(n),
      r.replace(Dc, ""),
      "important"
    ) : e[n] = r;
  }
}
const Lc = ["Webkit", "Moz", "ms"], Do = {};
function Ey(e, t) {
  const r = Do[t];
  if (r)
    return r;
  let n = we(t);
  if (n !== "filter" && n in e)
    return Do[t] = n;
  n = Qr(n);
  for (let i = 0; i < Lc.length; i++) {
    const s = Lc[i] + n;
    if (s in e)
      return Do[t] = s;
  }
  return t;
}
function Iy(e, t, r, n) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && ae(n) && r === n;
}
const kc = "http://www.w3.org/1999/xlink";
function jc(e, t, r, n, i, s = nm(t)) {
  n && t.startsWith("xlink:") ? r == null ? e.removeAttributeNS(kc, t.slice(6, t.length)) : e.setAttributeNS(kc, t, r) : r == null || s && !Sa(r) ? e.removeAttribute(t) : e.setAttribute(
    t,
    s ? "" : Ze(r) ? String(r) : r
  );
}
function Fc(e, t, r, n, i) {
  if (t === "innerHTML" || t === "textContent") {
    r != null && (e[t] = t === "innerHTML" ? Ad(r) : r);
    return;
  }
  const s = e.tagName;
  if (t === "value" && s !== "PROGRESS" && // custom elements may use _value internally
  !s.includes("-")) {
    const a = s === "OPTION" ? e.getAttribute("value") || "" : e.value, l = r == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(r);
    (a !== l || !("_value" in e)) && (e.value = l), r == null && e.removeAttribute(t), e._value = r;
    return;
  }
  let o = !1;
  if (r === "" || r == null) {
    const a = typeof e[t];
    a === "boolean" ? r = Sa(r) : r == null && a === "string" ? (r = "", o = !0) : a === "number" && (r = 0, o = !0);
  }
  try {
    e[t] = r;
  } catch {
  }
  o && e.removeAttribute(i || t);
}
function Yt(e, t, r, n) {
  e.addEventListener(t, r, n);
}
function wy(e, t, r, n) {
  e.removeEventListener(t, r, n);
}
const Bc = /* @__PURE__ */ Symbol("_vei");
function xy(e, t, r, n, i = null) {
  const s = e[Bc] || (e[Bc] = {}), o = s[t];
  if (n && o)
    o.value = n;
  else {
    const [a, l] = Ay(t);
    if (n) {
      const d = s[t] = Py(
        n,
        i
      );
      Yt(e, a, d, l);
    } else o && (wy(e, a, o, l), s[t] = void 0);
  }
}
const Ny = /(Once|Passive|Capture)$/, Ry = /^on:?(?:Once|Passive|Capture)$/;
function Ay(e) {
  let t, r;
  for (; (r = e.match(Ny)) && !Ry.test(e); )
    t || (t = {}), e = e.slice(0, e.length - r[1].length), t[r[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : nt(e.slice(2)), t];
}
let Lo = 0;
const Cy = /* @__PURE__ */ Promise.resolve(), Oy = () => Lo || (Cy.then(() => Lo = 0), Lo = Date.now());
function Py(e, t) {
  const r = (n) => {
    if (!n._vts)
      n._vts = Date.now();
    else if (n._vts <= r.attached)
      return;
    const i = r.value;
    if (Z(i)) {
      const s = n.stopImmediatePropagation;
      n.stopImmediatePropagation = () => {
        s.call(n), n._stopped = !0;
      };
      const o = i.slice(), a = [n];
      for (let l = 0; l < o.length && !n._stopped; l++) {
        const d = o[l];
        d && ht(
          d,
          t,
          5,
          a
        );
      }
    } else
      ht(
        i,
        t,
        5,
        [n]
      );
  };
  return r.value = e, r.attached = Oy(), r;
}
const Uc = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, jd = (e, t, r, n, i, s) => {
  const o = i === "svg";
  t === "class" ? yy(e, n, o) : t === "style" ? vy(e, r, n) : $r(t) ? Vs(t) || xy(e, t, r, n, s) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : My(e, t, n, o)) ? (Fc(e, t, n), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && jc(e, t, n, o, s, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (Dy(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !ae(n))) ? Fc(e, we(t), n, s, t) : (t === "true-value" ? e._trueValue = n : t === "false-value" && (e._falseValue = n), jc(e, t, n, o));
};
function My(e, t, r, n) {
  if (n)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Uc(t) && oe(r));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const i = e.tagName;
    if (i === "IMG" || i === "VIDEO" || i === "CANVAS" || i === "SOURCE")
      return !1;
  }
  return Uc(t) && ae(r) ? !1 : t in e;
}
function Dy(e, t) {
  const r = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!r)
    return !1;
  const n = we(t);
  return Array.isArray(r) ? r.some((i) => we(i) === n) : Object.keys(r).some((i) => we(i) === n);
}
const $c = {};
// @__NO_SIDE_EFFECTS__
function Fd(e, t, r) {
  let n = /* @__PURE__ */ Ma(e, t);
  Qs(n) && (n = fe({}, n, t));
  class i extends ao {
    constructor(o) {
      super(n, o, r);
    }
  }
  return i.def = n, i;
}
const Ly = (/* @__NO_SIDE_EFFECTS__ */ (e, t) => /* @__PURE__ */ Fd(e, t, Xd)), ky = typeof HTMLElement < "u" ? HTMLElement : class {
};
class ao extends ky {
  constructor(t, r = {}, n = Ps) {
    super(), this._def = t, this._props = r, this._createApp = n, this._isVueCE = !0, this._instance = null, this._app = null, this._nonce = this._def.nonce, this._connected = !1, this._resolved = !1, this._patching = !1, this._dirty = !1, this._numberProps = null, this._styleChildren = /* @__PURE__ */ new WeakSet(), this._styleAnchors = /* @__PURE__ */ new WeakMap(), this._ob = null, this.shadowRoot && n !== Ps ? this._root = this.shadowRoot : t.shadowRoot !== !1 ? (this.attachShadow(
      fe({}, t.shadowRootOptions, {
        mode: "open"
      })
    ), this._root = this.shadowRoot) : this._root = this;
  }
  connectedCallback() {
    if (!this.isConnected) return;
    !this.shadowRoot && !this._resolved && this._parseSlots(), this._connected = !0;
    let t = this;
    for (; t = t && // #12479 should check assignedSlot first to get correct parent
    (t.assignedSlot || t.parentNode || t.host); )
      if (t instanceof ao) {
        this._parent = t;
        break;
      }
    this._instance || (this._resolved ? this._mount(this._def) : t && t._pendingResolve ? this._pendingResolve = t._pendingResolve.then(() => {
      this._pendingResolve = void 0, this._resolveDef();
    }) : this._resolveDef());
  }
  _setParent(t = this._parent) {
    t && (this._instance.parent = t._instance, this._inheritParentContext(t));
  }
  _inheritParentContext(t = this._parent) {
    t && this._app && Object.setPrototypeOf(
      this._app._context.provides,
      t._instance.provides
    );
  }
  disconnectedCallback() {
    this._connected = !1, ji(() => {
      this._connected || (this._ob && (this._ob.disconnect(), this._ob = null), this._app && this._app.unmount(), this._instance && (this._instance.ce = void 0), this._app = this._instance = null, this._teleportTargets && (this._teleportTargets.clear(), this._teleportTargets = void 0));
    });
  }
  _processMutations(t) {
    for (const r of t)
      this._setAttr(r.attributeName);
  }
  /**
   * resolve inner component definition (handle possible async component)
   */
  _resolveDef() {
    if (this._pendingResolve)
      return;
    for (let n = 0; n < this.attributes.length; n++)
      this._setAttr(this.attributes[n].name);
    this._ob = new MutationObserver(this._processMutations.bind(this)), this._ob.observe(this, { attributes: !0 });
    const t = (n, i = !1) => {
      this._resolved = !0, this._pendingResolve = void 0;
      const { props: s, styles: o } = n;
      let a;
      if (s && !Z(s))
        for (const l in s) {
          const d = s[l];
          (d === Number || d && d.type === Number) && (l in this._props && (this._props[l] = ds(this._props[l])), (a || (a = /* @__PURE__ */ Object.create(null)))[we(l)] = !0);
        }
      this._numberProps = a, this._resolveProps(n), this.shadowRoot && this._applyStyles(o), this._mount(n);
    }, r = this._def.__asyncLoader;
    r ? this._pendingResolve = r().then((n) => {
      n.configureApp = this._def.configureApp, t(this._def = n, !0);
    }) : t(this._def);
  }
  _mount(t) {
    __VUE_PROD_DEVTOOLS__ && !t.name && (t.name = "VueElement"), this._app = this._createApp(t), this._inheritParentContext(), t.configureApp && t.configureApp(this._app), this._app._ceVNode = this._createVNode(), this._app.mount(this._root);
    const r = this._instance && this._instance.exposed;
    if (r)
      for (const n in r)
        Te(this, n) || Object.defineProperty(this, n, {
          // unwrap ref to be consistent with public instance behavior
          get: () => ki(r[n])
        });
  }
  _resolveProps(t) {
    const { props: r } = t, n = Z(r) ? r : Object.keys(r || {});
    for (const i of Object.keys(this))
      i[0] !== "_" && n.includes(i) && this._setProp(i, this[i]);
    for (const i of n.map(we))
      Object.defineProperty(this, i, {
        get() {
          return this._getProp(i);
        },
        set(s) {
          this._setProp(i, s, !0, !this._patching);
        }
      });
  }
  _setAttr(t) {
    if (t.startsWith("data-v-")) return;
    const r = this.hasAttribute(t);
    let n = r ? this.getAttribute(t) : $c;
    const i = we(t);
    r && this._numberProps && this._numberProps[i] && (n = ds(n)), this._setProp(i, n, !1, !0);
  }
  /**
   * @internal
   */
  _getProp(t) {
    return this._props[t];
  }
  /**
   * @internal
   */
  _setProp(t, r, n = !0, i = !1) {
    if (r !== this._props[t] && (this._dirty = !0, r === $c ? delete this._props[t] : (this._props[t] = r, t === "key" && this._app && (this._app._ceVNode.key = r)), i && this._instance && this._update(), n)) {
      const s = this._ob;
      s && (this._processMutations(s.takeRecords()), s.disconnect()), r === !0 ? this.setAttribute(nt(t), "") : typeof r == "string" || typeof r == "number" ? this.setAttribute(nt(t), r + "") : r || this.removeAttribute(nt(t)), s && s.observe(this, { attributes: !0 });
    }
  }
  _update() {
    const t = this._createVNode();
    this._app && (t.appContext = this._app._context), Yd(t, this._root);
  }
  _createVNode() {
    const t = {};
    this.shadowRoot || (t.onVnodeMounted = t.onVnodeUpdated = this._renderSlots.bind(this));
    const r = Ce(this._def, fe(t, this._props));
    return this._instance || (r.ce = (n) => {
      this._instance = n, n.ce = this, n.isCE = !0;
      const i = (s, o) => {
        this.dispatchEvent(
          new CustomEvent(
            s,
            Qs(o[0]) ? fe({ detail: o }, o[0]) : { detail: o }
          )
        );
      };
      n.emit = (s, ...o) => {
        i(s, o), nt(s) !== s && i(nt(s), o);
      }, this._setParent();
    }), r;
  }
  _applyStyles(t, r, n) {
    if (!t) return;
    if (r) {
      if (r === this._def || this._styleChildren.has(r))
        return;
      this._styleChildren.add(r);
    }
    const i = this._nonce, s = this.shadowRoot, o = n ? this._getStyleAnchor(n) || this._getStyleAnchor(this._def) : this._getRootStyleInsertionAnchor(s);
    let a = null;
    for (let l = t.length - 1; l >= 0; l--) {
      const d = document.createElement("style");
      i && d.setAttribute("nonce", i), d.textContent = t[l], s.insertBefore(d, a || o), a = d, l === 0 && (n || this._styleAnchors.set(this._def, d), r && this._styleAnchors.set(r, d));
    }
  }
  _getStyleAnchor(t) {
    if (!t)
      return null;
    const r = this._styleAnchors.get(t);
    return r && r.parentNode === this.shadowRoot ? r : (r && this._styleAnchors.delete(t), null);
  }
  _getRootStyleInsertionAnchor(t) {
    for (let r = 0; r < t.childNodes.length; r++) {
      const n = t.childNodes[r];
      if (!(n instanceof HTMLStyleElement))
        return n;
    }
    return null;
  }
  /**
   * Only called when shadowRoot is false
   */
  _parseSlots() {
    const t = this._slots = {};
    let r;
    for (; r = this.firstChild; ) {
      const n = r.nodeType === 1 && r.getAttribute("slot") || "default";
      (t[n] || (t[n] = [])).push(r), this.removeChild(r);
    }
  }
  /**
   * Only called when shadowRoot is false
   */
  _renderSlots() {
    const t = this._getSlots(), r = this._instance.type.__scopeId;
    for (let n = 0; n < t.length; n++) {
      const i = t[n], s = i.getAttribute("name") || "default", o = this._slots[s], a = i.parentNode;
      if (o)
        for (const l of o) {
          if (r && l.nodeType === 1) {
            const d = r + "-s", p = document.createTreeWalker(l, 1);
            l.setAttribute(d, "");
            let c;
            for (; c = p.nextNode(); )
              c.setAttribute(d, "");
          }
          a.insertBefore(l, i);
        }
      else
        for (; i.firstChild; ) a.insertBefore(i.firstChild, i);
      a.removeChild(i);
    }
  }
  /**
   * @internal
   */
  _getSlots() {
    const t = [this];
    this._teleportTargets && t.push(...this._teleportTargets);
    const r = /* @__PURE__ */ new Set();
    for (const n of t) {
      const i = n.querySelectorAll("slot");
      for (let s = 0; s < i.length; s++)
        r.add(i[s]);
    }
    return Array.from(r);
  }
  /**
   * @internal
   */
  _injectChildStyle(t, r) {
    this._applyStyles(t.styles, t, r);
  }
  /**
   * @internal
   */
  _beginPatch() {
    this._patching = !0, this._dirty = !1;
  }
  /**
   * @internal
   */
  _endPatch() {
    this._patching = !1, this._dirty && this._instance && this._update();
  }
  /**
   * @internal
   */
  _hasShadowRoot() {
    return this._def.shadowRoot !== !1;
  }
  /**
   * @internal
   */
  _removeChildStyle(t) {
  }
}
function Bd(e) {
  const t = it(), r = t && t.ce;
  return r || null;
}
function jy() {
  const e = Bd();
  return e && e.shadowRoot;
}
function Fy(e = "$style") {
  {
    const t = it();
    if (!t)
      return de;
    const r = t.type.__cssModules;
    if (!r)
      return de;
    const n = r[e];
    return n || de;
  }
}
const Ud = /* @__PURE__ */ new WeakMap(), $d = /* @__PURE__ */ new WeakMap(), Cs = /* @__PURE__ */ Symbol("_moveCb"), Vc = /* @__PURE__ */ Symbol("_enterCb"), By = (e) => (delete e.props.mode, e), Uy = /* @__PURE__ */ By({
  name: "TransitionGroup",
  props: /* @__PURE__ */ fe({}, Pd, {
    tag: String,
    moveClass: String
  }),
  setup(e, { slots: t }) {
    const r = it(), n = Oa();
    let i, s;
    return no(() => {
      if (!i.length)
        return;
      const o = e.moveClass || `${e.name || "v"}-move`;
      if (!qy(
        i[0].el,
        r.vnode.el,
        o
      )) {
        i = [];
        return;
      }
      i.forEach(Vy), i.forEach(Qy);
      const a = i.filter(Hy);
      na(r.vnode.el), a.forEach((l) => {
        const d = l.el, p = d.style;
        Ot(d, o), p.transform = p.webkitTransform = p.transitionDuration = "";
        const c = d[Cs] = (g) => {
          g && g.target !== d || (!g || g.propertyName.endsWith("transform")) && (d.removeEventListener("transitionend", c), d[Cs] = null, dr(d, o));
        };
        d.addEventListener("transitionend", c);
      }), i = [];
    }), () => {
      const o = /* @__PURE__ */ pe(e), a = Md(o);
      let l = o.tag || je;
      if (i = [], s)
        for (let d = 0; d < s.length; d++) {
          const p = s[d];
          p.el && p.el instanceof Element && // Hidden v-show nodes have no previous layout box to animate from.
          !p.el[Ka] && (i.push(p), nr(
            p,
            cn(
              p,
              a,
              n,
              r
            )
          ), Ud.set(p, Vd(p.el)));
        }
      s = t.default ? to(t.default()) : [];
      for (let d = 0; d < s.length; d++) {
        const p = s[d];
        p.key != null && nr(
          p,
          cn(p, a, n, r)
        );
      }
      return Ce(l, null, s);
    };
  }
}), $y = Uy;
function Vy(e) {
  const t = e.el;
  t[Cs] && t[Cs](), t[Vc] && t[Vc]();
}
function Qy(e) {
  $d.set(e, Vd(e.el));
}
function Hy(e) {
  const t = Ud.get(e), r = $d.get(e), n = t.left - r.left, i = t.top - r.top;
  if (n || i) {
    const s = e.el, o = s.style, a = s.getBoundingClientRect();
    let l = 1, d = 1;
    return s.offsetWidth && (l = a.width / s.offsetWidth), s.offsetHeight && (d = a.height / s.offsetHeight), (!Number.isFinite(l) || l === 0) && (l = 1), (!Number.isFinite(d) || d === 0) && (d = 1), Math.abs(l - 1) < 0.01 && (l = 1), Math.abs(d - 1) < 0.01 && (d = 1), o.transform = o.webkitTransform = `translate(${n / l}px,${i / d}px)`, o.transitionDuration = "0s", e;
  }
}
function Vd(e) {
  const t = e.getBoundingClientRect();
  return {
    left: t.left,
    top: t.top
  };
}
function qy(e, t, r) {
  const n = e.cloneNode(), i = e[un];
  i && i.forEach((a) => {
    a.split(/\s+/).forEach((l) => l && n.classList.remove(l));
  }), r.split(/\s+/).forEach((a) => a && n.classList.add(a)), n.style.display = "none";
  const s = t.nodeType === 1 ? t : t.parentNode;
  s.appendChild(n);
  const { hasTransform: o } = Dd(n);
  return s.removeChild(n), o;
}
const br = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return Z(t) ? (r) => tn(t, r) : t;
};
function Ky(e) {
  e.target.composing = !0;
}
function Qc(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const Tt = /* @__PURE__ */ Symbol("_assign");
function Hc(e, t, r) {
  return t && (e = e.trim()), r && (e = Ks(e)), e;
}
const Os = {
  created(e, { modifiers: { lazy: t, trim: r, number: n } }, i) {
    e[Tt] = br(i);
    const s = n || i.props && i.props.type === "number";
    Yt(e, t ? "change" : "input", (o) => {
      o.target.composing || e[Tt](Hc(e.value, r, s));
    }), (r || s) && Yt(e, "change", () => {
      e.value = Hc(e.value, r, s);
    }), t || (Yt(e, "compositionstart", Ky), Yt(e, "compositionend", Qc), Yt(e, "change", Qc));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: r, modifiers: { lazy: n, trim: i, number: s } }, o) {
    if (e[Tt] = br(o), e.composing) return;
    const a = (s || e.type === "number") && !/^0\d/.test(e.value) ? Ks(e.value) : e.value, l = t ?? "";
    if (a === l)
      return;
    const d = e.getRootNode();
    (d instanceof Document || d instanceof ShadowRoot) && d.activeElement === e && e.type !== "range" && (n && t === r || i && e.value.trim() === l) || (e.value = l);
  }
}, Wa = {
  // #4096 array checkboxes need to be deep traversed
  deep: !0,
  created(e, t, r) {
    e[Tt] = br(r), Yt(e, "change", () => {
      const n = e._modelValue, i = fn(e), s = e.checked, o = e[Tt];
      if (Z(n)) {
        const a = Ws(n, i), l = a !== -1;
        if (s && !l)
          o(n.concat(i));
        else if (!s && l) {
          const d = [...n];
          d.splice(a, 1), o(d);
        }
      } else if (Vr(n)) {
        const a = new Set(n);
        s ? a.add(i) : a.delete(i), o(a);
      } else
        o(Hd(e, s));
    });
  },
  // set initial checked on mount to wait for true-value/false-value
  mounted: qc,
  beforeUpdate(e, t, r) {
    e[Tt] = br(r), qc(e, t, r);
  }
};
function qc(e, { value: t, oldValue: r }, n) {
  e._modelValue = t;
  let i;
  if (Z(t))
    i = Ws(t, n.props.value) > -1;
  else if (Vr(t))
    i = t.has(n.props.value);
  else {
    if (t === r) return;
    i = rr(t, Hd(e, !0));
  }
  e.checked !== i && (e.checked = i);
}
const Ga = {
  created(e, { value: t }, r) {
    e.checked = rr(t, r.props.value), e[Tt] = br(r), Yt(e, "change", () => {
      e[Tt](fn(e));
    });
  },
  beforeUpdate(e, { value: t, oldValue: r }, n) {
    e[Tt] = br(n), t !== r && (e.checked = rr(t, n.props.value));
  }
}, Qd = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(e, { value: t, modifiers: { number: r } }, n) {
    const i = Vr(t);
    Yt(e, "change", () => {
      const s = Array.prototype.filter.call(e.options, (o) => o.selected).map(
        (o) => r ? Ks(fn(o)) : fn(o)
      );
      e[Tt](
        e.multiple ? i ? new Set(s) : s : s[0]
      ), e._assigning = !0, ji(() => {
        e._assigning = !1;
      });
    }), e[Tt] = br(n);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(e, { value: t }) {
    Kc(e, t);
  },
  beforeUpdate(e, t, r) {
    e[Tt] = br(r);
  },
  updated(e, { value: t }) {
    e._assigning || Kc(e, t);
  }
};
function Kc(e, t) {
  const r = e.multiple, n = Z(t);
  if (!(r && !n && !Vr(t))) {
    for (let i = 0, s = e.options.length; i < s; i++) {
      const o = e.options[i], a = fn(o);
      if (r)
        if (n) {
          const l = typeof a;
          l === "string" || l === "number" ? o.selected = t.some((d) => String(d) === String(a)) : o.selected = Ws(t, a) > -1;
        } else
          o.selected = t.has(a);
      else if (rr(fn(o), t)) {
        e.selectedIndex !== i && (e.selectedIndex = i);
        return;
      }
    }
    !r && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function fn(e) {
  return "_value" in e ? e._value : e.value;
}
function Hd(e, t) {
  const r = t ? "_trueValue" : "_falseValue";
  return r in e ? e[r] : t;
}
const qd = {
  created(e, t, r) {
    ns(e, t, r, null, "created");
  },
  mounted(e, t, r) {
    ns(e, t, r, null, "mounted");
  },
  beforeUpdate(e, t, r, n) {
    ns(e, t, r, n, "beforeUpdate");
  },
  updated(e, t, r, n) {
    ns(e, t, r, n, "updated");
  }
};
function Kd(e, t) {
  switch (e) {
    case "SELECT":
      return Qd;
    case "TEXTAREA":
      return Os;
    default:
      switch (t) {
        case "checkbox":
          return Wa;
        case "radio":
          return Ga;
        default:
          return Os;
      }
  }
}
function ns(e, t, r, n, i) {
  const o = Kd(
    e.tagName,
    r.props && r.props.type
  )[i];
  o && o(e, t, r, n);
}
function Wy() {
  Os.getSSRProps = ({ value: e }) => ({ value: e }), Ga.getSSRProps = ({ value: e }, t) => {
    if (t.props && rr(t.props.value, e))
      return { checked: !0 };
  }, Wa.getSSRProps = ({ value: e }, t) => {
    if (Z(e)) {
      if (t.props && Ws(e, t.props.value) > -1)
        return { checked: !0 };
    } else if (Vr(e)) {
      if (t.props && e.has(t.props.value))
        return { checked: !0 };
    } else if (e)
      return { checked: !0 };
  }, qd.getSSRProps = (e, t) => {
    if (typeof t.type != "string")
      return;
    const r = Kd(
      // resolveDynamicModel expects an uppercase tag name, but vnode.type is lowercase
      t.type.toUpperCase(),
      t.props && t.props.type
    );
    if (r.getSSRProps)
      return r.getSSRProps(e, t);
  };
}
const Gy = ["ctrl", "shift", "alt", "meta"], zy = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, t) => Gy.some((r) => e[`${r}Key`] && !t.includes(r))
}, Yy = (e, t) => {
  if (!e) return e;
  const r = e._withMods || (e._withMods = {}), n = t.join(".");
  return r[n] || (r[n] = ((i, ...s) => {
    for (let o = 0; o < t.length; o++) {
      const a = zy[t[o]];
      if (a && a(i, t)) return;
    }
    return e(i, ...s);
  }));
}, Xy = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, Jy = (e, t) => {
  const r = e._withKeys || (e._withKeys = {}), n = t.join(".");
  return r[n] || (r[n] = ((i) => {
    if (!("key" in i))
      return;
    const s = nt(i.key);
    if (t.some(
      (o) => o === s || Xy[o] === s
    ))
      return e(i);
  }));
}, Wd = /* @__PURE__ */ fe({ patchProp: jd }, Cd);
let mi, Wc = !1;
function Gd() {
  return mi || (mi = od(Wd));
}
function zd() {
  return mi = Wc ? mi : ad(Wd), Wc = !0, mi;
}
const Yd = ((...e) => {
  Gd().render(...e);
}), Zy = ((...e) => {
  zd().hydrate(...e);
}), Ps = ((...e) => {
  const t = Gd().createApp(...e), { mount: r } = t;
  return t.mount = (n) => {
    const i = Zd(n);
    if (!i) return;
    const s = t._component;
    !oe(s) && !s.render && !s.template && (s.template = i.innerHTML), i.nodeType === 1 && (i.textContent = "");
    const o = r(i, !1, Jd(i));
    return i instanceof Element && (i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")), o;
  }, t;
}), Xd = ((...e) => {
  const t = zd().createApp(...e), { mount: r } = t;
  return t.mount = (n) => {
    const i = Zd(n);
    if (i)
      return r(i, !0, Jd(i));
  }, t;
});
function Jd(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Zd(e) {
  return ae(e) ? document.querySelector(e) : e;
}
let Gc = !1;
const e0 = () => {
  Gc || (Gc = !0, Wy(), by());
}, t0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BaseTransition: Mf,
  BaseTransitionPropsValidators: Pa,
  Comment: Pe,
  DeprecationTypes: fy,
  EffectScope: va,
  ErrorCodes: tg,
  ErrorTypeStrings: iy,
  Fragment: je,
  KeepAlive: Hg,
  ReactiveEffect: _i,
  Static: _r,
  Suspense: j_,
  Teleport: Sg,
  Text: er,
  TrackOpTypes: Hm,
  Transition: my,
  TransitionGroup: $y,
  TriggerOpTypes: qm,
  VueElement: ao,
  assertNumber: eg,
  callWithAsyncErrorHandling: ht,
  callWithErrorHandling: Hr,
  camelize: we,
  capitalize: Qr,
  cloneVNode: kt,
  compatUtils: uy,
  computed: Xr,
  createApp: Ps,
  createBlock: Es,
  createCommentVNode: yd,
  createElementBlock: Q_,
  createElementVNode: Ha,
  createHydrationRenderer: ad,
  createPropsRestProxy: d_,
  createRenderer: od,
  createSSRApp: Xd,
  createSlots: Xg,
  createStaticVNode: K_,
  createTextVNode: qa,
  createVNode: Ce,
  customRef: gf,
  defineAsyncComponent: Vg,
  defineComponent: Ma,
  defineCustomElement: Fd,
  defineEmits: r_,
  defineExpose: n_,
  defineModel: o_,
  defineOptions: i_,
  defineProps: t_,
  defineSSRCustomElement: Ly,
  defineSlots: s_,
  devtools: sy,
  effect: hm,
  effectScope: um,
  getCurrentInstance: it,
  getCurrentScope: zu,
  getCurrentWatcher: Km,
  getTransitionRawChildren: to,
  guardReactiveProps: _d,
  h: Nd,
  handleError: qr,
  hasInjectionContext: pg,
  hydrate: Zy,
  hydrateOnIdle: kg,
  hydrateOnInteraction: Ug,
  hydrateOnMediaQuery: Bg,
  hydrateOnVisible: Fg,
  initCustomFormatter: ty,
  initDirectivesForSSR: e0,
  inject: fi,
  isMemoSame: Rd,
  isProxy: Li,
  isReactive: Jt,
  isReadonly: Lt,
  isRef: De,
  isRuntimeOnly: Y_,
  isShallow: ct,
  isVNode: ir,
  markRaw: hf,
  mergeDefaults: u_,
  mergeModels: f_,
  mergeProps: bd,
  nextTick: ji,
  nodeOps: Cd,
  normalizeClass: bn,
  normalizeProps: Gp,
  normalizeStyle: yn,
  onActivated: jf,
  onBeforeMount: Uf,
  onBeforeUnmount: io,
  onBeforeUpdate: ka,
  onDeactivated: Ff,
  onErrorCaptured: Hf,
  onMounted: Tn,
  onRenderTracked: Qf,
  onRenderTriggered: Vf,
  onScopeDispose: fm,
  onServerPrefetch: $f,
  onUnmounted: Sn,
  onUpdated: no,
  onWatcherCleanup: yf,
  openBlock: wi,
  patchProp: jd,
  popScopeId: fg,
  provide: If,
  proxyRefs: xa,
  pushScopeId: ug,
  queuePostFlushCb: Ti,
  reactive: Xs,
  readonly: ps,
  ref: Ee,
  registerRuntimeCompiler: Ed,
  render: Yd,
  renderList: Yg,
  renderSlot: Jg,
  resolveComponent: Wg,
  resolveDirective: zg,
  resolveDynamicComponent: Gg,
  resolveFilter: cy,
  resolveTransitionHooks: cn,
  setBlockTracking: xi,
  setDevtoolsHook: oy,
  setTransitionHooks: nr,
  shallowReactive: df,
  shallowReadonly: Pm,
  shallowRef: pf,
  ssrContextKey: wf,
  ssrUtils: ly,
  stop: pm,
  toDisplayString: Ku,
  toHandlerKey: en,
  toHandlers: Zg,
  toRaw: pe,
  toRef: $m,
  toRefs: Fm,
  toValue: Lm,
  transformVNodeArgs: H_,
  triggerRef: Dm,
  unref: ki,
  useAttrs: c_,
  useCssModule: Fy,
  useCssVars: Ty,
  useHost: Bd,
  useId: Eg,
  useModel: S_,
  useSSRContext: xf,
  useShadowRoot: jy,
  useSlots: l_,
  useTemplateRef: Ig,
  useTransitionState: Oa,
  vModelCheckbox: Wa,
  vModelDynamic: qd,
  vModelRadio: Ga,
  vModelSelect: Qd,
  vModelText: Os,
  vShow: Ld,
  version: ta,
  warn: ny,
  watch: gr,
  watchEffect: mg,
  watchPostEffect: gg,
  watchSyncEffect: Nf,
  withAsyncContext: h_,
  withCtx: Ca,
  withDefaults: a_,
  withDirectives: hg,
  withKeys: Jy,
  withMemo: ry,
  withModifiers: Yy,
  withScopeId: dg
}, Symbol.toStringTag, { value: "Module" }));
/**
* @vue/compiler-core v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const Ri = /* @__PURE__ */ Symbol(""), gi = /* @__PURE__ */ Symbol(""), za = /* @__PURE__ */ Symbol(""), Ms = /* @__PURE__ */ Symbol(""), eh = /* @__PURE__ */ Symbol(
  ""
), Ur = /* @__PURE__ */ Symbol(""), th = /* @__PURE__ */ Symbol(""), rh = /* @__PURE__ */ Symbol(
  ""
), Ya = /* @__PURE__ */ Symbol(""), Xa = /* @__PURE__ */ Symbol(
  ""
), $i = /* @__PURE__ */ Symbol(
  ""
), Ja = /* @__PURE__ */ Symbol(
  ""
), nh = /* @__PURE__ */ Symbol(
  ""
), Za = /* @__PURE__ */ Symbol(
  ""
), el = /* @__PURE__ */ Symbol(
  ""
), tl = /* @__PURE__ */ Symbol(
  ""
), rl = /* @__PURE__ */ Symbol(
  ""
), nl = /* @__PURE__ */ Symbol(
  ""
), il = /* @__PURE__ */ Symbol(""), ih = /* @__PURE__ */ Symbol(""), sh = /* @__PURE__ */ Symbol(""), lo = /* @__PURE__ */ Symbol(
  ""
), Ds = /* @__PURE__ */ Symbol(""), sl = /* @__PURE__ */ Symbol(
  ""
), ol = /* @__PURE__ */ Symbol(
  ""
), Ai = /* @__PURE__ */ Symbol(
  ""
), Vi = /* @__PURE__ */ Symbol(
  ""
), al = /* @__PURE__ */ Symbol(""), sa = /* @__PURE__ */ Symbol(""), r0 = /* @__PURE__ */ Symbol(""), oa = /* @__PURE__ */ Symbol(
  ""
), Ls = /* @__PURE__ */ Symbol(
  ""
), n0 = /* @__PURE__ */ Symbol(""), i0 = /* @__PURE__ */ Symbol(""), ll = /* @__PURE__ */ Symbol(""), s0 = /* @__PURE__ */ Symbol(""), o0 = /* @__PURE__ */ Symbol(""), cl = /* @__PURE__ */ Symbol(""), oh = /* @__PURE__ */ Symbol(""), dn = {
  [Ri]: "Fragment",
  [gi]: "Teleport",
  [za]: "Suspense",
  [Ms]: "KeepAlive",
  [eh]: "BaseTransition",
  [Ur]: "openBlock",
  [th]: "createBlock",
  [rh]: "createElementBlock",
  [Ya]: "createVNode",
  [Xa]: "createElementVNode",
  [$i]: "createCommentVNode",
  [Ja]: "createTextVNode",
  [nh]: "createStaticVNode",
  [Za]: "resolveComponent",
  [el]: "resolveDynamicComponent",
  [tl]: "resolveDirective",
  [rl]: "resolveFilter",
  [nl]: "withDirectives",
  [il]: "renderList",
  [ih]: "renderSlot",
  [sh]: "createSlots",
  [lo]: "toDisplayString",
  [Ds]: "mergeProps",
  [sl]: "normalizeClass",
  [ol]: "normalizeStyle",
  [Ai]: "normalizeProps",
  [Vi]: "guardReactiveProps",
  [al]: "toHandlers",
  [sa]: "camelize",
  [r0]: "capitalize",
  [oa]: "toHandlerKey",
  [Ls]: "setBlockTracking",
  [n0]: "pushScopeId",
  [i0]: "popScopeId",
  [ll]: "withCtx",
  [s0]: "unref",
  [o0]: "isRef",
  [cl]: "withMemo",
  [oh]: "isMemoSame"
};
function a0(e) {
  Object.getOwnPropertySymbols(e).forEach((t) => {
    dn[t] = e[t];
  });
}
const pt = {
  start: { line: 1, column: 1, offset: 0 },
  end: { line: 1, column: 1, offset: 0 },
  source: ""
};
function l0(e, t = "") {
  return {
    type: 0,
    source: t,
    children: e,
    helpers: /* @__PURE__ */ new Set(),
    components: [],
    directives: [],
    hoists: [],
    imports: [],
    cached: [],
    temps: 0,
    codegenNode: void 0,
    loc: pt
  };
}
function Ci(e, t, r, n, i, s, o, a = !1, l = !1, d = !1, p = pt) {
  return e && (a ? (e.helper(Ur), e.helper(mn(e.inSSR, d))) : e.helper(pn(e.inSSR, d)), o && e.helper(nl)), {
    type: 13,
    tag: t,
    props: r,
    children: n,
    patchFlag: i,
    dynamicProps: s,
    directives: o,
    isBlock: a,
    disableTracking: l,
    isComponent: d,
    loc: p
  };
}
function kr(e, t = pt) {
  return {
    type: 17,
    loc: t,
    elements: e
  };
}
function bt(e, t = pt) {
  return {
    type: 15,
    loc: t,
    properties: e
  };
}
function Fe(e, t) {
  return {
    type: 16,
    loc: pt,
    key: ae(e) ? ce(e, !0) : e,
    value: t
  };
}
function ce(e, t = !1, r = pt, n = 0) {
  return {
    type: 4,
    loc: r,
    content: e,
    isStatic: t,
    constType: t ? 3 : n
  };
}
function Nt(e, t = pt) {
  return {
    type: 8,
    loc: t,
    children: e
  };
}
function Ue(e, t = [], r = pt) {
  return {
    type: 14,
    loc: r,
    callee: e,
    arguments: t
  };
}
function hn(e, t = void 0, r = !1, n = !1, i = pt) {
  return {
    type: 18,
    params: e,
    returns: t,
    newline: r,
    isSlot: n,
    loc: i
  };
}
function aa(e, t, r, n = !0) {
  return {
    type: 19,
    test: e,
    consequent: t,
    alternate: r,
    newline: n,
    loc: pt
  };
}
function c0(e, t, r = !1, n = !1) {
  return {
    type: 20,
    index: e,
    value: t,
    needPauseTracking: r,
    inVOnce: n,
    needArraySpread: !1,
    loc: pt
  };
}
function u0(e) {
  return {
    type: 21,
    body: e,
    loc: pt
  };
}
function pn(e, t) {
  return e || t ? Ya : Xa;
}
function mn(e, t) {
  return e || t ? th : rh;
}
function ul(e, { helper: t, removeHelper: r, inSSR: n }) {
  e.isBlock || (e.isBlock = !0, r(pn(n, e.isComponent)), t(Ur), t(mn(n, e.isComponent)));
}
const zc = new Uint8Array([123, 123]), Yc = new Uint8Array([125, 125]);
function Xc(e) {
  return e >= 97 && e <= 122 || e >= 65 && e <= 90;
}
function ft(e) {
  return e === 32 || e === 10 || e === 9 || e === 12 || e === 13;
}
function cr(e) {
  return e === 47 || e === 62 || ft(e);
}
function ks(e) {
  const t = new Uint8Array(e.length);
  for (let r = 0; r < e.length; r++)
    t[r] = e.charCodeAt(r);
  return t;
}
const Ge = {
  Cdata: new Uint8Array([67, 68, 65, 84, 65, 91]),
  // CDATA[
  CdataEnd: new Uint8Array([93, 93, 62]),
  // ]]>
  CommentEnd: new Uint8Array([45, 45, 62]),
  // `-->`
  ScriptEnd: new Uint8Array([60, 47, 115, 99, 114, 105, 112, 116]),
  // `<\/script`
  StyleEnd: new Uint8Array([60, 47, 115, 116, 121, 108, 101]),
  // `</style`
  TitleEnd: new Uint8Array([60, 47, 116, 105, 116, 108, 101]),
  // `</title`
  TextareaEnd: new Uint8Array([
    60,
    47,
    116,
    101,
    120,
    116,
    97,
    114,
    101,
    97
  ])
  // `</textarea
};
class f0 {
  constructor(t, r) {
    this.stack = t, this.cbs = r, this.state = 1, this.buffer = "", this.sectionStart = 0, this.index = 0, this.entityStart = 0, this.baseState = 1, this.inRCDATA = !1, this.inXML = !1, this.inVPre = !1, this.newlines = [], this.mode = 0, this.delimiterOpen = zc, this.delimiterClose = Yc, this.delimiterIndex = -1, this.currentSequence = void 0, this.sequenceIndex = 0;
  }
  get inSFCRoot() {
    return this.mode === 2 && this.stack.length === 0;
  }
  reset() {
    this.state = 1, this.mode = 0, this.buffer = "", this.sectionStart = 0, this.index = 0, this.baseState = 1, this.inRCDATA = !1, this.currentSequence = void 0, this.newlines.length = 0, this.delimiterOpen = zc, this.delimiterClose = Yc;
  }
  /**
   * Generate Position object with line / column information using recorded
   * newline positions. We know the index is always going to be an already
   * processed index, so all the newlines up to this index should have been
   * recorded.
   */
  getPos(t) {
    let r = 1, n = t + 1;
    const i = this.newlines.length;
    let s = -1;
    if (i > 100) {
      let o = -1, a = i;
      for (; o + 1 < a; ) {
        const l = o + a >>> 1;
        this.newlines[l] < t ? o = l : a = l;
      }
      s = o;
    } else
      for (let o = i - 1; o >= 0; o--)
        if (t > this.newlines[o]) {
          s = o;
          break;
        }
    return s >= 0 && (r = s + 2, n = t - this.newlines[s]), {
      column: n,
      line: r,
      offset: t
    };
  }
  peek() {
    return this.buffer.charCodeAt(this.index + 1);
  }
  stateText(t) {
    t === 60 ? (this.index > this.sectionStart && this.cbs.ontext(this.sectionStart, this.index), this.state = 5, this.sectionStart = this.index) : !this.inVPre && t === this.delimiterOpen[0] && (this.state = 2, this.delimiterIndex = 0, this.stateInterpolationOpen(t));
  }
  stateInterpolationOpen(t) {
    if (t === this.delimiterOpen[this.delimiterIndex])
      if (this.delimiterIndex === this.delimiterOpen.length - 1) {
        const r = this.index + 1 - this.delimiterOpen.length;
        r > this.sectionStart && this.cbs.ontext(this.sectionStart, r), this.state = 3, this.sectionStart = r;
      } else
        this.delimiterIndex++;
    else this.inRCDATA ? (this.state = 32, this.stateInRCDATA(t)) : (this.state = 1, this.stateText(t));
  }
  stateInterpolation(t) {
    t === this.delimiterClose[0] && (this.state = 4, this.delimiterIndex = 0, this.stateInterpolationClose(t));
  }
  stateInterpolationClose(t) {
    t === this.delimiterClose[this.delimiterIndex] ? this.delimiterIndex === this.delimiterClose.length - 1 ? (this.cbs.oninterpolation(this.sectionStart, this.index + 1), this.inRCDATA ? this.state = 32 : this.state = 1, this.sectionStart = this.index + 1) : this.delimiterIndex++ : (this.state = 3, this.stateInterpolation(t));
  }
  stateSpecialStartSequence(t) {
    const r = this.sequenceIndex === this.currentSequence.length;
    if (!(r ? (
      // If we are at the end of the sequence, make sure the tag name has ended
      cr(t)
    ) : (
      // Otherwise, do a case-insensitive comparison
      (t | 32) === this.currentSequence[this.sequenceIndex]
    )))
      this.inRCDATA = !1;
    else if (!r) {
      this.sequenceIndex++;
      return;
    }
    this.sequenceIndex = 0, this.state = 6, this.stateInTagName(t);
  }
  /** Look for an end tag. For <title> and <textarea>, also decode entities. */
  stateInRCDATA(t) {
    if (this.sequenceIndex === this.currentSequence.length) {
      if (t === 62 || ft(t)) {
        const r = this.index - this.currentSequence.length;
        if (this.sectionStart < r) {
          const n = this.index;
          this.index = r, this.cbs.ontext(this.sectionStart, r), this.index = n;
        }
        this.sectionStart = r + 2, this.stateInClosingTagName(t), this.inRCDATA = !1;
        return;
      }
      this.sequenceIndex = 0;
    }
    (t | 32) === this.currentSequence[this.sequenceIndex] ? this.sequenceIndex += 1 : this.sequenceIndex === 0 ? this.currentSequence === Ge.TitleEnd || this.currentSequence === Ge.TextareaEnd && !this.inSFCRoot ? !this.inVPre && t === this.delimiterOpen[0] && (this.state = 2, this.delimiterIndex = 0, this.stateInterpolationOpen(t)) : this.fastForwardTo(60) && (this.sequenceIndex = 1) : this.sequenceIndex = +(t === 60);
  }
  stateCDATASequence(t) {
    t === Ge.Cdata[this.sequenceIndex] ? ++this.sequenceIndex === Ge.Cdata.length && (this.state = 28, this.currentSequence = Ge.CdataEnd, this.sequenceIndex = 0, this.sectionStart = this.index + 1) : (this.sequenceIndex = 0, this.state = 23, this.stateInDeclaration(t));
  }
  /**
   * When we wait for one specific character, we can speed things up
   * by skipping through the buffer until we find it.
   *
   * @returns Whether the character was found.
   */
  fastForwardTo(t) {
    for (; ++this.index < this.buffer.length; ) {
      const r = this.buffer.charCodeAt(this.index);
      if (r === 10 && this.newlines.push(this.index), r === t)
        return !0;
    }
    return this.index = this.buffer.length - 1, !1;
  }
  /**
   * Comments and CDATA end with `-->` and `]]>`.
   *
   * Their common qualities are:
   * - Their end sequences have a distinct character they start with.
   * - That character is then repeated, so we have to check multiple repeats.
   * - All characters but the start character of the sequence can be skipped.
   */
  stateInCommentLike(t) {
    t === this.currentSequence[this.sequenceIndex] ? ++this.sequenceIndex === this.currentSequence.length && (this.currentSequence === Ge.CdataEnd ? this.cbs.oncdata(this.sectionStart, this.index - 2) : this.cbs.oncomment(this.sectionStart, this.index - 2), this.sequenceIndex = 0, this.sectionStart = this.index + 1, this.state = 1) : this.sequenceIndex === 0 ? this.fastForwardTo(this.currentSequence[0]) && (this.sequenceIndex = 1) : t !== this.currentSequence[this.sequenceIndex - 1] && (this.sequenceIndex = 0);
  }
  startSpecial(t, r) {
    this.enterRCDATA(t, r), this.state = 31;
  }
  enterRCDATA(t, r) {
    this.inRCDATA = !0, this.currentSequence = t, this.sequenceIndex = r;
  }
  stateBeforeTagName(t) {
    t === 33 ? (this.state = 22, this.sectionStart = this.index + 1) : t === 63 ? (this.state = 24, this.sectionStart = this.index + 1) : Xc(t) ? (this.sectionStart = this.index, this.mode === 0 ? this.state = 6 : this.inSFCRoot ? this.state = 34 : this.inXML ? this.state = 6 : t === 116 ? this.state = 30 : this.state = t === 115 ? 29 : 6) : t === 47 ? this.state = 8 : (this.state = 1, this.stateText(t));
  }
  stateInTagName(t) {
    cr(t) && this.handleTagName(t);
  }
  stateInSFCRootTagName(t) {
    if (cr(t)) {
      const r = this.buffer.slice(this.sectionStart, this.index);
      r !== "template" && this.enterRCDATA(ks("</" + r), 0), this.handleTagName(t);
    }
  }
  handleTagName(t) {
    this.cbs.onopentagname(this.sectionStart, this.index), this.sectionStart = -1, this.state = 11, this.stateBeforeAttrName(t);
  }
  stateBeforeClosingTagName(t) {
    ft(t) || (t === 62 ? (this.state = 1, this.sectionStart = this.index + 1) : (this.state = Xc(t) ? 9 : 27, this.sectionStart = this.index));
  }
  stateInClosingTagName(t) {
    (t === 62 || ft(t)) && (this.cbs.onclosetag(this.sectionStart, this.index), this.sectionStart = -1, this.state = 10, this.stateAfterClosingTagName(t));
  }
  stateAfterClosingTagName(t) {
    t === 62 && (this.state = 1, this.sectionStart = this.index + 1);
  }
  stateBeforeAttrName(t) {
    t === 62 ? (this.cbs.onopentagend(this.index), this.inRCDATA ? this.state = 32 : this.state = 1, this.sectionStart = this.index + 1) : t === 47 ? this.state = 7 : t === 60 && this.peek() === 47 ? (this.cbs.onopentagend(this.index), this.state = 5, this.sectionStart = this.index) : ft(t) || this.handleAttrStart(t);
  }
  handleAttrStart(t) {
    t === 118 && this.peek() === 45 ? (this.state = 13, this.sectionStart = this.index) : t === 46 || t === 58 || t === 64 || t === 35 ? (this.cbs.ondirname(this.index, this.index + 1), this.state = 14, this.sectionStart = this.index + 1) : (this.state = 12, this.sectionStart = this.index);
  }
  stateInSelfClosingTag(t) {
    t === 62 ? (this.cbs.onselfclosingtag(this.index), this.state = 1, this.sectionStart = this.index + 1, this.inRCDATA = !1) : ft(t) || (this.state = 11, this.stateBeforeAttrName(t));
  }
  stateInAttrName(t) {
    (t === 61 || cr(t)) && (this.cbs.onattribname(this.sectionStart, this.index), this.handleAttrNameEnd(t));
  }
  stateInDirName(t) {
    t === 61 || cr(t) ? (this.cbs.ondirname(this.sectionStart, this.index), this.handleAttrNameEnd(t)) : t === 58 ? (this.cbs.ondirname(this.sectionStart, this.index), this.state = 14, this.sectionStart = this.index + 1) : t === 46 && (this.cbs.ondirname(this.sectionStart, this.index), this.state = 16, this.sectionStart = this.index + 1);
  }
  stateInDirArg(t) {
    t === 61 || cr(t) ? (this.cbs.ondirarg(this.sectionStart, this.index), this.handleAttrNameEnd(t)) : t === 91 ? this.state = 15 : t === 46 && (this.cbs.ondirarg(this.sectionStart, this.index), this.state = 16, this.sectionStart = this.index + 1);
  }
  stateInDynamicDirArg(t) {
    t === 93 ? this.state = 14 : (t === 61 || cr(t)) && (this.cbs.ondirarg(this.sectionStart, this.index + 1), this.handleAttrNameEnd(t));
  }
  stateInDirModifier(t) {
    t === 61 || cr(t) ? (this.cbs.ondirmodifier(this.sectionStart, this.index), this.handleAttrNameEnd(t)) : t === 46 && (this.cbs.ondirmodifier(this.sectionStart, this.index), this.sectionStart = this.index + 1);
  }
  handleAttrNameEnd(t) {
    this.sectionStart = this.index, this.state = 17, this.cbs.onattribnameend(this.index), this.stateAfterAttrName(t);
  }
  stateAfterAttrName(t) {
    t === 61 ? this.state = 18 : t === 47 || t === 62 ? (this.cbs.onattribend(0, this.sectionStart), this.sectionStart = -1, this.state = 11, this.stateBeforeAttrName(t)) : ft(t) || (this.cbs.onattribend(0, this.sectionStart), this.handleAttrStart(t));
  }
  stateBeforeAttrValue(t) {
    t === 34 ? (this.state = 19, this.sectionStart = this.index + 1) : t === 39 ? (this.state = 20, this.sectionStart = this.index + 1) : ft(t) || (this.sectionStart = this.index, this.state = 21, this.stateInAttrValueNoQuotes(t));
  }
  handleInAttrValue(t, r) {
    (t === r || this.fastForwardTo(r)) && (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = -1, this.cbs.onattribend(
      r === 34 ? 3 : 2,
      this.index + 1
    ), this.state = 11);
  }
  stateInAttrValueDoubleQuotes(t) {
    this.handleInAttrValue(t, 34);
  }
  stateInAttrValueSingleQuotes(t) {
    this.handleInAttrValue(t, 39);
  }
  stateInAttrValueNoQuotes(t) {
    ft(t) || t === 62 ? (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = -1, this.cbs.onattribend(1, this.index), this.state = 11, this.stateBeforeAttrName(t)) : (t === 39 || t === 60 || t === 61 || t === 96) && this.cbs.onerr(
      18,
      this.index
    );
  }
  stateBeforeDeclaration(t) {
    t === 91 ? (this.state = 26, this.sequenceIndex = 0) : this.state = t === 45 ? 25 : 23;
  }
  stateInDeclaration(t) {
    (t === 62 || this.fastForwardTo(62)) && (this.state = 1, this.sectionStart = this.index + 1);
  }
  stateInProcessingInstruction(t) {
    (t === 62 || this.fastForwardTo(62)) && (this.cbs.onprocessinginstruction(this.sectionStart, this.index), this.state = 1, this.sectionStart = this.index + 1);
  }
  stateBeforeComment(t) {
    t === 45 ? (this.state = 28, this.currentSequence = Ge.CommentEnd, this.sequenceIndex = 2, this.sectionStart = this.index + 1) : this.state = 23;
  }
  stateInSpecialComment(t) {
    (t === 62 || this.fastForwardTo(62)) && (this.cbs.oncomment(this.sectionStart, this.index), this.state = 1, this.sectionStart = this.index + 1);
  }
  stateBeforeSpecialS(t) {
    t === Ge.ScriptEnd[3] ? this.startSpecial(Ge.ScriptEnd, 4) : t === Ge.StyleEnd[3] ? this.startSpecial(Ge.StyleEnd, 4) : (this.state = 6, this.stateInTagName(t));
  }
  stateBeforeSpecialT(t) {
    t === Ge.TitleEnd[3] ? this.startSpecial(Ge.TitleEnd, 4) : t === Ge.TextareaEnd[3] ? this.startSpecial(Ge.TextareaEnd, 4) : (this.state = 6, this.stateInTagName(t));
  }
  startEntity() {
  }
  stateInEntity() {
  }
  /**
   * Iterates through the buffer, calling the function corresponding to the current state.
   *
   * States that are more likely to be hit are higher up, as a performance improvement.
   */
  parse(t) {
    for (this.buffer = t; this.index < this.buffer.length; ) {
      const r = this.buffer.charCodeAt(this.index);
      switch (r === 10 && this.state !== 33 && this.newlines.push(this.index), this.state) {
        case 1: {
          this.stateText(r);
          break;
        }
        case 2: {
          this.stateInterpolationOpen(r);
          break;
        }
        case 3: {
          this.stateInterpolation(r);
          break;
        }
        case 4: {
          this.stateInterpolationClose(r);
          break;
        }
        case 31: {
          this.stateSpecialStartSequence(r);
          break;
        }
        case 32: {
          this.stateInRCDATA(r);
          break;
        }
        case 26: {
          this.stateCDATASequence(r);
          break;
        }
        case 19: {
          this.stateInAttrValueDoubleQuotes(r);
          break;
        }
        case 12: {
          this.stateInAttrName(r);
          break;
        }
        case 13: {
          this.stateInDirName(r);
          break;
        }
        case 14: {
          this.stateInDirArg(r);
          break;
        }
        case 15: {
          this.stateInDynamicDirArg(r);
          break;
        }
        case 16: {
          this.stateInDirModifier(r);
          break;
        }
        case 28: {
          this.stateInCommentLike(r);
          break;
        }
        case 27: {
          this.stateInSpecialComment(r);
          break;
        }
        case 11: {
          this.stateBeforeAttrName(r);
          break;
        }
        case 6: {
          this.stateInTagName(r);
          break;
        }
        case 34: {
          this.stateInSFCRootTagName(r);
          break;
        }
        case 9: {
          this.stateInClosingTagName(r);
          break;
        }
        case 5: {
          this.stateBeforeTagName(r);
          break;
        }
        case 17: {
          this.stateAfterAttrName(r);
          break;
        }
        case 20: {
          this.stateInAttrValueSingleQuotes(r);
          break;
        }
        case 18: {
          this.stateBeforeAttrValue(r);
          break;
        }
        case 8: {
          this.stateBeforeClosingTagName(r);
          break;
        }
        case 10: {
          this.stateAfterClosingTagName(r);
          break;
        }
        case 29: {
          this.stateBeforeSpecialS(r);
          break;
        }
        case 30: {
          this.stateBeforeSpecialT(r);
          break;
        }
        case 21: {
          this.stateInAttrValueNoQuotes(r);
          break;
        }
        case 7: {
          this.stateInSelfClosingTag(r);
          break;
        }
        case 23: {
          this.stateInDeclaration(r);
          break;
        }
        case 22: {
          this.stateBeforeDeclaration(r);
          break;
        }
        case 25: {
          this.stateBeforeComment(r);
          break;
        }
        case 24: {
          this.stateInProcessingInstruction(r);
          break;
        }
        case 33: {
          this.stateInEntity();
          break;
        }
      }
      this.index++;
    }
    this.cleanup(), this.finish();
  }
  /**
   * Remove data that has already been consumed from the buffer.
   */
  cleanup() {
    this.sectionStart !== this.index && (this.state === 1 || this.state === 32 && this.sequenceIndex === 0 ? (this.cbs.ontext(this.sectionStart, this.index), this.sectionStart = this.index) : (this.state === 19 || this.state === 20 || this.state === 21) && (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = this.index));
  }
  finish() {
    this.handleTrailingData(), this.cbs.onend();
  }
  /** Handle any trailing data. */
  handleTrailingData() {
    const t = this.buffer.length;
    this.sectionStart >= t || (this.state === 28 ? this.currentSequence === Ge.CdataEnd ? this.cbs.oncdata(this.sectionStart, t) : this.cbs.oncomment(this.sectionStart, t) : this.state === 6 || this.state === 11 || this.state === 18 || this.state === 17 || this.state === 12 || this.state === 13 || this.state === 14 || this.state === 15 || this.state === 16 || this.state === 20 || this.state === 19 || this.state === 21 || this.state === 9 || this.cbs.ontext(this.sectionStart, t));
  }
  emitCodePoint(t, r) {
  }
}
function Jc(e, { compatConfig: t }) {
  const r = t && t[e];
  return e === "MODE" ? r || 3 : r;
}
function jr(e, t) {
  const r = Jc("MODE", t), n = Jc(e, t);
  return r === 3 ? n === !0 : n !== !1;
}
function Oi(e, t, r, ...n) {
  return jr(e, t);
}
function fl(e) {
  throw e;
}
function ah(e) {
}
function Ae(e, t, r, n) {
  const i = `https://vuejs.org/error-reference/#compiler-${e}`, s = new SyntaxError(String(i));
  return s.code = e, s.loc = t, s;
}
const lt = (e) => e.type === 4 && e.isStatic;
function lh(e) {
  switch (e) {
    case "Teleport":
    case "teleport":
      return gi;
    case "Suspense":
    case "suspense":
      return za;
    case "KeepAlive":
    case "keep-alive":
      return Ms;
    case "BaseTransition":
    case "base-transition":
      return eh;
  }
}
const d0 = /^$|^\d|[^\$\w\xA0-\uFFFF]/, dl = (e) => !d0.test(e), ch = /[A-Za-z_$\xA0-\uFFFF]/, h0 = /[\.\?\w$\xA0-\uFFFF]/, p0 = /\s+[.[]\s*|\s*[.[]\s+/g, uh = (e) => e.type === 4 ? e.content : e.loc.source, m0 = (e) => {
  const t = uh(e).trim().replace(p0, (a) => a.trim());
  let r = 0, n = [], i = 0, s = 0, o = null;
  for (let a = 0; a < t.length; a++) {
    const l = t.charAt(a);
    switch (r) {
      case 0:
        if (l === "[")
          n.push(r), r = 1, i++;
        else if (l === "(")
          n.push(r), r = 2, s++;
        else if (!(a === 0 ? ch : h0).test(l))
          return !1;
        break;
      case 1:
        l === "'" || l === '"' || l === "`" ? (n.push(r), r = 3, o = l) : l === "[" ? i++ : l === "]" && (--i || (r = n.pop()));
        break;
      case 2:
        if (l === "'" || l === '"' || l === "`")
          n.push(r), r = 3, o = l;
        else if (l === "(")
          s++;
        else if (l === ")") {
          if (a === t.length - 1)
            return !1;
          --s || (r = n.pop());
        }
        break;
      case 3:
        l === o && (r = n.pop(), o = null);
        break;
    }
  }
  return !i && !s;
}, fh = m0, g0 = /^\s*(?:async\s*)?(?:\([^)]*?\)|[\w$_]+)\s*(?::[^=]+)?=>|^\s*(?:async\s+)?function(?:\s+[\w$]+)?\s*\(/, _0 = (e) => g0.test(uh(e)), y0 = _0;
function yt(e, t, r = !1) {
  for (let n = 0; n < e.props.length; n++) {
    const i = e.props[n];
    if (i.type === 7 && (r || i.exp) && (ae(t) ? i.name === t : t.test(i.name)))
      return i;
  }
}
function co(e, t, r = !1, n = !1) {
  for (let i = 0; i < e.props.length; i++) {
    const s = e.props[i];
    if (s.type === 6) {
      if (r) continue;
      if (s.name === t && (s.value || n))
        return s;
    } else if (s.name === "bind" && (s.exp || n) && Cr(s.arg, t))
      return s;
  }
}
function Cr(e, t) {
  return !!(e && lt(e) && e.content === t);
}
function b0(e) {
  return e.props.some(
    (t) => t.type === 7 && t.name === "bind" && (!t.arg || // v-bind="obj"
    t.arg.type !== 4 || // v-bind:[_ctx.foo]
    !t.arg.isStatic)
    // v-bind:[foo]
  );
}
function ko(e) {
  return e.type === 5 || e.type === 2;
}
function Zc(e) {
  return e.type === 7 && e.name === "pre";
}
function T0(e) {
  return e.type === 7 && e.name === "slot";
}
function js(e) {
  return e.type === 1 && e.tagType === 3;
}
function Fs(e) {
  return e.type === 1 && e.tagType === 2;
}
const S0 = /* @__PURE__ */ new Set([Ai, Vi]);
function dh(e, t = []) {
  if (e && !ae(e) && e.type === 14) {
    const r = e.callee;
    if (!ae(r) && S0.has(r))
      return dh(
        e.arguments[0],
        t.concat(e)
      );
  }
  return [e, t];
}
function Bs(e, t, r) {
  let n, i = e.type === 13 ? e.props : e.arguments[2], s = [], o;
  if (i && !ae(i) && i.type === 14) {
    const a = dh(i);
    i = a[0], s = a[1], o = s[s.length - 1];
  }
  if (i == null || ae(i))
    n = bt([t]);
  else if (i.type === 14) {
    const a = i.arguments[0];
    !ae(a) && a.type === 15 ? eu(t, a) || a.properties.unshift(t) : i.callee === al ? n = Ue(r.helper(Ds), [
      bt([t]),
      i
    ]) : i.arguments.unshift(bt([t])), !n && (n = i);
  } else i.type === 15 ? (eu(t, i) || i.properties.unshift(t), n = i) : (n = Ue(r.helper(Ds), [
    bt([t]),
    i
  ]), o && o.callee === Vi && (o = s[s.length - 2]));
  e.type === 13 ? o ? o.arguments[0] = n : e.props = n : o ? o.arguments[0] = n : e.arguments[2] = n;
}
function eu(e, t) {
  let r = !1;
  if (e.key.type === 4) {
    const n = e.key.content;
    r = t.properties.some(
      (i) => i.key.type === 4 && i.key.content === n
    );
  }
  return r;
}
function Pi(e, t) {
  return `_${t}_${e.replace(/[^\w]/g, (r, n) => r === "-" ? "_" : e.charCodeAt(n).toString())}`;
}
function v0(e) {
  return e.type === 14 && e.callee === cl ? e.arguments[1].returns : e;
}
const E0 = /([\s\S]*?)\s+(?:in|of)\s+(\S[\s\S]*)/;
function hh(e) {
  for (let t = 0; t < e.length; t++)
    if (!ft(e.charCodeAt(t)))
      return !1;
  return !0;
}
function hl(e) {
  return e.type === 2 && hh(e.content) || e.type === 12 && hl(e.content);
}
function ph(e) {
  return e.type === 3 || hl(e);
}
const mh = {
  parseMode: "base",
  ns: 0,
  delimiters: ["{{", "}}"],
  getNamespace: () => 0,
  isVoidTag: Yr,
  isPreTag: Yr,
  isIgnoreNewlineTag: Yr,
  isCustomElement: Yr,
  onError: fl,
  onWarn: ah,
  comments: !1,
  prefixIdentifiers: !1
};
let _e = mh, Mi = null, tr = "", ze = null, he = null, st = "", qt = -1, Nr = -1, pl = 0, mr = !1, la = null;
const Re = [], Oe = new f0(Re, {
  onerr: Vt,
  ontext(e, t) {
    is(He(e, t), e, t);
  },
  ontextentity(e, t, r) {
    is(e, t, r);
  },
  oninterpolation(e, t) {
    if (mr)
      return is(He(e, t), e, t);
    let r = e + Oe.delimiterOpen.length, n = t - Oe.delimiterClose.length;
    for (; ft(tr.charCodeAt(r)); )
      r++;
    for (; ft(tr.charCodeAt(n - 1)); )
      n--;
    let i = He(r, n);
    i.includes("&") && (i = _e.decodeEntities(i, !1)), ca({
      type: 5,
      content: cs(i, !1, Me(r, n)),
      loc: Me(e, t)
    });
  },
  onopentagname(e, t) {
    const r = He(e, t);
    ze = {
      type: 1,
      tag: r,
      ns: _e.getNamespace(r, Re[0], _e.ns),
      tagType: 0,
      // will be refined on tag close
      props: [],
      children: [],
      loc: Me(e - 1, t),
      codegenNode: void 0
    };
  },
  onopentagend(e) {
    ru(e);
  },
  onclosetag(e, t) {
    const r = He(e, t);
    if (!_e.isVoidTag(r)) {
      let n = !1;
      for (let i = 0; i < Re.length; i++)
        if (Re[i].tag.toLowerCase() === r.toLowerCase()) {
          n = !0, i > 0 && Vt(24, Re[0].loc.start.offset);
          for (let o = 0; o <= i; o++) {
            const a = Re.shift();
            ls(a, t, o < i);
          }
          break;
        }
      n || Vt(23, gh(e, 60));
    }
  },
  onselfclosingtag(e) {
    const t = ze.tag;
    ze.isSelfClosing = !0, ru(e), Re[0] && Re[0].tag === t && ls(Re.shift(), e);
  },
  onattribname(e, t) {
    he = {
      type: 6,
      name: He(e, t),
      nameLoc: Me(e, t),
      value: void 0,
      loc: Me(e)
    };
  },
  ondirname(e, t) {
    const r = He(e, t), n = r === "." || r === ":" ? "bind" : r === "@" ? "on" : r === "#" ? "slot" : r.slice(2);
    if (!mr && n === "" && Vt(26, e), mr || n === "")
      he = {
        type: 6,
        name: r,
        nameLoc: Me(e, t),
        value: void 0,
        loc: Me(e)
      };
    else if (he = {
      type: 7,
      name: n,
      rawName: r,
      exp: void 0,
      arg: void 0,
      modifiers: r === "." ? [ce("prop")] : [],
      loc: Me(e)
    }, n === "pre") {
      mr = Oe.inVPre = !0, la = ze;
      const i = ze.props;
      for (let s = 0; s < i.length; s++)
        i[s].type === 7 && (i[s] = M0(i[s]));
    }
  },
  ondirarg(e, t) {
    if (e === t) return;
    const r = He(e, t);
    if (mr && !Zc(he))
      he.name += r, Or(he.nameLoc, t);
    else {
      const n = r[0] !== "[";
      he.arg = cs(
        n ? r : r.slice(1, -1),
        n,
        Me(e, t),
        n ? 3 : 0
      );
    }
  },
  ondirmodifier(e, t) {
    const r = He(e, t);
    if (mr && !Zc(he))
      he.name += "." + r, Or(he.nameLoc, t);
    else if (he.name === "slot") {
      const n = he.arg;
      n && (n.content += "." + r, Or(n.loc, t));
    } else {
      const n = ce(r, !0, Me(e, t));
      he.modifiers.push(n);
    }
  },
  onattribdata(e, t) {
    st += He(e, t), qt < 0 && (qt = e), Nr = t;
  },
  onattribentity(e, t, r) {
    st += e, qt < 0 && (qt = t), Nr = r;
  },
  onattribnameend(e) {
    const t = he.loc.start.offset, r = He(t, e);
    he.type === 7 && (he.rawName = r), ze.props.some(
      (n) => (n.type === 7 ? n.rawName : n.name) === r
    ) && Vt(2, t);
  },
  onattribend(e, t) {
    if (ze && he) {
      if (Or(he.loc, t), e !== 0)
        if (st.includes("&") && (st = _e.decodeEntities(
          st,
          !0
        )), he.type === 6)
          he.name === "class" && (st = yh(st).trim()), e === 1 && !st && Vt(13, t), he.value = {
            type: 2,
            content: st,
            loc: e === 1 ? Me(qt, Nr) : Me(qt - 1, Nr + 1)
          }, Oe.inSFCRoot && ze.tag === "template" && he.name === "lang" && st && st !== "html" && Oe.enterRCDATA(ks("</template"), 0);
        else {
          let r = 0;
          he.exp = cs(
            st,
            !1,
            Me(qt, Nr),
            0,
            r
          ), he.name === "for" && (he.forParseResult = w0(he.exp));
          let n = -1;
          he.name === "bind" && (n = he.modifiers.findIndex(
            (i) => i.content === "sync"
          )) > -1 && Oi(
            "COMPILER_V_BIND_SYNC",
            _e,
            he.loc,
            he.arg.loc.source
          ) && (he.name = "model", he.modifiers.splice(n, 1));
        }
      (he.type !== 7 || he.name !== "pre") && ze.props.push(he);
    }
    st = "", qt = Nr = -1;
  },
  oncomment(e, t) {
    _e.comments && ca({
      type: 3,
      content: He(e, t),
      loc: Me(e - 4, t + 3)
    });
  },
  onend() {
    const e = tr.length;
    for (let t = 0; t < Re.length; t++)
      ls(Re[t], e - 1), Vt(24, Re[t].loc.start.offset);
  },
  oncdata(e, t) {
    (Re[0] ? Re[0].ns : _e.ns) !== 0 ? is(He(e, t), e, t) : Vt(1, e - 9);
  },
  onprocessinginstruction(e) {
    (Re[0] ? Re[0].ns : _e.ns) === 0 && Vt(
      21,
      e - 1
    );
  }
}), tu = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/, I0 = /^\(|\)$/g;
function w0(e) {
  const t = e.loc, r = e.content, n = r.match(E0);
  if (!n) return;
  const [, i, s] = n, o = (c, g, _ = !1) => {
    const S = t.start.offset + g, w = S + c.length;
    return cs(
      c,
      !1,
      Me(S, w),
      0,
      _ ? 1 : 0
      /* Normal */
    );
  }, a = {
    source: o(s.trim(), r.indexOf(s, i.length)),
    value: void 0,
    key: void 0,
    index: void 0,
    finalized: !1
  };
  let l = i.trim().replace(I0, "").trim();
  const d = i.indexOf(l), p = l.match(tu);
  if (p) {
    l = l.replace(tu, "").trim();
    const c = p[1].trim();
    let g;
    if (c && (g = r.indexOf(c, d + l.length), a.key = o(c, g, !0)), p[2]) {
      const _ = p[2].trim();
      _ && (a.index = o(
        _,
        r.indexOf(
          _,
          a.key ? g + c.length : d + l.length
        ),
        !0
      ));
    }
  }
  return l && (a.value = o(l, d, !0)), a;
}
function He(e, t) {
  return tr.slice(e, t);
}
function ru(e) {
  Oe.inSFCRoot && (ze.innerLoc = Me(e + 1, e + 1)), ca(ze);
  const { tag: t, ns: r } = ze;
  r === 0 && _e.isPreTag(t) && pl++, _e.isVoidTag(t) ? ls(ze, e) : (Re.unshift(ze), (r === 1 || r === 2) && (Oe.inXML = !0)), ze = null;
}
function is(e, t, r) {
  {
    const s = Re[0] && Re[0].tag;
    s !== "script" && s !== "style" && e.includes("&") && (e = _e.decodeEntities(e, !1));
  }
  const n = Re[0] || Mi, i = n.children[n.children.length - 1];
  i && i.type === 2 ? (i.content += e, Or(i.loc, r)) : n.children.push({
    type: 2,
    content: e,
    loc: Me(t, r)
  });
}
function ls(e, t, r = !1) {
  r ? Or(e.loc, gh(t, 60)) : Or(e.loc, x0(t, 62) + 1), Oe.inSFCRoot && (e.children.length ? e.innerLoc.end = fe({}, e.children[e.children.length - 1].loc.end) : e.innerLoc.end = fe({}, e.innerLoc.start), e.innerLoc.source = He(
    e.innerLoc.start.offset,
    e.innerLoc.end.offset
  ));
  const { tag: n, ns: i, children: s } = e;
  if (mr || (n === "slot" ? e.tagType = 2 : nu(e) ? e.tagType = 3 : R0(e) && (e.tagType = 1)), Oe.inRCDATA || (e.children = _h(s)), i === 0 && _e.isIgnoreNewlineTag(n)) {
    const o = s[0];
    o && o.type === 2 && (o.content = o.content.replace(/^\r?\n/, ""));
  }
  i === 0 && _e.isPreTag(n) && pl--, la === e && (mr = Oe.inVPre = !1, la = null), Oe.inXML && (Re[0] ? Re[0].ns : _e.ns) === 0 && (Oe.inXML = !1);
  {
    const o = e.props;
    if (!Oe.inSFCRoot && jr(
      "COMPILER_NATIVE_TEMPLATE",
      _e
    ) && e.tag === "template" && !nu(e)) {
      const l = Re[0] || Mi, d = l.children.indexOf(e);
      l.children.splice(d, 1, ...e.children);
    }
    const a = o.find(
      (l) => l.type === 6 && l.name === "inline-template"
    );
    a && Oi(
      "COMPILER_INLINE_TEMPLATE",
      _e,
      a.loc
    ) && e.children.length && (a.value = {
      type: 2,
      content: He(
        e.children[0].loc.start.offset,
        e.children[e.children.length - 1].loc.end.offset
      ),
      loc: a.loc
    });
  }
}
function x0(e, t) {
  let r = e;
  for (; tr.charCodeAt(r) !== t && r < tr.length - 1; ) r++;
  return r;
}
function gh(e, t) {
  let r = e;
  for (; tr.charCodeAt(r) !== t && r >= 0; ) r--;
  return r;
}
const N0 = /* @__PURE__ */ new Set(["if", "else", "else-if", "for", "slot"]);
function nu({ tag: e, props: t }) {
  if (e === "template") {
    for (let r = 0; r < t.length; r++)
      if (t[r].type === 7 && N0.has(t[r].name))
        return !0;
  }
  return !1;
}
function R0({ tag: e, props: t }) {
  if (_e.isCustomElement(e))
    return !1;
  if (e === "component" || A0(e.charCodeAt(0)) || lh(e) || _e.isBuiltInComponent && _e.isBuiltInComponent(e) || _e.isNativeTag && !_e.isNativeTag(e))
    return !0;
  for (let r = 0; r < t.length; r++) {
    const n = t[r];
    if (n.type === 6) {
      if (n.name === "is" && n.value) {
        if (n.value.content.startsWith("vue:"))
          return !0;
        if (Oi(
          "COMPILER_IS_ON_ELEMENT",
          _e,
          n.loc
        ))
          return !0;
      }
    } else if (
      // :is on plain element - only treat as component in compat mode
      n.name === "bind" && Cr(n.arg, "is") && Oi(
        "COMPILER_IS_ON_ELEMENT",
        _e,
        n.loc
      )
    )
      return !0;
  }
  return !1;
}
function A0(e) {
  return e > 64 && e < 91;
}
const C0 = /\r\n/g;
function _h(e) {
  const t = _e.whitespace !== "preserve";
  let r = !1;
  for (let n = 0; n < e.length; n++) {
    const i = e[n];
    if (i.type === 2)
      if (pl)
        i.content = i.content.replace(C0, `
`);
      else if (hh(i.content)) {
        const s = e[n - 1] && e[n - 1].type, o = e[n + 1] && e[n + 1].type;
        !s || !o || t && (s === 3 && (o === 3 || o === 1) || s === 1 && (o === 3 || o === 1 && O0(i.content))) ? (r = !0, e[n] = null) : i.content = " ";
      } else t && (i.content = yh(i.content));
  }
  return r ? e.filter(Boolean) : e;
}
function O0(e) {
  for (let t = 0; t < e.length; t++) {
    const r = e.charCodeAt(t);
    if (r === 10 || r === 13)
      return !0;
  }
  return !1;
}
function yh(e) {
  let t = "", r = !1;
  for (let n = 0; n < e.length; n++)
    ft(e.charCodeAt(n)) ? r || (t += " ", r = !0) : (t += e[n], r = !1);
  return t;
}
function ca(e) {
  (Re[0] || Mi).children.push(e);
}
function Me(e, t) {
  return {
    start: Oe.getPos(e),
    // @ts-expect-error allow late attachment
    end: t == null ? t : Oe.getPos(t),
    // @ts-expect-error allow late attachment
    source: t == null ? t : He(e, t)
  };
}
function P0(e) {
  return Me(e.start.offset, e.end.offset);
}
function Or(e, t) {
  e.end = Oe.getPos(t), e.source = He(e.start.offset, t);
}
function M0(e) {
  const t = {
    type: 6,
    name: e.rawName,
    nameLoc: Me(
      e.loc.start.offset,
      e.loc.start.offset + e.rawName.length
    ),
    value: void 0,
    loc: e.loc
  };
  if (e.exp) {
    const r = e.exp.loc;
    r.end.offset < e.loc.end.offset && (r.start.offset--, r.start.column--, r.end.offset++, r.end.column++), t.value = {
      type: 2,
      content: e.exp.content,
      loc: r
    };
  }
  return t;
}
function cs(e, t = !1, r, n = 0, i = 0) {
  return ce(e, t, r, n);
}
function Vt(e, t, r) {
  _e.onError(
    Ae(e, Me(t, t))
  );
}
function D0() {
  Oe.reset(), ze = null, he = null, st = "", qt = -1, Nr = -1, Re.length = 0;
}
function L0(e, t) {
  if (D0(), tr = e, _e = fe({}, mh), t) {
    let i;
    for (i in t)
      t[i] != null && (_e[i] = t[i]);
  }
  Oe.mode = _e.parseMode === "html" ? 1 : _e.parseMode === "sfc" ? 2 : 0, Oe.inXML = _e.ns === 1 || _e.ns === 2;
  const r = t && t.delimiters;
  r && (Oe.delimiterOpen = ks(r[0]), Oe.delimiterClose = ks(r[1]));
  const n = Mi = l0([], e);
  return Oe.parse(tr), n.loc = Me(0, e.length), n.children = _h(n.children), Mi = null, n;
}
function k0(e, t) {
  us(
    e,
    void 0,
    t,
    // Root node is unfortunately non-hoistable due to potential parent
    // fallthrough attributes.
    !!bh(e)
  );
}
function bh(e) {
  const t = e.children.filter((r) => r.type !== 3);
  return t.length === 1 && t[0].type === 1 && !Fs(t[0]) ? t[0] : null;
}
function us(e, t, r, n = !1, i = !1) {
  const { children: s } = e, o = [];
  for (let p = 0; p < s.length; p++) {
    const c = s[p];
    if (c.type === 1 && c.tagType === 0) {
      const g = n ? 0 : dt(c, r);
      if (g > 0) {
        if (g >= 2) {
          c.codegenNode.patchFlag = -1, o.push(c);
          continue;
        }
      } else {
        const _ = c.codegenNode;
        if (_.type === 13) {
          const S = _.patchFlag;
          if ((S === void 0 || S === 512 || S === 1) && Sh(c, r) >= 2) {
            const w = vh(c);
            w && (_.props = r.hoist(w));
          }
          _.dynamicProps && (_.dynamicProps = r.hoist(_.dynamicProps));
        }
      }
    } else if (c.type === 12 && (n ? 0 : dt(c, r)) >= 2) {
      c.codegenNode.type === 14 && c.codegenNode.arguments.length > 0 && c.codegenNode.arguments.push(
        "-1"
      ), o.push(c);
      continue;
    }
    if (c.type === 1) {
      const g = c.tagType === 1;
      g && r.scopes.vSlot++, us(c, e, r, !1, i), g && r.scopes.vSlot--;
    } else if (c.type === 11)
      us(c, e, r, c.children.length === 1, !0);
    else if (c.type === 9)
      for (let g = 0; g < c.branches.length; g++)
        us(
          c.branches[g],
          e,
          r,
          c.branches[g].children.length === 1,
          i
        );
  }
  let a = !1;
  if (o.length === s.length && e.type === 1) {
    if (e.tagType === 0 && e.codegenNode && e.codegenNode.type === 13 && Z(e.codegenNode.children))
      e.codegenNode.children = l(
        kr(e.codegenNode.children)
      ), a = !0;
    else if (e.tagType === 1 && e.codegenNode && e.codegenNode.type === 13 && e.codegenNode.children && !Z(e.codegenNode.children) && e.codegenNode.children.type === 15) {
      const p = d(e.codegenNode, "default");
      p && (p.returns = l(
        kr(p.returns)
      ), a = !0);
    } else if (e.tagType === 3 && t && t.type === 1 && t.tagType === 1 && t.codegenNode && t.codegenNode.type === 13 && t.codegenNode.children && !Z(t.codegenNode.children) && t.codegenNode.children.type === 15) {
      const p = yt(e, "slot", !0), c = p && p.arg && d(t.codegenNode, p.arg);
      c && (c.returns = l(
        kr(c.returns)
      ), a = !0);
    }
  }
  if (!a)
    for (const p of o)
      p.codegenNode = r.cache(p.codegenNode);
  function l(p) {
    const c = r.cache(p);
    return c.needArraySpread = !0, c;
  }
  function d(p, c) {
    if (p.children && !Z(p.children) && p.children.type === 15) {
      const g = p.children.properties.find(
        (_) => _.key === c || _.key.content === c
      );
      return g && g.value;
    }
  }
  o.length && r.transformHoist && r.transformHoist(s, r, e);
}
function dt(e, t) {
  const { constantCache: r } = t;
  switch (e.type) {
    case 1:
      if (e.tagType !== 0)
        return 0;
      const n = r.get(e);
      if (n !== void 0)
        return n;
      const i = e.codegenNode;
      if (i.type !== 13 || i.isBlock && e.tag !== "svg" && e.tag !== "foreignObject" && e.tag !== "math")
        return 0;
      if (i.patchFlag === void 0) {
        let o = 3;
        const a = Sh(e, t);
        if (a === 0)
          return r.set(e, 0), 0;
        a < o && (o = a);
        for (let l = 0; l < e.children.length; l++) {
          const d = dt(e.children[l], t);
          if (d === 0)
            return r.set(e, 0), 0;
          d < o && (o = d);
        }
        if (o > 1)
          for (let l = 0; l < e.props.length; l++) {
            const d = e.props[l];
            if (d.type === 7 && d.name === "bind" && d.exp) {
              const p = dt(d.exp, t);
              if (p === 0)
                return r.set(e, 0), 0;
              p < o && (o = p);
            }
          }
        if (i.isBlock) {
          for (let l = 0; l < e.props.length; l++)
            if (e.props[l].type === 7)
              return r.set(e, 0), 0;
          t.removeHelper(Ur), t.removeHelper(
            mn(t.inSSR, i.isComponent)
          ), i.isBlock = !1, t.helper(pn(t.inSSR, i.isComponent));
        }
        return r.set(e, o), o;
      } else
        return r.set(e, 0), 0;
    case 2:
    case 3:
      return 3;
    case 9:
    case 11:
    case 10:
      return 0;
    case 5:
    case 12:
      return dt(e.content, t);
    case 4:
      return e.constType;
    case 8:
      let s = 3;
      for (let o = 0; o < e.children.length; o++) {
        const a = e.children[o];
        if (ae(a) || Ze(a))
          continue;
        const l = dt(a, t);
        if (l === 0)
          return 0;
        l < s && (s = l);
      }
      return s;
    case 20:
      return 2;
    default:
      return 0;
  }
}
const j0 = /* @__PURE__ */ new Set([
  sl,
  ol,
  Ai,
  Vi
]);
function Th(e, t) {
  if (e.type === 14 && !ae(e.callee) && j0.has(e.callee)) {
    const r = e.arguments[0];
    if (r.type === 4)
      return dt(r, t);
    if (r.type === 14)
      return Th(r, t);
  }
  return 0;
}
function Sh(e, t) {
  let r = 3;
  const n = vh(e);
  if (n && n.type === 15) {
    const { properties: i } = n;
    for (let s = 0; s < i.length; s++) {
      const { key: o, value: a } = i[s], l = dt(o, t);
      if (l === 0)
        return l;
      l < r && (r = l);
      let d;
      if (a.type === 4 ? d = dt(a, t) : a.type === 14 ? d = Th(a, t) : d = 0, d === 0)
        return d;
      d < r && (r = d);
    }
  }
  return r;
}
function vh(e) {
  const t = e.codegenNode;
  if (t.type === 13)
    return t.props;
}
function F0(e, {
  filename: t = "",
  prefixIdentifiers: r = !1,
  hoistStatic: n = !1,
  hmr: i = !1,
  cacheHandlers: s = !1,
  nodeTransforms: o = [],
  directiveTransforms: a = {},
  transformHoist: l = null,
  isBuiltInComponent: d = Qe,
  isCustomElement: p = Qe,
  expressionPlugins: c = [],
  scopeId: g = null,
  slotted: _ = !0,
  ssr: S = !1,
  inSSR: w = !1,
  ssrCssVars: L = "",
  bindingMetadata: j = de,
  inline: R = !1,
  isTS: x = !1,
  onError: T = fl,
  onWarn: v = ah,
  compatConfig: C
}) {
  const D = t.replace(/\?.*$/, "").match(/([^/\\]+)\.\w+$/), F = {
    // options
    filename: t,
    selfName: D && Qr(we(D[1])),
    prefixIdentifiers: r,
    hoistStatic: n,
    hmr: i,
    cacheHandlers: s,
    nodeTransforms: o,
    directiveTransforms: a,
    transformHoist: l,
    isBuiltInComponent: d,
    isCustomElement: p,
    expressionPlugins: c,
    scopeId: g,
    slotted: _,
    ssr: S,
    inSSR: w,
    ssrCssVars: L,
    bindingMetadata: j,
    inline: R,
    isTS: x,
    onError: T,
    onWarn: v,
    compatConfig: C,
    // state
    root: e,
    helpers: /* @__PURE__ */ new Map(),
    components: /* @__PURE__ */ new Set(),
    directives: /* @__PURE__ */ new Set(),
    hoists: [],
    imports: [],
    cached: [],
    constantCache: /* @__PURE__ */ new WeakMap(),
    vForMemoKeyedNodes: /* @__PURE__ */ new WeakSet(),
    temps: 0,
    identifiers: /* @__PURE__ */ Object.create(null),
    scopes: {
      vFor: 0,
      vSlot: 0,
      vPre: 0,
      vOnce: 0
    },
    parent: null,
    grandParent: null,
    currentNode: e,
    childIndex: 0,
    inVOnce: !1,
    // methods
    helper(y) {
      const E = F.helpers.get(y) || 0;
      return F.helpers.set(y, E + 1), y;
    },
    removeHelper(y) {
      const E = F.helpers.get(y);
      if (E) {
        const O = E - 1;
        O ? F.helpers.set(y, O) : F.helpers.delete(y);
      }
    },
    helperString(y) {
      return `_${dn[F.helper(y)]}`;
    },
    replaceNode(y) {
      F.parent.children[F.childIndex] = F.currentNode = y;
    },
    removeNode(y) {
      const E = F.parent.children, O = y ? E.indexOf(y) : F.currentNode ? F.childIndex : -1;
      !y || y === F.currentNode ? (F.currentNode = null, F.onNodeRemoved()) : F.childIndex > O && (F.childIndex--, F.onNodeRemoved()), F.parent.children.splice(O, 1);
    },
    onNodeRemoved: Qe,
    addIdentifiers(y) {
    },
    removeIdentifiers(y) {
    },
    hoist(y) {
      ae(y) && (y = ce(y)), F.hoists.push(y);
      const E = ce(
        `_hoisted_${F.hoists.length}`,
        !1,
        y.loc,
        2
      );
      return E.hoisted = y, E;
    },
    cache(y, E = !1, O = !1) {
      const A = c0(
        F.cached.length,
        y,
        E,
        O
      );
      return F.cached.push(A), A;
    }
  };
  return F.filters = /* @__PURE__ */ new Set(), F;
}
function B0(e, t) {
  const r = F0(e, t);
  uo(e, r), t.hoistStatic && k0(e, r), t.ssr || U0(e, r), e.helpers = /* @__PURE__ */ new Set([...r.helpers.keys()]), e.components = [...r.components], e.directives = [...r.directives], e.imports = r.imports, e.hoists = r.hoists, e.temps = r.temps, e.cached = r.cached, e.transformed = !0, e.filters = [...r.filters];
}
function U0(e, t) {
  const { helper: r } = t, { children: n } = e;
  if (n.length === 1) {
    const i = bh(e);
    if (i && i.codegenNode) {
      const s = i.codegenNode;
      s.type === 13 && ul(s, t), e.codegenNode = s;
    } else
      e.codegenNode = n[0];
  } else if (n.length > 1) {
    let i = 64;
    e.codegenNode = Ci(
      t,
      r(Ri),
      void 0,
      e.children,
      i,
      void 0,
      void 0,
      !0,
      void 0,
      !1
    );
  }
}
function $0(e, t) {
  let r = 0;
  const n = () => {
    r--;
  };
  for (; r < e.children.length; r++) {
    const i = e.children[r];
    ae(i) || (t.grandParent = t.parent, t.parent = e, t.childIndex = r, t.onNodeRemoved = n, uo(i, t));
  }
}
function uo(e, t) {
  t.currentNode = e;
  const { nodeTransforms: r } = t, n = [];
  for (let s = 0; s < r.length; s++) {
    const o = r[s](e, t);
    if (o && (Z(o) ? n.push(...o) : n.push(o)), t.currentNode)
      e = t.currentNode;
    else
      return;
  }
  switch (e.type) {
    case 3:
      t.ssr || t.helper($i);
      break;
    case 5:
      t.ssr || t.helper(lo);
      break;
    // for container types, further traverse downwards
    case 9:
      for (let s = 0; s < e.branches.length; s++)
        uo(e.branches[s], t);
      break;
    case 10:
    case 11:
    case 1:
    case 0:
      $0(e, t);
      break;
  }
  t.currentNode = e;
  let i = n.length;
  for (; i--; )
    n[i]();
}
function Eh(e, t) {
  const r = ae(e) ? (n) => n === e : (n) => e.test(n);
  return (n, i) => {
    if (n.type === 1) {
      const { props: s } = n;
      if (n.tagType === 3 && s.some(T0))
        return;
      const o = [];
      for (let a = 0; a < s.length; a++) {
        const l = s[a];
        if (l.type === 7 && r(l.name)) {
          s.splice(a, 1), a--;
          const d = t(n, l, i);
          d && o.push(d);
        }
      }
      return o;
    }
  };
}
const fo = "/*@__PURE__*/", Ih = (e) => `${dn[e]}: _${dn[e]}`;
function V0(e, {
  mode: t = "function",
  prefixIdentifiers: r = t === "module",
  sourceMap: n = !1,
  filename: i = "template.vue.html",
  scopeId: s = null,
  optimizeImports: o = !1,
  runtimeGlobalName: a = "Vue",
  runtimeModuleName: l = "vue",
  ssrRuntimeModuleName: d = "vue/server-renderer",
  ssr: p = !1,
  isTS: c = !1,
  inSSR: g = !1
}) {
  const _ = {
    mode: t,
    prefixIdentifiers: r,
    sourceMap: n,
    filename: i,
    scopeId: s,
    optimizeImports: o,
    runtimeGlobalName: a,
    runtimeModuleName: l,
    ssrRuntimeModuleName: d,
    ssr: p,
    isTS: c,
    inSSR: g,
    source: e.source,
    code: "",
    column: 1,
    line: 1,
    offset: 0,
    indentLevel: 0,
    pure: !1,
    map: void 0,
    helper(w) {
      return `_${dn[w]}`;
    },
    push(w, L = -2, j) {
      _.code += w;
    },
    indent() {
      S(++_.indentLevel);
    },
    deindent(w = !1) {
      w ? --_.indentLevel : S(--_.indentLevel);
    },
    newline() {
      S(_.indentLevel);
    }
  };
  function S(w) {
    _.push(
      `
` + "  ".repeat(w),
      0
      /* Start */
    );
  }
  return _;
}
function Q0(e, t = {}) {
  const r = V0(e, t);
  t.onContextCreated && t.onContextCreated(r);
  const {
    mode: n,
    push: i,
    prefixIdentifiers: s,
    indent: o,
    deindent: a,
    newline: l,
    scopeId: d,
    ssr: p
  } = r, c = Array.from(e.helpers), g = c.length > 0, _ = !s && n !== "module";
  H0(e, r);
  const w = p ? "ssrRender" : "render", j = (p ? ["_ctx", "_push", "_parent", "_attrs"] : ["_ctx", "_cache"]).join(", ");
  if (i(`function ${w}(${j}) {`), o(), _ && (i("with (_ctx) {"), o(), g && (i(
    `const { ${c.map(Ih).join(", ")} } = _Vue
`,
    -1
    /* End */
  ), l())), e.components.length && (jo(e.components, "component", r), (e.directives.length || e.temps > 0) && l()), e.directives.length && (jo(e.directives, "directive", r), e.temps > 0 && l()), e.filters && e.filters.length && (l(), jo(e.filters, "filter", r), l()), e.temps > 0) {
    i("let ");
    for (let R = 0; R < e.temps; R++)
      i(`${R > 0 ? ", " : ""}_temp${R}`);
  }
  return (e.components.length || e.directives.length || e.temps) && (i(
    `
`,
    0
    /* Start */
  ), l()), p || i("return "), e.codegenNode ? Je(e.codegenNode, r) : i("null"), _ && (a(), i("}")), a(), i("}"), {
    ast: e,
    code: r.code,
    preamble: "",
    map: r.map ? r.map.toJSON() : void 0
  };
}
function H0(e, t) {
  const {
    ssr: r,
    prefixIdentifiers: n,
    push: i,
    newline: s,
    runtimeModuleName: o,
    runtimeGlobalName: a,
    ssrRuntimeModuleName: l
  } = t, d = a, p = Array.from(e.helpers);
  if (p.length > 0 && (i(
    `const _Vue = ${d}
`,
    -1
    /* End */
  ), e.hoists.length)) {
    const c = [
      Ya,
      Xa,
      $i,
      Ja,
      nh
    ].filter((g) => p.includes(g)).map(Ih).join(", ");
    i(
      `const { ${c} } = _Vue
`,
      -1
      /* End */
    );
  }
  q0(e.hoists, t), s(), i("return ");
}
function jo(e, t, { helper: r, push: n, newline: i, isTS: s }) {
  const o = r(
    t === "filter" ? rl : t === "component" ? Za : tl
  );
  for (let a = 0; a < e.length; a++) {
    let l = e[a];
    const d = l.endsWith("__self");
    d && (l = l.slice(0, -6)), n(
      `const ${Pi(l, t)} = ${o}(${JSON.stringify(l)}${d ? ", true" : ""})${s ? "!" : ""}`
    ), a < e.length - 1 && i();
  }
}
function q0(e, t) {
  if (!e.length)
    return;
  t.pure = !0;
  const { push: r, newline: n } = t;
  n();
  for (let i = 0; i < e.length; i++) {
    const s = e[i];
    s && (r(`const _hoisted_${i + 1} = `), Je(s, t), n());
  }
  t.pure = !1;
}
function ml(e, t) {
  const r = e.length > 3 || !1;
  t.push("["), r && t.indent(), Qi(e, t, r), r && t.deindent(), t.push("]");
}
function Qi(e, t, r = !1, n = !0) {
  const { push: i, newline: s } = t;
  for (let o = 0; o < e.length; o++) {
    const a = e[o];
    ae(a) ? i(
      a,
      -3
      /* Unknown */
    ) : Z(a) ? ml(a, t) : Je(a, t), o < e.length - 1 && (r ? (n && i(","), s()) : n && i(", "));
  }
}
function Je(e, t) {
  if (ae(e)) {
    t.push(
      e,
      -3
      /* Unknown */
    );
    return;
  }
  if (Ze(e)) {
    t.push(t.helper(e));
    return;
  }
  switch (e.type) {
    case 1:
    case 9:
    case 11:
      Je(e.codegenNode, t);
      break;
    case 2:
      K0(e, t);
      break;
    case 4:
      wh(e, t);
      break;
    case 5:
      W0(e, t);
      break;
    case 12:
      Je(e.codegenNode, t);
      break;
    case 8:
      xh(e, t);
      break;
    case 3:
      z0(e, t);
      break;
    case 13:
      Y0(e, t);
      break;
    case 14:
      J0(e, t);
      break;
    case 15:
      Z0(e, t);
      break;
    case 17:
      eb(e, t);
      break;
    case 18:
      tb(e, t);
      break;
    case 19:
      rb(e, t);
      break;
    case 20:
      nb(e, t);
      break;
    case 21:
      Qi(e.body, t, !0, !1);
      break;
  }
}
function K0(e, t) {
  t.push(JSON.stringify(e.content), -3, e);
}
function wh(e, t) {
  const { content: r, isStatic: n } = e;
  t.push(
    n ? JSON.stringify(r) : r,
    -3,
    e
  );
}
function W0(e, t) {
  const { push: r, helper: n, pure: i } = t;
  i && r(fo), r(`${n(lo)}(`), Je(e.content, t), r(")");
}
function xh(e, t) {
  for (let r = 0; r < e.children.length; r++) {
    const n = e.children[r];
    ae(n) ? t.push(
      n,
      -3
      /* Unknown */
    ) : Je(n, t);
  }
}
function G0(e, t) {
  const { push: r } = t;
  if (e.type === 8)
    r("["), xh(e, t), r("]");
  else if (e.isStatic) {
    const n = dl(e.content) ? e.content : JSON.stringify(e.content);
    r(n, -2, e);
  } else
    r(`[${e.content}]`, -3, e);
}
function z0(e, t) {
  const { push: r, helper: n, pure: i } = t;
  i && r(fo), r(
    `${n($i)}(${JSON.stringify(e.content)})`,
    -3,
    e
  );
}
function Y0(e, t) {
  const { push: r, helper: n, pure: i } = t, {
    tag: s,
    props: o,
    children: a,
    patchFlag: l,
    dynamicProps: d,
    directives: p,
    isBlock: c,
    disableTracking: g,
    isComponent: _
  } = e;
  let S;
  l && (S = String(l)), p && r(n(nl) + "("), c && r(`(${n(Ur)}(${g ? "true" : ""}), `), i && r(fo);
  const w = c ? mn(t.inSSR, _) : pn(t.inSSR, _);
  r(n(w) + "(", -2, e), Qi(
    X0([s, o, a, S, d]),
    t
  ), r(")"), c && r(")"), p && (r(", "), Je(p, t), r(")"));
}
function X0(e) {
  let t = e.length;
  for (; t-- && e[t] == null; )
    ;
  return e.slice(0, t + 1).map((r) => r || "null");
}
function J0(e, t) {
  const { push: r, helper: n, pure: i } = t, s = ae(e.callee) ? e.callee : n(e.callee);
  i && r(fo), r(s + "(", -2, e), Qi(e.arguments, t), r(")");
}
function Z0(e, t) {
  const { push: r, indent: n, deindent: i, newline: s } = t, { properties: o } = e;
  if (!o.length) {
    r("{}", -2, e);
    return;
  }
  const a = o.length > 1 || !1;
  r(a ? "{" : "{ "), a && n();
  for (let l = 0; l < o.length; l++) {
    const { key: d, value: p } = o[l];
    G0(d, t), r(": "), Je(p, t), l < o.length - 1 && (r(","), s());
  }
  a && i(), r(a ? "}" : " }");
}
function eb(e, t) {
  ml(e.elements, t);
}
function tb(e, t) {
  const { push: r, indent: n, deindent: i } = t, { params: s, returns: o, body: a, newline: l, isSlot: d } = e;
  d && r(`_${dn[ll]}(`), r("(", -2, e), Z(s) ? Qi(s, t) : s && Je(s, t), r(") => "), (l || a) && (r("{"), n()), o ? (l && r("return "), Z(o) ? ml(o, t) : Je(o, t)) : a && Je(a, t), (l || a) && (i(), r("}")), d && (e.isNonScopedSlot && r(", undefined, true"), r(")"));
}
function rb(e, t) {
  const { test: r, consequent: n, alternate: i, newline: s } = e, { push: o, indent: a, deindent: l, newline: d } = t;
  if (r.type === 4) {
    const c = !dl(r.content);
    c && o("("), wh(r, t), c && o(")");
  } else
    o("("), Je(r, t), o(")");
  s && a(), t.indentLevel++, s || o(" "), o("? "), Je(n, t), t.indentLevel--, s && d(), s || o(" "), o(": ");
  const p = i.type === 19;
  p || t.indentLevel++, Je(i, t), p || t.indentLevel--, s && l(
    !0
    /* without newline */
  );
}
function nb(e, t) {
  const { push: r, helper: n, indent: i, deindent: s, newline: o } = t, { needPauseTracking: a, needArraySpread: l } = e;
  l && r("[...("), r(`_cache[${e.index}] || (`), a && (i(), r(`${n(Ls)}(-1`), e.inVOnce && r(", true"), r("),"), o(), r("(")), r(`_cache[${e.index}] = `), Je(e.value, t), a && (r(`).cacheIndex = ${e.index},`), o(), r(`${n(Ls)}(1),`), o(), r(`_cache[${e.index}]`), s()), r(")"), l && r(")]");
}
new RegExp(
  "\\b" + "arguments,await,break,case,catch,class,const,continue,debugger,default,delete,do,else,export,extends,finally,for,function,if,import,let,new,return,super,switch,throw,try,var,void,while,with,yield".split(",").join("\\b|\\b") + "\\b"
);
const ib = Eh(
  /^(?:if|else|else-if)$/,
  (e, t, r) => sb(e, t, r, (n, i, s) => {
    const o = r.parent.children;
    let a = o.indexOf(n), l = 0;
    for (; a-- >= 0; ) {
      const d = o[a];
      d && d.type === 9 && (l += d.branches.length);
    }
    return () => {
      if (s)
        n.codegenNode = su(
          i,
          l,
          r
        );
      else {
        const d = ob(n.codegenNode);
        d.alternate = su(
          i,
          l + n.branches.length - 1,
          r
        );
      }
    };
  })
);
function sb(e, t, r, n) {
  if (t.name !== "else" && (!t.exp || !t.exp.content.trim())) {
    const i = t.exp ? t.exp.loc : e.loc;
    r.onError(
      Ae(28, t.loc)
    ), t.exp = ce("true", !1, i);
  }
  if (t.name === "if") {
    const i = iu(e, t), s = {
      type: 9,
      loc: P0(e.loc),
      branches: [i]
    };
    if (r.replaceNode(s), n)
      return n(s, i, !0);
  } else {
    const i = r.parent.children;
    let s = i.indexOf(e);
    for (; s-- >= -1; ) {
      const o = i[s];
      if (o && ph(o)) {
        r.removeNode(o);
        continue;
      }
      if (o && o.type === 9) {
        (t.name === "else-if" || t.name === "else") && o.branches[o.branches.length - 1].condition === void 0 && r.onError(
          Ae(30, e.loc)
        ), r.removeNode();
        const a = iu(e, t);
        o.branches.push(a);
        const l = n && n(o, a, !1);
        uo(a, r), l && l(), r.currentNode = null;
      } else
        r.onError(
          Ae(30, e.loc)
        );
      break;
    }
  }
}
function iu(e, t) {
  const r = e.tagType === 3;
  return {
    type: 10,
    loc: e.loc,
    condition: t.name === "else" ? void 0 : t.exp,
    children: r && !yt(e, "for") ? e.children : [e],
    userKey: co(e, "key"),
    isTemplateIf: r
  };
}
function su(e, t, r) {
  return e.condition ? aa(
    e.condition,
    ou(e, t, r),
    // make sure to pass in asBlock: true so that the comment node call
    // closes the current block.
    Ue(r.helper($i), [
      '""',
      "true"
    ])
  ) : ou(e, t, r);
}
function ou(e, t, r) {
  const { helper: n } = r, i = Fe(
    "key",
    ce(
      `${t}`,
      !1,
      pt,
      2
    )
  ), { children: s } = e, o = s[0];
  if (s.length !== 1 || o.type !== 1)
    if (s.length === 1 && o.type === 11) {
      const l = o.codegenNode;
      return Bs(l, i, r), l;
    } else
      return Ci(
        r,
        n(Ri),
        bt([i]),
        s,
        64,
        void 0,
        void 0,
        !0,
        !1,
        !1,
        e.loc
      );
  else {
    const l = o.codegenNode, d = v0(l);
    return d.type === 13 && ul(d, r), Bs(d, i, r), l;
  }
}
function ob(e) {
  for (; ; )
    if (e.type === 19)
      if (e.alternate.type === 19)
        e = e.alternate;
      else
        return e;
    else e.type === 20 && (e = e.value);
}
const ab = Eh(
  "for",
  (e, t, r) => {
    const { helper: n, removeHelper: i } = r;
    return lb(e, t, r, (s) => {
      const o = Ue(n(il), [
        s.source
      ]), a = js(e), l = yt(e, "memo"), d = co(e, "key", !1, !0);
      d && d.type;
      let p = d && (d.type === 6 ? d.value ? ce(d.value.content, !0) : void 0 : d.exp);
      const c = p ? Fe("key", p) : null, g = s.source.type === 4 && s.source.constType > 0, _ = g ? 64 : d ? 128 : 256;
      return s.codegenNode = Ci(
        r,
        n(Ri),
        void 0,
        o,
        _,
        void 0,
        void 0,
        !0,
        !g,
        !1,
        e.loc
      ), () => {
        let S;
        const { children: w } = s, L = w.length !== 1 || w[0].type !== 1, j = Fs(e) ? e : a && e.children.length === 1 && Fs(e.children[0]) ? e.children[0] : null;
        if (j ? (S = j.codegenNode, a && c && Bs(S, c, r)) : L ? S = Ci(
          r,
          n(Ri),
          c ? bt([c]) : void 0,
          e.children,
          64,
          void 0,
          void 0,
          !0,
          void 0,
          !1
        ) : (S = w[0].codegenNode, a && c && Bs(S, c, r), S.isBlock !== !g && (S.isBlock ? (i(Ur), i(
          mn(r.inSSR, S.isComponent)
        )) : i(
          pn(r.inSSR, S.isComponent)
        )), S.isBlock = !g, S.isBlock ? (n(Ur), n(mn(r.inSSR, S.isComponent))) : n(pn(r.inSSR, S.isComponent))), l) {
          const R = hn(
            ua(s.parseResult, [
              ce("_cached")
            ])
          );
          R.body = u0([
            Nt(["const _memo = (", l.exp, ")"]),
            Nt([
              "if (_cached && _cached.el",
              ...p ? [" && _cached.key === ", p] : [],
              ` && ${r.helperString(
                oh
              )}(_cached, _memo)) return _cached`
            ]),
            Nt(["const _item = ", S]),
            ce("_item.memo = _memo"),
            ce("return _item")
          ]), o.arguments.push(
            R,
            ce("_cache"),
            ce(String(r.cached.length))
          ), r.cached.push(null);
        } else
          o.arguments.push(
            hn(
              ua(s.parseResult),
              S,
              !0
            )
          );
      };
    });
  }
);
function lb(e, t, r, n) {
  if (!t.exp) {
    r.onError(
      Ae(31, t.loc)
    );
    return;
  }
  const i = t.forParseResult;
  if (!i) {
    r.onError(
      Ae(32, t.loc)
    );
    return;
  }
  Nh(i);
  const { addIdentifiers: s, removeIdentifiers: o, scopes: a } = r, { source: l, value: d, key: p, index: c } = i, g = {
    type: 11,
    loc: t.loc,
    source: l,
    valueAlias: d,
    keyAlias: p,
    objectIndexAlias: c,
    parseResult: i,
    children: js(e) ? e.children : [e]
  };
  r.replaceNode(g), a.vFor++;
  const _ = n && n(g);
  return () => {
    a.vFor--, _ && _();
  };
}
function Nh(e, t) {
  e.finalized || (e.finalized = !0);
}
function ua({ value: e, key: t, index: r }, n = []) {
  return cb([e, t, r, ...n]);
}
function cb(e) {
  let t = e.length;
  for (; t-- && !e[t]; )
    ;
  return e.slice(0, t + 1).map((r, n) => r || ce("_".repeat(n + 1), !1));
}
const au = ce("undefined", !1), ub = (e, t) => {
  if (e.type === 1 && (e.tagType === 1 || e.tagType === 3)) {
    const r = yt(e, "slot");
    if (r)
      return r.exp, t.scopes.vSlot++, () => {
        t.scopes.vSlot--;
      };
  }
}, fb = (e, t, r, n) => hn(
  e,
  r,
  !1,
  !0,
  r.length ? r[0].loc : n
);
function db(e, t, r = fb) {
  t.helper(ll);
  const { children: n, loc: i } = e, s = [], o = [];
  let a = t.scopes.vSlot > 0 || t.scopes.vFor > 0;
  const l = yt(e, "slot", !0);
  if (l) {
    const { arg: L, exp: j } = l;
    L && !lt(L) && (a = !0), s.push(
      Fe(
        L || ce("default", !0),
        r(j, void 0, n, i)
      )
    );
  }
  let d = !1, p = !1;
  const c = [], g = /* @__PURE__ */ new Set();
  let _ = 0;
  for (let L = 0; L < n.length; L++) {
    const j = n[L];
    let R;
    if (!js(j) || !(R = yt(j, "slot", !0))) {
      j.type !== 3 && c.push(j);
      continue;
    }
    if (l) {
      t.onError(
        Ae(37, R.loc)
      );
      break;
    }
    d = !0;
    const { children: x, loc: T } = j, {
      arg: v = ce("default", !0),
      exp: C,
      loc: D
    } = R;
    let F;
    lt(v) ? F = v ? v.content : "default" : a = !0;
    const y = yt(j, "for"), E = r(C, y, x, T);
    let O, A;
    if (O = yt(j, "if"))
      a = !0, o.push(
        aa(
          O.exp,
          ss(v, E, _++),
          au
        )
      );
    else if (A = yt(
      j,
      /^else(?:-if)?$/,
      !0
      /* allowEmpty */
    )) {
      let $ = L, Y;
      for (; $-- && (Y = n[$], !!ph(Y)); )
        ;
      if (Y && js(Y) && yt(Y, /^(?:else-)?if$/)) {
        let X = o[o.length - 1];
        for (; X.alternate.type === 19; )
          X = X.alternate;
        X.alternate = A.exp ? aa(
          A.exp,
          ss(
            v,
            E,
            _++
          ),
          au
        ) : ss(v, E, _++);
      } else
        t.onError(
          Ae(30, A.loc)
        );
    } else if (y) {
      a = !0;
      const $ = y.forParseResult;
      $ ? (Nh($), o.push(
        Ue(t.helper(il), [
          $.source,
          hn(
            ua($),
            ss(v, E),
            !0
          )
        ])
      )) : t.onError(
        Ae(
          32,
          y.loc
        )
      );
    } else {
      if (F) {
        if (g.has(F)) {
          t.onError(
            Ae(
              38,
              D
            )
          );
          continue;
        }
        g.add(F), F === "default" && (p = !0);
      }
      s.push(Fe(v, E));
    }
  }
  if (!l) {
    const L = (j, R) => {
      const x = r(j, void 0, R, i);
      return t.compatConfig && (x.isNonScopedSlot = !0), Fe("default", x);
    };
    d ? c.length && // #3766
    // with whitespace: 'preserve', whitespaces between slots will end up in
    // implicitDefaultChildren. Ignore if all implicit children are whitespaces.
    !c.every(hl) && (p ? t.onError(
      Ae(
        39,
        c[0].loc
      )
    ) : s.push(
      L(void 0, c)
    )) : s.push(L(void 0, n));
  }
  const S = a ? 2 : fs(e.children) ? 3 : 1;
  let w = bt(
    s.concat(
      Fe(
        "_",
        // 2 = compiled but dynamic = can skip normalization, but must run diff
        // 1 = compiled and static = can skip normalization AND diff as optimized
        ce(
          S + "",
          !1
        )
      )
    ),
    i
  );
  return o.length && (w = Ue(t.helper(sh), [
    w,
    kr(o)
  ])), {
    slots: w,
    hasDynamicSlots: a
  };
}
function ss(e, t, r) {
  const n = [
    Fe("name", e),
    Fe("fn", t)
  ];
  return r != null && n.push(
    Fe("key", ce(String(r), !0))
  ), bt(n);
}
function fs(e) {
  for (let t = 0; t < e.length; t++) {
    const r = e[t];
    switch (r.type) {
      case 1:
        if (r.tagType === 2 || fs(r.children))
          return !0;
        break;
      case 9:
        if (fs(r.branches)) return !0;
        break;
      case 10:
      case 11:
        if (fs(r.children)) return !0;
        break;
    }
  }
  return !1;
}
const Rh = /* @__PURE__ */ new WeakMap(), hb = (e, t) => function() {
  if (e = t.currentNode, !(e.type === 1 && (e.tagType === 0 || e.tagType === 1)))
    return;
  const { tag: n, props: i } = e, s = e.tagType === 1;
  let o = s ? pb(e, t) : `"${n}"`;
  const a = ye(o) && o.callee === el;
  let l, d, p = 0, c, g, _, S = (
    // dynamic component may resolve to plain elements
    a || o === gi || o === za || !s && // <svg> and <foreignObject> must be forced into blocks so that block
    // updates inside get proper isSVG flag at runtime. (#639, #643)
    // This is technically web-specific, but splitting the logic out of core
    // leads to too much unnecessary complexity.
    (n === "svg" || n === "foreignObject" || n === "math")
  );
  if (i.length > 0) {
    const w = Ah(
      e,
      t,
      void 0,
      s,
      a
    );
    l = w.props, p = w.patchFlag, g = w.dynamicPropNames;
    const L = w.directives;
    _ = L && L.length ? kr(
      L.map((j) => gb(j, t))
    ) : void 0, w.shouldUseBlock && (S = !0);
  }
  if (e.children.length > 0)
    if (o === Ms && (S = !0, p |= 1024), s && // Teleport is not a real component and has dedicated runtime handling
    o !== gi && // explained above.
    o !== Ms) {
      const { slots: L, hasDynamicSlots: j } = db(e, t);
      d = L, j && (p |= 1024);
    } else if (e.children.length === 1 && o !== gi) {
      const L = e.children[0], j = L.type, R = j === 5 || j === 8;
      R && dt(L, t) === 0 && (p |= 1), R || j === 2 ? d = L : d = e.children;
    } else
      d = e.children;
  g && g.length && (c = _b(g)), e.codegenNode = Ci(
    t,
    o,
    l,
    d,
    p === 0 ? void 0 : p,
    c,
    _,
    !!S,
    !1,
    s,
    e.loc
  );
};
function pb(e, t, r = !1) {
  let { tag: n } = e;
  const i = fa(n), s = co(
    e,
    "is",
    !1,
    !0
    /* allow empty */
  );
  if (s)
    if (i || jr(
      "COMPILER_IS_ON_ELEMENT",
      t
    )) {
      let a;
      if (s.type === 6 ? a = s.value && ce(s.value.content, !0) : (a = s.exp, a || (a = ce("is", !1, s.arg.loc))), a)
        return Ue(t.helper(el), [
          a
        ]);
    } else s.type === 6 && s.value.content.startsWith("vue:") && (n = s.value.content.slice(4));
  const o = lh(n) || t.isBuiltInComponent(n);
  return o ? (r || t.helper(o), o) : (t.helper(Za), t.components.add(n), Pi(n, "component"));
}
function Ah(e, t, r = e.props, n, i, s = !1) {
  const { tag: o, loc: a, children: l } = e;
  let d = [];
  const p = [], c = [], g = l.length > 0;
  let _ = !1, S = 0, w = !1, L = !1, j = !1, R = !1, x = !1, T = !1;
  const v = [], C = (E) => {
    d.length && (p.push(
      bt(lu(d), a)
    ), d = []), E && p.push(E);
  }, D = () => {
    t.scopes.vFor > 0 && d.push(
      Fe(
        ce("ref_for", !0),
        ce("true")
      )
    );
  }, F = ({ key: E, value: O }) => {
    if (lt(E)) {
      const A = E.content, $ = $r(A);
      if ($ && (!n || i) && // omit the flag for click handlers because hydration gives click
      // dedicated fast path.
      A.toLowerCase() !== "onclick" && // omit v-model handlers
      A !== "onUpdate:modelValue" && // omit onVnodeXXX hooks
      !Xt(A) && (R = !0), $ && Xt(A) && (T = !0), $ && O.type === 14 && (O = O.arguments[0]), O.type === 20 || (O.type === 4 || O.type === 8) && dt(O, t) > 0)
        return;
      A === "ref" ? w = !0 : A === "class" ? L = !0 : A === "style" ? j = !0 : A !== "key" && !v.includes(A) && v.push(A), n && (A === "class" || A === "style") && !v.includes(A) && v.push(A);
    } else
      x = !0;
  };
  for (let E = 0; E < r.length; E++) {
    const O = r[E];
    if (O.type === 6) {
      const { loc: A, name: $, nameLoc: Y, value: X } = O;
      let W = !0;
      if ($ === "ref" && (w = !0, D()), $ === "is" && (fa(o) || X && X.content.startsWith("vue:") || jr(
        "COMPILER_IS_ON_ELEMENT",
        t
      )))
        continue;
      d.push(
        Fe(
          ce($, !0, Y),
          ce(
            X ? X.content : "",
            W,
            X ? X.loc : A
          )
        )
      );
    } else {
      const { name: A, arg: $, exp: Y, loc: X, modifiers: W } = O, te = A === "bind", ee = A === "on";
      if (A === "slot") {
        n || t.onError(
          Ae(40, X)
        );
        continue;
      }
      if (A === "once" || A === "memo" || A === "is" || te && Cr($, "is") && (fa(o) || jr(
        "COMPILER_IS_ON_ELEMENT",
        t
      )) || ee && s)
        continue;
      if (
        // #938: elements with dynamic keys should be forced into blocks
        (te && Cr($, "key") || // inline before-update hooks need to force block so that it is invoked
        // before children
        ee && g && Cr($, "vue:before-update")) && (_ = !0), te && Cr($, "ref") && D(), !$ && (te || ee)
      ) {
        if (x = !0, Y)
          if (te) {
            if (C(), jr(
              "COMPILER_V_BIND_OBJECT_ORDER",
              t
            )) {
              p.unshift(Y);
              continue;
            }
            D(), C(), p.push(Y);
          } else
            C({
              type: 14,
              loc: X,
              callee: t.helper(al),
              arguments: n ? [Y] : [Y, "true"]
            });
        else
          t.onError(
            Ae(
              te ? 34 : 35,
              X
            )
          );
        continue;
      }
      te && W.some((se) => se.content === "prop") && (S |= 32);
      const ge = t.directiveTransforms[A];
      if (ge) {
        const { props: se, needRuntime: ie } = ge(O, e, t);
        !s && se.forEach(F), ee && $ && !lt($) ? C(bt(se, a)) : d.push(...se), ie && (c.push(O), Ze(ie) && Rh.set(O, ie));
      } else Fp(A) || (c.push(O), g && (_ = !0));
    }
  }
  let y;
  if (p.length ? (C(), p.length > 1 ? y = Ue(
    t.helper(Ds),
    p,
    a
  ) : y = p[0]) : d.length && (y = bt(
    lu(d),
    a
  )), x ? S |= 16 : (L && !n && (S |= 2), j && !n && (S |= 4), v.length && (S |= 8), R && (S |= 32)), !_ && (S === 0 || S === 32) && (w || T || c.length > 0) && (S |= 512), !t.inSSR && y)
    switch (y.type) {
      case 15:
        let E = -1, O = -1, A = !1;
        for (let X = 0; X < y.properties.length; X++) {
          const W = y.properties[X].key;
          lt(W) ? W.content === "class" ? E = X : W.content === "style" && (O = X) : W.isHandlerKey || (A = !0);
        }
        const $ = y.properties[E], Y = y.properties[O];
        A ? y = Ue(
          t.helper(Ai),
          [y]
        ) : ($ && !lt($.value) && ($.value = Ue(
          t.helper(sl),
          [$.value]
        )), Y && // the static style is compiled into an object,
        // so use `hasStyleBinding` to ensure that it is a dynamic style binding
        (j || Y.value.type === 4 && Y.value.content.trim()[0] === "[" || // v-bind:style and style both exist,
        // v-bind:style with static literal object
        Y.value.type === 17) && (Y.value = Ue(
          t.helper(ol),
          [Y.value]
        )));
        break;
      case 14:
        break;
      default:
        y = Ue(
          t.helper(Ai),
          [
            Ue(t.helper(Vi), [
              y
            ])
          ]
        );
        break;
    }
  return {
    props: y,
    directives: c,
    patchFlag: S,
    dynamicPropNames: v,
    shouldUseBlock: _
  };
}
function lu(e) {
  const t = /* @__PURE__ */ new Map(), r = [];
  for (let n = 0; n < e.length; n++) {
    const i = e[n];
    if (i.key.type === 8 || !i.key.isStatic) {
      r.push(i);
      continue;
    }
    const s = i.key.content, o = t.get(s);
    o ? (s === "style" || s === "class" || $r(s)) && mb(o, i) : (t.set(s, i), r.push(i));
  }
  return r;
}
function mb(e, t) {
  e.value.type === 17 ? e.value.elements.push(t.value) : e.value = kr(
    [e.value, t.value],
    e.loc
  );
}
function gb(e, t) {
  const r = [], n = Rh.get(e);
  n ? r.push(t.helperString(n)) : (t.helper(tl), t.directives.add(e.name), r.push(Pi(e.name, "directive")));
  const { loc: i } = e;
  if (e.exp && r.push(e.exp), e.arg && (e.exp || r.push("void 0"), r.push(e.arg)), Object.keys(e.modifiers).length) {
    e.arg || (e.exp || r.push("void 0"), r.push("void 0"));
    const s = ce("true", !1, i);
    r.push(
      bt(
        e.modifiers.map(
          (o) => Fe(o, s)
        ),
        i
      )
    );
  }
  return kr(r, e.loc);
}
function _b(e) {
  let t = "[";
  for (let r = 0, n = e.length; r < n; r++)
    t += JSON.stringify(e[r]), r < n - 1 && (t += ", ");
  return t + "]";
}
function fa(e) {
  return e === "component" || e === "Component";
}
const yb = (e, t) => {
  if (Fs(e)) {
    const { children: r, loc: n } = e, { slotName: i, slotProps: s } = bb(e, t), o = [
      t.prefixIdentifiers ? "_ctx.$slots" : "$slots",
      i,
      "{}",
      "undefined",
      "true"
    ];
    let a = 2;
    s && (o[2] = s, a = 3), r.length && (o[3] = hn([], r, !1, !1, n), a = 4), t.scopeId && !t.slotted && (a = 5), o.splice(a), e.codegenNode = Ue(
      t.helper(ih),
      o,
      n
    );
  }
};
function bb(e, t) {
  let r = '"default"', n;
  const i = [];
  for (let s = 0; s < e.props.length; s++) {
    const o = e.props[s];
    if (o.type === 6)
      o.value && (o.name === "name" ? r = JSON.stringify(o.value.content) : (o.name = we(o.name), i.push(o)));
    else if (o.name === "bind" && Cr(o.arg, "name")) {
      if (o.exp)
        r = o.exp;
      else if (o.arg && o.arg.type === 4) {
        const a = we(o.arg.content);
        r = o.exp = ce(a, !1, o.arg.loc);
      }
    } else
      o.name === "bind" && o.arg && lt(o.arg) && (o.arg.content = we(o.arg.content)), i.push(o);
  }
  if (i.length > 0) {
    const { props: s, directives: o } = Ah(
      e,
      t,
      i,
      !1,
      !1
    );
    n = s, o.length && t.onError(
      Ae(
        36,
        o[0].loc
      )
    );
  }
  return {
    slotName: r,
    slotProps: n
  };
}
const Ch = (e, t, r, n) => {
  const { loc: i, modifiers: s, arg: o } = e;
  !e.exp && !s.length && r.onError(Ae(35, i));
  let a;
  if (o.type === 4)
    if (o.isStatic) {
      let c = o.content;
      c.startsWith("vue:") && (c = `vnode-${c.slice(4)}`);
      const g = t.tagType !== 0 || c.startsWith("vnode") || !/[A-Z]/.test(c) ? (
        // for non-element and vnode lifecycle event listeners, auto convert
        // it to camelCase. See issue #2249
        en(we(c))
      ) : (
        // preserve case for plain element listeners that have uppercase
        // letters, as these may be custom elements' custom events
        `on:${c}`
      );
      a = ce(g, !0, o.loc);
    } else
      a = Nt([
        `${r.helperString(oa)}(`,
        o,
        ")"
      ]);
  else
    a = o, a.children.unshift(`${r.helperString(oa)}(`), a.children.push(")");
  let l = e.exp;
  l && !l.content.trim() && (l = void 0);
  let d = r.cacheHandlers && !l && !r.inVOnce;
  if (l) {
    const c = fh(l), g = !(c || y0(l)), _ = l.content.includes(";");
    (g || d && c) && (l = Nt([
      `${g ? "$event" : "(...args)"} => ${_ ? "{" : "("}`,
      l,
      _ ? "}" : ")"
    ]));
  }
  let p = {
    props: [
      Fe(
        a,
        l || ce("() => {}", !1, i)
      )
    ]
  };
  return n && (p = n(p)), d && (p.props[0].value = r.cache(p.props[0].value)), p.props.forEach((c) => c.key.isHandlerKey = !0), p;
}, Tb = (e, t, r) => {
  const { modifiers: n, loc: i } = e, s = e.arg;
  let { exp: o } = e;
  return o && o.type === 4 && !o.content.trim() && (o = void 0), s.type !== 4 ? (s.children.unshift("("), s.children.push(') || ""')) : s.isStatic || (s.content = s.content ? `${s.content} || ""` : '""'), n.some((a) => a.content === "camel") && (s.type === 4 ? s.isStatic ? s.content = we(s.content) : s.content = `${r.helperString(sa)}(${s.content})` : (s.children.unshift(`${r.helperString(sa)}(`), s.children.push(")"))), r.inSSR || (n.some((a) => a.content === "prop") && cu(s, "."), n.some((a) => a.content === "attr") && cu(s, "^")), {
    props: [Fe(s, o)]
  };
}, cu = (e, t) => {
  e.type === 4 ? e.isStatic ? e.content = t + e.content : e.content = `\`${t}\${${e.content}}\`` : (e.children.unshift(`'${t}' + (`), e.children.push(")"));
}, Sb = (e, t) => {
  if (e.type === 0 || e.type === 1 || e.type === 11 || e.type === 10)
    return () => {
      const r = e.children;
      let n, i = !1;
      for (let s = 0; s < r.length; s++) {
        const o = r[s];
        if (ko(o)) {
          i = !0;
          for (let a = s + 1; a < r.length; a++) {
            const l = r[a];
            if (ko(l))
              n || (n = r[s] = Nt(
                [o],
                o.loc
              )), n.children.push(" + ", l), r.splice(a, 1), a--;
            else {
              n = void 0;
              break;
            }
          }
        }
      }
      if (!(!i || // if this is a plain element with a single text child, leave it
      // as-is since the runtime has dedicated fast path for this by directly
      // setting textContent of the element.
      // for component root it's always normalized anyway.
      r.length === 1 && (e.type === 0 || e.type === 1 && e.tagType === 0 && // #3756
      // custom directives can potentially add DOM elements arbitrarily,
      // we need to avoid setting textContent of the element at runtime
      // to avoid accidentally overwriting the DOM elements added
      // by the user through custom directives.
      !e.props.find(
        (s) => s.type === 7 && !t.directiveTransforms[s.name]
      ) && e.tag !== "template")))
        for (let s = 0; s < r.length; s++) {
          const o = r[s];
          if (ko(o) || o.type === 8) {
            const a = [];
            (o.type !== 2 || o.content !== " ") && a.push(o), !t.ssr && dt(o, t) === 0 && a.push(
              "1"
            ), r[s] = {
              type: 12,
              content: o,
              loc: o.loc,
              codegenNode: Ue(
                t.helper(Ja),
                a
              )
            };
          }
        }
    };
}, uu = /* @__PURE__ */ new WeakSet(), vb = (e, t) => {
  if (e.type === 1 && yt(e, "once", !0))
    return uu.has(e) || t.inVOnce || t.inSSR ? void 0 : (uu.add(e), t.inVOnce = !0, t.helper(Ls), () => {
      t.inVOnce = !1;
      const r = t.currentNode;
      r.codegenNode && (r.codegenNode = t.cache(
        r.codegenNode,
        !0,
        !0
      ));
    });
}, Oh = (e, t, r) => {
  const { exp: n, arg: i } = e;
  if (!n)
    return r.onError(
      Ae(41, e.loc)
    ), ei();
  const s = n.loc.source.trim(), o = n.type === 4 ? n.content : s, a = r.bindingMetadata[s];
  if (a === "props" || a === "props-aliased")
    return r.onError(Ae(44, n.loc)), ei();
  if (a === "literal-const" || a === "setup-const")
    return r.onError(Ae(45, n.loc)), ei();
  if (!o.trim() || !fh(n))
    return r.onError(
      Ae(42, n.loc)
    ), ei();
  const l = i || ce("modelValue", !0), d = i ? lt(i) ? `onUpdate:${we(i.content)}` : Nt(['"onUpdate:" + ', i]) : "onUpdate:modelValue";
  let p;
  const c = r.isTS ? "($event: any)" : "$event";
  p = Nt([
    `${c} => ((`,
    n,
    ") = $event)"
  ]);
  const g = [
    // modelValue: foo
    Fe(l, e.exp),
    // "onUpdate:modelValue": $event => (foo = $event)
    Fe(d, p)
  ];
  if (e.modifiers.length && t.tagType === 1) {
    const _ = e.modifiers.map((w) => w.content).map((w) => (dl(w) ? w : JSON.stringify(w)) + ": true").join(", "), S = i ? lt(i) ? `${i.content}Modifiers` : Nt([i, ' + "Modifiers"']) : "modelModifiers";
    g.push(
      Fe(
        S,
        ce(
          `{ ${_} }`,
          !1,
          e.loc,
          2
        )
      )
    );
  }
  return ei(g);
};
function ei(e = []) {
  return { props: e };
}
const Eb = /[\w).+\-_$\]]/, Ib = (e, t) => {
  jr("COMPILER_FILTERS", t) && (e.type === 5 ? Us(e.content, t) : e.type === 1 && e.props.forEach((r) => {
    r.type === 7 && r.name !== "for" && r.exp && Us(r.exp, t);
  }));
};
function Us(e, t) {
  if (e.type === 4)
    fu(e, t);
  else
    for (let r = 0; r < e.children.length; r++) {
      const n = e.children[r];
      typeof n == "object" && (n.type === 4 ? fu(n, t) : n.type === 8 ? Us(n, t) : n.type === 5 && Us(n.content, t));
    }
}
function fu(e, t) {
  const r = e.content;
  let n = !1, i = !1, s = !1, o = !1, a = 0, l = 0, d = 0, p = 0, c, g, _, S, w = [];
  for (_ = 0; _ < r.length; _++)
    if (g = c, c = r.charCodeAt(_), n)
      c === 39 && g !== 92 && (n = !1);
    else if (i)
      c === 34 && g !== 92 && (i = !1);
    else if (s)
      c === 96 && g !== 92 && (s = !1);
    else if (o)
      c === 47 && g !== 92 && (o = !1);
    else if (c === 124 && // pipe
    r.charCodeAt(_ + 1) !== 124 && r.charCodeAt(_ - 1) !== 124 && !a && !l && !d)
      S === void 0 ? (p = _ + 1, S = r.slice(0, _).trim()) : L();
    else {
      switch (c) {
        case 34:
          i = !0;
          break;
        // "
        case 39:
          n = !0;
          break;
        // '
        case 96:
          s = !0;
          break;
        // `
        case 40:
          d++;
          break;
        // (
        case 41:
          d--;
          break;
        // )
        case 91:
          l++;
          break;
        // [
        case 93:
          l--;
          break;
        // ]
        case 123:
          a++;
          break;
        // {
        case 125:
          a--;
          break;
      }
      if (c === 47) {
        let j = _ - 1, R;
        for (; j >= 0 && (R = r.charAt(j), R === " "); j--)
          ;
        (!R || !Eb.test(R)) && (o = !0);
      }
    }
  S === void 0 ? S = r.slice(0, _).trim() : p !== 0 && L();
  function L() {
    w.push(r.slice(p, _).trim()), p = _ + 1;
  }
  if (w.length) {
    for (_ = 0; _ < w.length; _++)
      S = wb(S, w[_], t);
    e.content = S, e.ast = void 0;
  }
}
function wb(e, t, r) {
  r.helper(rl);
  const n = t.indexOf("(");
  if (n < 0)
    return r.filters.add(t), `${Pi(t, "filter")}(${e})`;
  {
    const i = t.slice(0, n), s = t.slice(n + 1);
    return r.filters.add(i), `${Pi(i, "filter")}(${e}${s !== ")" ? "," + s : s}`;
  }
}
const du = /* @__PURE__ */ new WeakSet(), xb = (e, t) => {
  if (e.type === 1) {
    const r = yt(e, "memo");
    return !r || du.has(e) || t.inSSR ? void 0 : (du.add(e), () => {
      const n = e.codegenNode || t.currentNode.codegenNode;
      n && n.type === 13 && (e.tagType !== 1 && ul(n, t), e.codegenNode = Ue(t.helper(cl), [
        r.exp,
        hn(void 0, n),
        "_cache",
        String(t.cached.length)
      ]), t.cached.push(null));
    });
  }
}, Nb = (e, t) => {
  if (e.type === 1) {
    for (const r of e.props)
      if (r.type === 7 && r.name === "bind" && (!r.exp || // #13930 :foo in in-DOM templates will be parsed into :foo="" by browser
      r.exp.type === 4 && !r.exp.content.trim()) && r.arg) {
        const n = r.arg;
        if (n.type !== 4 || !n.isStatic)
          t.onError(
            Ae(
              53,
              n.loc
            )
          ), r.exp = ce("", !0, n.loc);
        else {
          const i = we(n.content);
          (ch.test(i[0]) || // allow hyphen first char for https://github.com/vuejs/language-tools/pull/3424
          i[0] === "-") && (r.exp = ce(i, !1, n.loc));
        }
      }
  }
};
function Rb(e) {
  return [
    [
      Nb,
      vb,
      ib,
      xb,
      ab,
      Ib,
      yb,
      hb,
      ub,
      Sb
    ],
    {
      on: Ch,
      bind: Tb,
      model: Oh
    }
  ];
}
function Ab(e, t = {}) {
  const r = t.onError || fl, n = t.mode === "module";
  t.prefixIdentifiers === !0 ? r(Ae(48)) : n && r(Ae(49));
  const i = !1;
  t.cacheHandlers && r(Ae(50)), t.scopeId && !n && r(Ae(51));
  const s = fe({}, t, {
    prefixIdentifiers: i
  }), o = ae(e) ? L0(e, s) : e, [a, l] = Rb();
  return B0(
    o,
    fe({}, s, {
      nodeTransforms: [
        ...a,
        ...t.nodeTransforms || []
        // user transforms
      ],
      directiveTransforms: fe(
        {},
        l,
        t.directiveTransforms || {}
        // user transforms
      )
    })
  ), Q0(o, s);
}
const Cb = () => ({ props: [] });
/**
* @vue/compiler-dom v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const Ph = /* @__PURE__ */ Symbol(""), Mh = /* @__PURE__ */ Symbol(
  ""
), Dh = /* @__PURE__ */ Symbol(""), Lh = /* @__PURE__ */ Symbol(
  ""
), da = /* @__PURE__ */ Symbol(
  ""
), kh = /* @__PURE__ */ Symbol(
  ""
), jh = /* @__PURE__ */ Symbol(
  ""
), Fh = /* @__PURE__ */ Symbol(""), Bh = /* @__PURE__ */ Symbol(""), Uh = /* @__PURE__ */ Symbol(
  ""
);
a0({
  [Ph]: "vModelRadio",
  [Mh]: "vModelCheckbox",
  [Dh]: "vModelText",
  [Lh]: "vModelSelect",
  [da]: "vModelDynamic",
  [kh]: "withModifiers",
  [jh]: "withKeys",
  [Fh]: "vShow",
  [Bh]: "Transition",
  [Uh]: "TransitionGroup"
});
let Wr;
function Ob(e, t = !1) {
  return Wr || (Wr = document.createElement("div")), t ? (Wr.innerHTML = `<div foo="${e.replace(/"/g, "&quot;")}">`, Wr.children[0].getAttribute("foo")) : (Wr.innerHTML = e, Wr.textContent);
}
const Pb = {
  parseMode: "html",
  isVoidTag: rm,
  isNativeTag: (e) => Zp(e) || em(e) || tm(e),
  isPreTag: (e) => e === "pre",
  isIgnoreNewlineTag: (e) => e === "pre" || e === "textarea",
  decodeEntities: Ob,
  isBuiltInComponent: (e) => {
    if (e === "Transition" || e === "transition")
      return Bh;
    if (e === "TransitionGroup" || e === "transition-group")
      return Uh;
  },
  // https://html.spec.whatwg.org/multipage/parsing.html#tree-construction-dispatcher
  getNamespace(e, t, r) {
    let n = t ? t.ns : r;
    if (t && n === 2)
      if (t.tag === "annotation-xml") {
        if (e === "svg")
          return 1;
        t.props.some(
          (i) => i.type === 6 && i.name === "encoding" && i.value != null && (i.value.content === "text/html" || i.value.content === "application/xhtml+xml")
        ) && (n = 0);
      } else /^m(?:[ions]|text)$/.test(t.tag) && e !== "mglyph" && e !== "malignmark" && (n = 0);
    else t && n === 1 && (t.tag === "foreignObject" || t.tag === "desc" || t.tag === "title") && (n = 0);
    if (n === 0) {
      if (e === "svg")
        return 1;
      if (e === "math")
        return 2;
    }
    return n;
  }
}, Mb = (e) => {
  e.type === 1 && e.props.forEach((t, r) => {
    t.type === 6 && t.name === "style" && t.value && (e.props[r] = {
      type: 7,
      name: "bind",
      arg: ce("style", !0, t.loc),
      exp: Db(t.value.content, t.loc),
      modifiers: [],
      loc: t.loc
    });
  });
}, Db = (e, t) => {
  const r = Qu(e);
  return ce(
    JSON.stringify(r),
    !1,
    t,
    3
  );
};
function yr(e, t) {
  return Ae(
    e,
    t
  );
}
const Lb = (e, t, r) => {
  const { exp: n, loc: i } = e;
  return n || r.onError(
    yr(54, i)
  ), t.children.length && (r.onError(
    yr(55, i)
  ), t.children.length = 0), {
    props: [
      Fe(
        ce("innerHTML", !0, i),
        n || ce("", !0)
      )
    ]
  };
}, kb = (e, t, r) => {
  const { exp: n, loc: i } = e;
  return n || r.onError(
    yr(56, i)
  ), t.children.length && (r.onError(
    yr(57, i)
  ), t.children.length = 0), {
    props: [
      Fe(
        ce("textContent", !0),
        n ? dt(n, r) > 0 ? n : Ue(
          r.helperString(lo),
          [n],
          i
        ) : ce("", !0)
      )
    ]
  };
}, jb = (e, t, r) => {
  const n = Oh(e, t, r);
  if (!n.props.length || t.tagType === 1)
    return n;
  e.arg && r.onError(
    yr(
      59,
      e.arg.loc
    )
  );
  const { tag: i } = t, s = r.isCustomElement(i);
  if (i === "input" || i === "textarea" || i === "select" || s) {
    let o = Dh, a = !1;
    if (i === "input" || s) {
      const l = co(t, "type");
      if (l) {
        if (l.type === 7)
          o = da;
        else if (l.value)
          switch (l.value.content) {
            case "radio":
              o = Ph;
              break;
            case "checkbox":
              o = Mh;
              break;
            case "file":
              a = !0, r.onError(
                yr(
                  60,
                  e.loc
                )
              );
              break;
          }
      } else b0(t) && (o = da);
    } else i === "select" && (o = Lh);
    a || (n.needRuntime = r.helper(o));
  } else
    r.onError(
      yr(
        58,
        e.loc
      )
    );
  return n.props = n.props.filter(
    (o) => !(o.key.type === 4 && o.key.content === "modelValue")
  ), n;
}, Fb = /* @__PURE__ */ et("passive,once,capture"), Bb = /* @__PURE__ */ et(
  // event propagation management
  "stop,prevent,self,ctrl,shift,alt,meta,exact,middle"
), Ub = /* @__PURE__ */ et("left,right"), $h = /* @__PURE__ */ et("onkeyup,onkeydown,onkeypress"), $b = (e, t, r, n) => {
  const i = [], s = [], o = [];
  for (let a = 0; a < t.length; a++) {
    const l = t[a].content;
    l === "native" && Oi(
      "COMPILER_V_ON_NATIVE",
      r
    ) || Fb(l) ? o.push(l) : Ub(l) ? lt(e) ? $h(e.content.toLowerCase()) ? i.push(l) : s.push(l) : (i.push(l), s.push(l)) : Bb(l) ? s.push(l) : i.push(l);
  }
  return {
    keyModifiers: i,
    nonKeyModifiers: s,
    eventOptionModifiers: o
  };
}, hu = (e, t) => lt(e) && e.content.toLowerCase() === "onclick" ? ce(t, !0) : e.type !== 4 ? Nt([
  "(",
  e,
  `) === "onClick" ? "${t}" : (`,
  e,
  ")"
]) : e, Vb = (e, t, r) => Ch(e, t, r, (n) => {
  const { modifiers: i } = e;
  if (!i.length) return n;
  let { key: s, value: o } = n.props[0];
  const { keyModifiers: a, nonKeyModifiers: l, eventOptionModifiers: d } = $b(s, i, r, e.loc);
  if (l.includes("right") && (s = hu(s, "onContextmenu")), l.includes("middle") && (s = hu(s, "onMouseup")), l.length && (o = Ue(r.helper(kh), [
    o,
    JSON.stringify(l)
  ])), a.length && // if event name is dynamic, always wrap with keys guard
  (!lt(s) || $h(s.content.toLowerCase())) && (o = Ue(r.helper(jh), [
    o,
    JSON.stringify(a)
  ])), d.length) {
    const p = d.map(Qr).join("");
    s = lt(s) ? ce(`${s.content}${p}`, !0) : Nt(["(", s, `) + "${p}"`]);
  }
  return {
    props: [Fe(s, o)]
  };
}), Qb = (e, t, r) => {
  const { exp: n, loc: i } = e;
  return n || r.onError(
    yr(62, i)
  ), {
    props: [],
    needRuntime: r.helper(Fh)
  };
}, Hb = (e, t) => {
  e.type === 1 && e.tagType === 0 && (e.tag === "script" || e.tag === "style") && t.removeNode();
}, qb = [
  Mb
], Kb = {
  cloak: Cb,
  html: Lb,
  text: kb,
  model: jb,
  // override compiler-core
  on: Vb,
  // override compiler-core
  show: Qb
};
function Wb(e, t = {}) {
  return Ab(
    e,
    fe({}, Pb, t, {
      nodeTransforms: [
        // ignore <script> and <tag>
        // this is not put inside DOMNodeTransforms because that list is used
        // by compiler-ssr to generate vnode fallback branches
        Hb,
        ...qb,
        ...t.nodeTransforms || []
      ],
      directiveTransforms: fe(
        {},
        Kb,
        t.directiveTransforms || {}
      ),
      transformHoist: null
    })
  );
}
/**
* vue v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const pu = /* @__PURE__ */ Object.create(null);
function Gb(e, t) {
  if (!ae(e))
    if (e.nodeType)
      e = e.innerHTML;
    else
      return Qe;
  const r = $p(e, t), n = pu[r];
  if (n)
    return n;
  if (e[0] === "#") {
    const a = document.querySelector(e);
    e = a ? a.innerHTML : "";
  }
  const i = fe(
    {
      hoistStatic: !0,
      onError: void 0,
      onWarn: Qe
    },
    t
  );
  !i.isCustomElement && typeof customElements < "u" && (i.isCustomElement = (a) => !!customElements.get(a));
  const { code: s } = Wb(e, i), o = new Function("Vue", s)(t0);
  return o._rc = !0, pu[r] = o;
}
Ed(Gb);
const zb = `PREFIX : <http://example/>

DATA {
  :alice :parent :bob .
  :bob   :parent :carol .
}

RULE { ?grandParent :ancestor ?grandChild . }
WHERE {
  ?grandParent :parent ?mid .
  ?mid         :parent ?grandChild .
}`;
Ps({
  setup() {
    const e = /* @__PURE__ */ Ee(zb), t = /* @__PURE__ */ Ee(""), r = /* @__PURE__ */ Ee(!1), n = /* @__PURE__ */ Ee([]), i = /* @__PURE__ */ Ee(!0), s = /* @__PURE__ */ Ee("Ready"), o = /* @__PURE__ */ Ee(""), a = /* @__PURE__ */ Ee(null), l = /* @__PURE__ */ Ee(null), d = /* @__PURE__ */ Ee(null), p = /* @__PURE__ */ Ee(null), c = /* @__PURE__ */ Ee(null), g = /* @__PURE__ */ Ee("editor"), _ = /* @__PURE__ */ Ee([]), S = /* @__PURE__ */ Ee(!1), w = /* @__PURE__ */ Ee(500), L = /* @__PURE__ */ Ee([]), j = Xr(() => {
      const m = _.value;
      return {
        total: m.length,
        passed: m.filter((I) => I.status === "pass").length,
        failed: m.filter((I) => I.status === "fail").length,
        errors: m.filter((I) => I.status === "error").length
      };
    }), R = Xr(() => {
      const m = j.value;
      return S.value ? "running" : m.errors > 0 || m.failed > 0 ? "error" : m.passed > 0 ? "done" : "";
    }), x = Xr(() => {
      const m = j.value;
      return S.value ? "Running..." : m.passed + "/" + m.total + " passed" + (m.failed > 0 ? ", " + m.failed + " failed" : "") + (m.errors > 0 ? ", " + m.errors + " errors" : "");
    });
    async function T() {
      if (!(L.value.length > 0))
        try {
          const [m, I] = await Promise.all([
            fetch("examples/index.json").then((k) => k.json()),
            fetch("examples/results.json").then((k) => k.json()).catch(() => [])
          ]), P = {};
          for (const k of I) P[k.file] = k;
          L.value = m, _.value = m.map((k) => {
            const B = P[k.file];
            if (B && B.error) return { ...k, status: "error", count: -1, ms: B.ms || -1, error: B.error };
            if (B && !B.error) {
              const q = k.goldenCount >= 0 ? B.count === k.goldenCount : null;
              return { ...k, status: q === !0 ? "pass" : q === !1 ? "fail" : "idle", count: B.count, ms: B.ms || -1, error: null };
            }
            return { ...k, status: "idle", count: -1, ms: -1, error: null };
          });
        } catch (m) {
          console.error("Failed to load examples:", m);
        }
    }
    async function v(m) {
      try {
        const I = await fetch(`examples/${m.file}`);
        if (!I.ok) return;
        const P = await I.text();
        e.value = P, t.value = "", We(), g.value = "editor";
      } catch {
      }
    }
    async function C(m) {
      m.status = "running", _.value = [..._.value];
      const I = performance.now();
      try {
        const P = await fetch(`examples/${m.file}`);
        if (!P.ok) throw new Error(`HTTP ${P.status}`);
        const k = await P.text(), B = [];
        await window.ShaclEngine.runShaclQuery({ shaclQuery: k, turtleData: "" }, (K) => B.push(K));
        const q = Math.round(performance.now() - I), V = m.goldenCount >= 0 ? B.length === m.goldenCount : null;
        m.status = m.expectedError || V === !0 ? "pass" : "fail", m.count = B.length, m.ms = q, m.error = null;
      } catch (P) {
        m.status = m.expectedError ? "pass" : "error", m.count = -1, m.ms = Math.round(performance.now() - I), m.error = P.message;
      }
      _.value = [..._.value];
    }
    async function D() {
      S.value = !0;
      for (const m of _.value)
        m._t0 = performance.now(), await C(m);
      S.value = !1;
    }
    const F = /* @__PURE__ */ Ee(420), y = /* @__PURE__ */ Ee(260), E = /* @__PURE__ */ Ee(!1), O = /* @__PURE__ */ Ee(!1);
    function A(m) {
      E.value = !0;
      const I = m.clientY, P = F.value, k = (q) => {
        F.value = Math.max(120, P + (q.clientY - I));
      }, B = () => {
        E.value = !1, document.removeEventListener("mousemove", k), document.removeEventListener("mouseup", B);
      };
      document.addEventListener("mousemove", k), document.addEventListener("mouseup", B);
    }
    function $(m) {
      O.value = !0;
      const I = m.clientY, P = y.value, k = (q) => {
        y.value = Math.max(80, P + (q.clientY - I));
      }, B = () => {
        O.value = !1, document.removeEventListener("mousemove", k), document.removeEventListener("mouseup", B);
      };
      document.addEventListener("mousemove", k), document.addEventListener("mouseup", B);
    }
    const Y = /* @__PURE__ */ Ee([]), X = /* @__PURE__ */ Ee(!1), W = /* @__PURE__ */ Ee(null);
    function te(m) {
      return encodeURIComponent(m).replace(/\(/g, "%28").replace(/\)/g, "%29");
    }
    function ee() {
      let m = location.hash;
      !m && location.search && !location.search.includes("&state") && (m = location.search.replace(/\+/g, "%20"), history.replaceState(null, null, window.location.href.replace("?", "#").replace(/\+/g, "%20")));
      const I = m.slice(1).split("&").reduce((P, k) => {
        const B = k.match(/^([^=]+)=(.*)/);
        return B && (P[decodeURIComponent(B[1])] = decodeURIComponent(B[2])), P;
      }, {});
      I.query !== void 0 && (e.value = I.query), I.data !== void 0 && (t.value = I.data);
    }
    function ge() {
      const m = [];
      m.push("query=" + te(e.value)), t.value && m.push("data=" + te(t.value));
      const I = "#" + m.join("&");
      history.replaceState(null, null, location.href.replace(/(?:#.*)?$/, I));
    }
    Tn(async () => {
      ee(), window.addEventListener("popstate", ee);
      try {
        const m = await fetch("./examples/index.json");
        Y.value = await m.json();
      } catch (m) {
        console.warn("Could not load examples index:", m);
      }
      document.addEventListener("click", se), gr([e, t], ge, { flush: "post" });
    }), Sn(() => {
      document.removeEventListener("click", se), window.removeEventListener("popstate", ee);
    });
    function se(m) {
      W.value && !W.value.contains(m.target) && (X.value = !1);
    }
    function ie() {
      X.value = !X.value;
    }
    async function be(m) {
      X.value = !1;
      try {
        const P = await (await fetch(`./examples/${m.file}`)).text();
        e.value = P.trim(), t.value = "", n.value = [], i.value = !0, s.value = `Loaded: ${m.name}`, o.value = "";
      } catch {
        s.value = "Failed to load example.", o.value = "error";
      }
    }
    function Bt(m) {
      d.value = m;
    }
    function ar(m) {
      const I = m.trim().split(`
`), P = I.filter((V) => /^\s*(PREFIX|@prefix)\s/i.test(V)), k = I.filter((V) => V.trim() && !/^\s*(PREFIX|@prefix)\s/i.test(V) && !V.trim().startsWith("#"));
      for (const V of P) {
        const K = V.match(/PREFIX\s+(\S+)\s+/i);
        K && !e.value.includes(K[1]) && (e.value = V.trim() + `
` + e.value);
      }
      const q = `DATA {${k.length ? `
  ` + k.join(`
  `) + `
` : `
`}}`;
      if (/DATA\s*\{[\s\S]*?\}/.test(e.value))
        e.value = e.value.replace(/DATA\s*\{[\s\S]*?\}/, q);
      else {
        const V = e.value.split(`
`);
        let K = 0;
        for (let H = 0; H < V.length; H++)
          V[H].trim().toUpperCase().startsWith("PREFIX") && (K = H + 1);
        V.splice(K, 0, "", q), e.value = V.join(`
`);
      }
    }
    gr(t, (m) => ar(m));
    function Ut() {
      l.value.click();
    }
    function Ie(m) {
      const I = m.target.files[0];
      if (!I) return;
      const P = new FileReader();
      P.onload = (k) => {
        t.value = k.target.result, m.target.value = "";
      }, P.readAsText(I);
    }
    const $e = Xr(() => n.value.filter((m) => !m.error).length);
    function Le(m) {
      return m.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
    function mt(m) {
      return m ? /^(https?:|urn:)/.test(m) ? `<span class="uri">&lt;${Le(m)}&gt;</span>` : `<span class="literal">${Le(m)}</span>` : '<em style="color:#475569">default graph</em>';
    }
    function We() {
      n.value = [], i.value = !0, s.value = "Ready", o.value = "", p.value = null, c.value = null;
    }
    function St() {
      const m = n.value.filter((z) => !z.error);
      if (!m.length) return;
      const I = e.value.split(`
`).filter((z) => /^\s*PREFIX\s+/i.test(z)).map((z) => z.trim()), P = {};
      for (const z of I) {
        const J = z.match(/PREFIX\s+(\S+)\s*<([^>]+)>/i);
        J && (P[J[1]] = J[2]);
      }
      function k(z) {
        if (!z) return "[]";
        for (const [J, ne] of Object.entries(P))
          if (z.startsWith(ne)) return J + z.slice(ne.length);
        return `<${z}>`;
      }
      function B(z) {
        if (!z) return null;
        if (/^(https?:|urn:|[a-z][a-z0-9+\-.]*:\/\/)/.test(z)) return k(z);
        if (z.includes("^^")) {
          const [J, ne] = z.split("^^");
          return `"${J}"^^${k(ne)}`;
        }
        return `"${z.replace(/"/g, '\\"')}"`;
      }
      const q = m.map((z) => {
        const J = B(z.subject), ne = B(z.predicate), b = B(z.object);
        return !J || !ne || !b ? null : `${J} ${ne} ${b} .`;
      }).filter(Boolean), V = [
        "# Inferred triples exported from SHACL Rules Inference UI",
        "",
        ...I,
        I.length ? "" : null,
        ...q
      ].filter((z) => z !== null).join(`
`) + `
`, K = new Blob([V], { type: "text/turtle" }), H = URL.createObjectURL(K), re = document.createElement("a");
      re.href = H, re.download = "inferred.ttl", re.click(), URL.revokeObjectURL(H);
    }
    async function G(m) {
      if (!m.error) {
        c.value = { triple: m, loading: !0, results: [] };
        try {
          const I = await window.ShaclEngine.explainTriple(e.value.trim(), m);
          c.value = { triple: m, loading: !1, results: I };
        } catch (I) {
          c.value = { triple: m, loading: !1, results: [], error: I.message };
        }
      }
    }
    async function f() {
      if (!e.value.trim()) {
        s.value = "Please enter a SHACL query.", o.value = "error";
        return;
      }
      r.value = !0, n.value = [], i.value = !1, p.value = null, c.value = null, s.value = "Running…", o.value = "running";
      const m = performance.now();
      try {
        await window.ShaclEngine.runShaclQuery(
          { shaclQuery: e.value.trim(), turtleData: t.value },
          async (k) => {
            n.value.push(k), await ji(), a.value && (a.value.scrollTop = a.value.scrollHeight);
          }
        );
        const I = n.value.filter((k) => k.error).length, P = n.value.length - I;
        p.value = Math.round(performance.now() - m), s.value = I > 0 ? `Done with errors — ${P} triple${P !== 1 ? "s" : ""} inferred` : `Done — ${P} triple${P !== 1 ? "s" : ""} inferred`, o.value = I > 0 ? "error" : "done";
      } catch (I) {
        s.value = "Inference failed: " + I.message, o.value = "error", console.error(I);
      } finally {
        r.value = !1;
      }
    }
    return {
      shaclQuery: e,
      turtleData: t,
      running: r,
      rows: n,
      neverRan: i,
      goodRows: $e,
      statusText: s,
      statusClass: o,
      scroll: a,
      fileInput: l,
      modal: d,
      execTime: p,
      provenance: c,
      editorHeight: F,
      resultsHeight: y,
      draggingEditor: E,
      draggingResults: O,
      startResizeEditor: A,
      startResizeResults: $,
      examples: Y,
      showExamples: X,
      examplesBtn: W,
      fmt: mt,
      clearResults: We,
      runQuery: f,
      triggerFileUpload: Ut,
      handleFileUpload: Ie,
      showModal: Bt,
      toggleExamples: ie,
      loadExample: be,
      clickRow: G,
      downloadTurtle: St,
      activeTab: g,
      exampleResults: _,
      exampleRunning: S,
      exampleResultsHeight: w,
      exampleStatusClass: R,
      exampleStatusText: x,
      exampleStats: j,
      loadExamplesDashboard: T,
      runAllExamples: D,
      runExample: C,
      openExampleInEditor: v
    };
  }
}).mount("#app");
