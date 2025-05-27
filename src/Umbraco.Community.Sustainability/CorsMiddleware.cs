using Microsoft.AspNetCore.Http;

namespace Umbraco.Community.Sustainability
{
    public class CorsMiddleware
    {
        private readonly RequestDelegate _next;

        public CorsMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            if (context.Request.Path.Value?.StartsWith("/App_Plugins/UmbracoCommunitySustainability/") == true)
            {
                context.Response.Headers.Append("Access-Control-Allow-Origin", "*");
                context.Response.Headers.Append("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
                context.Response.Headers.Append("Access-Control-Allow-Headers", "Content-Type, Authorization");
            }

            await _next(context);
        }
    }
}
