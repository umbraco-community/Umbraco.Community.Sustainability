import { html as p, repeat as P, css as T, state as c, property as W, customElement as A } from "@umbraco-cms/backoffice/external/lit";
import { S as H } from "./index-Clx-kk79.js";
import { UmbLitElement as q } from "@umbraco-cms/backoffice/lit-element";
var _ = /* @__PURE__ */ ((e) => (e.ASCENDING = "Ascending", e.DESCENDING = "Descending", e))(_ || {}), L = Object.defineProperty, F = Object.getOwnPropertyDescriptor, r = (e, t, i, l) => {
  for (var s = l > 1 ? void 0 : l ? F(t, i) : t, o = e.length - 1, n; o >= 0; o--)
    (n = e[o]) && (s = (l ? n(t, i, s) : n(s)) || s);
  return l && s && L(t, i, s), s;
}, m = (e, t, i) => {
  if (!t.has(e))
    throw TypeError("Cannot " + i);
}, v = (e, t, i) => (m(e, t, "read from private field"), i ? i.call(e) : t.get(e)), d = (e, t, i) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, i);
}, K = (e, t, i, l) => (m(e, t, "write to private field"), l ? l.call(e, i) : t.set(e, i), i), h = (e, t, i) => (m(e, t, "access private method"), i), b, f, g, y, S, G, D, I;
const M = "stats-workspace";
let a = class extends q {
  constructor() {
    super(), d(this, g), d(this, S), d(this, D), d(this, b, void 0), d(this, f, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: !0
    }), this._loaded = !1, this._sortingDesc = !1, this._orderDirection = _.DESCENDING, this._orderBy = "RequestDate", this._pageNumber = 1, this._pageSize = 10, this.consumeContext(H, (e) => {
      K(this, b, e), this.observe(v(this, b).overviewData, (t) => {
        t && (this._loaded = !0, this._data = t);
      }), h(this, g, y).call(this);
    });
  }
  _sortingHandler(e) {
    this._sortingDesc = this._orderBy === e ? !this._sortingDesc : !1, this._orderBy = e, this._pageNumber = 1, h(this, g, y).call(this);
  }
  render() {
    var e;
    return this._loaded ? p`
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
                  <uui-table-head-cell>Scripts</uui-table-head-cell>
                  <uui-table-head-cell>Images</uui-table-head-cell>
                  <uui-table-head-cell>Styles</uui-table-head-cell>
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
                ${P(
      (e = this._data) == null ? void 0 : e.items,
      (t) => t,
      (t) => {
        var i, l, s, o, n, $, w, C, N, E, z, O, x, R, B, k;
        return p`
                    <uui-table-row>
                      <uui-table-cell>
                        <a href='/umbraco/section/content/workspace/document/edit/${t.nodeKey}'>
                          ${t.nodeName}
                        </a>
                      </uui-table-cell>
                      <uui-table-cell>
                        <umb-localize-date date=${t.requestDate} .options=${v(this, f)}>
                        </umb-localize-date>
                      </uui-table-cell>
                      <uui-table-cell>
                        <sustainability-carbon-rating .carbonRating=${t.carbonRating}>
                        </sustainability-carbon-rating>
                      </uui-table-cell>

                      <uui-table-cell>
                        ${(o = (s = (l = (i = t.pageDataObject) == null ? void 0 : i.resourceGroups) == null ? void 0 : l.find((u) => u.name === "Scripts")) == null ? void 0 : s.resources) == null ? void 0 : o.length}
                      </uui-table-cell>

                      <uui-table-cell>
                        ${(C = (w = ($ = (n = t.pageDataObject) == null ? void 0 : n.resourceGroups) == null ? void 0 : $.find((u) => u.name === "Images")) == null ? void 0 : w.resources) == null ? void 0 : C.length}
                      </uui-table-cell>

                      <uui-table-cell>
                        ${(O = (z = (E = (N = t.pageDataObject) == null ? void 0 : N.resourceGroups) == null ? void 0 : E.find((u) => u.name === "Styles")) == null ? void 0 : z.resources) == null ? void 0 : O.length}
                      </uui-table-cell>

                      <uui-table-cell>
                        ${(k = (B = (R = (x = t.pageDataObject) == null ? void 0 : x.resourceGroups) == null ? void 0 : R.find((u) => u.name === "Other")) == null ? void 0 : B.resources) == null ? void 0 : k.length}
                      </uui-table-cell>

                      <uui-table-cell style="text-align: right;">
                        ${(t.totalSize / 1024).toFixed(2)}KB
                      </uui-table-cell>

                      <uui-table-cell style="text-align: right;">
                        ${t.totalEmissions.toFixed(4)}g
                      </uui-table-cell>
                    </uui-table-row>
                  `;
      }
    )}
              </uui-table>

              ${h(this, D, I).call(this)}
            </uui-box>
          </div>
        </umb-body-layout>
      ` : p`
        <div id="loader-container">
          <uui-loader></uui-loader>
        </div>`;
  }
};
b = /* @__PURE__ */ new WeakMap();
f = /* @__PURE__ */ new WeakMap();
g = /* @__PURE__ */ new WeakSet();
y = function() {
  var e;
  this._sortingDesc ? this._orderDirection = _.DESCENDING : this._orderDirection = _.ASCENDING, (e = v(this, b)) == null || e.getOverviewData(this._orderDirection, this._orderBy, this._pageNumber, this._pageSize);
};
S = /* @__PURE__ */ new WeakSet();
G = function(e) {
  this._pageNumber = e.target.current, h(this, g, y).call(this);
};
D = /* @__PURE__ */ new WeakSet();
I = function() {
  var e, t, i;
  if (((e = this._data) == null ? void 0 : e.totalPages) !== 1)
    return p`
      <uui-pagination
        .total=${(t = this._data) == null ? void 0 : t.totalPages}
        .current=${(i = this._data) == null ? void 0 : i.pageNumber}
        @change=${h(this, S, G)}>
      </uui-pagination>
    `;
};
a.styles = [
  T`
      #loader-container {
				display: flex;
				justify-content: center;
				align-items: center;
				margin: 0 var(--uui-size-space-4);
			}
    `
];
r([
  c()
], a.prototype, "_data", 2);
r([
  W({ type: Boolean })
], a.prototype, "_loaded", 2);
r([
  c()
], a.prototype, "_sortingDesc", 2);
r([
  c()
], a.prototype, "_orderDirection", 2);
r([
  c()
], a.prototype, "_orderBy", 2);
r([
  c()
], a.prototype, "_pageNumber", 2);
r([
  c()
], a.prototype, "_pageSize", 2);
a = r([
  A(M)
], a);
const Y = a;
export {
  a as StatsRootWorkspaceElement,
  Y as default
};
//# sourceMappingURL=stats-workspace.element-snm_eYu_.js.map
