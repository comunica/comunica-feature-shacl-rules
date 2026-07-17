function Qh(e) {
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
var ho = {}, wn = {}, yl;
function Hh() {
  if (yl) return wn;
  yl = 1, wn.byteLength = a, wn.toByteArray = h, wn.fromByteArray = m;
  for (var e = [], t = [], r = typeof Uint8Array < "u" ? Uint8Array : Array, n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", i = 0, s = n.length; i < s; ++i)
    e[i] = n[i], t[n.charCodeAt(i)] = i;
  t[45] = 62, t[95] = 63;
  function o(_) {
    var v = _.length;
    if (v % 4 > 0)
      throw new Error("Invalid string. Length must be a multiple of 4");
    var I = _.indexOf("=");
    I === -1 && (I = v);
    var k = I === v ? 0 : 4 - I % 4;
    return [I, k];
  }
  function a(_) {
    var v = o(_), I = v[0], k = v[1];
    return (I + k) * 3 / 4 - k;
  }
  function l(_, v, I) {
    return (v + I) * 3 / 4 - I;
  }
  function h(_) {
    var v, I = o(_), k = I[0], L = I[1], A = new r(l(_, k, L)), x = 0, T = L > 0 ? k - 4 : k, S;
    for (S = 0; S < T; S += 4)
      v = t[_.charCodeAt(S)] << 18 | t[_.charCodeAt(S + 1)] << 12 | t[_.charCodeAt(S + 2)] << 6 | t[_.charCodeAt(S + 3)], A[x++] = v >> 16 & 255, A[x++] = v >> 8 & 255, A[x++] = v & 255;
    return L === 2 && (v = t[_.charCodeAt(S)] << 2 | t[_.charCodeAt(S + 1)] >> 4, A[x++] = v & 255), L === 1 && (v = t[_.charCodeAt(S)] << 10 | t[_.charCodeAt(S + 1)] << 4 | t[_.charCodeAt(S + 2)] >> 2, A[x++] = v >> 8 & 255, A[x++] = v & 255), A;
  }
  function p(_) {
    return e[_ >> 18 & 63] + e[_ >> 12 & 63] + e[_ >> 6 & 63] + e[_ & 63];
  }
  function c(_, v, I) {
    for (var k, L = [], A = v; A < I; A += 3)
      k = (_[A] << 16 & 16711680) + (_[A + 1] << 8 & 65280) + (_[A + 2] & 255), L.push(p(k));
    return L.join("");
  }
  function m(_) {
    for (var v, I = _.length, k = I % 3, L = [], A = 16383, x = 0, T = I - k; x < T; x += A)
      L.push(c(_, x, x + A > T ? T : x + A));
    return k === 1 ? (v = _[I - 1], L.push(
      e[v >> 2] + e[v << 4 & 63] + "=="
    )) : k === 2 && (v = (_[I - 2] << 8) + _[I - 1], L.push(
      e[v >> 10] + e[v >> 4 & 63] + e[v << 2 & 63] + "="
    )), L.join("");
  }
  return wn;
}
var Hi = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
var bl;
function qh() {
  return bl || (bl = 1, Hi.read = function(e, t, r, n, i) {
    var s, o, a = i * 8 - n - 1, l = (1 << a) - 1, h = l >> 1, p = -7, c = r ? i - 1 : 0, m = r ? -1 : 1, _ = e[t + c];
    for (c += m, s = _ & (1 << -p) - 1, _ >>= -p, p += a; p > 0; s = s * 256 + e[t + c], c += m, p -= 8)
      ;
    for (o = s & (1 << -p) - 1, s >>= -p, p += n; p > 0; o = o * 256 + e[t + c], c += m, p -= 8)
      ;
    if (s === 0)
      s = 1 - h;
    else {
      if (s === l)
        return o ? NaN : (_ ? -1 : 1) * (1 / 0);
      o = o + Math.pow(2, n), s = s - h;
    }
    return (_ ? -1 : 1) * o * Math.pow(2, s - n);
  }, Hi.write = function(e, t, r, n, i, s) {
    var o, a, l, h = s * 8 - i - 1, p = (1 << h) - 1, c = p >> 1, m = i === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, _ = n ? 0 : s - 1, v = n ? 1 : -1, I = t < 0 || t === 0 && 1 / t < 0 ? 1 : 0;
    for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (a = isNaN(t) ? 1 : 0, o = p) : (o = Math.floor(Math.log(t) / Math.LN2), t * (l = Math.pow(2, -o)) < 1 && (o--, l *= 2), o + c >= 1 ? t += m / l : t += m * Math.pow(2, 1 - c), t * l >= 2 && (o++, l /= 2), o + c >= p ? (a = 0, o = p) : o + c >= 1 ? (a = (t * l - 1) * Math.pow(2, i), o = o + c) : (a = t * Math.pow(2, c - 1) * Math.pow(2, i), o = 0)); i >= 8; e[r + _] = a & 255, _ += v, a /= 256, i -= 8)
      ;
    for (o = o << i | a, h += i; h > 0; e[r + _] = o & 255, _ += v, o /= 256, h -= 8)
      ;
    e[r + _ - v] |= I * 128;
  }), Hi;
}
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
var Tl;
function Kh() {
  return Tl || (Tl = 1, (function(e) {
    const t = Hh(), r = qh(), n = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
    e.Buffer = a, e.SlowBuffer = A, e.INSPECT_MAX_BYTES = 50;
    const i = 2147483647;
    e.kMaxLength = i, a.TYPED_ARRAY_SUPPORT = s(), !a.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error(
      "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
    );
    function s() {
      try {
        const y = new Uint8Array(1), u = { foo: function() {
          return 42;
        } };
        return Object.setPrototypeOf(u, Uint8Array.prototype), Object.setPrototypeOf(y, u), y.foo() === 42;
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
    function o(y) {
      if (y > i)
        throw new RangeError('The value "' + y + '" is invalid for option "size"');
      const u = new Uint8Array(y);
      return Object.setPrototypeOf(u, a.prototype), u;
    }
    function a(y, u, d) {
      if (typeof y == "number") {
        if (typeof u == "string")
          throw new TypeError(
            'The "string" argument must be of type string. Received type number'
          );
        return c(y);
      }
      return l(y, u, d);
    }
    a.poolSize = 8192;
    function l(y, u, d) {
      if (typeof y == "string")
        return m(y, u);
      if (ArrayBuffer.isView(y))
        return v(y);
      if (y == null)
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof y
        );
      if (V(y, ArrayBuffer) || y && V(y.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (V(y, SharedArrayBuffer) || y && V(y.buffer, SharedArrayBuffer)))
        return I(y, u, d);
      if (typeof y == "number")
        throw new TypeError(
          'The "value" argument must not be of type number. Received type number'
        );
      const E = y.valueOf && y.valueOf();
      if (E != null && E !== y)
        return a.from(E, u, d);
      const M = k(y);
      if (M) return M;
      if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof y[Symbol.toPrimitive] == "function")
        return a.from(y[Symbol.toPrimitive]("string"), u, d);
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof y
      );
    }
    a.from = function(y, u, d) {
      return l(y, u, d);
    }, Object.setPrototypeOf(a.prototype, Uint8Array.prototype), Object.setPrototypeOf(a, Uint8Array);
    function h(y) {
      if (typeof y != "number")
        throw new TypeError('"size" argument must be of type number');
      if (y < 0)
        throw new RangeError('The value "' + y + '" is invalid for option "size"');
    }
    function p(y, u, d) {
      return h(y), y <= 0 ? o(y) : u !== void 0 ? typeof d == "string" ? o(y).fill(u, d) : o(y).fill(u) : o(y);
    }
    a.alloc = function(y, u, d) {
      return p(y, u, d);
    };
    function c(y) {
      return h(y), o(y < 0 ? 0 : L(y) | 0);
    }
    a.allocUnsafe = function(y) {
      return c(y);
    }, a.allocUnsafeSlow = function(y) {
      return c(y);
    };
    function m(y, u) {
      if ((typeof u != "string" || u === "") && (u = "utf8"), !a.isEncoding(u))
        throw new TypeError("Unknown encoding: " + u);
      const d = x(y, u) | 0;
      let E = o(d);
      const M = E.write(y, u);
      return M !== d && (E = E.slice(0, M)), E;
    }
    function _(y) {
      const u = y.length < 0 ? 0 : L(y.length) | 0, d = o(u);
      for (let E = 0; E < u; E += 1)
        d[E] = y[E] & 255;
      return d;
    }
    function v(y) {
      if (V(y, Uint8Array)) {
        const u = new Uint8Array(y);
        return I(u.buffer, u.byteOffset, u.byteLength);
      }
      return _(y);
    }
    function I(y, u, d) {
      if (u < 0 || y.byteLength < u)
        throw new RangeError('"offset" is outside of buffer bounds');
      if (y.byteLength < u + (d || 0))
        throw new RangeError('"length" is outside of buffer bounds');
      let E;
      return u === void 0 && d === void 0 ? E = new Uint8Array(y) : d === void 0 ? E = new Uint8Array(y, u) : E = new Uint8Array(y, u, d), Object.setPrototypeOf(E, a.prototype), E;
    }
    function k(y) {
      if (a.isBuffer(y)) {
        const u = L(y.length) | 0, d = o(u);
        return d.length === 0 || y.copy(d, 0, 0, u), d;
      }
      if (y.length !== void 0)
        return typeof y.length != "number" || W(y.length) ? o(0) : _(y);
      if (y.type === "Buffer" && Array.isArray(y.data))
        return _(y.data);
    }
    function L(y) {
      if (y >= i)
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + i.toString(16) + " bytes");
      return y | 0;
    }
    function A(y) {
      return +y != y && (y = 0), a.alloc(+y);
    }
    a.isBuffer = function(u) {
      return u != null && u._isBuffer === !0 && u !== a.prototype;
    }, a.compare = function(u, d) {
      if (V(u, Uint8Array) && (u = a.from(u, u.offset, u.byteLength)), V(d, Uint8Array) && (d = a.from(d, d.offset, d.byteLength)), !a.isBuffer(u) || !a.isBuffer(d))
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
        );
      if (u === d) return 0;
      let E = u.length, M = d.length;
      for (let B = 0, q = Math.min(E, M); B < q; ++B)
        if (u[B] !== d[B]) {
          E = u[B], M = d[B];
          break;
        }
      return E < M ? -1 : M < E ? 1 : 0;
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
    }, a.concat = function(u, d) {
      if (!Array.isArray(u))
        throw new TypeError('"list" argument must be an Array of Buffers');
      if (u.length === 0)
        return a.alloc(0);
      let E;
      if (d === void 0)
        for (d = 0, E = 0; E < u.length; ++E)
          d += u[E].length;
      const M = a.allocUnsafe(d);
      let B = 0;
      for (E = 0; E < u.length; ++E) {
        let q = u[E];
        if (V(q, Uint8Array))
          B + q.length > M.length ? (a.isBuffer(q) || (q = a.from(q)), q.copy(M, B)) : Uint8Array.prototype.set.call(
            M,
            q,
            B
          );
        else if (a.isBuffer(q))
          q.copy(M, B);
        else
          throw new TypeError('"list" argument must be an Array of Buffers');
        B += q.length;
      }
      return M;
    };
    function x(y, u) {
      if (a.isBuffer(y))
        return y.length;
      if (ArrayBuffer.isView(y) || V(y, ArrayBuffer))
        return y.byteLength;
      if (typeof y != "string")
        throw new TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof y
        );
      const d = y.length, E = arguments.length > 2 && arguments[2] === !0;
      if (!E && d === 0) return 0;
      let M = !1;
      for (; ; )
        switch (u) {
          case "ascii":
          case "latin1":
          case "binary":
            return d;
          case "utf8":
          case "utf-8":
            return U(y).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return d * 2;
          case "hex":
            return d >>> 1;
          case "base64":
            return O(y).length;
          default:
            if (M)
              return E ? -1 : U(y).length;
            u = ("" + u).toLowerCase(), M = !0;
        }
    }
    a.byteLength = x;
    function T(y, u, d) {
      let E = !1;
      if ((u === void 0 || u < 0) && (u = 0), u > this.length || ((d === void 0 || d > this.length) && (d = this.length), d <= 0) || (d >>>= 0, u >>>= 0, d <= u))
        return "";
      for (y || (y = "utf8"); ; )
        switch (y) {
          case "hex":
            return _e(this, u, d);
          case "utf8":
          case "utf-8":
            return Y(this, u, d);
          case "ascii":
            return ne(this, u, d);
          case "latin1":
          case "binary":
            return re(this, u, d);
          case "base64":
            return Q(this, u, d);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return se(this, u, d);
          default:
            if (E) throw new TypeError("Unknown encoding: " + y);
            y = (y + "").toLowerCase(), E = !0;
        }
    }
    a.prototype._isBuffer = !0;
    function S(y, u, d) {
      const E = y[u];
      y[u] = y[d], y[d] = E;
    }
    a.prototype.swap16 = function() {
      const u = this.length;
      if (u % 2 !== 0)
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      for (let d = 0; d < u; d += 2)
        S(this, d, d + 1);
      return this;
    }, a.prototype.swap32 = function() {
      const u = this.length;
      if (u % 4 !== 0)
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      for (let d = 0; d < u; d += 4)
        S(this, d, d + 3), S(this, d + 1, d + 2);
      return this;
    }, a.prototype.swap64 = function() {
      const u = this.length;
      if (u % 8 !== 0)
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      for (let d = 0; d < u; d += 8)
        S(this, d, d + 7), S(this, d + 1, d + 6), S(this, d + 2, d + 5), S(this, d + 3, d + 4);
      return this;
    }, a.prototype.toString = function() {
      const u = this.length;
      return u === 0 ? "" : arguments.length === 0 ? Y(this, 0, u) : T.apply(this, arguments);
    }, a.prototype.toLocaleString = a.prototype.toString, a.prototype.equals = function(u) {
      if (!a.isBuffer(u)) throw new TypeError("Argument must be a Buffer");
      return this === u ? !0 : a.compare(this, u) === 0;
    }, a.prototype.inspect = function() {
      let u = "";
      const d = e.INSPECT_MAX_BYTES;
      return u = this.toString("hex", 0, d).replace(/(.{2})/g, "$1 ").trim(), this.length > d && (u += " ... "), "<Buffer " + u + ">";
    }, n && (a.prototype[n] = a.prototype.inspect), a.prototype.compare = function(u, d, E, M, B) {
      if (V(u, Uint8Array) && (u = a.from(u, u.offset, u.byteLength)), !a.isBuffer(u))
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof u
        );
      if (d === void 0 && (d = 0), E === void 0 && (E = u ? u.length : 0), M === void 0 && (M = 0), B === void 0 && (B = this.length), d < 0 || E > u.length || M < 0 || B > this.length)
        throw new RangeError("out of range index");
      if (M >= B && d >= E)
        return 0;
      if (M >= B)
        return -1;
      if (d >= E)
        return 1;
      if (d >>>= 0, E >>>= 0, M >>>= 0, B >>>= 0, this === u) return 0;
      let q = B - M, le = E - d;
      const Ne = Math.min(q, le), ue = this.slice(M, B), ge = u.slice(d, E);
      for (let ve = 0; ve < Ne; ++ve)
        if (ue[ve] !== ge[ve]) {
          q = ue[ve], le = ge[ve];
          break;
        }
      return q < le ? -1 : le < q ? 1 : 0;
    };
    function C(y, u, d, E, M) {
      if (y.length === 0) return -1;
      if (typeof d == "string" ? (E = d, d = 0) : d > 2147483647 ? d = 2147483647 : d < -2147483648 && (d = -2147483648), d = +d, W(d) && (d = M ? 0 : y.length - 1), d < 0 && (d = y.length + d), d >= y.length) {
        if (M) return -1;
        d = y.length - 1;
      } else if (d < 0)
        if (M) d = 0;
        else return -1;
      if (typeof u == "string" && (u = a.from(u, E)), a.isBuffer(u))
        return u.length === 0 ? -1 : D(y, u, d, E, M);
      if (typeof u == "number")
        return u = u & 255, typeof Uint8Array.prototype.indexOf == "function" ? M ? Uint8Array.prototype.indexOf.call(y, u, d) : Uint8Array.prototype.lastIndexOf.call(y, u, d) : D(y, [u], d, E, M);
      throw new TypeError("val must be string, number or Buffer");
    }
    function D(y, u, d, E, M) {
      let B = 1, q = y.length, le = u.length;
      if (E !== void 0 && (E = String(E).toLowerCase(), E === "ucs2" || E === "ucs-2" || E === "utf16le" || E === "utf-16le")) {
        if (y.length < 2 || u.length < 2)
          return -1;
        B = 2, q /= 2, le /= 2, d /= 2;
      }
      function Ne(ge, ve) {
        return B === 1 ? ge[ve] : ge.readUInt16BE(ve * B);
      }
      let ue;
      if (M) {
        let ge = -1;
        for (ue = d; ue < q; ue++)
          if (Ne(y, ue) === Ne(u, ge === -1 ? 0 : ue - ge)) {
            if (ge === -1 && (ge = ue), ue - ge + 1 === le) return ge * B;
          } else
            ge !== -1 && (ue -= ue - ge), ge = -1;
      } else
        for (d + le > q && (d = q - le), ue = d; ue >= 0; ue--) {
          let ge = !0;
          for (let ve = 0; ve < le; ve++)
            if (Ne(y, ue + ve) !== Ne(u, ve)) {
              ge = !1;
              break;
            }
          if (ge) return ue;
        }
      return -1;
    }
    a.prototype.includes = function(u, d, E) {
      return this.indexOf(u, d, E) !== -1;
    }, a.prototype.indexOf = function(u, d, E) {
      return C(this, u, d, E, !0);
    }, a.prototype.lastIndexOf = function(u, d, E) {
      return C(this, u, d, E, !1);
    };
    function j(y, u, d, E) {
      d = Number(d) || 0;
      const M = y.length - d;
      E ? (E = Number(E), E > M && (E = M)) : E = M;
      const B = u.length;
      E > B / 2 && (E = B / 2);
      let q;
      for (q = 0; q < E; ++q) {
        const le = parseInt(u.substr(q * 2, 2), 16);
        if (W(le)) return q;
        y[d + q] = le;
      }
      return q;
    }
    function b(y, u, d, E) {
      return $(U(u, y.length - d), y, d, E);
    }
    function w(y, u, d, E) {
      return $(H(u), y, d, E);
    }
    function P(y, u, d, E) {
      return $(O(u), y, d, E);
    }
    function R(y, u, d, E) {
      return $(X(u, y.length - d), y, d, E);
    }
    a.prototype.write = function(u, d, E, M) {
      if (d === void 0)
        M = "utf8", E = this.length, d = 0;
      else if (E === void 0 && typeof d == "string")
        M = d, E = this.length, d = 0;
      else if (isFinite(d))
        d = d >>> 0, isFinite(E) ? (E = E >>> 0, M === void 0 && (M = "utf8")) : (M = E, E = void 0);
      else
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported"
        );
      const B = this.length - d;
      if ((E === void 0 || E > B) && (E = B), u.length > 0 && (E < 0 || d < 0) || d > this.length)
        throw new RangeError("Attempt to write outside buffer bounds");
      M || (M = "utf8");
      let q = !1;
      for (; ; )
        switch (M) {
          case "hex":
            return j(this, u, d, E);
          case "utf8":
          case "utf-8":
            return b(this, u, d, E);
          case "ascii":
          case "latin1":
          case "binary":
            return w(this, u, d, E);
          case "base64":
            return P(this, u, d, E);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return R(this, u, d, E);
          default:
            if (q) throw new TypeError("Unknown encoding: " + M);
            M = ("" + M).toLowerCase(), q = !0;
        }
    }, a.prototype.toJSON = function() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    function Q(y, u, d) {
      return u === 0 && d === y.length ? t.fromByteArray(y) : t.fromByteArray(y.slice(u, d));
    }
    function Y(y, u, d) {
      d = Math.min(y.length, d);
      const E = [];
      let M = u;
      for (; M < d; ) {
        const B = y[M];
        let q = null, le = B > 239 ? 4 : B > 223 ? 3 : B > 191 ? 2 : 1;
        if (M + le <= d) {
          let Ne, ue, ge, ve;
          switch (le) {
            case 1:
              B < 128 && (q = B);
              break;
            case 2:
              Ne = y[M + 1], (Ne & 192) === 128 && (ve = (B & 31) << 6 | Ne & 63, ve > 127 && (q = ve));
              break;
            case 3:
              Ne = y[M + 1], ue = y[M + 2], (Ne & 192) === 128 && (ue & 192) === 128 && (ve = (B & 15) << 12 | (Ne & 63) << 6 | ue & 63, ve > 2047 && (ve < 55296 || ve > 57343) && (q = ve));
              break;
            case 4:
              Ne = y[M + 1], ue = y[M + 2], ge = y[M + 3], (Ne & 192) === 128 && (ue & 192) === 128 && (ge & 192) === 128 && (ve = (B & 15) << 18 | (Ne & 63) << 12 | (ue & 63) << 6 | ge & 63, ve > 65535 && ve < 1114112 && (q = ve));
          }
        }
        q === null ? (q = 65533, le = 1) : q > 65535 && (q -= 65536, E.push(q >>> 10 & 1023 | 55296), q = 56320 | q & 1023), E.push(q), M += le;
      }
      return z(E);
    }
    const Z = 4096;
    function z(y) {
      const u = y.length;
      if (u <= Z)
        return String.fromCharCode.apply(String, y);
      let d = "", E = 0;
      for (; E < u; )
        d += String.fromCharCode.apply(
          String,
          y.slice(E, E += Z)
        );
      return d;
    }
    function ne(y, u, d) {
      let E = "";
      d = Math.min(y.length, d);
      for (let M = u; M < d; ++M)
        E += String.fromCharCode(y[M] & 127);
      return E;
    }
    function re(y, u, d) {
      let E = "";
      d = Math.min(y.length, d);
      for (let M = u; M < d; ++M)
        E += String.fromCharCode(y[M]);
      return E;
    }
    function _e(y, u, d) {
      const E = y.length;
      (!u || u < 0) && (u = 0), (!d || d < 0 || d > E) && (d = E);
      let M = "";
      for (let B = u; B < d; ++B)
        M += K[y[B]];
      return M;
    }
    function se(y, u, d) {
      const E = y.slice(u, d);
      let M = "";
      for (let B = 0; B < E.length - 1; B += 2)
        M += String.fromCharCode(E[B] + E[B + 1] * 256);
      return M;
    }
    a.prototype.slice = function(u, d) {
      const E = this.length;
      u = ~~u, d = d === void 0 ? E : ~~d, u < 0 ? (u += E, u < 0 && (u = 0)) : u > E && (u = E), d < 0 ? (d += E, d < 0 && (d = 0)) : d > E && (d = E), d < u && (d = u);
      const M = this.subarray(u, d);
      return Object.setPrototypeOf(M, a.prototype), M;
    };
    function ie(y, u, d) {
      if (y % 1 !== 0 || y < 0) throw new RangeError("offset is not uint");
      if (y + u > d) throw new RangeError("Trying to access beyond buffer length");
    }
    a.prototype.readUintLE = a.prototype.readUIntLE = function(u, d, E) {
      u = u >>> 0, d = d >>> 0, E || ie(u, d, this.length);
      let M = this[u], B = 1, q = 0;
      for (; ++q < d && (B *= 256); )
        M += this[u + q] * B;
      return M;
    }, a.prototype.readUintBE = a.prototype.readUIntBE = function(u, d, E) {
      u = u >>> 0, d = d >>> 0, E || ie(u, d, this.length);
      let M = this[u + --d], B = 1;
      for (; d > 0 && (B *= 256); )
        M += this[u + --d] * B;
      return M;
    }, a.prototype.readUint8 = a.prototype.readUInt8 = function(u, d) {
      return u = u >>> 0, d || ie(u, 1, this.length), this[u];
    }, a.prototype.readUint16LE = a.prototype.readUInt16LE = function(u, d) {
      return u = u >>> 0, d || ie(u, 2, this.length), this[u] | this[u + 1] << 8;
    }, a.prototype.readUint16BE = a.prototype.readUInt16BE = function(u, d) {
      return u = u >>> 0, d || ie(u, 2, this.length), this[u] << 8 | this[u + 1];
    }, a.prototype.readUint32LE = a.prototype.readUInt32LE = function(u, d) {
      return u = u >>> 0, d || ie(u, 4, this.length), (this[u] | this[u + 1] << 8 | this[u + 2] << 16) + this[u + 3] * 16777216;
    }, a.prototype.readUint32BE = a.prototype.readUInt32BE = function(u, d) {
      return u = u >>> 0, d || ie(u, 4, this.length), this[u] * 16777216 + (this[u + 1] << 16 | this[u + 2] << 8 | this[u + 3]);
    }, a.prototype.readBigUInt64LE = J(function(u) {
      u = u >>> 0, f(u, "offset");
      const d = this[u], E = this[u + 7];
      (d === void 0 || E === void 0) && g(u, this.length - 8);
      const M = d + this[++u] * 2 ** 8 + this[++u] * 2 ** 16 + this[++u] * 2 ** 24, B = this[++u] + this[++u] * 2 ** 8 + this[++u] * 2 ** 16 + E * 2 ** 24;
      return BigInt(M) + (BigInt(B) << BigInt(32));
    }), a.prototype.readBigUInt64BE = J(function(u) {
      u = u >>> 0, f(u, "offset");
      const d = this[u], E = this[u + 7];
      (d === void 0 || E === void 0) && g(u, this.length - 8);
      const M = d * 2 ** 24 + this[++u] * 2 ** 16 + this[++u] * 2 ** 8 + this[++u], B = this[++u] * 2 ** 24 + this[++u] * 2 ** 16 + this[++u] * 2 ** 8 + E;
      return (BigInt(M) << BigInt(32)) + BigInt(B);
    }), a.prototype.readIntLE = function(u, d, E) {
      u = u >>> 0, d = d >>> 0, E || ie(u, d, this.length);
      let M = this[u], B = 1, q = 0;
      for (; ++q < d && (B *= 256); )
        M += this[u + q] * B;
      return B *= 128, M >= B && (M -= Math.pow(2, 8 * d)), M;
    }, a.prototype.readIntBE = function(u, d, E) {
      u = u >>> 0, d = d >>> 0, E || ie(u, d, this.length);
      let M = d, B = 1, q = this[u + --M];
      for (; M > 0 && (B *= 256); )
        q += this[u + --M] * B;
      return B *= 128, q >= B && (q -= Math.pow(2, 8 * d)), q;
    }, a.prototype.readInt8 = function(u, d) {
      return u = u >>> 0, d || ie(u, 1, this.length), this[u] & 128 ? (255 - this[u] + 1) * -1 : this[u];
    }, a.prototype.readInt16LE = function(u, d) {
      u = u >>> 0, d || ie(u, 2, this.length);
      const E = this[u] | this[u + 1] << 8;
      return E & 32768 ? E | 4294901760 : E;
    }, a.prototype.readInt16BE = function(u, d) {
      u = u >>> 0, d || ie(u, 2, this.length);
      const E = this[u + 1] | this[u] << 8;
      return E & 32768 ? E | 4294901760 : E;
    }, a.prototype.readInt32LE = function(u, d) {
      return u = u >>> 0, d || ie(u, 4, this.length), this[u] | this[u + 1] << 8 | this[u + 2] << 16 | this[u + 3] << 24;
    }, a.prototype.readInt32BE = function(u, d) {
      return u = u >>> 0, d || ie(u, 4, this.length), this[u] << 24 | this[u + 1] << 16 | this[u + 2] << 8 | this[u + 3];
    }, a.prototype.readBigInt64LE = J(function(u) {
      u = u >>> 0, f(u, "offset");
      const d = this[u], E = this[u + 7];
      (d === void 0 || E === void 0) && g(u, this.length - 8);
      const M = this[u + 4] + this[u + 5] * 2 ** 8 + this[u + 6] * 2 ** 16 + (E << 24);
      return (BigInt(M) << BigInt(32)) + BigInt(d + this[++u] * 2 ** 8 + this[++u] * 2 ** 16 + this[++u] * 2 ** 24);
    }), a.prototype.readBigInt64BE = J(function(u) {
      u = u >>> 0, f(u, "offset");
      const d = this[u], E = this[u + 7];
      (d === void 0 || E === void 0) && g(u, this.length - 8);
      const M = (d << 24) + // Overflow
      this[++u] * 2 ** 16 + this[++u] * 2 ** 8 + this[++u];
      return (BigInt(M) << BigInt(32)) + BigInt(this[++u] * 2 ** 24 + this[++u] * 2 ** 16 + this[++u] * 2 ** 8 + E);
    }), a.prototype.readFloatLE = function(u, d) {
      return u = u >>> 0, d || ie(u, 4, this.length), r.read(this, u, !0, 23, 4);
    }, a.prototype.readFloatBE = function(u, d) {
      return u = u >>> 0, d || ie(u, 4, this.length), r.read(this, u, !1, 23, 4);
    }, a.prototype.readDoubleLE = function(u, d) {
      return u = u >>> 0, d || ie(u, 8, this.length), r.read(this, u, !0, 52, 8);
    }, a.prototype.readDoubleBE = function(u, d) {
      return u = u >>> 0, d || ie(u, 8, this.length), r.read(this, u, !1, 52, 8);
    };
    function me(y, u, d, E, M, B) {
      if (!a.isBuffer(y)) throw new TypeError('"buffer" argument must be a Buffer instance');
      if (u > M || u < B) throw new RangeError('"value" argument is out of bounds');
      if (d + E > y.length) throw new RangeError("Index out of range");
    }
    a.prototype.writeUintLE = a.prototype.writeUIntLE = function(u, d, E, M) {
      if (u = +u, d = d >>> 0, E = E >>> 0, !M) {
        const le = Math.pow(2, 8 * E) - 1;
        me(this, u, d, E, le, 0);
      }
      let B = 1, q = 0;
      for (this[d] = u & 255; ++q < E && (B *= 256); )
        this[d + q] = u / B & 255;
      return d + E;
    }, a.prototype.writeUintBE = a.prototype.writeUIntBE = function(u, d, E, M) {
      if (u = +u, d = d >>> 0, E = E >>> 0, !M) {
        const le = Math.pow(2, 8 * E) - 1;
        me(this, u, d, E, le, 0);
      }
      let B = E - 1, q = 1;
      for (this[d + B] = u & 255; --B >= 0 && (q *= 256); )
        this[d + B] = u / q & 255;
      return d + E;
    }, a.prototype.writeUint8 = a.prototype.writeUInt8 = function(u, d, E) {
      return u = +u, d = d >>> 0, E || me(this, u, d, 1, 255, 0), this[d] = u & 255, d + 1;
    }, a.prototype.writeUint16LE = a.prototype.writeUInt16LE = function(u, d, E) {
      return u = +u, d = d >>> 0, E || me(this, u, d, 2, 65535, 0), this[d] = u & 255, this[d + 1] = u >>> 8, d + 2;
    }, a.prototype.writeUint16BE = a.prototype.writeUInt16BE = function(u, d, E) {
      return u = +u, d = d >>> 0, E || me(this, u, d, 2, 65535, 0), this[d] = u >>> 8, this[d + 1] = u & 255, d + 2;
    }, a.prototype.writeUint32LE = a.prototype.writeUInt32LE = function(u, d, E) {
      return u = +u, d = d >>> 0, E || me(this, u, d, 4, 4294967295, 0), this[d + 3] = u >>> 24, this[d + 2] = u >>> 16, this[d + 1] = u >>> 8, this[d] = u & 255, d + 4;
    }, a.prototype.writeUint32BE = a.prototype.writeUInt32BE = function(u, d, E) {
      return u = +u, d = d >>> 0, E || me(this, u, d, 4, 4294967295, 0), this[d] = u >>> 24, this[d + 1] = u >>> 16, this[d + 2] = u >>> 8, this[d + 3] = u & 255, d + 4;
    };
    function Ut(y, u, d, E, M) {
      G(u, E, M, y, d, 7);
      let B = Number(u & BigInt(4294967295));
      y[d++] = B, B = B >> 8, y[d++] = B, B = B >> 8, y[d++] = B, B = B >> 8, y[d++] = B;
      let q = Number(u >> BigInt(32) & BigInt(4294967295));
      return y[d++] = q, q = q >> 8, y[d++] = q, q = q >> 8, y[d++] = q, q = q >> 8, y[d++] = q, d;
    }
    function Ot(y, u, d, E, M) {
      G(u, E, M, y, d, 7);
      let B = Number(u & BigInt(4294967295));
      y[d + 7] = B, B = B >> 8, y[d + 6] = B, B = B >> 8, y[d + 5] = B, B = B >> 8, y[d + 4] = B;
      let q = Number(u >> BigInt(32) & BigInt(4294967295));
      return y[d + 3] = q, q = q >> 8, y[d + 2] = q, q = q >> 8, y[d + 1] = q, q = q >> 8, y[d] = q, d + 8;
    }
    a.prototype.writeBigUInt64LE = J(function(u, d = 0) {
      return Ut(this, u, d, BigInt(0), BigInt("0xffffffffffffffff"));
    }), a.prototype.writeBigUInt64BE = J(function(u, d = 0) {
      return Ot(this, u, d, BigInt(0), BigInt("0xffffffffffffffff"));
    }), a.prototype.writeIntLE = function(u, d, E, M) {
      if (u = +u, d = d >>> 0, !M) {
        const Ne = Math.pow(2, 8 * E - 1);
        me(this, u, d, E, Ne - 1, -Ne);
      }
      let B = 0, q = 1, le = 0;
      for (this[d] = u & 255; ++B < E && (q *= 256); )
        u < 0 && le === 0 && this[d + B - 1] !== 0 && (le = 1), this[d + B] = (u / q >> 0) - le & 255;
      return d + E;
    }, a.prototype.writeIntBE = function(u, d, E, M) {
      if (u = +u, d = d >>> 0, !M) {
        const Ne = Math.pow(2, 8 * E - 1);
        me(this, u, d, E, Ne - 1, -Ne);
      }
      let B = E - 1, q = 1, le = 0;
      for (this[d + B] = u & 255; --B >= 0 && (q *= 256); )
        u < 0 && le === 0 && this[d + B + 1] !== 0 && (le = 1), this[d + B] = (u / q >> 0) - le & 255;
      return d + E;
    }, a.prototype.writeInt8 = function(u, d, E) {
      return u = +u, d = d >>> 0, E || me(this, u, d, 1, 127, -128), u < 0 && (u = 255 + u + 1), this[d] = u & 255, d + 1;
    }, a.prototype.writeInt16LE = function(u, d, E) {
      return u = +u, d = d >>> 0, E || me(this, u, d, 2, 32767, -32768), this[d] = u & 255, this[d + 1] = u >>> 8, d + 2;
    }, a.prototype.writeInt16BE = function(u, d, E) {
      return u = +u, d = d >>> 0, E || me(this, u, d, 2, 32767, -32768), this[d] = u >>> 8, this[d + 1] = u & 255, d + 2;
    }, a.prototype.writeInt32LE = function(u, d, E) {
      return u = +u, d = d >>> 0, E || me(this, u, d, 4, 2147483647, -2147483648), this[d] = u & 255, this[d + 1] = u >>> 8, this[d + 2] = u >>> 16, this[d + 3] = u >>> 24, d + 4;
    }, a.prototype.writeInt32BE = function(u, d, E) {
      return u = +u, d = d >>> 0, E || me(this, u, d, 4, 2147483647, -2147483648), u < 0 && (u = 4294967295 + u + 1), this[d] = u >>> 24, this[d + 1] = u >>> 16, this[d + 2] = u >>> 8, this[d + 3] = u & 255, d + 4;
    }, a.prototype.writeBigInt64LE = J(function(u, d = 0) {
      return Ut(this, u, d, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    }), a.prototype.writeBigInt64BE = J(function(u, d = 0) {
      return Ot(this, u, d, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    function $t(y, u, d, E, M, B) {
      if (d + E > y.length) throw new RangeError("Index out of range");
      if (d < 0) throw new RangeError("Index out of range");
    }
    function we(y, u, d, E, M) {
      return u = +u, d = d >>> 0, M || $t(y, u, d, 4), r.write(y, u, d, E, 23, 4), d + 4;
    }
    a.prototype.writeFloatLE = function(u, d, E) {
      return we(this, u, d, !0, E);
    }, a.prototype.writeFloatBE = function(u, d, E) {
      return we(this, u, d, !1, E);
    };
    function $e(y, u, d, E, M) {
      return u = +u, d = d >>> 0, M || $t(y, u, d, 8), r.write(y, u, d, E, 52, 8), d + 8;
    }
    a.prototype.writeDoubleLE = function(u, d, E) {
      return $e(this, u, d, !0, E);
    }, a.prototype.writeDoubleBE = function(u, d, E) {
      return $e(this, u, d, !1, E);
    }, a.prototype.copy = function(u, d, E, M) {
      if (!a.isBuffer(u)) throw new TypeError("argument should be a Buffer");
      if (E || (E = 0), !M && M !== 0 && (M = this.length), d >= u.length && (d = u.length), d || (d = 0), M > 0 && M < E && (M = E), M === E || u.length === 0 || this.length === 0) return 0;
      if (d < 0)
        throw new RangeError("targetStart out of bounds");
      if (E < 0 || E >= this.length) throw new RangeError("Index out of range");
      if (M < 0) throw new RangeError("sourceEnd out of bounds");
      M > this.length && (M = this.length), u.length - d < M - E && (M = u.length - d + E);
      const B = M - E;
      return this === u && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(d, E, M) : Uint8Array.prototype.set.call(
        u,
        this.subarray(E, M),
        d
      ), B;
    }, a.prototype.fill = function(u, d, E, M) {
      if (typeof u == "string") {
        if (typeof d == "string" ? (M = d, d = 0, E = this.length) : typeof E == "string" && (M = E, E = this.length), M !== void 0 && typeof M != "string")
          throw new TypeError("encoding must be a string");
        if (typeof M == "string" && !a.isEncoding(M))
          throw new TypeError("Unknown encoding: " + M);
        if (u.length === 1) {
          const q = u.charCodeAt(0);
          (M === "utf8" && q < 128 || M === "latin1") && (u = q);
        }
      } else typeof u == "number" ? u = u & 255 : typeof u == "boolean" && (u = Number(u));
      if (d < 0 || this.length < d || this.length < E)
        throw new RangeError("Out of range index");
      if (E <= d)
        return this;
      d = d >>> 0, E = E === void 0 ? this.length : E >>> 0, u || (u = 0);
      let B;
      if (typeof u == "number")
        for (B = d; B < E; ++B)
          this[B] = u;
      else {
        const q = a.isBuffer(u) ? u : a.from(u, M), le = q.length;
        if (le === 0)
          throw new TypeError('The value "' + u + '" is invalid for argument "value"');
        for (B = 0; B < E - d; ++B)
          this[B + d] = q[B % le];
      }
      return this;
    };
    const Fe = {};
    function mt(y, u, d) {
      Fe[y] = class extends d {
        constructor() {
          super(), Object.defineProperty(this, "message", {
            value: u.apply(this, arguments),
            writable: !0,
            configurable: !0
          }), this.name = `${this.name} [${y}]`, this.stack, delete this.name;
        }
        get code() {
          return y;
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
          return `${this.name} [${y}]: ${this.message}`;
        }
      };
    }
    mt(
      "ERR_BUFFER_OUT_OF_BOUNDS",
      function(y) {
        return y ? `${y} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
      },
      RangeError
    ), mt(
      "ERR_INVALID_ARG_TYPE",
      function(y, u) {
        return `The "${y}" argument must be of type number. Received type ${typeof u}`;
      },
      TypeError
    ), mt(
      "ERR_OUT_OF_RANGE",
      function(y, u, d) {
        let E = `The value of "${y}" is out of range.`, M = d;
        return Number.isInteger(d) && Math.abs(d) > 2 ** 32 ? M = et(String(d)) : typeof d == "bigint" && (M = String(d), (d > BigInt(2) ** BigInt(32) || d < -(BigInt(2) ** BigInt(32))) && (M = et(M)), M += "n"), E += ` It must be ${u}. Received ${M}`, E;
      },
      RangeError
    );
    function et(y) {
      let u = "", d = y.length;
      const E = y[0] === "-" ? 1 : 0;
      for (; d >= E + 4; d -= 3)
        u = `_${y.slice(d - 3, d)}${u}`;
      return `${y.slice(0, d)}${u}`;
    }
    function vt(y, u, d) {
      f(u, "offset"), (y[u] === void 0 || y[u + d] === void 0) && g(u, y.length - (d + 1));
    }
    function G(y, u, d, E, M, B) {
      if (y > d || y < u) {
        const q = typeof u == "bigint" ? "n" : "";
        let le;
        throw u === 0 || u === BigInt(0) ? le = `>= 0${q} and < 2${q} ** ${(B + 1) * 8}${q}` : le = `>= -(2${q} ** ${(B + 1) * 8 - 1}${q}) and < 2 ** ${(B + 1) * 8 - 1}${q}`, new Fe.ERR_OUT_OF_RANGE("value", le, y);
      }
      vt(E, M, B);
    }
    function f(y, u) {
      if (typeof y != "number")
        throw new Fe.ERR_INVALID_ARG_TYPE(u, "number", y);
    }
    function g(y, u, d) {
      throw Math.floor(y) !== y ? (f(y, d), new Fe.ERR_OUT_OF_RANGE("offset", "an integer", y)) : u < 0 ? new Fe.ERR_BUFFER_OUT_OF_BOUNDS() : new Fe.ERR_OUT_OF_RANGE(
        "offset",
        `>= 0 and <= ${u}`,
        y
      );
    }
    const N = /[^+/0-9A-Za-z-_]/g;
    function F(y) {
      if (y = y.split("=")[0], y = y.trim().replace(N, ""), y.length < 2) return "";
      for (; y.length % 4 !== 0; )
        y = y + "=";
      return y;
    }
    function U(y, u) {
      u = u || 1 / 0;
      let d;
      const E = y.length;
      let M = null;
      const B = [];
      for (let q = 0; q < E; ++q) {
        if (d = y.charCodeAt(q), d > 55295 && d < 57344) {
          if (!M) {
            if (d > 56319) {
              (u -= 3) > -1 && B.push(239, 191, 189);
              continue;
            } else if (q + 1 === E) {
              (u -= 3) > -1 && B.push(239, 191, 189);
              continue;
            }
            M = d;
            continue;
          }
          if (d < 56320) {
            (u -= 3) > -1 && B.push(239, 191, 189), M = d;
            continue;
          }
          d = (M - 55296 << 10 | d - 56320) + 65536;
        } else M && (u -= 3) > -1 && B.push(239, 191, 189);
        if (M = null, d < 128) {
          if ((u -= 1) < 0) break;
          B.push(d);
        } else if (d < 2048) {
          if ((u -= 2) < 0) break;
          B.push(
            d >> 6 | 192,
            d & 63 | 128
          );
        } else if (d < 65536) {
          if ((u -= 3) < 0) break;
          B.push(
            d >> 12 | 224,
            d >> 6 & 63 | 128,
            d & 63 | 128
          );
        } else if (d < 1114112) {
          if ((u -= 4) < 0) break;
          B.push(
            d >> 18 | 240,
            d >> 12 & 63 | 128,
            d >> 6 & 63 | 128,
            d & 63 | 128
          );
        } else
          throw new Error("Invalid code point");
      }
      return B;
    }
    function H(y) {
      const u = [];
      for (let d = 0; d < y.length; ++d)
        u.push(y.charCodeAt(d) & 255);
      return u;
    }
    function X(y, u) {
      let d, E, M;
      const B = [];
      for (let q = 0; q < y.length && !((u -= 2) < 0); ++q)
        d = y.charCodeAt(q), E = d >> 8, M = d % 256, B.push(M), B.push(E);
      return B;
    }
    function O(y) {
      return t.toByteArray(F(y));
    }
    function $(y, u, d, E) {
      let M;
      for (M = 0; M < E && !(M + d >= u.length || M >= y.length); ++M)
        u[M + d] = y[M];
      return M;
    }
    function V(y, u) {
      return y instanceof u || y != null && y.constructor != null && y.constructor.name != null && y.constructor.name === u.name;
    }
    function W(y) {
      return y !== y;
    }
    const K = (function() {
      const y = "0123456789abcdef", u = new Array(256);
      for (let d = 0; d < 16; ++d) {
        const E = d * 16;
        for (let M = 0; M < 16; ++M)
          u[E + M] = y[d] + y[M];
      }
      return u;
    })();
    function J(y) {
      return typeof BigInt > "u" ? te : y;
    }
    function te() {
      throw new Error("BigInt not supported");
    }
  })(ho)), ho;
}
var Wh = Kh();
const In = "http://www.w3.org/1999/02/22-rdf-syntax-ns#", xn = "http://www.w3.org/2001/XMLSchema#", qi = "http://www.w3.org/2000/10/swap/", Et = {
  xsd: {
    decimal: `${xn}decimal`,
    boolean: `${xn}boolean`,
    double: `${xn}double`,
    integer: `${xn}integer`,
    string: `${xn}string`
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
}, { xsd: Ki } = Et, Gh = /\\u([a-fA-F0-9]{4})|\\U([a-fA-F0-9]{8})|\\([^])/g, vl = {
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
}, zh = /[\x00-\x20<>\\"\{\}\|\^\`]/, Yh = {
  _iri: !0,
  _unescapedIri: !0,
  _simpleQuotedString: !0,
  _langcode: !0,
  _blank: !0,
  _newline: !0,
  _comment: !0,
  _whitespace: !0,
  _endOfFile: !0
}, Xh = /$0^/;
class Jh {
  constructor(t) {
    if (this._iri = /^<((?:[^ <>{}\\]|\\[uU])+)>[ \t]*/, this._unescapedIri = /^<([^\x00-\x20<>\\"\{\}\|\^\`]*)>[ \t]*/, this._simpleQuotedString = /^"([^"\\\r\n]*)"(?=[^"])/, this._simpleApostropheString = /^'([^'\\\r\n]*)'(?=[^'])/, this._langcode = /^@([a-z]+(?:-[a-z0-9]+)*)(?=[^a-z0-9\-])/i, this._prefix = /^((?:[A-Za-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:\.?[\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)?:(?=[#\s<])/, this._prefixed = /^((?:[A-Za-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:\.?[\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)?:((?:(?:[0-:A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~])(?:(?:[\.\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~])*(?:[\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~]))?)?)(?:[ \t]+|(?=\.?[,;!\^\s#()\[\]\{\}"'<>]))/, this._variable = /^\?(?:(?:[A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:[\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)(?=[.,;!\^\s#()\[\]\{\}"'<>])/, this._blank = /^_:((?:[0-9A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:\.?[\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)(?:[ \t]+|(?=\.?[,;:\s#()\[\]\{\}"'<>]))/, this._number = /^[\-+]?(?:(\d+\.\d*|\.?\d+)[eE][\-+]?|\d*(\.)?)\d+(?=\.?[,;:\s#()\[\]\{\}"'<>])/, this._boolean = /^(?:true|false)(?=[.,;\s#()\[\]\{\}"'<>])/, this._keyword = /^@[a-z]+(?=[\s#<:])/i, this._sparqlKeyword = /^(?:PREFIX|BASE|GRAPH)(?=[\s#<])/i, this._shortPredicates = /^a(?=[\s#()\[\]\{\}"'<>])/, this._newline = /^[ \t]*(?:#[^\n\r]*)?(?:\r\n|\n|\r)[ \t]*/, this._comment = /#([^\n\r]*)/, this._whitespace = /^[ \t]+/, this._endOfFile = /^(?:#[^\n\r]*)?$/, t = t || {}, this._isImpliedBy = t.isImpliedBy, this._lineMode = !!t.lineMode) {
      this._n3Mode = !1;
      for (const r in this)
        !(r in Yh) && this[r] instanceof RegExp && (this[r] = Xh);
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
      const h = this._line, p = n[0];
      let c = "", m = "", _ = "", v = null, I = 0, k = !1;
      switch (p) {
        case "^":
          if (n.length < 3)
            break;
          if (n[1] === "^") {
            if (this._previousMarker = "^^", n = n.substr(2), n[0] !== "<") {
              k = !0;
              break;
            }
          } else {
            this._n3Mode && (I = 1, c = "^");
            break;
          }
        // Fall through in case the type is an IRI
        case "<":
          if (v = this._unescapedIri.exec(n))
            c = "IRI", m = v[1];
          else if (v = this._iri.exec(n)) {
            if (m = this._unescape(v[1]), m === null || zh.test(m))
              return o(this);
            c = "IRI";
          } else n.length > 1 && n[1] === "<" ? (c = "<<", I = 2) : this._n3Mode && n.length > 1 && n[1] === "=" && (I = 2, this._isImpliedBy ? (c = "abbreviation", m = "<") : (c = "inverse", m = ">"));
          break;
        case ">":
          n.length > 1 && n[1] === ">" && (c = ">>", I = 2);
          break;
        case "_":
          ((v = this._blank.exec(n)) || r && (v = this._blank.exec(`${n} `))) && (c = "blank", _ = "_", m = v[1]);
          break;
        case '"':
          if (v = this._simpleQuotedString.exec(n))
            m = v[1];
          else if ({ value: m, matchLength: I } = this._parseLiteral(n), m === null)
            return o(this);
          (v !== null || I !== 0) && (c = "literal", this._literalClosingPos = 0);
          break;
        case "'":
          if (!this._lineMode) {
            if (v = this._simpleApostropheString.exec(n))
              m = v[1];
            else if ({ value: m, matchLength: I } = this._parseLiteral(n), m === null)
              return o(this);
            (v !== null || I !== 0) && (c = "literal", this._literalClosingPos = 0);
          }
          break;
        case "?":
          this._n3Mode && (v = this._variable.exec(n)) && (c = "var", m = v[0]);
          break;
        case "@":
          this._previousMarker === "literal" && (v = this._langcode.exec(n)) ? (c = "langcode", m = v[1]) : (v = this._keyword.exec(n)) && (c = v[0]);
          break;
        case ".":
          if (n.length === 1 ? r : n[1] < "0" || n[1] > "9") {
            c = ".", I = 1;
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
          (v = this._number.exec(n) || r && (v = this._number.exec(`${n} `))) && (c = "literal", m = v[0], _ = typeof v[1] == "string" ? Ki.double : typeof v[2] == "string" ? Ki.decimal : Ki.integer);
          break;
        case "B":
        case "b":
        case "p":
        case "P":
        case "G":
        case "g":
          (v = this._sparqlKeyword.exec(n)) ? c = v[0].toUpperCase() : k = !0;
          break;
        case "f":
        case "t":
          (v = this._boolean.exec(n)) ? (c = "literal", m = v[0], _ = Ki.boolean) : k = !0;
          break;
        case "a":
          (v = this._shortPredicates.exec(n)) ? (c = "abbreviation", m = "a") : k = !0;
          break;
        case "=":
          this._n3Mode && n.length > 1 && (c = "abbreviation", n[1] !== ">" ? (I = 1, m = "=") : (I = 2, m = ">"));
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
          this._lineMode || (I = 1, c = p);
          break;
        case "{":
          !this._lineMode && n.length >= 2 && (n[1] === "|" ? (c = "{|", I = 2) : (c = p, I = 1));
          break;
        case "|":
          n.length >= 2 && n[1] === "}" && (c = "|}", I = 2);
          break;
        default:
          k = !0;
      }
      if (k && ((this._previousMarker === "@prefix" || this._previousMarker === "PREFIX") && (v = this._prefix.exec(n)) ? (c = "prefix", m = v[1] || "") : ((v = this._prefixed.exec(n)) || r && (v = this._prefixed.exec(`${n} `))) && (c = "prefixed", _ = v[1] || "", m = this._unescape(v[2]))), this._previousMarker === "^^")
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
      const L = I || v[0].length, A = s(c, m, _, h, L);
      this.previousToken = A, this._previousMarker = c, n = n.substr(L, n.length);
    }
    function s(a, l, h, p, c) {
      const m = n ? i - n.length : i, _ = m + c, v = { type: a, value: l, prefix: h, line: p, start: m, end: _ };
      return t(null, v), v;
    }
    function o(a) {
      t(a._syntaxError(/^\S*/.exec(n)[0]));
    }
  }
  // ### `_unescape` replaces N3 escape codes by their corresponding characters
  _unescape(t) {
    let r = !1;
    const n = t.replace(Gh, (i, s, o, a) => {
      if (typeof s == "string")
        return String.fromCharCode(Number.parseInt(s, 16));
      if (typeof o == "string") {
        let l = Number.parseInt(o, 16);
        return l <= 65535 ? String.fromCharCode(Number.parseInt(o, 16)) : String.fromCharCode(55296 + ((l -= 65536) >> 10), 56320 + (l & 1023));
      }
      return a in vl ? vl[a] : (r = !0, "");
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
        this._input !== null && n.length !== 0 && (this._pendingBuffer && (n = Wh.Buffer.concat([this._pendingBuffer, n]), this._pendingBuffer = null), n[n.length - 1] & 128 ? this._pendingBuffer = n : (typeof this._input > "u" ? this._input = this._readStartingBom(typeof n == "string" ? n : n.toString()) : this._input += n, this._tokenizeToEnd(r, !1)));
      }), t.on("end", () => {
        typeof this._input == "string" && this._tokenizeToEnd(r, !0);
      }), t.on("error", r);
  }
}
const { rdf: Zh, xsd: Yr } = Et;
let ki, ep = 0;
const tp = {
  namedNode: bu,
  blankNode: Tu,
  variable: Su,
  literal: vu,
  defaultGraph: sp,
  quad: Bo,
  triple: Bo,
  fromTerm: ri,
  fromQuad: Eu
};
class ar {
  constructor(t) {
    this.id = t;
  }
  // ### The value of this term
  get value() {
    return this.id;
  }
  // ### Returns whether this object represents the same term as the other
  equals(t) {
    return t instanceof ar ? this.id === t.id : !!t && this.termType === t.termType && this.value === t.value;
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
let gu = class extends ar {
  // ### The term type of this term
  get termType() {
    return "NamedNode";
  }
}, po = class _u extends ar {
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
    return new gu(this.datatypeString);
  }
  // ### The datatype string of this literal
  get datatypeString() {
    const t = this.id, r = t.lastIndexOf('"') + 1, n = r < t.length ? t[r] : "";
    return n === "^" ? t.substr(r + 2) : (
      // If "@" follows, return rdf:langString; xsd:string otherwise
      n !== "@" ? Yr.string : Zh.langString
    );
  }
  // ### Returns whether this object represents the same term as the other
  equals(t) {
    return t instanceof _u ? this.id === t.id : !!t && !!t.datatype && this.termType === t.termType && this.value === t.value && this.language === t.language && this.datatype.value === t.datatype.value;
  }
  toJSON() {
    return {
      termType: this.termType,
      value: this.value,
      language: this.language,
      datatype: { termType: "NamedNode", value: this.datatypeString }
    };
  }
}, rp = class extends ar {
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
}, np = class extends ar {
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
}, ip = class extends ar {
  constructor() {
    return super(""), ki || this;
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
ki = new ip();
let yu = class extends ar {
  constructor(t, r, n, i) {
    super(""), this._subject = t, this._predicate = r, this._object = n, this._graph = i || ki;
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
function bu(e) {
  return new gu(e);
}
function Tu(e) {
  return new rp(e || `n3-${ep++}`);
}
function vu(e, t) {
  if (typeof t == "string")
    return new po(`"${e}"@${t.toLowerCase()}`);
  let r = t ? t.value : "";
  return r === "" && (typeof e == "boolean" ? r = Yr.boolean : typeof e == "number" && (Number.isFinite(e) ? r = Number.isInteger(e) ? Yr.integer : Yr.double : (r = Yr.double, Number.isNaN(e) || (e = e > 0 ? "INF" : "-INF")))), r === "" || r === Yr.string ? new po(`"${e}"`) : new po(`"${e}"^^${r}`);
}
function Su(e) {
  return new np(e);
}
function sp() {
  return ki;
}
function Bo(e, t, r, n) {
  return new yu(e, t, r, n);
}
function ri(e) {
  if (e instanceof ar)
    return e;
  switch (e.termType) {
    case "NamedNode":
      return bu(e.value);
    case "BlankNode":
      return Tu(e.value);
    case "Variable":
      return Su(e.value);
    case "DefaultGraph":
      return ki;
    case "Literal":
      return vu(e.value, e.language || e.datatype);
    case "Quad":
      return Eu(e);
    default:
      throw new Error(`Unexpected termType: ${e.termType}`);
  }
}
function Eu(e) {
  if (e instanceof yu)
    return e;
  if (e.termType !== "Quad")
    throw new Error(`Unexpected termType: ${e.termType}`);
  return Bo(ri(e.subject), ri(e.predicate), ri(e.object), ri(e.graph));
}
let Sl = 0;
class wu {
  constructor(t) {
    this._contextStack = [], this._graph = null, t = t || {}, this._setBase(t.baseIRI), t.factory && Iu(this, t.factory);
    const r = typeof t.format == "string" ? t.format.match(/\w*$/)[0].toLowerCase() : "", n = /turtle/.test(r), i = /trig/.test(r), s = /triple/.test(r), o = /quad/.test(r), a = this._n3Mode = /n3/.test(r), l = s || o;
    (this._supportsNamedGraphs = !(n || a)) || (this._readPredicateOrNamedGraph = this._readPredicate), this._supportsQuads = !(n || i || s || a), this._isImpliedBy = t.isImpliedBy, this._supportsRDFStar = r === "" || /star|\*$/.test(r), l && (this._resolveRelativeIRI = (h) => null), this._blankNodePrefix = typeof t.blankNodePrefix != "string" ? "" : t.blankNodePrefix.replace(/^(?!_:)/, "_:"), this._lexer = t.lexer || new Jh({ lineMode: l, n3: a, isImpliedBy: this._isImpliedBy }), this._explicitQuantifiers = !!t.explicitQuantifiers;
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
      let h;
      if (this._callback = (p, c) => {
        p ? h = p : c && l.push(c);
      }, this._lexer.tokenize(t).every((p) => this._readCallback = this._readCallback(p)), h) throw h;
      return l;
    }
    let a = (l, h) => {
      l !== null ? (this._callback(l), this._callback = Wi) : this._readCallback && (this._readCallback = this._readCallback(h));
    };
    o && (this._lexer.comments = !0, a = (l, h) => {
      l !== null ? (this._callback(l), this._callback = Wi) : this._readCallback && (h.type === "comment" ? o(h.value) : this._readCallback = this._readCallback(h));
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
Iu(wu.prototype, tp);
var Gi = { exports: {} }, El;
function op() {
  if (El) return Gi.exports;
  El = 1;
  var e = typeof Reflect == "object" ? Reflect : null, t = e && typeof e.apply == "function" ? e.apply : function(S, C, D) {
    return Function.prototype.apply.call(S, C, D);
  }, r;
  e && typeof e.ownKeys == "function" ? r = e.ownKeys : Object.getOwnPropertySymbols ? r = function(S) {
    return Object.getOwnPropertyNames(S).concat(Object.getOwnPropertySymbols(S));
  } : r = function(S) {
    return Object.getOwnPropertyNames(S);
  };
  function n(T) {
    console && console.warn && console.warn(T);
  }
  var i = Number.isNaN || function(S) {
    return S !== S;
  };
  function s() {
    s.init.call(this);
  }
  Gi.exports = s, Gi.exports.once = L, s.EventEmitter = s, s.prototype._events = void 0, s.prototype._eventsCount = 0, s.prototype._maxListeners = void 0;
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
  }, s.prototype.setMaxListeners = function(S) {
    if (typeof S != "number" || S < 0 || i(S))
      throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + S + ".");
    return this._maxListeners = S, this;
  };
  function l(T) {
    return T._maxListeners === void 0 ? s.defaultMaxListeners : T._maxListeners;
  }
  s.prototype.getMaxListeners = function() {
    return l(this);
  }, s.prototype.emit = function(S) {
    for (var C = [], D = 1; D < arguments.length; D++) C.push(arguments[D]);
    var j = S === "error", b = this._events;
    if (b !== void 0)
      j = j && b.error === void 0;
    else if (!j)
      return !1;
    if (j) {
      var w;
      if (C.length > 0 && (w = C[0]), w instanceof Error)
        throw w;
      var P = new Error("Unhandled error." + (w ? " (" + w.message + ")" : ""));
      throw P.context = w, P;
    }
    var R = b[S];
    if (R === void 0)
      return !1;
    if (typeof R == "function")
      t(R, this, C);
    else
      for (var Q = R.length, Y = v(R, Q), D = 0; D < Q; ++D)
        t(Y[D], this, C);
    return !0;
  };
  function h(T, S, C, D) {
    var j, b, w;
    if (a(C), b = T._events, b === void 0 ? (b = T._events = /* @__PURE__ */ Object.create(null), T._eventsCount = 0) : (b.newListener !== void 0 && (T.emit(
      "newListener",
      S,
      C.listener ? C.listener : C
    ), b = T._events), w = b[S]), w === void 0)
      w = b[S] = C, ++T._eventsCount;
    else if (typeof w == "function" ? w = b[S] = D ? [C, w] : [w, C] : D ? w.unshift(C) : w.push(C), j = l(T), j > 0 && w.length > j && !w.warned) {
      w.warned = !0;
      var P = new Error("Possible EventEmitter memory leak detected. " + w.length + " " + String(S) + " listeners added. Use emitter.setMaxListeners() to increase limit");
      P.name = "MaxListenersExceededWarning", P.emitter = T, P.type = S, P.count = w.length, n(P);
    }
    return T;
  }
  s.prototype.addListener = function(S, C) {
    return h(this, S, C, !1);
  }, s.prototype.on = s.prototype.addListener, s.prototype.prependListener = function(S, C) {
    return h(this, S, C, !0);
  };
  function p() {
    if (!this.fired)
      return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
  }
  function c(T, S, C) {
    var D = { fired: !1, wrapFn: void 0, target: T, type: S, listener: C }, j = p.bind(D);
    return j.listener = C, D.wrapFn = j, j;
  }
  s.prototype.once = function(S, C) {
    return a(C), this.on(S, c(this, S, C)), this;
  }, s.prototype.prependOnceListener = function(S, C) {
    return a(C), this.prependListener(S, c(this, S, C)), this;
  }, s.prototype.removeListener = function(S, C) {
    var D, j, b, w, P;
    if (a(C), j = this._events, j === void 0)
      return this;
    if (D = j[S], D === void 0)
      return this;
    if (D === C || D.listener === C)
      --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete j[S], j.removeListener && this.emit("removeListener", S, D.listener || C));
    else if (typeof D != "function") {
      for (b = -1, w = D.length - 1; w >= 0; w--)
        if (D[w] === C || D[w].listener === C) {
          P = D[w].listener, b = w;
          break;
        }
      if (b < 0)
        return this;
      b === 0 ? D.shift() : I(D, b), D.length === 1 && (j[S] = D[0]), j.removeListener !== void 0 && this.emit("removeListener", S, P || C);
    }
    return this;
  }, s.prototype.off = s.prototype.removeListener, s.prototype.removeAllListeners = function(S) {
    var C, D, j;
    if (D = this._events, D === void 0)
      return this;
    if (D.removeListener === void 0)
      return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : D[S] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete D[S]), this;
    if (arguments.length === 0) {
      var b = Object.keys(D), w;
      for (j = 0; j < b.length; ++j)
        w = b[j], w !== "removeListener" && this.removeAllListeners(w);
      return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
    }
    if (C = D[S], typeof C == "function")
      this.removeListener(S, C);
    else if (C !== void 0)
      for (j = C.length - 1; j >= 0; j--)
        this.removeListener(S, C[j]);
    return this;
  };
  function m(T, S, C) {
    var D = T._events;
    if (D === void 0)
      return [];
    var j = D[S];
    return j === void 0 ? [] : typeof j == "function" ? C ? [j.listener || j] : [j] : C ? k(j) : v(j, j.length);
  }
  s.prototype.listeners = function(S) {
    return m(this, S, !0);
  }, s.prototype.rawListeners = function(S) {
    return m(this, S, !1);
  }, s.listenerCount = function(T, S) {
    return typeof T.listenerCount == "function" ? T.listenerCount(S) : _.call(T, S);
  }, s.prototype.listenerCount = _;
  function _(T) {
    var S = this._events;
    if (S !== void 0) {
      var C = S[T];
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
  function v(T, S) {
    for (var C = new Array(S), D = 0; D < S; ++D)
      C[D] = T[D];
    return C;
  }
  function I(T, S) {
    for (; S + 1 < T.length; S++)
      T[S] = T[S + 1];
    T.pop();
  }
  function k(T) {
    for (var S = new Array(T.length), C = 0; C < S.length; ++C)
      S[C] = T[C].listener || T[C];
    return S;
  }
  function L(T, S) {
    return new Promise(function(C, D) {
      function j(w) {
        T.removeListener(S, b), D(w);
      }
      function b() {
        typeof T.removeListener == "function" && T.removeListener("error", j), C([].slice.call(arguments));
      }
      x(T, S, b, { once: !0 }), S !== "error" && A(T, j, { once: !0 });
    });
  }
  function A(T, S, C) {
    typeof T.on == "function" && x(T, "error", S, C);
  }
  function x(T, S, C, D) {
    if (typeof T.on == "function")
      D.once ? T.once(S, C) : T.on(S, C);
    else if (typeof T.addEventListener == "function")
      T.addEventListener(S, function j(b) {
        D.once && T.removeEventListener(S, j), C(b);
      });
    else
      throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof T);
  }
  return Gi.exports;
}
var vr = {}, Nn = {}, An = {}, mo = {}, Rn = {}, wl;
function ap() {
  if (wl) return Rn;
  wl = 1, Object.defineProperty(Rn, "__esModule", { value: !0 }), Rn.LinkedList = void 0;
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
var Cn = {};
let go = 1;
const pa = /* @__PURE__ */ new Map();
let _o = !1, ma, xu = (e, ...t) => (pa.set(go, [e, t]), ma(go), go++), ga = (e) => {
  pa.delete(e);
};
function _a(e) {
  if (_o)
    setTimeout(_a, 0, e);
  else {
    const t = pa.get(e);
    if (t) {
      _o = !0;
      try {
        t[0](...t[1]);
      } finally {
        ga(e), _o = !1;
      }
    }
  }
}
function lp() {
  const e = new MessageChannel();
  e.port1.onmessage = (t) => {
    _a(t.data);
  }, ma = (t) => {
    e.port2.postMessage(t);
  };
}
function cp() {
  const e = `setImmediate$${Math.random()}$`;
  window.addEventListener("message", (t) => {
    typeof t.data == "string" && t.data.startsWith(e) && _a(+t.data.slice(e.length));
  }), ma = (t) => {
    window.postMessage(e + t, "*");
  };
}
const zi = typeof self > "u" ? typeof global > "u" ? void 0 : global : self;
zi.setImmediate ? (xu = zi.setImmediate, ga = zi.clearImmediate) : zi.importScripts ? lp() : cp();
const up = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get clearImmediate() {
    return ga;
  },
  get setImmediate() {
    return xu;
  }
}, Symbol.toStringTag, { value: "Module" })), fp = /* @__PURE__ */ Qh(up);
var Il;
function dp() {
  if (Il) return Cn;
  Il = 1, Object.defineProperty(Cn, "__esModule", { value: !0 }), Cn.createTaskScheduler = void 0;
  const e = fp, t = Promise.resolve(void 0);
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
  return Cn.createTaskScheduler = r, Cn;
}
var xl;
function hp() {
  return xl || (xl = 1, (function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.isIterator = e.isIterable = e.isSourceExpression = e.isPromise = e.isEventEmitter = e.isFunction = e.range = e.union = e.fromIterable = e.fromIterator = e.fromArray = e.single = e.empty = e.wrap = e.WrappingIterator = e.ClonedIterator = e.UnionIterator = e.MultiTransformIterator = e.SimpleTransformIterator = e.TransformIterator = e.BufferedIterator = e.MappingIterator = e.DESTINATION = e.identity = e.IntegerIterator = e.ArrayIterator = e.SingletonIterator = e.EmptyIterator = e.AsyncIterator = e.DESTROYED = e.ENDED = e.CLOSED = e.CLOSING = e.OPEN = e.INIT = e.setTaskScheduler = e.getTaskScheduler = e.scheduleTask = e.LinkedList = void 0;
    const t = op(), r = /* @__PURE__ */ ap();
    Object.defineProperty(e, "LinkedList", { enumerable: !0, get: function() {
      return r.LinkedList;
    } });
    let i = (/* @__PURE__ */ dp()).createTaskScheduler();
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
        super(), this._readable = !1, this._state = f, this.on("newListener", h);
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
      _changeState(f, g = !1) {
        const N = f > this._state && this._state < e.ENDED;
        return N && (this._state = f, f === e.ENDED && (g ? i(() => this.emit("end")) : this.emit("end"))), N;
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
      forEach(f, g) {
        this.on("data", $t(f, g));
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
        this.done || this._destroy(f, (g) => {
          f = f || g, f && this.emit("error", f), this._end(!0);
        });
      }
      /**
        Called by {@link module:asynciterator.AsyncIterator#destroy}.
        Implementers can override this, but this should not be called directly.
        @param {?Error} cause The reason why the iterator is destroyed.
        @param {Function} callback A callback function with an optional error argument.
      */
      _destroy(f, g) {
        g();
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
        const g = [], N = typeof (f == null ? void 0 : f.limit) == "number" ? f.limit : 1 / 0;
        return this.ended || N <= 0 ? Promise.resolve(g) : new Promise((F, U) => {
          const H = () => F(g), X = (O) => {
            g.push(O), g.length >= N && (this.removeListener("error", U), this.removeListener("data", X), this.removeListener("end", H), F(g));
          };
          this.on("error", U), this.on("data", X), this.on("end", H);
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
      getProperty(f, g) {
        const N = this._properties;
        if (!g)
          return N && N[f];
        if (N && f in N)
          i(() => g(N[f]));
        else {
          let F;
          (F = this._propertyCallbacks) || (this._propertyCallbacks = F = /* @__PURE__ */ Object.create(null)), f in F ? F[f].push(g) : F[f] = [g];
        }
      }
      /**
        Sets the property with the given name to the value.
        @param {string} propertyName The name of the property to set
        @param {object?} value The new value of the property
      */
      setProperty(f, g) {
        const N = this._properties || (this._properties = /* @__PURE__ */ Object.create(null));
        N[f] = g;
        const F = this._propertyCallbacks || {}, U = F[f];
        if (U) {
          delete F[f], i(() => {
            for (const H of U)
              H(g);
          });
          for (f in F)
            return;
          delete this._propertyCallbacks;
        }
      }
      /**
        Retrieves all properties of the iterator.
        @returns {object} An object with property names as keys.
      */
      getProperties() {
        const f = this._properties, g = {};
        for (const N in f)
          g[N] = f[N];
        return g;
      }
      /**
        Sets all of the given properties.
        @param {object} properties Key/value pairs of properties to set
      */
      setProperties(f) {
        for (const g in f)
          this.setProperty(g, f[g]);
      }
      /**
        Copies the given properties from the source iterator.
        @param {module:asynciterator.AsyncIterator} source The iterator to copy from
        @param {Array} propertyNames List of property names to copy
      */
      copyProperties(f, g) {
        for (const N of g)
          f.getProperty(N, (F) => this.setProperty(N, F));
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
        return new w(this, f);
      }
      /**
        Maps items from this iterator using the given function.
        After this operation, only read the returned iterator instead of the current one.
        @param {Function} map A mapping function to call on this iterator's (remaining) items
        @param {object?} self The `this` pointer for the mapping function
        @returns {module:asynciterator.AsyncIterator} A new iterator that maps the items from this iterator
      */
      map(f, g) {
        return new L(this, $t(f, g));
      }
      filter(f, g) {
        return this.map(function(N) {
          return f.call(g || this, N) ? N : null;
        });
      }
      /**
       * Returns a new iterator containing all of the unique items in the original iterator.
       * @param by - The derived value by which to determine uniqueness (e.g., stringification).
                     Defaults to the identity function.
       * @returns An iterator with duplicates filtered out.
       */
      uniq(f = k) {
        const g = /* @__PURE__ */ new Set();
        return this.filter(function(N) {
          const F = f.call(this, N);
          return g.has(F) ? !1 : (g.add(F), !0);
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
      surround(f, g) {
        return this.transform({ prepend: f, append: g });
      }
      /**
        Skips the given number of items from the current iterator.
        The current iterator may not be read anymore until the returned iterator ends.
        @param {integer} offset The number of items to skip
        @returns {module:asynciterator.AsyncIterator} A new iterator that skips the given number of items
      */
      skip(f) {
        return this.map((g) => f-- > 0 ? null : g);
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
      range(f, g) {
        return this.transform({ offset: f, limit: Math.max(g - f + 1, 0) });
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
        let g = null, N = null, F = null;
        f.addListener("readable", U), f.addListener("end", U), f.addListener("error", H);
        function U() {
          if (g !== null)
            if (F !== null)
              H(F);
            else if (f.done)
              g({ done: !0, value: void 0 }), g = N = null, X();
            else {
              const O = f.read();
              O !== null && (g({ done: !1, value: O }), g = N = null);
            }
        }
        function H(O) {
          N !== null ? (N(O), g = N = F = null, X()) : F === null && (F = O);
        }
        function X() {
          f.removeListener("readable", U), f.removeListener("end", U), f.removeListener("error", H);
        }
        return {
          next() {
            return new Promise((O, $) => {
              g = O, N = $, U();
            });
          }
        };
      }
    }
    e.AsyncIterator = l;
    function h(G) {
      G === "data" && (this.removeListener("newListener", h), c(this, "readable", p), this.readable && i(() => p.call(this)));
    }
    function p() {
      let G;
      for (; this.listenerCount("data") !== 0 && (G = this.read()) !== null; )
        this.emit("data", G);
      this.listenerCount("data") === 0 && !this.done && (this.removeListener("readable", p), c(this, "newListener", h));
    }
    function c(G, f, g) {
      G.listeners(f).includes(g) || G.on(f, g);
    }
    class m extends l {
      /** Creates a new `EmptyIterator`. */
      constructor() {
        super(), this._changeState(e.ENDED, !0);
      }
    }
    e.EmptyIterator = m;
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
    class v extends l {
      /**
        Creates a new `ArrayIterator`.
        @param {Array} items The items that will be emitted.
        @param {boolean} [options.autoStart=true] Whether buffering starts directly after construction
        @param {boolean} [options.preserve=true] If false, the passed array can be safely modified
      */
      constructor(f = [], { autoStart: g = !0, preserve: N = !0 } = {}) {
        super();
        const F = N || !Array.isArray(f) ? [...f] : f;
        this._index = 0, this._sourceStarted = g !== !1, this._truncateThreshold = N ? -1 : 64, this._sourceStarted && F.length === 0 ? this.close() : this._buffer = F, this.readable = !0;
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
      _destroy(f, g) {
        delete this._buffer, g();
      }
      /**
       Consume all remaining items of the iterator into an array that will be returned asynchronously.
       @param {object} [options] Settings for array creation
       @param {integer} [options.limit] The maximum number of items to place in the array.
       */
      toArray(f = {}) {
        if (!this._buffer)
          return Promise.resolve([]);
        const { length: g } = this._buffer, N = this._index, F = typeof f.limit != "number" ? g : N + f.limit, U = this._buffer.slice(N, F);
        return this._index = F, F >= g && this.close(), Promise.resolve(U);
      }
    }
    e.ArrayIterator = v;
    class I extends l {
      /**
        Creates a new `IntegerIterator`.
        @param {object} [options] Settings of the iterator
        @param {integer} [options.start=0] The first number to emit
        @param {integer} [options.end=Infinity] The last number to emit
        @param {integer} [options.step=1] The increment between two numbers
      */
      constructor({ start: f = 0, step: g = 1, end: N } = {}) {
        super(), Number.isFinite(f) && (f = Math.trunc(f)), this._next = f, Number.isFinite(g) && (g = Math.trunc(g)), this._step = g;
        const F = g >= 0, U = F ? 1 / 0 : -1 / 0;
        Number.isFinite(N) ? N = Math.trunc(N) : N !== -U && (N = U), this._last = N, !Number.isFinite(f) || (F ? f > N : f < N) ? this.close() : this.readable = !0;
      }
      /* Reads an item from the iterator. */
      read() {
        if (this.closed)
          return null;
        const f = this._next, g = this._step, N = this._last, F = this._next += g;
        return (g >= 0 ? F > N : F < N) && this.close(), f;
      }
      /* Generates details for a textual representation of the iterator. */
      _toStringDetails() {
        return `(${this._next}...${this._last})`;
      }
    }
    e.IntegerIterator = I;
    function k(G) {
      return G;
    }
    e.identity = k, e.DESTINATION = Symbol("destination");
    class L extends l {
      /**
       * Applies the given mapping to the source iterator.
       */
      constructor(f, g = k, N = {}) {
        super(), this._map = g, this._source = A(f), this._destroySource = N.destroySource !== !1, f.done ? this.close() : (this._source[e.DESTINATION] = this, this._source.on("end", D), this._source.on("error", C), this._source.on("readable", S), this.readable = this._source.readable);
      }
      /* Tries to read the next item from the iterator. */
      read() {
        if (!this.done) {
          if (this._source.readable) {
            let f, g;
            for (; (f = this._source.read()) !== null; )
              if ((g = this._map(f)) !== null)
                return g;
          }
          this.readable = !1, this._source.done && this.close();
        }
        return null;
      }
      /* Cleans up the source iterator and ends. */
      _end(f) {
        this._source.removeListener("end", D), this._source.removeListener("error", C), this._source.removeListener("readable", S), delete this._source[e.DESTINATION], this._destroySource && this._source.destroy(), super._end(f);
      }
    }
    e.MappingIterator = L;
    function A(G, f = !1) {
      if (!G || !we(G.read) || !we(G.on))
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
      constructor({ maxBufferSize: f = 4, autoStart: g = !0 } = {}) {
        super(e.INIT), this._buffer = new r.LinkedList(), this._maxBufferSize = 4, this._reading = !0, this._pushedCount = 0, this.maxBufferSize = f, i(() => this._init(g)), this._sourceStarted = g !== !1;
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
        let g = !1;
        this._reading = !0, this._begin(() => {
          if (g)
            throw new Error("done callback called multiple times");
          g = !0, this._reading = !1, this._changeState(e.OPEN), f ? this._fillBufferAsync() : this.readable = !0;
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
        let g;
        return f.empty ? (g = null, this.readable = !1) : g = f.shift(), !this._reading && f.length < this._maxBufferSize && (this.closed ? f.empty && this._endAsync() : this._fillBufferAsync()), g;
      }
      /**
        Tries to generate the given number of items.
        Implementers should add `count` items through {@link BufferedIterator#_push}.
        @protected
        @param {integer} count The number of items to generate
        @param {function} done To be called when reading is complete
      */
      _read(f, g) {
        g();
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
      _destroy(f, g) {
        this._buffer.clear(), g();
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
      constructor(f, g = f || {}) {
        super(g), this._boundPush = (N) => this._push(N), mt(f) || (f = g.source), $e(f) ? this.source = f : f && (this._createSource = Fe(f) ? () => f : f, this._sourceStarted && this._loadSourceAsync()), this._optional = !!g.optional, this._destroySource = g.destroySource !== !1;
      }
      /**
        The source this iterator generates items from.
        @type module:asynciterator.AsyncIterator
      */
      get source() {
        return we(this._createSource) && this._loadSourceAsync(), this._source;
      }
      set source(f) {
        const g = this._source = this._validateSource(f);
        g[e.DESTINATION] = this, this.done ? this._destroySource && g.destroy() : g.done ? this.close() : (g.on("end", j), g.on("readable", b), g.on("error", C));
      }
      /**
        Initializes a source that was set through a promise
        @protected
      */
      _loadSourceAsync() {
        we(this._createSource) && (Promise.resolve(this._createSource()).then((f) => {
          delete this._createSource, this.source = f, this._fillBuffer();
        }, (f) => this.emit("error", f)), this._createSource = null);
      }
      /**
        Validates whether the given iterator can be used as a source.
        @protected
        @param {object} source The source to validate
        @param {boolean} allowDestination Whether the source can already have a destination
      */
      _validateSource(f, g = !1) {
        if (this._source || typeof this._createSource < "u")
          throw new Error("The source cannot be changed after it has been set");
        return A(f, g);
      }
      /**
        Tries to read transformed items.
      */
      _read(f, g) {
        const N = () => {
          this._pushedCount < f && !this.closed ? i(() => this._readAndTransform(N, g)) : g();
        };
        this._readAndTransform(N, g);
      }
      /**
        Reads a transforms an item
      */
      _readAndTransform(f, g) {
        let N;
        const F = this.source;
        !F || F.done || (N = F.read()) === null ? g() : this._optional ? this._optionalTransform(N, f) : this._transform(N, f, this._boundPush);
      }
      /**
        Tries to transform the item;
        if the transformation yields no items, pushes the original item.
      */
      _optionalTransform(f, g) {
        const N = this._pushedCount;
        this._transform(f, () => {
          N === this._pushedCount && this._push(f), g();
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
      _transform(f, g, N) {
        N(f), g();
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
        const g = this._source;
        g && (g.removeListener("end", j), g.removeListener("error", C), g.removeListener("readable", b), delete g[e.DESTINATION], this._destroySource && g.destroy()), super._end(f);
      }
    }
    e.TransformIterator = T;
    function S() {
      this[e.DESTINATION].readable = !0;
    }
    function C(G) {
      this[e.DESTINATION].emit("error", G);
    }
    function D() {
      this[e.DESTINATION].close();
    }
    function j() {
      this[e.DESTINATION]._closeWhenDone();
    }
    function b() {
      this[e.DESTINATION]._sourceStarted !== !1 && this[e.DESTINATION]._fillBuffer();
    }
    class w extends T {
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
      constructor(f, g) {
        if (super(f, g), this._offset = 0, this._limit = 1 / 0, this._filter = (N) => !0, g = g || (mt(f) ? null : f), g) {
          const N = we(g) ? g : g.transform, { limit: F, offset: U, filter: H, map: X, prepend: O, append: $ } = g;
          U === 1 / 0 || F === -1 / 0 ? this._limit = 0 : (Number.isFinite(U) && (this._offset = Math.max(Math.trunc(U), 0)), Number.isFinite(F) && (this._limit = Math.max(Math.trunc(F), 0)), we(H) && (this._filter = H), we(X) && (this._map = X), this._transform = we(N) ? N : null), O && (this._prepender = $e(O) ? O : se(O)), $ && (this._appender = $e($) ? $ : se($));
        }
      }
      /* Tries to read and transform items */
      _read(f, g) {
        const N = () => this._readAndTransformSimple(f, F, g);
        this._readAndTransformSimple(f, F, g);
        function F() {
          i(N);
        }
      }
      /* Reads and transform items */
      _readAndTransformSimple(f, g, N) {
        let F;
        const { source: U } = this;
        if (!U || U.done) {
          N();
          return;
        }
        for (this._limit === 0 && this.close(); !this.closed && this._pushedCount < f && (F = U.read()) !== null; ) {
          if (!this._filter(F) || this._offset !== 0 && this._offset--)
            continue;
          const H = typeof this._map > "u" ? F : this._map(F);
          if (H === null)
            this._optional && this._push(F);
          else if (!we(this._transform))
            this._push(H);
          else {
            this._optional ? this._optionalTransform(H, g) : this._transform(H, g, this._boundPush);
            return;
          }
          --this._limit === 0 && this.close();
        }
        N();
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
      _insert(f, g) {
        const N = (U) => this._push(U);
        !f || f.done ? g() : (f.on("data", N), f.on("end", F));
        function F() {
          f.removeListener("data", N), f.removeListener("end", F), g();
        }
      }
    }
    e.SimpleTransformIterator = w;
    class P extends T {
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
      constructor(f, g) {
        if (super(f, g), this._transformerQueue = [], g) {
          const N = we(g) ? g : g.multiTransform;
          N && (this._createTransformer = N);
        }
      }
      /* Tries to read and transform items */
      _read(f, g) {
        const N = this._transformerQueue, F = this._optional;
        let U, H;
        for (; (U = N[0]) && U.transformer.done; ) {
          F && U.item !== null && (f--, this._push(U.item)), N.shift();
          const { transformer: O } = U;
          O.removeListener("end", b), O.removeListener("readable", b), O.removeListener("error", C);
        }
        const { source: X } = this;
        for (; X && !X.done && N.length < this.maxBufferSize && (H = X.read(), H !== null); ) {
          const O = this._createTransformer(H) || new m();
          O[e.DESTINATION] = this, O.on("end", b), O.on("readable", b), O.on("error", C), N.push({ transformer: O, item: H });
        }
        if (U = N[0], U) {
          const { transformer: O } = U;
          for (; f-- > 0 && (H = O.read()) !== null; )
            this._push(H), F && (U.item = null);
        } else X && X.done && this.close();
        g();
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
          for (const g of this._transformerQueue)
            g.transformer.destroy();
      }
    }
    e.MultiTransformIterator = P;
    class R extends x {
      /**
        Creates a new `UnionIterator`.
        @param {module:asynciterator.AsyncIterator|Array} [sources] The sources to read from
        @param {object} [options] Settings of the iterator
        @param {boolean} [options.destroySource=true] Whether the sources should be destroyed when transformed iterator is closed or destroyed
      */
      constructor(f, g = {}) {
        super(g), this._sources = [], this._currentSource = -1;
        const N = g.autoStart !== !1;
        if ($e(f))
          f.on("error", (F) => this.emit("error", F)), this._pending = { loading: !1, sources: f }, N && this._loadSources();
        else if (Array.isArray(f) && f.length > 0)
          for (const F of f)
            this._addSource(F);
        else N && this.close();
        this._destroySources = g.destroySources !== !1;
      }
      // Loads pending sources into the sources list
      _loadSources() {
        const f = this._pending.sources;
        this._pending.loading = !0, f.done ? (delete this._pending, this.close()) : (f.on("data", (g) => {
          this._addSource(g), this._fillBufferAsync();
        }), f.on("end", () => {
          delete this._pending, this._fillBuffer();
        }));
      }
      // Adds the given source to the internal sources array
      _addSource(f) {
        Fe(f) && (f = ne(f)), f.done || (this._sources.push(f), f[e.DESTINATION] = this, f.on("error", C), f.on("readable", b), f.on("end", Q));
      }
      // Removes sources that will no longer emit items
      _removeEmptySources() {
        this._sources = this._sources.filter((f, g) => (f.done && g <= this._currentSource && this._currentSource--, !f.done)), this._fillBuffer();
      }
      // Reads items from the next sources
      _read(f, g) {
        var N;
        ((N = this._pending) === null || N === void 0 ? void 0 : N.loading) === !1 && this._loadSources();
        let F = 0, U;
        for (; F !== (F = f); )
          for (let H = 0; H < this._sources.length && f > 0; H++)
            this._currentSource = (this._currentSource + 1) % this._sources.length, (U = this._sources[this._currentSource].read()) !== null && (f--, this._push(U));
        !this._pending && this._sources.length === 0 && this.close(), g();
      }
      _end(f = !1) {
        if (super._end(f), this._destroySources) {
          for (const g of this._sources)
            g.destroy();
          this._pending && (this._pending.sources.destroy(), delete this._pending);
        }
      }
    }
    e.UnionIterator = R;
    function Q() {
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
        const g = this._source = this._validateSource(f), N = g && g[e.DESTINATION] || (g[e.DESTINATION] = new Z(g));
        this.done ? this._destroySource && g.destroy() : N.endsAt(0) ? this.close() : (N.register(this), (g._sourceStarted === !1 || N.readAt(0) !== null) && (this.readable = !0));
        const F = this._propertyCallbacks;
        for (const U in F) {
          const H = F[U];
          for (const X of H)
            this._getSourceProperty(U, X);
        }
      }
      /**
        Validates whether the given iterator can be used as a source.
        @protected
        @param {object} source The source to validate
        @param {boolean} allowDestination Whether the source can already have a destination
      */
      _validateSource(f, g = !1) {
        const N = f && f[e.DESTINATION];
        return super._validateSource(f, !N || N instanceof Z);
      }
      // Retrieves the property with the given name from the clone or its source.
      getProperty(f, g) {
        const { source: N } = this, F = this._properties, U = F && f in F;
        if (!g)
          return U ? F && F[f] : N && N.getProperty(f);
        super.getProperty(f, g), N && !U && this._getSourceProperty(f, g);
      }
      // Retrieves the property with the given name from the source
      _getSourceProperty(f, g) {
        this.source.getProperty(f, (N) => {
          (!this._properties || !(f in this._properties)) && g(N);
        });
      }
      // Retrieves all properties of the iterator and its source.
      getProperties() {
        const f = this.source ? this.source.getProperties() : {}, g = this._properties;
        for (const N in g)
          f[N] = g[N];
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
        let g = null;
        if (!this.done && f) {
          const N = f[e.DESTINATION];
          (g = N.readAt(this._readPosition)) !== null ? this._readPosition++ : this.readable = !1, N.endsAt(this._readPosition) && this.close();
        }
        return g;
      }
      /* End the iterator and cleans up. */
      _end(f) {
        const g = this.source, N = g == null ? void 0 : g[e.DESTINATION];
        N && N.unregister(this), x.prototype._end.call(this, f);
      }
    }
    e.ClonedIterator = Y;
    class Z {
      constructor(f) {
        if (this._history = [], this._trackers = /* @__PURE__ */ new Set(), this._source = f, !f.done) {
          const g = () => {
            for (const U of this._trackers)
              U.readable = !0;
          }, N = (U) => {
            for (const H of this._trackers)
              H.emit("error", U);
          }, F = () => {
            for (const U of this._trackers)
              U._sourceStarted !== !1 && U._readPosition === this._history.length && U.close();
            this._trackers.clear(), f.removeListener("end", F), f.removeListener("error", N), f.removeListener("readable", g);
          };
          f.on("end", F), f.on("error", N), f.on("readable", g);
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
        let g = null;
        return f < this._history.length ? g = this._history[f] : !this._source.done && (g = this._source.read()) !== null && (this._history[f] = g), g;
      }
      // Determines whether the given position is the end of the source
      endsAt(f) {
        return this._source.done && this._history.length === f;
      }
    }
    class z extends l {
      constructor(f, g) {
        super(), this._source = null, this._destroySource = (g == null ? void 0 : g.destroySource) !== !1, Fe(f) ? (this._source = new l(), f.then((N) => {
          this._source = null, this.source = N;
        }).catch((N) => this.emit("error", N))) : f && (this.source = f);
      }
      set source(f) {
        let g = f;
        if (this._source !== null)
          throw new Error("The source cannot be changed after it has been set");
        if (et(g) && (g = g[Symbol.iterator]()), vt(g)) {
          let N = g;
          g = new t.EventEmitter(), g.read = () => {
            if (N !== null) {
              let F;
              for (; !(F = N.next()).done; )
                if (F.value !== null)
                  return F.value;
              N = null, this.close();
            }
            return null;
          };
        } else
          g = A(g);
        if (this.done) {
          this._destroySource && we(g.destroy) && g.destroy();
          return;
        }
        g[e.DESTINATION] = this, g.on("end", D), g.on("error", C), g.on("readable", S), this._source = g, this.readable = g.readable !== !1;
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
        this._source !== null && (this._source.removeListener("end", D), this._source.removeListener("error", C), this._source.removeListener("readable", S), delete this._source[e.DESTINATION], this._destroySource && we(this._source.destroy) && this._source.destroy(), this._source = null), super._end(f);
      }
    }
    e.WrappingIterator = z;
    function ne(G, f) {
      if (f && ("autoStart" in f || "optional" in f || "source" in f || "maxBufferSize" in f))
        return G && !$e(G) && (G = new z(G)), new T(G, f);
      if (!G)
        return re();
      if (Fe(G))
        return new z(G, f);
      if (G instanceof l)
        return G;
      if (Array.isArray(G))
        return se(G);
      if (et(G) || vt(G) || $e(G))
        return new z(G, f);
      throw new TypeError(`Invalid source: ${G}`);
    }
    e.wrap = ne;
    function re() {
      return new m();
    }
    e.empty = re;
    function _e(G) {
      return new _(G);
    }
    e.single = _e;
    function se(G) {
      return new v(G);
    }
    e.fromArray = se;
    function ie(G) {
      return new z(G);
    }
    e.fromIterator = ie;
    function me(G) {
      return new z(G);
    }
    e.fromIterable = me;
    function Ut(G) {
      return new R(G);
    }
    e.union = Ut;
    function Ot(G, f, g) {
      return new I({ start: G, end: f, step: g });
    }
    e.range = Ot;
    function $t(G, f) {
      return f ? G.bind(f) : G;
    }
    function we(G) {
      return typeof G == "function";
    }
    e.isFunction = we;
    function $e(G) {
      return we(G == null ? void 0 : G.on);
    }
    e.isEventEmitter = $e;
    function Fe(G) {
      return we(G == null ? void 0 : G.then);
    }
    e.isPromise = Fe;
    function mt(G) {
      return G && ($e(G) || Fe(G) || we(G));
    }
    e.isSourceExpression = mt;
    function et(G) {
      return G && Symbol.iterator in G;
    }
    e.isIterable = et;
    function vt(G) {
      return we(G == null ? void 0 : G.next);
    }
    e.isIterator = vt;
  })(mo)), mo;
}
var Sr = {}, On = {}, Nl;
function Nu() {
  if (Nl) return On;
  Nl = 1, Object.defineProperty(On, "__esModule", { value: !0 }), On.BlankNode = void 0;
  let e = class {
    constructor(r) {
      this.termType = "BlankNode", this.value = r;
    }
    equals(r) {
      return !!r && r.termType === "BlankNode" && r.value === this.value;
    }
  };
  return On.BlankNode = e, On;
}
var Pn = {}, Mn = {}, Al;
function Au() {
  if (Al) return Mn;
  Al = 1, Object.defineProperty(Mn, "__esModule", { value: !0 }), Mn.DefaultGraph = void 0;
  let e = class {
    constructor() {
      this.termType = "DefaultGraph", this.value = "";
    }
    equals(r) {
      return !!r && r.termType === "DefaultGraph";
    }
  };
  return Mn.DefaultGraph = e, e.INSTANCE = new e(), Mn;
}
var Dn = {}, kn = {}, Rl;
function ya() {
  if (Rl) return kn;
  Rl = 1, Object.defineProperty(kn, "__esModule", { value: !0 }), kn.NamedNode = void 0;
  let e = class {
    constructor(r) {
      this.termType = "NamedNode", this.value = r;
    }
    equals(r) {
      return !!r && r.termType === "NamedNode" && r.value === this.value;
    }
  };
  return kn.NamedNode = e, kn;
}
var Cl;
function Ru() {
  if (Cl) return Dn;
  Cl = 1, Object.defineProperty(Dn, "__esModule", { value: !0 }), Dn.Literal = void 0;
  const e = ya();
  let t = class ni {
    constructor(n, i) {
      this.termType = "Literal", this.value = n, typeof i == "string" ? (this.language = i, this.datatype = ni.RDF_LANGUAGE_STRING, this.direction = "") : i ? "termType" in i ? (this.language = "", this.datatype = i, this.direction = "") : (this.language = i.language, this.datatype = i.direction ? ni.RDF_DIRECTIONAL_LANGUAGE_STRING : ni.RDF_LANGUAGE_STRING, this.direction = i.direction || "") : (this.language = "", this.datatype = ni.XSD_STRING, this.direction = "");
    }
    equals(n) {
      return !!n && n.termType === "Literal" && n.value === this.value && n.language === this.language && (n.direction === this.direction || !n.direction && this.direction === "") && this.datatype.equals(n.datatype);
    }
  };
  return Dn.Literal = t, t.RDF_LANGUAGE_STRING = new e.NamedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#langString"), t.RDF_DIRECTIONAL_LANGUAGE_STRING = new e.NamedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#dirLangString"), t.XSD_STRING = new e.NamedNode("http://www.w3.org/2001/XMLSchema#string"), Dn;
}
var Ln = {}, Ol;
function Cu() {
  if (Ol) return Ln;
  Ol = 1, Object.defineProperty(Ln, "__esModule", { value: !0 }), Ln.Quad = void 0;
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
var jn = {}, Pl;
function Ou() {
  if (Pl) return jn;
  Pl = 1, Object.defineProperty(jn, "__esModule", { value: !0 }), jn.Variable = void 0;
  let e = class {
    constructor(r) {
      this.termType = "Variable", this.value = r;
    }
    equals(r) {
      return !!r && r.termType === "Variable" && r.value === this.value;
    }
  };
  return jn.Variable = e, jn;
}
var Ml;
function pp() {
  if (Ml) return Pn;
  Ml = 1, Object.defineProperty(Pn, "__esModule", { value: !0 }), Pn.DataFactory = void 0;
  const e = Nu(), t = Au(), r = Ru(), n = ya(), i = Cu(), s = Ou();
  let o = 0, a = class {
    constructor(h) {
      this.blankNodeCounter = 0, h = h || {}, this.blankNodePrefix = h.blankNodePrefix || `df_${o++}_`;
    }
    /**
     * @param value The IRI for the named node.
     * @return A new instance of NamedNode.
     * @see NamedNode
     */
    namedNode(h) {
      return new n.NamedNode(h);
    }
    /**
     * @param value The optional blank node identifier.
     * @return A new instance of BlankNode.
     *         If the `value` parameter is undefined a new identifier
     *         for the blank node is generated for each call.
     * @see BlankNode
     */
    blankNode(h) {
      return new e.BlankNode(h || `${this.blankNodePrefix}${this.blankNodeCounter++}`);
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
    literal(h, p) {
      return new r.Literal(h, p);
    }
    /**
     * This method is optional.
     * @param value The variable name
     * @return A new instance of Variable.
     * @see Variable
     */
    variable(h) {
      return new s.Variable(h);
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
    quad(h, p, c, m) {
      return new i.Quad(h, p, c, m || this.defaultGraph());
    }
    /**
     * Create a deep copy of the given term using this data factory.
     * @param original An RDF term.
     * @return A deep copy of the given term.
     */
    fromTerm(h) {
      switch (h.termType) {
        case "NamedNode":
          return this.namedNode(h.value);
        case "BlankNode":
          return this.blankNode(h.value);
        case "Literal":
          return h.language ? this.literal(h.value, h.language) : h.datatype.equals(r.Literal.XSD_STRING) ? this.literal(h.value) : this.literal(h.value, this.fromTerm(h.datatype));
        case "Variable":
          return this.variable(h.value);
        case "DefaultGraph":
          return this.defaultGraph();
        case "Quad":
          return this.quad(this.fromTerm(h.subject), this.fromTerm(h.predicate), this.fromTerm(h.object), this.fromTerm(h.graph));
      }
    }
    /**
     * Create a deep copy of the given quad using this data factory.
     * @param original An RDF quad.
     * @return A deep copy of the given quad.
     */
    fromQuad(h) {
      return this.fromTerm(h);
    }
    /**
     * Reset the internal blank node counter.
     */
    resetBlankNodeCounter() {
      this.blankNodeCounter = 0;
    }
  };
  return Pn.DataFactory = a, Pn;
}
var Dl;
function Ft() {
  return Dl || (Dl = 1, (function(e) {
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
    Object.defineProperty(e, "__esModule", { value: !0 }), r(Nu(), e), r(pp(), e), r(Au(), e), r(Ru(), e), r(ya(), e), r(Cu(), e), r(Ou(), e);
  })(Sr)), Sr;
}
var yo = {}, St = {}, kl;
function mp() {
  if (kl) return St;
  kl = 1, Object.defineProperty(St, "__esModule", { value: !0 }), St.termToString = r, St.getLiteralValue = n, St.getLiteralType = i, St.getLiteralLanguage = s, St.getLiteralDirection = o, St.stringToTerm = a, St.quadToStringQuad = l, St.stringQuadToQuad = h;
  const e = Ft(), t = new e.DataFactory();
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
      let m = c[1].toLowerCase();
      const _ = m.indexOf("--");
      return _ >= 0 && (m = m.slice(0, _)), m;
    }
    return "";
  }
  function o(p) {
    const c = p.indexOf("--", p.lastIndexOf('"'));
    if (c >= 0) {
      const m = p.slice(c + 2, p.length);
      if (m === "ltr" || m === "rtl")
        return m;
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
        const m = s(p), _ = o(p), v = c.namedNode(i(p));
        return c.literal(n(p), m ? { language: m, direction: _ } : v);
      case "<":
      default:
        if (p[0] === "<" && p.length > 4 && p[1] === "<" && p[p.length - 1] === ">" && p[p.length - 2] === ">") {
          const I = p.slice(2, -2).trim();
          let k = [], L = 0, A = 0, x = !1;
          for (let T = 0; T < I.length; T++) {
            const S = I[T];
            if (S === "<" && L++, S === ">") {
              if (L === 0)
                throw new Error("Found closing tag without opening tag in " + p);
              L--;
            }
            if (S === '"') {
              let C = !1, D = T;
              for (; D-- > 0 && I[D] === "\\"; )
                C = !C;
              C || (x = !x);
            }
            if (S === " " && !x && L === 0) {
              for (k.push(I.slice(A, T)); I[T + 1] === " "; )
                T += 1;
              A = T + 1;
            }
          }
          if (L !== 0)
            throw new Error("Found opening tag without closing tag in " + p);
          if (k.push(I.slice(A, I.length)), k.length !== 3 && k.length !== 4)
            throw new Error("Nested quad syntax error " + p);
          return k = k.map((T) => T.startsWith("<") && !T.includes(" ") ? T.slice(1, -1) : T), c.quad(a(k[0]), a(k[1]), a(k[2]), k[3] ? a(k[3]) : void 0);
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
  function h(p, c) {
    return c = c || t, c.quad(a(p.subject, c), a(p.predicate, c), a(p.object, c), a(p.graph, c));
  }
  return St;
}
var Ll;
function _n() {
  return Ll || (Ll = 1, (function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.termToString = e.stringToTerm = e.stringQuadToQuad = e.quadToStringQuad = e.getLiteralValue = e.getLiteralType = e.getLiteralDirection = e.getLiteralLanguage = void 0;
    const t = mp();
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
var Er = {}, Se = {}, jl;
function gp() {
  if (jl) return Se;
  jl = 1, Object.defineProperty(Se, "__esModule", { value: !0 }), Se.TRIPLE_TERM_NAMES = Se.QUAD_TERM_NAMES = void 0, Se.getTerms = r, Se.getTermsNested = n, Se.getNamedTerms = i, Se.collectNamedTerms = s, Se.forEachTerms = o, Se.forEachTermsNested = a, Se.filterTerms = l, Se.filterTermsNested = h, Se.filterQuadTermNames = p, Se.filterQuadTermNamesNested = c, Se.mapTerms = m, Se.mapTermsNested = _, Se.reduceTerms = v, Se.reduceTermsNested = I, Se.everyTerms = k, Se.everyTermsNested = L, Se.someTerms = A, Se.someTermsNested = x, Se.getValueNestedPath = T, Se.matchTerm = S, Se.matchPattern = C, Se.matchPatternComplete = D, Se.matchPatternMappings = j;
  const e = Ft(), t = new e.DataFactory();
  Se.QUAD_TERM_NAMES = ["subject", "predicate", "object", "graph"], Se.TRIPLE_TERM_NAMES = ["subject", "predicate", "object"];
  function r(b, w) {
    return w && b.graph.termType === "DefaultGraph" ? [b.subject, b.predicate, b.object] : [b.subject, b.predicate, b.object, b.graph];
  }
  function n(b, w) {
    const P = [];
    for (const R of r(b, w))
      R.termType === "Quad" ? n(R, w).forEach((Q) => P.push(Q)) : P.push(R);
    return P;
  }
  function i(b) {
    return [
      { key: "subject", value: b.subject },
      { key: "predicate", value: b.predicate },
      { key: "object", value: b.object },
      { key: "graph", value: b.graph }
    ];
  }
  function s(b, w, P) {
    const R = {};
    return b.forEach((Q) => R[Q.key] = Q.value), w && (R.subject = R.subject || w("subject"), R.predicate = R.predicate || w("predicate"), R.object = R.object || w("object"), R.graph = R.graph || w("graph")), (P || t).quad(R.subject, R.predicate, R.object, R.graph);
  }
  function o(b, w) {
    w(b.subject, "subject"), w(b.predicate, "predicate"), w(b.object, "object"), w(b.graph, "graph");
  }
  function a(b, w, P = []) {
    b.subject.termType === "Quad" ? a(b.subject, w, [...P, "subject"]) : w(b.subject, [...P, "subject"]), b.predicate.termType === "Quad" ? a(b.predicate, w, [...P, "predicate"]) : w(b.predicate, [...P, "predicate"]), b.object.termType === "Quad" ? a(b.object, w, [...P, "object"]) : w(b.object, [...P, "object"]), b.graph.termType === "Quad" ? a(b.graph, w, [...P, "graph"]) : w(b.graph, [...P, "graph"]);
  }
  function l(b, w) {
    const P = [];
    return w(b.subject, "subject") && P.push(b.subject), w(b.predicate, "predicate") && P.push(b.predicate), w(b.object, "object") && P.push(b.object), w(b.graph, "graph") && P.push(b.graph), P;
  }
  function h(b, w, P = []) {
    let R = [];
    return b.subject.termType === "Quad" ? R = [...R, ...h(b.subject, w, [...P, "subject"])] : w(b.subject, [...P, "subject"]) && R.push(b.subject), b.predicate.termType === "Quad" ? R = [...R, ...h(b.predicate, w, [...P, "predicate"])] : w(b.predicate, [...P, "predicate"]) && R.push(b.predicate), b.object.termType === "Quad" ? R = [...R, ...h(b.object, w, [...P, "object"])] : w(b.object, [...P, "object"]) && R.push(b.object), b.graph.termType === "Quad" ? R = [...R, ...h(b.graph, w, [...P, "graph"])] : w(b.graph, [...P, "graph"]) && R.push(b.graph), R;
  }
  function p(b, w) {
    const P = [];
    return w(b.subject, "subject") && P.push("subject"), w(b.predicate, "predicate") && P.push("predicate"), w(b.object, "object") && P.push("object"), w(b.graph, "graph") && P.push("graph"), P;
  }
  function c(b, w, P = []) {
    let R = [];
    const Q = [...P, "subject"];
    b.subject.termType === "Quad" ? R = [...R, ...c(b.subject, w, Q)] : w(b.subject, Q) && R.push(Q);
    const Y = [...P, "predicate"];
    b.predicate.termType === "Quad" ? R = [...R, ...c(b.predicate, w, Y)] : w(b.predicate, Y) && R.push(Y);
    const Z = [...P, "object"];
    b.object.termType === "Quad" ? R = [...R, ...c(b.object, w, Z)] : w(b.object, Z) && R.push(Z);
    const z = [...P, "graph"];
    return b.graph.termType === "Quad" ? R = [...R, ...c(b.graph, w, z)] : w(b.graph, z) && R.push(z), R;
  }
  function m(b, w, P) {
    return (P || t).quad(w(b.subject, "subject"), w(b.predicate, "predicate"), w(b.object, "object"), w(b.graph, "graph"));
  }
  function _(b, w, P, R = []) {
    return (P || t).quad(b.subject.termType === "Quad" ? _(b.subject, w, P, [...R, "subject"]) : w(b.subject, [...R, "subject"]), b.predicate.termType === "Quad" ? _(b.predicate, w, P, [...R, "predicate"]) : w(b.predicate, [...R, "predicate"]), b.object.termType === "Quad" ? _(b.object, w, P, [...R, "object"]) : w(b.object, [...R, "object"]), b.graph.termType === "Quad" ? _(b.graph, w, P, [...R, "graph"]) : w(b.graph, [...R, "graph"]));
  }
  function v(b, w, P) {
    let R = P;
    return R = w(R, b.subject, "subject"), R = w(R, b.predicate, "predicate"), R = w(R, b.object, "object"), w(R, b.graph, "graph");
  }
  function I(b, w, P, R = []) {
    let Q = P;
    return b.subject.termType === "Quad" ? Q = I(b.subject, w, Q, [...R, "subject"]) : Q = w(Q, b.subject, [...R, "subject"]), b.predicate.termType === "Quad" ? Q = I(b.predicate, w, Q, [...R, "predicate"]) : Q = w(Q, b.predicate, [...R, "predicate"]), b.object.termType === "Quad" ? Q = I(b.object, w, Q, [...R, "object"]) : Q = w(Q, b.object, [...R, "object"]), b.graph.termType === "Quad" ? Q = I(b.graph, w, Q, [...R, "graph"]) : Q = w(Q, b.graph, [...R, "graph"]), Q;
  }
  function k(b, w) {
    return w(b.subject, "subject") && w(b.predicate, "predicate") && w(b.object, "object") && w(b.graph, "graph");
  }
  function L(b, w, P = []) {
    return (b.subject.termType === "Quad" ? L(b.subject, w, [...P, "subject"]) : w(b.subject, [...P, "subject"])) && (b.predicate.termType === "Quad" ? L(b.predicate, w, [...P, "predicate"]) : w(b.predicate, [...P, "predicate"])) && (b.object.termType === "Quad" ? L(b.object, w, [...P, "object"]) : w(b.object, [...P, "object"])) && (b.graph.termType === "Quad" ? L(b.graph, w, [...P, "graph"]) : w(b.graph, [...P, "graph"]));
  }
  function A(b, w) {
    return w(b.subject, "subject") || w(b.predicate, "predicate") || w(b.object, "object") || w(b.graph, "graph");
  }
  function x(b, w, P = []) {
    return (b.subject.termType === "Quad" ? x(b.subject, w, [...P, "subject"]) : w(b.subject, [...P, "subject"])) || (b.predicate.termType === "Quad" ? x(b.predicate, w, [...P, "predicate"]) : w(b.predicate, [...P, "predicate"])) || (b.object.termType === "Quad" ? x(b.object, w, [...P, "object"]) : w(b.object, [...P, "object"])) || (b.graph.termType === "Quad" ? x(b.graph, w, [...P, "graph"]) : w(b.graph, [...P, "graph"]));
  }
  function T(b, w) {
    if (w.length === 0)
      return b;
    if (b.termType === "Quad")
      return T(b[w[0]], w.slice(1));
    throw new Error(`Tried to get ${w[0]} from term of type ${b.termType}`);
  }
  function S(b, w) {
    return !w || w.termType === "Variable" || w.termType === "Quad" && b.termType === "Quad" && D(b, w) || w.equals(b);
  }
  function C(b, w, P, R, Q) {
    return S(b.subject, w) && S(b.predicate, P) && S(b.object, R) && S(b.graph, Q);
  }
  function D(b, w) {
    return C(b, w.subject, w.predicate, w.object, w.graph);
  }
  function j(b, w, P = {}) {
    const R = {};
    function Q(Y, Z) {
      return k(Y, (z, ne) => {
        var re, _e;
        const se = Z[ne];
        switch (z.termType) {
          case "Variable":
            return P.skipVarMapping && se.termType === "Variable" || ((_e = (re = R[z.value]) === null || re === void 0 ? void 0 : re.equals(se)) !== null && _e !== void 0 ? _e : (R[z.value] = se, !0));
          case "Quad":
            return se.termType === "Quad" && Q(z, se);
          default:
            return z.equals(se);
        }
      });
    }
    return Q(w, b) && (P.returnMappings ? R : !0);
  }
  return Se;
}
var ut = {}, Fl;
function _p() {
  if (Fl) return ut;
  Fl = 1, Object.defineProperty(ut, "__esModule", { value: !0 }), ut.TERM_TYPES = void 0, ut.uniqTerms = t, ut.getTermsOfType = r, ut.getNamedNodes = n, ut.getBlankNodes = i, ut.getLiterals = s, ut.getVariables = o, ut.getDefaultGraphs = a, ut.getQuads = l;
  const e = _n();
  ut.TERM_TYPES = ["NamedNode", "BlankNode", "Literal", "Variable", "DefaultGraph", "Quad"];
  function t(h) {
    const p = {};
    return h.filter((c) => {
      const m = (0, e.termToString)(c);
      return !(m in p) && (p[m] = !0);
    });
  }
  function r(h, p) {
    return h.filter((c) => c.termType === p);
  }
  function n(h) {
    return r(h, "NamedNode");
  }
  function i(h) {
    return r(h, "BlankNode");
  }
  function s(h) {
    return r(h, "Literal");
  }
  function o(h) {
    return r(h, "Variable");
  }
  function a(h) {
    return r(h, "DefaultGraph");
  }
  function l(h) {
    return r(h, "Quad");
  }
  return ut;
}
var Bl;
function $s() {
  return Bl || (Bl = 1, (function(e) {
    var t = Er && Er.__createBinding || (Object.create ? (function(n, i, s, o) {
      o === void 0 && (o = s);
      var a = Object.getOwnPropertyDescriptor(i, s);
      (!a || ("get" in a ? !i.__esModule : a.writable || a.configurable)) && (a = { enumerable: !0, get: function() {
        return i[s];
      } }), Object.defineProperty(n, o, a);
    }) : (function(n, i, s, o) {
      o === void 0 && (o = s), n[o] = i[s];
    })), r = Er && Er.__exportStar || function(n, i) {
      for (var s in n) s !== "default" && !Object.prototype.hasOwnProperty.call(i, s) && t(i, n, s);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), r(gp(), e), r(_p(), e);
  })(Er)), Er;
}
var Fn = {}, Ul;
function Pu() {
  if (Ul) return Fn;
  Ul = 1, Object.defineProperty(Fn, "__esModule", { value: !0 }), Fn.TermDictionaryNumberRecordFullTerms = void 0;
  const e = Ft(), t = _n();
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
  return Fn.TermDictionaryNumberRecordFullTerms = r, Fn;
}
var Bn = {}, Un = {}, bo = {}, $l;
function Bt() {
  return $l || ($l = 1, (function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.QUAD_TERM_NAMES_INVERSE = void 0, e.getBestIndex = r, e.getBestIndexTerms = n, e.getIndexMatchTermsPath = i, e.getComponentOrderScore = s, e.orderQuadComponents = o, e.encodeOptionalTerms = a, e.quadToPattern = l, e.quadHasVariables = h, e.arePatternsQuoted = p;
    const t = $s();
    e.QUAD_TERM_NAMES_INVERSE = Object.fromEntries(t.QUAD_TERM_NAMES.map((c, m) => [c, m]));
    function r(c, m) {
      if (c.length === 1 || m.every((I) => I !== void 0))
        return 0;
      const _ = [];
      for (let I = 0; I < t.QUAD_TERM_NAMES.length; I++)
        m[I] && _.push(t.QUAD_TERM_NAMES[I]);
      return c.map((I, k) => ({ score: s(I, _), index: k })).sort((I, k) => k.score - I.score)[0].index;
    }
    function n(c, m) {
      return c.length === 1 ? 0 : c.map((v, I) => ({ score: s(v, m), index: I })).sort((v, I) => I.score - v.score)[0].index;
    }
    function i(c, m) {
      const _ = [];
      let v = 0;
      for (let I = 0; I < c.length; I += 1)
        if (c[I] === m[v]) {
          if (v++, _[I] = !0, v === m.length)
            break;
        } else
          _[I] = !1;
      return _;
    }
    function s(c, m) {
      return c.map((_, v) => m.includes(_) ? c.length - v : 0).reduce((_, v) => _ + v, 0);
    }
    function o(c, m) {
      return c.map((_) => {
        const v = e.QUAD_TERM_NAMES_INVERSE[_];
        return m[v];
      });
    }
    function a(c, m) {
      const _ = c.map((v) => {
        if (v) {
          if (v.termType === "Quad" && h(v))
            return;
          const I = m.encodeOptional(v);
          return I === void 0 ? "none" : I;
        }
        return v;
      });
      if (!_.includes("none"))
        return _;
    }
    function l(c, m, _, v, I) {
      let k = !1;
      return [[c || void 0, m || void 0, _ || void 0, v || void 0].map((A) => {
        if (A) {
          if (A.termType === "Variable")
            return;
          if (A.termType === "Quad") {
            if (I)
              return A;
            k = !0;
            return;
          }
        }
        return A;
      }), k];
    }
    function h(c) {
      for (const m of t.QUAD_TERM_NAMES) {
        const _ = c[m];
        if (_.termType === "Variable" || _.termType === "Quad" && h(_))
          return !0;
      }
      return !1;
    }
    function p(c) {
      return c.map((m) => (m == null ? void 0 : m.termType) === "Quad" && h(m));
    }
  })(bo)), bo;
}
var Vl;
function ba() {
  if (Vl) return Un;
  Vl = 1, Object.defineProperty(Un, "__esModule", { value: !0 }), Un.RdfStoreIndexNestedMap = void 0;
  const e = Bt();
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
      const h = l.has(n[3]);
      return h || l.set(n[3], i), !h;
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
      const [s, o, a, l] = i, [h, p, c, m] = n;
      let _, v, I, k, L, A, x;
      const T = this.nestedMap, S = s !== void 0 ? T.has(s) ? [s] : [] : T.keys();
      for (const C of S) {
        L = T.get(C), _ = h || this.dictionary.decode(C);
        const D = o !== void 0 ? L.has(o) ? [o] : [] : L.keys();
        for (const j of D) {
          A = L.get(j), v = p || this.dictionary.decode(j);
          const b = a !== void 0 ? A.has(a) ? [a] : [] : A.keys();
          for (const w of b) {
            x = A.get(w), I = c || this.dictionary.decode(w);
            const P = l !== void 0 ? x.has(l) ? [l] : [] : x.keys();
            for (const R of P)
              k = m || this.dictionary.decode(R), yield [_, v, I, k];
          }
        }
      }
    }
    // The code below is nearly identical. We duplicate because abstraction would result in a significant performance hit.
    *findEncoded(n, i) {
      const [s, o, a, l] = n;
      let h, p, c;
      const m = this.nestedMap, _ = s !== void 0 ? m.has(s) ? [s] : [] : m.keys();
      for (const v of _) {
        h = m.get(v);
        const I = o !== void 0 ? h.has(o) ? [o] : [] : h.keys();
        for (const k of I) {
          p = h.get(k);
          const L = a !== void 0 ? p.has(a) ? [a] : [] : p.keys();
          for (const A of L) {
            c = p.get(A);
            const x = l !== void 0 ? c.has(l) ? [l] : [] : c.keys();
            for (const T of x)
              yield [v, k, A, T];
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
      const o = s[0], a = s[1], l = s[2], h = s[3];
      let p, c, m;
      const _ = this.nestedMap, v = o !== void 0 ? _.has(o) ? [o] : [] : _.keys();
      for (const I of v) {
        p = _.get(I);
        const k = a !== void 0 ? p.has(a) ? [a] : [] : p.keys();
        for (const L of k) {
          c = p.get(L);
          const A = l !== void 0 ? c.has(l) ? [l] : [] : c.keys();
          for (const x of A)
            m = c.get(x), h !== void 0 ? m.has(h) && i++ : i += m.size;
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
  return Un.RdfStoreIndexNestedMap = t, Un;
}
var Ql;
function Mu() {
  if (Ql) return Bn;
  Ql = 1, Object.defineProperty(Bn, "__esModule", { value: !0 }), Bn.TermDictionaryQuotedIndexed = void 0;
  const e = Ft(), t = ba(), r = Bt();
  let n = class Ht {
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
      const a = (0, r.encodeOptionalTerms)([s.subject, s.predicate, s.object, s.graph], this), l = a && a.every((m) => m !== void 0) ? this.quotedTriplesReverseDictionaries[0].getEncoded(a) : void 0;
      if (l !== void 0 || o)
        return l === void 0 ? void 0 : Ht.BITMASK | l;
      const h = [
        this.encode(s.subject),
        this.encode(s.predicate),
        this.encode(s.object)
      ], p = this.quotedTriplesDictionary.length + 1;
      this.quotedTriplesDictionary.push(h);
      const c = this.encode(this.dataFactory.defaultGraph());
      return this.quotedTriplesReverseDictionaries[0].set([
        h[0],
        h[1],
        h[2],
        c
      ], p), this.quotedTriplesReverseDictionaries[1].set([
        h[1],
        h[2],
        h[0],
        c
      ], p), this.quotedTriplesReverseDictionaries[2].set([
        h[2],
        h[0],
        h[1],
        c
      ], p), Ht.BITMASK | p;
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
      const [o, a] = (0, r.quadToPattern)(s.subject, s.predicate, s.object, s.graph, !0);
      for (const l of this.patternToIterable(o[0]))
        for (const h of this.patternToIterable(o[1]))
          for (const p of this.patternToIterable(o[2]))
            for (const c of this.patternToIterable(o[3]))
              if (l && h || !h && !p) {
                const m = [l, h, p, c];
                for (const _ of this.quotedTriplesReverseDictionaries[0].findEncoded(m, o))
                  yield Ht.BITMASK | this.quotedTriplesReverseDictionaries[0].getEncoded(_);
              } else if (!l && h) {
                const m = [h, p, l, c];
                for (const _ of this.quotedTriplesReverseDictionaries[1].findEncoded(m, o))
                  yield Ht.BITMASK | this.quotedTriplesReverseDictionaries[1].getEncoded(_);
              } else {
                const m = [p, l, h, c];
                for (const _ of this.quotedTriplesReverseDictionaries[2].findEncoded(m, o))
                  yield Ht.BITMASK | this.quotedTriplesReverseDictionaries[2].getEncoded(_);
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
  return Bn.TermDictionaryQuotedIndexed = n, n.BITMASK = 1 << 31, Bn;
}
var $n = {}, Hl;
function Du() {
  if (Hl) return $n;
  Hl = 1, Object.defineProperty($n, "__esModule", { value: !0 }), $n.RdfStoreIndexNestedMapQuoted = void 0;
  const e = Bt(), t = ba();
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
      const [o, a, l, h] = s, [p, c, m, _] = i, [v, I, k, L] = (0, e.arePatternsQuoted)(i);
      let A, x, T, S, C, D, j;
      const b = this.nestedMap, w = p !== void 0 ? v ? this.getQuotedPatternKeys(b, p) : b.has(o) ? [o] : [] : b.keys();
      for (const P of w) {
        C = b.get(P), A = !v && p ? p : this.dictionary.decode(P);
        const R = c !== void 0 ? I ? this.getQuotedPatternKeys(C, c) : C.has(a) ? [a] : [] : C.keys();
        for (const Q of R) {
          D = C.get(Q), x = !I && c ? c : this.dictionary.decode(Q);
          const Y = m !== void 0 ? k ? this.getQuotedPatternKeys(D, m) : D.has(l) ? [l] : [] : D.keys();
          for (const Z of Y) {
            j = D.get(Z), T = !k && m ? m : this.dictionary.decode(Z);
            const z = _ !== void 0 ? L ? this.getQuotedPatternKeys(j, _) : j.has(h) ? [h] : [] : j.keys();
            for (const ne of z)
              S = !L && _ ? _ : this.dictionary.decode(ne), yield [A, x, T, S];
          }
        }
      }
    }
    // The code below is nearly identical. We duplicate because abstraction would result in a significant performance hit.
    *findEncoded(i, s) {
      const [o, a, l, h] = i, [p, c, m, _] = s, [v, I, k, L] = (0, e.arePatternsQuoted)(s);
      let A, x, T;
      const S = this.nestedMap, C = p !== void 0 ? v ? this.getQuotedPatternKeys(S, p) : S.has(o) ? [o] : [] : S.keys();
      for (const D of C) {
        A = S.get(D);
        const j = c !== void 0 ? I ? this.getQuotedPatternKeys(A, c) : A.has(a) ? [a] : [] : A.keys();
        for (const b of j) {
          x = A.get(b);
          const w = m !== void 0 ? k ? this.getQuotedPatternKeys(x, m) : x.has(l) ? [l] : [] : x.keys();
          for (const P of w) {
            T = x.get(P);
            const R = _ !== void 0 ? L ? this.getQuotedPatternKeys(T, _) : T.has(h) ? [h] : [] : T.keys();
            for (const Q of R)
              yield [
                Number.parseInt(D, 10),
                Number.parseInt(b, 10),
                Number.parseInt(P, 10),
                Number.parseInt(Q, 10)
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
      const [a, l, h, p] = o, [c, m, _, v] = i, [I, k, L, A] = (0, e.arePatternsQuoted)(i);
      let x, T, S;
      const C = this.nestedMap, D = c !== void 0 ? I ? this.getQuotedPatternKeys(C, c) : C.has(a) ? [a] : [] : C.keys();
      for (const j of D) {
        x = C.get(j);
        const b = m !== void 0 ? k ? this.getQuotedPatternKeys(x, m) : x.has(l) ? [l] : [] : x.keys();
        for (const w of b) {
          T = x.get(w);
          const P = _ !== void 0 ? L ? this.getQuotedPatternKeys(T, _) : T.has(h) ? [h] : [] : T.keys();
          for (const R of P)
            S = T.get(R), v !== void 0 ? A ? s += [...this.getQuotedPatternKeys(S, v)].length : S.has(p) && s++ : s += S.size;
        }
      }
      return s;
    }
  };
  return $n.RdfStoreIndexNestedMapQuoted = r, $n;
}
var ql;
function ku() {
  if (ql) return An;
  ql = 1, Object.defineProperty(An, "__esModule", { value: !0 }), An.RdfStore = void 0;
  const e = /* @__PURE__ */ hp(), t = Ft(), r = _n(), n = $s(), i = ju(), s = Pu(), o = Mu(), a = Du(), l = Bt();
  let h = class ii {
    constructor(c) {
      this.features = { quotedTripleFiltering: !0, indexNodes: !1, indexDistinctTerms: !0 }, this._size = 0, this.options = c, this.dataFactory = c.dataFactory, this.dictionary = c.dictionary, this.indexesWrapped = ii.constructIndexesWrapped(c), this.indexesWrappedComponentOrders = this.indexesWrapped.map((m) => m.componentOrder), this.indexNodes = c.indexNodes ? /* @__PURE__ */ new Map() : void 0, this.features.indexNodes = !!c.indexNodes;
    }
    /**
     * Create an RDF store with default settings.
     * Concretely, this store stores triples in GSPO, GPOS, and GOSP order,
     * and makes use of in-memory number dictionary encoding.
     * @param nodes If an index of nodes (subjects or objects) must be maintained.
     */
    static createDefault(c) {
      return new ii({
        indexCombinations: ii.DEFAULT_INDEX_COMBINATIONS,
        indexConstructor: (m) => new a.RdfStoreIndexNestedMapQuoted(m),
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
      const m = [];
      if (c.indexCombinations.length === 0)
        throw new Error("At least one index combination is required");
      for (const _ of c.indexCombinations) {
        if (!ii.isCombinationValid(_))
          throw new Error(`Invalid index combination: ${_}`);
        m.push({
          index: c.indexConstructor(c),
          componentOrder: _,
          componentOrderInverse: Object.fromEntries(_.map((v, I) => [v, I]))
        });
      }
      return m;
    }
    /**
     * Check if a given quad term order is valid.
     * @param combination A quad term order.
     */
    static isCombinationValid(c) {
      for (const m of n.QUAD_TERM_NAMES)
        if (!c.includes(m))
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
      const m = [
        this.dictionary.encode(c.subject),
        this.dictionary.encode(c.predicate),
        this.dictionary.encode(c.object),
        this.dictionary.encode(c.graph)
      ];
      let _ = !1;
      for (const v of this.indexesWrapped)
        _ = v.index.set((0, l.orderQuadComponents)(v.componentOrder, m), !0);
      if (_) {
        if (this._size++, this.indexNodes) {
          let v = this.indexNodes.get(m[3]);
          v || (v = /* @__PURE__ */ new Set(), this.indexNodes.set(m[3], v)), v.add(m[0]), v.add(m[2]);
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
      const m = [
        this.dictionary.encodeOptional(c.subject),
        this.dictionary.encodeOptional(c.predicate),
        this.dictionary.encodeOptional(c.object),
        this.dictionary.encodeOptional(c.graph)
      ];
      if (m.includes(void 0))
        return !1;
      let _ = !1;
      for (const v of this.indexesWrapped)
        if (_ = v.index.remove((0, l.orderQuadComponents)(v.componentOrder, m)), !_)
          break;
      if (_) {
        if (this._size--, this.indexNodes) {
          const v = this.indexNodes.get(m[3]);
          this.readQuads(c.subject, void 0, void 0, c.graph).next().value || v.delete(m[0]), this.readQuads(void 0, void 0, c.object, c.graph).next().value || v.delete(m[2]), v.size === 0 && this.indexNodes.delete(m[3]);
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
      return c.on("data", (m) => this.removeQuad(m)), c;
    }
    /**
     * All quads matching the pattern will be removed.
     * @param subject The optional subject.
     * @param predicate The optional predicate.
     * @param object The optional object.
     * @param graph The optional graph.
     */
    removeMatches(c, m, _, v) {
      return this.remove(this.match(c, m, _, v));
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
      return c.on("data", (m) => this.addQuad(m)), c;
    }
    /**
     * Returns a generator producing all quads matching the pattern.
     * @param subject The optional subject.
     * @param predicate The optional predicate.
     * @param object The optional object.
     * @param graph The optional graph.
     */
    *readQuads(c, m, _, v) {
      const I = !!this.dictionary.features.quotedTriples && Object.values(this.indexesWrapped).every((T) => T.index.features.quotedTripleFiltering), [k, L] = (0, l.quadToPattern)(c, m, _, v, I), A = this.indexesWrapped[(0, l.getBestIndex)(this.indexesWrappedComponentOrders, k)], x = (0, l.orderQuadComponents)(A.componentOrder, k);
      for (const T of A.index.find(x)) {
        const S = this.dataFactory.quad(T[A.componentOrderInverse.subject], T[A.componentOrderInverse.predicate], T[A.componentOrderInverse.object], T[A.componentOrderInverse.graph]);
        L ? (0, n.matchPattern)(S, c, m, _, v) && (yield S) : yield S;
      }
    }
    /**
     * Returns an array containing all quads matching the pattern.
     * @param subject The optional subject.
     * @param predicate The optional predicate.
     * @param object The optional object.
     * @param graph The optional graph.
     */
    getQuads(c, m, _, v) {
      return [...this.readQuads(c, m, _, v)];
    }
    /**
     * Returns a stream that produces all quads matching the pattern.
     * @param subject The optional subject.
     * @param predicate The optional predicate.
     * @param object The optional object.
     * @param graph The optional graph.
     */
    match(c, m, _, v) {
      return (0, e.wrap)(this.readQuads(c, m, _, v));
    }
    /**
     * Returns a generator producing all quads matching the pattern.
     * @param subject The subject, which can be a variable.
     * @param predicate The predicate, which can be a variable.
     * @param object The object, which can be a variable.
     * @param graph The graph, which can be a variable.
     */
    *readBindings(c, m, _, v, I) {
      const k = !!this.dictionary.features.quotedTriples && Object.values(this.indexesWrapped).every((w) => w.index.features.quotedTripleFiltering), [L, A] = (0, l.quadToPattern)(m, _, v, I, k), x = this.indexesWrapped[(0, l.getBestIndex)(this.indexesWrappedComponentOrders, L)], T = (0, l.orderQuadComponents)(x.componentOrder, L), S = (0, l.encodeOptionalTerms)(T, this.dictionary);
      if (!S)
        return;
      const C = (0, l.orderQuadComponents)(x.componentOrder, [m, _, v, I]), D = [];
      for (let w = 0; w < C.length; w++)
        (C[w].termType === "Variable" || C[w].termType === "Quad") && D.push(w);
      let j = !1;
      const b = C.map((w, P) => {
        const R = [];
        for (let Q = P + 1; Q < C.length; Q++)
          w.equals(C[Q]) && (R.push(Q), j = !0);
        return R;
      });
      for (const w of x.index.findEncoded(S, T)) {
        let P = !1, R = !1;
        const Q = [];
        for (const Y of D) {
          if (j) {
            const z = b[Y];
            for (const ne of z)
              if (w[Y] !== w[ne]) {
                P = !0;
                break;
              }
            if (P)
              break;
          }
          const Z = this.dictionary.decode(w[Y]);
          if (C[Y].termType === "Quad") {
            const z = (0, n.matchPatternMappings)(Z, C[Y], { returnMappings: !0 });
            if (z) {
              R = !0;
              for (const [ne, re] of Object.entries(z)) {
                const _e = this.dataFactory.variable(ne);
                if (Q.some((se) => se[0].equals(_e) && !se[1].equals(re))) {
                  P = !0;
                  break;
                }
                Q.push([_e, re]);
              }
              continue;
            }
            P = !0;
            break;
          }
          if (R && Q.some((z) => z[0].equals(C[Y]) && !z[1].equals(Z))) {
            P = !0;
            break;
          }
          Q.push([C[Y], Z]);
        }
        P || (yield c.bindings(Q));
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
    getBindings(c, m, _, v, I) {
      return [...this.readBindings(c, m, _, v, I)];
    }
    /**
     * Returns a stream that produces all quads matching the pattern.
     * @param bindingsFactory The factory that will be used to create bindings.
     * @param subject The subject, which can be a variable.
     * @param predicate The predicate, which can be a variable.
     * @param object The object, which can be a variable.
     * @param graph The graph, which can be a variable.
     */
    matchBindings(c, m, _, v, I) {
      return (0, e.wrap)(this.readBindings(c, m, _, v, I));
    }
    /**
     * Returns the number of distinct terms that exist in the store.
     *
     * @param terms An array of quad term names
     */
    countDistinctTerms(c) {
      const m = (0, l.getBestIndexTerms)(this.indexesWrappedComponentOrders, c), _ = this.indexesWrapped[m], v = [];
      for (let A = 0; A < c.length; A++)
        v[A] = _.componentOrder.indexOf(c[A]);
      const I = [void 0, void 0, void 0, void 0];
      for (let A = 0; A < c.length; A++)
        I[v[A]] = c[A];
      const k = I.filter((A) => A !== void 0), L = (0, l.getIndexMatchTermsPath)(_.componentOrder, k);
      return L.includes(!1) ? this.getDistinctTerms(c).length : _.index.countTerms(L);
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
      const m = (0, l.getBestIndexTerms)(this.indexesWrappedComponentOrders, c), _ = this.indexesWrapped[m], v = [];
      for (let T = 0; T < c.length; T++)
        v[T] = _.componentOrder.indexOf(c[T]);
      const I = [void 0, void 0, void 0, void 0];
      for (let T = 0; T < c.length; T++)
        I[v[T]] = c[T];
      const k = I.filter((T) => T !== void 0), L = [];
      for (let T = 0; T < k.length; T++)
        L[T] = c.indexOf(k[T]);
      const A = (0, l.getIndexMatchTermsPath)(_.componentOrder, k);
      let x;
      A.includes(!1) && (x = /* @__PURE__ */ new Set());
      for (const T of _.index.findTerms(A)) {
        const S = [];
        for (let D = 0; D < T.length; D++)
          S[L[D]] = T[D];
        const C = S.map((D) => this.dictionary.decode(D));
        if (x) {
          const D = C.map((j) => (0, r.termToString)(j)).join(",");
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
        for (const v of this.indexNodes.values())
          _ += v.size;
        return _;
      }
      const m = this.dictionary.encodeOptional(c);
      return m !== void 0 ? this.indexNodes.get(m).size : 0;
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
        for (const m of this.indexNodes.entries()) {
          const _ = this.dictionary.decode(m[0]);
          for (const v of m[1])
            yield [_, this.dictionary.decode(v)];
        }
      else {
        const m = this.dictionary.encodeOptional(c);
        if (m !== void 0) {
          const _ = this.indexNodes.get(m);
          for (const v of _)
            yield [c, this.dictionary.decode(v)];
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
    countQuads(c, m, _, v) {
      const I = !!this.dictionary.features.quotedTriples && Object.values(this.indexesWrapped).every((x) => x.index.features.quotedTripleFiltering), [k] = (0, l.quadToPattern)(c, m, _, v, I);
      if (k.every((x) => x === void 0))
        return this.size;
      const L = this.indexesWrapped[(0, l.getBestIndex)(this.indexesWrappedComponentOrders, k)], A = (0, l.orderQuadComponents)(L.componentOrder, k);
      return L.index.count(A);
    }
    /**
     * Wrap this store inside a DatasetCore interface.
     * Any mutations in either this store or the wrapper will propagate to each other.
     */
    asDataset() {
      return new i.DatasetCoreWrapper(this);
    }
  };
  return An.RdfStore = h, h.DEFAULT_INDEX_COMBINATIONS = [
    ["graph", "subject", "predicate", "object"],
    ["graph", "predicate", "object", "subject"],
    ["graph", "object", "subject", "predicate"]
  ], An;
}
var Kl;
function ju() {
  if (Kl) return Nn;
  Kl = 1, Object.defineProperty(Nn, "__esModule", { value: !0 }), Nn.DatasetCoreWrapper = void 0;
  const e = ku();
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
  return Nn.DatasetCoreWrapper = t, Nn;
}
var To = {}, Wl;
function yp() {
  return Wl || (Wl = 1, Object.defineProperty(To, "__esModule", { value: !0 })), To;
}
var Vn = {}, Gl;
function bp() {
  if (Gl) return Vn;
  Gl = 1, Object.defineProperty(Vn, "__esModule", { value: !0 }), Vn.TermDictionaryNumberMap = void 0;
  const e = Ft(), t = _n();
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
  return Vn.TermDictionaryNumberMap = r, Vn;
}
var Qn = {}, zl;
function Tp() {
  if (zl) return Qn;
  zl = 1, Object.defineProperty(Qn, "__esModule", { value: !0 }), Qn.TermDictionaryNumberRecord = void 0;
  const e = Ft(), t = _n();
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
  return Qn.TermDictionaryNumberRecord = r, Qn;
}
var Hn = {}, Yl;
function vp() {
  if (Yl) return Hn;
  Yl = 1, Object.defineProperty(Hn, "__esModule", { value: !0 }), Hn.TermDictionaryQuoted = void 0;
  const e = Ft(), t = $s();
  let r = class Nr {
    constructor(i, s, o = new e.DataFactory()) {
      this.features = { quotedTriples: !0 }, this.plainTermDictionary = i, this.quotedTriplesDictionary = s, this.dataFactory = o;
    }
    encode(i) {
      return i.termType === "Quad" ? Nr.BITMASK | 1 + this.quotedTriplesDictionary.encode(i) : this.plainTermDictionary.encode(i);
    }
    encodeOptional(i) {
      if (i.termType === "Quad") {
        const s = this.quotedTriplesDictionary.encodeOptional(i);
        return s === void 0 ? s : Nr.BITMASK | 1 + s;
      }
      return this.plainTermDictionary.encodeOptional(i);
    }
    decode(i) {
      if (Nr.BITMASK & i) {
        const s = (~Nr.BITMASK & i) - 1;
        return this.quotedTriplesDictionary.decode(s);
      }
      return this.plainTermDictionary.decode(i);
    }
    *encodings() {
      for (const i of this.plainTermDictionary.encodings())
        yield i;
      for (const i of this.quotedTriplesDictionary.encodings())
        yield Nr.BITMASK | 1 + i;
    }
    *findQuotedTriples(i) {
      for (const s of this.findQuotedTriplesEncoded(i))
        yield this.decode(s);
    }
    *findQuotedTriplesEncoded(i) {
      for (let s of this.quotedTriplesDictionary.encodings()) {
        s = Nr.BITMASK | 1 + s;
        const o = this.decode(s);
        (0, t.matchPattern)(o, i.subject, i.predicate, i.object, i.graph) && (yield s);
      }
    }
  };
  return Hn.TermDictionaryQuoted = r, r.BITMASK = 1 << 31, Hn;
}
var qn = {}, Xl;
function Sp() {
  if (Xl) return qn;
  Xl = 1, Object.defineProperty(qn, "__esModule", { value: !0 }), qn.TermDictionaryQuotedReferential = void 0;
  const e = Ft(), t = $s(), r = Bt();
  let n = class qt {
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
      const a = (c = (0, r.encodeOptionalTerms)([s.subject, s.predicate, s.object, void 0], this)) == null ? void 0 : c.slice(0, 3), l = a && a.every((m) => m !== void 0) ? this.quotedTriplesReverseDictionary[a.join(qt.SEPARATOR)] : void 0;
      if (l !== void 0 || o)
        return l === void 0 ? void 0 : qt.BITMASK | l;
      const h = [
        this.encode(s.subject),
        this.encode(s.predicate),
        this.encode(s.object)
      ], p = this.quotedTriplesDictionary.length + 1;
      return this.quotedTriplesDictionary.push(h), this.quotedTriplesReverseDictionary[h.join(qt.SEPARATOR)] = p, qt.BITMASK | p;
    }
    encodeOptional(s) {
      return s.termType === "Quad" ? this.encodeQuotedTriple(s, !0) : this.plainTermDictionary.encodeOptional(s);
    }
    decode(s) {
      if (qt.BITMASK & s) {
        const o = (~qt.BITMASK & s) - 1;
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
        yield qt.BITMASK | 1 + s;
    }
    *findQuotedTriples(s) {
      for (const o of this.findQuotedTriplesEncoded(s))
        yield this.decode(o);
    }
    *findQuotedTriplesEncoded(s) {
      for (let o of this.quotedTriplesDictionary.keys()) {
        o = qt.BITMASK | 1 + o;
        const a = this.decode(o);
        (0, t.matchPattern)(a, s.subject, s.predicate, s.object, s.graph) && (yield o);
      }
    }
  };
  return qn.TermDictionaryQuotedReferential = n, n.BITMASK = 1 << 31, n.SEPARATOR = "_", qn;
}
var Kn = {}, Jl;
function Ep() {
  if (Jl) return Kn;
  Jl = 1, Object.defineProperty(Kn, "__esModule", { value: !0 }), Kn.TermDictionarySymbol = void 0;
  const e = Ft(), t = _n();
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
  return Kn.TermDictionarySymbol = r, Kn;
}
var vo = {}, Zl;
function wp() {
  return Zl || (Zl = 1, Object.defineProperty(vo, "__esModule", { value: !0 })), vo;
}
var Wn = {}, ec;
function Fu() {
  if (ec) return Wn;
  ec = 1, Object.defineProperty(Wn, "__esModule", { value: !0 }), Wn.RdfStoreIndexNestedMapRecursive = void 0;
  const e = Bt();
  let t = class {
    constructor(n) {
      this.features = {
        quotedTripleFiltering: !1
      }, this.dictionary = n.dictionary, this.nestedMap = /* @__PURE__ */ new Map();
    }
    set(n, i) {
      let s = this.nestedMap, o = !1;
      for (const [a, l] of n.entries()) {
        const h = s;
        let p = h.get(l);
        p ? a === n.length - 1 && (o = !0) : (p = a === n.length - 1 ? i : /* @__PURE__ */ new Map(), h.set(l, p)), s = p;
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
          const h = [...o, a];
          yield* this.findTermsInner(n + 1, l, s, h);
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
          const h = s.get(l);
          h && (a += this.countInner(n + 1, i, h));
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
  return Wn.RdfStoreIndexNestedMapRecursive = t, Wn;
}
var Gn = {}, tc;
function Ip() {
  if (tc) return Gn;
  tc = 1, Object.defineProperty(Gn, "__esModule", { value: !0 }), Gn.RdfStoreIndexNestedMapRecursiveQuoted = void 0;
  const e = Bt(), t = Fu();
  let r = class extends t.RdfStoreIndexNestedMapRecursive {
    constructor(i) {
      super(i), this.features = {
        quotedTripleFiltering: !0
      };
    }
    *findEncoded(i, s) {
      return yield* this.findEncodedInnerQuoted(0, i, s, (0, e.arePatternsQuoted)(s), this.nestedMap, []);
    }
    *findEncodedInnerQuoted(i, s, o, a, l, h) {
      if (i === s.length)
        yield [...h];
      else {
        const p = s[i], c = o[i];
        if (c)
          if (a[i]) {
            const m = this.dictionary.findQuotedTriplesEncoded(c);
            for (const _ of m) {
              const v = l.get(_);
              v && (h[i] = _, yield* this.findEncodedInnerQuoted(i + 1, s, o, a, v, h));
            }
          } else {
            const m = p, _ = l.get(m);
            _ && (h[i] = p, yield* this.findEncodedInnerQuoted(i + 1, s, o, a, _, h));
          }
        else for (const [m, _] of l.entries())
          h[i] = m, yield* this.findEncodedInnerQuoted(i + 1, s, o, a, _, h);
      }
    }
    countInner(i, s, o) {
      const a = s[i];
      let l = 0;
      if (a)
        if (a.termType === "Quad" && (0, e.quadHasVariables)(a)) {
          const h = this.dictionary.findQuotedTriplesEncoded(a);
          for (const p of h)
            if (i === s.length - 1)
              o.has(p) && l++;
            else {
              const c = o.get(p);
              c && (l += this.countInner(i + 1, s, c));
            }
        } else {
          const h = this.dictionary.encodeOptional(a);
          if (h !== void 0) {
            if (i === s.length - 1)
              return o.has(h) ? 1 : 0;
            const p = o.get(h);
            p && (l += this.countInner(i + 1, s, p));
          }
        }
      else {
        if (i === s.length - 1)
          return o.size;
        for (const h of o.values())
          l += this.countInner(i + 1, s, h);
      }
      return l;
    }
  };
  return Gn.RdfStoreIndexNestedMapRecursiveQuoted = r, Gn;
}
var zn = {}, rc;
function Bu() {
  if (rc) return zn;
  rc = 1, Object.defineProperty(zn, "__esModule", { value: !0 }), zn.RdfStoreIndexNestedRecord = void 0;
  const e = Bt();
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
      const [s, o, a, l] = i, [h, p, c, m] = n;
      let _, v, I, k, L, A, x;
      const T = this.nestedRecords, S = s !== void 0 ? s in T ? [s] : [] : Object.keys(T);
      for (const C of S) {
        L = T[C], _ = h || this.dictionary.decode(Number.parseInt(C, 10));
        const D = o !== void 0 ? o in L ? [o] : [] : Object.keys(L);
        for (const j of D) {
          A = L[j], v = p || this.dictionary.decode(Number.parseInt(j, 10));
          const b = a !== void 0 ? a in A ? [a] : [] : Object.keys(A);
          for (const w of b) {
            x = A[w], I = c || this.dictionary.decode(Number.parseInt(w, 10));
            const P = l !== void 0 ? l in x ? [l] : [] : Object.keys(x);
            for (const R of P)
              k = m || this.dictionary.decode(Number.parseInt(R, 10)), yield [_, v, I, k];
          }
        }
      }
    }
    // The code below is nearly identical. We duplicate because abstraction would result in a significant performance hit.
    *findEncoded(n, i) {
      const [s, o, a, l] = n;
      let h, p, c;
      const m = this.nestedRecords, _ = s !== void 0 ? s in m ? [s] : [] : Object.keys(m);
      for (const v of _) {
        h = m[v];
        const I = o !== void 0 ? o in h ? [o] : [] : Object.keys(h);
        for (const k of I) {
          p = h[k];
          const L = a !== void 0 ? a in p ? [a] : [] : Object.keys(p);
          for (const A of L) {
            c = p[A];
            const x = l !== void 0 ? l in c ? [l] : [] : Object.keys(c);
            for (const T of x)
              yield [
                Number.parseInt(v, 10),
                Number.parseInt(k, 10),
                Number.parseInt(A, 10),
                Number.parseInt(T, 10)
              ];
          }
        }
      }
    }
    *findTermsInner(n, i, s, o) {
      if (s[n])
        for (const [a, l] of Object.entries(i)) {
          const h = [...o, Number.parseInt(a, 10)];
          yield* this.findTermsInner(n + 1, l, s, h);
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
      const o = s[0], a = s[1], l = s[2], h = s[3];
      let p, c, m;
      const _ = this.nestedRecords, v = o !== void 0 ? o in _ ? [o] : [] : Object.keys(_);
      for (const I of v) {
        p = _[I];
        const k = a !== void 0 ? a in p ? [a] : [] : Object.keys(p);
        for (const L of k) {
          c = p[L];
          const A = l !== void 0 ? l in c ? [l] : [] : Object.keys(c);
          for (const x of A)
            m = c[x], h !== void 0 ? h in m && i++ : i += Object.keys(m).length;
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
  return zn.RdfStoreIndexNestedRecord = t, zn;
}
var Yn = {}, nc;
function xp() {
  if (nc) return Yn;
  nc = 1, Object.defineProperty(Yn, "__esModule", { value: !0 }), Yn.RdfStoreIndexNestedRecordQuoted = void 0;
  const e = Bt(), t = Bu();
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
      const [o, a, l, h] = s, [p, c, m, _] = i, [v, I, k, L] = (0, e.arePatternsQuoted)(i);
      let A, x, T, S, C, D, j;
      const b = this.nestedRecords, w = p !== void 0 ? v ? this.getQuotedPatternKeys(b, p) : o in b ? [o] : [] : Object.keys(b);
      for (const P of w) {
        C = b[P], A = !v && p ? p : this.dictionary.decode(Number.parseInt(P, 10));
        const R = c !== void 0 ? I ? this.getQuotedPatternKeys(C, c) : a in C ? [a] : [] : Object.keys(C);
        for (const Q of R) {
          D = C[Q], x = !I && c ? c : this.dictionary.decode(Number.parseInt(Q, 10));
          const Y = m !== void 0 ? k ? this.getQuotedPatternKeys(D, m) : l in D ? [l] : [] : Object.keys(D);
          for (const Z of Y) {
            j = D[Z], T = !k && m ? m : this.dictionary.decode(Number.parseInt(Z, 10));
            const z = _ !== void 0 ? L ? this.getQuotedPatternKeys(j, _) : h in j ? [h] : [] : Object.keys(j);
            for (const ne of z)
              S = !L && _ ? _ : this.dictionary.decode(Number.parseInt(ne, 10)), yield [A, x, T, S];
          }
        }
      }
    }
    // The code below is nearly identical. We duplicate because abstraction would result in a significant performance hit.
    *findEncoded(i, s) {
      const [o, a, l, h] = i, [p, c, m, _] = s, [v, I, k, L] = (0, e.arePatternsQuoted)(s);
      let A, x, T;
      const S = this.nestedRecords, C = p !== void 0 ? v ? this.getQuotedPatternKeys(S, p) : o in S ? [o] : [] : Object.keys(S);
      for (const D of C) {
        A = S[D];
        const j = c !== void 0 ? I ? this.getQuotedPatternKeys(A, c) : a in A ? [a] : [] : Object.keys(A);
        for (const b of j) {
          x = A[b];
          const w = m !== void 0 ? k ? this.getQuotedPatternKeys(x, m) : l in x ? [l] : [] : Object.keys(x);
          for (const P of w) {
            T = x[P];
            const R = _ !== void 0 ? L ? this.getQuotedPatternKeys(T, _) : h in T ? [h] : [] : Object.keys(T);
            for (const Q of R)
              yield [
                Number.parseInt(D, 10),
                Number.parseInt(b, 10),
                Number.parseInt(P, 10),
                Number.parseInt(Q, 10)
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
      const [a, l, h, p] = o, [c, m, _, v] = i, [I, k, L, A] = (0, e.arePatternsQuoted)(i);
      let x, T, S;
      const C = this.nestedRecords, D = c !== void 0 ? I ? this.getQuotedPatternKeys(C, c) : a in C ? [a] : [] : Object.keys(C);
      for (const j of D) {
        x = C[j];
        const b = m !== void 0 ? k ? this.getQuotedPatternKeys(x, m) : l in x ? [l] : [] : Object.keys(x);
        for (const w of b) {
          T = x[w];
          const P = _ !== void 0 ? L ? this.getQuotedPatternKeys(T, _) : h in T ? [h] : [] : Object.keys(T);
          for (const R of P)
            S = T[R], v !== void 0 ? A ? s += [...this.getQuotedPatternKeys(S, v)].length : p in S && s++ : s += Object.keys(S).length;
        }
      }
      return s;
    }
  };
  return Yn.RdfStoreIndexNestedRecordQuoted = r, Yn;
}
var So = {}, ic;
function Np() {
  return ic || (ic = 1, Object.defineProperty(So, "__esModule", { value: !0 })), So;
}
var Eo = {}, sc;
function Ap() {
  return sc || (sc = 1, Object.defineProperty(Eo, "__esModule", { value: !0 })), Eo;
}
var oc;
function Rp() {
  return oc || (oc = 1, (function(e) {
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
    Object.defineProperty(e, "__esModule", { value: !0 }), r(ju(), e), r(yp(), e), r(bp(), e), r(Tp(), e), r(Pu(), e), r(vp(), e), r(Mu(), e), r(Sp(), e), r(Ep(), e), r(wp(), e), r(ba(), e), r(Du(), e), r(Fu(), e), r(Ip(), e), r(Bu(), e), r(xp(), e), r(Np(), e), r(Bt(), e), r(Ap(), e), r(ku(), e);
  })(vr)), vr;
}
var Cp = Rp();
const { QueryEngine: Uo } = window.ComunicaShacl || {};
let wo = null;
function Op() {
  return wo || (wo = new Worker("worker.js")), wo;
}
function Pp({ shaclQuery: e, turtleData: t }) {
  return new Promise((r, n) => {
    const i = Op();
    i.onmessage = (s) => {
      s.data.type === "result" ? r(s.data) : s.data.type === "error" && n(new Error(s.data.error));
    }, i.onerror = (s) => n(new Error(s.message)), i.postMessage({ shaclQuery: e, turtleData: t });
  });
}
function Uu(e) {
  return e.split(`
`).filter((t) => /^\s*PREFIX\s+/i.test(t)).join(`
`);
}
function Mp(e) {
  const t = {};
  for (const r of e.split(`
`)) {
    const n = r.match(/PREFIX\s+(\S*):\s*<([^>]+)>/i);
    n && (t[n[1] || ""] = n[2]);
  }
  return t;
}
let $u = null;
function Vu(e) {
  return [];
}
async function Dp({ shaclQuery: e, turtleData: t }, r) {
  if (!Uo) throw new Error("Engine bundle not loaded. Ensure engine-browser.js is loaded before app.bundle.js.");
  await new Promise((o) => setTimeout(o, 0));
  const n = new Uo(), i = Cp.RdfStore.createDefault();
  if (t && t.trim()) {
    const o = Uu(e), a = new wu();
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
      $u = i, o();
    });
  });
}
function kp(e, t) {
  const r = e.indexOf(":");
  if (r === -1) {
    const s = t[""] || "";
    return s ? s + e : e;
  }
  const n = e.slice(0, r), i = e.slice(r + 1);
  return (t[n] || "") + i;
}
function Lp(e, t, r) {
  const n = e.split(".").map((i) => i.trim()).filter(Boolean);
  for (const i of n) {
    const s = i.split(/\s+/).filter(Boolean);
    if (s.length !== 3) continue;
    const [o, a, l] = s.map((p) => kp(p, r));
    if (a !== t.predicate) continue;
    const h = {};
    if (!(!o.startsWith("?") && o !== t.subject) && !(!l.startsWith("?") && l !== t.object))
      return o.startsWith("?") && (h[o.slice(1)] = t.subject), l.startsWith("?") && (h[l.slice(1)] = t.object), h;
  }
  return null;
}
async function jp(e, t) {
  if (!$u || !Uo) return [];
  const r = Vu(), n = Mp(Uu(e) || ""), i = [];
  for (const s of r) {
    const o = Lp(s.head, t, n);
    o && i.push({ ruleIndex: s.index, ruleHead: s.head, ruleBody: s.body, bindings: o, bindingRows: [] });
  }
  return i;
}
typeof window < "u" && (window.ShaclEngine = { runShaclQuery: Dp, runInWorker: Pp, explainTriple: jp, parseRules: Vu });
/**
* @vue/shared v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function Ze(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const r of e.split(",")) t[r] = 1;
  return (r) => r in t;
}
const de = {}, Zr = [], Qe = () => {
}, Jr = () => !1, Qr = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Vs = (e) => e.startsWith("onUpdate:"), fe = Object.assign, Ta = (e, t) => {
  const r = e.indexOf(t);
  r > -1 && e.splice(r, 1);
}, Fp = Object.prototype.hasOwnProperty, Te = (e, t) => Fp.call(e, t), ee = Array.isArray, en = (e) => yn(e) === "[object Map]", Hr = (e) => yn(e) === "[object Set]", ac = (e) => yn(e) === "[object Date]", Bp = (e) => yn(e) === "[object RegExp]", oe = (e) => typeof e == "function", ae = (e) => typeof e == "string", Je = (e) => typeof e == "symbol", be = (e) => e !== null && typeof e == "object", va = (e) => (be(e) || oe(e)) && oe(e.then) && oe(e.catch), Qu = Object.prototype.toString, yn = (e) => Qu.call(e), Up = (e) => yn(e).slice(8, -1), Qs = (e) => yn(e) === "[object Object]", Hs = (e) => ae(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Zt = /* @__PURE__ */ Ze(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), $p = /* @__PURE__ */ Ze(
  "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
), qs = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((r) => t[r] || (t[r] = e(r)));
}, Vp = /-\w/g, Ie = qs(
  (e) => e.replace(Vp, (t) => t.slice(1).toUpperCase())
), Qp = /\B([A-Z])/g, nt = qs(
  (e) => e.replace(Qp, "-$1").toLowerCase()
), qr = qs((e) => e.charAt(0).toUpperCase() + e.slice(1)), tn = qs(
  (e) => e ? `on${qr(e)}` : ""
), Ve = (e, t) => !Object.is(e, t), rn = (e, ...t) => {
  for (let r = 0; r < e.length; r++)
    e[r](...t);
}, ln = (e, t, r, n = !1) => {
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
let lc;
const Mr = () => lc || (lc = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Hp(e, t) {
  return e + JSON.stringify(
    t,
    (r, n) => typeof n == "function" ? n.toString() : n
  );
}
const qp = "Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console,Error,Symbol", Kp = /* @__PURE__ */ Ze(qp);
function bn(e) {
  if (ee(e)) {
    const t = {};
    for (let r = 0; r < e.length; r++) {
      const n = e[r], i = ae(n) ? Hu(n) : bn(n);
      if (i)
        for (const s in i)
          t[s] = i[s];
    }
    return t;
  } else if (ae(e) || be(e))
    return e;
}
const Wp = /;(?![^(]*\))/g, Gp = /:([^]+)/, zp = /\/\*[^]*?\*\//g;
function Hu(e) {
  const t = {};
  return e.replace(zp, "").split(Wp).forEach((r) => {
    if (r) {
      const n = r.split(Gp);
      n.length > 1 && (t[n[0].trim()] = n[1].trim());
    }
  }), t;
}
function Yp(e) {
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
function Tn(e) {
  let t = "";
  if (ae(e))
    t = e;
  else if (ee(e))
    for (let r = 0; r < e.length; r++) {
      const n = Tn(e[r]);
      n && (t += n + " ");
    }
  else if (be(e))
    for (const r in e)
      e[r] && (t += r + " ");
  return t.trim();
}
function Xp(e) {
  if (!e) return null;
  let { class: t, style: r } = e;
  return t && !ae(t) && (e.class = Tn(t)), r && (e.style = bn(r)), e;
}
const Jp = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot", Zp = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view", em = "annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics", tm = "area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr", rm = /* @__PURE__ */ Ze(Jp), nm = /* @__PURE__ */ Ze(Zp), im = /* @__PURE__ */ Ze(em), sm = /* @__PURE__ */ Ze(tm), qu = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", om = /* @__PURE__ */ Ze(qu), cc = /* @__PURE__ */ Ze(
  qu + ",async,autofocus,autoplay,controls,default,defer,disabled,hidden,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected"
);
function Sa(e) {
  return !!e || e === "";
}
const am = /* @__PURE__ */ Ze(
  "accept,accept-charset,accesskey,action,align,allow,alt,async,autocapitalize,autocomplete,autofocus,autoplay,background,bgcolor,border,buffered,capture,challenge,charset,checked,cite,class,code,codebase,color,cols,colspan,content,contenteditable,contextmenu,controls,coords,crossorigin,csp,data,datetime,decoding,default,defer,dir,dirname,disabled,download,draggable,dropzone,enctype,enterkeyhint,for,form,formaction,formenctype,formmethod,formnovalidate,formtarget,headers,height,hidden,high,href,hreflang,http-equiv,icon,id,importance,inert,integrity,ismap,itemprop,keytype,kind,label,lang,language,loading,list,loop,low,manifest,max,maxlength,minlength,media,min,multiple,muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,preload,radiogroup,readonly,referrerpolicy,rel,required,reversed,rows,rowspan,sandbox,scope,scoped,selected,shape,size,sizes,slot,span,spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,target,title,translate,type,usemap,value,width,wrap"
), lm = /* @__PURE__ */ Ze(
  "xmlns,accent-height,accumulate,additive,alignment-baseline,alphabetic,amplitude,arabic-form,ascent,attributeName,attributeType,azimuth,baseFrequency,baseline-shift,baseProfile,bbox,begin,bias,by,calcMode,cap-height,class,clip,clipPathUnits,clip-path,clip-rule,color,color-interpolation,color-interpolation-filters,color-profile,color-rendering,contentScriptType,contentStyleType,crossorigin,cursor,cx,cy,d,decelerate,descent,diffuseConstant,direction,display,divisor,dominant-baseline,dur,dx,dy,edgeMode,elevation,enable-background,end,exponent,fill,fill-opacity,fill-rule,filter,filterRes,filterUnits,flood-color,flood-opacity,font-family,font-size,font-size-adjust,font-stretch,font-style,font-variant,font-weight,format,from,fr,fx,fy,g1,g2,glyph-name,glyph-orientation-horizontal,glyph-orientation-vertical,glyphRef,gradientTransform,gradientUnits,hanging,height,href,hreflang,horiz-adv-x,horiz-origin-x,id,ideographic,image-rendering,in,in2,intercept,k,k1,k2,k3,k4,kernelMatrix,kernelUnitLength,kerning,keyPoints,keySplines,keyTimes,lang,lengthAdjust,letter-spacing,lighting-color,limitingConeAngle,local,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mask,maskContentUnits,maskUnits,mathematical,max,media,method,min,mode,name,numOctaves,offset,opacity,operator,order,orient,orientation,origin,overflow,overline-position,overline-thickness,panose-1,paint-order,path,pathLength,patternContentUnits,patternTransform,patternUnits,ping,pointer-events,points,pointsAtX,pointsAtY,pointsAtZ,preserveAlpha,preserveAspectRatio,primitiveUnits,r,radius,referrerPolicy,refX,refY,rel,rendering-intent,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,result,rotate,rx,ry,scale,seed,shape-rendering,slope,spacing,specularConstant,specularExponent,speed,spreadMethod,startOffset,stdDeviation,stemh,stemv,stitchTiles,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,string,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,style,surfaceScale,systemLanguage,tabindex,tableValues,target,targetX,targetY,text-anchor,text-decoration,text-rendering,textLength,to,transform,transform-origin,type,u1,u2,underline-position,underline-thickness,unicode,unicode-bidi,unicode-range,units-per-em,v-alphabetic,v-hanging,v-ideographic,v-mathematical,values,vector-effect,version,vert-adv-y,vert-origin-x,vert-origin-y,viewBox,viewTarget,visibility,width,widths,word-spacing,writing-mode,x,x-height,x1,x2,xChannelSelector,xlink:actuate,xlink:arcrole,xlink:href,xlink:role,xlink:show,xlink:title,xlink:type,xmlns:xlink,xml:base,xml:lang,xml:space,y,y1,y2,yChannelSelector,z,zoomAndPan"
);
function cm(e) {
  if (e == null)
    return !1;
  const t = typeof e;
  return t === "string" || t === "number" || t === "boolean";
}
const um = /[ !"#$%&'()*+,./:;<=>?@[\\\]^`{|}~]/g;
function fm(e, t) {
  return e.replace(
    um,
    (r) => `\\${r}`
  );
}
function dm(e, t) {
  if (e.length !== t.length) return !1;
  let r = !0;
  for (let n = 0; r && n < e.length; n++)
    r = ir(e[n], t[n]);
  return r;
}
function ir(e, t) {
  if (e === t) return !0;
  let r = ac(e), n = ac(t);
  if (r || n)
    return r && n ? e.getTime() === t.getTime() : !1;
  if (r = Je(e), n = Je(t), r || n)
    return e === t;
  if (r = ee(e), n = ee(t), r || n)
    return r && n ? dm(e, t) : !1;
  if (r = be(e), n = be(t), r || n) {
    if (!r || !n)
      return !1;
    const i = Object.keys(e).length, s = Object.keys(t).length;
    if (i !== s)
      return !1;
    for (const o in e) {
      const a = e.hasOwnProperty(o), l = t.hasOwnProperty(o);
      if (a && !l || !a && l || !ir(e[o], t[o]))
        return !1;
    }
  }
  return String(e) === String(t);
}
function Ws(e, t) {
  return e.findIndex((r) => ir(r, t));
}
const Ku = (e) => !!(e && e.__v_isRef === !0), Wu = (e) => ae(e) ? e : e == null ? "" : ee(e) || be(e) && (e.toString === Qu || !oe(e.toString)) ? Ku(e) ? Wu(e.value) : JSON.stringify(e, Gu, 2) : String(e), Gu = (e, t) => Ku(t) ? Gu(e, t.value) : en(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (r, [n, i], s) => (r[Io(n, s) + " =>"] = i, r),
    {}
  )
} : Hr(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((r) => Io(r))
} : Je(t) ? Io(t) : be(t) && !ee(t) && !Qs(t) ? String(t) : t, Io = (e, t = "") => {
  var r;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Je(e) ? `Symbol(${(r = e.description) != null ? r : t})` : e
  );
};
function zu(e) {
  return e == null ? "initial" : typeof e == "string" ? e === "" ? " " : e : String(e);
}
/**
* @vue/reactivity v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Be;
class Ea {
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
function hm(e) {
  return new Ea(e);
}
function Yu() {
  return Be;
}
function pm(e, t = !1) {
  Be && Be.cleanups.push(e);
}
let xe;
const xo = /* @__PURE__ */ new WeakSet();
class yi {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Be && (Be.active ? Be.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, xo.has(this) && (xo.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Ju(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, uc(this), Zu(this);
    const t = xe, r = xt;
    xe = this, xt = !0;
    try {
      return this.fn();
    } finally {
      ef(this), xe = t, xt = r, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        xa(t);
      this.deps = this.depsTail = void 0, uc(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? xo.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    $o(this) && this.run();
  }
  get dirty() {
    return $o(this);
  }
}
let Xu = 0, ui, fi;
function Ju(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = fi, fi = e;
    return;
  }
  e.next = ui, ui = e;
}
function wa() {
  Xu++;
}
function Ia() {
  if (--Xu > 0)
    return;
  if (fi) {
    let t = fi;
    for (fi = void 0; t; ) {
      const r = t.next;
      t.next = void 0, t.flags &= -9, t = r;
    }
  }
  let e;
  for (; ui; ) {
    let t = ui;
    for (ui = void 0; t; ) {
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
function Zu(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function ef(e) {
  let t, r = e.depsTail, n = r;
  for (; n; ) {
    const i = n.prevDep;
    n.version === -1 ? (n === r && (r = i), xa(n), mm(n)) : t = n, n.dep.activeLink = n.prevActiveLink, n.prevActiveLink = void 0, n = i;
  }
  e.deps = t, e.depsTail = r;
}
function $o(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (tf(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function tf(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === bi) || (e.globalVersion = bi, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !$o(e))))
    return;
  e.flags |= 2;
  const t = e.dep, r = xe, n = xt;
  xe = e, xt = !0;
  try {
    Zu(e);
    const i = e.fn(e._value);
    (t.version === 0 || Ve(i, e._value)) && (e.flags |= 128, e._value = i, t.version++);
  } catch (i) {
    throw t.version++, i;
  } finally {
    xe = r, xt = n, ef(e), e.flags &= -3;
  }
}
function xa(e, t = !1) {
  const { dep: r, prevSub: n, nextSub: i } = e;
  if (n && (n.nextSub = i, e.prevSub = void 0), i && (i.prevSub = n, e.nextSub = void 0), r.subs === e && (r.subs = n, !n && r.computed)) {
    r.computed.flags &= -5;
    for (let s = r.computed.deps; s; s = s.nextDep)
      xa(s, !0);
  }
  !t && !--r.sc && r.map && r.map.delete(r.key);
}
function mm(e) {
  const { prevDep: t, nextDep: r } = e;
  t && (t.nextDep = r, e.prevDep = void 0), r && (r.prevDep = t, e.nextDep = void 0);
}
function gm(e, t) {
  e.effect instanceof yi && (e = e.effect.fn);
  const r = new yi(e);
  t && fe(r, t);
  try {
    r.run();
  } catch (i) {
    throw r.stop(), i;
  }
  const n = r.run.bind(r);
  return n.effect = r, n;
}
function _m(e) {
  e.effect.stop();
}
let xt = !0;
const rf = [];
function At() {
  rf.push(xt), xt = !1;
}
function Rt() {
  const e = rf.pop();
  xt = e === void 0 ? !0 : e;
}
function uc(e) {
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
let bi = 0;
class ym {
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
      r = this.activeLink = new ym(xe, this), xe.deps ? (r.prevDep = xe.depsTail, xe.depsTail.nextDep = r, xe.depsTail = r) : xe.deps = xe.depsTail = r, nf(r);
    else if (r.version === -1 && (r.version = this.version, r.nextDep)) {
      const n = r.nextDep;
      n.prevDep = r.prevDep, r.prevDep && (r.prevDep.nextDep = n), r.prevDep = xe.depsTail, r.nextDep = void 0, xe.depsTail.nextDep = r, xe.depsTail = r, xe.deps === r && (xe.deps = n);
    }
    return r;
  }
  trigger(t) {
    this.version++, bi++, this.notify(t);
  }
  notify(t) {
    wa();
    try {
      for (let r = this.subs; r; r = r.prevSub)
        r.sub.notify() && r.sub.dep.notify();
    } finally {
      Ia();
    }
  }
}
function nf(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let n = t.deps; n; n = n.nextDep)
        nf(n);
    }
    const r = e.dep.subs;
    r !== e && (e.prevSub = r, r && (r.nextSub = e)), e.dep.subs = e;
  }
}
const hs = /* @__PURE__ */ new WeakMap(), Dr = /* @__PURE__ */ Symbol(
  ""
), Vo = /* @__PURE__ */ Symbol(
  ""
), Ti = /* @__PURE__ */ Symbol(
  ""
);
function ze(e, t, r) {
  if (xt && xe) {
    let n = hs.get(e);
    n || hs.set(e, n = /* @__PURE__ */ new Map());
    let i = n.get(r);
    i || (n.set(r, i = new Gs()), i.map = n, i.key = r), i.track();
  }
}
function Yt(e, t, r, n, i, s) {
  const o = hs.get(e);
  if (!o) {
    bi++;
    return;
  }
  const a = (l) => {
    l && l.trigger();
  };
  if (wa(), t === "clear")
    o.forEach(a);
  else {
    const l = ee(e), h = l && Hs(r);
    if (l && r === "length") {
      const p = Number(n);
      o.forEach((c, m) => {
        (m === "length" || m === Ti || !Je(m) && m >= p) && a(c);
      });
    } else
      switch ((r !== void 0 || o.has(void 0)) && a(o.get(r)), h && a(o.get(Ti)), t) {
        case "add":
          l ? h && a(o.get("length")) : (a(o.get(Dr)), en(e) && a(o.get(Vo)));
          break;
        case "delete":
          l || (a(o.get(Dr)), en(e) && a(o.get(Vo)));
          break;
        case "set":
          en(e) && a(o.get(Dr));
          break;
      }
  }
  Ia();
}
function bm(e, t) {
  const r = hs.get(e);
  return r && r.get(t);
}
function Gr(e) {
  const t = /* @__PURE__ */ pe(e);
  return t === e ? t : (ze(t, "iterate", Ti), /* @__PURE__ */ ct(e) ? t : t.map(Ct));
}
function zs(e) {
  return ze(e = /* @__PURE__ */ pe(e), "iterate", Ti), e;
}
function kt(e, t) {
  return /* @__PURE__ */ Lt(e) ? cn(/* @__PURE__ */ er(e) ? Ct(t) : t) : Ct(t);
}
const Tm = {
  __proto__: null,
  [Symbol.iterator]() {
    return No(this, Symbol.iterator, (e) => kt(this, e));
  },
  concat(...e) {
    return Gr(this).concat(
      ...e.map((t) => ee(t) ? Gr(t) : t)
    );
  },
  entries() {
    return No(this, "entries", (e) => (e[1] = kt(this, e[1]), e));
  },
  every(e, t) {
    return Vt(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return Vt(
      this,
      "filter",
      e,
      t,
      (r) => r.map((n) => kt(this, n)),
      arguments
    );
  },
  find(e, t) {
    return Vt(
      this,
      "find",
      e,
      t,
      (r) => kt(this, r),
      arguments
    );
  },
  findIndex(e, t) {
    return Vt(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Vt(
      this,
      "findLast",
      e,
      t,
      (r) => kt(this, r),
      arguments
    );
  },
  findLastIndex(e, t) {
    return Vt(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return Vt(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return Ao(this, "includes", e);
  },
  indexOf(...e) {
    return Ao(this, "indexOf", e);
  },
  join(e) {
    return Gr(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return Ao(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Vt(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Xn(this, "pop");
  },
  push(...e) {
    return Xn(this, "push", e);
  },
  reduce(e, ...t) {
    return fc(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return fc(this, "reduceRight", e, t);
  },
  shift() {
    return Xn(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return Vt(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Xn(this, "splice", e);
  },
  toReversed() {
    return Gr(this).toReversed();
  },
  toSorted(e) {
    return Gr(this).toSorted(e);
  },
  toSpliced(...e) {
    return Gr(this).toSpliced(...e);
  },
  unshift(...e) {
    return Xn(this, "unshift", e);
  },
  values() {
    return No(this, "values", (e) => kt(this, e));
  }
};
function No(e, t, r) {
  const n = zs(e), i = n[t]();
  return n !== e && !/* @__PURE__ */ ct(e) && (i._next = i.next, i.next = () => {
    const s = i._next();
    return s.done || (s.value = r(s.value)), s;
  }), i;
}
const vm = Array.prototype;
function Vt(e, t, r, n, i, s) {
  const o = zs(e), a = o !== e && !/* @__PURE__ */ ct(e), l = o[t];
  if (l !== vm[t]) {
    const c = l.apply(e, s);
    return a ? Ct(c) : c;
  }
  let h = r;
  o !== e && (a ? h = function(c, m) {
    return r.call(this, kt(e, c), m, e);
  } : r.length > 2 && (h = function(c, m) {
    return r.call(this, c, m, e);
  }));
  const p = l.call(o, h, n);
  return a && i ? i(p) : p;
}
function fc(e, t, r, n) {
  const i = zs(e), s = i !== e && !/* @__PURE__ */ ct(e);
  let o = r, a = !1;
  i !== e && (s ? (a = n.length === 0, o = function(h, p, c) {
    return a && (a = !1, h = kt(e, h)), r.call(this, h, kt(e, p), c, e);
  }) : r.length > 3 && (o = function(h, p, c) {
    return r.call(this, h, p, c, e);
  }));
  const l = i[t](o, ...n);
  return a ? kt(e, l) : l;
}
function Ao(e, t, r) {
  const n = /* @__PURE__ */ pe(e);
  ze(n, "iterate", Ti);
  const i = n[t](...r);
  return (i === -1 || i === !1) && /* @__PURE__ */ Li(r[0]) ? (r[0] = /* @__PURE__ */ pe(r[0]), n[t](...r)) : i;
}
function Xn(e, t, r = []) {
  At(), wa();
  const n = (/* @__PURE__ */ pe(e))[t].apply(e, r);
  return Ia(), Rt(), n;
}
const Sm = /* @__PURE__ */ Ze("__proto__,__v_isRef,__isVue"), sf = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Je)
);
function Em(e) {
  Je(e) || (e = String(e));
  const t = /* @__PURE__ */ pe(this);
  return ze(t, "has", e), t.hasOwnProperty(e);
}
class of {
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
      return n === (i ? s ? df : ff : s ? uf : cf).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(n) ? t : void 0;
    const o = ee(t);
    if (!i) {
      let l;
      if (o && (l = Tm[r]))
        return l;
      if (r === "hasOwnProperty")
        return Em;
    }
    const a = Reflect.get(
      t,
      r,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ De(t) ? t : n
    );
    if ((Je(r) ? sf.has(r) : Sm(r)) || (i || ze(t, "get", r), s))
      return a;
    if (/* @__PURE__ */ De(a)) {
      const l = o && Hs(r) ? a : a.value;
      return i && be(l) ? /* @__PURE__ */ ps(l) : l;
    }
    return be(a) ? i ? /* @__PURE__ */ ps(a) : /* @__PURE__ */ Xs(a) : a;
  }
}
class af extends of {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, r, n, i) {
    let s = t[r];
    const o = ee(t) && Hs(r);
    if (!this._isShallow) {
      const h = /* @__PURE__ */ Lt(s);
      if (!/* @__PURE__ */ ct(n) && !/* @__PURE__ */ Lt(n) && (s = /* @__PURE__ */ pe(s), n = /* @__PURE__ */ pe(n)), !o && /* @__PURE__ */ De(s) && !/* @__PURE__ */ De(n))
        return h || (s.value = n), !0;
    }
    const a = o ? Number(r) < t.length : Te(t, r), l = Reflect.set(
      t,
      r,
      n,
      /* @__PURE__ */ De(t) ? t : i
    );
    return t === /* @__PURE__ */ pe(i) && l && (a ? Ve(n, s) && Yt(t, "set", r, n) : Yt(t, "add", r, n)), l;
  }
  deleteProperty(t, r) {
    const n = Te(t, r);
    t[r];
    const i = Reflect.deleteProperty(t, r);
    return i && n && Yt(t, "delete", r, void 0), i;
  }
  has(t, r) {
    const n = Reflect.has(t, r);
    return (!Je(r) || !sf.has(r)) && ze(t, "has", r), n;
  }
  ownKeys(t) {
    return ze(
      t,
      "iterate",
      ee(t) ? "length" : Dr
    ), Reflect.ownKeys(t);
  }
}
class lf extends of {
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
const wm = /* @__PURE__ */ new af(), Im = /* @__PURE__ */ new lf(), xm = /* @__PURE__ */ new af(!0), Nm = /* @__PURE__ */ new lf(!0), Qo = (e) => e, Yi = (e) => Reflect.getPrototypeOf(e);
function Am(e, t, r) {
  return function(...n) {
    const i = this.__v_raw, s = /* @__PURE__ */ pe(i), o = en(s), a = e === "entries" || e === Symbol.iterator && o, l = e === "keys" && o, h = i[e](...n), p = r ? Qo : t ? cn : Ct;
    return !t && ze(
      s,
      "iterate",
      l ? Vo : Dr
    ), fe(
      // inheriting all iterator properties
      Object.create(h),
      {
        // iterator protocol
        next() {
          const { value: c, done: m } = h.next();
          return m ? { value: c, done: m } : {
            value: a ? [p(c[0]), p(c[1])] : p(c),
            done: m
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
function Rm(e, t) {
  const r = {
    get(i) {
      const s = this.__v_raw, o = /* @__PURE__ */ pe(s), a = /* @__PURE__ */ pe(i);
      e || (Ve(i, a) && ze(o, "get", i), ze(o, "get", a));
      const { has: l } = Yi(o), h = t ? Qo : e ? cn : Ct;
      if (l.call(o, i))
        return h(s.get(i));
      if (l.call(o, a))
        return h(s.get(a));
      s !== o && s.get(i);
    },
    get size() {
      const i = this.__v_raw;
      return !e && ze(/* @__PURE__ */ pe(i), "iterate", Dr), i.size;
    },
    has(i) {
      const s = this.__v_raw, o = /* @__PURE__ */ pe(s), a = /* @__PURE__ */ pe(i);
      return e || (Ve(i, a) && ze(o, "has", i), ze(o, "has", a)), i === a ? s.has(i) : s.has(i) || s.has(a);
    },
    forEach(i, s) {
      const o = this, a = o.__v_raw, l = /* @__PURE__ */ pe(a), h = t ? Qo : e ? cn : Ct;
      return !e && ze(l, "iterate", Dr), a.forEach((p, c) => i.call(s, h(p), h(c), o));
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
        return o.has.call(s, l) || Ve(i, l) && o.has.call(s, i) || Ve(a, l) && o.has.call(s, a) || (s.add(l), Yt(s, "add", l, l)), this;
      },
      set(i, s) {
        !t && !/* @__PURE__ */ ct(s) && !/* @__PURE__ */ Lt(s) && (s = /* @__PURE__ */ pe(s));
        const o = /* @__PURE__ */ pe(this), { has: a, get: l } = Yi(o);
        let h = a.call(o, i);
        h || (i = /* @__PURE__ */ pe(i), h = a.call(o, i));
        const p = l.call(o, i);
        return o.set(i, s), h ? Ve(s, p) && Yt(o, "set", i, s) : Yt(o, "add", i, s), this;
      },
      delete(i) {
        const s = /* @__PURE__ */ pe(this), { has: o, get: a } = Yi(s);
        let l = o.call(s, i);
        l || (i = /* @__PURE__ */ pe(i), l = o.call(s, i)), a && a.call(s, i);
        const h = s.delete(i);
        return l && Yt(s, "delete", i, void 0), h;
      },
      clear() {
        const i = /* @__PURE__ */ pe(this), s = i.size !== 0, o = i.clear();
        return s && Yt(
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
    r[i] = Am(i, e, t);
  }), r;
}
function Ys(e, t) {
  const r = Rm(e, t);
  return (n, i, s) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? n : Reflect.get(
    Te(r, i) && i in n ? r : n,
    i,
    s
  );
}
const Cm = {
  get: /* @__PURE__ */ Ys(!1, !1)
}, Om = {
  get: /* @__PURE__ */ Ys(!1, !0)
}, Pm = {
  get: /* @__PURE__ */ Ys(!0, !1)
}, Mm = {
  get: /* @__PURE__ */ Ys(!0, !0)
}, cf = /* @__PURE__ */ new WeakMap(), uf = /* @__PURE__ */ new WeakMap(), ff = /* @__PURE__ */ new WeakMap(), df = /* @__PURE__ */ new WeakMap();
function Dm(e) {
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
    wm,
    Cm,
    cf
  );
}
// @__NO_SIDE_EFFECTS__
function hf(e) {
  return Js(
    e,
    !1,
    xm,
    Om,
    uf
  );
}
// @__NO_SIDE_EFFECTS__
function ps(e) {
  return Js(
    e,
    !0,
    Im,
    Pm,
    ff
  );
}
// @__NO_SIDE_EFFECTS__
function km(e) {
  return Js(
    e,
    !0,
    Nm,
    Mm,
    df
  );
}
function Js(e, t, r, n, i) {
  if (!be(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const s = i.get(e);
  if (s)
    return s;
  const o = Dm(Up(e));
  if (o === 0)
    return e;
  const a = new Proxy(
    e,
    o === 2 ? n : r
  );
  return i.set(e, a), a;
}
// @__NO_SIDE_EFFECTS__
function er(e) {
  return /* @__PURE__ */ Lt(e) ? /* @__PURE__ */ er(e.__v_raw) : !!(e && e.__v_isReactive);
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
function pf(e) {
  return !Te(e, "__v_skip") && Object.isExtensible(e) && ln(e, "__v_skip", !0), e;
}
const Ct = (e) => be(e) ? /* @__PURE__ */ Xs(e) : e, cn = (e) => be(e) ? /* @__PURE__ */ ps(e) : e;
// @__NO_SIDE_EFFECTS__
function De(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function Ee(e) {
  return gf(e, !1);
}
// @__NO_SIDE_EFFECTS__
function mf(e) {
  return gf(e, !0);
}
function gf(e, t) {
  return /* @__PURE__ */ De(e) ? e : new Lm(e, t);
}
class Lm {
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
function jm(e) {
  e.dep && e.dep.trigger();
}
function ji(e) {
  return /* @__PURE__ */ De(e) ? e.value : e;
}
function Fm(e) {
  return oe(e) ? e() : ji(e);
}
const Bm = {
  get: (e, t, r) => t === "__v_raw" ? e : ji(Reflect.get(e, t, r)),
  set: (e, t, r, n) => {
    const i = e[t];
    return /* @__PURE__ */ De(i) && !/* @__PURE__ */ De(r) ? (i.value = r, !0) : Reflect.set(e, t, r, n);
  }
};
function Na(e) {
  return /* @__PURE__ */ er(e) ? e : new Proxy(e, Bm);
}
class Um {
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
function _f(e) {
  return new Um(e);
}
// @__NO_SIDE_EFFECTS__
function $m(e) {
  const t = ee(e) ? new Array(e.length) : {};
  for (const r in e)
    t[r] = yf(e, r);
  return t;
}
class Vm {
  constructor(t, r, n) {
    this._object = t, this._defaultValue = n, this.__v_isRef = !0, this._value = void 0, this._key = Je(r) ? r : String(r), this._raw = /* @__PURE__ */ pe(t);
    let i = !0, s = t;
    if (!ee(t) || Je(this._key) || !Hs(this._key))
      do
        i = !/* @__PURE__ */ Li(s) || /* @__PURE__ */ ct(s);
      while (i && (s = s.__v_raw));
    this._shallow = i;
  }
  get value() {
    let t = this._object[this._key];
    return this._shallow && (t = ji(t)), this._value = t === void 0 ? this._defaultValue : t;
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
    return bm(this._raw, this._key);
  }
}
class Qm {
  constructor(t) {
    this._getter = t, this.__v_isRef = !0, this.__v_isReadonly = !0, this._value = void 0;
  }
  get value() {
    return this._value = this._getter();
  }
}
// @__NO_SIDE_EFFECTS__
function Hm(e, t, r) {
  return /* @__PURE__ */ De(e) ? e : oe(e) ? new Qm(e) : be(e) && arguments.length > 1 ? yf(e, t, r) : /* @__PURE__ */ Ee(e);
}
function yf(e, t, r) {
  return new Vm(e, t, r);
}
class qm {
  constructor(t, r, n) {
    this.fn = t, this.setter = r, this._value = void 0, this.dep = new Gs(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = bi - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !r, this.isSSR = n;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    xe !== this)
      return Ju(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return tf(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function Km(e, t, r = !1) {
  let n, i;
  return oe(e) ? n = e : (n = e.get, i = e.set), new qm(n, i, r);
}
const Wm = {
  GET: "get",
  HAS: "has",
  ITERATE: "iterate"
}, Gm = {
  SET: "set",
  ADD: "add",
  DELETE: "delete",
  CLEAR: "clear"
}, Ji = {}, ms = /* @__PURE__ */ new WeakMap();
let pr;
function zm() {
  return pr;
}
function bf(e, t = !1, r = pr) {
  if (r) {
    let n = ms.get(r);
    n || ms.set(r, n = []), n.push(e);
  }
}
function Ym(e, t, r = de) {
  const { immediate: n, deep: i, once: s, scheduler: o, augmentJob: a, call: l } = r, h = (T) => i ? T : /* @__PURE__ */ ct(T) || i === !1 || i === 0 ? Xt(T, 1) : Xt(T);
  let p, c, m, _, v = !1, I = !1;
  if (/* @__PURE__ */ De(e) ? (c = () => e.value, v = /* @__PURE__ */ ct(e)) : /* @__PURE__ */ er(e) ? (c = () => h(e), v = !0) : ee(e) ? (I = !0, v = e.some((T) => /* @__PURE__ */ er(T) || /* @__PURE__ */ ct(T)), c = () => e.map((T) => {
    if (/* @__PURE__ */ De(T))
      return T.value;
    if (/* @__PURE__ */ er(T))
      return h(T);
    if (oe(T))
      return l ? l(T, 2) : T();
  })) : oe(e) ? t ? c = l ? () => l(e, 2) : e : c = () => {
    if (m) {
      At();
      try {
        m();
      } finally {
        Rt();
      }
    }
    const T = pr;
    pr = p;
    try {
      return l ? l(e, 3, [_]) : e(_);
    } finally {
      pr = T;
    }
  } : c = Qe, t && i) {
    const T = c, S = i === !0 ? 1 / 0 : i;
    c = () => Xt(T(), S);
  }
  const k = Yu(), L = () => {
    p.stop(), k && k.active && Ta(k.effects, p);
  };
  if (s && t) {
    const T = t;
    t = (...S) => {
      const C = T(...S);
      return L(), C;
    };
  }
  let A = I ? new Array(e.length).fill(Ji) : Ji;
  const x = (T) => {
    if (!(!(p.flags & 1) || !p.dirty && !T))
      if (t) {
        const S = p.run();
        if (T || i || v || (I ? S.some((C, D) => Ve(C, A[D])) : Ve(S, A))) {
          m && m();
          const C = pr;
          pr = p;
          try {
            const D = [
              S,
              // pass undefined as the old value when it's changed for the first time
              A === Ji ? void 0 : I && A[0] === Ji ? [] : A,
              _
            ];
            A = S, l ? l(t, 3, D) : (
              // @ts-expect-error
              t(...D)
            );
          } finally {
            pr = C;
          }
        }
      } else
        p.run();
  };
  return a && a(x), p = new yi(c), p.scheduler = o ? () => o(x, !1) : x, _ = (T) => bf(T, !1, p), m = p.onStop = () => {
    const T = ms.get(p);
    if (T) {
      if (l)
        l(T, 4);
      else
        for (const S of T) S();
      ms.delete(p);
    }
  }, t ? n ? x(!0) : A = p.run() : o ? o(x.bind(null, !0), !0) : p.run(), L.pause = p.pause.bind(p), L.resume = p.resume.bind(p), L.stop = L, L;
}
function Xt(e, t = 1 / 0, r) {
  if (t <= 0 || !be(e) || e.__v_skip || (r = r || /* @__PURE__ */ new Map(), (r.get(e) || 0) >= t))
    return e;
  if (r.set(e, t), t--, /* @__PURE__ */ De(e))
    Xt(e.value, t, r);
  else if (ee(e))
    for (let n = 0; n < e.length; n++)
      Xt(e[n], t, r);
  else if (Hr(e) || en(e))
    e.forEach((n) => {
      Xt(n, t, r);
    });
  else if (Qs(e)) {
    for (const n in e)
      Xt(e[n], t, r);
    for (const n of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, n) && Xt(e[n], t, r);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const kr = [];
function Xm(e) {
  kr.push(e);
}
function Jm() {
  kr.pop();
}
let Ro = !1;
function fr(e, ...t) {
  if (Ro) return;
  Ro = !0, At();
  const r = kr.length ? kr[kr.length - 1].component : null, n = r && r.appContext.config.warnHandler, i = Zm();
  if (n)
    Kr(
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
          ({ vnode: s }) => `at <${Nd(r, s.type)}>`
        ).join(`
`),
        i
      ]
    );
  else {
    const s = [`[Vue warn]: ${e}`, ...t];
    i.length && s.push(`
`, ...eg(i)), console.warn(...s);
  }
  Rt(), Ro = !1;
}
function Zm() {
  let e = kr[kr.length - 1];
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
function eg(e) {
  const t = [];
  return e.forEach((r, n) => {
    t.push(...n === 0 ? [] : [`
`], ...tg(r));
  }), t;
}
function tg({ vnode: e, recurseCount: t }) {
  const r = t > 0 ? `... (${t} recursive calls)` : "", n = e.component ? e.component.parent == null : !1, i = ` at <${Nd(
    e.component,
    e.type,
    n
  )}`, s = ">" + r;
  return e.props ? [i, ...rg(e.props), s] : [i + s];
}
function rg(e) {
  const t = [], r = Object.keys(e);
  return r.slice(0, 3).forEach((n) => {
    t.push(...Tf(n, e[n]));
  }), r.length > 3 && t.push(" ..."), t;
}
function Tf(e, t, r) {
  return ae(t) ? (t = JSON.stringify(t), r ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? r ? t : [`${e}=${t}`] : /* @__PURE__ */ De(t) ? (t = Tf(e, /* @__PURE__ */ pe(t.value), !0), r ? t : [`${e}=Ref<`, t, ">"]) : oe(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = /* @__PURE__ */ pe(t), r ? t : [`${e}=`, t]);
}
function ng(e, t) {
}
const ig = {
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
}, sg = {
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
function Kr(e, t, r, n) {
  try {
    return n ? e(...n) : e();
  } catch (i) {
    Wr(i, t, r);
  }
}
function ht(e, t, r, n) {
  if (oe(e)) {
    const i = Kr(e, t, r, n);
    return i && va(i) && i.catch((s) => {
      Wr(s, t, r);
    }), i;
  }
  if (ee(e)) {
    const i = [];
    for (let s = 0; s < e.length; s++)
      i.push(ht(e[s], t, r, n));
    return i;
  }
}
function Wr(e, t, r, n = !0) {
  const i = t ? t.vnode : null, { errorHandler: s, throwUnhandledErrorInProduction: o } = t && t.appContext.config || de;
  if (t) {
    let a = t.parent;
    const l = t.proxy, h = `https://vuejs.org/error-reference/#runtime-${r}`;
    for (; a; ) {
      const p = a.ec;
      if (p) {
        for (let c = 0; c < p.length; c++)
          if (p[c](e, l, h) === !1)
            return;
      }
      a = a.parent;
    }
    if (s) {
      At(), Kr(s, null, 10, [
        e,
        l,
        h
      ]), Rt();
      return;
    }
  }
  og(e, r, i, n, o);
}
function og(e, t, r, n = !0, i = !1) {
  if (i)
    throw e;
  console.error(e);
}
const rt = [];
let Mt = -1;
const nn = [];
let mr = null, Xr = 0;
const vf = /* @__PURE__ */ Promise.resolve();
let gs = null;
function Lr(e) {
  const t = gs || vf;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function ag(e) {
  let t = Mt + 1, r = rt.length;
  for (; t < r; ) {
    const n = t + r >>> 1, i = rt[n], s = Si(i);
    s < e || s === e && i.flags & 2 ? t = n + 1 : r = n;
  }
  return t;
}
function Aa(e) {
  if (!(e.flags & 1)) {
    const t = Si(e), r = rt[rt.length - 1];
    !r || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Si(r) ? rt.push(e) : rt.splice(ag(t), 0, e), e.flags |= 1, Sf();
  }
}
function Sf() {
  gs || (gs = vf.then(Ef));
}
function vi(e) {
  ee(e) ? nn.push(...e) : mr && e.id === -1 ? mr.splice(Xr + 1, 0, e) : e.flags & 1 || (nn.push(e), e.flags |= 1), Sf();
}
function dc(e, t, r = Mt + 1) {
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
  if (nn.length) {
    const t = [...new Set(nn)].sort(
      (r, n) => Si(r) - Si(n)
    );
    if (nn.length = 0, mr) {
      mr.push(...t);
      return;
    }
    for (mr = t, Xr = 0; Xr < mr.length; Xr++) {
      const r = mr[Xr];
      r.flags & 4 && (r.flags &= -2), r.flags & 8 || r(), r.flags &= -2;
    }
    mr = null, Xr = 0;
  }
}
const Si = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Ef(e) {
  try {
    for (Mt = 0; Mt < rt.length; Mt++) {
      const t = rt[Mt];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Kr(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; Mt < rt.length; Mt++) {
      const t = rt[Mt];
      t && (t.flags &= -2);
    }
    Mt = -1, rt.length = 0, _s(), gs = null, (rt.length || nn.length) && Ef();
  }
}
let wt, si = [], Ho = !1;
function Zs(e, ...t) {
  wt ? wt.emit(e, ...t) : Ho || si.push({ event: e, args: t });
}
function Ra(e, t) {
  var r, n;
  wt = e, wt ? (wt.enabled = !0, si.forEach(({ event: i, args: s }) => wt.emit(i, ...s)), si = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  // eslint-disable-next-line no-restricted-syntax
  !((n = (r = window.navigator) == null ? void 0 : r.userAgent) != null && n.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((s) => {
    Ra(s, t);
  }), setTimeout(() => {
    wt || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, Ho = !0, si = []);
  }, 3e3)) : (Ho = !0, si = []);
}
function lg(e, t) {
  Zs("app:init", e, t, {
    Fragment: Le,
    Text: rr,
    Comment: Pe,
    Static: yr
  });
}
function cg(e) {
  Zs("app:unmount", e);
}
const qo = /* @__PURE__ */ Ca(
  "component:added"
  /* COMPONENT_ADDED */
), wf = /* @__PURE__ */ Ca(
  "component:updated"
  /* COMPONENT_UPDATED */
), ug = /* @__PURE__ */ Ca(
  "component:removed"
  /* COMPONENT_REMOVED */
), fg = (e) => {
  wt && typeof wt.cleanupBuffer == "function" && // remove the component if it wasn't buffered
  !wt.cleanupBuffer(e) && ug(e);
};
// @__NO_SIDE_EFFECTS__
function Ca(e) {
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
function dg(e, t, r) {
  Zs(
    "component:emit",
    e.appContext.app,
    e,
    t,
    r
  );
}
let Ke = null, eo = null;
function Ei(e) {
  const t = Ke;
  return Ke = e, eo = e && e.type.__scopeId || null, t;
}
function hg(e) {
  eo = e;
}
function pg() {
  eo = null;
}
const mg = (e) => Oa;
function Oa(e, t = Ke, r) {
  if (!t || e._n)
    return e;
  const n = (...i) => {
    n._d && Ni(-1);
    const s = Ei(t);
    let o;
    try {
      o = e(...i);
    } finally {
      Ei(s), n._d && Ni(1);
    }
    return __VUE_PROD_DEVTOOLS__ && wf(t), o;
  };
  return n._n = !0, n._c = !0, n._d = !0, n;
}
function gg(e, t) {
  if (Ke === null)
    return e;
  const r = Ui(Ke), n = e.dirs || (e.dirs = []);
  for (let i = 0; i < t.length; i++) {
    let [s, o, a, l = de] = t[i];
    s && (oe(s) && (s = {
      mounted: s,
      updated: s
    }), s.deep && Xt(o), n.push({
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
function Dt(e, t, r, n) {
  const i = e.dirs, s = t && t.dirs;
  for (let o = 0; o < i.length; o++) {
    const a = i[o];
    s && (a.oldValue = s[o].value);
    let l = a.dir[n];
    l && (At(), ht(l, r, 8, [
      e.el,
      a,
      e,
      t
    ]), Rt());
  }
}
function If(e, t) {
  if (qe) {
    let r = qe.provides;
    const n = qe.parent && qe.parent.provides;
    n === r && (r = qe.provides = Object.create(n)), r[e] = t;
  }
}
function di(e, t, r = !1) {
  const n = it();
  if (n || jr) {
    let i = jr ? jr._context.provides : n ? n.parent == null || n.ce ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : void 0;
    if (i && e in i)
      return i[e];
    if (arguments.length > 1)
      return r && oe(t) ? t.call(n && n.proxy) : t;
  }
}
function _g() {
  return !!(it() || jr);
}
const xf = /* @__PURE__ */ Symbol.for("v-scx"), Nf = () => di(xf);
function yg(e, t) {
  return Fi(e, null, t);
}
function bg(e, t) {
  return Fi(
    e,
    null,
    { flush: "post" }
  );
}
function Af(e, t) {
  return Fi(
    e,
    null,
    { flush: "sync" }
  );
}
function _r(e, t, r) {
  return Fi(e, t, r);
}
function Fi(e, t, r = de) {
  const { immediate: n, deep: i, flush: s, once: o } = r, a = fe({}, r), l = t && n || !t && s !== "post";
  let h;
  if ($r) {
    if (s === "sync") {
      const _ = Nf();
      h = _.__watcherHandles || (_.__watcherHandles = []);
    } else if (!l) {
      const _ = () => {
      };
      return _.stop = Qe, _.resume = Qe, _.pause = Qe, _;
    }
  }
  const p = qe;
  a.call = (_, v, I) => ht(_, p, v, I);
  let c = !1;
  s === "post" ? a.scheduler = (_) => {
    ke(_, p && p.suspense);
  } : s !== "sync" && (c = !0, a.scheduler = (_, v) => {
    v ? _() : Aa(_);
  }), a.augmentJob = (_) => {
    t && (_.flags |= 4), c && (_.flags |= 2, p && (_.id = p.uid, _.i = p));
  };
  const m = Ym(e, t, a);
  return $r && (h ? h.push(m) : l && m()), m;
}
function Tg(e, t, r) {
  const n = this.proxy, i = ae(e) ? e.includes(".") ? Rf(n, e) : () => n[e] : e.bind(n, n);
  let s;
  oe(t) ? s = t : (s = t.handler, r = t);
  const o = En(this), a = Fi(i, s.bind(n), r);
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
const dr = /* @__PURE__ */ new WeakMap(), Cf = /* @__PURE__ */ Symbol("_vte"), Of = (e) => e.__isTeleport, Rr = (e) => e && (e.disabled || e.disabled === ""), vg = (e) => e && (e.defer || e.defer === ""), hc = (e) => typeof SVGElement < "u" && e instanceof SVGElement, pc = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement, Ko = (e, t) => {
  const r = e && e.to;
  return ae(r) ? t ? t(r) : null : r;
}, Sg = {
  name: "Teleport",
  __isTeleport: !0,
  process(e, t, r, n, i, s, o, a, l, h) {
    const {
      mc: p,
      pc: c,
      pbc: m,
      o: { insert: _, querySelector: v, createText: I, createComment: k, parentNode: L }
    } = h, A = Rr(t.props);
    let { dynamicChildren: x } = t;
    const T = (D, j, b) => {
      D.shapeFlag & 16 && p(
        D.children,
        j,
        b,
        i,
        s,
        o,
        a,
        l
      );
    }, S = (D = t) => {
      const j = Rr(D.props), b = D.target = Ko(D.props, v), w = Wo(b, D, I, _);
      b && (o !== "svg" && hc(b) ? o = "svg" : o !== "mathml" && pc(b) && (o = "mathml"), i && i.isCE && (i.ce._teleportTargets || (i.ce._teleportTargets = /* @__PURE__ */ new Set())).add(b), j || (T(D, b, w), oi(D, !1)));
    }, C = (D) => {
      const j = () => {
        if (dr.get(D) === j) {
          if (dr.delete(D), Rr(D.props)) {
            const b = L(D.el) || r;
            T(D, b, D.anchor), oi(D, !0);
          }
          S(D);
        }
      };
      dr.set(D, j), ke(j, s);
    };
    if (e == null) {
      const D = t.el = I(""), j = t.anchor = I("");
      if (_(D, r, n), _(j, r, n), vg(t.props) || s && s.pendingBranch) {
        C(t);
        return;
      }
      A && (T(t, r, j), oi(t, !0)), S();
    } else {
      t.el = e.el;
      const D = t.anchor = e.anchor, j = dr.get(e);
      if (j) {
        j.flags |= 8, dr.delete(e), C(t);
        return;
      }
      t.targetStart = e.targetStart;
      const b = t.target = e.target, w = t.targetAnchor = e.targetAnchor, P = Rr(e.props), R = P ? r : b, Q = P ? D : w;
      if (o === "svg" || hc(b) ? o = "svg" : (o === "mathml" || pc(b)) && (o = "mathml"), x ? (m(
        e.dynamicChildren,
        x,
        R,
        i,
        s,
        o,
        a
      ), Ha(e, t, !0)) : l || c(
        e,
        t,
        R,
        Q,
        i,
        s,
        o,
        a,
        !1
      ), A)
        P ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : Zi(
          t,
          r,
          D,
          h,
          1
        );
      else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
        const Y = Ko(t.props, v);
        Y && (t.target = Y, Zi(
          t,
          Y,
          null,
          h,
          0
        ));
      } else P && Zi(
        t,
        b,
        w,
        h,
        1
      );
      oi(t, A);
    }
  },
  remove(e, t, r, { um: n, o: { remove: i } }, s) {
    const {
      shapeFlag: o,
      children: a,
      anchor: l,
      targetStart: h,
      targetAnchor: p,
      target: c,
      props: m
    } = e, _ = Rr(m), v = s || !_, I = dr.get(e);
    if (I && (I.flags |= 8, dr.delete(e)), c && (i(h), i(p)), s && i(l), !I && (_ || c) && o & 16)
      for (let k = 0; k < a.length; k++) {
        const L = a[k];
        n(
          L,
          t,
          r,
          v,
          !!L.dynamicChildren
        );
      }
  },
  move: Zi,
  hydrate: Eg
};
function Zi(e, t, r, { o: { insert: n }, m: i }, s = 2) {
  s === 0 && n(e.targetAnchor, t, r);
  const { el: o, anchor: a, shapeFlag: l, children: h, props: p } = e, c = s === 2;
  if (c && n(o, t, r), !dr.has(e) && (!c || Rr(p)) && l & 16)
    for (let m = 0; m < h.length; m++)
      i(
        h[m],
        t,
        r,
        2
      );
  c && n(a, t, r);
}
function Eg(e, t, r, n, i, s, {
  o: { nextSibling: o, parentNode: a, querySelector: l, insert: h, createText: p }
}, c) {
  function m(k, L) {
    let A = L;
    for (; A; ) {
      if (A && A.nodeType === 8) {
        if (A.data === "teleport start anchor")
          t.targetStart = A;
        else if (A.data === "teleport anchor") {
          t.targetAnchor = A, k._lpa = t.targetAnchor && o(t.targetAnchor);
          break;
        }
      }
      A = o(A);
    }
  }
  function _(k, L) {
    L.anchor = c(
      o(k),
      L,
      a(k),
      r,
      n,
      i,
      s
    );
  }
  const v = t.target = Ko(
    t.props,
    l
  ), I = Rr(t.props);
  if (v) {
    const k = v._lpa || v.firstChild;
    t.shapeFlag & 16 && (I ? (_(e, t), m(v, k), t.targetAnchor || Wo(
      v,
      t,
      p,
      h,
      // if target is the same as the main view, insert anchors before current node
      // to avoid hydrating mismatch
      a(e) === v ? e : null
    )) : (t.anchor = o(e), m(v, k), t.targetAnchor || Wo(v, t, p, h), c(
      k && o(k),
      t,
      v,
      r,
      n,
      i,
      s
    ))), oi(t, I);
  } else I && t.shapeFlag & 16 && (_(e, t), t.targetStart = e, t.targetAnchor = o(e));
  return t.anchor && o(t.anchor);
}
const wg = Sg;
function oi(e, t) {
  const r = e.ctx;
  if (r && r.ut) {
    let n, i;
    for (t ? (n = e.el, i = e.anchor) : (n = e.targetStart, i = e.targetAnchor); n && n !== i; )
      n.nodeType === 1 && n.setAttribute("data-v-owner", r.uid), n = n.nextSibling;
    r.ut();
  }
}
function Wo(e, t, r, n, i = null) {
  const s = t.targetStart = r(""), o = t.targetAnchor = r("");
  return s[Cf] = o, e && (n(s, e, i), n(o, e, i)), o;
}
const _t = /* @__PURE__ */ Symbol("_leaveCb"), Jn = /* @__PURE__ */ Symbol("_enterCb");
function Pa() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return vn(() => {
    e.isMounted = !0;
  }), io(() => {
    e.isUnmounting = !0;
  }), e;
}
const gt = [Function, Array], Ma = {
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
}, Pf = (e) => {
  const t = e.subTree;
  return t.component ? Pf(t.component) : t;
}, Ig = {
  name: "BaseTransition",
  props: Ma,
  setup(e, { slots: t }) {
    const r = it(), n = Pa();
    return () => {
      const i = t.default && to(t.default(), !0), s = i && i.length ? Mf(i) : (
        // Keep explicit default-slot conditionals on the same transition path
        // as regular v-if branches, which render a comment placeholder.
        r.subTree ? bd() : void 0
      );
      if (!s)
        return;
      const o = /* @__PURE__ */ pe(e), { mode: a } = o;
      if (n.isLeaving)
        return Co(s);
      const l = mc(s);
      if (!l)
        return Co(s);
      let h = un(
        l,
        o,
        n,
        r,
        // #11061, ensure enterHooks is fresh after clone
        (c) => h = c
      );
      l.type !== Pe && sr(l, h);
      let p = r.subTree && mc(r.subTree);
      if (p && p.type !== Pe && !It(p, l) && Pf(r).type !== Pe) {
        let c = un(
          p,
          o,
          n,
          r
        );
        if (sr(p, c), a === "out-in" && l.type !== Pe)
          return n.isLeaving = !0, c.afterLeave = () => {
            n.isLeaving = !1, r.job.flags & 8 || r.update(), delete c.afterLeave, p = void 0;
          }, Co(s);
        a === "in-out" && l.type !== Pe ? c.delayLeave = (m, _, v) => {
          const I = kf(
            n,
            p
          );
          I[String(p.key)] = p, m[_t] = () => {
            _(), m[_t] = void 0, delete h.delayedLeave, p = void 0;
          }, h.delayedLeave = () => {
            v(), delete h.delayedLeave, p = void 0;
          };
        } : p = void 0;
      } else p && (p = void 0);
      return s;
    };
  }
};
function Mf(e) {
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
const Df = Ig;
function kf(e, t) {
  const { leavingVNodes: r } = e;
  let n = r.get(t.type);
  return n || (n = /* @__PURE__ */ Object.create(null), r.set(t.type, n)), n;
}
function un(e, t, r, n, i) {
  const {
    appear: s,
    mode: o,
    persisted: a = !1,
    onBeforeEnter: l,
    onEnter: h,
    onAfterEnter: p,
    onEnterCancelled: c,
    onBeforeLeave: m,
    onLeave: _,
    onAfterLeave: v,
    onLeaveCancelled: I,
    onBeforeAppear: k,
    onAppear: L,
    onAfterAppear: A,
    onAppearCancelled: x
  } = t, T = String(e.key), S = kf(r, e), C = (b, w) => {
    b && ht(
      b,
      n,
      9,
      w
    );
  }, D = (b, w) => {
    const P = w[1];
    C(b, w), ee(b) ? b.every((R) => R.length <= 1) && P() : b.length <= 1 && P();
  }, j = {
    mode: o,
    persisted: a,
    beforeEnter(b) {
      let w = l;
      if (!r.isMounted)
        if (s)
          w = k || l;
        else
          return;
      b[_t] && b[_t](
        !0
        /* cancelled */
      );
      const P = S[T];
      P && It(e, P) && P.el[_t] && P.el[_t](), C(w, [b]);
    },
    enter(b) {
      if (S[T] === e) return;
      let w = h, P = p, R = c;
      if (!r.isMounted)
        if (s)
          w = L || h, P = A || p, R = x || c;
        else
          return;
      let Q = !1;
      b[Jn] = (Z) => {
        Q || (Q = !0, Z ? C(R, [b]) : C(P, [b]), j.delayedLeave && j.delayedLeave(), b[Jn] = void 0);
      };
      const Y = b[Jn].bind(null, !1);
      w ? D(w, [b, Y]) : Y();
    },
    leave(b, w) {
      const P = String(e.key);
      if (b[Jn] && b[Jn](
        !0
        /* cancelled */
      ), r.isUnmounting)
        return w();
      C(m, [b]);
      let R = !1;
      b[_t] = (Y) => {
        R || (R = !0, w(), Y ? C(I, [b]) : C(v, [b]), b[_t] = void 0, S[P] === e && delete S[P]);
      };
      const Q = b[_t].bind(null, !1);
      S[P] = e, _ ? D(_, [b, Q]) : Q();
    },
    clone(b) {
      const w = un(
        b,
        t,
        r,
        n,
        i
      );
      return i && i(w), w;
    }
  };
  return j;
}
function Co(e) {
  if (Bi(e))
    return e = jt(e), e.children = null, e;
}
function mc(e) {
  if (!Bi(e))
    return Of(e.type) && e.children ? Mf(e.children) : e;
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
function sr(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, sr(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function to(e, t = !1, r) {
  let n = [], i = 0;
  for (let s = 0; s < e.length; s++) {
    let o = e[s];
    const a = r == null ? o.key : String(r) + String(o.key != null ? o.key : s);
    o.type === Le ? (o.patchFlag & 128 && i++, n = n.concat(
      to(o.children, t, a)
    )) : (t || o.type !== Pe) && n.push(a != null ? jt(o, { key: a }) : o);
  }
  if (i > 1)
    for (let s = 0; s < n.length; s++)
      n[s].patchFlag = -2;
  return n;
}
// @__NO_SIDE_EFFECTS__
function Da(e, t) {
  return oe(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    fe({ name: e.name }, t, { setup: e })
  ) : e;
}
function xg() {
  const e = it();
  return e ? (e.appContext.config.idPrefix || "v") + "-" + e.ids[0] + e.ids[1]++ : "";
}
function ka(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function Ng(e) {
  const t = it(), r = /* @__PURE__ */ mf(null);
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
function gc(e, t) {
  let r;
  return !!((r = Object.getOwnPropertyDescriptor(e, t)) && !r.configurable);
}
const ys = /* @__PURE__ */ new WeakMap();
function sn(e, t, r, n, i = !1) {
  if (ee(e)) {
    e.forEach(
      (I, k) => sn(
        I,
        t && (ee(t) ? t[k] : t),
        r,
        n,
        i
      )
    );
    return;
  }
  if (tr(n) && !i) {
    n.shapeFlag & 512 && n.type.__asyncResolved && n.component.subTree.component && sn(e, t, r, n.component.subTree);
    return;
  }
  const s = n.shapeFlag & 4 ? Ui(n.component) : n.el, o = i ? null : s, { i: a, r: l } = e, h = t && t.r, p = a.refs === de ? a.refs = {} : a.refs, c = a.setupState, m = /* @__PURE__ */ pe(c), _ = c === de ? Jr : (I) => gc(p, I) ? !1 : Te(m, I), v = (I, k) => !(k && gc(p, k));
  if (h != null && h !== l) {
    if (_c(t), ae(h))
      p[h] = null, _(h) && (c[h] = null);
    else if (/* @__PURE__ */ De(h)) {
      const I = t;
      v(h, I.k) && (h.value = null), I.k && (p[I.k] = null);
    }
  }
  if (oe(l)) {
    At();
    try {
      Kr(l, a, 12, [o, p]);
    } finally {
      Rt();
    }
  } else {
    const I = ae(l), k = /* @__PURE__ */ De(l);
    if (I || k) {
      const L = () => {
        if (e.f) {
          const A = I ? _(l) ? c[l] : p[l] : v() || !e.k ? l.value : p[e.k];
          if (i)
            ee(A) && Ta(A, s);
          else if (ee(A))
            A.includes(s) || A.push(s);
          else if (I)
            p[l] = [s], _(l) && (c[l] = p[l]);
          else {
            const x = [s];
            v(l, e.k) && (l.value = x), e.k && (p[e.k] = x);
          }
        } else I ? (p[l] = o, _(l) && (c[l] = o)) : k && (v(l, e.k) && (l.value = o), e.k && (p[e.k] = o));
      };
      if (o) {
        const A = () => {
          L(), ys.delete(e);
        };
        A.id = -1, ys.set(e, A), ke(A, r);
      } else
        _c(e), L();
    }
  }
}
function _c(e) {
  const t = ys.get(e);
  t && (t.flags |= 8, ys.delete(e));
}
let yc = !1;
const wr = () => {
  yc || (console.error("Hydration completed but contains mismatches."), yc = !0);
}, Ag = (e) => e.namespaceURI.includes("svg") && e.tagName !== "foreignObject", Rg = (e) => e.namespaceURI.includes("MathML"), es = (e) => {
  if (e.nodeType === 1) {
    if (Ag(e)) return "svg";
    if (Rg(e)) return "mathml";
  }
}, Cr = (e) => e.nodeType === 8;
function Cg(e) {
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
      createComment: h
    }
  } = e, p = (x, T) => {
    if (!T.hasChildNodes()) {
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__ && fr(
        "Attempting to hydrate existing markup but container is empty. Performing full mount instead."
      ), r(null, x, T), _s(), T._vnode = x;
      return;
    }
    c(T.firstChild, x, null, null, null), _s(), T._vnode = x;
  }, c = (x, T, S, C, D, j = !1) => {
    j = j || !!T.dynamicChildren;
    const b = Cr(x) && x.data === "[", w = () => I(
      x,
      T,
      S,
      C,
      D,
      b
    ), { type: P, ref: R, shapeFlag: Q, patchFlag: Y } = T;
    let Z = x.nodeType;
    T.el = x, __VUE_PROD_DEVTOOLS__ && (ln(x, "__vnode", T, !0), ln(x, "__vueParentComponent", S, !0)), Y === -2 && (j = !1, T.dynamicChildren = null);
    let z = null;
    switch (P) {
      case rr:
        Z !== 3 ? T.children === "" ? (l(T.el = i(""), o(x), x), z = x) : z = w() : (x.data !== T.children && (__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ && fr(
          "Hydration text mismatch in",
          x.parentNode,
          `
  - rendered on server: ${JSON.stringify(
            x.data
          )}
  - expected on client: ${JSON.stringify(T.children)}`
        ), wr(), x.data = T.children), z = s(x));
        break;
      case Pe:
        A(x) ? (z = s(x), L(
          T.el = x.content.firstChild,
          x,
          S
        )) : Z !== 8 || b ? z = w() : z = s(x);
        break;
      case yr:
        if (b && (x = s(x), Z = x.nodeType), Z === 1 || Z === 3) {
          z = x;
          const ne = !T.children.length;
          for (let re = 0; re < T.staticCount; re++)
            ne && (T.children += z.nodeType === 1 ? z.outerHTML : z.data), re === T.staticCount - 1 && (T.anchor = z), z = s(z);
          return b ? s(z) : z;
        } else
          w();
        break;
      case Le:
        b ? z = v(
          x,
          T,
          S,
          C,
          D,
          j
        ) : z = w();
        break;
      default:
        if (Q & 1)
          (Z !== 1 || T.type.toLowerCase() !== x.tagName.toLowerCase()) && !A(x) ? z = w() : z = m(
            x,
            T,
            S,
            C,
            D,
            j
          );
        else if (Q & 6) {
          T.slotScopeIds = D;
          const ne = o(x);
          if (b ? z = k(x) : Cr(x) && x.data === "teleport start" ? z = k(x, x.data, "teleport end") : z = s(x), t(
            T,
            ne,
            null,
            S,
            C,
            es(ne),
            j
          ), tr(T) && !T.type.__asyncResolved) {
            let re;
            b ? (re = Ce(Le), re.anchor = z ? z.previousSibling : ne.lastChild) : re = x.nodeType === 3 ? Ka("") : Ce("div"), re.el = x, T.component.subTree = re;
          }
        } else Q & 64 ? Z !== 8 ? z = w() : z = T.type.hydrate(
          x,
          T,
          S,
          C,
          D,
          j,
          e,
          _
        ) : Q & 128 ? z = T.type.hydrate(
          x,
          T,
          S,
          C,
          es(o(x)),
          D,
          j,
          e,
          c
        ) : __VUE_PROD_HYDRATION_MISMATCH_DETAILS__ && fr("Invalid HostVNode type:", P, `(${typeof P})`);
    }
    return R != null && sn(R, null, C, T), z;
  }, m = (x, T, S, C, D, j) => {
    j = j || !!T.dynamicChildren;
    const {
      type: b,
      dynamicProps: w,
      props: P,
      patchFlag: R,
      shapeFlag: Q,
      dirs: Y,
      transition: Z
    } = T, z = b === "input" || b === "option", ne = !!w;
    if (z || ne || R !== -1) {
      Y && Dt(T, null, S, "created");
      let re = !1;
      if (A(x)) {
        re = ud(
          null,
          // no need check parentSuspense in hydration
          Z
        ) && S && S.vnode.props && S.vnode.props.appear;
        const se = x.content.firstChild;
        if (re) {
          const ie = se.getAttribute("class");
          ie && (se.$cls = ie), Z.beforeEnter(se);
        }
        L(se, x, S), T.el = x = se;
      }
      if (Q & 16 && // skip if element has innerHTML / textContent
      !(P && (P.innerHTML || P.textContent))) {
        let se = _(
          x.firstChild,
          T,
          x,
          S,
          C,
          D,
          j
        );
        for (se && !hi(
          x,
          1
          /* CHILDREN */
        ) && (__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ && fr(
          "Hydration children mismatch on",
          x,
          `
Server rendered element contains more child nodes than client vdom.`
        ), wr()); se; ) {
          const ie = se;
          se = se.nextSibling, a(ie);
        }
      } else if (Q & 8) {
        let se = T.children;
        se[0] === `
` && (x.tagName === "PRE" || x.tagName === "TEXTAREA") && (se = se.slice(1));
        const { textContent: ie } = x;
        ie !== se && // innerHTML normalize \r\n or \r into a single \n in the DOM
        ie !== se.replace(/\r\n|\r/g, `
`) && (hi(
          x,
          0
          /* TEXT */
        ) || (__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ && fr(
          "Hydration text content mismatch on",
          x,
          `
  - rendered on server: ${ie}
  - expected on client: ${se}`
        ), wr()), x.textContent = T.children);
      }
      if (P) {
        if (__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ || z || ne || !j || R & 48) {
          const se = x.tagName.includes("-");
          for (const ie in P)
            __VUE_PROD_HYDRATION_MISMATCH_DETAILS__ && // #11189 skip if this node has directives that have created hooks
            // as it could have mutated the DOM in any possible way
            !(Y && Y.some((me) => me.dir.created)) && Og(x, ie, P[ie], T, S) && wr(), (z && (ie.endsWith("value") || ie === "indeterminate") || Qr(ie) && !Zt(ie) || // force hydrate v-bind with .prop modifiers
            ie[0] === "." || se && !Zt(ie) || w && w.includes(ie)) && n(x, ie, null, P[ie], void 0, S);
        } else if (P.onClick)
          n(
            x,
            "onClick",
            null,
            P.onClick,
            void 0,
            S
          );
        else if (R & 4 && /* @__PURE__ */ er(P.style))
          for (const se in P.style) P.style[se];
      }
      let _e;
      (_e = P && P.onVnodeBeforeMount) && ot(_e, S, T), Y && Dt(T, null, S, "beforeMount"), ((_e = P && P.onVnodeMounted) || Y || re) && pd(() => {
        _e && ot(_e, S, T), re && Z.enter(x), Y && Dt(T, null, S, "mounted");
      }, C);
    }
    return x.nextSibling;
  }, _ = (x, T, S, C, D, j, b) => {
    b = b || !!T.dynamicChildren;
    const w = T.children, P = w.length;
    let R = !1;
    for (let Q = 0; Q < P; Q++) {
      const Y = b ? w[Q] : w[Q] = at(w[Q]), Z = Y.type === rr;
      x ? (Z && !b && Q + 1 < P && at(w[Q + 1]).type === rr && (l(
        i(
          x.data.slice(Y.children.length)
        ),
        S,
        s(x)
      ), x.data = Y.children), x = c(
        x,
        Y,
        C,
        D,
        j,
        b
      )) : Z && !Y.children ? l(Y.el = i(""), S) : (R || (R = !0, hi(
        S,
        1
        /* CHILDREN */
      ) || (__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ && fr(
        "Hydration children mismatch on",
        S,
        `
Server rendered element contains fewer child nodes than client vdom.`
      ), wr())), r(
        null,
        Y,
        S,
        null,
        C,
        D,
        es(S),
        j
      ));
    }
    return x;
  }, v = (x, T, S, C, D, j) => {
    const { slotScopeIds: b } = T;
    b && (D = D ? D.concat(b) : b);
    const w = o(x), P = _(
      s(x),
      T,
      w,
      S,
      C,
      D,
      j
    );
    return P && Cr(P) && P.data === "]" ? s(T.anchor = P) : (wr(), l(T.anchor = h("]"), w, P), P);
  }, I = (x, T, S, C, D, j) => {
    if (Dg(x, T) || (__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ && fr(
      `Hydration node mismatch:
- rendered on server:`,
      x,
      x.nodeType === 3 ? "(text)" : Cr(x) && x.data === "[" ? "(start of fragment)" : "",
      `
- expected on client:`,
      T.type
    ), wr()), T.el = null, j) {
      const P = k(x);
      for (; ; ) {
        const R = s(x);
        if (R && R !== P)
          a(R);
        else
          break;
      }
    }
    const b = s(x), w = o(x);
    return a(x), r(
      null,
      T,
      w,
      b,
      S,
      C,
      es(w),
      D
    ), S && (S.vnode.el = T.el, oo(S, T.el)), b;
  }, k = (x, T = "[", S = "]") => {
    let C = 0;
    for (; x; )
      if (x = s(x), x && Cr(x) && (x.data === T && C++, x.data === S)) {
        if (C === 0)
          return s(x);
        C--;
      }
    return x;
  }, L = (x, T, S) => {
    const C = T.parentNode;
    C && C.replaceChild(x, T);
    let D = S;
    for (; D; )
      D.vnode.el === T && (D.vnode.el = D.subTree.el = x), D = D.parent;
  }, A = (x) => x.nodeType === 1 && x.tagName === "TEMPLATE";
  return [p, c];
}
function Og(e, t, r, n, i) {
  let s, o, a, l;
  if (t === "class")
    e.$cls ? (a = e.$cls, delete e.$cls) : a = e.getAttribute("class"), l = Tn(r), Pg(bc(a || ""), bc(l)) || (s = 2, o = "class");
  else if (t === "style") {
    a = e.getAttribute("style") || "", l = ae(r) ? r : Yp(bn(r));
    const h = Tc(a), p = Tc(l);
    if (n.dirs)
      for (const { dir: c, value: m } of n.dirs)
        c.name === "show" && !m && p.set("display", "none");
    i && Lf(i, n, p), Mg(h, p) || (s = 3, o = "style");
  } else (e instanceof SVGElement && lm(t) || e instanceof HTMLElement && (cc(t) || am(t))) && (cc(t) ? (a = e.hasAttribute(t), l = Sa(r)) : r == null ? (a = e.hasAttribute(t), l = !1) : (e.hasAttribute(t) ? a = e.getAttribute(t) : t === "value" && e.tagName === "TEXTAREA" ? a = e.value : a = !1, l = cm(r) ? String(r) : !1), a !== l && (s = 4, o = t));
  if (s != null && !hi(e, s)) {
    const h = (m) => m === !1 ? "(not rendered)" : `${o}="${m}"`, p = `Hydration ${jf[s]} mismatch on`, c = `
  - rendered on server: ${h(a)}
  - expected on client: ${h(l)}
  Note: this mismatch is check-only. The DOM will not be rectified in production due to performance overhead.
  You should fix the source of the mismatch.`;
    return fr(p, e, c), !0;
  }
  return !1;
}
function bc(e) {
  return new Set(e.trim().split(/\s+/));
}
function Pg(e, t) {
  if (e.size !== t.size)
    return !1;
  for (const r of e)
    if (!t.has(r))
      return !1;
  return !0;
}
function Tc(e) {
  const t = /* @__PURE__ */ new Map();
  for (const r of e.split(";")) {
    let [n, i] = r.split(":");
    n = n.trim(), i = i && i.trim(), n && i && t.set(n, i);
  }
  return t;
}
function Mg(e, t) {
  if (e.size !== t.size)
    return !1;
  for (const [r, n] of e)
    if (n !== t.get(r))
      return !1;
  return !0;
}
function Lf(e, t, r) {
  const n = e.subTree;
  if (e.getCssVars && (t === n || n && n.type === Le && n.children.includes(t))) {
    const i = e.getCssVars();
    for (const s in i) {
      const o = zu(i[s]);
      r.set(`--${fm(s)}`, o);
    }
  }
  t === n && e.parent && Lf(e.parent, e.vnode, r);
}
const bs = "data-allow-mismatch", jf = {
  0: "text",
  1: "children",
  2: "class",
  3: "style",
  4: "attribute"
};
function hi(e, t) {
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
    return t === 0 && r.includes("children") ? !0 : r.includes(jf[t]);
  }
}
function Dg(e, t) {
  return hi(
    e.parentElement,
    1
    /* CHILDREN */
  ) || kg(e) || Lg(t);
}
function kg(e) {
  return e.nodeType === 1 && La(
    e.getAttribute(bs),
    1
    /* CHILDREN */
  );
}
function Lg({ props: e }) {
  const t = e && e[bs];
  return typeof t == "string" && La(
    t,
    1
    /* CHILDREN */
  );
}
const jg = Mr().requestIdleCallback || ((e) => setTimeout(e, 1)), Fg = Mr().cancelIdleCallback || ((e) => clearTimeout(e)), Bg = (e = 1e4) => (t) => {
  const r = jg(t, { timeout: e });
  return () => Fg(r);
};
function Ug(e) {
  const { top: t, left: r, bottom: n, right: i } = e.getBoundingClientRect(), { innerHeight: s, innerWidth: o } = window;
  return (t > 0 && t < s || n > 0 && n < s) && (r > 0 && r < o || i > 0 && i < o);
}
const $g = (e) => (t, r) => {
  const n = new IntersectionObserver((i) => {
    for (const s of i)
      if (s.isIntersecting) {
        n.disconnect(), t();
        break;
      }
  }, e);
  return r((i) => {
    if (i instanceof Element) {
      if (Ug(i))
        return t(), n.disconnect(), !1;
      n.observe(i);
    }
  }), () => n.disconnect();
}, Vg = (e) => (t) => {
  if (e) {
    const r = matchMedia(e);
    if (r.matches)
      t();
    else
      return r.addEventListener("change", t, { once: !0 }), () => r.removeEventListener("change", t);
  }
}, Qg = (e = []) => (t, r) => {
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
function Hg(e, t) {
  if (Cr(e) && e.data === "[") {
    let r = 1, n = e.nextSibling;
    for (; n; ) {
      if (n.nodeType === 1) {
        if (t(n) === !1)
          break;
      } else if (Cr(n))
        if (n.data === "]") {
          if (--r === 0) break;
        } else n.data === "[" && r++;
      n = n.nextSibling;
    }
  } else
    t(e);
}
const tr = (e) => !!e.type.__asyncLoader;
// @__NO_SIDE_EFFECTS__
function qg(e) {
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
  let h = null, p, c = 0;
  const m = () => (c++, h = null, _()), _ = () => {
    let v;
    return h || (v = h = t().catch((I) => {
      if (I = I instanceof Error ? I : new Error(String(I)), l)
        return new Promise((k, L) => {
          l(I, () => k(m()), () => L(I), c + 1);
        });
      throw I;
    }).then((I) => v !== h && h ? h : (I && (I.__esModule || I[Symbol.toStringTag] === "Module") && (I = I.default), p = I, I)));
  };
  return /* @__PURE__ */ Da({
    name: "AsyncComponentWrapper",
    __asyncLoader: _,
    __asyncHydrate(v, I, k) {
      let L = !1;
      (I.bu || (I.bu = [])).push(() => L = !0);
      const A = () => {
        L || k();
      }, x = s ? () => {
        const T = s(
          A,
          (S) => Hg(v, S)
        );
        T && (I.bum || (I.bum = [])).push(T);
      } : A;
      p ? x() : _().then(() => !I.isUnmounted && x());
    },
    get __asyncResolved() {
      return p;
    },
    setup() {
      const v = qe;
      if (ka(v), p)
        return () => ts(p, v);
      const I = (S) => {
        h = null, Wr(
          S,
          v,
          13,
          !n
        );
      };
      if (a && v.suspense || $r)
        return _().then((S) => () => ts(S, v)).catch((S) => (I(S), () => n ? Ce(n, {
          error: S
        }) : null));
      const k = /* @__PURE__ */ Ee(!1), L = /* @__PURE__ */ Ee(), A = /* @__PURE__ */ Ee(!!i);
      let x, T;
      return Sn(() => {
        x != null && clearTimeout(x), T != null && clearTimeout(T);
      }), i && (T = setTimeout(() => {
        v.isUnmounted || (A.value = !1);
      }, i)), o != null && (x = setTimeout(() => {
        if (!v.isUnmounted && !k.value && !L.value) {
          const S = new Error(
            `Async component timed out after ${o}ms.`
          );
          I(S), L.value = S;
        }
      }, o)), _().then(() => {
        v.isUnmounted || (k.value = !0, v.parent && Bi(v.parent.vnode) && v.parent.update());
      }).catch((S) => {
        if (v.isUnmounted) {
          h = null;
          return;
        }
        I(S), L.value = S;
      }), () => {
        if (k.value && p)
          return ts(p, v);
        if (L.value && n)
          return Ce(n, {
            error: L.value
          });
        if (r && !A.value)
          return ts(
            r,
            v
          );
      };
    }
  });
}
function ts(e, t) {
  const { ref: r, props: n, children: i, ce: s } = t.vnode, o = Ce(e, n, i);
  return o.ref = r, o.ce = s, delete t.vnode.ce, o;
}
const Bi = (e) => e.type.__isKeepAlive, Kg = {
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
        const A = t.default && t.default();
        return A && A.length === 1 ? A[0] : A;
      };
    const i = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Set();
    let o = null;
    __VUE_PROD_DEVTOOLS__ && (r.__v_cache = i);
    const a = r.suspense, {
      renderer: {
        p: l,
        m: h,
        um: p,
        o: { createElement: c }
      }
    } = n, m = c("div");
    n.activate = (A, x, T, S, C) => {
      const D = A.component;
      h(A, x, T, 0, a), l(
        D.vnode,
        A,
        x,
        T,
        D,
        a,
        S,
        A.slotScopeIds,
        C
      ), ke(() => {
        D.isDeactivated = !1, D.a && rn(D.a);
        const j = A.props && A.props.onVnodeMounted;
        j && ot(j, D.parent, A);
      }, a), __VUE_PROD_DEVTOOLS__ && qo(D);
    }, n.deactivate = (A) => {
      const x = A.component;
      vs(x.m), vs(x.a), h(A, m, null, 1, a), ke(() => {
        x.da && rn(x.da);
        const T = A.props && A.props.onVnodeUnmounted;
        T && ot(T, x.parent, A), x.isDeactivated = !0;
      }, a), __VUE_PROD_DEVTOOLS__ && qo(x);
    };
    function _(A) {
      Oo(A), p(A, r, a, !0);
    }
    function v(A) {
      i.forEach((x, T) => {
        const S = Ns(
          tr(x) ? x.type.__asyncResolved || {} : x.type
        );
        S && !A(S) && I(T);
      });
    }
    function I(A) {
      const x = i.get(A);
      x && (!o || !It(x, o)) ? _(x) : o && Oo(o), i.delete(A), s.delete(A);
    }
    _r(
      () => [e.include, e.exclude],
      ([A, x]) => {
        A && v((T) => ai(A, T)), x && v((T) => !ai(x, T));
      },
      // prune post-render after `current` has been updated
      { flush: "post", deep: !0 }
    );
    let k = null;
    const L = () => {
      k != null && (Ss(r.subTree.type) ? ke(() => {
        i.set(k, rs(r.subTree));
      }, r.subTree.suspense) : i.set(k, rs(r.subTree)));
    };
    return vn(L), no(L), io(() => {
      i.forEach((A) => {
        const { subTree: x, suspense: T } = r, S = rs(x);
        if (A.type === S.type && A.key === S.key) {
          Oo(S);
          const C = S.component.da;
          C && ke(C, T);
          return;
        }
        _(A);
      });
    }), () => {
      if (k = null, !t.default)
        return o = null;
      const A = t.default(), x = A[0];
      if (A.length > 1)
        return o = null, A;
      if (!or(x) || !(x.shapeFlag & 4) && !(x.shapeFlag & 128))
        return o = null, x;
      let T = rs(x);
      if (T.type === Pe)
        return o = null, T;
      const S = T.type, C = Ns(
        tr(T) ? T.type.__asyncResolved || {} : S
      ), { include: D, exclude: j, max: b } = e;
      if (D && (!C || !ai(D, C)) || j && C && ai(j, C))
        return T.shapeFlag &= -257, o = T, x;
      const w = T.key == null ? S : T.key, P = i.get(w);
      return T.el && (T = jt(T), x.shapeFlag & 128 && (x.ssContent = T)), k = w, P ? (T.el = P.el, T.component = P.component, T.transition && sr(T, T.transition), T.shapeFlag |= 512, s.delete(w), s.add(w)) : (s.add(w), b && s.size > parseInt(b, 10) && I(s.values().next().value)), T.shapeFlag |= 256, o = T, Ss(x.type) ? x : T;
    };
  }
}, Wg = Kg;
function ai(e, t) {
  return ee(e) ? e.some((r) => ai(r, t)) : ae(e) ? e.split(",").includes(t) : Bp(e) ? (e.lastIndex = 0, e.test(t)) : !1;
}
function Ff(e, t) {
  Uf(e, "a", t);
}
function Bf(e, t) {
  Uf(e, "da", t);
}
function Uf(e, t, r = qe) {
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
      Bi(i.parent.vnode) && Gg(n, t, r, i), i = i.parent;
  }
}
function Gg(e, t, r, n) {
  const i = ro(
    t,
    e,
    n,
    !0
    /* prepend */
  );
  Sn(() => {
    Ta(n[t], i);
  }, r);
}
function Oo(e) {
  e.shapeFlag &= -257, e.shapeFlag &= -513;
}
function rs(e) {
  return e.shapeFlag & 128 ? e.ssContent : e;
}
function ro(e, t, r = qe, n = !1) {
  if (r) {
    const i = r[e] || (r[e] = []), s = t.__weh || (t.__weh = (...o) => {
      At();
      const a = En(r), l = ht(t, r, e, o);
      return a(), Rt(), l;
    });
    return n ? i.unshift(s) : i.push(s), s;
  }
}
const lr = (e) => (t, r = qe) => {
  (!$r || e === "sp") && ro(e, (...n) => t(...n), r);
}, $f = lr("bm"), vn = lr("m"), ja = lr(
  "bu"
), no = lr("u"), io = lr(
  "bum"
), Sn = lr("um"), Vf = lr(
  "sp"
), Qf = lr("rtg"), Hf = lr("rtc");
function qf(e, t = qe) {
  ro("ec", e, t);
}
const Fa = "components", zg = "directives";
function Yg(e, t) {
  return Ba(Fa, e, !0, t) || e;
}
const Kf = /* @__PURE__ */ Symbol.for("v-ndc");
function Xg(e) {
  return ae(e) ? Ba(Fa, e, !1) || e : e || Kf;
}
function Jg(e) {
  return Ba(zg, e);
}
function Ba(e, t, r = !0, n = !1) {
  const i = Ke || qe;
  if (i) {
    const s = i.type;
    if (e === Fa) {
      const a = Ns(
        s,
        !1
      );
      if (a && (a === t || a === Ie(t) || a === qr(Ie(t))))
        return s;
    }
    const o = (
      // local registration
      // check instance[type] first which is resolved for options API
      vc(i[e] || s[e], t) || // global registration
      vc(i.appContext[e], t)
    );
    return !o && n ? s : o;
  }
}
function vc(e, t) {
  return e && (e[t] || e[Ie(t)] || e[qr(Ie(t))]);
}
function Zg(e, t, r, n) {
  let i;
  const s = r && r[n], o = ee(e);
  if (o || ae(e)) {
    const a = o && /* @__PURE__ */ er(e);
    let l = !1, h = !1;
    a && (l = !/* @__PURE__ */ ct(e), h = /* @__PURE__ */ Lt(e), e = zs(e)), i = new Array(e.length);
    for (let p = 0, c = e.length; p < c; p++)
      i[p] = t(
        l ? h ? cn(Ct(e[p])) : Ct(e[p]) : e[p],
        p,
        void 0,
        s && s[p]
      );
  } else if (typeof e == "number") {
    i = new Array(e);
    for (let a = 0; a < e; a++)
      i[a] = t(a + 1, a, void 0, s && s[a]);
  } else if (be(e))
    if (e[Symbol.iterator])
      i = Array.from(
        e,
        (a, l) => t(a, l, void 0, s && s[l])
      );
    else {
      const a = Object.keys(e);
      i = new Array(a.length);
      for (let l = 0, h = a.length; l < h; l++) {
        const p = a[l];
        i[l] = t(e[p], p, l, s && s[l]);
      }
    }
  else
    i = [];
  return r && (r[n] = i), i;
}
function e_(e, t) {
  for (let r = 0; r < t.length; r++) {
    const n = t[r];
    if (ee(n))
      for (let i = 0; i < n.length; i++)
        e[n[i].name] = n[i].fn;
    else n && (e[n.name] = n.key ? (...i) => {
      const s = n.fn(...i);
      return s && (s.key = n.key), s;
    } : n.fn);
  }
  return e;
}
function t_(e, t, r = {}, n, i) {
  if (Ke.ce || Ke.parent && tr(Ke.parent) && Ke.parent.ce) {
    const h = Object.keys(r).length > 0;
    return t !== "default" && (r.name = t), xi(), Es(
      Le,
      null,
      [Ce("slot", r, n && n())],
      h ? -2 : 64
    );
  }
  let s = e[t];
  s && s._c && (s._d = !1), xi();
  const o = s && Ua(s(r)), a = r.key || // slot content array of a dynamic conditional slot may have a branch
  // key attached in the `createSlots` helper, respect that
  o && o.key, l = Es(
    Le,
    {
      key: (a && !Je(a) ? a : `_${t}`) + // #7256 force differentiate fallback content from actual content
      (!o && n ? "_fb" : "")
    },
    o || (n ? n() : []),
    o && e._ === 1 ? 64 : -2
  );
  return !i && l.scopeId && (l.slotScopeIds = [l.scopeId + "-s"]), s && s._c && (s._d = !0), l;
}
function Ua(e) {
  return e.some((t) => or(t) ? !(t.type === Pe || t.type === Le && !Ua(t.children)) : !0) ? e : null;
}
function r_(e, t) {
  const r = {};
  for (const n in e)
    r[t && /[A-Z]/.test(n) ? `on:${n}` : tn(n)] = e[n];
  return r;
}
const Go = (e) => e ? Sd(e) ? Ui(e) : Go(e.parent) : null, pi = (
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
    $parent: (e) => Go(e.parent),
    $root: (e) => Go(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => __VUE_OPTIONS_API__ ? $a(e) : e.type,
    $forceUpdate: (e) => e.f || (e.f = () => {
      Aa(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Lr.bind(e.proxy)),
    $watch: (e) => __VUE_OPTIONS_API__ ? Tg.bind(e) : Qe
  })
), Po = (e, t) => e !== de && !e.__isScriptSetup && Te(e, t), zo = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: r, setupState: n, data: i, props: s, accessCache: o, type: a, appContext: l } = e;
    if (t[0] !== "$") {
      const m = o[t];
      if (m !== void 0)
        switch (m) {
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
        if (Po(n, t))
          return o[t] = 1, n[t];
        if (__VUE_OPTIONS_API__ && i !== de && Te(i, t))
          return o[t] = 2, i[t];
        if (Te(s, t))
          return o[t] = 3, s[t];
        if (r !== de && Te(r, t))
          return o[t] = 4, r[t];
        (!__VUE_OPTIONS_API__ || Yo) && (o[t] = 0);
      }
    }
    const h = pi[t];
    let p, c;
    if (h)
      return t === "$attrs" && ze(e.attrs, "get", ""), h(e);
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
    return Po(i, t) ? (i[t] = r, !0) : __VUE_OPTIONS_API__ && n !== de && Te(n, t) ? (n[t] = r, !0) : Te(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (s[t] = r, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: r, ctx: n, appContext: i, props: s, type: o }
  }, a) {
    let l;
    return !!(r[a] || __VUE_OPTIONS_API__ && e !== de && a[0] !== "$" && Te(e, a) || Po(t, a) || Te(s, a) || Te(n, a) || Te(pi, a) || Te(i.config.globalProperties, a) || (l = o.__cssModules) && l[a]);
  },
  defineProperty(e, t, r) {
    return r.get != null ? e._.accessCache[t] = 0 : Te(r, "value") && this.set(e, t, r.value, null), Reflect.defineProperty(e, t, r);
  }
}, n_ = /* @__PURE__ */ fe({}, zo, {
  get(e, t) {
    if (t !== Symbol.unscopables)
      return zo.get(e, t, e);
  },
  has(e, t) {
    return t[0] !== "_" && !Kp(t);
  }
});
function i_() {
  return null;
}
function s_() {
  return null;
}
function o_(e) {
}
function a_(e) {
}
function l_() {
  return null;
}
function c_() {
}
function u_(e, t) {
  return null;
}
function f_() {
  return Wf().slots;
}
function d_() {
  return Wf().attrs;
}
function Wf(e) {
  const t = it();
  return t.setupContext || (t.setupContext = xd(t));
}
function wi(e) {
  return ee(e) ? e.reduce(
    (t, r) => (t[r] = null, t),
    {}
  ) : e;
}
function h_(e, t) {
  const r = wi(e);
  for (const n in t) {
    if (n.startsWith("__skip")) continue;
    let i = r[n];
    i ? ee(i) || oe(i) ? i = r[n] = { type: i, default: t[n] } : i.default = t[n] : i === null && (i = r[n] = { default: t[n] }), i && t[`__skip_${n}`] && (i.skipFactory = !0);
  }
  return r;
}
function p_(e, t) {
  return !e || !t ? e || t : ee(e) && ee(t) ? e.concat(t) : fe({}, wi(e), wi(t));
}
function m_(e, t) {
  const r = {};
  for (const n in e)
    t.includes(n) || Object.defineProperty(r, n, {
      enumerable: !0,
      get: () => e[n]
    });
  return r;
}
function g_(e) {
  const t = it(), r = $r;
  let n = e();
  Ai(), r && an(!1);
  const i = () => {
    En(t), r && an(!0);
  }, s = () => {
    it() !== t && t.scope.off(), Ai(), r && an(!1);
  };
  return va(n) && (n = n.catch((o) => {
    throw i(), Promise.resolve().then(() => Promise.resolve().then(s)), o;
  })), [
    n,
    () => {
      i(), Promise.resolve().then(s);
    }
  ];
}
let Yo = !0;
function __(e) {
  const t = $a(e), r = e.proxy, n = e.ctx;
  Yo = !1, t.beforeCreate && Sc(t.beforeCreate, e, "bc");
  const {
    // state
    data: i,
    computed: s,
    methods: o,
    watch: a,
    provide: l,
    inject: h,
    // lifecycle
    created: p,
    beforeMount: c,
    mounted: m,
    beforeUpdate: _,
    updated: v,
    activated: I,
    deactivated: k,
    beforeDestroy: L,
    beforeUnmount: A,
    destroyed: x,
    unmounted: T,
    render: S,
    renderTracked: C,
    renderTriggered: D,
    errorCaptured: j,
    serverPrefetch: b,
    // public API
    expose: w,
    inheritAttrs: P,
    // assets
    components: R,
    directives: Q,
    filters: Y
  } = t;
  if (h && y_(h, n, null), o)
    for (const ne in o) {
      const re = o[ne];
      oe(re) && (n[ne] = re.bind(r));
    }
  if (i) {
    const ne = i.call(r, r);
    be(ne) && (e.data = /* @__PURE__ */ Xs(ne));
  }
  if (Yo = !0, s)
    for (const ne in s) {
      const re = s[ne], _e = oe(re) ? re.bind(r, r) : oe(re.get) ? re.get.bind(r, r) : Qe, se = !oe(re) && oe(re.set) ? re.set.bind(r) : Qe, ie = Wt({
        get: _e,
        set: se
      });
      Object.defineProperty(n, ne, {
        enumerable: !0,
        configurable: !0,
        get: () => ie.value,
        set: (me) => ie.value = me
      });
    }
  if (a)
    for (const ne in a)
      Gf(a[ne], n, r, ne);
  if (l) {
    const ne = oe(l) ? l.call(r) : l;
    Reflect.ownKeys(ne).forEach((re) => {
      If(re, ne[re]);
    });
  }
  p && Sc(p, e, "c");
  function z(ne, re) {
    ee(re) ? re.forEach((_e) => ne(_e.bind(r))) : re && ne(re.bind(r));
  }
  if (z($f, c), z(vn, m), z(ja, _), z(no, v), z(Ff, I), z(Bf, k), z(qf, j), z(Hf, C), z(Qf, D), z(io, A), z(Sn, T), z(Vf, b), ee(w))
    if (w.length) {
      const ne = e.exposed || (e.exposed = {});
      w.forEach((re) => {
        Object.defineProperty(ne, re, {
          get: () => r[re],
          set: (_e) => r[re] = _e,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  S && e.render === Qe && (e.render = S), P != null && (e.inheritAttrs = P), R && (e.components = R), Q && (e.directives = Q), b && ka(e);
}
function y_(e, t, r = Qe) {
  ee(e) && (e = Xo(e));
  for (const n in e) {
    const i = e[n];
    let s;
    be(i) ? "default" in i ? s = di(
      i.from || n,
      i.default,
      !0
    ) : s = di(i.from || n) : s = di(i), /* @__PURE__ */ De(s) ? Object.defineProperty(t, n, {
      enumerable: !0,
      configurable: !0,
      get: () => s.value,
      set: (o) => s.value = o
    }) : t[n] = s;
  }
}
function Sc(e, t, r) {
  ht(
    ee(e) ? e.map((n) => n.bind(t.proxy)) : e.bind(t.proxy),
    t,
    r
  );
}
function Gf(e, t, r, n) {
  let i = n.includes(".") ? Rf(r, n) : () => r[n];
  if (ae(e)) {
    const s = t[e];
    oe(s) && _r(i, s);
  } else if (oe(e))
    _r(i, e.bind(r));
  else if (be(e))
    if (ee(e))
      e.forEach((s) => Gf(s, t, r, n));
    else {
      const s = oe(e.handler) ? e.handler.bind(r) : t[e.handler];
      oe(s) && _r(i, s, e);
    }
}
function $a(e) {
  const t = e.type, { mixins: r, extends: n } = t, {
    mixins: i,
    optionsCache: s,
    config: { optionMergeStrategies: o }
  } = e.appContext, a = s.get(t);
  let l;
  return a ? l = a : !i.length && !r && !n ? l = t : (l = {}, i.length && i.forEach(
    (h) => Ts(l, h, o, !0)
  ), Ts(l, t, o)), be(t) && s.set(t, l), l;
}
function Ts(e, t, r, n = !1) {
  const { mixins: i, extends: s } = t;
  s && Ts(e, s, r, !0), i && i.forEach(
    (o) => Ts(e, o, r, !0)
  );
  for (const o in t)
    if (!(n && o === "expose")) {
      const a = b_[o] || r && r[o];
      e[o] = a ? a(e[o], t[o]) : t[o];
    }
  return e;
}
const b_ = {
  data: Ec,
  props: wc,
  emits: wc,
  // objects
  methods: li,
  computed: li,
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
  components: li,
  directives: li,
  // watch
  watch: v_,
  // provide / inject
  provide: Ec,
  inject: T_
};
function Ec(e, t) {
  return t ? e ? function() {
    return fe(
      oe(e) ? e.call(this, this) : e,
      oe(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function T_(e, t) {
  return li(Xo(e), Xo(t));
}
function Xo(e) {
  if (ee(e)) {
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
function li(e, t) {
  return e ? fe(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function wc(e, t) {
  return e ? ee(e) && ee(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : fe(
    /* @__PURE__ */ Object.create(null),
    wi(e),
    wi(t ?? {})
  ) : t;
}
function v_(e, t) {
  if (!e) return t;
  if (!t) return e;
  const r = fe(/* @__PURE__ */ Object.create(null), e);
  for (const n in t)
    r[n] = tt(e[n], t[n]);
  return r;
}
function zf() {
  return {
    app: null,
    config: {
      isNativeTag: Jr,
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
let S_ = 0;
function E_(e, t) {
  return function(n, i = null) {
    oe(n) || (n = fe({}, n)), i != null && !be(i) && (i = null);
    const s = zf(), o = /* @__PURE__ */ new WeakSet(), a = [];
    let l = !1;
    const h = s.app = {
      _uid: S_++,
      _component: n,
      _props: i,
      _container: null,
      _context: s,
      _instance: null,
      version: ra,
      get config() {
        return s.config;
      },
      set config(p) {
      },
      use(p, ...c) {
        return o.has(p) || (p && oe(p.install) ? (o.add(p), p.install(h, ...c)) : oe(p) && (o.add(p), p(h, ...c))), h;
      },
      mixin(p) {
        return __VUE_OPTIONS_API__ && (s.mixins.includes(p) || s.mixins.push(p)), h;
      },
      component(p, c) {
        return c ? (s.components[p] = c, h) : s.components[p];
      },
      directive(p, c) {
        return c ? (s.directives[p] = c, h) : s.directives[p];
      },
      mount(p, c, m) {
        if (!l) {
          const _ = h._ceVNode || Ce(n, i);
          return _.appContext = s, m === !0 ? m = "svg" : m === !1 && (m = void 0), c && t ? t(_, p) : e(_, p, m), l = !0, h._container = p, p.__vue_app__ = h, __VUE_PROD_DEVTOOLS__ && (h._instance = _.component, lg(h, ra)), Ui(_.component);
        }
      },
      onUnmount(p) {
        a.push(p);
      },
      unmount() {
        l && (ht(
          a,
          h._instance,
          16
        ), e(null, h._container), __VUE_PROD_DEVTOOLS__ && (h._instance = null, cg(h)), delete h._container.__vue_app__);
      },
      provide(p, c) {
        return s.provides[p] = c, h;
      },
      runWithContext(p) {
        const c = jr;
        jr = h;
        try {
          return p();
        } finally {
          jr = c;
        }
      }
    };
    return h;
  };
}
let jr = null;
function w_(e, t, r = de) {
  const n = it(), i = Ie(t), s = nt(t), o = Yf(e, i), a = _f((l, h) => {
    let p, c = de, m;
    return Af(() => {
      const _ = e[i];
      Ve(p, _) && (p = _, h());
    }), {
      get() {
        return l(), r.get ? r.get(p) : p;
      },
      set(_) {
        const v = r.set ? r.set(_) : _;
        if (!Ve(v, p) && !(c !== de && Ve(_, c)))
          return;
        const I = n.vnode.props, k = !!(I && // check if parent has passed v-model
        (t in I || i in I || s in I) && (`onUpdate:${t}` in I || `onUpdate:${i}` in I || `onUpdate:${s}` in I));
        k || (p = _, h()), n.emit(`update:${t}`, v), Ve(_, c) && (Ve(_, v) && !Ve(v, m) || // #13524: browsers differ in when they flush microtasks between
        // event listeners. If a v-model listener emits an intermediate value
        // and a following listener restores the model to its previous prop
        // value before parent updates are flushed, the parent render can be
        // deduped as having no prop change. Force a local update so DOM state
        // such as an input's value is synchronized back to the current model.
        k && c !== de && !Ve(v, p)) && h(), c = _, m = v;
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
const Yf = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Ie(t)}Modifiers`] || e[`${nt(t)}Modifiers`];
function I_(e, t, ...r) {
  if (e.isUnmounted) return;
  const n = e.vnode.props || de;
  let i = r;
  const s = t.startsWith("update:"), o = s && Yf(n, t.slice(7));
  o && (o.trim && (i = r.map((p) => ae(p) ? p.trim() : p)), o.number && (i = r.map(Ks))), __VUE_PROD_DEVTOOLS__ && dg(e, t, i);
  let a, l = n[a = tn(t)] || // also try camelCase event handler (#2249)
  n[a = tn(Ie(t))];
  !l && s && (l = n[a = tn(nt(t))]), l && ht(
    l,
    e,
    6,
    i
  );
  const h = n[a + "Once"];
  if (h) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[a])
      return;
    e.emitted[a] = !0, ht(
      h,
      e,
      6,
      i
    );
  }
}
const x_ = /* @__PURE__ */ new WeakMap();
function Xf(e, t, r = !1) {
  const n = __VUE_OPTIONS_API__ && r ? x_ : t.emitsCache, i = n.get(e);
  if (i !== void 0)
    return i;
  const s = e.emits;
  let o = {}, a = !1;
  if (__VUE_OPTIONS_API__ && !oe(e)) {
    const l = (h) => {
      const p = Xf(h, t, !0);
      p && (a = !0, fe(o, p));
    };
    !r && t.mixins.length && t.mixins.forEach(l), e.extends && l(e.extends), e.mixins && e.mixins.forEach(l);
  }
  return !s && !a ? (be(e) && n.set(e, null), null) : (ee(s) ? s.forEach((l) => o[l] = null) : fe(o, s), be(e) && n.set(e, o), o);
}
function so(e, t) {
  return !e || !Qr(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), Te(e, t[0].toLowerCase() + t.slice(1)) || Te(e, nt(t)) || Te(e, t));
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
    render: h,
    renderCache: p,
    props: c,
    data: m,
    setupState: _,
    ctx: v,
    inheritAttrs: I
  } = e, k = Ei(e);
  let L, A;
  try {
    if (r.shapeFlag & 4) {
      const T = i || n, S = T;
      L = at(
        h.call(
          S,
          T,
          p,
          c,
          _,
          m,
          v
        )
      ), A = a;
    } else {
      const T = t;
      L = at(
        T.length > 1 ? T(
          c,
          { attrs: a, slots: o, emit: l }
        ) : T(
          c,
          null
        )
      ), A = t.props ? a : A_(a);
    }
  } catch (T) {
    mi.length = 0, Wr(T, e, 1), L = Ce(Pe);
  }
  let x = L;
  if (A && I !== !1) {
    const T = Object.keys(A), { shapeFlag: S } = x;
    T.length && S & 7 && (s && T.some(Vs) && (A = R_(
      A,
      s
    )), x = jt(x, A, !1, !0));
  }
  return r.dirs && (x = jt(x, null, !1, !0), x.dirs = x.dirs ? x.dirs.concat(r.dirs) : r.dirs), r.transition && sr(x, r.transition), L = x, Ei(k), L;
}
function N_(e, t = !0) {
  let r;
  for (let n = 0; n < e.length; n++) {
    const i = e[n];
    if (or(i)) {
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
const A_ = (e) => {
  let t;
  for (const r in e)
    (r === "class" || r === "style" || Qr(r)) && ((t || (t = {}))[r] = e[r]);
  return t;
}, R_ = (e, t) => {
  const r = {};
  for (const n in e)
    (!Vs(n) || !(n.slice(9) in t)) && (r[n] = e[n]);
  return r;
};
function C_(e, t, r) {
  const { props: n, children: i, component: s } = e, { props: o, children: a, patchFlag: l } = t, h = s.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (r && l >= 0) {
    if (l & 1024)
      return !0;
    if (l & 16)
      return n ? Ic(n, o, h) : !!o;
    if (l & 8) {
      const p = t.dynamicProps;
      for (let c = 0; c < p.length; c++) {
        const m = p[c];
        if (Jf(o, n, m) && !so(h, m))
          return !0;
      }
    }
  } else
    return (i || a) && (!a || !a.$stable) ? !0 : n === o ? !1 : n ? o ? Ic(n, o, h) : !0 : !!o;
  return !1;
}
function Ic(e, t, r) {
  const n = Object.keys(t);
  if (n.length !== Object.keys(e).length)
    return !0;
  for (let i = 0; i < n.length; i++) {
    const s = n[i];
    if (Jf(t, e, s) && !so(r, s))
      return !0;
  }
  return !1;
}
function Jf(e, t, r) {
  const n = e[r], i = t[r];
  return r === "style" && be(n) && be(i) ? !ir(n, i) : n !== i;
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
const Zf = {}, ed = () => Object.create(Zf), td = (e) => Object.getPrototypeOf(e) === Zf;
function O_(e, t, r, n = !1) {
  const i = {}, s = ed();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), rd(e, t, i, s);
  for (const o in e.propsOptions[0])
    o in i || (i[o] = void 0);
  r ? e.props = n ? i : /* @__PURE__ */ hf(i) : e.type.props ? e.props = i : e.props = s, e.attrs = s;
}
function P_(e, t, r, n) {
  const {
    props: i,
    attrs: s,
    vnode: { patchFlag: o }
  } = e, a = /* @__PURE__ */ pe(i), [l] = e.propsOptions;
  let h = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (n || o > 0) && !(o & 16)
  ) {
    if (o & 8) {
      const p = e.vnode.dynamicProps;
      for (let c = 0; c < p.length; c++) {
        let m = p[c];
        if (so(e.emitsOptions, m))
          continue;
        const _ = t[m];
        if (l)
          if (Te(s, m))
            _ !== s[m] && (s[m] = _, h = !0);
          else {
            const v = Ie(m);
            i[v] = Jo(
              l,
              a,
              v,
              _,
              e,
              !1
            );
          }
        else
          _ !== s[m] && (s[m] = _, h = !0);
      }
    }
  } else {
    rd(e, t, i, s) && (h = !0);
    let p;
    for (const c in a)
      (!t || // for camelCase
      !Te(t, c) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((p = nt(c)) === c || !Te(t, p))) && (l ? r && // for camelCase
      (r[c] !== void 0 || // for kebab-case
      r[p] !== void 0) && (i[c] = Jo(
        l,
        a,
        c,
        void 0,
        e,
        !0
      )) : delete i[c]);
    if (s !== a)
      for (const c in s)
        (!t || !Te(t, c)) && (delete s[c], h = !0);
  }
  h && Yt(e.attrs, "set", "");
}
function rd(e, t, r, n) {
  const [i, s] = e.propsOptions;
  let o = !1, a;
  if (t)
    for (let l in t) {
      if (Zt(l))
        continue;
      const h = t[l];
      let p;
      i && Te(i, p = Ie(l)) ? !s || !s.includes(p) ? r[p] = h : (a || (a = {}))[p] = h : so(e.emitsOptions, l) || (!(l in n) || h !== n[l]) && (n[l] = h, o = !0);
    }
  if (s) {
    const l = /* @__PURE__ */ pe(r), h = a || de;
    for (let p = 0; p < s.length; p++) {
      const c = s[p];
      r[c] = Jo(
        i,
        l,
        c,
        h[c],
        e,
        !Te(h, c)
      );
    }
  }
  return o;
}
function Jo(e, t, r, n, i, s) {
  const o = e[r];
  if (o != null) {
    const a = Te(o, "default");
    if (a && n === void 0) {
      const l = o.default;
      if (o.type !== Function && !o.skipFactory && oe(l)) {
        const { propsDefaults: h } = i;
        if (r in h)
          n = h[r];
        else {
          const p = En(i);
          n = h[r] = l.call(
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
const M_ = /* @__PURE__ */ new WeakMap();
function nd(e, t, r = !1) {
  const n = __VUE_OPTIONS_API__ && r ? M_ : t.propsCache, i = n.get(e);
  if (i)
    return i;
  const s = e.props, o = {}, a = [];
  let l = !1;
  if (__VUE_OPTIONS_API__ && !oe(e)) {
    const p = (c) => {
      l = !0;
      const [m, _] = nd(c, t, !0);
      fe(o, m), _ && a.push(..._);
    };
    !r && t.mixins.length && t.mixins.forEach(p), e.extends && p(e.extends), e.mixins && e.mixins.forEach(p);
  }
  if (!s && !l)
    return be(e) && n.set(e, Zr), Zr;
  if (ee(s))
    for (let p = 0; p < s.length; p++) {
      const c = Ie(s[p]);
      xc(c) && (o[c] = de);
    }
  else if (s)
    for (const p in s) {
      const c = Ie(p);
      if (xc(c)) {
        const m = s[p], _ = o[c] = ee(m) || oe(m) ? { type: m } : fe({}, m), v = _.type;
        let I = !1, k = !0;
        if (ee(v))
          for (let L = 0; L < v.length; ++L) {
            const A = v[L], x = oe(A) && A.name;
            if (x === "Boolean") {
              I = !0;
              break;
            } else x === "String" && (k = !1);
          }
        else
          I = oe(v) && v.name === "Boolean";
        _[
          0
          /* shouldCast */
        ] = I, _[
          1
          /* shouldCastTrue */
        ] = k, (I || Te(_, "default")) && a.push(c);
      }
    }
  const h = [o, a];
  return be(e) && n.set(e, h), h;
}
function xc(e) {
  return e[0] !== "$" && !Zt(e);
}
const Va = (e) => e === "_" || e === "_ctx" || e === "$stable", Qa = (e) => ee(e) ? e.map(at) : [at(e)], D_ = (e, t, r) => {
  if (t._n)
    return t;
  const n = Oa((...i) => Qa(t(...i)), r);
  return n._c = !1, n;
}, id = (e, t, r) => {
  const n = e._ctx;
  for (const i in e) {
    if (Va(i)) continue;
    const s = e[i];
    if (oe(s))
      t[i] = D_(i, s, n);
    else if (s != null) {
      const o = Qa(s);
      t[i] = () => o;
    }
  }
}, sd = (e, t) => {
  const r = Qa(t);
  e.slots.default = () => r;
}, od = (e, t, r) => {
  for (const n in t)
    (r || !Va(n)) && (e[n] = t[n]);
}, k_ = (e, t, r) => {
  const n = e.slots = ed();
  if (e.vnode.shapeFlag & 32) {
    const i = t._;
    i ? (od(n, t, r), r && ln(n, "_", i, !0)) : id(t, n);
  } else t && sd(e, t);
}, L_ = (e, t, r) => {
  const { vnode: n, slots: i } = e;
  let s = !0, o = de;
  if (n.shapeFlag & 32) {
    const a = t._;
    a ? r && a === 1 ? s = !1 : od(i, t, r) : (s = !t.$stable, id(t, i)), o = t;
  } else t && (sd(e, t), o = { default: 1 });
  if (s)
    for (const a in i)
      !Va(a) && o[a] == null && delete i[a];
};
function j_() {
  typeof __VUE_OPTIONS_API__ != "boolean" && (Mr().__VUE_OPTIONS_API__ = !0), typeof __VUE_PROD_DEVTOOLS__ != "boolean" && (Mr().__VUE_PROD_DEVTOOLS__ = !1), typeof __VUE_PROD_HYDRATION_MISMATCH_DETAILS__ != "boolean" && (Mr().__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = !1);
}
const ke = pd;
function ad(e) {
  return cd(e);
}
function ld(e) {
  return cd(e, Cg);
}
function cd(e, t) {
  j_();
  const r = Mr();
  r.__VUE__ = !0, __VUE_PROD_DEVTOOLS__ && Ra(r.__VUE_DEVTOOLS_GLOBAL_HOOK__, r);
  const {
    insert: n,
    remove: i,
    patchProp: s,
    createElement: o,
    createText: a,
    createComment: l,
    setText: h,
    setElementText: p,
    parentNode: c,
    nextSibling: m,
    setScopeId: _ = Qe,
    insertStaticContent: v
  } = e, I = (f, g, N, F = null, U = null, H = null, X = void 0, O = null, $ = !!g.dynamicChildren) => {
    if (f === g)
      return;
    f && !It(f, g) && (F = $e(f), me(f, U, H, !0), f = null), g.patchFlag === -2 && ($ = !1, g.dynamicChildren = null);
    const { type: V, ref: W, shapeFlag: K } = g;
    switch (V) {
      case rr:
        k(f, g, N, F);
        break;
      case Pe:
        L(f, g, N, F);
        break;
      case yr:
        f == null && A(g, N, F, X);
        break;
      case Le:
        R(
          f,
          g,
          N,
          F,
          U,
          H,
          X,
          O,
          $
        );
        break;
      default:
        K & 1 ? S(
          f,
          g,
          N,
          F,
          U,
          H,
          X,
          O,
          $
        ) : K & 6 ? Q(
          f,
          g,
          N,
          F,
          U,
          H,
          X,
          O,
          $
        ) : (K & 64 || K & 128) && V.process(
          f,
          g,
          N,
          F,
          U,
          H,
          X,
          O,
          $,
          et
        );
    }
    W != null && U ? sn(W, f && f.ref, H, g || f, !g) : W == null && f && f.ref != null && sn(f.ref, null, H, f, !0);
  }, k = (f, g, N, F) => {
    if (f == null)
      n(
        g.el = a(g.children),
        N,
        F
      );
    else {
      const U = g.el = f.el;
      g.children !== f.children && h(U, g.children);
    }
  }, L = (f, g, N, F) => {
    f == null ? n(
      g.el = l(g.children || ""),
      N,
      F
    ) : g.el = f.el;
  }, A = (f, g, N, F) => {
    [f.el, f.anchor] = v(
      f.children,
      g,
      N,
      F,
      f.el,
      f.anchor
    );
  }, x = ({ el: f, anchor: g }, N, F) => {
    let U;
    for (; f && f !== g; )
      U = m(f), n(f, N, F), f = U;
    n(g, N, F);
  }, T = ({ el: f, anchor: g }) => {
    let N;
    for (; f && f !== g; )
      N = m(f), i(f), f = N;
    i(g);
  }, S = (f, g, N, F, U, H, X, O, $) => {
    if (g.type === "svg" ? X = "svg" : g.type === "math" && (X = "mathml"), f == null)
      C(
        g,
        N,
        F,
        U,
        H,
        X,
        O,
        $
      );
    else {
      const V = f.el && f.el._isVueCE ? f.el : null;
      try {
        V && V._beginPatch(), b(
          f,
          g,
          U,
          H,
          X,
          O,
          $
        );
      } finally {
        V && V._endPatch();
      }
    }
  }, C = (f, g, N, F, U, H, X, O) => {
    let $, V;
    const { props: W, shapeFlag: K, transition: J, dirs: te } = f;
    if ($ = f.el = o(
      f.type,
      H,
      W && W.is,
      W
    ), K & 8 ? p($, f.children) : K & 16 && j(
      f.children,
      $,
      null,
      F,
      U,
      Mo(f, H),
      X,
      O
    ), te && Dt(f, null, F, "created"), D($, f, f.scopeId, X, F), W) {
      for (const u in W)
        u !== "value" && !Zt(u) && s($, u, null, W[u], H, F);
      "value" in W && s($, "value", null, W.value, H), (V = W.onVnodeBeforeMount) && ot(V, F, f);
    }
    __VUE_PROD_DEVTOOLS__ && (ln($, "__vnode", f, !0), ln($, "__vueParentComponent", F, !0)), te && Dt(f, null, F, "beforeMount");
    const y = ud(U, J);
    y && J.beforeEnter($), n($, g, N), ((V = W && W.onVnodeMounted) || y || te) && ke(() => {
      try {
        V && ot(V, F, f), y && J.enter($), te && Dt(f, null, F, "mounted");
      } finally {
      }
    }, U);
  }, D = (f, g, N, F, U) => {
    if (N && _(f, N), F)
      for (let H = 0; H < F.length; H++)
        _(f, F[H]);
    if (U) {
      let H = U.subTree;
      if (g === H || Ss(H.type) && (H.ssContent === g || H.ssFallback === g)) {
        const X = U.vnode;
        D(
          f,
          X,
          X.scopeId,
          X.slotScopeIds,
          U.parent
        );
      }
    }
  }, j = (f, g, N, F, U, H, X, O, $ = 0) => {
    for (let V = $; V < f.length; V++) {
      const W = f[V] = O ? zt(f[V]) : at(f[V]);
      I(
        null,
        W,
        g,
        N,
        F,
        U,
        H,
        X,
        O
      );
    }
  }, b = (f, g, N, F, U, H, X) => {
    const O = g.el = f.el;
    __VUE_PROD_DEVTOOLS__ && (O.__vnode = g);
    let { patchFlag: $, dynamicChildren: V, dirs: W } = g;
    $ |= f.patchFlag & 16;
    const K = f.props || de, J = g.props || de;
    let te;
    if (N && Ir(N, !1), (te = J.onVnodeBeforeUpdate) && ot(te, N, g, f), W && Dt(g, f, N, "beforeUpdate"), N && Ir(N, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    V && (!f.dynamicChildren || f.dynamicChildren.length !== V.length) && ($ = 0, X = !1, V = null), (K.innerHTML && J.innerHTML == null || K.textContent && J.textContent == null) && p(O, ""), V ? w(
      f.dynamicChildren,
      V,
      O,
      N,
      F,
      Mo(g, U),
      H
    ) : X || re(
      f,
      g,
      O,
      null,
      N,
      F,
      Mo(g, U),
      H,
      !1
    ), $ > 0) {
      if ($ & 16)
        P(O, K, J, N, U);
      else if ($ & 2 && K.class !== J.class && s(O, "class", null, J.class, U), $ & 4 && s(O, "style", K.style, J.style, U), $ & 8) {
        const y = g.dynamicProps;
        for (let u = 0; u < y.length; u++) {
          const d = y[u], E = K[d], M = J[d];
          (M !== E || d === "value") && s(O, d, E, M, U, N);
        }
      }
      $ & 1 && f.children !== g.children && p(O, g.children);
    } else !X && V == null && P(O, K, J, N, U);
    ((te = J.onVnodeUpdated) || W) && ke(() => {
      te && ot(te, N, g, f), W && Dt(g, f, N, "updated");
    }, F);
  }, w = (f, g, N, F, U, H, X) => {
    for (let O = 0; O < g.length; O++) {
      const $ = f[O], V = g[O], W = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        $.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        ($.type === Le || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !It($, V) || // - In the case of a component, it could contain anything.
        $.shapeFlag & 198) ? c($.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          N
        )
      );
      I(
        $,
        V,
        W,
        null,
        F,
        U,
        H,
        X,
        !0
      );
    }
  }, P = (f, g, N, F, U) => {
    if (g !== N) {
      if (g !== de)
        for (const H in g)
          !Zt(H) && !(H in N) && s(
            f,
            H,
            g[H],
            null,
            U,
            F
          );
      for (const H in N) {
        if (Zt(H)) continue;
        const X = N[H], O = g[H];
        X !== O && H !== "value" && s(f, H, O, X, U, F);
      }
      "value" in N && s(f, "value", g.value, N.value, U);
    }
  }, R = (f, g, N, F, U, H, X, O, $) => {
    const V = g.el = f ? f.el : a(""), W = g.anchor = f ? f.anchor : a("");
    let { patchFlag: K, dynamicChildren: J, slotScopeIds: te } = g;
    te && (O = O ? O.concat(te) : te), f == null ? (n(V, N, F), n(W, N, F), j(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      g.children || [],
      N,
      W,
      U,
      H,
      X,
      O,
      $
    )) : K > 0 && K & 64 && J && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    f.dynamicChildren && f.dynamicChildren.length === J.length ? (w(
      f.dynamicChildren,
      J,
      N,
      U,
      H,
      X,
      O
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (g.key != null || U && g === U.subTree) && Ha(
      f,
      g,
      !0
      /* shallow */
    )) : re(
      f,
      g,
      N,
      W,
      U,
      H,
      X,
      O,
      $
    );
  }, Q = (f, g, N, F, U, H, X, O, $) => {
    g.slotScopeIds = O, f == null ? g.shapeFlag & 512 ? U.ctx.activate(
      g,
      N,
      F,
      X,
      $
    ) : Y(
      g,
      N,
      F,
      U,
      H,
      X,
      $
    ) : Z(f, g, $);
  }, Y = (f, g, N, F, U, H, X) => {
    const O = f.component = vd(
      f,
      F,
      U
    );
    if (Bi(f) && (O.ctx.renderer = et), Ed(O, !1, X), O.asyncDep) {
      if (U && U.registerDep(O, z, X), !f.el) {
        const $ = O.subTree = Ce(Pe);
        L(null, $, g, N), f.placeholder = $.el;
      }
    } else
      z(
        O,
        f,
        g,
        N,
        U,
        H,
        X
      );
  }, Z = (f, g, N) => {
    const F = g.component = f.component;
    if (C_(f, g, N))
      if (F.asyncDep && !F.asyncResolved) {
        ne(F, g, N);
        return;
      } else
        F.next = g, F.update();
    else
      g.el = f.el, F.vnode = g;
  }, z = (f, g, N, F, U, H, X) => {
    const O = () => {
      if (f.isMounted) {
        let { next: K, bu: J, u: te, parent: y, vnode: u } = f;
        {
          const q = fd(f);
          if (q) {
            K && (K.el = u.el, ne(f, K, X)), q.asyncDep.then(() => {
              ke(() => {
                f.isUnmounted || V();
              }, U);
            });
            return;
          }
        }
        let d = K, E;
        Ir(f, !1), K ? (K.el = u.el, ne(f, K, X)) : K = u, J && rn(J), (E = K.props && K.props.onVnodeBeforeUpdate) && ot(E, y, K, u), Ir(f, !0);
        const M = os(f), B = f.subTree;
        f.subTree = M, I(
          B,
          M,
          // parent may have changed if it's in a teleport
          c(B.el),
          // anchor may have changed if it's in a fragment
          $e(B),
          f,
          U,
          H
        ), K.el = M.el, d === null && oo(f, M.el), te && ke(te, U), (E = K.props && K.props.onVnodeUpdated) && ke(
          () => ot(E, y, K, u),
          U
        ), __VUE_PROD_DEVTOOLS__ && wf(f);
      } else {
        let K;
        const { el: J, props: te } = g, { bm: y, m: u, parent: d, root: E, type: M } = f, B = tr(g);
        if (Ir(f, !1), y && rn(y), !B && (K = te && te.onVnodeBeforeMount) && ot(K, d, g), Ir(f, !0), J && G) {
          const q = () => {
            f.subTree = os(f), G(
              J,
              f.subTree,
              f,
              U,
              null
            );
          };
          B && M.__asyncHydrate ? M.__asyncHydrate(
            J,
            f,
            q
          ) : q();
        } else {
          E.ce && E.ce._hasShadowRoot() && E.ce._injectChildStyle(
            M,
            f.parent ? f.parent.type : void 0
          );
          const q = f.subTree = os(f);
          I(
            null,
            q,
            N,
            F,
            f,
            U,
            H
          ), g.el = q.el;
        }
        if (u && ke(u, U), !B && (K = te && te.onVnodeMounted)) {
          const q = g;
          ke(
            () => ot(K, d, q),
            U
          );
        }
        (g.shapeFlag & 256 || d && tr(d.vnode) && d.vnode.shapeFlag & 256) && f.a && ke(f.a, U), f.isMounted = !0, __VUE_PROD_DEVTOOLS__ && qo(f), g = N = F = null;
      }
    };
    f.scope.on();
    const $ = f.effect = new yi(O);
    f.scope.off();
    const V = f.update = $.run.bind($), W = f.job = $.runIfDirty.bind($);
    W.i = f, W.id = f.uid, $.scheduler = () => Aa(W), Ir(f, !0), V();
  }, ne = (f, g, N) => {
    g.component = f;
    const F = f.vnode.props;
    f.vnode = g, f.next = null, P_(f, g.props, F, N), L_(f, g.children, N), At(), dc(f), Rt();
  }, re = (f, g, N, F, U, H, X, O, $ = !1) => {
    const V = f && f.children, W = f ? f.shapeFlag : 0, K = g.children, { patchFlag: J, shapeFlag: te } = g;
    if (J > 0) {
      if (J & 128) {
        se(
          V,
          K,
          N,
          F,
          U,
          H,
          X,
          O,
          $
        );
        return;
      } else if (J & 256) {
        _e(
          V,
          K,
          N,
          F,
          U,
          H,
          X,
          O,
          $
        );
        return;
      }
    }
    te & 8 ? (W & 16 && we(V, U, H), K !== V && p(N, K)) : W & 16 ? te & 16 ? se(
      V,
      K,
      N,
      F,
      U,
      H,
      X,
      O,
      $
    ) : we(V, U, H, !0) : (W & 8 && p(N, ""), te & 16 && j(
      K,
      N,
      F,
      U,
      H,
      X,
      O,
      $
    ));
  }, _e = (f, g, N, F, U, H, X, O, $) => {
    f = f || Zr, g = g || Zr;
    const V = f.length, W = g.length, K = Math.min(V, W);
    let J;
    for (J = 0; J < K; J++) {
      const te = g[J] = $ ? zt(g[J]) : at(g[J]);
      I(
        f[J],
        te,
        N,
        null,
        U,
        H,
        X,
        O,
        $
      );
    }
    V > W ? we(
      f,
      U,
      H,
      !0,
      !1,
      K
    ) : j(
      g,
      N,
      F,
      U,
      H,
      X,
      O,
      $,
      K
    );
  }, se = (f, g, N, F, U, H, X, O, $) => {
    let V = 0;
    const W = g.length;
    let K = f.length - 1, J = W - 1;
    for (; V <= K && V <= J; ) {
      const te = f[V], y = g[V] = $ ? zt(g[V]) : at(g[V]);
      if (It(te, y))
        I(
          te,
          y,
          N,
          null,
          U,
          H,
          X,
          O,
          $
        );
      else
        break;
      V++;
    }
    for (; V <= K && V <= J; ) {
      const te = f[K], y = g[J] = $ ? zt(g[J]) : at(g[J]);
      if (It(te, y))
        I(
          te,
          y,
          N,
          null,
          U,
          H,
          X,
          O,
          $
        );
      else
        break;
      K--, J--;
    }
    if (V > K) {
      if (V <= J) {
        const te = J + 1, y = te < W ? g[te].el : F;
        for (; V <= J; )
          I(
            null,
            g[V] = $ ? zt(g[V]) : at(g[V]),
            N,
            y,
            U,
            H,
            X,
            O,
            $
          ), V++;
      }
    } else if (V > J)
      for (; V <= K; )
        me(f[V], U, H, !0), V++;
    else {
      const te = V, y = V, u = /* @__PURE__ */ new Map();
      for (V = y; V <= J; V++) {
        const ue = g[V] = $ ? zt(g[V]) : at(g[V]);
        ue.key != null && u.set(ue.key, V);
      }
      let d, E = 0;
      const M = J - y + 1;
      let B = !1, q = 0;
      const le = new Array(M);
      for (V = 0; V < M; V++) le[V] = 0;
      for (V = te; V <= K; V++) {
        const ue = f[V];
        if (E >= M) {
          me(ue, U, H, !0);
          continue;
        }
        let ge;
        if (ue.key != null)
          ge = u.get(ue.key);
        else
          for (d = y; d <= J; d++)
            if (le[d - y] === 0 && It(ue, g[d])) {
              ge = d;
              break;
            }
        ge === void 0 ? me(ue, U, H, !0) : (le[ge - y] = V + 1, ge >= q ? q = ge : B = !0, I(
          ue,
          g[ge],
          N,
          null,
          U,
          H,
          X,
          O,
          $
        ), E++);
      }
      const Ne = B ? F_(le) : Zr;
      for (d = Ne.length - 1, V = M - 1; V >= 0; V--) {
        const ue = y + V, ge = g[ue], ve = g[ue + 1], _l = ue + 1 < W ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          ve.el || dd(ve)
        ) : F;
        le[V] === 0 ? I(
          null,
          ge,
          N,
          _l,
          U,
          H,
          X,
          O,
          $
        ) : B && (d < 0 || V !== Ne[d] ? ie(ge, N, _l, 2) : d--);
      }
    }
  }, ie = (f, g, N, F, U = null) => {
    const { el: H, type: X, transition: O, children: $, shapeFlag: V } = f;
    if (V & 6) {
      ie(f.component.subTree, g, N, F);
      return;
    }
    if (V & 128) {
      f.suspense.move(g, N, F);
      return;
    }
    if (V & 64) {
      X.move(f, g, N, et);
      return;
    }
    if (X === Le) {
      n(H, g, N);
      for (let K = 0; K < $.length; K++)
        ie($[K], g, N, F);
      n(f.anchor, g, N);
      return;
    }
    if (X === yr) {
      x(f, g, N);
      return;
    }
    if (F !== 2 && V & 1 && O)
      if (F === 0)
        O.persisted && !H[_t] ? n(H, g, N) : (O.beforeEnter(H), n(H, g, N), ke(() => O.enter(H), U));
      else {
        const { leave: K, delayLeave: J, afterLeave: te } = O, y = () => {
          f.ctx.isUnmounted ? i(H) : n(H, g, N);
        }, u = () => {
          const d = H._isLeaving || !!H[_t];
          H._isLeaving && H[_t](
            !0
            /* cancelled */
          ), O.persisted && !d ? y() : K(H, () => {
            y(), te && te();
          });
        };
        J ? J(H, y, u) : u();
      }
    else
      n(H, g, N);
  }, me = (f, g, N, F = !1, U = !1) => {
    const {
      type: H,
      props: X,
      ref: O,
      children: $,
      dynamicChildren: V,
      shapeFlag: W,
      patchFlag: K,
      dirs: J,
      cacheIndex: te,
      memo: y
    } = f;
    if (K === -2 && (U = !1), O != null && (At(), sn(O, null, N, f, !0), Rt()), te != null && (g.renderCache[te] = void 0), W & 256) {
      g.ctx.deactivate(f);
      return;
    }
    const u = W & 1 && J, d = !tr(f);
    let E;
    if (d && (E = X && X.onVnodeBeforeUnmount) && ot(E, g, f), W & 6)
      $t(f.component, N, F);
    else {
      if (W & 128) {
        f.suspense.unmount(N, F);
        return;
      }
      u && Dt(f, null, g, "beforeUnmount"), W & 64 ? f.type.remove(
        f,
        g,
        N,
        et,
        F
      ) : V && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !V.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (H !== Le || K > 0 && K & 64) ? we(
        V,
        g,
        N,
        !1,
        !0
      ) : (H === Le && K & 384 || !U && W & 16) && we($, g, N), F && Ut(f);
    }
    const M = y != null && te == null;
    (d && (E = X && X.onVnodeUnmounted) || u || M) && ke(() => {
      E && ot(E, g, f), u && Dt(f, null, g, "unmounted"), M && (f.el = null);
    }, N);
  }, Ut = (f) => {
    const { type: g, el: N, anchor: F, transition: U } = f;
    if (g === Le) {
      Ot(N, F);
      return;
    }
    if (g === yr) {
      T(f);
      return;
    }
    const H = () => {
      i(N), U && !U.persisted && U.afterLeave && U.afterLeave();
    };
    if (f.shapeFlag & 1 && U && !U.persisted) {
      const { leave: X, delayLeave: O } = U, $ = () => X(N, H);
      O ? O(f.el, H, $) : $();
    } else
      H();
  }, Ot = (f, g) => {
    let N;
    for (; f !== g; )
      N = m(f), i(f), f = N;
    i(g);
  }, $t = (f, g, N) => {
    const { bum: F, scope: U, job: H, subTree: X, um: O, m: $, a: V } = f;
    vs($), vs(V), F && rn(F), U.stop(), H && (H.flags |= 8, me(X, f, g, N)), O && ke(O, g), ke(() => {
      f.isUnmounted = !0;
    }, g), __VUE_PROD_DEVTOOLS__ && fg(f);
  }, we = (f, g, N, F = !1, U = !1, H = 0) => {
    for (let X = H; X < f.length; X++)
      me(f[X], g, N, F, U);
  }, $e = (f) => {
    if (f.shapeFlag & 6)
      return $e(f.component.subTree);
    if (f.shapeFlag & 128)
      return f.suspense.next();
    const g = m(f.anchor || f.el), N = g && g[Cf];
    return N ? m(N) : g;
  };
  let Fe = !1;
  const mt = (f, g, N) => {
    let F;
    f == null ? g._vnode && (me(g._vnode, null, null, !0), F = g._vnode.component) : I(
      g._vnode || null,
      f,
      g,
      null,
      null,
      null,
      N
    ), g._vnode = f, Fe || (Fe = !0, dc(F), _s(), Fe = !1);
  }, et = {
    p: I,
    um: me,
    m: ie,
    r: Ut,
    mt: Y,
    mc: j,
    pc: re,
    pbc: w,
    n: $e,
    o: e
  };
  let vt, G;
  return t && ([vt, G] = t(
    et
  )), {
    render: mt,
    hydrate: vt,
    createApp: E_(mt, vt)
  };
}
function Mo({ type: e, props: t }, r) {
  return r === "svg" && e === "foreignObject" || r === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : r;
}
function Ir({ effect: e, job: t }, r) {
  r ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function ud(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Ha(e, t, r = !1) {
  const n = e.children, i = t.children;
  if (ee(n) && ee(i))
    for (let s = 0; s < n.length; s++) {
      const o = n[s];
      let a = i[s];
      a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = i[s] = zt(i[s]), a.el = o.el), !r && a.patchFlag !== -2 && Ha(o, a)), a.type === rr && (a.patchFlag === -1 && (a = i[s] = zt(a)), a.el = o.el), a.type === Pe && !a.el && (a.el = o.el);
    }
}
function F_(e) {
  const t = e.slice(), r = [0];
  let n, i, s, o, a;
  const l = e.length;
  for (n = 0; n < l; n++) {
    const h = e[n];
    if (h !== 0) {
      if (i = r[r.length - 1], e[i] < h) {
        t[n] = i, r.push(n);
        continue;
      }
      for (s = 0, o = r.length - 1; s < o; )
        a = s + o >> 1, e[r[a]] < h ? s = a + 1 : o = a;
      h < e[r[s]] && (s > 0 && (t[n] = r[s - 1]), r[s] = n);
    }
  }
  for (s = r.length, o = r[s - 1]; s-- > 0; )
    r[s] = o, o = t[o];
  return r;
}
function fd(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : fd(t);
}
function vs(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function dd(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? dd(t.subTree) : null;
}
const Ss = (e) => e.__isSuspense;
let Zo = 0;
const B_ = {
  name: "Suspense",
  // In order to make Suspense tree-shakable, we need to avoid importing it
  // directly in the renderer. The renderer checks for the __isSuspense flag
  // on a vnode's type and calls the `process` method, passing in renderer
  // internals.
  __isSuspense: !0,
  process(e, t, r, n, i, s, o, a, l, h) {
    if (e == null)
      $_(
        t,
        r,
        n,
        i,
        s,
        o,
        a,
        l,
        h
      );
    else {
      if (s && s.deps > 0 && !e.suspense.isInFallback) {
        t.suspense = e.suspense, t.suspense.vnode = t, t.el = e.el;
        return;
      }
      V_(
        e,
        t,
        r,
        n,
        i,
        o,
        a,
        l,
        h
      );
    }
  },
  hydrate: Q_,
  normalize: H_
}, U_ = B_;
function Ii(e, t) {
  const r = e.props && e.props[t];
  oe(r) && r();
}
function $_(e, t, r, n, i, s, o, a, l) {
  const {
    p: h,
    o: { createElement: p }
  } = l, c = p("div"), m = e.suspense = hd(
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
  h(
    null,
    m.pendingBranch = e.ssContent,
    c,
    null,
    n,
    m,
    s,
    o
  ), m.deps > 0 ? (Ii(e, "onPending"), Ii(e, "onFallback"), h(
    null,
    e.ssFallback,
    t,
    r,
    n,
    null,
    // fallback tree will not have suspense context
    s,
    o
  ), on(m, e.ssFallback)) : m.resolve(!1, !0);
}
function V_(e, t, r, n, i, s, o, a, { p: l, um: h, o: { createElement: p } }) {
  const c = t.suspense = e.suspense;
  c.vnode = t, t.el = e.el;
  const m = t.ssContent, _ = t.ssFallback, { activeBranch: v, pendingBranch: I, isInFallback: k, isHydrating: L } = c;
  if (I)
    c.pendingBranch = m, It(I, m) ? (l(
      I,
      m,
      c.hiddenContainer,
      null,
      i,
      c,
      s,
      o,
      a
    ), c.deps <= 0 ? c.resolve() : k && (L || (l(
      v,
      _,
      r,
      n,
      i,
      null,
      // fallback tree will not have suspense context
      s,
      o,
      a
    ), on(c, _)))) : (c.pendingId = Zo++, L ? (c.isHydrating = !1, c.activeBranch = I) : h(I, i, c), c.deps = 0, c.effects.length = 0, c.hiddenContainer = p("div"), k ? (l(
      null,
      m,
      c.hiddenContainer,
      null,
      i,
      c,
      s,
      o,
      a
    ), c.deps <= 0 ? c.resolve() : (l(
      v,
      _,
      r,
      n,
      i,
      null,
      // fallback tree will not have suspense context
      s,
      o,
      a
    ), on(c, _))) : v && It(v, m) ? (l(
      v,
      m,
      r,
      n,
      i,
      c,
      s,
      o,
      a
    ), c.resolve(!0)) : (l(
      null,
      m,
      c.hiddenContainer,
      null,
      i,
      c,
      s,
      o,
      a
    ), c.deps <= 0 && c.resolve()));
  else if (v && It(v, m))
    l(
      v,
      m,
      r,
      n,
      i,
      c,
      s,
      o,
      a
    ), on(c, m);
  else if (Ii(t, "onPending"), c.pendingBranch = m, m.shapeFlag & 512 ? c.pendingId = m.component.suspenseId : c.pendingId = Zo++, l(
    null,
    m,
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
    const { timeout: A, pendingId: x } = c;
    A > 0 ? setTimeout(() => {
      c.pendingId === x && c.fallback(_);
    }, A) : A === 0 && c.fallback(_);
  }
}
function hd(e, t, r, n, i, s, o, a, l, h, p = !1) {
  const {
    p: c,
    m,
    um: _,
    n: v,
    o: { parentNode: I, remove: k }
  } = h;
  let L;
  const A = q_(e);
  A && t && t.pendingBranch && (L = t.pendingId, t.deps++);
  const x = e.props ? ds(e.props.timeout) : void 0, T = s, S = {
    vnode: e,
    parent: t,
    parentComponent: r,
    namespace: o,
    container: n,
    hiddenContainer: i,
    deps: 0,
    pendingId: Zo++,
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
        vnode: j,
        activeBranch: b,
        pendingBranch: w,
        pendingId: P,
        effects: R,
        parentComponent: Q,
        container: Y,
        isInFallback: Z
      } = S;
      let z = !1;
      if (S.isHydrating)
        S.isHydrating = !1;
      else if (!C) {
        z = b && w.transition && w.transition.mode === "out-in";
        let _e = !1;
        z && (b.transition.afterLeave = () => {
          P === S.pendingId && (m(
            w,
            Y,
            s === T && !_e ? v(b) : s,
            0
          ), vi(R), Z && j.ssFallback && (j.ssFallback.el = null));
        }), b && !S.isFallbackMountPending && (I(b.el) === Y && (s = v(b), _e = !0), _(b, Q, S, !0), !z && Z && j.ssFallback && ke(() => j.ssFallback.el = null, S)), z || m(w, Y, s, 0);
      }
      S.isFallbackMountPending = !1, on(S, w), S.pendingBranch = null, S.isInFallback = !1;
      let ne = S.parent, re = !1;
      for (; ne; ) {
        if (ne.pendingBranch) {
          ne.effects.push(...R), re = !0;
          break;
        }
        ne = ne.parent;
      }
      !re && !z && vi(R), S.effects = [], A && t && t.pendingBranch && L === t.pendingId && (t.deps--, t.deps === 0 && !D && t.resolve()), Ii(j, "onResolve");
    },
    fallback(C) {
      if (!S.pendingBranch)
        return;
      const { vnode: D, activeBranch: j, parentComponent: b, container: w, namespace: P } = S;
      Ii(D, "onFallback");
      const R = v(j), Q = () => {
        S.isFallbackMountPending = !1, S.isInFallback && (c(
          null,
          C,
          w,
          R,
          b,
          null,
          // fallback tree will not have suspense context
          P,
          a,
          l
        ), on(S, C));
      }, Y = C.transition && C.transition.mode === "out-in";
      Y && (S.isFallbackMountPending = !0, j.transition.afterLeave = Q), S.isInFallback = !0, _(
        j,
        b,
        null,
        // no suspense so unmount hooks fire now
        !0
        // shouldRemove
      ), Y || Q();
    },
    move(C, D, j) {
      S.activeBranch && m(S.activeBranch, C, D, j), S.container = C;
    },
    next() {
      return S.activeBranch && v(S.activeBranch);
    },
    registerDep(C, D, j) {
      const b = !!S.pendingBranch;
      b && S.deps++;
      const w = C.vnode.el;
      C.asyncDep.catch((P) => {
        Wr(P, C, 0);
      }).then((P) => {
        if (C.isUnmounted || S.isUnmounted || S.pendingId !== C.suspenseId)
          return;
        Ai(), C.asyncResolved = !0;
        const { vnode: R } = C;
        ea(C, P, !1), w && (R.el = w);
        const Q = !w && C.subTree.el;
        D(
          C,
          R,
          // component may have been moved before resolve.
          // if this is not a hydration, instance.subTree will be the comment
          // placeholder.
          I(w || C.subTree.el),
          // anchor will not be used if this is hydration, so only need to
          // consider the comment placeholder case.
          w ? null : v(C.subTree),
          S,
          o,
          j
        ), Q && (R.placeholder = null, k(Q)), oo(C, R.el), b && --S.deps === 0 && S.resolve();
      });
    },
    unmount(C, D) {
      S.isUnmounted = !0, S.activeBranch && _(
        S.activeBranch,
        r,
        C,
        D
      ), S.pendingBranch && _(
        S.pendingBranch,
        r,
        C,
        D
      );
    }
  };
  return S;
}
function Q_(e, t, r, n, i, s, o, a, l) {
  const h = t.suspense = hd(
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
    h.pendingBranch = t.ssContent,
    r,
    h,
    s,
    o
  );
  return h.deps === 0 && h.resolve(!1, !0), p;
}
function H_(e) {
  const { shapeFlag: t, children: r } = e, n = t & 32;
  e.ssContent = Nc(
    n ? r.default : r
  ), e.ssFallback = n ? Nc(r.fallback) : Ce(Pe);
}
function Nc(e) {
  let t;
  if (oe(e)) {
    const r = Ur && e._c;
    r && (e._d = !1, xi()), e = e(), r && (e._d = !0, t = Ye, md());
  }
  return ee(e) && (e = N_(e)), e = at(e), t && !e.dynamicChildren && (e.dynamicChildren = t.filter((r) => r !== e)), e;
}
function pd(e, t) {
  t && t.pendingBranch ? ee(e) ? t.effects.push(...e) : t.effects.push(e) : vi(e);
}
function on(e, t) {
  e.activeBranch = t;
  const { vnode: r, parentComponent: n } = e;
  let i = t.el;
  for (; !i && t.component; )
    t = t.component.subTree, i = t.el;
  r.el = i, n && n.subTree === r && (n.vnode.el = i, oo(n, i));
}
function q_(e) {
  const t = e.props && e.props.suspensible;
  return t != null && t !== !1;
}
const Le = /* @__PURE__ */ Symbol.for("v-fgt"), rr = /* @__PURE__ */ Symbol.for("v-txt"), Pe = /* @__PURE__ */ Symbol.for("v-cmt"), yr = /* @__PURE__ */ Symbol.for("v-stc"), mi = [];
let Ye = null;
function xi(e = !1) {
  mi.push(Ye = e ? null : []);
}
function md() {
  mi.pop(), Ye = mi[mi.length - 1] || null;
}
let Ur = 1;
function Ni(e, t = !1) {
  Ur += e, e < 0 && Ye && t && (Ye.hasOnce = !0);
}
function gd(e) {
  return e.dynamicChildren = Ur > 0 ? Ye || Zr : null, md(), Ur > 0 && Ye && Ye.push(e), e;
}
function K_(e, t, r, n, i, s) {
  return gd(
    qa(
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
  return gd(
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
function or(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function It(e, t) {
  return e.type === t.type && e.key === t.key;
}
function W_(e) {
}
const _d = ({ key: e }) => e ?? null, as = ({
  ref: e,
  ref_key: t,
  ref_for: r
}) => (typeof e == "number" && (e = "" + e), e != null ? ae(e) || /* @__PURE__ */ De(e) || oe(e) ? { i: Ke, r: e, k: t, f: !!r } : e : null);
function qa(e, t = null, r = null, n = 0, i = null, s = e === Le ? 0 : 1, o = !1, a = !1) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && _d(t),
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
  return a ? (ws(l, r), s & 128 && e.normalize(l)) : r && (l.shapeFlag |= ae(r) ? 8 : 16), Ur > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  Ye && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (l.patchFlag > 0 || s & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  l.patchFlag !== 32 && Ye.push(l), l;
}
const Ce = G_;
function G_(e, t = null, r = null, n = 0, i = null, s = !1) {
  if ((!e || e === Kf) && (e = Pe), or(e)) {
    const a = jt(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return r && ws(a, r), Ur > 0 && !s && Ye && (a.shapeFlag & 6 ? Ye[Ye.indexOf(e)] = a : Ye.push(a)), a.patchFlag = -2, a;
  }
  if (ny(e) && (e = e.__vccOpts), t) {
    t = yd(t);
    let { class: a, style: l } = t;
    a && !ae(a) && (t.class = Tn(a)), be(l) && (/* @__PURE__ */ Li(l) && !ee(l) && (l = fe({}, l)), t.style = bn(l));
  }
  const o = ae(e) ? 1 : Ss(e) ? 128 : Of(e) ? 64 : be(e) ? 4 : oe(e) ? 2 : 0;
  return qa(
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
function yd(e) {
  return e ? /* @__PURE__ */ Li(e) || td(e) ? fe({}, e) : e : null;
}
function jt(e, t, r = !1, n = !1) {
  const { props: i, ref: s, patchFlag: o, children: a, transition: l } = e, h = t ? Td(i || {}, t) : i, p = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: h,
    key: h && _d(h),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      r && s ? ee(s) ? s.concat(as(t)) : [s, as(t)] : as(t)
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
    patchFlag: t && e.type !== Le ? o === -1 ? 16 : o | 16 : o,
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
    ssContent: e.ssContent && jt(e.ssContent),
    ssFallback: e.ssFallback && jt(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return l && n && sr(
    p,
    l.clone(p)
  ), p;
}
function Ka(e = " ", t = 0) {
  return Ce(rr, null, e, t);
}
function z_(e, t) {
  const r = Ce(yr, null, e);
  return r.staticCount = t, r;
}
function bd(e = "", t = !1) {
  return t ? (xi(), Es(Pe, null, e)) : Ce(Pe, null, e);
}
function at(e) {
  return e == null || typeof e == "boolean" ? Ce(Pe) : ee(e) ? Ce(
    Le,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : or(e) ? zt(e) : Ce(rr, null, String(e));
}
function zt(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : jt(e);
}
function ws(e, t) {
  let r = 0;
  const { shapeFlag: n } = e;
  if (t == null)
    t = null;
  else if (ee(t))
    r = 16;
  else if (typeof t == "object")
    if (n & 65) {
      const i = t.default;
      i && (i._c && (i._d = !1), ws(e, i()), i._c && (i._d = !0));
      return;
    } else {
      r = 32;
      const i = t._;
      !i && !td(t) ? t._ctx = Ke : i === 3 && Ke && (Ke.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (oe(t)) {
    if (n & 65) {
      ws(e, { default: t });
      return;
    }
    t = { default: t, _ctx: Ke }, r = 32;
  } else
    t = String(t), n & 64 ? (r = 16, t = [Ka(t)]) : r = 8;
  e.children = t, e.shapeFlag |= r;
}
function Td(...e) {
  const t = {};
  for (let r = 0; r < e.length; r++) {
    const n = e[r];
    for (const i in n)
      if (i === "class")
        t.class !== n.class && (t.class = Tn([t.class, n.class]));
      else if (i === "style")
        t.style = bn([t.style, n.style]);
      else if (Qr(i)) {
        const s = t[i], o = n[i];
        o && s !== o && !(ee(s) && s.includes(o)) ? t[i] = s ? [].concat(s, o) : o : o == null && s == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
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
const Y_ = zf();
let X_ = 0;
function vd(e, t, r) {
  const n = e.type, i = (t ? t.appContext : e.appContext) || Y_, s = {
    uid: X_++,
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
    scope: new Ea(
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
    propsOptions: nd(n, i),
    emitsOptions: Xf(n, i),
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
  return s.ctx = { _: s }, s.root = t ? t.root : s, s.emit = I_.bind(null, s), e.ce && e.ce(s), s;
}
let qe = null;
const it = () => qe || Ke;
let Is, an;
{
  const e = Mr(), t = (r, n) => {
    let i;
    return (i = e[r]) || (i = e[r] = []), i.push(n), (s) => {
      i.length > 1 ? i.forEach((o) => o(s)) : i[0](s);
    };
  };
  Is = t(
    "__VUE_INSTANCE_SETTERS__",
    (r) => qe = r
  ), an = t(
    "__VUE_SSR_SETTERS__",
    (r) => $r = r
  );
}
const En = (e) => {
  const t = qe;
  return Is(e), e.scope.on(), () => {
    e.scope.off(), Is(t);
  };
}, Ai = () => {
  qe && qe.scope.off(), Is(null);
};
function Sd(e) {
  return e.vnode.shapeFlag & 4;
}
let $r = !1;
function Ed(e, t = !1, r = !1) {
  t && an(t);
  const { props: n, children: i } = e.vnode, s = Sd(e);
  O_(e, n, s, t), k_(e, i, r || t);
  const o = s ? J_(e, t) : void 0;
  return t && an(!1), o;
}
function J_(e, t) {
  const r = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, zo);
  const { setup: n } = r;
  if (n) {
    At();
    const i = e.setupContext = n.length > 1 ? xd(e) : null, s = En(e), o = Kr(
      n,
      e,
      0,
      [
        e.props,
        i
      ]
    ), a = va(o);
    if (Rt(), s(), (a || e.sp) && !tr(e) && ka(e), a) {
      if (o.then(Ai, Ai), t)
        return o.then((l) => {
          ea(e, l, t);
        }).catch((l) => {
          Wr(l, e, 0);
        });
      e.asyncDep = o;
    } else
      ea(e, o, t);
  } else
    Id(e, t);
}
function ea(e, t, r) {
  oe(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : be(t) && (__VUE_PROD_DEVTOOLS__ && (e.devtoolsRawSetupState = t), e.setupState = Na(t)), Id(e, r);
}
let xs, ta;
function wd(e) {
  xs = e, ta = (t) => {
    t.render._rc && (t.withProxy = new Proxy(t.ctx, n_));
  };
}
const Z_ = () => !xs;
function Id(e, t, r) {
  const n = e.type;
  if (!e.render) {
    if (!t && xs && !n.render) {
      const i = n.template || __VUE_OPTIONS_API__ && $a(e).template;
      if (i) {
        const { isCustomElement: s, compilerOptions: o } = e.appContext.config, { delimiters: a, compilerOptions: l } = n, h = fe(
          fe(
            {
              isCustomElement: s,
              delimiters: a
            },
            o
          ),
          l
        );
        n.render = xs(i, h);
      }
    }
    e.render = n.render || Qe, ta && ta(e);
  }
  if (__VUE_OPTIONS_API__) {
    const i = En(e);
    At();
    try {
      __(e);
    } finally {
      Rt(), i();
    }
  }
}
const ey = {
  get(e, t) {
    return ze(e, "get", ""), e[t];
  }
};
function xd(e) {
  const t = (r) => {
    e.exposed = r || {};
  };
  return {
    attrs: new Proxy(e.attrs, ey),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Ui(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Na(pf(e.exposed)), {
    get(t, r) {
      if (r in t)
        return t[r];
      if (r in pi)
        return pi[r](e);
    },
    has(t, r) {
      return r in t || r in pi;
    }
  })) : e.proxy;
}
const ty = /(?:^|[-_])\w/g, ry = (e) => e.replace(ty, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function Ns(e, t = !0) {
  return oe(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Nd(e, t, r = !1) {
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
  return n ? ry(n) : r ? "App" : "Anonymous";
}
function ny(e) {
  return oe(e) && "__vccOpts" in e;
}
const Wt = (e, t) => /* @__PURE__ */ Km(e, t, $r);
function Ad(e, t, r) {
  try {
    Ni(-1);
    const n = arguments.length;
    return n === 2 ? be(t) && !ee(t) ? or(t) ? Ce(e, null, [t]) : Ce(e, t) : Ce(e, null, t) : (n > 3 ? r = Array.prototype.slice.call(arguments, 2) : n === 3 && or(r) && (r = [r]), Ce(e, t, r));
  } finally {
    Ni(1);
  }
}
function iy() {
}
function sy(e, t, r, n) {
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
  return Ur > 0 && Ye && Ye.push(e), !0;
}
const ra = "3.5.39", oy = Qe, ay = sg, ly = wt, cy = Ra, uy = {
  createComponentInstance: vd,
  setupComponent: Ed,
  renderComponentRoot: os,
  setCurrentRenderingInstance: Ei,
  isVNode: or,
  normalizeVNode: at,
  getComponentPublicInstance: Ui,
  ensureValidVNode: Ua,
  pushWarningContext: Xm,
  popWarningContext: Jm
}, fy = uy, dy = null, hy = null, py = null;
/**
* @vue/runtime-dom v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let na;
const Ac = typeof window < "u" && window.trustedTypes;
if (Ac)
  try {
    na = /* @__PURE__ */ Ac.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const Cd = na ? (e) => na.createHTML(e) : (e) => e, my = "http://www.w3.org/2000/svg", gy = "http://www.w3.org/1998/Math/MathML", Gt = typeof document < "u" ? document : null, Rc = Gt && /* @__PURE__ */ Gt.createElement("template"), Od = {
  insert: (e, t, r) => {
    t.insertBefore(e, r || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, r, n) => {
    const i = t === "svg" ? Gt.createElementNS(my, e) : t === "mathml" ? Gt.createElementNS(gy, e) : r ? Gt.createElement(e, { is: r }) : Gt.createElement(e);
    return e === "select" && n && n.multiple != null && i.setAttribute("multiple", n.multiple), i;
  },
  createText: (e) => Gt.createTextNode(e),
  createComment: (e) => Gt.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Gt.querySelector(e),
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
      Rc.innerHTML = Cd(
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
}, cr = "transition", Zn = "animation", fn = /* @__PURE__ */ Symbol("_vtc"), Pd = {
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
}, Md = /* @__PURE__ */ fe(
  {},
  Ma,
  Pd
), _y = (e) => (e.displayName = "Transition", e.props = Md, e), yy = /* @__PURE__ */ _y(
  (e, { slots: t }) => Ad(Df, Dd(e), t)
), xr = (e, t = []) => {
  ee(e) ? e.forEach((r) => r(...t)) : e && e(...t);
}, Cc = (e) => e ? ee(e) ? e.some((t) => t.length > 1) : e.length > 1 : !1;
function Dd(e) {
  const t = {};
  for (const R in e)
    R in Pd || (t[R] = e[R]);
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
    appearActiveClass: h = o,
    appearToClass: p = a,
    leaveFromClass: c = `${r}-leave-from`,
    leaveActiveClass: m = `${r}-leave-active`,
    leaveToClass: _ = `${r}-leave-to`
  } = e, v = by(i), I = v && v[0], k = v && v[1], {
    onBeforeEnter: L,
    onEnter: A,
    onEnterCancelled: x,
    onLeave: T,
    onLeaveCancelled: S,
    onBeforeAppear: C = L,
    onAppear: D = A,
    onAppearCancelled: j = x
  } = t, b = (R, Q, Y, Z) => {
    R._enterCancelled = Z, hr(R, Q ? p : a), hr(R, Q ? h : o), Y && Y();
  }, w = (R, Q) => {
    R._isLeaving = !1, hr(R, c), hr(R, _), hr(R, m), Q && Q();
  }, P = (R) => (Q, Y) => {
    const Z = R ? D : A, z = () => b(Q, R, Y);
    xr(Z, [Q, z]), Oc(() => {
      hr(Q, R ? l : s), Pt(Q, R ? p : a), Cc(Z) || Pc(Q, n, I, z);
    });
  };
  return fe(t, {
    onBeforeEnter(R) {
      xr(L, [R]), Pt(R, s), Pt(R, o);
    },
    onBeforeAppear(R) {
      xr(C, [R]), Pt(R, l), Pt(R, h);
    },
    onEnter: P(!1),
    onAppear: P(!0),
    onLeave(R, Q) {
      R._isLeaving = !0;
      const Y = () => w(R, Q);
      Pt(R, c), R._enterCancelled ? (Pt(R, m), ia(R)) : (ia(R), Pt(R, m)), Oc(() => {
        R._isLeaving && (hr(R, c), Pt(R, _), Cc(T) || Pc(R, n, k, Y));
      }), xr(T, [R, Y]);
    },
    onEnterCancelled(R) {
      b(R, !1, void 0, !0), xr(x, [R]);
    },
    onAppearCancelled(R) {
      b(R, !0, void 0, !0), xr(j, [R]);
    },
    onLeaveCancelled(R) {
      w(R), xr(S, [R]);
    }
  });
}
function by(e) {
  if (e == null)
    return null;
  if (be(e))
    return [Do(e.enter), Do(e.leave)];
  {
    const t = Do(e);
    return [t, t];
  }
}
function Do(e) {
  return ds(e);
}
function Pt(e, t) {
  t.split(/\s+/).forEach((r) => r && e.classList.add(r)), (e[fn] || (e[fn] = /* @__PURE__ */ new Set())).add(t);
}
function hr(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.remove(n));
  const r = e[fn];
  r && (r.delete(t), r.size || (e[fn] = void 0));
}
function Oc(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let Ty = 0;
function Pc(e, t, r, n) {
  const i = e._endId = ++Ty, s = () => {
    i === e._endId && n();
  };
  if (r != null)
    return setTimeout(s, r);
  const { type: o, timeout: a, propCount: l } = kd(e, t);
  if (!o)
    return n();
  const h = o + "end";
  let p = 0;
  const c = () => {
    e.removeEventListener(h, m), s();
  }, m = (_) => {
    _.target === e && ++p >= l && c();
  };
  setTimeout(() => {
    p < l && c();
  }, a + 1), e.addEventListener(h, m);
}
function kd(e, t) {
  const r = window.getComputedStyle(e), n = (v) => (r[v] || "").split(", "), i = n(`${cr}Delay`), s = n(`${cr}Duration`), o = Mc(i, s), a = n(`${Zn}Delay`), l = n(`${Zn}Duration`), h = Mc(a, l);
  let p = null, c = 0, m = 0;
  t === cr ? o > 0 && (p = cr, c = o, m = s.length) : t === Zn ? h > 0 && (p = Zn, c = h, m = l.length) : (c = Math.max(o, h), p = c > 0 ? o > h ? cr : Zn : null, m = p ? p === cr ? s.length : l.length : 0);
  const _ = p === cr && /\b(?:transform|all)(?:,|$)/.test(
    n(`${cr}Property`).toString()
  );
  return {
    type: p,
    timeout: c,
    propCount: m,
    hasTransform: _
  };
}
function Mc(e, t) {
  for (; e.length < t.length; )
    e = e.concat(e);
  return Math.max(...t.map((r, n) => Dc(r) + Dc(e[n])));
}
function Dc(e) {
  return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function ia(e) {
  return (e ? e.ownerDocument : document).body.offsetHeight;
}
function vy(e, t, r) {
  const n = e[fn];
  n && (t = (t ? [t, ...n] : [...n]).join(" ")), t == null ? e.removeAttribute("class") : r ? e.setAttribute("class", t) : e.className = t;
}
const As = /* @__PURE__ */ Symbol("_vod"), Wa = /* @__PURE__ */ Symbol("_vsh"), Ld = {
  // used for prop mismatch check during hydration
  name: "show",
  beforeMount(e, { value: t }, { transition: r }) {
    e[As] = e.style.display === "none" ? "" : e.style.display, r && t ? r.beforeEnter(e) : ei(e, t);
  },
  mounted(e, { value: t }, { transition: r }) {
    r && t && r.enter(e);
  },
  updated(e, { value: t, oldValue: r }, { transition: n }) {
    !t != !r && (n ? t ? (n.beforeEnter(e), ei(e, !0), n.enter(e)) : n.leave(e, () => {
      ei(e, !1);
    }) : ei(e, t));
  },
  beforeUnmount(e, { value: t }) {
    ei(e, t);
  }
};
function ei(e, t) {
  e.style.display = t ? e[As] : "none", e[Wa] = !t;
}
function Sy() {
  Ld.getSSRProps = ({ value: e }) => {
    if (!e)
      return { style: { display: "none" } };
  };
}
const jd = /* @__PURE__ */ Symbol("");
function Ey(e) {
  const t = it();
  if (!t)
    return;
  const r = t.ut = (i = e(t.proxy)) => {
    Array.from(
      document.querySelectorAll(`[data-v-owner="${t.uid}"]`)
    ).forEach((s) => Rs(s, i));
  }, n = () => {
    const i = e(t.proxy);
    t.ce ? Rs(t.ce, i) : sa(t.subTree, i), r(i);
  };
  ja(() => {
    vi(n);
  }), vn(() => {
    _r(n, Qe, { flush: "post" });
    const i = new MutationObserver(n);
    i.observe(t.subTree.el.parentNode, { childList: !0 }), Sn(() => i.disconnect());
  });
}
function sa(e, t) {
  if (e.shapeFlag & 128) {
    const r = e.suspense;
    e = r.activeBranch, r.pendingBranch && !r.isHydrating && r.effects.push(() => {
      sa(r.activeBranch, t);
    });
  }
  for (; e.component; )
    e = e.component.subTree;
  if (e.shapeFlag & 1 && e.el)
    Rs(e.el, t);
  else if (e.type === Le)
    e.children.forEach((r) => sa(r, t));
  else if (e.type === yr) {
    let { el: r, anchor: n } = e;
    for (; r && (Rs(r, t), r !== n); )
      r = r.nextSibling;
  }
}
function Rs(e, t) {
  if (e.nodeType === 1) {
    const r = e.style;
    let n = "";
    for (const i in t) {
      const s = zu(t[i]);
      r.setProperty(`--${i}`, s), n += `--${i}: ${s};`;
    }
    r[jd] = n;
  }
}
const wy = /(?:^|;)\s*display\s*:/;
function Iy(e, t, r) {
  const n = e.style, i = ae(r);
  let s = !1;
  if (r && !i) {
    if (t)
      if (ae(t))
        for (const o of t.split(";")) {
          const a = o.slice(0, o.indexOf(":")).trim();
          r[a] == null && ci(n, a, "");
        }
      else
        for (const o in t)
          r[o] == null && ci(n, o, "");
    for (const o in r) {
      o === "display" && (s = !0);
      const a = r[o];
      a != null ? Ny(
        e,
        o,
        !ae(t) && t ? t[o] : void 0,
        a
      ) || ci(n, o, a) : ci(n, o, "");
    }
  } else if (i) {
    if (t !== r) {
      const o = n[jd];
      o && (r += ";" + o), n.cssText = r, s = wy.test(r);
    }
  } else t && e.removeAttribute("style");
  As in e && (e[As] = s ? n.display : "", e[Wa] && (n.display = "none"));
}
const kc = /\s*!important$/;
function ci(e, t, r) {
  if (ee(r))
    r.forEach((n) => ci(e, t, n));
  else if (r == null && (r = ""), t.startsWith("--"))
    e.setProperty(t, r);
  else {
    const n = xy(e, t);
    kc.test(r) ? e.setProperty(
      nt(n),
      r.replace(kc, ""),
      "important"
    ) : e[n] = r;
  }
}
const Lc = ["Webkit", "Moz", "ms"], ko = {};
function xy(e, t) {
  const r = ko[t];
  if (r)
    return r;
  let n = Ie(t);
  if (n !== "filter" && n in e)
    return ko[t] = n;
  n = qr(n);
  for (let i = 0; i < Lc.length; i++) {
    const s = Lc[i] + n;
    if (s in e)
      return ko[t] = s;
  }
  return t;
}
function Ny(e, t, r, n) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && ae(n) && r === n;
}
const jc = "http://www.w3.org/1999/xlink";
function Fc(e, t, r, n, i, s = om(t)) {
  n && t.startsWith("xlink:") ? r == null ? e.removeAttributeNS(jc, t.slice(6, t.length)) : e.setAttributeNS(jc, t, r) : r == null || s && !Sa(r) ? e.removeAttribute(t) : e.setAttribute(
    t,
    s ? "" : Je(r) ? String(r) : r
  );
}
function Bc(e, t, r, n, i) {
  if (t === "innerHTML" || t === "textContent") {
    r != null && (e[t] = t === "innerHTML" ? Cd(r) : r);
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
function Jt(e, t, r, n) {
  e.addEventListener(t, r, n);
}
function Ay(e, t, r, n) {
  e.removeEventListener(t, r, n);
}
const Uc = /* @__PURE__ */ Symbol("_vei");
function Ry(e, t, r, n, i = null) {
  const s = e[Uc] || (e[Uc] = {}), o = s[t];
  if (n && o)
    o.value = n;
  else {
    const [a, l] = Py(t);
    if (n) {
      const h = s[t] = ky(
        n,
        i
      );
      Jt(e, a, h, l);
    } else o && (Ay(e, a, o, l), s[t] = void 0);
  }
}
const Cy = /(Once|Passive|Capture)$/, Oy = /^on:?(?:Once|Passive|Capture)$/;
function Py(e) {
  let t, r;
  for (; (r = e.match(Cy)) && !Oy.test(e); )
    t || (t = {}), e = e.slice(0, e.length - r[1].length), t[r[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : nt(e.slice(2)), t];
}
let Lo = 0;
const My = /* @__PURE__ */ Promise.resolve(), Dy = () => Lo || (My.then(() => Lo = 0), Lo = Date.now());
function ky(e, t) {
  const r = (n) => {
    if (!n._vts)
      n._vts = Date.now();
    else if (n._vts <= r.attached)
      return;
    const i = r.value;
    if (ee(i)) {
      const s = n.stopImmediatePropagation;
      n.stopImmediatePropagation = () => {
        s.call(n), n._stopped = !0;
      };
      const o = i.slice(), a = [n];
      for (let l = 0; l < o.length && !n._stopped; l++) {
        const h = o[l];
        h && ht(
          h,
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
  return r.value = e, r.attached = Dy(), r;
}
const $c = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Fd = (e, t, r, n, i, s) => {
  const o = i === "svg";
  t === "class" ? vy(e, n, o) : t === "style" ? Iy(e, r, n) : Qr(t) ? Vs(t) || Ry(e, t, r, n, s) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Ly(e, t, n, o)) ? (Bc(e, t, n), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Fc(e, t, n, o, s, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (jy(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !ae(n))) ? Bc(e, Ie(t), n, s, t) : (t === "true-value" ? e._trueValue = n : t === "false-value" && (e._falseValue = n), Fc(e, t, n, o));
};
function Ly(e, t, r, n) {
  if (n)
    return !!(t === "innerHTML" || t === "textContent" || t in e && $c(t) && oe(r));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const i = e.tagName;
    if (i === "IMG" || i === "VIDEO" || i === "CANVAS" || i === "SOURCE")
      return !1;
  }
  return $c(t) && ae(r) ? !1 : t in e;
}
function jy(e, t) {
  const r = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!r)
    return !1;
  const n = Ie(t);
  return Array.isArray(r) ? r.some((i) => Ie(i) === n) : Object.keys(r).some((i) => Ie(i) === n);
}
const Vc = {};
// @__NO_SIDE_EFFECTS__
function Bd(e, t, r) {
  let n = /* @__PURE__ */ Da(e, t);
  Qs(n) && (n = fe({}, n, t));
  class i extends ao {
    constructor(o) {
      super(n, o, r);
    }
  }
  return i.def = n, i;
}
const Fy = (/* @__NO_SIDE_EFFECTS__ */ (e, t) => /* @__PURE__ */ Bd(e, t, Jd)), By = typeof HTMLElement < "u" ? HTMLElement : class {
};
class ao extends By {
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
    this._connected = !1, Lr(() => {
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
      if (s && !ee(s))
        for (const l in s) {
          const h = s[l];
          (h === Number || h && h.type === Number) && (l in this._props && (this._props[l] = ds(this._props[l])), (a || (a = /* @__PURE__ */ Object.create(null)))[Ie(l)] = !0);
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
          get: () => ji(r[n])
        });
  }
  _resolveProps(t) {
    const { props: r } = t, n = ee(r) ? r : Object.keys(r || {});
    for (const i of Object.keys(this))
      i[0] !== "_" && n.includes(i) && this._setProp(i, this[i]);
    for (const i of n.map(Ie))
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
    let n = r ? this.getAttribute(t) : Vc;
    const i = Ie(t);
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
    if (r !== this._props[t] && (this._dirty = !0, r === Vc ? delete this._props[t] : (this._props[t] = r, t === "key" && this._app && (this._app._ceVNode.key = r)), i && this._instance && this._update(), n)) {
      const s = this._ob;
      s && (this._processMutations(s.takeRecords()), s.disconnect()), r === !0 ? this.setAttribute(nt(t), "") : typeof r == "string" || typeof r == "number" ? this.setAttribute(nt(t), r + "") : r || this.removeAttribute(nt(t)), s && s.observe(this, { attributes: !0 });
    }
  }
  _update() {
    const t = this._createVNode();
    this._app && (t.appContext = this._app._context), Xd(t, this._root);
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
      const h = document.createElement("style");
      i && h.setAttribute("nonce", i), h.textContent = t[l], s.insertBefore(h, a || o), a = h, l === 0 && (n || this._styleAnchors.set(this._def, h), r && this._styleAnchors.set(r, h));
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
            const h = r + "-s", p = document.createTreeWalker(l, 1);
            l.setAttribute(h, "");
            let c;
            for (; c = p.nextNode(); )
              c.setAttribute(h, "");
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
function Ud(e) {
  const t = it(), r = t && t.ce;
  return r || null;
}
function Uy() {
  const e = Ud();
  return e && e.shadowRoot;
}
function $y(e = "$style") {
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
const $d = /* @__PURE__ */ new WeakMap(), Vd = /* @__PURE__ */ new WeakMap(), Cs = /* @__PURE__ */ Symbol("_moveCb"), Qc = /* @__PURE__ */ Symbol("_enterCb"), Vy = (e) => (delete e.props.mode, e), Qy = /* @__PURE__ */ Vy({
  name: "TransitionGroup",
  props: /* @__PURE__ */ fe({}, Md, {
    tag: String,
    moveClass: String
  }),
  setup(e, { slots: t }) {
    const r = it(), n = Pa();
    let i, s;
    return no(() => {
      if (!i.length)
        return;
      const o = e.moveClass || `${e.name || "v"}-move`;
      if (!Gy(
        i[0].el,
        r.vnode.el,
        o
      )) {
        i = [];
        return;
      }
      i.forEach(qy), i.forEach(Ky);
      const a = i.filter(Wy);
      ia(r.vnode.el), a.forEach((l) => {
        const h = l.el, p = h.style;
        Pt(h, o), p.transform = p.webkitTransform = p.transitionDuration = "";
        const c = h[Cs] = (m) => {
          m && m.target !== h || (!m || m.propertyName.endsWith("transform")) && (h.removeEventListener("transitionend", c), h[Cs] = null, hr(h, o));
        };
        h.addEventListener("transitionend", c);
      }), i = [];
    }), () => {
      const o = /* @__PURE__ */ pe(e), a = Dd(o);
      let l = o.tag || Le;
      if (i = [], s)
        for (let h = 0; h < s.length; h++) {
          const p = s[h];
          p.el && p.el instanceof Element && // Hidden v-show nodes have no previous layout box to animate from.
          !p.el[Wa] && (i.push(p), sr(
            p,
            un(
              p,
              a,
              n,
              r
            )
          ), $d.set(p, Qd(p.el)));
        }
      s = t.default ? to(t.default()) : [];
      for (let h = 0; h < s.length; h++) {
        const p = s[h];
        p.key != null && sr(
          p,
          un(p, a, n, r)
        );
      }
      return Ce(l, null, s);
    };
  }
}), Hy = Qy;
function qy(e) {
  const t = e.el;
  t[Cs] && t[Cs](), t[Qc] && t[Qc]();
}
function Ky(e) {
  Vd.set(e, Qd(e.el));
}
function Wy(e) {
  const t = $d.get(e), r = Vd.get(e), n = t.left - r.left, i = t.top - r.top;
  if (n || i) {
    const s = e.el, o = s.style, a = s.getBoundingClientRect();
    let l = 1, h = 1;
    return s.offsetWidth && (l = a.width / s.offsetWidth), s.offsetHeight && (h = a.height / s.offsetHeight), (!Number.isFinite(l) || l === 0) && (l = 1), (!Number.isFinite(h) || h === 0) && (h = 1), Math.abs(l - 1) < 0.01 && (l = 1), Math.abs(h - 1) < 0.01 && (h = 1), o.transform = o.webkitTransform = `translate(${n / l}px,${i / h}px)`, o.transitionDuration = "0s", e;
  }
}
function Qd(e) {
  const t = e.getBoundingClientRect();
  return {
    left: t.left,
    top: t.top
  };
}
function Gy(e, t, r) {
  const n = e.cloneNode(), i = e[fn];
  i && i.forEach((a) => {
    a.split(/\s+/).forEach((l) => l && n.classList.remove(l));
  }), r.split(/\s+/).forEach((a) => a && n.classList.add(a)), n.style.display = "none";
  const s = t.nodeType === 1 ? t : t.parentNode;
  s.appendChild(n);
  const { hasTransform: o } = kd(n);
  return s.removeChild(n), o;
}
const Tr = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return ee(t) ? (r) => rn(t, r) : t;
};
function zy(e) {
  e.target.composing = !0;
}
function Hc(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const Tt = /* @__PURE__ */ Symbol("_assign");
function qc(e, t, r) {
  return t && (e = e.trim()), r && (e = Ks(e)), e;
}
const Os = {
  created(e, { modifiers: { lazy: t, trim: r, number: n } }, i) {
    e[Tt] = Tr(i);
    const s = n || i.props && i.props.type === "number";
    Jt(e, t ? "change" : "input", (o) => {
      o.target.composing || e[Tt](qc(e.value, r, s));
    }), (r || s) && Jt(e, "change", () => {
      e.value = qc(e.value, r, s);
    }), t || (Jt(e, "compositionstart", zy), Jt(e, "compositionend", Hc), Jt(e, "change", Hc));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: r, modifiers: { lazy: n, trim: i, number: s } }, o) {
    if (e[Tt] = Tr(o), e.composing) return;
    const a = (s || e.type === "number") && !/^0\d/.test(e.value) ? Ks(e.value) : e.value, l = t ?? "";
    if (a === l)
      return;
    const h = e.getRootNode();
    (h instanceof Document || h instanceof ShadowRoot) && h.activeElement === e && e.type !== "range" && (n && t === r || i && e.value.trim() === l) || (e.value = l);
  }
}, Ga = {
  // #4096 array checkboxes need to be deep traversed
  deep: !0,
  created(e, t, r) {
    e[Tt] = Tr(r), Jt(e, "change", () => {
      const n = e._modelValue, i = dn(e), s = e.checked, o = e[Tt];
      if (ee(n)) {
        const a = Ws(n, i), l = a !== -1;
        if (s && !l)
          o(n.concat(i));
        else if (!s && l) {
          const h = [...n];
          h.splice(a, 1), o(h);
        }
      } else if (Hr(n)) {
        const a = new Set(n);
        s ? a.add(i) : a.delete(i), o(a);
      } else
        o(qd(e, s));
    });
  },
  // set initial checked on mount to wait for true-value/false-value
  mounted: Kc,
  beforeUpdate(e, t, r) {
    e[Tt] = Tr(r), Kc(e, t, r);
  }
};
function Kc(e, { value: t, oldValue: r }, n) {
  e._modelValue = t;
  let i;
  if (ee(t))
    i = Ws(t, n.props.value) > -1;
  else if (Hr(t))
    i = t.has(n.props.value);
  else {
    if (t === r) return;
    i = ir(t, qd(e, !0));
  }
  e.checked !== i && (e.checked = i);
}
const za = {
  created(e, { value: t }, r) {
    e.checked = ir(t, r.props.value), e[Tt] = Tr(r), Jt(e, "change", () => {
      e[Tt](dn(e));
    });
  },
  beforeUpdate(e, { value: t, oldValue: r }, n) {
    e[Tt] = Tr(n), t !== r && (e.checked = ir(t, n.props.value));
  }
}, Hd = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(e, { value: t, modifiers: { number: r } }, n) {
    const i = Hr(t);
    Jt(e, "change", () => {
      const s = Array.prototype.filter.call(e.options, (o) => o.selected).map(
        (o) => r ? Ks(dn(o)) : dn(o)
      );
      e[Tt](
        e.multiple ? i ? new Set(s) : s : s[0]
      ), e._assigning = !0, Lr(() => {
        e._assigning = !1;
      });
    }), e[Tt] = Tr(n);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(e, { value: t }) {
    Wc(e, t);
  },
  beforeUpdate(e, t, r) {
    e[Tt] = Tr(r);
  },
  updated(e, { value: t }) {
    e._assigning || Wc(e, t);
  }
};
function Wc(e, t) {
  const r = e.multiple, n = ee(t);
  if (!(r && !n && !Hr(t))) {
    for (let i = 0, s = e.options.length; i < s; i++) {
      const o = e.options[i], a = dn(o);
      if (r)
        if (n) {
          const l = typeof a;
          l === "string" || l === "number" ? o.selected = t.some((h) => String(h) === String(a)) : o.selected = Ws(t, a) > -1;
        } else
          o.selected = t.has(a);
      else if (ir(dn(o), t)) {
        e.selectedIndex !== i && (e.selectedIndex = i);
        return;
      }
    }
    !r && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function dn(e) {
  return "_value" in e ? e._value : e.value;
}
function qd(e, t) {
  const r = t ? "_trueValue" : "_falseValue";
  return r in e ? e[r] : t;
}
const Kd = {
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
function Wd(e, t) {
  switch (e) {
    case "SELECT":
      return Hd;
    case "TEXTAREA":
      return Os;
    default:
      switch (t) {
        case "checkbox":
          return Ga;
        case "radio":
          return za;
        default:
          return Os;
      }
  }
}
function ns(e, t, r, n, i) {
  const o = Wd(
    e.tagName,
    r.props && r.props.type
  )[i];
  o && o(e, t, r, n);
}
function Yy() {
  Os.getSSRProps = ({ value: e }) => ({ value: e }), za.getSSRProps = ({ value: e }, t) => {
    if (t.props && ir(t.props.value, e))
      return { checked: !0 };
  }, Ga.getSSRProps = ({ value: e }, t) => {
    if (ee(e)) {
      if (t.props && Ws(e, t.props.value) > -1)
        return { checked: !0 };
    } else if (Hr(e)) {
      if (t.props && e.has(t.props.value))
        return { checked: !0 };
    } else if (e)
      return { checked: !0 };
  }, Kd.getSSRProps = (e, t) => {
    if (typeof t.type != "string")
      return;
    const r = Wd(
      // resolveDynamicModel expects an uppercase tag name, but vnode.type is lowercase
      t.type.toUpperCase(),
      t.props && t.props.type
    );
    if (r.getSSRProps)
      return r.getSSRProps(e, t);
  };
}
const Xy = ["ctrl", "shift", "alt", "meta"], Jy = {
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
  exact: (e, t) => Xy.some((r) => e[`${r}Key`] && !t.includes(r))
}, Zy = (e, t) => {
  if (!e) return e;
  const r = e._withMods || (e._withMods = {}), n = t.join(".");
  return r[n] || (r[n] = ((i, ...s) => {
    for (let o = 0; o < t.length; o++) {
      const a = Jy[t[o]];
      if (a && a(i, t)) return;
    }
    return e(i, ...s);
  }));
}, e0 = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, t0 = (e, t) => {
  const r = e._withKeys || (e._withKeys = {}), n = t.join(".");
  return r[n] || (r[n] = ((i) => {
    if (!("key" in i))
      return;
    const s = nt(i.key);
    if (t.some(
      (o) => o === s || e0[o] === s
    ))
      return e(i);
  }));
}, Gd = /* @__PURE__ */ fe({ patchProp: Fd }, Od);
let gi, Gc = !1;
function zd() {
  return gi || (gi = ad(Gd));
}
function Yd() {
  return gi = Gc ? gi : ld(Gd), Gc = !0, gi;
}
const Xd = ((...e) => {
  zd().render(...e);
}), r0 = ((...e) => {
  Yd().hydrate(...e);
}), Ps = ((...e) => {
  const t = zd().createApp(...e), { mount: r } = t;
  return t.mount = (n) => {
    const i = eh(n);
    if (!i) return;
    const s = t._component;
    !oe(s) && !s.render && !s.template && (s.template = i.innerHTML), i.nodeType === 1 && (i.textContent = "");
    const o = r(i, !1, Zd(i));
    return i instanceof Element && (i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")), o;
  }, t;
}), Jd = ((...e) => {
  const t = Yd().createApp(...e), { mount: r } = t;
  return t.mount = (n) => {
    const i = eh(n);
    if (i)
      return r(i, !0, Zd(i));
  }, t;
});
function Zd(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function eh(e) {
  return ae(e) ? document.querySelector(e) : e;
}
let zc = !1;
const n0 = () => {
  zc || (zc = !0, Yy(), Sy());
}, i0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BaseTransition: Df,
  BaseTransitionPropsValidators: Ma,
  Comment: Pe,
  DeprecationTypes: py,
  EffectScope: Ea,
  ErrorCodes: ig,
  ErrorTypeStrings: ay,
  Fragment: Le,
  KeepAlive: Wg,
  ReactiveEffect: yi,
  Static: yr,
  Suspense: U_,
  Teleport: wg,
  Text: rr,
  TrackOpTypes: Wm,
  Transition: yy,
  TransitionGroup: Hy,
  TriggerOpTypes: Gm,
  VueElement: ao,
  assertNumber: ng,
  callWithAsyncErrorHandling: ht,
  callWithErrorHandling: Kr,
  camelize: Ie,
  capitalize: qr,
  cloneVNode: jt,
  compatUtils: hy,
  computed: Wt,
  createApp: Ps,
  createBlock: Es,
  createCommentVNode: bd,
  createElementBlock: K_,
  createElementVNode: qa,
  createHydrationRenderer: ld,
  createPropsRestProxy: m_,
  createRenderer: ad,
  createSSRApp: Jd,
  createSlots: e_,
  createStaticVNode: z_,
  createTextVNode: Ka,
  createVNode: Ce,
  customRef: _f,
  defineAsyncComponent: qg,
  defineComponent: Da,
  defineCustomElement: Bd,
  defineEmits: s_,
  defineExpose: o_,
  defineModel: c_,
  defineOptions: a_,
  defineProps: i_,
  defineSSRCustomElement: Fy,
  defineSlots: l_,
  devtools: ly,
  effect: gm,
  effectScope: hm,
  getCurrentInstance: it,
  getCurrentScope: Yu,
  getCurrentWatcher: zm,
  getTransitionRawChildren: to,
  guardReactiveProps: yd,
  h: Ad,
  handleError: Wr,
  hasInjectionContext: _g,
  hydrate: r0,
  hydrateOnIdle: Bg,
  hydrateOnInteraction: Qg,
  hydrateOnMediaQuery: Vg,
  hydrateOnVisible: $g,
  initCustomFormatter: iy,
  initDirectivesForSSR: n0,
  inject: di,
  isMemoSame: Rd,
  isProxy: Li,
  isReactive: er,
  isReadonly: Lt,
  isRef: De,
  isRuntimeOnly: Z_,
  isShallow: ct,
  isVNode: or,
  markRaw: pf,
  mergeDefaults: h_,
  mergeModels: p_,
  mergeProps: Td,
  nextTick: Lr,
  nodeOps: Od,
  normalizeClass: Tn,
  normalizeProps: Xp,
  normalizeStyle: bn,
  onActivated: Ff,
  onBeforeMount: $f,
  onBeforeUnmount: io,
  onBeforeUpdate: ja,
  onDeactivated: Bf,
  onErrorCaptured: qf,
  onMounted: vn,
  onRenderTracked: Hf,
  onRenderTriggered: Qf,
  onScopeDispose: pm,
  onServerPrefetch: Vf,
  onUnmounted: Sn,
  onUpdated: no,
  onWatcherCleanup: bf,
  openBlock: xi,
  patchProp: Fd,
  popScopeId: pg,
  provide: If,
  proxyRefs: Na,
  pushScopeId: hg,
  queuePostFlushCb: vi,
  reactive: Xs,
  readonly: ps,
  ref: Ee,
  registerRuntimeCompiler: wd,
  render: Xd,
  renderList: Zg,
  renderSlot: t_,
  resolveComponent: Yg,
  resolveDirective: Jg,
  resolveDynamicComponent: Xg,
  resolveFilter: dy,
  resolveTransitionHooks: un,
  setBlockTracking: Ni,
  setDevtoolsHook: cy,
  setTransitionHooks: sr,
  shallowReactive: hf,
  shallowReadonly: km,
  shallowRef: mf,
  ssrContextKey: xf,
  ssrUtils: fy,
  stop: _m,
  toDisplayString: Wu,
  toHandlerKey: tn,
  toHandlers: r_,
  toRaw: pe,
  toRef: Hm,
  toRefs: $m,
  toValue: Fm,
  transformVNodeArgs: W_,
  triggerRef: jm,
  unref: ji,
  useAttrs: d_,
  useCssModule: $y,
  useCssVars: Ey,
  useHost: Ud,
  useId: xg,
  useModel: w_,
  useSSRContext: Nf,
  useShadowRoot: Uy,
  useSlots: f_,
  useTemplateRef: Ng,
  useTransitionState: Pa,
  vModelCheckbox: Ga,
  vModelDynamic: Kd,
  vModelRadio: za,
  vModelSelect: Hd,
  vModelText: Os,
  vShow: Ld,
  version: ra,
  warn: oy,
  watch: _r,
  watchEffect: yg,
  watchPostEffect: bg,
  watchSyncEffect: Af,
  withAsyncContext: g_,
  withCtx: Oa,
  withDefaults: u_,
  withDirectives: gg,
  withKeys: t0,
  withMemo: sy,
  withModifiers: Zy,
  withScopeId: mg
}, Symbol.toStringTag, { value: "Module" }));
/**
* @vue/compiler-core v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const Ri = /* @__PURE__ */ Symbol(""), _i = /* @__PURE__ */ Symbol(""), Ya = /* @__PURE__ */ Symbol(""), Ms = /* @__PURE__ */ Symbol(""), th = /* @__PURE__ */ Symbol(
  ""
), Vr = /* @__PURE__ */ Symbol(""), rh = /* @__PURE__ */ Symbol(""), nh = /* @__PURE__ */ Symbol(
  ""
), Xa = /* @__PURE__ */ Symbol(""), Ja = /* @__PURE__ */ Symbol(
  ""
), $i = /* @__PURE__ */ Symbol(
  ""
), Za = /* @__PURE__ */ Symbol(
  ""
), ih = /* @__PURE__ */ Symbol(
  ""
), el = /* @__PURE__ */ Symbol(
  ""
), tl = /* @__PURE__ */ Symbol(
  ""
), rl = /* @__PURE__ */ Symbol(
  ""
), nl = /* @__PURE__ */ Symbol(
  ""
), il = /* @__PURE__ */ Symbol(
  ""
), sl = /* @__PURE__ */ Symbol(""), sh = /* @__PURE__ */ Symbol(""), oh = /* @__PURE__ */ Symbol(""), lo = /* @__PURE__ */ Symbol(
  ""
), Ds = /* @__PURE__ */ Symbol(""), ol = /* @__PURE__ */ Symbol(
  ""
), al = /* @__PURE__ */ Symbol(
  ""
), Ci = /* @__PURE__ */ Symbol(
  ""
), Vi = /* @__PURE__ */ Symbol(
  ""
), ll = /* @__PURE__ */ Symbol(""), oa = /* @__PURE__ */ Symbol(""), s0 = /* @__PURE__ */ Symbol(""), aa = /* @__PURE__ */ Symbol(
  ""
), ks = /* @__PURE__ */ Symbol(
  ""
), o0 = /* @__PURE__ */ Symbol(""), a0 = /* @__PURE__ */ Symbol(""), cl = /* @__PURE__ */ Symbol(""), l0 = /* @__PURE__ */ Symbol(""), c0 = /* @__PURE__ */ Symbol(""), ul = /* @__PURE__ */ Symbol(""), ah = /* @__PURE__ */ Symbol(""), hn = {
  [Ri]: "Fragment",
  [_i]: "Teleport",
  [Ya]: "Suspense",
  [Ms]: "KeepAlive",
  [th]: "BaseTransition",
  [Vr]: "openBlock",
  [rh]: "createBlock",
  [nh]: "createElementBlock",
  [Xa]: "createVNode",
  [Ja]: "createElementVNode",
  [$i]: "createCommentVNode",
  [Za]: "createTextVNode",
  [ih]: "createStaticVNode",
  [el]: "resolveComponent",
  [tl]: "resolveDynamicComponent",
  [rl]: "resolveDirective",
  [nl]: "resolveFilter",
  [il]: "withDirectives",
  [sl]: "renderList",
  [sh]: "renderSlot",
  [oh]: "createSlots",
  [lo]: "toDisplayString",
  [Ds]: "mergeProps",
  [ol]: "normalizeClass",
  [al]: "normalizeStyle",
  [Ci]: "normalizeProps",
  [Vi]: "guardReactiveProps",
  [ll]: "toHandlers",
  [oa]: "camelize",
  [s0]: "capitalize",
  [aa]: "toHandlerKey",
  [ks]: "setBlockTracking",
  [o0]: "pushScopeId",
  [a0]: "popScopeId",
  [cl]: "withCtx",
  [l0]: "unref",
  [c0]: "isRef",
  [ul]: "withMemo",
  [ah]: "isMemoSame"
};
function u0(e) {
  Object.getOwnPropertySymbols(e).forEach((t) => {
    hn[t] = e[t];
  });
}
const pt = {
  start: { line: 1, column: 1, offset: 0 },
  end: { line: 1, column: 1, offset: 0 },
  source: ""
};
function f0(e, t = "") {
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
function Oi(e, t, r, n, i, s, o, a = !1, l = !1, h = !1, p = pt) {
  return e && (a ? (e.helper(Vr), e.helper(gn(e.inSSR, h))) : e.helper(mn(e.inSSR, h)), o && e.helper(il)), {
    type: 13,
    tag: t,
    props: r,
    children: n,
    patchFlag: i,
    dynamicProps: s,
    directives: o,
    isBlock: a,
    disableTracking: l,
    isComponent: h,
    loc: p
  };
}
function Fr(e, t = pt) {
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
function je(e, t) {
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
function pn(e, t = void 0, r = !1, n = !1, i = pt) {
  return {
    type: 18,
    params: e,
    returns: t,
    newline: r,
    isSlot: n,
    loc: i
  };
}
function la(e, t, r, n = !0) {
  return {
    type: 19,
    test: e,
    consequent: t,
    alternate: r,
    newline: n,
    loc: pt
  };
}
function d0(e, t, r = !1, n = !1) {
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
function h0(e) {
  return {
    type: 21,
    body: e,
    loc: pt
  };
}
function mn(e, t) {
  return e || t ? Xa : Ja;
}
function gn(e, t) {
  return e || t ? rh : nh;
}
function fl(e, { helper: t, removeHelper: r, inSSR: n }) {
  e.isBlock || (e.isBlock = !0, r(mn(n, e.isComponent)), t(Vr), t(gn(n, e.isComponent)));
}
const Yc = new Uint8Array([123, 123]), Xc = new Uint8Array([125, 125]);
function Jc(e) {
  return e >= 97 && e <= 122 || e >= 65 && e <= 90;
}
function ft(e) {
  return e === 32 || e === 10 || e === 9 || e === 12 || e === 13;
}
function ur(e) {
  return e === 47 || e === 62 || ft(e);
}
function Ls(e) {
  const t = new Uint8Array(e.length);
  for (let r = 0; r < e.length; r++)
    t[r] = e.charCodeAt(r);
  return t;
}
const We = {
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
class p0 {
  constructor(t, r) {
    this.stack = t, this.cbs = r, this.state = 1, this.buffer = "", this.sectionStart = 0, this.index = 0, this.entityStart = 0, this.baseState = 1, this.inRCDATA = !1, this.inXML = !1, this.inVPre = !1, this.newlines = [], this.mode = 0, this.delimiterOpen = Yc, this.delimiterClose = Xc, this.delimiterIndex = -1, this.currentSequence = void 0, this.sequenceIndex = 0;
  }
  get inSFCRoot() {
    return this.mode === 2 && this.stack.length === 0;
  }
  reset() {
    this.state = 1, this.mode = 0, this.buffer = "", this.sectionStart = 0, this.index = 0, this.baseState = 1, this.inRCDATA = !1, this.currentSequence = void 0, this.newlines.length = 0, this.delimiterOpen = Yc, this.delimiterClose = Xc;
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
      ur(t)
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
    (t | 32) === this.currentSequence[this.sequenceIndex] ? this.sequenceIndex += 1 : this.sequenceIndex === 0 ? this.currentSequence === We.TitleEnd || this.currentSequence === We.TextareaEnd && !this.inSFCRoot ? !this.inVPre && t === this.delimiterOpen[0] && (this.state = 2, this.delimiterIndex = 0, this.stateInterpolationOpen(t)) : this.fastForwardTo(60) && (this.sequenceIndex = 1) : this.sequenceIndex = +(t === 60);
  }
  stateCDATASequence(t) {
    t === We.Cdata[this.sequenceIndex] ? ++this.sequenceIndex === We.Cdata.length && (this.state = 28, this.currentSequence = We.CdataEnd, this.sequenceIndex = 0, this.sectionStart = this.index + 1) : (this.sequenceIndex = 0, this.state = 23, this.stateInDeclaration(t));
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
    t === this.currentSequence[this.sequenceIndex] ? ++this.sequenceIndex === this.currentSequence.length && (this.currentSequence === We.CdataEnd ? this.cbs.oncdata(this.sectionStart, this.index - 2) : this.cbs.oncomment(this.sectionStart, this.index - 2), this.sequenceIndex = 0, this.sectionStart = this.index + 1, this.state = 1) : this.sequenceIndex === 0 ? this.fastForwardTo(this.currentSequence[0]) && (this.sequenceIndex = 1) : t !== this.currentSequence[this.sequenceIndex - 1] && (this.sequenceIndex = 0);
  }
  startSpecial(t, r) {
    this.enterRCDATA(t, r), this.state = 31;
  }
  enterRCDATA(t, r) {
    this.inRCDATA = !0, this.currentSequence = t, this.sequenceIndex = r;
  }
  stateBeforeTagName(t) {
    t === 33 ? (this.state = 22, this.sectionStart = this.index + 1) : t === 63 ? (this.state = 24, this.sectionStart = this.index + 1) : Jc(t) ? (this.sectionStart = this.index, this.mode === 0 ? this.state = 6 : this.inSFCRoot ? this.state = 34 : this.inXML ? this.state = 6 : t === 116 ? this.state = 30 : this.state = t === 115 ? 29 : 6) : t === 47 ? this.state = 8 : (this.state = 1, this.stateText(t));
  }
  stateInTagName(t) {
    ur(t) && this.handleTagName(t);
  }
  stateInSFCRootTagName(t) {
    if (ur(t)) {
      const r = this.buffer.slice(this.sectionStart, this.index);
      r !== "template" && this.enterRCDATA(Ls("</" + r), 0), this.handleTagName(t);
    }
  }
  handleTagName(t) {
    this.cbs.onopentagname(this.sectionStart, this.index), this.sectionStart = -1, this.state = 11, this.stateBeforeAttrName(t);
  }
  stateBeforeClosingTagName(t) {
    ft(t) || (t === 62 ? (this.state = 1, this.sectionStart = this.index + 1) : (this.state = Jc(t) ? 9 : 27, this.sectionStart = this.index));
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
    (t === 61 || ur(t)) && (this.cbs.onattribname(this.sectionStart, this.index), this.handleAttrNameEnd(t));
  }
  stateInDirName(t) {
    t === 61 || ur(t) ? (this.cbs.ondirname(this.sectionStart, this.index), this.handleAttrNameEnd(t)) : t === 58 ? (this.cbs.ondirname(this.sectionStart, this.index), this.state = 14, this.sectionStart = this.index + 1) : t === 46 && (this.cbs.ondirname(this.sectionStart, this.index), this.state = 16, this.sectionStart = this.index + 1);
  }
  stateInDirArg(t) {
    t === 61 || ur(t) ? (this.cbs.ondirarg(this.sectionStart, this.index), this.handleAttrNameEnd(t)) : t === 91 ? this.state = 15 : t === 46 && (this.cbs.ondirarg(this.sectionStart, this.index), this.state = 16, this.sectionStart = this.index + 1);
  }
  stateInDynamicDirArg(t) {
    t === 93 ? this.state = 14 : (t === 61 || ur(t)) && (this.cbs.ondirarg(this.sectionStart, this.index + 1), this.handleAttrNameEnd(t));
  }
  stateInDirModifier(t) {
    t === 61 || ur(t) ? (this.cbs.ondirmodifier(this.sectionStart, this.index), this.handleAttrNameEnd(t)) : t === 46 && (this.cbs.ondirmodifier(this.sectionStart, this.index), this.sectionStart = this.index + 1);
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
    t === 45 ? (this.state = 28, this.currentSequence = We.CommentEnd, this.sequenceIndex = 2, this.sectionStart = this.index + 1) : this.state = 23;
  }
  stateInSpecialComment(t) {
    (t === 62 || this.fastForwardTo(62)) && (this.cbs.oncomment(this.sectionStart, this.index), this.state = 1, this.sectionStart = this.index + 1);
  }
  stateBeforeSpecialS(t) {
    t === We.ScriptEnd[3] ? this.startSpecial(We.ScriptEnd, 4) : t === We.StyleEnd[3] ? this.startSpecial(We.StyleEnd, 4) : (this.state = 6, this.stateInTagName(t));
  }
  stateBeforeSpecialT(t) {
    t === We.TitleEnd[3] ? this.startSpecial(We.TitleEnd, 4) : t === We.TextareaEnd[3] ? this.startSpecial(We.TextareaEnd, 4) : (this.state = 6, this.stateInTagName(t));
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
    this.sectionStart >= t || (this.state === 28 ? this.currentSequence === We.CdataEnd ? this.cbs.oncdata(this.sectionStart, t) : this.cbs.oncomment(this.sectionStart, t) : this.state === 6 || this.state === 11 || this.state === 18 || this.state === 17 || this.state === 12 || this.state === 13 || this.state === 14 || this.state === 15 || this.state === 16 || this.state === 20 || this.state === 19 || this.state === 21 || this.state === 9 || this.cbs.ontext(this.sectionStart, t));
  }
  emitCodePoint(t, r) {
  }
}
function Zc(e, { compatConfig: t }) {
  const r = t && t[e];
  return e === "MODE" ? r || 3 : r;
}
function Br(e, t) {
  const r = Zc("MODE", t), n = Zc(e, t);
  return r === 3 ? n === !0 : n !== !1;
}
function Pi(e, t, r, ...n) {
  return Br(e, t);
}
function dl(e) {
  throw e;
}
function lh(e) {
}
function Re(e, t, r, n) {
  const i = `https://vuejs.org/error-reference/#compiler-${e}`, s = new SyntaxError(String(i));
  return s.code = e, s.loc = t, s;
}
const lt = (e) => e.type === 4 && e.isStatic;
function ch(e) {
  switch (e) {
    case "Teleport":
    case "teleport":
      return _i;
    case "Suspense":
    case "suspense":
      return Ya;
    case "KeepAlive":
    case "keep-alive":
      return Ms;
    case "BaseTransition":
    case "base-transition":
      return th;
  }
}
const m0 = /^$|^\d|[^\$\w\xA0-\uFFFF]/, hl = (e) => !m0.test(e), uh = /[A-Za-z_$\xA0-\uFFFF]/, g0 = /[\.\?\w$\xA0-\uFFFF]/, _0 = /\s+[.[]\s*|\s*[.[]\s+/g, fh = (e) => e.type === 4 ? e.content : e.loc.source, y0 = (e) => {
  const t = fh(e).trim().replace(_0, (a) => a.trim());
  let r = 0, n = [], i = 0, s = 0, o = null;
  for (let a = 0; a < t.length; a++) {
    const l = t.charAt(a);
    switch (r) {
      case 0:
        if (l === "[")
          n.push(r), r = 1, i++;
        else if (l === "(")
          n.push(r), r = 2, s++;
        else if (!(a === 0 ? uh : g0).test(l))
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
}, dh = y0, b0 = /^\s*(?:async\s*)?(?:\([^)]*?\)|[\w$_]+)\s*(?::[^=]+)?=>|^\s*(?:async\s+)?function(?:\s+[\w$]+)?\s*\(/, T0 = (e) => b0.test(fh(e)), v0 = T0;
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
    } else if (s.name === "bind" && (s.exp || n) && Or(s.arg, t))
      return s;
  }
}
function Or(e, t) {
  return !!(e && lt(e) && e.content === t);
}
function S0(e) {
  return e.props.some(
    (t) => t.type === 7 && t.name === "bind" && (!t.arg || // v-bind="obj"
    t.arg.type !== 4 || // v-bind:[_ctx.foo]
    !t.arg.isStatic)
    // v-bind:[foo]
  );
}
function jo(e) {
  return e.type === 5 || e.type === 2;
}
function eu(e) {
  return e.type === 7 && e.name === "pre";
}
function E0(e) {
  return e.type === 7 && e.name === "slot";
}
function js(e) {
  return e.type === 1 && e.tagType === 3;
}
function Fs(e) {
  return e.type === 1 && e.tagType === 2;
}
const w0 = /* @__PURE__ */ new Set([Ci, Vi]);
function hh(e, t = []) {
  if (e && !ae(e) && e.type === 14) {
    const r = e.callee;
    if (!ae(r) && w0.has(r))
      return hh(
        e.arguments[0],
        t.concat(e)
      );
  }
  return [e, t];
}
function Bs(e, t, r) {
  let n, i = e.type === 13 ? e.props : e.arguments[2], s = [], o;
  if (i && !ae(i) && i.type === 14) {
    const a = hh(i);
    i = a[0], s = a[1], o = s[s.length - 1];
  }
  if (i == null || ae(i))
    n = bt([t]);
  else if (i.type === 14) {
    const a = i.arguments[0];
    !ae(a) && a.type === 15 ? tu(t, a) || a.properties.unshift(t) : i.callee === ll ? n = Ue(r.helper(Ds), [
      bt([t]),
      i
    ]) : i.arguments.unshift(bt([t])), !n && (n = i);
  } else i.type === 15 ? (tu(t, i) || i.properties.unshift(t), n = i) : (n = Ue(r.helper(Ds), [
    bt([t]),
    i
  ]), o && o.callee === Vi && (o = s[s.length - 2]));
  e.type === 13 ? o ? o.arguments[0] = n : e.props = n : o ? o.arguments[0] = n : e.arguments[2] = n;
}
function tu(e, t) {
  let r = !1;
  if (e.key.type === 4) {
    const n = e.key.content;
    r = t.properties.some(
      (i) => i.key.type === 4 && i.key.content === n
    );
  }
  return r;
}
function Mi(e, t) {
  return `_${t}_${e.replace(/[^\w]/g, (r, n) => r === "-" ? "_" : e.charCodeAt(n).toString())}`;
}
function I0(e) {
  return e.type === 14 && e.callee === ul ? e.arguments[1].returns : e;
}
const x0 = /([\s\S]*?)\s+(?:in|of)\s+(\S[\s\S]*)/;
function ph(e) {
  for (let t = 0; t < e.length; t++)
    if (!ft(e.charCodeAt(t)))
      return !1;
  return !0;
}
function pl(e) {
  return e.type === 2 && ph(e.content) || e.type === 12 && pl(e.content);
}
function mh(e) {
  return e.type === 3 || pl(e);
}
const gh = {
  parseMode: "base",
  ns: 0,
  delimiters: ["{{", "}}"],
  getNamespace: () => 0,
  isVoidTag: Jr,
  isPreTag: Jr,
  isIgnoreNewlineTag: Jr,
  isCustomElement: Jr,
  onError: dl,
  onWarn: lh,
  comments: !1,
  prefixIdentifiers: !1
};
let ye = gh, Di = null, nr = "", Ge = null, he = null, st = "", Kt = -1, Ar = -1, ml = 0, gr = !1, ca = null;
const Ae = [], Oe = new p0(Ae, {
  onerr: Qt,
  ontext(e, t) {
    is(He(e, t), e, t);
  },
  ontextentity(e, t, r) {
    is(e, t, r);
  },
  oninterpolation(e, t) {
    if (gr)
      return is(He(e, t), e, t);
    let r = e + Oe.delimiterOpen.length, n = t - Oe.delimiterClose.length;
    for (; ft(nr.charCodeAt(r)); )
      r++;
    for (; ft(nr.charCodeAt(n - 1)); )
      n--;
    let i = He(r, n);
    i.includes("&") && (i = ye.decodeEntities(i, !1)), ua({
      type: 5,
      content: cs(i, !1, Me(r, n)),
      loc: Me(e, t)
    });
  },
  onopentagname(e, t) {
    const r = He(e, t);
    Ge = {
      type: 1,
      tag: r,
      ns: ye.getNamespace(r, Ae[0], ye.ns),
      tagType: 0,
      // will be refined on tag close
      props: [],
      children: [],
      loc: Me(e - 1, t),
      codegenNode: void 0
    };
  },
  onopentagend(e) {
    nu(e);
  },
  onclosetag(e, t) {
    const r = He(e, t);
    if (!ye.isVoidTag(r)) {
      let n = !1;
      for (let i = 0; i < Ae.length; i++)
        if (Ae[i].tag.toLowerCase() === r.toLowerCase()) {
          n = !0, i > 0 && Qt(24, Ae[0].loc.start.offset);
          for (let o = 0; o <= i; o++) {
            const a = Ae.shift();
            ls(a, t, o < i);
          }
          break;
        }
      n || Qt(23, _h(e, 60));
    }
  },
  onselfclosingtag(e) {
    const t = Ge.tag;
    Ge.isSelfClosing = !0, nu(e), Ae[0] && Ae[0].tag === t && ls(Ae.shift(), e);
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
    if (!gr && n === "" && Qt(26, e), gr || n === "")
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
      gr = Oe.inVPre = !0, ca = Ge;
      const i = Ge.props;
      for (let s = 0; s < i.length; s++)
        i[s].type === 7 && (i[s] = L0(i[s]));
    }
  },
  ondirarg(e, t) {
    if (e === t) return;
    const r = He(e, t);
    if (gr && !eu(he))
      he.name += r, Pr(he.nameLoc, t);
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
    if (gr && !eu(he))
      he.name += "." + r, Pr(he.nameLoc, t);
    else if (he.name === "slot") {
      const n = he.arg;
      n && (n.content += "." + r, Pr(n.loc, t));
    } else {
      const n = ce(r, !0, Me(e, t));
      he.modifiers.push(n);
    }
  },
  onattribdata(e, t) {
    st += He(e, t), Kt < 0 && (Kt = e), Ar = t;
  },
  onattribentity(e, t, r) {
    st += e, Kt < 0 && (Kt = t), Ar = r;
  },
  onattribnameend(e) {
    const t = he.loc.start.offset, r = He(t, e);
    he.type === 7 && (he.rawName = r), Ge.props.some(
      (n) => (n.type === 7 ? n.rawName : n.name) === r
    ) && Qt(2, t);
  },
  onattribend(e, t) {
    if (Ge && he) {
      if (Pr(he.loc, t), e !== 0)
        if (st.includes("&") && (st = ye.decodeEntities(
          st,
          !0
        )), he.type === 6)
          he.name === "class" && (st = bh(st).trim()), e === 1 && !st && Qt(13, t), he.value = {
            type: 2,
            content: st,
            loc: e === 1 ? Me(Kt, Ar) : Me(Kt - 1, Ar + 1)
          }, Oe.inSFCRoot && Ge.tag === "template" && he.name === "lang" && st && st !== "html" && Oe.enterRCDATA(Ls("</template"), 0);
        else {
          let r = 0;
          he.exp = cs(
            st,
            !1,
            Me(Kt, Ar),
            0,
            r
          ), he.name === "for" && (he.forParseResult = A0(he.exp));
          let n = -1;
          he.name === "bind" && (n = he.modifiers.findIndex(
            (i) => i.content === "sync"
          )) > -1 && Pi(
            "COMPILER_V_BIND_SYNC",
            ye,
            he.loc,
            he.arg.loc.source
          ) && (he.name = "model", he.modifiers.splice(n, 1));
        }
      (he.type !== 7 || he.name !== "pre") && Ge.props.push(he);
    }
    st = "", Kt = Ar = -1;
  },
  oncomment(e, t) {
    ye.comments && ua({
      type: 3,
      content: He(e, t),
      loc: Me(e - 4, t + 3)
    });
  },
  onend() {
    const e = nr.length;
    for (let t = 0; t < Ae.length; t++)
      ls(Ae[t], e - 1), Qt(24, Ae[t].loc.start.offset);
  },
  oncdata(e, t) {
    (Ae[0] ? Ae[0].ns : ye.ns) !== 0 ? is(He(e, t), e, t) : Qt(1, e - 9);
  },
  onprocessinginstruction(e) {
    (Ae[0] ? Ae[0].ns : ye.ns) === 0 && Qt(
      21,
      e - 1
    );
  }
}), ru = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/, N0 = /^\(|\)$/g;
function A0(e) {
  const t = e.loc, r = e.content, n = r.match(x0);
  if (!n) return;
  const [, i, s] = n, o = (c, m, _ = !1) => {
    const v = t.start.offset + m, I = v + c.length;
    return cs(
      c,
      !1,
      Me(v, I),
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
  let l = i.trim().replace(N0, "").trim();
  const h = i.indexOf(l), p = l.match(ru);
  if (p) {
    l = l.replace(ru, "").trim();
    const c = p[1].trim();
    let m;
    if (c && (m = r.indexOf(c, h + l.length), a.key = o(c, m, !0)), p[2]) {
      const _ = p[2].trim();
      _ && (a.index = o(
        _,
        r.indexOf(
          _,
          a.key ? m + c.length : h + l.length
        ),
        !0
      ));
    }
  }
  return l && (a.value = o(l, h, !0)), a;
}
function He(e, t) {
  return nr.slice(e, t);
}
function nu(e) {
  Oe.inSFCRoot && (Ge.innerLoc = Me(e + 1, e + 1)), ua(Ge);
  const { tag: t, ns: r } = Ge;
  r === 0 && ye.isPreTag(t) && ml++, ye.isVoidTag(t) ? ls(Ge, e) : (Ae.unshift(Ge), (r === 1 || r === 2) && (Oe.inXML = !0)), Ge = null;
}
function is(e, t, r) {
  {
    const s = Ae[0] && Ae[0].tag;
    s !== "script" && s !== "style" && e.includes("&") && (e = ye.decodeEntities(e, !1));
  }
  const n = Ae[0] || Di, i = n.children[n.children.length - 1];
  i && i.type === 2 ? (i.content += e, Pr(i.loc, r)) : n.children.push({
    type: 2,
    content: e,
    loc: Me(t, r)
  });
}
function ls(e, t, r = !1) {
  r ? Pr(e.loc, _h(t, 60)) : Pr(e.loc, R0(t, 62) + 1), Oe.inSFCRoot && (e.children.length ? e.innerLoc.end = fe({}, e.children[e.children.length - 1].loc.end) : e.innerLoc.end = fe({}, e.innerLoc.start), e.innerLoc.source = He(
    e.innerLoc.start.offset,
    e.innerLoc.end.offset
  ));
  const { tag: n, ns: i, children: s } = e;
  if (gr || (n === "slot" ? e.tagType = 2 : iu(e) ? e.tagType = 3 : O0(e) && (e.tagType = 1)), Oe.inRCDATA || (e.children = yh(s)), i === 0 && ye.isIgnoreNewlineTag(n)) {
    const o = s[0];
    o && o.type === 2 && (o.content = o.content.replace(/^\r?\n/, ""));
  }
  i === 0 && ye.isPreTag(n) && ml--, ca === e && (gr = Oe.inVPre = !1, ca = null), Oe.inXML && (Ae[0] ? Ae[0].ns : ye.ns) === 0 && (Oe.inXML = !1);
  {
    const o = e.props;
    if (!Oe.inSFCRoot && Br(
      "COMPILER_NATIVE_TEMPLATE",
      ye
    ) && e.tag === "template" && !iu(e)) {
      const l = Ae[0] || Di, h = l.children.indexOf(e);
      l.children.splice(h, 1, ...e.children);
    }
    const a = o.find(
      (l) => l.type === 6 && l.name === "inline-template"
    );
    a && Pi(
      "COMPILER_INLINE_TEMPLATE",
      ye,
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
function R0(e, t) {
  let r = e;
  for (; nr.charCodeAt(r) !== t && r < nr.length - 1; ) r++;
  return r;
}
function _h(e, t) {
  let r = e;
  for (; nr.charCodeAt(r) !== t && r >= 0; ) r--;
  return r;
}
const C0 = /* @__PURE__ */ new Set(["if", "else", "else-if", "for", "slot"]);
function iu({ tag: e, props: t }) {
  if (e === "template") {
    for (let r = 0; r < t.length; r++)
      if (t[r].type === 7 && C0.has(t[r].name))
        return !0;
  }
  return !1;
}
function O0({ tag: e, props: t }) {
  if (ye.isCustomElement(e))
    return !1;
  if (e === "component" || P0(e.charCodeAt(0)) || ch(e) || ye.isBuiltInComponent && ye.isBuiltInComponent(e) || ye.isNativeTag && !ye.isNativeTag(e))
    return !0;
  for (let r = 0; r < t.length; r++) {
    const n = t[r];
    if (n.type === 6) {
      if (n.name === "is" && n.value) {
        if (n.value.content.startsWith("vue:"))
          return !0;
        if (Pi(
          "COMPILER_IS_ON_ELEMENT",
          ye,
          n.loc
        ))
          return !0;
      }
    } else if (
      // :is on plain element - only treat as component in compat mode
      n.name === "bind" && Or(n.arg, "is") && Pi(
        "COMPILER_IS_ON_ELEMENT",
        ye,
        n.loc
      )
    )
      return !0;
  }
  return !1;
}
function P0(e) {
  return e > 64 && e < 91;
}
const M0 = /\r\n/g;
function yh(e) {
  const t = ye.whitespace !== "preserve";
  let r = !1;
  for (let n = 0; n < e.length; n++) {
    const i = e[n];
    if (i.type === 2)
      if (ml)
        i.content = i.content.replace(M0, `
`);
      else if (ph(i.content)) {
        const s = e[n - 1] && e[n - 1].type, o = e[n + 1] && e[n + 1].type;
        !s || !o || t && (s === 3 && (o === 3 || o === 1) || s === 1 && (o === 3 || o === 1 && D0(i.content))) ? (r = !0, e[n] = null) : i.content = " ";
      } else t && (i.content = bh(i.content));
  }
  return r ? e.filter(Boolean) : e;
}
function D0(e) {
  for (let t = 0; t < e.length; t++) {
    const r = e.charCodeAt(t);
    if (r === 10 || r === 13)
      return !0;
  }
  return !1;
}
function bh(e) {
  let t = "", r = !1;
  for (let n = 0; n < e.length; n++)
    ft(e.charCodeAt(n)) ? r || (t += " ", r = !0) : (t += e[n], r = !1);
  return t;
}
function ua(e) {
  (Ae[0] || Di).children.push(e);
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
function k0(e) {
  return Me(e.start.offset, e.end.offset);
}
function Pr(e, t) {
  e.end = Oe.getPos(t), e.source = He(e.start.offset, t);
}
function L0(e) {
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
function Qt(e, t, r) {
  ye.onError(
    Re(e, Me(t, t))
  );
}
function j0() {
  Oe.reset(), Ge = null, he = null, st = "", Kt = -1, Ar = -1, Ae.length = 0;
}
function F0(e, t) {
  if (j0(), nr = e, ye = fe({}, gh), t) {
    let i;
    for (i in t)
      t[i] != null && (ye[i] = t[i]);
  }
  Oe.mode = ye.parseMode === "html" ? 1 : ye.parseMode === "sfc" ? 2 : 0, Oe.inXML = ye.ns === 1 || ye.ns === 2;
  const r = t && t.delimiters;
  r && (Oe.delimiterOpen = Ls(r[0]), Oe.delimiterClose = Ls(r[1]));
  const n = Di = f0([], e);
  return Oe.parse(nr), n.loc = Me(0, e.length), n.children = yh(n.children), Di = null, n;
}
function B0(e, t) {
  us(
    e,
    void 0,
    t,
    // Root node is unfortunately non-hoistable due to potential parent
    // fallthrough attributes.
    !!Th(e)
  );
}
function Th(e) {
  const t = e.children.filter((r) => r.type !== 3);
  return t.length === 1 && t[0].type === 1 && !Fs(t[0]) ? t[0] : null;
}
function us(e, t, r, n = !1, i = !1) {
  const { children: s } = e, o = [];
  for (let p = 0; p < s.length; p++) {
    const c = s[p];
    if (c.type === 1 && c.tagType === 0) {
      const m = n ? 0 : dt(c, r);
      if (m > 0) {
        if (m >= 2) {
          c.codegenNode.patchFlag = -1, o.push(c);
          continue;
        }
      } else {
        const _ = c.codegenNode;
        if (_.type === 13) {
          const v = _.patchFlag;
          if ((v === void 0 || v === 512 || v === 1) && Sh(c, r) >= 2) {
            const I = Eh(c);
            I && (_.props = r.hoist(I));
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
      const m = c.tagType === 1;
      m && r.scopes.vSlot++, us(c, e, r, !1, i), m && r.scopes.vSlot--;
    } else if (c.type === 11)
      us(c, e, r, c.children.length === 1, !0);
    else if (c.type === 9)
      for (let m = 0; m < c.branches.length; m++)
        us(
          c.branches[m],
          e,
          r,
          c.branches[m].children.length === 1,
          i
        );
  }
  let a = !1;
  if (o.length === s.length && e.type === 1) {
    if (e.tagType === 0 && e.codegenNode && e.codegenNode.type === 13 && ee(e.codegenNode.children))
      e.codegenNode.children = l(
        Fr(e.codegenNode.children)
      ), a = !0;
    else if (e.tagType === 1 && e.codegenNode && e.codegenNode.type === 13 && e.codegenNode.children && !ee(e.codegenNode.children) && e.codegenNode.children.type === 15) {
      const p = h(e.codegenNode, "default");
      p && (p.returns = l(
        Fr(p.returns)
      ), a = !0);
    } else if (e.tagType === 3 && t && t.type === 1 && t.tagType === 1 && t.codegenNode && t.codegenNode.type === 13 && t.codegenNode.children && !ee(t.codegenNode.children) && t.codegenNode.children.type === 15) {
      const p = yt(e, "slot", !0), c = p && p.arg && h(t.codegenNode, p.arg);
      c && (c.returns = l(
        Fr(c.returns)
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
  function h(p, c) {
    if (p.children && !ee(p.children) && p.children.type === 15) {
      const m = p.children.properties.find(
        (_) => _.key === c || _.key.content === c
      );
      return m && m.value;
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
          const h = dt(e.children[l], t);
          if (h === 0)
            return r.set(e, 0), 0;
          h < o && (o = h);
        }
        if (o > 1)
          for (let l = 0; l < e.props.length; l++) {
            const h = e.props[l];
            if (h.type === 7 && h.name === "bind" && h.exp) {
              const p = dt(h.exp, t);
              if (p === 0)
                return r.set(e, 0), 0;
              p < o && (o = p);
            }
          }
        if (i.isBlock) {
          for (let l = 0; l < e.props.length; l++)
            if (e.props[l].type === 7)
              return r.set(e, 0), 0;
          t.removeHelper(Vr), t.removeHelper(
            gn(t.inSSR, i.isComponent)
          ), i.isBlock = !1, t.helper(mn(t.inSSR, i.isComponent));
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
        if (ae(a) || Je(a))
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
const U0 = /* @__PURE__ */ new Set([
  ol,
  al,
  Ci,
  Vi
]);
function vh(e, t) {
  if (e.type === 14 && !ae(e.callee) && U0.has(e.callee)) {
    const r = e.arguments[0];
    if (r.type === 4)
      return dt(r, t);
    if (r.type === 14)
      return vh(r, t);
  }
  return 0;
}
function Sh(e, t) {
  let r = 3;
  const n = Eh(e);
  if (n && n.type === 15) {
    const { properties: i } = n;
    for (let s = 0; s < i.length; s++) {
      const { key: o, value: a } = i[s], l = dt(o, t);
      if (l === 0)
        return l;
      l < r && (r = l);
      let h;
      if (a.type === 4 ? h = dt(a, t) : a.type === 14 ? h = vh(a, t) : h = 0, h === 0)
        return h;
      h < r && (r = h);
    }
  }
  return r;
}
function Eh(e) {
  const t = e.codegenNode;
  if (t.type === 13)
    return t.props;
}
function $0(e, {
  filename: t = "",
  prefixIdentifiers: r = !1,
  hoistStatic: n = !1,
  hmr: i = !1,
  cacheHandlers: s = !1,
  nodeTransforms: o = [],
  directiveTransforms: a = {},
  transformHoist: l = null,
  isBuiltInComponent: h = Qe,
  isCustomElement: p = Qe,
  expressionPlugins: c = [],
  scopeId: m = null,
  slotted: _ = !0,
  ssr: v = !1,
  inSSR: I = !1,
  ssrCssVars: k = "",
  bindingMetadata: L = de,
  inline: A = !1,
  isTS: x = !1,
  onError: T = dl,
  onWarn: S = lh,
  compatConfig: C
}) {
  const D = t.replace(/\?.*$/, "").match(/([^/\\]+)\.\w+$/), j = {
    // options
    filename: t,
    selfName: D && qr(Ie(D[1])),
    prefixIdentifiers: r,
    hoistStatic: n,
    hmr: i,
    cacheHandlers: s,
    nodeTransforms: o,
    directiveTransforms: a,
    transformHoist: l,
    isBuiltInComponent: h,
    isCustomElement: p,
    expressionPlugins: c,
    scopeId: m,
    slotted: _,
    ssr: v,
    inSSR: I,
    ssrCssVars: k,
    bindingMetadata: L,
    inline: A,
    isTS: x,
    onError: T,
    onWarn: S,
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
    helper(b) {
      const w = j.helpers.get(b) || 0;
      return j.helpers.set(b, w + 1), b;
    },
    removeHelper(b) {
      const w = j.helpers.get(b);
      if (w) {
        const P = w - 1;
        P ? j.helpers.set(b, P) : j.helpers.delete(b);
      }
    },
    helperString(b) {
      return `_${hn[j.helper(b)]}`;
    },
    replaceNode(b) {
      j.parent.children[j.childIndex] = j.currentNode = b;
    },
    removeNode(b) {
      const w = j.parent.children, P = b ? w.indexOf(b) : j.currentNode ? j.childIndex : -1;
      !b || b === j.currentNode ? (j.currentNode = null, j.onNodeRemoved()) : j.childIndex > P && (j.childIndex--, j.onNodeRemoved()), j.parent.children.splice(P, 1);
    },
    onNodeRemoved: Qe,
    addIdentifiers(b) {
    },
    removeIdentifiers(b) {
    },
    hoist(b) {
      ae(b) && (b = ce(b)), j.hoists.push(b);
      const w = ce(
        `_hoisted_${j.hoists.length}`,
        !1,
        b.loc,
        2
      );
      return w.hoisted = b, w;
    },
    cache(b, w = !1, P = !1) {
      const R = d0(
        j.cached.length,
        b,
        w,
        P
      );
      return j.cached.push(R), R;
    }
  };
  return j.filters = /* @__PURE__ */ new Set(), j;
}
function V0(e, t) {
  const r = $0(e, t);
  uo(e, r), t.hoistStatic && B0(e, r), t.ssr || Q0(e, r), e.helpers = /* @__PURE__ */ new Set([...r.helpers.keys()]), e.components = [...r.components], e.directives = [...r.directives], e.imports = r.imports, e.hoists = r.hoists, e.temps = r.temps, e.cached = r.cached, e.transformed = !0, e.filters = [...r.filters];
}
function Q0(e, t) {
  const { helper: r } = t, { children: n } = e;
  if (n.length === 1) {
    const i = Th(e);
    if (i && i.codegenNode) {
      const s = i.codegenNode;
      s.type === 13 && fl(s, t), e.codegenNode = s;
    } else
      e.codegenNode = n[0];
  } else if (n.length > 1) {
    let i = 64;
    e.codegenNode = Oi(
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
function H0(e, t) {
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
    if (o && (ee(o) ? n.push(...o) : n.push(o)), t.currentNode)
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
      H0(e, t);
      break;
  }
  t.currentNode = e;
  let i = n.length;
  for (; i--; )
    n[i]();
}
function wh(e, t) {
  const r = ae(e) ? (n) => n === e : (n) => e.test(n);
  return (n, i) => {
    if (n.type === 1) {
      const { props: s } = n;
      if (n.tagType === 3 && s.some(E0))
        return;
      const o = [];
      for (let a = 0; a < s.length; a++) {
        const l = s[a];
        if (l.type === 7 && r(l.name)) {
          s.splice(a, 1), a--;
          const h = t(n, l, i);
          h && o.push(h);
        }
      }
      return o;
    }
  };
}
const fo = "/*@__PURE__*/", Ih = (e) => `${hn[e]}: _${hn[e]}`;
function q0(e, {
  mode: t = "function",
  prefixIdentifiers: r = t === "module",
  sourceMap: n = !1,
  filename: i = "template.vue.html",
  scopeId: s = null,
  optimizeImports: o = !1,
  runtimeGlobalName: a = "Vue",
  runtimeModuleName: l = "vue",
  ssrRuntimeModuleName: h = "vue/server-renderer",
  ssr: p = !1,
  isTS: c = !1,
  inSSR: m = !1
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
    ssrRuntimeModuleName: h,
    ssr: p,
    isTS: c,
    inSSR: m,
    source: e.source,
    code: "",
    column: 1,
    line: 1,
    offset: 0,
    indentLevel: 0,
    pure: !1,
    map: void 0,
    helper(I) {
      return `_${hn[I]}`;
    },
    push(I, k = -2, L) {
      _.code += I;
    },
    indent() {
      v(++_.indentLevel);
    },
    deindent(I = !1) {
      I ? --_.indentLevel : v(--_.indentLevel);
    },
    newline() {
      v(_.indentLevel);
    }
  };
  function v(I) {
    _.push(
      `
` + "  ".repeat(I),
      0
      /* Start */
    );
  }
  return _;
}
function K0(e, t = {}) {
  const r = q0(e, t);
  t.onContextCreated && t.onContextCreated(r);
  const {
    mode: n,
    push: i,
    prefixIdentifiers: s,
    indent: o,
    deindent: a,
    newline: l,
    scopeId: h,
    ssr: p
  } = r, c = Array.from(e.helpers), m = c.length > 0, _ = !s && n !== "module";
  W0(e, r);
  const I = p ? "ssrRender" : "render", L = (p ? ["_ctx", "_push", "_parent", "_attrs"] : ["_ctx", "_cache"]).join(", ");
  if (i(`function ${I}(${L}) {`), o(), _ && (i("with (_ctx) {"), o(), m && (i(
    `const { ${c.map(Ih).join(", ")} } = _Vue
`,
    -1
    /* End */
  ), l())), e.components.length && (Fo(e.components, "component", r), (e.directives.length || e.temps > 0) && l()), e.directives.length && (Fo(e.directives, "directive", r), e.temps > 0 && l()), e.filters && e.filters.length && (l(), Fo(e.filters, "filter", r), l()), e.temps > 0) {
    i("let ");
    for (let A = 0; A < e.temps; A++)
      i(`${A > 0 ? ", " : ""}_temp${A}`);
  }
  return (e.components.length || e.directives.length || e.temps) && (i(
    `
`,
    0
    /* Start */
  ), l()), p || i("return "), e.codegenNode ? Xe(e.codegenNode, r) : i("null"), _ && (a(), i("}")), a(), i("}"), {
    ast: e,
    code: r.code,
    preamble: "",
    map: r.map ? r.map.toJSON() : void 0
  };
}
function W0(e, t) {
  const {
    ssr: r,
    prefixIdentifiers: n,
    push: i,
    newline: s,
    runtimeModuleName: o,
    runtimeGlobalName: a,
    ssrRuntimeModuleName: l
  } = t, h = a, p = Array.from(e.helpers);
  if (p.length > 0 && (i(
    `const _Vue = ${h}
`,
    -1
    /* End */
  ), e.hoists.length)) {
    const c = [
      Xa,
      Ja,
      $i,
      Za,
      ih
    ].filter((m) => p.includes(m)).map(Ih).join(", ");
    i(
      `const { ${c} } = _Vue
`,
      -1
      /* End */
    );
  }
  G0(e.hoists, t), s(), i("return ");
}
function Fo(e, t, { helper: r, push: n, newline: i, isTS: s }) {
  const o = r(
    t === "filter" ? nl : t === "component" ? el : rl
  );
  for (let a = 0; a < e.length; a++) {
    let l = e[a];
    const h = l.endsWith("__self");
    h && (l = l.slice(0, -6)), n(
      `const ${Mi(l, t)} = ${o}(${JSON.stringify(l)}${h ? ", true" : ""})${s ? "!" : ""}`
    ), a < e.length - 1 && i();
  }
}
function G0(e, t) {
  if (!e.length)
    return;
  t.pure = !0;
  const { push: r, newline: n } = t;
  n();
  for (let i = 0; i < e.length; i++) {
    const s = e[i];
    s && (r(`const _hoisted_${i + 1} = `), Xe(s, t), n());
  }
  t.pure = !1;
}
function gl(e, t) {
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
    ) : ee(a) ? gl(a, t) : Xe(a, t), o < e.length - 1 && (r ? (n && i(","), s()) : n && i(", "));
  }
}
function Xe(e, t) {
  if (ae(e)) {
    t.push(
      e,
      -3
      /* Unknown */
    );
    return;
  }
  if (Je(e)) {
    t.push(t.helper(e));
    return;
  }
  switch (e.type) {
    case 1:
    case 9:
    case 11:
      Xe(e.codegenNode, t);
      break;
    case 2:
      z0(e, t);
      break;
    case 4:
      xh(e, t);
      break;
    case 5:
      Y0(e, t);
      break;
    case 12:
      Xe(e.codegenNode, t);
      break;
    case 8:
      Nh(e, t);
      break;
    case 3:
      J0(e, t);
      break;
    case 13:
      Z0(e, t);
      break;
    case 14:
      tb(e, t);
      break;
    case 15:
      rb(e, t);
      break;
    case 17:
      nb(e, t);
      break;
    case 18:
      ib(e, t);
      break;
    case 19:
      sb(e, t);
      break;
    case 20:
      ob(e, t);
      break;
    case 21:
      Qi(e.body, t, !0, !1);
      break;
  }
}
function z0(e, t) {
  t.push(JSON.stringify(e.content), -3, e);
}
function xh(e, t) {
  const { content: r, isStatic: n } = e;
  t.push(
    n ? JSON.stringify(r) : r,
    -3,
    e
  );
}
function Y0(e, t) {
  const { push: r, helper: n, pure: i } = t;
  i && r(fo), r(`${n(lo)}(`), Xe(e.content, t), r(")");
}
function Nh(e, t) {
  for (let r = 0; r < e.children.length; r++) {
    const n = e.children[r];
    ae(n) ? t.push(
      n,
      -3
      /* Unknown */
    ) : Xe(n, t);
  }
}
function X0(e, t) {
  const { push: r } = t;
  if (e.type === 8)
    r("["), Nh(e, t), r("]");
  else if (e.isStatic) {
    const n = hl(e.content) ? e.content : JSON.stringify(e.content);
    r(n, -2, e);
  } else
    r(`[${e.content}]`, -3, e);
}
function J0(e, t) {
  const { push: r, helper: n, pure: i } = t;
  i && r(fo), r(
    `${n($i)}(${JSON.stringify(e.content)})`,
    -3,
    e
  );
}
function Z0(e, t) {
  const { push: r, helper: n, pure: i } = t, {
    tag: s,
    props: o,
    children: a,
    patchFlag: l,
    dynamicProps: h,
    directives: p,
    isBlock: c,
    disableTracking: m,
    isComponent: _
  } = e;
  let v;
  l && (v = String(l)), p && r(n(il) + "("), c && r(`(${n(Vr)}(${m ? "true" : ""}), `), i && r(fo);
  const I = c ? gn(t.inSSR, _) : mn(t.inSSR, _);
  r(n(I) + "(", -2, e), Qi(
    eb([s, o, a, v, h]),
    t
  ), r(")"), c && r(")"), p && (r(", "), Xe(p, t), r(")"));
}
function eb(e) {
  let t = e.length;
  for (; t-- && e[t] == null; )
    ;
  return e.slice(0, t + 1).map((r) => r || "null");
}
function tb(e, t) {
  const { push: r, helper: n, pure: i } = t, s = ae(e.callee) ? e.callee : n(e.callee);
  i && r(fo), r(s + "(", -2, e), Qi(e.arguments, t), r(")");
}
function rb(e, t) {
  const { push: r, indent: n, deindent: i, newline: s } = t, { properties: o } = e;
  if (!o.length) {
    r("{}", -2, e);
    return;
  }
  const a = o.length > 1 || !1;
  r(a ? "{" : "{ "), a && n();
  for (let l = 0; l < o.length; l++) {
    const { key: h, value: p } = o[l];
    X0(h, t), r(": "), Xe(p, t), l < o.length - 1 && (r(","), s());
  }
  a && i(), r(a ? "}" : " }");
}
function nb(e, t) {
  gl(e.elements, t);
}
function ib(e, t) {
  const { push: r, indent: n, deindent: i } = t, { params: s, returns: o, body: a, newline: l, isSlot: h } = e;
  h && r(`_${hn[cl]}(`), r("(", -2, e), ee(s) ? Qi(s, t) : s && Xe(s, t), r(") => "), (l || a) && (r("{"), n()), o ? (l && r("return "), ee(o) ? gl(o, t) : Xe(o, t)) : a && Xe(a, t), (l || a) && (i(), r("}")), h && (e.isNonScopedSlot && r(", undefined, true"), r(")"));
}
function sb(e, t) {
  const { test: r, consequent: n, alternate: i, newline: s } = e, { push: o, indent: a, deindent: l, newline: h } = t;
  if (r.type === 4) {
    const c = !hl(r.content);
    c && o("("), xh(r, t), c && o(")");
  } else
    o("("), Xe(r, t), o(")");
  s && a(), t.indentLevel++, s || o(" "), o("? "), Xe(n, t), t.indentLevel--, s && h(), s || o(" "), o(": ");
  const p = i.type === 19;
  p || t.indentLevel++, Xe(i, t), p || t.indentLevel--, s && l(
    !0
    /* without newline */
  );
}
function ob(e, t) {
  const { push: r, helper: n, indent: i, deindent: s, newline: o } = t, { needPauseTracking: a, needArraySpread: l } = e;
  l && r("[...("), r(`_cache[${e.index}] || (`), a && (i(), r(`${n(ks)}(-1`), e.inVOnce && r(", true"), r("),"), o(), r("(")), r(`_cache[${e.index}] = `), Xe(e.value, t), a && (r(`).cacheIndex = ${e.index},`), o(), r(`${n(ks)}(1),`), o(), r(`_cache[${e.index}]`), s()), r(")"), l && r(")]");
}
new RegExp(
  "\\b" + "arguments,await,break,case,catch,class,const,continue,debugger,default,delete,do,else,export,extends,finally,for,function,if,import,let,new,return,super,switch,throw,try,var,void,while,with,yield".split(",").join("\\b|\\b") + "\\b"
);
const ab = wh(
  /^(?:if|else|else-if)$/,
  (e, t, r) => lb(e, t, r, (n, i, s) => {
    const o = r.parent.children;
    let a = o.indexOf(n), l = 0;
    for (; a-- >= 0; ) {
      const h = o[a];
      h && h.type === 9 && (l += h.branches.length);
    }
    return () => {
      if (s)
        n.codegenNode = ou(
          i,
          l,
          r
        );
      else {
        const h = cb(n.codegenNode);
        h.alternate = ou(
          i,
          l + n.branches.length - 1,
          r
        );
      }
    };
  })
);
function lb(e, t, r, n) {
  if (t.name !== "else" && (!t.exp || !t.exp.content.trim())) {
    const i = t.exp ? t.exp.loc : e.loc;
    r.onError(
      Re(28, t.loc)
    ), t.exp = ce("true", !1, i);
  }
  if (t.name === "if") {
    const i = su(e, t), s = {
      type: 9,
      loc: k0(e.loc),
      branches: [i]
    };
    if (r.replaceNode(s), n)
      return n(s, i, !0);
  } else {
    const i = r.parent.children;
    let s = i.indexOf(e);
    for (; s-- >= -1; ) {
      const o = i[s];
      if (o && mh(o)) {
        r.removeNode(o);
        continue;
      }
      if (o && o.type === 9) {
        (t.name === "else-if" || t.name === "else") && o.branches[o.branches.length - 1].condition === void 0 && r.onError(
          Re(30, e.loc)
        ), r.removeNode();
        const a = su(e, t);
        o.branches.push(a);
        const l = n && n(o, a, !1);
        uo(a, r), l && l(), r.currentNode = null;
      } else
        r.onError(
          Re(30, e.loc)
        );
      break;
    }
  }
}
function su(e, t) {
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
function ou(e, t, r) {
  return e.condition ? la(
    e.condition,
    au(e, t, r),
    // make sure to pass in asBlock: true so that the comment node call
    // closes the current block.
    Ue(r.helper($i), [
      '""',
      "true"
    ])
  ) : au(e, t, r);
}
function au(e, t, r) {
  const { helper: n } = r, i = je(
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
      return Oi(
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
    const l = o.codegenNode, h = I0(l);
    return h.type === 13 && fl(h, r), Bs(h, i, r), l;
  }
}
function cb(e) {
  for (; ; )
    if (e.type === 19)
      if (e.alternate.type === 19)
        e = e.alternate;
      else
        return e;
    else e.type === 20 && (e = e.value);
}
const ub = wh(
  "for",
  (e, t, r) => {
    const { helper: n, removeHelper: i } = r;
    return fb(e, t, r, (s) => {
      const o = Ue(n(sl), [
        s.source
      ]), a = js(e), l = yt(e, "memo"), h = co(e, "key", !1, !0);
      h && h.type;
      let p = h && (h.type === 6 ? h.value ? ce(h.value.content, !0) : void 0 : h.exp);
      const c = p ? je("key", p) : null, m = s.source.type === 4 && s.source.constType > 0, _ = m ? 64 : h ? 128 : 256;
      return s.codegenNode = Oi(
        r,
        n(Ri),
        void 0,
        o,
        _,
        void 0,
        void 0,
        !0,
        !m,
        !1,
        e.loc
      ), () => {
        let v;
        const { children: I } = s, k = I.length !== 1 || I[0].type !== 1, L = Fs(e) ? e : a && e.children.length === 1 && Fs(e.children[0]) ? e.children[0] : null;
        if (L ? (v = L.codegenNode, a && c && Bs(v, c, r)) : k ? v = Oi(
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
        ) : (v = I[0].codegenNode, a && c && Bs(v, c, r), v.isBlock !== !m && (v.isBlock ? (i(Vr), i(
          gn(r.inSSR, v.isComponent)
        )) : i(
          mn(r.inSSR, v.isComponent)
        )), v.isBlock = !m, v.isBlock ? (n(Vr), n(gn(r.inSSR, v.isComponent))) : n(mn(r.inSSR, v.isComponent))), l) {
          const A = pn(
            fa(s.parseResult, [
              ce("_cached")
            ])
          );
          A.body = h0([
            Nt(["const _memo = (", l.exp, ")"]),
            Nt([
              "if (_cached && _cached.el",
              ...p ? [" && _cached.key === ", p] : [],
              ` && ${r.helperString(
                ah
              )}(_cached, _memo)) return _cached`
            ]),
            Nt(["const _item = ", v]),
            ce("_item.memo = _memo"),
            ce("return _item")
          ]), o.arguments.push(
            A,
            ce("_cache"),
            ce(String(r.cached.length))
          ), r.cached.push(null);
        } else
          o.arguments.push(
            pn(
              fa(s.parseResult),
              v,
              !0
            )
          );
      };
    });
  }
);
function fb(e, t, r, n) {
  if (!t.exp) {
    r.onError(
      Re(31, t.loc)
    );
    return;
  }
  const i = t.forParseResult;
  if (!i) {
    r.onError(
      Re(32, t.loc)
    );
    return;
  }
  Ah(i);
  const { addIdentifiers: s, removeIdentifiers: o, scopes: a } = r, { source: l, value: h, key: p, index: c } = i, m = {
    type: 11,
    loc: t.loc,
    source: l,
    valueAlias: h,
    keyAlias: p,
    objectIndexAlias: c,
    parseResult: i,
    children: js(e) ? e.children : [e]
  };
  r.replaceNode(m), a.vFor++;
  const _ = n && n(m);
  return () => {
    a.vFor--, _ && _();
  };
}
function Ah(e, t) {
  e.finalized || (e.finalized = !0);
}
function fa({ value: e, key: t, index: r }, n = []) {
  return db([e, t, r, ...n]);
}
function db(e) {
  let t = e.length;
  for (; t-- && !e[t]; )
    ;
  return e.slice(0, t + 1).map((r, n) => r || ce("_".repeat(n + 1), !1));
}
const lu = ce("undefined", !1), hb = (e, t) => {
  if (e.type === 1 && (e.tagType === 1 || e.tagType === 3)) {
    const r = yt(e, "slot");
    if (r)
      return r.exp, t.scopes.vSlot++, () => {
        t.scopes.vSlot--;
      };
  }
}, pb = (e, t, r, n) => pn(
  e,
  r,
  !1,
  !0,
  r.length ? r[0].loc : n
);
function mb(e, t, r = pb) {
  t.helper(cl);
  const { children: n, loc: i } = e, s = [], o = [];
  let a = t.scopes.vSlot > 0 || t.scopes.vFor > 0;
  const l = yt(e, "slot", !0);
  if (l) {
    const { arg: k, exp: L } = l;
    k && !lt(k) && (a = !0), s.push(
      je(
        k || ce("default", !0),
        r(L, void 0, n, i)
      )
    );
  }
  let h = !1, p = !1;
  const c = [], m = /* @__PURE__ */ new Set();
  let _ = 0;
  for (let k = 0; k < n.length; k++) {
    const L = n[k];
    let A;
    if (!js(L) || !(A = yt(L, "slot", !0))) {
      L.type !== 3 && c.push(L);
      continue;
    }
    if (l) {
      t.onError(
        Re(37, A.loc)
      );
      break;
    }
    h = !0;
    const { children: x, loc: T } = L, {
      arg: S = ce("default", !0),
      exp: C,
      loc: D
    } = A;
    let j;
    lt(S) ? j = S ? S.content : "default" : a = !0;
    const b = yt(L, "for"), w = r(C, b, x, T);
    let P, R;
    if (P = yt(L, "if"))
      a = !0, o.push(
        la(
          P.exp,
          ss(S, w, _++),
          lu
        )
      );
    else if (R = yt(
      L,
      /^else(?:-if)?$/,
      !0
      /* allowEmpty */
    )) {
      let Q = k, Y;
      for (; Q-- && (Y = n[Q], !!mh(Y)); )
        ;
      if (Y && js(Y) && yt(Y, /^(?:else-)?if$/)) {
        let Z = o[o.length - 1];
        for (; Z.alternate.type === 19; )
          Z = Z.alternate;
        Z.alternate = R.exp ? la(
          R.exp,
          ss(
            S,
            w,
            _++
          ),
          lu
        ) : ss(S, w, _++);
      } else
        t.onError(
          Re(30, R.loc)
        );
    } else if (b) {
      a = !0;
      const Q = b.forParseResult;
      Q ? (Ah(Q), o.push(
        Ue(t.helper(sl), [
          Q.source,
          pn(
            fa(Q),
            ss(S, w),
            !0
          )
        ])
      )) : t.onError(
        Re(
          32,
          b.loc
        )
      );
    } else {
      if (j) {
        if (m.has(j)) {
          t.onError(
            Re(
              38,
              D
            )
          );
          continue;
        }
        m.add(j), j === "default" && (p = !0);
      }
      s.push(je(S, w));
    }
  }
  if (!l) {
    const k = (L, A) => {
      const x = r(L, void 0, A, i);
      return t.compatConfig && (x.isNonScopedSlot = !0), je("default", x);
    };
    h ? c.length && // #3766
    // with whitespace: 'preserve', whitespaces between slots will end up in
    // implicitDefaultChildren. Ignore if all implicit children are whitespaces.
    !c.every(pl) && (p ? t.onError(
      Re(
        39,
        c[0].loc
      )
    ) : s.push(
      k(void 0, c)
    )) : s.push(k(void 0, n));
  }
  const v = a ? 2 : fs(e.children) ? 3 : 1;
  let I = bt(
    s.concat(
      je(
        "_",
        // 2 = compiled but dynamic = can skip normalization, but must run diff
        // 1 = compiled and static = can skip normalization AND diff as optimized
        ce(
          v + "",
          !1
        )
      )
    ),
    i
  );
  return o.length && (I = Ue(t.helper(oh), [
    I,
    Fr(o)
  ])), {
    slots: I,
    hasDynamicSlots: a
  };
}
function ss(e, t, r) {
  const n = [
    je("name", e),
    je("fn", t)
  ];
  return r != null && n.push(
    je("key", ce(String(r), !0))
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
const Rh = /* @__PURE__ */ new WeakMap(), gb = (e, t) => function() {
  if (e = t.currentNode, !(e.type === 1 && (e.tagType === 0 || e.tagType === 1)))
    return;
  const { tag: n, props: i } = e, s = e.tagType === 1;
  let o = s ? _b(e, t) : `"${n}"`;
  const a = be(o) && o.callee === tl;
  let l, h, p = 0, c, m, _, v = (
    // dynamic component may resolve to plain elements
    a || o === _i || o === Ya || !s && // <svg> and <foreignObject> must be forced into blocks so that block
    // updates inside get proper isSVG flag at runtime. (#639, #643)
    // This is technically web-specific, but splitting the logic out of core
    // leads to too much unnecessary complexity.
    (n === "svg" || n === "foreignObject" || n === "math")
  );
  if (i.length > 0) {
    const I = Ch(
      e,
      t,
      void 0,
      s,
      a
    );
    l = I.props, p = I.patchFlag, m = I.dynamicPropNames;
    const k = I.directives;
    _ = k && k.length ? Fr(
      k.map((L) => bb(L, t))
    ) : void 0, I.shouldUseBlock && (v = !0);
  }
  if (e.children.length > 0)
    if (o === Ms && (v = !0, p |= 1024), s && // Teleport is not a real component and has dedicated runtime handling
    o !== _i && // explained above.
    o !== Ms) {
      const { slots: k, hasDynamicSlots: L } = mb(e, t);
      h = k, L && (p |= 1024);
    } else if (e.children.length === 1 && o !== _i) {
      const k = e.children[0], L = k.type, A = L === 5 || L === 8;
      A && dt(k, t) === 0 && (p |= 1), A || L === 2 ? h = k : h = e.children;
    } else
      h = e.children;
  m && m.length && (c = Tb(m)), e.codegenNode = Oi(
    t,
    o,
    l,
    h,
    p === 0 ? void 0 : p,
    c,
    _,
    !!v,
    !1,
    s,
    e.loc
  );
};
function _b(e, t, r = !1) {
  let { tag: n } = e;
  const i = da(n), s = co(
    e,
    "is",
    !1,
    !0
    /* allow empty */
  );
  if (s)
    if (i || Br(
      "COMPILER_IS_ON_ELEMENT",
      t
    )) {
      let a;
      if (s.type === 6 ? a = s.value && ce(s.value.content, !0) : (a = s.exp, a || (a = ce("is", !1, s.arg.loc))), a)
        return Ue(t.helper(tl), [
          a
        ]);
    } else s.type === 6 && s.value.content.startsWith("vue:") && (n = s.value.content.slice(4));
  const o = ch(n) || t.isBuiltInComponent(n);
  return o ? (r || t.helper(o), o) : (t.helper(el), t.components.add(n), Mi(n, "component"));
}
function Ch(e, t, r = e.props, n, i, s = !1) {
  const { tag: o, loc: a, children: l } = e;
  let h = [];
  const p = [], c = [], m = l.length > 0;
  let _ = !1, v = 0, I = !1, k = !1, L = !1, A = !1, x = !1, T = !1;
  const S = [], C = (w) => {
    h.length && (p.push(
      bt(cu(h), a)
    ), h = []), w && p.push(w);
  }, D = () => {
    t.scopes.vFor > 0 && h.push(
      je(
        ce("ref_for", !0),
        ce("true")
      )
    );
  }, j = ({ key: w, value: P }) => {
    if (lt(w)) {
      const R = w.content, Q = Qr(R);
      if (Q && (!n || i) && // omit the flag for click handlers because hydration gives click
      // dedicated fast path.
      R.toLowerCase() !== "onclick" && // omit v-model handlers
      R !== "onUpdate:modelValue" && // omit onVnodeXXX hooks
      !Zt(R) && (A = !0), Q && Zt(R) && (T = !0), Q && P.type === 14 && (P = P.arguments[0]), P.type === 20 || (P.type === 4 || P.type === 8) && dt(P, t) > 0)
        return;
      R === "ref" ? I = !0 : R === "class" ? k = !0 : R === "style" ? L = !0 : R !== "key" && !S.includes(R) && S.push(R), n && (R === "class" || R === "style") && !S.includes(R) && S.push(R);
    } else
      x = !0;
  };
  for (let w = 0; w < r.length; w++) {
    const P = r[w];
    if (P.type === 6) {
      const { loc: R, name: Q, nameLoc: Y, value: Z } = P;
      let z = !0;
      if (Q === "ref" && (I = !0, D()), Q === "is" && (da(o) || Z && Z.content.startsWith("vue:") || Br(
        "COMPILER_IS_ON_ELEMENT",
        t
      )))
        continue;
      h.push(
        je(
          ce(Q, !0, Y),
          ce(
            Z ? Z.content : "",
            z,
            Z ? Z.loc : R
          )
        )
      );
    } else {
      const { name: R, arg: Q, exp: Y, loc: Z, modifiers: z } = P, ne = R === "bind", re = R === "on";
      if (R === "slot") {
        n || t.onError(
          Re(40, Z)
        );
        continue;
      }
      if (R === "once" || R === "memo" || R === "is" || ne && Or(Q, "is") && (da(o) || Br(
        "COMPILER_IS_ON_ELEMENT",
        t
      )) || re && s)
        continue;
      if (
        // #938: elements with dynamic keys should be forced into blocks
        (ne && Or(Q, "key") || // inline before-update hooks need to force block so that it is invoked
        // before children
        re && m && Or(Q, "vue:before-update")) && (_ = !0), ne && Or(Q, "ref") && D(), !Q && (ne || re)
      ) {
        if (x = !0, Y)
          if (ne) {
            if (C(), Br(
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
              loc: Z,
              callee: t.helper(ll),
              arguments: n ? [Y] : [Y, "true"]
            });
        else
          t.onError(
            Re(
              ne ? 34 : 35,
              Z
            )
          );
        continue;
      }
      ne && z.some((se) => se.content === "prop") && (v |= 32);
      const _e = t.directiveTransforms[R];
      if (_e) {
        const { props: se, needRuntime: ie } = _e(P, e, t);
        !s && se.forEach(j), re && Q && !lt(Q) ? C(bt(se, a)) : h.push(...se), ie && (c.push(P), Je(ie) && Rh.set(P, ie));
      } else $p(R) || (c.push(P), m && (_ = !0));
    }
  }
  let b;
  if (p.length ? (C(), p.length > 1 ? b = Ue(
    t.helper(Ds),
    p,
    a
  ) : b = p[0]) : h.length && (b = bt(
    cu(h),
    a
  )), x ? v |= 16 : (k && !n && (v |= 2), L && !n && (v |= 4), S.length && (v |= 8), A && (v |= 32)), !_ && (v === 0 || v === 32) && (I || T || c.length > 0) && (v |= 512), !t.inSSR && b)
    switch (b.type) {
      case 15:
        let w = -1, P = -1, R = !1;
        for (let Z = 0; Z < b.properties.length; Z++) {
          const z = b.properties[Z].key;
          lt(z) ? z.content === "class" ? w = Z : z.content === "style" && (P = Z) : z.isHandlerKey || (R = !0);
        }
        const Q = b.properties[w], Y = b.properties[P];
        R ? b = Ue(
          t.helper(Ci),
          [b]
        ) : (Q && !lt(Q.value) && (Q.value = Ue(
          t.helper(ol),
          [Q.value]
        )), Y && // the static style is compiled into an object,
        // so use `hasStyleBinding` to ensure that it is a dynamic style binding
        (L || Y.value.type === 4 && Y.value.content.trim()[0] === "[" || // v-bind:style and style both exist,
        // v-bind:style with static literal object
        Y.value.type === 17) && (Y.value = Ue(
          t.helper(al),
          [Y.value]
        )));
        break;
      case 14:
        break;
      default:
        b = Ue(
          t.helper(Ci),
          [
            Ue(t.helper(Vi), [
              b
            ])
          ]
        );
        break;
    }
  return {
    props: b,
    directives: c,
    patchFlag: v,
    dynamicPropNames: S,
    shouldUseBlock: _
  };
}
function cu(e) {
  const t = /* @__PURE__ */ new Map(), r = [];
  for (let n = 0; n < e.length; n++) {
    const i = e[n];
    if (i.key.type === 8 || !i.key.isStatic) {
      r.push(i);
      continue;
    }
    const s = i.key.content, o = t.get(s);
    o ? (s === "style" || s === "class" || Qr(s)) && yb(o, i) : (t.set(s, i), r.push(i));
  }
  return r;
}
function yb(e, t) {
  e.value.type === 17 ? e.value.elements.push(t.value) : e.value = Fr(
    [e.value, t.value],
    e.loc
  );
}
function bb(e, t) {
  const r = [], n = Rh.get(e);
  n ? r.push(t.helperString(n)) : (t.helper(rl), t.directives.add(e.name), r.push(Mi(e.name, "directive")));
  const { loc: i } = e;
  if (e.exp && r.push(e.exp), e.arg && (e.exp || r.push("void 0"), r.push(e.arg)), Object.keys(e.modifiers).length) {
    e.arg || (e.exp || r.push("void 0"), r.push("void 0"));
    const s = ce("true", !1, i);
    r.push(
      bt(
        e.modifiers.map(
          (o) => je(o, s)
        ),
        i
      )
    );
  }
  return Fr(r, e.loc);
}
function Tb(e) {
  let t = "[";
  for (let r = 0, n = e.length; r < n; r++)
    t += JSON.stringify(e[r]), r < n - 1 && (t += ", ");
  return t + "]";
}
function da(e) {
  return e === "component" || e === "Component";
}
const vb = (e, t) => {
  if (Fs(e)) {
    const { children: r, loc: n } = e, { slotName: i, slotProps: s } = Sb(e, t), o = [
      t.prefixIdentifiers ? "_ctx.$slots" : "$slots",
      i,
      "{}",
      "undefined",
      "true"
    ];
    let a = 2;
    s && (o[2] = s, a = 3), r.length && (o[3] = pn([], r, !1, !1, n), a = 4), t.scopeId && !t.slotted && (a = 5), o.splice(a), e.codegenNode = Ue(
      t.helper(sh),
      o,
      n
    );
  }
};
function Sb(e, t) {
  let r = '"default"', n;
  const i = [];
  for (let s = 0; s < e.props.length; s++) {
    const o = e.props[s];
    if (o.type === 6)
      o.value && (o.name === "name" ? r = JSON.stringify(o.value.content) : (o.name = Ie(o.name), i.push(o)));
    else if (o.name === "bind" && Or(o.arg, "name")) {
      if (o.exp)
        r = o.exp;
      else if (o.arg && o.arg.type === 4) {
        const a = Ie(o.arg.content);
        r = o.exp = ce(a, !1, o.arg.loc);
      }
    } else
      o.name === "bind" && o.arg && lt(o.arg) && (o.arg.content = Ie(o.arg.content)), i.push(o);
  }
  if (i.length > 0) {
    const { props: s, directives: o } = Ch(
      e,
      t,
      i,
      !1,
      !1
    );
    n = s, o.length && t.onError(
      Re(
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
const Oh = (e, t, r, n) => {
  const { loc: i, modifiers: s, arg: o } = e;
  !e.exp && !s.length && r.onError(Re(35, i));
  let a;
  if (o.type === 4)
    if (o.isStatic) {
      let c = o.content;
      c.startsWith("vue:") && (c = `vnode-${c.slice(4)}`);
      const m = t.tagType !== 0 || c.startsWith("vnode") || !/[A-Z]/.test(c) ? (
        // for non-element and vnode lifecycle event listeners, auto convert
        // it to camelCase. See issue #2249
        tn(Ie(c))
      ) : (
        // preserve case for plain element listeners that have uppercase
        // letters, as these may be custom elements' custom events
        `on:${c}`
      );
      a = ce(m, !0, o.loc);
    } else
      a = Nt([
        `${r.helperString(aa)}(`,
        o,
        ")"
      ]);
  else
    a = o, a.children.unshift(`${r.helperString(aa)}(`), a.children.push(")");
  let l = e.exp;
  l && !l.content.trim() && (l = void 0);
  let h = r.cacheHandlers && !l && !r.inVOnce;
  if (l) {
    const c = dh(l), m = !(c || v0(l)), _ = l.content.includes(";");
    (m || h && c) && (l = Nt([
      `${m ? "$event" : "(...args)"} => ${_ ? "{" : "("}`,
      l,
      _ ? "}" : ")"
    ]));
  }
  let p = {
    props: [
      je(
        a,
        l || ce("() => {}", !1, i)
      )
    ]
  };
  return n && (p = n(p)), h && (p.props[0].value = r.cache(p.props[0].value)), p.props.forEach((c) => c.key.isHandlerKey = !0), p;
}, Eb = (e, t, r) => {
  const { modifiers: n, loc: i } = e, s = e.arg;
  let { exp: o } = e;
  return o && o.type === 4 && !o.content.trim() && (o = void 0), s.type !== 4 ? (s.children.unshift("("), s.children.push(') || ""')) : s.isStatic || (s.content = s.content ? `${s.content} || ""` : '""'), n.some((a) => a.content === "camel") && (s.type === 4 ? s.isStatic ? s.content = Ie(s.content) : s.content = `${r.helperString(oa)}(${s.content})` : (s.children.unshift(`${r.helperString(oa)}(`), s.children.push(")"))), r.inSSR || (n.some((a) => a.content === "prop") && uu(s, "."), n.some((a) => a.content === "attr") && uu(s, "^")), {
    props: [je(s, o)]
  };
}, uu = (e, t) => {
  e.type === 4 ? e.isStatic ? e.content = t + e.content : e.content = `\`${t}\${${e.content}}\`` : (e.children.unshift(`'${t}' + (`), e.children.push(")"));
}, wb = (e, t) => {
  if (e.type === 0 || e.type === 1 || e.type === 11 || e.type === 10)
    return () => {
      const r = e.children;
      let n, i = !1;
      for (let s = 0; s < r.length; s++) {
        const o = r[s];
        if (jo(o)) {
          i = !0;
          for (let a = s + 1; a < r.length; a++) {
            const l = r[a];
            if (jo(l))
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
          if (jo(o) || o.type === 8) {
            const a = [];
            (o.type !== 2 || o.content !== " ") && a.push(o), !t.ssr && dt(o, t) === 0 && a.push(
              "1"
            ), r[s] = {
              type: 12,
              content: o,
              loc: o.loc,
              codegenNode: Ue(
                t.helper(Za),
                a
              )
            };
          }
        }
    };
}, fu = /* @__PURE__ */ new WeakSet(), Ib = (e, t) => {
  if (e.type === 1 && yt(e, "once", !0))
    return fu.has(e) || t.inVOnce || t.inSSR ? void 0 : (fu.add(e), t.inVOnce = !0, t.helper(ks), () => {
      t.inVOnce = !1;
      const r = t.currentNode;
      r.codegenNode && (r.codegenNode = t.cache(
        r.codegenNode,
        !0,
        !0
      ));
    });
}, Ph = (e, t, r) => {
  const { exp: n, arg: i } = e;
  if (!n)
    return r.onError(
      Re(41, e.loc)
    ), ti();
  const s = n.loc.source.trim(), o = n.type === 4 ? n.content : s, a = r.bindingMetadata[s];
  if (a === "props" || a === "props-aliased")
    return r.onError(Re(44, n.loc)), ti();
  if (a === "literal-const" || a === "setup-const")
    return r.onError(Re(45, n.loc)), ti();
  if (!o.trim() || !dh(n))
    return r.onError(
      Re(42, n.loc)
    ), ti();
  const l = i || ce("modelValue", !0), h = i ? lt(i) ? `onUpdate:${Ie(i.content)}` : Nt(['"onUpdate:" + ', i]) : "onUpdate:modelValue";
  let p;
  const c = r.isTS ? "($event: any)" : "$event";
  p = Nt([
    `${c} => ((`,
    n,
    ") = $event)"
  ]);
  const m = [
    // modelValue: foo
    je(l, e.exp),
    // "onUpdate:modelValue": $event => (foo = $event)
    je(h, p)
  ];
  if (e.modifiers.length && t.tagType === 1) {
    const _ = e.modifiers.map((I) => I.content).map((I) => (hl(I) ? I : JSON.stringify(I)) + ": true").join(", "), v = i ? lt(i) ? `${i.content}Modifiers` : Nt([i, ' + "Modifiers"']) : "modelModifiers";
    m.push(
      je(
        v,
        ce(
          `{ ${_} }`,
          !1,
          e.loc,
          2
        )
      )
    );
  }
  return ti(m);
};
function ti(e = []) {
  return { props: e };
}
const xb = /[\w).+\-_$\]]/, Nb = (e, t) => {
  Br("COMPILER_FILTERS", t) && (e.type === 5 ? Us(e.content, t) : e.type === 1 && e.props.forEach((r) => {
    r.type === 7 && r.name !== "for" && r.exp && Us(r.exp, t);
  }));
};
function Us(e, t) {
  if (e.type === 4)
    du(e, t);
  else
    for (let r = 0; r < e.children.length; r++) {
      const n = e.children[r];
      typeof n == "object" && (n.type === 4 ? du(n, t) : n.type === 8 ? Us(n, t) : n.type === 5 && Us(n.content, t));
    }
}
function du(e, t) {
  const r = e.content;
  let n = !1, i = !1, s = !1, o = !1, a = 0, l = 0, h = 0, p = 0, c, m, _, v, I = [];
  for (_ = 0; _ < r.length; _++)
    if (m = c, c = r.charCodeAt(_), n)
      c === 39 && m !== 92 && (n = !1);
    else if (i)
      c === 34 && m !== 92 && (i = !1);
    else if (s)
      c === 96 && m !== 92 && (s = !1);
    else if (o)
      c === 47 && m !== 92 && (o = !1);
    else if (c === 124 && // pipe
    r.charCodeAt(_ + 1) !== 124 && r.charCodeAt(_ - 1) !== 124 && !a && !l && !h)
      v === void 0 ? (p = _ + 1, v = r.slice(0, _).trim()) : k();
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
          h++;
          break;
        // (
        case 41:
          h--;
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
        let L = _ - 1, A;
        for (; L >= 0 && (A = r.charAt(L), A === " "); L--)
          ;
        (!A || !xb.test(A)) && (o = !0);
      }
    }
  v === void 0 ? v = r.slice(0, _).trim() : p !== 0 && k();
  function k() {
    I.push(r.slice(p, _).trim()), p = _ + 1;
  }
  if (I.length) {
    for (_ = 0; _ < I.length; _++)
      v = Ab(v, I[_], t);
    e.content = v, e.ast = void 0;
  }
}
function Ab(e, t, r) {
  r.helper(nl);
  const n = t.indexOf("(");
  if (n < 0)
    return r.filters.add(t), `${Mi(t, "filter")}(${e})`;
  {
    const i = t.slice(0, n), s = t.slice(n + 1);
    return r.filters.add(i), `${Mi(i, "filter")}(${e}${s !== ")" ? "," + s : s}`;
  }
}
const hu = /* @__PURE__ */ new WeakSet(), Rb = (e, t) => {
  if (e.type === 1) {
    const r = yt(e, "memo");
    return !r || hu.has(e) || t.inSSR ? void 0 : (hu.add(e), () => {
      const n = e.codegenNode || t.currentNode.codegenNode;
      n && n.type === 13 && (e.tagType !== 1 && fl(n, t), e.codegenNode = Ue(t.helper(ul), [
        r.exp,
        pn(void 0, n),
        "_cache",
        String(t.cached.length)
      ]), t.cached.push(null));
    });
  }
}, Cb = (e, t) => {
  if (e.type === 1) {
    for (const r of e.props)
      if (r.type === 7 && r.name === "bind" && (!r.exp || // #13930 :foo in in-DOM templates will be parsed into :foo="" by browser
      r.exp.type === 4 && !r.exp.content.trim()) && r.arg) {
        const n = r.arg;
        if (n.type !== 4 || !n.isStatic)
          t.onError(
            Re(
              53,
              n.loc
            )
          ), r.exp = ce("", !0, n.loc);
        else {
          const i = Ie(n.content);
          (uh.test(i[0]) || // allow hyphen first char for https://github.com/vuejs/language-tools/pull/3424
          i[0] === "-") && (r.exp = ce(i, !1, n.loc));
        }
      }
  }
};
function Ob(e) {
  return [
    [
      Cb,
      Ib,
      ab,
      Rb,
      ub,
      Nb,
      vb,
      gb,
      hb,
      wb
    ],
    {
      on: Oh,
      bind: Eb,
      model: Ph
    }
  ];
}
function Pb(e, t = {}) {
  const r = t.onError || dl, n = t.mode === "module";
  t.prefixIdentifiers === !0 ? r(Re(48)) : n && r(Re(49));
  const i = !1;
  t.cacheHandlers && r(Re(50)), t.scopeId && !n && r(Re(51));
  const s = fe({}, t, {
    prefixIdentifiers: i
  }), o = ae(e) ? F0(e, s) : e, [a, l] = Ob();
  return V0(
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
  ), K0(o, s);
}
const Mb = () => ({ props: [] });
/**
* @vue/compiler-dom v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const Mh = /* @__PURE__ */ Symbol(""), Dh = /* @__PURE__ */ Symbol(
  ""
), kh = /* @__PURE__ */ Symbol(""), Lh = /* @__PURE__ */ Symbol(
  ""
), ha = /* @__PURE__ */ Symbol(
  ""
), jh = /* @__PURE__ */ Symbol(
  ""
), Fh = /* @__PURE__ */ Symbol(
  ""
), Bh = /* @__PURE__ */ Symbol(""), Uh = /* @__PURE__ */ Symbol(""), $h = /* @__PURE__ */ Symbol(
  ""
);
u0({
  [Mh]: "vModelRadio",
  [Dh]: "vModelCheckbox",
  [kh]: "vModelText",
  [Lh]: "vModelSelect",
  [ha]: "vModelDynamic",
  [jh]: "withModifiers",
  [Fh]: "withKeys",
  [Bh]: "vShow",
  [Uh]: "Transition",
  [$h]: "TransitionGroup"
});
let zr;
function Db(e, t = !1) {
  return zr || (zr = document.createElement("div")), t ? (zr.innerHTML = `<div foo="${e.replace(/"/g, "&quot;")}">`, zr.children[0].getAttribute("foo")) : (zr.innerHTML = e, zr.textContent);
}
const kb = {
  parseMode: "html",
  isVoidTag: sm,
  isNativeTag: (e) => rm(e) || nm(e) || im(e),
  isPreTag: (e) => e === "pre",
  isIgnoreNewlineTag: (e) => e === "pre" || e === "textarea",
  decodeEntities: Db,
  isBuiltInComponent: (e) => {
    if (e === "Transition" || e === "transition")
      return Uh;
    if (e === "TransitionGroup" || e === "transition-group")
      return $h;
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
}, Lb = (e) => {
  e.type === 1 && e.props.forEach((t, r) => {
    t.type === 6 && t.name === "style" && t.value && (e.props[r] = {
      type: 7,
      name: "bind",
      arg: ce("style", !0, t.loc),
      exp: jb(t.value.content, t.loc),
      modifiers: [],
      loc: t.loc
    });
  });
}, jb = (e, t) => {
  const r = Hu(e);
  return ce(
    JSON.stringify(r),
    !1,
    t,
    3
  );
};
function br(e, t) {
  return Re(
    e,
    t
  );
}
const Fb = (e, t, r) => {
  const { exp: n, loc: i } = e;
  return n || r.onError(
    br(54, i)
  ), t.children.length && (r.onError(
    br(55, i)
  ), t.children.length = 0), {
    props: [
      je(
        ce("innerHTML", !0, i),
        n || ce("", !0)
      )
    ]
  };
}, Bb = (e, t, r) => {
  const { exp: n, loc: i } = e;
  return n || r.onError(
    br(56, i)
  ), t.children.length && (r.onError(
    br(57, i)
  ), t.children.length = 0), {
    props: [
      je(
        ce("textContent", !0),
        n ? dt(n, r) > 0 ? n : Ue(
          r.helperString(lo),
          [n],
          i
        ) : ce("", !0)
      )
    ]
  };
}, Ub = (e, t, r) => {
  const n = Ph(e, t, r);
  if (!n.props.length || t.tagType === 1)
    return n;
  e.arg && r.onError(
    br(
      59,
      e.arg.loc
    )
  );
  const { tag: i } = t, s = r.isCustomElement(i);
  if (i === "input" || i === "textarea" || i === "select" || s) {
    let o = kh, a = !1;
    if (i === "input" || s) {
      const l = co(t, "type");
      if (l) {
        if (l.type === 7)
          o = ha;
        else if (l.value)
          switch (l.value.content) {
            case "radio":
              o = Mh;
              break;
            case "checkbox":
              o = Dh;
              break;
            case "file":
              a = !0, r.onError(
                br(
                  60,
                  e.loc
                )
              );
              break;
          }
      } else S0(t) && (o = ha);
    } else i === "select" && (o = Lh);
    a || (n.needRuntime = r.helper(o));
  } else
    r.onError(
      br(
        58,
        e.loc
      )
    );
  return n.props = n.props.filter(
    (o) => !(o.key.type === 4 && o.key.content === "modelValue")
  ), n;
}, $b = /* @__PURE__ */ Ze("passive,once,capture"), Vb = /* @__PURE__ */ Ze(
  // event propagation management
  "stop,prevent,self,ctrl,shift,alt,meta,exact,middle"
), Qb = /* @__PURE__ */ Ze("left,right"), Vh = /* @__PURE__ */ Ze("onkeyup,onkeydown,onkeypress"), Hb = (e, t, r, n) => {
  const i = [], s = [], o = [];
  for (let a = 0; a < t.length; a++) {
    const l = t[a].content;
    l === "native" && Pi(
      "COMPILER_V_ON_NATIVE",
      r
    ) || $b(l) ? o.push(l) : Qb(l) ? lt(e) ? Vh(e.content.toLowerCase()) ? i.push(l) : s.push(l) : (i.push(l), s.push(l)) : Vb(l) ? s.push(l) : i.push(l);
  }
  return {
    keyModifiers: i,
    nonKeyModifiers: s,
    eventOptionModifiers: o
  };
}, pu = (e, t) => lt(e) && e.content.toLowerCase() === "onclick" ? ce(t, !0) : e.type !== 4 ? Nt([
  "(",
  e,
  `) === "onClick" ? "${t}" : (`,
  e,
  ")"
]) : e, qb = (e, t, r) => Oh(e, t, r, (n) => {
  const { modifiers: i } = e;
  if (!i.length) return n;
  let { key: s, value: o } = n.props[0];
  const { keyModifiers: a, nonKeyModifiers: l, eventOptionModifiers: h } = Hb(s, i, r, e.loc);
  if (l.includes("right") && (s = pu(s, "onContextmenu")), l.includes("middle") && (s = pu(s, "onMouseup")), l.length && (o = Ue(r.helper(jh), [
    o,
    JSON.stringify(l)
  ])), a.length && // if event name is dynamic, always wrap with keys guard
  (!lt(s) || Vh(s.content.toLowerCase())) && (o = Ue(r.helper(Fh), [
    o,
    JSON.stringify(a)
  ])), h.length) {
    const p = h.map(qr).join("");
    s = lt(s) ? ce(`${s.content}${p}`, !0) : Nt(["(", s, `) + "${p}"`]);
  }
  return {
    props: [je(s, o)]
  };
}), Kb = (e, t, r) => {
  const { exp: n, loc: i } = e;
  return n || r.onError(
    br(62, i)
  ), {
    props: [],
    needRuntime: r.helper(Bh)
  };
}, Wb = (e, t) => {
  e.type === 1 && e.tagType === 0 && (e.tag === "script" || e.tag === "style") && t.removeNode();
}, Gb = [
  Lb
], zb = {
  cloak: Mb,
  html: Fb,
  text: Bb,
  model: Ub,
  // override compiler-core
  on: qb,
  // override compiler-core
  show: Kb
};
function Yb(e, t = {}) {
  return Pb(
    e,
    fe({}, kb, t, {
      nodeTransforms: [
        // ignore <script> and <tag>
        // this is not put inside DOMNodeTransforms because that list is used
        // by compiler-ssr to generate vnode fallback branches
        Wb,
        ...Gb,
        ...t.nodeTransforms || []
      ],
      directiveTransforms: fe(
        {},
        zb,
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
const mu = /* @__PURE__ */ Object.create(null);
function Xb(e, t) {
  if (!ae(e))
    if (e.nodeType)
      e = e.innerHTML;
    else
      return Qe;
  const r = Hp(e, t), n = mu[r];
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
  const { code: s } = Yb(e, i), o = new Function("Vue", s)(i0);
  return o._rc = !0, mu[r] = o;
}
wd(Xb);
const Jb = `PREFIX : <http://example/>

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
    const e = /* @__PURE__ */ Ee(Jb), t = /* @__PURE__ */ Ee(""), r = /* @__PURE__ */ Ee(!1), n = /* @__PURE__ */ Ee([]), i = /* @__PURE__ */ Ee(!0), s = /* @__PURE__ */ Ee("Ready"), o = /* @__PURE__ */ Ee(""), a = /* @__PURE__ */ Ee(null), l = /* @__PURE__ */ Ee(null), h = /* @__PURE__ */ Ee(null), p = /* @__PURE__ */ Ee(null), c = /* @__PURE__ */ Ee(null), m = /* @__PURE__ */ Ee("editor"), _ = /* @__PURE__ */ Ee([]), v = /* @__PURE__ */ Ee(!1), I = /* @__PURE__ */ Ee(500), k = /* @__PURE__ */ Ee([]), L = Wt(() => {
      const O = _.value;
      return {
        total: O.length,
        passed: O.filter(($) => $.status === "pass").length,
        failed: O.filter(($) => $.status === "fail").length,
        errors: O.filter(($) => $.status === "error").length,
        skipped: O.filter(($) => $.status === "skipped").length
      };
    }), A = Wt(() => {
      const O = L.value;
      return v.value ? "running" : O.errors > 0 || O.failed > 0 ? "error" : O.passed > 0 ? "done" : "";
    }), x = Wt(() => {
      const O = L.value;
      if (v.value) {
        const V = _.value.find((W) => W.status === "running");
        return "Running: " + (V ? V.name : "...");
      }
      const $ = [];
      return O.passed > 0 && $.push(O.passed + " passed"), O.failed > 0 && $.push(O.failed + " failed"), O.errors > 0 && $.push(O.errors + " errors"), O.skipped > 0 && $.push(O.skipped + " skipped"), $.join(", ") || "No results";
    });
    async function T() {
      if (!(k.value.length > 0))
        try {
          const [O, $] = await Promise.all([
            fetch("examples/index.json").then((W) => W.json()),
            fetch("examples/results.json").then((W) => W.json()).catch(() => [])
          ]), V = {};
          for (const W of $) V[W.file] = W;
          k.value = O, _.value = O.map((W) => {
            const K = V[W.file];
            if (W.expectedError) return { ...W, status: "skipped", count: -1, ms: -1, error: null };
            if (K && K.error) return { ...W, status: "error", count: -1, ms: K.ms || -1, error: K.error };
            if (K && !K.error) {
              const J = W.goldenCount >= 0 ? K.count === W.goldenCount : null;
              return { ...W, status: J === !0 ? "pass" : J === !1 ? "fail" : "idle", count: K.count, ms: K.ms || -1, error: null };
            }
            return { ...W, status: "idle", count: -1, ms: -1, error: null };
          });
        } catch (O) {
          console.error("Failed to load examples:", O);
        }
    }
    async function S(O) {
      try {
        const $ = await fetch(`examples/${O.file}`);
        if (!$.ok) return;
        const V = await $.text();
        e.value = V, t.value = "", F(), m.value = "editor";
      } catch {
      }
    }
    async function C(O) {
      const $ = _.value.indexOf(O);
      if ($ === -1) return;
      O.status = "running", _.value[$] = { ...O }, _.value = [..._.value];
      const V = performance.now();
      try {
        const W = await fetch(`examples/${O.file}`);
        if (!W.ok) throw new Error(`HTTP ${W.status}`);
        const K = await W.text(), { count: J, ms: te } = await window.ShaclEngine.runInWorker({ shaclQuery: K, turtleData: "" }), y = te || Math.round(performance.now() - V), u = O.goldenCount >= 0 ? J === O.goldenCount : null;
        O.status = O.expectedError || u === !0 ? "pass" : "fail", O.count = J, O.ms = y, O.error = null;
      } catch (W) {
        O.status = O.expectedError ? "pass" : "error", O.count = -1, O.ms = Math.round(performance.now() - V), O.error = W.message;
      }
      _.value[$] = { ...O };
    }
    async function D() {
      v.value = !0, await Lr(), await new Promise((O) => setTimeout(O, 100));
      for (const O of _.value)
        await C(O), await new Promise(($) => setTimeout($, 50));
      v.value = !1;
    }
    const j = /* @__PURE__ */ Ee(420), b = /* @__PURE__ */ Ee(260), w = /* @__PURE__ */ Ee(!1), P = /* @__PURE__ */ Ee(!1);
    function R(O) {
      w.value = !0;
      const $ = O.clientY, V = j.value, W = (J) => {
        j.value = Math.max(120, V + (J.clientY - $));
      }, K = () => {
        w.value = !1, document.removeEventListener("mousemove", W), document.removeEventListener("mouseup", K);
      };
      document.addEventListener("mousemove", W), document.addEventListener("mouseup", K);
    }
    function Q(O) {
      P.value = !0;
      const $ = O.clientY, V = b.value, W = (J) => {
        b.value = Math.max(80, V + (J.clientY - $));
      }, K = () => {
        P.value = !1, document.removeEventListener("mousemove", W), document.removeEventListener("mouseup", K);
      };
      document.addEventListener("mousemove", W), document.addEventListener("mouseup", K);
    }
    const Y = /* @__PURE__ */ Ee([]), Z = Wt(() => {
      const O = Y.value;
      return { total: O.length, passed: O.filter(($) => $.status === "pass").length, failed: O.filter(($) => $.status === "fail").length, skipped: O.filter(($) => $.status === "skipped").length };
    }), z = Wt(() => Z.value.failed > 0 ? "error" : Z.value.passed > 0 ? "done" : ""), ne = Wt(() => {
      const O = Z.value;
      return O.total > 0 ? O.passed + "/" + O.total + " passed" + (O.failed > 0 ? ", " + O.failed + " failed" : "") + (O.skipped > 0 ? ", " + O.skipped + " skipped" : "") : "";
    });
    async function re() {
      if (!(Y.value.length > 0))
        try {
          Y.value = await (await fetch("shacl-conformance.json")).json();
        } catch {
        }
    }
    async function _e(O) {
      try {
        const $ = await fetch(`w3c-tests/${O.cat}/${O.file}`);
        if (!$.ok) return;
        e.value = await $.text(), t.value = "", F(), m.value = "editor";
      } catch {
      }
    }
    const se = /* @__PURE__ */ Ee([]), ie = /* @__PURE__ */ Ee(!1), me = /* @__PURE__ */ Ee(null);
    function Ut(O) {
      m.value = O;
      const V = "#" + { editor: "/editor", examples: "/examples-tests", conformance: "/shacl-conformance-tests" }[O];
      location.hash !== V && history.pushState(null, null, V), O === "examples" && T(), O === "conformance" && re();
    }
    function Ot() {
      const O = location.hash;
      O === "#/examples-tests" ? m.value = "examples" : O === "#/shacl-conformance-tests" ? m.value = "conformance" : m.value = "editor", !(O.startsWith("#query=") || O.startsWith("#data=")) && O.startsWith("#/");
      const V = O.slice(1).split("&").reduce((W, K) => {
        const J = K.match(/^([^=]+)=(.*)/);
        return J && (W[decodeURIComponent(J[1])] = decodeURIComponent(J[2])), W;
      }, {});
      V.query !== void 0 && (e.value = V.query), V.data !== void 0 && (t.value = V.data);
    }
    function $t() {
      if (m.value !== "editor") return;
      let $ = "#" + { editor: "/editor", examples: "/examples-tests", conformance: "/shacl-conformance-tests" }[m.value];
      const V = [], W = encodeURIComponent(e.value).replace(/\(/g, "%28").replace(/\)/g, "%29");
      if (V.push("query=" + W), t.value) {
        const K = encodeURIComponent(t.value).replace(/\(/g, "%28").replace(/\)/g, "%29");
        V.push("data=" + K);
      }
      $ += "&" + V.join("&"), history.replaceState(null, null, $);
    }
    vn(async () => {
      Ot(), window.addEventListener("popstate", Ot), m.value === "examples" && T(), m.value === "conformance" && re();
      try {
        const O = await fetch("./examples/index.json");
        se.value = await O.json();
      } catch (O) {
        console.warn("Could not load examples index:", O);
      }
      document.addEventListener("click", we), _r([e, t], $t, { flush: "post" });
    }), Sn(() => {
      document.removeEventListener("click", we), window.removeEventListener("popstate", Ot);
    });
    function we(O) {
      me.value && !me.value.contains(O.target) && (ie.value = !1);
    }
    function $e() {
      ie.value = !ie.value;
    }
    async function Fe(O) {
      ie.value = !1;
      try {
        const V = await (await fetch(`./examples/${O.file}`)).text();
        e.value = V.trim(), t.value = "", n.value = [], i.value = !0, s.value = `Loaded: ${O.name}`, o.value = "";
      } catch {
        s.value = "Failed to load example.", o.value = "error";
      }
    }
    function mt(O) {
      h.value = O;
    }
    function et(O) {
      const $ = O.trim().split(`
`), V = $.filter((te) => /^\s*(PREFIX|@prefix)\s/i.test(te)), W = $.filter((te) => te.trim() && !/^\s*(PREFIX|@prefix)\s/i.test(te) && !te.trim().startsWith("#"));
      for (const te of V) {
        const y = te.match(/PREFIX\s+(\S+)\s+/i);
        y && !e.value.includes(y[1]) && (e.value = te.trim() + `
` + e.value);
      }
      const J = `DATA {${W.length ? `
  ` + W.join(`
  `) + `
` : `
`}}`;
      if (/DATA\s*\{[\s\S]*?\}/.test(e.value))
        e.value = e.value.replace(/DATA\s*\{[\s\S]*?\}/, J);
      else {
        const te = e.value.split(`
`);
        let y = 0;
        for (let u = 0; u < te.length; u++)
          te[u].trim().toUpperCase().startsWith("PREFIX") && (y = u + 1);
        te.splice(y, 0, "", J), e.value = te.join(`
`);
      }
    }
    _r(t, (O) => et(O));
    function vt() {
      l.value.click();
    }
    function G(O) {
      const $ = O.target.files[0];
      if (!$) return;
      const V = new FileReader();
      V.onload = (W) => {
        t.value = W.target.result, O.target.value = "";
      }, V.readAsText($);
    }
    const f = Wt(() => n.value.filter((O) => !O.error).length);
    function g(O) {
      return O.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
    function N(O) {
      return O ? /^(https?:|urn:)/.test(O) ? `<span class="uri">&lt;${g(O)}&gt;</span>` : `<span class="literal">${g(O)}</span>` : '<em style="color:#475569">default graph</em>';
    }
    function F() {
      n.value = [], i.value = !0, s.value = "Ready", o.value = "", p.value = null, c.value = null;
    }
    function U() {
      const O = n.value.filter((E) => !E.error);
      if (!O.length) return;
      const $ = e.value.split(`
`).filter((E) => /^\s*PREFIX\s+/i.test(E)).map((E) => E.trim()), V = {};
      for (const E of $) {
        const M = E.match(/PREFIX\s+(\S+)\s*<([^>]+)>/i);
        M && (V[M[1]] = M[2]);
      }
      function W(E) {
        if (!E) return "[]";
        for (const [M, B] of Object.entries(V))
          if (E.startsWith(B)) return M + E.slice(B.length);
        return `<${E}>`;
      }
      function K(E) {
        if (!E) return null;
        if (/^(https?:|urn:|[a-z][a-z0-9+\-.]*:\/\/)/.test(E)) return W(E);
        if (E.includes("^^")) {
          const [M, B] = E.split("^^");
          return `"${M}"^^${W(B)}`;
        }
        return `"${E.replace(/"/g, '\\"')}"`;
      }
      const J = O.map((E) => {
        const M = K(E.subject), B = K(E.predicate), q = K(E.object);
        return !M || !B || !q ? null : `${M} ${B} ${q} .`;
      }).filter(Boolean), te = [
        "# Inferred triples exported from SHACL Rules Inference UI",
        "",
        ...$,
        $.length ? "" : null,
        ...J
      ].filter((E) => E !== null).join(`
`) + `
`, y = new Blob([te], { type: "text/turtle" }), u = URL.createObjectURL(y), d = document.createElement("a");
      d.href = u, d.download = "inferred.ttl", d.click(), URL.revokeObjectURL(u);
    }
    async function H(O) {
      if (!O.error) {
        c.value = { triple: O, loading: !0, results: [] };
        try {
          const $ = await window.ShaclEngine.explainTriple(e.value.trim(), O);
          c.value = { triple: O, loading: !1, results: $ };
        } catch ($) {
          c.value = { triple: O, loading: !1, results: [], error: $.message };
        }
      }
    }
    async function X() {
      if (!e.value.trim()) {
        s.value = "Please enter a SHACL query.", o.value = "error";
        return;
      }
      r.value = !0, n.value = [], i.value = !1, p.value = null, c.value = null, s.value = "Running…", o.value = "running", await Lr();
      const O = performance.now(), $ = 2e3;
      let V = 0;
      try {
        await window.ShaclEngine.runShaclQuery(
          { shaclQuery: e.value.trim(), turtleData: t.value },
          (J) => {
            V++, n.value.length < $ && n.value.push(J);
          }
        ), await Lr();
        const W = n.value.filter((J) => J.error).length, K = V - W;
        p.value = Math.round(performance.now() - O), W > 0 ? (s.value = `Done with errors — ${K} triple${K !== 1 ? "s" : ""} inferred`, o.value = "error") : V > $ ? (s.value = `Done — ${K} triples inferred (showing first ${$})`, o.value = "done") : (s.value = `Done — ${K} triple${K !== 1 ? "s" : ""} inferred`, o.value = "done");
      } catch (W) {
        s.value = "Inference failed: " + W.message, o.value = "error", console.error(W);
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
      goodRows: f,
      statusText: s,
      statusClass: o,
      scroll: a,
      fileInput: l,
      modal: h,
      execTime: p,
      provenance: c,
      editorHeight: j,
      resultsHeight: b,
      draggingEditor: w,
      draggingResults: P,
      startResizeEditor: R,
      startResizeResults: Q,
      examples: se,
      showExamples: ie,
      examplesBtn: me,
      fmt: N,
      clearResults: F,
      runQuery: X,
      triggerFileUpload: vt,
      handleFileUpload: G,
      showModal: mt,
      toggleExamples: $e,
      loadExample: Fe,
      clickRow: H,
      downloadTurtle: U,
      activeTab: m,
      exampleResults: _,
      exampleRunning: v,
      exampleResultsHeight: I,
      exampleStatusClass: A,
      exampleStatusText: x,
      exampleStats: L,
      loadExamplesDashboard: T,
      runAllExamples: D,
      runExample: C,
      openExampleInEditor: S,
      loadShaclConformance: re,
      shaclConfResults: Y,
      shaclConfStats: Z,
      shaclConfStatusClass: z,
      shaclConfStatusText: ne,
      openConfTest: _e,
      switchTab: Ut
    };
  }
}).mount("#app");
