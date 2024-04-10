var D = (t, e, r) => {
  if (!e.has(t))
    throw TypeError("Cannot " + r);
};
var c = (t, e, r) => (D(t, e, "read from private field"), r ? r.call(t) : e.get(t)), g = (t, e, r) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, r);
}, p = (t, e, r, s) => (D(t, e, "write to private field"), s ? s.call(t, r) : e.set(t, r), r);
import { UmbControllerBase as v } from "@umbraco-cms/backoffice/class-api";
import { tryExecuteAndNotify as R } from "@umbraco-cms/backoffice/resources";
import { UmbContextToken as x } from "@umbraco-cms/backoffice/context-api";
import { UmbObjectState as I } from "@umbraco-cms/backoffice/observable-api";
import { UMB_AUTH_CONTEXT as H } from "@umbraco-cms/backoffice/auth";
class C extends Error {
  constructor(e, r, s) {
    super(s), this.name = "ApiError", this.url = r.url, this.status = r.status, this.statusText = r.statusText, this.body = r.body, this.request = e;
  }
}
class U extends Error {
  constructor(e) {
    super(e), this.name = "CancelError";
  }
  get isCancelled() {
    return !0;
  }
}
class B {
  constructor(e) {
    this._isResolved = !1, this._isRejected = !1, this._isCancelled = !1, this.cancelHandlers = [], this.promise = new Promise((r, s) => {
      this._resolve = r, this._reject = s;
      const a = (o) => {
        this._isResolved || this._isRejected || this._isCancelled || (this._isResolved = !0, this._resolve && this._resolve(o));
      }, n = (o) => {
        this._isResolved || this._isRejected || this._isCancelled || (this._isRejected = !0, this._reject && this._reject(o));
      }, i = (o) => {
        this._isResolved || this._isRejected || this._isCancelled || this.cancelHandlers.push(o);
      };
      return Object.defineProperty(i, "isResolved", {
        get: () => this._isResolved
      }), Object.defineProperty(i, "isRejected", {
        get: () => this._isRejected
      }), Object.defineProperty(i, "isCancelled", {
        get: () => this._isCancelled
      }), e(a, n, i);
    });
  }
  get [Symbol.toStringTag]() {
    return "Cancellable Promise";
  }
  then(e, r) {
    return this.promise.then(e, r);
  }
  catch(e) {
    return this.promise.catch(e);
  }
  finally(e) {
    return this.promise.finally(e);
  }
  cancel() {
    if (!(this._isResolved || this._isRejected || this._isCancelled)) {
      if (this._isCancelled = !0, this.cancelHandlers.length)
        try {
          for (const e of this.cancelHandlers)
            e();
        } catch (e) {
          console.warn("Cancellation threw an error", e);
          return;
        }
      this.cancelHandlers.length = 0, this._reject && this._reject(new U("Request aborted"));
    }
  }
  get isCancelled() {
    return this._isCancelled;
  }
}
class A {
  constructor() {
    this._fns = [];
  }
  eject(e) {
    const r = this._fns.indexOf(e);
    r !== -1 && (this._fns = [
      ...this._fns.slice(0, r),
      ...this._fns.slice(r + 1)
    ]);
  }
  use(e) {
    this._fns = [...this._fns, e];
  }
}
const m = {
  BASE: "",
  CREDENTIALS: "include",
  ENCODE_PATH: void 0,
  HEADERS: void 0,
  PASSWORD: void 0,
  TOKEN: void 0,
  USERNAME: void 0,
  VERSION: "Latest",
  WITH_CREDENTIALS: !1,
  interceptors: {
    request: new A(),
    response: new A()
  }
}, b = (t) => typeof t == "string", E = (t) => b(t) && t !== "", S = (t) => t instanceof Blob, N = (t) => t instanceof FormData, L = (t) => {
  try {
    return btoa(t);
  } catch {
    return Buffer.from(t).toString("base64");
  }
}, k = (t) => {
  const e = [], r = (a, n) => {
    e.push(`${encodeURIComponent(a)}=${encodeURIComponent(String(n))}`);
  }, s = (a, n) => {
    n != null && (Array.isArray(n) ? n.forEach((i) => s(a, i)) : typeof n == "object" ? Object.entries(n).forEach(([i, o]) => s(`${a}[${i}]`, o)) : r(a, n));
  };
  return Object.entries(t).forEach(([a, n]) => s(a, n)), e.length ? `?${e.join("&")}` : "";
}, M = (t, e) => {
  const r = t.ENCODE_PATH || encodeURI, s = e.url.replace("{api-version}", t.VERSION).replace(/{(.*?)}/g, (n, i) => {
    var o;
    return (o = e.path) != null && o.hasOwnProperty(i) ? r(String(e.path[i])) : n;
  }), a = t.BASE + s;
  return e.query ? a + k(e.query) : a;
}, $ = (t) => {
  if (t.formData) {
    const e = new FormData(), r = (s, a) => {
      b(a) || S(a) ? e.append(s, a) : e.append(s, JSON.stringify(a));
    };
    return Object.entries(t.formData).filter(([, s]) => s != null).forEach(([s, a]) => {
      Array.isArray(a) ? a.forEach((n) => r(s, n)) : r(s, a);
    }), e;
  }
}, T = async (t, e) => typeof e == "function" ? e(t) : e, F = async (t, e) => {
  const [r, s, a, n] = await Promise.all([
    T(e, t.TOKEN),
    T(e, t.USERNAME),
    T(e, t.PASSWORD),
    T(e, t.HEADERS)
  ]), i = Object.entries({
    Accept: "application/json",
    ...n,
    ...e.headers
  }).filter(([, o]) => o != null).reduce((o, [l, d]) => ({
    ...o,
    [l]: String(d)
  }), {});
  if (E(r) && (i.Authorization = `Bearer ${r}`), E(s) && E(a)) {
    const o = L(`${s}:${a}`);
    i.Authorization = `Basic ${o}`;
  }
  return e.body !== void 0 && (e.mediaType ? i["Content-Type"] = e.mediaType : S(e.body) ? i["Content-Type"] = e.body.type || "application/octet-stream" : b(e.body) ? i["Content-Type"] = "text/plain" : N(e.body) || (i["Content-Type"] = "application/json")), new Headers(i);
}, G = (t) => {
  var e, r;
  if (t.body !== void 0)
    return (e = t.mediaType) != null && e.includes("application/json") || (r = t.mediaType) != null && r.includes("+json") ? JSON.stringify(t.body) : b(t.body) || S(t.body) || N(t.body) ? t.body : JSON.stringify(t.body);
}, V = async (t, e, r, s, a, n, i) => {
  const o = new AbortController();
  let l = {
    headers: n,
    body: s ?? a,
    method: e.method,
    signal: o.signal
  };
  t.WITH_CREDENTIALS && (l.credentials = t.CREDENTIALS);
  for (const d of t.interceptors.request._fns)
    l = await d(l);
  return i(() => o.abort()), await fetch(r, l);
}, W = (t, e) => {
  if (e) {
    const r = t.headers.get(e);
    if (b(r))
      return r;
  }
}, z = async (t) => {
  if (t.status !== 204)
    try {
      const e = t.headers.get("Content-Type");
      if (e) {
        const r = ["application/octet-stream", "application/pdf", "application/zip", "audio/", "image/", "video/"];
        if (e.includes("application/json") || e.includes("+json"))
          return await t.json();
        if (r.some((s) => e.includes(s)))
          return await t.blob();
        if (e.includes("multipart/form-data"))
          return await t.formData();
        if (e.includes("text/"))
          return await t.text();
      }
    } catch (e) {
      console.error(e);
    }
}, J = (t, e) => {
  const s = {
    400: "Bad Request",
    401: "Unauthorized",
    402: "Payment Required",
    403: "Forbidden",
    404: "Not Found",
    405: "Method Not Allowed",
    406: "Not Acceptable",
    407: "Proxy Authentication Required",
    408: "Request Timeout",
    409: "Conflict",
    410: "Gone",
    411: "Length Required",
    412: "Precondition Failed",
    413: "Payload Too Large",
    414: "URI Too Long",
    415: "Unsupported Media Type",
    416: "Range Not Satisfiable",
    417: "Expectation Failed",
    418: "Im a teapot",
    421: "Misdirected Request",
    422: "Unprocessable Content",
    423: "Locked",
    424: "Failed Dependency",
    425: "Too Early",
    426: "Upgrade Required",
    428: "Precondition Required",
    429: "Too Many Requests",
    431: "Request Header Fields Too Large",
    451: "Unavailable For Legal Reasons",
    500: "Internal Server Error",
    501: "Not Implemented",
    502: "Bad Gateway",
    503: "Service Unavailable",
    504: "Gateway Timeout",
    505: "HTTP Version Not Supported",
    506: "Variant Also Negotiates",
    507: "Insufficient Storage",
    508: "Loop Detected",
    510: "Not Extended",
    511: "Network Authentication Required",
    ...t.errors
  }[e.status];
  if (s)
    throw new C(t, e, s);
  if (!e.ok) {
    const a = e.status ?? "unknown", n = e.statusText ?? "unknown", i = (() => {
      try {
        return JSON.stringify(e.body, null, 2);
      } catch {
        return;
      }
    })();
    throw new C(
      t,
      e,
      `Generic Error: status: ${a}; status text: ${n}; body: ${i}`
    );
  }
}, _ = (t, e) => new B(async (r, s, a) => {
  try {
    const n = M(t, e), i = $(e), o = G(e), l = await F(t, e);
    if (!a.isCancelled) {
      let d = await V(t, e, n, o, i, l, a);
      for (const q of t.interceptors.response._fns)
        d = await q(d);
      const j = await z(d), O = W(d, e.responseHeader), w = {
        url: n,
        ok: d.ok,
        status: d.status,
        statusText: d.statusText,
        body: O ?? j
      };
      J(e, w), r(w.body);
    }
  } catch (n) {
    s(n);
  }
});
class P {
  /**
   * @returns unknown Success
   * @throws ApiError
   */
  static checkPage(e = {}) {
    const {
      pageGuid: r
    } = e;
    return _(m, {
      method: "GET",
      url: "/umbraco/sustainability/api/v1/checkPage",
      query: {
        pageGuid: r
      }
    });
  }
  /**
   * @returns unknown Success
   * @throws ApiError
   */
  static getPageData(e = {}) {
    const {
      pageGuid: r
    } = e;
    return _(m, {
      method: "GET",
      url: "/umbraco/sustainability/api/v1/getPageData",
      query: {
        pageGuid: r
      }
    });
  }
  /**
   * @returns boolean Success
   * @throws ApiError
   */
  static savePageData(e = {}) {
    const {
      pageGuid: r,
      requestBody: s
    } = e;
    return _(m, {
      method: "POST",
      url: "/umbraco/sustainability/api/v1/savePageData",
      query: {
        pageGuid: r
      },
      body: s,
      mediaType: "application/json"
    });
  }
}
var u;
class K {
  constructor(e) {
    g(this, u, void 0);
    p(this, u, e);
  }
  async checkPage(e) {
    return await R(c(this, u), P.checkPage({ pageGuid: e }));
  }
  async getPageData(e) {
    return await R(c(this, u), P.getPageData({ pageGuid: e }));
  }
  async savePageData(e, r) {
    return await R(c(this, u), P.savePageData({
      pageGuid: e,
      requestBody: r
    }));
  }
}
u = new WeakMap();
var h;
class X extends v {
  constructor(r) {
    super(r);
    g(this, h, void 0);
    p(this, h, new K(this)), console.log("repository constructor");
  }
  async checkPage(r) {
    return c(this, h).checkPage(r);
  }
  async getPageData(r) {
    return c(this, h).getPageData(r);
  }
  async savePageData(r, s) {
    return c(this, h).savePageData(r, s);
  }
}
h = new WeakMap();
var y, f;
class Q extends v {
  constructor(r) {
    super(r);
    g(this, y, void 0);
    g(this, f, void 0);
    p(this, f, new I(void 0)), this.pageData = c(this, f).asObservable(), this.provideContext(Y, this), p(this, y, new X(this)), this.consumeContext(H, (s) => {
      m.TOKEN = () => s.getLatestToken(), m.WITH_CREDENTIALS = !0;
    });
  }
  async checkPage(r, s = !0) {
    const { data: a } = await c(this, y).checkPage(r);
    a && (c(this, f).setValue(a), s || await this.savePageData(r, a));
  }
  async getPageData(r, s = !0) {
    const { data: a } = await c(this, y).getPageData(r);
    a && (c(this, f).setValue(a), s || await this.savePageData(r, a));
  }
  async savePageData(r, s) {
    return await c(this, y).savePageData(r, s);
  }
}
y = new WeakMap(), f = new WeakMap();
const Y = new x(Q.name);
export {
  Y as SUSTAINABILITY_MANAGEMENT_CONTEXT_TOKEN,
  Q as SustainabilityManagementContext,
  Q as default
};
//# sourceMappingURL=sustainability.context-D88U9CSt.js.map
