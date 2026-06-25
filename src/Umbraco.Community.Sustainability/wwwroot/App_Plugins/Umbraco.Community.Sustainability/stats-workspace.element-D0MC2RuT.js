import { html as _, repeat as A, css as H, state as n, customElement as L } from "@umbraco-cms/backoffice/external/lit";
import { S as j } from "./index-RhASU_aP.js";
import { UmbLitElement as q } from "@umbraco-cms/backoffice/lit-element";
var g = /* @__PURE__ */ ((t) => (t.ASCENDING = "Ascending", t.DESCENDING = "Descending", t))(g || {}), F = Object.defineProperty, K = Object.getOwnPropertyDescriptor, P = (t) => {
  throw TypeError(t);
}, r = (t, e, i, u) => {
  for (var l = u > 1 ? void 0 : u ? K(e, i) : e, c = t.length - 1, b; c >= 0; c--)
    (b = t[c]) && (l = (u ? b(e, i, l) : b(l)) || l);
  return u && l && F(e, i, l), l;
}, v = (t, e, i) => e.has(t) || P("Cannot " + i), y = (t, e, i) => (v(t, e, "read from private field"), e.get(t)), m = (t, e, i) => e.has(t) ? P("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i), M = (t, e, i, u) => (v(t, e, "write to private field"), e.set(t, i), i), h = (t, e, i) => (v(t, e, "access private method"), i), d, D, o, p, T, W;
const U = "stats-workspace";
let a = class extends q {
  constructor() {
    super(), m(this, o), m(this, d), m(this, D, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: !0
    }), this._loaded = !1, this._sortingDesc = !1, this._orderDirection = g.DESCENDING, this._orderBy = "RequestDate", this._pageNumber = 1, this._pageSize = 10, this.consumeContext(j, (t) => {
      var e;
      M(this, d, t), this.observe((e = y(this, d)) == null ? void 0 : e.overviewData, (i) => {
        i && (this._loaded = !0, this._data = i);
      }), h(this, o, p).call(this);
    });
  }
  _sortingHandler(t) {
    this._sortingDesc = this._orderBy === t ? !this._sortingDesc : !1, this._orderBy = t, this._pageNumber = 1, h(this, o, p).call(this);
  }
  render() {
    var t;
    return this._loaded ? _`
        <umb-body-layout headline=${this.localize.term("sustainability_stats")}>
          <div id="main">
            <uui-box>
              <uui-table>
                <uui-table-head>
                  <uui-table-head-cell></uui-table-head-cell>
                  <uui-table-head-cell class="sortable">
                    <uui-button
                      label=${this.localize.term("sustainability_lastRunDate")}
                      class="sort-button"
                      @click=${() => this._sortingHandler("RequestDate")}>
                      <umb-localize key="sustainability_lastRunDate">Last Run Date</umb-localize>
                      <uui-symbol-sort
                        ?active=${this._orderBy === "RequestDate"}
                        ?descending=${this._sortingDesc}>
                      </uui-symbol-sort>
                    </uui-button>
                  </uui-table-head-cell>
                  <uui-table-head-cell class="sortable">
                    <uui-button
                      label=${this.localize.term("sustainability_carbonRating")}
                      class="sort-button"
                      @click=${() => this._sortingHandler("CarbonRating")}>
                      <umb-localize key="sustainability_carbonRating">Carbon Rating</umb-localize>
                      <uui-symbol-sort
                        ?active=${this._orderBy === "CarbonRating"}
                        ?descending=${this._sortingDesc}>
                      </uui-symbol-sort>
                    </uui-button>
                  </uui-table-head-cell>
                  <uui-table-head-cell><umb-localize key="sustainability_images">Images</umb-localize></uui-table-head-cell>
                  <uui-table-head-cell><umb-localize key="sustainability_scripts">Scripts</umb-localize></uui-table-head-cell>
                  <uui-table-head-cell><umb-localize key="sustainability_links">Links</umb-localize></uui-table-head-cell>
                  <uui-table-head-cell><umb-localize key="sustainability_css">CSS</umb-localize></uui-table-head-cell>
                  <uui-table-head-cell><umb-localize key="sustainability_other">Other</umb-localize></uui-table-head-cell>
                  <uui-table-head-cell class="text-right">
                    <uui-button
                      label=${this.localize.term("sustainability_pageSize")}
                      class="sort-button"
                      @click=${() => this._sortingHandler("TotalSize")}>
                      <umb-localize key="sustainability_pageSize">Page Size</umb-localize>
                      <uui-symbol-sort
                        ?active=${this._orderBy === "TotalSize"}
                        ?descending=${this._sortingDesc}>
                      </uui-symbol-sort>
                    </uui-button>
                  </uui-table-head-cell>
                  <uui-table-head-cell class="text-right">
                    <uui-button
                      label=${this.localize.term("sustainability_co2PerPageView")}
                      class="sort-button"
                      @click=${() => this._sortingHandler("TotalEmissions")}>
                      <umb-localize key="sustainability_co2PerPageView">CO₂ per page view</umb-localize>
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
        var i, u, l, c, b, z, f, $, S, k, N, C, E, w, R, x, O, B, G, I;
        return _`
                    <uui-table-row>
                      <uui-table-cell>
                        <a href='/umbraco/section/content/workspace/document/edit/${e.nodeKey}'>
                          ${e.nodeName}
                        </a>
                      </uui-table-cell>
                      <uui-table-cell>
                        <umb-localize-date date=${e.requestDate} .options=${y(this, D)}>
                        </umb-localize-date>
                      </uui-table-cell>
                      <uui-table-cell>
                        <sustainability-carbon-rating .carbonRating=${e.carbonRating}>
                        </sustainability-carbon-rating>
                      </uui-table-cell>

                      <uui-table-cell>
                        ${(c = (l = (u = (i = e.pageDataObject) == null ? void 0 : i.resourceGroups) == null ? void 0 : u.find((s) => s.name === "Images")) == null ? void 0 : l.resources) == null ? void 0 : c.length}
                      </uui-table-cell>

                      <uui-table-cell>
                        ${($ = (f = (z = (b = e.pageDataObject) == null ? void 0 : b.resourceGroups) == null ? void 0 : z.find((s) => s.name === "Scripts")) == null ? void 0 : f.resources) == null ? void 0 : $.length}
                      </uui-table-cell>

                      <uui-table-cell>
                        ${(C = (N = (k = (S = e.pageDataObject) == null ? void 0 : S.resourceGroups) == null ? void 0 : k.find((s) => s.name === "Links")) == null ? void 0 : N.resources) == null ? void 0 : C.length}
                      </uui-table-cell>

                      <uui-table-cell>
                        ${(x = (R = (w = (E = e.pageDataObject) == null ? void 0 : E.resourceGroups) == null ? void 0 : w.find((s) => s.name === "CSS")) == null ? void 0 : R.resources) == null ? void 0 : x.length}
                      </uui-table-cell>

                      <uui-table-cell>
                        ${(I = (G = (B = (O = e.pageDataObject) == null ? void 0 : O.resourceGroups) == null ? void 0 : B.find((s) => s.name === "Other")) == null ? void 0 : G.resources) == null ? void 0 : I.length}
                      </uui-table-cell>

                      <uui-table-cell class="text-right">
                        ${(e.totalSize / 1024).toFixed(2)}KB
                      </uui-table-cell>

                      <uui-table-cell class="text-right">
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
      ` : _`
        <div id="loader-container">
          <uui-loader></uui-loader>
        </div>`;
  }
};
d = /* @__PURE__ */ new WeakMap();
D = /* @__PURE__ */ new WeakMap();
o = /* @__PURE__ */ new WeakSet();
p = function() {
  var t;
  this._sortingDesc ? this._orderDirection = g.ASCENDING : this._orderDirection = g.DESCENDING, (t = y(this, d)) == null || t.getOverviewData(this._orderDirection, this._orderBy, this._pageNumber, this._pageSize);
};
T = function(t) {
  this._pageNumber = t.target.current, h(this, o, p).call(this);
};
W = function() {
  var t, e;
  if (((t = this._data) == null ? void 0 : t.total) !== 1)
    return _`
      <uui-pagination
        .total=${(e = this._data) == null ? void 0 : e.total}
        .current=${this._pageNumber}
        @change=${h(this, o, T)}>
      </uui-pagination>
    `;
};
a.styles = [
  H`
      #loader-container {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 var(--uui-size-space-4);
      }

      uui-table-head-cell.sortable {
        --uui-table-cell-padding: 0;
      }

      .sort-button {
        font-weight: bold;
        padding: var(--uui-size-4) 0;
      }

      .text-right {
        text-align: right;
      }
    `
];
r([
  n()
], a.prototype, "_data", 2);
r([
  n()
], a.prototype, "_loaded", 2);
r([
  n()
], a.prototype, "_sortingDesc", 2);
r([
  n()
], a.prototype, "_orderDirection", 2);
r([
  n()
], a.prototype, "_orderBy", 2);
r([
  n()
], a.prototype, "_pageNumber", 2);
r([
  n()
], a.prototype, "_pageSize", 2);
a = r([
  L(U)
], a);
const J = a;
export {
  a as StatsRootWorkspaceElement,
  J as default
};
//# sourceMappingURL=stats-workspace.element-D0MC2RuT.js.map
