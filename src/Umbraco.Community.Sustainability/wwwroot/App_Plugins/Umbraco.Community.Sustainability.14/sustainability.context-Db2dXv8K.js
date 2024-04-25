var y = (s, t, a) => {
  if (!t.has(s))
    throw TypeError("Cannot " + a);
};
var e = (s, t, a) => (y(s, t, "read from private field"), a ? a.call(s) : t.get(s)), h = (s, t, a) => {
  if (t.has(s))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(s) : t.set(s, a);
}, v = (s, t, a, i) => (y(s, t, "write to private field"), i ? i.call(s, a) : t.set(s, a), a);
import { UmbControllerBase as l } from "@umbraco-cms/backoffice/class-api";
import { tryExecuteAndNotify as D } from "@umbraco-cms/backoffice/resources";
import { SustainabilityService as w, OpenAPI as P } from "@api";
import { UmbContextToken as T } from "@umbraco-cms/backoffice/context-api";
import { UmbObjectState as m } from "@umbraco-cms/backoffice/observable-api";
import { UMB_AUTH_CONTEXT as b } from "@umbraco-cms/backoffice/auth";
var n;
class f {
  constructor(t) {
    h(this, n, void 0);
    v(this, n, t);
  }
  async checkPage(t) {
    return await D(e(this, n), w.checkPage({ pageGuid: t }));
  }
  async getPageData(t) {
    return await D(e(this, n), w.getPageData({ pageGuid: t }));
  }
  async savePageData(t, a) {
    return await D(e(this, n), w.savePageData({
      pageGuid: t,
      requestBody: a
    }));
  }
  async getOverviewData(t, a, i, r) {
    return await D(e(this, n), w.getOverviewData({ direction: t, orderBy: a, pageNumber: i, pageSize: r }));
  }
  async getAverageData() {
    return await D(e(this, n), w.getAverageData());
  }
}
n = new WeakMap();
var g;
class p extends l {
  constructor(a) {
    super(a);
    h(this, g, void 0);
    v(this, g, new f(this));
  }
  async checkPage(a) {
    return await e(this, g).checkPage(a);
  }
  async getPageData(a) {
    return await e(this, g).getPageData(a);
  }
  async savePageData(a, i) {
    return await e(this, g).savePageData(a, i);
  }
  async getOverviewData(a, i, r, A) {
    return await e(this, g).getOverviewData(a, i, r, A);
  }
  async getAverageData() {
    return await e(this, g).getAverageData();
  }
}
g = new WeakMap();
var c, o, u;
class O extends l {
  constructor(a) {
    super(a);
    h(this, c, void 0);
    h(this, o, void 0);
    h(this, u, void 0);
    v(this, o, new m(void 0)), this.pageData = e(this, o).asObservable(), v(this, u, new m(void 0)), this.averageData = e(this, u).asObservable(), this.provideContext(d, this), v(this, c, new p(this)), this.consumeContext(b, (i) => {
      P.TOKEN = () => i.getLatestToken(), P.WITH_CREDENTIALS = !0;
    });
  }
  async checkPage(a, i = !0) {
    const { data: r } = await e(this, c).checkPage(a);
    r && (e(this, o).setValue(r), i || await this.savePageData(a, r));
  }
  async getPageData(a, i = !0) {
    const { data: r } = await e(this, c).getPageData(a);
    r && (e(this, o).setValue(r), i || await this.savePageData(a, r));
  }
  async savePageData(a, i) {
    return await e(this, c).savePageData(a, i);
  }
  async getAverageData() {
    const { data: a } = await e(this, c).getAverageData();
    a && e(this, u).setValue(a);
  }
}
c = new WeakMap(), o = new WeakMap(), u = new WeakMap();
const d = new T(O.name);
export {
  d as SUSTAINABILITY_MANAGEMENT_CONTEXT_TOKEN,
  O as SustainabilityManagementContext,
  O as default
};
//# sourceMappingURL=sustainability.context-Db2dXv8K.js.map
