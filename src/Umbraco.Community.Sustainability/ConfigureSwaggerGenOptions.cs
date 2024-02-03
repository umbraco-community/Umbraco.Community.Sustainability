#if NET8_0
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace Umbraco.Community.Sustainability
{
    public class ConfigureSwaggerGenOptions : IConfigureOptions<SwaggerGenOptions>
    {
        public void Configure(SwaggerGenOptions options)
        {
            options.SwaggerDoc(
                "sustainability",
                new OpenApiInfo
                {
                    Title = "Sustainability API",
                    Version = "Latest",
                    Description = "Umbraco.Community.Sustainability"
                });
        }
    }
}
#endif
