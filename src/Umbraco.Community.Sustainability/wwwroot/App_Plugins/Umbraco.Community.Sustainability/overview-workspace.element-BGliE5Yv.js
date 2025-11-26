import { S as R } from "./index-Da7IgOgD.js";
import { UmbLitElement as I } from "@umbraco-cms/backoffice/lit-element";
import { DirectionModel as P } from "@umbraco-cms/backoffice/external/backend-api";
import { html as u, repeat as j, css as z, state as y, customElement as q } from "@umbraco-cms/backoffice/external/lit";
function x(e = "") {
  return { "User-Agent": "co2js/".concat("0.16.9", " ").concat(e) };
}
var G = Object.getOwnPropertyNames, H = (e, t) => function() {
  return t || (0, e[G(e)[0]])((t = { exports: {} }).exports, t), t.exports;
}, J = H({
  "src/hosting-json.js"(e, t) {
    async function r(n, s) {
      return typeof n == "string" ? i(n, s) : o(n, s);
    }
    function i(n, s) {
      return s.indexOf(n) > -1;
    }
    function a(n) {
      return Object.entries(n).filter(([c, m]) => m.green).map(([c, m]) => m.url);
    }
    function o(n, s) {
      let g = [];
      for (let c of n)
        s.indexOf(c) > -1 && g.push(c);
      return g;
    }
    function d(n, s) {
      return typeof n == "string" ? k(n, s) : C(n, s);
    }
    function k(n, s) {
      return s.indexOf(n) > -1 ? n : {
        url: n,
        green: !1
      };
    }
    function C(n, s) {
      const g = {};
      for (let c of n)
        g[c] = k(c, s);
      return g;
    }
    t.exports = {
      check: r,
      greenDomainsFromResults: a,
      find: d
    };
  }
});
const W = J();
function T(e, t) {
  const r = typeof t == "string" ? { userAgentIdentifier: t } : t;
  if (r != null && r.db && r.verbose)
    throw new Error("verbose mode cannot be used with a local lookup database");
  return typeof e == "string" ? F(e, r) : L(e, r);
}
async function F(e, t = {}) {
  const r = await fetch(
    "https://api.thegreenwebfoundation.org/greencheck/".concat(e),
    {
      headers: x(t.userAgentIdentifier)
    }
  );
  if (t != null && t.db)
    return W.check(e, t.db);
  const i = await r.json();
  return t.verbose ? i : i.green;
}
async function L(e, t = {}) {
  try {
    const r = "https://api.thegreenwebfoundation.org/v2/greencheckmulti", i = JSON.stringify(e), o = await (await fetch("".concat(r, "/").concat(i), {
      headers: x(t.userAgentIdentifier)
    })).json();
    return t.verbose ? o : M(o);
  } catch {
    return t.verbose ? {} : [];
  }
}
function M(e) {
  return Object.entries(e).filter(([i, a]) => a.green).map(([i, a]) => a.url);
}
var B = {
  check: T
};
function U(e, t) {
  return B.check(e, t);
}
var K = U, Y = Object.defineProperty, V = Object.getOwnPropertyDescriptor, O = (e) => {
  throw TypeError(e);
}, p = (e, t, r, i) => {
  for (var a = i > 1 ? void 0 : i ? V(t, r) : t, o = e.length - 1, d; o >= 0; o--)
    (d = e[o]) && (a = (i ? d(t, r, a) : d(a)) || a);
  return i && a && Y(t, r, a), a;
}, w = (e, t, r) => t.has(e) || O("Cannot " + r), v = (e, t, r) => (w(e, t, "read from private field"), t.get(e)), _ = (e, t, r) => t.has(e) ? O("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), X = (e, t, r, i) => (w(e, t, "write to private field"), t.set(e, r), r), b = (e, t, r) => (w(e, t, "access private method"), r), l, D, h, S, N, A, E, $;
const Q = "overview-workspace";
let f = class extends I {
  constructor() {
    super(), _(this, h), _(this, l), _(this, D, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: !0
    }), this._greenHost = !1, this.consumeContext(R, (e) => {
      var t, r;
      X(this, l, e), this.observe((t = v(this, l)) == null ? void 0 : t.overviewData, (i) => {
        i && (this._overviewData = i);
      }), this.observe((r = v(this, l)) == null ? void 0 : r.averageData, (i) => {
        i && (this._averageData = i);
      });
    });
  }
  async connectedCallback() {
    super.connectedCallback(), v(this, l) != null && (await v(this, l).getOverviewData(P.DESCENDING, "RequestDate", 1, 10), await v(this, l).getAverageData()), K.check(window.location.hostname, "Test") && (this._greenHost = !0);
  }
  _calculateGrade(e) {
    return e < 0.095 ? "A+" : e < 0.186 ? "A" : e < 0.341 ? "B" : e < 0.493 ? "C" : e < 0.656 ? "D" : e < 0.846 ? "E" : "F";
  }
  render() {
    return u`
      <umb-body-layout headline="Overview">
        <div id="main">
          ${b(this, h, S).call(this)}
          ${b(this, h, N).call(this)}
          ${b(this, h, $).call(this)}
        </div>
      </umb-body-layout>
    `;
  }
};
l = /* @__PURE__ */ new WeakMap();
D = /* @__PURE__ */ new WeakMap();
h = /* @__PURE__ */ new WeakSet();
S = function() {
  var e, t;
  if (((t = (e = this._overviewData) == null ? void 0 : e.items) == null ? void 0 : t.length) === 0)
    return u`
        <uui-box>
          No data to show yet. Once you've run some tests, you'll see an overview of all your data here.
        </uui-box>
      `;
};
N = function() {
  var e, t, r;
  if (((t = (e = this._overviewData) == null ? void 0 : e.items) == null ? void 0 : t.length) !== 0)
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
                    <umb-localize-date date=${i.requestDate} .options=${v(this, D)}>
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
A = function() {
  return this._greenHost === void 0 ? u`
        <p style="margin: 0;">Loading...</p>
      ` : this._greenHost === !1 ? u`
        <p style="margin: 0;">No</p>
      ` : u`
      <p style="margin: 0;">Yes</p>
    `;
};
E = function() {
  return u`
    <uui-box headline="Green hosting" style="margin-bottom: var(--uui-size-space-4);">
      <div slot="header">Powered by <a href="https://www.thegreenwebfoundation.org/co2-js/" target="_blank">CO2.js</a></div>
      ${b(this, h, A).call(this)}
    </uui-box>
    `;
};
$ = function() {
  var e, t, r, i, a, o;
  if (((t = (e = this._overviewData) == null ? void 0 : e.items) == null ? void 0 : t.length) !== 0)
    return u`
        <div id="right-column">
          ${b(this, h, E).call(this)}

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
  y()
], f.prototype, "_overviewData", 2);
p([
  y()
], f.prototype, "_averageData", 2);
p([
  y()
], f.prototype, "_greenHost", 2);
f = p([
  q(Q)
], f);
const ie = f;
export {
  f as OverviewRootWorkspaceElement,
  ie as default
};
//# sourceMappingURL=overview-workspace.element-BGliE5Yv.js.map
