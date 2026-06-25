using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Cms.Web.Common.ApplicationBuilder;
using Umbraco.Community.Sustainability.Configuration;
using Umbraco.Community.Sustainability.Middleware;
using Umbraco.Community.Sustainability.Notifications;
using Umbraco.Community.Sustainability.Services;
using Umbraco.Community.Sustainability.Services.Discovery;

namespace Umbraco.Community.Sustainability
{
    internal class SustainabilityComposer : IComposer
    {
        public void Compose(IUmbracoBuilder builder)
        {
            string playwrightPath;
            string? xdgDataHome = Environment.GetEnvironmentVariable("XDG_DATA_HOME");

            if (!string.IsNullOrEmpty(xdgDataHome))
            {
                playwrightPath = Path.Combine(xdgDataHome, "ms-playwright");
            }
            else
            {
                string homePath = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);
                playwrightPath = Path.Combine(homePath, "ms-playwright");
            }

            if (!Directory.Exists(playwrightPath))
            {
                Directory.CreateDirectory(playwrightPath);
            }

            Environment.SetEnvironmentVariable("PLAYWRIGHT_BROWSERS_PATH", playwrightPath);

            var exitCode = Microsoft.Playwright.Program.Main(new[] { "install", "chromium" });
            if (exitCode != 0)
            {
                throw new Exception($"Playwright exited with code {exitCode}");
            }

            builder.AddNotificationHandler<UmbracoApplicationStartingNotification, PageMetricsNotificationHandler>();

            builder.Services.AddScoped<IPageMetricService, PageMetricService>();
            builder.Services.AddSingleton<ISustainabilityService, SustainabilityService>();

            // Site-check configuration and services
            builder.Services.AddOptions<SustainabilitySettings>()
                .Bind(builder.Config.GetSection("Sustainability"));

            builder.Services.AddScoped<ISiteCheckService, SiteCheckService>();

            // URL discovery strategies
            builder.Services.AddScoped<IUrlDiscoveryStrategy, UmbracoContentUrlDiscoveryStrategy>();
            builder.Services.AddScoped<IUrlDiscoveryStrategy, SitemapUrlDiscoveryStrategy>();

            // HttpClient for sitemap fetching
            builder.Services.AddHttpClient("SustainabilitySitemap", c => c.Timeout = TimeSpan.FromSeconds(30));

            builder.Services.ConfigureOptions<ConfigureSwaggerGenOptions>();

            builder.Services.Configure<UmbracoPipelineOptions>(options =>
            {
                options.AddFilter(new UmbracoPipelineFilter(
                    "CorsMiddleware",
                    applicationBuilder => applicationBuilder.UseMiddleware<CorsMiddleware>()));
            });
        }
    }
}
