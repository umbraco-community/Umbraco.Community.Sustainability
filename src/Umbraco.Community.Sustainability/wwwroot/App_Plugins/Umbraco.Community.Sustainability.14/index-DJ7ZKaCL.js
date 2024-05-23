var j = (t, e, a) => {
  if (!e.has(t))
    throw TypeError("Cannot " + a);
};
var c = (t, e, a) => (j(t, e, "read from private field"), a ? a.call(t) : e.get(t)), b = (t, e, a) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, a);
}, p = (t, e, a, i) => (j(t, e, "write to private field"), i ? i.call(t, a) : e.set(t, a), a);
import { UMB_AUTH_CONTEXT as F } from "@umbraco-cms/backoffice/auth";
import { UmbControllerBase as U } from "@umbraco-cms/backoffice/class-api";
import { tryExecuteAndNotify as w } from "@umbraco-cms/backoffice/resources";
import { UmbContextToken as G } from "@umbraco-cms/backoffice/context-api";
import { UmbObjectState as E } from "@umbraco-cms/backoffice/observable-api";
import { UmbElementMixin as Y } from "@umbraco-cms/backoffice/element-api";
import { LitElement as z, html as J, property as K, customElement as X } from "@umbraco-cms/backoffice/external/lit";
const Q = {
  type: "workspaceView",
  alias: "Umbraco.Community.Sustainability.Workspace",
  name: "Sustainability Workspace",
  js: () => import("./sustainability-workspace-view-BPSW3RO0.js"),
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
}, Z = [Q], k = "overview-root", ee = {
  type: "menuItem",
  alias: "Sustainability.MenuItem.Overview",
  name: "Overview Menu Item",
  weight: 2e3,
  meta: {
    label: "Overview",
    icon: "icon-eco",
    entityType: k,
    menus: ["Umb.Menu.Sustainability"]
  }
}, te = [ee], ae = "Sustainability.Workspace.Overview", ie = "Sustainability.Workspace.Context", se = {
  type: "workspace",
  alias: ae,
  name: "Overview Root Workspace",
  js: () => import("./overview-workspace.element-DynF8tQI.js"),
  meta: {
    entityType: k
  }
}, ne = {
  type: "workspaceContext",
  alias: ie,
  name: "Stats Workspace Context",
  js: () => Promise.resolve().then(() => Ne)
}, re = [
  ne,
  se
], oe = [
  ...re,
  ...te
], q = "stats-root", ce = {
  type: "menuItem",
  alias: "Sustainability.MenuItem.Stats",
  name: "Stats Menu Item",
  weight: 1e3,
  meta: {
    label: "Stats",
    icon: "icon-chart",
    entityType: q,
    menus: ["Umb.Menu.Sustainability"]
  }
}, le = [ce], ue = "Sustainability.Workspace.Stats", de = {
  type: "workspace",
  alias: ue,
  name: "Stats Root Workspace",
  js: () => import("./stats-workspace.element-5Do9I2XQ.js"),
  meta: {
    entityType: q
  }
}, ye = [
  de
], he = [
  ...ye,
  ...le
], O = "Umb.Section.Sustainability", $ = "Umb.Menu.Sustainability", me = {
  type: "section",
  alias: O,
  name: "Sustainability Section",
  weight: 0,
  meta: {
    label: "Sustainability",
    pathname: "sustainability"
  }
}, be = {
  type: "sectionView",
  alias: "Umb.SectionView.Sustainability",
  name: "Sustainability Section View",
  element: () => import("./sustainability-section-view.element-BJV2vtve.js"),
  meta: {
    label: "Sustainability",
    icon: "icon-eco",
    pathname: "view"
  },
  conditions: [
    {
      alias: "Umb.Condition.SectionAlias",
      match: O
    }
  ]
}, pe = {
  type: "menu",
  alias: $,
  name: "Sustainability Menu",
  meta: {
    label: "Sustainability"
  }
}, fe = {
  type: "sectionSidebarApp",
  kind: "menu",
  alias: "Umb.SectionSidebar.Sustainability",
  name: "Sustainability Section Sidebar Menu",
  weight: 200,
  meta: {
    label: "Sustainability",
    menu: $
  },
  conditions: [
    {
      alias: "Umb.Condition.SectionAlias",
      match: O
    }
  ]
}, ge = [
  me,
  be,
  pe,
  fe,
  ...oe,
  ...he
];
class N extends Error {
  constructor(e, a, i) {
    super(i), this.name = "ApiError", this.url = a.url, this.status = a.status, this.statusText = a.statusText, this.body = a.body, this.request = e;
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
    this._isResolved = !1, this._isRejected = !1, this._isCancelled = !1, this.cancelHandlers = [], this.promise = new Promise((a, i) => {
      this._resolve = a, this._reject = i;
      const s = (o) => {
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
      }), e(s, n, r);
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
class x {
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
const h = {
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
    request: new x(),
    response: new x()
  }
}, D = (t) => typeof t == "string", R = (t) => D(t) && t !== "", P = (t) => t instanceof Blob, B = (t) => t instanceof FormData, ve = (t) => {
  try {
    return btoa(t);
  } catch {
    return Buffer.from(t).toString("base64");
  }
}, Te = (t) => {
  const e = [], a = (s, n) => {
    e.push(`${encodeURIComponent(s)}=${encodeURIComponent(String(n))}`);
  }, i = (s, n) => {
    n != null && (Array.isArray(n) ? n.forEach((r) => i(s, r)) : typeof n == "object" ? Object.entries(n).forEach(([r, o]) => i(`${s}[${r}]`, o)) : a(s, n));
  };
  return Object.entries(t).forEach(([s, n]) => i(s, n)), e.length ? `?${e.join("&")}` : "";
}, De = (t, e) => {
  const a = t.ENCODE_PATH || encodeURI, i = e.url.replace("{api-version}", t.VERSION).replace(/{(.*?)}/g, (n, r) => {
    var o;
    return (o = e.path) != null && o.hasOwnProperty(r) ? a(String(e.path[r])) : n;
  }), s = t.BASE + i;
  return e.query ? s + Te(e.query) : s;
}, _e = (t) => {
  if (t.formData) {
    const e = new FormData(), a = (i, s) => {
      D(s) || P(s) ? e.append(i, s) : e.append(i, JSON.stringify(s));
    };
    return Object.entries(t.formData).filter(([, i]) => i != null).forEach(([i, s]) => {
      Array.isArray(s) ? s.forEach((n) => a(i, n)) : a(i, s);
    }), e;
  }
}, _ = async (t, e) => typeof e == "function" ? e(t) : e, Ee = async (t, e) => {
  const [a, i, s, n] = await Promise.all([
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
  if (R(a) && (r.Authorization = `Bearer ${a}`), R(i) && R(s)) {
    const o = ve(`${i}:${s}`);
    r.Authorization = `Basic ${o}`;
  }
  return e.body !== void 0 && (e.mediaType ? r["Content-Type"] = e.mediaType : P(e.body) ? r["Content-Type"] = e.body.type || "application/octet-stream" : D(e.body) ? r["Content-Type"] = "text/plain" : B(e.body) || (r["Content-Type"] = "application/json")), new Headers(r);
}, Re = (t) => {
  var e, a;
  if (t.body !== void 0)
    return (e = t.mediaType) != null && e.includes("application/json") || (a = t.mediaType) != null && a.includes("+json") ? JSON.stringify(t.body) : D(t.body) || P(t.body) || B(t.body) ? t.body : JSON.stringify(t.body);
}, Ae = async (t, e, a, i, s, n, r) => {
  const o = new AbortController();
  let m = {
    headers: n,
    body: i ?? s,
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
}, Oe = async (t) => {
  if (t.status !== 204)
    try {
      const e = t.headers.get("Content-Type");
      if (e) {
        const a = ["application/octet-stream", "application/pdf", "application/zip", "audio/", "image/", "video/"];
        if (e.includes("application/json") || e.includes("+json"))
          return await t.json();
        if (a.some((i) => e.includes(i)))
          return await t.blob();
        if (e.includes("multipart/form-data"))
          return await t.formData();
        if (e.includes("text/"))
          return await t.text();
      }
    } catch (e) {
      console.error(e);
    }
}, Pe = (t, e) => {
  const i = {
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
  if (i)
    throw new N(t, e, i);
  if (!e.ok) {
    const s = e.status ?? "unknown", n = e.statusText ?? "unknown", r = (() => {
      try {
        return JSON.stringify(e.body, null, 2);
      } catch {
        return;
      }
    })();
    throw new N(
      t,
      e,
      `Generic Error: status: ${s}; status text: ${n}; body: ${r}`
    );
  }
}, v = (t, e) => new we(async (a, i, s) => {
  try {
    const n = De(t, e), r = _e(e), o = Re(e), m = await Ee(t, e);
    if (!s.isCancelled) {
      let l = await Ae(t, e, n, o, r, m, s);
      for (const W of t.interceptors.response._fns)
        l = await W(l);
      const L = await Oe(l), V = Ce(l, e.responseHeader), I = {
        url: n,
        ok: l.ok,
        status: l.status,
        statusText: l.statusText,
        body: V ?? L
      };
      Pe(e, I), a(I.body);
    }
  } catch (n) {
    i(n);
  }
});
class T {
  /**
  * @returns unknown Success
  * @throws ApiError
  */
  static checkPage(e = {}) {
    const { pageGuid: a } = e;
    return v(h, {
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
    return v(h, {
      method: "GET",
      url: "/umbraco/sustainability/api/v1/getAverageData"
    });
  }
  /**
  * @returns unknown Success
  * @throws ApiError
  */
  static getOverviewData(e = {}) {
    const { pageNumber: a, pageSize: i, orderBy: s, direction: n } = e;
    return v(h, {
      method: "GET",
      url: "/umbraco/sustainability/api/v1/getOverviewData",
      query: {
        pageNumber: a,
        pageSize: i,
        orderBy: s,
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
    return v(h, {
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
    const { pageGuid: a, requestBody: i } = e;
    return v(h, {
      method: "POST",
      url: "/umbraco/sustainability/api/v1/savePageData",
      query: {
        pageGuid: a
      },
      body: i,
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
    return await w(c(this, u), T.checkPage({ pageGuid: e }));
  }
  async getPageData(e) {
    return await w(c(this, u), T.getPageData({ pageGuid: e }));
  }
  async savePageData(e, a) {
    return await w(c(this, u), T.savePageData({
      pageGuid: e,
      requestBody: a
    }));
  }
  async getOverviewData(e, a, i, s) {
    return await w(c(this, u), T.getOverviewData({ direction: e, orderBy: a, pageNumber: i, pageSize: s }));
  }
  async getAverageData() {
    return await w(c(this, u), T.getAverageData());
  }
}
u = new WeakMap();
var d;
class je extends U {
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
  async savePageData(a, i) {
    return await c(this, d).savePageData(a, i);
  }
  async getOverviewData(a, i, s, n) {
    return await c(this, d).getOverviewData(a, i, s, n);
  }
  async getAverageData() {
    return await c(this, d).getAverageData();
  }
}
d = new WeakMap();
var y, f, g, S;
class A extends U {
  constructor(a) {
    super(a);
    b(this, y, void 0);
    b(this, f, void 0);
    b(this, g, void 0);
    b(this, S, void 0);
    p(this, f, new E(void 0)), this.pageData = c(this, f).asObservable(), p(this, g, new E(void 0)), this.overviewData = c(this, g).asObservable(), p(this, S, new E(void 0)), this.averageData = c(this, S).asObservable(), p(this, y, new je(this));
  }
  async checkPage(a, i = !0) {
    const { data: s } = await c(this, y).checkPage(a);
    s && (c(this, f).setValue(s), i || await this.savePageData(a, s));
  }
  async getPageData(a, i = !0) {
    const { data: s } = await c(this, y).getPageData(a);
    s && (c(this, f).setValue(s), i || await this.savePageData(a, s));
  }
  async savePageData(a, i) {
    return await c(this, y).savePageData(a, i);
  }
  async getOverviewData(a, i, s, n) {
    const { data: r } = await c(this, y).getOverviewData(a, i, s, n);
    r && c(this, g).setValue(r);
  }
  async getAverageData() {
    const { data: a } = await c(this, y).getAverageData();
    a && c(this, S).setValue(a);
  }
}
y = new WeakMap(), f = new WeakMap(), g = new WeakMap(), S = new WeakMap();
const H = new G("SustainabilityContext"), Ne = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SUSTAINABILITY_CONTEXT: H,
  SustainabilityContext: A,
  default: A
}, Symbol.toStringTag, { value: "Module" }));
var xe = Object.defineProperty, Ue = Object.getOwnPropertyDescriptor, M = (t, e, a, i) => {
  for (var s = i > 1 ? void 0 : i ? Ue(e, a) : e, n = t.length - 1, r; n >= 0; n--)
    (r = t[n]) && (s = (i ? r(e, a, s) : r(s)) || s);
  return i && s && xe(e, a, s), s;
};
const ke = "sustainability-carbon-rating";
let C = class extends Y(z) {
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
], C.prototype, "carbonRating", 2);
C = M([
  X(ke)
], C);
const Fe = (t, e) => {
  e.registerMany([
    ...Z,
    ...ge
  ]), t.consumeContext(F, async (a) => {
    if (!a)
      return;
    const i = a.getOpenApiConfiguration();
    h.BASE = i.base, h.TOKEN = i.token, h.WITH_CREDENTIALS = i.withCredentials, h.CREDENTIALS = i.credentials;
  }), t.provideContext(H, new A(t));
};
export {
  H as S,
  C as a,
  je as b,
  Ie as c,
  Fe as o
};
//# sourceMappingURL=index-DJ7ZKaCL.js.map
