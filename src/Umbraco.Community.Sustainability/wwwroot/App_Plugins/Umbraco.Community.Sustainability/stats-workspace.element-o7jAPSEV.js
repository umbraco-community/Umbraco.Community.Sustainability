import { html as p, repeat as L, css as H, state as c, property as q, customElement as j } from "@umbraco-cms/backoffice/external/lit";
import { S as F } from "./index-DylV9Ngt.js";
import { UmbLitElement as K } from "@umbraco-cms/backoffice/lit-element";
var _ = /* @__PURE__ */ ((t) => (t.ASCENDING = "Ascending", t.DESCENDING = "Descending", t))(_ || {}), M = Object.defineProperty, U = Object.getOwnPropertyDescriptor, u = (t, e, a, l) => {
  for (var r = l > 1 ? void 0 : l ? U(e, a) : e, o = t.length - 1, n; o >= 0; o--)
    (n = t[o]) && (r = (l ? n(e, a, r) : n(r)) || r);
  return l && r && M(e, a, r), r;
}, m = (t, e, a) => {
  if (!e.has(t))
    throw TypeError("Cannot " + a);
}, f = (t, e, a) => (m(t, e, "read from private field"), a ? a.call(t) : e.get(t)), d = (t, e, a) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, a);
}, X = (t, e, a, l) => (m(t, e, "write to private field"), l ? l.call(t, a) : e.set(t, a), a), h = (t, e, a) => (m(t, e, "access private method"), a), b, v, g, y, S, W, D, A;
const Y = "stats-workspace";
let i = class extends K {
  constructor() {
    super(), d(this, g), d(this, S), d(this, D), d(this, b, void 0), d(this, v, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: !0
    }), this._loaded = !1, this._sortingDesc = !1, this._orderDirection = _.DESCENDING, this._orderBy = "RequestDate", this._pageNumber = 1, this._pageSize = 10, this.consumeContext(F, (t) => {
      X(this, b, t), this.observe(f(this, b).overviewData, (e) => {
        e && (this._loaded = !0, this._data = e);
      }), h(this, g, y).call(this);
    });
  }
  _sortingHandler(t) {
    this._sortingDesc = this._orderBy === t ? !this._sortingDesc : !1, this._orderBy = t, this._pageNumber = 1, h(this, g, y).call(this);
  }
  render() {
    var t;
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
                ${L(
      (t = this._data) == null ? void 0 : t.items,
      (e) => e,
      (e) => {
        var a, l, r, o, n, $, w, C, N, E, z, O, x, R, k, B, G, I, P, T;
        return p`
                    <uui-table-row>
                      <uui-table-cell>
                        <a href='/umbraco/section/content/workspace/document/edit/${e.nodeKey}'>
                          ${e.nodeName}
                        </a>
                      </uui-table-cell>
                      <uui-table-cell>
                        <umb-localize-date date=${e.requestDate} .options=${f(this, v)}>
                        </umb-localize-date>
                      </uui-table-cell>
                      <uui-table-cell>
                        <sustainability-carbon-rating .carbonRating=${e.carbonRating}>
                        </sustainability-carbon-rating>
                      </uui-table-cell>

                      <uui-table-cell>
                        ${(o = (r = (l = (a = e.pageDataObject) == null ? void 0 : a.resourceGroups) == null ? void 0 : l.find((s) => s.name === "Images")) == null ? void 0 : r.resources) == null ? void 0 : o.length}
                      </uui-table-cell>

                      <uui-table-cell>
                        ${(C = (w = ($ = (n = e.pageDataObject) == null ? void 0 : n.resourceGroups) == null ? void 0 : $.find((s) => s.name === "Scripts")) == null ? void 0 : w.resources) == null ? void 0 : C.length}
                      </uui-table-cell>

                      <uui-table-cell>
                        ${(O = (z = (E = (N = e.pageDataObject) == null ? void 0 : N.resourceGroups) == null ? void 0 : E.find((s) => s.name === "Links")) == null ? void 0 : z.resources) == null ? void 0 : O.length}
                      </uui-table-cell>

                      <uui-table-cell>
                        ${(B = (k = (R = (x = e.pageDataObject) == null ? void 0 : x.resourceGroups) == null ? void 0 : R.find((s) => s.name === "CSS")) == null ? void 0 : k.resources) == null ? void 0 : B.length}
                      </uui-table-cell>

                      <uui-table-cell>
                        ${(T = (P = (I = (G = e.pageDataObject) == null ? void 0 : G.resourceGroups) == null ? void 0 : I.find((s) => s.name === "Other")) == null ? void 0 : P.resources) == null ? void 0 : T.length}
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

              ${h(this, D, A).call(this)}
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
v = /* @__PURE__ */ new WeakMap();
g = /* @__PURE__ */ new WeakSet();
y = function() {
  var t;
  this._sortingDesc ? this._orderDirection = _.ASCENDING : this._orderDirection = _.DESCENDING, (t = f(this, b)) == null || t.getOverviewData(this._orderDirection, this._orderBy, this._pageNumber, this._pageSize);
};
S = /* @__PURE__ */ new WeakSet();
W = function(t) {
  this._pageNumber = t.target.current, h(this, g, y).call(this);
};
D = /* @__PURE__ */ new WeakSet();
A = function() {
  var t, e, a;
  if (((t = this._data) == null ? void 0 : t.totalPages) !== 1)
    return p`
      <uui-pagination
        .total=${(e = this._data) == null ? void 0 : e.totalPages}
        .current=${(a = this._data) == null ? void 0 : a.pageNumber}
        @change=${h(this, S, W)}>
      </uui-pagination>
    `;
};
i.styles = [
  H`
      #loader-container {
				display: flex;
				justify-content: center;
				align-items: center;
				margin: 0 var(--uui-size-space-4);
			}
    `
];
u([
  c()
], i.prototype, "_data", 2);
u([
  q({ type: Boolean })
], i.prototype, "_loaded", 2);
u([
  c()
], i.prototype, "_sortingDesc", 2);
u([
  c()
], i.prototype, "_orderDirection", 2);
u([
  c()
], i.prototype, "_orderBy", 2);
u([
  c()
], i.prototype, "_pageNumber", 2);
u([
  c()
], i.prototype, "_pageSize", 2);
i = u([
  j(Y)
], i);
const Z = i;
export {
  i as StatsRootWorkspaceElement,
  Z as default
};
//# sourceMappingURL=stats-workspace.element-o7jAPSEV.js.map
