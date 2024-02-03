var S = (e, t, i) => {
  if (!t.has(e))
    throw TypeError("Cannot " + i);
};
var c = (e, t, i) => (S(e, t, "read from private field"), i ? i.call(e) : t.get(e)), l = (e, t, i) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, i);
}, p = (e, t, i, n) => (S(e, t, "write to private field"), n ? n.call(e, i) : t.set(e, i), i);
import { UmbBaseController as R } from "@umbraco-cms/backoffice/class-api";
import { tryExecuteAndNotify as m } from "@umbraco-cms/backoffice/resources";
import { UmbContextToken as I } from "@umbraco-cms/backoffice/context-api";
import { UMB_AUTH_CONTEXT as G } from "@umbraco-cms/backoffice/auth";
import { UmbStringState as O } from "@umbraco-cms/backoffice/observable-api";
const C = "http://localhost".replace(/\/+$/, "");
class A {
  constructor(t = {}) {
    this.configuration = t;
  }
  set config(t) {
    this.configuration = t;
  }
  get basePath() {
    return this.configuration.basePath != null ? this.configuration.basePath : C;
  }
  get fetchApi() {
    return this.configuration.fetchApi;
  }
  get middleware() {
    return this.configuration.middleware || [];
  }
  get queryParamsStringify() {
    return this.configuration.queryParamsStringify || D;
  }
  get username() {
    return this.configuration.username;
  }
  get password() {
    return this.configuration.password;
  }
  get apiKey() {
    const t = this.configuration.apiKey;
    if (t)
      return typeof t == "function" ? t : () => t;
  }
  get accessToken() {
    const t = this.configuration.accessToken;
    if (t)
      return typeof t == "function" ? t : async () => t;
  }
  get headers() {
    return this.configuration.headers;
  }
  get credentials() {
    return this.configuration.credentials;
  }
}
const q = new A(), y = class y {
  constructor(t = q) {
    this.configuration = t, this.fetchApi = async (i, n) => {
      let r = { url: i, init: n };
      for (const s of this.middleware)
        s.pre && (r = await s.pre({
          fetch: this.fetchApi,
          ...r
        }) || r);
      let a;
      try {
        a = await (this.configuration.fetchApi || fetch)(r.url, r.init);
      } catch (s) {
        for (const o of this.middleware)
          o.onError && (a = await o.onError({
            fetch: this.fetchApi,
            url: r.url,
            init: r.init,
            error: s,
            response: a ? a.clone() : void 0
          }) || a);
        if (a === void 0)
          throw s instanceof Error ? new x(s, "The request failed and the interceptors did not return an alternative response") : s;
      }
      for (const s of this.middleware)
        s.post && (a = await s.post({
          fetch: this.fetchApi,
          url: r.url,
          init: r.init,
          response: a.clone()
        }) || a);
      return a;
    }, this.middleware = t.middleware;
  }
  withMiddleware(...t) {
    const i = this.clone();
    return i.middleware = i.middleware.concat(...t), i;
  }
  withPreMiddleware(...t) {
    const i = t.map((n) => ({ pre: n }));
    return this.withMiddleware(...i);
  }
  withPostMiddleware(...t) {
    const i = t.map((n) => ({ post: n }));
    return this.withMiddleware(...i);
  }
  /**
   * Check if the given MIME is a JSON MIME.
   * JSON MIME examples:
   *   application/json
   *   application/json; charset=UTF8
   *   APPLICATION/JSON
   *   application/vnd.company+json
   * @param mime - MIME (Multipurpose Internet Mail Extensions)
   * @return True if the given MIME is JSON, false otherwise.
   */
  isJsonMime(t) {
    return t ? y.jsonRegex.test(t) : !1;
  }
  async request(t, i) {
    const { url: n, init: r } = await this.createFetchParams(t, i), a = await this.fetchApi(n, r);
    if (a && a.status >= 200 && a.status < 300)
      return a;
    throw new U(a, "Response returned an error code");
  }
  async createFetchParams(t, i) {
    let n = this.configuration.basePath + t.path;
    t.query !== void 0 && Object.keys(t.query).length !== 0 && (n += "?" + this.configuration.queryParamsStringify(t.query));
    const r = Object.assign({}, this.configuration.headers, t.headers);
    Object.keys(r).forEach((b) => r[b] === void 0 ? delete r[b] : {});
    const a = typeof i == "function" ? i : async () => i, s = {
      method: t.method,
      headers: r,
      body: t.body,
      credentials: this.configuration.credentials
    }, o = {
      ...s,
      ...await a({
        init: s,
        context: t
      })
    };
    let g;
    N(o.body) || o.body instanceof URLSearchParams || V(o.body) ? g = o.body : this.isJsonMime(r["Content-Type"]) ? g = JSON.stringify(o.body) : g = o.body;
    const E = {
      ...o,
      body: g
    };
    return { url: n, init: E };
  }
  /**
   * Create a shallow clone of `this` by constructing a new instance
   * and then shallow cloning data members.
   */
  clone() {
    const t = this.constructor, i = new t(this.configuration);
    return i.middleware = this.middleware.slice(), i;
  }
};
y.jsonRegex = new RegExp("^(:?application/json|[^;/ 	]+/[^;/ 	]+[+]json)[ 	]*(:?;.*)?$", "i");
let w = y;
function V(e) {
  return typeof Blob < "u" && e instanceof Blob;
}
function N(e) {
  return typeof FormData < "u" && e instanceof FormData;
}
class U extends Error {
  constructor(t, i) {
    super(i), this.response = t, this.name = "ResponseError";
  }
}
class x extends Error {
  constructor(t, i) {
    super(i), this.cause = t, this.name = "FetchError";
  }
}
function D(e, t = "") {
  return Object.keys(e).map((i) => T(i, e[i], t)).filter((i) => i.length > 0).join("&");
}
function T(e, t, i = "") {
  const n = i + (i.length ? `[${e}]` : e);
  if (t instanceof Array) {
    const r = t.map((a) => encodeURIComponent(String(a))).join(`&${encodeURIComponent(n)}=`);
    return `${encodeURIComponent(n)}=${r}`;
  }
  if (t instanceof Set) {
    const r = Array.from(t);
    return T(e, r, i);
  }
  return t instanceof Date ? `${encodeURIComponent(n)}=${encodeURIComponent(t.toISOString())}` : t instanceof Object ? D(t, n) : `${encodeURIComponent(n)}=${encodeURIComponent(String(t))}`;
}
class M {
  constructor(t, i = (n) => n) {
    this.raw = t, this.transformer = i;
  }
  async value() {
    return this.transformer(await this.raw.json());
  }
}
class P {
  constructor(t) {
    this.raw = t;
  }
  async value() {
  }
}
class j {
  constructor(t) {
    this.raw = t;
  }
  async value() {
    return await this.raw.text();
  }
}
function k(e) {
  let t = !0;
  return t = t && "size" in e, t;
}
function J(e) {
  if (e !== void 0)
    return e === null ? null : {
      url: e.url,
      size: e.size
    };
}
function v(e) {
  if (e !== void 0)
    return e === null ? null : k(e) ? J(e) : {};
}
function $(e) {
  let t = !0;
  return t = t && "type" in e, t = t && "totalSize" in e, t;
}
function z(e) {
  if (e !== void 0)
    return e === null ? null : {
      type: e.type,
      name: e.name,
      totalSize: e.totalSize,
      resources: e.resources === void 0 ? void 0 : e.resources === null ? null : e.resources.map(v)
    };
}
function F(e) {
  if (e !== void 0)
    return e === null ? null : $(e) ? z(e) : {};
}
function K(e) {
  let t = !0;
  return t = t && "lastRunDate" in e, t = t && "totalSize" in e, t = t && "totalEmissions" in e, t;
}
function _(e) {
  if (e !== void 0)
    return e === null ? null : {
      lastRunDate: e.lastRunDate.toISOString(),
      totalSize: e.totalSize,
      totalEmissions: e.totalEmissions,
      carbonRating: e.carbonRating,
      resourceGroups: e.resourceGroups === void 0 ? void 0 : e.resourceGroups === null ? null : e.resourceGroups.map(F)
    };
}
function B(e) {
  if (e !== void 0)
    return e === null ? null : K(e) ? _(e) : {};
}
class L extends w {
  /**
   */
  async umbracoSustainabilityApiV1CheckPageGetRaw(t, i) {
    const n = {};
    t.pageId !== void 0 && (n.pageId = t.pageId);
    const r = {}, a = await this.request({
      path: "/umbraco/sustainability/api/v1/checkPage",
      method: "GET",
      headers: r,
      query: n
    }, i);
    return new P(a);
  }
  /**
   */
  async umbracoSustainabilityApiV1CheckPageGet(t = {}, i) {
    await this.umbracoSustainabilityApiV1CheckPageGetRaw(t, i);
  }
  /**
   */
  async umbracoSustainabilityApiV1GetPageDataGetRaw(t, i) {
    const n = {};
    t.pageId !== void 0 && (n.pageId = t.pageId);
    const r = {}, a = await this.request({
      path: "/umbraco/sustainability/api/v1/getPageData",
      method: "GET",
      headers: r,
      query: n
    }, i);
    return this.isJsonMime(a.headers.get("content-type")) ? new M(a) : new j(a);
  }
  /**
   */
  async umbracoSustainabilityApiV1GetPageDataGet(t = {}, i) {
    return await (await this.umbracoSustainabilityApiV1GetPageDataGetRaw(t, i)).value();
  }
  /**
   */
  async umbracoSustainabilityApiV1SavePageDataPostRaw(t, i) {
    const n = {};
    t.pageId !== void 0 && (n.pageId = t.pageId);
    const r = {};
    r["Content-Type"] = "application/json";
    const a = await this.request({
      path: "/umbraco/sustainability/api/v1/savePageData",
      method: "POST",
      headers: r,
      query: n,
      body: B(t.umbracoSustainabilityApiV1SavePageDataPostRequest)
    }, i);
    return new P(a);
  }
  /**
   */
  async umbracoSustainabilityApiV1SavePageDataPost(t = {}, i) {
    await this.umbracoSustainabilityApiV1SavePageDataPostRaw(t, i);
  }
}
var u;
class H {
  constructor(t, i) {
    l(this, u, void 0);
    p(this, u, t), this.sustainabilityApi = new L(i);
  }
  async checkPage(t) {
    return await m(c(this, u), this.sustainabilityApi.umbracoSustainabilityApiV1CheckPageGet({ pageId: t }));
  }
  async getPageData(t) {
    return await m(c(this, u), this.sustainabilityApi.umbracoSustainabilityApiV1GetPageDataGet({ pageId: t }));
  }
  async savePageData(t, i) {
    return await m(c(this, u), this.sustainabilityApi.umbracoSustainabilityApiV1SavePageDataPost({
      pageId: t,
      umbracoSustainabilityApiV1SavePageDataPostRequest: i
    }));
  }
}
u = new WeakMap();
var h;
class X extends R {
  constructor(i, n) {
    super(i);
    l(this, h, void 0);
    p(this, h, new H(this, n)), console.log("repository constructor");
  }
  async checkPage(i) {
    return c(this, h).checkPage(i);
  }
  async getPageData(i) {
    return c(this, h).getPageData(i);
  }
  async savePageData(i, n) {
    return c(this, h).savePageData(i, n);
  }
}
h = new WeakMap();
var f, d;
class Y extends R {
  constructor(i) {
    super(i);
    l(this, f, void 0);
    l(this, d, void 0);
    p(this, d, new O("unknown")), this.pageData = c(this, d).asObservable(), this.provideContext(Q, this), this.consumeContext(G, (n) => {
      this._configuration = new A({ accessToken: n.getLatestToken() });
    }), p(this, f, new X(this, this._configuration));
  }
  async getPageData(i) {
    const { data: n } = await c(this, f).getPageData(i);
    n && c(this, d).setValue(n);
  }
}
f = new WeakMap(), d = new WeakMap();
const Q = new I(Y.name);
export {
  Q as SUSTAINABILITY_MANAGEMENT_CONTEXT_TOKEN,
  Y as SustainabilityManagementContext,
  Y as default
};
//# sourceMappingURL=sustainability.context-_VZdRj2b.js.map
