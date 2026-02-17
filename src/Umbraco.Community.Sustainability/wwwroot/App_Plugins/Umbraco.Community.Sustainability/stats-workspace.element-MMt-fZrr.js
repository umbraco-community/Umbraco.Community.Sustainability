import { html as g, repeat as A, css as H, state as n, customElement as L } from "@umbraco-cms/backoffice/external/lit";
import { S as j } from "./index-B1QtHjXB.js";
import { UmbLitElement as q } from "@umbraco-cms/backoffice/lit-element";
const m = {
  ASCENDING: "Ascending",
  DESCENDING: "Descending"
};
var M = Object.defineProperty, F = Object.getOwnPropertyDescriptor, I = (t) => {
  throw TypeError(t);
}, o = (t, e, i, u) => {
  for (var l = u > 1 ? void 0 : u ? F(e, i) : e, c = t.length - 1, b; c >= 0; c--)
    (b = t[c]) && (l = (u ? b(e, i, l) : b(l)) || l);
  return u && l && M(e, i, l), l;
}, z = (t, e, i) => e.has(t) || I("Cannot " + i), y = (t, e, i) => (z(t, e, "read from private field"), e.get(t)), p = (t, e, i) => e.has(t) ? I("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i), K = (t, e, i, u) => (z(t, e, "write to private field"), e.set(t, i), i), d = (t, e, i) => (z(t, e, "access private method"), i), h, D, r, _, T, W;
const U = "stats-workspace";
let a = class extends q {
  constructor() {
    super(), p(this, r), p(this, h), p(this, D, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: !0
    }), this._loaded = !1, this._sortingDesc = !1, this._orderDirection = m.DESCENDING, this._orderBy = "RequestDate", this._pageNumber = 1, this._pageSize = 10, this.consumeContext(j, (t) => {
      var e;
      K(this, h, t), this.observe((e = y(this, h)) == null ? void 0 : e.overviewData, (i) => {
        i && (this._loaded = !0, this._data = i);
      }), d(this, r, _).call(this);
    });
  }
  _sortingHandler(t) {
    this._sortingDesc = this._orderBy === t ? !this._sortingDesc : !1, this._orderBy = t, this._pageNumber = 1, d(this, r, _).call(this);
  }
  render() {
    var t;
    return this._loaded ? g`
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
        var i, u, l, c, b, v, f, $, S, k, N, C, E, w, R, x, O, P, B, G;
        return g`
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
                        ${($ = (f = (v = (b = e.pageDataObject) == null ? void 0 : b.resourceGroups) == null ? void 0 : v.find((s) => s.name === "Scripts")) == null ? void 0 : f.resources) == null ? void 0 : $.length}
                      </uui-table-cell>

                      <uui-table-cell>
                        ${(C = (N = (k = (S = e.pageDataObject) == null ? void 0 : S.resourceGroups) == null ? void 0 : k.find((s) => s.name === "Links")) == null ? void 0 : N.resources) == null ? void 0 : C.length}
                      </uui-table-cell>

                      <uui-table-cell>
                        ${(x = (R = (w = (E = e.pageDataObject) == null ? void 0 : E.resourceGroups) == null ? void 0 : w.find((s) => s.name === "CSS")) == null ? void 0 : R.resources) == null ? void 0 : x.length}
                      </uui-table-cell>

                      <uui-table-cell>
                        ${(G = (B = (P = (O = e.pageDataObject) == null ? void 0 : O.resourceGroups) == null ? void 0 : P.find((s) => s.name === "Other")) == null ? void 0 : B.resources) == null ? void 0 : G.length}
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

              ${d(this, r, W).call(this)}
            </uui-box>
          </div>
        </umb-body-layout>
      ` : g`
        <div id="loader-container">
          <uui-loader></uui-loader>
        </div>`;
  }
};
h = /* @__PURE__ */ new WeakMap();
D = /* @__PURE__ */ new WeakMap();
r = /* @__PURE__ */ new WeakSet();
_ = function() {
  var t;
  this._sortingDesc ? this._orderDirection = m.ASCENDING : this._orderDirection = m.DESCENDING, (t = y(this, h)) == null || t.getOverviewData(this._orderDirection, this._orderBy, this._pageNumber, this._pageSize);
};
T = function(t) {
  this._pageNumber = t.target.current, d(this, r, _).call(this);
};
W = function() {
  var t, e, i;
  if (((t = this._data) == null ? void 0 : t.totalPages) !== 1)
    return g`
      <uui-pagination
        .total=${(e = this._data) == null ? void 0 : e.totalPages}
        .current=${(i = this._data) == null ? void 0 : i.pageNumber}
        @change=${d(this, r, T)}>
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
o([
  n()
], a.prototype, "_data", 2);
o([
  n()
], a.prototype, "_loaded", 2);
o([
  n()
], a.prototype, "_sortingDesc", 2);
o([
  n()
], a.prototype, "_orderDirection", 2);
o([
  n()
], a.prototype, "_orderBy", 2);
o([
  n()
], a.prototype, "_pageNumber", 2);
o([
  n()
], a.prototype, "_pageSize", 2);
a = o([
  L(U)
], a);
const J = a;
export {
  a as StatsRootWorkspaceElement,
  J as default
};
//# sourceMappingURL=stats-workspace.element-MMt-fZrr.js.map
