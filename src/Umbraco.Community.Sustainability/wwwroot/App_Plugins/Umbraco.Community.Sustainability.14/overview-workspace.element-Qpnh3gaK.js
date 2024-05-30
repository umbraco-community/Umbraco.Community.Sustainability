import { S as H } from "./index-Clx-kk79.js";
import { UmbLitElement as P } from "@umbraco-cms/backoffice/lit-element";
import { DirectionModel as W } from "@umbraco-cms/backoffice/external/backend-api";
import { html as u, css as z, state as k, customElement as q, repeat as j } from "@umbraco-cms/backoffice/external/lit";
function N(t = "") {
  return { "User-Agent": `co2js/0.15.0 ${t}` };
}
var J = Object.getOwnPropertyNames, T = (t, e) => function() {
  return e || (0, t[J(t)[0]])((e = { exports: {} }).exports, e), e.exports;
}, F = T({
  "src/hosting-json.js"(t, e) {
    async function r(n, s) {
      return typeof n == "string" ? i(n, s) : o(n, s);
    }
    function i(n, s) {
      return s.indexOf(n) > -1;
    }
    function a(n) {
      return Object.entries(n).filter(([c, _]) => _.green).map(([c, _]) => _.url);
    }
    function o(n, s) {
      let d = [];
      for (let c of n)
        s.indexOf(c) > -1 && d.push(c);
      return d;
    }
    function v(n, s) {
      return typeof n == "string" ? $(n, s) : G(n, s);
    }
    function $(n, s) {
      return s.indexOf(n) > -1 ? n : {
        url: n,
        green: !1
      };
    }
    function G(n, s) {
      const d = {};
      for (let c of n)
        d[c] = $(c, s);
      return d;
    }
    e.exports = {
      check: r,
      greenDomainsFromResults: a,
      find: v
    };
  }
});
const L = F();
function M(t, e) {
  const r = typeof e == "string" ? { userAgentIdentifier: e } : e;
  if (r != null && r.db && r.verbose)
    throw new Error("verbose mode cannot be used with a local lookup database");
  return typeof t == "string" ? B(t, r) : U(t, r);
}
async function B(t, e = {}) {
  const r = await fetch(`https://api.thegreenwebfoundation.org/greencheck/${t}`, {
    headers: N(e.userAgentIdentifier)
  });
  if (e != null && e.db)
    return L.check(t, e.db);
  const i = await r.json();
  return e.verbose ? i : i.green;
}
async function U(t, e = {}) {
  try {
    const r = "https://api.thegreenwebfoundation.org/v2/greencheckmulti", i = JSON.stringify(t), o = await (await fetch(`${r}/${i}`, {
      headers: N(e.userAgentIdentifier)
    })).json();
    return e.verbose ? o : K(o);
  } catch {
    return e.verbose ? {} : [];
  }
}
function K(t) {
  return Object.entries(t).filter(([i, a]) => a.green).map(([i, a]) => a.url);
}
var V = {
  check: M
};
function Y(t, e) {
  return V.check(t, e);
}
var X = {
  check: Y
}, Q = Object.defineProperty, Z = Object.getOwnPropertyDescriptor, p = (t, e, r, i) => {
  for (var a = i > 1 ? void 0 : i ? Z(e, r) : e, o = t.length - 1, v; o >= 0; o--)
    (v = t[o]) && (a = (i ? v(e, r, a) : v(a)) || a);
  return i && a && Q(e, r, a), a;
}, D = (t, e, r) => {
  if (!e.has(t))
    throw TypeError("Cannot " + r);
}, g = (t, e, r) => (D(t, e, "read from private field"), r ? r.call(t) : e.get(t)), h = (t, e, r) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, r);
}, ee = (t, e, r, i) => (D(t, e, "write to private field"), i ? i.call(t, r) : e.set(t, r), r), b = (t, e, r) => (D(t, e, "access private method"), r), l, x, m, A, w, R, O, C, S, E, y, I;
const te = "overview-workspace";
let f = class extends P {
  constructor() {
    super(), h(this, m), h(this, w), h(this, O), h(this, S), h(this, y), h(this, l, void 0), h(this, x, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: !0
    }), this._greenHost = !1, this.consumeContext(H, (t) => {
      ee(this, l, t), this.observe(g(this, l).overviewData, (e) => {
        e && (this._overviewData = e);
      }), this.observe(g(this, l).averageData, (e) => {
        e && (this._averageData = e);
      });
    });
  }
  async connectedCallback() {
    super.connectedCallback(), g(this, l) != null && (await g(this, l).getOverviewData(W.DESCENDING, "RequestDate", 1, 10), await g(this, l).getAverageData()), X.check(window.location.hostname, "Test") && (this._greenHost = !0);
  }
  _calculateGrade(t) {
    return t < 0.095 ? "A+" : t < 0.186 ? "A" : t < 0.341 ? "B" : t < 0.493 ? "C" : t < 0.656 ? "D" : t < 0.846 ? "E" : "F";
  }
  render() {
    return u`
      <umb-body-layout headline="Overview">
        <div id="main">
          ${b(this, m, A).call(this)}
          ${b(this, w, R).call(this)}
          ${b(this, y, I).call(this)}
        </div>
      </umb-body-layout>
    `;
  }
};
l = /* @__PURE__ */ new WeakMap();
x = /* @__PURE__ */ new WeakMap();
m = /* @__PURE__ */ new WeakSet();
A = function() {
  var t, e;
  if (((e = (t = this._overviewData) == null ? void 0 : t.items) == null ? void 0 : e.length) === 0)
    return u`
        <uui-box>
          No data to show yet. Once you've run some tests, you'll see an overview of all your data here.
        </uui-box>
      `;
};
w = /* @__PURE__ */ new WeakSet();
R = function() {
  var t, e, r;
  if (((e = (t = this._overviewData) == null ? void 0 : t.items) == null ? void 0 : e.length) !== 0)
    return u`
      <div id="left-column">
        <uui-box>
          <uui-table style="margin-bottom: 24px;">
            <uui-table-head>
              <uui-table-head-cell></uui-table-head-cell>
              <uui-table-head-cell>Last Run Date</uui-table-head-cell>
              <uui-table-head-cell>Carbon Rating</uui-table-head-cell>
            </uui-table-head>

            ${j(
      (r = this._overviewData) == null ? void 0 : r.items,
      (i) => i,
      (i) => u`
                <uui-table-row>
                  <uui-table-cell>
                    <a href='/umbraco/section/content/workspace/document/edit/${i.nodeKey}'>
                      ${i.nodeName}
                    </a>
                  </uui-table-cell>
                  <uui-table-cell>
                    <umb-localize-date date=${i.requestDate} .options=${g(this, x)}>
                    </umb-localize-date>
                  </uui-table-cell>
                  <uui-table-cell>
                    <sustainability-carbon-rating
                      .carbonRating=${i.carbonRating}>
                    </sustainability-carbon-rating>
                  </uui-table-cell>
                </uui-table-row>
                `
    )}
          </uui-table>

          <uui-button label="See more data" look="primary" href="/umbraco/section/sustainability/workspace/stats-root">
            See more data
          </uui-button>
        </uui-box>
        </div>
      `;
};
O = /* @__PURE__ */ new WeakSet();
C = function() {
  return this._greenHost === void 0 ? u`
        <p style="margin: 0;">Loading...</p>
      ` : this._greenHost === !1 ? u`
        <p style="margin: 0;">No</p>
      ` : u`
      <p style="margin: 0;">Yes</p>
    `;
};
S = /* @__PURE__ */ new WeakSet();
E = function() {
  return u`
    <uui-box headline="Green hosting" style="margin-bottom: var(--uui-size-space-4);">
      <div slot="header">Powered by <a href="https://www.thegreenwebfoundation.org/co2-js/" target="_blank">CO2.js</a></div>
      ${b(this, O, C).call(this)}
    </uui-box>
    `;
};
y = /* @__PURE__ */ new WeakSet();
I = function() {
  var t, e, r, i, a, o;
  if (((e = (t = this._overviewData) == null ? void 0 : t.items) == null ? void 0 : e.length) !== 0)
    return u`
        <div id="right-column">
          ${b(this, S, E).call(this)}

          <uui-box headline="Average carbon rating" style="margin-bottom: var(--uui-size-space-4);">
            <sustainability-carbon-rating .carbonRating=${this._calculateGrade((r = this._averageData) == null ? void 0 : r.emissions)}>
            </sustainability-carbon-rating>
          </uui-box>

          <uui-box headline="Average page size" style="margin-bottom: var(--uui-size-space-4);">
            ${(((i = this._averageData) == null ? void 0 : i.pageSize) / 1024).toFixed(2)}KB
          </uui-box>

          <uui-box headline="Average CO₂ per page view">
            ${(o = (a = this._averageData) == null ? void 0 : a.emissions) == null ? void 0 : o.toFixed(4)}g
          </uui-box>

        </div>
      `;
};
f.styles = [
  z`
      #main {
        display: grid;
        gap: var(--uui-size-layout-1);
        grid-template-columns: 1fr 350px;
      }
    `
];
p([
  k()
], f.prototype, "_overviewData", 2);
p([
  k()
], f.prototype, "_averageData", 2);
p([
  k()
], f.prototype, "_greenHost", 2);
f = p([
  q(te)
], f);
const se = f;
export {
  f as OverviewRootWorkspaceElement,
  se as default
};
//# sourceMappingURL=overview-workspace.element-Qpnh3gaK.js.map
