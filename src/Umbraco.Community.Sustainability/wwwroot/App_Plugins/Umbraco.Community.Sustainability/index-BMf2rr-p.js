var G = Object.defineProperty;
var I = (a) => {
  throw TypeError(a);
};
var K = (a, e, t) => e in a ? G(a, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : a[e] = t;
var k = (a, e, t) => K(a, typeof e != "symbol" ? e + "" : e, t), R = (a, e, t) => e.has(a) || I("Cannot " + t);
var l = (a, e, t) => (R(a, e, "read from private field"), t ? t.call(a) : e.get(a)), d = (a, e, t) => e.has(a) ? I("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(a) : e.set(a, t), g = (a, e, t, i) => (R(a, e, "write to private field"), i ? i.call(a, t) : e.set(a, t), t);
import { UMB_AUTH_CONTEXT as Z } from "@umbraco-cms/backoffice/auth";
import { UmbControllerBase as N } from "@umbraco-cms/backoffice/class-api";
import { tryExecute as O } from "@umbraco-cms/backoffice/resources";
import { UmbContextToken as ee } from "@umbraco-cms/backoffice/context-api";
import { UmbObjectState as E } from "@umbraco-cms/backoffice/observable-api";
import { UmbElementMixin as te } from "@umbraco-cms/backoffice/element-api";
import { LitElement as ae, html as re, property as ie, customElement as se } from "@umbraco-cms/backoffice/external/lit";
const ne = {
  type: "workspaceView",
  alias: "Umbraco.Community.Sustainability.Workspace",
  name: "Sustainability Workspace",
  js: () => import("./sustainability-workspace-view-CthUCRDp.js"),
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
}, oe = [ne], M = "overview-root", le = {
  type: "menuItem",
  alias: "Sustainability.MenuItem.Overview",
  name: "Overview Menu Item",
  weight: 2e3,
  meta: {
    label: "Overview",
    icon: "icon-eco",
    entityType: M,
    menus: ["Umb.Menu.Sustainability"]
  }
}, ce = [le], ue = "Sustainability.Workspace.Overview", me = "Sustainability.Workspace.Context", ye = {
  type: "workspace",
  alias: ue,
  name: "Overview Root Workspace",
  js: () => import("./overview-workspace.element-Gn_wb_9o.js"),
  meta: {
    entityType: M
  }
}, be = {
  type: "workspaceContext",
  alias: me,
  name: "Stats Workspace Context",
  js: () => Promise.resolve().then(() => Be)
}, he = [
  be,
  ye
], pe = [
  ...he,
  ...ce
], z = "stats-root", fe = {
  type: "menuItem",
  alias: "Sustainability.MenuItem.Stats",
  name: "Stats Menu Item",
  weight: 1e3,
  meta: {
    label: "Stats",
    icon: "icon-chart",
    entityType: z,
    menus: ["Umb.Menu.Sustainability"]
  }
}, de = [fe], ge = "Sustainability.Workspace.Stats", ve = {
  type: "workspace",
  alias: ge,
  name: "Stats Root Workspace",
  js: () => import("./stats-workspace.element-BNz4oQMS.js"),
  meta: {
    entityType: z
  }
}, we = [
  ve
], Se = [
  ...we,
  ...de
], P = "Umb.Section.Sustainability", V = "Umb.Menu.Sustainability", De = {
  type: "section",
  alias: P,
  name: "Sustainability Section",
  weight: 0,
  meta: {
    label: "Sustainability",
    pathname: "sustainability"
  },
  conditions: [
    {
      alias: "Umb.Condition.SectionUserPermission",
      match: P
    }
  ]
}, Oe = {
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
      match: P
    }
  ]
}, Te = {
  type: "menu",
  alias: V,
  name: "Sustainability Menu",
  meta: {
    label: "Sustainability"
  }
}, Ae = {
  type: "sectionSidebarApp",
  kind: "menu",
  alias: "Umb.SectionSidebar.Sustainability",
  name: "Sustainability Section Sidebar Menu",
  weight: 200,
  meta: {
    label: "Sustainability",
    menu: V
  },
  conditions: [
    {
      alias: "Umb.Condition.SectionAlias",
      match: P
    }
  ]
}, _e = [
  De,
  Oe,
  Te,
  Ae,
  ...pe,
  ...Se
];
var xe = async (a, e) => {
  let t = typeof e == "function" ? await e(a) : e;
  if (t) return a.scheme === "bearer" ? `Bearer ${t}` : a.scheme === "basic" ? `Basic ${btoa(t)}` : t;
}, Pe = { bodySerializer: (a) => JSON.stringify(a, (e, t) => typeof t == "bigint" ? t.toString() : t) }, je = (a) => {
  switch (a) {
    case "label":
      return ".";
    case "matrix":
      return ";";
    case "simple":
      return ",";
    default:
      return "&";
  }
}, Ue = (a) => {
  switch (a) {
    case "form":
      return ",";
    case "pipeDelimited":
      return "|";
    case "spaceDelimited":
      return "%20";
    default:
      return ",";
  }
}, Ce = (a) => {
  switch (a) {
    case "label":
      return ".";
    case "matrix":
      return ";";
    case "simple":
      return ",";
    default:
      return "&";
  }
}, B = ({ allowReserved: a, explode: e, name: t, style: i, value: n }) => {
  if (!e) {
    let s = (a ? n : n.map((c) => encodeURIComponent(c))).join(Ue(i));
    switch (i) {
      case "label":
        return `.${s}`;
      case "matrix":
        return `;${t}=${s}`;
      case "simple":
        return s;
      default:
        return `${t}=${s}`;
    }
  }
  let o = je(i), r = n.map((s) => i === "label" || i === "simple" ? a ? s : encodeURIComponent(s) : j({ allowReserved: a, name: t, value: s })).join(o);
  return i === "label" || i === "matrix" ? o + r : r;
}, j = ({ allowReserved: a, name: e, value: t }) => {
  if (t == null) return "";
  if (typeof t == "object") throw new Error("Deeply-nested arrays/objects aren’t supported. Provide your own `querySerializer()` to handle these.");
  return `${e}=${a ? t : encodeURIComponent(t)}`;
}, L = ({ allowReserved: a, explode: e, name: t, style: i, value: n }) => {
  if (n instanceof Date) return `${t}=${n.toISOString()}`;
  if (i !== "deepObject" && !e) {
    let s = [];
    Object.entries(n).forEach(([S, y]) => {
      s = [...s, S, a ? y : encodeURIComponent(y)];
    });
    let c = s.join(",");
    switch (i) {
      case "form":
        return `${t}=${c}`;
      case "label":
        return `.${c}`;
      case "matrix":
        return `;${t}=${c}`;
      default:
        return c;
    }
  }
  let o = Ce(i), r = Object.entries(n).map(([s, c]) => j({ allowReserved: a, name: i === "deepObject" ? `${t}[${s}]` : s, value: c })).join(o);
  return i === "label" || i === "matrix" ? o + r : r;
}, $e = /\{[^{}]+\}/g, Ie = ({ path: a, url: e }) => {
  let t = e, i = e.match($e);
  if (i) for (let n of i) {
    let o = !1, r = n.substring(1, n.length - 1), s = "simple";
    r.endsWith("*") && (o = !0, r = r.substring(0, r.length - 1)), r.startsWith(".") ? (r = r.substring(1), s = "label") : r.startsWith(";") && (r = r.substring(1), s = "matrix");
    let c = a[r];
    if (c == null) continue;
    if (Array.isArray(c)) {
      t = t.replace(n, B({ explode: o, name: r, style: s, value: c }));
      continue;
    }
    if (typeof c == "object") {
      t = t.replace(n, L({ explode: o, name: r, style: s, value: c }));
      continue;
    }
    if (s === "matrix") {
      t = t.replace(n, `;${j({ name: r, value: c })}`);
      continue;
    }
    let S = encodeURIComponent(s === "label" ? `.${c}` : c);
    t = t.replace(n, S);
  }
  return t;
}, Y = ({ allowReserved: a, array: e, object: t } = {}) => (i) => {
  let n = [];
  if (i && typeof i == "object") for (let o in i) {
    let r = i[o];
    if (r != null) if (Array.isArray(r)) {
      let s = B({ allowReserved: a, explode: !0, name: o, style: "form", value: r, ...e });
      s && n.push(s);
    } else if (typeof r == "object") {
      let s = L({ allowReserved: a, explode: !0, name: o, style: "deepObject", value: r, ...t });
      s && n.push(s);
    } else {
      let s = j({ allowReserved: a, name: o, value: r });
      s && n.push(s);
    }
  }
  return n.join("&");
}, ke = (a) => {
  var t;
  if (!a) return "stream";
  let e = (t = a.split(";")[0]) == null ? void 0 : t.trim();
  if (e) {
    if (e.startsWith("application/json") || e.endsWith("+json")) return "json";
    if (e === "multipart/form-data") return "formData";
    if (["application/", "audio/", "image/", "video/"].some((i) => e.startsWith(i))) return "blob";
    if (e.startsWith("text/")) return "text";
  }
}, Re = async ({ security: a, ...e }) => {
  for (let t of a) {
    let i = await xe(t, e.auth);
    if (!i) continue;
    let n = t.name ?? "Authorization";
    switch (t.in) {
      case "query":
        e.query || (e.query = {}), e.query[n] = i;
        break;
      case "cookie":
        e.headers.append("Cookie", `${n}=${i}`);
        break;
      case "header":
      default:
        e.headers.set(n, i);
        break;
    }
    return;
  }
}, q = (a) => Ee({ baseUrl: a.baseUrl, path: a.path, query: a.query, querySerializer: typeof a.querySerializer == "function" ? a.querySerializer : Y(a.querySerializer), url: a.url }), Ee = ({ baseUrl: a, path: e, query: t, querySerializer: i, url: n }) => {
  let o = n.startsWith("/") ? n : `/${n}`, r = (a ?? "") + o;
  e && (r = Ie({ path: e, url: r }));
  let s = t ? i(t) : "";
  return s.startsWith("?") && (s = s.substring(1)), s && (r += `?${s}`), r;
}, W = (a, e) => {
  var i;
  let t = { ...a, ...e };
  return (i = t.baseUrl) != null && i.endsWith("/") && (t.baseUrl = t.baseUrl.substring(0, t.baseUrl.length - 1)), t.headers = H(a.headers, e.headers), t;
}, H = (...a) => {
  let e = new Headers();
  for (let t of a) {
    if (!t || typeof t != "object") continue;
    let i = t instanceof Headers ? t.entries() : Object.entries(t);
    for (let [n, o] of i) if (o === null) e.delete(n);
    else if (Array.isArray(o)) for (let r of o) e.append(n, r);
    else o !== void 0 && e.set(n, typeof o == "object" ? JSON.stringify(o) : o);
  }
  return e;
}, U = class {
  constructor() {
    k(this, "_fns");
    this._fns = [];
  }
  clear() {
    this._fns = [];
  }
  getInterceptorIndex(a) {
    return typeof a == "number" ? this._fns[a] ? a : -1 : this._fns.indexOf(a);
  }
  exists(a) {
    let e = this.getInterceptorIndex(a);
    return !!this._fns[e];
  }
  eject(a) {
    let e = this.getInterceptorIndex(a);
    this._fns[e] && (this._fns[e] = null);
  }
  update(a, e) {
    let t = this.getInterceptorIndex(a);
    return this._fns[t] ? (this._fns[t] = e, a) : !1;
  }
  use(a) {
    return this._fns = [...this._fns, a], this._fns.length - 1;
  }
}, qe = () => ({ error: new U(), request: new U(), response: new U() }), We = Y({ allowReserved: !1, array: { explode: !0, style: "form" }, object: { explode: !0, style: "deepObject" } }), Ne = { "Content-Type": "application/json" }, J = (a = {}) => ({ ...Pe, headers: Ne, parseAs: "auto", querySerializer: We, ...a }), Me = (a = {}) => {
  let e = W(J(), a), t = () => ({ ...e }), i = (r) => (e = W(e, r), t()), n = qe(), o = async (r) => {
    let s = { ...e, ...r, fetch: r.fetch ?? e.fetch ?? globalThis.fetch, headers: H(e.headers, r.headers) };
    s.security && await Re({ ...s, security: s.security }), s.body && s.bodySerializer && (s.body = s.bodySerializer(s.body)), (s.body === void 0 || s.body === "") && s.headers.delete("Content-Type");
    let c = q(s), S = { redirect: "follow", ...s }, y = new Request(c, S);
    for (let u of n.request._fns) u && (y = await u(y, s));
    let Q = s.fetch, m = await Q(y);
    for (let u of n.response._fns) u && (m = await u(m, y, s));
    let A = { request: y, response: m };
    if (m.ok) {
      if (m.status === 204 || m.headers.get("Content-Length") === "0") return { data: {}, ...A };
      let u = (s.parseAs === "auto" ? ke(m.headers.get("Content-Type")) : s.parseAs) ?? "json";
      if (u === "stream") return { data: m.body, ...A };
      let x = await m[u]();
      return u === "json" && (s.responseValidator && await s.responseValidator(x), s.responseTransformer && (x = await s.responseTransformer(x))), { data: x, ...A };
    }
    let _ = await m.text();
    try {
      _ = JSON.parse(_);
    } catch {
    }
    let D = _;
    for (let u of n.error._fns) u && (D = await u(_, m, y, s));
    if (D = D || {}, s.throwOnError) throw D;
    return { error: D, ...A };
  };
  return { buildUrl: q, connect: (r) => o({ ...r, method: "CONNECT" }), delete: (r) => o({ ...r, method: "DELETE" }), get: (r) => o({ ...r, method: "GET" }), getConfig: t, head: (r) => o({ ...r, method: "HEAD" }), interceptors: n, options: (r) => o({ ...r, method: "OPTIONS" }), patch: (r) => o({ ...r, method: "PATCH" }), post: (r) => o({ ...r, method: "POST" }), put: (r) => o({ ...r, method: "PUT" }), request: o, setConfig: i, trace: (r) => o({ ...r, method: "TRACE" }) };
};
const f = Me(J({
  baseUrl: "http://localhost:26292",
  throwOnError: !0
}));
class T {
  static checkPage(e) {
    return ((e == null ? void 0 : e.client) ?? f).get({
      url: "/umbraco/sustainability/api/v1/checkPage",
      ...e
    });
  }
  static getAverageData(e) {
    return ((e == null ? void 0 : e.client) ?? f).get({
      url: "/umbraco/sustainability/api/v1/getAverageData",
      ...e
    });
  }
  static getOverviewData(e) {
    return ((e == null ? void 0 : e.client) ?? f).get({
      url: "/umbraco/sustainability/api/v1/getOverviewData",
      ...e
    });
  }
  static getPageData(e) {
    return ((e == null ? void 0 : e.client) ?? f).get({
      url: "/umbraco/sustainability/api/v1/getPageData",
      ...e
    });
  }
  static savePageData(e) {
    return ((e == null ? void 0 : e.client) ?? f).post({
      url: "/umbraco/sustainability/api/v1/savePageData",
      ...e,
      headers: {
        "Content-Type": "application/json",
        ...e == null ? void 0 : e.headers
      }
    });
  }
}
var b;
class ze {
  constructor(e) {
    d(this, b);
    g(this, b, e);
  }
  async checkPage(e) {
    return await O(l(this, b), T.checkPage({ query: { pageGuid: e } }));
  }
  async getPageData(e) {
    return await O(l(this, b), T.getPageData({ query: { pageGuid: e } }));
  }
  async savePageData(e, t) {
    return await O(l(this, b), T.savePageData({
      query: { pageGuid: e },
      body: t
    }));
  }
  async getOverviewData(e, t, i, n) {
    return await O(l(this, b), T.getOverviewData({ query: { direction: e, orderBy: t, pageNumber: i, pageSize: n } }));
  }
  async getAverageData() {
    return await O(l(this, b), T.getAverageData());
  }
}
b = new WeakMap();
var h;
class Ve extends N {
  constructor(t) {
    super(t);
    d(this, h);
    g(this, h, new ze(this));
  }
  async checkPage(t) {
    return await l(this, h).checkPage(t);
  }
  async getPageData(t) {
    return await l(this, h).getPageData(t);
  }
  async savePageData(t, i) {
    return await l(this, h).savePageData(t, i);
  }
  async getOverviewData(t, i, n, o) {
    return await l(this, h).getOverviewData(t, i, n, o);
  }
  async getAverageData() {
    return await l(this, h).getAverageData();
  }
}
h = new WeakMap();
var p, v, w;
class C extends N {
  constructor(t) {
    super(t);
    d(this, p);
    d(this, v);
    d(this, w);
    g(this, v, new E(void 0)), this.overviewData = l(this, v).asObservable(), g(this, w, new E(void 0)), this.averageData = l(this, w).asObservable(), g(this, p, new Ve(this));
  }
  async checkPage(t, i = !0) {
    const { data: n } = await l(this, p).checkPage(t);
    if (n)
      return i || await this.savePageData(t, n), n;
  }
  async getPageData(t) {
    const { data: i } = await l(this, p).getPageData(t);
    if (i)
      return i;
  }
  async savePageData(t, i) {
    return await l(this, p).savePageData(t, i);
  }
  async getOverviewData(t, i, n, o) {
    const { data: r } = await l(this, p).getOverviewData(t, i, n, o);
    r && l(this, v).setValue(r);
  }
  async getAverageData() {
    const { data: t } = await l(this, p).getAverageData();
    t && l(this, w).setValue(t);
  }
}
p = new WeakMap(), v = new WeakMap(), w = new WeakMap();
const X = new ee("SustainabilityContext"), Be = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SUSTAINABILITY_CONTEXT: X,
  SustainabilityContext: C,
  default: C
}, Symbol.toStringTag, { value: "Module" }));
var Le = Object.defineProperty, Ye = Object.getOwnPropertyDescriptor, F = (a, e, t, i) => {
  for (var n = i > 1 ? void 0 : i ? Ye(e, t) : e, o = a.length - 1, r; o >= 0; o--)
    (r = a[o]) && (n = (i ? r(e, t, n) : r(n)) || n);
  return i && n && Le(e, t, n), n;
};
const He = "sustainability-carbon-rating";
let $ = class extends te(ae) {
  constructor() {
    super(...arguments), this.carbonRating = void 0;
  }
  _getColour(a) {
    return a == "E" || a == "F" ? "danger" : a == "D" ? "warning" : "positive";
  }
  render() {
    return re`
    <uui-tag .color=${this._getColour(this.carbonRating)}>
      ${this.carbonRating}
    </uui-tag>
    `;
  }
};
F([
  ie({ type: String })
], $.prototype, "carbonRating", 2);
$ = F([
  se(He)
], $);
const tt = (a, e) => {
  a.consumeContext(Z, async (t) => {
    if (!t) return;
    const i = t.getOpenApiConfiguration();
    f.setConfig({
      auth: () => t.getLatestToken(),
      baseUrl: i.base,
      credentials: i.credentials
    }), f.interceptors.request.use(async (n, o) => {
      const r = await i.token();
      return n.headers.set("Authorization", `Bearer ${r}`), n;
    }), e.registerMany([
      ...oe,
      ..._e
    ]), a.provideContext(X, new C(a));
  });
};
export {
  X as S,
  $ as a,
  Ve as b,
  ze as c,
  tt as o
};
//# sourceMappingURL=index-BMf2rr-p.js.map
