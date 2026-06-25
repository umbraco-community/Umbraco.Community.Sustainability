# New Feature: Site-Wide Check

## Context

The Sustainability package currently only supports **single-page checks** triggered manually from a document's workspace view. This feature adds:

**Site-wide sustainability check** — Discover all published pages and run sustainability checks across the entire site, with real-time progress via SSE

**Current architecture**: Each check uses Playwright (headless Chromium) to load a page, inject `resource-checker.js` (which imports CO2.js), extract sustainability data, and return a `SustainabilityResponse`. Results are stored in `umbPageMetrics` via NPoco.

---

## Feature 1: Site-Wide Sustainability Check

### Architecture

```
UI "Start" button → fetch() SSE stream
    ↓
SiteCheckController (SSE endpoint)
    ↓
SiteCheckService (orchestrator)
    ├─ URL Discovery Strategies (Examine + Sitemap)
    ├─ TPL Dataflow ActionBlock (2-3 concurrent)
    ├─ Channel<SiteCheckProgressDto> → IAsyncEnumerable
    └─ Per-page: SustainabilityService.GetSustainabilityData() + save to DB
```

### New Backend Files

#### 1. `Configuration/SustainabilitySettings.cs`

Configuration POCO bound to `appsettings.json`:

```json
{ "Sustainability": { "MaxConcurrentChecks": 2, "MaxCheckDurationMinutes": 60, "UseUmbracoContentIndex": true, "UseSitemapXml": false, "SitemapUrl": null } }
```

Properties: `MaxConcurrentChecks` (default 2, max 5), `MaxCheckDurationMinutes` (default 60, 0 = no limit), `UseUmbracoContentIndex` (default true), `UseSitemapXml` (default false), `SitemapUrl` (optional override).

#### 2. `Services/Discovery/IUrlDiscoveryStrategy.cs`

```csharp
public interface IUrlDiscoveryStrategy
{
    string Name { get; }
    int Priority { get; }  // Higher = runs first
    Task<IEnumerable<DiscoveredUrl>> DiscoverUrlsAsync(string baseUrl, CancellationToken ct);
}

public record DiscoveredUrl(string Url, Guid? NodeKey = null, string? NodeName = null);
```

#### 3. `Services/Discovery/UmbracoContentUrlDiscoveryStrategy.cs`

- Priority: 100 (runs first)
- Uses `IExamineManager` to query the internal content index for published nodes
- Uses `IPublishedUrlProvider` to resolve node GUIDs to absolute URLs
- Returns `DiscoveredUrl` with both URL and NodeKey
- Controlled by `SustainabilitySettings.UseUmbracoContentIndex` flag

#### 4. `Services/Discovery/SitemapUrlDiscoveryStrategy.cs`

- Priority: 50 (runs second, fills gaps)
- Fetches `/sitemap.xml` (or configured URL) via `IHttpClientFactory`
- Parses XML `<loc>` elements, supports sitemap indexes
- Returns `DiscoveredUrl` with URL only (no NodeKey — resolved later if possible)
- Controlled by `SustainabilitySettings.UseSitemapXml` flag

#### 5. `Models/SiteCheckProgressDto.cs`

SSE event payload:

```csharp
public class SiteCheckProgressDto
{
    public string Type { get; set; }    // "discovery", "result", "error"
    public string? Url { get; set; }
    public Guid? NodeKey { get; set; }
    public string? NodeName { get; set; }
    public bool Success { get; set; }
    public string? CarbonRating { get; set; }
    public decimal TotalSize { get; set; }
    public double TotalEmissions { get; set; }
    public string? Error { get; set; }
    public int TotalPages { get; set; }
    public int PagesCompleted { get; set; }
}
```

#### 6. `Services/ISiteCheckService.cs` + `Services/SiteCheckService.cs`

**Interface**:
```csharp
public interface ISiteCheckService
{
    IAsyncEnumerable<SiteCheckProgressDto> StartSiteCheck(string baseUrl, string applicationUrl, CancellationToken ct);
    bool IsRunning { get; }
}
```

**Orchestration logic**:

1. Guard against concurrent runs via `static SemaphoreSlim(1,1)`
2. Create timeout CTS from `MaxCheckDurationMinutes`, link with request CTS
3. Run discovery strategies by priority, deduplicate URLs (first strategy wins)
4. Write `"discovery"` event to channel with `TotalPages` count
5. Feed URLs into `ActionBlock<DiscoveredUrl>` with `MaxDegreeOfParallelism` from settings
6. Each action calls `ISustainabilityService.GetSustainabilityData(url, applicationUrl)`
7. On success: save to DB via `IPageMetricService.AddPageMetric()`, write `"result"` event
8. On error: write `"error"` event with message
9. `yield return` from `channel.Reader.ReadAllAsync()`

**Lifetime**: Scoped (avoids captive dependency on scoped `IPageMetricService`). Running guard is a `static SemaphoreSlim`.

#### 7. `Controllers/SiteCheckController.cs`

Inherits `SustainabilityWorkspaceControllerBase` (gets auth + routing for free).

```csharp
[HttpGet("startSiteCheck")]
[Produces("text/event-stream")]
public async Task<ServerSentEventsResult<SiteCheckProgressDto>> StartSiteCheck(CancellationToken ct)
{
    string applicationUrl = $"{Request.Scheme}://{Request.Host}";
    return TypedResults.ServerSentEvents(
        _siteCheckService.StartSiteCheck(applicationUrl, applicationUrl, ct), "sitecheck");
}

[HttpGet("isSiteCheckRunning")]
public IActionResult IsSiteCheckRunning() => Ok(_siteCheckService.IsRunning);
```

### Modified Backend Files

#### 8. `SustainabilityComposer.cs`

Add after existing registrations (line 46):

```csharp
// Configuration
builder.Services.AddOptions<SustainabilitySettings>()
    .Bind(builder.Config.GetSection("Sustainability"));

// Site-check service
builder.Services.AddScoped<ISiteCheckService, SiteCheckService>();

// URL discovery strategies
builder.Services.AddScoped<IUrlDiscoveryStrategy, UmbracoContentUrlDiscoveryStrategy>();
builder.Services.AddScoped<IUrlDiscoveryStrategy, SitemapUrlDiscoveryStrategy>();

// HttpClient for sitemap fetching
builder.Services.AddHttpClient("SustainabilitySitemap", c => c.Timeout = TimeSpan.FromSeconds(30));
```

### New Frontend Files

#### 9. `section/sitecheck/types.ts`

```typescript
export const SUSTAINABILITY_SITECHECK_ROOT_ENTITY_TYPE = "sitecheck-root";
```

#### 10. `section/sitecheck/menu-item/manifests.ts`

Menu item with weight 1500 (between Overview at 2000 and Stats at 1000), icon `icon-globe`, menu `Umbraco.Community.Sustainability.Menu`.

#### 11. `section/sitecheck/workspace/manifests.ts`

Workspace manifest for `Sustainability.Workspace.SiteCheck` entity type.

#### 12. `section/sitecheck/workspace/sitecheck-workspace.element.ts`

Lit element extending `UmbLitElement`:

- **Start state**: Button "Start Site Check" + description text
- **Running state**: Progress bar (`uui-progress-bar`), page counter, Cancel button, live results table
- **SSE connection**: Uses `fetch()` with `Authorization: Bearer` header (not `EventSource`, which doesn't support headers), reads `ReadableStream`, parses SSE events
- **Cancellation**: `AbortController` on the fetch call
- **Results table**: Page name (linked to content editor), carbon rating badge, page size, CO2
- **Error display**: Separate section for failed pages with error messages

#### 13. `section/sitecheck/manifests.ts`

Re-exports workspace + menu-item manifests.

### Modified Frontend Files

#### 14. `section/manifests.ts`

Import and spread `sitecheckManifests`.

#### 15. `localization/en.ts`

Add keys: `siteCheck`, `siteCheckDescription`, `startSiteCheck`, `cancelSiteCheck`, `siteCheckProgress`, `siteCheckComplete`, `siteCheckError`, `pagesChecked`.

---

## Complete File Summary

| # | File | Action |
|---|------|--------|
| 1 | `Configuration/SustainabilitySettings.cs` | Create |
| 2 | `Services/Discovery/IUrlDiscoveryStrategy.cs` | Create |
| 3 | `Services/Discovery/UmbracoContentUrlDiscoveryStrategy.cs` | Create |
| 4 | `Services/Discovery/SitemapUrlDiscoveryStrategy.cs` | Create |
| 5 | `Models/SiteCheckProgressDto.cs` | Create |
| 6 | `Services/ISiteCheckService.cs` + `SiteCheckService.cs` | Create |
| 7 | `Controllers/SiteCheckController.cs` | Create |
| 8 | `UI/src/section/sitecheck/types.ts` | Create |
| 9 | `UI/src/section/sitecheck/menu-item/manifests.ts` | Create |
| 10 | `UI/src/section/sitecheck/workspace/manifests.ts` | Create |
| 11 | `UI/src/section/sitecheck/workspace/sitecheck-workspace.element.ts` | Create |
| 12 | `UI/src/section/sitecheck/manifests.ts` | Create |
| 13 | `SustainabilityComposer.cs` | Modify |
| 14 | `UI/src/section/manifests.ts` | Modify |
| 15 | `UI/src/localization/en.ts` | Modify |

*All backend paths relative to `src/Umbraco.Community.Sustainability/`. All UI paths relative to `src/Umbraco.Community.Sustainability.UI/`.*

---

## Implementation Order

### Phase 1: Backend ✅ COMPLETE
1. ✅ `SustainabilitySettings.cs` — configuration
2. ✅ `IUrlDiscoveryStrategy.cs` + both strategy implementations
3. ✅ `SiteCheckProgressDto.cs`
4. ✅ `ISiteCheckService.cs` + `SiteCheckService.cs`
5. ✅ `SiteCheckController.cs`
6. ✅ `SustainabilityComposer.cs` — add site-check registrations

### Phase 2: Frontend ✅ COMPLETE
7. ✅ `sitecheck/types.ts` + manifests files
8. ✅ `sitecheck-workspace.element.ts`
9. ✅ `section/manifests.ts` + `localization/en.ts` updates
10. ✅ Auto-built via `npm run watch`

---

## Verification

1. Build both .NET and UI projects — should compile without errors
2. Navigate to Sustainability > Site Check in the backoffice
3. Click "Start Site Check" — verify progress bar and live results
4. Test cancellation mid-run
5. Verify results are saved to `umbPageMetrics` table
6. Test with `UseSitemapXml: true` in appsettings
7. Verify concurrent run protection (attempting second run shows error)

---

## Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| SSE via `fetch()` not `EventSource` | `EventSource` doesn't support `Authorization` headers |
| `static SemaphoreSlim` for run guard | `SiteCheckService` is scoped but needs app-wide concurrency guard |
| No browser pooling | Keep it simple — reuse existing `SustainabilityService` as-is. Pooling is a future optimization. |
| Examine strategy priority 100, Sitemap 50 | Examine gives NodeKey + URL; sitemap only gives URL. Examine data wins on duplicates. |
| TPL Dataflow `ActionBlock` | Built-in concurrency control, backpressure handling, cancellation support |
