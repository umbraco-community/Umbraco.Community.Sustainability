using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Community.Sustainability.Notifications;
using Umbraco.Community.Sustainability.Services;

namespace Umbraco.Community.Sustainability
{
    internal class SustainabilityComposer : IComposer
    {
        public void Compose(IUmbracoBuilder builder)
        {
            string value = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);
            Environment.SetEnvironmentVariable("PLAYWRIGHT_BROWSERS_PATH", $"{value}{Path.DirectorySeparatorChar}ms-playwright");

            var exitCode = Microsoft.Playwright.Program.Main(new[] { "install", "chromium" });
            if (exitCode != 0)
            {
                throw new Exception($"Playwright exited with code {exitCode}");
            }

            builder.AddNotificationHandler<UmbracoApplicationStartingNotification, PageMetricsNotificationHandler>();

            builder.Services.AddScoped<IPageMetricService, PageMetricService>();
            builder.Services.AddSingleton<ISustainabilityService, SustainabilityService>();

            builder.Services.ConfigureOptions<ConfigureSwaggerGenOptions>();
        }
    }
}
