var y = (e, a, t) => {
  if (!a.has(e))
    throw TypeError("Cannot " + t);
};
var s = (e, a, t) => (y(e, a, "read from private field"), t ? t.call(e) : a.get(e)), h = (e, a, t) => {
  if (a.has(e))
    throw TypeError("Cannot add the same private member more than once");
  a instanceof WeakSet ? a.add(e) : a.set(e, t);
}, u = (e, a, t, i) => (y(e, a, "write to private field"), i ? i.call(e, t) : a.set(e, t), t);
import { UmbControllerBase as l } from "@umbraco-cms/backoffice/class-api";
import { tryExecuteAndNotify as P } from "@umbraco-cms/backoffice/resources";
import { SustainabilityService as m, OpenAPI as D } from "@api";
import { UmbContextToken as p } from "@umbraco-cms/backoffice/context-api";
import { UmbObjectState as v } from "@umbraco-cms/backoffice/observable-api";
import { UMB_AUTH_CONTEXT as T } from "@umbraco-cms/backoffice/auth";
var n;
class f {
  constructor(a) {
    h(this, n, void 0);
    u(this, n, a);
  }
  async checkPage(a) {
    return await P(s(this, n), m.checkPage({ pageGuid: a }));
  }
  async getPageData(a) {
    return await P(s(this, n), m.getPageData({ pageGuid: a }));
  }
  async savePageData(a, t) {
    return await P(s(this, n), m.savePageData({
      pageGuid: a,
      requestBody: t
    }));
  }
}
n = new WeakMap();
var o;
class w extends l {
  constructor(t) {
    super(t);
    h(this, o, void 0);
    u(this, o, new f(this)), console.log("repository constructor");
  }
  async checkPage(t) {
    return s(this, o).checkPage(t);
  }
  async getPageData(t) {
    return s(this, o).getPageData(t);
  }
  async savePageData(t, i) {
    return s(this, o).savePageData(t, i);
  }
}
o = new WeakMap();
var c, g;
class b extends l {
  constructor(t) {
    super(t);
    h(this, c, void 0);
    h(this, g, void 0);
    u(this, g, new v(void 0)), this.pageData = s(this, g).asObservable(), this.provideContext(S, this), u(this, c, new w(this)), this.consumeContext(T, (i) => {
      D.TOKEN = () => i.getLatestToken(), D.WITH_CREDENTIALS = !0;
    });
  }
  async checkPage(t, i = !0) {
    const { data: r } = await s(this, c).checkPage(t);
    r && (s(this, g).setValue(r), i || await this.savePageData(t, r));
  }
  async getPageData(t, i = !0) {
    const { data: r } = await s(this, c).getPageData(t);
    r && (s(this, g).setValue(r), i || await this.savePageData(t, r));
  }
  async savePageData(t, i) {
    return await s(this, c).savePageData(t, i);
  }
}
c = new WeakMap(), g = new WeakMap();
const S = new p(b.name);
export {
  S as SUSTAINABILITY_MANAGEMENT_CONTEXT_TOKEN,
  b as SustainabilityManagementContext,
  b as default
};
//# sourceMappingURL=sustainability.context-McyGfB0H.js.map
