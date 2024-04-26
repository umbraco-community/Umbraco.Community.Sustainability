import { S as C } from "./index-CvbKOwCL.js";
import { UmbLitElement as O } from "@umbraco-cms/backoffice/lit-element";
import { DirectionModel as A } from "@umbraco-cms/backoffice/external/backend-api";
import { html as n, css as R, state as f, customElement as E, repeat as N } from "@umbraco-cms/backoffice/external/lit";
function y(e = "") {
  return { "User-Agent": `co2js/0.14.4 ${e}` };
}
function H(e, t) {
  return typeof e == "string" ? G(e, t) : P(e, t);
}
async function G(e, t) {
  return (await (await fetch(`https://api.thegreenwebfoundation.org/greencheck/${e}`, {
    headers: y(t)
  })).json()).green;
}
async function P(e, t) {
  try {
    const a = "https://api.thegreenwebfoundation.org/v2/greencheckmulti", i = JSON.stringify(e), l = await (await fetch(`${a}/${i}`, {
      headers: y(t)
    })).json();
    return q(l);
  } catch {
    return [];
  }
}
function q(e) {
  return Object.entries(e).filter(([i, r]) => r.green).map(([i, r]) => r.url);
}
var z = {
  check: H
};
function T(e, t) {
  return z.check(e, t);
}
var W = {
  check: T
}, I = Object.defineProperty, L = Object.getOwnPropertyDescriptor, d = (e, t, a, i) => {
  for (var r = i > 1 ? void 0 : i ? L(t, a) : t, l = e.length - 1, v; l >= 0; l--)
    (v = e[l]) && (r = (i ? v(t, a, r) : v(r)) || r);
  return i && r && I(t, a, r), r;
}, m = (e, t, a) => {
  if (!t.has(e))
    throw TypeError("Cannot " + a);
}, c = (e, t, a) => (m(e, t, "read from private field"), a ? a.call(e) : t.get(e)), u = (e, t, a) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, a);
}, F = (e, t, a, i) => (m(e, t, "write to private field"), i ? i.call(e, a) : t.set(e, a), a), h = (e, t, a) => (m(e, t, "access private method"), a), s, g, D, p, k, _, x, w, $, b, S;
const M = "sustainability-overview-element";
let o = class extends O {
  constructor() {
    super(), u(this, g), u(this, p), u(this, _), u(this, w), u(this, b), u(this, s, void 0), this._greenHost = void 0, this.consumeContext(C, (e) => {
      F(this, s, e), this.observe(c(this, s).overviewData, (t) => {
        t && (this._overviewData = t);
      }), this.observe(c(this, s).averageData, (t) => {
        t && (this._averageData = t);
      });
    });
  }
  async connectedCallback() {
    super.connectedCallback(), c(this, s) != null && (await c(this, s).getOverviewData(A.DESCENDING, "RequestDate", 1, 10), await c(this, s).getAverageData()), W.check(window.location.hostname, "Test").then((e) => {
      this._greenHost = e;
    });
  }
  render() {
    return n`
      <umb-body-layout headline="Overview">
        <div id="main">
          ${h(this, g, D).call(this)}     
          ${h(this, p, k).call(this)}   
          ${h(this, b, S).call(this)}  
        </div>
      </umb-body-layout>
    `;
  }
};
s = /* @__PURE__ */ new WeakMap();
g = /* @__PURE__ */ new WeakSet();
D = function() {
  var e;
  if (((e = this._overviewData) == null ? void 0 : e.items.length) === 0)
    return n`
        <uui-box>
          No data to show yet. Once you've run some tests, you'll see an overview of all your data here.
        </uui-box>
      `;
};
p = /* @__PURE__ */ new WeakSet();
k = function() {
  var e;
  if (((e = this._overviewData) == null ? void 0 : e.items.length) !== 0)
    return n`
      <div id="left-column">
        <uui-box>
          <uui-table style="margin-bottom: 24px;">
            <uui-table-head>
              <uui-table-head-cell></uui-table-head-cell>
              <uui-table-head-cell>Last Run Date</uui-table-head-cell>
              <uui-table-head-cell>Carbon Rating</uui-table-head-cell>
            </uui-table-head>

            ${N(
      this._overviewData.items,
      (t) => t,
      (t) => n`
                <uui-table-row>
                  <uui-table-cell>
                    <a href='/umbraco/section/content/workspace/document/edit/${t.nodeKey}'>
                      ${t.nodeName}
                    </a>
                  </uui-table-cell>
                  <uui-table-cell>
                    ${t.requestDate}
                  </uui-table-cell>
                  <uui-table-cell>
                    <uui-tag>
                      ${t.carbonRating}
                    </uui-tag>
                  </uui-table-cell>
                </uui-table-row>
                `
    )}
          </uui-table>

          <uui-button look="primary" href="/umbraco#sustainability/sustainability/stats">
            See more data
          </uui-button>
        </uui-box>
        </div>
      `;
};
_ = /* @__PURE__ */ new WeakSet();
x = function() {
  return this._greenHost === void 0 ? n`
        <p style="margin: 0;">Loading...</p>
      ` : this._greenHost === !1 ? n`
        <p style="margin: 0;">No</p>
      ` : n`
      <p style="margin: 0;">Yes</p>
    `;
};
w = /* @__PURE__ */ new WeakSet();
$ = function() {
  return n`
    <uui-box headline="Green hosting" style="margin-bottom: var(--uui-size-space-4);">
      <div slot="header">Powered by <a href="https://www.thegreenwebfoundation.org/co2-js/" target="_blank">CO2.js</a></div>
      ${h(this, _, x).call(this)}
    </uui-box>
    `;
};
b = /* @__PURE__ */ new WeakSet();
S = function() {
  var e, t, a, i;
  if (((e = this._overviewData) == null ? void 0 : e.items.length) !== 0)
    return n`
        <div id="right-column">
          ${h(this, w, $).call(this)}

          <uui-box headline="Average carbon rating" style="margin-bottom: var(--uui-size-space-4);">
            <uui-tag>
              ${(t = this._averageData) == null ? void 0 : t.carbonRating}
            </uui-tag>
          </uui-box>

          <uui-box headline="Average page size" style="margin-bottom: var(--uui-size-space-4);">
            ${(((a = this._averageData) == null ? void 0 : a.pageSize) / 1024).toFixed(2)}KB
          </uui-box>

          <uui-box headline="Average CO₂ per page view">
            ${(i = this._averageData) == null ? void 0 : i.emissions.toFixed(4)}g
          </uui-box>

        </div>
      `;
};
o.styles = [
  R`
      #main {
        display: grid;
        gap: var(--uui-size-layout-1);
        /* padding: var(--uui-size-layout-1); */
        grid-template-columns: 1fr 350px;
      }
    `
];
d([
  f()
], o.prototype, "_overviewData", 2);
d([
  f()
], o.prototype, "_averageData", 2);
d([
  f()
], o.prototype, "_greenHost", 2);
o = d([
  E(M)
], o);
const V = o;
export {
  o as SustainabilityOverviewElement,
  V as default
};
//# sourceMappingURL=sustainability-overview.element-w_3pzn_S.js.map
