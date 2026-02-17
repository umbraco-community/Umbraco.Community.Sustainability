var K = Object.defineProperty;
var E = (a) => {
  throw TypeError(a);
};
var Z = (a, e, t) => e in a ? K(a, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : a[e] = t;
var R = (a, e, t) => Z(a, typeof e != "symbol" ? e + "" : e, t), q = (a, e, t) => e.has(a) || E("Cannot " + t);
var l = (a, e, t) => (q(a, e, "read from private field"), t ? t.call(a) : e.get(a)), g = (a, e, t) => e.has(a) ? E("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(a) : e.set(a, t), v = (a, e, t, i) => (q(a, e, "write to private field"), i ? i.call(a, t) : e.set(a, t), t);
import { UMB_AUTH_CONTEXT as ee } from "@umbraco-cms/backoffice/auth";
import { UmbControllerBase as M } from "@umbraco-cms/backoffice/class-api";
import { tryExecute as T } from "@umbraco-cms/backoffice/resources";
import { UmbContextToken as te } from "@umbraco-cms/backoffice/context-api";
import { UmbObjectState as W } from "@umbraco-cms/backoffice/observable-api";
import { UMB_NOTIFICATION_CONTEXT as ae } from "@umbraco-cms/backoffice/notification";
import { UmbLitElement as re } from "@umbraco-cms/backoffice/lit-element";
import { property as ie, customElement as se, html as ne } from "@umbraco-cms/backoffice/external/lit";
const oe = {
  type: "workspaceView",
  alias: "Umbraco.Community.Sustainability.Workspace",
  name: "Sustainability Workspace",
  js: () => import("./sustainability-workspace-view-CZfqbYSB.js"),
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
}, le = [oe], V = "overview-root", ce = {
  type: "menuItem",
  alias: "Sustainability.MenuItem.Overview",
  name: "Overview Menu Item",
  weight: 2e3,
  meta: {
    label: "Overview",
    icon: "icon-eco",
    entityType: V,
    menus: ["Umbraco.Community.Sustainability.Menu"]
  }
}, ue = [ce], me = "Sustainability.Workspace.Overview", ye = "Sustainability.Workspace.Context", de = {
  type: "workspace",
  alias: me,
  name: "Overview Root Workspace",
  js: () => import("./overview-workspace.element-CrFs0rBl.js"),
  meta: {
    entityType: V
  }
}, he = {
  type: "workspaceContext",
  alias: ye,
  name: "Overview Workspace Context",
  js: () => Promise.resolve().then(() => Fe)
}, pe = [
  he,
  de
], be = [
  ...pe,
  ...ue
], B = "stats-root", fe = {
  type: "menuItem",
  alias: "Sustainability.MenuItem.Stats",
  name: "Stats Menu Item",
  weight: 1e3,
  meta: {
    label: "Stats",
    icon: "icon-chart",
    entityType: B,
    menus: ["Umbraco.Community.Sustainability.Menu"]
  }
}, ge = [fe], ve = "Sustainability.Workspace.Stats", we = {
  type: "workspace",
  alias: ve,
  name: "Stats Root Workspace",
  js: () => import("./stats-workspace.element-DjkKik5D.js"),
  meta: {
    entityType: B
  }
}, Se = [
  we
], Oe = [
  ...Se,
  ...ge
], I = "Umbraco.Community.Sustainability.Section", L = "Umbraco.Community.Sustainability.Menu", De = {
  type: "section",
  alias: I,
  name: "Sustainability Section",
  weight: 0,
  meta: {
    label: "Sustainability",
    pathname: "sustainability"
  },
  conditions: [
    {
      alias: "Umb.Condition.SectionUserPermission",
      match: I
    }
  ]
}, Ce = {
  type: "sectionView",
  alias: "Umbraco.Community.Sustainability.SectionView",
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
      match: I
    }
  ]
}, Te = {
  type: "menu",
  alias: L,
  name: "Sustainability Menu",
  meta: {
    label: "Sustainability"
  }
}, Ae = {
  type: "sectionSidebarApp",
  kind: "menu",
  alias: "Umbraco.Community.Sustainability.SectionSidebar",
  name: "Sustainability Section Sidebar Menu",
  weight: 200,
  meta: {
    label: "Sustainability",
    menu: L
  },
  conditions: [
    {
      alias: "Umb.Condition.SectionAlias",
      match: I
    }
  ]
}, _e = [
  De,
  Ce,
  Te,
  Ae,
  ...be,
  ...Oe
], xe = [
  {
    type: "localization",
    alias: "Umbraco.Community.Sustainability.Localization.En",
    name: "Sustainability English Localization",
    meta: { culture: "en" },
    js: () => import("./en-Dfekyw6n.js")
  }
];
var je = async (a, e) => {
  let t = typeof e == "function" ? await e(a) : e;
  if (t) return a.scheme === "bearer" ? `Bearer ${t}` : a.scheme === "basic" ? `Basic ${btoa(t)}` : t;
}, Ie = { bodySerializer: (a) => JSON.stringify(a, (e, t) => typeof t == "bigint" ? t.toString() : t) }, Ue = (a) => {
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
}, ke = (a) => {
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
}, Pe = (a) => {
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
}, F = ({ allowReserved: a, explode: e, name: t, style: i, value: s }) => {
  if (!e) {
    let n = (a ? s : s.map((c) => encodeURIComponent(c))).join(ke(i));
    switch (i) {
      case "label":
        return `.${n}`;
      case "matrix":
        return `;${t}=${n}`;
      case "simple":
        return n;
      default:
        return `${t}=${n}`;
    }
  }
  let o = Ue(i), r = s.map((n) => i === "label" || i === "simple" ? a ? n : encodeURIComponent(n) : U({ allowReserved: a, name: t, value: n })).join(o);
  return i === "label" || i === "matrix" ? o + r : r;
}, U = ({ allowReserved: a, name: e, value: t }) => {
  if (t == null) return "";
  if (typeof t == "object") throw new Error("Deeply-nested arrays/objects aren’t supported. Provide your own `querySerializer()` to handle these.");
  return `${e}=${a ? t : encodeURIComponent(t)}`;
}, Y = ({ allowReserved: a, explode: e, name: t, style: i, value: s, valueOnly: o }) => {
  if (s instanceof Date) return o ? s.toISOString() : `${t}=${s.toISOString()}`;
  if (i !== "deepObject" && !e) {
    let c = [];
    Object.entries(s).forEach(([b, _]) => {
      c = [...c, b, a ? _ : encodeURIComponent(_)];
    });
    let y = c.join(",");
    switch (i) {
      case "form":
        return `${t}=${y}`;
      case "label":
        return `.${y}`;
      case "matrix":
        return `;${t}=${y}`;
      default:
        return y;
    }
  }
  let r = Pe(i), n = Object.entries(s).map(([c, y]) => U({ allowReserved: a, name: i === "deepObject" ? `${t}[${c}]` : c, value: y })).join(r);
  return i === "label" || i === "matrix" ? r + n : n;
}, $e = /\{[^{}]+\}/g, Ee = ({ path: a, url: e }) => {
  let t = e, i = e.match($e);
  if (i) for (let s of i) {
    let o = !1, r = s.substring(1, s.length - 1), n = "simple";
    r.endsWith("*") && (o = !0, r = r.substring(0, r.length - 1)), r.startsWith(".") ? (r = r.substring(1), n = "label") : r.startsWith(";") && (r = r.substring(1), n = "matrix");
    let c = a[r];
    if (c == null) continue;
    if (Array.isArray(c)) {
      t = t.replace(s, F({ explode: o, name: r, style: n, value: c }));
      continue;
    }
    if (typeof c == "object") {
      t = t.replace(s, Y({ explode: o, name: r, style: n, value: c, valueOnly: !0 }));
      continue;
    }
    if (n === "matrix") {
      t = t.replace(s, `;${U({ name: r, value: c })}`);
      continue;
    }
    let y = encodeURIComponent(n === "label" ? `.${c}` : c);
    t = t.replace(s, y);
  }
  return t;
}, H = ({ allowReserved: a, array: e, object: t } = {}) => (i) => {
  let s = [];
  if (i && typeof i == "object") for (let o in i) {
    let r = i[o];
    if (r != null) if (Array.isArray(r)) {
      let n = F({ allowReserved: a, explode: !0, name: o, style: "form", value: r, ...e });
      n && s.push(n);
    } else if (typeof r == "object") {
      let n = Y({ allowReserved: a, explode: !0, name: o, style: "deepObject", value: r, ...t });
      n && s.push(n);
    } else {
      let n = U({ allowReserved: a, name: o, value: r });
      n && s.push(n);
    }
  }
  return s.join("&");
}, Re = (a) => {
  var t;
  if (!a) return "stream";
  let e = (t = a.split(";")[0]) == null ? void 0 : t.trim();
  if (e) {
    if (e.startsWith("application/json") || e.endsWith("+json")) return "json";
    if (e === "multipart/form-data") return "formData";
    if (["application/", "audio/", "image/", "video/"].some((i) => e.startsWith(i))) return "blob";
    if (e.startsWith("text/")) return "text";
  }
}, qe = async ({ security: a, ...e }) => {
  for (let t of a) {
    let i = await je(t, e.auth);
    if (!i) continue;
    let s = t.name ?? "Authorization";
    switch (t.in) {
      case "query":
        e.query || (e.query = {}), e.query[s] = i;
        break;
      case "cookie":
        e.headers.append("Cookie", `${s}=${i}`);
        break;
      case "header":
      default:
        e.headers.set(s, i);
        break;
    }
    return;
  }
}, N = (a) => We({ baseUrl: a.baseUrl, path: a.path, query: a.query, querySerializer: typeof a.querySerializer == "function" ? a.querySerializer : H(a.querySerializer), url: a.url }), We = ({ baseUrl: a, path: e, query: t, querySerializer: i, url: s }) => {
  let o = s.startsWith("/") ? s : `/${s}`, r = (a ?? "") + o;
  e && (r = Ee({ path: e, url: r }));
  let n = t ? i(t) : "";
  return n.startsWith("?") && (n = n.substring(1)), n && (r += `?${n}`), r;
}, z = (a, e) => {
  var i;
  let t = { ...a, ...e };
  return (i = t.baseUrl) != null && i.endsWith("/") && (t.baseUrl = t.baseUrl.substring(0, t.baseUrl.length - 1)), t.headers = J(a.headers, e.headers), t;
}, J = (...a) => {
  let e = new Headers();
  for (let t of a) {
    if (!t || typeof t != "object") continue;
    let i = t instanceof Headers ? t.entries() : Object.entries(t);
    for (let [s, o] of i) if (o === null) e.delete(s);
    else if (Array.isArray(o)) for (let r of o) e.append(s, r);
    else o !== void 0 && e.set(s, typeof o == "object" ? JSON.stringify(o) : o);
  }
  return e;
}, k = class {
  constructor() {
    R(this, "_fns");
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
}, Ne = () => ({ error: new k(), request: new k(), response: new k() }), ze = H({ allowReserved: !1, array: { explode: !0, style: "form" }, object: { explode: !0, style: "deepObject" } }), Me = { "Content-Type": "application/json" }, X = (a = {}) => ({ ...Ie, headers: Me, parseAs: "auto", querySerializer: ze, ...a }), Ve = (a = {}) => {
  let e = z(X(), a), t = () => ({ ...e }), i = (r) => (e = z(e, r), t()), s = Ne(), o = async (r) => {
    let n = { ...e, ...r, fetch: r.fetch ?? e.fetch ?? globalThis.fetch, headers: J(e.headers, r.headers) };
    n.security && await qe({ ...n, security: n.security }), n.body && n.bodySerializer && (n.body = n.bodySerializer(n.body)), (n.body === void 0 || n.body === "") && n.headers.delete("Content-Type");
    let c = N(n), y = { redirect: "follow", ...n }, b = new Request(c, y);
    for (let m of s.request._fns) m && (b = await m(b, n));
    let _ = n.fetch, u = await _(b);
    for (let m of s.response._fns) m && (u = await m(u, b, n));
    let x = { request: b, response: u };
    if (u.ok) {
      if (u.status === 204 || u.headers.get("Content-Length") === "0") return n.responseStyle === "data" ? {} : { data: {}, ...x };
      let m = (n.parseAs === "auto" ? Re(u.headers.get("Content-Type")) : n.parseAs) ?? "json";
      if (m === "stream") return n.responseStyle === "data" ? u.body : { data: u.body, ...x };
      let C = await u[m]();
      return m === "json" && (n.responseValidator && await n.responseValidator(C), n.responseTransformer && (C = await n.responseTransformer(C))), n.responseStyle === "data" ? C : { data: C, ...x };
    }
    let j = await u.text();
    try {
      j = JSON.parse(j);
    } catch {
    }
    let D = j;
    for (let m of s.error._fns) m && (D = await m(j, u, b, n));
    if (D = D || {}, n.throwOnError) throw D;
    return n.responseStyle === "data" ? void 0 : { error: D, ...x };
  };
  return { buildUrl: N, connect: (r) => o({ ...r, method: "CONNECT" }), delete: (r) => o({ ...r, method: "DELETE" }), get: (r) => o({ ...r, method: "GET" }), getConfig: t, head: (r) => o({ ...r, method: "HEAD" }), interceptors: s, options: (r) => o({ ...r, method: "OPTIONS" }), patch: (r) => o({ ...r, method: "PATCH" }), post: (r) => o({ ...r, method: "POST" }), put: (r) => o({ ...r, method: "PUT" }), request: o, setConfig: i, trace: (r) => o({ ...r, method: "TRACE" }) };
};
const w = Ve(X({
  baseUrl: "http://localhost:50172",
  throwOnError: !0
}));
class A {
  static checkPage(e) {
    return ((e == null ? void 0 : e.client) ?? w).get({
      url: "/umbraco/sustainability/api/v1/checkPage",
      ...e
    });
  }
  static getAverageData(e) {
    return ((e == null ? void 0 : e.client) ?? w).get({
      url: "/umbraco/sustainability/api/v1/getAverageData",
      ...e
    });
  }
  static getOverviewData(e) {
    return ((e == null ? void 0 : e.client) ?? w).get({
      url: "/umbraco/sustainability/api/v1/getOverviewData",
      ...e
    });
  }
  static getPageData(e) {
    return ((e == null ? void 0 : e.client) ?? w).get({
      url: "/umbraco/sustainability/api/v1/getPageData",
      ...e
    });
  }
  static savePageData(e) {
    return ((e == null ? void 0 : e.client) ?? w).post({
      url: "/umbraco/sustainability/api/v1/savePageData",
      ...e,
      headers: {
        "Content-Type": "application/json",
        ...e == null ? void 0 : e.headers
      }
    });
  }
}
var d;
class Be {
  constructor(e) {
    g(this, d);
    v(this, d, e);
  }
  async checkPage(e) {
    return await T(l(this, d), A.checkPage({ query: { pageGuid: e } }));
  }
  async getPageData(e) {
    return await T(l(this, d), A.getPageData({ query: { pageGuid: e } }));
  }
  async savePageData(e, t) {
    return await T(l(this, d), A.savePageData({
      query: { pageGuid: e },
      body: t
    }));
  }
  async getOverviewData(e, t, i, s) {
    return await T(l(this, d), A.getOverviewData({ query: { direction: e, orderBy: t, pageNumber: i, pageSize: s } }));
  }
  async getAverageData() {
    return await T(l(this, d), A.getAverageData());
  }
}
d = new WeakMap();
var h;
class Le extends M {
  constructor(t) {
    super(t);
    g(this, h);
    v(this, h, new Be(this));
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
  async getOverviewData(t, i, s, o) {
    return await l(this, h).getOverviewData(t, i, s, o);
  }
  async getAverageData() {
    return await l(this, h).getAverageData();
  }
}
h = new WeakMap();
var p, f, S, O;
class P extends M {
  constructor(t) {
    super(t);
    g(this, p);
    g(this, f);
    g(this, S);
    g(this, O);
    v(this, S, new W(void 0)), this.overviewData = l(this, S).asObservable(), v(this, O, new W(void 0)), this.averageData = l(this, O).asObservable(), v(this, p, new Le(this)), this.consumeContext(ae, (i) => {
      v(this, f, i);
    });
  }
  async checkPage(t, i = !0) {
    var r;
    const { data: s, error: o } = await l(this, p).checkPage(t);
    if (o) {
      (r = l(this, f)) == null || r.peek("danger", {
        data: { message: "Failed to check page sustainability." }
      });
      return;
    }
    if (s)
      return i || await this.savePageData(t, s), s;
  }
  async getPageData(t) {
    var o;
    const { data: i, error: s } = await l(this, p).getPageData(t);
    if (s) {
      (o = l(this, f)) == null || o.peek("danger", {
        data: { message: "Failed to load page data." }
      });
      return;
    }
    if (i)
      return i;
  }
  async savePageData(t, i) {
    return await l(this, p).savePageData(t, i);
  }
  async getOverviewData(t, i, s, o) {
    var c;
    const { data: r, error: n } = await l(this, p).getOverviewData(t, i, s, o);
    if (n) {
      (c = l(this, f)) == null || c.peek("danger", {
        data: { message: "Failed to load overview data." }
      });
      return;
    }
    r && l(this, S).setValue(r);
  }
  async getAverageData() {
    var s;
    const { data: t, error: i } = await l(this, p).getAverageData();
    if (i) {
      (s = l(this, f)) == null || s.peek("danger", {
        data: { message: "Failed to load average data." }
      });
      return;
    }
    t && l(this, O).setValue(t);
  }
}
p = new WeakMap(), f = new WeakMap(), S = new WeakMap(), O = new WeakMap();
const G = new te("SustainabilityContext"), Fe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SUSTAINABILITY_CONTEXT: G,
  SustainabilityContext: P,
  default: P
}, Symbol.toStringTag, { value: "Module" }));
var Ye = Object.defineProperty, He = Object.getOwnPropertyDescriptor, Q = (a, e, t, i) => {
  for (var s = i > 1 ? void 0 : i ? He(e, t) : e, o = a.length - 1, r; o >= 0; o--)
    (r = a[o]) && (s = (i ? r(e, t, s) : r(s)) || s);
  return i && s && Ye(e, t, s), s;
};
const Je = "sustainability-carbon-rating";
let $ = class extends re {
  constructor() {
    super(...arguments), this.carbonRating = void 0;
  }
  _getColour(a) {
    return a == "E" || a == "F" ? "danger" : a == "D" ? "warning" : "positive";
  }
  render() {
    return ne`
    <uui-tag .color=${this._getColour(this.carbonRating)}>
      ${this.carbonRating}
    </uui-tag>
    `;
  }
};
Q([
  ie({ type: String })
], $.prototype, "carbonRating", 2);
$ = Q([
  se(Je)
], $);
const it = (a, e) => {
  e.registerMany(xe), a.consumeContext(ee, async (t) => {
    if (!t) return;
    const i = t.getOpenApiConfiguration();
    w.setConfig({
      auth: () => t.getLatestToken(),
      baseUrl: i.base,
      credentials: i.credentials
    }), w.interceptors.request.use(async (s, o) => {
      const r = await i.token();
      return s.headers.set("Authorization", `Bearer ${r}`), s;
    }), e.registerMany([
      ...le,
      ..._e
    ]), a.provideContext(G, new P(a));
  });
};
export {
  G as S,
  $ as a,
  Le as b,
  Be as c,
  it as o
};
//# sourceMappingURL=index-K_FP3dB7.js.map
