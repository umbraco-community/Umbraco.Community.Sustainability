var Q = (a) => {
  throw TypeError(a);
};
var G = (a, e, t) => e.has(a) || Q("Cannot " + t);
var f = (a, e, t) => (G(a, e, "read from private field"), t ? t.call(a) : e.get(a)), x = (a, e, t) => e.has(a) ? Q("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(a) : e.set(a, t), I = (a, e, t, r) => (G(a, e, "write to private field"), r ? r.call(a, t) : e.set(a, t), t);
import { UMB_AUTH_CONTEXT as pe } from "@umbraco-cms/backoffice/auth";
import { UmbControllerBase as ae } from "@umbraco-cms/backoffice/class-api";
import { tryExecute as $ } from "@umbraco-cms/backoffice/resources";
import { UmbContextToken as ge } from "@umbraco-cms/backoffice/context-api";
import { UmbObjectState as K } from "@umbraco-cms/backoffice/observable-api";
import { UMB_NOTIFICATION_CONTEXT as we } from "@umbraco-cms/backoffice/notification";
import { UmbLitElement as Se } from "@umbraco-cms/backoffice/lit-element";
import { property as ve, customElement as Oe, html as Ce } from "@umbraco-cms/backoffice/external/lit";
const De = {
  type: "workspaceView",
  alias: "Umbraco.Community.Sustainability.Workspace",
  name: "Sustainability Workspace",
  js: () => import("./sustainability-workspace-view-Ce7TcbCq.js"),
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
}, Te = [De], re = "overview-root", ke = {
  type: "menuItem",
  alias: "Sustainability.MenuItem.Overview",
  name: "Overview Menu Item",
  weight: 2e3,
  meta: {
    label: "Overview",
    icon: "icon-eco",
    entityType: re,
    menus: ["Umbraco.Community.Sustainability.Menu"]
  }
}, Ae = [ke], Pe = "Sustainability.Workspace.Overview", je = "Sustainability.Workspace.Context", xe = {
  type: "workspace",
  alias: Pe,
  name: "Overview Root Workspace",
  js: () => import("./overview-workspace.element-kSav9nzK.js"),
  meta: {
    entityType: re
  }
}, Ie = {
  type: "workspaceContext",
  alias: je,
  name: "Overview Workspace Context",
  js: () => Promise.resolve().then(() => dt)
}, Ee = [
  Ie,
  xe
], Ue = [
  ...Ee,
  ...Ae
], se = "stats-root", ze = {
  type: "menuItem",
  alias: "Sustainability.MenuItem.Stats",
  name: "Stats Menu Item",
  weight: 1e3,
  meta: {
    label: "Stats",
    icon: "icon-chart",
    entityType: se,
    menus: ["Umbraco.Community.Sustainability.Menu"]
  }
}, $e = [ze], qe = "Sustainability.Workspace.Stats", _e = {
  type: "workspace",
  alias: qe,
  name: "Stats Root Workspace",
  js: () => import("./stats-workspace.element-D0MC2RuT.js"),
  meta: {
    entityType: se
  }
}, Ne = [
  _e
], Be = [
  ...Ne,
  ...$e
], B = "Umbraco.Community.Sustainability.Section", ie = "Umbraco.Community.Sustainability.Menu", Re = {
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
}, We = {
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
      match: B
    }
  ]
}, Ve = {
  type: "menu",
  alias: ie,
  name: "Sustainability Menu",
  meta: {
    label: "Sustainability"
  }
}, Me = {
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
}, Le = [
  Re,
  We,
  Ve,
  Me,
  ...Ue,
  ...Be
], He = [
  {
    type: "localization",
    alias: "Umbraco.Community.Sustainability.Localization.En",
    name: "Sustainability English Localization",
    meta: { culture: "en" },
    js: () => import("./en-Dfekyw6n.js")
  }
], Fe = {
  bodySerializer: (a) => JSON.stringify(a, (e, t) => typeof t == "bigint" ? t.toString() : t)
};
function Ye({
  onRequest: a,
  onSseError: e,
  onSseEvent: t,
  responseTransformer: r,
  responseValidator: s,
  sseDefaultRetryDelay: o,
  sseMaxRetryAttempts: i,
  sseMaxRetryDelay: n,
  sseSleepFn: c,
  url: g,
  ...u
}) {
  let l;
  const S = c ?? ((d) => new Promise((h) => setTimeout(h, d)));
  return { stream: async function* () {
    let d = o ?? 3e3, h = 0;
    const w = u.signal ?? new AbortController().signal;
    for (; !w.aborted; ) {
      h++;
      const _ = u.headers instanceof Headers ? u.headers : new Headers(u.headers);
      l !== void 0 && _.set("Last-Event-ID", l);
      try {
        const k = {
          redirect: "follow",
          ...u,
          body: u.serializedBody,
          headers: _,
          signal: w
        };
        let P = new Request(g, k);
        a && (P = await a(g, k));
        const m = await (u.fetch ?? globalThis.fetch)(P);
        if (!m.ok) throw new Error(`SSE failed: ${m.status} ${m.statusText}`);
        if (!m.body) throw new Error("No body in SSE response");
        const v = m.body.pipeThrough(new TextDecoderStream()).getReader();
        let b = "";
        const H = () => {
          try {
            v.cancel();
          } catch {
          }
        };
        w.addEventListener("abort", H);
        try {
          for (; ; ) {
            const { done: ye, value: he } = await v.read();
            if (ye) break;
            b += he, b = b.replace(/\r\n?/g, `
`);
            const F = b.split(`

`);
            b = F.pop() ?? "";
            for (const me of F) {
              const be = me.split(`
`), N = [];
              let Y;
              for (const O of be)
                if (O.startsWith("data:"))
                  N.push(O.replace(/^data:\s*/, ""));
                else if (O.startsWith("event:"))
                  Y = O.replace(/^event:\s*/, "");
                else if (O.startsWith("id:"))
                  l = O.replace(/^id:\s*/, "");
                else if (O.startsWith("retry:")) {
                  const X = Number.parseInt(O.replace(/^retry:\s*/, ""), 10);
                  Number.isNaN(X) || (d = X);
                }
              let j, J = !1;
              if (N.length) {
                const O = N.join(`
`);
                try {
                  j = JSON.parse(O), J = !0;
                } catch {
                  j = O;
                }
              }
              J && (s && await s(j), r && (j = await r(j))), t == null || t({
                data: j,
                event: Y,
                id: l,
                retry: d
              }), N.length && (yield j);
            }
          }
        } finally {
          w.removeEventListener("abort", H), v.releaseLock();
        }
        break;
      } catch (k) {
        if (e == null || e(k), i !== void 0 && h >= i)
          break;
        const P = Math.min(d * 2 ** (h - 1), n ?? 3e4);
        await S(P);
      }
    }
  }() };
}
const Je = (a) => {
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
}, Xe = (a) => {
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
}, Qe = (a) => {
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
}, ne = ({
  allowReserved: a,
  explode: e,
  name: t,
  style: r,
  value: s
}) => {
  if (!e) {
    const n = (a ? s : s.map((c) => encodeURIComponent(c))).join(Xe(r));
    switch (r) {
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
  const o = Je(r), i = s.map((n) => r === "label" || r === "simple" ? a ? n : encodeURIComponent(n) : R({
    allowReserved: a,
    name: t,
    value: n
  })).join(o);
  return r === "label" || r === "matrix" ? o + i : i;
}, R = ({
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
}, oe = ({
  allowReserved: a,
  explode: e,
  name: t,
  style: r,
  value: s,
  valueOnly: o
}) => {
  if (s instanceof Date)
    return o ? s.toISOString() : `${t}=${s.toISOString()}`;
  if (r !== "deepObject" && !e) {
    let c = [];
    Object.entries(s).forEach(([u, l]) => {
      c = [...c, u, a ? l : encodeURIComponent(l)];
    });
    const g = c.join(",");
    switch (r) {
      case "form":
        return `${t}=${g}`;
      case "label":
        return `.${g}`;
      case "matrix":
        return `;${t}=${g}`;
      default:
        return g;
    }
  }
  const i = Qe(r), n = Object.entries(s).map(
    ([c, g]) => R({
      allowReserved: a,
      name: r === "deepObject" ? `${t}[${c}]` : c,
      value: g
    })
  ).join(i);
  return r === "label" || r === "matrix" ? i + n : n;
}, Ge = /\{[^{}]+\}/g, Ke = ({ path: a, url: e }) => {
  let t = e;
  const r = e.match(Ge);
  if (r)
    for (const s of r) {
      let o = !1, i = s.substring(1, s.length - 1), n = "simple";
      i.endsWith("*") && (o = !0, i = i.substring(0, i.length - 1)), i.startsWith(".") ? (i = i.substring(1), n = "label") : i.startsWith(";") && (i = i.substring(1), n = "matrix");
      const c = a[i];
      if (c == null)
        continue;
      if (Array.isArray(c)) {
        t = t.replace(s, ne({ explode: o, name: i, style: n, value: c }));
        continue;
      }
      if (typeof c == "object") {
        t = t.replace(
          s,
          oe({
            explode: o,
            name: i,
            style: n,
            value: c,
            valueOnly: !0
          })
        );
        continue;
      }
      if (n === "matrix") {
        t = t.replace(
          s,
          `;${R({
            name: i,
            value: c
          })}`
        );
        continue;
      }
      const g = encodeURIComponent(
        n === "label" ? `.${c}` : c
      );
      t = t.replace(s, g);
    }
  return t;
}, Ze = ({
  baseUrl: a,
  path: e,
  query: t,
  querySerializer: r,
  url: s
}) => {
  const o = s.startsWith("/") ? s : `/${s}`;
  let i = (a ?? "") + o;
  e && (i = Ke({ path: e, url: i }));
  let n = t ? r(t) : "";
  return n.startsWith("?") && (n = n.substring(1)), n && (i += `?${n}`), i;
};
function Z(a) {
  const e = a.body !== void 0;
  if (e && a.bodySerializer)
    return "serializedBody" in a ? a.serializedBody !== void 0 && a.serializedBody !== "" ? a.serializedBody : null : a.body !== "" ? a.body : null;
  if (e)
    return a.body;
}
const et = async (a, e) => {
  const t = typeof e == "function" ? await e(a) : e;
  if (t)
    return a.scheme === "bearer" ? `Bearer ${t}` : a.scheme === "basic" ? `Basic ${btoa(t)}` : t;
}, ce = ({
  parameters: a = {},
  ...e
} = {}) => (r) => {
  const s = [];
  if (r && typeof r == "object")
    for (const o in r) {
      const i = r[o];
      if (i == null)
        continue;
      const n = a[o] || e;
      if (Array.isArray(i)) {
        const c = ne({
          allowReserved: n.allowReserved,
          explode: !0,
          name: o,
          style: "form",
          value: i,
          ...n.array
        });
        c && s.push(c);
      } else if (typeof i == "object") {
        const c = oe({
          allowReserved: n.allowReserved,
          explode: !0,
          name: o,
          style: "deepObject",
          value: i,
          ...n.object
        });
        c && s.push(c);
      } else {
        const c = R({
          allowReserved: n.allowReserved,
          name: o,
          value: i
        });
        c && s.push(c);
      }
    }
  return s.join("&");
}, tt = (a) => {
  var t;
  if (!a)
    return "stream";
  const e = (t = a.split(";")[0]) == null ? void 0 : t.trim();
  if (e) {
    if (e.startsWith("application/json") || e.endsWith("+json"))
      return "json";
    if (e === "multipart/form-data")
      return "formData";
    if (["application/", "audio/", "image/", "video/"].some((r) => e.startsWith(r)))
      return "blob";
    if (e.startsWith("text/"))
      return "text";
  }
}, at = (a, e) => {
  var t, r;
  return e ? !!(a.headers.has(e) || (t = a.query) != null && t[e] || (r = a.headers.get("Cookie")) != null && r.includes(`${e}=`)) : !1;
};
async function rt(a) {
  for (const e of a.security ?? []) {
    if (at(a, e.name))
      continue;
    const t = await et(e, a.auth);
    if (!t)
      continue;
    const r = e.name ?? "Authorization";
    switch (e.in) {
      case "query":
        a.query || (a.query = {}), a.query[r] = t;
        break;
      case "cookie":
        a.headers.append("Cookie", `${r}=${t}`);
        break;
      case "header":
      default:
        a.headers.set(r, t);
        break;
    }
  }
}
const ee = (a) => Ze({
  baseUrl: a.baseUrl,
  path: a.path,
  query: a.query,
  querySerializer: typeof a.querySerializer == "function" ? a.querySerializer : ce(a.querySerializer),
  url: a.url
}), te = (a, e) => {
  var r;
  const t = { ...a, ...e };
  return (r = t.baseUrl) != null && r.endsWith("/") && (t.baseUrl = t.baseUrl.substring(0, t.baseUrl.length - 1)), t.headers = le(a.headers, e.headers), t;
}, st = (a) => {
  const e = [];
  return a.forEach((t, r) => {
    e.push([r, t]);
  }), e;
}, le = (...a) => {
  const e = new Headers();
  for (const t of a) {
    if (!t)
      continue;
    const r = t instanceof Headers ? st(t) : Object.entries(t);
    for (const [s, o] of r)
      if (o === null)
        e.delete(s);
      else if (Array.isArray(o))
        for (const i of o)
          e.append(s, i);
      else o !== void 0 && e.set(
        s,
        typeof o == "object" ? JSON.stringify(o) : o
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
}), nt = ce({
  allowReserved: !1,
  array: {
    explode: !0,
    style: "form"
  },
  object: {
    explode: !0,
    style: "deepObject"
  }
}), ot = {
  "Content-Type": "application/json"
}, ue = (a = {}) => ({
  ...Fe,
  headers: ot,
  parseAs: "auto",
  querySerializer: nt,
  ...a
}), ct = (a = {}) => {
  let e = te(ue(), a);
  const t = () => ({ ...e }), r = (u) => (e = te(e, u), t()), s = it(), o = async (u) => {
    const l = {
      ...e,
      ...u,
      fetch: u.fetch ?? e.fetch ?? globalThis.fetch,
      headers: le(e.headers, u.headers),
      serializedBody: void 0
    };
    l.security && await rt(l), l.requestValidator && await l.requestValidator(l), l.body !== void 0 && l.bodySerializer && (l.serializedBody = l.bodySerializer(l.body)), (l.body === void 0 || l.serializedBody === "") && l.headers.delete("Content-Type");
    const S = l, p = ee(S);
    return { opts: S, url: p };
  }, i = async (u) => {
    const l = u.throwOnError ?? e.throwOnError, S = u.responseStyle ?? e.responseStyle;
    let p, y;
    try {
      const { opts: d, url: h } = await o(u), w = {
        redirect: "follow",
        ...d,
        body: Z(d)
      };
      p = new Request(h, w);
      for (const m of s.request.fns)
        m && (p = await m(p, d));
      const _ = d.fetch;
      y = await _(p);
      for (const m of s.response.fns)
        m && (y = await m(y, p, d));
      const k = {
        request: p,
        response: y
      };
      if (y.ok) {
        const m = (d.parseAs === "auto" ? tt(y.headers.get("Content-Type")) : d.parseAs) ?? "json";
        if (y.status === 204 || y.headers.get("Content-Length") === "0") {
          let b;
          switch (m) {
            case "arrayBuffer":
            case "blob":
            case "text":
              b = await y[m]();
              break;
            case "formData":
              b = new FormData();
              break;
            case "stream":
              b = y.body;
              break;
            case "json":
            default:
              b = {};
              break;
          }
          return d.responseStyle === "data" ? b : {
            data: b,
            ...k
          };
        }
        let v;
        switch (m) {
          case "arrayBuffer":
          case "blob":
          case "formData":
          case "text":
            v = await y[m]();
            break;
          case "json": {
            const b = await y.text();
            v = b ? JSON.parse(b) : {};
            break;
          }
          case "stream":
            return d.responseStyle === "data" ? y.body : {
              data: y.body,
              ...k
            };
        }
        return m === "json" && (d.responseValidator && await d.responseValidator(v), d.responseTransformer && (v = await d.responseTransformer(v))), d.responseStyle === "data" ? v : {
          data: v,
          ...k
        };
      }
      const P = await y.text();
      let W;
      try {
        W = JSON.parse(P);
      } catch {
      }
      throw W ?? P;
    } catch (d) {
      let h = d;
      for (const w of s.error.fns)
        w && (h = await w(h, y, p, u));
      if (h = h || {}, l)
        throw h;
      return S === "data" ? void 0 : {
        error: h,
        request: p,
        response: y
      };
    }
  }, n = (u) => (l) => i({ ...l, method: u }), c = (u) => async (l) => {
    const { opts: S, url: p } = await o(l);
    return Ye({
      ...S,
      body: S.body,
      method: u,
      onRequest: async (y, d) => {
        let h = new Request(y, d);
        for (const w of s.request.fns)
          w && (h = await w(h, S));
        return h;
      },
      serializedBody: Z(S),
      url: p
    });
  };
  return {
    buildUrl: (u) => ee({ ...e, ...u }),
    connect: n("CONNECT"),
    delete: n("DELETE"),
    get: n("GET"),
    getConfig: t,
    head: n("HEAD"),
    interceptors: s,
    options: n("OPTIONS"),
    patch: n("PATCH"),
    post: n("POST"),
    put: n("PUT"),
    request: i,
    setConfig: r,
    sse: {
      connect: c("CONNECT"),
      delete: c("DELETE"),
      get: c("GET"),
      head: c("HEAD"),
      options: c("OPTIONS"),
      patch: c("PATCH"),
      post: c("POST"),
      put: c("PUT"),
      trace: c("TRACE")
    },
    trace: n("TRACE")
  };
}, E = ct(ue({ baseUrl: "http://localhost:50172/", throwOnError: !0 }));
class q {
  static getCheckPage(e) {
    return ((e == null ? void 0 : e.client) ?? E).get({
      security: [{ scheme: "bearer", type: "http" }],
      url: "/umbraco/sustainability/api/v1/checkPage",
      ...e
    });
  }
  static getAverageData(e) {
    return ((e == null ? void 0 : e.client) ?? E).get({
      security: [{ scheme: "bearer", type: "http" }],
      url: "/umbraco/sustainability/api/v1/getAverageData",
      ...e
    });
  }
  static getOverviewData(e) {
    return ((e == null ? void 0 : e.client) ?? E).get({
      security: [{ scheme: "bearer", type: "http" }],
      url: "/umbraco/sustainability/api/v1/getOverviewData",
      ...e
    });
  }
  static getPageData(e) {
    return ((e == null ? void 0 : e.client) ?? E).get({
      security: [{ scheme: "bearer", type: "http" }],
      url: "/umbraco/sustainability/api/v1/getPageData",
      ...e
    });
  }
  static postSavePageData(e) {
    return (e.client ?? E).post({
      security: [{ scheme: "bearer", type: "http" }],
      url: "/umbraco/sustainability/api/v1/savePageData",
      ...e,
      headers: {
        "Content-Type": "application/json",
        ...e.headers
      }
    });
  }
}
var C;
class lt {
  constructor(e) {
    x(this, C);
    I(this, C, e);
  }
  async checkPage(e) {
    return await $(f(this, C), q.getCheckPage({ query: { pageGuid: e } }));
  }
  async getPageData(e) {
    return await $(f(this, C), q.getPageData({ query: { pageGuid: e } }));
  }
  async savePageData(e, t) {
    return await $(f(this, C), q.postSavePageData({
      query: { pageGuid: e },
      body: t
    }));
  }
  async getOverviewData(e, t, r, s) {
    return await $(f(this, C), q.getOverviewData({ query: { direction: e, orderBy: t, pageNumber: r, pageSize: s } }));
  }
  async getAverageData() {
    return await $(f(this, C), q.getAverageData());
  }
}
C = new WeakMap();
var D;
class ut extends ae {
  constructor(t) {
    super(t);
    x(this, D);
    I(this, D, new lt(this));
  }
  async checkPage(t) {
    return await f(this, D).checkPage(t);
  }
  async getPageData(t) {
    return await f(this, D).getPageData(t);
  }
  async savePageData(t, r) {
    return await f(this, D).savePageData(t, r);
  }
  async getOverviewData(t, r, s, o) {
    return await f(this, D).getOverviewData(t, r, s, o);
  }
  async getAverageData() {
    return await f(this, D).getAverageData();
  }
}
D = new WeakMap();
var T, A, U, z;
class M extends ae {
  constructor(t) {
    super(t);
    x(this, T);
    x(this, A);
    x(this, U);
    x(this, z);
    I(this, U, new K(void 0)), this.overviewData = f(this, U).asObservable(), I(this, z, new K(void 0)), this.averageData = f(this, z).asObservable(), I(this, T, new ut(this)), this.consumeContext(we, (r) => {
      I(this, A, r);
    });
  }
  async checkPage(t, r = !0) {
    var i;
    const { data: s, error: o } = await f(this, T).checkPage(t);
    if (o) {
      (i = f(this, A)) == null || i.peek("danger", {
        data: { message: "Failed to check page sustainability." }
      });
      return;
    }
    if (s)
      return r || await this.savePageData(t, s), s;
  }
  async getPageData(t) {
    var o;
    const { data: r, error: s } = await f(this, T).getPageData(t);
    if (s) {
      (o = f(this, A)) == null || o.peek("danger", {
        data: { message: "Failed to load page data." }
      });
      return;
    }
    if (r)
      return r;
  }
  async savePageData(t, r) {
    return await f(this, T).savePageData(t, r);
  }
  async getOverviewData(t, r, s, o) {
    var c;
    const { data: i, error: n } = await f(this, T).getOverviewData(t, r, s, o);
    if (n) {
      (c = f(this, A)) == null || c.peek("danger", {
        data: { message: "Failed to load overview data." }
      });
      return;
    }
    i && f(this, U).setValue(i);
  }
  async getAverageData() {
    var s;
    const { data: t, error: r } = await f(this, T).getAverageData();
    if (r) {
      (s = f(this, A)) == null || s.peek("danger", {
        data: { message: "Failed to load average data." }
      });
      return;
    }
    t && f(this, z).setValue(t);
  }
}
T = new WeakMap(), A = new WeakMap(), U = new WeakMap(), z = new WeakMap();
const de = new ge("SustainabilityContext"), dt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SUSTAINABILITY_CONTEXT: de,
  SustainabilityContext: M,
  default: M
}, Symbol.toStringTag, { value: "Module" }));
var ft = Object.defineProperty, yt = Object.getOwnPropertyDescriptor, fe = (a, e, t, r) => {
  for (var s = r > 1 ? void 0 : r ? yt(e, t) : e, o = a.length - 1, i; o >= 0; o--)
    (i = a[o]) && (s = (r ? i(e, t, s) : i(s)) || s);
  return r && s && ft(e, t, s), s;
};
const ht = "sustainability-carbon-rating";
let L = class extends Se {
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
fe([
  ve({ type: String })
], L.prototype, "carbonRating", 2);
L = fe([
  Oe(ht)
], L);
const Dt = (a, e) => {
  e.registerMany(He), a.consumeContext(pe, async (t) => {
    if (!t) return;
    const r = t.getOpenApiConfiguration();
    E.setConfig({
      auth: () => t.getLatestToken(),
      baseUrl: r.base,
      credentials: r.credentials
    }), E.interceptors.request.use(async (s, o) => {
      const i = await r.token();
      return s.headers.set("Authorization", `Bearer ${i}`), s;
    }), e.registerMany([
      ...Te,
      ...Le
    ]), a.provideContext(de, new M(a));
  });
};
export {
  de as S,
  L as a,
  ut as b,
  lt as c,
  Dt as o
};
//# sourceMappingURL=index-RhASU_aP.js.map
