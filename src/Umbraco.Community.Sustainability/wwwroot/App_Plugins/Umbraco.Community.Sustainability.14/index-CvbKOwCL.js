var O = (a, e, t) => {
  if (!e.has(a))
    throw TypeError("Cannot " + t);
};
var c = (a, e, t) => (O(a, e, "read from private field"), t ? t.call(a) : e.get(a)), b = (a, e, t) => {
  if (e.has(a))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(a) : e.set(a, t);
}, p = (a, e, t, s) => (O(a, e, "write to private field"), s ? s.call(a, t) : e.set(a, t), t);
import { UMB_AUTH_CONTEXT as L } from "@umbraco-cms/backoffice/auth";
import { UmbControllerBase as I } from "@umbraco-cms/backoffice/class-api";
import { tryExecuteAndNotify as w } from "@umbraco-cms/backoffice/resources";
import { UmbContextToken as W } from "@umbraco-cms/backoffice/context-api";
import { UmbObjectState as E } from "@umbraco-cms/backoffice/observable-api";
const F = {
  type: "workspaceView",
  alias: "Umbraco.Community.Sustainability.Workspace",
  name: "Sustainability Workspace",
  js: () => import("./sustainability-workspace-view-X_5SRcyw.js"),
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
}, V = [F], x = "stats-root", G = {
  type: "menuItem",
  alias: "Sustainability.MenuItem.Stats",
  name: "Stats Menu Item",
  weight: 1e3,
  meta: {
    label: "Stats",
    icon: "icon-chart",
    entityType: x,
    menus: ["Umb.Menu.Sustainability"]
  }
}, z = [G], J = "Sustainability.Workspace.Stats", Y = "Sustainability.Workspace.Context", K = {
  type: "workspace",
  alias: J,
  name: "Stats Root Workspace",
  js: () => import("./stats-workspace.element-Di20btYq.js"),
  meta: {
    entityType: x
  }
}, X = {
  type: "workspaceContext",
  alias: Y,
  name: "Stats Workspace Context",
  js: () => Promise.resolve().then(() => we)
}, Q = [
  X,
  K
], Z = [
  ...Q,
  ...z
], U = "Umb.Section.Sustainability", k = "Umb.Menu.Sustainability", ee = {
  type: "section",
  alias: U,
  name: "Sustainability Section",
  weight: 0,
  meta: {
    label: "Sustainability",
    pathname: "sustainability"
  }
}, te = {
  type: "menu",
  alias: k,
  name: "Sustainability Menu",
  meta: {
    label: "Sustainability"
  }
}, ae = {
  type: "sectionSidebarApp",
  kind: "menu",
  alias: "Umb.SectionSidebarMenu.Sustainability",
  name: "Sustainability Section Sidebar Menu",
  weight: 200,
  meta: {
    label: "Sustainability",
    menu: k
  },
  conditions: [
    {
      alias: "Umb.Condition.SectionAlias",
      match: U
    }
  ]
}, se = [
  ee,
  te,
  ae,
  ...Z
], ie = [
  {
    type: "dashboard",
    alias: "Umb.Dashboard.Sustainability",
    name: "Sustainability Overview",
    elementName: "sustainability-overview-dashboard",
    js: () => import("./sustainability.dashboard.element-BNhxplLh.js"),
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
], ne = [...ie];
class j extends Error {
  constructor(e, t, s) {
    super(s), this.name = "ApiError", this.url = t.url, this.status = t.status, this.statusText = t.statusText, this.body = t.body, this.request = e;
  }
}
class re extends Error {
  constructor(e) {
    super(e), this.name = "CancelError";
  }
  get isCancelled() {
    return !0;
  }
}
class oe {
  constructor(e) {
    this._isResolved = !1, this._isRejected = !1, this._isCancelled = !1, this.cancelHandlers = [], this.promise = new Promise((t, s) => {
      this._resolve = t, this._reject = s;
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
  then(e, t) {
    return this.promise.then(e, t);
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
      this.cancelHandlers.length = 0, this._reject && this._reject(new re("Request aborted"));
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
    const t = this._fns.indexOf(e);
    t !== -1 && (this._fns = [
      ...this._fns.slice(0, t),
      ...this._fns.slice(t + 1)
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
}, T = (a) => typeof a == "string", R = (a) => T(a) && a !== "", C = (a) => a instanceof Blob, q = (a) => a instanceof FormData, ce = (a) => {
  try {
    return btoa(a);
  } catch {
    return Buffer.from(a).toString("base64");
  }
}, le = (a) => {
  const e = [], t = (i, n) => {
    e.push(`${encodeURIComponent(i)}=${encodeURIComponent(String(n))}`);
  }, s = (i, n) => {
    n != null && (Array.isArray(n) ? n.forEach((r) => s(i, r)) : typeof n == "object" ? Object.entries(n).forEach(([r, o]) => s(`${i}[${r}]`, o)) : t(i, n));
  };
  return Object.entries(a).forEach(([i, n]) => s(i, n)), e.length ? `?${e.join("&")}` : "";
}, ue = (a, e) => {
  const t = a.ENCODE_PATH || encodeURI, s = e.url.replace("{api-version}", a.VERSION).replace(/{(.*?)}/g, (n, r) => {
    var o;
    return (o = e.path) != null && o.hasOwnProperty(r) ? t(String(e.path[r])) : n;
  }), i = a.BASE + s;
  return e.query ? i + le(e.query) : i;
}, de = (a) => {
  if (a.formData) {
    const e = new FormData(), t = (s, i) => {
      T(i) || C(i) ? e.append(s, i) : e.append(s, JSON.stringify(i));
    };
    return Object.entries(a.formData).filter(([, s]) => s != null).forEach(([s, i]) => {
      Array.isArray(i) ? i.forEach((n) => t(s, n)) : t(s, i);
    }), e;
  }
}, A = async (a, e) => typeof e == "function" ? e(a) : e, he = async (a, e) => {
  const [t, s, i, n] = await Promise.all([
    A(e, a.TOKEN),
    A(e, a.USERNAME),
    A(e, a.PASSWORD),
    A(e, a.HEADERS)
  ]), r = Object.entries({
    Accept: "application/json",
    ...n,
    ...e.headers
  }).filter(([, o]) => o != null).reduce((o, [m, l]) => ({
    ...o,
    [m]: String(l)
  }), {});
  if (R(t) && (r.Authorization = `Bearer ${t}`), R(s) && R(i)) {
    const o = ce(`${s}:${i}`);
    r.Authorization = `Basic ${o}`;
  }
  return e.body !== void 0 && (e.mediaType ? r["Content-Type"] = e.mediaType : C(e.body) ? r["Content-Type"] = e.body.type || "application/octet-stream" : T(e.body) ? r["Content-Type"] = "text/plain" : q(e.body) || (r["Content-Type"] = "application/json")), new Headers(r);
}, ye = (a) => {
  var e, t;
  if (a.body !== void 0)
    return (e = a.mediaType) != null && e.includes("application/json") || (t = a.mediaType) != null && t.includes("+json") ? JSON.stringify(a.body) : T(a.body) || C(a.body) || q(a.body) ? a.body : JSON.stringify(a.body);
}, me = async (a, e, t, s, i, n, r) => {
  const o = new AbortController();
  let m = {
    headers: n,
    body: s ?? i,
    method: e.method,
    signal: o.signal
  };
  a.WITH_CREDENTIALS && (m.credentials = a.CREDENTIALS);
  for (const l of a.interceptors.request._fns)
    m = await l(m);
  return r(() => o.abort()), await fetch(t, m);
}, be = (a, e) => {
  if (e) {
    const t = a.headers.get(e);
    if (T(t))
      return t;
  }
}, pe = async (a) => {
  if (a.status !== 204)
    try {
      const e = a.headers.get("Content-Type");
      if (e) {
        const t = ["application/octet-stream", "application/pdf", "application/zip", "audio/", "image/", "video/"];
        if (e.includes("application/json") || e.includes("+json"))
          return await a.json();
        if (t.some((s) => e.includes(s)))
          return await a.blob();
        if (e.includes("multipart/form-data"))
          return await a.formData();
        if (e.includes("text/"))
          return await a.text();
      }
    } catch (e) {
      console.error(e);
    }
}, fe = (a, e) => {
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
    ...a.errors
  }[e.status];
  if (s)
    throw new j(a, e, s);
  if (!e.ok) {
    const i = e.status ?? "unknown", n = e.statusText ?? "unknown", r = (() => {
      try {
        return JSON.stringify(e.body, null, 2);
      } catch {
        return;
      }
    })();
    throw new j(
      a,
      e,
      `Generic Error: status: ${i}; status text: ${n}; body: ${r}`
    );
  }
}, v = (a, e) => new oe(async (t, s, i) => {
  try {
    const n = ue(a, e), r = de(e), o = ye(e), m = await he(a, e);
    if (!i.isCancelled) {
      let l = await me(a, e, n, o, r, m, i);
      for (const $ of a.interceptors.response._fns)
        l = await $(l);
      const H = await pe(l), M = be(l, e.responseHeader), P = {
        url: n,
        ok: l.ok,
        status: l.status,
        statusText: l.statusText,
        body: M ?? H
      };
      fe(e, P), t(P.body);
    }
  } catch (n) {
    s(n);
  }
});
class D {
  /**
  * @returns unknown Success
  * @throws ApiError
  */
  static checkPage(e = {}) {
    const { pageGuid: t } = e;
    return v(y, {
      method: "GET",
      url: "/umbraco/sustainability/api/v1/checkPage",
      query: {
        pageGuid: t
      }
    });
  }
  /**
  * @returns unknown Success
  * @throws ApiError
  */
  static getAverageData() {
    return v(y, {
      method: "GET",
      url: "/umbraco/sustainability/api/v1/getAverageData"
    });
  }
  /**
  * @returns unknown Success
  * @throws ApiError
  */
  static getOverviewData(e = {}) {
    const { pageNumber: t, pageSize: s, orderBy: i, direction: n } = e;
    return v(y, {
      method: "GET",
      url: "/umbraco/sustainability/api/v1/getOverviewData",
      query: {
        pageNumber: t,
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
    const { pageGuid: t } = e;
    return v(y, {
      method: "GET",
      url: "/umbraco/sustainability/api/v1/getPageData",
      query: {
        pageGuid: t
      }
    });
  }
  /**
  * @returns boolean Success
  * @throws ApiError
  */
  static savePageData(e = {}) {
    const { pageGuid: t, requestBody: s } = e;
    return v(y, {
      method: "POST",
      url: "/umbraco/sustainability/api/v1/savePageData",
      query: {
        pageGuid: t
      },
      body: s,
      mediaType: "application/json"
    });
  }
}
var u;
class ge {
  constructor(e) {
    b(this, u, void 0);
    p(this, u, e);
  }
  async checkPage(e) {
    return await w(c(this, u), D.checkPage({ pageGuid: e }));
  }
  async getPageData(e) {
    return await w(c(this, u), D.getPageData({ pageGuid: e }));
  }
  async savePageData(e, t) {
    return await w(c(this, u), D.savePageData({
      pageGuid: e,
      requestBody: t
    }));
  }
  async getOverviewData(e, t, s, i) {
    return await w(c(this, u), D.getOverviewData({ direction: e, orderBy: t, pageNumber: s, pageSize: i }));
  }
  async getAverageData() {
    return await w(c(this, u), D.getAverageData());
  }
}
u = new WeakMap();
var d;
class Se extends I {
  constructor(t) {
    super(t);
    b(this, d, void 0);
    p(this, d, new ge(this));
  }
  async checkPage(t) {
    return await c(this, d).checkPage(t);
  }
  async getPageData(t) {
    return await c(this, d).getPageData(t);
  }
  async savePageData(t, s) {
    return await c(this, d).savePageData(t, s);
  }
  async getOverviewData(t, s, i, n) {
    return await c(this, d).getOverviewData(t, s, i, n);
  }
  async getAverageData() {
    return await c(this, d).getAverageData();
  }
}
d = new WeakMap();
var h, f, g, S;
class _ extends I {
  constructor(t) {
    super(t);
    b(this, h, void 0);
    b(this, f, void 0);
    b(this, g, void 0);
    b(this, S, void 0);
    p(this, f, new E(void 0)), this.pageData = c(this, f).asObservable(), p(this, g, new E(void 0)), this.overviewData = c(this, g).asObservable(), p(this, S, new E(void 0)), this.averageData = c(this, S).asObservable(), p(this, h, new Se(this));
  }
  async checkPage(t, s = !0) {
    const { data: i } = await c(this, h).checkPage(t);
    i && (c(this, f).setValue(i), s || await this.savePageData(t, i));
  }
  async getPageData(t, s = !0) {
    const { data: i } = await c(this, h).getPageData(t);
    i && (c(this, f).setValue(i), s || await this.savePageData(t, i));
  }
  async savePageData(t, s) {
    return await c(this, h).savePageData(t, s);
  }
  async getOverviewData(t, s, i, n) {
    const { data: r } = await c(this, h).getOverviewData(t, s, i, n);
    r && c(this, g).setValue(r);
  }
  async getAverageData() {
    const { data: t } = await c(this, h).getAverageData();
    t && c(this, S).setValue(t);
  }
}
h = new WeakMap(), f = new WeakMap(), g = new WeakMap(), S = new WeakMap();
const B = new W("SustainabilityContext"), we = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SUSTAINABILITY_CONTEXT: B,
  SustainabilityContext: _,
  default: _
}, Symbol.toStringTag, { value: "Module" })), _e = (a, e) => {
  e.registerMany([
    ...V,
    ...se,
    ...ne
  ]), a.consumeContext(L, async (t) => {
    if (!t)
      return;
    const s = t.getOpenApiConfiguration();
    y.BASE = s.base, y.TOKEN = s.token, y.WITH_CREDENTIALS = s.withCredentials, y.CREDENTIALS = s.credentials;
  }), a.provideContext(B, new _(a));
};
export {
  B as S,
  Se as a,
  ge as b,
  _e as o
};
//# sourceMappingURL=index-CvbKOwCL.js.map
