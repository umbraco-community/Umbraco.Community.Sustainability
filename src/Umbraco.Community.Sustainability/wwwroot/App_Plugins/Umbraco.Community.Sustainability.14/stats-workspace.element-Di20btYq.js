import { UmbElementMixin as $ } from "@umbraco-cms/backoffice/element-api";
import { LitElement as w, html as h, repeat as N, css as C, state as l, property as E, customElement as x } from "@umbraco-cms/backoffice/external/lit";
import { S as z } from "./index-CvbKOwCL.js";
var g = /* @__PURE__ */ ((t) => (t.ASCENDING = "Ascending", t.DESCENDING = "Descending", t))(g || {}), B = Object.defineProperty, R = Object.getOwnPropertyDescriptor, s = (t, e, i, r) => {
  for (var o = r > 1 ? void 0 : r ? R(e, i) : e, p = t.length - 1, b; p >= 0; p--)
    (b = t[p]) && (o = (r ? b(e, i, o) : b(o)) || o);
  return r && o && B(e, i, o), o;
}, v = (t, e, i) => {
  if (!e.has(t))
    throw TypeError("Cannot " + i);
}, D = (t, e, i) => (v(t, e, "read from private field"), i ? i.call(t) : e.get(t)), c = (t, e, i) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, i);
}, T = (t, e, i, r) => (v(t, e, "write to private field"), r ? r.call(t, i) : e.set(t, i), i), u = (t, e, i) => (v(t, e, "access private method"), i), n, d, _, f, m, y, S;
const k = "stats-workspace";
let a = class extends $(w) {
  constructor() {
    super(), c(this, d), c(this, f), c(this, y), c(this, n, void 0), this._loaded = !1, this._sortingDesc = !1, this._orderDirection = g.DESCENDING, this._orderBy = "RequestDate", this._pageNumber = 1, this._pageSize = 10, this.consumeContext(z, (t) => {
      T(this, n, t), this.observe(D(this, n).overviewData, (e) => {
        e && (this._loaded = !0, this._data = e);
      }), u(this, d, _).call(this);
    });
  }
  _sortingHandler(t) {
    this._sortingDesc = this._orderBy === t ? !this._sortingDesc : !1, this._orderBy = t, this._pageNumber = 1, u(this, d, _).call(this);
  }
  render() {
    return this._loaded ? h`
        <umb-body-layout headline="Stats">
          <div id="main">
            <uui-box>
              <uui-table>
                <uui-table-head>
                  <uui-table-head-cell></uui-table-head-cell>
                  <uui-table-head-cell style="--uui-table-cell-padding: 0">
                    <uui-button
                      style="font-weight: bold; padding: var(--uui-size-4) 0"
                      @click=${() => this._sortingHandler("RequestDate")}>
                      Last Run Date
                      <uui-symbol-sort
                        ?active=${this._orderBy === "RequestDate"}
                        ?descending=${this._sortingDesc}>
                      </uui-symbol-sort>
                    </uui-button>
                  </uui-table-head-cell>
                  <uui-table-head-cell style="--uui-table-cell-padding: 0">
                    <uui-button
                      style="font-weight: bold; padding: var(--uui-size-4) 0"
                      @click=${() => this._sortingHandler("CarbonRating")}>
                      Carbon Rating
                      <uui-symbol-sort
                        ?active=${this._orderBy === "CarbonRating"}
                        ?descending=${this._sortingDesc}>
                      </uui-symbol-sort>
                    </uui-button>
                  </uui-table-head-cell>
                  <uui-table-head-cell style="text-align: right;">
                    <uui-button
                      style="font-weight: bold; padding: var(--uui-size-4) 0"
                      @click=${() => this._sortingHandler("TotalSize")}>
                      Page Size
                      <uui-symbol-sort
                        ?active=${this._orderBy === "TotalSize"}
                        ?descending=${this._sortingDesc}>
                      </uui-symbol-sort>
                    </uui-button>
                  </uui-table-head-cell>
                  <uui-table-head-cell style="text-align: right;">
                    <uui-button
                      style="font-weight: bold; padding: var(--uui-size-4) 0"
                      @click=${() => this._sortingHandler("TotalEmissions")}>
                      CO₂ per page view
                      <uui-symbol-sort
                        ?active=${this._orderBy === "TotalEmissions"}
                        ?descending=${this._sortingDesc}>
                      </uui-symbol-sort>
                    </uui-button>                
                  </uui-table-head-cell>
                </uui-table-head>
                ${N(
      this._data.items,
      (t) => t,
      (t) => h`
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
                      <uui-table-cell style="text-align: right;">
                        ${(t.totalSize / 1024).toFixed(2)}KB
                      </uui-table-cell>

                      <uui-table-cell style="text-align: right;">
                        ${t.totalEmissions.toFixed(4)}g
                      </uui-table-cell>
                    </uui-table-row>
                  `
    )}
              </uui-table>

              ${u(this, y, S).call(this)}
            </uui-box>
          </div>
        </umb-body-layout>
      ` : h`
        <div id="loader-container">
          <uui-loader></uui-loader>
        </div>`;
  }
};
n = /* @__PURE__ */ new WeakMap();
d = /* @__PURE__ */ new WeakSet();
_ = function() {
  this._sortingDesc ? this._orderDirection = g.DESCENDING : this._orderDirection = g.ASCENDING, D(this, n).getOverviewData(this._orderDirection, this._orderBy, this._pageNumber, this._pageSize);
};
f = /* @__PURE__ */ new WeakSet();
m = function(t) {
  this._pageNumber = t.target.current, u(this, d, _).call(this);
};
y = /* @__PURE__ */ new WeakSet();
S = function() {
  var t, e;
  if (((t = this._data) == null ? void 0 : t.totalPages) !== 1)
    return h`
      <uui-pagination
        .total=${this._data.totalPages}
        .current=${(e = this._data) == null ? void 0 : e.pageNumber}
        @change=${u(this, f, m)}>
      </uui-pagination>
    `;
};
a.styles = [
  C`
      #loader-container {
				display: flex;
				justify-content: center;
				align-items: center;
				margin: 0 var(--uui-size-space-4);
			}
    `
];
s([
  l()
], a.prototype, "_data", 2);
s([
  E({ type: Boolean })
], a.prototype, "_loaded", 2);
s([
  l()
], a.prototype, "_sortingDesc", 2);
s([
  l()
], a.prototype, "_orderDirection", 2);
s([
  l()
], a.prototype, "_orderBy", 2);
s([
  l()
], a.prototype, "_pageNumber", 2);
s([
  l()
], a.prototype, "_pageSize", 2);
a = s([
  x(k)
], a);
const W = a;
export {
  a as StatsRootWorkspaceElement,
  W as default
};
//# sourceMappingURL=stats-workspace.element-Di20btYq.js.map
