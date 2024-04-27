import { UmbElementMixin as w } from "@umbraco-cms/backoffice/element-api";
import { LitElement as C, html as h, repeat as N, css as E, state as l, property as z, customElement as x } from "@umbraco-cms/backoffice/external/lit";
import { S as R } from "./index-DBnCYdbR.js";
var g = /* @__PURE__ */ ((t) => (t.ASCENDING = "Ascending", t.DESCENDING = "Descending", t))(g || {}), B = Object.defineProperty, k = Object.getOwnPropertyDescriptor, s = (t, e, i, r) => {
  for (var o = r > 1 ? void 0 : r ? k(e, i) : e, _ = t.length - 1, p; _ >= 0; _--)
    (p = t[_]) && (o = (r ? p(e, i, o) : p(o)) || o);
  return r && o && B(e, i, o), o;
}, f = (t, e, i) => {
  if (!e.has(t))
    throw TypeError("Cannot " + i);
}, y = (t, e, i) => (f(t, e, "read from private field"), i ? i.call(t) : e.get(t)), n = (t, e, i) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, i);
}, P = (t, e, i, r) => (f(t, e, "write to private field"), r ? r.call(t, i) : e.set(t, i), i), u = (t, e, i) => (f(t, e, "access private method"), i), d, v, c, b, D, S, m, $;
const T = "stats-workspace";
let a = class extends w(C) {
  constructor() {
    super(), n(this, c), n(this, D), n(this, m), n(this, d, void 0), n(this, v, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: !0
    }), this._loaded = !1, this._sortingDesc = !1, this._orderDirection = g.DESCENDING, this._orderBy = "RequestDate", this._pageNumber = 1, this._pageSize = 10, this.consumeContext(R, (t) => {
      P(this, d, t), this.observe(y(this, d).overviewData, (e) => {
        e && (this._loaded = !0, this._data = e);
      }), u(this, c, b).call(this);
    });
  }
  _sortingHandler(t) {
    this._sortingDesc = this._orderBy === t ? !this._sortingDesc : !1, this._orderBy = t, this._pageNumber = 1, u(this, c, b).call(this);
  }
  render() {
    var t;
    return this._loaded ? h`
        <umb-body-layout headline="Stats">
          <div id="main">
            <uui-box>
              <uui-table>
                <uui-table-head>
                  <uui-table-head-cell></uui-table-head-cell>
                  <uui-table-head-cell style="--uui-table-cell-padding: 0">
                    <uui-button
                      label="Last Run Date"
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
                      label="Carbon Rating"
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
                      label="Page Size"
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
                      label="CO₂ per page view"
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
      (t = this._data) == null ? void 0 : t.items,
      (e) => e,
      (e) => h`
                    <uui-table-row>
                      <uui-table-cell>
                        <a href='/umbraco/section/content/workspace/document/edit/${e.nodeKey}'>
                          ${e.nodeName}
                        </a>
                      </uui-table-cell>
                      <uui-table-cell>
                        <umb-localize-date date=${e.requestDate} .options=${y(this, v)}>
                        </umb-localize-date>
                      </uui-table-cell>
                      <uui-table-cell>
                        <sustainability-carbon-rating .carbonRating=${e.carbonRating}>
                        </sustainability-carbon-rating>
                      </uui-table-cell>
                      <uui-table-cell style="text-align: right;">
                        ${(e.totalSize / 1024).toFixed(2)}KB
                      </uui-table-cell>

                      <uui-table-cell style="text-align: right;">
                        ${e.totalEmissions.toFixed(4)}g
                      </uui-table-cell>
                    </uui-table-row>
                  `
    )}
              </uui-table>

              ${u(this, m, $).call(this)}
            </uui-box>
          </div>
        </umb-body-layout>
      ` : h`
        <div id="loader-container">
          <uui-loader></uui-loader>
        </div>`;
  }
};
d = /* @__PURE__ */ new WeakMap();
v = /* @__PURE__ */ new WeakMap();
c = /* @__PURE__ */ new WeakSet();
b = function() {
  var t;
  this._sortingDesc ? this._orderDirection = g.DESCENDING : this._orderDirection = g.ASCENDING, (t = y(this, d)) == null || t.getOverviewData(this._orderDirection, this._orderBy, this._pageNumber, this._pageSize);
};
D = /* @__PURE__ */ new WeakSet();
S = function(t) {
  this._pageNumber = t.target.current, u(this, c, b).call(this);
};
m = /* @__PURE__ */ new WeakSet();
$ = function() {
  var t, e, i;
  if (((t = this._data) == null ? void 0 : t.totalPages) !== 1)
    return h`
      <uui-pagination
        .total=${(e = this._data) == null ? void 0 : e.totalPages}
        .current=${(i = this._data) == null ? void 0 : i.pageNumber}
        @change=${u(this, D, S)}>
      </uui-pagination>
    `;
};
a.styles = [
  E`
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
  z({ type: Boolean })
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
  x(T)
], a);
const A = a;
export {
  a as StatsRootWorkspaceElement,
  A as default
};
//# sourceMappingURL=stats-workspace.element-CjCVcF2l.js.map
