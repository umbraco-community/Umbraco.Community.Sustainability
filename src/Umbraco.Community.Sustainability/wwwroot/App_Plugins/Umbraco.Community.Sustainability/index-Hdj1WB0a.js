var Q = (a) => {
  throw TypeError(a);
};
var G = (a, e, t) => e.has(a) || Q("Cannot " + t);
var d = (a, e, t) => (G(a, e, "read from private field"), t ? t.call(a) : e.get(a)), j = (a, e, t) => e.has(a) ? Q("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(a) : e.set(a, t), x = (a, e, t, r) => (G(a, e, "write to private field"), r ? r.call(a, t) : e.set(a, t), t);
import { UMB_AUTH_CONTEXT as be } from "@umbraco-cms/backoffice/auth";
import { UmbControllerBase as te } from "@umbraco-cms/backoffice/class-api";
import { tryExecute as z } from "@umbraco-cms/backoffice/resources";
import { UmbContextToken as ge } from "@umbraco-cms/backoffice/context-api";
import { UmbObjectState as K } from "@umbraco-cms/backoffice/observable-api";
import { UMB_NOTIFICATION_CONTEXT as pe } from "@umbraco-cms/backoffice/notification";
import { UmbLitElement as Se } from "@umbraco-cms/backoffice/lit-element";
import { property as we, customElement as ve, html as Ce } from "@umbraco-cms/backoffice/external/lit";
const ke = {
  type: "workspaceContext",
  alias: "Sustainability.Workspace.Context",
  name: "Overview Workspace Context",
  js: () => Promise.resolve().then(() => ut)
}, Te = [
  ke
], De = {
  type: "workspaceView",
  alias: "Umbraco.Community.Sustainability.Workspace",
  name: "Sustainability Workspace",
  js: () => import("./sustainability-workspace-view-eQyinATQ.js"),
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
}, Oe = [De], ae = "stats-root", Ae = {
  type: "menuItem",
  alias: "Sustainability.MenuItem.Stats",
  name: "Stats Menu Item",
  weight: 1e3,
  meta: {
    label: "Stats",
    icon: "icon-chart",
    entityType: ae,
    menus: ["Umbraco.Community.Sustainability.Menu"]
  }
}, Pe = [Ae], je = "Sustainability.Workspace.Stats", xe = {
  type: "workspace",
  alias: je,
  name: "Stats Root Workspace",
  js: () => import("./stats-workspace.element-C85froR8.js"),
  meta: {
    entityType: ae
  }
}, Ie = [
  xe
], Ee = [
  ...Ie,
  ...Pe
], re = "sitecheck-root", Ue = {
  type: "workspace",
  alias: "Sustainability.Workspace.SiteCheck",
  name: "Site Check Workspace",
  element: () => import("./sitecheck-workspace.element-DRv_XzMC.js"),
  meta: {
    entityType: re
  }
  //routes: [
  //  {
  //    path: "sitecheck",
  //    component: () => import("./sitecheck-workspace.element.js"),
  //  },
  //],
}, $e = [Ue], ze = {
  type: "menuItem",
  alias: "Umbraco.Community.Sustainability.MenuItem.SiteCheck",
  name: "Site Check",
  weight: 1500,
  meta: {
    label: "#sustainability_siteCheck",
    icon: "icon-globe",
    entityType: re,
    menus: ["Umbraco.Community.Sustainability.Menu"]
  }
}, qe = [ze], _e = [...$e, ...qe], B = "Umbraco.Community.Sustainability.Section", ie = "Umbraco.Community.Sustainability.Menu", Ne = {
  type: "section",
  alias: B,
  name: "Sustainability Section",
  weight: 0,
  meta: {
    label: "Sustainability",
    pathname: "sustainability"
  },
  conditions: [
    {
      alias: "Umb.Condition.SectionUserPermission",
      match: B
    }
  ]
}, Be = {
  type: "sectionView",
  alias: "Umbraco.Community.Sustainability.SectionView",
  name: "Sustainability Section View",
  element: () => import("./sustainability-section-view.element-D7H-O_qW.js"),
  meta: {
    label: "Sustainability",
    icon: "icon-eco",
    pathname: "view"
  },
  conditions: [
    {
      alias: "Umb.Condition.SectionAlias",
      match: B
    }
  ]
}, We = {
  type: "menu",
  alias: ie,
  name: "Sustainability Menu",
  meta: {
    label: "Sustainability"
  }
}, Re = {
  type: "sectionSidebarApp",
  kind: "menu",
  alias: "Umbraco.Community.Sustainability.SectionSidebar",
  name: "Sustainability Section Sidebar Menu",
  weight: 200,
  meta: {
    label: "Sustainability",
    menu: ie
  },
  conditions: [
    {
      alias: "Umb.Condition.SectionAlias",
      match: B
    }
  ]
}, Ve = [
  Ne,
  Be,
  We,
  Re,
  ...Ee,
  ..._e
], Me = [
  {
    type: "localization",
    alias: "Umbraco.Community.Sustainability.Localization.En",
    name: "Sustainability English Localization",
    meta: { culture: "en" },
    js: () => import("./en-CCz9c5T6.js")
  }
], He = {
  bodySerializer: (a) => JSON.stringify(
    a,
    (e, t) => typeof t == "bigint" ? t.toString() : t
  )
}, Le = ({
  onRequest: a,
  onSseError: e,
  onSseEvent: t,
  responseTransformer: r,
  responseValidator: i,
  sseDefaultRetryDelay: c,
  sseMaxRetryAttempts: s,
  sseMaxRetryDelay: o,
  sseSleepFn: l,
  url: f,
  ...n
}) => {
  let h;
  const U = l ?? ((u) => new Promise((y) => setTimeout(y, u)));
  return { stream: async function* () {
    let u = c ?? 3e3, y = 0;
    const O = n.signal ?? new AbortController().signal;
    for (; !O.aborted; ) {
      y++;
      const $ = n.headers instanceof Headers ? n.headers : new Headers(n.headers);
      h !== void 0 && $.set("Last-Event-ID", h);
      try {
        const A = {
          redirect: "follow",
          ...n,
          body: n.serializedBody,
          headers: $,
          signal: O
        };
        let p = new Request(f, A);
        a && (p = await a(f, A));
        const b = await (n.fetch ?? globalThis.fetch)(p);
        if (!b.ok)
          throw new Error(
            `SSE failed: ${b.status} ${b.statusText}`
          );
        if (!b.body) throw new Error("No body in SSE response");
        const S = b.body.pipeThrough(new TextDecoderStream()).getReader();
        let R = "";
        const L = () => {
          try {
            S.cancel();
          } catch {
          }
        };
        O.addEventListener("abort", L);
        try {
          for (; ; ) {
            const { done: fe, value: he } = await S.read();
            if (fe) break;
            R += he;
            const F = R.split(`

`);
            R = F.pop() ?? "";
            for (const me of F) {
              const ye = me.split(`
`), N = [];
              let Y;
              for (const g of ye)
                if (g.startsWith("data:"))
                  N.push(g.replace(/^data:\s*/, ""));
                else if (g.startsWith("event:"))
                  Y = g.replace(/^event:\s*/, "");
                else if (g.startsWith("id:"))
                  h = g.replace(/^id:\s*/, "");
                else if (g.startsWith("retry:")) {
                  const X = Number.parseInt(
                    g.replace(/^retry:\s*/, ""),
                    10
                  );
                  Number.isNaN(X) || (u = X);
                }
              let P, J = !1;
              if (N.length) {
                const g = N.join(`
`);
                try {
                  P = JSON.parse(g), J = !0;
                } catch {
                  P = g;
                }
              }
              J && (i && await i(P), r && (P = await r(P))), t == null || t({
                data: P,
                event: Y,
                id: h,
                retry: u
              }), N.length && (yield P);
            }
          }
        } finally {
          O.removeEventListener("abort", L), S.releaseLock();
        }
        break;
      } catch (A) {
        if (e == null || e(A), s !== void 0 && y >= s)
          break;
        const p = Math.min(
          u * 2 ** (y - 1),
          o ?? 3e4
        );
        await U(p);
      }
    }
  }() };
}, Fe = (a) => {
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
}, Ye = (a) => {
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
}, Je = (a) => {
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
}, se = ({
  allowReserved: a,
  explode: e,
  name: t,
  style: r,
  value: i
}) => {
  if (!e) {
    const o = (a ? i : i.map((l) => encodeURIComponent(l))).join(Ye(r));
    switch (r) {
      case "label":
        return `.${o}`;
      case "matrix":
        return `;${t}=${o}`;
      case "simple":
        return o;
      default:
        return `${t}=${o}`;
    }
  }
  const c = Fe(r), s = i.map((o) => r === "label" || r === "simple" ? a ? o : encodeURIComponent(o) : W({
    allowReserved: a,
    name: t,
    value: o
  })).join(c);
  return r === "label" || r === "matrix" ? c + s : s;
}, W = ({
  allowReserved: a,
  name: e,
  value: t
}) => {
  if (t == null)
    return "";
  if (typeof t == "object")
    throw new Error(
      "Deeply-nested arrays/objects aren’t supported. Provide your own `querySerializer()` to handle these."
    );
  return `${e}=${a ? t : encodeURIComponent(t)}`;
}, ne = ({
  allowReserved: a,
  explode: e,
  name: t,
  style: r,
  value: i,
  valueOnly: c
}) => {
  if (i instanceof Date)
    return c ? i.toISOString() : `${t}=${i.toISOString()}`;
  if (r !== "deepObject" && !e) {
    let l = [];
    Object.entries(i).forEach(([n, h]) => {
      l = [
        ...l,
        n,
        a ? h : encodeURIComponent(h)
      ];
    });
    const f = l.join(",");
    switch (r) {
      case "form":
        return `${t}=${f}`;
      case "label":
        return `.${f}`;
      case "matrix":
        return `;${t}=${f}`;
      default:
        return f;
    }
  }
  const s = Je(r), o = Object.entries(i).map(
    ([l, f]) => W({
      allowReserved: a,
      name: r === "deepObject" ? `${t}[${l}]` : l,
      value: f
    })
  ).join(s);
  return r === "label" || r === "matrix" ? s + o : o;
}, Xe = /\{[^{}]+\}/g, Qe = ({ path: a, url: e }) => {
  let t = e;
  const r = e.match(Xe);
  if (r)
    for (const i of r) {
      let c = !1, s = i.substring(1, i.length - 1), o = "simple";
      s.endsWith("*") && (c = !0, s = s.substring(0, s.length - 1)), s.startsWith(".") ? (s = s.substring(1), o = "label") : s.startsWith(";") && (s = s.substring(1), o = "matrix");
      const l = a[s];
      if (l == null)
        continue;
      if (Array.isArray(l)) {
        t = t.replace(
          i,
          se({ explode: c, name: s, style: o, value: l })
        );
        continue;
      }
      if (typeof l == "object") {
        t = t.replace(
          i,
          ne({
            explode: c,
            name: s,
            style: o,
            value: l,
            valueOnly: !0
          })
        );
        continue;
      }
      if (o === "matrix") {
        t = t.replace(
          i,
          `;${W({
            name: s,
            value: l
          })}`
        );
        continue;
      }
      const f = encodeURIComponent(
        o === "label" ? `.${l}` : l
      );
      t = t.replace(i, f);
    }
  return t;
}, Ge = ({
  baseUrl: a,
  path: e,
  query: t,
  querySerializer: r,
  url: i
}) => {
  const c = i.startsWith("/") ? i : `/${i}`;
  let s = (a ?? "") + c;
  e && (s = Qe({ path: e, url: s }));
  let o = t ? r(t) : "";
  return o.startsWith("?") && (o = o.substring(1)), o && (s += `?${o}`), s;
};
function Ke(a) {
  const e = a.body !== void 0;
  if (e && a.bodySerializer)
    return "serializedBody" in a ? a.serializedBody !== void 0 && a.serializedBody !== "" ? a.serializedBody : null : a.body !== "" ? a.body : null;
  if (e)
    return a.body;
}
const Ze = async (a, e) => {
  const t = typeof e == "function" ? await e(a) : e;
  if (t)
    return a.scheme === "bearer" ? `Bearer ${t}` : a.scheme === "basic" ? `Basic ${btoa(t)}` : t;
}, oe = ({
  allowReserved: a,
  array: e,
  object: t
} = {}) => (i) => {
  const c = [];
  if (i && typeof i == "object")
    for (const s in i) {
      const o = i[s];
      if (o != null)
        if (Array.isArray(o)) {
          const l = se({
            allowReserved: a,
            explode: !0,
            name: s,
            style: "form",
            value: o,
            ...e
          });
          l && c.push(l);
        } else if (typeof o == "object") {
          const l = ne({
            allowReserved: a,
            explode: !0,
            name: s,
            style: "deepObject",
            value: o,
            ...t
          });
          l && c.push(l);
        } else {
          const l = W({
            allowReserved: a,
            name: s,
            value: o
          });
          l && c.push(l);
        }
    }
  return c.join("&");
}, et = (a) => {
  var t;
  if (!a)
    return "stream";
  const e = (t = a.split(";")[0]) == null ? void 0 : t.trim();
  if (e) {
    if (e.startsWith("application/json") || e.endsWith("+json"))
      return "json";
    if (e === "multipart/form-data")
      return "formData";
    if (["application/", "audio/", "image/", "video/"].some(
      (r) => e.startsWith(r)
    ))
      return "blob";
    if (e.startsWith("text/"))
      return "text";
  }
}, tt = (a, e) => {
  var t, r;
  return e ? !!(a.headers.has(e) || (t = a.query) != null && t[e] || (r = a.headers.get("Cookie")) != null && r.includes(`${e}=`)) : !1;
}, at = async ({
  security: a,
  ...e
}) => {
  for (const t of a) {
    if (tt(e, t.name))
      continue;
    const r = await Ze(t, e.auth);
    if (!r)
      continue;
    const i = t.name ?? "Authorization";
    switch (t.in) {
      case "query":
        e.query || (e.query = {}), e.query[i] = r;
        break;
      case "cookie":
        e.headers.append("Cookie", `${i}=${r}`);
        break;
      case "header":
      default:
        e.headers.set(i, r);
        break;
    }
  }
}, Z = (a) => Ge({
  baseUrl: a.baseUrl,
  path: a.path,
  query: a.query,
  querySerializer: typeof a.querySerializer == "function" ? a.querySerializer : oe(a.querySerializer),
  url: a.url
}), ee = (a, e) => {
  var r;
  const t = { ...a, ...e };
  return (r = t.baseUrl) != null && r.endsWith("/") && (t.baseUrl = t.baseUrl.substring(0, t.baseUrl.length - 1)), t.headers = ce(a.headers, e.headers), t;
}, rt = (a) => {
  const e = [];
  return a.forEach((t, r) => {
    e.push([r, t]);
  }), e;
}, ce = (...a) => {
  const e = new Headers();
  for (const t of a) {
    if (!t)
      continue;
    const r = t instanceof Headers ? rt(t) : Object.entries(t);
    for (const [i, c] of r)
      if (c === null)
        e.delete(i);
      else if (Array.isArray(c))
        for (const s of c)
          e.append(i, s);
      else c !== void 0 && e.set(
        i,
        typeof c == "object" ? JSON.stringify(c) : c
      );
  }
  return e;
};
class V {
  constructor() {
    this.fns = [];
  }
  clear() {
    this.fns = [];
  }
  eject(e) {
    const t = this.getInterceptorIndex(e);
    this.fns[t] && (this.fns[t] = null);
  }
  exists(e) {
    const t = this.getInterceptorIndex(e);
    return !!this.fns[t];
  }
  getInterceptorIndex(e) {
    return typeof e == "number" ? this.fns[e] ? e : -1 : this.fns.indexOf(e);
  }
  update(e, t) {
    const r = this.getInterceptorIndex(e);
    return this.fns[r] ? (this.fns[r] = t, e) : !1;
  }
  use(e) {
    return this.fns.push(e), this.fns.length - 1;
  }
}
const it = () => ({
  error: new V(),
  request: new V(),
  response: new V()
}), st = oe({
  allowReserved: !1,
  array: {
    explode: !0,
    style: "form"
  },
  object: {
    explode: !0,
    style: "deepObject"
  }
}), nt = {
  "Content-Type": "application/json"
}, le = (a = {}) => ({
  ...He,
  headers: nt,
  parseAs: "auto",
  querySerializer: st,
  ...a
}), ot = (a = {}) => {
  let e = ee(le(), a);
  const t = () => ({ ...e }), r = (f) => (e = ee(e, f), t()), i = it(), c = async (f) => {
    const n = {
      ...e,
      ...f,
      fetch: f.fetch ?? e.fetch ?? globalThis.fetch,
      headers: ce(e.headers, f.headers),
      serializedBody: void 0
    };
    n.security && await at({
      ...n,
      security: n.security
    }), n.requestValidator && await n.requestValidator(n), n.body !== void 0 && n.bodySerializer && (n.serializedBody = n.bodySerializer(n.body)), (n.body === void 0 || n.serializedBody === "") && n.headers.delete("Content-Type");
    const h = Z(n);
    return { opts: n, url: h };
  }, s = async (f) => {
    const { opts: n, url: h } = await c(f), U = {
      redirect: "follow",
      ...n,
      body: Ke(n)
    };
    let w = new Request(h, U);
    for (const m of i.request.fns)
      m && (w = await m(w, n));
    const _ = n.fetch;
    let u = await _(w);
    for (const m of i.response.fns)
      m && (u = await m(u, w, n));
    const y = {
      request: w,
      response: u
    };
    if (u.ok) {
      const m = (n.parseAs === "auto" ? et(u.headers.get("Content-Type")) : n.parseAs) ?? "json";
      if (u.status === 204 || u.headers.get("Content-Length") === "0") {
        let S;
        switch (m) {
          case "arrayBuffer":
          case "blob":
          case "text":
            S = await u[m]();
            break;
          case "formData":
            S = new FormData();
            break;
          case "stream":
            S = u.body;
            break;
          case "json":
          default:
            S = {};
            break;
        }
        return n.responseStyle === "data" ? S : {
          data: S,
          ...y
        };
      }
      let b;
      switch (m) {
        case "arrayBuffer":
        case "blob":
        case "formData":
        case "json":
        case "text":
          b = await u[m]();
          break;
        case "stream":
          return n.responseStyle === "data" ? u.body : {
            data: u.body,
            ...y
          };
      }
      return m === "json" && (n.responseValidator && await n.responseValidator(b), n.responseTransformer && (b = await n.responseTransformer(b))), n.responseStyle === "data" ? b : {
        data: b,
        ...y
      };
    }
    const O = await u.text();
    let $;
    try {
      $ = JSON.parse(O);
    } catch {
    }
    const A = $ ?? O;
    let p = A;
    for (const m of i.error.fns)
      m && (p = await m(A, u, w, n));
    if (p = p || {}, n.throwOnError)
      throw p;
    return n.responseStyle === "data" ? void 0 : {
      error: p,
      ...y
    };
  }, o = (f) => (n) => s({ ...n, method: f }), l = (f) => async (n) => {
    const { opts: h, url: U } = await c(n);
    return Le({
      ...h,
      body: h.body,
      headers: h.headers,
      method: f,
      onRequest: async (w, _) => {
        let u = new Request(w, _);
        for (const y of i.request.fns)
          y && (u = await y(u, h));
        return u;
      },
      url: U
    });
  };
  return {
    buildUrl: Z,
    connect: o("CONNECT"),
    delete: o("DELETE"),
    get: o("GET"),
    getConfig: t,
    head: o("HEAD"),
    interceptors: i,
    options: o("OPTIONS"),
    patch: o("PATCH"),
    post: o("POST"),
    put: o("PUT"),
    request: s,
    setConfig: r,
    sse: {
      connect: l("CONNECT"),
      delete: l("DELETE"),
      get: l("GET"),
      head: l("HEAD"),
      options: l("OPTIONS"),
      patch: l("PATCH"),
      post: l("POST"),
      put: l("PUT"),
      trace: l("TRACE")
    },
    trace: o("TRACE")
  };
}, v = ot(le({
  baseUrl: "http://localhost:50172",
  throwOnError: !0
}));
class q {
  static checkPage(e) {
    return ((e == null ? void 0 : e.client) ?? v).get({
      url: "/umbraco/sustainability/api/v1/checkPage",
      ...e
    });
  }
  static getAverageData(e) {
    return ((e == null ? void 0 : e.client) ?? v).get({
      url: "/umbraco/sustainability/api/v1/getAverageData",
      ...e
    });
  }
  static getOverviewData(e) {
    return ((e == null ? void 0 : e.client) ?? v).get({
      url: "/umbraco/sustainability/api/v1/getOverviewData",
      ...e
    });
  }
  static getPageData(e) {
    return ((e == null ? void 0 : e.client) ?? v).get({
      url: "/umbraco/sustainability/api/v1/getPageData",
      ...e
    });
  }
  static isSiteCheckRunning(e) {
    return ((e == null ? void 0 : e.client) ?? v).get({
      url: "/umbraco/sustainability/api/v1/isSiteCheckRunning",
      ...e
    });
  }
  static savePageData(e) {
    return ((e == null ? void 0 : e.client) ?? v).post({
      url: "/umbraco/sustainability/api/v1/savePageData",
      ...e,
      headers: {
        "Content-Type": "application/json",
        ...e == null ? void 0 : e.headers
      }
    });
  }
  static startSiteCheck(e) {
    return ((e == null ? void 0 : e.client) ?? v).sse.get({
      url: "/umbraco/sustainability/api/v1/startSiteCheck",
      ...e
    });
  }
}
var C;
class ct {
  constructor(e) {
    j(this, C);
    x(this, C, e);
  }
  async checkPage(e) {
    return await z(d(this, C), q.checkPage({ query: { pageGuid: e } }));
  }
  async getPageData(e) {
    return await z(d(this, C), q.getPageData({ query: { pageGuid: e } }));
  }
  async savePageData(e, t) {
    return await z(d(this, C), q.savePageData({
      query: { pageGuid: e },
      body: t
    }));
  }
  async getOverviewData(e, t, r, i) {
    return await z(d(this, C), q.getOverviewData({ query: { direction: e, orderBy: t, pageNumber: r, pageSize: i } }));
  }
  async getAverageData() {
    return await z(d(this, C), q.getAverageData());
  }
}
C = new WeakMap();
var k;
class lt extends te {
  constructor(t) {
    super(t);
    j(this, k);
    x(this, k, new ct(this));
  }
  async checkPage(t) {
    return await d(this, k).checkPage(t);
  }
  async getPageData(t) {
    return await d(this, k).getPageData(t);
  }
  async savePageData(t, r) {
    return await d(this, k).savePageData(t, r);
  }
  async getOverviewData(t, r, i, c) {
    return await d(this, k).getOverviewData(t, r, i, c);
  }
  async getAverageData() {
    return await d(this, k).getAverageData();
  }
}
k = new WeakMap();
var T, D, I, E;
class M extends te {
  constructor(t) {
    super(t);
    j(this, T);
    j(this, D);
    j(this, I);
    j(this, E);
    x(this, I, new K(void 0)), this.overviewData = d(this, I).asObservable(), x(this, E, new K(void 0)), this.averageData = d(this, E).asObservable(), x(this, T, new lt(this)), this.consumeContext(pe, (r) => {
      x(this, D, r);
    });
  }
  async checkPage(t, r = !0) {
    var s;
    const { data: i, error: c } = await d(this, T).checkPage(t);
    if (c) {
      (s = d(this, D)) == null || s.peek("danger", {
        data: { message: "Failed to check page sustainability." }
      });
      return;
    }
    if (i)
      return r || await this.savePageData(t, i), i;
  }
  async getPageData(t) {
    var c;
    const { data: r, error: i } = await d(this, T).getPageData(t);
    if (i) {
      (c = d(this, D)) == null || c.peek("danger", {
        data: { message: "Failed to load page data." }
      });
      return;
    }
    if (r)
      return r;
  }
  async savePageData(t, r) {
    return await d(this, T).savePageData(t, r);
  }
  async getOverviewData(t, r, i, c) {
    var l;
    const { data: s, error: o } = await d(this, T).getOverviewData(t, r, i, c);
    if (o) {
      (l = d(this, D)) == null || l.peek("danger", {
        data: { message: "Failed to load overview data." }
      });
      return;
    }
    s && d(this, I).setValue(s);
  }
  async getAverageData() {
    var i;
    const { data: t, error: r } = await d(this, T).getAverageData();
    if (r) {
      (i = d(this, D)) == null || i.peek("danger", {
        data: { message: "Failed to load average data." }
      });
      return;
    }
    t && d(this, E).setValue(t);
  }
}
T = new WeakMap(), D = new WeakMap(), I = new WeakMap(), E = new WeakMap();
const ue = new ge("SustainabilityContext"), ut = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SUSTAINABILITY_CONTEXT: ue,
  SustainabilityContext: M,
  default: M
}, Symbol.toStringTag, { value: "Module" }));
var dt = Object.defineProperty, ft = Object.getOwnPropertyDescriptor, de = (a, e, t, r) => {
  for (var i = r > 1 ? void 0 : r ? ft(e, t) : e, c = a.length - 1, s; c >= 0; c--)
    (s = a[c]) && (i = (r ? s(e, t, i) : s(i)) || i);
  return r && i && dt(e, t, i), i;
};
const ht = "sustainability-carbon-rating";
let H = class extends Se {
  constructor() {
    super(...arguments), this.carbonRating = void 0;
  }
  _getColour(a) {
    return a == "E" || a == "F" ? "danger" : a == "D" ? "warning" : "positive";
  }
  render() {
    return Ce`
    <uui-tag .color=${this._getColour(this.carbonRating)}>
      ${this.carbonRating}
    </uui-tag>
    `;
  }
};
de([
  we({ type: String })
], H.prototype, "carbonRating", 2);
H = de([
  ve(ht)
], H);
const kt = (a, e) => {
  e.registerMany(Me), a.consumeContext(be, async (t) => {
    if (!t) return;
    const r = t.getOpenApiConfiguration();
    v.setConfig({
      auth: () => t.getLatestToken(),
      baseUrl: r.base,
      credentials: r.credentials
    }), v.interceptors.request.use(async (i, c) => {
      const s = await r.token();
      return i.headers.set("Authorization", `Bearer ${s}`), i;
    }), e.registerMany([
      ...Te,
      ...Oe,
      ...Ve
    ]), a.provideContext(ue, new M(a));
  });
};
export {
  ue as S,
  q as a,
  H as b,
  lt as c,
  ct as d,
  kt as o
};
//# sourceMappingURL=index-Hdj1WB0a.js.map
