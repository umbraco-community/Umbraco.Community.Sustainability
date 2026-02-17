using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Cms.Web.Common.ApplicationBuilder;
using Umbraco.Community.Sustainability.Middleware;
using Umbraco.Community.Sustainability.Notifications;
using Umbraco.Community.Sustainability.Services;

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

            // Health check configuration
            builder.Services.Configure<Models.SustainabilityHealthCheckSettings>(
                builder.Config.GetSection("Sustainability:HealthChecks"));

            // Named HTTP client for Green Web Foundation API
            builder.Services.AddHttpClient("GreenWebFoundation", c =>
                c.DefaultRequestHeaders.UserAgent.ParseAdd(
                    "Umbraco.Community.Sustainability/5.0"));

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
