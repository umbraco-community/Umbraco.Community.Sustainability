import { S as E } from "./index-K_FP3dB7.js";
import { UmbLitElement as P } from "@umbraco-cms/backoffice/lit-element";
import { DirectionModel as A } from "@umbraco-cms/backoffice/external/backend-api";
import { html as u, repeat as H, css as I, state as y, customElement as j } from "@umbraco-cms/backoffice/external/lit";
function x(t = "") {
  return { "User-Agent": "co2js/".concat("0.16.9", " ").concat(t) };
}
var q = Object.getOwnPropertyNames, G = (t, e) => function() {
  return e || (0, t[q(t)[0]])((e = { exports: {} }).exports, e), e.exports;
}, J = G({
  "src/hosting-json.js"(t, e) {
    async function i(r, s) {
      return typeof r == "string" ? a(r, s) : o(r, s);
    }
    function a(r, s) {
      return s.indexOf(r) > -1;
    }
    function n(r) {
      return Object.entries(r).filter(([l, _]) => _.green).map(([l, _]) => _.url);
    }
    function o(r, s) {
      let g = [];
      for (let l of r)
        s.indexOf(l) > -1 && g.push(l);
      return g;
    }
    function f(r, s) {
      return typeof r == "string" ? D(r, s) : C(r, s);
    }
    function D(r, s) {
      return s.indexOf(r) > -1 ? r : {
        url: r,
        green: !1
      };
    }
    function C(r, s) {
      const g = {};
      for (let l of r)
        g[l] = D(l, s);
      return g;
    }
    e.exports = {
      check: i,
      greenDomainsFromResults: n,
      find: f
    };
  }
});
const W = J();
function M(t, e) {
  const i = typeof e == "string" ? { userAgentIdentifier: e } : e;
  if (i != null && i.db && i.verbose)
    throw new Error("verbose mode cannot be used with a local lookup database");
  return typeof t == "string" ? T(t, i) : F(t, i);
}
async function T(t, e = {}) {
  const i = await fetch(
    "https://api.thegreenwebfoundation.org/greencheck/".concat(t),
    {
      headers: x(e.userAgentIdentifier)
    }
  );
  if (e != null && e.db)
    return W.check(t, e.db);
  const a = await i.json();
  return e.verbose ? a : a.green;
}
async function F(t, e = {}) {
  try {
    const i = "https://api.thegreenwebfoundation.org/v2/greencheckmulti", a = JSON.stringify(t), o = await (await fetch("".concat(i, "/").concat(a), {
      headers: x(e.userAgentIdentifier)
    })).json();
    return e.verbose ? o : L(o);
  } catch {
    return e.verbose ? {} : [];
  }
}
function L(t) {
  return Object.entries(t).filter(([a, n]) => n.green).map(([a, n]) => n.url);
}
var B = {
  check: M
};
function U(t, e) {
  return B.check(t, e);
}
var Y = U, K = Object.defineProperty, V = Object.getOwnPropertyDescriptor, z = (t) => {
  throw TypeError(t);
}, m = (t, e, i, a) => {
  for (var n = a > 1 ? void 0 : a ? V(e, i) : e, o = t.length - 1, f; o >= 0; o--)
    (f = t[o]) && (n = (a ? f(e, i, n) : f(n)) || n);
  return a && n && K(e, i, n), n;
}, w = (t, e, i) => e.has(t) || z("Cannot " + i), v = (t, e, i) => (w(t, e, "read from private field"), i ? i.call(t) : e.get(t)), p = (t, e, i) => e.has(t) ? z("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i), X = (t, e, i, a) => (w(t, e, "write to private field"), e.set(t, i), i), d = (t, e, i) => (w(t, e, "access private method"), i), c, k, h, O, $, S, N, R;
const Q = "overview-workspace";
let b = class extends P {
  constructor() {
    super(), p(this, h), p(this, c), p(this, k, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: !0
    }), this._greenHost = !1, this.consumeContext(E, (t) => {
      t && (X(this, c, t), this.observe(v(this, c).overviewData, (e) => {
        e && (this._overviewData = e);
      }), this.observe(v(this, c).averageData, (e) => {
        e && (this._averageData = e);
      }), v(this, c).getOverviewData(A.DESCENDING, "RequestDate", 1, 10), v(this, c).getAverageData());
    });
  }
  async connectedCallback() {
    super.connectedCallback(), Y.check(window.location.hostname, "Test") && (this._greenHost = !0);
  }
  _calculateGrade(t) {
    return t < 0.095 ? "A+" : t < 0.186 ? "A" : t < 0.341 ? "B" : t < 0.493 ? "C" : t < 0.656 ? "D" : t < 0.846 ? "E" : "F";
  }
  render() {
    return u`
      <umb-body-layout headline=${this.localize.term("sustainability_overview")}>
        <div id="main">
          ${d(this, h, O).call(this)}
          ${d(this, h, $).call(this)}
          ${d(this, h, R).call(this)}
        </div>
      </umb-body-layout>
    `;
  }
};
c = /* @__PURE__ */ new WeakMap();
k = /* @__PURE__ */ new WeakMap();
h = /* @__PURE__ */ new WeakSet();
O = function() {
  var t, e;
  if (((e = (t = this._overviewData) == null ? void 0 : t.items) == null ? void 0 : e.length) === 0)
    return u`
        <uui-box>
          <umb-localize key="sustainability_noData">No data to show yet. Once you've run some tests, you'll see an overview of all your data here.</umb-localize>
        </uui-box>
      `;
};
$ = function() {
  var t, e, i;
  if (((e = (t = this._overviewData) == null ? void 0 : t.items) == null ? void 0 : e.length) !== 0)
    return u`
      <div id="left-column">
        <uui-box>
          <uui-table class="overview-table">
            <uui-table-head>
              <uui-table-head-cell></uui-table-head-cell>
              <uui-table-head-cell><umb-localize key="sustainability_lastRunDate">Last Run Date</umb-localize></uui-table-head-cell>
              <uui-table-head-cell><umb-localize key="sustainability_carbonRating">Carbon Rating</umb-localize></uui-table-head-cell>
            </uui-table-head>

            ${H(
      (i = this._overviewData) == null ? void 0 : i.items,
      (a) => a,
      (a) => u`
                <uui-table-row>
                  <uui-table-cell>
                    <a href='/umbraco/section/content/workspace/document/edit/${a.nodeKey}'>
                      ${a.nodeName}
                    </a>
                  </uui-table-cell>
                  <uui-table-cell>
                    <umb-localize-date date=${a.requestDate} .options=${v(this, k)}>
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
S = function() {
  return this._greenHost === void 0 ? u`
        <p class="green-hosting-value"><umb-localize key="sustainability_greenHostingLoading">Loading...</umb-localize></p>
      ` : this._greenHost === !1 ? u`
        <p class="green-hosting-value"><umb-localize key="sustainability_greenHostingNo">No</umb-localize></p>
      ` : u`
      <p class="green-hosting-value"><umb-localize key="sustainability_greenHostingYes">Yes</umb-localize></p>
    `;
};
N = function() {
  return u`
    <uui-box headline=${this.localize.term("sustainability_greenHosting")} class="sidebar-box">
      <div slot="header"><umb-localize key="sustainability_greenHostingPoweredBy">Powered by</umb-localize> <a href="https://www.thegreenwebfoundation.org/co2-js/" target="_blank">CO2.js</a></div>
      ${d(this, h, S).call(this)}
    </uui-box>
    `;
};
R = function() {
  var t, e, i, a, n, o;
  if (((e = (t = this._overviewData) == null ? void 0 : t.items) == null ? void 0 : e.length) !== 0)
    return u`
        <div id="right-column">
          ${d(this, h, N).call(this)}

          <uui-box headline=${this.localize.term("sustainability_averageCarbonRating")} class="sidebar-box">
            <sustainability-carbon-rating .carbonRating=${this._calculateGrade((i = this._averageData) == null ? void 0 : i.emissions)}>
            </sustainability-carbon-rating>
          </uui-box>

          <uui-box headline=${this.localize.term("sustainability_averagePageSize")} class="sidebar-box">
            ${(((a = this._averageData) == null ? void 0 : a.pageSize) / 1024).toFixed(2)}KB
          </uui-box>

          <uui-box headline=${this.localize.term("sustainability_averageCo2PerPageView")}>
            ${(o = (n = this._averageData) == null ? void 0 : n.emissions) == null ? void 0 : o.toFixed(4)}g
          </uui-box>

        </div>
      `;
};
b.styles = [
  I`
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
m([
  y()
], b.prototype, "_overviewData", 2);
m([
  y()
], b.prototype, "_averageData", 2);
m([
  y()
], b.prototype, "_greenHost", 2);
b = m([
  j(Q)
], b);
const ae = b;
export {
  b as OverviewRootWorkspaceElement,
  ae as default
};
//# sourceMappingURL=overview-workspace.element-CrFs0rBl.js.map
