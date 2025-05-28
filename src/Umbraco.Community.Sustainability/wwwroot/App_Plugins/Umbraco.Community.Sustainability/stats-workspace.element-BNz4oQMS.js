import { html as g, repeat as A, css as L, state as d, property as H, customElement as j } from "@umbraco-cms/backoffice/external/lit";
import { S as q } from "./index-BMf2rr-p.js";
import { UmbLitElement as F } from "@umbraco-cms/backoffice/lit-element";
var p = /* @__PURE__ */ ((t) => (t.ASCENDING = "Ascending", t.DESCENDING = "Descending", t))(p || {}), K = Object.defineProperty, M = Object.getOwnPropertyDescriptor, P = (t) => {
  throw TypeError(t);
}, r = (t, e, a, u) => {
  for (var l = u > 1 ? void 0 : u ? M(e, a) : e, n = t.length - 1, c; n >= 0; n--)
    (c = t[n]) && (l = (u ? c(e, a, l) : c(l)) || l);
  return u && l && K(e, a, l), l;
}, D = (t, e, a) => e.has(t) || P("Cannot " + a), v = (t, e, a) => (D(t, e, "read from private field"), e.get(t)), y = (t, e, a) => e.has(t) ? P("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), U = (t, e, a, u) => (D(t, e, "write to private field"), e.set(t, a), a), h = (t, e, a) => (D(t, e, "access private method"), a), b, m, o, _, T, W;
const X = "stats-workspace";
let i = class extends F {
  constructor() {
    super(), y(this, o), y(this, b), y(this, m, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: !0
    }), this._loaded = !1, this._sortingDesc = !1, this._orderDirection = p.DESCENDING, this._orderBy = "RequestDate", this._pageNumber = 1, this._pageSize = 10, this.consumeContext(q, (t) => {
      var e;
      U(this, b, t), this.observe((e = v(this, b)) == null ? void 0 : e.overviewData, (a) => {
        a && (this._loaded = !0, this._data = a);
      }), h(this, o, _).call(this);
    });
  }
  _sortingHandler(t) {
    this._sortingDesc = this._orderBy === t ? !this._sortingDesc : !1, this._orderBy = t, this._pageNumber = 1, h(this, o, _).call(this);
  }
  render() {
    var t;
    return this._loaded ? g`
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
                  <uui-table-head-cell>Images</uui-table-head-cell>
                  <uui-table-head-cell>Scripts</uui-table-head-cell>
                  <uui-table-head-cell>Links</uui-table-head-cell>
                  <uui-table-head-cell>CSS</uui-table-head-cell>
                  <uui-table-head-cell>Other</uui-table-head-cell>
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
                ${A(
      (t = this._data) == null ? void 0 : t.items,
      (e) => e,
      (e) => {
        var a, u, l, n, c, f, S, $, C, N, w, E, z, O, R, x, B, k, G, I;
        return g`
                    <uui-table-row>
                      <uui-table-cell>
                        <a href='/umbraco/section/content/workspace/document/edit/${e.nodeKey}'>
                          ${e.nodeName}
                        </a>
                      </uui-table-cell>
                      <uui-table-cell>
                        <umb-localize-date date=${e.requestDate} .options=${v(this, m)}>
                        </umb-localize-date>
                      </uui-table-cell>
                      <uui-table-cell>
                        <sustainability-carbon-rating .carbonRating=${e.carbonRating}>
                        </sustainability-carbon-rating>
                      </uui-table-cell>

                      <uui-table-cell>
                        ${(n = (l = (u = (a = e.pageDataObject) == null ? void 0 : a.resourceGroups) == null ? void 0 : u.find((s) => s.name === "Images")) == null ? void 0 : l.resources) == null ? void 0 : n.length}
                      </uui-table-cell>

                      <uui-table-cell>
                        ${($ = (S = (f = (c = e.pageDataObject) == null ? void 0 : c.resourceGroups) == null ? void 0 : f.find((s) => s.name === "Scripts")) == null ? void 0 : S.resources) == null ? void 0 : $.length}
                      </uui-table-cell>

                      <uui-table-cell>
                        ${(E = (w = (N = (C = e.pageDataObject) == null ? void 0 : C.resourceGroups) == null ? void 0 : N.find((s) => s.name === "Links")) == null ? void 0 : w.resources) == null ? void 0 : E.length}
                      </uui-table-cell>

                      <uui-table-cell>
                        ${(x = (R = (O = (z = e.pageDataObject) == null ? void 0 : z.resourceGroups) == null ? void 0 : O.find((s) => s.name === "CSS")) == null ? void 0 : R.resources) == null ? void 0 : x.length}
                      </uui-table-cell>

                      <uui-table-cell>
                        ${(I = (G = (k = (B = e.pageDataObject) == null ? void 0 : B.resourceGroups) == null ? void 0 : k.find((s) => s.name === "Other")) == null ? void 0 : G.resources) == null ? void 0 : I.length}
                      </uui-table-cell>

                      <uui-table-cell style="text-align: right;">
                        ${(e.totalSize / 1024).toFixed(2)}KB
                      </uui-table-cell>

                      <uui-table-cell style="text-align: right;">
                        ${e.totalEmissions.toFixed(4)}g
                      </uui-table-cell>
                    </uui-table-row>
                  `;
      }
    )}
              </uui-table>

              ${h(this, o, W).call(this)}
            </uui-box>
          </div>
        </umb-body-layout>
      ` : g`
        <div id="loader-container">
          <uui-loader></uui-loader>
        </div>`;
  }
};
b = /* @__PURE__ */ new WeakMap();
m = /* @__PURE__ */ new WeakMap();
o = /* @__PURE__ */ new WeakSet();
_ = function() {
  var t;
  this._sortingDesc ? this._orderDirection = p.ASCENDING : this._orderDirection = p.DESCENDING, (t = v(this, b)) == null || t.getOverviewData(this._orderDirection, this._orderBy, this._pageNumber, this._pageSize);
};
T = function(t) {
  this._pageNumber = t.target.current, h(this, o, _).call(this);
};
W = function() {
  var t, e, a;
  if (((t = this._data) == null ? void 0 : t.totalPages) !== 1)
    return g`
      <uui-pagination
        .total=${(e = this._data) == null ? void 0 : e.totalPages}
        .current=${(a = this._data) == null ? void 0 : a.pageNumber}
        @change=${h(this, o, T)}>
      </uui-pagination>
    `;
};
i.styles = [
  L`
      #loader-container {
				display: flex;
				justify-content: center;
				align-items: center;
				margin: 0 var(--uui-size-space-4);
			}
    `
];
r([
  d()
], i.prototype, "_data", 2);
r([
  H({ type: Boolean })
], i.prototype, "_loaded", 2);
r([
  d()
], i.prototype, "_sortingDesc", 2);
r([
  d()
], i.prototype, "_orderDirection", 2);
r([
  d()
], i.prototype, "_orderBy", 2);
r([
  d()
], i.prototype, "_pageNumber", 2);
r([
  d()
], i.prototype, "_pageSize", 2);
i = r([
  j(X)
], i);
const V = i;
export {
  i as StatsRootWorkspaceElement,
  V as default
};
//# sourceMappingURL=stats-workspace.element-BNz4oQMS.js.map
