import { S as O } from "./index-BxRhZE1m.js";
import { UmbLitElement as R } from "@umbraco-cms/backoffice/lit-element";
import { DirectionModel as A } from "@umbraco-cms/backoffice/external/backend-api";
import { html as n, css as E, state as f, customElement as N, repeat as G } from "@umbraco-cms/backoffice/external/lit";
function D(e = "") {
  return { "User-Agent": `co2js/0.14.4 ${e}` };
}
function H(e, t) {
  return typeof e == "string" ? W(e, t) : z(e, t);
}
async function W(e, t) {
  return (await (await fetch(`https://api.thegreenwebfoundation.org/greencheck/${e}`, {
    headers: D(t)
  })).json()).green;
}
async function z(e, t) {
  try {
    const a = "https://api.thegreenwebfoundation.org/v2/greencheckmulti", i = JSON.stringify(e), s = await (await fetch(`${a}/${i}`, {
      headers: D(t)
    })).json();
    return P(s);
  } catch {
    return [];
  }
}
function P(e) {
  return Object.entries(e).filter(([i, r]) => r.green).map(([i, r]) => r.url);
}
var q = {
  check: H
};
function T(e, t) {
  return q.check(e, t);
}
var I = {
  check: T
}, F = Object.defineProperty, L = Object.getOwnPropertyDescriptor, d = (e, t, a, i) => {
  for (var r = i > 1 ? void 0 : i ? L(t, a) : t, s = e.length - 1, g; s >= 0; s--)
    (g = e[s]) && (r = (i ? g(t, a, r) : g(r)) || r);
  return i && r && F(t, a, r), r;
}, m = (e, t, a) => {
  if (!t.has(e))
    throw TypeError("Cannot " + a);
}, c = (e, t, a) => (m(e, t, "read from private field"), a ? a.call(e) : t.get(e)), u = (e, t, a) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, a);
}, M = (e, t, a, i) => (m(e, t, "write to private field"), i ? i.call(e, a) : t.set(e, a), a), h = (e, t, a) => (m(e, t, "access private method"), a), o, _, v, k, p, $, w, x, y, S, b, C;
const B = "overview-workspace";
let l = class extends R {
  constructor() {
    super(), u(this, v), u(this, p), u(this, w), u(this, y), u(this, b), u(this, o, void 0), u(this, _, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: !0
    }), this._greenHost = !1, this.consumeContext(O, (e) => {
      M(this, o, e), this.observe(c(this, o).overviewData, (t) => {
        t && (this._overviewData = t);
      }), this.observe(c(this, o).averageData, (t) => {
        t && (this._averageData = t);
      });
    });
  }
  async connectedCallback() {
    super.connectedCallback(), c(this, o) != null && (await c(this, o).getOverviewData(A.DESCENDING, "RequestDate", 1, 10), await c(this, o).getAverageData()), I.check(window.location.hostname, "Test") && (this._greenHost = !0);
  }
  _calculateGrade(e) {
    return e < 0.095 ? "A+" : e < 0.186 ? "A" : e < 0.341 ? "B" : e < 0.493 ? "C" : e < 0.656 ? "D" : e < 0.846 ? "E" : "F";
  }
  render() {
    return n`
      <umb-body-layout headline="Overview">
        <div id="main">
          ${h(this, v, k).call(this)}
          ${h(this, p, $).call(this)}
          ${h(this, b, C).call(this)}
        </div>
      </umb-body-layout>
    `;
  }
};
o = /* @__PURE__ */ new WeakMap();
_ = /* @__PURE__ */ new WeakMap();
v = /* @__PURE__ */ new WeakSet();
k = function() {
  var e, t;
  if (((t = (e = this._overviewData) == null ? void 0 : e.items) == null ? void 0 : t.length) === 0)
    return n`
        <uui-box>
          No data to show yet. Once you've run some tests, you'll see an overview of all your data here.
        </uui-box>
      `;
};
p = /* @__PURE__ */ new WeakSet();
$ = function() {
  var e, t, a;
  if (((t = (e = this._overviewData) == null ? void 0 : e.items) == null ? void 0 : t.length) !== 0)
    return n`
      <div id="left-column">
        <uui-box>
          <uui-table style="margin-bottom: 24px;">
            <uui-table-head>
              <uui-table-head-cell></uui-table-head-cell>
              <uui-table-head-cell>Last Run Date</uui-table-head-cell>
              <uui-table-head-cell>Carbon Rating</uui-table-head-cell>
            </uui-table-head>

            ${G(
      (a = this._overviewData) == null ? void 0 : a.items,
      (i) => i,
      (i) => n`
                <uui-table-row>
                  <uui-table-cell>
                    <a href='/umbraco/section/content/workspace/document/edit/${i.nodeKey}'>
                      ${i.nodeName}
                    </a>
                  </uui-table-cell>
                  <uui-table-cell>
                    <umb-localize-date date=${i.requestDate} .options=${c(this, _)}>
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
w = /* @__PURE__ */ new WeakSet();
x = function() {
  return this._greenHost === void 0 ? n`
        <p style="margin: 0;">Loading...</p>
      ` : this._greenHost === !1 ? n`
        <p style="margin: 0;">No</p>
      ` : n`
      <p style="margin: 0;">Yes</p>
    `;
};
y = /* @__PURE__ */ new WeakSet();
S = function() {
  return n`
    <uui-box headline="Green hosting" style="margin-bottom: var(--uui-size-space-4);">
      <div slot="header">Powered by <a href="https://www.thegreenwebfoundation.org/co2-js/" target="_blank">CO2.js</a></div>
      ${h(this, w, x).call(this)}
    </uui-box>
    `;
};
b = /* @__PURE__ */ new WeakSet();
C = function() {
  var e, t, a, i, r, s;
  if (((t = (e = this._overviewData) == null ? void 0 : e.items) == null ? void 0 : t.length) !== 0)
    return n`
        <div id="right-column">
          ${h(this, y, S).call(this)}

          <uui-box headline="Average carbon rating" style="margin-bottom: var(--uui-size-space-4);">
            <sustainability-carbon-rating .carbonRating=${this._calculateGrade((a = this._averageData) == null ? void 0 : a.emissions)}>
            </sustainability-carbon-rating>
          </uui-box>

          <uui-box headline="Average page size" style="margin-bottom: var(--uui-size-space-4);">
            ${(((i = this._averageData) == null ? void 0 : i.pageSize) / 1024).toFixed(2)}KB
          </uui-box>

          <uui-box headline="Average CO₂ per page view">
            ${(s = (r = this._averageData) == null ? void 0 : r.emissions) == null ? void 0 : s.toFixed(4)}g
          </uui-box>

        </div>
      `;
};
l.styles = [
  E`
      #main {
        display: grid;
        gap: var(--uui-size-layout-1);
        grid-template-columns: 1fr 350px;
      }
    `
];
d([
  f()
], l.prototype, "_overviewData", 2);
d([
  f()
], l.prototype, "_averageData", 2);
d([
  f()
], l.prototype, "_greenHost", 2);
l = d([
  N(B)
], l);
const Y = l;
export {
  l as OverviewRootWorkspaceElement,
  Y as default
};
//# sourceMappingURL=overview-workspace.element-CVnrqQFz.js.map
