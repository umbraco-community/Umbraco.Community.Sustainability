import { html as s, repeat as x, css as $, state as g, customElement as S } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as C } from "@umbraco-cms/backoffice/lit-element";
import { DirectionModel as k } from "@umbraco-cms/backoffice/external/backend-api";
import { S as E } from "./index-Hdj1WB0a.js";
var H = Object.defineProperty, R = Object.getOwnPropertyDescriptor, y = (e) => {
  throw TypeError(e);
}, h = (e, t, i, l) => {
  for (var a = l > 1 ? void 0 : l ? R(t, i) : t, u = e.length - 1, d; u >= 0; u--)
    (d = e[u]) && (a = (l ? d(t, i, a) : d(a)) || a);
  return l && a && H(t, i, a), a;
}, m = (e, t, i) => t.has(e) || y("Cannot " + i), b = (e, t, i) => (m(e, t, "read from private field"), i ? i.call(e) : t.get(e)), v = (e, t, i) => t.has(e) ? y("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), N = (e, t, i, l) => (m(e, t, "write to private field"), t.set(e, i), i), c = (e, t, i) => (m(e, t, "access private method"), i), r, _, o, p, f, w, D, z;
let n = class extends C {
  constructor() {
    super(), v(this, o), v(this, r), v(this, _, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: !0
    }), this._greenHost = !1, this.consumeContext(E, (e) => {
      e && (N(this, r, e), this.observe(b(this, r).overviewData, (t) => {
        t && (this._overviewData = t);
      }), this.observe(b(this, r).averageData, (t) => {
        t && (this._averageData = t);
      }), b(this, r).getOverviewData(k.DESCENDING, "RequestDate", 1, 10), b(this, r).getAverageData());
    });
  }
  _calculateGrade(e) {
    return e < 0.095 ? "A+" : e < 0.186 ? "A" : e < 0.341 ? "B" : e < 0.493 ? "C" : e < 0.656 ? "D" : e < 0.846 ? "E" : "F";
  }
  render() {
    return s`
      <umb-body-layout headline=${this.localize.term("sustainability_overview")}>
        <div id="main">
          ${c(this, o, p).call(this)}
          ${c(this, o, f).call(this)}
          ${c(this, o, z).call(this)}
        </div>
      </umb-body-layout>
    `;
  }
};
r = /* @__PURE__ */ new WeakMap();
_ = /* @__PURE__ */ new WeakMap();
o = /* @__PURE__ */ new WeakSet();
p = function() {
  var e, t;
  if (((t = (e = this._overviewData) == null ? void 0 : e.items) == null ? void 0 : t.length) === 0)
    return s`
        <uui-box>
          <umb-localize key="sustainability_noData">No data to show yet. Once you've run some tests, you'll see an overview of all your data here.</umb-localize>
        </uui-box>
      `;
};
f = function() {
  var e, t, i, l;
  if (((e = this._overviewData) == null ? void 0 : e.items) !== null && ((i = (t = this._overviewData) == null ? void 0 : t.items) == null ? void 0 : i.length) !== 0)
    return s`
      <div id="left-column">
        <uui-box>
          <uui-table class="overview-table">
            <uui-table-head>
              <uui-table-head-cell></uui-table-head-cell>
              <uui-table-head-cell><umb-localize key="sustainability_lastRunDate">Last Run Date</umb-localize></uui-table-head-cell>
              <uui-table-head-cell><umb-localize key="sustainability_carbonRating">Carbon Rating</umb-localize></uui-table-head-cell>
            </uui-table-head>

            ${x(
      (l = this._overviewData) == null ? void 0 : l.items,
      (a) => a,
      (a) => s`
                <uui-table-row>
                  <uui-table-cell>
                    <uui-button
                      href='/umbraco/section/content/workspace/document/edit/${a.nodeKey}'
                      label=${a.nodeName}
                      compact>
                      ${a.nodeName}
                    </uui-button>
                  </uui-table-cell>
                  <uui-table-cell>
                    <umb-localize-date date=${a.requestDate} .options=${b(this, _)}>
                    </umb-localize-date>
                  </uui-table-cell>
                  <uui-table-cell>
                    <sustainability-carbon-rating
                      .carbonRating=${a.carbonRating}>
                    </sustainability-carbon-rating>
                  </uui-table-cell>
                </uui-table-row>
                `
    )}
          </uui-table>

          <uui-button label=${this.localize.term("sustainability_seeMoreData")} look="primary" href="/umbraco/section/sustainability/workspace/stats-root">
            <umb-localize key="sustainability_seeMoreData">See more data</umb-localize>
          </uui-button>
        </uui-box>
        </div>
      `;
};
w = function() {
  return this._greenHost === void 0 ? s`
        <p class="green-hosting-value"><umb-localize key="sustainability_greenHostingLoading">Loading...</umb-localize></p>
      ` : this._greenHost === !1 ? s`
        <p class="green-hosting-value"><umb-localize key="sustainability_greenHostingNo">No</umb-localize></p>
      ` : s`
      <p class="green-hosting-value"><umb-localize key="sustainability_greenHostingYes">Yes</umb-localize></p>
    `;
};
D = function() {
  return s`
    <uui-box headline=${this.localize.term("sustainability_greenHosting")} class="sidebar-box">
      <div slot="header"><umb-localize key="sustainability_greenHostingPoweredBy">Powered by</umb-localize> <a href="https://www.thegreenwebfoundation.org/co2-js/" target="_blank">CO2.js</a></div>
      ${c(this, o, w).call(this)}
    </uui-box>
    `;
};
z = function() {
  var e, t, i, l, a, u;
  if (((t = (e = this._overviewData) == null ? void 0 : e.items) == null ? void 0 : t.length) !== 0)
    return s`
        <div id="right-column">
          ${c(this, o, D).call(this)}

          <uui-box headline=${this.localize.term("sustainability_averageCarbonRating")} class="sidebar-box">
            <sustainability-carbon-rating .carbonRating=${this._calculateGrade((i = this._averageData) == null ? void 0 : i.emissions)}>
            </sustainability-carbon-rating>
          </uui-box>

          <uui-box headline=${this.localize.term("sustainability_averagePageSize")} class="sidebar-box">
            ${(((l = this._averageData) == null ? void 0 : l.pageSize) / 1024).toFixed(2)}KB
          </uui-box>

          <uui-box headline=${this.localize.term("sustainability_averageCo2PerPageView")}>
            ${(u = (a = this._averageData) == null ? void 0 : a.emissions) == null ? void 0 : u.toFixed(4)}g
          </uui-box>

        </div>
      `;
};
n.styles = [
  $`
      #main {
        display: grid;
        gap: var(--uui-size-layout-1);
        grid-template-columns: 1fr 350px;
      }

      .overview-table {
        margin-bottom: 24px;
      }

      .sidebar-box {
        margin-bottom: var(--uui-size-space-4);
      }

      .green-hosting-value {
        margin: 0;
      }
    `
];
h([
  g()
], n.prototype, "_overviewData", 2);
h([
  g()
], n.prototype, "_averageData", 2);
h([
  g()
], n.prototype, "_greenHost", 2);
n = h([
  S("sustainability-section-view")
], n);
const M = n;
export {
  n as SustainabilitySectionViewElement,
  M as default
};
//# sourceMappingURL=sustainability-section-view.element-D7H-O_qW.js.map
