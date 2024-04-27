var j = (t, e, a) => {
  if (!e.has(t))
    throw TypeError("Cannot " + a);
};
var c = (t, e, a) => (j(t, e, "read from private field"), a ? a.call(t) : e.get(t)), b = (t, e, a) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, a);
}, p = (t, e, a, s) => (j(t, e, "write to private field"), s ? s.call(t, a) : e.set(t, a), a);
import { UMB_AUTH_CONTEXT as F } from "@umbraco-cms/backoffice/auth";
import { UmbControllerBase as x } from "@umbraco-cms/backoffice/class-api";
import { tryExecuteAndNotify as S } from "@umbraco-cms/backoffice/resources";
import { UmbContextToken as G } from "@umbraco-cms/backoffice/context-api";
import { UmbObjectState as E } from "@umbraco-cms/backoffice/observable-api";
import { UmbElementMixin as Y } from "@umbraco-cms/backoffice/element-api";
import { LitElement as z, html as J, property as K, customElement as X } from "@umbraco-cms/backoffice/external/lit";
const Q = {
  type: "workspaceView",
  alias: "Umbraco.Community.Sustainability.Workspace",
  name: "Sustainability Workspace",
  js: () => import("./sustainability-workspace-view-DNA9DSrM.js"),
  weight: 10,
  meta: {
    icon: "icon-eco",
    pathname: "sustainability",
    label: "Sustainability"
  },
  conditions: [
    {
      alias: "Umb.Condition.WorkspaceAlias",
      match: "Umb.Workspace.Document"
    }
  ]
}, Z = [Q], U = "overview-root", ee = {
  type: "menuItem",
  alias: "Sustainability.MenuItem.Overview",
  name: "Overview Menu Item",
  weight: 2e3,
  meta: {
    label: "Overview",
    icon: "icon-eco",
    entityType: U,
    menus: ["Umb.Menu.Sustainability"]
  }
}, te = [ee], ae = "Sustainability.Workspace.Overview", se = "Sustainability.Workspace.Context", ie = {
  type: "workspace",
  alias: ae,
  name: "Overview Root Workspace",
  js: () => import("./overview-workspace.element-CJHnQuKf.js"),
  meta: {
    entityType: U
  }
}, ne = {
  type: "workspaceContext",
  alias: se,
  name: "Stats Workspace Context",
  js: () => Promise.resolve().then(() => xe)
}, re = [
  ne,
  ie
], oe = [
  ...re,
  ...te
], k = "stats-root", ce = {
  type: "menuItem",
  alias: "Sustainability.MenuItem.Stats",
  name: "Stats Menu Item",
  weight: 1e3,
  meta: {
    label: "Stats",
    icon: "icon-chart",
    entityType: k,
    menus: ["Umb.Menu.Sustainability"]
  }
}, le = [ce], ue = "Sustainability.Workspace.Stats", de = {
  type: "workspace",
  alias: ue,
  name: "Stats Root Workspace",
  js: () => import("./stats-workspace.element-CjCVcF2l.js"),
  meta: {
    entityType: k
  }
}, he = [
  de
], ye = [
  ...he,
  ...le
], q = "Umb.Section.Sustainability", $ = "Umb.Menu.Sustainability", me = {
  type: "section",
  alias: q,
  name: "Sustainability Section",
  weight: 0,
  meta: {
    label: "Sustainability",
    pathname: "sustainability"
  }
}, be = {
  type: "menu",
  alias: $,
  name: "Sustainability Menu",
  meta: {
    label: "Sustainability"
  }
}, pe = {
  type: "sectionSidebarApp",
  kind: "menu",
  alias: "Umb.SectionSidebarMenu.Sustainability",
  name: "Sustainability Section Sidebar Menu",
  weight: 200,
  meta: {
    label: "Sustainability",
    menu: $
  },
  conditions: [
    {
      alias: "Umb.Condition.SectionAlias",
      match: q
    }
  ]
}, fe = [
  me,
  be,
  pe,
  ...oe,
  ...ye
], ge = [
  {
    type: "dashboard",
    alias: "Umb.Dashboard.Sustainability",
    name: "Sustainability Overview",
    elementName: "sustainability-overview-dashboard",
    js: () => import("./sustainability.dashboard.element-DPMJ5DuT.js"),
    meta: {
      label: "Overview",
      pathname: "overview"
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: "Umb.Section.Sustainability"
      }
    ]
  }
], ve = [...ge];
class I extends Error {
  constructor(e, a, s) {
    super(s), this.name = "ApiError", this.url = a.url, this.status = a.status, this.statusText = a.statusText, this.body = a.body, this.request = e;
  }
}
class Se extends Error {
  constructor(e) {
    super(e), this.name = "CancelError";
  }
  get isCancelled() {
    return !0;
  }
}
class we {
  constructor(e) {
    this._isResolved = !1, this._isRejected = !1, this._isCancelled = !1, this.cancelHandlers = [], this.promise = new Promise((a, s) => {
      this._resolve = a, this._reject = s;
      const i = (o) => {
        this._isResolved || this._isRejected || this._isCancelled || (this._isResolved = !0, this._resolve && this._resolve(o));
      }, n = (o) => {
        this._isResolved || this._isRejected || this._isCancelled || (this._isRejected = !0, this._reject && this._reject(o));
      }, r = (o) => {
        this._isResolved || this._isRejected || this._isCancelled || this.cancelHandlers.push(o);
      };
      return Object.defineProperty(r, "isResolved", {
        get: () => this._isResolved
      }), Object.defineProperty(r, "isRejected", {
        get: () => this._isRejected
      }), Object.defineProperty(r, "isCancelled", {
        get: () => this._isCancelled
      }), e(i, n, r);
    });
  }
  get [Symbol.toStringTag]() {
    return "Cancellable Promise";
  }
  then(e, a) {
    return this.promise.then(e, a);
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
      this.cancelHandlers.length = 0, this._reject && this._reject(new Se("Request aborted"));
    }
  }
  get isCancelled() {
    return this._isCancelled;
  }
}
class N {
  constructor() {
    this._fns = [];
  }
  eject(e) {
    const a = this._fns.indexOf(e);
    a !== -1 && (this._fns = [
      ...this._fns.slice(0, a),
      ...this._fns.slice(a + 1)
    ]);
  }
  use(e) {
    this._fns = [...this._fns, e];
  }
}
const y = {
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
    request: new N(),
    response: new N()
  }
}, D = (t) => typeof t == "string", R = (t) => D(t) && t !== "", C = (t) => t instanceof Blob, B = (t) => t instanceof FormData, Te = (t) => {
  try {
    return btoa(t);
  } catch {
    return Buffer.from(t).toString("base64");
  }
}, De = (t) => {
  const e = [], a = (i, n) => {
    e.push(`${encodeURIComponent(i)}=${encodeURIComponent(String(n))}`);
  }, s = (i, n) => {
    n != null && (Array.isArray(n) ? n.forEach((r) => s(i, r)) : typeof n == "object" ? Object.entries(n).forEach(([r, o]) => s(`${i}[${r}]`, o)) : a(i, n));
  };
  return Object.entries(t).forEach(([i, n]) => s(i, n)), e.length ? `?${e.join("&")}` : "";
}, _e = (t, e) => {
  const a = t.ENCODE_PATH || encodeURI, s = e.url.replace("{api-version}", t.VERSION).replace(/{(.*?)}/g, (n, r) => {
    var o;
    return (o = e.path) != null && o.hasOwnProperty(r) ? a(String(e.path[r])) : n;
  }), i = t.BASE + s;
  return e.query ? i + De(e.query) : i;
}, Ee = (t) => {
  if (t.formData) {
    const e = new FormData(), a = (s, i) => {
      D(i) || C(i) ? e.append(s, i) : e.append(s, JSON.stringify(i));
    };
    return Object.entries(t.formData).filter(([, s]) => s != null).forEach(([s, i]) => {
      Array.isArray(i) ? i.forEach((n) => a(s, n)) : a(s, i);
    }), e;
  }
}, _ = async (t, e) => typeof e == "function" ? e(t) : e, Re = async (t, e) => {
  const [a, s, i, n] = await Promise.all([
    _(e, t.TOKEN),
    _(e, t.USERNAME),
    _(e, t.PASSWORD),
    _(e, t.HEADERS)
  ]), r = Object.entries({
    Accept: "application/json",
    ...n,
    ...e.headers
  }).filter(([, o]) => o != null).reduce((o, [m, l]) => ({
    ...o,
    [m]: String(l)
  }), {});
  if (R(a) && (r.Authorization = `Bearer ${a}`), R(s) && R(i)) {
    const o = Te(`${s}:${i}`);
    r.Authorization = `Basic ${o}`;
  }
  return e.body !== void 0 && (e.mediaType ? r["Content-Type"] = e.mediaType : C(e.body) ? r["Content-Type"] = e.body.type || "application/octet-stream" : D(e.body) ? r["Content-Type"] = "text/plain" : B(e.body) || (r["Content-Type"] = "application/json")), new Headers(r);
}, Ae = (t) => {
  var e, a;
  if (t.body !== void 0)
    return (e = t.mediaType) != null && e.includes("application/json") || (a = t.mediaType) != null && a.includes("+json") ? JSON.stringify(t.body) : D(t.body) || C(t.body) || B(t.body) ? t.body : JSON.stringify(t.body);
}, Oe = async (t, e, a, s, i, n, r) => {
  const o = new AbortController();
  let m = {
    headers: n,
    body: s ?? i,
    method: e.method,
    signal: o.signal
  };
  t.WITH_CREDENTIALS && (m.credentials = t.CREDENTIALS);
  for (const l of t.interceptors.request._fns)
    m = await l(m);
  return r(() => o.abort()), await fetch(a, m);
}, Ce = (t, e) => {
  if (e) {
    const a = t.headers.get(e);
    if (D(a))
      return a;
  }
}, Pe = async (t) => {
  if (t.status !== 204)
    try {
      const e = t.headers.get("Content-Type");
      if (e) {
        const a = ["application/octet-stream", "application/pdf", "application/zip", "audio/", "image/", "video/"];
        if (e.includes("application/json") || e.includes("+json"))
          return await t.json();
        if (a.some((s) => e.includes(s)))
          return await t.blob();
        if (e.includes("multipart/form-data"))
          return await t.formData();
        if (e.includes("text/"))
          return await t.text();
      }
    } catch (e) {
      console.error(e);
    }
}, je = (t, e) => {
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
    throw new I(t, e, s);
  if (!e.ok) {
    const i = e.status ?? "unknown", n = e.statusText ?? "unknown", r = (() => {
      try {
        return JSON.stringify(e.body, null, 2);
      } catch {
        return;
      }
    })();
    throw new I(
      t,
      e,
      `Generic Error: status: ${i}; status text: ${n}; body: ${r}`
    );
  }
}, w = (t, e) => new we(async (a, s, i) => {
  try {
    const n = _e(t, e), r = Ee(e), o = Ae(e), m = await Re(t, e);
    if (!i.isCancelled) {
      let l = await Oe(t, e, n, o, r, m, i);
      for (const V of t.interceptors.response._fns)
        l = await V(l);
      const L = await Pe(l), W = Ce(l, e.responseHeader), P = {
        url: n,
        ok: l.ok,
        status: l.status,
        statusText: l.statusText,
        body: W ?? L
      };
      je(e, P), a(P.body);
    }
  } catch (n) {
    s(n);
  }
});
class T {
  /**
  * @returns unknown Success
  * @throws ApiError
  */
  static checkPage(e = {}) {
    const { pageGuid: a } = e;
    return w(y, {
      method: "GET",
      url: "/umbraco/sustainability/api/v1/checkPage",
      query: {
        pageGuid: a
      }
    });
  }
  /**
  * @returns unknown Success
  * @throws ApiError
  */
  static getAverageData() {
    return w(y, {
      method: "GET",
      url: "/umbraco/sustainability/api/v1/getAverageData"
    });
  }
  /**
  * @returns unknown Success
  * @throws ApiError
  */
  static getOverviewData(e = {}) {
    const { pageNumber: a, pageSize: s, orderBy: i, direction: n } = e;
    return w(y, {
      method: "GET",
      url: "/umbraco/sustainability/api/v1/getOverviewData",
      query: {
        pageNumber: a,
        pageSize: s,
        orderBy: i,
        direction: n
      }
    });
  }
  /**
  * @returns unknown Success
  * @throws ApiError
  */
  static getPageData(e = {}) {
    const { pageGuid: a } = e;
    return w(y, {
      method: "GET",
      url: "/umbraco/sustainability/api/v1/getPageData",
      query: {
        pageGuid: a
      }
    });
  }
  /**
  * @returns boolean Success
  * @throws ApiError
  */
  static savePageData(e = {}) {
    const { pageGuid: a, requestBody: s } = e;
    return w(y, {
      method: "POST",
      url: "/umbraco/sustainability/api/v1/savePageData",
      query: {
        pageGuid: a
      },
      body: s,
      mediaType: "application/json"
    });
  }
}
var u;
class Ie {
  constructor(e) {
    b(this, u, void 0);
    p(this, u, e);
  }
  async checkPage(e) {
    return await S(c(this, u), T.checkPage({ pageGuid: e }));
  }
  async getPageData(e) {
    return await S(c(this, u), T.getPageData({ pageGuid: e }));
  }
  async savePageData(e, a) {
    return await S(c(this, u), T.savePageData({
      pageGuid: e,
      requestBody: a
    }));
  }
  async getOverviewData(e, a, s, i) {
    return await S(c(this, u), T.getOverviewData({ direction: e, orderBy: a, pageNumber: s, pageSize: i }));
  }
  async getAverageData() {
    return await S(c(this, u), T.getAverageData());
  }
}
u = new WeakMap();
var d;
class Ne extends x {
  constructor(a) {
    super(a);
    b(this, d, void 0);
    p(this, d, new Ie(this));
  }
  async checkPage(a) {
    return await c(this, d).checkPage(a);
  }
  async getPageData(a) {
    return await c(this, d).getPageData(a);
  }
  async savePageData(a, s) {
    return await c(this, d).savePageData(a, s);
  }
  async getOverviewData(a, s, i, n) {
    return await c(this, d).getOverviewData(a, s, i, n);
  }
  async getAverageData() {
    return await c(this, d).getAverageData();
  }
}
d = new WeakMap();
var h, f, g, v;
class A extends x {
  constructor(a) {
    super(a);
    b(this, h, void 0);
    b(this, f, void 0);
    b(this, g, void 0);
    b(this, v, void 0);
    p(this, f, new E(void 0)), this.pageData = c(this, f).asObservable(), p(this, g, new E(void 0)), this.overviewData = c(this, g).asObservable(), p(this, v, new E(void 0)), this.averageData = c(this, v).asObservable(), p(this, h, new Ne(this));
  }
  async checkPage(a, s = !0) {
    const { data: i } = await c(this, h).checkPage(a);
    i && (c(this, f).setValue(i), s || await this.savePageData(a, i));
  }
  async getPageData(a, s = !0) {
    const { data: i } = await c(this, h).getPageData(a);
    i && (c(this, f).setValue(i), s || await this.savePageData(a, i));
  }
  async savePageData(a, s) {
    return await c(this, h).savePageData(a, s);
  }
  async getOverviewData(a, s, i, n) {
    const { data: r } = await c(this, h).getOverviewData(a, s, i, n);
    r && c(this, g).setValue(r);
  }
  async getAverageData() {
    const { data: a } = await c(this, h).getAverageData();
    a && c(this, v).setValue(a);
  }
}
h = new WeakMap(), f = new WeakMap(), g = new WeakMap(), v = new WeakMap();
const H = new G("SustainabilityContext"), xe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SUSTAINABILITY_CONTEXT: H,
  SustainabilityContext: A,
  default: A
}, Symbol.toStringTag, { value: "Module" }));
var Ue = Object.defineProperty, ke = Object.getOwnPropertyDescriptor, M = (t, e, a, s) => {
  for (var i = s > 1 ? void 0 : s ? ke(e, a) : e, n = t.length - 1, r; n >= 0; n--)
    (r = t[n]) && (i = (s ? r(e, a, i) : r(i)) || i);
  return s && i && Ue(e, a, i), i;
};
const qe = "sustainability-carbon-rating";
let O = class extends Y(z) {
  constructor() {
    super(...arguments), this.carbonRating = void 0;
  }
  _getColour(t) {
    return t == "E" || t == "F" ? "danger" : t == "D" ? "warning" : "positive";
  }
  render() {
    return J`
    <uui-tag .color=${this._getColour(this.carbonRating)}>
      ${this.carbonRating}
    </uui-tag>
    `;
  }
};
M([
  K({ type: String })
], O.prototype, "carbonRating", 2);
O = M([
  X(qe)
], O);
const Ge = (t, e) => {
  e.registerMany([
    ...Z,
    ...fe,
    ...ve
  ]), t.consumeContext(F, async (a) => {
    if (!a)
      return;
    const s = a.getOpenApiConfiguration();
    y.BASE = s.base, y.TOKEN = s.token, y.WITH_CREDENTIALS = s.withCredentials, y.CREDENTIALS = s.credentials;
  }), t.provideContext(H, new A(t));
};
export {
  H as S,
  O as a,
  Ne as b,
  Ie as c,
  Ge as o
};
//# sourceMappingURL=index-DBnCYdbR.js.map
